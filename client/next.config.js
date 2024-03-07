/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "randomuser.me",
      "z-p3-scontent.fsgn5-11.fna.fbcdn.net",
      "scontent.fhan3-5.fna.fbcdn.net",
    ],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

module.exports = nextConfig;
