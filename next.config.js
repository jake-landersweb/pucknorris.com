/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
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
