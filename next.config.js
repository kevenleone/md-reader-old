const withPlugins = require("next-compose-plugins");
const withImages = require('next-images')

const nextConfig = {
  exportPathMap: false
};

const images = withImages({
  esModules: true,
})

module.exports = withPlugins(
  [images],
  nextConfig
);
