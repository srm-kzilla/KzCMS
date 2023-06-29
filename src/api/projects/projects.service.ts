import db from '@/loaders/database';
import { ProjectDataType, CreateProjectType } from '@/shared/types/project/project.schema';
import { ObjectId } from 'mongodb';
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

export const handleUpdateProjectData = async (
  slug: string,
  { data }: ProjectDataType,
): Promise<ProjectDataType & any> => {
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

export const handleCreateProjectData = async (slug: string, body: any, imageUrl: string) => {
  // TODO: Add proper types later
  try {
    const project = await (await db()).collection('projects').findOne({ projectSlug: slug });

    if (!project) {
      throw { message: 'Project not found' };
    }

    await (await db()).collection('projects').updateOne(
      {
        slug,
      },
      {
        $push: {
          data: {
            title: body.title,
            description: body.description,
            link: body.link,
            imageUrl,
            author: body.author,
          },
        },
      },
    );
  } catch (error) {
    throw { success: error.statusCode ?? 500, message: 'Project data creation failed', error };
  }
};
