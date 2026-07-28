import Link from "next/link";
import type { Metadata } from "next";
import { calculators, posts } from "@/lib/data";
import { site } from "@/lib/site";
import {
  IconArrow,
  IconCalculator,
  IconShield,
  IconGlobe,
  IconBolt,
  IconCheck,
  IconChart,
  IconSparkle,
} from "@/components/icons";
import CoverArt from "@/components/CoverArt";

const liveCalcs = calculators.filter((c) => c.live);
const CALC_COUNT = liveCalcs.length;
const TOOL_COUNT = 44;
const GUIDE_COUNT = posts.length;

export const metadata: Metadata = {
  title: { absolute: "CoinMind — India's Smartest Personal Finance Platform" },
  description: `${CALC_COUNT} free financial calculators, ${TOOL_COUNT} free tools, ${GUIDE_COUNT} expert guides, and AI-powered resources. Calculate SIP, EMI, income tax, FD, and more. India's trusted personal finance education platform.`,
  alternates: { canonical: "/" },
  openGraph: { url: site.url },
};

const CALC_CATEGORIES = ["Investing", "Loans", "Tax", "Savings"] as const;
const CATEGORY_INFO: Record<string, { label: string; icon: string; desc: string }> = {
  Investing: { label: "Investment", icon: "📈", desc: "SIP, lumpsum, mutual fund, PPF, NPS, SWP & more" },
  Loans: { label: "Loans", icon: "🏦", desc: "EMI, home loan, personal loan, car loan & education loan" },
  Tax: { label: "Tax", icon: "🧾", desc: "Income tax, HRA, 80C, GST, capital gains & TDS" },
  Savings: { label: "Savings", icon: "💰", desc: "FD, RD, PPF, SSY, NSC, post office schemes & inflation" },
};

const FINANCE_TOPICS = [
  { label: "Investment", href: "/calculators?cat=investing", desc: "SIP, mutual funds, PPF, NPS, stocks", slug: "investing" },
  { label: "Tax Planning", href: "/calculators?cat=tax", desc: "Income tax, HRA, 80C, capital gains, TDS", slug: "tax" },
  { label: "Loans", href: "/calculators?cat=loans", desc: "Home loan, personal loan, EMI, car loan", slug: "loans" },
  { label: "Retirement", href: "/blog/fire-retire-early-india", desc: "FIRE, retirement corpus, NPS, pension", slug: "retirement" },
  { label: "Mutual Funds", href: "/blog/mutual-funds-beginners-india", desc: "Types, SIP, index funds, expense ratios", slug: "mutual-funds" },
  { label: "Insurance", href: "/blog", desc: "Health, term, life insurance planning", slug: "insurance" },
  { label: "Credit Cards", href: "/blog/how-to-improve-credit-score", desc: "CIBIL score, credit cards, debt management", slug: "credit" },
  { label: "Gold", href: "/blog/gold-investment-guide-india", desc: "SGB, gold ETFs, digital gold, physical gold", slug: "gold" },
  { label: "Stock Market", href: "/blog/how-to-start-investing-in-india", desc: "Stocks, indices, market fundamentals", slug: "stocks" },
  { label: "Budget Planning", href: "/blog/50-30-20-budget-rule", desc: "Budgeting, saving, expense tracking", slug: "budget" },
  { label: "Personal Finance", href: "/blog/emergency-fund-guide", desc: "Emergency fund, FIRE, salary, CTC planning", slug: "finance" },
];

const COMPARISONS = [
  { label: "FD vs SIP", href: "/blog/sip-vs-lumpsum", desc: "Which grows your money more?" },
  { label: "Old vs New Tax Regime", href: "/tax-regime-break-even", desc: "Find your break-even deduction" },
  { label: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "Best retirement savings option" },
  { label: "UPS vs NPS", href: "/blog/ups-vs-nps", desc: "Pension scheme comparison" },
  { label: "Gold ETFs vs SGB vs Digital Gold", href: "/blog/gold-investment-guide-india", desc: "Best way to buy gold" },
  { label: "CTC vs In-Hand Salary", href: "/blog/ctc-vs-in-hand-salary", desc: "What your offer letter really means" },
];

