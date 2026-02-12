/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;
