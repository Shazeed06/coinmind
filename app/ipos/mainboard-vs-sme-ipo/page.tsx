import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Mainboard vs SME IPO: Key Differences | CoinMind" },
  description:
    "Mainboard vs SME IPO explained: listing platform (NSE/BSE vs NSE Emerge/BSE SME), minimum investment (~â‚¹15k vs ~â‚¹1-1.5 lakh), lot size, risk, liquidity and who each type suits.",
  keywords: [
    "mainboard vs SME IPO",
    "difference between mainboard and SME IPO",
    "what is mainboard IPO",
    "SME vs mainboard which is better",
    "IPO types in India",
    "SME IPO meaning",
    "mainboard IPO meaning",
    "SME IPO lot size",
  ],
  alternates: { canonical: `${site.url}/ipos/mainboard-vs-sme-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "Mainboard vs SME IPO: Key Differences Explained",
    description:
      "A clear, side-by-side comparison of mainboard and SME IPOs in India: platform, minimum investment, lot size, compliance, liquidity, risk and who should invest.",
    url: `${site.url}/ipos/mainboard-vs-sme-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mainboard vs SME IPO: Key Differences Explained",
    description:
      "A clear, side-by-side comparison of mainboard and SME IPOs in India: platform, minimum investment, lot size, compliance, liquidity, risk and who should invest.",
  },
};

const LAST_UPDATED = "18 October 2026";

type Row = { feature: string; mainboard: string; sme: string };

const COMPARISON: Row[] = [
  {
    feature: "Listing platform",
    mainboard: "Main board of NSE and/or BSE",
    sme: "NSE Emerge or BSE SME platform",
  },
  {
    feature: "Company size",
    mainboard: "Larger, established companies",
    sme: "Small and medium enterprises, often early-stage",
  },
  {
    feature: "Minimum investment (1 lot)",
    mainboard: "~â‚¹14,000-â‚¹15,000",
    sme: "~â‚¹1,00,000-â‚¹1,50,000",
  },
  {
    feature: "Lot size",
    mainboard: "Small (sized to ~â‚¹15k at cut-off)",
    sme: "Large (sized to ~â‚¹1 lakh+ at cut-off)",
  },
  {
    feature: "Disclosure & compliance",
    mainboard: "Full, detailed, exchange-reviewed",
    sme: "Lighter, platform-level requirements",
  },
  {
    feature: "Merchant banker role",
    mainboard: "Lead-managed, no mandatory market making",
    sme: "Market maker mandated for a set period",
  },
  {
    feature: "Liquidity after listing",
    mainboard: "High - large public float, active trading",
    sme: "Low - thin volumes, wider spreads",
  },
  {
    feature: "Risk profile",
    mainboard: "Lower relative risk, more analyst coverage",
    sme: "Higher risk, little/no coverage",
  },
  {
    feature: "Who it suits",
    mainboard: "Most retail and long-term investors",
    sme: "Informed investors with higher risk appetite",
  },
];

const FAQS = [
  {
    q: "What is the main difference between mainboard and SME IPO?",
    a: "A mainboard IPO lists directly on the main board of the NSE and/or BSE and is open to all investors with a small minimum application (about â‚¹14,000-â‚¹15,000). An SME IPO lists on a dedicated platform (NSE Emerge or BSE SME), carries lighter disclosure requirements, and has a much larger minimum application - typically â‚¹1-1.5 lakh - because the lot size is deliberately bigger.",
  },
  {
    q: "Is an SME IPO riskier than a mainboard IPO?",
    a: "Generally, yes. SME issuers are smaller, often early-stage businesses with limited track records, less analyst coverage and thinner post-listing liquidity, so prices can be more volatile and harder to exit. Mainboard companies are larger and more scrutinised. SME IPOs are not inherently bad, but they demand more independent research and a higher risk tolerance.",
  },
  {
    q: "Can retail investors apply for both mainboard and SME IPOs?",
    a: "Yes. Retail investors can apply for both through the same demat and ASBA/UPI process. The practical gate is the ticket size: a mainboard lot costs around â‚¹15,000, while a single SME lot usually runs â‚¹1 lakh or more, so SME IPOs require a larger upfront commitment per application.",
  },
  {
    q: "Why is the SME IPO lot size so high?",
    a: "Regulators and the exchange platforms set a larger minimum application value for SME issues so that participation skews toward investors who can absorb higher risk and are more likely to do their own due diligence. The bigger ticket is a deliberate screen, not an accident of pricing.",
  },
  {
    q: "Do SME IPOs migrate to the mainboard?",
    a: "They can. After an SME company meets the eligibility criteria - such as minimum market capitalisation, profitability track record and public shareholding norms - it can migrate from the SME platform to the main board of the exchange. Migration is a milestone, not a guarantee, and many SME companies never make the move.",
  },
  {
    q: "Which gives better returns, mainboard or SME IPO?",
    a: "Neither is better by default. SME IPOs can post sharp listing gains but also sharper losses, and their illiquidity makes those gains hard to realise. Mainboard IPOs tend to be steadier with more coverage. Returns depend on the specific company's fundamentals, valuation and timing - not on the category label.",
  },
];

