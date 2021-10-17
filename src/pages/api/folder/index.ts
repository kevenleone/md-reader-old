import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { description, folderId, name } = req.body;

  const response = await prisma.folder.create({
    data: {
      User: { connect: { id: 22279592 } },
      description,
      name,
      ...(folderId && { parentFolder: { connect: { id: folderId } } }),
      slug: slugify(name),
    },
  });

  await prisma.$disconnect();

  res.send({ response });
}
