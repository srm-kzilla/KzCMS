import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { ProjectDataType, ProjectType } from '@/shared/types';
import { ObjectId } from 'mongodb';

export const handleGetProject = async (id: string) => {
  const dbInstance = await db();
  const projectsCollection = dbInstance.collection<ProjectType>('projects');
  const projectsDataCollection = dbInstance.collection<ProjectDataType>('project_data');

  const project = await projectsCollection.findOne({ _id: new ObjectId(id), isDeleted: false });

  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const projectData = await projectsDataCollection
    .find({ projectSlug: project.projectSlug, isDeleted: false }, { projection: { isDeleted: 0 } })
    .toArray();

  return projectData;
};
