import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "IPO 2026 India: Open & Upcoming IPOs + GMP | CoinMind" },
  description:
    "Live IPO calendar for India, October-November 2026. Track open IPOs (EAAA India Alternatives, SFC Environmental), the Jio IPO listing on 28 Oct, GMP today, price band, lot size, allotment & listing dates - all in one place.",
  keywords: [
    "upcoming IPO 2026 India",
    "IPO open today India",
    "IPO calendar October 2026",
    "IPO GMP today",
    "Jio IPO",
    "new IPO India 2026",
    "mainboard IPO 2026",
    "IPO list India",
    "best IPO to apply 2026",
    "IPO allotment status",
    "IPO GMP today India",
    "IPO listing today India",
    "best IPO this week",
  ],
  alternates: { canonical: `${site.url}/ipos` },
  openGraph: {
    locale: "en_IN",
    title: "IPO 2026 India: Open & Upcoming IPOs with GMP Today",
    description:
      "Live tracker for open and upcoming IPOs in India - Jio, Tonbo, Paras Healthcare and more. Price band, GMP, lot size, allotment and listing dates.",
    url: `${site.url}/ipos`,
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO 2026 India: Open & Upcoming IPOs with GMP Today",
    description:
      "Live tracker for open and upcoming IPOs in India - Jio, Tonbo, Paras Healthcare and more. Price band, GMP, lot size, allotment and listing dates.",
  },
};

type IPO = {
  name: string;
  slug?: string;
  type: "Mainboard" | "SME";
  open: string;
  close: string;
  priceBand: string;
  lotSize?: string;
  gmp?: string;
  gmpPct?: string;
  status: "Open" | "Upcoming" | "Allotment" | "Listing Soon" | "Listed";
  listingDate?: string;
  issueSize?: string;
  result?: string;
};

// Currently open for subscription (as of 25 Oct 2026)
const OPEN: IPO[] = [
  {
    name: "EAAA India Alternatives",
    slug: "eaaa-india-alternatives-ipo",
    type: "Mainboard",
    open: "26 Oct 2026",
    close: "28 Oct 2026",
    priceBand: "₹1,585-₹1,665",
    lotSize: "9 shares",
    gmp: "₹42",
    gmpPct: "+2.5%",
    status: "Open",
    listingDate: "2 Nov 2026",
    issueSize: "₹1,200 cr OFS",
  },
  {
    name: "SFC Environmental Technologies",
    slug: "sfc-environmental-technologies-ipo",
    type: "Mainboard",
    open: "27 Oct 2026",
    close: "29 Oct 2026",
    priceBand: "₹313-₹330",
    lotSize: "45 shares",
    gmp: "₹32",
    gmpPct: "+9.7%",
    status: "Open",
    listingDate: "3 Nov 2026",
    issueSize: "₹667.53 cr",
  },
];

// Subscription closed, heading to allotment & listing
const CLOSED: IPO[] = [
  {
    name: "Reliance Jio Platforms",
    slug: "reliance-jio-ipo",
    type: "Mainboard",
    open: "21 Oct 2026",
    close: "23 Oct 2026",
    priceBand: "₹1,065-₹1,119",
    lotSize: "12 shares",
    gmp: "₹248",
    gmpPct: "+22%",
    status: "Listing Soon",
    listingDate: "28 Oct 2026",
    issueSize: "₹30,213 cr · subscribed ~21.4x",
  },
  {
    name: "Paras Healthcare",
    type: "Mainboard",
    open: "21 Oct 2026",
    close: "23 Oct 2026",
    priceBand: "₹660-₹693",
    lotSize: "21 shares",
    gmp: "₹92",
    gmpPct: "+13%",
    status: "Listing Soon",
    listingDate: "28 Oct 2026",
    issueSize: "₹1,450 cr",
  },
];

