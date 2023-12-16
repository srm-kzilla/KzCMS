import server from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedCookies = parseCookies({ req });

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const { token } = parsedCookies;
      await server.patch(
        `/api/admin/update/user`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.status(200).json({
        message: "User Password Updated Successfully",
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}
