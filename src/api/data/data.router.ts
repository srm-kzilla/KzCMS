import { validateToken } from '@/shared/middlewares/validateToken';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectIdSchema } from '@/shared/types';
import { Router } from 'express';
import { getProjectData } from './data.controller';

export default (): Router => {
  const app = Router();

  app.get(
    '/project/:id',
    validateRequest('params', ProjectIdSchema),
    validateToken({
      path: 'params',
    }),
    getProjectData,
  );

  return app;
};
