import { validateRequest } from '@/shared/middlewares/validator';
import { AuthGetSchema } from '@/shared/types';
import { Router } from 'express';
import { getUserDetails, getUserProjects, getUsers } from './user.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);
  app.get('/user', validateRequest('body', AuthGetSchema), getUserDetails);
  app.get('/user/projects', validateRequest('body', AuthGetSchema), getUserProjects);

  return app;
};
