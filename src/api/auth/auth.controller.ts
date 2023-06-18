import { Router, Request, Response } from 'express';
import { handleGetUser, handleAddNewUser, handleLoginExistingUser } from './auth.service';

export const getUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleGetUser({ email: email, password: password });
  res.status(200).json(data);
};

export const addNewUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleAddNewUser({ email: email, password: password });
  res.status(200).json(data);
};

export const loginExistingUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleLoginExistingUser({ email: email, password: password });
  res.status(200).json(data);
};
