import { UserSchemaType } from '@/shared/types';
import { NextFunction, Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';

export const addNewUser = async (req: Request<unknown, unknown, UserSchemaType>, res: Response, next: NextFunction) => {
  const user = req.body;
  try {
    await handleAddNewUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
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
    res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
    });
  } catch (error) {
    next(error);
  }
};
