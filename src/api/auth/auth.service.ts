import db from '../../loaders/database';
import config from '../../config';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { authParamType } from './auth.schema';
import { userType } from '../types/user';

export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
}

export async function handleExistingUser({ email, password }: authParamType): Promise<{
  status: number;
  email: string;
  message: string;
}> {
  let res: boolean;
  const data: userType = await (await db()).collection('users').findOne({ email: email });

  if (data === null) {
    return { status: 404, email: email, message: 'User Does Not Exsist' };
  }

  res = await bcrypt.compare(password, data.password); // for testing use "TestingPassword" for test@gmail.com

  if (res) {
    const token = jwt.sign({ email: email }, config.JWT_SECRET, {
      expiresIn: '30d',
    });
    return { status: 200, email: email, message: token };
  } else {
    return { status: 401, email: email, message: 'Incorrect Password / Not Allowed' };
  }
}
