import { Request, Response } from 'express';
import {
  handleDeleteUser,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';
import { userInfo } from 'os';

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
    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
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
