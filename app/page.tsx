import Link from "next/link";
import type { Metadata } from "next";
import { calculators, posts } from "@/lib/data";
import { site } from "@/lib/site";
import { IconArrow, IconCalculator, IconShield, IconCheck, IconChart, IconSparkle } from "@/components/icons";
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
const CATEGORY_INFO: Record<string, { label: string; desc: string }> = {
  Investing: { label: "Investment", desc: "SIP, lumpsum, mutual funds, PPF, NPS, SWP, CAGR, step-up SIP" },
  Loans: { label: "Loans", desc: "EMI, home loan, personal loan, car loan, education loan, mortgage" },
  Tax: { label: "Tax", desc: "Income tax, HRA, 80C, GST, capital gains, TDS, old vs new regime" },
  Savings: { label: "Savings", desc: "FD, RD, PPF, SSY, NSC, post office schemes, inflation" },
};

const FINANCE_TOPICS = [
  { label: "Investment", href: "/blog/how-to-start-investing-in-india" },
  { label: "Tax Planning", href: "/calculators?cat=tax" },
  { label: "Loans", href: "/calculators?cat=loans" },
  { label: "Retirement", href: "/blog/fire-retire-early-india" },
  { label: "Mutual Funds", href: "/blog/mutual-funds-beginners-india" },
  { label: "Gold", href: "/blog/gold-investment-guide-india" },
  { label: "Budget Planning", href: "/blog/50-30-20-budget-rule" },
  { label: "Personal Finance", href: "/blog/emergency-fund-guide" },
];

const COMPARISONS = [
  { label: "FD vs SIP", href: "/blog/sip-vs-lumpsum" },
  { label: "Old vs New Tax Regime", href: "/tax-regime-break-even" },
  { label: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps" },
  { label: "UPS vs NPS", href: "/blog/ups-vs-nps" },
  { label: "Gold ETFs vs SGB vs Digital", href: "/blog/gold-investment-guide-india" },
  { label: "CTC vs In-Hand Salary", href: "/blog/ctc-vs-in-hand-salary" },
];

const FAQS = [
  { q: "What is a SIP and how does it work?", a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund every month. It averages your purchase cost through market ups and downs and builds a disciplined investing habit. You can start a SIP with as little as Rs 500 per month." },
  { q: "How is EMI calculated?", a: "EMI is calculated as: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of months. Use our EMI calculator to see your monthly payment, total interest, and full amortisation schedule instantly." },
  { q: "How much should I save every month?", a: "The 50/30/20 rule is a good starting point: spend 50% on needs, 30% on wants, and save or invest 20%. The ideal number depends on your goals and expenses. Our 50/30/20 budget rule guide helps you find your rate." },
  { q: "What is CAGR?", a: "CAGR (Compound Annual Growth Rate) measures the average annual return of an investment over time. Formula: CAGR = (Ending Value / Beginning Value)^(1/n) - 1. Use our CAGR calculator for any investment." },
  { q: "How much emergency fund is enough?", a: "3 to 6 months of essential expenses. Self-employed or single earner with dependents? Aim for 9 to 12 months. Keep it in a liquid fund or high-yield savings account for instant access with decent returns." },
  { q: "How does inflation affect savings?", a: "Inflation erodes purchasing power. If your savings earn 4% but inflation is 6%, your real return is -2%. This is why investing in assets that beat inflation — like equity — matters for long-term goals." },
  { q: "What are large cap, mid cap, and small cap funds?", a: "Large cap = top 100 companies (stable, lower risk). Mid cap = 101-250 (moderate risk). Small cap = 251+ (highest risk, highest potential return). Beginners should start with large cap or flexi cap funds." },
  { q: "How is income tax calculated in India?", a: "India uses a slab system. Under the new regime (FY 2026-27), income up to Rs 4 lakh is tax-free, with progressive slabs up to 30% above Rs 24 lakh. A rebate under Section 87A zeroes tax up to Rs 12 lakh taxable income." },
];

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <FinanceCategories />
      <CalculatorSection />
      <AboutSection />
      <ComparisonSection />
      <FaqSection />
      <WhySection />
      <GuideSection />
      <TrustBar />
      <ClosingCta />
    </>
  );
}

