import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { AuthGetUserType, UserType } from '@/shared/types';
import { NextFunction, Request, Response } from 'express';
import { handleGetUserDetails, handleGetUserProjects, handleGetUsers } from './user.service';

export const getUsers = async (
  req: Request<unknown, unknown, unknown, {
    status: 'verified' | 'unverified'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status } = req.query;
    const data = await handleGetUsers(status);
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
    const { email } = res.locals.user as UserType;
    const data = await handleGetUserDetails(email);
    return res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.FETCH_USER_DETAILS,
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
    const { email } = res.locals.user as UserType;
    const projects = await handleGetUserProjects(email);
    return res.status(STATUS.OK).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}
