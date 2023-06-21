import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleExistingUser } from './auth.service';

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
  if (!email || !password) {
    res.status(400).send('Email and Password are required');
  }

  const data = await handleExistingUser({ email: email, password: password });
  res.status(data.status).send(data);
};
