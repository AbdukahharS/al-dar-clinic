/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aldar-api.s3.me-central-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig;
