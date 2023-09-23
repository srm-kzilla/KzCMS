import { deleteUser, getToken, updateUser, updateUserProjects, verifyUser } from '@/api/admin/admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { AuthGetSchema, AuthSchema, GetTokenSchema, UpdateProjectSchema, VerifyUserSchema } from '@/shared/types';
import { Router } from 'express';

export default (): Router => {
  const app = Router();

  app.get('/get-token', validateRequest('body', GetTokenSchema), getToken);
  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);

  return app;
};
