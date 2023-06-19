import { Request, Response } from 'express';
import { handleDeleteUser, handleGetUsers, handleUpdateUser, handleVerifyUser } from './admin.service';

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

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await handleVerifyUser();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
