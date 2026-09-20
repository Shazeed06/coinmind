import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hero FinCorp IPO 2026: Price Band ₹428, Lot Size, GMP & Review | CoinMind",
  description:
    "Hero FinCorp IPO 2026 complete guide: ₹3,358 crore issue (₹1,790 Cr fresh + OFS), expected price ~₹428, lot 34 shares. Latest dates, GMP & should you apply?",
  keywords: [
    "Hero FinCorp IPO",
    "Hero FinCorp IPO 2026",
    "Hero FinCorp IPO date",
    "Hero FinCorp IPO price band",
    "Hero FinCorp IPO GMP today",
    "Hero FinCorp IPO lot size",
    "Hero FinCorp IPO review",
    "Hero FinCorp IPO listing date",
    "Hero FinCorp NBFC IPO",
    "Hero FinCorp IPO should I apply",
    "Hero FinCorp IPO allotment",
  ],
  alternates: { canonical: `${site.url}/ipos/hero-fincorp-ipo` },
  openGraph: {
    title: "Hero FinCorp IPO 2026: Price, GMP, Date & Full Review",
    description:
      "Hero FinCorp IPO — ₹3,358 crore issue, NBFC arm of Hero Group. Expected price ~₹428, lot 34 shares. Latest review.",
    url: `${site.url}/ipos/hero-fincorp-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Total Issue Size", value: "₹3,358 crore" },
  { label: "Fresh Issue", value: "₹1,790 crore" },
  { label: "Offer for Sale (OFS)", value: "~₹1,568 crore (promoter partial exit)" },
  { label: "Expected Price Band", value: "~₹428 per share (unconfirmed)" },
  { label: "Lot Size", value: "34 shares" },
  { label: "Min. Investment (Retail)", value: "~₹14,552 (34 × ₹428)" },
  { label: "DRHP Filed", value: "November 2025" },
  { label: "Expected SEBI Approval", value: "Q1–Q2 2026" },
  { label: "Expected Open Date", value: "TBA (revised from Aug 2026; Q4 2026 likely)" },
  { label: "Exchange", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Sector", value: "NBFC (Non-Banking Financial Company)" },
  { label: "GMP", value: "Not yet active" },
];

const PROS = [
  "Backed by the Hero Group — one of India's most trusted conglomerates (Hero MotoCorp, Munjal family)",
  "NBFC with diversified loan book: two-wheeler loans, personal loans, home equity, SME lending",
  "Strong pan-India distribution through Hero MotoCorp's 7,000+ dealer network",
  "Growing AUM — assets under management expanding with increasing two-wheeler penetration",
  "Fresh issue component uses funds for business growth, not just promoter exit",
  "Listing in a segment (NBFC IPOs) that historically attracts strong institutional interest",
];

const CONS = [
  "NBFC sector faces higher NPA risk in two-wheeler segment — borrowers skew lower income",
  "RBI regulatory tightening on NBFCs could impact cost of funds",
  "Significant OFS component (₹1,568 cr) — partial promoter exit dampens sentiment",
  "Competition from Bajaj Finance, Mahindra Finance, and digital-first lenders",
  "Rising interest rates can compress NIM (net interest margin)",
  "Dates keep getting pushed — originally targeted Aug 2026 but likely delayed to Q4",
];

const FAQS = [
  {
    q: "What is Hero FinCorp IPO price band?",
    a: "The official price band has not been announced. Based on DRHP estimates and analyst projections, the price is expected around ₹428 per share. This is unconfirmed and will be finalized in the RHP.",
  },
  {
    q: "What is Hero FinCorp IPO lot size?",
    a: "The expected lot size is 34 shares. At the estimated price of ₹428, the minimum retail investment would be approximately ₹14,552 for 1 lot.",
  },
  {
    q: "When will Hero FinCorp IPO open?",
    a: "Exact dates are not confirmed. The DRHP was filed in November 2025. The IPO was originally targeted for August 2026 but has been delayed. It is now expected in Q4 2026. Watch this page for updates.",
  },
  {
    q: "What is Hero FinCorp's business?",
    a: "Hero FinCorp is the NBFC arm of the Hero Group (Hero MotoCorp). It provides two-wheeler loans, personal loans, home equity loans, and SME financing primarily through Hero MotoCorp's extensive dealer network across India.",
  },
  {
    q: "Is Hero FinCorp IPO a good investment?",
    a: "Hero FinCorp has strong parentage (Hero Group) and a established distribution network. However, NBFC IPOs carry regulatory and credit risk. The partial OFS component shows some promoter exit. Suitable for moderate-risk investors with exposure to financial sector.",
  },
  {
    q: "What is Hero FinCorp's AUM?",
    a: "Hero FinCorp manages a diversified loan book — exact AUM figures will be disclosed in the RHP. As per DRHP, the company has grown consistently with improving asset quality metrics after post-COVID stress resolution.",
  },
];

export default function HeroFincorpIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Hero FinCorp IPO 2026: Price Band, GMP, Date & Complete Review",
    description:
      "Full analysis of Hero FinCorp IPO — ₹3,358 crore issue, expected price ₹428, lot 34 shares, NBFC arm of Hero Group.",
    url: `${site.url}/ipos/hero-fincorp-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/hero-fincorp-ipo`,
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
            UPCOMING · DATES TBA
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Hero FinCorp IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            NBFC arm of the Hero Group plans to raise ₹3,358 crore. DRHP filed November 2025.
            Price band and dates to be officially announced.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Issue Size</p>
              <p className="text-xl font-bold text-white">₹3,358 Cr</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Expected Price</p>
              <p className="text-xl font-bold text-white">~₹428</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Lot Size</p>
              <p className="text-xl font-bold text-white">34 shares</p>
            </div>
            <div className="rounded-xl bg-blue-400/10 border border-blue-400/20 px-5 py-3 text-center">
              <p className="text-xs text-blue-300/70 mb-1">Sector</p>
              <p className="text-xl font-bold text-blue-300">NBFC</p>
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
          <p className="mt-3 text-xs text-text-muted">* Expected price/lot size based on DRHP and analyst estimates. Final details to be announced in RHP.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-text mb-4">About Hero FinCorp</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              Hero FinCorp Limited is the financial services arm of the <strong className="text-text">Hero Group</strong>, one of India's most respected industrial conglomerates. It primarily provides <strong className="text-text">two-wheeler financing</strong> through the dealership network of Hero MotoCorp — the world's largest two-wheeler manufacturer.
            </p>
            <p>
              Beyond two-wheelers, Hero FinCorp has diversified into personal loans, home equity, and SME loans. It leverages Hero MotoCorp's <strong className="text-text">7,000+ dealer touchpoints</strong> across India for customer origination, giving it a massive distribution edge over pure-play NBFCs.
            </p>
            <p>
              The company was previously known as Hero Honda FinCorp and has grown its AUM consistently. Post-COVID NPA resolution and stricter underwriting have improved its asset quality metrics, making it IPO-ready.
            </p>
          </div>
        </section>

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
            <strong>Disclaimer:</strong> For informational purposes only. Not investment advice. Details based on DRHP; final details subject to RHP. Verify from official SEBI/registrar sources.
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
