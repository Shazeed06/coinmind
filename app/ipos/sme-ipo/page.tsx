import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "SME IPO: Meaning, Risks & How to Apply | CoinMind" },
  description:
    "What an SME IPO is, where it lists (NSE Emerge / BSE SME), how it differs from a mainboard IPO, the minimum â‚¹1 lakh+ lot, the key risks and how to apply step by step - a plain-English guide for Indian investors.",
  keywords: [
    "SME IPO",
    "SME IPO this week",
    "SME IPO GMP today",
    "NSE Emerge IPO",
    "BSE SME IPO",
    "SME IPO list 2026",
    "what is SME IPO",
    "SME IPO minimum investment",
  ],
  alternates: { canonical: `${site.url}/ipos/sme-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "SME IPO Explained: Meaning, Risks & How to Apply (India)",
    description:
      "A plain-English guide to SME IPOs in India - NSE Emerge and BSE SME listing, how they differ from mainboard IPOs, the â‚¹1 lakh+ lot, risks and the application process.",
    url: `${site.url}/ipos/sme-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "SME IPO Explained: Meaning, Risks & How to Apply (India)",
    description:
      "A plain-English guide to SME IPOs in India - NSE Emerge and BSE SME listing, how they differ from mainboard IPOs, the â‚¹1 lakh+ lot, risks and the application process.",
  },
};

const LAST_UPDATED = "18 October 2026";

const DIFFERENCES = [
  { feature: "Listing platform", sme: "NSE Emerge or BSE SME", main: "NSE and BSE main board" },
  { feature: "Company size", sme: "Small & medium enterprises (smaller post-issue capital)", main: "Larger, established companies" },
  { feature: "Minimum application", sme: "~â‚¹1-1.5 lakh for one lot", main: "~â‚¹14,000-15,000 for one lot" },
  { feature: "Minimum allottees required", sme: "50 investors", main: "1,000 investors" },
  { feature: "Offer document review", sme: "Primarily reviewed by the exchange", main: "Reviewed by SEBI" },
  { feature: "Market making", sme: "Mandatory market maker for an initial period", main: "Not required" },
  { feature: "Liquidity after listing", sme: "Lower - fewer buyers and sellers", main: "Higher" },
  { feature: "Migration", sme: "Can migrate to the main board once eligible", main: "Not applicable" },
];

const RISKS = [
  {
    title: "High minimum ticket size",
    body: "One SME lot typically costs â‚¹1 lakh or more, so a single application ties up a large amount and makes it hard to diversify across issues.",
  },
  {
    title: "Low liquidity",
    body: "SME shares trade in larger market lots with far fewer participants than main-board stocks, so exiting a position - especially a big one - can be slow and move the price against you.",
  },
  {
    title: "High volatility",
    body: "Thin trading and smaller floats mean SME prices can swing sharply in both directions, and post-listing moves are often larger than on the main board.",
  },
  {
    title: "Thinner disclosure & research",
    body: "Smaller companies usually have shorter track records and little analyst coverage, so you are relying heavily on the prospectus and your own diligence.",
  },
  {
    title: "Concentration & promoter risk",
    body: "Revenue is often concentrated in a few customers or one product line, and governance standards vary widely between issuers.",
  },
];

const HOW_TO_APPLY = [
  { step: "1", title: "Use a demat + trading account", body: "Apply through any broker that supports SME IPOs (Zerodha, Groww, Angel One, Upstox and others). The same demat account you use for mainboard IPOs works." },
  { step: "2", title: "Check you can fund one full lot", body: "SME lots are large - often â‚¹1 lakh or more - so confirm your bank account can block the full minimum application amount via UPI or ASBA." },
  { step: "3", title: "Apply in the retail or HNI category", body: "Pick the SME issue in your broker's IPO section, choose the number of lots (minimum one) and bid at the cut-off price within the subscription window." },
  { step: "4", title: "Amount is blocked, not debited", body: "As with mainboard IPOs, ASBA/UPI blocks the money in your bank account and debits it only if you are allotted shares; otherwise it is released." },
  { step: "5", title: "Allotment and listing", body: "SME allotment also uses a lottery when oversubscribed. If allotted, shares are credited to your demat before listing on NSE Emerge or BSE SME." },
];

const FAQS = [
  {
    q: "What is an SME IPO?",
    a: "An SME IPO is a public issue by a small or medium-sized enterprise that lists on a dedicated exchange platform - NSE Emerge or BSE SME - instead of the main board. It lets smaller companies raise growth capital through a lighter listing process than a full mainboard IPO, which is why the minimum investment and risks are different.",
  },
  {
    q: "What is the minimum investment in an SME IPO?",
    a: "SME IPOs have a much larger lot size than mainboard issues, so one lot typically costs around â‚¹1 lakh to â‚¹1.5 lakh - the minimum you can apply for. That high ticket size is set deliberately so that mainly informed, higher-net-worth investors participate. Exact lot values vary by issue and are stated in the prospectus.",
  },
  {
    q: "Are SME IPOs risky?",
    a: "Yes - SME IPOs carry higher risk than mainboard IPOs. The companies are smaller with shorter track records, the shares trade with low liquidity and high volatility, and the â‚¹1 lakh+ minimum makes it hard to diversify. They can deliver strong gains, but the downside can be severe, so size any exposure carefully and read the prospectus in full.",
  },
  {
    q: "Where do SME IPOs list?",
    a: "SME IPOs list on one of two dedicated platforms: NSE Emerge (run by the National Stock Exchange) or BSE SME (run by the BSE). These platforms have lighter eligibility rules than the main board. A company that grows and meets the criteria can later migrate from the SME platform to the main board.",
  },
  {
    q: "How is SME IPO allotment different?",
    a: "The mechanics are similar - oversubscribed issues are allotted by lottery and funds are blocked via ASBA/UPI - but an SME IPO needs a minimum of only 50 allottees versus 1,000 for a mainboard IPO, and the lot sizes are far larger. Because fewer lots are on offer, allotment in a popular SME issue can be very competitive.",
  },
  {
    q: "Which SME IPOs are open this week?",
    a: "The SME pipeline changes week to week, so check our live IPO tracker for the current list rather than any fixed names here. Note that the mainboard IPOs open this week - Tonbo Imaging, Bonfiglioli, Sahajanand Medical and Zetwerk - are not SME issues; they list on the main board, not on NSE Emerge or BSE SME.",
  },
];

