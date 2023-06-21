import { Router } from 'express';
import { addNewUser, loginExistingUser } from './auth.controller';
import { validateRequest } from '../../shared/middlewares/validator';
import { newUserSchema } from '../types/auth.schema';

export default (): Router => {
  const app = Router();

  app.post('/signup', validateRequest('body', newUserSchema), addNewUser);
  app.get('/login', loginExistingUser);

  return app;
};
