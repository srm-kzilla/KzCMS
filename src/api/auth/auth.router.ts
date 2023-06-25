import { Router } from 'express';
import { addNewUser, loginExistingUser } from './auth.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import { loginSchema, newUserSchema } from '@/shared/types/auth/auth.schema';

export default (): Router => {
  const app = Router();

  app.post('/signup', validateRequest('body', newUserSchema), addNewUser);
  app.post('/login', validateRequest('body', loginSchema), loginExistingUser);

  return app;
};
