import { validateRequest } from '@/shared/middlewares/validator';
import { AuthGetSchema, AuthSchema, UpdateProjectSchema, VerifyUserSchema, ToggleProjectSchema } from '@/shared/types';
import { Router } from 'express';
import { deleteUser, updateUser, updateUserProjects, verifyUser, toggleProject } from '@/api/admin/admin.controller';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.patch('/toggle/:slug', validateRequest('query', ToggleProjectSchema), toggleProject);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);
  return app;
};
