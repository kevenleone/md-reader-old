import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = (req.body.slug || req.query.slug) as string;

    if (req.method === "POST") {
      const newOrUpdatedViews = await prisma.views.upsert({
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
        where: { slug },
      });

      await prisma.$disconnect();

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString(),
      });
    }

    if (req.method === "GET") {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      await prisma.$disconnect();

      return res
        .status(200)
        .json({ total: views ? views.count.toString() : 1 });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
