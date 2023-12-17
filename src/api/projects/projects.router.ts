import authenticateToken from '@/shared/middlewares/authentication';
import { upload } from '@/shared/middlewares/multer';
import { validateRequest } from '@/shared/middlewares/validator';
import {
  CreateProjectSchema,
  ProjectDataCreateSchema,
  ProjectDataIdSchema,
  ProjectDataUpdateSchema,
  ProjectSlugSchema,
} from '@/shared/types';
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
} from './projects.controller';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken({ verifyAdmin: true }), getAllProjects);
  app.get('/:slug', authenticateToken(), validateRequest('params', ProjectSlugSchema), getProject);

  app.patch(
    '/:projectDataId/data',
    authenticateToken(),
    validateRequest('params', ProjectDataIdSchema),
    validateRequest('body', ProjectDataUpdateSchema),
    updateProjectData,
  );
  app.patch(
    '/:projectDataId/image',
    validateRequest('params', ProjectDataIdSchema),
    authenticateToken(),
    upload.single('image'),
    updateProjectImage,
  );
  app.post('/', authenticateToken({ verifyAdmin: true }), validateRequest('body', CreateProjectSchema), createProject);
  app.post(
    '/:slug',
    authenticateToken(),
    validateRequest('params', ProjectSlugSchema),
    upload.single('image'),
    validateRequest('body', ProjectDataCreateSchema),
    createProjectData,
  );

  app.delete(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('params', ProjectSlugSchema),
    deleteProject,
  );

  app.delete(
    '/:projectDataId/data',
    authenticateToken(),
    validateRequest('params', ProjectDataIdSchema),
    deleteProjectData,
  );

  return app;
};
