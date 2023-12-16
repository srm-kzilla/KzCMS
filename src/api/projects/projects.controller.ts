import { MESSAGES_TEXT, STATUS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import {
  CreateProjectType,
  ProjectDataType,
  ProjectDataUpdateType,
  ProjectImageSlugType,
  ProjectMetadataType,
  ProjectSlugType,
  ProjectTitleType,
} from '@/shared/types';
import { NextFunction, Request, Response } from 'express';
import {
  handleCreateProject,
  handleCreateProjectData,
  handleDeleteProject,
  handleDeleteProjectData,
  handleGetAllProjects,
  handleGetProject,
  handleUpdateProjectData,
  handleUpdateProjectImage,
  handleUpdateProjectMetadata,
} from './projects.service';

export const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await handleGetAllProjects();
    res.status(STATUS.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: Request<ProjectSlugType>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user } = res.locals;

    const data = await handleGetProject(req.params.slug, user);
    res.status(STATUS.OK).json({
      success: true,
      slug: req.params.slug,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request<unknown, unknown, CreateProjectType>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await handleCreateProject({ projectName: req.body.projectName, typeName: req.body.typeName });
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.CREATE_PROJECT,
      slug: data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectData = async (
  req: Request<ProjectSlugType, unknown, ProjectDataUpdateType>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleUpdateProjectData(req.params.slug, req.body);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATED_PROJECT_DATA,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectImage = async (
  req: Request<ProjectImageSlugType, unknown, ProjectDataType> & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
    }

    await handleUpdateProjectImage(req.params, req.file);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.IMAGE_UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectMetadata = async (
  req: Request<ProjectSlugType, unknown, ProjectMetadataType>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleUpdateProjectMetadata(req.params.slug, req.body.newName, req.body.newSlug);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.UPDATE_PROJECT_METADATA,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request<ProjectSlugType>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleDeleteProject(req.params.slug);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.DELETE_PROJECT,
    });
  } catch (error) {
    next(error);
  }
};

export const createProjectData = async (
  req: Request<ProjectSlugType, unknown, ProjectDataType> & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      throw { statusCode: ERRORS.MALFORMED_BODY.code, message: ERRORS.MALFORMED_BODY.message.error };
    }

    await handleCreateProjectData(req.params.slug, req.body, req.file);
    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.CREATE_PROJECT_DATA,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectData = async (
  req: Request<ProjectSlugType, unknown, ProjectTitleType>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleDeleteProjectData(req.params.slug, req.body.title);

    res.status(STATUS.OK).json({
      success: true,
      message: MESSAGES_TEXT.DELETE_PROJECT_DATA,
    });
  } catch (error) {
    next(error);
  }
};
