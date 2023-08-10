import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { Collection, WithId, ObjectId } from 'mongodb';

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export async function handleGetUserProjects(email: string) {
  const user = await (await db()).collection('users').findOne(
    { email },
    {
      projection: {
        projects: 1,
      },
    },
  );
  if (!user) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User not found with id ${email}`,
    };
  }
  return user.projects;
}

export async function handleGetUserDetails(id: string) {
  const oid = new ObjectId(id);
  const user = await (await db()).collection('users').findOne(
    { _id: oid },
    {
      projection: {
        password: 0,
      },
    },
  );
  if (!user) {
    throw {
      status: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User with id ${id} not found`,
    };
  }
  return user;
}
