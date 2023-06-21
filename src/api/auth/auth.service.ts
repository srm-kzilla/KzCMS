import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { authParamType } from './auth.schema';
import { userType } from '../types/user';
import generateToken from '../../shared/middlewares/jwt';

export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
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
