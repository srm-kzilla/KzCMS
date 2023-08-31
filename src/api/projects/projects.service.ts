import config from '@/config';
import db from '@/loaders/database';
import LoggerInstance from '@/loaders/logger';
import { LINK_REGEX_PATTERN } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { CreateProjectType, ProjectDataType, ProjectType } from '@/shared/types';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import { ObjectId, UpdateFilter } from 'mongodb';
import slugify from 'slugify';
import { promisify } from 'util';

const s3Client = new S3Client({
  region: config.AWS.region,
  credentials: {
    accessKeyId: config.AWS.clientKey,
    secretAccessKey: config.AWS.clientSecret,
  },
});

const S3_BASE_URL = `https://${config.AWS.bucketName}.s3.${config.AWS.region}.amazonaws.com`;

const removeFileAfterUse = async (path: fs.PathLike) => {
  try {
    const unlinkFile = promisify(fs.unlink);
    await unlinkFile(path);
  } catch {
    throw {
      statusCode: ERRORS.SERVER_ERROR.code,
      message: `${ERRORS.SERVER_ERROR.message.error} | File Unlink Error`,
    };
  }
};

export const handleCreateProject = async ({ projectName, typeName }: CreateProjectType): Promise<string> => {
  if (!projectName || !typeName) {
    throw { success: false, statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message };
  }
  const projectsCollection = (await db()).collection('projects');
  const slug = slugify(`${projectName} ${typeName}`, { lower: true, replacement: '-', trim: true });
  const project = await projectsCollection.findOne({ projectSlug: slug });

  if (project) {
    throw { success: false, message: `Project with slug '${slug}' already exists`, data: { projectName, typeName } };
  }

  await projectsCollection.insertOne({
    projectSlug: slug,
    projectName: `${projectName} | ${typeName}`,
    data: [],
    userAccess: [],
  });

  return slug;
};

export const handleUpdateProjectData = async (slug: string, data: Omit<ProjectDataType, 'image'>) => {
  const projectsCollection = (await db()).collection('projects');
  const project = await projectsCollection.findOne({ projectSlug: slug, 'data.title': data.title });
  if (!project) {
    throw { success: false, message: `Project with slug '${slug}' or title '${data.title}' not found`, data };
  }
  const filter = { _id: new ObjectId(project._id), 'data.title': data.title };

  const update = {
    $set: {
      'data.$.title': data.title,
      'data.$.description': data.description,
      'data.$.link': data.link,
      'data.$.author': data.author,
    },
  };

  const updatedProject = await projectsCollection.findOneAndUpdate(filter, update, {
    returnDocument: 'after',
    projection: { _id: 0 },
  });

  return { updatedProject: updatedProject.value } as unknown as ProjectDataType;
};

export const handleUpdateProjectMetadata = async (slug: string, newName: string, newSlug: string) => {
  const projectsCollection = (await db()).collection('projects');
  const project = await projectsCollection.findOne({ projectSlug: slug });
  if (!project) {
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }
  if (!newSlug) {
    newSlug = project.projectSlug;
  }

  const SLUG = slugify(`${newSlug}`, { lower: true, replacement: '-', trim: true });

  projectsCollection.updateOne({ projectSlug: slug }, { $set: { projectName: newName, projectSlug: SLUG } });
};

export const handleGetAllProjects = async () => {
  const projects = await (await db()).collection('projects').find().toArray();
  return projects as unknown as ProjectDataType[];
};

export const handleGetProject = async (projectSlug: string) => {
  const projects = await (await db()).collection('projects').findOne({
    projectSlug,
  });
  return projects as unknown as ProjectDataType;
};

export const handleDeleteProject = async (slug: string) => {
  const result = await (await db())
    .collection('projects')
    .updateOne({ projectSlug: slug }, { $set: { isDeleted: true } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: 400,
      message: 'Project deletion failed',
    };
  }
};

export const handleCreateProjectData = async (slug: string, data: ProjectDataType, file: Express.Multer.File) => {
  const projectsCollection = (await db()).collection('projects');
  const project = await projectsCollection.findOne({ projectSlug: slug });

  if (!project) {
    removeFileAfterUse(file.path);
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  if (project.data.find((d: { title: string }) => d.title === data.title)) {
    removeFileAfterUse(file.path);
    throw {
      statusCode: ERRORS.RESOURCE_CONFLICT.code,
      message: ERRORS.RESOURCE_CONFLICT.message.error_description,
    };
  }

  const uploadResult = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.AWS.bucketName,
      Key: file.filename,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      ACL: 'public-read',
    }),
  );
  removeFileAfterUse(file.path);

  if (!uploadResult) {
    throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message };
  }

  await projectsCollection.updateOne(
    {
      projectSlug: slug,
    },
    {
      $push: {
        data: {
          title: data.title,
          description: data.description,
          link: data.link,
          imageURL: `${S3_BASE_URL}/${file.filename}`,
          author: data.author,
        },
      },
    },
  );
};

export const handleDeleteProjectData = async (slug: string, title: string) => {
  const projectsCollection = (await db()).collection('projects');
  const project = await projectsCollection.findOne<ProjectType>({ projectSlug: slug });

  if (!project) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  const data = project.data.find(item => item.title === title);

  if (!data || !data.imageURL) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  const KEY = data.imageURL.match(LINK_REGEX_PATTERN);

  if (!KEY) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.AWS.bucketName,
        Key: KEY[1],
      }),
    );
  } catch (e) {
    LoggerInstance.log({
      level: 'error',
      message: `Error deleting image from S3: ${e}`,
    });
  }

  const result = await projectsCollection.findOneAndUpdate(
    {
      projectSlug: slug,
    },
    {
      $pull: {
        data: {
          title,
        },
      } as UpdateFilter<ProjectDataType>,
    },
    {
      returnDocument: 'after',
    },
  );

  if (!result.value) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }
};
