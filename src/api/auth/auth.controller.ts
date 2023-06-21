import { Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';
import { authParamType } from './auth.schema';
import Logger from '../../loaders/logger';

export const addNewUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleAddNewUser(email, password);
  if (data !== null) {
    res.status(200).json(data);
  }
};

export const loginExistingUser = async (req: Request, res: Response) => {
  try {
    const userObj: authParamType = { email: req.body.email, password: req.body.password };

    const data = await handleExistingUser(userObj);
    res.status(data.status).json(data);
  } catch (err) {
    Logger.error(err);
    return { status: 500, message: 'Internal Server Error' };
  }
};
