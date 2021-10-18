import { NextApiRequest, NextApiResponse } from "next";

import { getScreenshot } from "./_lib/chromium";
import { getThumbnailTemplate } from "./_lib/thumbnailTemplate";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const query = req.query;
    const title = query.title as string;
    const thumbnail_bg = (query.bg || "") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    const html = getThumbnailTemplate({ thumbnail_bg, title });

    const file = await getScreenshot(html, !process.env.AWS_REGION);

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=3155360000, max-age=3155360000"
    );

    return res.end(file);
  } catch (error) {
    console.error(error);

    return res.status(500).send("Internal Server Error");
  }
}
