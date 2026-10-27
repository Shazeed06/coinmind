import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Best Upcoming IPOs 2026: Ranked Shortlist | CoinMind" },
  description:
    "Our editorial ranking of the best upcoming IPOs in India for 2026 - Jio, PhonePe, Razorpay, Zepto, OYO, Hero FinCorp and boAt - with issue size, why each matters, GMP where it trades and the key risk.",
  keywords: [
    "best upcoming IPO 2026",
    "best IPO to apply",
    "upcoming IPO with good GMP",
    "biggest upcoming IPO India",
    "most awaited IPO",
    "upcoming IPO India 2026",
    "most anticipated IPO 2026",
    "best IPO 2026 India",
  ],
  alternates: { canonical: `${site.url}/ipos/best-upcoming-ipos-2026` },
  openGraph: {
    locale: "en_IN",
    title: "Best Upcoming IPOs 2026: Our Ranked Shortlist (India)",
    description:
      "A ranked, editorial shortlist of the most notable upcoming IPOs in India for 2026 - what each company does, issue size, why it is notable and the key risk.",
    url: `${site.url}/ipos/best-upcoming-ipos-2026`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Upcoming IPOs 2026: Our Ranked Shortlist (India)",
    description:
      "A ranked, editorial shortlist of the most notable upcoming IPOs in India for 2026 - what each company does, issue size, why it is notable and the key risk.",
  },
};

const LAST_UPDATED = "18 October 2026";

type ShortlistItem = {
  rank: number;
  name: string;
  sector: string;
  does: string;
  issueSize: string;
  notable: string;
  sentiment: string;
  trading: boolean;
  risk: string;
};

const SHORTLIST: ShortlistItem[] = [
  {
    rank: 1,
    name: "Reliance Jio Platforms",
    sector: "Telecom & Digital Services",
    does: "India's largest telecom and digital-services platform, with 524+ million subscribers and roughly 60% of the country's wireless data traffic, spanning Jio 5G, JioFiber, JioAirFiber and enterprise services.",
    issueSize: "~₹30,213 cr (100% fresh issue)",
    notable: "India's biggest-ever IPO and the only name on this list with confirmed dates (subscription 21-23 Oct 2026) - it is already live in the grey market.",
    sentiment: "GMP around ₹250 (+22% over the ₹1,119 upper band) as of 18 Oct 2026 - unofficial and indicative only.",
    trading: true,
    risk: "Rich reported valuation ($114-146 billion) leaves little margin of safety, and the huge issue size means heavy retail competition and possibly thin allotment odds.",
  },
  {
    rank: 2,
    name: "PhonePe",
    sector: "Fintech / Payments",
    does: "India's largest UPI payments app by transaction volume, expanding into lending distribution, insurance, a payment gateway and stockbroking (Share.Market).",
    issueSize: "Estimated ₹12,000-15,000 cr (unconfirmed)",
    notable: "One of India's most-watched fintech listings, with a dominant share of UPI payments and a large merchant and consumer base.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "UPI carries zero merchant discount rate, so monetisation depends on cross-selling credit and other products - the path to sustained profitability is still unproven.",
  },
  {
    rank: 3,
    name: "Razorpay",
    sector: "Fintech / Payments",
    does: "A full-stack payments and business-banking platform for merchants - payment gateway, RazorpayX neobanking, payroll and merchant lending.",
    issueSize: "~₹5,000 cr (confidential filing, targeting late 2026)",
    notable: "Redomiciled to India ahead of a listing, with a strong small-business and enterprise payments franchise and a maturing revenue model.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "Intense competition from PhonePe, Paytm and banks can pressure take-rates, and the timeline remains unconfirmed until a DRHP is public.",
  },
  {
    rank: 4,
    name: "Zepto",
    sector: "Quick Commerce",
    does: "A quick-commerce platform delivering groceries and daily essentials in minutes through a network of dark stores across major cities.",
    issueSize: "~₹8,010 cr (fresh + OFS; U-DRHP filed, timeline pushed back)",
    notable: "The fastest-scaling quick-commerce challenger to Blinkit and Instamart, with rapid revenue growth and expanding city coverage.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "High cash burn, thin or negative margins and aggressive price competition make the route to profitability the central question for investors.",
  },
  {
    rank: 5,
    name: "OYO (Oravel Stays)",
    sector: "Hospitality Tech",
    does: "A travel-tech and budget-hospitality platform that franchises hotels and homes in India and overseas on an asset-light model.",
    issueSize: "~₹6,650 cr fresh (SEBI observations in)",
    notable: "A second IPO attempt after earlier plans were shelved, this time backed by a return to reported profitability.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "A history of sharp private valuation cuts, past disclosure scrutiny and cyclical travel demand all weigh on the story.",
  },
  {
    rank: 6,
    name: "Hero FinCorp",
    sector: "NBFC / Lending",
    does: "A diversified non-banking financial company linked to the Hero group, lending across two-wheeler finance, consumer loans, SME finance and loans against property.",
    issueSize: "₹3,668 cr (fresh + OFS; DRHP filed)",
    notable: "An established NBFC with a recognised brand parent and a broad retail lending book across India.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "Earnings are sensitive to the credit-cost cycle and interest rates, and unsecured lending exposure can raise asset-quality risk in a downturn.",
  },
  {
    rank: 7,
    name: "boAt (Imagine Marketing)",
    sector: "Consumer Electronics",
    does: "A consumer-electronics brand best known for audio products - earbuds, headphones and speakers - alongside a growing smartwatch range.",
    issueSize: "~₹1,500 cr (cut from earlier plans; updated DRHP)",
    notable: "A leading Indian audio brand making a second attempt at listing after shelving its 2022 plans.",
    sentiment: "No price band announced yet, so there is no grey market price or GMP to track.",
    trading: false,
    risk: "Thin hardware margins, heavy dependence on imported components and fierce price competition make scale-versus-profit a persistent tension.",
  },
];

