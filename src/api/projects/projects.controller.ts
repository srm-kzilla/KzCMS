import { Request, Response, NextFunction } from 'express';
import LoggerInstance from '@/loaders/logger';
import { ERRORS } from '@/shared/errors';
import { CreateProjectType, DeleteProjectType } from '@/shared/types/project/project.schema';
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetAllProjects,
  handleGetProject,
  handleUpdateProject,
} from './projects.service';
import { STATUS_CODES } from '@/shared/constants';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await handleGetAllProjects();
    res.status(200).json({
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
    res.status(200).json({
      success: true,
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

export const updateProject = async (
  req: Request & {
    body: {
      title: string;
      description?: string;
      link?: string;
      author?: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleUpdateProject({ slug: req.params.slug, data: req.body });
    res.status(200).json(data);
  } catch (error) {
    LoggerInstance.error(`Error while updating Project: ${error}`);
    res
      .status(error.statusCode ?? ERRORS.SERVER_ERROR.code)
      .json({ success: false, message: error.message ?? ERRORS.SERVER_ERROR.message });
  }
};

export const deleteProject = async (
  req: Request & DeleteProjectType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await handleDeleteProject(req.params.slug);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: `project \`${req.params.slug}\` deleted`,
    });
  } catch (error) {
    next(error);
  }
};
