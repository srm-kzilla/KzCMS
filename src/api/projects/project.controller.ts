import { handleDeleteImage, handleDeleteProject, handlePostImage, handleUpdateProject } from './project.service';
import { Request, Response } from 'express';

export const updateProject = async (
  req: Request & {
    body: {
      title: string;
      description: string;
      link: string;
      author: string;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = handleUpdateProject(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while updating Project: ${error}`);
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
    const data = handleDeleteProject(req.body.slug);
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
      title: string;
      image: File;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = handlePostImage(req.body.title, req.body.image);
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
      imageUrl: File;
    };
  },
  res: Response,
): Promise<void> => {
  try {
    const data = handleDeleteImage(req.body.slug, req.body.title, req.body.imageUrl);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while updating Project: ${error}`);
    res.status(500).json({
      success: false,
      message: `Error while updating Project: ${error}`,
    });
  }
};
