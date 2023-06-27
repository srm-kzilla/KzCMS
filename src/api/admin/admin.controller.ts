import { NextFunction, Request, Response } from 'express';

import {
  handleDeleteUser,
  handleGetUserDetails,
  handleGetUserProjects,
  handleGetUsers,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';
import { MESSAGES_TEXT, STATUS } from '@/shared/constants';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await handleGetUsers();
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.FETCH_USERS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    await handleUpdateUser(email, password);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_USER,
    });
  } catch (error) {
    next(error);
  }
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
  next: NextFunction,
) {
  try {
    const id = req.params.userid;
    const data = await handleGetUserDetails(id);
    return res.status(STATUS.OK).json({
      success: true,
      message: `user found with id ${id}`,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserProjects(
  req: Request & {
      params: {
        userid: string;
      };
    },
    res: Response,
    next: NextFunction,
  ) {
    try {
    const projects = await handleGetUserProjects(req.params.userid);
      return res.status(STATUS.OK).json({
        success: true,
        projects,
      });
  } catch (error) {
    next(error);
  }
}
