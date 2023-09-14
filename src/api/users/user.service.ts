import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { Collection, WithId } from 'mongodb';

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export async function handleGetUserProjects(email: string) {
  const collection: Collection<Document> = (await db()).collection('projects');

  const projects = await collection.find({ userAccess: { $in: [email] } }).toArray();

  return projects;
}

export async function handleGetUserDetails(email: string) {
  const user = await (await db()).collection('users').findOne(
    { email: email },
    {
      projection: {
        password: 0,
      },
    },
  );
  if (!user) {
    throw {
      status: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User with email ${email} not found`,
    };
  }
  return user;
}
