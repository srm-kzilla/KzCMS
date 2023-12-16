import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { UserSchemaType } from '@/shared/types';
import { NextFunction, Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';

export const addNewUser = async (req: Request<unknown, unknown, UserSchemaType>, res: Response, next: NextFunction) => {
  const user = req.body;
  try {
    await handleAddNewUser(user);
    const token = await handleExistingUser(user);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.CREATE_USER,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginExistingUser = async (
  req: Request<unknown, unknown, UserSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userObj = { email: req.body.email, password: req.body.password };
    const token = await handleExistingUser(userObj);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.LOGIN_USER,
      token,
    });
  } catch (error) {
    next(error);
  }
};
