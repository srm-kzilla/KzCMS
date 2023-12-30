import server from "@/utils/server";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedCookies = parseCookies({
    req,
  });

  if (req.method === "POST") {
    try {
      const { projectId, name } = req.body;
      const { token } = parsedCookies;
      await server.delete("/api/admin/tokens/delete", {
        data: {
          projectId,
          name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.status(200).json({
        message: "Project Deleted Successfully",
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        return res
          .status(e.response?.status ?? 500)
          .json(e.response?.data ?? { message: e.message });
      }

      return res.status(500).json({ error: e });
    }
  }
}
