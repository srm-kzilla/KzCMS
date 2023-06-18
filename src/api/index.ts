import { Router } from 'express';
import authRouter from './auth/auth.router';
import projectsRouter from './projects/projects.router';
import adminRouter from './admin/admin.router';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter());
  app.use('/projects', projectsRouter());
  app.use('/users', adminRouter());
  
  return app;
};
