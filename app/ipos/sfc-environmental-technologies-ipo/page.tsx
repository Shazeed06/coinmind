import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import IpoDematCta from "@/components/IpoDematCta";

export const metadata: Metadata = {
  title: { absolute: "SFC Environmental Technologies IPO 2026: GMP, Price Band & Date | CoinMind" },
  description:
    "SFC Environmental Technologies IPO opens 27-29 Oct 2026. Price band ₹313-₹330, lot 45 shares (₹14,850), ₹667.53 cr issue. Latest GMP, allotment (30 Oct), listing (3 Nov) & should you apply.",
  keywords: [
    "SFC Environmental Technologies IPO",
    "SFC Environmental IPO GMP",
    "SFC Environmental IPO GMP today",
    "SFC Environmental IPO price band",
    "SFC Environmental IPO date",
    "SFC Environmental IPO allotment status",
    "SFC Environmental IPO listing date",
    "SFC Environmental IPO review",
    "SFC Environmental IPO lot size",
  ],
  alternates: { canonical: `${site.url}/ipos/sfc-environmental-technologies-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "SFC Environmental Technologies IPO 2026: GMP, Price Band ₹313-330, Date & Review",
    description:
      "Water & wastewater-treatment specialist. SFC Environmental Technologies IPO opens 27-29 Oct 2026 at ₹313-₹330. Latest GMP, allotment & listing dates, review.",
    url: `${site.url}/ipos/sfc-environmental-technologies-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "SFC Environmental Technologies IPO 2026: GMP, Price Band & Date",
    description:
      "SFC Environmental Technologies IPO opens 27-29 Oct 2026 at ₹313-₹330. GMP, allotment, listing dates & review.",
  },
};

const LAST_UPDATED = "25 October 2026";

const IPO_DETAILS = [
  { label: "Price Band", value: "₹313 - ₹330 per share" },
  { label: "Lot Size", value: "45 shares (1 lot)" },
  { label: "Min. Investment (retail)", value: "₹14,850 (45 × ₹330)" },
  { label: "Issue Size", value: "~₹667.53 crore" },
  { label: "Issue Type", value: "₹150 cr fresh issue + ₹517.53 cr OFS" },
  { label: "Face Value", value: "₹2 per share" },
  { label: "IPO Open Date", value: "27 October 2026" },
  { label: "IPO Close Date", value: "29 October 2026" },
  { label: "Allotment Date", value: "30 October 2026 (expected)" },
  { label: "Demat Credit", value: "2 November 2026 (expected)" },
  { label: "Listing Date", value: "3 November 2026 (expected)" },
  { label: "Exchanges", value: "BSE + NSE" },
  { label: "Registrar", value: "MUFG Intime India" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "GMP (indicative)", value: "~₹32 (+9.7%) as of 25 Oct 2026" },
];

const PROS = [
  "Water and wastewater treatment is a structural, policy-backed theme (Namami Gange, Jal Jeevan, industrial ESG norms)",
  "Market leader in SBR-based (Sequencing Batch Reactor) wastewater technology in India with a reported ~80% share in its niche",
  "Partly a fresh issue (₹150 cr), so some capital comes into the company for growth, not just an exit for sellers",
  "Healthier GMP percentage (~9.7%) than several larger offers in the same window",
  "Lower retail ticket (~₹14,850) than premium large-cap IPOs",
];

const CONS = [
  "Project and EPC-linked revenues can be lumpy and dependent on government order flow and execution timelines",
  "A large part of the issue (₹517.53 cr) is an Offer for Sale, so most proceeds go to selling shareholders",
  "GMP has been volatile (₹31 on 21 Oct, dipping to ₹21, back to ₹32 on 25 Oct) - sentiment is not settled",
  "Smaller, specialised company with concentration in one technology and sector",
  "GMP is unofficial and can swing before listing; it does not guarantee listing gains",
];

const FAQS = [
  {
    q: "What is the SFC Environmental Technologies IPO price band?",
    a: "The SFC Environmental Technologies IPO price band is ₹313 to ₹330 per share. At the upper band of ₹330, one lot of 45 shares needs a minimum retail application of ₹14,850.",
  },
  {
    q: "When does the SFC Environmental IPO open and close?",
    a: "The SFC Environmental Technologies IPO opens for subscription on 27 October 2026 and closes on 29 October 2026. Anchor investor bidding typically happens one working day before the retail open.",
  },
  {
    q: "What is the SFC Environmental IPO GMP today?",
    a: "As of 25 October 2026, the grey market premium (GMP) for the SFC Environmental Technologies IPO is around ₹32, roughly 9.7% over the ₹330 upper price band, implying an indicative listing near ₹362. The GMP has been volatile in the run-up. GMP is an unofficial, unregulated indicator that changes daily and does not guarantee the listing price.",
  },
  {
    q: "What is the SFC Environmental IPO lot size and minimum investment?",
    a: "The lot size is 45 shares. At the upper price band of ₹330, the minimum retail investment for 1 lot is ₹14,850. Retail investors can apply for a maximum of up to roughly ₹2 lakh.",
  },
  {
    q: "When is the SFC Environmental IPO allotment and listing date?",
    a: "Allotment is expected on 30 October 2026 and listing on both BSE and NSE is expected on 3 November 2026. You can check allotment status on the registrar MUFG Intime's website or the BSE IPO page once allotment is finalised.",
  },
  {
    q: "What does SFC Environmental Technologies do?",
    a: "SFC Environmental Technologies builds water and wastewater treatment systems, and is a leading provider of SBR (Sequencing Batch Reactor) based treatment technology in India. Its work ties into government clean-water and river-rejuvenation programmes and industrial environmental compliance.",
  },
  {
    q: "Should I apply for the SFC Environmental Technologies IPO?",
    a: "SFC operates in a structurally growing, policy-supported water-treatment theme and has a leading niche position, with a healthier GMP percentage than some peers. But revenues can be lumpy, most of the issue is an OFS, and the GMP has been volatile. This is not investment advice; read the RHP and consult a SEBI-registered adviser.",
  },
];

