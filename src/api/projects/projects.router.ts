import { Router } from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from './projects.controller';
import authenticateToken from '@/shared/middlewares/authentication';

export default (): Router => {
  const app = Router();

  app.get('/', authenticateToken(), getProjects);
  app.get('/:slug', authenticateToken(), getProject);

  // TODO: NEED TO DO THIS IMAGES AFTER THE NEXT MEET
  // app.post('/image', authenticateToken(), postImage);
  // app.delete('/image', authenticateToken(), deleteImage); // ig it's update images now

  // We Need to add a middleware to check if the user is admin for below routes
  app.post('/', authenticateToken({ verifyAdmin: true }), createProject);
  app.patch('/:slug', authenticateToken({ verifyAdmin: true }), updateProject);
  app.delete('/:slug', authenticateToken({ verifyAdmin: true }), deleteProject);

  return app;
};
