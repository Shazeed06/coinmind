import type { Metadata } from "next";
import Link from "next/link";
import IpoDematCta from "@/components/IpoDematCta";
import { site } from "@/lib/site";

// Razorpay filed CONFIDENTIALLY, so there is no public DRHP to quote. Every
// figure here is a reported one (Reuters and mainstream Indian business press)
// and is labelled as such. Price band, lot size and dates genuinely do not
// exist yet - this page says so rather than inventing them, because "razorpay
// ipo date" is exactly what people search and a fabricated date is worse than
// an honest "not announced".
export const metadata: Metadata = {
  title: "Razorpay IPO: Date, Valuation, DRHP Status & Review",
  description:
    "Razorpay filed a confidential DRHP with SEBI in June 2026 for a reported ~$600 million IPO at a $5-6 billion valuation. Dates and price band are not announced yet - here's what is actually known.",
  keywords: [
    "Razorpay IPO",
    "Razorpay IPO date",
    "Razorpay IPO price band",
    "Razorpay IPO valuation",
    "Razorpay DRHP",
    "Razorpay IPO review",
    "Razorpay IPO GMP",
    "Razorpay listing date",
    "Razorpay IPO size",
    "fintech IPO India 2026",
    "upcoming IPO India",
  ],
  alternates: { canonical: `${site.url}/ipos/razorpay-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "Razorpay IPO: What's Actually Confirmed (and What Isn't)",
    description:
      "Confidential DRHP filed June 2026, reported ~$600M issue at a $5-6B valuation. No price band or dates yet. Full review of India's biggest fintech listing in the pipeline.",
    url: `${site.url}/ipos/razorpay-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Razorpay IPO: What's Actually Confirmed (and What Isn't)",
    description:
      "Confidential DRHP filed June 2026, reported ~$600M issue at a $5-6B valuation. No price band or dates yet.",
  },
};

const LAST_UPDATED = "29 October 2026";

const IPO_DETAILS = [
  { label: "DRHP Status", value: "Confidential filing with SEBI, June 2026" },
  { label: "Reported Issue Size", value: "~$600-700 million (press reports)" },
  { label: "Reported Valuation Target", value: "~$5-6 billion" },
  { label: "Peak Private Valuation", value: "$7.5 billion (2021 round)" },
  { label: "Price Band", value: "Not announced" },
  { label: "Lot Size", value: "Not announced" },
  { label: "IPO Open / Close Dates", value: "Not announced" },
  { label: "Listing Date", value: "Not announced" },
  { label: "Exchanges", value: "BSE + NSE (expected)" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "Founders", value: "Harshil Mathur & Shashank Kumar" },
  { label: "Headquarters", value: "Bengaluru" },
  { label: "Reported Lead Managers", value: "Axis Capital, Kotak Mahindra Capital, JP Morgan, Citi" },
  { label: "GMP", value: "No grey market yet - it only forms once dates and a price band exist" },
];

const PROS = [
  "Sits at the centre of Indian digital payments - Razorpay processes online payments for a very large base of businesses, so it grows with UPI and e-commerce rather than against them",
  "Broader than a payment gateway: the business has expanded into business banking, payroll and lending-adjacent products, which diversifies revenue away from pure transaction fees",
  "Completed its reverse flip back to India (reported May 2025, at a reported ~$150 million tax cost) and converted to a public limited company - the structural homework for a domestic listing is done",
  "Reported bank line-up is top tier (Axis Capital, Kotak Mahindra Capital, JP Morgan, Citi), which usually signals a serious, near-term process",
  "A reported $5-6 billion target against a $7.5 billion peak private valuation suggests pricing discipline rather than a 2021-style stretch",
];

const CONS = [
  "A confidential DRHP means the public cannot read the financials yet - revenue, profitability and risk factors stay hidden until the RHP, so nobody outside the process can value this properly today",
  "Every number in circulation (issue size, valuation) is a press report, not a filed figure, and reported numbers move",
  "Indian fintech listings have a mixed record: Paytm has traded well below its issue price since listing, while PB Fintech has done better - the sector does not get an automatic premium",
  "Payments is a thin-margin, highly competitive business, and UPI's zero-MDR regime limits what can be charged on a large share of transactions",
  "Regulatory dependence is real - payment aggregator licensing and RBI rule changes can reshape the economics",
  "No dates means no timeline certainty; confidential filings are often used precisely to keep the launch window flexible",
];

