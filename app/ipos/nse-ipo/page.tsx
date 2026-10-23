import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "NSE IPO 2026: Listing Price, GMP & Review | CoinMind" },
  description:
    "NSE IPO listed 24 Sep 2026 at â‚¹1,800 (+0.84%) vs â‚¹1,785 issue price. Subscribed 5.71x. â‚¹22,561 cr OFS. Latest share price, listing gain, allotment & full review.",
  keywords: [
    "NSE IPO",
    "NSE IPO listing price",
    "NSE IPO listing gain",
    "NSE share price",
    "NSE IPO review",
    "NSE IPO allotment status",
    "NSE IPO subscription status",
    "National Stock Exchange IPO 2026",
    "NSE IPO GMP",
    "NSE IPO price band",
    "NSE IPO lot size",
    "National Stock Exchange listing",
  ],
  alternates: { canonical: `${site.url}/ipos/nse-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "NSE IPO 2026: Listed at â‚¹1,800, Review & Share Price",
    description:
      "National Stock Exchange of India IPO listed 24 Sep 2026 at â‚¹1,800 (+0.84%) vs â‚¹1,785 issue. Subscribed 5.71x, â‚¹22,561 cr OFS. Latest price & full review.",
    url: `${site.url}/ipos/nse-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "NSE IPO 2026: Listed at â‚¹1,800, Review & Share Price",
    description:
      "NSE IPO listed 24 Sep 2026 at â‚¹1,800 (+0.84%) vs â‚¹1,785 issue price. Subscribed 5.71x, â‚¹22,561 cr OFS. Latest share price and full review.",
  },
};

const LAST_UPDATED = "18 October 2026";

const IPO_DETAILS = [
  { label: "Status", value: "Listed on 24 Sep 2026" },
  { label: "Issue Price", value: "â‚¹1,785 per share (top of band)" },
  { label: "Listing Price (BSE)", value: "â‚¹1,800 (+0.84% vs issue)" },
  { label: "Listing Day Range", value: "~â‚¹1,800 - â‚¹1,845/â‚¹1,878 (intraday high varies by source)" },
  { label: "Price Band", value: "â‚¹1,700 - â‚¹1,785 per share" },
  { label: "Issue Size", value: "â‚¹22,561.57 crore (100% OFS)" },
  { label: "Lot Size", value: "8 shares (â‚¹14,280 at â‚¹1,785)" },
  { label: "Overall Subscription", value: "5.71x" },
  { label: "Open - Close", value: "17 - 21 September 2026" },
  { label: "Allotment Date", value: "22 September 2026" },
  { label: "Listing Date", value: "24 September 2026 (BSE)" },
  { label: "Registrar", value: "MUFG Intime India (Link Intime)" },
  { label: "Category", value: "Mainboard IPO" },
];

const SUBSCRIPTION = [
  { cat: "QIB (Qualified Institutional Buyers)", x: "12.68x" },
  { cat: "NII / HNI (Non-Institutional)", x: "6.55x" },
  { cat: "Retail Individual Investors", x: "1.39x" },
  { cat: "Overall", x: "5.71x" },
];

const PROS = [
  "India's largest stock exchange - ~90-95% share of equity derivatives volume",
  "Near-monopoly in F&O; the Nifty 50 franchise is owned by NSE Indices",
  "Strong, cash-generative financials with consistent profit growth",
  "Diversified revenue: transaction fees, data products, co-location, listing fees",
  "Deep institutional demand - QIB portion subscribed 12.68x",
  "Long-term structural play on India's rising market participation",
];

const CONS = [
  "Muted debut - listed only +0.84% and has since slipped below the â‚¹1,785 issue price",
  "100% OFS - no fresh capital for the company; existing holders cashed out",
  "Rich valuation - roughly â‚¹9 lakh crore market cap at issue price",
  "Regulatory overhang - SEBI's past co-location case and ongoing scrutiny",
  "Retail portion only 1.39x - limited retail enthusiasm vs institutions",
  "Trading near/below issue price in October - listing gains did not sustain",
];

