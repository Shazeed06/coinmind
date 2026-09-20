import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IPO 2026 India: Upcoming & Open IPOs List with GMP | CoinMind",
  description:
    "Complete IPO calendar for September–October 2026. Track all open, upcoming, and recently listed mainboard & SME IPOs in India with price band, GMP, lot size, and allotment dates.",
  keywords: [
    "upcoming IPO 2026 India",
    "IPO open today India",
    "IPO calendar September 2026",
    "IPO GMP today",
    "new IPO India 2026",
    "mainboard IPO 2026",
    "SME IPO 2026",
    "IPO list India",
    "upcoming IPO list",
    "best IPO to apply 2026",
  ],
  alternates: { canonical: `${site.url}/ipos` },
  openGraph: {
    title: "IPO 2026 India: All Upcoming & Open IPOs with GMP",
    description:
      "Complete tracker for all open and upcoming IPOs in India — price band, GMP, lot size, allotment and listing dates. Updated daily.",
    url: `${site.url}/ipos`,
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
};

const OPEN: IPO[] = [
  {
    name: "National Stock Exchange of India",
    slug: "nse-ipo",
    type: "Mainboard",
    open: "17 Sep 2026",
    close: "21 Sep 2026",
    priceBand: "₹1,700 – ₹1,785",
    lotSize: "8 shares",
    gmp: "₹60",
    gmpPct: "+3%",
    status: "Open",
    listingDate: "24 Sep 2026",
    issueSize: "₹22,561 cr",
  },
  {
    name: "SpectraA Technology Solutions",
    type: "SME",
    open: "17 Sep 2026",
    close: "21 Sep 2026",
    priceBand: "₹112 – ₹118",
    gmp: "₹25",
    gmpPct: "+21%",
    status: "Open",
  },
  {
    name: "Sonaselection India",
    type: "Mainboard",
    open: "17 Sep 2026",
    close: "21 Sep 2026",
    priceBand: "₹94 – ₹99",
    lotSize: "150 shares",
    gmp: "₹2",
    gmpPct: "+2%",
    status: "Open",
  },
  {
    name: "Axiom Gas Engineering",
    type: "SME",
    open: "18 Sep 2026",
    close: "22 Sep 2026",
    priceBand: "₹51 – ₹54",
    lotSize: "2,000 shares",
    gmp: "₹0",
    gmpPct: "0%",
    status: "Open",
  },
  {
    name: "Kheria Autocomp",
    type: "SME",
    open: "17 Sep 2026",
    close: "21 Sep 2026",
    priceBand: "₹96 – ₹101",
    gmp: "—",
    status: "Open",
  },
];

const LISTING_SOON: IPO[] = [
  {
    name: "SS Retail",
    type: "Mainboard",
    open: "16 Sep 2026",
    close: "18 Sep 2026",
    priceBand: "₹403 – ₹424",
    gmp: "₹138",
    gmpPct: "+33%",
    status: "Listing Soon",
    listingDate: "21 Sep 2026",
  },
  {
    name: "Jindal Supreme (India)",
    type: "Mainboard",
    open: "16 Sep 2026",
    close: "18 Sep 2026",
    priceBand: "₹88 – ₹93",
    gmp: "₹26",
    gmpPct: "+28%",
    status: "Listing Soon",
    listingDate: "21 Sep 2026",
  },
  {
    name: "Hero Motors",
    type: "Mainboard",
    open: "16 Sep 2026",
    close: "18 Sep 2026",
    priceBand: "₹79 – ₹84",
    gmp: "₹0",
    gmpPct: "0%",
    status: "Listing Soon",
    listingDate: "21 Sep 2026",
  },
];

