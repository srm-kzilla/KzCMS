import { Request, Response } from 'express';
import { handleDeleteUser, handleGetUsers, handleUpdateUser, handleUpdateUserProjects } from './admin.service';

export const getUsers = (req: Request, res: Response) => {
  const data = handleGetUsers();
  res.status(200).json({
    success: true,
    data,
  });
};

export const updateUser = (req: Request, res: Response) => {
  const data = handleUpdateUser();
  res.status(200).json({
    success: true,
    message: 'User Updated Successfully',
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const data = handleDeleteUser();
  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
};

export const verifyUser = (req: Request, res: Response) => {
  const data = handleVerifyUser();
  res.status(200).json({
    success: true,
    data,
  });
};

export async function updateUserProjects(req: Request, res: Response) {
  const data = await handleUpdateUserProjects();
  if (data != null) {
    res.status(200).json({
      data,
    });
  }
}
