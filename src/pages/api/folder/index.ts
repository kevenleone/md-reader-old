import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { slugify } from "@/lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

    res.send({ response });
  }

  if (req.method === "GET") {
    const { userId } = req.query;

    const folders = await prisma.folder.findMany({
      include: { Folder: true, parentFolder: true },
      where: {
        userId: Number(userId),
      },
    });

    res.send(folders);
  }

  await prisma.$disconnect();
}
