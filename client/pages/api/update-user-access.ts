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
      const { projectSlug, userAccess } = req.body;
      console.log({projectSlug, userAccess});
      const { token } = parsedCookies;
      const response = await server.patch(
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
      console.log("RES", response.data);
      return res.status(200).json({
        message: "User's Access Updated Successfully",
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
}
