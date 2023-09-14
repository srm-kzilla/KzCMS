import authenticateToken from '@/shared/middlewares/authentication';
import { upload } from '@/shared/middlewares/multer';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectMetadataSchema, ProjectSlugSchmea } from '@/shared/types';
import { Router } from 'express';
import {
  createProject,
  createProjectData,
  deleteProject,
  deleteProjectData,
  getAllProjects,
  getProject,
  updateProjectData,
  updateProjectMetadata,
} from './projects.controller';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken({ verifyAdmin: true }), getAllProjects);
  app.patch(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('body', ProjectMetadataSchema),
    updateProjectMetadata,
  );

  app.get('/:slug', authenticateToken(), getProject);

  app.patch('/:slug/data', authenticateToken(), updateProjectData);
  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
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

  app.delete('/:slug/data', authenticateToken(), validateRequest('params', ProjectSlugSchmea), deleteProjectData);

  return app;
};
