import { Router } from 'express';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';
import projectsRouter from './projects/projects.router';
import authenticateToken from '../shared/middlewares/authentication';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter());
  app.use(
    '/admin',
    authenticateToken({
      verifyAdmin: true,
    }),
    adminRouter(),
  );
  app.use('/projects', authenticateToken(), projectsRouter());

  return app;
};
