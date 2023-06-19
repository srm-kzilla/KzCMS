import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  createProjects,
  updateProject,
  deleteProject,
  postImage,
  deleteImage,
} from './projects.controller';

export default (): Router => {
  const app = Router();

  app.get('/', getProjects);
  app.get('/:slug', getProject);

  app.post('/', createProject);
  app.post('/:slug', createProjects);

  app.put('/:slug', updateProject);
  app.delete('/:slug', deleteProject);

  app.post('/image', postImage);
  app.delete('/image', deleteImage);

  return app;
};