const UPCOMING: IPO[] = [
  {
    name: "Robokidz Eduventures",
    type: "SME",
    open: "21 Sep 2026",
    close: "23 Sep 2026",
    priceBand: "₹100 – ₹106",
    gmp: "₹51",
    gmpPct: "+48%",
    status: "Upcoming",
  },
  {
    name: "Adroit Industries (India)",
    type: "Mainboard",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹126 – ₹134",
    gmp: "₹35",
    gmpPct: "+26%",
    status: "Upcoming",
  },
  {
    name: "A-One Steels India",
    type: "Mainboard",
    open: "24 Sep 2026",
    close: "28 Sep 2026",
    priceBand: "₹385 – ₹405",
    gmp: "₹64",
    gmpPct: "+16%",
    status: "Upcoming",
  },
  {
    name: "Elevate Campuses",
    type: "Mainboard",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹343 – ₹362",
    gmp: "₹16",
    gmpPct: "+4%",
    status: "Upcoming",
  },
  {
    name: "Varmora Granito",
    type: "Mainboard",
    open: "22 Sep 2026",
    close: "24 Sep 2026",
    priceBand: "₹140 – ₹148",
    gmp: "₹12",
    gmpPct: "+8%",
    status: "Upcoming",
  },
  {
    name: "Swastika Infra",
    type: "Mainboard",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹175 – ₹185",
    gmp: "₹3",
    gmpPct: "+2%",
    status: "Upcoming",
  },
  {
    name: "ArMee Infotech",
    type: "Mainboard",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹350 – ₹375",
    gmp: "₹1",
    gmpPct: "0%",
    status: "Upcoming",
  },
  {
    name: "FX Multitech",
    type: "SME",
    open: "21 Sep 2026",
    close: "23 Sep 2026",
    priceBand: "₹110 – ₹116",
    gmp: "₹0",
    status: "Upcoming",
  },
  {
    name: "Vivekanand Cotspin",
    type: "SME",
    open: "21 Sep 2026",
    close: "23 Sep 2026",
    priceBand: "₹32 – ₹37",
    gmp: "₹0",
    status: "Upcoming",
  },
  {
    name: "Anand Seamless",
    type: "SME",
    open: "22 Sep 2026",
    close: "24 Sep 2026",
    priceBand: "₹72",
    gmp: "₹0",
    status: "Upcoming",
  },
  {
    name: "Himalaya Nutravedics India",
    type: "SME",
    open: "22 Sep 2026",
    close: "24 Sep 2026",
    priceBand: "₹100 – ₹106",
    gmp: "₹0",
    status: "Upcoming",
  },
  {
    name: "Liqvd Digital India",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹51 – ₹54",
    gmp: "—",
    status: "Upcoming",
  },
  {
    name: "Pooja Logistics",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹109 – ₹115",
    gmp: "—",
    status: "Upcoming",
  },
  {
    name: "Coreintegra Consulting",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹74 – ₹78",
    gmp: "—",
    status: "Upcoming",
  },
  {
    name: "Sai Urja Indo Ventures",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹107 – ₹113",
    gmp: "—",
    status: "Upcoming",
  },
  {
    name: "Unitec Fibres",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹83 – ₹88",
    gmp: "—",
    status: "Upcoming",
  },
  {
    name: "S.K.Offset",
    type: "SME",
    open: "23 Sep 2026",
    close: "25 Sep 2026",
    priceBand: "₹119 – ₹125",
    gmp: "—",
    status: "Upcoming",
  },
];

const BIG_UPCOMING = [
  { name: "Reliance Jio", sector: "Telecom", note: "Most awaited; timeline Q4 2026" },
  { name: "Zepto", sector: "Quick Commerce", note: "DRHP filed; dates TBA" },
  { name: "PhonePe", sector: "Fintech", note: "Valuation ~$12B; date unconfirmed" },
  { name: "Razorpay", sector: "Fintech / Payments", note: "DRHP under review" },
  { name: "OYO", sector: "Hospitality Tech", note: "Multiple delay history; re-filed" },
  { name: "Hero FinCorp", sector: "NBFC", note: "DRHP approved; launch likely soon" },
  { name: "Tata Play", sector: "DTH / Media", note: "Awaiting SEBI clearance" },
  { name: "Flipkart India", sector: "E-Commerce", note: "Speculative; no official filing" },
];

