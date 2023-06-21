import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { userScemaType } from '../../shared/types/auth/auth.schema';
import { authParamType } from '../../shared/types/admin/admin.schema';
import generateToken from '../../shared/middlewares/jwt';

export async function handleAddNewUser(signup: userScemaType) {
  const data = await (await db()).collection('users').findOne({ email: signup.email });
  if (!data) {
    throw { statusCode: 409, message: 'This email already exists', success: false };
  }
  const collection = (await db()).collection('users');

  const saltRounds = 10;
  const hash = await bcrypt.hash(signup.password, saltRounds);

  await collection.insertOne({
    ...signup,
    password: hash,
  });
}

export async function handleExistingUser({ email, password }: authParamType): Promise<string> {
  const data = await (await db()).collection('users').findOne({ email: email });

  if (!data) {
    throw { statusCode: 404, email, message: 'User Does Not Exsist' };
  }

  const res = await bcrypt.compare(password, data.password); // for testing use "TestingPassword" for test@gmail.com
  if (!res) {
    throw { statusCode: 401, email: email, message: 'Incorrect Password / Not Allowed' };
  }
  return generateToken(email);
}
