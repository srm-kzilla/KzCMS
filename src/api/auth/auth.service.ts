import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { UserSchemaType } from '@/shared/types';
import generateToken from '@/shared/middlewares/jwt';
import { SALT_ROUNDS } from '@/shared/constants';

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
    throw { statusCode: 404, message: 'User Does Not Exsist' };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }
  return generateToken(email);
}
