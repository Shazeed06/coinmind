import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zepto IPO 2026: Expected Date, Price Band ₹300-350, GMP & Review | CoinMind",
  description:
    "Zepto IPO 2026 full review: ₹8,010 crore fresh issue, SEBI approved May 2026. Expected price ₹300–₹350, valuation $5.6B. Latest GMP, dates & should you apply?",
  keywords: [
    "Zepto IPO",
    "Zepto IPO 2026",
    "Zepto IPO date",
    "Zepto IPO price band",
    "Zepto IPO GMP today",
    "Zepto IPO lot size",
    "Zepto IPO review",
    "Zepto IPO listing date",
    "Zepto quick commerce IPO",
    "Zepto IPO should I apply",
    "Zepto IPO valuation",
    "Zepto DRHP",
  ],
  alternates: { canonical: `${site.url}/ipos/zepto-ipo` },
  openGraph: {
    title: "Zepto IPO 2026: Price Band, GMP, Date & Full Review",
    description:
      "Zepto quick-commerce IPO — ₹8,010 crore fresh issue + OFS, SEBI approved. Expected price ₹300–350, valuation $5.6B. Full review.",
    url: `${site.url}/ipos/zepto-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Total Issue Size", value: "~₹11,000–₹12,000 crore" },
  { label: "Fresh Issue", value: "₹8,010 crore" },
  { label: "Offer for Sale (OFS)", value: "~₹3,000–₹4,000 crore (promoter/investor exit)" },
  { label: "Expected Price Band", value: "₹300–₹350 per share (unconfirmed)" },
  { label: "Expected Valuation", value: "$5.5–$6 billion" },
  { label: "DRHP Filed", value: "25 December 2025 (updated June 9, 2026)" },
  { label: "SEBI Approval", value: "8 May 2026" },
  { label: "Expected Open Date", value: "TBA (Oct–Dec 2026 window)" },
  { label: "Exchange", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Promoters", value: "Aadit Palicha & Kaivalya Vohra (co-founders)" },
  { label: "GMP (Indicative)", value: "Active grey market expected 2–3 weeks before open" },
];

const PROS = [
  "Quick commerce leader — operates in 40+ Indian cities with 10-minute delivery promise",
  "Fastest-growing food & grocery delivery platform; competition directly with Blinkit, Swiggy Instamart",
  "₹8,010 Cr entirely fresh issue — all funds go into business expansion, no promoter cashout from fresh proceeds",
  "Revenue grew sharply YoY; moving towards profitability with improving unit economics",
  "Strong backer base: Y Combinator, Glade Brook, Nexus, Motilal Oswal, Avenir Growth",
  "Valuation cut from $7B to $5.6B — more realistic multiple vs Blinkit (part of Zomato) comparables",
];

const CONS = [
  "Not yet profitable — still burning cash to scale; EBITDA positive timeline uncertain",
  "Intense competition: Blinkit (Zomato), Swiggy Instamart, BigBasket Now, JioMart Express",
  "Customer acquisition and retention costs remain high in quick commerce",
  "Unit economics depend on high order frequency and basket size — vulnerable to consumer slowdowns",
  "OFS component means some early investors and employees are exiting",
  "Quick commerce regulatory risks: local body restrictions on dark stores in some cities",
];

const FAQS = [
  {
    q: "What is Zepto IPO price band?",
    a: "The official price band has not been announced. Based on analyst estimates and the company's last valuation of ~$5.6 billion, the price is expected in the ₹300–₹350 range per share. Final price band will be disclosed in the RHP.",
  },
  {
    q: "When will Zepto IPO open?",
    a: "SEBI approved Zepto's IPO on May 8, 2026. No formal subscription dates have been announced. Analysts expect the IPO to open between October and December 2026 based on market conditions.",
  },
  {
    q: "What is Zepto's business model?",
    a: "Zepto operates a quick-commerce platform delivering groceries, fruits, vegetables, and daily essentials in 10 minutes using a dark store (micro-warehouse) network across 40+ Indian cities.",
  },
  {
    q: "How much is Zepto's issue size?",
    a: "Zepto plans a total raise of ₹11,000–₹12,000 crore: ₹8,010 crore as a fresh issue and the rest as an Offer for Sale (OFS) by existing shareholders.",
  },
  {
    q: "Is Zepto IPO a good investment?",
    a: "Zepto is a high-growth, high-risk IPO. It's in a fast-growing segment but not yet profitable. Suitable for investors with higher risk appetite who believe quick commerce will become mainstream in India. Compare with Blinkit (Zomato subsidiary) performance before deciding.",
  },
  {
    q: "What will Zepto use the IPO proceeds for?",
    a: "Zepto intends to use the fresh issue proceeds primarily for expanding its dark store network, technology infrastructure, customer acquisition, and general corporate purposes including working capital.",
  },
];

export default function ZeptoIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Zepto IPO 2026: Expected Date, Price Band, GMP & Complete Review",
    description:
      "Full analysis of Zepto IPO — ₹8,010 crore fresh issue + OFS, SEBI approved May 2026, expected price ₹300–350, valuation $5.6B.",
    url: `${site.url}/ipos/zepto-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/zepto-ipo`,
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
            Zepto IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India's leading 10-minute delivery platform plans to raise ~₹11,000–₹12,000 crore.
            SEBI approved May 8, 2026. Open date to be announced.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Fresh Issue</p>
              <p className="text-xl font-bold text-white">₹8,010 Cr</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Expected Price</p>
              <p className="text-xl font-bold text-white">₹300–₹350</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Valuation</p>
              <p className="text-xl font-bold text-white">~$5.6B</p>
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
            * Details per DRHP (filed Dec 25, 2025; updated Jun 9, 2026) and SEBI approval May 8, 2026. Final price band and dates to be announced.
          </p>
        </section>

        {/* About Zepto */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">About Zepto</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              Zepto (Kiranakart Technologies Pvt. Ltd.) was founded in 2021 by Aadit Palicha and Kaivalya Vohra, both Stanford dropouts. The company pioneered <strong className="text-text">10-minute grocery delivery</strong> in India through a network of micro-warehouses (dark stores) located within 2–3 km of residential clusters.
            </p>
            <p>
              As of mid-2026, Zepto operates in <strong className="text-text">40+ Indian cities</strong> including Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, and Pune. The platform lists 8,000+ SKUs across grocery, fresh produce, personal care, and household essentials.
            </p>
            <p>
              The company raised $665 million in funding before the IPO at a $3.6B valuation in June 2024, later achieving unicorn status. Its IPO valuation of ~$5.6B (cut from an earlier $7B target) reflects investor caution around quick-commerce profitability timelines.
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros & Cons — Should You Apply?</h2>
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
            <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute investment advice. Details based on publicly available DRHP filed with SEBI. Verify all data from official SEBI/registrar sources. CoinMind does not hold any financial interest in companies mentioned.
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
