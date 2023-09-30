import server from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { projectName, typeName, token } = req.body;
      await server.post(
        `/api/projects`,
        {
          projectName,
          typeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.status(200).json({
        message: 'Project create successfully',
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  res.status(200).json({ name: 'John Doe' });
}
