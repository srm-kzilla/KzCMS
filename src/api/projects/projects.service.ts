import config from '@/config';
import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { CreateProjectType, ProjectDataType } from '@/shared/types/project/project.schema';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ObjectId } from 'mongodb';
import slugify from 'slugify';
import fs from 'fs';

const s3Client = new S3Client({
  region: config.AWS.region,
  credentials: {
    accessKeyId: config.AWS.clientKey,
    secretAccessKey: config.AWS.clientSecret,
  },
});

const s3BaseUrl = `https://${config.AWS.bucketName}.s3.${config.AWS.region}.amazonaws.com`;

const removeFileAfterUse = (path: fs.PathLike) => {
  fs.unlink(path, err => {
    if (err) {
      throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
    }
  });
};

export const handleCreateProject = async ({ projectName, typeName }: CreateProjectType): Promise<string> => {
  if (!projectName || !typeName)
    throw { statusCode: 400, success: false, message: 'Project name and type name both must be provided' };
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

export const handleUpdateProjectData = async (slug: string, data: ProjectDataType) => {
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

export const handleCreateProjects = async () => {
  return undefined;
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
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  if (project.data.find((d: { title: string }) => d.title === data.title)) {
    removeFileAfterUse(file.path);
    throw {
      errorCode: ERRORS.RESOURCE_CONFLICT.code,
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
    throw { errorCode: 500, message: 'Upload to S3 failed' };
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
          imageUrl: `${s3BaseUrl}/${file.filename}`,
          author: data.author,
        },
      },
    },
  );
};
