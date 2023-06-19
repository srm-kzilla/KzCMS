import { Router } from 'express';
import { updateUser } from './admin.controller';

export default (): Router => {
  const app = Router();

  app.patch('/:user', updateUser);

  return app;
};
