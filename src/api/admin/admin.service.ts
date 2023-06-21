import database from '../../loaders/database';

interface User {
  name: string;
  age: number;
}
interface UserWithVerification extends User {
  verified: boolean;
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
  await (await database()).collection('users').updateOne({ email }, { $set: { isDeleted: true } });
}

export const handleVerifyUser = (): UserWithVerification => {
  return {
    name: 'john',
    age: 23,
    verified: true,
  };
};

export async function handleUpdateUserProjects() {
  return [{ name: 'Aditya', password: 'asdfghjkl123' }];
}