const BIGGEST_BY_SIZE = [
  { name: "Reliance Jio Platforms", size: "~₹30,213 cr", note: "100% fresh issue · dates confirmed" },
  { name: "PhonePe", size: "Est. ₹12,000-15,000 cr", note: "Estimate · unconfirmed" },
  { name: "Zepto", size: "~₹8,010 cr", note: "Fresh + OFS · U-DRHP filed" },
  { name: "OYO (Oravel Stays)", size: "~₹6,650 cr", note: "Fresh · SEBI observations in" },
  { name: "Razorpay", size: "~₹5,000 cr", note: "Estimate · confidential filing" },
  { name: "Hero FinCorp", size: "₹3,668 cr", note: "Fresh + OFS · DRHP filed" },
  { name: "boAt (Imagine Marketing)", size: "~₹1,500 cr", note: "Updated DRHP" },
];

const FAQS = [
  {
    q: "Which upcoming IPO has the highest GMP?",
    a: "Among the big upcoming IPOs, only Reliance Jio is actually trading in the grey market right now, with a GMP of about ₹250 (+22% over the ₹1,119 upper band) as of 18 Oct 2026 - unofficial and indicative. PhonePe, Razorpay, Zepto, OYO, Hero FinCorp and boAt have no price band yet, so no GMP exists for them; any figure quoted for those is speculation.",
  },
  {
    q: "Which is the biggest upcoming IPO in India?",
    a: "Reliance Jio Platforms is the biggest, at roughly ₹30,213 crore in a 100% fresh issue - India's largest-ever public offering. PhonePe would be the next largest if it lists at its estimated ₹12,000-15,000 crore, followed by Zepto (~₹8,010 cr) and OYO (~₹6,650 cr). Sizes for every name except Jio are unconfirmed estimates.",
  },
  {
    q: "Should I apply to an IPO just for listing gains?",
    a: "Applying only for listing gains is a bet on short-term grey-market sentiment, which is unregulated and frequently wrong on magnitude. GMP can collapse in the final days before listing, and oversubscribed retail quotas are allotted by lottery, so you may not even get shares. Treat listing gains as a possibility, not a plan, and never apply with money you cannot afford to have blocked.",
  },
  {
    q: "How do I judge if an IPO is worth applying to?",
    a: "Read the RHP rather than headlines. Check what the company actually does and whether it is profitable, how the proceeds will be used (fresh issue funds the business; an OFS mainly lets existing holders exit), the valuation versus listed peers, promoter holding and lock-ins, and the key risk factors the company itself discloses. GMP is sentiment, not a substitute for that work.",
  },
  {
    q: "What is the most anticipated IPO of 2026?",
    a: "Reliance Jio is the most anticipated IPO of 2026 - it is the largest-ever Indian issue and the only one on our shortlist with confirmed dates. PhonePe is the most awaited among the fintech names still in the pipeline, with Razorpay and Zepto close behind.",
  },
];

