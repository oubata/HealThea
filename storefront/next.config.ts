import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.healthea.ca",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
    ],
  },
  async redirects() {
    return [
      // Joomla shop pattern: /index.php/shop/* → /shop/*
      {
        source: "/index.php/shop/:path*",
        destination: "/shop/:path*",
        permanent: true,
      },
      // Joomla blog pattern: /index.php/blog/* → /blog/*
      {
        source: "/index.php/blog/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
      // Joomla category pattern
      {
        source: "/index.php/categories/:path*",
        destination: "/categories/:path*",
        permanent: true,
      },
      // Generic Joomla index.php catch-all
      {
        source: "/index.php/:path*",
        destination: "/:path*",
        permanent: true,
      },
      // Common Joomla component URLs
      {
        source: "/component/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
