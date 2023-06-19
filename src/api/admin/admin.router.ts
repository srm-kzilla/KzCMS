import { Router } from 'express';
import { updateUser } from './admin.controller';
import { deleteUser, getUsers, updateUser } from './admin.controller';


export default (): Router => {
  const app = Router();


  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);


  return app;
};