export default function BestUpcomingIposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Upcoming IPOs 2026 in India - Our Ranked Editorial Shortlist",
    description:
      "An editorial, ranked shortlist of the most notable upcoming IPOs in India for 2026, with issue size, why each is notable, GMP where it trades and the key risk.",
    url: `${site.url}/ipos/best-upcoming-ipos-2026`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/best-upcoming-ipos-2026`,
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
      { "@type": "ListItem", position: 3, name: "Best Upcoming IPOs 2026", item: `${site.url}/ipos/best-upcoming-ipos-2026` },
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
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <span>Best Upcoming IPOs 2026</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Best Upcoming IPOs 2026 in India
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            A ranked editorial shortlist of the most notable upcoming IPOs in India for 2026 - what each company does, how big the issue is, why it stands out and the key risk to weigh. This is our analysis, not a recommendation to buy.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED} · <span className="text-amber-600">Ranking is editorial opinion; GMP is unofficial and indicative only.</span></p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer block */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-base font-bold text-text mb-2">The short answer: our top three</h2>
            <p className="text-sm text-text leading-relaxed font-semibold">
              Our top three upcoming IPOs for 2026 are <strong className="text-brand">Reliance Jio</strong> (India's biggest-ever issue, strong franchise, the only one with confirmed dates), <strong className="text-brand">PhonePe</strong> (dominant UPI payments scale, the most awaited fintech listing) and <strong className="text-brand">Razorpay</strong> (a maturing full-stack merchant-payments business). All rankings below are editorial opinion, not investment advice.
            </p>
          </div>

          {/* Ranked shortlist */}
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-text">Our ranked shortlist of upcoming IPOs</h2>
              <p className="text-sm text-text-muted mt-1">
                Ranked on business quality, issue structure, disclosure readiness and how close each is to listing. Only Jio has confirmed dates and a live grey market; every other size and timeline below is an unconfirmed estimate.
              </p>
            </div>

            {SHORTLIST.map((item) => (
              <div key={item.rank} className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="h-8 w-8 shrink-0 rounded-full bg-brand/10 text-brand font-extrabold text-sm flex items-center justify-center">
                    {item.rank}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-text">{item.name}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-brand bg-brand/10 rounded-full px-2 py-0.5">{item.sector}</span>
                    </div>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div className="sm:flex sm:gap-2">
                        <dt className="text-text-muted font-medium sm:w-32 sm:shrink-0">What it does</dt>
                        <dd className="text-text">{item.does}</dd>
                      </div>
                      <div className="sm:flex sm:gap-2">
                        <dt className="text-text-muted font-medium sm:w-32 sm:shrink-0">Issue size</dt>
                        <dd className="text-text font-medium">{item.issueSize}</dd>
                      </div>
                      <div className="sm:flex sm:gap-2">
                        <dt className="text-text-muted font-medium sm:w-32 sm:shrink-0">Why notable</dt>
                        <dd className="text-text">{item.notable}</dd>
                      </div>
                      <div className="sm:flex sm:gap-2">
                        <dt className="text-text-muted font-medium sm:w-32 sm:shrink-0">GMP / sentiment</dt>
                        <dd className={item.trading ? "text-sky-700 font-medium" : "text-text-muted"}>{item.sentiment}</dd>
                      </div>
                      <div className="sm:flex sm:gap-2">
                        <dt className="text-text-muted font-medium sm:w-32 sm:shrink-0">Key risk</dt>
                        <dd className="text-text">{item.risk}</dd>
                      </div>
                    </dl>
                    {item.rank === 1 && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
                          → Full Reliance Jio IPO review
                        </Link>
                        <Link href="/ipos/ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">
                          → Live IPO GMP today
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* How we rank - methodology */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <h2 className="font-bold text-blue-800 mb-2">How we rank upcoming IPOs</h2>
            <p className="text-sm text-blue-700 leading-relaxed">
              This shortlist is an editorial judgement, not a scored buy list. We weigh six things: the durability of the business and its competitive moat; the issue structure (a fresh issue funds the company, while an offer for sale mainly lets existing holders exit); disclosure readiness (a filed DRHP or RHP beats a confidential filing with no public numbers); a credible path to profitability; valuation discipline against listed peers; and how close the IPO is to an actual, dated subscription window. Grey market premium is <strong>not</strong> a ranking input - it is day-to-day sentiment, not a measure of business quality.
            </p>
            <p className="text-sm text-blue-700 leading-relaxed mt-2">
              You can read how CoinMind researches and reviews finance content on our{" "}
              <Link href="/methodology" className="underline font-medium">methodology page</Link>.
            </p>
          </div>

          {/* Biggest by issue size */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Biggest upcoming IPOs by issue size</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Company</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Issue size</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BIGGEST_BY_SIZE.map((row) => (
                    <tr key={row.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-text">{row.name}</td>
                      <td className="px-4 py-3 text-text font-medium whitespace-nowrap">{row.size}</td>
                      <td className="px-4 py-3 text-text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              Only the Reliance Jio figure is confirmed. Every other size is an unconfirmed estimate based on draft filings and media reports, and can change before the RHP is filed.
            </p>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Best upcoming IPOs 2026 - FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{q}</p>
                  <p className="text-sm text-text-muted mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keep exploring */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Keep exploring the IPO pipeline</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">IPO calendar &amp; open issues</Link>
              <Link href="/ipos/upcoming-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Upcoming IPO list</Link>
              <Link href="/ipos/ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">IPO GMP today</Link>
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Reliance Jio IPO</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This ranking is editorial opinion for educational purposes and is <strong>not investment advice</strong> or a recommendation to apply to any IPO. Grey Market Premium (GMP) is an informal, unregulated indicator of sentiment, not a prediction of the listing price or of returns. Issue sizes and timelines for all companies except Reliance Jio are unconfirmed estimates. Read the DRHP/RHP and verify every figure from official SEBI, BSE/NSE and registrar sources, and consult a SEBI-registered adviser before investing. CoinMind holds no financial interest in the companies mentioned.
            </p>
          </div>

          <div className="text-center">
            <Link href="/ipos" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline underline-offset-2">
              ← View all IPOs on the CoinMind IPO Calendar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
