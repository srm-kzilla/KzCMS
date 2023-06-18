import { Router } from 'express';
import { getUser, addNewUser, loginExistingUser } from './auth.controller';
import { add } from 'winston';

export default (): Router => {
  const app = Router();

  app.get('/get', getUser);
  app.get('/signup', addNewUser);
  app.get('/login', loginExistingUser);

  return app;
};
