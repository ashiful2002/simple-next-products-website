/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mobiledokan.com",
      },
    ],
  },
};

export default nextConfig;
