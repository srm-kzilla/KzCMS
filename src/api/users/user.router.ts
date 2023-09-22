import { Router } from 'express';
import authenticateToken from '@/shared/middlewares/authentication';
import { getUserDetails, getUserProjects, getUsers } from './user.controller';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken({ verifyAdmin: true }), getUsers);
  app.get('/user', authenticateToken(), getUserDetails);
  app.get('/user/projects', authenticateToken(), getUserProjects);

  return app;
};
