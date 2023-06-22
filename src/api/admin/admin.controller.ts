import { Request, Response } from 'express';

import {
  handleDeleteUser,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';

import LoggerInstance from '@/loaders/logger';
import { SERVER_ERROR } from '@/shared/errors';

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

export const deleteUser = async (req: Request, res: Response) => {
  const user = req.body.email;
  try {
    await handleDeleteUser(user);
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    LoggerInstance.error(error);
    res
      .status(error.statusCode ?? SERVER_ERROR.code)
      .json({ success: false, message: error.message ?? SERVER_ERROR.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, verify } = req.body;

  const userStatus = verify ? 'verified' : 'unverified';

  try {
    await handleVerifyUser(email, verify);
    res.status(200).json({
      success: true,
      message: `User ${userStatus} successfully`,
    });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.statusCode ?? SERVER_ERROR.code).json({
      success: false,
      message: error.message ?? SERVER_ERROR.message,
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