export default function SfcEnvironmentalIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SFC Environmental Technologies IPO 2026: GMP, Price Band, Date & Review",
    description:
      "SFC Environmental Technologies IPO opens 27-29 Oct 2026 at ₹313-₹330, lot size 45 shares, ₹667.53 crore issue, listing 3 Nov 2026.",
    url: `${site.url}/ipos/sfc-environmental-technologies-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-25",
    dateModified: "2026-10-25",
    mainEntityOfPage: `${site.url}/ipos/sfc-environmental-technologies-ipo`,
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
              ← IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            SUBSCRIPTION 27-29 OCT 2026
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            SFC Environmental Technologies IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            A water and wastewater-treatment specialist opens for subscription on 27 October 2026 at a price band of
            ₹313-₹330 per share, a ₹667.53 crore issue. Listing expected 3 Nov on BSE &amp; NSE.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Price Band</p>
              <p className="text-xl font-bold text-white">₹313-330</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Lot (45 shares)</p>
              <p className="text-xl font-bold text-white">₹14,850</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">GMP (25 Oct)</p>
              <p className="text-xl font-bold text-emerald-300">~₹32 (+9.7%)</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Listing</p>
              <p className="text-xl font-bold text-white">3 Nov 2026</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/40">Last updated: {LAST_UPDATED}. GMP is unofficial &amp; indicative.</p>
        </div>
      </section>

      <div className="container-main py-10 sm:py-14 space-y-12">
        {/* Quick answer box */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold text-text mb-2">SFC Environmental Technologies IPO - quick summary</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            The <strong className="text-text">SFC Environmental Technologies IPO</strong> opens{" "}
            <strong className="text-text">27 October 2026</strong> and closes{" "}
            <strong className="text-text">29 October 2026</strong>, with a price band of{" "}
            <strong className="text-text">₹313-₹330</strong> per share and a lot size of{" "}
            <strong className="text-text">45 shares (₹14,850 minimum)</strong>. It is a ~₹667.53 crore issue
            (₹150 cr fresh + ₹517.53 cr OFS). Allotment is expected on <strong className="text-text">30 Oct</strong> and
            listing on BSE &amp; NSE on <strong className="text-text">3 Nov 2026</strong>. The latest grey market premium
            (GMP) is about <strong className="text-text">₹32 (+9.7%)</strong> as of 25 Oct 2026.
          </p>
        </section>

        {/* Key details */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">SFC Environmental IPO Key Details</h2>
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
            * Dates, price band and GMP as reported from IPO trackers around the subscription window. Verify the final
            figures on the BSE/NSE IPO page and the registrar MUFG Intime&apos;s site before applying.
          </p>
        </section>

        {/* About */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">About SFC Environmental Technologies</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              SFC Environmental Technologies designs and builds water and wastewater treatment systems. It is a leading
              Indian provider of SBR (Sequencing Batch Reactor) based treatment technology, used to clean municipal and
              industrial wastewater before it is discharged or reused.
            </p>
            <p>
              The business rides a structural, policy-backed theme: programmes such as Namami Gange and Jal Jeevan, plus
              tightening industrial environmental norms, are pushing sustained investment into water treatment across
              India. SFC&apos;s niche leadership positions it to win project and technology mandates in that space.
            </p>
            <p>
              The issue is a mix of a ₹150 crore fresh issue and a ₹517.53 crore Offer for Sale, so part of the money
              comes into the company for growth while the larger portion goes to selling shareholders.
            </p>
          </div>
        </section>

        {/* Pros & cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Pros &amp; Cons - Should You Apply?</h2>
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

        {/* GMP note */}
        <section className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-5">
          <h2 className="text-base font-bold text-blue-800 dark:text-blue-300 mb-2">About GMP (Grey Market Premium)</h2>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            As of 25 October 2026, the SFC Environmental IPO GMP is around <strong>₹32</strong>, implying a listing near{" "}
            <strong>₹362</strong> (about 9.7% over the ₹330 upper band). It has moved around in the run-up (₹31 on 21 Oct,
            dipping to ₹21, back to ₹32). GMP is an <strong>unofficial, unregulated indicator</strong> of sentiment, it
            moves daily and does not guarantee the listing price.
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

        <IpoDematCta />

        {/* Disclaimer */}
        <section className="rounded-xl bg-surface border border-border p-4">
          <p className="text-xs text-text-muted">
            <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute investment
            advice. IPO details are based on publicly available grey-market trackers and regulatory filings (DRHP/RHP)
            and may change. Verify all data from official SEBI, BSE/NSE and registrar sources before investing. CoinMind
            does not hold any financial interest in companies mentioned.
          </p>
        </section>

        <div className="text-center">
          <Link href="/ipos" className="inline-flex items-center gap-2 text-brand hover:underline font-medium text-sm">
            ← View all IPOs on the CoinMind IPO Calendar
          </Link>
        </div>
      </div>
    </>
  );
}
