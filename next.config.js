/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For static export
  output: 'export',
  // Optional: Add a trailing slash for Vercel
  trailingSlash: true,
  // Optional: Configure images
  images: {
    unoptimized: true,
  },
  // Optional: Handle SPA routing
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
