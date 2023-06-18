import database from '../../loaders/database';
import { Login, Signup, User } from './auth.model';
import bcrypt from 'bcrypt';

export async function handleGetUser(user: User) {
  const collection = await database().then(db => db.collection('cms'));
  const response = await collection.findOne({ email: user.email });
  if (!response) {
    console.log('User not found');
  } else {
    console.log('User Found!!');
  }
  return response;
}

export async function handleAddNewUser(signup: Signup) {
  const data = await handleGetUser(signup);
  if (data === null) {
    const collection = await database().then(db => db.collection('<Sample DB>'));

    const saltRounds = 10;
    const hash = await bcrypt.hash(signup.password, saltRounds);

    await collection.insertOne({ email: signup.email, password: hash });
    console.log('New User Added!!');
  } else {
    console.log('User already exists!!');
  }
  return signup.email;
}

export async function handleLoginExistingUser(login: Login) {
  const data = await handleGetUser(login);
  if (data === null) {
    console.log('User does not exist!!');
  } else {
    const collection = await database().then(db => db.collection('cms'));
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
