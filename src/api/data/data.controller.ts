import { handleGetProject } from '@/api/data/data.service';
import { STATUS } from '@/shared/constants';
import { ProjectIdType } from '@/shared/types';
import { NextFunction, Request, Response } from 'express';

export const getProjectData = async (req: Request<ProjectIdType>, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const data = await handleGetProject(id);
    res.status(STATUS.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
