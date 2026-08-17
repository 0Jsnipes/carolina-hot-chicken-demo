/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/0Jsnipes/carolina-hot-chicken-demo/main/public/**"
      }
    ]
  }
};

export default nextConfig;
