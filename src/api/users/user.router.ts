import { Router } from 'express';
import { getUserDetails, getUserProjects, getUsers } from './user.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { userDetailsSchema } from '@/shared/types/user/user.schema';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);
  app.get('/user/:userid', validateRequest('params', userDetailsSchema), getUserDetails);
  app.get('/user/:userid/projects', validateRequest('params', userDetailsSchema), getUserProjects);

  return app;
};
