import { Router } from 'express';
import { deleteUser, getUserProjects, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { VerifyUserSchema, DeleteUserSchema, userDetailsSchema } from '@/shared/types/admin/admin.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/user', validateRequest('body', DeleteUserSchema), deleteUser);

  app.get('/user/:userid/projects', validateRequest('params', userDetailsSchema), getUserProjects);
  return app;
};
