import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { UserScemaType, AuthParamType } from '@/shared/types';
import generateToken from '@/shared/middlewares/jwt';
import { SALT_ROUNDS } from '@/shared/constants';

export async function handleAddNewUser(signup: UserScemaType) {
  const data = await (await db()).collection('users').findOne({ email: signup.email });
  if (data) {
    throw { statusCode: 409, message: 'This email already exists', success: false };
  }
  const collection = (await db()).collection('users');

  const hash = await bcrypt.hash(signup.password, SALT_ROUNDS);

  await collection.insertOne({
    ...signup,
    password: hash,
    projects: [],
  });
}

export async function handleExistingUser({ email, password }: AuthParamType): Promise<string> {
  const data = await (await db()).collection('users').findOne({ email: email });

  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exsist' };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }
  return generateToken(email);
}
