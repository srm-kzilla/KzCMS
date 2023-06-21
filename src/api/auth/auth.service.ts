import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { authParamType } from './auth.schema';
import { userType } from '../types/user';
import generateToken from '../../shared/middlewares/jwt';

export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
}

export async function handleExistingUser({ email, password }: authParamType): Promise<{
  status: number;
  email: string;
  token?: string;
  message: string;
}> {
  let res: boolean;
  const data = await (await db()).collection('users').findOne({ email: email });

  if (data === null) {
    return { status: 404, email: email, message: 'User Does Not Exsist' };
  }

  res = await bcrypt.compare(password, data.password); // for testing use "TestingPassword" for test@gmail.com

  if (res) {
    const token: string = generateToken(email);
    return { status: 200, email: email, token: token, message: 'Login Successful' };
  } else {
    return { status: 401, email: email, message: 'Incorrect Password / Not Allowed' };
  }
}
