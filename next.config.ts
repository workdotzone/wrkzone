import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export as static for Capacitor/mobile app
  output: "export",
  // Image optimization for better performance
  images: {
    unoptimized: true, // Required for static export
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
  },
  // Trailingslash for mobile app compatibility
  trailingSlash: false,
};

export default nextConfig;