export default function SmeIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SME IPO Explained - Meaning, Risks & How to Apply in India",
    description:
      "A plain-English guide to SME IPOs in India: what they are, NSE Emerge and BSE SME listing, how they differ from mainboard IPOs, the minimum lot, risks and how to apply.",
    url: `${site.url}/ipos/sme-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/sme-ipo`,
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
      { "@type": "ListItem", position: 3, name: "SME IPO", item: `${site.url}/ipos/sme-ipo` },
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
            <span>SME IPO</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            SME IPO - Meaning, Risks &amp; How to Apply
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            A plain-English guide to SME IPOs in India - what they are, where they list, how they differ from mainboard IPOs, the â‚¹1 lakh+ minimum lot, the risks to weigh and the step-by-step application process.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} Â· <span className="text-amber-600">Educational guide, not investment advice.</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer block */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text mb-2">What is an SME IPO, in short</h2>
            <p className="text-sm text-text leading-relaxed font-semibold">
              An <strong className="text-brand">SME IPO</strong> is a public issue by a small or medium-sized enterprise that lists on a dedicated platform - <strong className="text-brand">NSE Emerge</strong> or <strong className="text-brand">BSE SME</strong> - rather than the main board. It uses a lighter listing process, carries a much larger minimum lot (often â‚¹1 lakh or more) and has lower liquidity and higher volatility than a mainboard IPO.
            </p>
          </div>

          {/* SME vs Mainboard */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-1">SME vs mainboard IPO - key differences</h2>
            <p className="text-sm text-text-muted mb-3">
              Both are ways for a company to go public, but the platform, size, costs and rules differ. Here is how they compare at a glance.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold">SME IPO</th>
                    <th className="text-left px-4 py-3 font-semibold">Mainboard IPO</th>
                  </tr>
                </thead>
                <tbody>
                  {DIFFERENCES.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0 align-top">
                      <td className="px-4 py-3 font-medium text-text">{row.feature}</td>
                      <td className="px-4 py-3 text-text-muted">{row.sme}</td>
                      <td className="px-4 py-3 text-text-muted">{row.main}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              Exact thresholds (lot values, capital limits and eligibility) are set by SEBI and the exchanges and can change - verify the current rules on the NSE Emerge and BSE SME pages.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/mainboard-vs-sme-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
                â†’ Mainboard vs SME IPO - full comparison
              </Link>
            </div>
          </div>

          {/* Risks */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Risks of SME IPOs</h2>
            <p className="text-sm text-text-muted mb-4">
              SME IPOs can deliver strong gains, but they sit higher on the risk scale than mainboard issues. Weigh these before you apply.
            </p>
            <div className="space-y-3">
              {RISKS.map((r) => (
                <div key={r.title} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <p className="font-medium text-text text-sm">{r.title}</p>
                  <p className="text-sm text-text-muted mt-1">{r.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to apply */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">How to apply for an SME IPO</h2>
            <ol className="space-y-3 text-sm text-text-muted">
              {HOW_TO_APPLY.map((item) => (
                <li key={item.step} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                  <div>
                    <p className="font-medium text-text">{item.title}</p>
                    <p className="mt-0.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Subscription trend context */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <h2 className="font-bold text-blue-800 mb-2">A note on SME IPO demand in 2024-2025</h2>
            <p className="text-sm text-blue-700 leading-relaxed">
              SME IPOs drew frenzied demand during the 2024 bull run, with the average issue reportedly subscribed around <strong>234 times</strong>. As a market-outlook estimate, that average is widely believed to have cooled to roughly <strong>59 times</strong> in 2025 as tighter rules, a few weak listings and more cautious sentiment set in. Treat both figures as directional market commentary rather than precise, audited statistics - the takeaway is simply that red-hot SME subscription levels are not guaranteed to repeat, so do not assume listing-day pops.
            </p>
          </div>

          {/* Where to find live SME issues */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-2">Finding SME IPOs open right now</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              The SME IPO calendar turns over quickly, so we keep the current, dated list on our main IPO tracker rather than here. A reminder: the mainboard IPOs open this week - Tonbo Imaging, Bonfiglioli, Sahajanand Medical and Zetwerk - are <strong>not</strong> SME issues; they list on the main board of NSE and BSE, not on NSE Emerge or BSE SME. If you see a grey market premium quoted for an SME issue, remember it is unofficial and indicative only.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">â†’ Live IPO tracker &amp; calendar</Link>
              <Link href="/ipos/ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">â†’ IPO GMP today</Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">SME IPO - FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{q}</p>
                  <p className="text-sm text-text-muted mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This page is educational and is <strong>not investment advice</strong>. SME IPOs are high-risk, low-liquidity investments and are not suitable for everyone. Subscription figures are market-outlook estimates, not audited statistics, and grey market premium (GMP) is an informal, unregulated sentiment indicator, not a prediction of returns. Verify all rules, lot sizes and company data from official SEBI, NSE Emerge and BSE SME sources and read the prospectus before applying. Consider consulting a SEBI-registered adviser.
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
