import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProjectData,
  deleteProject,
  createProjectData,
} from './projects.controller';
import authenticateToken from '@/shared/middlewares/authentication';
import { validateRequest } from '@/shared/middlewares/validator';
import { DeleteProjectSchema } from '@/shared/types/project/project.schema';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken(), getProjects);
  app.get('/:slug', authenticateToken(), getProject);

  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
  app.patch('/:slug', authenticateToken({ verifyAdmin: true }), updateProjectData);

  app.post('/:slug', authenticateToken(), upload.single('image'), createProjectData);

  app.delete(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('params', DeleteProjectSchema),
    deleteProject,
  );

  return app;
};