const FAQS = [
  { q: "What is a SIP and how does it work?", a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund every month. It averages your purchase cost through market ups and downs (rupee cost averaging) and builds a disciplined investing habit. You can start a SIP with as little as Rs 500 per month." },
  { q: "How is EMI calculated?", a: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of months. Use our EMI calculator to instantly see your monthly payment, total interest, and full amortisation schedule." },
  { q: "How much should I save every month?", a: "A common rule is the 50/30/20 budget: spend 50% on needs, 30% on wants, and save or invest 20% of your income. The right number depends on your goals, expenses, and lifestyle. Our 50/30/20 budget rule guide helps you find your ideal savings rate." },
  { q: "What is CAGR and how is it calculated?", a: "CAGR (Compound Annual Growth Rate) measures the average annual return of an investment over a period of time. It is calculated as: CAGR = (Ending Value / Beginning Value)^(1/n) - 1. Use our CAGR calculator to find the growth rate of any investment." },
  { q: "How much emergency fund is enough?", a: "Most experts recommend 3 to 6 months of essential expenses. If you are self-employed or a single earner with dependents, aim for 9 to 12 months. Keep it in a liquid fund or high-yield savings account for instant access while earning interest." },
  { q: "Can I retire early in India?", a: "Yes, through the FIRE (Financial Independence, Retire Early) approach. You typically need a corpus of 25 to 30 times your annual expenses, invested in a mix of equity and debt. A 40-60% savings rate makes early retirement achievable within 12 to 20 years." },
  { q: "How does inflation affect my savings?", a: "Inflation erodes the purchasing power of your money. If your savings earn 4% but inflation is 6%, your real return is -2%. This is why investing in assets that beat inflation, like equity mutual funds, is important for long-term goals." },
  { q: "What is the difference between large cap, mid cap, and small cap?", a: "Large cap funds invest in the top 100 companies by market capitalisation (stable, lower risk). Mid cap funds invest in companies ranked 101-250 (moderate risk, higher growth). Small cap funds invest in the next 250+ companies (highest risk, highest potential return)." },
  { q: "How is income tax calculated in India?", a: "Income tax in India uses a slab system under the new or old regime. Under the new regime (FY 2026-27), income up to Rs 4 lakh is tax-free, with progressive slabs up to 30% above Rs 24 lakh. A rebate under Section 87A zeroes tax up to Rs 12 lakh of taxable income." },
  { q: "What are direct and regular mutual fund plans?", a: "Direct plans have no commission and a lower expense ratio because you invest directly with the fund. Regular plans include a distributor commission, making them 0.5 to 1% more expensive. For the same fund, the direct plan always gives higher returns." },
];

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <FinanceCategories />
      <CalculatorGrid />
      <EeatTrust />
      <ComparisonsSection />
      <AiFaqSection />
      <WhyCoinMind />
      <FeaturedGuides />
      <TrustSignals />
      <ClosingCta />
    </>
  );
}

