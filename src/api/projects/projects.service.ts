import config from '@/config';
import db from '@/loaders/database';
import { LINK_REGEX_PATTERN } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import {
  CreateProjectType,
  ProjectDataCreateType,
  ProjectDataType,
  ProjectDataUpdateType,
  ProjectImageSlugType,
  ProjectType,
  UserType,
} from '@/shared/types';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import { ObjectId } from 'mongodb';
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
    throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
  }
  const projectsCollection = (await db()).collection<ProjectType>('projects');
  const slug = slugify(`${projectName} ${typeName}`, { lower: true, replacement: '-', trim: true });
  const project = await projectsCollection.findOne({ projectSlug: slug });

  if (project) {
    throw {
      statusCode: ERRORS.RESOURCE_CONFLICT.code,
      message: ERRORS.RESOURCE_CONFLICT.message.error,
      data: { projectName, typeName },
    };
  }

  await projectsCollection.insertOne({
    projectSlug: slug,
    projectName,
    userAccess: [],
    data: [],
    isDeleted: false,
  });

  return slug;
};

export const handleUpdateProjectData = async (slug: string, data: ProjectDataUpdateType) => {
  const projectsCollection = (await db()).collection('projects');
  const project = await projectsCollection.findOne({ projectSlug: slug, 'data.title': data.title });
  if (!project) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      data,
    };
  }
  const filter = { _id: new ObjectId(project._id), 'data.title': data.title };

  if (!data.newTitle) {
    data.newTitle = data.title;
  }
  const update = {
    $set: {
      'data.$.title': data.newTitle,
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
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }
  if (!newSlug) {
    newSlug = project.projectSlug;
  }

  const SLUG = slugify(`${newSlug}`, { lower: true, replacement: '-', trim: true });

  await projectsCollection.updateOne({ projectSlug: slug }, { $set: { projectName: newName, projectSlug: SLUG } });
};

export const handleGetAllProjects = async () => {
  const projects = await (await db()).collection('projects').find().toArray();
  const modifiedProjects = projects.map(project => {
    const { _id, ...rest } = project;
    return { id: _id, ...rest };
  });
  return modifiedProjects as unknown as ProjectDataType[];
};

export const handleGetProject = async (projectSlug: string, user: UserType) => {
  const projectsCollection = (await db()).collection('projects');
  const project = (await projectsCollection.findOne({ projectSlug })) as unknown as ProjectType | null;
  if (!project) {
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  if (!user.isAdmin && !project.userAccess.includes(user.email)) {
    throw { errorCode: ERRORS.UNAUTHORIZED.code, message: ERRORS.UNAUTHORIZED.message.error };
  }

  return project.data as unknown as ProjectDataType;
};

export const handleDeleteProject = async (slug: string) => {
  const result = await (await db())
    .collection('projects')
    .updateOne({ projectSlug: slug }, { $set: { isDeleted: true } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
    };
  }
};

export const handleCreateProjectData = async (slug: string, data: ProjectDataCreateType, file: Express.Multer.File) => {
  const projectCollection = (await db()).collection<ProjectType>('projects');
  const project = await projectCollection.findOne({ projectSlug: slug });

  if (!project) {
    await removeFileAfterUse(file.path);
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');
  const projectData = await projectDataCollection.findOne({
    slug,
  });

  if (projectData && projectData.title === data.title) {
    await removeFileAfterUse(file.path);
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

  await removeFileAfterUse(file.path);

  if (!uploadResult) {
    throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
  }

  const _id = new ObjectId();

  await projectDataCollection.insertOne({
    _id,
    projectSlug: slug,
    title: data.title,
    description: data.description,
    link: data.link,
    imageURL: `${S3_BASE_URL}/${file.filename}`,
    subType: data.subType,
    isDeleted: false,
  });

  await projectCollection.updateOne(
    { projectSlug: slug },
    {
      $push: {
        data: _id.toString(),
      },
    },
  );
};

export const handleDeleteProjectData = async (slug: string, title: string) => {
  const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');
  const projectData = await projectDataCollection.findOne({ projectSlug: slug, title });

  if (!projectData) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
    };
  }

  const result = await projectDataCollection.updateOne(
    {
      projectSlug: slug,
      title,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
  );

  if (result.matchedCount === 0 || result.modifiedCount === 0) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
    };
  }
};

export const handleUpdateProjectImage = async (data: ProjectImageSlugType, file: Express.Multer.File) => {
  try {
    const projectsCollection = (await db()).collection('projects');
    const project = await projectsCollection.findOne({ projectSlug: data.slug });

    if (!project) {
      throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
    }

    const projectData = project.data.find((d: { title: string }) => d.title === data.title);

    if (!projectData) {
      throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
    }

    const key = projectData.imageURL.match(LINK_REGEX_PATTERN);

    if (!key) {
      throw {
        statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
        message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      };
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.AWS.bucketName,
        Key: key[1],
      }),
    );

    const uploadResult = await s3Client.send(
      new PutObjectCommand({
        Bucket: config.AWS.bucketName,
        Key: file.filename,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    if (!uploadResult) {
      throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
    }

    const filter = { 'data.title': data.title };
    const update = {
      $set: {
        'data.$.imageURL': `${S3_BASE_URL}/${file.filename}`,
      },
    };

    await projectsCollection.updateOne(filter, update);
  } finally {
    await removeFileAfterUse(file.filename);
  }
};
