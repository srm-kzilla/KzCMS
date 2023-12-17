import config from '@/config';
import db from '@/loaders/database';
import { LINK_REGEX_PATTERN } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import {
  CreateProjectType,
  ProjectDataCreateType,
  ProjectDataType,
  ProjectDataUpdateType,
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
    await unlinkFile(`./tmp/uploads/${path}`);
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
  const project = await projectsCollection.findOne({ projectSlug: slug, isDeleted: false });

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
    isDeleted: false,
  });

  return slug;
};

export const handleUpdateProjectData = async (id: string, data: ProjectDataUpdateType) => {
  const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');
  const projectDataId = new ObjectId(id);
  const projectData = await projectDataCollection.findOne({ _id: projectDataId, isDeleted: false });

  if (!projectData) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      data,
    };
  }

  const updatedProject = await projectDataCollection.updateOne(
    {
      _id: projectDataId,
    },
    {
      $set: {
        title: data.title,
        description: data.description,
        link: data.link,
        subType: data.subType,
      },
    },
  );

  if (updatedProject.matchedCount !== 1 || updatedProject.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
    };
  }
};

export const handleGetAllProjects = async () => {
  const dbInstance = await db();
  const projectsCollection = dbInstance.collection<ProjectType>('projects');

  const projects = await projectsCollection
    .aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: 'project_data',
          localField: 'projectSlug',
          foreignField: 'projectSlug',
          as: 'data',
        },
      },
      {
        $addFields: {
          data: {
            $filter: {
              input: '$data',
              as: 'item',
              cond: { $eq: ['$$item.isDeleted', false] },
            },
          },
        },
      },
      { $project: { isDeleted: 0, data: { isDeleted: 0 } } },
    ])
    .toArray();

  return projects;
};

export const handleGetProject = async (projectSlug: string, user: UserType) => {
  const dbInstance = await db();
  const projectsCollection = dbInstance.collection<ProjectType>('projects');
  const projectsDataCollection = dbInstance.collection<ProjectDataType>('project_data');

  const project = await projectsCollection.findOne({ projectSlug, isDeleted: false });

  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  if (project.userAccess.length > 0 && !project.userAccess.includes(user.email)) {
    throw { statusCode: ERRORS.UNAUTHORIZED.code, message: ERRORS.UNAUTHORIZED.message.error };
  }

  const projectData = await projectsDataCollection
    .find({ projectSlug, isDeleted: false }, { projection: { isDeleted: 0 } })
    .toArray();

  return projectData;
};

export const handleDeleteProject = async (slug: string) => {
  const result = await (await db())
    .collection<ProjectType>('projects')
    .updateOne({ projectSlug: slug, isDeleted: false }, { $set: { isDeleted: true } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
    };
  }
};

export const handleCreateProjectData = async (
  slug: string,
  data: ProjectDataCreateType,
  file: Express.Multer.File,
  userEmail: string,
) => {
  const projectCollection = (await db()).collection<ProjectType>('projects');
  const project = await projectCollection.findOne({ projectSlug: slug, isDeleted: false });

  if (!project) {
    await removeFileAfterUse(file.path);
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');
  const projectData = await projectDataCollection.findOne({
    projectSlug: slug,
    title: data.title,
    isDeleted: false,
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

  const result = await projectDataCollection.insertOne({
    projectSlug: slug,
    title: data.title,
    description: data.description,
    link: data.link,
    imageURL: `${S3_BASE_URL}/${file.filename}`,
    subType: data.subType,
    isDeleted: false,
    author: userEmail,
  });

  if (result.acknowledged !== true) {
    throw { statusCode: ERRORS.DATA_OPERATION_FAILURE.code, message: ERRORS.DATA_OPERATION_FAILURE.message.error };
  }
};

export const handleDeleteProjectData = async (slug: string, title: string) => {
  const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');
  const projectData = await projectDataCollection.findOne({ projectSlug: slug, title, isDeleted: false });

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

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
    };
  }
};

export const handleUpdateProjectImage = async (id: string, file: Express.Multer.File) => {
  try {
    const projectDataCollection = (await db()).collection<ProjectDataType>('project_data');

    const projectDataId = new ObjectId(id);

    const projectData = await projectDataCollection.findOne({
      _id: projectDataId,
      isDeleted: false,
    });

    if (!projectData) {
      throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
    }

    if (projectData.imageURL) {
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

    if (!uploadResult) {
      throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
    }

    const result = await projectDataCollection.updateOne(
      { _id: projectDataId, isDeleted: false },
      {
        $set: {
          imageURL: `${S3_BASE_URL}/${file.filename}`,
        },
      },
    );

    if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
      throw {
        statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
        message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      };
    }
  } finally {
    await removeFileAfterUse(file.filename);
  }
};
