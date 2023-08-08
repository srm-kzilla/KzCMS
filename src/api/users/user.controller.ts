import { NextFunction, Request, Response } from 'express';
import { handleGetUserDetails, handleGetUserProjects, handleGetUsers } from './user.service';
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
