import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import IpoDematCta from "@/components/IpoDematCta";

export const metadata: Metadata = {
  title: { absolute: "EAAA India Alternatives IPO 2026: GMP, Price Band & Date | CoinMind" },
  description:
    "EAAA India Alternatives (Edelweiss Alternatives) IPO opens 26-28 Oct 2026. Price band ₹1,585-₹1,665, lot 9 shares (₹14,985), ₹1,200 cr OFS. Latest GMP, allotment (29 Oct), listing (2 Nov) & should you apply.",
  keywords: [
    "EAAA India Alternatives IPO",
    "EAAA IPO GMP",
    "EAAA IPO GMP today",
    "EAAA India Alternatives IPO price band",
    "EAAA IPO date",
    "EAAA IPO allotment status",
    "EAAA IPO listing date",
    "Edelweiss Alternatives IPO",
    "EAAA IPO review",
    "EAAA IPO lot size",
  ],
  alternates: { canonical: `${site.url}/ipos/eaaa-india-alternatives-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "EAAA India Alternatives IPO 2026: GMP, Price Band ₹1,585-1,665, Date & Review",
    description:
      "Edelweiss Alternatives' asset-management arm. EAAA India Alternatives IPO opens 26-28 Oct 2026 at ₹1,585-₹1,665. Latest GMP, allotment & listing dates, review.",
    url: `${site.url}/ipos/eaaa-india-alternatives-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "EAAA India Alternatives IPO 2026: GMP, Price Band & Date",
    description:
      "EAAA India Alternatives (Edelweiss) IPO opens 26-28 Oct 2026 at ₹1,585-₹1,665. GMP, allotment, listing dates & review.",
  },
};

const LAST_UPDATED = "25 October 2026";

const IPO_DETAILS = [
  { label: "Price Band", value: "₹1,585 - ₹1,665 per share" },
  { label: "Lot Size", value: "9 shares (1 lot)" },
  { label: "Min. Investment (retail)", value: "₹14,985 (9 × ₹1,665)" },
  { label: "Issue Size", value: "~₹1,200 crore (100% Offer for Sale)" },
  { label: "Issue Type", value: "100% OFS (no fresh issue)" },
  { label: "Face Value", value: "₹5 per share" },
  { label: "IPO Open Date", value: "26 October 2026" },
  { label: "IPO Close Date", value: "28 October 2026" },
  { label: "Allotment Date", value: "29 October 2026 (expected)" },
  { label: "Demat Credit", value: "30 October 2026 (expected)" },
  { label: "Listing Date", value: "2 November 2026 (expected)" },
  { label: "Exchanges", value: "BSE + NSE" },
  { label: "Registrar", value: "MUFG Intime India" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "GMP (indicative)", value: "~₹42 (+2.5%) as of 25 Oct 2026" },
];

const PROS = [
  "Backed by the Edelweiss group - strong brand recall and an established alternative-assets franchise",
  "Operates in private credit, real assets and other alternatives, a fast-growing segment of Indian asset management",
  "Asset-light, fee-earning business model with recurring management-fee income",
  "Experienced institutional team and marquee investor relationships",
];

const CONS = [
  "100% Offer for Sale - no fresh capital comes into the company; the proceeds go to selling shareholders",
  "Grey market premium has cooled sharply (₹121 on 23 Oct to ₹42 on 25 Oct), signalling softer listing sentiment",
  "Alternative-asset earnings can be lumpy and tied to fund-raising and performance-fee cycles",
  "Premium valuation for a non-bank financial/AMC business leaves limited margin of safety",
  "Minimum retail ticket of ~₹14,985 is on the higher side for first-time investors",
];

const FAQS = [
  {
    q: "What is the EAAA India Alternatives IPO price band?",
    a: "The EAAA India Alternatives IPO price band is ₹1,585 to ₹1,665 per share. At the upper band of ₹1,665, one lot of 9 shares needs a minimum retail application of ₹14,985.",
  },
  {
    q: "When does the EAAA India Alternatives IPO open and close?",
    a: "The EAAA India Alternatives IPO opens for subscription on 26 October 2026 and closes on 28 October 2026. Anchor investor bidding typically happens one working day before the retail open.",
  },
  {
    q: "What is the EAAA IPO GMP today?",
    a: "As of 25 October 2026, the grey market premium (GMP) for the EAAA India Alternatives IPO is around ₹42, roughly 2.5% over the ₹1,665 upper price band, implying an indicative listing near ₹1,707. The GMP has fallen from about ₹121 on 23 Oct, so sentiment has softened. GMP is an unofficial, unregulated indicator that changes daily and does not guarantee the listing price.",
  },
  {
    q: "What is the EAAA IPO lot size and minimum investment?",
    a: "The lot size is 9 shares. At the upper price band of ₹1,665, the minimum retail investment for 1 lot is ₹14,985. Retail investors can apply for a maximum of up to roughly ₹2 lakh.",
  },
  {
    q: "When is the EAAA IPO allotment and listing date?",
    a: "Allotment is expected on 29 October 2026 and listing on both BSE and NSE is expected on 2 November 2026. You can check allotment status on the registrar MUFG Intime's website or the BSE IPO page once allotment is finalised.",
  },
  {
    q: "Is the EAAA India Alternatives IPO a fresh issue or OFS?",
    a: "It is a 100% Offer for Sale (OFS) of about ₹1,200 crore. This means the money raised goes to the selling shareholders, not to the company, so the IPO does not add growth capital to the business.",
  },
  {
    q: "Should I apply for the EAAA India Alternatives IPO?",
    a: "EAAA has a strong parent in the Edelweiss group and operates in a growing alternative-assets segment, but it is a 100% OFS with a premium valuation and a GMP that has cooled quickly. Long-term investors who understand alternative-asset managers may find it interesting, but listing gains are not assured. This is not investment advice; read the RHP and consult a SEBI-registered adviser.",
  },
];

