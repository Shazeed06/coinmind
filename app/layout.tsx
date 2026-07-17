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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // "optional" avoids a mid-load font swap: the browser uses the (metric-matched)
  // fallback if Inter isn't ready within ~100ms and does NOT swap afterwards, so a
  // large hero heading never reflows and pushes the page down (kills font CLS).
  display: "optional",
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
    "best AI tools",
    "AI finance tools",
    "finance news",
    "AI news",
    "personal finance",
    "investment calculator",
  ],
  authors: [{ name: site.authorName }],
  alternates: { canonical: "/" },
  openGraph: {
    // NB: no `url` here on purpose. A single root-level og:url would be
    // inherited by every child page (whose canonical differs), which Ahrefs
    // flags as "Open Graph URL not matching canonical". Pages that want an
    // og:url (homepage, programmatic pages) set their own to match canonical.
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "finance",
  ...(site.googleVerification
    ? { verification: { google: site.googleVerification } }
    : {}),
  ...(site.adsenseClientId
    ? { other: { "google-adsense-account": site.adsenseClientId } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col paper-texture">
        <GtmNoScript id={site.gtmId} />
        <SiteJsonLd />
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
