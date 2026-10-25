import Link from "next/link";
import { ReactNode } from "react";
import { calculators } from "@/lib/data";
import { breadcrumb, faqPage, graph, howTo, webApp } from "@/lib/ld";
import { IconArrow, IconCalculator } from "@/components/icons";
import AuthorReviewBox, { type Source } from "@/components/AuthorReviewBox";
import AffiliateCta from "@/components/AffiliateCta";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { offerForCategory } from "@/lib/affiliates";
import CalcActions from "@/components/calc/CalcActions";
import { site } from "@/lib/site";

// Maps calculator slug → relevant hub page(s)
const HUB_SIP = { label: "SIP Hub - guides, ELSS, step-up SIP, and more", href: "/sip" };
const HUB_INVESTING = { label: "Investing Hub - mutual funds, stocks, gold, and more", href: "/investing" };
const HUB_INCOME_TAX = { label: "Income Tax Hub - regimes, deductions, ITR filing, and more", href: "/income-tax" };
const HUB_LOANS = { label: "Loans Hub - home loans, car loans, personal loans, and more", href: "/loans" };
const HUB_SAVINGS = { label: "Savings Hub - FD, PPF, RD, savings strategies, and more", href: "/savings" };
const HUB_RETIREMENT = { label: "Retirement Hub - NPS, EPF, FIRE, pension planning, and more", href: "/retirement" };
const HUB_BUDGETING = { label: "Budgeting Hub - cash flow, expense tracking, and financial health", href: "/budgeting" };

const HUB_LINKS: Record<string, { label: string; href: string }> = {
  // SIP
  "sip": HUB_SIP,
  "step-up-sip": HUB_SIP,
  "goal-sip": HUB_SIP,
  "swp": HUB_SIP,

  // Investing
  "lumpsum": HUB_INVESTING,
  "mutual-fund-returns": HUB_INVESTING,
  "cagr": HUB_INVESTING,
  "currency-converter": HUB_INVESTING,
  "percentage-calculator": HUB_INVESTING,
  "goal": HUB_INVESTING,
  "goal-child-education": HUB_INVESTING,
  "goal-marriage": HUB_INVESTING,

  // Income Tax
  "income-tax": HUB_INCOME_TAX,
  "tds": HUB_INCOME_TAX,
  "capital-gains": HUB_INCOME_TAX,
  "hra": HUB_INCOME_TAX,
  "gst": HUB_INCOME_TAX,
  "take-home-salary": HUB_INCOME_TAX,
  "sales-tax": HUB_INCOME_TAX,
  "hourly-to-salary": HUB_INCOME_TAX,
  "crypto-tax": HUB_INCOME_TAX,

  // Loans
  "emi": HUB_LOANS,
  "home-loan": HUB_LOANS,
  "home-loan-eligibility": HUB_LOANS,
  "personal-loan": HUB_LOANS,
  "personal-loan-emi": HUB_LOANS,
  "car-loan-emi": HUB_LOANS,
  "education-loan-emi": HUB_LOANS,
  "rent-vs-buy": HUB_LOANS,
  "mortgage": HUB_LOANS,
  "goal-house-down-payment": HUB_LOANS,

  // Savings
  "fd": HUB_SAVINGS,
  "rd": HUB_SAVINGS,
  "ppf": HUB_SAVINGS,
  "compound-interest": HUB_SAVINGS,
  "inflation": HUB_SAVINGS,
  "simple-interest": HUB_SAVINGS,
  "sukanya-samriddhi": HUB_SAVINGS,
  "nsc": HUB_SAVINGS,
  "scss": HUB_SAVINGS,
  "post-office-mis": HUB_SAVINGS,
  "goal-car": HUB_SAVINGS,
  "goal-emergency-fund": HUB_SAVINGS,

  // Retirement
  "retirement": HUB_RETIREMENT,
  "nps": HUB_RETIREMENT,
  "fire": HUB_RETIREMENT,
  "epf": HUB_RETIREMENT,
  "gratuity": HUB_RETIREMENT,
  "age-calculator": HUB_RETIREMENT,
  "date-difference-calculator": HUB_RETIREMENT,
  "what-if-simulator": HUB_RETIREMENT,

  // Budgeting
  "tip-calculator": HUB_BUDGETING,
  "discount": HUB_BUDGETING,
  "net-worth": HUB_BUDGETING,
  "financial-health": HUB_BUDGETING,
};

