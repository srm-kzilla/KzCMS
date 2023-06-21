import db from '../../loaders/database';
import config from '../../config';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { authParamType } from '../types/auth';
import { userType } from '../types/user';

export async function getUser(email: string): Promise<object> {
  const data = await (await db()).collection('users').findOne({ email: email });
  return data;
}

export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
}

export async function handleExistingUser({ email, password }: authParamType): Promise<{
  status: number;
  email: string;
  message: string;
}> {
  const data: userType = await getUser(email);
  let res: boolean;
  if (data === null) {
    return { status: 404, email: email, message: 'User Does Not Exsist' };
  }

  try {
    res = await bcrypt.compare(password, data.password); // for testing use "TestingPassword" for test@gmail.com
  } catch (err) {
    return { status: 500, email: email, message: 'Internal Server Error' };
  }

  if (res) {
    const token = jwt.sign({ email: email }, config.JWT_SECRET, {
      expiresIn: '30d',
    });
    return { status: 200, email: email, message: token };
  } else {
    return { status: 401, email: email, message: 'Incorrect Password / Not Allowed' };
  }
}
