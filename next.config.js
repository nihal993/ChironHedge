/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/news-ai',
        destination: `http://localhost:5000/api/news-ai`,
      },
    ];
  },
};

export default nextConfig;