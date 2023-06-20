import { Router } from 'express';
import { deleteUser, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';
import { validateRequest } from '../../shared/middlewares/validator';
import { verifyUserSchema } from '../../types/admin/admin-schema';

export default (): Router => {
  const app = Router();

  app.patch('/:user', updateUserProjects);
  app.put('/verify', validateRequest('body', verifyUserSchema), verifyUser);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);

  return app;
};
