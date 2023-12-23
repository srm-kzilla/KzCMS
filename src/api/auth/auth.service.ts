import db from '@/loaders/database';
import { SALT_ROUNDS } from '@/shared/constants';
import generateToken from '@/shared/middlewares/jwt';
import { UserSchemaType, UserType } from '@/shared/types';
import bcrypt from 'bcrypt';
import { ERRORS } from '@/shared/errors';

export async function handleAddNewUser(signup: UserSchemaType) {
  const data = await (await db()).collection('users').findOne({ email: signup.email });
  if (data) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXSIST.code,
      message: ERRORS.USER_ALREADY_EXSIST.message.error,
      description: ERRORS.USER_ALREADY_EXSIST.message.error_description,
    };
  }
  const collection = (await db()).collection('users');

  const hash = await bcrypt.hash(signup.password, SALT_ROUNDS);

  await collection.insertOne({
    email: signup.email,
    password: hash,
    isAdmin: false,
    isVerified: false,
    isDeleted: false,
    projects: [],
    createdAt: new Date(),
  });
}

export async function handleExistingUser({ email, password }: UserSchemaType): Promise<string> {
  const data = await (await db()).collection<UserType>('users').findOne({ email: email });

  if (!data) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.code,
      message: ERRORS.USER_NOT_FOUND.message.error,
      description: ERRORS.USER_NOT_FOUND.message.error_description,
    };
  }

  if (!data.isVerified) {
    throw {
      statusCode: ERRORS.USER_NOT_VERIFIED.code,
      message: ERRORS.USER_NOT_VERIFIED.message.error,
      description: ERRORS.USER_NOT_VERIFIED.message.error_description,
    };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw {
      statusCode: ERRORS.INVALID_CREDENTIALS.code,
      message: ERRORS.INVALID_CREDENTIALS.message.error,
      description: ERRORS.INVALID_CREDENTIALS.message.error_description,
    };
  }
  return generateToken(email);
}
