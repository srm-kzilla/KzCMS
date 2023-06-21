import db from '../../loaders/database';
import bcrypt from 'bcrypt';
import { userScemaType } from '../types/auth/schema';

export async function handleGetUser(user: userScemaType) {
  const data = await (await db()).collection('users').findOne({ email: user.email });
  return data;
}

export async function handleAddNewUser(signup: userScemaType) {
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

  return signup.email;
}

export async function handleLoginExistingUser(login: userScemaType) {
  const data = await handleGetUser(login);
  if (data === null) {
    console.log('User does not exist!!');
  } else {
    const collection = (await db()).collection('users');
    const userData = await collection.findOne({ email: login.email });
    try {
      const result = bcrypt.compareSync(login.password, userData.password);
      if (result) {
        console.log('User logged in');
      } else {
        console.log('Password Incorrect');
      }
    } catch {
      console.log('Details entered are incorrect!!');
    }
    return login.email;
  }
}