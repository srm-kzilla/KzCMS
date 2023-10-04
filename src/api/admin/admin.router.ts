import { validateRequest } from '@/shared/middlewares/validator';
import { AuthGetSchema, AuthSchema, ToggleProjectSchema, UpdateProjectSchema, VerifyUserSchema } from '@/shared/types';
import { Router } from 'express';
import { deleteUser, toggleProject, updateUser, updateUserProjects, verifyUser } from '@/api/admin/admin.controller';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.patch('/toggle/:slug', validateRequest('query', ToggleProjectSchema), toggleProject);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);
  return app;
};
