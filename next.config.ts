import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The spine film is fully server-rendered so it is legible to crawlers and
  // screen readers before a single byte of motion JavaScript arrives.
  images: {
    formats: ["image/avif", "image/webp"],
    // Remote patterns are declared per-source as real photography is wired in.
    remotePatterns: [],
  },
  experimental: {
    // Framer Motion ships large; tree-shake aggressively at the package boundary.
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
