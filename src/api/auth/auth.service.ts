import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { userScemaType } from '../types/auth.schema';
import Logger from '../../loaders/logger';

export async function handleAddNewUser(signup: userScemaType) {
  try {
    const data = await (await db()).collection('users').findOne({ email: signup.email });
    if (data !== null) {
      return { status: 409, error: 'This email already exists', success: false };
    }
    const collection = (await db()).collection('users');

    const saltRounds = 10;
    const hash = await bcrypt.hash(signup.password, saltRounds);
    const currentDateTime = new Date();

    await collection.insertOne({
      email: signup.email,
      password: hash,
      created_at: currentDateTime,
      isAdmin: false,
      isVerified: false,
      isDeleted: false,
    });

    return { status: 200, email: signup.email, error: 'New user added successfully', success: true };
  } catch (error) {
    Logger.error(error);
    return { status: 500, email: signup.email, message: 'User could not be added', success: false };
  }
}

export async function handleLoginUser(login: userScemaType) {
  return { email: login.email, password: login.password };
}
