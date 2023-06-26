import db from '@/loaders/database';
import { Collection, WithId } from 'mongodb';

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}).toArray();
};

export const handleUpdateUser = () => {
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