function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description: site.description,
        email: site.email,
        founder: { "@type": "Person", name: site.author.name },
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        description: site.description,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        name: site.author.name,
        jobTitle: site.author.role,
        description: site.author.bio,
        url: `${site.url}/about`,
      },
      {
        "@type": "SoftwareApplication",
        name: `${site.name} Calculators`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        description: `${CALC_COUNT} free financial calculators for SIP, EMI, income tax, FD, PPF and more.`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Calculators", item: `${site.url}/calculators` },
          { "@type": "ListItem", position: 3, name: "Guides", item: `${site.url}/blog` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-soft/20 via-transparent to-brass-soft/20 -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-16 sm:pt-24 sm:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-medium text-ink-soft">
            <IconSparkle className="h-3.5 w-3.5 text-brass" />
            India&apos;s Complete Personal Finance Education Platform
          </span>

          <h1 className="mt-6 font-display text-[2.8rem] leading-[1.04] sm:text-6xl sm:leading-[1.03] lg:text-7xl font-600 text-ink">
            India&apos;s Smartest{" "}
            <span className="text-forest">Personal Finance</span> Platform
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-ink-soft">
            Calculate, compare, and learn everything about personal finance — with{" "}
            <strong className="text-ink">{CALC_COUNT} free calculators</strong>,{" "}
            <strong className="text-ink">{GUIDE_COUNT} expert guides</strong>,{" "}
            <strong className="text-ink">{TOOL_COUNT} free tools</strong>, and{" "}
            <strong className="text-ink">AI-powered financial resources</strong>.
            No sign-up, no hidden charges, no fluff.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep shadow-lg shadow-forest/25">
              <IconCalculator className="h-4 w-4" /> Explore Calculators <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-forest hover:text-forest">
              Learn Finance
            </Link>
            <Link href="/tax-regime-break-even" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-forest hover:text-forest">
              Compare Investments
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { n: String(CALC_COUNT), l: "Financial Calculators" },
              { n: String(GUIDE_COUNT), l: "Expert Guides" },
              { n: "100%", l: "Free — No Sign-up" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <dt className="font-display text-3xl font-600 text-ink">{s.n}</dt>
                <dd className="mt-1 text-xs text-ink-faint">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FinanceCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Topics</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Popular Finance Categories
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Explore every aspect of personal finance — from investing and taxes to loans and retirement planning.
        </p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FINANCE_TOPICS.map((t) => (
          <Link key={t.slug} href={t.href} className="group flex items-center gap-4 rounded-xl border border-line bg-card p-4 transition-all hover:border-forest hover:shadow-[0_8px_24px_-16px_rgba(30,64,175,0.3)]">
            <span className="shrink-0 grid h-10 w-10 place-items-center rounded-lg bg-forest-soft text-lg">{FINANCE_TOPICS.find((x) => x.slug === t.slug)?.label?.charAt(0) || "•"}</span>
            <div>
              <h3 className="font-semibold text-ink group-hover:text-forest transition-colors">{t.label}</h3>
              <p className="text-xs text-ink-faint mt-0.5">{t.desc}</p>
            </div>
            <IconArrow className="ml-auto h-4 w-4 shrink-0 text-ink-faint group-hover:text-forest transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function CalculatorGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">100+ Financial Tools</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Calculators by Category
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Free, private, and accurate — every calculator runs in your browser with zero data storage.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {CALC_CATEGORIES.map((cat) => {
          const items = liveCalcs.filter((c) => c.category === cat);
          const info = CATEGORY_INFO[cat];
          if (!items.length) return null;
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display text-2xl font-600 text-ink">{info.label} Calculators</h3>
                  <p className="text-sm text-ink-soft mt-0.5">{info.desc}</p>
                </div>
                <Link href={`/calculators?cat=${cat.toLowerCase()}`} className="shrink-0 flex items-center gap-1 text-sm font-semibold text-forest hover:gap-2 transition-all">
                  All {info.label} <IconArrow className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((c) => (
                  <Link key={c.slug} href={`/calculators/${c.slug}`} className="group rounded-xl border border-line bg-card p-4 transition-all hover:border-forest hover:shadow-[0_8px_24px_-16px_rgba(30,64,175,0.3)]">
                    <h4 className="font-semibold text-ink group-hover:text-forest transition-colors">{c.title}</h4>
                    <p className="mt-1 text-xs text-ink-faint line-clamp-2">{c.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition-colors">
          View All {CALC_COUNT} Calculators <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function EeatTrust() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Why Trust CoinMind</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            Built for Accuracy, Transparency, and Trust
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Every calculation, guide, and comparison on CoinMind follows strict editorial and technical standards.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: IconShield, title: "RBI-Aligned Formulas", body: "All calculations follow the latest RBI, SEBI, and Income Tax Department guidelines." },
            { icon: IconBolt, title: "Regularly Updated", body: "We update calculators and guides immediately after every Budget and regulatory change." },
            { icon: IconCheck, title: "Fact-Checked Content", body: "Every guide is researched, verified, and reviewed before publication. No AI-generated fluff." },
            { icon: IconGlobe, title: "Educational Only", body: "We provide educational information to help you make informed decisions — never unsolicited advice." },
            { icon: IconChart, title: "Transparent Formulas", body: "Every calculator shows its formula so you can verify the math yourself." },
            { icon: IconSparkle, title: "No Hidden Charges", body: "No sign-up fees, no subscription, no upsells. Every tool is genuinely free." },
            { icon: IconShield, title: "Privacy First", body: "All calculations run in your browser. We never see, store, or share your financial data." },
            { icon: IconCheck, title: "No Login Required", body: "Use every calculator and tool instantly. No account creation, no email required." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest-soft text-forest"><item.icon className="h-5 w-5" /></span>
              <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-card p-6 text-center">
          <p className="text-sm text-ink-soft">
            <strong className="text-ink">Reviewed by:</strong> {site.author.name}, {site.author.role} ({site.author.credential}) &middot; Editorial Team &middot; Research Reviewers
          </p>
        </div>
      </div>
    </section>
  );
}

function ComparisonsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Comparisons</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Popular Financial Comparisons
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Not sure which option is right for you? Side-by-side comparisons to help you decide.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPARISONS.map((c) => (
          <Link key={c.href} href={c.href} className="group rounded-xl border border-line bg-card p-5 transition-all hover:border-forest hover:shadow-[0_8px_24px_-16px_rgba(30,64,175,0.3)]">
            <h3 className="font-semibold text-ink group-hover:text-forest transition-colors">{c.label}</h3>
            <p className="mt-1 text-xs text-ink-faint">{c.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest">Compare <IconArrow className="h-3 w-3" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AiFaqSection() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">AI-Powered Learning</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            Frequently Asked Finance Questions
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Clear answers to the most common personal finance questions. Optimised for Google AI Overviews and voice search.
          </p>
        </div>
        <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-card">
          {FAQS.slice(0, 6).map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-ink list-none hover:text-forest transition-colors">
                {f.q}
                <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/glossary" className="text-sm font-semibold text-forest hover:underline">
            Browse the full finance glossary &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyCoinMind() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Why CoinMind</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          India&apos;s Most Comprehensive Free Finance Platform
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          We combine the accuracy of calculators, the depth of guides, the power of AI tools, and the timeliness of news — all in one place, completely free.
        </p>
      </div>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: `${CALC_COUNT}+`, l: "Financial Calculators", d: "SIP, EMI, tax, FD, PPF, NPS, SWP, CAGR, gratuity, HRA and more" },
          { n: `${GUIDE_COUNT}+`, l: "Expert Guides", d: "In-depth how-tos on investing, tax, retirement, budgeting and AI" },
          { n: "10,000+", l: "Monthly Calculations", d: "Processed by users across India, the US, and the UK" },
          { n: "99.9%", l: "Calculation Accuracy", d: "All formulas verified against RBI, SEBI, and Income Tax guidelines" },
        ].map((s) => (
          <div key={s.n} className="rounded-xl border border-line bg-card p-6 text-center">
            <dt className="font-display text-4xl font-600 text-forest">{s.n}</dt>
            <dd className="mt-2 font-semibold text-ink">{s.l}</dd>
            <p className="mt-1 text-xs text-ink-faint">{s.d}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FeaturedGuides() {
  const featured = posts.slice(0, 4);
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">Featured Guides</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
              Learn Finance, Your Way
            </h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              From beginner how-tos to advanced strategies — every guide is original, researched, and written in plain English.
            </p>
          </div>
          <Link href="/blog" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:gap-2.5 transition-all">
            All guides <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
              <div className="aspect-[16/10] rounded-xl border border-line overflow-hidden">
                <CoverArt seed={p.slug} variant={p.art.variant} palette={p.art.palette} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brass">{p.category}</p>
              <h3 className="mt-1 font-display text-base font-600 leading-snug text-ink group-hover:text-forest transition-colors">{p.title}</h3>
              <p className="mt-1 text-xs text-ink-faint">{p.readMinutes} min read</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "How SIP Works", href: "/blog/sip-vs-lumpsum" },
            { label: "How EMI is Calculated", href: "/blog/sip-to-become-crorepati" },
            { label: "Tax Saving Guide", href: "/blog/how-to-save-income-tax" },
            { label: "Mutual Fund Guide", href: "/blog/mutual-funds-beginners-india" },
            { label: "Budget Planning", href: "/blog/50-30-20-budget-rule" },
            { label: "Financial Freedom", href: "/blog/fire-retire-early-india" },
            { label: "Emergency Fund", href: "/blog/emergency-fund-guide" },
            { label: "Gold Investment", href: "/blog/gold-investment-guide-india" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink hover:border-forest hover:text-forest transition-colors">
              <IconArrow className="h-3 w-3 shrink-0" /> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-faint">
        <span className="flex items-center gap-1.5"><IconShield className="h-3.5 w-3.5 text-forest" /> SSL Secure</span>
        <span className="flex items-center gap-1.5"><IconShield className="h-3.5 w-3.5 text-forest" /> Privacy Protected</span>
        <span className="flex items-center gap-1.5"><IconCheck className="h-3.5 w-3.5 text-forest" /> No Signup</span>
        <span className="flex items-center gap-1.5"><IconBolt className="h-3.5 w-3.5 text-forest" /> 100% Free</span>
        <span className="flex items-center gap-1.5"><IconSparkle className="h-3.5 w-3.5 text-forest" /> Fast Calculations</span>
        <span className="flex items-center gap-1.5"><IconChart className="h-3.5 w-3.5 text-forest" /> Ad-Free Experience</span>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
      <div className="rounded-3xl bg-forest px-8 py-14 sm:px-14 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#fff,transparent_40%),radial-gradient(circle_at_80%_60%,#fff,transparent_35%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-600 max-w-3xl mx-auto leading-tight">
            Start with One Calculation. Stay for Smarter Decisions.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/75">
            Whether you&apos;re planning a SIP, sizing a loan, comparing tax regimes, or learning about mutual funds — CoinMind gives you a clear, accurate answer in seconds. Completely free, forever.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-colors">
              <IconCalculator className="h-4 w-4" /> Start Calculating <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Read the Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
