import { Request, Response } from 'express';
import { handleCreateProject, handleCreateProjects, handleGetAllProjects, handleGetProject } from './projects.service';

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
