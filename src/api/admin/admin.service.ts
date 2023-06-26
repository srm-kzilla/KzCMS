import db from '@/loaders/database';
import { ObjectId } from 'mongodb';

interface User {
  name: string;
  age: number;
}

export const handleGetUsers = (): User[] => {
  return [
    {
      name: 'Utkarshini',
      age: 19,
    },
  ];
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
  return user;
}

export async function handleGetUserProjects(id: string) {
  const oid = new ObjectId(id);
  const user = await (await db()).collection('users').findOne(
    { _id: oid },
    {
      projection: {
        projects: 1,
        _id: 0,
      },
    },
  );
  if (user) {
    return user.projects;
  }
}
