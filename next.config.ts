import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for better performance
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
  },
  // Trailingslash for mobile app compatibility
  trailingSlash: false,
};

export default nextConfig;
