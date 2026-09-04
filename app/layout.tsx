import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import AdSense from "@/components/AdSense";
import { GtmScript, GtmNoScript } from "@/components/Gtm";
import SiteJsonLd from "@/components/SiteJsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

// Headings previously used --font-display, which resolved to Inter, the same
// face as body copy. Nothing separated a heading from a paragraph except size,
// so the pages read flat. Plus Jakarta Sans is geometric and a little warmer
// than Inter, which gives headings their own voice while staying sober enough
// for a finance site. Only the weights the type scale actually uses are loaded.
const display = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "SIP calculator",
    "EMI calculator",
    "income tax calculator",
    "FD calculator",
    "PPF calculator",
    "NPS calculator",
    "retirement calculator",
    "personal finance India",
    "free financial calculators",
    "finance guides",
  ],
  authors: [{ name: site.authorName, url: `${site.url}/authors/sahil` }],
  // No default `alternates` here on purpose. Next.js REPLACES alternates rather
  // than merging it, so a default canonical of "/" is inherited verbatim by
  // every route that does not set its own, pointing the whole site at the
  // homepage. Each route declares its own canonical (the homepage via HOME in
  // lib/seo.ts); a route with none simply gets no canonical tag, which is safe.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline, type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true },
  category: "finance",
  ...(site.googleVerification
    ? { verification: { google: site.googleVerification } }
    : {}),
  ...(site.adsenseClientId
    ? { other: { "google-adsense-account": site.adsenseClientId } }
    : {}),
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
};

// Deliberately NOT async and deliberately free of headers()/cookies(): reading
// a request header here opts every route in the app into dynamic rendering.
// Route-level structured data lives in the shared page layouts instead
// (CalcPage, ToolPageLayout, HubPage) and in the individual [slug] pages.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="help" type="text/plain" href="/llms.txt" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <GtmNoScript id={site.gtmId} />
        <SiteJsonLd />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics gaId={site.gaId} />
        <AdSense clientId={site.adsenseClientId} />
        <GtmScript id={site.gtmId} />
      </body>
    </html>
  );
}
