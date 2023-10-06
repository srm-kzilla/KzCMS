import server from '@/utils/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parsedCookies = parseCookies({ req });

  if (req.method === 'PATCH') {
    try {
      const { email } = req.body;
      const { token } = parsedCookies;
      await server.patch(
        `/api/admin/verify`,
        {
          email,
          verify: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.status(200).json({
        message: 'User Verified Successfully',
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}
