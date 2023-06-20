import { Router } from 'express';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';
import projectsRouter from './projects/projects.router';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter());
  app.use('/users', adminRouter());
  app.use('/projects', projectsRouter());

  return app;
};
