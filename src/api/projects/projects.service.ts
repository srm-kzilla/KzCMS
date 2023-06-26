import db from '@/loaders/database';
import { ProjectDataType, CreateProjectType, UpdateProjectType } from '@/shared/types/project/project.schema';
import { ObjectId } from 'mongodb';
import slugify from 'slugify';

export const handleCreateProject = async ({ projectName, teamName }: CreateProjectType): Promise<string> => {
  const projectsCollection = (await db()).collection('projects');
  const slug = slugify(`${projectName} ${teamName}`, { lower: true, replacement: '-', trim: true });
  const project = await projectsCollection.findOne({ projectSlug: slug });

  if (project) {
    throw { success: false, message: `Project with slug '${slug}' already exists`, data: { projectName, teamName } };
  }

  await projectsCollection.insertOne({
    projectSlug: slug,
    projectName: `${projectName} | ${teamName}`,
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
export const handleGetAllProjects = async () => {};

export const handleGetProject = async (slug: string) => {
  return undefined;
};

export const handleCreateProjects = async () => {
  return undefined;
};

export const handleDeleteProject = async (slug: string) => {
  return undefined;
};
