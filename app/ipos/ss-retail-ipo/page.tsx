import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SS Retail IPO 2026: GMP ₹138 (+33%), Allotment & Listing Sep 23 | CoinMind",
  description:
    "SS Retail IPO listing Sep 23 2026. Price ₹403–₹424, GMP ₹138 (+33%), subscribed 108.69x. Check allotment status, expected listing price & full review.",
  keywords: [
    "SS Retail IPO",
    "SS Retail IPO GMP today",
    "SS Retail IPO allotment",
    "SS Retail IPO listing date",
    "SS Retail IPO price band",
    "SS Retail IPO review",
    "SS Retail IPO subscription status",
    "SS Retail listing September 2026",
    "SS Retail IPO expected listing price",
    "SS Retail IPO lot size",
  ],
  alternates: { canonical: `${site.url}/ipos/ss-retail-ipo` },
  openGraph: {
    title: "SS Retail IPO 2026: GMP ₹138, Listing Sep 23 & Allotment Status",
    description:
      "SS Retail IPO listing Sep 23 — GMP ₹138 (+33%), subscribed 108.69x, price band ₹403–₹424. Full allotment guide.",
    url: `${site.url}/ipos/ss-retail-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Issue Size", value: "~₹148 crore (SME IPO)" },
  { label: "Price Band", value: "₹403–₹424 per share" },
  { label: "Lot Size", value: "35 shares" },
  { label: "Min. Investment (Retail)", value: "₹14,840 (1 lot at ₹424)" },
  { label: "Open Date", value: "16 September 2026" },
  { label: "Close Date", value: "18 September 2026" },
  { label: "Allotment Date", value: "19 September 2026" },
  { label: "Listing Date", value: "23 September 2026 (NSE SME)" },
  { label: "Subscription", value: "108.69x (overall)" },
  { label: "GMP (20 Sep 2026)", value: "₹138 → indicative listing ₹562 (+33%)" },
  { label: "Issue Type", value: "Book Built (Fresh Issue + OFS)" },
  { label: "Exchange", value: "NSE Emerge (SME platform)" },
  { label: "Category", value: "SME IPO" },
];

const CATEGORY_SUB = [
  { cat: "QIB", sub: "~200x" },
  { cat: "NII / HNI", sub: "~180x" },
  { cat: "Retail", sub: "~60x" },
];

const PROS = [
  "Extremely strong subscription at 108.69x — massive institutional and retail demand",
  "GMP ₹138 (+33%) signals strong grey market confidence for listing day performance",
  "SME IPOs with high subscription ratios historically list at 15–40% premium",
  "Retail segment subscribed ~60x — broad-based demand, not just institutional",
];

const CONS = [
  "SME IPO — lower liquidity post-listing compared to mainboard IPOs",
  "High GMP-based expectations can lead to volatile post-listing corrections",
  "Small issue size (~₹148 crore) — price can be volatile with low trading volumes",
  "After high-subscription SME IPOs, allotment probability for retail is very low (1 lot per applicant)",
];

const ALLOTMENT_STEPS = [
  "Visit NSE Emerge website: nseindia.com/market-data/sme/ipo-allotment-status",
  "OR BSE website: bseindia.com → Investors → Application Status",
  "OR registrar's website: Link Intime (linkintime.co.in) or KFin Technologies (kfintech.com)",
  "Enter your Application Number, PAN, or DP/Client ID and check status",
  "Allotment date: September 19, 2026. Refunds credited by September 22, 2026.",
];

const FAQS = [
  {
    q: "What is the SS Retail IPO GMP today?",
    a: "As of September 20, 2026, SS Retail IPO GMP (Grey Market Premium) is approximately ₹138 per share, which translates to an indicative listing price of around ₹562 (+33% over the issue price of ₹424). GMP can change rapidly — check live GMP sources for real-time updates.",
  },
  {
    q: "When is SS Retail IPO listing date?",
    a: "SS Retail IPO listing date is September 23, 2026, on NSE Emerge (NSE's SME platform). Allotment was on September 19, 2026.",
  },
  {
    q: "How to check SS Retail IPO allotment status?",
    a: "Visit the registrar's website (Link Intime: linkintime.co.in or KFin: kfintech.com), or check NSE/BSE IPO allotment status page. Enter your PAN or Application Number. Allotment finalization was on September 19, 2026.",
  },
  {
    q: "What is the SS Retail IPO lot size?",
    a: "SS Retail IPO lot size is 35 shares. Minimum investment for retail investors is ₹14,840 (35 × ₹424 = 1 lot at the upper price band).",
  },
  {
    q: "What is the expected SS Retail IPO listing price?",
    a: "Based on GMP of ₹138 on September 20, the expected listing price is around ₹562 per share (+33% over ₹424 issue price). However, actual listing price depends on market conditions on September 23. SME IPOs are volatile on listing day.",
  },
  {
    q: "Is SS Retail IPO allotment confirmed?",
    a: "Allotment was finalized on September 19, 2026. Given 108.69x subscription, most retail applicants will not receive allotment — lottery-based allotment means only ~1 in 60 retail applicants may receive shares.",
  },
];

export default function SsRetailIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SS Retail IPO 2026: GMP ₹138, Listing Sep 23 & Allotment Status",
    description:
      "SS Retail IPO subscribed 108.69x, GMP ₹138 (+33%), listing Sep 23 2026. Check allotment, expected listing price.",
    url: `${site.url}/ipos/ss-retail-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/ss-retail-ipo`,
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
          <div className="mb-4">
            <Link href="/ipos" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
            LISTING TOMORROW · SEP 23, 2026
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            SS Retail IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            Subscribed 108.69x. GMP of ₹138 suggests +33% listing premium.
            Listing on NSE Emerge: September 23, 2026.
          </p>

          {/* GMP Banner */}
          <div className="mt-6 rounded-xl bg-green-500/10 border border-green-400/20 px-5 py-4 flex items-center gap-4">
            <div>
              <p className="text-xs text-green-300/70 mb-1">GMP Today (Sep 20)</p>
              <p className="text-3xl font-bold text-green-400">+₹138</p>
              <p className="text-sm text-green-300/80">+33% over ₹424 issue price</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-white/50 mb-1">Est. Listing Price</p>
              <p className="text-2xl font-bold text-white">₹562</p>
              <p className="text-xs text-white/40">(based on GMP, not guaranteed)</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Subscription</p>
              <p className="text-xl font-bold text-white">108.69x</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Price Band</p>
              <p className="text-xl font-bold text-white">₹403–₹424</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Lot Size</p>
              <p className="text-xl font-bold text-white">35 shares</p>
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
        </section>

        {/* Subscription breakdown */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Subscription Status</h2>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORY_SUB.map(({ cat, sub }) => (
              <div key={cat} className="rounded-xl border border-border bg-surface p-4 text-center">
                <p className="text-xs text-text-muted mb-1">{cat}</p>
                <p className="text-2xl font-bold text-brand">{sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-text-muted">Overall subscription: 108.69x — indicates extremely high demand. Allotment by lottery for retail investors.</p>
        </section>

        {/* Allotment Steps */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">How to Check Allotment Status</h2>
          <ol className="space-y-3">
            {ALLOTMENT_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* GMP Disclaimer */}
        <section className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-5">
          <h2 className="text-base font-bold text-yellow-800 dark:text-yellow-300 mb-2">Understanding GMP (Grey Market Premium)</h2>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            GMP is an <strong>unofficial, unregulated indicator</strong> of expected listing performance based on grey market trading. A GMP of ₹138 (+33%) does not guarantee a ₹562 listing price. SME IPOs can be highly volatile on listing day. Always trade with caution and avoid applying solely on GMP signals.
          </p>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros & Cons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800 p-4">
              <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-3">✓ Positives</h3>
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

        <section className="rounded-xl bg-surface border border-border p-4">
          <p className="text-xs text-text-muted">
            <strong>Disclaimer:</strong> GMP data is unofficial and from grey market sources. This page is for informational purposes only. Not investment advice. Verify all data from official SEBI/NSE/registrar sources before making investment decisions.
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
