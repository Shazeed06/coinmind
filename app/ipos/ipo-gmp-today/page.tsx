import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import IpoGmpTracker from "@/components/IpoGmpTracker";
import IpoDematCta from "@/components/IpoDematCta";

export const metadata: Metadata = {
  title: { absolute: "IPO GMP Today: Live Grey Market Premium Tracker (Nov 2026) | CoinMind" },
  description:
    "Live IPO GMP today for all open and upcoming IPOs in India (November 2026). Track real-time grey market premium, expected listing price, and profit per lot.",
  keywords: [
    "IPO GMP today",
    "grey market premium today",
    "latest IPO GMP",
    "IPO GMP list",
    "IPO GMP today India",
    "today IPO grey market premium",
    "IPO GMP live",
    "mainboard IPO GMP",
    "upcoming IPO GMP November 2026",
    "NTPC green energy IPO GMP",
    "Zepto IPO GMP",
  ],
  alternates: { canonical: `${site.url}/ipos/ipo-gmp-today` },
  openGraph: {
    locale: "en_IN",
    title: "IPO GMP Today: Live Grey Market Premium Tracker (Nov 2026)",
    description:
      "Live grey market premium today for every open and upcoming IPO in India: NTPC Green, Jio, Zepto, Swiggy, and more. Track estimated listing gains and profit per lot.",
    url: `${site.url}/ipos/ipo-gmp-today`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO GMP Today: Live Grey Market Premium Tracker (Nov 2026)",
    description: "Live grey market premium today for every open and upcoming IPO in India with implied listing price and profit per lot.",
    images: ["/opengraph-image"],
  },
};

const LAST_UPDATED = "15 November 2026";

const FAQS = [
  {
    q: "What is the IPO GMP today?",
    a: "As of November 2026, active IPOs with strong grey market premium include NTPC Green Energy, Zepto, Swiggy and Reliance Jio Platforms. GMP reflects unofficial investor sentiment and implied listing gains over the upper price band. GMP changes daily depending on institutional subscription numbers and market conditions.",
  },
  {
    q: "How is the expected listing price calculated using GMP?",
    a: "The formula is: Estimated Listing Price = Upper Price Band + Grey Market Premium (GMP). For example, if an IPO's upper price band is ₹450 and its GMP is ₹125, the expected listing price is ₹575 (+27.8% gain).",
  },
  {
    q: "Is a high GMP a guarantee of listing gains?",
    a: "No. GMP is informal grey-market sentiment, not a guarantee. High GMP indicates strong buyer demand, but the actual listing price on BSE and NSE depends on final subscription numbers and broad stock market sentiment on listing day.",
  },
  {
    q: "How to calculate expected profit per lot from GMP?",
    a: "Multiply the GMP amount by the Lot Size (shares per lot). For example, if the lot size is 33 shares and the GMP is ₹125, the estimated profit per retail application lot is: 33 × ₹125 = ₹4,125.",
  },
  {
    q: "Where can I check official IPO allotment status?",
    a: "You can check official allotment status directly on the registrar portal (Link Intime or KFintech) or on the BSE India / NSE websites using your PAN or application number. Always verify on official exchange and registrar portals.",
  },
];

export default function IpoGmpTodayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IPO GMP Today - Live Grey Market Premium Tracker for India",
    description:
      "Real-time grey market premium (GMP) today for all open and upcoming IPOs in India, with implied listing price, profit per lot, and allotment verification links.",
    url: `${site.url}/ipos/ipo-gmp-today`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-11-15",
    mainEntityOfPage: `${site.url}/ipos/ipo-gmp-today`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "IPO Tracker", item: `${site.url}/ipos` },
      { "@type": "ListItem", position: 3, name: "IPO GMP Today", item: `${site.url}/ipos/ipo-gmp-today` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[960px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-5 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <span>IPO GMP Today</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Market Quotes · {LAST_UPDATED}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            IPO GMP Today: Live Grey Market Premium Tracker
          </h1>
          <p className="mt-3 text-text-muted max-w-[720px] leading-relaxed">
            Real-time grey market premium (GMP) for open and upcoming Mainboard and SME IPOs in India. Check estimated listing gains, profit per lot, and official allotment links updated daily.
          </p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[960px] py-8 sm:py-12 space-y-8">

          {/* Interactive Live GMP Tracker Tool */}
          <IpoGmpTracker />

          {/* Demat CTA Hook */}
          <IpoDematCta />

          {/* Understanding GMP Guide */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-text">How to Read IPO GMP & Calculate Listing Gains</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Grey Market Premium (GMP) is the unofficial rate at which IPO applications and shares are traded prior to their formal stock exchange listing. If an issue has an upper price band of <strong className="text-text">₹500</strong> and a GMP of <strong className="text-emerald-600 font-bold">+₹100</strong>, market participants expect the share to list around <strong className="text-text">₹600 (+20%)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Formula 1</span>
                <p className="font-bold text-text text-sm mt-1">Estimated Listing Price</p>
                <p className="text-xs text-brand font-mono mt-1 font-semibold">Upper Band + Live GMP</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Formula 2</span>
                <p className="font-bold text-text text-sm mt-1">Expected Listing Gain (%)</p>
                <p className="text-xs text-emerald-600 font-mono mt-1 font-semibold">(GMP ÷ Upper Band) × 100</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Formula 3</span>
                <p className="font-bold text-text text-sm mt-1">Estimated Profit Per Lot</p>
                <p className="text-xs text-sky-600 font-mono mt-1 font-semibold">Lot Size × Live GMP</p>
              </div>
            </div>
          </div>

          {/* Important Caveat */}
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 text-amber-900 text-xs leading-relaxed space-y-1.5">
            <h3 className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
              ⚠️ Essential Regulatory Disclaimer on Grey Market Trading
            </h3>
            <p>
              The grey market is informal and entirely unregulated by the Securities and Exchange Board of India (SEBI), BSE, or NSE. Quoted GMP values reflect dealer sentiment and do not guarantee actual listing returns. Always base investment decisions on company financials in the Red Herring Prospectus (RHP).
            </p>
          </div>

          {/* FAQ Section */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions (IPO GMP)</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-text text-sm">{q}</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
