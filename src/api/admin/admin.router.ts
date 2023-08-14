import { Router } from 'express';
import { deleteUser, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { VerifyUserSchema, AuthGetSchema, AuthSchema, UpdateProjectSchema } from '@/shared/types';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);

  return app;
};
