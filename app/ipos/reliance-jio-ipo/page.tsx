import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Reliance Jio IPO 2026: GMP, Price Band & Date | CoinMind" },
  description:
    "Reliance Jio IPO opens 21-23 Oct 2026. Price band â‚¹1,065-â‚¹1,119, lot 12 shares (â‚¹13,428), ~â‚¹30,000 cr fresh issue. Latest GMP, allotment (26 Oct), listing (28 Oct) & should you apply.",
  keywords: [
    "Reliance Jio IPO",
    "Jio IPO 2026",
    "Jio IPO GMP today",
    "Jio IPO date",
    "Jio IPO price band",
    "Jio IPO lot size",
    "Jio IPO allotment status",
    "Jio IPO listing date",
    "Jio IPO review",
    "Jio Platforms IPO",
    "Jio IPO subscription status",
    "Jio IPO should I apply",
    "Jio IPO minimum investment",
  ],
  alternates: { canonical: `${site.url}/ipos/reliance-jio-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "Reliance Jio IPO 2026: GMP, Price Band â‚¹1,065-1,119, Date & Review",
    description:
      "India's biggest-ever IPO. Jio Platforms opens 21-23 Oct 2026 at â‚¹1,065-â‚¹1,119. Latest GMP, lot size, allotment & listing dates, expert review.",
    url: `${site.url}/ipos/reliance-jio-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliance Jio IPO 2026: GMP, Price Band â‚¹1,065-1,119, Date & Review",
    description:
      "India's biggest-ever IPO. Jio Platforms opens 21-23 Oct 2026 at â‚¹1,065-â‚¹1,119. Latest GMP, lot size, allotment & listing dates, expert review.",
  },
};

const LAST_UPDATED = "18 October 2026";

const IPO_DETAILS = [
  { label: "Price Band", value: "â‚¹1,065 - â‚¹1,119 per share" },
  { label: "Lot Size", value: "12 shares (1 lot)" },
  { label: "Min. Investment (retail)", value: "â‚¹13,428 (12 Ã- â‚¹1,119)" },
  { label: "Issue Size", value: "~â‚¹30,000 crore (fresh issue)" },
  { label: "Issue Type", value: "100% Fresh Issue (No OFS)" },
  { label: "Shares Offered", value: "~27 crore equity shares" },
  { label: "Face Value", value: "â‚¹10 per share" },
  { label: "IPO Open Date", value: "21 October 2026" },
  { label: "IPO Close Date", value: "23 October 2026" },
  { label: "Allotment Date", value: "26 October 2026 (expected)" },
  { label: "Listing Date", value: "28 October 2026 (expected)" },
  { label: "Exchanges", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "GMP (indicative)", value: "~â‚¹250 (+22%) as of 18 Oct 2026" },
];

const PROS = [
  "India's largest telecom - 524+ million subscribers as of Mar 2026, carrying ~60% of India's wireless data traffic",
  "100% fresh issue - all proceeds go to the company, no promoter or PE exit",
  "Strong listing-day sentiment: grey market premium indicating ~20-22% over the issue price (unofficial)",
  "Massive growth runway in 5G, JioFiber, JioAirFiber, and enterprise/AI services",
  "Backed by Reliance Industries' balance sheet; marquee global investors (Google, Meta, KKR, Silver Lake, PIF) already on the cap table",
  "Pan-India 5G rollout largely complete - infrastructure advantage over peers",
];

const CONS = [
  "Rich valuation (reported estimates of $114-146 billion) leaves limited margin of safety",
  "Regulatory risk: DoT/TRAI spectrum pricing and tariff rules can compress margins",
  "ARPU (average revenue per user) still among Asia's lowest - monetisation pace uncertain",
  "Reliance Group complexity - related-party-transaction scrutiny is likely",
  "Huge issue size (~â‚¹30,000 cr) means heavy retail competition and possible muted allotment odds",
  "GMP is unofficial and can swing sharply before listing - not a guarantee of listing gains",
];

const FAQS = [
  {
    q: "What is the Reliance Jio IPO price band?",
    a: "The Jio Platforms IPO price band is â‚¹1,065 to â‚¹1,119 per share. At the upper band of â‚¹1,119, one lot of 12 shares needs a minimum retail application of â‚¹13,428.",
  },
  {
    q: "When does the Jio IPO open and close?",
    a: "The Reliance Jio (Jio Platforms) IPO is scheduled to open for subscription on 21 October 2026 and close on 23 October 2026. Anchor investor bidding typically happens one working day before the retail open.",
  },
  {
    q: "What is the Jio IPO GMP today?",
    a: "As of 18 October 2026, the grey market premium (GMP) for the Jio IPO is around â‚¹250, roughly 22% over the â‚¹1,119 upper price band, implying an indicative listing price near â‚¹1,369. GMP is an unofficial, unregulated indicator that changes daily and does not guarantee the actual listing price.",
  },
  {
    q: "What is the Jio IPO lot size and minimum investment?",
    a: "The lot size is 12 shares. At the upper price band of â‚¹1,119, the minimum retail investment for 1 lot is â‚¹13,428. Retail investors can apply for a maximum of up to roughly â‚¹2 lakh (about 14 lots).",
  },
  {
    q: "When is the Jio IPO allotment and listing date?",
    a: "Allotment is expected on 26 October 2026, and listing on both BSE and NSE is expected on 28 October 2026. You can check allotment status on the registrar's website or the BSE IPO page once allotment is finalised.",
  },
  {
    q: "What is the Jio IPO issue size?",
    a: "Jio Platforms is raising approximately â‚¹30,000 crore through a 100% fresh issue of about 27 crore equity shares - making it one of India's largest-ever public offerings.",
  },
  {
    q: "Is the Jio IPO a good investment?",
    a: "Jio has strong fundamentals - 524M+ subscribers, 5G leadership, and diversified digital services - and positive grey-market sentiment. However, the valuation is aggressive and GMP can change before listing. Long-term investors may find value, but listing gains depend on market conditions. This is not investment advice; read the RHP and consult a SEBI-registered adviser.",
  },
];

