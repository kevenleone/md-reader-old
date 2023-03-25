import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/util";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { featured, fileUrl, folderId, name, userId } = req.body;

      const article = await prisma.articles.create({
        data: {
          featured,
          fileUrl,
          folderId,
          name,
          slug: slugify(name),
          userId,
        },
      });

      return res.status(200).json({ article });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
