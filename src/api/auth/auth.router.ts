import { Router } from 'express';
import { addNewUser, loginExistingUser } from './auth.controller';

export default (): Router => {
  const app = Router();

  app.post('/signup', addNewUser);
  app.get('/login', loginExistingUser);

  return app;
};