const STATUS_STYLE: Record<string, string> = {
  "Open": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Upcoming": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Listing Soon": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Allotment": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "Listed": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

function GmpBadge({ gmp, gmpPct }: { gmp?: string; gmpPct?: string }) {
  if (!gmp || gmp === "—") return <span className="text-text-muted text-xs">—</span>;
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
              <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Open – Close</th>
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
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ipo.type === "Mainboard" ? "bg-brand/10 text-brand" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                    {ipo.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                  {ipo.open}<br />
                  <span className="text-xs">to {ipo.close}</span>
                  {ipo.listingDate && <span className="block text-xs text-amber-600 mt-0.5">Lists: {ipo.listingDate}</span>}
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming IPOs in India 2026",
    description: "Complete list of open and upcoming IPOs in India for September–October 2026",
    url: `${site.url}/ipos`,
    numberOfItems: OPEN.length + UPCOMING.length,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            Upcoming IPO 2026 India — Open, Allotment & Listing Dates
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            Track all mainboard and SME IPOs open for subscription right now, upcoming IPOs for September–October 2026, grey market premium (GMP), price band, lot size, and allotment dates — all in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted">
            <span className="bg-bg-alt border border-border px-3 py-1 rounded-full">Last updated: 20 Sep 2026</span>
            <span className="bg-bg-alt border border-border px-3 py-1 rounded-full">51 IPOs in Sep 2026</span>
            <span className="bg-bg-alt border border-border px-3 py-1 rounded-full">23 Mainboard · 28 SME</span>
            <span className="text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">⚠ GMP is unofficial &amp; indicative only</span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-bg-alt">
        <div className="container-main">

          {/* Currently Open */}
          <IpoTable
            ipos={OPEN}
            title="🟢 Currently Open for Subscription"
            note="IPOs you can apply to right now via your broker (Zerodha, Groww, Angel One, etc.)"
          />

          {/* Listing Soon */}
          <IpoTable
            ipos={LISTING_SOON}
            title="🔔 Subscription Closed — Listing Soon"
            note="Subscription closed; allotment done or pending; listing dates confirmed"
          />

          {/* Upcoming */}
          <IpoTable
            ipos={UPCOMING}
            title="📅 Upcoming IPOs — September 2026"
            note="Subscription opens in the coming days. Apply on open date via your broker app."
          />

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-10">
            <p className="text-sm text-amber-800">
              <strong>GMP Disclaimer:</strong> Grey Market Premium (GMP) is an informal, unregulated indicator from the grey market. It is <strong>not endorsed by SEBI</strong> and does not predict actual listing price. CoinMind does not guarantee GMP accuracy. Always read the DRHP before investing.
            </p>
          </div>

          {/* Big upcoming IPOs */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-text mb-1">🚀 Most Awaited Upcoming IPOs (Dates Not Yet Announced)</h2>
            <p className="text-sm text-text-muted mb-4">These companies have filed DRHP with SEBI or are in advanced stages. Subscription dates are yet to be announced.</p>
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
                { step: "2", title: "Link your bank account (ASBA)", body: "All IPO applications use ASBA (Applications Supported by Blocked Amount). Your bank blocks the amount; it is debited only if allotted." },
                { step: "3", title: "Apply on open date", body: "Log in to your broker app → IPO section → Select the IPO → Choose lot size (minimum 1 lot) → Place bid at cut-off price." },
                { step: "4", title: "Wait for allotment", body: "Allotment is done on a lottery basis for oversubscribed IPOs. Check allotment status via BSE/NSE website or your broker." },
                { step: "5", title: "Listing day", body: "Shares are credited to your demat account before listing. You can hold or sell on listing day based on listing premium." },
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
                  q: "What is IPO GMP (Grey Market Premium)?",
                  a: "GMP is an informal market price at which IPO shares are traded before listing. It gives a rough idea of expected listing gains. GMP is unregulated and can change daily — treat it as informal sentiment, not a guarantee.",
                },
                {
                  q: "What is the minimum investment for an IPO?",
                  a: "The minimum lot size varies per IPO. For mainboard IPOs, SEBI mandates the minimum application to be between ₹10,000–₹15,000. For NSE IPO, 1 lot = 8 shares = ₹14,280 (at upper band ₹1,785).",
                },
                {
                  q: "What is ASBA in IPO?",
                  a: "ASBA (Application Supported by Blocked Amount) is a process where your bank blocks the application money in your account instead of debiting it. The amount is only debited if you get allotment. If not allotted, it is unblocked automatically.",
                },
                {
                  q: "What is the difference between Mainboard and SME IPO?",
                  a: "Mainboard IPOs are for larger companies listed on NSE/BSE main board (minimum paid-up capital ₹10 cr+). SME IPOs are for smaller companies listed on NSE Emerge or BSE SME platforms. SME IPOs typically have larger lot sizes (higher minimum investment) and are considered higher risk.",
                },
                {
                  q: "How is IPO allotment decided?",
                  a: "For oversubscribed IPOs (most mainboard ones), allotment in the retail category is done by lottery — each applicant has the same probability of getting 1 lot regardless of how many lots they applied for. Applying from multiple accounts (different PANs) increases your chances.",
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
