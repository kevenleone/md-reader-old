const withPlugins = require("next-compose-plugins");

const nextConfig = {
  exportPathMap: false
};

module.exports = withPlugins(
  [],
  nextConfig
);
