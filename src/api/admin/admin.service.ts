import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { Collection, WithId } from 'mongodb';

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}).toArray();
};

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exsist' };
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
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

export async function handleUpdateUserProjects() {
  return [{ name: 'Aditya', password: 'asdfghjkl123' }];
}
