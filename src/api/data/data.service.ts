import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { ProjectDataType, ProjectType } from '@/shared/types';
import { ObjectId } from 'mongodb';

export const handleGetProject = async (id: string) => {
  const project = (await (await db()).collection('projects').findOne({
    _id: new ObjectId(id),
  })) as unknown as ProjectType | null;

  if (!project) {
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  return project.data as unknown as ProjectDataType;
};
