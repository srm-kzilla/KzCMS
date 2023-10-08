import {
  handleDeleteUser,
  handleToggleProject,
  handleUpdateUser,
  handleUpdateUserProjects,
  handleVerifyUser,
  handleUpdateDomains,
} from '@/api/admin/admin.service';
import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import {
  UpdateProjectSchemaType,
  VerifyUserType,
  UpdateDomainsSchemaType,
} from '@/shared/types/admin/admin.schema';
import { ProjectSlugType, ToggleProjectType } from '@/shared/types';
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
  req: Request<ProjectSlugType, unknown, ToggleProjectType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isEnabled, isDevelopment, slug } = req.body;

    if (isEnabled === undefined && isDevelopment === undefined) {
      throw {
        statusCode: ERRORS.MALFORMED_BODY.code,
        message: ERRORS.MALFORMED_BODY.message.error,
      };
    }

    const status = {
      isEnabled: isEnabled ?? true,
      isDevelopment: isDevelopment ?? false,
    };

    await handleToggleProject(slug, status);

    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_PROJECT_ACCESS,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectDomains = async (
  req: Request<unknown, unknown, UpdateDomainsSchemaType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allowedDomains, projectSlug } = req.body;

    await handleUpdateDomains(projectSlug, allowedDomains);

    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_ALLOWED_DOMAINS,
    });
  } catch (error) {
    next(error);
  }
};
