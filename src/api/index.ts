import authenticateToken from '@/shared/middlewares/authentication';
import { Router } from 'express';
import adminRouter from './admin/admin.router';
import authRouter from './auth/auth.router';
import dataRouter from './data/data.router';
import projectsRouter from './projects/projects.router';
import userRouter from './users/user.router';

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
  app.use('/projects', projectsRouter());
  app.use('/users', userRouter());
  app.use('/data', dataRouter());

  return app;
};
