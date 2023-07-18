import config from '@/config';
import db from '@/loaders/database';
import { ProjectDataType, CreateProjectType, UpdateProjectType } from '@/shared/types/project/project.schema';
import { ObjectId } from 'mongodb';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import slugify from 'slugify';

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
  try {
    const result = await (
      await db()
    )
      .collection('projects')
      // @ts-ignore
      .findOneAndUpdate({ projectSlug: slug }, { $pull: { data: { title: title } } }, { returnOriginal: false });

    const link = result.value?.data.find((item: any) => item.title === title)?.link;
    const regex = /https:\/\/kzilla-fun-bucket\.s3\.ap-south-1\.amazonaws\.com\/(.*)/;

    const res = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.AWS.AWS_BUCKET_NAME,
        Key: link.match(regex)[1],
      }),
    );
    console.log(res);
  } catch (error) {
    throw {
      statusCode: 400,
      message: 'Project data deletion failed',
    };
  }
};
