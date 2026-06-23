import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for better performance
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    sizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Enable compression
  compress: true,
  // Generate ETags for caching
  generateEtags: true,
  // Optimize for production
  reactStrictMode: true,
  // Power source maps in production for better error tracking
  productionBrowserSourceMaps: false,
  // Optimize fonts
  experimental: {
    optimizeCss: true,
    cssInlining: true,
  },
};

export default nextConfig;
