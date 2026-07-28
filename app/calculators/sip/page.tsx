import type { Metadata } from "next";
import Link from "next/link";
import SipCalculator from "@/components/calc/SipCalculator";
import AuthorReviewBox, { type Source } from "@/components/AuthorReviewBox";
import { calculators, posts } from "@/lib/data";
import { site } from "@/lib/site";
import { SIP_AMOUNTS, sipSlug } from "@/lib/pseo-sip";
import { SIP_YEARS, sipYearSlug } from "@/lib/pseo-sip-years";
import { formatCurrency } from "@/lib/format";
import { IconArrow, IconCalculator, IconChart, IconCheck, IconShield, IconSparkle, IconBolt, IconGlobe } from "@/components/icons";

const CALC = calculators.find((c) => c.slug === "sip")!;
const CAT = CALC.category;

export const metadata: Metadata = {
  title: { absolute: "SIP Calculator India 2026 — Monthly Returns, Maturity & Tax Impact" },
  description:
    "Free SIP calculator for India. Calculate monthly SIP returns, maturity corpus, LTCG tax impact, and inflation-adjusted real value. Includes step-up SIP, year-wise growth table, and instant projections. No sign-up needed.",
  alternates: { canonical: "/calculators/sip" },
  openGraph: {
    url: "/calculators/sip",
    title: "SIP Calculator India — Monthly Returns, Maturity & Tax Impact",
    description: "Calculate SIP returns with step-up, LTCG tax, and inflation-adjusted real value. Free interactive calculator with year-wise growth table.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const SOURCES: Source[] = [
  { label: "SEBI — Mutual Funds", href: "https://www.sebi.gov.in/sebiweb/investor/home/investorHome" },
  { label: "AMFI — SIP Statistics", href: "https://www.amfiindia.com/" },
  { label: "Income Tax Department — Capital Gains", href: "https://incometaxindia.gov.in/Pages/tax-rates.aspx" },
  { label: "RBI — Inflation Data", href: "https://www.rbi.org.in/scripts/Statistics.aspx" },
];

const FAQS = [
  { q: "What is a SIP calculator and how does it work?", a: "A SIP calculator estimates the future value of your monthly mutual fund investments using the future value of annuity formula. You enter your monthly investment amount, expected annual return rate, and investment tenure. The calculator shows your total invested amount, estimated returns, and the projected corpus at maturity. Our calculator also shows LTCG tax impact and inflation-adjusted real value — features most SIP calculators skip." },
  { q: "How accurate is the SIP calculator?", a: "The calculator is mathematically accurate — it uses the standard future value formula for a series of periodic investments. However, the output is only as accurate as your inputs. Mutual fund returns vary with market conditions and are not guaranteed. We recommend using 10–12% for large-cap equity funds, 6–8% for debt funds, and running multiple scenarios (conservative, moderate, optimistic) rather than relying on a single projection." },
  { q: "What return rate should I use for SIP calculations?", a: "For long-term planning with diversified equity mutual funds in India, use 10–12% as your base case. Large-cap index funds historically averaged 11–13% over 15–20 year periods. For flexi-cap or multi-cap funds, use 11–13%. For mid-cap, 13–15%. For small-cap, 14–16% but expect higher volatility. For debt funds, use 6–8%. We recommend planning with the conservative end of each range so your final corpus exceeds your target rather than falling short." },
  { q: "What is the difference between a flat SIP and a step-up SIP?", a: "A flat SIP invests the same amount every month throughout the tenure. A step-up SIP increases your monthly investment by a fixed percentage each year — typically 10%, matching annual salary hikes. For example, a ₹10,000/month flat SIP at 12% for 20 years grows to approximately ₹99.9 lakhs. The same starting amount with a 10% annual step-up grows to approximately ₹2.1 crore — more than double. The step-up aligns your investing capacity with your rising income." },
  { q: "How does LTCG tax affect my SIP returns?", a: "For equity mutual funds held over 12 months, long-term capital gains (LTCG) above ₹1.25 lakh per financial year are taxed at 12.5% under Section 112A of the Income Tax Act for FY 2026-27. Each SIP instalment has its own holding period (FIFO method). On a ₹10,000/month SIP for 15 years at 12%, the estimated gains are approximately ₹32.5 lakhs. After the ₹1.25 lakh exemption, approximately ₹31.25 lakhs is taxable at 12.5%, resulting in roughly ₹3.9 lakhs in tax — reducing your net corpus from ₹50.5 lakhs to ₹46.6 lakhs." },
  { q: "What is the minimum amount to start a SIP in India?", a: "Most mutual funds in India allow you to start a SIP with as little as ₹500 per month. Some fund houses offer micro-SIP programmes starting at ₹100 per month for specific schemes. There is no upper limit — you can invest any amount through SIP. You can also run multiple SIPs simultaneously across different funds and Asset Management Companies (AMCs), each with its own NACH mandate and investment date." },
  { q: "How much do I need to invest monthly to reach ₹1 crore?", a: "To reach ₹1 crore through a monthly SIP at 12% annual return: invest approximately ₹2,850 per month for 30 years, ₹5,300 per month for 25 years, ₹10,000 per month for 20 years, or ₹43,000 per month for 10 years. The key insight: starting 5 years earlier can reduce your required monthly investment by nearly half." },
  { q: "Is SIP better than a fixed deposit?", a: "Over 10+ years, SIP in equity mutual funds typically outperforms fixed deposits. A ₹10,000/month SIP at 11% over 10 years builds approximately ₹21.5 lakhs. The same amount in an FD at 7% builds approximately ₹17.4 lakhs — a ₹4.1 lakh difference that widens significantly over 15–20 years. However, FD returns are guaranteed and insured up to ₹5 lakh per bank. SIP returns are market-linked and not guaranteed. SIP suits long-term goals (10+ years); FD suits short-term goals (under 5 years) where capital preservation matters." },
  { q: "What is the best SIP frequency — monthly or quarterly?", a: "Monthly SIP is the most popular and recommended frequency because it aligns with salary cycles, enables rupee-cost averaging across 12 market points per year instead of 4, and builds investment discipline. Quarterly SIP reduces the number of transactions but exposes you to fewer market points for averaging — your entry price depends on just 4 days per year instead of 12. Monthly SIP is almost always the better choice for salaried investors." },
  { q: "Can I lose money in a SIP?", a: "Yes, you can lose money in a SIP if the market declines and you redeem before recovery. The value of your SIP depends on the underlying mutual fund's performance. Equity mutual funds can experience 20–40% declines during market corrections. However, if you stay invested through market cycles, SIP's rupee-cost averaging reduces your average purchase price during downturns. Historically, equity funds have recovered and delivered positive returns over 7+ year periods. The biggest risk is not market volatility — it is stopping your SIP during a market fall." },
  { q: "How does inflation affect my SIP corpus?", a: "Inflation erodes the purchasing power of your future corpus. India's long-term average inflation is approximately 6.5%. A ₹1 crore nominal corpus in 20 years would be worth approximately ₹28 lakhs in today's purchasing power at 6.5% inflation. That is why planning goals in real (inflation-adjusted) terms matters. If your goal requires ₹1 crore in today's value, you need to target approximately ₹3.5 crore in nominal terms for a 20-year horizon." },
  { q: "What is the difference between direct and regular SIP plans?", a: "Direct plans have a lower expense ratio (TER) because no distributor commission is deducted. Regular plans include distributor commissions, typically costing 0.5–1.0% extra annually. On a ₹10,000/month SIP at 12% for 20 years: a direct plan (net 12%) grows to ~₹99.9 lakhs, while a regular plan (net 11.1%) grows to ~₹87 lakhs — a ₹12.9 lakh difference. Always choose direct plans through AMC websites or SEBI-registered platforms unless you are paying separately for financial advice." },
  { q: "What is the ideal SIP tenure?", a: "For equity mutual funds, the ideal SIP tenure is 7+ years, with 10–20 years being optimal for wealth creation. The power of compounding becomes exponential after 10 years — the last 5 years of a 20-year SIP generate more wealth than the first 15 years combined. For debt funds, 3–5 years is typical. Your tenure should match your financial goal: short-term goals under 3 years should use debt funds or FDs, not equity SIPs." },
  { q: "Can I have multiple SIPs at the same time?", a: "Yes, you can run unlimited SIPs simultaneously across different mutual funds and AMCs. Each SIP has its own registration, NACH mandate, investment date, and holding period tracking for tax purposes. A common strategy is to split your total monthly investment across a Nifty 50 index fund, a flexi-cap fund, and a mid-cap fund for diversification across market capitalisations." },
  { q: "How is SIP return calculated — XIRR or absolute?", a: "SIP returns are best measured using XIRR (Extended Internal Rate of Return), which accounts for the timing of each monthly investment. Since each SIP instalment stays invested for a different duration, XIRR gives the annualised return that equates your series of cash flows to the final corpus. Absolute return simply shows total gain as a percentage of total invested. CAGR assumes a single investment held for the entire period. Most SIP calculators show the equivalent CAGR — our calculator projects future value using the standard future value formula." },
  { q: "What happens if I stop my SIP mid-tenure?", a: "You can stop or pause your SIP anytime without penalty — there is no lock-in period for most open-ended mutual fund SIPs. Your existing investments remain in the fund and continue to earn returns. You can restart the SIP later or redeem your units when needed. The only consequence is that stopping mid-tenure reduces your final corpus because you miss out on compounding growth from those missed instalments." },
  { q: "Are SIP returns taxable?", a: "Yes, SIP returns are subject to capital gains tax. For equity mutual funds (≥65% equity): LTCG (held >12 months) above ₹1.25 lakh is taxed at 12.5%; STCG (held ≤12 months) is taxed at 20%. For debt mutual funds (units bought post-April 2023): all gains are taxed at your income slab rate with no indexation benefit. Each SIP instalment has its own holding period under FIFO methodology. You can use tax harvesting by redeeming up to ₹1.25 lakh in gains each year to reset your cost basis tax-free." },
  { q: "What is a good monthly SIP amount for a beginner?", a: "If you are new to investing, start with ₹1,000–₹5,000 per month in a Nifty 50 index fund or a flexi-cap fund. The exact amount depends on your income and expenses — aim for at least 20% of your monthly income towards savings and investments. What matters more than the amount is consistency: a ₹2,000/month SIP started at age 25 grows to approximately ₹70 lakhs by age 55 at 12% returns. Starting early with a small amount beats starting late with a large amount." },
  { q: "How does step-up SIP work and should I use it?", a: "A step-up SIP automatically increases your monthly investment by a fixed percentage each year — usually 10%, matching typical salary hikes. It is one of the most powerful wealth-building strategies because your investing capacity grows with your income. Starting at ₹10,000/month with 10% annual step-up at 12% for 25 years grows to approximately ₹4.95 crore — 2.6× more than a flat ₹10,000 SIP (₹1.89 crore). Most AMC platforms support auto step-up. Strongly recommended if you are under 40." },
  { q: "Can I use this SIP calculator for goal planning?", a: "Absolutely. You can use this calculator in two ways. Forward mode: enter your SIP amount and see the projected corpus. Reverse mode: adjust the monthly amount and tenure until the projected value matches your goal. For example, if your goal is ₹50 lakhs for your child's education in 15 years, enter different monthly amounts until the projected corpus reaches ₹50 lakhs. Remember to account for inflation — your goal should be in nominal terms, or adjust for inflation using our inflation-adjusted real value feature." },
];

const relatedCalcs = calculators.filter((c) => c.live && c.slug !== "sip" && c.category === CAT).slice(0, 6);
const relatedPosts = posts.slice(0, 6);

const COMPARISONS = [
  { name: "SIP vs FD", desc: "Market-linked growth vs guaranteed returns. SIP averages ~12% over 10+ years. FD offers 6–8% fixed. SIP suits long-term goals; FD suits short-term safety.", href: "/blog/fd-vs-sip" },
  { name: "SIP vs PPF", desc: "SIP offers higher potential returns but market risk. PPF offers 7.1% tax-free with sovereign guarantee. SIP has no lock-in; PPF has 15-year lock-in.", href: "/blog/ppf-vs-fd-vs-nps" },
  { name: "SIP vs Lumpsum", desc: "SIP spreads entry across time, reducing timing risk. Lumpsum invests all at once — better in falling markets but risky in peaks. SIP is safer for most.", href: "/blog/sip-vs-lumpsum" },
  { name: "SIP vs NPS", desc: "SIP offers freedom to choose any mutual fund. NPS is retirement-focused with 60% lump sum + 40% annuity. NPS has lower costs but longer lock-in.", href: "/blog/nps-explained" },
];

const GLOSSARY = [
  { term: "SIP", def: "Systematic Investment Plan — investing a fixed amount at regular intervals in mutual funds." },
  { term: "NAV", def: "Net Asset Value — the per-unit market price of a mutual fund scheme." },
  { term: "CAGR", def: "Compound Annual Growth Rate — the smoothed annualised return of an investment." },
  { term: "XIRR", def: "Extended Internal Rate of Return — annualised return for irregular cash flows like SIP instalments." },
  { term: "LTCG", def: "Long-Term Capital Gains — profit from assets held over 12 months for equity funds." },
  { term: "TER", def: "Total Expense Ratio — the annual fee charged by a mutual fund, expressed as a percentage of AUM." },
  { term: "Rupee Cost Averaging", def: "The strategy of investing fixed amounts regularly, buying more units when prices are low and fewer when high." },
  { term: "Compounding", def: "The process where investment returns generate their own returns, leading to exponential growth over time." },
];

export default function Page() {
  const schemaSoftwareApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SIP Calculator India",
    url: `${site.url}/calculators/sip`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${site.url}/#organization` },
    description: "Free SIP calculator showing monthly returns, maturity corpus, LTCG tax impact, step-up SIP, inflation-adjusted real value, and year-wise growth table.",
    featureList: ["Monthly SIP projection", "Step-up SIP", "LTCG tax calculation", "Inflation-adjusted real value", "Year-wise growth table", "Quarterly frequency option", "Multiple currency support"],
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${site.url}/calculators` },
      { "@type": "ListItem", position: 3, name: "SIP Calculator", item: `${site.url}/calculators/sip` },
    ],
  };

  const schemaHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the SIP Calculator",
    description: "Calculate your monthly SIP returns in three simple steps.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Enter your monthly SIP amount", text: "Type or slide to set how much you want to invest each month." },
      { "@type": "HowToStep", position: 2, name: "Set expected return and tenure", text: "Adjust the expected annual return rate and number of years." },
      { "@type": "HowToStep", position: 3, name: "Review your projected corpus", text: "See your total invested amount, estimated returns, maturity value, year-wise growth, LTCG tax impact, and inflation-adjusted real value." },
    ],
  };

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "SIP Calculator India — Monthly Returns, Maturity & Tax Impact",
    description: metadata.description,
    author: { "@type": "Person", name: site.author.name, knowsAbout: "Personal finance, mutual funds, taxation" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    dateModified: "2026-07-28",
    datePublished: "2026-07-28",
    image: `${site.url}/opengraph-image`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftwareApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/logo.png` }) }} />

      {/* 1. HERO */}
      <section className="pt-8 pb-6">
        <nav className="text-sm text-ink-faint flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-forest">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-forest">Calculators</Link><span>/</span>
          <span className="text-ink">SIP Calculator</span>
        </nav>
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> Free calculator
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05] max-w-4xl">
          SIP Calculator India — Calculate Your Systematic Investment Plan Returns Instantly
        </h1>
        <p className="mt-3 text-lg text-ink-soft max-w-3xl">
          See exactly how your monthly SIP compounds into wealth. Our calculator shows your maturity corpus, step-up potential,
          LTCG tax impact, and inflation-adjusted real value — all in one interactive tool.
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          {["Instant projections", "Step-up SIP support", "LTCG tax estimate", "Inflation-adjusted", "Year-wise table"].map((b) => (
            <li key={b} className="flex items-center gap-1.5"><IconCheck className="h-4 w-4 text-forest shrink-0" />{b}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#calculator" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition-all shadow-lg">Use Calculator <IconCalculator className="h-4 w-4" /></a>
          <Link href="/blog/sip-vs-lumpsum" className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-forest transition-all">Compare Investments <IconArrow className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* 2. INTERACTIVE CALCULATOR */}
      <section id="calculator" className="scroll-mt-6">
        <SipCalculator />
      </section>

      {/* 3. QUICK SUMMARY */}
      <section className="mt-14 rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Quick Summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div><span className="font-semibold text-ink">What it is:</span> <span className="text-ink-soft">A free online tool that projects your SIP maturity corpus from your monthly investment, expected return, and tenure.</span></div>
          <div><span className="font-semibold text-ink">Who it is for:</span> <span className="text-ink-soft">Beginners, salaried professionals, retirees, students, and any investor planning wealth creation through mutual funds.</span></div>
          <div><span className="font-semibold text-ink">When to use:</span> <span className="text-ink-soft">Before starting a new SIP, reviewing your portfolio, planning a financial goal, or comparing investment scenarios.</span></div>
          <div><span className="font-semibold text-ink">Why it matters:</span> <span className="text-ink-soft">Compounding makes even small monthly investments significant over time. This calculator shows you the real numbers behind the math.</span></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-faint">
          <span>Reading time: 12 minutes</span>
          <span>Last updated: July 28, 2026</span>
          <span>Reviewed by: {site.author.name}, {site.author.credential}</span>
        </div>
      </section>

      {/* 4. WHAT IS THIS CALCULATOR? */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">What Is a SIP Calculator?</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          A Systematic Investment Plan (SIP) calculator is an online financial tool that estimates the future value of your
          mutual fund investments made through regular, periodic contributions. It uses the time-tested future value of
          annuity formula to project how your monthly or quarterly investments grow through the power of compounding and
          rupee-cost averaging.
        </p>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Unlike a simple savings account calculator, a SIP calculator accounts for the fact that each monthly instalment
          stays invested for a different duration — the first instalment grows the longest, while the last grows the shortest.
          Most basic calculators show only the projected corpus. Ours goes further, showing estimated LTCG tax liability,
          inflation-adjusted real purchasing power, and the impact of step-up SIP where your investment grows with your income.
        </p>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Whether you are planning retirement, saving for your child&apos;s education, building a down payment for a home,
          or simply trying to understand how much a ₹5,000 monthly SIP could become in 20 years — this calculator gives you
          the clarity to make informed decisions.
        </p>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">How the SIP Calculator Works</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          The calculator uses the standard future value (FV) formula for a series of equal periodic investments.
          Since each SIP instalment is made at the beginning of the month (SIP is an annuity due), the formula accounts
          for one extra period of compounding on each payment.
        </p>
        <h3 className="mt-6 font-display text-xl font-600 text-ink">Formula</h3>
        <div className="mt-3 rounded-xl bg-paper-2 px-5 py-4 font-mono text-sm text-ink border border-line overflow-x-auto">
          FV = P × [ (1 + r)ⁿ − 1 ] / r × (1 + r)
        </div>
        <h3 className="mt-6 font-display text-xl font-600 text-ink">Variables</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2 text-ink-faint font-semibold uppercase tracking-wider text-xs"><th className="p-3 text-left">Variable</th><th className="p-3 text-left">Meaning</th><th className="p-3 text-left">Example value</th></tr></thead>
            <tbody className="divide-y divide-line text-ink-soft">
              <tr><td className="p-3 font-mono text-ink">P</td><td className="p-3">Monthly/quarterly investment amount</td><td className="p-3">₹10,000</td></tr>
              <tr><td className="p-3 font-mono text-ink">r</td><td className="p-3">Monthly rate of return (annual rate ÷ 12)</td><td className="p-3">1% (12% ÷ 12)</td></tr>
              <tr><td className="p-3 font-mono text-ink">n</td><td className="p-3">Total number of instalments (years × frequency)</td><td className="p-3">180 (15 years × 12 months)</td></tr>
              <tr><td className="p-3 font-mono text-ink">FV</td><td className="p-3">Future value — the projected corpus at maturity</td><td className="p-3">₹50,45,820</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 font-display text-xl font-600 text-ink">Assumptions &amp; Limitations</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />The calculator assumes a constant annual return rate. Real returns vary year to year.</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />It does not account for expense ratios, exit loads, or fund management fees.</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />The LTCG tax estimate uses current FY 2026-27 rates and assumes full redemption at maturity.</li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />Inflation adjustment uses a 6.5% long-term average — the actual rate may differ.</li>
        </ul>
      </section>

      {/* 6. FORMULA (detailed) */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Formula Explained</h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          The SIP formula is derived from the future value of an annuity due — a series of equal payments made at the
          beginning of each period. The (1 + r) factor at the end converts an ordinary annuity to an annuity due, reflecting
          that each SIP instalment is invested immediately.
        </p>
        <div className="mt-6 rounded-xl border border-line bg-card p-5">
          <p className="font-mono text-sm text-ink text-center">FV = P × <span className="text-forest">[</span> (1 + r)ⁿ − 1 <span className="text-forest">]</span> ÷ r × <span className="text-brass">(1 + r)</span></p>
        </div>
        <p className="mt-4 text-ink-soft leading-relaxed text-sm">
          <strong className="text-ink">Example:</strong> For a ₹10,000 monthly SIP at 12% annual return (1% monthly) for 15 years (180 months):
          FV = 10000 × [(1.01¹⁸⁰ − 1) / 0.01] × 1.01 = ₹50,45,820.
          Total invested: ₹18,00,000. Estimated returns: ₹32,45,820.
        </p>
      </section>

      {/* 7. REAL EXAMPLES */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">Real Examples</h2>
        <p className="mt-3 text-ink-soft">Three realistic scenarios showing how the same SIP strategy plays out differently.</p>

        <div className="mt-6 grid gap-5">
          {[
            { title: "Example 1: Young Professional — Early Starter", sip: "₹5,000/mo", years: "30 years", rate: "12%", invested: "₹18,00,000", corpus: "₹1,76,99,480", note: "Starting at age 25 with just ₹5,000/month builds a ₹1.77 crore corpus by age 55. Total invested is only ₹18 lakhs — compounding does the rest." },
            { title: "Example 2: Mid-Career — Goal-Focused", sip: "₹25,000/mo", years: "12 years", rate: "12%", invested: "₹36,00,000", corpus: "₹68,72,640", note: "Aiming for a ₹70 lakh goal like a home down payment? A disciplined ₹25,000/month SIP for 12 years gets you close. Using step-up can accelerate this." },
            { title: "Example 3: Late Starter — Catching Up", sip: "₹50,000/mo", years: "10 years", rate: "12%", invested: "₹60,00,000", corpus: "₹1,15,80,760", note: "Starting at 40 with a higher ₹50,000/month SIP can still build ₹1.16 crore by 50. The catch: you need to invest 3× more each month than the early starter." },
          ].map((ex) => (
            <div key={ex.title} className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-semibold text-ink">{ex.title}</h3>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                <div><span className="text-ink-faint text-xs">Monthly</span><p className="font-semibold text-ink">{ex.sip}</p></div>
                <div><span className="text-ink-faint text-xs">Tenure</span><p className="font-semibold text-ink">{ex.years}</p></div>
                <div><span className="text-ink-faint text-xs">Return</span><p className="font-semibold text-ink">{ex.rate}</p></div>
                <div><span className="text-ink-faint text-xs">Invested</span><p className="font-semibold text-ink">{ex.invested}</p></div>
                <div><span className="text-ink-faint text-xs">Corpus</span><p className="font-semibold text-forest">{ex.corpus}</p></div>
              </div>
              <p className="mt-3 text-sm text-ink-soft">{ex.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VISUAL CHARTS — Growth milestones */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">Growth Milestones — What ₹10,000/Month Looks Like Over Time</h2>
        <p className="mt-3 text-ink-soft">The table below shows how the same ₹10,000 monthly SIP grows at different return rates and tenures.</p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2 text-ink-faint font-semibold uppercase tracking-wider text-xs"><th className="p-3 text-left">Tenure</th><th className="p-3 text-right">Invested</th><th className="p-3 text-right">At 8%</th><th className="p-3 text-right">At 10%</th><th className="p-3 text-right">At 12%</th><th className="p-3 text-right">At 15%</th></tr></thead>
            <tbody className="divide-y divide-line text-ink-soft">
              {[
                { yrs: "5 years", inv: "₹6,00,000", r8: "₹7,40,650", r10: "₹7,80,810", r12: "₹8,23,390", r15: "₹8,96,400" },
                { yrs: "10 years", inv: "₹12,00,000", r8: "₹18,42,060", r10: "₹20,65,520", r12: "₹23,16,150", r15: "₹27,81,730" },
                { yrs: "15 years", inv: "₹18,00,000", r8: "₹34,87,480", r10: "₹41,73,690", r12: "₹50,45,820", r15: "₹66,79,800" },
                { yrs: "20 years", inv: "₹24,00,000", r8: "₹58,90,240", r10: "₹75,73,750", r12: "₹99,91,480", r15: "₹1,50,27,640" },
                { yrs: "25 years", inv: "₹30,00,000", r8: "₹94,53,610", r10: "₹1,33,42,960", r12: "₹1,89,61,840", r15: "₹3,24,58,940" },
                { yrs: "30 years", inv: "₹36,00,000", r8: "₹1,46,81,510", r10: "₹2,28,32,160", r12: "₹3,53,99,480", r15: "₹6,92,14,260" },
              ].map((r) => (
                <tr key={r.yrs} className="hover:bg-paper-2 transition-colors">
                  <td className="p-3 font-medium text-ink">{r.yrs}</td>
                  <td className="p-3 text-right">{r.inv}</td>
                  <td className="p-3 text-right">{r.r8}</td>
                  <td className="p-3 text-right">{r.r10}</td>
                  <td className="p-3 text-right text-forest font-semibold">{r.r12}</td>
                  <td className="p-3 text-right">{r.r15}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">Table shows projected corpus for ₹10,000/month SIP at varying return rates and tenures. 12% column highlighted as the base-case assumption for diversified equity funds.</p>
      </section>

      {/* 9. BENEFITS */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Benefits of Using This SIP Calculator</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { icon: IconBolt, title: "Instant results", body: "No button clicking — results update as you slide. Adjust any input and see the projected corpus change in real time." },
            { icon: IconChart, title: "Year-wise breakdown", body: "Toggle the year-wise table to see exactly how your corpus builds every single year, with cumulative investment and annual contributions." },
            { icon: IconCheck, title: "Tax-aware estimates", body: "Our calculator shows estimated LTCG tax at exit using current FY 2026-27 rates — a feature most SIP calculators miss." },
            { icon: IconSparkle, title: "Inflation-adjusted real value", body: "See what your future corpus is worth in today's purchasing power. Plan goals in real terms, not inflated nominal numbers." },
            { icon: IconShield, title: "Step-up SIP modeling", body: "Model how increasing your SIP annually (matching salary growth) can multiply your final corpus by 2–3× over long tenures." },
            { icon: IconGlobe, title: "Multi-currency & frequency", body: "Switch between INR, USD, GBP and monthly or quarterly frequency. Useful for NRIs and international investors." },
          ].map((b) => (
            <div key={b.title} className="flex gap-4 rounded-xl border border-line bg-card p-4">
              <b.icon className="h-5 w-5 shrink-0 mt-0.5 text-forest" />
              <div><h3 className="font-semibold text-ink text-sm">{b.title}</h3><p className="mt-1 text-xs text-ink-soft leading-relaxed">{b.body}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. WHO SHOULD USE IT */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Who Should Use This Calculator?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { role: "Students", desc: "See how a small ₹500–₹1,000 monthly SIP during college can grow into a significant corpus by graduation and beyond." },
            { role: "Working Professionals", desc: "Plan your monthly investment allocation, compare scenarios, and understand how step-up SIP accelerates wealth creation." },
            { role: "Families", desc: "Calculate the monthly SIP needed for your children's education, wedding, or home down payment over 10–20 year horizons." },
            { role: "Retirees", desc: "Use the calculator to understand how a post-retirement SWP strategy relates to the corpus built through SIP during your working years." },
            { role: "Beginners", desc: "New to investing? Start with a small amount and see how compounding turns consistent saving into substantial wealth over time." },
            { role: "Business Owners", desc: "Model irregular investment patterns, compare with lumpsum investing, and plan tax-efficient wealth creation outside of salaried income." },
          ].map((w) => (
            <div key={w.role} className="rounded-xl border border-line bg-paper-2 p-4">
              <h3 className="font-semibold text-sm text-forest">{w.role}</h3>
              <p className="mt-1 text-xs text-ink-soft leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. COMMON MISTAKES */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Common SIP Mistakes to Avoid</h2>
        <div className="mt-5 space-y-4">
          {[
            { mistake: "Using unrealistically high return assumptions", fix: "Projecting 18–20% on large-cap funds. Use 10–12% for conservative planning, 12–14% as optimistic. Never assume above 15% for diversified equity." },
            { mistake: "Stopping SIP during market corrections", fix: "Market falls are when SIP works best — your fixed amount buys more units at lower prices. Stopping during a correction locks in losses and misses the recovery." },
            { mistake: "Not accounting for inflation in goals", fix: "A ₹1 crore goal in 20 years is worth only ~₹28 lakhs in today's value at 6.5% inflation. Always plan goals in real, inflation-adjusted terms." },
            { mistake: "Choosing regular plans over direct plans", fix: "Direct plans save 0.5–1.0% in expenses annually. On a ₹10,000/month SIP over 20 years, this difference is ₹12–22 lakhs — free money left on the table." },
            { mistake: "Checking portfolio value every day", fix: "SIP is a long-term strategy. Daily checking leads to emotional decisions. Review your portfolio annually. The market's short-term noise does not matter for a 15–20 year plan." },
          ].map((m) => (
            <div key={m.mistake} className="rounded-xl border border-line bg-card p-4">
              <p className="text-sm font-semibold text-ink"><span className="text-red-500 mr-1">✕</span>{m.mistake}</p>
              <p className="mt-1.5 text-xs text-ink-soft leading-relaxed"><span className="text-forest font-semibold">✓</span> {m.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. EXPERT TIPS */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Expert Tips for SIP Investors</h2>
        <div className="mt-5 space-y-4">
          {[
            { tip: "Start with an index fund", body: "For your first SIP, choose a Nifty 50 or Sensex index fund. The expense ratio is the lowest (0.1–0.3%), you get instant diversification across India's top companies, and you do not need to worry about fund manager performance. Once you cross ₹10,000/month, add a flexi-cap fund." },
            { tip: "Use the 50/30/20 rule to find your SIP amount", body: "If you earn ₹50,000/month, allocate 20% (₹10,000) to savings and investments. Of this, ₹6,000–₹8,000 can go to SIPs, with the rest for emergency fund and insurance. Adjust based on your specific goals and existing commitments." },
            { tip: "Enable step-up SIP from day one", body: "Set a 10% annual step-up when you register your SIP. Most AMC platforms support this. A ₹5,000/month SIP with 10% step-up at 12% for 25 years grows to ₹2.47 crore vs ₹94.8 lakhs without step-up. The step-up matches your salary hikes so you never feel the increase." },
            { tip: "Use tax harvesting to boost returns", body: "Each financial year, redeem equity mutual fund units worth up to ₹1.25 lakh in LTCG. This resets your cost basis tax-free. Re-invest the proceeds immediately. Over 15–20 years, this strategy can boost your effective CAGR by 0.5–1.0%." },
            { tip: "Review and rebalance annually", body: "Once a year, check your SIP portfolio. If one fund category has outperformed and now dominates your allocation, rebalance by redirecting new SIPs to underperforming categories. This disciplined approach buys low and sells high automatically." },
          ].map((t) => (
            <div key={t.tip} className="rounded-xl border border-line bg-paper-2 p-4">
              <h3 className="font-semibold text-sm text-forest">{t.tip}</h3>
              <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-faint">These tips are educational and should not replace personalised financial advice. Consult a SEBI-registered investment advisor for your specific situation.</p>
      </section>

      {/* 13. COMPARISON */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">SIP vs Other Investment Options</h2>
        <p className="mt-3 text-ink-soft">Compare SIP with alternative investment avenues to understand which suits your goals.</p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2 text-ink-faint font-semibold uppercase tracking-wider text-xs"><th className="p-3 text-left">Feature</th><th className="p-3 text-left">SIP</th><th className="p-3 text-left">Fixed Deposit</th><th className="p-3 text-left">PPF</th><th className="p-3 text-left">Lumpsum</th><th className="p-3 text-left">NPS</th></tr></thead>
            <tbody className="divide-y divide-line text-ink-soft">
              {[
                ["Returns", "Market-linked, 10–14% avg", "Fixed, 6–8%", "Fixed, ~7.1% tax-free", "Market-linked", "Market-linked, 9–12%"],
                ["Risk", "Moderate–High", "Very low", "Very low", "High (timing risk)", "Moderate"],
                ["Lock-in", "None (open-ended)", "Fixed term", "15 years", "None", "Till 60 (partial exit)"],
                ["Minimum", "₹500/month", "₹1,000", "₹500/year", "₹500", "₹500/contribution"],
                ["Tax on gains", "LTCG 12.5% >₹1.25L", "As per slab", "Tax-free", "LTCG 12.5% >₹1.25L", "60% lump sum tax-free"],
                ["Best for", "Long-term wealth", "Short-term safety", "Retirement + tax", "Bull markets", "Pension + tax"],
              ].map((row) => (
                <tr key={row[0]} className="hover:bg-paper-2 transition-colors">
                  <td className="p-3 font-medium text-ink">{row[0]}</td><td className="p-3">{row[1]}</td><td className="p-3">{row[2]}</td><td className="p-3">{row[3]}</td><td className="p-3">{row[4]}</td><td className="p-3">{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {COMPARISONS.map((c) => (
            <Link key={c.name} href={c.href} className="group rounded-xl border border-line bg-card p-4 hover:border-forest transition-all">
              <h3 className="font-semibold text-sm text-ink group-hover:text-forest">{c.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{c.desc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-forest">Compare <IconArrow className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 14. RELATED CALCULATORS */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">Related Calculators</h2>
        <p className="mt-3 text-ink-soft max-w-3xl">Explore more free financial planning tools from the same category.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedCalcs.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-all">
              <h3 className="font-display text-lg font-600 text-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{c.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">Open <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 15. RELATED GUIDES */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">Related Guides</h2>
        <p className="mt-3 text-ink-soft max-w-3xl">Deepen your understanding of SIP investing with our expert-written guides.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "SIP vs Lumpsum: Which Builds More Wealth?", slug: "sip-vs-lumpsum", cat: "Investing" },
            { title: "SIP to Become a Crorepati — Monthly Amount Needed", slug: "sip-to-become-crorepati", cat: "Investing" },
            { title: "Mutual Funds for Beginners in India", slug: "mutual-funds-beginners-india", cat: "Investing" },
            { title: "How to Start Investing in India (2026)", slug: "how-to-start-investing-in-india", cat: "Investing" },
            { title: "Step-Up SIP — Double Your Wealth", slug: "sip-to-become-crorepati", cat: "Investing" },
            { title: "Gold Investment Guide India 2026", slug: "gold-investment-guide-india", cat: "Investing" },
          ].map((g) => (
            <Link key={g.slug} href={`/blog/${g.slug}`} className="group rounded-xl border border-line bg-card p-4 hover:border-forest transition-all">
              <span className="text-xs font-semibold uppercase tracking-wide text-brass">{g.cat}</span>
              <p className="mt-0.5 font-display text-base font-600 text-ink group-hover:text-forest transition-colors">{g.title}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-forest">Read <IconArrow className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* 16. FAQ */}
      <section className="mt-14 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">SIP Calculator — Frequently Asked Questions</h2>
        <p className="mt-3 text-ink-soft">20 detailed answers covering everything from basic use to advanced tax planning.</p>
        <div className="mt-5 divide-y divide-line rounded-xl border border-line bg-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-ink list-none hover:text-forest transition-colors">
                {f.q}
                <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 17. KEY TAKEAWAYS */}
      <section className="mt-12 rounded-2xl border border-line bg-forest-deep/5 p-6 sm:p-7 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">Key Takeaways</h2>
        <ul className="mt-4 space-y-3">
          {[
            "The earlier you start your SIP, the smaller your required monthly investment — starting at 25 needs half the monthly amount of starting at 35 for the same crorepati goal.",
            "A step-up SIP (10% annual increase) can double or triple your final corpus compared to a flat SIP with the same starting amount.",
            "Always use realistic return assumptions: 10–12% for large-cap equity, 6–8% for debt. Ignore anyone promising 18–20% consistently.",
            "Direct plans save 0.5–1.0% annually over regular plans — worth ₹12–22 lakhs on a ₹10,000/month 20-year SIP.",
            "Inflation-adjusted real value is the number that matters. A ₹1 crore nominal corpus in 20 years is worth only ~₹28 lakhs in today's purchasing power.",
            "Use tax harvesting annually — redeem up to ₹1.25 lakh in LTCG each year to reset your cost basis tax-free.",
          ].map((t) => (
            <li key={t} className="flex gap-3 text-sm text-ink-soft"><IconCheck className="h-5 w-5 shrink-0 text-forest" />{t}</li>
          ))}
        </ul>
      </section>

      {/* 18. GLOSSARY */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-2xl font-600 text-ink">Glossary of Terms</h2>
        <p className="mt-3 text-ink-soft">Important financial terms used on this page, explained in plain English.</p>
        <div className="mt-5 grid gap-px rounded-xl border border-line overflow-hidden sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="bg-card px-5 py-4">
              <span className="font-semibold text-ink text-sm">{g.term}</span>
              <p className="mt-0.5 text-xs text-ink-soft">{g.def}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-faint">Browse the <Link href="/glossary" className="text-forest font-semibold hover:underline">full finance glossary</Link> for 100+ terms.</p>
      </section>

      {/* 19. REFERENCES */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">References</h2>
        <p className="mt-3 text-ink-soft">All figures, formulas, and tax rates on this page are verified against the following official sources:</p>
        <ul className="mt-4 space-y-2 text-sm">
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="text-forest hover:underline">{s.label}</a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-faint">Tax rates for FY 2026-27. Market return assumptions are historical averages and do not guarantee future performance.</p>
      </section>

      {/* EEAT */}
      <div className="mt-12 max-w-3xl">
        <AuthorReviewBox sources={SOURCES} />
      </div>

      {/* Popular SIP amounts (programmatic SEO) */}
      <section className="mt-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">Popular monthly SIP amounts</h2>
          <p className="mt-2 text-ink-soft leading-relaxed">See the full 5–30 year projected corpus for a specific monthly SIP — each amount has its own returns table and FAQs.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {SIP_AMOUNTS.map((amt) => (
              <Link key={amt} href={`/sip/${sipSlug(amt)}`} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest">
                {formatCurrency(amt)}/mo
              </Link>
            ))}
          </div>
          <h2 className="mt-10 font-display text-2xl font-600 text-ink">SIP returns by duration</h2>
          <p className="mt-2 text-ink-soft leading-relaxed">Want one horizon in focus? These pages show the corpus at 8%, 10%, 12% and 15% for a single duration.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {SIP_YEARS.map((y) => (
              <Link key={y} href={`/sip-returns/${sipYearSlug(5000, y)}`} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest">
                ₹5,000/mo for {y} years
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 20. FINAL CTA */}
      <section className="mt-14 mb-12 rounded-3xl bg-gradient-to-br from-forest-deep via-forest to-emerald-700 px-8 py-14 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_20%_30%,#fff,transparent_50%),radial-gradient(circle_at_80%_70%,#fff,transparent_40%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-600 leading-tight max-w-2xl mx-auto">Start Building Wealth with SIP Today</h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/70">One calculator visit can change how you think about your money. Try a different tool, read a guide, or compare options — all free, always.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/calculators/goal-sip" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-all shadow-xl"><IconCalculator className="h-4 w-4" /> Goal SIP Calculator <IconArrow className="h-4 w-4" /></Link>
            <Link href="/calculators/step-up-sip" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all">Step-Up SIP Calculator</Link>
            <Link href="/blog/how-to-start-investing-in-india" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all">Read Investing Guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
