import { Router } from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from './projects.controller';
import authenticateToken from '@/shared/middlewares/authentication';
import { validateRequest } from '@/shared/middlewares/validator';
import { DeleteProjectSchema } from '@/shared/types/project/project.schema';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken(), getProjects);
  app.get('/:slug', authenticateToken(), getProject);

  // TODO: NEED TO DO THIS IMAGES AFTER THE NEXT MEET

  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
  app.patch('/:slug', authenticateToken({ verifyAdmin: true }), updateProject);
  app.delete(
    '/:slug',
    authenticateToken({ verifyAdmin: true }),
    validateRequest('params', DeleteProjectSchema),
    deleteProject,
  );

  return app;
};
