import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import AdSense from "@/components/AdSense";
import { GtmScript, GtmNoScript } from "@/components/Gtm";
import SiteJsonLd from "@/components/SiteJsonLd";
import GlobalSeo from "@/components/GlobalSeo";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
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
    "free online tools",
    "AI tool reviews",
  ],
  authors: [{ name: site.authorName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const pathname = h.get("x-pathname") || "/";
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full flex flex-col paper-texture">
        <GtmNoScript id={site.gtmId} />
        <SiteJsonLd />
        <GlobalSeo pathname={pathname} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics gaId={site.gaId} />
        <AdSense clientId={site.adsenseClientId} />
        <GtmScript id={site.gtmId} />
      </body>
    </html>
  );
}
