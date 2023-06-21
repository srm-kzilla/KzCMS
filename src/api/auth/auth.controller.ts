import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleLoginUser } from './auth.service';
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
  return handleLoginUser(req.body);
};
