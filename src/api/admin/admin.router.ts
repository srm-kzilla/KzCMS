import { Router } from 'express';
import { deleteUser, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { VerifyUserSchema, DeleteUserSchema, AuthSchema, UpdateProjectSchema } from '@/shared/types/admin/admin.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/user/update', validateRequest('body', AuthSchema), updateUser);
  app.delete('/user', validateRequest('body', DeleteUserSchema), deleteUser);

  return app;
};
