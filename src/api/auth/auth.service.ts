import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { UserScemaType } from '@/shared/types/auth/auth.schema';
import { AuthParamType } from '@/shared/types/admin/admin.schema';
import generateToken from '@/shared/middlewares/jwt';

export async function handleAddNewUser(signup: UserScemaType) {
  const data = await (await db()).collection('users').findOne({ email: signup.email });
  if (data) {
    throw { statusCode: 409, message: 'This email already exists', success: false };
  }
  const collection = (await db()).collection('users');

  const saltRounds = 10;
  const hash = await bcrypt.hash(signup.password, saltRounds);

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
