import server from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parsedCookies = parseCookies({ req });
  if (req.method === 'POST') {
    try {
      const { projectName, typeName } = req.body;
      const { token } = parsedCookies;
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
}
