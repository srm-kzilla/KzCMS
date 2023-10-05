import {
  handleDeleteUser,
  handleToggleProject,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
} from '@/api/admin/admin.service';
import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { ProjectSlugType } from '@/shared/types';
import { UpdateProjectSchemaType, VerifyUserType } from '@/shared/types/admin/admin.schema';
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

export const toggleProject = async (
  req: Request<ProjectSlugType, unknown, unknown, {
    setStatus: 'enable' | 'disable'
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status = req.query.setStatus;
    if (!status) {
      throw {
        statusCode: ERRORS.MALFORMED_BODY.code,
        message: 'Please provide a valid status of the project',
      };
    }
    await handleToggleProject(req.params.slug, status);
    res.status(STATUS.OK).json({
      success: true,
      message: 'Project Status Updated',
    });
  } catch (error) {
    next(error);
  }
};
