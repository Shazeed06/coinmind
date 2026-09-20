import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "NSE IPO 2026: Price Band ₹1,785, GMP, Allotment, Review | CoinMind",
  description:
    "NSE IPO complete review: price band ₹1,700–₹1,785, lot size 8 shares, GMP ₹60, allotment 22 Sep, listing 24 Sep. Issue size ₹22,561 crore. Should you apply?",
  keywords: [
    "NSE IPO",
    "NSE IPO GMP today",
    "NSE IPO allotment date",
    "NSE IPO listing date",
    "NSE IPO review",
    "NSE IPO price band",
    "NSE IPO lot size",
    "National Stock Exchange IPO 2026",
    "NSE IPO should I apply",
    "NSE IPO subscription status",
    "NSE IPO GMP",
    "National Stock Exchange listing",
  ],
  alternates: { canonical: `${site.url}/ipos/nse-ipo` },
  openGraph: {
    title: "NSE IPO 2026: Price Band, GMP, Allotment Date & Review",
    description:
      "Full review of the National Stock Exchange of India IPO — ₹22,561 cr issue, price band ₹1,700–₹1,785, GMP ₹60, listing 24 Sep 2026.",
    url: `${site.url}/ipos/nse-ipo`,
  },
};

const IPO_DETAILS = [
  { label: "Issue Size", value: "₹22,561.57 crore" },
  { label: "Price Band", value: "₹1,700 – ₹1,785 per share" },
  { label: "Lot Size", value: "8 shares" },
  { label: "Min. Investment (Retail)", value: "₹14,280 (1 lot at ₹1,785)" },
  { label: "Open Date", value: "17 September 2026" },
  { label: "Close Date", value: "21 September 2026" },
  { label: "Allotment Date", value: "22 September 2026" },
  { label: "Refund Initiation", value: "23 September 2026" },
  { label: "Listing Date", value: "24 September 2026 (BSE & NSE)" },
  { label: "Issue Type", value: "Book Built (OFS — Offer for Sale)" },
  { label: "Exchange", value: "BSE + NSE" },
  { label: "Category", value: "Mainboard IPO" },
  { label: "GMP (20 Sep 2026)", value: "₹60 → indicative listing ₹1,845 (+3%)" },
];

const CATEGORY_ALLOC = [
  { cat: "QIB (Qualified Institutional Buyers)", alloc: "75%" },
  { cat: "NII / HNI (Non-Institutional Investors)", alloc: "15%" },
  { cat: "Retail Individual Investors", alloc: "10%" },
];

const PROS = [
  "India's largest stock exchange — processes ~90% of equity derivatives volume",
  "Near-monopoly in F&O segment; 95%+ market share in equity derivatives",
  "Strong financials: consistent revenue and profit growth over 5 years",
  "Technology leadership — NEAT (National Exchange for Automated Trading) platform",
  "Diversification: data products, co-location services, listing fees",
  "Long-awaited listing — strong institutional demand expected",
];

const CONS = [
  "OFS-only issue — no fresh capital raised; promoters are selling shares",
  "Regulatory risks: SEBI has imposed penalties on NSE in the past (co-location scam)",
  "Valuation is rich — ₹1,785 implies ~₹9 lakh crore market cap",
  "Limited upside vs. BSX (BSE) which already listed and trades at premium",
  "GMP at only +3% — grey market doesn't show strong listing enthusiasm for mainboard",
  "Largely OFS means management may be looking to cash out",
];

const ALLOTMENT_STEPS = [
  "Go to BSE website: bseindia.com → Investors → IPO Allotment Status",
  "OR registrar website: Link Intime (linkintime.co.in) or KFin Technologies",
  "Enter your Application No. or PAN or Demat Account No.",
  "Select NSE IPO from the dropdown and check status",
];