function StructuredData() {
  const graph = [
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
      description: `${CALC_COUNT} free financial calculators.`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
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
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-4 py-1.5 text-xs font-medium text-forest">
        <IconSparkle className="h-3.5 w-3.5" /> India&apos;s Complete Personal Finance Platform
      </span>
      <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-600 text-ink">
        India&apos;s Smartest{" "}
        <span className="text-forest">Personal Finance</span> Platform
      </h1>
      <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-ink-soft">
        Calculate, compare, and learn — with {CALC_COUNT} free calculators, {GUIDE_COUNT} expert guides, {TOOL_COUNT} free tools, and AI-powered resources. No sign-up, no charges.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition-colors shadow-lg shadow-forest/25">
          <IconCalculator className="h-4 w-4" /> Explore Calculators <IconArrow className="h-4 w-4" />
        </Link>
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors">
          Learn Finance
        </Link>
        <Link href="/tax-regime-break-even" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-7 py-3.5 text-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors">
          Compare Investments
        </Link>
      </div>
      <dl className="mt-10 flex items-center justify-center gap-x-10 gap-y-3 text-sm">
        <div><dt className="font-display text-3xl font-600 text-ink">{CALC_COUNT}</dt><dd className="text-ink-faint">Calculators</dd></div>
        <div className="h-8 w-px bg-line" />
        <div><dt className="font-display text-3xl font-600 text-ink">{GUIDE_COUNT}</dt><dd className="text-ink-faint">Guides</dd></div>
        <div className="h-8 w-px bg-line" />
        <div><dt className="font-display text-3xl font-600 text-ink">100%</dt><dd className="text-ink-faint">Free</dd></div>
      </dl>
    </section>
  );
}

