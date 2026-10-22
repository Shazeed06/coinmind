import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "IPO GMP Today: Live Grey Market Premium List | CoinMind" },
  description:
    "IPO GMP today for all open and upcoming IPOs in India (18 Oct 2026). Tonbo +74%, Jio +22%, Bonfiglioli +22% - grey market premium list, implied listing price and what GMP really means.",
  keywords: [
    "IPO GMP today",
    "grey market premium today",
    "latest IPO GMP",
    "IPO GMP list",
    "IPO GMP today India",
    "today IPO grey market premium",
    "IPO GMP live",
    "mainboard IPO GMP",
  ],
  alternates: { canonical: `${site.url}/ipos/ipo-gmp-today` },
  openGraph: {
    locale: "en_IN",
    title: "IPO GMP Today: Live Grey Market Premium List (18 Oct 2026)",
    description:
      "Grey market premium today for every open and upcoming IPO - Tonbo, Jio, Bonfiglioli, Paras and more. Implied listing price and honest caveats.",
    url: `${site.url}/ipos/ipo-gmp-today`,
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO GMP Today: Live Grey Market Premium List (18 Oct 2026)",
    description:
      "Grey market premium today for every open and upcoming IPO - Tonbo, Jio, Bonfiglioli, Paras and more. Implied listing price and honest caveats.",
  },
};

const LAST_UPDATED = "18 October 2026";

type Row = {
  name: string;
  slug?: string;
  gmpSlug?: string;
  type: "Mainboard";
  band: string;
  upper: number;
  gmp: number;
  gmpPct: string;
  status: string;
};

// GMP figures collated from public grey-market trackers, 18 Oct 2026.
// Unofficial and indicative only - not quoted on any exchange.
const ROWS: Row[] = [
  { name: "Tonbo Imaging India", type: "Mainboard", band: "â‚¹665-â‚¹700", upper: 700, gmp: 515, gmpPct: "+74%", status: "Open (close 19 Oct)" },
  { name: "Reliance Jio Platforms", slug: "reliance-jio-ipo", gmpSlug: "jio-ipo-gmp-today", type: "Mainboard", band: "â‚¹1,065-â‚¹1,119", upper: 1119, gmp: 250, gmpPct: "+22%", status: "Opens 21 Oct" },
  { name: "Bonfiglioli Transmissions", type: "Mainboard", band: "â‚¹558-â‚¹586", upper: 586, gmp: 130, gmpPct: "+22%", status: "Open (close 19 Oct)" },
  { name: "Paras Healthcare", type: "Mainboard", band: "â‚¹660-â‚¹693", upper: 693, gmp: 92, gmpPct: "+13%", status: "Opens 21 Oct" },
  { name: "Sahajanand Medical Technologies", type: "Mainboard", band: "â‚¹327-â‚¹344", upper: 344, gmp: 29, gmpPct: "+8%", status: "Open (close 19 Oct)" },
  { name: "Zetwerk Manufacturing", type: "Mainboard", band: "â‚¹143-â‚¹151", upper: 151, gmp: 6, gmpPct: "+4%", status: "Open (close 19 Oct)" },
];

const FAQS = [
  {
    q: "What is the IPO GMP today?",
    a: "As of 18 October 2026, the highest grey market premium among live IPOs is Tonbo Imaging at about â‚¹515 (+74% over its â‚¹700 upper band). The Reliance Jio Platforms IPO is at ~â‚¹250 (+22%), Bonfiglioli ~â‚¹130 (+22%), Paras Healthcare ~â‚¹92 (+13%), Sahajanand Medical ~â‚¹29 (+8%) and Zetwerk ~â‚¹6 (+4%). GMP is unofficial and changes daily.",
  },
  {
    q: "Is a high GMP a guarantee of listing gains?",
    a: "No. GMP is informal grey-market sentiment, not a promise. High GMP often signals strong demand, but the actual listing price depends on final subscription, market mood on listing day and broader conditions. Many IPOs have listed well below their last-seen GMP, and some have listed above it. Treat GMP as a rough directional hint only.",
  },
  {
    q: "What is a good GMP?",
    a: "There is no fixed threshold. A GMP of 15-30% of the issue price is generally seen as healthy demand, while 50%+ suggests strong grey-market enthusiasm (and often higher risk if sentiment reverses). A GMP near zero or negative implies a flat or discounted listing is expected. Always read it alongside the company's fundamentals and valuation, never on its own.",
  },
  {
    q: "Why does GMP change daily?",
    a: "GMP is set by supply and demand among informal grey-market dealers. It moves with subscription numbers, overall market sentiment, news flow about the company or sector, and how close the listing date is. It typically swings most in the final day or two before listing, which is exactly when it is least reliable.",
  },
  {
    q: "Is grey market trading legal in India?",
    a: "The grey market itself is unofficial and unregulated - it is not conducted on any recognised stock exchange and is not endorsed by SEBI, BSE or NSE. GMP figures are simply quoted rates from this informal market. We report them for information only; we do not facilitate grey-market trades, and you should never make an investment decision based on GMP alone.",
  },
  {
    q: "How accurate is GMP?",
    a: "GMP is often directionally useful (it usually tells you whether the market expects a premium or a discount) but frequently wrong on the exact magnitude. Because it is unregulated and thinly traded, it can be manipulated or thin on volume. Verify every IPO decision against the RHP, fundamentals and official exchange data rather than relying on GMP.",
  },
];

