/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
