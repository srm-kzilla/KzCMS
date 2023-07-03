import authenticateToken from '@/shared/middlewares/authentication';
import checkDataConflicts from '@/shared/middlewares/mongo';
import { upload } from '@/shared/middlewares/s3';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectDataSchema, ProjectSlugSchmea } from '@/shared/types/project/project.schema';
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
    // TODO: Need to validate the body as well
    upload.single('image'),
    checkDataConflicts(),
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
