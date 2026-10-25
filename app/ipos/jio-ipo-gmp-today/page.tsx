import type { Metadata } from "next";
import Link from "next/link";
import IpoDematCta from "@/components/IpoDematCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Jio IPO GMP Today: Live Grey Market Premium | CoinMind" },
  description:
    "Jio Platforms IPO GMP today is ~₹250 (+22% over ₹1,119). Track the day-wise grey market premium, implied listing price, price band ₹1,065-1,119 and dates (21-23 Oct, listing 28 Oct).",
  keywords: [
    "Jio IPO GMP today",
    "Jio IPO GMP",
    "Jio Platforms IPO GMP",
    "Jio IPO grey market premium",
    "Jio IPO expected listing price",
    "Jio IPO GMP live",
    "Reliance Jio IPO GMP today",
    "Jio IPO listing gain",
  ],
  alternates: { canonical: `${site.url}/ipos/jio-ipo-gmp-today` },
  openGraph: {
    locale: "en_IN",
    title: "Jio IPO GMP Today: ₹250 (+22%) - Live Grey Market Premium",
    description:
      "Latest Jio Platforms IPO grey market premium, day-wise trend, and implied listing price. Price band ₹1,065-1,119, opens 21 Oct 2026.",
    url: `${site.url}/ipos/jio-ipo-gmp-today`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jio IPO GMP Today: ₹250 (+22%) - Live Grey Market Premium",
    description:
      "Latest Jio Platforms IPO grey market premium, day-wise trend and implied listing price. Opens 21 Oct 2026, band ₹1,065-1,119.",
  },
};

const LAST_UPDATED = "18 October 2026, 7:30 PM IST";
const UPPER_BAND = 1119;
const GMP = 250;

// Day-wise GMP trend from public grey-market trackers. Indicative only.
const GMP_TREND = [
  { date: "04 Oct 2026", gmp: 148 },
  { date: "08 Oct 2026", gmp: 170 },
  { date: "11 Oct 2026", gmp: 190 },
  { date: "13 Oct 2026", gmp: 218 },
  { date: "15 Oct 2026", gmp: 220 },
  { date: "16 Oct 2026", gmp: 225 },
  { date: "17 Oct 2026", gmp: 230 },
  { date: "18 Oct 2026", gmp: 250 },
];

const FAQS = [
  {
    q: "What is the Jio IPO GMP today?",
    a: `As of ${LAST_UPDATED}, the Jio Platforms IPO grey market premium (GMP) is around ₹${GMP}, about ${Math.round((GMP / UPPER_BAND) * 100)}% over the ₹${UPPER_BAND} upper price band. This implies an indicative listing price of roughly ₹${UPPER_BAND + GMP}. GMP is unofficial and changes daily.`,
  },
  {
    q: "What is the expected listing price of Jio IPO?",
    a: `Based on the current GMP of ₹${GMP} and the ₹${UPPER_BAND} upper band, the indicative listing price is about ₹${UPPER_BAND + GMP}. This is only a grey-market estimate, not a guarantee - the actual listing price on 28 October 2026 depends on demand and market conditions on listing day.`,
  },
  {
    q: "Is GMP a reliable indicator for Jio IPO?",
    a: "GMP reflects informal, unregulated grey-market sentiment. It can signal listing-day direction but is frequently wrong on magnitude and can swing sharply in the final days before listing. Never apply to an IPO based on GMP alone - read the RHP and assess fundamentals and valuation.",
  },
  {
    q: "What is the Jio IPO price band and lot size?",
    a: "The price band is ₹1,065-₹1,119 per share and the lot size is 12 shares, so the minimum retail application at the upper band is ₹13,428.",
  },
];