export default function EaaaIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "EAAA India Alternatives IPO 2026: GMP, Price Band, Date & Review",
    description:
      "EAAA India Alternatives IPO opens 26-28 Oct 2026 at ₹1,585-₹1,665, lot size 9 shares, ₹1,200 crore OFS, listing 2 Nov 2026.",
    url: `${site.url}/ipos/eaaa-india-alternatives-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-25",
    dateModified: "2026-10-25",
    mainEntityOfPage: `${site.url}/ipos/eaaa-india-alternatives-ipo`,
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
            SUBSCRIPTION 26-28 OCT 2026
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            EAAA India Alternatives IPO 2026
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            Edelweiss Alternatives&apos; asset-management arm opens for subscription on 26 October 2026 at a price band of
            ₹1,585-₹1,665 per share, a ₹1,200 crore 100% Offer for Sale. Listing expected 2 Nov on BSE &amp; NSE.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Price Band</p>
              <p className="text-xl font-bold text-white">₹1,585-1,665</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Lot (9 shares)</p>
              <p className="text-xl font-bold text-white">₹14,985</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">GMP (25 Oct)</p>
              <p className="text-xl font-bold text-emerald-300">~₹42 (+2.5%)</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Listing</p>
              <p className="text-xl font-bold text-white">2 Nov 2026</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/40">Last updated: {LAST_UPDATED}. GMP is unofficial &amp; indicative.</p>
        </div>
      </section>

      <div className="container-main py-10 sm:py-14 space-y-12">
        {/* Quick answer box */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-base font-bold text-text mb-2">EAAA India Alternatives IPO - quick summary</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            The <strong className="text-text">EAAA India Alternatives IPO</strong> (Edelweiss Alternatives) opens{" "}
            <strong className="text-text">26 October 2026</strong> and closes{" "}
            <strong className="text-text">28 October 2026</strong>, with a price band of{" "}
            <strong className="text-text">₹1,585-₹1,665</strong> per share and a lot size of{" "}
            <strong className="text-text">9 shares (₹14,985 minimum)</strong>. It is a ~₹1,200 crore 100% Offer for Sale.
            Allotment is expected on <strong className="text-text">29 Oct</strong> and listing on BSE &amp; NSE on
            <strong className="text-text"> 2 Nov 2026</strong>. The latest grey market premium (GMP) is about
            <strong className="text-text"> ₹42 (+2.5%)</strong> as of 25 Oct 2026 - down sharply from ₹121 on 23 Oct.
          </p>
        </section>

        {/* Key details */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">EAAA IPO Key Details</h2>
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
          <h2 className="text-xl font-bold text-text mb-4">About EAAA India Alternatives</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              EAAA India Alternatives is the alternative-asset management business of the Edelweiss group. It manages
              capital across private credit, real assets, infrastructure and other alternative strategies on behalf of
              institutional and high-net-worth investors, earning recurring management fees and performance-linked fees.
            </p>
            <p>
              Alternative assets are one of the fastest-growing corners of Indian asset management as large investors
              look beyond listed equity and debt for yield and diversification. EAAA&apos;s scale, track record and the
              Edelweiss brand give it a recognised position in this space.
            </p>
            <p>
              The IPO is a 100% Offer for Sale, so the shares being sold come from existing shareholders rather than a
              fresh issue. That means the proceeds do not add growth capital to the company - a point worth weighing
              against the valuation.
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
            As of 25 October 2026, the EAAA IPO GMP is around <strong>₹42</strong>, implying a listing near{" "}
            <strong>₹1,707</strong> (about 2.5% over the ₹1,665 upper band). It has dropped from <strong>₹121 on 23 Oct</strong>,
            a sign that grey-market sentiment is cooling. GMP is an <strong>unofficial, unregulated indicator</strong> of
            sentiment, it moves daily and does not guarantee the listing price.
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
