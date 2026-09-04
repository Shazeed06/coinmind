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
      { source: "/(.*)", headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] },
      { source: "/fonts/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/(_next/static|favicon\\.ico|icon\\.svg)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/(opengraph-image|twitter-image)(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
  async redirects() {
    return [
      // Legacy /calc/* and /tool/* prefixes for pages that were later removed.
      // These exact rules must stay ABOVE the generic prefix rules below:
      // first match wins, so without them /calc/bmi would rewrite to
      // /calculators/bmi and then take a second 301 to /calculators. Sending
      // them straight to the section index keeps every old link to a single
      // hop. Kept in sync with the removal rules further down.
      { source: "/calc/bmi", destination: "/calculators", permanent: true },
      { source: "/calc/calorie", destination: "/calculators", permanent: true },
      { source: "/calc/ideal-weight", destination: "/calculators", permanent: true },
      { source: "/calc/pregnancy-due-date", destination: "/calculators", permanent: true },
      { source: "/tool/coin-flip", destination: "/tools", permanent: true },
      { source: "/tool/random-number-generator", destination: "/tools", permanent: true },
      { source: "/tool/random-wheel", destination: "/tools", permanent: true },
      { source: "/tool/meme-generator", destination: "/tools", permanent: true },
      { source: "/tool/lorem-ipsum-generator", destination: "/tools", permanent: true },

      // Generic legacy-prefix rules. Everything not matched above maps
      // one-to-one onto a live route, so these resolve in a single hop.
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
      // Broken link fixes
      { source: "/blog/fd-vs-sip", destination: "/blog/sip-vs-lumpsum", permanent: true },

      // ── URL structure consolidation ──────────────────────────────────────
      // /sip-returns was a second top-level section for the SIP topic, sitting
      // beside the /sip hub and generating the same amounts on a second axis.
      // Merged into /sip/[slug] (the slug shapes do not collide), so the SIP
      // cluster is one hub with one child namespace. Single-hop 301s: the
      // destination returns 200 directly, no chains.
      { source: "/sip-returns", destination: "/sip", permanent: true },
      { source: "/sip-returns/:slug", destination: "/sip/:slug", permanent: true },

      // Section parents that never had an index page and returned 404. Point
      // each at the closest equivalent page rather than the homepage, so the
      // redirect stays topically relevant (and is not read as a soft 404).
      // Neither source shadows a route: there is no app/currency/page.tsx or
      // app/in-hand-salary/page.tsx, only the [slug] children, which these
      // exact-match rules do not touch.
      { source: "/currency", destination: "/calculators/currency-converter", permanent: true },
      { source: "/in-hand-salary", destination: "/calculators/take-home-salary", permanent: true },
    ];
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
