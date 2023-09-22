import db from '@/loaders/database';
import { ERRORS } from '@/shared/errors';

export const handleGetUsers = async (Verified: boolean, unVerified: boolean) => {
  const users = await (
    await db()
  )
    .collection('users')
    .find({ isDeleted: false }, { projection: { _id: 0, password: 0 } })
    .toArray();

  const verifiedUsers = users.filter(user => user.isVerified);
  const unVerifiedUsers = users.filter(user => !user.isVerified);

  return Verified && !unVerified ? verifiedUsers : !Verified && unVerified ? unVerifiedUsers : users;
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
      message: `User with email ${email} not found`,
    };
  }
  return user;
}
