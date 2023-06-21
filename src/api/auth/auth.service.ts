import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { userScemaType } from '../types/auth.schema';

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

export async function handleLoginUser(login: userScemaType) {
  return { email: login.email, password: login.password };
}
