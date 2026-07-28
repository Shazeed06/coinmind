import type { NextConfig } from "next";

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://ssl.google-analytics.com https://va.vercel-scripts.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' data: blob: https:`,
  `font-src 'self' https://fonts.gstatic.com data:`,
  `frame-src https://www.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com`,
  `connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://www.google-analytics.com https://analytics.google.com https://ssl.google-analytics.com https://va.vercel-scripts.com`,
  `manifest-src 'self'`,
  `media-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'self'`,
  `upgrade-insecure-requests`,
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-dialog"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "coinmind.in" },
      { hostname: "www.coinmind.in" },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] },
      { source: "/(.*)", headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      { source: "/(.*)", headers: [{ key: "X-XSS-Protection", value: "1; mode=block" }] },
      { source: "/(.*)", headers: [{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }] },
      { source: "/(.*)", headers: [{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] },
      { source: "/fonts/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/(_next/static|favicon\\.ico|icon\\.svg)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/(opengraph-image|twitter-image)(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/calc/:slug*", destination: "/calculators/:slug*", permanent: true },
      { source: "/tool/:slug*", destination: "/tools/:slug*", permanent: true },
      // Phase 1.3: remove medical calculators (YMYL red flag on finance site)
      { source: "/calculators/bmi", destination: "/calculators", permanent: true },
      { source: "/calculators/calorie", destination: "/calculators", permanent: true },
      { source: "/calculators/ideal-weight", destination: "/calculators", permanent: true },
      { source: "/calculators/pregnancy-due-date", destination: "/calculators", permanent: true },
      // Phase 2.1: delete entertainment utilities
      { source: "/tools/coin-flip", destination: "/tools", permanent: true },
      { source: "/tools/random-number-generator", destination: "/tools", permanent: true },
      { source: "/tools/random-wheel", destination: "/tools", permanent: true },
      { source: "/tools/meme-generator", destination: "/tools", permanent: true },
      { source: "/tools/lorem-ipsum-generator", destination: "/tools", permanent: true },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
