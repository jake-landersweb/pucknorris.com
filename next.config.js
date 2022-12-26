/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  headers: () => [
    {
      // Create glob to target specific pages you want
      source: '/merch',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}

module.exports = nextConfig