export default function RelianceJioIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Reliance Jio IPO 2026: GMP Today, Price Band, Date & Complete Review",
    description:
      "Jio Platforms IPO opens 21-23 Oct 2026 at a price band of â‚¹1,065-â‚¹1,119, lot size 12 shares, ~â‚¹30,000 crore fresh issue, listing 28 Oct 2026.",
    url: `${site.url}/ipos/reliance-jio-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-09-20",
    dateModified: "2026-10-18",
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
        <div className="container-main">
          <div className="mb-4 flex items-center gap-2">
            <Link href="/ipos" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              â† IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            OPENS 21 OCT Â· SUBSCRIPTION 21-23 OCT 2026
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Reliance Jio IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India's biggest-ever IPO. Jio Platforms opens for subscription on 21 October 2026 at a price band of
            â‚¹1,065-â‚¹1,119 per share, raising about â‚¹30,000 crore. Listing expected 28 Oct on BSE &amp; NSE.
          </p>

          {/* Status banner */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Price Band</p>
              <p className="text-xl font-bold text-white">â‚¹1,065-1,119</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Lot (12 shares)</p>
              <p className="text-xl font-bold text-white">â‚¹13,428</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">GMP (18 Oct)</p>
              <p className="text-xl font-bold text-emerald-300">~â‚¹250 (+22%)</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Listing</p>
              <p className="text-xl font-bold text-white">28 Oct 2026</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/40">Last updated: {LAST_UPDATED}. GMP is unofficial &amp; indicative.</p>
        </div>
      </section>

      <div className="container-main py-10 sm:py-14 space-y-12">

        {/* Quick answer box (AEO/featured-snippet target) */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold text-text mb-2">Reliance Jio IPO - quick summary</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            The <strong className="text-text">Reliance Jio Platforms IPO</strong> opens <strong className="text-text">21 October 2026</strong> and
            closes <strong className="text-text">23 October 2026</strong>, with a price band of <strong className="text-text">â‚¹1,065-â‚¹1,119</strong> per
            share and a lot size of <strong className="text-text">12 shares (â‚¹13,428 minimum)</strong>. It is a ~â‚¹30,000 crore
            100% fresh issue. Allotment is expected on <strong className="text-text">26 Oct</strong> and listing on BSE &amp; NSE on
            <strong className="text-text"> 28 Oct 2026</strong>. The latest grey market premium (GMP) is about
            <strong className="text-text"> â‚¹250 (+22%)</strong> as of 18 Oct 2026 - unofficial and subject to daily change.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link href="/ipos/jio-ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
              â†’ Jio IPO GMP Today (live tracker)
            </Link>
            <Link href="/ipos/jio-ipo-allotment-status" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
              â†’ Jio IPO Allotment Status
            </Link>
          </div>
        </section>

        {/* Key Details */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Jio IPO Key Details</h2>
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
            * Dates and price band as reported from grey-market and IPO trackers ahead of the official RHP subscription window.
            Verify the final figures on the BSE/NSE IPO page and the registrar's site before applying.
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
              The company offers a full stack of digital services - Jio 5G, JioFiber, JioAirFiber, JioCinema, JioMart, JioSaavn, JioCloud, and enterprise solutions through Jio Business. It holds significant spectrum across sub-GHz, mid-band, and mmWave 5G bands.
            </p>
            <p>
              Key global investors include Google, Meta, KKR, Silver Lake, and Saudi Arabia's PIF, who invested at pre-IPO valuations well below the current issue. Reported valuation estimates for the IPO range from roughly $114 billion to $146 billion, which investors should weigh against near-term earnings.
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros &amp; Cons - Should You Apply?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800 p-4">
              <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                <span className="text-base">âœ“</span> Strengths
              </h3>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="text-sm text-green-800 dark:text-green-300 flex gap-2">
                    <span className="shrink-0 mt-0.5">â€¢</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-4">
              <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <span className="text-base">âœ-</span> Risks
              </h3>
              <ul className="space-y-2">
                {CONS.map((c, i) => (
                  <li key={i} className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                    <span className="shrink-0 mt-0.5">â€¢</span>{c}
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
            As of 18 October 2026, the Jio IPO GMP is around <strong>â‚¹250</strong>, implying a listing near <strong>â‚¹1,369</strong> (about 22% over the â‚¹1,119 upper band). GMP is an <strong>unofficial, unregulated indicator</strong> of market sentiment, it moves daily and does not guarantee the listing price. For the latest reading, see our{" "}
            <Link href="/ipos/jio-ipo-gmp-today" className="underline font-medium">Jio IPO GMP Today tracker</Link>.
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
            <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute investment advice. IPO details are based on publicly available grey-market trackers and regulatory filings (DRHP/RHP) and may change. Verify all data from official SEBI, BSE/NSE and registrar sources before investing. CoinMind does not hold any financial interest in companies mentioned.
          </p>
        </section>

        <div className="text-center">
          <Link href="/ipos" className="inline-flex items-center gap-2 text-brand hover:underline font-medium text-sm">
            â† View all IPOs on the CoinMind IPO Calendar
          </Link>
        </div>
      </div>
    </>
  );
}
