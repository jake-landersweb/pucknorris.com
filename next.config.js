/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  headers: () => [
    {
      source: '/merch',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store must-revalidate',
        },
      ],
    },
    {
      source: '/gallery',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store must-revalidate',
        },
      ],
    },
  ],
}

module.exports = nextConfig
