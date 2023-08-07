import { Request, Response, NextFunction } from 'express';
import LoggerInstance from '@/loaders/logger';
import { ERRORS } from '@/shared/errors';
import { CreateProjectType, ProjectSlugType, ProjectDataType } from '@/shared/types/project/project.schema';
import {
  handleCreateProjectData,
  handleCreateProject,
  handleDeleteProject,
  handleGetAllProjects,
  handleGetProject,
  handleUpdateProjectData,
  handleDeleteProjectData,
} from './projects.service';
import { STATUS } from '@/shared/constants';

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

export const getProject = async (
  req: Request & {
    params: {
      slug: string;
    };
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await handleGetProject(req.params.slug);
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
  req: Request & CreateProjectType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await handleCreateProject({ projectName: req.body.projectName, typeName: req.body.typeName });
    res.status(200).json({
      success: true,
      message: 'Project created',
      slug: data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectData = async (
  req: Request & {
    body: ProjectDataType;
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleUpdateProjectData(req.params.slug, req.body);
    res.status(200).json(data);
  } catch (error) {
    LoggerInstance.error(`Error while updating Project: ${error}`);
    res
      .status(error.statusCode ?? ERRORS.SERVER_ERROR.code)
      .json({ success: false, message: error.message ?? ERRORS.SERVER_ERROR.message });
  }
};

export const deleteProject = async (
  req: Request & ProjectSlugType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleDeleteProject(req.params.slug);
    res.status(STATUS.OK).json({
      success: true,
      message: `project \`${req.params.slug}\` deleted`,
    });
  } catch (error) {
    next(error);
  }
};

export const createProjectData = async (
  req: Request & {
    body: ProjectDataType;
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      throw { statusCode: ERRORS.MALFORMED_BODY.code, message: 'No Image provided' };
    }

    await handleCreateProjectData(req.params.slug, req.body, req.file);
    res.status(STATUS.OK).json({
      success: true,
      message: `Data Created`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleDeleteProjectData(req.params.slug, req.body.title);

    res.status(STATUS.OK).json({
      success: true,
      message: `project \`${req.params.slug}\` - \`${req.body.title}\` Data deleted`,
    });
  } catch (error) {
    next(error);
  }
};
