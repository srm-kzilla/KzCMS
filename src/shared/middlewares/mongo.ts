import { NextFunction, Request, Response } from 'express';
import db from '@/loaders/database';
import { ERRORS } from '../errors';

export default function checkDataConflicts() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const projects = await (await db()).collection('projects').findOne({
      projectSlug: req.params.slug,
      'data.title': req.body.title,
    });

    if (projects) {
      return res.status(ERRORS.RESOURCE_CONFLICT.code).json({
        success: false,
        message: ERRORS.RESOURCE_CONFLICT.message.error_description,
      });
    }
    next();
  };
}