// Recently listed
const LISTED: IPO[] = [
  { name: "Tonbo Imaging India", type: "Mainboard", open: "15 Oct 2026", close: "19 Oct 2026", priceBand: "₹665-₹700", status: "Listed", listingDate: "23 Oct 2026", issueSize: "₹852 cr" },
  { name: "Bonfiglioli Transmissions", type: "Mainboard", open: "15 Oct 2026", close: "19 Oct 2026", priceBand: "₹558-₹586", status: "Listed", listingDate: "23 Oct 2026", issueSize: "₹2,534 cr" },
  { name: "Sahajanand Medical Technologies", type: "Mainboard", open: "15 Oct 2026", close: "19 Oct 2026", priceBand: "₹327-₹344", status: "Listed", listingDate: "23 Oct 2026", issueSize: "₹475 cr" },
  { name: "Zetwerk Manufacturing", type: "Mainboard", open: "15 Oct 2026", close: "19 Oct 2026", priceBand: "₹143-₹151", status: "Listed", listingDate: "23 Oct 2026", issueSize: "₹5,012 cr" },
  {
    name: "National Stock Exchange (NSE)",
    slug: "nse-ipo",
    type: "Mainboard",
    open: "17 Sep 2026",
    close: "21 Sep 2026",
    priceBand: "₹1,700-₹1,785",
    status: "Listed",
    listingDate: "24 Sep 2026",
    issueSize: "₹22,561 cr OFS",
    result: "Listed ₹1,800 (+0.8%)",
  },
];

const BIG_UPCOMING = [
  { name: "Zepto", sector: "Quick Commerce", note: "U-DRHP filed; ~₹8,010 cr fresh + OFS; timeline pushed back" },
  { name: "PhonePe", sector: "Fintech", note: "Confidential DRHP; est. ₹12,000-15,000 cr; timing under review" },
  { name: "OYO (Oravel Stays)", sector: "Hospitality Tech", note: "SEBI observations in; ~₹6,650 cr fresh" },
  { name: "Hero FinCorp", sector: "NBFC", note: "DRHP filed; ₹3,668 cr (fresh + OFS)" },
  { name: "boAt (Imagine Marketing)", sector: "Consumer Electronics", note: "Updated DRHP; cut to ₹1,500 cr" },
  { name: "Razorpay", sector: "Fintech / Payments", note: "Confidential filing; ~₹5,000 cr; targeting end-2026" },
  { name: "Veritas Finance", sector: "NBFC", note: "SEBI observations in; ~₹2,800 cr" },
  { name: "Flipkart", sector: "E-Commerce", note: "Listing deferred; no official filing yet" },
];