export default function NseIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "NSE IPO 2026: Complete Review, GMP, Price Band & Allotment Details",
    description:
      "Full analysis of National Stock Exchange of India IPO — price band ₹1,700–₹1,785, issue size ₹22,561 crore, GMP, allotment date 22 Sep 2026, listing 24 Sep 2026.",
    url: `${site.url}/ipos/nse-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-09-20",
    mainEntityOfPage: `${site.url}/ipos/nse-ipo`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the NSE IPO price band?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The NSE IPO price band is ₹1,700 to ₹1,785 per share. Retail investors must bid at the cut-off price (₹1,785) for a minimum of 1 lot (8 shares), totalling ₹14,280.",
        },
      },
      {
        "@type": "Question",
        name: "What is the NSE IPO GMP today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of 20 September 2026, the NSE IPO GMP (Grey Market Premium) is approximately ₹60, indicating an expected listing price of ₹1,845 — a 3% premium over the issue price. GMP is unofficial and indicative only.",
        },
      },
      {
        "@type": "Question",
        name: "What is the NSE IPO allotment date?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSE IPO allotment date is 22 September 2026. You can check allotment status on the BSE website or via the registrar (Link Intime / KFin Technologies) using your PAN, application number, or demat account.",
        },
      },
      {
        "@type": "Question",
        name: "What is the NSE IPO listing date?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSE IPO is expected to list on both BSE and NSE on 24 September 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Should I apply for NSE IPO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSE has strong fundamentals and near-monopoly in India's F&O segment. However, this is a pure OFS (no fresh capital raised) and valuation is rich at ₹9 lakh crore market cap. GMP is modest at +3%. Suitable for long-term investors; listing gains may be limited. This is not investment advice — read the DRHP before deciding.",
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
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <span>NSE IPO 2026</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 rounded-full px-3 py-1">Mainboard IPO</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">🟢 Open Now</span>
            <span className="text-[10px] font-semibold text-text-muted bg-bg-alt border border-border rounded-full px-3 py-1">Closes: 21 Sep 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            NSE IPO 2026 — National Stock Exchange of India
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            India&apos;s largest stock exchange is finally listing. NSE IPO opens 17–21 September 2026 with a price band of ₹1,700–₹1,785 per share. Issue size: ₹22,561 crore. Here&apos;s everything you need to know.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: 20 Sep 2026 · <span className="text-amber-600">GMP is unofficial and indicative only</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick GMP banner */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">GMP Today (20 Sep 2026)</p>
              <p className="text-2xl font-extrabold text-emerald-700">₹60 <span className="text-base font-semibold">(+3%)</span></p>
              <p className="text-xs text-emerald-700 mt-0.5">Indicative listing: ~₹1,845</p>
            </div>
            <div className="h-10 w-px bg-emerald-200 hidden sm:block" />
            <div>
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Closes</p>
              <p className="text-lg font-bold text-emerald-700">21 Sep 2026</p>
            </div>
            <div className="h-10 w-px bg-emerald-200 hidden sm:block" />
            <div>
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Lists on</p>
              <p className="text-lg font-bold text-emerald-700">24 Sep 2026</p>
            </div>
            <p className="text-[10px] text-emerald-600 w-full mt-1">⚠ GMP is unofficial, unregulated, and does not guarantee listing price.</p>
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

          {/* Category allocation */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Investor Category Allocation</h2>
            <div className="space-y-3">
              {CATEGORY_ALLOC.map((row) => (
                <div key={row.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text">{row.cat}</span>
                    <span className="font-semibold text-brand">{row.alloc}</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-alt overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: row.alloc }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">Retail investors can apply in the RII (Retail Individual Investor) category. Maximum application: ₹2,00,000 per PAN.</p>
          </div>

          {/* About NSE */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">About National Stock Exchange of India (NSE)</h2>
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                The National Stock Exchange of India (NSE) is India&apos;s largest stock exchange by trading volume and the world&apos;s largest derivatives exchange. Founded in 1992 and headquartered in Mumbai, NSE was the first Indian exchange to introduce electronic screen-based trading.
              </p>
              <p>
                NSE commands approximately <strong className="text-text">90–95% market share</strong> in India&apos;s equity derivatives segment (Nifty futures and options). The Nifty 50 index, India&apos;s benchmark equity index, is owned and managed by NSE Indices.
              </p>
              <p>
                Revenue streams include transaction fees (largest), data products, co-location services, listing fees, and technology licensing. NSE&apos;s NEAT trading platform processes millions of orders per second with minimal downtime.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {[
                  { stat: "₹95,000+ cr", label: "Daily Turnover (avg.)" },
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
              <h2 className="font-bold text-emerald-800 mb-3">✅ Reasons to Apply</h2>
              <ul className="space-y-2">
                {PROS.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-emerald-800">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-bold text-red-800 mb-3">⚠️ Risks &amp; Concerns</h2>
              <ul className="space-y-2">
                {CONS.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-red-800">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to check allotment */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">How to Check NSE IPO Allotment Status</h2>
            <p className="text-sm text-text-muted mb-3">Allotment date: <strong className="text-text">22 September 2026</strong></p>
            <ol className="space-y-2">
              {ALLOTMENT_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">NSE IPO — Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is the NSE IPO price band?",
                  a: "₹1,700 – ₹1,785 per share. Retail investors should bid at the cut-off price (₹1,785). Minimum 1 lot = 8 shares = ₹14,280.",
                },
                {
                  q: "What is the NSE IPO GMP today?",
                  a: "As of 20 Sep 2026, NSE IPO GMP is ~₹60, implying an indicative listing of ₹1,845 (+3%). GMP is unofficial and changes daily — it is NOT a guarantee of listing price.",
                },
                {
                  q: "What is the NSE IPO allotment date?",
                  a: "22 September 2026. Check status on BSE website or the registrar's site using your PAN or application number.",
                },
                {
                  q: "What is the NSE IPO listing date?",
                  a: "24 September 2026 — listed simultaneously on both BSE and NSE.",
                },
                {
                  q: "Is NSE IPO an OFS or Fresh Issue?",
                  a: "NSE IPO is a pure OFS (Offer for Sale). No fresh capital is raised by NSE — existing shareholders (promoters and investors) are selling their shares. The company does not receive IPO proceeds.",
                },
                {
                  q: "Should I apply for NSE IPO?",
                  a: "NSE has excellent fundamentals and a near-monopoly in India's derivatives market. However, at ~₹9 lakh crore valuation, it is rich. GMP of +3% suggests modest listing gains. Long-term investors may benefit; those looking for listing day flipping may be disappointed. This is educational information, not investment advice — consult a SEBI-registered advisor and read the DRHP before investing.",
                },
                {
                  q: "How many lots can I apply for in NSE IPO?",
                  a: "Retail investors can apply for a maximum of 14 lots (₹2 lakh limit). Allotment in oversubscribed IPOs is by lottery — each retail applicant has equal probability of getting 1 lot.",
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{faq.q}</p>
                  <p className="text-sm text-text-muted mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Investment Disclaimer:</strong> This article is for educational and informational purposes only. CoinMind is not a SEBI-registered investment adviser. Nothing here is investment advice. IPO investments carry risks including capital loss. Always read the company&apos;s DRHP (Draft Red Herring Prospectus) and consult a qualified financial adviser before investing.
            </p>
          </div>

          {/* Back to tracker */}
          <div className="text-center">
            <Link href="/ipos" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline underline-offset-2">
              ← View All Upcoming IPOs
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
