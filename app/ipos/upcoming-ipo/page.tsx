import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Upcoming IPO 2026 India: Full List & Dates | CoinMind" },
  description:
    "Upcoming IPO 2026 list for India. Reliance Jio opens 21 Oct, Paras Healthcare too; Tonbo, Bonfiglioli, Zetwerk open now. Plus the most-awaited pipeline - Zepto, PhonePe, OYO, boAt, Razorpay.",
  keywords: [
    "upcoming IPO",
    "upcoming IPO 2026",
    "upcoming IPO this week",
    "upcoming IPO this month",
    "new IPO 2026",
    "upcoming IPO in India",
    "upcoming IPO list India",
    "next IPO India",
  ],
  alternates: { canonical: `${site.url}/ipos/upcoming-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "Upcoming IPO 2026 India: Full List, Dates & Pipeline",
    description:
      "Every upcoming IPO in India for 2026 - Reliance Jio and Paras opening this week, plus the awaited Zepto, PhonePe, OYO, boAt and Razorpay pipeline.",
    url: `${site.url}/ipos/upcoming-ipo`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming IPO 2026 India: Full List, Dates & Pipeline",
    description:
      "Every upcoming IPO in India for 2026 - Reliance Jio and Paras opening this week, plus the awaited Zepto, PhonePe, OYO, boAt and Razorpay pipeline.",
  },
};

const LAST_UPDATED = "18 October 2026";

type IPO = {
  name: string;
  slug?: string;
  band: string;
  lot: string;
  gmp: string;
  gmpPct: string;
  issueSize: string;
};

// Opening 21-23 Oct 2026 (allotment 26 Oct, listing 28 Oct)
const OPENING: IPO[] = [
  { name: "Reliance Jio Platforms", slug: "reliance-jio-ipo", band: "â‚¹1,065-â‚¹1,119", lot: "12 shares", gmp: "â‚¹250", gmpPct: "+22%", issueSize: "â‚¹30,213 cr (fresh)" },
  { name: "Paras Healthcare", band: "â‚¹660-â‚¹693", lot: "21 shares", gmp: "â‚¹92", gmpPct: "+13%", issueSize: "â‚¹1,450 cr" },
];

// Open now, close 19 Oct 2026 (listing ~23 Oct)
const OPEN_NOW: IPO[] = [
  { name: "Tonbo Imaging India", band: "â‚¹665-â‚¹700", lot: "21 shares", gmp: "â‚¹515", gmpPct: "+74%", issueSize: "â‚¹852 cr OFS" },
  { name: "Bonfiglioli Transmissions", band: "â‚¹558-â‚¹586", lot: "25 shares", gmp: "â‚¹130", gmpPct: "+22%", issueSize: "â‚¹2,534 cr" },
  { name: "Sahajanand Medical Technologies", band: "â‚¹327-â‚¹344", lot: "43 shares", gmp: "â‚¹29", gmpPct: "+8%", issueSize: "â‚¹475 cr" },
  { name: "Zetwerk Manufacturing", band: "â‚¹143-â‚¹151", lot: "99 shares", gmp: "â‚¹6", gmpPct: "+4%", issueSize: "â‚¹5,012 cr" },
];

const PIPELINE = [
  { name: "Zepto", sector: "Quick Commerce", note: "U-DRHP filed; ~â‚¹8,010 cr. Dates not announced; estimates, unconfirmed." },
  { name: "PhonePe", sector: "Fintech", note: "Confidential DRHP; est. â‚¹12,000-15,000 cr. Dates not announced; estimates, unconfirmed." },
  { name: "OYO (Oravel Stays)", sector: "Hospitality Tech", note: "SEBI observations in; ~â‚¹6,650 cr. Dates not announced; estimates, unconfirmed." },
  { name: "Hero FinCorp", sector: "NBFC", note: "DRHP filed; â‚¹3,668 cr (fresh + OFS). Dates not announced; estimates, unconfirmed." },
  { name: "boAt (Imagine Marketing)", sector: "Consumer Electronics", note: "Updated DRHP; ~â‚¹1,500 cr. Dates not announced; estimates, unconfirmed." },
  { name: "Razorpay", sector: "Fintech / Payments", note: "Confidential filing; ~â‚¹5,000 cr. Dates not announced; estimates, unconfirmed." },
  { name: "Veritas Finance", sector: "NBFC", note: "SEBI observations in; ~â‚¹2,800 cr. Dates not announced; estimates, unconfirmed." },
  { name: "Flipkart", sector: "E-Commerce", note: "Listing deferred; no official filing yet. Dates not announced; estimates, unconfirmed." },
];

const FAQS = [
  {
    q: "Which IPO is coming next in India?",
    a: "The next big IPO is Reliance Jio Platforms, opening 21 October 2026 at a price band of â‚¹1,065-â‚¹1,119, alongside Paras Healthcare (â‚¹660-â‚¹693). Both close on 23 October, with allotment around 26 October and listing on 28 October 2026. Four mainboard IPOs - Tonbo Imaging, Bonfiglioli, Sahajanand Medical and Zetwerk - are already open and close on 19 October.",
  },
  {
    q: "What are the biggest upcoming IPOs in 2026?",
    a: "After Jio (~â‚¹30,213 cr), the most-awaited names in the pipeline are PhonePe (est. â‚¹12,000-15,000 cr), Zepto (~â‚¹8,010 cr), OYO (~â‚¹6,650 cr), Razorpay (~â‚¹5,000 cr), Hero FinCorp (â‚¹3,668 cr), Veritas Finance (~â‚¹2,800 cr) and boAt (~â‚¹1,500 cr). Flipkart's listing has been deferred. For all of these, dates are not announced and the sizes are estimates, unconfirmed until an RHP is filed.",
  },
  {
    q: "How do I apply for an upcoming IPO?",
    a: "Open a demat and trading account with a broker (Zerodha, Groww, Angel One, Upstox, etc.), keep funds ready via UPI or ASBA, then on the IPO's open date go to the IPO section of your broker app, select the IPO, choose at least one lot, bid at the cut-off price and approve the UPI mandate. Your money is only blocked - it is debited only if you are allotted shares.",
  },
  {
    q: "Where can I see confirmed IPO dates?",
    a: "Confirmed open, close, allotment and listing dates come from the company's RHP (Red Herring Prospectus) and the BSE/NSE issue pages. Until an RHP is filed and the price band is announced, any dates circulating for pipeline names like Zepto, PhonePe or OYO are estimates only. Our IPO calendar flags which dates are confirmed versus tentative.",
  },
  {
    q: "What is the difference between DRHP and RHP?",
    a: "A DRHP (Draft Red Herring Prospectus) is the preliminary document a company files with SEBI for review - it does not contain the final price band or dates. The RHP (Red Herring Prospectus) is the final, SEBI-cleared version filed just before the IPO opens; it carries the confirmed price band, lot size and subscription dates. An IPO is only truly 'confirmed' once the RHP is out.",
  },
];

export default function UpcomingIpoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Upcoming IPO 2026 India - Full List, Dates & Pipeline",
    description:
      "Every upcoming IPO in India for 2026 - opening this week, open now, and the most-awaited pipeline with estimated sizes.",
    url: `${site.url}/ipos/upcoming-ipo`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/upcoming-ipo`,
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
      { "@type": "ListItem", position: 3, name: "Upcoming IPO", item: `${site.url}/ipos/upcoming-ipo` },
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
            <span>Upcoming IPO</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Upcoming IPO 2026 (India)
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            A live list of upcoming IPOs in India - the big names opening this week led by the Reliance Jio Platforms IPO, the mainboard IPOs open for subscription right now, and the most-awaited pipeline whose dates are still to be announced.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} Â· <span className="text-amber-600">GMP is unofficial and indicative, as of 18 Oct 2026.</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer block (AEO target) */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <p className="text-text font-bold leading-relaxed">
              The next big IPO is Reliance Jio, opening 21 Oct 2026 at a price band of â‚¹1,065-â‚¹1,119, alongside Paras Healthcare. Both close 23 Oct, with listing on 28 Oct. Four mainboard IPOs (Tonbo, Bonfiglioli, Sahajanand Medical, Zetwerk) are open now and close 19 Oct. Beyond these, PhonePe, Zepto, OYO, Razorpay and boAt are in the pipeline with dates not yet announced.
            </p>
          </div>

          {/* Opening this week */}
          <div>
            <h2 className="text-lg font-bold text-text mb-1">Which IPOs open this week (21-23 Oct)?</h2>
            <p className="text-sm text-text-muted mb-3">Big-ticket mainboard IPOs opening for subscription this week. Allotment ~26 Oct, listing ~28 Oct 2026.</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Company</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Price Band</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Lot Size</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">GMP</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Issue Size</th>
                  </tr>
                </thead>
                <tbody>
                  {OPENING.map((ipo, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-alt/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text">
                        {ipo.slug ? (
                          <Link href={`/ipos/${ipo.slug}`} className="text-brand hover:underline underline-offset-2">{ipo.name}</Link>
                        ) : ipo.name}
                      </td>
                      <td className="px-4 py-3 font-medium text-text whitespace-nowrap">{ipo.band}</td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{ipo.lot}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><span className="text-emerald-600 font-semibold">{ipo.gmp} ({ipo.gmpPct})</span></td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{ipo.issueSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Open now */}
          <div>
            <h2 className="text-lg font-bold text-text mb-1">Which IPOs are open right now (close 19 Oct)?</h2>
            <p className="text-sm text-text-muted mb-3">Apply now via your broker (Zerodha, Groww, Angel One, Upstox, etc.). These list around 23 Oct 2026.</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Company</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Price Band</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Lot Size</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">GMP</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Issue Size</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN_NOW.map((ipo, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-alt/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text">{ipo.name}</td>
                      <td className="px-4 py-3 font-medium text-text whitespace-nowrap">{ipo.band}</td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{ipo.lot}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><span className="text-emerald-600 font-semibold">{ipo.gmp} ({ipo.gmpPct})</span></td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{ipo.issueSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">GMP is unofficial and indicative, as of 18 Oct 2026. See day-wise detail on the <Link href="/ipos/ipo-gmp-today" className="text-brand hover:underline">IPO GMP Today</Link> page.</p>
          </div>

          {/* Pipeline cards */}
          <div>
            <h2 className="text-lg font-bold text-text mb-1">Most-awaited pipeline (dates TBA)</h2>
            <p className="text-sm text-text-muted mb-4">These companies have filed with SEBI or are in advanced stages. All dates and sizes below are estimates and unconfirmed until an RHP is filed - there is no GMP for these yet.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PIPELINE.map((co) => (
                <div key={co.name} className="rounded-2xl border border-border bg-white p-5">
                  <p className="font-semibold text-text">{co.name}</p>
                  <p className="text-xs text-brand mt-1">{co.sector}</p>
                  <p className="text-xs text-text-muted mt-2">{co.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to apply */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">How to apply for an upcoming IPO</h2>
            <ol className="space-y-3 text-sm text-text-muted">
              {[
                { title: "Open a demat + trading account", body: "You need a demat account with a broker such as Zerodha, Groww, Angel One or Upstox before you can apply for any IPO." },
                { title: "Keep funds ready (UPI / ASBA)", body: "IPO applications block money via UPI or ASBA rather than debiting it. Make sure your linked bank account has enough balance for at least one lot." },
                { title: "Apply on the open date", body: "On the IPO's open date, go to the IPO section of your broker app, select the IPO, choose at least one lot and bid at the cut-off price, then approve the UPI mandate." },
                { title: "Wait for allotment", body: "For oversubscribed IPOs, allotment is by lottery. Check your status on BSE or the registrar once the basis of allotment is finalised." },
                { title: "Listing day", body: "If allotted, shares are credited to your demat one day before listing. You can then hold or sell on listing day based on the listing price." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-medium text-text">{item.title}</p>
                    <p className="mt-0.5">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Upcoming IPO - FAQs</h2>
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
            <h2 className="font-bold text-text mb-3">More IPO resources</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">IPO Calendar</Link>
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Reliance Jio IPO</Link>
              <Link href="/ipos/ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">IPO GMP Today</Link>
              <Link href="/ipos/best-upcoming-ipos-2026" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Best Upcoming IPOs 2026</Link>
              <Link href="/ipos/mainboard-vs-sme-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Mainboard vs SME IPO</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This page is educational and not investment advice. Pipeline dates and issue sizes are estimates and unconfirmed until an RHP is filed. Grey Market Premium (GMP) is an informal, unregulated indicator not endorsed by SEBI, BSE or NSE, stamped as of 18 Oct 2026 and subject to daily change. Verify all IPO data from official SEBI/exchange/registrar sources and read the RHP before investing.
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
