import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import {
  INHAND_LPA,
  INHAND_SLUGS,
  lpaSlug,
  lpaLabel,
  parseLpaSlug,
  computeInHand,
  basicPctScenarios,
} from "@/lib/pseo-inhand";
import TakeHomeSalaryCalculator from "@/components/calc/TakeHomeSalaryCalculator";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { IconArrow, IconCalculator, IconCheck } from "@/components/icons";

// Only the CTC values listed in INHAND_LPA are generated; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return INHAND_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lpa = parseLpaSlug(slug);
  if (lpa === null) return {};

  const label = lpaLabel(lpa);
  const { monthly, netAnnual } = computeInHand(lpa);
  const monthlyStr = formatCurrency(monthly);

  const title = `${label} In-Hand Salary Per Month (2026)`;
  const description = `A ₹${label} CTC works out to about ${monthlyStr} per month in hand — ${formatCurrency(netAnnual)} a year. Full deduction breakdown, with every assumption shown.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/in-hand-salary/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/in-hand-salary/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `${label} In-Hand Salary: ${monthlyStr} Per Month`,
      description: `Exactly how a ₹${label} CTC becomes ${monthlyStr} a month: employer PF, gratuity, your PF, professional tax and new-regime income tax, all shown.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${label} in-hand salary breakdown`,
        },
      ],
    },
  };
}

// A single label/value row for the breakdown card.
function Row({
  label,
  value,
  accent,
  strong,
}: {
  label: string;
  value: string;
  accent?: "forest" | "brass" | "ink";
  strong?: boolean;
}) {
  const color =
    accent === "forest"
      ? "text-forest"
      : accent === "brass"
        ? "text-brass"
        : "text-ink";
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        strong ? "" : "border-b border-line last:border-0"
      }`}
    >
      <span
        className={`text-sm ${strong ? "font-semibold text-ink" : "text-ink-soft"}`}
      >
        {label}
      </span>
      <span
        className={`font-display font-600 ${strong ? "text-2xl" : "text-lg"} ${color}`}
      >
        {value}
      </span>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lpa = parseLpaSlug(slug);
  if (lpa === null) notFound();

  const label = lpaLabel(lpa);
  const r = computeInHand(lpa);
  const scenarios = basicPctScenarios(lpa);
  const monthlyStr = formatCurrency(r.monthly);

  // The spread between the most and least favourable basic-salary structure —
  // this is the number rival pages hide by quoting a single figure.
  const monthlies = scenarios.map((s) => s.monthly);
  const spread = Math.max(...monthlies) - Math.min(...monthlies);

  const quickAnswer = `A ₹${label} CTC in India works out to roughly ${monthlyStr} per month in hand, or ${formatCurrency(r.netAnnual)} a year, assuming basic salary is 50% of CTC and the new tax regime for FY 2026-27. That is ${r.takeHomePct.toFixed(1)}% of your CTC — the rest goes to employer PF and gratuity (which never reach you as cash), your own PF, professional tax${r.tax > 0 ? " and income tax" : ", with no income tax payable at this level"}.`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `What is the in-hand salary for ${label} CTC?`,
      a: `Approximately ${monthlyStr} per month, or ${formatCurrency(r.netAnnual)} per year. This assumes basic salary is 50% of CTC, employer PF at 12% of basic, a gratuity provision of 4.81% of basic, your own PF at 12% of basic, professional tax of ₹2,400 a year, and income tax under the new regime for FY 2026-27.`,
    },
    {
      q: `How much tax do I pay on a ₹${label} salary?`,
      a:
        r.tax > 0
          ? `About ${formatCurrency(r.tax)} a year including the 4% health and education cess, under the new regime for FY 2026-27. Your taxable income after the ₹75,000 standard deduction is ${formatCurrency(r.taxableIncome)}.`
          : `Nothing. Your taxable income after the ₹75,000 standard deduction is ${formatCurrency(r.taxableIncome)}, which is within the ₹12,00,000 covered by the Section 87A rebate under the new regime for FY 2026-27, so the income tax works out to zero.`,
    },
    {
      q: `Why do different websites show different in-hand figures for ${label}?`,
      a: `Because they assume different salary structures and rarely say so. If basic salary is set at 40% of CTC instead of 50%, PF is calculated on a smaller base, so less is diverted to your provident fund and your monthly in-hand rises. Across the common 40% to 60% range, the monthly figure for ₹${label} moves by about ${formatCurrency(spread)}. Every number on this page states its assumption, and the table below shows all five structures.`,
    },
    {
      q: `Is ${label} a good salary in India?`,
      a: `That depends entirely on your city, experience and expenses rather than on the number itself. What matters practically is the ${monthlyStr} that actually reaches your account, not the ₹${label} headline. Budget from the in-hand figure, not the CTC, and remember that a large portion of the difference is your own PF, which is still your money — it is saved rather than lost.`,
    },
    {
      q: `Does this include HRA exemption or old regime deductions?`,
      a: `No. These figures use the new tax regime, which is the default from FY 2026-27 and does not allow HRA exemption or Section 80C deductions. If you pay significant rent or invest heavily under 80C, the old regime may leave you with more. Run both through the income tax calculator to compare.`,
    },
    {
      q: `Is my PF deduction actually a loss?`,
      a: `No. Your ${formatCurrency(r.employeePF)} employee PF and the employer's matching ${formatCurrency(r.employerPF)} both go into your EPF account and earn interest. They reduce your monthly cash but increase your retirement savings, so treat them as forced saving rather than as a deduction you never see again.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${label} In-Hand Salary Per Month (2026)`,
        description: quickAnswer,
        image: [`${site.url}/opengraph-image`],
        author: {
          "@type": "Person",
          name: site.author.name,
          jobTitle: site.author.credential,
          url: `${site.url}/about#author`,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        datePublished: "2026-07-24",
        dateModified: "2026-07-24",
        mainEntityOfPage: `${site.url}/in-hand-salary/${slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Take-Home Salary Calculator",
            item: `${site.url}/calculators/take-home-salary`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${label} in-hand salary`,
            item: `${site.url}/in-hand-salary/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/calculators/take-home-salary" className="hover:text-forest">
          Take-Home Salary
        </Link>
        <span>/</span>
        <span className="text-ink">{label}</span>
      </nav>

      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> India · New regime · FY
          2026-27
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          ₹{label} In-Hand Salary Per Month
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          What a ₹{label} CTC actually pays into your bank account each month,
          with every deduction and every assumption shown.
        </p>
      </header>

      {/* Quick answer — for featured snippets and AI overviews */}
      <section className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        <p className="mt-2 text-forest-deep leading-relaxed text-[1.05rem]">
          {quickAnswer}
        </p>
      </section>

      {/* The headline number */}
      <section className="mt-10">
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Monthly in-hand
          </p>
          <p className="mt-1 font-display text-5xl font-600 text-forest break-words">
            {monthlyStr}
          </p>
          <p className="mt-1 text-sm text-ink-faint">
            {formatCurrency(r.netAnnual)} per year ·{" "}
            {r.takeHomePct.toFixed(1)}% of CTC
          </p>
        </div>
      </section>

      {/* Full breakdown */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">
          Where every rupee of your ₹{label} goes
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Two items inside your CTC never reach you as cash: the employer&rsquo;s
          PF contribution and the gratuity provision. Removing those gives your
          gross salary, which is what the company actually runs deductions on.
        </p>
        <div className="mt-5 rounded-2xl border border-line bg-card p-6">
          <Row label="Cost to company (CTC)" value={formatCurrency(r.ctc)} accent="ink" />
          <Row label="Basic salary (50% of CTC)" value={formatCurrency(r.basic)} accent="ink" />
          <Row
            label="− Employer PF (12% of basic)"
            value={formatCurrency(r.employerPF)}
            accent="brass"
          />
          <Row
            label="− Gratuity provision (4.81% of basic)"
            value={formatCurrency(r.gratuity)}
            accent="brass"
          />
          <Row label="Gross salary" value={formatCurrency(r.gross)} accent="ink" />
          <Row
            label="− Your PF (12% of basic)"
            value={formatCurrency(r.employeePF)}
            accent="brass"
          />
          <Row
            label="− Professional tax"
            value={formatCurrency(r.profTax)}
            accent="brass"
          />
          <Row
            label="− Income tax (incl. 4% cess)"
            value={formatCurrency(r.tax)}
            accent="brass"
          />
          <Row
            label="Annual in-hand"
            value={formatCurrency(r.netAnnual)}
            accent="forest"
            strong
          />
        </div>
      </section>

      {/* The differentiator: assumptions made explicit */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Why other sites quote a different number
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Search &ldquo;{label} in hand salary&rdquo; and you will get several
          different answers. None of them are lying — they are simply assuming
          different salary structures and not telling you which. PF is
          calculated on your <strong className="text-ink">basic salary</strong>,
          so the percentage your company sets basic at changes your take-home
          directly. For a ₹{label} CTC the monthly figure moves by about{" "}
          <strong className="text-ink">{formatCurrency(spread)}</strong> across
          the common range.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="px-5 py-3 font-semibold text-ink">
                  Basic as % of CTC
                </th>
                <th className="px-5 py-3 font-semibold text-ink">
                  Monthly in-hand
                </th>
                <th className="px-5 py-3 font-semibold text-ink">Annual tax</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr
                  key={s.basicPct}
                  className={`border-b border-line last:border-0 ${
                    s.basicPct === 50 ? "bg-forest-soft/40" : ""
                  }`}
                >
                  <td className="px-5 py-3 text-ink-soft">
                    {s.basicPct}%{s.basicPct === 50 ? " (used above)" : ""}
                  </td>
                  <td className="px-5 py-3 font-display font-600 text-forest">
                    {formatCurrency(s.monthly)}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {formatCurrency(s.tax)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-faint leading-relaxed">
          Check your offer letter or payslip for your actual basic figure, then
          read the row that matches. A lower basic means more monthly cash but a
          smaller PF balance and a smaller gratuity later — it is a trade, not a
          free gain.
        </p>
      </section>

      {/* Interactive tool */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Change the numbers yourself
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Set your own CTC and basic percentage to match your actual offer.
        </p>
        <div className="mt-6">
          <TakeHomeSalaryCalculator />
        </div>
      </section>

      {/* Tax context */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          The tax on a ₹{label} salary
        </h2>
        <div className="mt-3 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Under the new regime for FY 2026-27, salaried people get a ₹75,000
            standard deduction. On a ₹{label} CTC your gross salary is{" "}
            {formatCurrency(r.gross)}, which leaves a taxable income of{" "}
            {formatCurrency(r.taxableIncome)}.
          </p>
          {r.tax > 0 ? (
            <p>
              That falls above the ₹12,00,000 covered by the Section 87A rebate,
              so tax is payable: {formatCurrency(r.tax)} for the year including
              the 4% health and education cess. Spread across twelve months that
              is roughly {formatCurrency(r.tax / 12)} deducted as TDS from each
              payslip.
            </p>
          ) : (
            <p>
              That sits within the ₹12,00,000 covered by the Section 87A rebate,
              so your income tax is <strong className="text-ink">zero</strong>.
              Everything leaving your gross salary at this level is PF and
              professional tax, not tax on income — which is why your take-home
              percentage is comparatively high.
            </p>
          )}
          <p>
            These figures assume no HRA exemption and no Section 80C
            investments, because the new regime does not allow them. If you pay
            substantial rent or already invest heavily under 80C, compare both
            regimes in the{" "}
            <Link
              href="/calculators/income-tax"
              className="text-forest underline underline-offset-2"
            >
              income tax calculator
            </Link>{" "}
            before assuming the new regime is better, and check how much of your
            rent allowance is exempt with the{" "}
            <Link
              href="/calculators/hra"
              className="text-forest underline underline-offset-2"
            >
              HRA calculator
            </Link>
            .
          </p>
          <p>
            For the tax figure on its own, without the salary-structure layer,
            see our page on{" "}
            <Link
              href="/income-tax/12-lakh"
              className="text-forest underline underline-offset-2"
            >
              income tax by salary
            </Link>
            , and for the full conceptual walkthrough read{" "}
            <Link
              href="/blog/ctc-vs-in-hand-salary"
              className="text-forest underline underline-offset-2"
            >
              CTC vs in-hand salary in India
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sibling links — keeps the whole cluster internally linked */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          In-hand salary for other CTCs
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {INHAND_LPA.filter((v) => v !== lpa).map((v) => (
            <Link
              key={v}
              href={`/in-hand-salary/${lpaSlug(v)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              <IconCheck className="h-3.5 w-3.5 text-forest" />
              {lpaLabel(v)}
            </Link>
          ))}
        </div>
        <Link
          href="/calculators/take-home-salary"
          className="mt-6 inline-flex items-center gap-2 text-forest font-medium hover:underline"
        >
          Open the full take-home salary calculator
          <IconArrow className="h-4 w-4" />
        </Link>
      </section>

      <div className="mt-12">
        <AuthorReviewBox
          sources={[
            { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
            { label: "EPFO", href: "https://www.epfindia.gov.in" },
          ]}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> these figures
        are estimates built on a standard Indian salary structure, not a payslip.
        Your actual in-hand pay depends on how your employer splits basic, HRA
        and allowances, on your state&rsquo;s professional tax, on whether you
        chose the old or new regime, and on any variable pay inside your CTC.
        Always check your own offer letter and payslip. This is general
        educational information, not personalised tax advice.
      </div>
    </div>
  );
}
