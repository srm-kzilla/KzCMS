import database from '../../loaders/database';

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

export const handleDeleteUser = (): void => {
  //
};

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const success = await (await database()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

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
