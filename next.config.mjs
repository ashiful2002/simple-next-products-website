/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mobiledokan.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
    ],
  },
};

export default nextConfig;
