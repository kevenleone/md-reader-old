import chrome from "chrome-aws-lambda";

const chromeExecPaths = {
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
  win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
};

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export async function getOptions(isDev: boolean): Promise<Options> {
  let options: Options;

  if (isDev) {
    options = {
      args: [],
      executablePath: chromeExecPaths[process.platform],
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
}
