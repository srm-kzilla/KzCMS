import { Router } from 'express';
import { updateProject, deleteProject, postImage, deleteImage } from './projects.controller';

export default (): Router => {
  const app = Router();

  app.put('/:slug', updateProject);
  app.delete('/:slug', deleteProject);

  app.post('/image', postImage);
  app.delete('/image', deleteImage);

  return app;
};