export default function MainboardVsSmeIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Mainboard vs SME IPO - Key Differences Explained",
    description:
      "A side-by-side comparison of mainboard and SME IPOs in India: listing platform, minimum investment, lot size, compliance, liquidity, risk and who each suits.",
    url: `${site.url}/ipos/mainboard-vs-sme-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/mainboard-vs-sme-ipo`,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "IPO Tracker", item: `${site.url}/ipos` },
      { "@type": "ListItem", position: 3, name: "Mainboard vs SME IPO", item: `${site.url}/ipos/mainboard-vs-sme-ipo` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>â€º</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>â€º</span>
            <span>Mainboard vs SME IPO</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Mainboard vs SME IPO
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            India has two very different kinds of IPO. A <strong className="text-text">mainboard IPO</strong> lists big, established companies on the NSE/BSE main board; an <strong className="text-text">SME IPO</strong> lists smaller firms on a separate platform with a far larger minimum ticket. Here is how they differ and which suits you.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-text font-bold leading-relaxed">
              The core difference: a mainboard IPO lists a large, fully-scrutinised company on the NSE/BSE main board with a small ~â‚¹15,000 minimum application, while an SME IPO lists a smaller company on NSE Emerge or the BSE SME platform with lighter disclosure and a much bigger minimum of roughly â‚¹1-1.5 lakh - making SME IPOs higher-risk and aimed at informed investors.
            </p>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Mainboard vs SME IPO: Side-by-Side Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold">Mainboard IPO</th>
                    <th className="text-left px-4 py-3 font-semibold">SME IPO</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0 align-top">
                      <td className="px-4 py-3 font-medium text-text">{row.feature}</td>
                      <td className="px-4 py-3 text-text-muted">{row.mainboard}</td>
                      <td className="px-4 py-3 text-text-muted">{row.sme}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">Minimum investment figures are indicative and move with each issue&apos;s price band and lot size set at the time of the offer.</p>
          </div>

          {/* What is a mainboard IPO */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">What is a Mainboard IPO?</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              A mainboard IPO is a public offer by a larger, established company that lists directly on the main board of the National Stock Exchange (NSE) and/or the Bombay Stock Exchange (BSE). These are the IPOs you hear about most - banks, manufacturers, consumer brands and large new-age companies. To qualify, issuers must meet stricter size, track-record and public-shareholding thresholds, and the offer document (the RHP) carries full, detailed disclosures that the exchanges review.
            </p>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              Because the public float is large, a mainboard stock usually trades actively from day one with tight bid-ask spreads, so entering and exiting is easy. The minimum application is kept small - typically in the â‚¹14,000-â‚¹15,000 range - so ordinary retail investors can participate with one lot. Mainboard issues also attract analyst coverage, anchor investors and institutional demand, which adds a layer of scrutiny to the pricing.
            </p>
          </div>

          {/* What is an SME IPO */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">What is an SME IPO?</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              An SME IPO is a public offer by a small or medium enterprise that lists on a dedicated exchange platform - <strong className="text-text">NSE Emerge</strong> or the <strong className="text-text">BSE SME</strong> platform - rather than the main board. These platforms exist to give smaller, growing businesses access to public capital without the full weight of mainboard requirements. Disclosure and compliance obligations are lighter, and a merchant banker is typically required to act as a market maker for a defined period after listing to support some liquidity.
            </p>
            <p className="text-sm text-text-muted leading-relaxed mt-3">
              The defining feature for investors is the ticket size. Lot sizes on SME platforms are set so that a single application usually costs around â‚¹1 lakh or more. That is deliberate: it steers participation toward investors who can take on higher risk and are expected to research the company themselves. Post-listing, SME stocks tend to trade thinly, so prices can swing hard and selling a position can take time or move the price against you.
            </p>
          </div>

          {/* Which should you choose */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Which Should You Choose?</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              The right choice depends on your capital, risk appetite and how much independent research you are willing to do - not on which category is &quot;better&quot;.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-xl border border-border bg-bg-alt p-4">
                <p className="font-semibold text-text text-sm mb-2">A mainboard IPO fits you ifâ€¦</p>
                <ul className="space-y-1.5 text-sm text-text-muted">
                  <li className="flex gap-2"><span>â€¢</span>You want a smaller, ~â‚¹15,000 entry ticket.</li>
                  <li className="flex gap-2"><span>â€¢</span>You value liquidity and the ability to exit easily.</li>
                  <li className="flex gap-2"><span>â€¢</span>You prefer larger firms with analyst coverage and fuller disclosure.</li>
                  <li className="flex gap-2"><span>â€¢</span>You are a first-time or long-term investor.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-bg-alt p-4">
                <p className="font-semibold text-text text-sm mb-2">An SME IPO fits you ifâ€¦</p>
                <ul className="space-y-1.5 text-sm text-text-muted">
                  <li className="flex gap-2"><span>â€¢</span>You can commit â‚¹1 lakh+ per application.</li>
                  <li className="flex gap-2"><span>â€¢</span>You accept higher risk and thin post-listing liquidity.</li>
                  <li className="flex gap-2"><span>â€¢</span>You can read financials and judge a small business yourself.</li>
                  <li className="flex gap-2"><span>â€¢</span>You understand you may not be able to sell quickly.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mt-4">
              A practical rule of thumb: never size an SME position as if it were as liquid as a mainboard stock. Treat it as capital you can leave invested, and apply only after reading the offer document rather than following grey-market chatter.
            </p>
          </div>

          {/* Regulatory note */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <h2 className="font-bold text-blue-800 mb-2">A Note on Eligibility &amp; Regulation</h2>
            <p className="text-sm text-blue-700 leading-relaxed">
              Both mainboard and SME IPOs are governed by SEBI&apos;s ICDR (Issue of Capital and Disclosure Requirements) framework, but they sit under different eligibility tracks. Mainboard issuers must meet higher thresholds on parameters such as net tangible assets, operating track record, profitability and post-issue capital, with the full RHP reviewed by the exchanges. SME issuers list under a lighter-touch regime designed for smaller companies, with the exchange platform (NSE Emerge / BSE SME) handling much of the review. The exact numerical thresholds are revised by SEBI and the exchanges from time to time, so always confirm the current criteria from the official SEBI and exchange circulars rather than relying on older figures.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Mainboard vs SME IPO - FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{q}</p>
                  <p className="text-sm text-text-muted mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related links */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Learn More About IPOs</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/sme-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">SME IPO Guide</Link>
              <Link href="/ipos/upcoming-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Upcoming IPOs</Link>
              <Link href="/glossary" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Finance Glossary</Link>
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">All IPOs â†’</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This page is for educational purposes only and is not investment advice. IPO eligibility rules, lot sizes and minimum application values are set per issue and revised by SEBI and the exchanges over time. Always read the RHP and verify the current criteria on the official SEBI, NSE and BSE websites before investing.
            </p>
          </div>

          <div className="text-center">
            <Link href="/ipos" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline underline-offset-2">
              â† View all IPOs on the CoinMind IPO Calendar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
