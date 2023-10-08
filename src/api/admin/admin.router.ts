import { validateRequest } from '@/shared/middlewares/validator';
import {
  AuthGetSchema,
  AuthSchema,
  ToggleProjectSchema,
  UpdateProjectSchema,
  VerifyUserSchema,
  UpdateDomainsSchema,
} from '@/shared/types';
import { Router } from 'express';
import {
  deleteUser,
  toggleProject,
  updateUser,
  updateUserProjects,
  verifyUser,
  updateProjectDomains,
} from '@/api/admin/admin.controller';


export default (): Router => {
  const app = Router();

  app.patch('/verify', validateRequest('body', VerifyUserSchema), verifyUser);
  app.patch('/update/user-projects', validateRequest('body', UpdateProjectSchema), updateUserProjects);
  app.patch('/update/user', validateRequest('body', AuthSchema), updateUser);
  app.patch('/update/project/allowed-domains', validateRequest('body', UpdateDomainsSchema), updateProjectDomains);
  app.patch('/toggle/project', validateRequest('body', ToggleProjectSchema), toggleProject);
  app.delete('/user', validateRequest('body', AuthGetSchema), deleteUser);
  return app;
};
