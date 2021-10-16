/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com", "github.com"],
  },
  experimental: {
    esmExternals: true,
    swcLoader: true,
    swcMinify: true,
  },
};
