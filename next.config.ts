import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // required for static export
  images: {
    unoptimized: true, // Cloudflare Pages doesn’t optimize images by default
  },
};

export default nextConfig;
