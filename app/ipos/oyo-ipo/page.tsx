import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "OYO IPO 2026 (PRISM): Expected Date, Price ₹55-58, GMP & Review | CoinMind",
  description:
    "OYO IPO 2026 (PRISM Hospitality) complete guide: ₹6,650 crore fresh issue, SEBI observation June 2026. Expected price ₹55–₹58, valuation $7–8B. Dates & review.",
  keywords: [
    "OYO IPO",
    "OYO IPO 2026",
    "PRISM IPO",
    "OYO IPO date",
    "OYO IPO price band",
    "OYO IPO GMP today",
    "OYO IPO lot size",
    "OYO IPO review",
    "OYO rooms IPO listing",
    "OYO IPO should I apply",
    "OYO IPO valuation",
    "Oravel Stays IPO",
  ],
  alternates: { canonical: `${site.url}/ipos/oyo-ipo` },
  openGraph: {
    title: "OYO IPO 2026: Price Band, GMP, Date & Full Review",
    description:
      "OYO (PRISM Hospitality) IPO — ₹6,650 crore fresh issue, SEBI observation June 2026. Full review, expected price ₹55–58.",
    url: `${site.url}/ipos/oyo-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Company Name", value: "PRISM Hospitality Ltd. (formerly OYO / Oravel Stays)" },
  { label: "Issue Size", value: "₹6,650 crore (100% Fresh Issue)" },
  { label: "Offer for Sale (OFS)", value: "Nil" },
  { label: "Expected Price Band", value: "₹55–₹58 per share (unconfirmed)" },
  { label: "Expected Valuation", value: "$7–$8 billion" },
  { label: "DRHP Updated", value: "2026 (multiple revisions after original 2023 filing)" },
  { label: "SEBI Observation Letter", value: "5 June 2026" },
  { label: "Expected Open Date", value: "TBA (Q4 2026, delayed from Aug 2026 target)" },
  { label: "Exchange", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Promoter", value: "Ritesh Agarwal (Founder & CEO)" },
  { label: "GMP", value: "Not active yet" },
];

const PROS = [
  "100% fresh issue — all ₹6,650 crore goes into business expansion and debt reduction",
  "SEBI observation received June 2026 — regulatory hurdle cleared, listing imminent",
  "Largest asset-light hospitality platform in India and Southeast Asia",
  "Turned EBITDA positive; revenue from hotels, coworking (OYO Workspaces), and holiday homes",
  "International footprint: UK (Motel 6 acquisition), USA (Leisure Inn), and Europe",
  "Valuation significantly reset from earlier $10B+ claims to realistic $7–8B range",
];

const CONS = [
  "Long IPO journey — first filed in 2021; multiple delays signal corporate governance concerns",
  "Highly leveraged; still carries significant debt even after partial repayment",
  "Asset-light model means heavy dependence on property partner relationships",
  "Ritesh Agarwal's buyback of shares in 2019 at $10B valuation raised red flags",
  "Post-COVID recovery is real but hospitality remains cyclical",
  "Competition from MakeMyTrip-listed properties, Airbnb, and domestic chains",
];

const FAQS = [
  {
    q: "What is OYO IPO price band?",
    a: "The official price band has not been announced. Based on the revised valuation of $7–8 billion and the total shares outstanding, the expected price is in the ₹55–₹58 range. This will be confirmed in the final RHP.",
  },
  {
    q: "When will OYO IPO open for subscription?",
    a: "No official dates have been announced. OYO received SEBI observation in June 2026. The original target of August 2026 was delayed. Analysts now expect Q4 2026 (October–December). Subscribe to CoinMind alerts for updates.",
  },
  {
    q: "What is PRISM Hospitality — same as OYO?",
    a: "Yes. OYO (Oravel Stays Pvt. Ltd.) rebranded its parent entity for IPO purposes. The IPO is filed under PRISM Hospitality Ltd. but the operating brand remains OYO for hotels and vacation homes.",
  },
  {
    q: "How much is OYO IPO issue size?",
    a: "OYO plans a 100% fresh issue of ₹6,650 crore. There is no OFS component, meaning no promoter or early investor exit — all money goes to the company.",
  },
  {
    q: "Is OYO IPO a good investment?",
    a: "OYO has made progress — EBITDA positive, international expansion, and a more realistic valuation. However, the delayed IPO journey, governance concerns, and competitive landscape make it a moderate-to-high risk investment. Best suited for investors with a 3–5 year horizon.",
  },
  {
    q: "What will OYO use the IPO proceeds for?",
    a: "Proceeds will be used for: (1) repayment of borrowings, (2) growth of OYO's hotel tech platform and international expansion, (3) general corporate purposes including working capital.",
  },
];

export default function OyoIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "OYO IPO 2026 (PRISM): Expected Date, Price Band, GMP & Complete Review",
    description:
      "Full analysis of OYO (PRISM Hospitality) IPO — ₹6,650 crore fresh issue, SEBI observation June 2026, expected price ₹55–58, valuation $7–8B.",
    url: `${site.url}/ipos/oyo-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/oyo-ipo`,
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
            SEBI OBS RECEIVED · Q4 2026 EXPECTED
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            OYO IPO 2026 (PRISM Hospitality)
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India's largest hospitality platform plans to raise ₹6,650 crore — 100% fresh issue.
            SEBI observation received June 2026. Dates TBA.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Issue Size</p>
              <p className="text-xl font-bold text-white">₹6,650 Cr</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Expected Price</p>
              <p className="text-xl font-bold text-white">₹55–₹58</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Valuation</p>
              <p className="text-xl font-bold text-white">$7–8B</p>
            </div>
            <div className="rounded-xl bg-orange-400/10 border border-orange-400/20 px-5 py-3 text-center">
              <p className="text-xs text-orange-300/70 mb-1">Open Date</p>
              <p className="text-xl font-bold text-orange-300">TBA</p>
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
          <h2 className="text-xl font-bold text-text mb-4">About OYO (PRISM Hospitality)</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              OYO was founded in 2013 by Ritesh Agarwal and has grown to become one of the world's largest hotel chains by property count. Operating under the PRISM Hospitality parent entity for this IPO, OYO lists <strong className="text-text">over 40 hotel-tech products</strong> that help property partners manage bookings, housekeeping, revenue, and payments.
            </p>
            <p>
              The company operates in <strong className="text-text">35+ countries</strong> through multiple brands: OYO Hotels & Homes (India), Motel 6 and Studio 6 (USA), Léman Luxury Apartments (Europe), and Sunday (vacation rentals). In India, OYO's tech platform connects 150,000+ hotels and homes across 900+ cities.
            </p>
            <p>
              After significant restructuring in 2022–23, OYO achieved EBITDA profitability and substantially reduced its workforce and cost base. The revised IPO valuation at $7–8B is a significant discount to the $10B+ it sought in 2021.
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
            <strong>Disclaimer:</strong> This page is for informational purposes only. Not investment advice. Details based on publicly available SEBI filings. Verify all data from official sources before investing.
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
