import { Router } from 'express';
import {getUser} from  './auth.controller';

export default (): Router => { 
  const app = Router();

  app.get("/", getUser)

  return app;
};
