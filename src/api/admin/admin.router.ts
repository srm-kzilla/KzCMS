import { Router } from 'express';
import { deleteUser, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { VerifyUserSchema, DeleteUserSchema } from '@/shared/types/admin/admin.schema';
import { LoginSchema } from '@/shared/types/auth/auth.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/user/update', validateRequest('body', LoginSchema), updateUser);
  app.delete('/user', validateRequest('body', DeleteUserSchema), deleteUser);

  return app;
};
