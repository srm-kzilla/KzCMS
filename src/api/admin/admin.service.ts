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

export const handleDeleteUser = (): void => {};

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
