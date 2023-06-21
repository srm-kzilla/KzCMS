import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleLoginUser } from './auth.service';

export const addNewUser = async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = await handleAddNewUser(user);

  return res.status(newUser.status).send(newUser);
};

export const loginExistingUser = async (req: Request, res: Response) => {
  return handleLoginUser(req.body);
};
