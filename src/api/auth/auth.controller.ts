import { Router, Request, Response } from 'express';
import { handleAddNewUser, handleLoginExistingUser, handleGetUser } from './auth.service';

export const addNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const data = await handleGetUser(user);
    if (data !== null) {
      return res.status(409).json({ error: 'This email already exists' });
    }
    const newUser = await handleAddNewUser(user);

    return res.status(200).send({ email: newUser, message: 'New user added successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'User could not be added', error: error });
  }
};

export const loginExistingUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const data = await handleLoginExistingUser(req.body);
  if (data !== null) {
    res.status(200).json(data);
  }
};
