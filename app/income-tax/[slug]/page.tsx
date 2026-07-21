import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import {
  TAX_SALARIES,
  TAX_SLUGS,
  salarySlug,
  salaryLabel,
  parseSalarySlug,
  computeNewRegimeTax,
  computeOldRegimeTax,
  newRegimeSlabBreakdown,
} from "@/lib/pseo-tax";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import { IconArrow, IconCalculator, IconCheck } from "@/components/icons";

// Only the salaries listed in TAX_SALARIES are generated; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return TAX_SLUGS.map((slug) => ({ slug }));
}

// Resolve a slug to a known salary (guards against slugs that parse but aren't
// in our curated list, e.g. "13-lakh").
function salaryForSlug(slug: string): number | null {
  const parsed = parseSalarySlug(slug);
  if (parsed === null) return null;
  return TAX_SALARIES.includes(parsed) ? parsed : null;
}

const LPA = 100000;
const CRORE = 10000000;

// Compact rate: 6.5 → "6.5", 0 → "0", 9.62 → "9.6".
function fmtRate(r: number): string {
  return String(Number(r.toFixed(r % 1 === 0 ? 0 : 1)));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const salary = salaryForSlug(slug);
  if (salary === null) return {};

  const label = salaryLabel(salary);
  const { totalTax, effectiveRate } = computeNewRegimeTax(salary);
  const taxStr = formatCurrency(totalTax);
  const rateStr = fmtRate(effectiveRate);

  return {
    title: { absolute: `Income Tax on ₹${label} Salary (FY 2026-27)` },
    description: `New regime income tax on a ₹${label} salary for FY 2026-27 is ${taxStr} — an effective rate of ${rateStr}%. See the full slab breakdown.`,
    alternates: { canonical: `/income-tax/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/income-tax/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `Income Tax on ₹${label} Salary — FY 2026-27`,
      description: `New regime tax on ₹${label}: ${taxStr} (${rateStr}% effective). Full slab-by-slab breakdown, old-vs-new comparison and a free calculator.`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Income tax on ₹${label} salary`,
        },
      ],
    },
  };
}

