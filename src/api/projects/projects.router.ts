import { Router } from 'express';
import { getProjects, getProject, createProject, createProjects } from './projects.controller';

export default (): Router => {
  const app = Router();

  // GET routes
  app.get('/', getProjects);
  app.get('/:slug', getProject);

  // POST routes
  app.post('/', createProject);
  app.post('/:slug', createProjects);

  return app;
};
