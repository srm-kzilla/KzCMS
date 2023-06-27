import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { Collection, WithId, ObjectId } from 'mongodb';


interface User {
  name: string;
  age: number;
}

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export const handleUpdateUser = (): User => {
  return { name: 'john', age: 23 };
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

export async function handleUpdateUserProjects() {
  return [{ name: 'Aditya', password: 'asdfghjkl123' }];
}

export async function handleGetUserProjects(id: string) {
  const oid = new ObjectId(id);
  const user = await (await db()).collection('users').findOne(
    { _id: oid },
    {
      projection: {
        projects: 1,
      },
    },
  );
  if (!user) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User not found with id ${id}`,
    };
  }
  return user.projects;
}
