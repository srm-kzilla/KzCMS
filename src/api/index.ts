import { Router } from 'express';
import authRouter from './auth/auth.router';
import projectRouter from './projects/project.router';
export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter());
  app.use('/projects', projectRouter());
  return app;
};
