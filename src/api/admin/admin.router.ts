import { Router } from 'express';
import { deleteUser, getUserDetails, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { verifyUserSchema, deleteUserSchema } from '@/shared/types/admin/admin.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', verifyUserSchema), verifyUser);
  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/user', validateRequest('body', deleteUserSchema), deleteUser);

  app.get('/user/:userid', getUserDetails);

  return app;
};
