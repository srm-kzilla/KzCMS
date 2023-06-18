import { Request, Response } from 'express';
import { handleUpdateUser } from './admin.service';

export async function updateUser(req: Request, res: Response) {
  const email = req.params.user;
  console.log(email);
  const projectSlug = req.body.projectSlug;
  const data = await handleUpdateUser({ email: email, projectSlug: projectSlug });
  res.status(200).json({
    status: 'success',
    data,
  });
}
