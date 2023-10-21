import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';

export const handleGetUsers = async (status: string) => {
  const users = await (
    await db()
  )
    .collection('users')
    .find({ isDeleted: false }, { projection: { _id: 0, password: 0 } })
    .toArray();

  const verifiedUsers = users.filter(user => user.isVerified);
  const unVerifiedUsers = users.filter(user => !user.isVerified);

  if (status === 'verified') {
    return verifiedUsers;
  } else if (status === 'unverified') {
    return unVerifiedUsers;
  }
  return users;
};

export async function handleGetUserProjects(email: string) {
  const collection = (await db()).collection('projects');

  return await collection
    .find(
      { userAccess: { $in: [email] }, isDeleted: false },
      {
        projection: {
          _id: 0,
        },
      },
    )
    .toArray();
}

export async function handleGetUserDetails(email: string) {
  const user = await (await db()).collection('users').findOne(
    { email: email, isDeleted: false },
    {
      projection: {
        _id: 0,
        password: 0,
      },
    },
  );
  if (!user) {
    throw {
      status: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
    };
  }
  return user;
}
