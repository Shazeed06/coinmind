import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "PhonePe IPO 2026: Postponed, Expected Date, Price & Review | CoinMind",
  description:
    "PhonePe IPO 2026 guide: UDRHP filed Jan 2026, postponed Mar 2026. 100% OFS ~₹12,000 Cr, valuation $12–15B. Latest updates, expected date & should you wait?",
  keywords: [
    "PhonePe IPO",
    "PhonePe IPO 2026",
    "PhonePe IPO date",
    "PhonePe IPO price band",
    "PhonePe IPO GMP today",
    "PhonePe IPO review",
    "PhonePe IPO listing date",
    "PhonePe IPO postponed",
    "PhonePe UPI IPO",
    "PhonePe IPO valuation",
    "PhonePe IPO should I apply",
    "Walmart PhonePe IPO",
  ],
  alternates: { canonical: `${site.url}/ipos/phonepe-ipo` },
  openGraph: {
    title: "PhonePe IPO 2026: Status, Expected Price, GMP & Full Review",
    description:
      "PhonePe IPO postponed Mar 2026. 100% OFS ~₹12,000 Cr, valuation $12–15B. Latest update on expected dates.",
    url: `${site.url}/ipos/phonepe-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Issue Type", value: "100% Offer for Sale (OFS) — no fresh capital to company" },
  { label: "Total OFS Size", value: "~₹12,000 crore" },
  { label: "Selling Shareholders", value: "Walmart (majority), early investors" },
  { label: "Expected Price Band", value: "Not announced (IPO postponed)" },
  { label: "Expected Valuation", value: "$12–$15 billion" },
  { label: "UDRHP Filed", value: "January 2026" },
  { label: "IPO Status", value: "Postponed (March 2026 — geopolitical volatility)" },
  { label: "Expected Open Date", value: "Uncertain — 2026 or 2027 depending on market conditions" },
  { label: "Exchange", value: "BSE + NSE (proposed)" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Promoter", value: "Walmart Inc. (majority shareholder)" },
  { label: "GMP", value: "Not active (IPO not open)" },
];

const PROS = [
  "India's #1 UPI payment app — 550+ million registered users, 40%+ UPI transaction market share",
  "Dominant fintech brand with strong recall in payments, insurance, lending, and mutual funds",
  "Profitable at operating level — PhonePe achieved operating profitability in FY2024",
  "Diversified beyond payments: PhonePe Switch (app marketplace), Indus App Store, insurance distribution",
  "Walmart-backed — world's largest retailer adds credibility and deep pockets for any emergency capital",
  "Indian financial services market at very early stage — UPI volumes expected to 3x by 2030",
];

const CONS = [
  "100% OFS — no proceeds go to PhonePe itself; entirely a Walmart and investor exit",
  "IPO already postponed once in March 2026 — signals uncertainty about optimal timing",
  "NPCI (UPI) regulations could limit monetisation pathways for dominant players",
  "Intense competition from Google Pay, Paytm, Amazon Pay, and bank-backed UPI apps",
  "Monetisation of UPI transactions heavily restricted by NPCI pricing norms",
  "Dates remain unclear even after UDRHP — could slip to 2027 based on global markets",
];

const FAQS = [
  {
    q: "Is PhonePe IPO postponed?",
    a: "Yes. PhonePe postponed its planned IPO in March 2026 citing geopolitical volatility and unfavourable global market conditions. The UDRHP (updated DRHP) had been filed in January 2026. No new date has been announced.",
  },
  {
    q: "When will PhonePe IPO open?",
    a: "No official timeline has been shared after the March 2026 postponement. Market watchers expect PhonePe to revisit the IPO in H2 2026 or early 2027 once global markets stabilise. Subscribe to CoinMind alerts for real-time updates.",
  },
  {
    q: "What is PhonePe IPO price band?",
    a: "No price band has been announced. At a targeted valuation of $12–15 billion, the price per share will depend on the total equity base. Analysts estimate the issue price could range from ₹800–₹1,200 per share, but this is speculative.",
  },
  {
    q: "Why is PhonePe IPO 100% OFS?",
    a: "100% OFS means all IPO proceeds go to selling shareholders (primarily Walmart and early investors) — not to PhonePe itself. PhonePe management says the company is self-sufficient and doesn't need fresh capital right now. For investors, this means no balance sheet strengthening.",
  },
  {
    q: "What is PhonePe's valuation for IPO?",
    a: "PhonePe's last known valuation was $12 billion (2023 fundraise). For the IPO, Walmart and bankers are targeting $12–15 billion. This is lower than the $15B peak valuation sought earlier, reflecting market discipline.",
  },
  {
    q: "How is PhonePe different from Paytm (listed)?",
    a: "PhonePe is purely UPI/payments focused with 40%+ market share vs Paytm's diversified-but-troubled fintech model. PhonePe has no lending book, operates UPI core + insurance + mutual fund distribution. It is considered less risky than Paytm operationally, but also less diversified in revenue.",
  },
];

export default function PhonePeIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "PhonePe IPO 2026: Postponed — Latest Status, Expected Date & Review",
    description:
      "PhonePe IPO postponed March 2026. UDRHP filed Jan 2026. 100% OFS ~₹12,000 Cr, valuation $12–15B. Latest update and review.",
    url: `${site.url}/ipos/phonepe-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/phonepe-ipo`,
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

      <section className="bg-[#0c1628] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-4">
            <Link href="/ipos" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-300">
            IPO POSTPONED · DATE UNCONFIRMED
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            PhonePe IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India's #1 UPI app with 550M+ users — IPO postponed in March 2026.
            UDRHP filed, awaiting favourable market conditions.
          </p>

          {/* Status alert */}
          <div className="mt-6 rounded-xl bg-red-500/10 border border-red-400/20 p-4">
            <p className="text-sm text-red-300 font-medium">IPO Status Update (Sep 2026)</p>
            <p className="text-sm text-red-200/70 mt-1">
              PhonePe postponed its IPO in March 2026 citing geopolitical volatility. No new dates have been announced. The UDRHP filed in January 2026 remains valid. Analysts expect a reattempt in late 2026 or early 2027.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Issue Size</p>
              <p className="text-xl font-bold text-white">~₹12,000 Cr</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Issue Type</p>
              <p className="text-xl font-bold text-white">100% OFS</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Valuation</p>
              <p className="text-xl font-bold text-white">$12–15B</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-12">

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
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mb-4">About PhonePe</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              PhonePe Private Limited is India's leading digital payments platform. Founded in 2015 and acquired by Flipkart (then Walmart) in 2016, it has grown to become <strong className="text-text">India's #1 UPI app</strong> with over 550 million registered users and 40%+ market share in UPI transaction volumes.
            </p>
            <p>
              Beyond UPI payments, PhonePe operates: <strong className="text-text">PhonePe Switch</strong> (an app marketplace allowing users to transact on 300+ apps without downloading them), Indus App Store (an alternative Android app store), insurance distribution through PhonePe Insurance Broking, and mutual fund investments.
            </p>
            <p>
              Walmart holds ~85% stake post-Flipkart acquisition. PhonePe raised $100 million at a $12B valuation in Jan 2023 in a bridge round before the planned IPO. The company became operating-profitable in FY2024.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros & Cons — Should You Wait?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800 p-4">
              <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3">✓ Strengths</h3>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="text-sm text-green-800 dark:text-green-300 flex gap-2">
                    <span className="shrink-0 mt-0.5">•</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-4">
              <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-3">✗ Risks</h3>
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

        <section className="rounded-xl bg-surface border border-border p-4">
          <p className="text-xs text-text-muted">
            <strong>Disclaimer:</strong> For informational purposes only. Not investment advice. IPO postponed; no official dates confirmed as of September 2026. Verify from official sources before investing.
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
