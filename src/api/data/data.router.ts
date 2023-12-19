import { validateToken } from '@/shared/middlewares/validateToken';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectIdSchema } from '@/shared/types';
import { Router } from 'express';
import { getProjectData } from './data.controller';

export default (): Router => {
  const app = Router();

  app.get(
    '/project/:projectId',
    validateRequest('params', ProjectIdSchema),
    validateToken({
      idFrom: 'params',
    }),
    getProjectData,
  );

  return app;
};