// Maps calculator slug → relevant comparison pages
const COMPARISON_LINKS: Record<string, { label: string; href: string }[]> = {
  sip: [
    { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
    { label: "SIP vs Lumpsum", href: "/comparisons/sip-vs-lumpsum" },
  ],
  fd: [
    { label: "FD vs Debt Mutual Fund", href: "/comparisons/fd-vs-debt-mutual-fund" },
    { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
    { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
  ],
  ppf: [
    { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
    { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
    { label: "ELSS vs PPF", href: "/comparisons/elss-vs-ppf" },
  ],
  epf: [
    { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
  ],
  nps: [
    { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
    { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
    { label: "NPS Tier 1 vs Tier 2", href: "/comparisons/nps-tier-1-vs-tier-2" },
  ],
  "income-tax": [
    { label: "Old vs New Tax Regime", href: "/comparisons/old-vs-new-tax-regime" },
  ],
  emi: [
    { label: "Loan Prepayment vs Investing", href: "/comparisons/loan-prepayment-vs-investing" },
  ],
  "mutual-fund-returns": [
    { label: "Mutual Fund vs Stocks", href: "/comparisons/mutual-fund-vs-stocks" },
    { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
  ],
  fire: [
    { label: "What-If Simulator", href: "/calculators/what-if-simulator" },
    { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
  ],
  "goal-child-education": [
    { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
    { label: "ELSS vs PPF", href: "/comparisons/elss-vs-ppf" },
  ],
  "goal-house-down-payment": [
    { label: "Loan Prepayment vs Investing", href: "/comparisons/loan-prepayment-vs-investing" },
  ],
  "term-insurance": [
    { label: "Term vs ULIP vs Endowment", href: "/comparisons/term-vs-ulip-vs-endowment" },
  ],
  "health-insurance": [
    { label: "Floater vs Individual Health Insurance", href: "/comparisons/floater-vs-individual-health-insurance" },
  ],
};

export type Faq = { q: string; a: string };

export default function CalcPage({
  slug,
  title,
  subtitle,
  intro,
  calculator,
  how,
  faqs,
  extra,
  sources,
}: {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  calculator: ReactNode;
  how: { heading: string; body: ReactNode };
  faqs: Faq[];
  extra?: ReactNode;
  sources?: Source[];
}) {
  const category = calculators.find((c) => c.slug === slug)?.category;

  // Related used to be a plain .slice(0, 3) over the raw array, so every one of
  // these pages linked to the same first three calculators while the heading two
  // blocks below promised "More free {category} calculators". /calculators/gst
  // therefore offered SIP, EMI and Income Tax under a "tax calculators" heading.
  // Same-category entries come first and anything else only fills the remaining
  // slots, so a category with fewer than three live siblings still shows three
  // cards. Both passes filter the module-level `calculators` array in its own
  // order, which keeps the output deterministic for static generation.
  const pool = calculators.filter((c) => c.live && c.slug !== slug);
  const related = [
    ...pool.filter((c) => c.category === category),
    ...pool.filter((c) => c.category !== category),
  ].slice(0, 4);
  const sameCategory =
    category !== undefined && related.length > 0 && related.every((c) => c.category === category);

  // Tax rules and market returns carry different caveats, so the shared shell
  // picks the matching wording rather than always falling back to "general".
  const disclaimerType =
    category === "Tax" ? "tax" : category === "Investing" || category === "Savings" ? "investment" : "general";

  // Every calculator page owns its structured data, so the root layout does not
  // have to read the request path (which would opt the whole site into dynamic
  // rendering). The WebApplication node describes what the page IS: a free
  // browser tool. No aggregateRating, because there are no genuine user ratings
  // and inventing them is a spam-policy violation.
  const schemaGraph = graph([
    ...(faqs.length > 0 ? [faqPage(faqs)] : []),
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Calculators", path: "/calculators" },
      { name: title, path: `/calculators/${slug}` },
    ]),
    webApp(title, `calculators/${slug}`, category ?? "", `Free ${title}: instant, private, no sign-up.`),
    howTo(`How to Use the ${title}`, `Step-by-step guide to using the free ${title} on CoinMind.`, [
      { name: "Enter your values", text: `Open the ${title} and enter the required numbers such as amount, rate, or duration.` },
      { name: "Adjust parameters", text: "Use the sliders or input fields to fine-tune assumptions like interest rate, tenure, or inflation." },
      { name: "Review the results", text: "The calculator instantly shows your projected outcome with charts and a detailed breakdown table." },
    ]),
  ]);

  return (
    <div className="container-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-forest">Calculators</Link>
        <span>/</span>
        <span className="text-ink">{title}</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> Free calculator
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.08]">
          {title}
        </h1>
        {/* 16px, not 12px: the h1 runs up to 48px here, and a subtitle sitting
            12px under it read as a stray line rather than part of the title. */}
        <p className="mt-4 text-base sm:text-lg text-ink-soft">{subtitle}</p>
        <div className="mt-4">
          <CalcActions title={title} url={`${site.url}/calculators/${slug}`} />
        </div>
      </header>

      {/* The calculator */}
      <div className="mt-8 sm:mt-10">{calculator}</div>

      {/* YMYL: every calculator under /calculators is a money tool, and none of
          them carried a disclaimer while components/ToolPageLayout.tsx already
          showed one on the PDF and image utilities. It sits directly under the
          result so it is read with the numbers, not after 2000 words of copy. */}
      <div className="mt-6 max-w-3xl">
        <FinancialDisclaimer type={disclaimerType} />
      </div>

      {/* Below-calculator content: a two-column reading layout so the long-form
          SEO copy no longer sits in a narrow left column with an empty right
          half. The main column carries the explainer and FAQ; the sticky
          sidebar keeps related calculators, comparisons and the topic hub in
          view, which also strengthens internal linking on these high-intent
          pages. On mobile the sidebar stacks below the article. */}
      <div className="mt-12 sm:mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Main article column */}
        <div className="lg:col-span-8 min-w-0">
          <p className="max-w-[640px] text-ink-soft leading-relaxed">{intro}</p>

          {/* How it works */}
          <section className="mt-12">
            <h2 className="font-display text-2xl text-ink">{how.heading}</h2>
            <div className="mt-5 text-ink-soft leading-relaxed space-y-4">{how.body}</div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            {/* Keyword-bearing rather than generic: this single line puts the
                page's primary keyword into an H2 on every calculator. */}
            <h2 className="font-display text-2xl text-ink">
              {title}: frequently asked questions
            </h2>
            <div className="mt-5 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-ink font-medium list-none transition-colors hover:text-forest">
                    <span>{f.q}</span>
                    <span className="mt-0.5 shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[640px] pr-8 text-ink-soft leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Relevant partner offer, renders only when an affiliate href is set
              in lib/affiliates.ts (hidden by default, so nothing misleading shows). */}
          <AffiliateCta offer={offerForCategory(category)} className="mt-12" />

          {/* E-E-A-T: who wrote/reviewed this + official sources (YMYL trust) */}
          <div className="mt-12">
            <AuthorReviewBox sources={sources} />
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Related calculators */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-line bg-card p-5">
                <h2 className="font-display text-lg text-ink">
                  More free {sameCategory ? `${category!.toLowerCase()} ` : ""}calculators
                </h2>
                <div className="mt-4 space-y-1">
                  {related.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/calculators/${c.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 -mx-1 hover:bg-forest-soft/40 transition-colors"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-ink group-hover:text-forest transition-colors">
                          {c.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-faint line-clamp-1">{c.blurb}</span>
                      </span>
                      <IconArrow className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-forest" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/calculators"
                  className="mt-3 inline-flex items-center gap-1 px-3 text-sm font-semibold text-forest hover:underline"
                >
                  All calculators <IconArrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* Comparison links */}
            {COMPARISON_LINKS[slug] && COMPARISON_LINKS[slug].length > 0 && (
              <div className="rounded-2xl border border-line bg-card p-5">
                <h2 className="font-display text-lg text-ink">Compare your options</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {COMPARISON_LINKS[slug].map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors"
                    >
                      {c.label}
                      <IconArrow className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Hub crosslink */}
            {HUB_LINKS[slug] && (
              <div className="rounded-2xl border border-forest/25 bg-forest-soft p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-forest">Go deeper</p>
                <Link
                  href={HUB_LINKS[slug].href}
                  className="mt-1.5 block text-sm font-semibold text-ink hover:text-forest transition-colors"
                >
                  {HUB_LINKS[slug].label} &rarr;
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Optional extra content (e.g. programmatic-SEO internal links) -
          full width below the two-column block. */}
      {extra ? <section className="mt-16 mb-16">{extra}</section> : <div className="mb-16" />}
    </div>
  );
}
