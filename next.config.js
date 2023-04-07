/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  pagesDir: "pages",
  headers: () => [
    {
      source: '/merch',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
    {
      source: '/gallery',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
    process.env.NODE_ENV === 'development'
      ? {
        source: '/_next/static/css/_app-client_src_app_globals_css.css',
        headers: [{ key: 'Vary', value: '*' }],
      }
      : undefined,
  ],
}

module.exports = nextConfig
