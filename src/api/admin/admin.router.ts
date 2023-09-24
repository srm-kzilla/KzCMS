import { validateRequest } from '@/shared/middlewares/validator';
import { AuthGetSchema, AuthSchema, UpdateProjectSchema, VerifyUserSchema, ToggleProjectSchema } from '@/shared/types';
import { Router } from 'express';
import { z } from 'zod';
import { deleteUser, updateUser, updateUserProjects, verifyUser, toggleProject } from './admin.controller';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);

  app.patch('/toggle/:slug', validateRequest('query', ToggleProjectSchema), toggleProject);
  return app;
};
