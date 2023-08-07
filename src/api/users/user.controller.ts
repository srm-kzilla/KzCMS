import { NextFunction, Request, Response } from 'express';

import { handleGetUserDetails, handleGetUserProjects, handleGetUsers } from './user.service';
import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { userDetailsType } from '@/shared/types/user/user.schema';

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

export async function getUserDetails(
  req: Request<unknown, unknown, userDetailsType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const email = req.body.email;
    const data = await handleGetUserDetails(email);
    return res.status(STATUS.OK).json({
      success: true,
      message: `user found with email ${email}`,
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
