/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
      },
      {
        hostname: "8hd8excs1e.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
