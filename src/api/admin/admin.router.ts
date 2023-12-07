import {
  createToken,
  deleteToken,
  deleteUser,
  getTokens,
  toggleProject,
  updateProjectDomains,
  updateUser,
  updateUserProjects,
  verifyUser,
} from '@/api/admin/admin.controller';
import { validateRequest } from '@/shared/middlewares/validator';
import {
  AuthGetSchema,
  AuthSchema,
  ToggleProjectSchema,
  TokenGetSchema,
  TokenUpdateSchema,
  UpdateDomainsSchema,
  UpdateProjectSchema,
  VerifyUserSchema,
} from '@/shared/types';
import { Router } from 'express';

export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.patch('/update/project/allowed-domains', validateRequest('body', UpdateDomainsSchema), updateProjectDomains);
  app.patch('/toggle/project', validateRequest('body', ToggleProjectSchema), toggleProject);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);

  app.get('/tokens', validateRequest('body', TokenGetSchema), getTokens);
  app.post('/tokens/create', validateRequest('body', TokenUpdateSchema), createToken);
  app.delete('/tokens/delete', validateRequest('body', TokenUpdateSchema), deleteToken);

  return app;
};
