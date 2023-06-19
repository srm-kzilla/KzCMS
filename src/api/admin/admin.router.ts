import { Router } from 'express';
import { deleteUser, getUsers, updateUser, updateUserProjects, verifyUser } from './admin.controller';

export default (): Router => {
  const app = Router();

  app.patch('/:user', updateUserProjects);
  app.put('/:user/verify', verifyUser);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);

  return app;
};