export default function NseIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "NSE IPO 2026: Listing Price, Subscription, Share Price & Review",
    description:
      "National Stock Exchange of India IPO listed 24 Sep 2026 at â‚¹1,800 (+0.84%) vs â‚¹1,785 issue price, subscribed 5.71x, â‚¹22,561 crore OFS.",
    url: `${site.url}/ipos/nse-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-09-16",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/nse-ipo`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "At what price did NSE IPO list?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSE listed on BSE on 24 September 2026 at â‚¹1,800, a gain of about 0.84% over the â‚¹1,785 issue price. It touched an intraday high between â‚¹1,845 and â‚¹1,878 (sources differ) before closing near â‚¹1,818 on debut.",
        },
      },
      {
        "@type": "Question",
        name: "What is the NSE share price now?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of mid-October 2026, NSE shares were trading around â‚¹1,750, slightly below the â‚¹1,785 issue price. Share prices change continuously - check the official BSE quote (scrip code 544937) for the live price.",
        },
      },
      {
        "@type": "Question",
        name: "How many times was the NSE IPO subscribed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The NSE IPO was subscribed 5.71 times overall. QIBs subscribed 12.68x, non-institutional investors 6.55x, and retail investors 1.39x.",
        },
      },
      {
        "@type": "Question",
        name: "Was the NSE IPO a fresh issue or OFS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The NSE IPO was a 100% Offer for Sale (OFS) of â‚¹22,561.57 crore. No fresh capital was raised by NSE; existing shareholders sold their shares, so the company did not receive the proceeds.",
        },
      },
      {
        "@type": "Question",
        name: "What were the NSE IPO price band and lot size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The price band was â‚¹1,700 to â‚¹1,785 per share with a lot size of 8 shares, so the minimum retail application at the cut-off price was â‚¹14,280.",
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>â€º</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>â€º</span>
            <span>NSE IPO 2026</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 rounded-full px-3 py-1">Mainboard IPO</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">â- Listed 24 Sep 2026</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">Debut +0.84%</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            NSE IPO 2026 - National Stock Exchange of India
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            India&apos;s largest stock exchange listed on 24 September 2026. The â‚¹22,561 crore OFS was subscribed 5.71x and debuted at â‚¹1,800 on BSE, just 0.84% above the â‚¹1,785 issue price. Here&apos;s the full review and where the stock stands now.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} Â· Share price data is indicative - verify on BSE (scrip 544937).</p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Listing snapshot banner */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Issue Price</p>
              <p className="text-2xl font-extrabold text-text">â‚¹1,785</p>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" />
            <div>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Listed At</p>
              <p className="text-2xl font-extrabold text-emerald-700">â‚¹1,800 <span className="text-base font-semibold">(+0.84%)</span></p>
            </div>
            <div className="h-10 w-px bg-border hidden sm:block" />
            <div>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">Price Now (16 Oct)</p>
              <p className="text-lg font-bold text-red-600">~â‚¹1,750 <span className="text-xs">(below issue)</span></p>
            </div>
            <p className="text-[10px] text-text-muted w-full mt-1">Listing-day intraday high varied by source (~â‚¹1,845-â‚¹1,878). Figures are third-party/aggregator data; verify on BSE.</p>
          </div>

          {/* Details table */}
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-bold text-text">NSE IPO Key Details</h2>
            </div>
            <div className="divide-y divide-border">
              {IPO_DETAILS.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <span className="text-text-muted font-medium shrink-0">{row.label}</span>
                  <span className="text-text text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Final Subscription (5.71x overall)</h2>
            <div className="space-y-3">
              {SUBSCRIPTION.map((row) => {
                const mult = parseFloat(row.x);
                const width = Math.min(100, (mult / 12.68) * 100);
                const strong = row.cat === "Overall";
                return (
                  <div key={row.cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={strong ? "text-text font-semibold" : "text-text"}>{row.cat}</span>
                      <span className="font-semibold text-brand">{row.x}</span>
                    </div>
                    <div className="h-2 rounded-full bg-bg-alt overflow-hidden">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-text-muted mt-3">Strong institutional demand (QIB 12.68x) but a soft retail book (1.39x). Allotment was finalised on 22 Sep 2026.</p>
          </div>

          {/* About NSE */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">About National Stock Exchange of India (NSE)</h2>
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                The National Stock Exchange of India (NSE) is India&apos;s largest stock exchange by trading volume and the world&apos;s largest derivatives exchange. Founded in 1992 and headquartered in Mumbai, NSE was the first Indian exchange to introduce electronic screen-based trading.
              </p>
              <p>
                NSE commands approximately <strong className="text-text">90-95% market share</strong> in India&apos;s equity derivatives segment (Nifty futures and options). The Nifty 50 index, India&apos;s benchmark equity index, is owned and managed by NSE Indices.
              </p>
              <p>
                Revenue streams include transaction fees (largest), data products, co-location services, listing fees, and technology licensing. Despite a muted debut, the long-term investment case rests on India&apos;s structurally rising market participation.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {[
                  { stat: "â‚¹95,000+ cr", label: "Daily Turnover (avg.)" },
                  { stat: "95%+", label: "F&O Market Share" },
                  { stat: "1992", label: "Founded" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-brand/5 border border-brand/10 p-3 text-center">
                    <p className="text-lg font-bold text-brand">{s.stat}</p>
                    <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="font-bold text-emerald-800 mb-3">âœ… Long-term Strengths</h2>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-emerald-800">
                    <span className="mt-0.5 shrink-0">â€¢</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-bold text-red-800 mb-3">âš ï¸ Risks &amp; Concerns</h2>
              <ul className="space-y-2">
                {CONS.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-red-800">
                    <span className="mt-0.5 shrink-0">â€¢</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to check allotment (historical) */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">NSE IPO Allotment Status (finalised 22 Sep 2026)</h2>
            <p className="text-sm text-text-muted mb-3">Allotment is complete and the stock is listed. If you still want to check your historical allotment:</p>
            <ol className="space-y-2">
              {[
                "Go to BSE: bseindia.com â†’ Investors â†’ Status of Issue Application",
                "OR the registrar MUFG Intime (formerly Link Intime): linkintime.co.in",
                "Enter your Application No., PAN, or Demat Account No.",
                "Select \"National Stock Exchange of India\" and check status",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">NSE IPO - Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "At what price did NSE IPO list?",
                  a: "NSE listed on BSE on 24 Sep 2026 at â‚¹1,800, up ~0.84% over the â‚¹1,785 issue price. Intraday it reached between â‚¹1,845 and â‚¹1,878 (sources differ) before closing near â‚¹1,818 on debut day.",
                },
                {
                  q: "What is the NSE share price now?",
                  a: "As of mid-October 2026, NSE traded around â‚¹1,750 - slightly below its â‚¹1,785 issue price. Prices move continuously; check the live BSE quote (scrip 544937).",
                },
                {
                  q: "How many times was the NSE IPO subscribed?",
                  a: "5.71x overall - QIB 12.68x, NII 6.55x, Retail 1.39x. Strong institutional demand, softer retail interest.",
                },
                {
                  q: "Was NSE IPO a fresh issue or OFS?",
                  a: "A 100% Offer for Sale (OFS) of â‚¹22,561.57 crore. No fresh capital went to NSE; existing shareholders sold shares.",
                },
                {
                  q: "What were the price band and lot size?",
                  a: "Price band â‚¹1,700-â‚¹1,785; lot size 8 shares; minimum retail application â‚¹14,280 at the cut-off price.",
                },
                {
                  q: "Should I buy NSE shares now?",
                  a: "NSE has excellent fundamentals and a near-monopoly in derivatives, but the valuation is rich and the stock is trading near its issue price. This is educational information, not investment advice - consult a SEBI-registered adviser before buying.",
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{faq.q}</p>
                  <p className="text-sm text-text-muted mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related IPOs - internal linking */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Related IPOs</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Reliance Jio IPO (opens 21 Oct)</Link>
              <Link href="/ipos/jio-ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Jio IPO GMP Today</Link>
              <Link href="/ipos/phonepe-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">PhonePe IPO</Link>
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">All IPOs â†’</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Investment Disclaimer:</strong> This article is for educational and informational purposes only. CoinMind is not a SEBI-registered investment adviser. Nothing here is investment advice. Share prices and listing figures are third-party/aggregator data and may be revised - verify on the official BSE/NSE quote pages. Always read the company&apos;s prospectus and consult a qualified adviser before investing.
            </p>
          </div>

          {/* Back to tracker */}
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
