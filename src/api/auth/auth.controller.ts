import { Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';
import { authParamType } from '../../shared/types/admin/admin.schema';

import LoggerInstance from '../../loaders/logger';

export const addNewUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    await handleAddNewUser(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message ?? 'Internal server error' });
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
