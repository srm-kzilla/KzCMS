import { Request, Response, NextFunction } from 'express';
import LoggerInstance from '@/loaders/logger';
import { ERRORS } from '@/shared/errors';
import { CreateProjectType, DeleteProjectType, ImageType } from '@/shared/types/project/project.schema';
import {
  handleCreateProjectData,
  handleCreateProject,
  handleDeleteProject,
  handleGetAllProjects,
  handleGetProject,
  handleUpdateProjectData,
} from './projects.service';
import { STATUS } from '@/shared/constants';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    const data = await handleUpdateProjectData({ slug: req.params.slug, data: req.body });
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
    body: {
      data: {
        title: string;
        description?: string;
        link?: string;
        author?: string;
      };
    };
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const url = await handleCreateProjectData(req.params.slug, req.body, req.file);
    res.status(STATUS.OK).json({
      success: true,
      message: `image \`${url}\` created`,
    });
  } catch (error) {
    next(error);
  }
};
