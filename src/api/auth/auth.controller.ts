import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleLoginExistingUser } from './auth.service';

export const addNewUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleAddNewUser(email, password);
  if (data !== null) {
    res.status(200).json(data);
  }
};

export const loginExistingUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleLoginExistingUser(email, password);
  if (data !== null) {
    res.status(200).json(data);
  }
};
