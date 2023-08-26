import { validateRequest } from '@/shared/middlewares/validator';
import { AuthSchema } from '@/shared/types';
import { Router } from 'express';
import { addNewUser, loginExistingUser } from './auth.controller';

export default (): Router => {
  const app = Router();

  app.post('/signup', validateRequest('body', AuthSchema), addNewUser);
  app.post('/login', validateRequest('body', AuthSchema), loginExistingUser);

  return app;
};
