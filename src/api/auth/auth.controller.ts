import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleLoginUser } from './auth.service';
import LoggerInstance from '../../loaders/logger';


export const addNewUser = async (req: Request, res: Response) => {
  const user = req.body;
  try{
  const newUser = await handleAddNewUser(user);
  res.status(newUser.status).send(newUser);
  }catch(error){
    LoggerInstance.error(error);
    res.status(error.statusCode ?? 500).json({ success: false, message: error.message ?? 'internal server error' });
  }
};

export const loginExistingUser = async (req: Request, res: Response) => {
  return handleLoginUser(req.body);
};
