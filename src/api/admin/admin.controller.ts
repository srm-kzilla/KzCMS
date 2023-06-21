import { Request, Response } from 'express';
import {
  handleDeleteUser,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';
import LoggerInstance from '../../loaders/logger';

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

export const verifyUser = async (req: Request, res: Response) => {
  const { email, verify } = req.body;

  const userStatus = verify ? 'verified' : 'unverified';

  try {
    const success = await handleVerifyUser(email, verify);
    if (success) {
      res.status(200).json({
        success: true,
        message: `User ${userStatus} successfully`,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: 'User verification failed',
    });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify user',
    });
  }
};

export async function updateUserProjects(req: Request, res: Response) {
  const data = await handleUpdateUserProjects();
  if (data != null) {
    res.status(200).json({
      data,
    });
  }
}
