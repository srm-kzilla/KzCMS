import { Router } from 'express';
import { deleteUser, getUsers, updateUser } from './admin.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);

  return app;
};
