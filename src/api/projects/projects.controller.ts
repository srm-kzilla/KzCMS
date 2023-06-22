import { Request, Response } from 'express';
import {
  handleCreateProject,
  handleCreateProjects,
  handleGetAllProjects,
  handleGetProject,
  handleDeleteImage,
  handleDeleteProject,
  handlePostImage,
  handleUpdateProject,
} from './projects.service';
import LoggerInstance from '@/loaders/logger';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await handleGetAllProjects();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Unable to get projects',
    });
  }
};

export const getProject = async (
  req: Request & {
    params: {
      slug: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleGetProject(req.params.slug);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: 'Unable to get projects',
    });
  }
};

export const createProject = async (
  req: Request & {
    body: {
      slug: string;
      name: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleCreateProject(req.body);
    res.status(200).json({
      success: true,
      message: 'Project created',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: 'Unable to get projects',
    });
  }
};

export const createProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await handleCreateProjects();
    res.status(200).json({
      success: true,
      message: 'Projects created',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: 'Unable to get projects',
    });
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
    const data = await handleUpdateProject(req.params.slug, req.body);
    res.status(200).json(data);
  } catch (error) {
    LoggerInstance.error(`Error while updating Project: ${error}`);
    res.status(500).json({
      success: false,
      message: `Error while updating Project: ${error}`,
    });
  }
};

export const deleteProject = async (
  req: Request & {
    body: {
      slug: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleDeleteProject(req.params.slug);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while updating Project: ${error}`);
    res.status(500).json({
      success: false,
      message: `Error while updating Project: ${error}`,
    });
  }
};

export const postImage = async (
  req: Request & {
    body: {
      slug: string;
      title: string;
      image: File;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handlePostImage(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while updating Project: ${error}`);
    res.status(500).json({
      success: false,
      message: `Error while updating Project: ${error}`,
    });
  }
};

export const deleteImage = async (
  req: Request & {
    body: {
      slug: string;
      title: string;
      imageUrl: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = await handleDeleteImage(req.body.slug, req.body.title, req.body.imageUrl);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while updating Project: ${error}`);
    res.status(500).json({
      success: false,
      message: `Error while updating Project: ${error}`,
    });
  }
};
