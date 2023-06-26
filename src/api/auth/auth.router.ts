import { Router } from 'express';
import { addNewUser, loginExistingUser } from './auth.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { newUserSchema } from '@/shared/types/auth/auth.schema';
import { LoginSchema, NewUserSchema } from '@/shared/types/auth/auth.schema';

export default (): Router => {
  const app = Router();

  app.post('/signup', validateRequest('body', newUserSchema), addNewUser);
  app.post('/login', loginExistingUser);
  app.post('/signup', validateRequest('body', NewUserSchema), addNewUser);
  app.post('/login', validateRequest('body', LoginSchema), loginExistingUser);
  return app;
};
