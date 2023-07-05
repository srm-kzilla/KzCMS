import authenticateToken from '@/shared/middlewares/authentication';
import { upload } from '@/shared/middlewares/multer';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectSlugSchmea } from '@/shared/types/project/project.schema';
import { Router } from 'express';
import {
  createProject,
  createProjectData,
  deleteProject,
  getProject,
  getProjects,
  updateProjectData,
} from './projects.controller';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken(), getProjects);
  app.get('/:slug', authenticateToken(), getProject);

  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
  app.patch('/:slug', authenticateToken({ verifyAdmin: true }), updateProjectData);

  app.post(
    '/:slug',
    authenticateToken(),
    validateRequest('params', ProjectSlugSchmea),
    upload.single('image'),
    createProjectData,
  );

  app.delete(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('params', ProjectSlugSchmea),
    deleteProject,
  );

  return app;
};
