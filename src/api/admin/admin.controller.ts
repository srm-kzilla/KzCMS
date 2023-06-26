import { NextFunction, Request, Response } from 'express';

import {
  handleDeleteUser,
  handleGetUserDetails,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';
import { ObjectId } from 'mongodb';

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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.email;
  try {
    await handleDeleteUser(user);
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, verify } = req.body;

  const userStatus = verify ? 'verified' : 'unverified';

  try {
    await handleVerifyUser(email, verify);
    res.status(200).json({
      success: true,
      message: `User ${userStatus} successfully`,
    });
  } catch (error) {
    next(error);
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

export async function getUserDetails(
  req: Request & {
    params: {
      userid: string;
    };
  },
  res: Response,
) {
  const data = await handleGetUserDetails(req.params.userid);
  if (data) {
    return res.status(200).json({
      success: true,
      data,
    });
  }
  return res.status(200).json({
    success: false,
    data,
  });
}
