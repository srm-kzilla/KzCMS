import { Request, Response } from 'express';
import {
  handleDeleteUser,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';

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
  const userId = req.body.email;
  try {
    const user = await handleDeleteUser(userId);
    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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
