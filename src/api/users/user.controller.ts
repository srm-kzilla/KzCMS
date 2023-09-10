import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { AuthGetUserType, userType as UserType } from '@/shared/types';
import { NextFunction, Request, Response } from 'express';
import { handleGetUserDetails, handleGetUserProjects, handleGetUsers } from './user.service';

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
  req: Request<unknown, unknown, AuthGetUserType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const email = req.body.email;
    const data = await handleGetUserDetails(email);
    return res.status(STATUS.OK).json({
      success: true,
      message: `user found with id ${email}`,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserProjects(
  req: Request<unknown, unknown, AuthGetUserType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user: UserType = res.locals.user;
    const projects = await handleGetUserProjects(user.email);
    return res.status(STATUS.OK).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
}
