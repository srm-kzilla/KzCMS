import db from '@/loaders/database';
import { SALT_ROUNDS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { UpdateProjectSchemaType } from '@/shared/types';
import bcrypt from 'bcrypt';
import { AnyBulkWriteOperation } from 'mongodb';

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message };
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await (await db()).collection('users').updateOne({ email }, { $set: { password: hash } });
};

export const handleGetToken = async (slug: string): Promise<string> => {
  const data = await (await db()).collection('projects').findOne({ projectSlug: slug }, { projection: { token: 1 } });

  if (!data) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  return data.token;
};

export async function handleDeleteUser(email: string) {
  const user = await (await db()).collection('users').findOne({ email });
  if (!user) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message };
  }
  if (user.isDeleted) {
    throw { statusCode: ERRORS.USER_ALREADY_DELETED.code, message: ERRORS.USER_ALREADY_DELETED.message };
  }
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true, isVerified: false } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const result = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: 400,
      message: 'User verification failed',
    };
  }
};

export async function handleUpdateUserProjects(data: UpdateProjectSchemaType) {
  const project = await (await db()).collection('projects').findOne({ projectSlug: data.projectSlug });
  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const new_users = data.newUserAccess;
  const deleted_users = data.deletedUserAccess;

  const projects_collection = await (await db()).collection('projects');
  const projectsBulkOperations: AnyBulkWriteOperation<{}>[] = [];

  const users_collection = await (await db()).collection('users');
  const usersBulkOperations: AnyBulkWriteOperation<{}>[] = [];

  for (let i = 0; i < new_users.length; i++) {
    const projectUpdateQuery: AnyBulkWriteOperation<{}> = {
      updateOne: {
        filter: { projectSlug: data.projectSlug, userAccess: { $nin: [new_users[i]] } },
        update: { $push: { userAccess: new_users[i] } },
      },
    };
    projectsBulkOperations.push(projectUpdateQuery);

    const usersUpdateQuery: AnyBulkWriteOperation<object> = {
      updateOne: {
        filter: { email: new_users[i], projects: { $nin: [data.projectSlug] } },
        update: { $push: { projects: data.projectSlug } },
      },
    };
    usersBulkOperations.push(usersUpdateQuery);
  }

  for (let i = 0; i < deleted_users.length; i++) {
    const projectUpdateQuery: AnyBulkWriteOperation<{}> = {
      updateOne: {
        filter: { projectSlug: data.projectSlug },
        update: { $pull: { userAccess: deleted_users[i] } },
      },
    };
    projectsBulkOperations.push(projectUpdateQuery);

    const usersUpdateQuery: AnyBulkWriteOperation<object> = {
      updateOne: { filter: { email: deleted_users[i] }, update: { $pull: { projects: data.projectSlug } } },
    };
    usersBulkOperations.push(usersUpdateQuery);
  }

  if (projectsBulkOperations.length > 0) {
    const success = projects_collection.bulkWrite(projectsBulkOperations);
    if (!success) {
      throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message.error };
    }
  }

  if (usersBulkOperations.length > 0) {
    const success = users_collection.bulkWrite(usersBulkOperations);
    if (!success) {
      throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message.error };
    }
  }
  return project.userAccess;
}
