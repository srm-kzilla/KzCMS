import authenticateToken from '@/shared/middlewares/authentication';
import { upload } from '@/shared/middlewares/multer';
import { validateRequest } from '@/shared/middlewares/validator';
import { ProjectMetadataSchema, ProjectSlugSchema } from '@/shared/types';
import { Router } from 'express';
import {
  createProject,
  createProjectData,
  deleteProject,
  deleteProjectData,
  getAllProjects,
  getProject,
  updateProjectData,
  updateProjectImage,
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

  app.get('/:slug', getProject);

  app.patch('/:slug/data', authenticateToken(), updateProjectData);
  app.patch('/:slug/:title/image', authenticateToken(), upload.single('image'), updateProjectImage);
  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
  app.post(
    '/:slug',
    authenticateToken(),
    validateRequest('params', ProjectSlugSchema),
    upload.single('image'),
    createProjectData,
  );

  app.delete(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('params', ProjectSlugSchema),
    deleteProject,
  );

  app.delete('/:slug/data', authenticateToken(), validateRequest('params', ProjectSlugSchema), deleteProjectData);

  return app;
};