const FAQS = [
  {
    q: "What is the Razorpay IPO date?",
    a: "There is no announced date. Razorpay filed its draft papers confidentially with SEBI in June 2026, and a confidential filing does not commit the company to a timetable. Open, close and listing dates only become official when the company files its RHP and the exchanges publish the issue schedule. Treat any specific date circulating now as speculation.",
  },
  {
    q: "What is the Razorpay IPO price band and lot size?",
    a: "Neither has been announced. The price band and lot size are set at the RHP stage, shortly before the issue opens. Until then, any figure you see is someone's estimate. Once a band is published, the minimum retail application is one lot at the upper end of that band.",
  },
  {
    q: "How big is the Razorpay IPO expected to be?",
    a: "Press reports, including Reuters, have put the issue at roughly $600-700 million, with a reported target valuation of about $5-6 billion. Those are reported figures rather than filed ones. For context, Razorpay was valued at about $7.5 billion in its 2021 fundraise, so the reported target is below its private peak.",
  },
  {
    q: "What does Razorpay actually do?",
    a: "Razorpay is a Bengaluru-based payments company founded by Harshil Mathur and Shashank Kumar. Its core product lets businesses accept online payments - cards, UPI, netbanking and wallets - through a single integration. It has since expanded into business banking and related financial products for the same customers.",
  },
  {
    q: "Why did Razorpay file confidentially?",
    a: "The confidential pre-filing route lets a company complete SEBI review without publishing its draft prospectus, and decide later whether and when to launch. Large Indian tech issuers increasingly use it for timing flexibility. The trade-off for investors is that detailed financials stay private until the RHP.",
  },
  {
    q: "What is the Razorpay IPO GMP?",
    a: "There isn't one yet, and anyone quoting a number is guessing. Grey market premium only forms once an issue has a price band and firm dates, usually a week or two before it opens. Even then GMP is unofficial, unregulated sentiment and is not a reliable predictor of the listing price.",
  },
  {
    q: "Should I invest in the Razorpay IPO?",
    a: "You cannot sensibly decide yet, because the financials are not public. When the RHP is filed, read the revenue trend, the path to profit, the customer concentration and the regulatory risk factors, and compare the asking valuation against listed peers. This page is education, not investment advice - consult a SEBI-registered adviser.",
  },
];

