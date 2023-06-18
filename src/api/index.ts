import { Router } from 'express';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';
export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter());
  app.use('/users', adminRouter());
  return app;
};
