import { Request, Response } from 'express';
import { handleDeleteUser, handleGetUser, handleUpdateUser } from './admin.service';

export const getUsers = (req: Request, res: Response) => {
  const data = handleGetUser();
  res.status(200).json({
    status: 'success',
    data,
  });
};

export const updateUser = (req: Request, res: Response) => {
  const data = handleUpdateUser();
  res.status(200).json({
    status: 'success',
    data,
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const data = handleDeleteUser();
  res.status(200).json({
    status: 'success',
  });
};