export default function IpoGmpTodayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IPO GMP Today - Live Grey Market Premium List for India",
    description:
      "Grey market premium (GMP) today for all open and upcoming IPOs in India, with implied listing price and an honest explanation of GMP's limits.",
    url: `${site.url}/ipos/ipo-gmp-today`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/ipo-gmp-today`,
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
      { "@type": "ListItem", position: 3, name: "IPO GMP Today", item: `${site.url}/ipos/ipo-gmp-today` },
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
            <span>IPO GMP Today</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            IPO GMP Today
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            Today&apos;s grey market premium (GMP) for every open and upcoming mainboard IPO in India, with the implied listing price for each. GMP is an informal, unofficial sentiment indicator - here&apos;s the full list, plus what it does and does not tell you.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} Â· <span className="text-amber-600">GMP is unofficial and indicative, as of 18 Oct 2026.</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer block (AEO target) */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <p className="text-text font-bold leading-relaxed">
              IPO GMP (grey market premium) is the extra price, over the issue price, at which IPO shares change hands informally before they list. As of 18 Oct 2026 the top mover is Tonbo Imaging at about â‚¹515 (+74%), followed by Reliance Jio at ~â‚¹250 (+22%). GMP is unofficial, unregulated and changes daily - it hints at listing direction but never guarantees gains.
            </p>
          </div>

          {/* Master GMP table */}
          <div>
            <h2 className="text-lg font-bold text-text mb-1">What is the GMP of every live IPO today?</h2>
            <p className="text-sm text-text-muted mb-3">All open and opening mainboard IPOs, sorted by GMP. Implied listing = upper band + GMP. Figures as of 18 Oct 2026, indicative only.</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Company</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Type</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Price Band</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">GMP</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Implied Listing</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-alt/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-text">
                        {r.slug ? (
                          <Link href={`/ipos/${r.slug}`} className="text-brand hover:underline underline-offset-2">
                            {r.name}
                          </Link>
                        ) : r.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand/10 text-brand">
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-text whitespace-nowrap">{r.band}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {r.gmpSlug ? (
                          <Link href={`/ipos/${r.gmpSlug}`} className="text-emerald-600 font-semibold hover:underline underline-offset-2">
                            â‚¹{r.gmp} ({r.gmpPct})
                          </Link>
                        ) : (
                          <span className="text-emerald-600 font-semibold">â‚¹{r.gmp} ({r.gmpPct})</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-text">â‚¹{(r.upper + r.gmp).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              GMP is unofficial and indicative, as of 18 Oct 2026. It is not quoted on BSE or NSE. See the full <Link href="/ipos" className="text-brand hover:underline">IPO calendar</Link> for lot sizes, dates and issue sizes.
            </p>
          </div>

          {/* What GMP means & its limits */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-2">What does GMP mean, and what are its limits?</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Grey market premium is the price above the issue price at which IPO applications or soon-to-be-listed shares are traded informally, before official listing. If an IPO with a â‚¹700 upper band shows a GMP of â‚¹515, grey-market participants expect it to list around â‚¹1,215.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
              <li className="flex gap-2"><span className="text-brand">â€¢</span>It is <strong className="text-text">not quoted on any exchange</strong> - BSE and NSE do not publish GMP.</li>
              <li className="flex gap-2"><span className="text-brand">â€¢</span>It is <strong className="text-text">not regulated by SEBI</strong> and has no official status.</li>
              <li className="flex gap-2"><span className="text-brand">â€¢</span>It is <strong className="text-text">thinly traded</strong>, so a few deals can move the quoted number.</li>
              <li className="flex gap-2"><span className="text-brand">â€¢</span>It <strong className="text-text">changes daily</strong> and swings most in the final 1-2 days before listing.</li>
            </ul>
          </div>

          {/* Does GMP predict listing gains */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-2">Does GMP predict listing gains?</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Honestly - only loosely. GMP usually gets the <em>direction</em> right (whether a stock lists at a premium or a discount) but is frequently wrong on the <em>magnitude</em>. A stock showing a +40% GMP may list at +15%, or at +60%; the number is a sentiment reading, not a forecast. Because the grey market is informal and lightly traded, late-stage GMP can also be inflated by hype that does not survive listing day. Use GMP as one small input, and anchor your decision on the RHP, the company&apos;s financials, valuation versus listed peers, and your own risk appetite.
            </p>
          </div>

          {/* Sources note */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <h2 className="font-bold text-blue-800 mb-2">Where do these numbers come from?</h2>
            <p className="text-sm text-blue-700 leading-relaxed">
              Price bands, lot sizes and dates are verified against the <strong>RHP and the BSE/NSE issue pages</strong>, and SEBI filings. GMP figures are collated from publicly reported grey-market quotes and are <strong>unofficial and indicative only</strong> - they are not sourced from, or endorsed by, BSE, NSE or SEBI. Always confirm official data on the exchange and registrar websites before you apply.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">IPO GMP Today - FAQs</h2>
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
            <h2 className="font-bold text-text mb-3">Explore more IPO tools</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">IPO Calendar</Link>
              <Link href="/ipos/upcoming-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Upcoming IPOs</Link>
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Reliance Jio IPO</Link>
              <Link href="/ipos/jio-ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Jio IPO GMP Today</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> Grey Market Premium (GMP) is an informal, unregulated indicator not endorsed by SEBI, BSE or NSE, stamped as of 18 Oct 2026 and subject to daily change. It does not predict the actual listing price. This page is educational and not investment advice. Verify all IPO data from official SEBI/exchange/registrar sources and read the RHP before investing.
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
