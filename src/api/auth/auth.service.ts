import db from '@/loaders/database';
import { SALT_ROUNDS } from '@/shared/constants';
import generateToken from '@/shared/middlewares/jwt';
import { UserSchemaType } from '@/shared/types';
import bcrypt from 'bcrypt';
import { ERRORS } from '@/shared/errors';

export async function handleAddNewUser(signup: UserSchemaType) {
  const data = await (await db()).collection('users').findOne({ email: signup.email });
  if (data) {
    throw { statusCode: 409, message: 'This email already exists', success: false };
  }
  const collection = (await db()).collection('users');

  const hash = await bcrypt.hash(signup.password, SALT_ROUNDS);

  await collection.insertOne({
    email: signup.email,
    password: hash,
    isAdmin: false,
    isVerified: false,
    isDeleted: false,
    projects: [],
    createdAt: new Date(),
  });
}

export async function handleExistingUser({ email, password }: UserSchemaType): Promise<string> {
  const data = await (await db()).collection('users').findOne({ email: email });

  if (!data) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message.error };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: ERRORS.UNAUTHORIZED.code, message: ERRORS.UNAUTHORIZED.message.error };
  }
  return generateToken(email);
}
