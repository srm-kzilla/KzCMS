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
import { ERRORS } from '@/shared/errors';
import { STATUS } from '@/shared/constants';

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
  const id = req.params.userid;
  const data = await handleGetUserDetails(id);
  if (data) {
    return res.status(STATUS.OK).json({
      success: true,
      message: `user found with id ${id}`,
      data,
    });
  }
  return res.status(ERRORS.RESOURCE_NOT_FOUND.code).json({
    success: false,
    errorMessage: ERRORS.RESOURCE_NOT_FOUND.message.error_description,
    message: `user not found with id ${id}`,
  });
}
