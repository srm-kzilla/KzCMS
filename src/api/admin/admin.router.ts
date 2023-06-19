import { Router } from 'express';
<<<<<<< HEAD
import { deleteUser, getUsers, updateUser, verifyUser } from './admin.controller';
=======
import { updateUser } from './admin.controller';
import { deleteUser, getUsers, updateUser } from './admin.controller';
>>>>>>> ad94f20b89ba8b92ef64af1716f180b7dcfc462b


export default (): Router => {
    const app = Router();

<<<<<<< HEAD
    app.get('/', getUsers);
    app.put('/:user/verify', verifyUser);
    app.patch('/:user', updateUser);
    app.delete('/:user', deleteUser);

    return app;
=======

  app.patch('/:user', updateUserProjects);
  app.get('/', getUsers);
  app.patch('/:user', updateUser);
  app.delete('/:user', deleteUser);


  return app;
>>>>>>> ad94f20b89ba8b92ef64af1716f180b7dcfc462b
};
