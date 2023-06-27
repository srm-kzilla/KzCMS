import { Router } from 'express';
import { deleteUser, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { verifyUserSchema, deleteUserSchema, updateProjectSchema } from '@/shared/types/admin/admin.schema';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', verifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', updateProjectSchema), updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/user', validateRequest('body', deleteUserSchema), deleteUser);

  return app;
};