// A single label/value row for the breakdown card (Stat-style).
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
      <span className={`text-sm ${strong ? "font-semibold text-ink" : "text-ink-soft"}`}>
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
  const salary = salaryForSlug(slug);
  if (salary === null) notFound();

  const label = salaryLabel(salary);
  const res = computeNewRegimeTax(salary);
  const old = computeOldRegimeTax(salary); // no deductions beyond standard
  const slabs = newRegimeSlabBreakdown(res.taxableIncome);

  const zeroTax = res.totalTax === 0;
  const taxStr = formatCurrency(res.totalTax);
  const rateStr = fmtRate(res.effectiveRate);
  const taxableStr = formatCurrency(res.taxableIncome);
  const monthlyInHandStr = formatCurrency(res.inHandMonthly);
  const monthlyGrossStr = formatCurrency(salary / 12);
  const oldStr = formatCurrency(old.totalTax);
  const savings = old.totalTax - res.totalTax; // > 0 means new regime is cheaper
  const lpaLabel = salary < CRORE ? `${salary / LPA} LPA` : "a ₹1 crore salary";

  const quickAnswer = `On a ₹${label} salary under the new tax regime for FY 2026-27, you pay ${
    zeroTax ? "no income tax (₹0)" : `approximately ${taxStr} in income tax`
  } — an effective rate of ${rateStr}%. Your monthly take-home is about ${monthlyInHandStr}.`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `Is a ₹${label} salary taxable?`,
      a: zeroTax
        ? `A ₹${label} annual salary falls in the taxable range, but under the new tax regime for FY 2026-27 you actually pay ₹0. After the ₹75,000 standard deduction your taxable income is ${taxableStr}, which is within the ₹12,00,000 Section 87A rebate limit — so the tax is fully rebated.`
        : `Yes. A ₹${label} salary is taxable under the new regime for FY 2026-27. After the ₹75,000 standard deduction your taxable income is ${taxableStr}, and the tax works out to ${taxStr} including the 4% health and education cess.`,
    },
    {
      q: `How much income tax do I pay on ${lpaLabel} in the new regime?`,
      a: `On a ₹${label} salary you pay ${taxStr} in income tax for FY 2026-27 under the new regime — an effective rate of about ${rateStr}% of your gross salary.`,
    },
    {
      q: `What is the monthly in-hand salary on ₹${label} per year?`,
      a: `Your gross monthly salary is roughly ${monthlyGrossStr}. After income tax of ${taxStr} a year, the take-home is about ${monthlyInHandStr} a month. This is before EPF, professional tax and any other payroll deductions your employer applies.`,
    },
    {
      q: `New regime or old regime — which is better for a ₹${label} salary?`,
      a:
        savings > 0
          ? `With no deductions beyond the standard deduction, the new regime (${taxStr}) beats the old regime (${oldStr}) at this income. The old regime only pulls ahead if you claim large deductions such as 80C, 80D, home-loan interest and HRA. Use the calculator below with your actual deductions to confirm.`
          : `At this income the old regime can match or beat the new one once you add deductions. Without any deductions the old regime costs ${oldStr} versus ${taxStr} under the new regime, so most people are better off on the new regime unless they claim significant 80C, 80D, HRA or home-loan benefits. Compare both with your real numbers below.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Income Tax on ₹${label} Salary (FY 2026-27)`,
        description: quickAnswer,
        image: [`${site.url}/opengraph-image`],
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name },
        datePublished: "2026-04-01",
        dateModified: "2026-07-17",
        mainEntityOfPage: `${site.url}/income-tax/${slug}`,
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
            name: "Income Tax Calculator",
            item: `${site.url}/calculators/income-tax`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `₹${label} Salary`,
            item: `${site.url}/income-tax/${slug}`,
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

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/calculators/income-tax" className="hover:text-forest">
          Income Tax Calculator
        </Link>
        <span>/</span>
        <span className="text-ink">₹{label} Salary</span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> FY 2026-27 · New regime
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Income Tax on ₹{label} Salary
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Exactly how much income tax you pay on a ₹{label} annual salary in
          India under the new tax regime for FY 2026-27 (AY 2027-28) — with a
          full slab-by-slab breakdown and your monthly take-home.
        </p>
      </header>

      {/* Quick Answer — for AI overviews / featured snippets */}
      <section className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        <p className="mt-2 text-forest-deep leading-relaxed text-[1.05rem]">
          {quickAnswer}
        </p>
      </section>

      {/* Breakdown */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">
          Tax breakdown on ₹{label}
        </h2>
        <div className="mt-4 rounded-2xl border border-line bg-paper-2 p-6">
          <Row label="Gross annual salary" value={formatCurrency(salary)} />
          <Row label="Standard deduction" value={`− ${formatCurrency(75000)}`} />
          <Row label="Taxable income" value={taxableStr} />
          <Row
            label="Tax before rebate"
            value={formatCurrency(res.taxBeforeRebate)}
          />
          <Row
            label="Section 87A rebate"
            value={res.rebate > 0 ? `− ${formatCurrency(res.rebate)}` : formatCurrency(0)}
            accent={res.rebate > 0 ? "brass" : "ink"}
          />
          <Row
            label="Health & education cess (4%)"
            value={formatCurrency(res.cess)}
          />
          <Row label="Effective tax rate" value={`${rateStr}%`} />
          <Row
            label="Monthly in-hand (approx.)"
            value={monthlyInHandStr}
          />
          <div className="mt-2 border-t-2 border-forest/20 pt-2">
            <Row
              label="Total income tax payable"
              value={taxStr}
              accent="forest"
              strong
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Figures use the new-regime slabs for FY 2026-27, a ₹75,000 standard
          deduction and the 4% cess — the same logic as our{" "}
          <Link
            href="/calculators/income-tax"
            className="text-forest underline underline-offset-2"
          >
            income tax calculator
          </Link>
          . In-hand is before EPF and professional tax.
        </p>
      </section>

      {/* Slab-by-slab */}
      {slabs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-600 text-ink">
            How the tax is calculated on ₹{label}
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            The new regime taxes your income in slabs. After the ₹75,000
            standard deduction, your taxable income of {taxableStr} is split
            across these slabs, and each part is taxed at its own rate:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-ink-faint">
                  <th className="px-4 py-3 font-medium">Income slab</th>
                  <th className="px-4 py-3 font-medium">Rate</th>
                  <th className="px-4 py-3 font-medium text-right">Tax</th>
                </tr>
              </thead>
              <tbody>
                {slabs.map((s) => (
                  <tr
                    key={s.from}
                    className="border-b border-line last:border-0 text-ink-soft"
                  >
                    <td className="px-4 py-3">
                      {formatCurrency(s.from)} – {formatCurrency(s.to)}
                    </td>
                    <td className="px-4 py-3">{Math.round(s.rate * 100)}%</td>
                    <td className="px-4 py-3 text-right font-medium text-ink">
                      {formatCurrency(s.taxInSlab)}
                    </td>
                  </tr>
                ))}
                <tr className="text-ink">
                  <td className="px-4 py-3 font-semibold" colSpan={2}>
                    Tax before rebate
                  </td>
                  <td className="px-4 py-3 text-right font-display font-600">
                    {formatCurrency(res.taxBeforeRebate)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-ink-soft leading-relaxed space-y-3">
            {res.rebate > 0 ? (
              <p>
                Because your taxable income stays within ₹12,00,000, the{" "}
                <strong>Section 87A rebate</strong> wipes out this entire amount,
                so the tax before cess is ₹0. With nothing to add cess to, the
                total income tax on a ₹{label} salary comes to{" "}
                <strong>{taxStr}</strong>.
              </p>
            ) : (
              <p>
                Your taxable income is above the ₹12,00,000 Section 87A rebate
                limit, so no rebate applies. Adding the 4% health and education
                cess of {formatCurrency(res.cess)} to the{" "}
                {formatCurrency(res.tax)} slab tax gives a total of{" "}
                <strong>{taxStr}</strong> — an effective rate of {rateStr}% on
                your full ₹{label} salary.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Old vs new comparison */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">
          Old regime vs new regime at ₹{label}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-forest bg-paper-2 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              New regime
            </p>
            <p className="mt-1 font-display text-2xl font-600 text-forest">
              {taxStr}
            </p>
            <p className="mt-1 text-sm text-ink-soft">₹75,000 standard deduction</p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Old regime
            </p>
            <p className="mt-1 font-display text-2xl font-600 text-ink">
              {oldStr}
            </p>
            <p className="mt-1 text-sm text-ink-soft">No extra deductions</p>
          </div>
        </div>
        <p className="mt-4 text-ink-soft leading-relaxed">
          {savings > 0 ? (
            <>
              Assuming no deductions beyond the standard deduction, the new
              regime saves you <strong>{formatCurrency(savings)}</strong> on a ₹
              {label} salary. The old regime can still win if you claim big
              deductions — full 80C, 80D, HRA and home-loan interest — because it
              taxes at higher rates but rewards those deductions. If your
              deductions are modest, the new regime is almost always the cheaper
              choice.
            </>
          ) : (
            <>
              At a ₹{label} salary the two regimes are close once deductions come
              in. Without any deductions the old regime costs {oldStr} against{" "}
              {taxStr} under the new regime. Claiming 80C, 80D, HRA and home-loan
              interest can tip the balance toward the old regime — run your real
              numbers to be sure.
            </>
          )}
        </p>
      </section>

      {/* Embedded interactive calculator */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Adjust the numbers yourself
        </h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          Change the salary or add old-regime deductions to see how your tax and
          in-hand pay shift in real time.
        </p>
        <div className="mt-6">
          <IncomeTaxCalculator />
        </div>
      </section>

      {/* Prominent link to the full calculator */}
      <section className="mt-10 rounded-2xl border border-line bg-forest-soft p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-600 text-ink">
            Want the full picture?
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Compare both regimes side by side and see which one saves you more.
          </p>
        </div>
        <Link
          href="/calculators/income-tax"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
        >
          Open Income Tax Calculator <IconArrow className="h-4 w-4" />
        </Link>
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

      {/* Other salaries */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          Tax on other salaries
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {TAX_SALARIES.filter((s) => s !== salary).map((s) => (
            <Link
              key={s}
              href={`/income-tax/${salarySlug(s)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              <IconCheck className="h-3.5 w-3.5 text-forest" />₹{salaryLabel(s)}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">A note on accuracy:</strong> these figures
        are estimates for a salaried individual below 60 under the new regime and
        exclude surcharge on incomes above ₹50 lakh. They are for education, not
        tax advice — confirm with a professional before filing.
      </div>
    </div>
  );
}