export default function RazorpayIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Razorpay IPO: Date, Valuation, DRHP Status and Review",
    description:
      "Razorpay filed a confidential DRHP with SEBI in June 2026 for a reported ~$600 million IPO at a $5-6 billion valuation. Price band and dates are not announced.",
    url: `${site.url}/ipos/razorpay-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-29",
    dateModified: "2026-10-29",
    mainEntityOfPage: `${site.url}/ipos/razorpay-ipo`,
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
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "IPO Tracker", item: `${site.url}/ipos` },
      { "@type": "ListItem", position: 3, name: "Razorpay IPO", item: `${site.url}/ipos/razorpay-ipo` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-[#0c1628] py-12 sm:py-16">
        <div className="container-main">
          <div className="mb-4 flex items-center gap-2">
            <Link href="/ipos" className="text-sm text-white/50 hover:text-white/80 transition-colors">
              ← IPO Calendar
            </Link>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            CONFIDENTIAL DRHP FILED · DATES NOT ANNOUNCED
          </div>
          <h1 style={{ color: "#ffffff" }} className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Razorpay IPO
          </h1>
          <p className="mt-3 text-white/60 text-base sm:text-lg max-w-2xl">
            India&apos;s biggest fintech listing in the pipeline. Razorpay filed confidentially with SEBI
            in June 2026 for a reported ~$600 million issue. No price band, no dates - here is what is
            actually confirmed, and what is still guesswork.
          </p>
          <p className="mt-4 text-xs text-white/40">
            Last updated: {LAST_UPDATED} · Figures below are press-reported, not filed. Nothing is official until the RHP.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Reported Issue</p>
              <p className="text-xl font-bold text-white">~$600-700M</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">Reported Valuation</p>
              <p className="text-xl font-bold text-white">~$5-6B</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-center">
              <p className="text-xs text-white/50 mb-1">DRHP Filed</p>
              <p className="text-xl font-bold text-white">Jun 2026</p>
            </div>
            <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-5 py-3 text-center">
              <p className="text-xs text-yellow-300/70 mb-1">Price Band</p>
              <p className="text-xl font-bold text-yellow-300">TBA</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-10 sm:py-14 space-y-12">

        {/* Honest status banner */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-900">
            <strong>Before you read any further:</strong> Razorpay filed <strong>confidentially</strong>.
            That means its draft prospectus is not public, so its revenue, profit and risk factors are
            genuinely unknown outside the process right now. Any site quoting a Razorpay IPO date, price
            band or GMP today is guessing. We will update this page the moment the RHP lands.
          </p>
        </section>

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
            * Issue size and valuation are figures reported in the press (including Reuters), not filed numbers.
            A confidential filing publishes nothing, so these should be treated as indicative only.
          </p>
        </section>

        {/* About */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">About Razorpay</h2>
          <div className="prose prose-sm max-w-none text-text-muted space-y-3">
            <p>
              Razorpay is a Bengaluru-based payments company founded by <strong className="text-text">Harshil Mathur and Shashank Kumar</strong>.
              Its core product is a payment gateway: it lets a business accept cards, UPI, netbanking and wallet
              payments through one integration, instead of wiring up each method separately.
            </p>
            <p>
              Over time the company has pushed beyond the gateway into business banking and adjacent financial
              products for the same customers - current accounts, payouts, payroll and related tooling. That
              matters for the IPO story, because pure payment processing in India is a <strong className="text-text">thin-margin business</strong>,
              particularly on UPI, where the zero-MDR regime limits what can be charged.
            </p>
            <p>
              Ahead of listing, Razorpay completed a <strong className="text-text">reverse flip</strong> - moving its holding
              structure back to India (reported May 2025, at a reported tax cost of roughly $150 million) and
              converting to a public limited company. Both are standard prerequisites for a domestic listing, and
              both are already done, which is why the process is considered live rather than exploratory.
            </p>
            <p>
              Razorpay was valued at about <strong className="text-text">$7.5 billion</strong> in its 2021 fundraise. The
              reported IPO target of $5-6 billion is below that - a pattern seen across several Indian startups
              that raised at 2021 peaks and are now listing into a more sober market.
            </p>
          </div>
        </section>

        {/* Pros & Cons */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Strengths &amp; Risks</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 dark:bg-sky-900/10 dark:border-sky-800 p-4">
              <h3 className="text-sm font-bold text-sky-700 dark:text-sky-400 mb-3">✓ Strengths</h3>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="text-sm text-sky-800 dark:text-sky-300 flex gap-2">
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

        {/* What to watch */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">What to Watch For When the RHP Lands</h2>
          <div className="rounded-2xl border border-border p-5">
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li className="flex gap-2"><span className="shrink-0 text-brand">1.</span><span><strong className="text-text">Revenue mix.</strong> How much comes from payment processing versus the higher-margin banking and software products.</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-brand">2.</span><span><strong className="text-text">Profitability.</strong> Whether the company is profitable at the net level, and on what basis - adjusted figures deserve scrutiny.</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-brand">3.</span><span><strong className="text-text">Take rate.</strong> The effective fee earned per rupee processed, and whether it is holding up as UPI grows as a share of volume.</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-brand">4.</span><span><strong className="text-text">Customer concentration.</strong> How much revenue depends on the largest merchants.</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-brand">5.</span><span><strong className="text-text">Fresh issue vs OFS.</strong> How much new money goes into the business versus cashing out existing investors.</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-brand">6.</span><span><strong className="text-text">The asking valuation</strong> against listed peers - and against the $7.5 billion private mark it is pricing below.</span></li>
            </ul>
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

        <IpoDematCta />

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-text mb-4">Related</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/ipos/upcoming-ipo" className="rounded-full border border-border px-3 py-2 text-text-muted hover:text-brand hover:border-brand transition-colors">Upcoming IPOs</Link>
            <Link href="/ipos/ipo-allotment-status" className="rounded-full border border-border px-3 py-2 text-text-muted hover:text-brand hover:border-brand transition-colors">How to check allotment status</Link>
            <Link href="/ipos/mainboard-vs-sme-ipo" className="rounded-full border border-border px-3 py-2 text-text-muted hover:text-brand hover:border-brand transition-colors">Mainboard vs SME IPO</Link>
            <Link href="/glossary/demat-account" className="rounded-full border border-border px-3 py-2 text-text-muted hover:text-brand hover:border-brand transition-colors">What is a demat account?</Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-xl bg-surface border border-border p-4">
          <p className="text-xs text-text-muted">
            <strong>Disclaimer:</strong> This page is for information and education, not investment advice.
            Razorpay&apos;s draft prospectus is confidential, so the figures above are press-reported rather than
            filed, and they may change. Verify everything against the RHP and official SEBI/exchange sources
            before acting. CoinMind holds no financial interest in the companies mentioned.
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
