import server from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedCookies = parseCookies({ req });

  if (req.method === "PATCH") {
    try {
      const { email, verify } = req.body;
      const { token } = parsedCookies;
      await server.patch(
        `/api/admin/verify`,
        {
          email,
          verify,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.status(200).json({
        message: verify
          ? "User verified successfully"
          : "User unverified successfully",
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}
