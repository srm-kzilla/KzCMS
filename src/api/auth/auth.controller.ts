import { Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';
import { authParamType } from './auth.schema';
import Logger from '../../loaders/logger';
import LoggerInstance from '../../loaders/logger';

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
    const token = await handleExistingUser(userObj);
    res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
    });
  } catch (err) {
    LoggerInstance.error(err);
    res.status(err.statusCode ?? 500).json({
      success: false,
      message: err.message ?? 'Internal Server Error'
    })
  }
};
