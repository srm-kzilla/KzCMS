import { Request, Response, NextFunction } from 'express';
import LoggerInstance from '@/loaders/logger';
import { ERRORS } from '@/shared/errors';
import { baseProjectType, createProjectType } from '@/shared/types/project/project.schema';
import {
  handleCreateProject,
  handleDeleteProject,
  handleGetAllProjects,
  handleGetProject,
  handleUpdateProject,
} from './projects.service';

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
  req: Request & createProjectType,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await handleCreateProject({ projectName: req.body.projectName, teamName: req.body.teamName });
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

export const deleteProject = async (req: Request & string, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await handleDeleteProject(req.params.slug);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// TODO: NEED TO DO THIS Images Thing AFTER THE NEXT MEET
// export const postImage = async (
//   req: Request & {
//     body: {
//       slug: string;
//       title: string;
//       image: File;
//     };
//   },
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const data = await handlePostImage(req.body);
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteImage = async (
//   req: Request & {
//     body: {
//       slug: string;
//       title: string;
//       imageUrl: string;
//     };
//   },
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const data = await handleDeleteImage(req.body.slug, req.body.title, req.body.imageUrl);
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };
