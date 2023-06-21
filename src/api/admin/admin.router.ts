import { Router } from 'express';
import { deleteUser, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '../../shared/middlewares/validator';
import { deleteUserSchema } from '../../types/admin/schema';

export default (): Router => {
  const app = Router();

  app.patch('/:user', updateUserProjects);
  app.put('/:user/verify', verifyUser);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/user', validateRequest('body', deleteUserSchema), deleteUser);

  return app;
};
