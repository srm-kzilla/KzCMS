import { Request, Response } from 'express';
import { handleUpdateUser } from './admin.service';

export async function updateUser(req: Request, res: Response) {
  const data = await handleUpdateUser();
  if (data != null) {
    res.status(200).json({
      data,
    });
  }
}
