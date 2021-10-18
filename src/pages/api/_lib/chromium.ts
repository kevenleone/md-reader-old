import puppeteer, { Page } from "puppeteer-core";

import { getOptions } from "./chromiumOptions";

let _page: Page | null;

async function getPage(isDev: boolean): Promise<Page> {
  if (_page) {
    return _page;
  }

  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

export async function getScreenshot(
  html: string,
  isDev: boolean
): Promise<string | void | Buffer> {
  const page = await getPage(isDev);

  await page.setViewport({ height: 630, width: 1200 });
  await page.setContent(html);

  const file = await page.screenshot({ type: "png" });

  return file;
}