const STATUS_STYLE: Record<string, string> = {
  "Open": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Upcoming": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Listing Soon": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Allotment": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "Listed": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

function GmpBadge({ gmp, gmpPct }: { gmp?: string; gmpPct?: string }) {
  if (!gmp || gmp === " - ") return <span className="text-text-muted text-xs"> - </span>;
  const positive = gmpPct && gmpPct.startsWith("+") && gmpPct !== "+0%";
  const zero = gmpPct === "0%" || gmp === "₹0";
  return (
    <span className={`text-xs font-semibold ${positive ? "text-emerald-600" : zero ? "text-slate-400" : "text-red-500"}`}>
      {gmp} {gmpPct ? `(${gmpPct})` : ""}
    </span>
  );
}

function IpoTable({ ipos, title, note }: { ipos: IPO[]; title: string; note?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-text mb-1">{title}</h2>
      {note && <p className="text-sm text-text-muted mb-3">{note}</p>}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-alt text-text-muted border-b border-border">
              <th className="text-left px-4 py-3 font-semibold">Company</th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Type</th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Open - Close</th>
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Price Band</th>
              <th className="text-left px-4 py-3 font-semibold">GMP</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-bg-alt/50 transition-colors">
                <td className="px-4 py-3 font-medium text-text">
                  {ipo.slug ? (
                    <Link href={`/ipos/${ipo.slug}`} className="text-brand hover:underline underline-offset-2">
                      {ipo.name}
                    </Link>
                  ) : ipo.name}
                  {ipo.issueSize && (
                    <span className="block text-xs text-text-muted mt-0.5">{ipo.issueSize}</span>
                  )}
                  {ipo.result && (
                    <span className="block text-xs text-emerald-600 mt-0.5">{ipo.result}</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ipo.type === "Mainboard" ? "bg-brand/10 text-brand" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                    {ipo.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                  {ipo.open}<br />
                  <span className="text-xs">to {ipo.close}</span>
                  {ipo.listingDate && ipo.status !== "Listed" && <span className="block text-xs text-amber-600 mt-0.5">Lists: {ipo.listingDate}</span>}
                  {ipo.listingDate && ipo.status === "Listed" && <span className="block text-xs text-slate-500 mt-0.5">Listed: {ipo.listingDate}</span>}
                </td>
                <td className="px-4 py-3 font-medium text-text whitespace-nowrap">{ipo.priceBand}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <GmpBadge gmp={ipo.gmp} gmpPct={ipo.gmpPct} />
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLE[ipo.status] ?? ""}`}>
                    {ipo.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IpoPage() {
  // The ItemList carried numberOfItems but no itemListElement, so the markup was
  // incomplete (Semrush flagged the missing field). Build the list from the
  // actual IPOs; each entry links to its detail page where one exists.
  const ipoList = [...OPEN, ...CLOSED, ...LISTED];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Open & Upcoming IPOs in India 2026",
    description: "Live list of open and upcoming IPOs in India for October 2026",
    url: `${site.url}/ipos`,
    numberOfItems: ipoList.length,
    itemListElement: ipoList.map((ipo, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ipo.name,
      ...(ipo.slug ? { url: `${site.url}/ipos/${ipo.slug}` } : {}),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Which IPOs are open right now?", acceptedAnswer: { "@type": "Answer", text: "As of 25 October 2026, EAAA India Alternatives (Edelweiss, 26-28 Oct) and SFC Environmental Technologies (27-29 Oct) are open for subscription. The Reliance Jio Platforms IPO - India's largest-ever - has closed (subscribed ~21.4x) and lists on 28 October 2026 on BSE and NSE." } },
      { "@type": "Question", name: "What is IPO GMP (Grey Market Premium)?", acceptedAnswer: { "@type": "Answer", text: "GMP is an informal market price at which IPO shares are traded before listing. It gives a rough idea of expected listing gains. GMP is unregulated and can change daily - treat it as informal sentiment, not a guarantee." } },
      { "@type": "Question", name: "What is the minimum investment for an IPO?", acceptedAnswer: { "@type": "Answer", text: "The minimum lot size varies per IPO. For mainboard IPOs, SEBI mandates the minimum application to be between ₹10,000-₹15,000. For the Jio IPO, 1 lot = 12 shares = ₹13,428 at the upper band." } },
      { "@type": "Question", name: "What is ASBA in IPO?", acceptedAnswer: { "@type": "Answer", text: "ASBA (Application Supported by Blocked Amount) is a process where your bank blocks the application money in your account instead of debiting it. The amount is only debited if you get allotment." } },
      { "@type": "Question", name: "How is IPO allotment decided?", acceptedAnswer: { "@type": "Answer", text: "For oversubscribed IPOs, allotment in the retail category is done by lottery - each applicant has the same probability of getting 1 lot. Applying from multiple accounts (different PANs) increases your chances." } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>›</span>
            <span>IPO Tracker</span>
          </nav>
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 rounded-full px-3 py-1 mb-3">
            IPO Calendar 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            IPO 2026 India - Open &amp; Upcoming IPOs with GMP Today
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            Track every mainboard IPO open for subscription right now, the IPOs heading to listing this week - led by the Reliance Jio Platforms IPO (lists 28 Oct) - plus grey market premium (GMP), price band, lot size, and allotment dates, all in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted">
            <span className="bg-bg-alt border border-border px-3 py-1 rounded-full">Last updated: 25 Oct 2026</span>
            <span className="bg-bg-alt border border-border px-3 py-1 rounded-full">Jio IPO lists 28 Oct</span>
            <span className="text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">⚠ GMP is unofficial &amp; indicative only</span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bg-alt">
        <div className="container-main">

          {/* Jio highlight */}
          <div className="mb-10 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 to-transparent p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-brand rounded-full px-3 py-1">Spotlight</span>
              <span className="text-xs font-semibold text-emerald-700">Subscribed ~21.4x · Lists 28 Oct · GMP ~₹248 (+22%)</span>
            </div>
            <h2 className="text-xl font-bold text-text">Reliance Jio Platforms IPO - India&apos;s Biggest-Ever IPO</h2>
            <p className="mt-2 text-sm text-text-muted max-w-2xl">
              ₹30,213 crore issue, price band ₹1,065-₹1,119, lot size 12 shares (₹13,428). Subscription closed 23 Oct (~21.4x overall), allotment 26 Oct, listing 28 Oct on BSE &amp; NSE.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand text-white px-4 py-1.5 font-medium hover:opacity-90">Full Jio IPO Review</Link>
              <Link href="/ipos/jio-ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-4 py-1.5 font-medium hover:underline">Jio IPO GMP Today</Link>
              <Link href="/ipos/jio-ipo-allotment-status" className="rounded-full bg-brand/10 text-brand px-4 py-1.5 font-medium hover:underline">Allotment Status</Link>
            </div>
          </div>

          {/* Currently Open */}
          <IpoTable
            ipos={OPEN}
            title="🟢 Currently Open for Subscription"
            note="Apply now via your broker (Zerodha, Groww, Angel One, Upstox, etc.) before the close date."
          />

          {/* Closed - allotment & listing */}
          <IpoTable
            ipos={CLOSED}
            title="⏳ Closed - Allotment & Listing (28 Oct)"
            note="Subscription has closed; allotment is being finalised and shares list on 28 Oct 2026."
          />

          {/* Recently listed */}
          <IpoTable
            ipos={LISTED}
            title="● Recently Listed"
            note="Subscription closed and shares now trading on the exchanges."
          />

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-10">
            <p className="text-sm text-amber-800">
              <strong>GMP Disclaimer:</strong> Grey Market Premium (GMP) is an informal, unregulated indicator from the grey market, stamped as of 25 Oct 2026 and subject to daily change. It is <strong>not endorsed by SEBI</strong> and does not predict actual listing price. Verify price bands, lot sizes and dates against the RHP and the BSE/NSE issue pages before applying.
            </p>
          </div>

          {/* Big upcoming IPOs */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-text mb-1">🔭 Most Awaited Upcoming IPOs (Dates Not Yet Announced)</h2>
            <p className="text-sm text-text-muted mb-4">These companies have filed with SEBI or are in advanced stages. Dates and sizes are estimates and unconfirmed until the RHP is filed.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BIG_UPCOMING.map((co) => (
                <div key={co.name} className="rounded-xl border border-border bg-white p-4">
                  <p className="font-semibold text-text">{co.name}</p>
                  <p className="text-xs text-brand mt-1">{co.sector}</p>
                  <p className="text-xs text-text-muted mt-2">{co.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to apply */}
          <div className="rounded-2xl border border-border bg-white p-6 mb-10">
            <h2 className="text-lg font-bold text-text mb-4">How to Apply for an IPO in India</h2>
            <ol className="space-y-3 text-sm text-text-muted">
              {[
                { step: "1", title: "Open a Demat + Trading Account", body: "You need a demat account with a broker like Zerodha, Groww, Angel One, or Upstox to apply for IPOs." },
                { step: "2", title: "Link your bank account (ASBA / UPI)", body: "IPO applications use ASBA (Applications Supported by Blocked Amount) or UPI. Your bank blocks the amount; it is debited only if allotted." },
                { step: "3", title: "Apply on open date", body: "Log in to your broker app → IPO section → Select the IPO → Choose lot size (minimum 1 lot) → Place bid at cut-off price." },
                { step: "4", title: "Wait for allotment", body: "Allotment is by lottery for oversubscribed IPOs. Check allotment status via BSE/NSE or the registrar - see our Jio IPO allotment guide." },
                { step: "5", title: "Listing day", body: "Shares are credited to your demat before listing. You can hold or sell on listing day based on the listing premium." },
              ].map((item) => (
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

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Which IPOs are open right now?",
                  a: "As of 25 October 2026, EAAA India Alternatives (Edelweiss, 26-28 Oct) and SFC Environmental Technologies (27-29 Oct) are open for subscription. The Reliance Jio Platforms IPO - India's largest-ever - has closed (subscribed ~21.4x) and lists on 28 October 2026 on BSE and NSE.",
                },
                {
                  q: "What is IPO GMP (Grey Market Premium)?",
                  a: "GMP is an informal market price at which IPO shares are traded before listing. It gives a rough idea of expected listing gains. GMP is unregulated and can change daily - treat it as informal sentiment, not a guarantee.",
                },
                {
                  q: "What is the minimum investment for an IPO?",
                  a: "The minimum lot size varies per IPO. For mainboard IPOs, SEBI mandates the minimum application to be between ₹10,000-₹15,000. For the Jio IPO, 1 lot = 12 shares = ₹13,428 at the upper band.",
                },
                {
                  q: "What is ASBA in IPO?",
                  a: "ASBA (Application Supported by Blocked Amount) is a process where your bank blocks the application money in your account instead of debiting it. The amount is only debited if you get allotment. If not allotted, it is unblocked automatically.",
                },
                {
                  q: "How is IPO allotment decided?",
                  a: "For oversubscribed IPOs (most mainboard ones), allotment in the retail category is done by lottery - each applicant has the same probability of getting 1 lot regardless of how many lots they applied for. Applying from multiple accounts (different PANs) increases your chances.",
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text">{faq.q}</p>
                  <p className="text-sm text-text-muted mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
