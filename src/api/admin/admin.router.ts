import { Router } from 'express';
import { deleteUser, getUserDetails, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { verifyUserSchema, deleteUserSchema, userDetailsSchema } from '@/shared/types/admin/admin.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', verifyUserSchema), verifyUser);
  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/user', validateRequest('body', deleteUserSchema), deleteUser);

  app.get('/user/:userid', validateRequest('params', userDetailsSchema), getUserDetails);

  return app;
};
