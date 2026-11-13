/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // Keep ISR/data entries on disk instead of duplicating up to 50 MB in RAM.
  cacheMaxMemorySize: 0,
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
