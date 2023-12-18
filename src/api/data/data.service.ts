import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { ProjectDataType, ProjectType } from '@/shared/types';
import { ObjectId } from 'mongodb';

export const handleGetProject = async (id: string) => {
  const project = (await (await db()).collection('projects').findOne({
    _id: new ObjectId(id),
  })) as unknown as ProjectType | null;

  if (!project) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      description: ERRORS.RESOURCE_NOT_FOUND.message.error_description,
    };
  }

  return project.data as unknown as ProjectDataType;
};
