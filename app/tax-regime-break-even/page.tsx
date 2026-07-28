import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import {
  BREAKEVEN_GRID,
  REALISTIC_DEDUCTION_CEILING,
} from "@/lib/regimeBreakeven";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { IconArrow, IconCalculator } from "@/components/icons";

const title = "Old vs New Tax Regime: The Exact Break-Even Deduction";
const description =
  "The exact deduction amount at which the old regime beats the new one, computed for every income from ₹6 lakh to ₹50 lakh. Full grid, methodology shown.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/tax-regime-break-even" },
  openGraph: {
    type: "article",
    url: `${site.url}/tax-regime-break-even`,
    siteName: site.name,
    locale: "en_IN",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Old vs new tax regime break-even grid",
      },
    ],
  },
};

const faqs = [
  {
    q: "What is the break-even deduction between the old and new tax regime?",
    a: "It is the total of old-regime deductions — 80C, 80D, NPS, home-loan interest, HRA exemption and the rest — at which your old-regime tax falls to exactly what you would pay under the new regime. Claim more than that figure and the old regime saves you money; claim less and the new regime wins.",
  },
  {
    q: "At what salary is the old regime hardest to justify?",
    a: "Around ₹12.75 lakh. At that level the new regime charges zero tax, because the ₹75,000 standard deduction brings taxable income within the ₹12,00,000 Section 87A rebate. To match zero under the old regime you would need roughly ₹6.5 lakh of deductions, which is beyond what most salaried people can claim without a very large HRA exemption.",
  },
  {
    q: "Does the break-even keep rising with income?",
    a: "No, and this surprises people. Once your income is high enough that both regimes are taxing you at 30% at the margin — from roughly ₹24 lakh upward — the break-even settles at a flat ₹8,00,000 and stays there. Whether you earn ₹25 lakh or ₹50 lakh, the answer is the same ₹8 lakh of deductions.",
  },
  {
    q: "Is ₹8 lakh of deductions actually achievable?",
    a: "Only with substantial rent. Section 80C (₹1.5 lakh), NPS under 80CCD(1B) (₹50,000), health insurance under 80D (up to ₹75,000) and home-loan interest (₹2 lakh) come to about ₹4.75 lakh at their combined limits. Getting past that needs a large HRA exemption, which in practice means high rent in a metro. For most people outside that situation, the new regime wins at higher incomes.",
  },
  {
    q: "Do these figures include the standard deduction?",
    a: "Yes, and each regime gets its own. The new-regime column already applies its ₹75,000 standard deduction, and the old-regime side already applies its ₹50,000 one. The break-even number is deductions over and above that ₹50,000 — so do not count the standard deduction twice when comparing against your own figure.",
  },
  {
    q: "Can I switch regimes every year?",
    a: "Salaried taxpayers without business income can generally choose afresh each year when filing. Taxpayers with business or professional income face a much more restrictive rule and can typically only switch back once. Because the mechanics depend on your income type and on filing by the due date, confirm your own position on the income tax portal before relying on being able to switch.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        image: [`${site.url}/opengraph-image`],
        author: {
          "@type": "Person",
          name: site.author.fullName,
          jobTitle: site.author.credential,
          url: `${site.url}/about#author`,
        },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        datePublished: "2026-07-24",
        dateModified: "2026-07-24",
        mainEntityOfPage: `${site.url}/tax-regime-break-even`,
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
            name: "Tax regime break-even",
            item: `${site.url}/tax-regime-break-even`,
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
        <span className="text-ink">Tax regime break-even</span>
      </nav>

      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> FY 2026-27 · Computed, not
          estimated
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Old vs New Tax Regime: The Exact Break-Even
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Every guide says the answer &ldquo;depends on your deductions&rdquo;
          and then stops. This page gives the number: for each income, the exact
          deductions at which the old regime stops costing you more.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        <p className="mt-2 text-forest-deep leading-relaxed text-[1.05rem]">
          Find your salary in the table below and read the break-even column. If
          your actual old-regime deductions — 80C, 80D, NPS, home-loan interest
          and HRA exemption added together — come to more than that number, the
          old regime saves you money. If they come to less, the new regime wins.
          For most salaried people without a large HRA claim, the new regime
          wins at almost every income level.
        </p>
      </section>

      {/* The grid */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">
          The break-even grid
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          The break-even column is deductions <strong className="text-ink">over
          and above</strong> the old regime&rsquo;s own ₹50,000 standard
          deduction. The last column marks whether that figure is reachable
          within the usual statutory limits, which come to about{" "}
          {formatCurrency(REALISTIC_DEDUCTION_CEILING)} before any HRA
          exemption.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full text-sm min-w-[34rem]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="px-4 py-3 font-semibold text-ink">Gross salary</th>
                <th className="px-4 py-3 font-semibold text-ink">
                  New regime tax
                </th>
                <th className="px-4 py-3 font-semibold text-ink">
                  Break-even deductions
                </th>
                <th className="px-4 py-3 font-semibold text-ink">
                  Realistically reachable?
                </th>
              </tr>
            </thead>
            <tbody>
              {BREAKEVEN_GRID.map((r) => (
                <tr key={r.gross} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink font-medium whitespace-nowrap">
                    {formatCurrency(r.gross)}
                  </td>
                  <td className="px-4 py-3 text-ink-soft whitespace-nowrap">
                    {formatCurrency(r.newRegimeTax)}
                  </td>
                  <td className="px-4 py-3 font-display font-600 text-forest whitespace-nowrap">
                    {r.breakEven === null
                      ? "Not achievable"
                      : formatCurrency(r.breakEven)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {r.reachable ? (
                      <span className="text-forest font-medium">Yes</span>
                    ) : (
                      <span className="text-brass font-medium">
                        Needs large HRA
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The two findings */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Two things the grid shows that nobody mentions
        </h2>

        <div className="mt-5 space-y-6 text-ink-soft leading-relaxed">
          <p>
            <strong className="text-ink">
              The hardest income to justify the old regime is ₹12.75 lakh, not
              the highest one.
            </strong>{" "}
            Read down the break-even column and it climbs steadily to ₹6,50,000
            at a ₹12 lakh salary, then <em>drops</em> to about ₹4,94,000 at ₹13
            lakh before climbing again. That is not an error. Up to roughly
            ₹12.75 lakh of salary, the ₹75,000 standard deduction pulls taxable
            income inside the ₹12,00,000 Section 87A rebate and the new regime
            charges you <strong className="text-ink">nothing at all</strong>. To
            beat zero, the old regime has to reach zero too, which means
            deductions large enough to pull taxable income under ₹5,00,000. Once
            your salary crosses the rebate ceiling and the new regime starts
            charging real tax, the old regime only has to match that real
            number — so the bar drops.
          </p>

          <p>
            <strong className="text-ink">
              Above roughly ₹24 lakh, the break-even stops moving entirely.
            </strong>{" "}
            It settles at a flat {formatCurrency(800000)} and stays there
            whether you earn ₹25 lakh, ₹40 lakh or ₹50 lakh. The reason is
            simple once you see it: at those incomes both regimes are taxing
            your marginal rupee at 30%, so every additional rupee of salary adds
            the same tax under both systems and cancels out of the comparison.
            What is left is a constant gap, and a constant gap needs a constant
            deduction to close. The practical version: if you are a high earner
            wondering whether the old regime is worth the paperwork, the
            question is not how much you earn — it is simply whether you can
            claim {formatCurrency(800000)}.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Methodology and assumptions
        </h2>
        <div className="mt-3 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Every figure here is computed, not estimated. For each salary the
            new-regime tax is calculated using the FY 2026-27 slabs with the
            ₹75,000 standard deduction, the Section 87A rebate that zeroes tax
            up to ₹12,00,000 of taxable income, and the 4% health and education
            cess. The old-regime tax uses the pre-2020 slabs for taxpayers below
            60, its ₹50,000 standard deduction, its own Section 87A rebate up to
            ₹5,00,000 of taxable income, and the same 4% cess.
          </p>
          <p>
            The break-even is then found by solving for the deduction amount at
            which the two tax figures are equal, resolved to the nearest ₹500.
            The same tax functions power our{" "}
            <Link
              href="/calculators/income-tax"
              className="text-forest underline underline-offset-2"
            >
              income tax calculator
            </Link>{" "}
            and our{" "}
            <Link
              href="/income-tax/12-lakh"
              className="text-forest underline underline-offset-2"
            >
              per-salary tax pages
            </Link>
            , so the numbers on this page cannot disagree with the rest of the
            site.
          </p>
          <p>
            The &ldquo;realistically reachable&rdquo; column compares the
            break-even against{" "}
            {formatCurrency(REALISTIC_DEDUCTION_CEILING)}, which is Section 80C
            at ₹1,50,000, NPS under 80CCD(1B) at ₹50,000, health insurance under
            80D at up to ₹75,000 for self and senior parents, and home-loan
            interest at ₹2,00,000 — all at their combined statutory limits, and
            before any HRA exemption. HRA is the one component that can push a
            salaried person well past that ceiling, which is why the column says
            &ldquo;needs large HRA&rdquo; rather than &ldquo;impossible&rdquo;.
            Our{" "}
            <Link
              href="/calculators/hra"
              className="text-forest underline underline-offset-2"
            >
              HRA calculator
            </Link>{" "}
            will tell you how much of your rent allowance is actually exempt.
          </p>
          <p>
            Assumptions this grid does <strong className="text-ink">not</strong>{" "}
            make: it does not model taxpayers aged 60 or above, whose old-regime
            slabs differ; it does not include surcharge, which applies above ₹50
            lakh of income and would change the picture at the top end; and it
            treats gross salary as fully taxable income with no exempt
            allowances beyond those described. Treat it as a decision aid for a
            typical salaried person under 60, not as a computation of your
            return.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">
          Use this data
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          This grid is free to quote, republish or build on, with or without
          attribution. If you are a journalist, blogger or educator who needs a
          different income range or a variant of the assumptions, the
          methodology above is complete enough to reproduce — or write to us at{" "}
          <strong className="text-ink">{site.email}</strong> and we will run it.
        </p>
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

      <section className="mt-12">
        <Link
          href="/calculators/income-tax"
          className="inline-flex items-center gap-2 text-forest font-medium hover:underline"
        >
          Run your own numbers in the income tax calculator
          <IconArrow className="h-4 w-4" />
        </Link>
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
        are computed from the FY 2026-27 slabs as they stand on 24 July 2026 and
        are general educational information, not personalised tax advice. Slabs,
        rebate limits and deduction ceilings change with each Budget. Confirm
        the current rules on <strong className="text-ink">incometax.gov.in</strong>{" "}
        and consult a qualified chartered accountant before making a regime
        choice that affects a large tax bill.
      </div>
    </div>
  );
}
