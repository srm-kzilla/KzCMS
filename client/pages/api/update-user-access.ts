import server from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      const { projectSlug, userAccess, token } = req.body;
      await server.patch(
        `/api/admin/update/user-projects`,
        {
          projectSlug,
          userAccess,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.status(200).json({
        message: "User's access updated successfully",
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  res.status(200).json({ name: 'John Doe' });
}
