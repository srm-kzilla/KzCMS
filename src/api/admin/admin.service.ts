import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { ERRORS } from '@/shared/errors';
import { AnyBulkWriteOperation } from 'mongodb';
import { UpdateProjectSchemaType } from '@/shared/types';
import { SALT_ROUNDS } from '@/shared/constants';

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message };
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await (await db()).collection('users').updateOne({ email }, { $set: { password: hash } });
};

export async function handleDeleteUser(email: string) {
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true } });
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
  const updated_project = await (await db())
    .collection('projects')
    .updateOne({ projectSlug: data.projectSlug }, { $set: { userAccess: data.newUserAccess } });
  if (!updated_project) {
    throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message.error };
  }

  const new_users = data.newUserAccess;
  const deleted_users = data.deletedUserAccess;

  const collection = await (await db()).collection('users');
  const bulkOperations: AnyBulkWriteOperation<object>[] = [];

  for (let i = 0; i < new_users.length; i++) {
    const query: AnyBulkWriteOperation<object> = {
      updateOne: {
        filter: { email: new_users[i], projects: { $nin: [data.projectSlug] } },
        update: { $push: { projects: data.projectSlug } },
      },
    };
    bulkOperations.push(query);
  }

  for (let i = 0; i < deleted_users.length; i++) {
    const query: AnyBulkWriteOperation<object> = {
      updateOne: { filter: { email: deleted_users[i] }, update: { $pull: { projects: data.projectSlug } } },
    };
    bulkOperations.push(query);
  }

  if (bulkOperations.length > 0) {
    const success = await collection.bulkWrite(bulkOperations);
    if (!success) {
      throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message.error };
    }
  }
  return new_users;
}
