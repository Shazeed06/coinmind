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
const HUB_LINKS: Record<string, { label: string; href: string }> = {
  "sip": { label: "SIP Hub — guides, ELSS, step-up SIP, and more", href: "/sip" },
  "step-up-sip": { label: "SIP Hub — guides, ELSS, step-up SIP, and more", href: "/sip" },
  "lumpsum": { label: "Investing Hub — mutual funds, stocks, gold, and more", href: "/investing" },
  "mutual-fund-returns": { label: "Investing Hub — mutual funds, stocks, gold, and more", href: "/investing" },
  "cagr": { label: "Investing Hub — mutual funds, stocks, gold, and more", href: "/investing" },
  "income-tax": { label: "Income Tax Hub — regimes, deductions, ITR filing, and more", href: "/income-tax" },
  "tds": { label: "Income Tax Hub — regimes, deductions, ITR filing, and more", href: "/income-tax" },
  "capital-gains": { label: "Income Tax Hub — regimes, deductions, ITR filing, and more", href: "/income-tax" },
  "hra": { label: "Income Tax Hub — regimes, deductions, ITR filing, and more", href: "/income-tax" },
  "emi": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "home-loan": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "home-loan-eligibility": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "personal-loan": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "car-loan-emi": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "education-loan-emi": { label: "Loans Hub — home loans, car loans, personal loans, and more", href: "/loans" },
  "fd": { label: "Savings Hub — FD, PPF, RD, savings strategies, and more", href: "/savings" },
  "rd": { label: "Savings Hub — FD, PPF, RD, savings strategies, and more", href: "/savings" },
  "ppf": { label: "Savings Hub — FD, PPF, RD, savings strategies, and more", href: "/savings" },
  "nps": { label: "Retirement Hub — NPS, EPF, FIRE, pension planning, and more", href: "/retirement" },
  "fire": { label: "Retirement Hub — NPS, EPF, FIRE, pension planning, and more", href: "/retirement" },
  "epf": { label: "Retirement Hub — NPS, EPF, FIRE, pension planning, and more", href: "/retirement" },
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
  ].slice(0, 3);

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
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
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
        <h1 className="mt-4 text-4xl sm:text-5xl text-ink leading-[1.05]">
          {title}
        </h1>
        {/* 16px, not 12px: the h1 runs up to 48px here, and a subtitle sitting
            12px under it read as a stray line rather than part of the title. */}
        <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>
        <div className="mt-4">
          <CalcActions title={title} url={`${site.url}/calculators/${slug}`} />
        </div>
      </header>

      {/* The calculator */}
      <div className="mt-10">{calculator}</div>

      {/* YMYL: every calculator under /calculators is a money tool, and none of
          them carried a disclaimer while components/ToolPageLayout.tsx already
          showed one on the PDF and image utilities. It sits directly under the
          result so it is read with the numbers, not after 2000 words of copy. */}
      <div className="mt-6 max-w-3xl">
        <FinancialDisclaimer type={disclaimerType} />
      </div>

      {/* Intro / SEO copy.
          Section spacing on this page runs on a two-step scale: 64px (mt-16)
          between major blocks, 48px (mt-12) between a block and its own
          follow-on. It was previously an ad-hoc 56/40/48/48/64 ladder, so no
          two gaps agreed and nothing read as grouped.

          The measure cap matters more than the column: at max-w-3xl this
          paragraph ran ~98 characters per line on a 1280px screen. ~600px puts
          it near 75, which is where continuous prose stays readable. The
          surrounding column stays max-w-3xl so headings, the FAQ list and the
          author box keep a shared left and right edge. */}
      <section className="mt-16 max-w-3xl">
        <p className="max-w-[600px] text-ink-soft leading-relaxed">{intro}</p>
      </section>

      {/* How it works */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">{how.heading}</h2>
        <div className="mt-5 max-w-[600px] text-ink-soft leading-relaxed space-y-4">{how.body}</div>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl">
        {/* Keyword-bearing rather than generic: this single line puts the page's
            primary keyword into an H2 on every calculator that uses CalcPage. */}
        <h2 className="font-display text-2xl text-ink">
          {title}: frequently asked questions
        </h2>
        {/* Rows were py-4, which put only 32px between one question and the
            next and made the closed list hard to scan. py-5 opens the rhythm;
            the answer keeps a prose measure and gains right padding so it never
            slides under the +/x control. items-start keeps that control aligned
            to the first line when a question wraps to two. */}
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-ink font-medium list-none transition-colors hover:text-forest">
                <span>{f.q}</span>
                <span className="mt-0.5 shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[600px] pr-8 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Relevant partner offer, renders only when an affiliate href is set
          in lib/affiliates.ts (hidden by default, so nothing misleading shows). */}
      <AffiliateCta offer={offerForCategory(category)} className="mt-16 max-w-3xl" />

      {/* E-E-A-T: who wrote/reviewed this + official sources (YMYL trust) */}
      <div className="mt-16 max-w-3xl">
        <AuthorReviewBox sources={sources} />
      </div>

      {/* Optional extra content (e.g. programmatic-SEO internal links) */}
      {extra ? <section className="mt-16">{extra}</section> : null}

      {/* Comparison links — contextual internal links to /comparisons/ pages */}
      {COMPARISON_LINKS[slug] && COMPARISON_LINKS[slug].length > 0 && (
        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-xl text-ink mb-4">Compare your options</h2>
          <div className="flex flex-wrap gap-2">
            {COMPARISON_LINKS[slug].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors"
              >
                {c.label}
                <IconArrow className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Hub page cross-link — points to the topic hub for deeper reading */}
      {HUB_LINKS[slug] && (
        <section className="mt-8 max-w-3xl">
          <p className="text-sm text-ink-faint">
            Go deeper:{" "}
            <Link href={HUB_LINKS[slug].href} className="text-forest font-medium hover:underline">
              {HUB_LINKS[slug].label}
            </Link>
          </p>
        </section>
      )}

      {/* Related. Guarded on length: a calculator that is the only live one in
          the set produced a heading above an empty grid. The rule closes the
          article column off from the card grid that follows it, and the
          two-column sm step stops three ~200px columns from crushing a title
          and its two-line blurb on small tablets. */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-12 mb-16">
          {/* Only claim the category when every card actually belongs to it.
              Otherwise the heading is a promise the cards below do not keep. */}
          <h2 className="font-display text-2xl text-ink">
            More free{" "}
            {category && related.every((c) => c.category === category)
              ? `${category.toLowerCase()} `
              : ""}
            calculators
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
              >
                <h3 className="font-display text-lg text-ink">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">
                  {c.blurb}
                </p>
                <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                  Open <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
