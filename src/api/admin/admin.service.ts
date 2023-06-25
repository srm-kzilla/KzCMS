import db from '@/loaders/database';

interface User {
  name: string;
  age: number;
}

export const handleGetUsers = async () => {
  return await (await db()).collection('users').find({}).toArray();
};

export const handleUpdateUser = (): User => {
  return { name: 'john', age: 23 };
};

export async function handleDeleteUser(email: string) {
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const success = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (!(success.modifiedCount == 1)) {
    throw {
      statusCode: 400,
      message: 'User verification failed',
    };
  }
};

export async function handleUpdateUserProjects() {
  return [{ name: 'Aditya', password: 'asdfghjkl123' }];
}
