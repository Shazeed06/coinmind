import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reliance Jio IPO 2026: Expected Date, Price Band, GMP & Review | CoinMind",
  description:
    "Reliance Jio IPO 2026 complete guide: ₹40,000 crore issue, SEBI approved Aug 28, price expected ₹435+, valuation $130–180B. Latest GMP, dates & should you apply?",
  keywords: [
    "Reliance Jio IPO",
    "Jio IPO 2026",
    "Jio IPO date",
    "Jio IPO price band",
    "Jio IPO GMP today",
    "Jio IPO lot size",
    "Jio IPO review",
    "Jio IPO listing date",
    "Jio Platforms IPO",
    "Reliance Jio IPO subscription",
    "Jio IPO should I apply",
    "Jio IPO valuation",
  ],
  alternates: { canonical: `${site.url}/ipos/reliance-jio-ipo` },
  openGraph: {
    title: "Reliance Jio IPO 2026: Price, GMP, Date & Full Review",
    description:
      "India's most anticipated IPO — Jio Platforms ₹40,000 crore issue. SEBI approved. Latest date, GMP, valuation & expert review.",
    url: `${site.url}/ipos/reliance-jio-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Issue Size", value: "₹40,000 crore (approx.)" },
  { label: "Issue Type", value: "100% Fresh Issue (No OFS)" },
  { label: "Shares Offered", value: "~27 crore equity shares (2.9% dilution)" },
  { label: "Expected Price Band", value: "₹435+ per share (unconfirmed)" },
  { label: "Expected Valuation", value: "$130–$180 billion (₹11–15 lakh crore)" },
  { label: "DRHP Filed", value: "19 June 2026" },
  { label: "SEBI Approval", value: "28 August 2026" },
  { label: "Expected Open Date", value: "TBA (Oct–Nov 2026 window)" },
  { label: "Exchange", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Face Value", value: "₹10 per share" },
  { label: "GMP (Indicative)", value: "Not yet trading in grey market" },
];

const PROS = [
  "India's largest telecom — 524+ million subscribers as of Mar 2026, ~60% of wireless data traffic",
  "100% fresh issue — all proceeds go to the company, no promoter exit",
  "Massive growth runway in 5G services, JioFiber, JioAirFiber, and enterprise solutions",
  "Backed by Reliance Industries' balance sheet; investment-grade fundamentals",
  "Global strategic investors: Google, Meta, KKR, Silver Lake already invested at higher valuations",
  "Network infrastructure advantage — pan-India 5G rollout largely complete",
];

const CONS = [
  "Rich valuation — $130–180B price tag leaves limited room for near-term listing pop",
  "Regulatory risks: DoT, TRAI spectrum pricing could compress margins",
  "ARPU (avg revenue per user) still among Asia's lowest — monetisation pace uncertain",
  "Reliance Group complexity — RPT (related party transactions) scrutiny likely",
  "Large float (~27 cr shares) — absorption pressure on secondary market post-listing",
  "No confirmed dates yet; geopolitical or market conditions may delay further",
];

const FAQS = [
  {
    q: "What is the Reliance Jio IPO price band?",
    a: "The official price band has not been announced yet as of September 2026. Based on analyst estimates and recent fundraising rounds, the price is expected to be ₹435 or above per share, implying a valuation of $130–180 billion.",
  },
  {
    q: "When will Jio IPO open for subscription?",
    a: "No official dates have been confirmed. Jio received SEBI approval on August 28, 2026. Most analysts expect the IPO to open in October–November 2026. Watch coinmind.in for the latest updates.",
  },
  {
    q: "What is the Jio IPO issue size?",
    a: "Jio Platforms plans to raise approximately ₹40,000 crore through a 100% fresh issue of about 27 crore equity shares, representing roughly 2.9% equity dilution.",
  },
  {
    q: "What is the Jio IPO lot size?",
    a: "The lot size will be announced with the price band. For mainboard IPOs in this price range, the minimum application is typically set between ₹13,000–₹15,000 (1 lot).",
  },
  {
    q: "Is Jio IPO a good investment?",
    a: "Jio has strong fundamentals — 524M+ subscribers, 5G leadership, and diversified digital services. However, the valuation at $130–180B is aggressive. Long-term investors may find value, but listing gains depend heavily on market conditions and grey market sentiment closer to the date.",
  },
  {
    q: "Who are the lead managers for Jio IPO?",
    a: "The DRHP names Goldman Sachs, Kotak Mahindra Capital, BofA Securities, JP Morgan, and several other investment banks as book-running lead managers.",
  },
];

export default function RellianceJioIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Reliance Jio IPO 2026: Expected Date, Price Band, GMP & Complete Review",
    description:
      "Full analysis of Jio Platforms IPO — ₹40,000 crore fresh issue, SEBI approved Aug 28 2026, expected price ₹435+, valuation $130–180B.",
    url: `${site.url}/ipos/reliance-jio-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/reliance-jio-ipo`,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-[#0c1628] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4 flex items-center gap-2">
            <Link href="/ipos" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            SEBI APPROVED · DATES AWAITED
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Reliance Jio IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India's most anticipated IPO — Jio Platforms plans to raise ₹40,000 crore.
            SEBI approved Aug 28, 2026. Price and dates to be announced.
          </p>

          {/* Status banner */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Issue Size</p>
              <p className="text-xl font-bold text-white">₹40,000 Cr</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Expected Price</p>
              <p className="text-xl font-bold text-white">₹435+</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Valuation</p>
              <p className="text-xl font-bold text-white">$130–180B</p>
            </div>
            <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-5 py-3 text-center">
              <p className="text-xs text-yellow-300/70 mb-1">Open Date</p>
              <p className="text-xl font-bold text-yellow-300">TBA</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-12">

        {/* Key Details */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">IPO Key Details</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {IPO_DETAILS.map(({ label, value }, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-surface" : "bg-transparent"}>
                    <td className="px-4 py-3 text-text-muted font-medium w-1/2">{label}</td>
                    <td className="px-4 py-3 text-text font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            * Details as per DRHP filed June 19, 2026 and SEBI approval Aug 28, 2026. Final price band and dates subject to announcement.
          </p>
        </section>

        {/* About Jio */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">About Jio Platforms</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              Jio Platforms Limited (JPL) is India's largest digital connectivity and services platform, operating through its wholly owned subsidiary Reliance Jio Infocomm Limited (RJIL). As of March 31, 2026, Jio serves over <strong className="text-text">524 million subscribers</strong> and carries approximately 60% of India's wireless data traffic.
            </p>
            <p>
              The company offers a full stack of digital services — Jio 5G, JioFiber, JioAirFiber, JioCinema, JioMart, JioSaavn, JioCloud, and enterprise solutions through Jio Business. It holds significant spectrum across sub-GHz, mid-band, and mmWave 5G bands.
            </p>
            <p>
              Key global investors include Google ($4.5B), Meta ($5.7B), KKR ($1.5B), Silver Lake ($1.5B), and Saudi Arabia's PIF — all at pre-IPO valuations of $57–65 billion, making the current IPO at $130–180B a significant step-up.
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros & Cons — Should You Apply?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800 p-4">
              <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                <span className="text-base">✓</span> Strengths
              </h3>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="text-sm text-green-800 dark:text-green-300 flex gap-2">
                    <span className="shrink-0 mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-4">
              <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <span className="text-base">✗</span> Risks
              </h3>
              <ul className="space-y-2">
                {CONS.map((c, i) => (
                  <li key={i} className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                    <span className="shrink-0 mt-0.5">•</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GMP Note */}
        <section className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-5">
          <h2 className="text-base font-bold text-blue-800 dark:text-blue-300 mb-2">About GMP (Grey Market Premium)</h2>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            GMP for Jio IPO is not yet active since the price band hasn't been announced. Once subscription dates and price band are confirmed, grey market trading typically begins 1–2 weeks before the open date. GMP is an <strong>unofficial, unregulated indicator</strong> of market sentiment and does not guarantee listing price.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-text mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-text mb-2">{q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-xl bg-surface border border-border p-4">
          <p className="text-xs text-text-muted">
            <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute investment advice. IPO details are based on publicly available regulatory filings (DRHP/RHP). Verify all data from official SEBI/registrar sources before investing. CoinMind does not hold any financial interest in companies mentioned.
          </p>
        </section>

        <div className="text-center">
          <Link href="/ipos" className="inline-flex items-center gap-2 text-brand hover:underline font-medium text-sm">
            ← View All IPOs for September 2026
          </Link>
        </div>
      </div>
    </>
  );
}
