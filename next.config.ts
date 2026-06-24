import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'abdulmueezdev.github.io' }
    ]
  }
};

export default nextConfig;
