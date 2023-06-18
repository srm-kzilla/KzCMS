import { Router } from 'express';
import { updateProject, deleteProject, postImage, deleteImage } from './project.controller';

export default (): Router => {
  const app = Router();

  // update and delete projects
  app.put('/:projectSlug', updateProject);
  app.delete('/:projectSlug', deleteProject);

  // post and delete image
  app.post('/image', postImage);
  app.delete('/image', deleteImage);

  return app;
};
