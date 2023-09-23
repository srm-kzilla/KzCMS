import { NextFunction, Request, Response } from 'express';

import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { GetTokenSchemaType, UpdateProjectSchemaType, VerifyUserType } from '@/shared/types/admin/admin.schema';
import { UserSchemaType } from '@/shared/types/auth/auth.schema';
import {
  handleDeleteUser,
  handleGetToken,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from './admin.service';

export const updateUser = async (req: Request<unknown, unknown, UserSchemaType>, res: Response, next: NextFunction) => {
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

export const getToken = async (
  req: Request<unknown, unknown, GetTokenSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectSlug } = req.body;
    const token = await handleGetToken(projectSlug);
    res.status(STATUS.OK).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request<unknown, unknown, UserSchemaType>, res: Response, next: NextFunction) => {
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

export const verifyUser = async (req: Request<unknown, unknown, VerifyUserType>, res: Response, next: NextFunction) => {
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

export async function updateUserProjects(
  req: Request<unknown, unknown, UpdateProjectSchemaType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await handleUpdateUserProjects(req.body);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_USER,
      userAccess: data,
    });
  } catch (error) {
    next(error);
  }
}
