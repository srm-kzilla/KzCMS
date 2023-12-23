import {
  handleCreateToken,
  handleDeleteToken,
  handleDeleteUser,
  handleGetTokens,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from '@/api/admin/admin.service';
import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { UserType } from '@/shared/types';
import {
  TokenGetSchemaType,
  TokenUpdateSchemaType,
  UpdateProjectSchemaType,
  VerifyUserType,
} from '@/shared/types/admin/admin.schema';
import { UserSchemaType } from '@/shared/types/auth/auth.schema';
import { NextFunction, Request, Response } from 'express';

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

export const deleteUser = async (req: Request<unknown, unknown, UserSchemaType>, res: Response, next: NextFunction) => {
  const user = req.body.email;
  try {
    await handleDeleteUser(user);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.DELETE_USER,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req: Request<unknown, unknown, VerifyUserType>, res: Response, next: NextFunction) => {
  const { email, verify } = req.body;

  try {
    await handleVerifyUser(email, verify);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.VERIFY_USER,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProjects = async (
  req: Request<unknown, unknown, UpdateProjectSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await handleUpdateUserProjects(req.body);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_USER_ACCESS,
      userAccess: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTokens = async (
  req: Request<unknown, unknown, TokenGetSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.body;
    const { tokens } = await handleGetTokens(projectId);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.GET_TOKENS,
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const createToken = async (
  req: Request<unknown, unknown, TokenUpdateSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId, name } = req.body;
    const { user } = res.locals as { user: UserType };
    const { token } = await handleCreateToken(projectId, name, user.email);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.CREATE_TOKEN,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteToken = async (
  req: Request<unknown, unknown, TokenUpdateSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId, name } = req.body;
    const { user } = res.locals as { user: UserType };
    await handleDeleteToken(projectId, name, user.email);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.DELETE_TOKEN,
    });
  } catch (error) {
    next(error);
  }
};
