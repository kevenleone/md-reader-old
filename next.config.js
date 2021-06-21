/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require("next-images");
const path = require("path");

module.exports = withImages({
  esModules: true,
  i18n: {
    defaultLocale: "en-US",
    localeDetection: true,
    locales: ["en-US", "pt-BR"],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
