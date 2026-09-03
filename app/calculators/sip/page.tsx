import type { Metadata } from "next";
import Link from "next/link";
import SipCalculator from "@/components/calc/SipCalculator";
import AuthorReviewBox, { type Source } from "@/components/AuthorReviewBox";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { calculators, posts } from "@/lib/data";
import { breadcrumb, faqPage, graph, webApp } from "@/lib/ld";
import { site } from "@/lib/site";
import { SIP_AMOUNTS, sipSlug } from "@/lib/pseo-sip";
import { SIP_YEARS, sipYearSlug } from "@/lib/pseo-sip-years";
import { formatCurrency } from "@/lib/format";
import { Calculator, ArrowRight, TrendingUp, Landmark, PiggyBank, BarChart3, CheckCircle, AlertTriangle, Lightbulb, BookOpen, ShieldCheck, User, ChevronRight } from "lucide-react";
import { Breadcrumb, Pill, Prose, DataTable, CardBody, CardFooter, Grid } from "@/components/ui";

const CALC = calculators.find((c) => c.slug === "sip")!;
const CAT = CALC.category;

export const metadata: Metadata = {
  title: { absolute: "SIP Calculator India 2026 - Monthly Returns, Maturity & Tax Impact" },
  description:
    "Free SIP calculator for India. Calculate monthly SIP returns, maturity corpus, LTCG tax impact, and inflation-adjusted real value. Includes step-up SIP, year-wise growth table, and instant projections. No sign-up needed.",
  alternates: { canonical: "/calculators/sip" },
  openGraph: {
    url: "/calculators/sip",
    title: "SIP Calculator India - Monthly Returns, Maturity & Tax Impact",
    description: "Calculate SIP returns with step-up, LTCG tax, and inflation-adjusted real value. Free interactive calculator with year-wise growth table.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const SOURCES: Source[] = [
  { label: "SEBI - Mutual Funds", href: "https://www.sebi.gov.in/sebiweb/investor/home/investorHome" },
  { label: "AMFI - SIP Statistics", href: "https://www.amfiindia.com/" },
  { label: "Income Tax Department - Capital Gains", href: "https://incometaxindia.gov.in/Pages/tax-rates.aspx" },
  { label: "RBI - Inflation Data", href: "https://www.rbi.org.in/scripts/Statistics.aspx" },
];

const FAQS = [
  { q: "What is a SIP calculator and how does it work?", a: "A SIP calculator estimates the future value of your monthly mutual fund investments using the future value of annuity formula." },
  { q: "How accurate is the SIP calculator?", a: "The calculator is mathematically accurate. However, mutual fund returns vary with market conditions. We recommend using 10-12% for large-cap equity funds and running multiple scenarios." },
  { q: "What return rate should I use for SIP calculations?", a: "For long-term planning with diversified equity mutual funds in India, use 10-12% as your base case. For debt funds, use 6-8%." },
  { q: "What is the difference between a flat SIP and a step-up SIP?", a: "A flat SIP invests the same amount every month. A step-up SIP increases your monthly investment by a fixed percentage each year, typically 10%." },
  { q: "How does LTCG tax affect my SIP returns?", a: "For equity funds held over 12 months, LTCG above ₹1.25 lakh per year is taxed at 12.5%. Each SIP instalment has its own holding period (FIFO)." },
  { q: "What is the minimum amount to start a SIP in India?", a: "Most mutual funds in India allow you to start a SIP with as little as ₹500 per month." },
  { q: "How much do I need to invest monthly to reach ₹1 crore?", a: "At 12% returns: ₹2,850/month for 30 years, ₹10,000/month for 20 years, or ₹43,000/month for 10 years." },
  { q: "Is SIP better than a fixed deposit?", a: "Over 10+ years, SIP in equity funds typically outperforms FDs. However, FD returns are guaranteed. SIP suits long-term goals (10+ years)." },
  { q: "Can I lose money in a SIP?", a: "Yes, if the market declines and you redeem before recovery. However, staying invested through cycles historically delivers positive returns over 7+ years." },
  { q: "How does inflation affect my SIP corpus?", a: "India's long-term average inflation is ~6%. A ₹1 crore corpus in 20 years is worth ~₹28 lakhs in today's purchasing power." },
];

const TOC_ITEMS = [
  { id: "calculator", label: "Calculator" },
  { id: "what-is-sip", label: "What Is SIP?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "formula", label: "Formula" },
  { id: "examples", label: "Real Examples" },
  { id: "growth-milestones", label: "Growth Milestones" },
  { id: "benefits", label: "Benefits" },
  { id: "who-should-use", label: "Who Should Use" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "expert-tips", label: "Expert Tips" },
  { id: "comparison", label: "Comparison" },
  { id: "related-calculators", label: "Related Calculators" },
  { id: "faq", label: "FAQ" },
  { id: "key-takeaways", label: "Key Takeaways" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

// Future value of a level monthly SIP with monthly compounding:
//   FV = P * [((1 + i)^n - 1) / i] * (1 + i),  i = annual/12, n = years * 12
// This mirrors computeSip() in components/calc/SipCalculator.tsx exactly, so the
// milestone table below and the live tool cannot disagree. The previous version
// of this table compounded a Rs 10 lakh lumpsum annually, which overstated the
// 5-year corpus by 120 percent and understated the 30-year corpus by 15 percent.
function sipFutureValue(monthly: number, annualRatePct: number, years: number): number {
  const n = years * 12;
  const i = annualRatePct / 100 / 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

const MILESTONE_SIP = 10000;
const MILESTONE_RATE = 12;
const LAKH = 100000;

const CRORE = 10000000;

/** Rs 1,23,45,678 becomes "Rs 1.23 Crore"; smaller sums render in lakh. */
function corpusLabel(value: number): string {
  return value >= CRORE
    ? `₹${(value / CRORE).toFixed(2)} Crore`
    : `₹${(value / LAKH).toFixed(1)} Lakh`;
}

// Computed from the same formula as the milestone table, not written by hand.
// The hardcoded version claimed Rs 11.5 Lakh for the beginner case where the
// correct figure is Rs 11.62 Lakh, and a hand-typed number cannot be kept
// honest if the assumed rate ever changes.
const EXAMPLES = [
  { title: "Beginner", monthly: 5000, years: 10 },
  { title: "Moderate", monthly: 10000, years: 15 },
  { title: "Aggressive", monthly: 25000, years: 20 },
].map((ex) => ({
  ...ex,
  corpus: corpusLabel(sipFutureValue(ex.monthly, MILESTONE_RATE, ex.years)),
}));

const GROWTH_ROWS = [5, 10, 15, 20, 25, 30].map((year) => {
  const invested = MILESTONE_SIP * 12 * year;
  const corpus = sipFutureValue(MILESTONE_SIP, MILESTONE_RATE, year);
  return {
    year,
    invested: invested / LAKH,
    corpus: corpus / LAKH,
    returns: (corpus - invested) / LAKH,
  };
});

// This page predates the shared CalcPage shell and so emitted no structured data
// at all. Same helpers, same node set and same order as components/calc/CalcPage.tsx
// so the SIP page stays consistent with the other 43 calculator routes.
const SCHEMA_GRAPH = graph([
  faqPage(FAQS),
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: CALC.title, path: "/calculators/sip" },
  ]),
  webApp(CALC.title, "calculators/sip", CAT, `Free ${CALC.title}: instant, private, no sign-up.`),
]);

export default function Page() {
  const relatedCalcs = calculators.filter((c) => c.live && c.slug !== "sip" && c.category === CAT).slice(0, 6);
  const relatedPosts = posts.slice(0, 6);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_GRAPH) }}
      />

      <section className="section-pad pb-0 bg-white">
        <div className="container-main">
          <Breadcrumb items={[{ label: "Calculators", href: "/calculators" }, { label: "SIP Calculator" }]} />
          <Pill>SIP Calculator</Pill>
          <h1 className="h1-article text-text mt-3">SIP Calculator India - Monthly Returns, Maturity & Tax Impact</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Calculate SIP returns with step-up, LTCG tax, and inflation-adjusted real value. Free, instant and private.
          </p>
        </div>
      </section>

      <section className="section-pad pt-12 bg-white" id="calculator">
        <div className="container-main">
          {/* SipCalculator renders its own inputs and its own live results panel
              (projected value, invested/returns donut, LTCG and inflation stats).
              A second, hard-coded "Rs 50.4 Lakh" panel used to sit beside it with
              a placeholder chart box; nothing bound it to the calculator's state,
              so the headline number never moved when a visitor changed the inputs. */}
          <SipCalculator />
          <div className="mt-6 max-w-[720px]">
            <FinancialDisclaimer type="investment" />
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 container-main section-pad gap-8">
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-24 space-y-1" aria-label="Table of contents">
            <p className="eyebrow text-text-muted mb-3">On this page</p>
            {TOC_ITEMS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="block text-sm py-1.5 border-l-2 border-border pl-3 text-text-muted hover:text-text hover:border-text-muted transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8 p-4 rounded-card border border-border bg-bg-alt">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Related</p>
            <div className="mt-3 space-y-2">
              {relatedCalcs.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/calculators/${c.slug}`} className="block text-sm text-text-muted hover:text-brand transition-colors">
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-6">
          <Prose>
            <section id="what-is-sip" style={{ scrollMarginTop: "6rem" }}>
              <h2 className="h3 text-text mb-4">What Is a SIP Calculator?</h2>
              <p>A SIP (Systematic Investment Plan) calculator estimates the future value of your monthly mutual fund investments. You enter your monthly amount, expected return rate, and investment tenure. It shows your total invested, estimated returns, and projected corpus. Our calculator also shows LTCG tax impact and inflation-adjusted real value.</p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-card bg-bg-alt border border-border not-prose my-6">
                {[
                  { label: "Tool type", value: "Financial calculator" },
                  { label: "Formula", value: "Future value of annuity" },
                  { label: "Results", value: "Corpus, returns, LTCG tax, real value" },
                  { label: "Platform", value: "Browser-based, 100% free" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="eyebrow text-text-muted">{label}</p>
                    <p className="text-sm font-medium text-text mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="how-it-works" style={{ scrollMarginTop: "6rem" }}>
              <h2>How It Works</h2>
              <p>The calculator uses the future value of annuity formula. Each monthly instalment earns compounding returns for its specific duration. The total corpus is the sum of all future values. A step-up SIP increases your monthly amount by a fixed percentage annually.</p>
            </section>

            <section id="formula" style={{ scrollMarginTop: "6rem" }}>
              <h2>The Formula</h2>
              <div className="not-prose p-4 rounded-card bg-bg-alt border-l-4 border-brand font-mono text-sm my-4">
                FV = P × [((1 + r)<sup>n</sup> − 1) / r] × (1 + r)
                <br /><br />
                Where: P = Monthly SIP amount, r = Monthly return rate (annual/12), n = Total months
              </div>
            </section>

            <section id="examples" style={{ scrollMarginTop: "6rem" }}>
              <h2>Real Examples</h2>
              <div className="not-prose grid sm:grid-cols-3 gap-4 my-6">
                {EXAMPLES.map((ex) => (
                  <div key={ex.title} className="card p-4">
                    <p className="eyebrow text-brand">{ex.title}</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-text-muted">SIP: <span className="font-semibold text-text">₹{ex.monthly.toLocaleString("en-IN")}/mo</span></p>
                      <p className="text-sm text-text-muted">Tenure: <span className="font-semibold text-text">{ex.years} yrs</span></p>
                      <p className="text-sm text-text-muted">Corpus: <span className="text-accent font-bold">{ex.corpus}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="growth-milestones" style={{ scrollMarginTop: "6rem" }}>
              <h2>Growth Milestones</h2>
              <p>How a ₹10,000/month SIP at 12% grows over time:</p>
              <DataTable>
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Invested</th>
                      <th>Corpus</th>
                      <th>Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GROWTH_ROWS.map((row) => (
                      <tr key={row.year}>
                        <td className="font-semibold text-text">{row.year}</td>
                        <td>₹{row.invested.toFixed(1)}L</td>
                        <td className="font-semibold text-text">₹{row.corpus.toFixed(1)}L</td>
                        <td className="text-accent">₹{row.returns.toFixed(1)}L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DataTable>
            </section>

            <section id="benefits" style={{ scrollMarginTop: "6rem" }}>
              <h2>Benefits of SIP</h2>
              <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                {[
                  "Rupee cost averaging reduces timing risk",
                  "Power of compounding over long periods",
                  "Disciplined investing habit",
                  "Start with as little as ₹500/month",
                  "No lock-in for open-ended funds",
                  "Step-up option aligns with income growth",
                ].map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-sm text-text-muted">{b}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="who-should-use" style={{ scrollMarginTop: "6rem" }}>
              <h2>Who Should Use This Calculator?</h2>
              <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                {[
                  "Salaried employees planning retirement",
                  "First-time mutual fund investors",
                  "Parents saving for children's education",
                  "Anyone comparing flat vs step-up SIP",
                  "Investors tracking LTCG tax impact",
                  "Goal-based financial planners",
                ].map((w) => (
                  <div key={w} className="flex items-start gap-2">
                    <User className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-text-muted">{w}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="mistakes" style={{ scrollMarginTop: "6rem" }}>
              <h2>Common Mistakes to Avoid</h2>
              <div className="not-prose space-y-3 my-6">
                {[
                  { icon: AlertTriangle, text: "Stopping SIP during market falls: you miss the best buying opportunities", good: false },
                  { icon: CheckCircle, text: "Starting early and staying invested through all market cycles", good: true },
                  { icon: AlertTriangle, text: "Using unrealistic return expectations (15%+ for long-term planning)", good: false },
                  { icon: CheckCircle, text: "Using 10-12% for equity and planning with conservative estimates", good: true },
                  { icon: AlertTriangle, text: "Ignoring inflation: planning with nominal rather than real returns", good: false },
                ].map(({ icon: Icon, text, good }) => (
                  <div key={text} className={`flex items-start gap-3 p-3 rounded-card ${good ? "bg-accent/5" : "bg-bg-alt"}`}>
                    <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${good ? "text-accent" : "text-amber-500"}`} />
                    <p className="text-sm text-text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="expert-tips" style={{ scrollMarginTop: "6rem" }}>
              <h2>Expert Tips</h2>
              <div className="not-prose space-y-3 my-6">
                {[
                  "Use 10-12% for equity funds, 6-8% for debt funds in your projections",
                  "Enable step-up SIP at 10% annual increase to 2-3x your final corpus",
                  "Tax-harvest by redeeming up to ₹1.25L in LTCG gains each year",
                  "Hold SIPs for at least 7 years, ideally 10-20 years, for best results",
                  "Use direct plans (lower expense ratio) instead of regular plans",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-text-muted">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" style={{ scrollMarginTop: "6rem" }}>
              <h2>Frequently Asked Questions</h2>
              {FAQS.slice(0, 5).map((faq, i) => (
                <details key={i} className="not-prose border-b border-border py-4 group" open={i < 1}>
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-text">
                    {faq.q}
                    <ChevronRight className="h-4 w-4 text-text-muted transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-sm text-text-muted mt-2">{faq.a}</p>
                </details>
              ))}
              <details className="not-prose mt-2">
                <summary className="text-sm font-medium text-brand cursor-pointer hover:underline">Show all {FAQS.length} FAQs</summary>
                {FAQS.slice(5).map((faq, i) => (
                  <details key={i} className="border-b border-border py-4 group">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-text">
                      {faq.q}
                      <ChevronRight className="h-4 w-4 text-text-muted transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="text-sm text-text-muted mt-2">{faq.a}</p>
                  </details>
                ))}
              </details>
            </section>

            <section id="key-takeaways" style={{ scrollMarginTop: "6rem" }}>
              <h2>Key Takeaways</h2>
              <div className="not-prose p-6 rounded-card bg-brand/5 border border-brand/20 my-6">
                <div className="space-y-3">
                  {[
                    "Start as early as possible: time is your biggest ally",
                    "Use step-up SIP to match your growing income",
                    "Plan with 10-12% returns for equity, not higher",
                    "Always account for inflation and LTCG tax in your goals",
                    "Stay invested through market cycles: do not stop during falls",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm text-text">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="glossary" style={{ scrollMarginTop: "6rem" }}>
              <h2>Glossary of Terms</h2>
              <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                {[
                  { term: "SIP", def: "Systematic Investment Plan: investing a fixed amount regularly in mutual funds." },
                  { term: "NAV", def: "Net Asset Value: the per-unit market price of a mutual fund scheme." },
                  { term: "CAGR", def: "Compound Annual Growth Rate: smoothed annualised return." },
                  { term: "LTCG", def: "Long-Term Capital Gains: profit on assets held over 12 months." },
                ].map(({ term, def }) => (
                  <div key={term} className="p-3 rounded-card bg-bg-alt border border-border">
                    <p className="text-sm font-semibold text-text">{term}</p>
                    <p className="text-xs text-text-muted mt-1">{def}</p>
                  </div>
                ))}
              </div>
            </section>

            <AuthorReviewBox sources={SOURCES} />
          </Prose>
        </div>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="p-5 rounded-card border border-border bg-gradient-to-br from-brand/5 to-transparent">
              <Calculator className="h-8 w-8 text-brand" />
              <p className="text-sm font-semibold text-text mt-3">Try the SIP Calculator</p>
              <p className="text-xs text-text-muted mt-1">Calculate your returns instantly</p>
              <Link href="#calculator" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                Open <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <p className="eyebrow text-text-muted mb-3">Related Guides</p>
              <div className="space-y-3">
                {relatedPosts.slice(0, 3).map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
                    <p className="text-sm text-text hover:text-brand transition-colors line-clamp-2">{p.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{p.readMinutes} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="section-pad bg-bg-alt" id="related-calculators">
        <div className="container-main">
          <h2 className="h3 text-text mb-6">Related Calculators</h2>
          <Grid cols={3}>
            {relatedCalcs.map((c) => (
              <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-5">
                <Calculator className="h-8 w-8 text-brand" />
                <CardBody>
                  <h3 className="text-sm font-semibold text-text mt-2">{c.title}</h3>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">{c.blurb}</p>
                </CardBody>
                <CardFooter>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </CardFooter>
              </Link>
            ))}
          </Grid>
        </div>
      </section>

      <section className="section-pad bg-white" id="references">
        <div className="container-main">
          <Prose>
            <p className="text-xs text-text-muted">
              Sources: SEBI Mutual Fund data · AMFI SIP statistics · Income Tax Department capital gains rules · RBI inflation data.
              Always consult a qualified financial advisor before making investment decisions.
            </p>
          </Prose>
        </div>
      </section>
    </div>
  );
}
