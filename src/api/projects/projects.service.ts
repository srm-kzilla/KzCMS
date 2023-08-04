import config from '@/config';
import db from '@/loaders/database';
import { ProjectDataType, CreateProjectType, UpdateProjectType } from '@/shared/types/project/project.schema';
import { ObjectId } from 'mongodb';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import slugify from 'slugify';
import { ERRORS } from '@/shared/errors';
import { LINK_REGEX_PATTERN } from '@/shared/constants';

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
  });

  return slug;
};

export const handleUpdateProject = async ({ slug, data }: UpdateProjectType): Promise<ProjectDataType & any> => {
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

  return { updatedProject: updatedProject.value };
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

export const handleDeleteProjectData = async (slug: string, title: string) => {
  const result = await (
    await db()
  )
    .collection('projects')
    // @ts-ignore
    .findOneAndUpdate({ projectSlug: slug }, { $pull: { data: { title: title } } }, { returnOriginal: false });

  if (!result.value || !result.value.data) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  const data = result.value.data.find((item: any) => item.title === title);

  if (!data || !data.imageUrl) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  const KEY = data.imageUrl.match(LINK_REGEX_PATTERN);

  if (!KEY) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message,
    };
  }

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.AWS.bucketName,
      Key: KEY[1],
    }),
  );
};
