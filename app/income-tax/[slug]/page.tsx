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
  surchargeBandLabel,
  formatReviewDate,
  TAX_RULES_REVIEWED,
} from "@/lib/pseo-tax";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import AuthorReviewBox from "@/components/AuthorReviewBox";
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
  const { totalTax, effectiveRate, surcharge, surchargeRate } =
    computeNewRegimeTax(salary);
  const taxStr = formatCurrency(totalTax);
  const rateStr = fmtRate(effectiveRate);
  const surchargeNote =
    surcharge > 0
      ? ` Includes the ${Math.round(surchargeRate * 100)}% surcharge and 4% cess.`
      : "";

  return {
    title: { absolute: `Income Tax on ₹${label} Salary (FY 2026-27)` },
    description: `New regime income tax on a ₹${label} salary for FY 2026-27 is ${taxStr}, an effective rate of ${rateStr}%.${surchargeNote} See the full slab breakdown.`,
    alternates: { canonical: `/income-tax/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/income-tax/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `Income Tax on ₹${label} Salary - FY 2026-27`,
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

  // Surcharge context: only pages above the ₹50 lakh taxable-income threshold
  // show a surcharge row, so nothing below it sprouts an empty line.
  const hasSurcharge = res.surcharge > 0;
  const surchargePct = Math.round(res.surchargeRate * 100);
  const surchargeStr = formatCurrency(res.surcharge);
  const surchargeBand = surchargeBandLabel(res.surchargeRate, res.surchargeThreshold);
  const thresholdLabel = res.surchargeThreshold
    ? `₹${salaryLabel(res.surchargeThreshold)}`
    : "₹50 Lakh";
  const showSurchargeRow = hasSurcharge || old.surcharge > 0;
  const reviewedLabel = formatReviewDate(TAX_RULES_REVIEWED);

  const quickAnswer = `On a ₹${label} salary under the new tax regime for FY 2026-27, you pay ${
    zeroTax ? "no income tax (₹0)" : `approximately ${taxStr} in income tax`
  }, an effective rate of ${rateStr}%.${
    hasSurcharge
      ? ` That figure includes a ${surchargePct}% surcharge of ${surchargeStr}, which applies because your taxable income is above ${thresholdLabel}, plus the 4% health and education cess charged on the tax and the surcharge together.`
      : ""
  } Your monthly take-home is about ${monthlyInHandStr}.`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `Is a ₹${label} salary taxable?`,
      a: zeroTax
        ? `A ₹${label} annual salary falls in the taxable range, but under the new tax regime for FY 2026-27 you actually pay ₹0. After the ₹75,000 standard deduction your taxable income is ${taxableStr}, which is within the ₹12,00,000 Section 87A rebate limit, so the tax is fully rebated.`
        : `Yes. A ₹${label} salary is taxable under the new regime for FY 2026-27. After the ₹75,000 standard deduction your taxable income is ${taxableStr}, and the tax works out to ${taxStr}${hasSurcharge ? `, made up of ${formatCurrency(res.tax)} of slab tax, ${surchargeStr} of surcharge and ${formatCurrency(res.cess)} of health and education cess` : " including the 4% health and education cess"}.`,
    },
    {
      q: `How much income tax do I pay on ${lpaLabel} in the new regime?`,
      a: `On a ₹${label} salary you pay ${taxStr} in income tax for FY 2026-27 under the new regime, an effective rate of about ${rateStr}% of your gross salary.`,
    },
    {
      q: `What is the monthly in-hand salary on ₹${label} per year?`,
      a: `Your gross monthly salary is roughly ${monthlyGrossStr}. After income tax of ${taxStr} a year, the take-home is about ${monthlyInHandStr} a month. This is before EPF, professional tax and any other payroll deductions your employer applies.`,
    },
    {
      q: `New regime or old regime - which is better for a ₹${label} salary?`,
      a:
        savings > 0
          ? `With no deductions beyond the standard deduction, the new regime (${taxStr}) beats the old regime (${oldStr}) at this income. The old regime only pulls ahead if you claim large deductions such as 80C, 80D, home-loan interest and HRA. Use the calculator below with your actual deductions to confirm.`
          : `At this income the old regime can match or beat the new one once you add deductions. Without any deductions the old regime costs ${oldStr} versus ${taxStr} under the new regime, so most people are better off on the new regime unless they claim significant 80C, 80D, HRA or home-loan benefits. Compare both with your real numbers below.`,
    },
    {
      q: `What is the standard deduction on a ₹${label} salary?`,
      a: `₹75,000 under the new regime for FY 2026-27, and it is applied automatically for salaried taxpayers before the slabs are worked out. On your ₹${label} salary it brings the figure the slabs are applied to down to ${taxableStr}. The old regime gives ₹50,000 instead, which is one reason the two regimes are not directly comparable on slab rates alone.`,
    },
    {
      q: `How is the Section 87A rebate applied at ₹${label}?`,
      a:
        res.rebate > 0
          ? `The rebate is applied after the slab tax is calculated and before the cess. Your taxable income of ${taxableStr} stays within the ₹12,00,000 limit, so the ${formatCurrency(res.taxBeforeRebate)} of slab tax is rebated in full. With nothing left to charge cess on, the total payable is ${taxStr}. Note that the rebate is tested on taxable income, not on your gross salary, which is why the ₹75,000 standard deduction effectively lifts the threshold on a salary.`
          : `It is not, at this income. The rebate applies only while taxable income stays within ₹12,00,000, and yours is ${taxableStr}, above that line. So the full slab tax of ${formatCurrency(res.tax)} stands${hasSurcharge ? `, a ${surchargePct}% surcharge of ${surchargeStr} is added because your taxable income is above ${thresholdLabel},` : ""} and the 4% health and education cess of ${formatCurrency(res.cess)} goes on top, giving ${taxStr}. The rebate is all or nothing at the threshold rather than tapering, so income just above it is worth checking carefully.`,
    },
    {
      q: `What is the effective tax rate on ₹${label}?`,
      a: `${rateStr}%, which is ${taxStr} of tax measured against the full ₹${label} gross salary. It sits below the highest slab rate you reach because the new regime taxes income in bands: only the portion above each threshold is charged at that band's rate, and the first slice after the standard deduction is taxed at nothing at all.`,
    },
    {
      q: `How much tax is deducted from my salary each month at ₹${label}?`,
      a: zeroTax
        ? `Nothing, if the new regime figures on this page match your situation. Because the Section 87A rebate takes the liability to zero, there is no monthly TDS to deduct on a ₹${label} salary. Your employer may still deduct if you have declared other income, so check your payslip against the ${monthlyInHandStr} figure above.`
        : `Employers spread the annual liability across the year as TDS, so roughly ${formatCurrency(res.totalTax / 12)} a month on a ₹${label} salary, against a gross monthly figure of ${monthlyGrossStr}. The monthly amount is usually uneven in practice: it is recalculated whenever you submit investment proofs or your pay changes, and any shortfall is caught up in the final months of the financial year.`,
    },
    {
      q: `What is surcharge and does it apply on a ₹${label} salary?`,
      a: hasSurcharge
        ? `Surcharge is an extra charge levied on the income tax itself, not on your income, and it starts once taxable income passes ₹50 lakh. Under the new regime the bands are 10% of the tax above ₹50 lakh, 15% above ₹1 crore and 25% above ₹2 crore. Your taxable income of ${taxableStr} falls in the ${surchargePct}% band (${surchargeBand}), which adds ${surchargeStr} to the ${formatCurrency(res.tax)} of slab tax. The 4% health and education cess is then charged on the two together, giving the ${taxStr} shown on this page, so the surcharge is already included in every figure here. Marginal relief is the safety valve at each threshold: it caps the surcharge so the extra tax from crossing a threshold can never exceed the income you earned above it. ${
            res.marginalRelief > 0
              ? `At your income that cap binds and cuts the surcharge by ${formatCurrency(res.marginalRelief)}.`
              : `At your income the cap does not bind, so the full ${surchargePct}% stands.`
          }`
        : `Surcharge is an extra charge on the income tax itself rather than on your income, and it does not apply here. It starts only once taxable income passes ₹50 lakh, and yours is ${taxableStr}, below that line, so the ${taxStr} on this page is slab tax plus the 4% health and education cess and nothing else. For reference, above the threshold the new regime charges 10% of the tax up to ₹1 crore of income, 15% up to ₹2 crore and 25% beyond that, and marginal relief caps the charge so that crossing a threshold never costs more in extra tax than the income earned above it.`,
    },
    {
      q: `Do I still need to file a return on a ₹${label} salary?`,
      a: zeroTax
        ? `Very likely yes. Paying zero tax is not the same as being exempt from filing: the filing requirement is generally tested on gross income before deductions and rebate, so a return is usually still due even when the Section 87A rebate wipes out the liability. Filing is also what lets you claim back any TDS your employer or bank has already deducted. Check the current filing thresholds on the Income Tax Department website before deciding.`
        : `Yes. Tax of ${taxStr} is payable on a ₹${label} salary, so a return is due even though your employer deducts TDS through the year. Filing is where any additional income, deductions or excess TDS gets reconciled, and where you pay or reclaim the difference. Check the current deadline and filing thresholds on the Income Tax Department website.`,
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
        author: {
          "@type": "Person",
          name: site.author.fullName,
          jobTitle: site.author.credential,
          url: `${site.url}/about#author`,
        },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        datePublished: "2026-04-01",
        // Human-maintained in lib/pseo-tax.ts, deliberately not a build-time
        // date: a nightly rebuild must not claim a nightly review.
        dateModified: TAX_RULES_REVIEWED,
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
        <h1 className="mt-4 text-4xl sm:text-5xl text-ink leading-[1.05]">
          Income Tax on ₹{label} Salary
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Exactly how much income tax you pay on a ₹{label} annual salary in
          India under the new tax regime for FY 2026-27 (AY 2027-28), with a
          full slab-by-slab breakdown and your monthly take-home.
        </p>
        <p className="mt-3 text-sm text-ink-faint">
          Last reviewed {reviewedLabel} against the FY 2026-27 slabs, surcharge
          bands and standard deduction.
        </p>
      </header>

      {/* Quick Answer: for AI overviews / featured snippets */}
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
        <h2 className="font-display text-2xl text-ink">
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
          {hasSurcharge && (
            <Row
              label={`Surcharge (${surchargePct}% of tax, income above ${thresholdLabel})`}
              value={formatCurrency(res.surcharge)}
              accent="brass"
            />
          )}
          {res.marginalRelief > 0 && (
            <Row
              label="Marginal relief on surcharge"
              value={`− ${formatCurrency(res.marginalRelief)}`}
              accent="brass"
            />
          )}
          <Row
            label={
              hasSurcharge
                ? "Health & education cess (4% of tax + surcharge)"
                : "Health & education cess (4%)"
            }
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
          deduction
          {hasSurcharge
            ? `, a ${surchargePct}% surcharge (${surchargeBand})`
            : ""}{" "}
          and the 4% cess. See the{" "}
          <Link
            href="/calculators/income-tax"
            className="text-forest underline underline-offset-2"
          >
            income tax calculator
          </Link>{" "}
          to vary the inputs. In-hand is before EPF and professional tax.
        </p>
      </section>

      {/* Slab-by-slab */}
      {slabs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">
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
                      {formatCurrency(s.from)} - {formatCurrency(s.to)}
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
            ) : hasSurcharge ? (
              <>
                <p>
                  Your taxable income is above the ₹12,00,000 Section 87A rebate
                  limit, so no rebate applies and the slab tax of{" "}
                  {formatCurrency(res.tax)} stands in full.
                </p>
                <p>
                  It is also above {thresholdLabel}, so a{" "}
                  <strong>surcharge</strong> of {surchargePct}% is charged on the
                  tax itself, adding {surchargeStr}.
                  {res.marginalRelief > 0
                    ? ` Marginal relief cuts that by ${formatCurrency(res.marginalRelief)} so the extra tax from crossing the threshold does not exceed the income earned above it.`
                    : " Marginal relief does not bite at this income, so the full band rate applies."}{" "}
                  The 4% health and education cess of {formatCurrency(res.cess)}{" "}
                  is then charged on the tax and the surcharge together, giving a
                  total of <strong>{taxStr}</strong>, an effective rate of{" "}
                  {rateStr}% on your full ₹{label} salary.
                </p>
              </>
            ) : (
              <p>
                Your taxable income is above the ₹12,00,000 Section 87A rebate
                limit, so no rebate applies. It is below the {thresholdLabel}{" "}
                surcharge threshold, so adding the 4% health and education cess
                of {formatCurrency(res.cess)} to the {formatCurrency(res.tax)}{" "}
                slab tax gives a total of <strong>{taxStr}</strong>, an effective
                rate of {rateStr}% on your full ₹{label} salary.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Old vs new comparison */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">
          Old regime vs new regime at ₹{label}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Income tax on a ₹{label} salary under the new regime and the old
              regime for FY 2026-27, with no deductions beyond each regime&rsquo;s
              standard deduction.
            </caption>
            <thead>
              <tr className="border-b border-line text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-ink">
                  Item
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink text-right">
                  New regime
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-ink text-right">
                  Old regime
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line text-ink-soft">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  Standard deduction
                </th>
                <td className="px-4 py-3 text-right">{formatCurrency(75000)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(50000)}</td>
              </tr>
              <tr className="border-b border-line text-ink-soft">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  Taxable income
                </th>
                <td className="px-4 py-3 text-right">{taxableStr}</td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(old.taxableIncome)}
                </td>
              </tr>
              <tr className="border-b border-line text-ink-soft">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  Slab tax
                </th>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(res.taxBeforeRebate)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(old.taxBeforeRebate)}
                </td>
              </tr>
              <tr className="border-b border-line text-ink-soft">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  Section 87A rebate
                </th>
                <td className="px-4 py-3 text-right">
                  {res.rebate > 0
                    ? `− ${formatCurrency(res.rebate)}`
                    : formatCurrency(0)}
                </td>
                <td className="px-4 py-3 text-right">
                  {old.rebate > 0
                    ? `− ${formatCurrency(old.rebate)}`
                    : formatCurrency(0)}
                </td>
              </tr>
              {showSurchargeRow && (
                <tr className="border-b border-line text-ink-soft">
                  <th scope="row" className="px-4 py-3 font-medium text-left">
                    Surcharge
                  </th>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(res.surcharge)}
                    {res.surcharge > 0 ? ` (${surchargePct}%)` : ""}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(old.surcharge)}
                    {old.surcharge > 0
                      ? ` (${Math.round(old.surchargeRate * 100)}%)`
                      : ""}
                  </td>
                </tr>
              )}
              <tr className="border-b border-line text-ink-soft">
                <th scope="row" className="px-4 py-3 font-medium text-left">
                  Health &amp; education cess (4%)
                </th>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(res.cess)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(old.cess)}
                </td>
              </tr>
              <tr className="text-ink">
                <th scope="row" className="px-4 py-3 font-semibold text-left">
                  Total tax payable
                </th>
                <td className="px-4 py-3 text-right font-display font-600 text-forest">
                  {taxStr}
                </td>
                <td className="px-4 py-3 text-right font-display font-600 text-ink">
                  {oldStr}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Both columns assume no deductions beyond each regime&rsquo;s own
          standard deduction, which is ₹75,000 under the new regime and ₹50,000
          under the old one.
        </p>
        <p className="mt-4 text-ink-soft leading-relaxed">
          {savings > 0 ? (
            <>
              Assuming no deductions beyond the standard deduction, the new
              regime saves you <strong>{formatCurrency(savings)}</strong> on a ₹
              {label} salary. The old regime can still win if you claim big
              deductions (full 80C, 80D, HRA and home-loan interest) because it
              taxes at higher rates but rewards those deductions. If your
              deductions are modest, the new regime is almost always the cheaper
              choice.
            </>
          ) : (
            <>
              At a ₹{label} salary the two regimes are close once deductions come
              in. Without any deductions the old regime costs {oldStr} against{" "}
              {taxStr} under the new regime. Claiming 80C, 80D, HRA and home-loan
              interest can tip the balance toward the old regime. Run your real
              numbers to be sure.
            </>
          )}
        </p>
      </section>

      {/* Embedded interactive calculator */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">
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
          <h2 className="font-display text-xl text-ink">
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
        <h2 className="font-display text-2xl text-ink">
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
        <h2 className="font-display text-2xl text-ink">
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

      <div className="mt-12">
        <AuthorReviewBox
          sources={[
            {
              label: "Income Tax Department",
              href: "https://www.incometax.gov.in",
            },
          ]}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> these figures
        are estimates for a salaried individual below 60 under the new regime for
        FY 2026-27. They include the slab tax, the Section 87A rebate, surcharge
        with marginal relief above ₹50 lakh of taxable income, and the 4% health
        and education cess. They exclude income from other sources, capital
        gains, any employer perquisites and any relief under a double-taxation
        treaty, each of which can change the result. Rules last checked{" "}
        {reviewedLabel}. This is general educational information, not tax advice.
        Confirm your own position with a professional before filing.
      </div>
    </div>
  );
}
