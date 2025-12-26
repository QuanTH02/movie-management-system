/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  // Enable trailing slash to match Django's requirement
  trailingSlash: true,
  // No rewrites - useApi calls backend directly at http://localhost:8000/api/
};

module.exports = nextConfig;