function FinanceCategories() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-brass text-center">Topics</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight text-center">
        Popular Finance Categories
      </h2>
      <div className="mt-8 grid gap-px bg-line rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {FINANCE_TOPICS.map((t) => (
          <Link key={t.label} href={t.href} className="bg-card px-5 py-4 text-sm font-medium text-ink hover:bg-forest-soft hover:text-forest transition-colors flex items-center justify-between group">
            {t.label}
            <IconArrow className="h-3 w-3 text-ink-faint group-hover:text-forest transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function CalculatorSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-brass text-center">Tools</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight text-center">
        {CALC_COUNT} Free Financial Calculators
      </h2>
      <p className="mt-3 text-center text-ink-soft max-w-2xl mx-auto">
        Every calculator runs in your browser — private, fast, and accurate. Organized by category so you find what you need.
      </p>

      <div className="mt-10 space-y-10">
        {CALC_CATEGORIES.map((cat) => {
          const items = liveCalcs.filter((c) => c.category === cat);
          const info = CATEGORY_INFO[cat];
          return (
            <div key={cat}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-display text-2xl font-600 text-ink">{info.label} Calculators</h3>
                <Link href={`/calculators?cat=${cat.toLowerCase()}`} className="shrink-0 text-sm font-medium text-forest hover:underline">
                  View all &rarr;
                </Link>
              </div>
              <p className="text-sm text-ink-soft mb-4">{info.desc}</p>
              <div className="grid gap-px bg-line rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
                {items.map((c) => (
                  <Link key={c.slug} href={`/calculators/${c.slug}`} className="bg-card px-4 py-3.5 text-sm text-ink hover:bg-forest-soft hover:text-forest transition-colors flex items-center justify-between group">
                    {c.title}
                    <IconArrow className="h-3 w-3 shrink-0 text-ink-faint group-hover:text-forest transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition-colors">
          Browse All {CALC_COUNT} Calculators <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass text-center">Why Trust CoinMind</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight text-center">
          Built for Accuracy and Transparency
        </h2>
        <div className="mt-8 max-w-3xl mx-auto space-y-5 text-sm text-ink-soft leading-relaxed">
          <p>Every calculation on CoinMind follows the latest RBI, SEBI, and Income Tax Department guidelines. Our formulas are updated immediately after every Budget and regulatory change. Each calculator shows its working formula so you can verify the math yourself.</p>
          <p>All guides are researched, fact-checked, and reviewed before publication. We never publish AI-generated fluff or content written solely for search engines. Every article has a named author with a finance credential.</p>
          <p>Calculators run entirely in your browser. We never see, store, or share your financial data. No login, no sign-up, no hidden charges — every tool is genuinely free.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            "RBI-aligned formulas", "Budget-updated annually", "Fact-checked content", "Transparent methodology",
            "Privacy-first (no data leaves your browser)", "No login required", "100% free — forever",
          ].map((s) => (
            <span key={s} className="flex items-center gap-1.5 text-ink"><IconCheck className="h-4 w-4 text-forest shrink-0" />{s}</span>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-faint">
          <strong className="text-ink">{site.author.name}</strong>, {site.author.role} ({site.author.credential}) &middot; Editorial Team &middot; Research Reviewers
        </p>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-brass text-center">Compare</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight text-center">
        Popular Financial Comparisons
      </h2>
      <div className="mt-8 grid gap-px bg-line rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {COMPARISONS.map((c) => (
          <Link key={c.href} href={c.href} className="bg-card px-5 py-4 text-sm font-medium text-ink hover:bg-forest-soft hover:text-forest transition-colors flex items-center justify-between group">
            {c.label}
            <IconArrow className="h-3 w-3 shrink-0 text-ink-faint group-hover:text-forest transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass text-center">AI-Powered Learning</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight text-center">
          Frequently Asked Finance Questions
        </h2>
        <p className="mt-3 text-center text-ink-soft text-sm max-w-2xl mx-auto">
          Clear answers optimised for Google AI Overviews, voice search, and AI assistants.
        </p>
        <div className="mt-8 divide-y divide-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-sm font-medium text-ink list-none hover:text-forest transition-colors">
                {f.q}
                <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="pb-4 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/glossary" className="text-sm font-semibold text-forest hover:underline">Browse the full finance glossary &rarr;</Link>
          <span className="mx-3 text-ink-faint">·</span>
          <Link href="/blog" className="text-sm font-semibold text-forest hover:underline">Read all guides &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-brass">Why CoinMind</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
        India&apos;s Most Comprehensive Free Finance Platform
      </h2>
      <p className="mt-3 text-ink-soft max-w-2xl mx-auto">
        Calculators + guides + tools + AI resources — all in one place, completely free, with no sign-up.
      </p>
      <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {[
          { n: `${CALC_COUNT}+`, l: "Financial Calculators" },
          { n: `${GUIDE_COUNT}+`, l: "Expert Guides" },
          { n: "10,000+", l: "Calculations Processed Monthly" },
          { n: "99.9%", l: "Calculation Accuracy" },
        ].map((s) => (
          <div key={s.n} className="text-center">
            <dt className="font-display text-4xl font-600 text-forest">{s.n}</dt>
            <dd className="mt-1 text-sm text-ink-faint">{s.l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function GuideSection() {
  const featured = posts.slice(0, 4);
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">Guides</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
              Learn Finance, Your Way
            </h2>
            <p className="mt-2 text-ink-soft max-w-xl">
              Original, researched, and written in plain English — from beginner basics to advanced strategies.
            </p>
          </div>
          <Link href="/blog" className="shrink-0 text-sm font-semibold text-forest hover:underline">
            All guides &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-line">
                <CoverArt seed={p.slug} variant={p.art.variant} palette={p.art.palette} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brass">{p.category}</p>
              <h3 className="mt-1 font-display text-base font-600 leading-snug text-ink group-hover:text-forest transition-colors">{p.title}</h3>
              <p className="mt-1 text-xs text-ink-faint">{p.readMinutes} min read</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "How SIP Works", "Tax Saving Guide", "Mutual Fund Guide", "Budget Planning",
            "Financial Freedom", "Emergency Fund Guide", "Gold Investment Guide", "Credit Score Guide",
          ].map((l) => (
            <Link key={l} href="/blog" className="rounded-full border border-line bg-card px-4 py-2 text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-faint">
        <span className="flex items-center gap-1"><IconShield className="h-3.5 w-3.5 text-forest" /> SSL Secure</span>
        <span className="flex items-center gap-1"><IconShield className="h-3.5 w-3.5 text-forest" /> Privacy Protected</span>
        <span className="flex items-center gap-1"><IconCheck className="h-3.5 w-3.5 text-forest" /> No Signup</span>
        <span className="flex items-center gap-1"><IconChart className="h-3.5 w-3.5 text-forest" /> 100% Free</span>
        <span className="flex items-center gap-1"><IconSparkle className="h-3.5 w-3.5 text-forest" /> Fast Calculations</span>
      </div>
    </div>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
      <div className="rounded-3xl bg-forest px-8 py-14 sm:px-14 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#fff,transparent_40%),radial-gradient(circle_at_80%_60%,#fff,transparent_35%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-600 max-w-3xl mx-auto leading-tight">
            Start with One Calculation. Stay for Smarter Decisions.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/75">
            Plan a SIP, size a loan, compare tax regimes, learn about mutual funds — CoinMind gives you a clear, accurate answer in seconds. Completely free.
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
