const withPlugins = require("next-compose-plugins");
const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
  })

const mdx = require("next-mdx-enhanced")({
  defaultLayout: true,
  fileExtensions: ["mdx", "md"],
  rehypePlugins: [rehypePrism],
});

// you may tweak other base Next options in this object
// we are using it to tell Next to also handle .md and .mdx files
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

module.exports = withPlugins(
  [
    mdx,
    withMDX
    // you may add more plugins, and their configs, to this array
  ],
  nextConfig
);
