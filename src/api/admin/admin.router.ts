import { Router } from 'express';
import { deleteUser, getUsers, updateUser, verifyUser } from './admin.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getUsers);
  app.put('/:user/verify', verifyUser);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);

  return app;
};