export default function JioIpoGmpTodayPage() {
  const impliedListing = UPPER_BAND + GMP;
  const gmpPct = Math.round((GMP / UPPER_BAND) * 100);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jio IPO GMP Today - Live Grey Market Premium & Expected Listing Price",
    description:
      "Latest Jio Platforms IPO grey market premium (GMP), day-wise trend and implied listing price.",
    url: `${site.url}/ipos/jio-ipo-gmp-today`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/jio-ipo-gmp-today`,
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

  const maxGmp = Math.max(...GMP_TREND.map((d) => d.gmp));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <Link href="/ipos/reliance-jio-ipo" className="hover:text-brand">Jio IPO</Link>
            <span>›</span>
            <span>GMP Today</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Jio IPO GMP Today
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            Live grey market premium (GMP) tracker for the Reliance Jio Platforms IPO. The IPO opens 21 October 2026 at a price band of ₹1,065-₹1,119 and lists on 28 October 2026.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} · <span className="text-amber-600">GMP is unofficial, unregulated and indicative only.</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* GMP headline card */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Jio IPO GMP (as of 18 Oct 2026)</p>
            <div className="mt-1 flex flex-wrap items-end gap-x-4 gap-y-1">
              <p className="text-4xl font-extrabold text-emerald-700">₹{GMP}</p>
              <p className="text-xl font-bold text-emerald-700">(+{gmpPct}%)</p>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg bg-white border border-emerald-100 p-3">
                <p className="text-xs text-text-muted">Upper Band</p>
                <p className="text-lg font-bold text-text">₹{UPPER_BAND}</p>
              </div>
              <div className="rounded-lg bg-white border border-emerald-100 p-3">
                <p className="text-xs text-text-muted">GMP</p>
                <p className="text-lg font-bold text-emerald-700">+₹{GMP}</p>
              </div>
              <div className="rounded-lg bg-white border border-emerald-100 p-3">
                <p className="text-xs text-text-muted">Implied Listing</p>
                <p className="text-lg font-bold text-text">₹{impliedListing}</p>
              </div>
              <div className="rounded-lg bg-white border border-emerald-100 p-3">
                <p className="text-xs text-text-muted">Est. Gain</p>
                <p className="text-lg font-bold text-emerald-700">+{gmpPct}%</p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 mt-3">
              Implied listing = upper band (₹{UPPER_BAND}) + GMP (₹{GMP}) = ₹{impliedListing}. This is a grey-market estimate, not the actual listing price.
            </p>
          </div>

          {/* Day-wise trend */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Jio IPO GMP - Day-wise Trend</h2>
            <div className="space-y-2">
              {GMP_TREND.map((d) => (
                <div key={d.date} className="flex items-center gap-3">
                  <span className="text-xs text-text-muted w-24 shrink-0">{d.date}</span>
                  <div className="flex-1 h-5 rounded bg-bg-alt overflow-hidden">
                    <div
                      className="h-full rounded bg-emerald-500/80 flex items-center justify-end pr-2"
                      style={{ width: `${(d.gmp / maxGmp) * 100}%` }}
                    >
                      <span className="text-[10px] font-semibold text-white">₹{d.gmp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">
              GMP has trended upward through October as subscription nears. Figures are collated from public grey-market trackers and are indicative only - they are not quoted on any exchange.
            </p>
          </div>

          {/* Quick details */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Jio IPO - Key Dates &amp; Price</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                ["Price Band", "₹1,065 - ₹1,119"],
                ["Lot Size", "12 shares (₹13,428 min)"],
                ["Open - Close", "21 - 23 Oct 2026"],
                ["Allotment", "26 Oct 2026"],
                ["Listing", "28 Oct 2026 (BSE + NSE)"],
                ["Issue Size", "~₹30,000 cr (fresh issue)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border py-2">
                  <span className="text-text-muted">{k}</span>
                  <span className="text-text font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Full Jio IPO Review →</Link>
              <Link href="/ipos/jio-ipo-allotment-status" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Jio IPO Allotment Status →</Link>
            </div>
          </div>

          {/* What is GMP */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <h2 className="font-bold text-blue-800 mb-2">What is GMP (Grey Market Premium)?</h2>
            <p className="text-sm text-blue-700 leading-relaxed">
              GMP is the extra amount (over the issue price) at which IPO shares are informally bought and sold in the unofficial grey market before listing. A GMP of ₹{GMP} means grey-market participants expect Jio to list around ₹{impliedListing}. It is <strong>not quoted on BSE/NSE</strong>, is <strong>not regulated by SEBI</strong>, and changes every day - treat it as rough sentiment, never as a promise of listing gains.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Jio IPO GMP - FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{q}</p>
                  <p className="text-sm text-text-muted mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>

          <IpoDematCta />

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> Grey Market Premium (GMP) is an informal, unregulated indicator not endorsed by SEBI, BSE or NSE. It does not predict the actual listing price. This page is educational and not investment advice. Verify all IPO data from official SEBI/exchange/registrar sources and read the RHP before investing.
            </p>
          </div>

          <div className="text-center">
            <Link href="/ipos" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline underline-offset-2">
              ← View all IPOs on the CoinMind IPO Calendar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
