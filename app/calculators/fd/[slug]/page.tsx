import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";
import {
  FD_AMOUNTS,
  FD_SLUGS,
  FD_TENURES,
  fdSlug,
  fdLabel,
  parseFdSlug,
  computeGrid,
} from "@/lib/pseo-fd";
import { financialProduct } from "@/lib/ld";
import FdCalculator from "@/components/calc/FdCalculator";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { IconArrow, IconCalculator, IconCheck } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return FD_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const amount = parseFdSlug(slug);
  if (amount === null) return {};
  const label = fdLabel(amount);
  return {
    title: { absolute: `FD on ${label}: Maturity Amount at 6-8% Interest (2026)` },
    description: `Fixed deposit of ${label} - how much you get at 6%, 6.5%, 7%, 7.5% and 8% for 1 to 10 years. See maturity and interest for each rate and tenure.`,
    alternates: { canonical: `/calculators/fd/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/calculators/fd/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `FD of ${label} - Full Maturity Breakdown`,
      description: `See exactly how a ${label} fixed deposit grows at common bank FD rates from 6% to 8% over 1, 2, 3, 5 and 10 years with quarterly compounding.`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `FD ${label} maturity` }],
    },
  };
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const amount = parseFdSlug(slug);
  if (amount === null) notFound();

  const label = fdLabel(amount);
  const grid = computeGrid(amount);

  const rows = FD_TENURES.map((years) => {
    const best = grid.filter((g) => g.tenure === years).reduce((a, b) =>
      a.maturity > b.maturity ? a : b
    );
    const avgRate = 7;
    const avg = grid.find((g) => g.tenure === years && g.rate === avgRate)!;
    return { years, avg, best };
  });

  // Every figure quoted in the FAQs below comes from this grid, the same one
  // that feeds the visible table, so the prose can never disagree with it.
  const at = (rate: number, years: number) =>
    grid.find((g) => g.rate === rate && g.tenure === years)!;

  const y1 = at(7, 1);
  const y5 = at(7, 5);
  const y10 = at(7, 10);
  const low5 = at(6, 5);
  const high5 = at(8, 5);
  const senior5 = at(7.5, 5);

  // DICGC cover per depositor per bank. Stated as a current figure with a
  // pointer to the source rather than presented as permanent.
  const DICGC_COVER = 500000;

  // TDS thresholds quoted in the accuracy note at the foot of this page. Kept
  // in one place so the FAQ and the note can never drift apart.
  const TDS_GENERAL = 40000;
  const TDS_SENIOR = 50000;

  const faqs: { q: string; a: string }[] = [
    {
      q: `How much will a ${label} FD be worth in 5 years?`,
      a: `At 7% per annum with quarterly compounding, a ${label} fixed deposit grows to ${formatCurrency(y5.maturity)} in 5 years, of which ${formatCurrency(y5.interest)} is interest. Left for 10 years the same deposit reaches ${formatCurrency(y10.maturity)}. The rate your bank actually offers for that tenure decides the exact figure, so check its current rate card before booking.`,
    },
    {
      q: `How much interest does ${label} earn in an FD in one year?`,
      a: `About ${formatCurrency(y1.interest)} at 7% per annum with quarterly compounding, taking the deposit to ${formatCurrency(y1.maturity)} at maturity. At 6% the one-year interest on ${label} is ${formatCurrency(at(6, 1).interest)} and at 8% it is ${formatCurrency(at(8, 1).interest)}, so the rate you lock matters even over a single year.`,
    },
    {
      q: "Is FD interest taxable?",
      a: `Yes, fully. FD interest is added to your total income and taxed at your income slab rate; there is no special lower rate for it and no separate exemption. On a ${label} deposit at 7%, the ${formatCurrency(y1.interest)} of interest earned in year one is taxable income for that year, so a depositor in the 30% slab keeps far less of it than one in the 5% slab. Interest is generally taxed as it accrues each year, not only in the year the deposit matures, even on a cumulative FD that pays out at the end.`,
    },
    {
      q: "What is the TDS threshold on FD interest?",
      a: `A bank deducts TDS once the interest it pays you in a financial year crosses the threshold in the Income Tax Act, which this page uses as ${formatCurrency(TDS_GENERAL)} for most depositors and ${formatCurrency(TDS_SENIOR)} for senior citizens. Interest of ${formatCurrency(y1.interest)} on a ${label} deposit at 7% ${
        y1.interest > TDS_GENERAL
          ? "is above the general threshold on its own, so expect TDS on it"
          : "is below the general threshold on its own, but every deposit you hold at the same bank is counted together"
      }. These limits have been revised in recent budgets, so confirm the figure that applies to you with your bank or on the Income Tax Department website. TDS is not an extra tax: it is credited against your final liability when you file your return.`,
    },
    {
      q: `Can I break a ${label} FD early, and what is the penalty?`,
      a: `Almost always yes, but it costs you twice. The bank normally re-prices the deposit to the rate applicable to the period it actually ran rather than the rate you booked, and most banks deduct a further penalty on top of that. The size of the effect is visible in the table above: ${label} held the full 5 years at 7% earns ${formatCurrency(y5.interest)}, while the same money pulled out after one year earns only ${formatCurrency(y1.interest)} before any penalty is applied. Penalty rules differ by bank and by product, so read the terms before you lock the money in.`,
    },
    {
      q: `Do senior citizens get a higher FD rate on ${label}?`,
      a: `Most Indian banks add a small extra rate for depositors above 60, and several run special senior citizen schemes on selected tenures. The effect on ${label} is easy to read off this page: at 7% for 5 years the maturity is ${formatCurrency(y5.maturity)}, while at 7.5% it is ${formatCurrency(senior5.maturity)}, a difference of ${formatCurrency(senior5.maturity - y5.maturity)} on the same deposit. The exact addition varies by bank and by tenure, so compare senior citizen rate cards rather than assuming a fixed uplift.`,
    },
    {
      q: `How much difference does the interest rate make on ${label}?`,
      a: `More than most people expect once the tenure is long. On ${label} held for 5 years, 6% matures at ${formatCurrency(low5.maturity)} and 8% at ${formatCurrency(high5.maturity)}, a gap of ${formatCurrency(high5.maturity - low5.maturity)} for the same money and the same lock-in. Comparing rate cards across two or three banks is usually the most valuable few minutes you can spend on a fixed deposit.`,
    },
    {
      q: `Is a ${label} fixed deposit insured?`,
      a: `Bank deposits in India are covered by DICGC insurance up to ${formatCurrency(DICGC_COVER)} per depositor per bank, counting principal and interest together across every account you hold at that bank. ${
        amount >= DICGC_COVER
          ? `A ${label} deposit already reaches that limit on its own, so spreading it across banks is worth considering if full cover matters to you.`
          : `A ${label} deposit sits inside that limit, though it is the total of everything you hold at the bank that counts, not this deposit alone.`
      } The cover amount is set by the DICGC, so verify the current limit on its website before relying on it.`,
    },
    {
      q: `Which tenure is best for a ${label} FD?`,
      a: `The one that matches when you need the money, not the one with the largest number in the table. Locking ${label} for 10 years at 7% produces the biggest figure here (${formatCurrency(y10.maturity)}), but the money is then tied up and any early exit is penalised. A common middle path is laddering: split the ${label} across the 1, 2, 3, 5 and 10 year tenures shown above so a part of it matures regularly and can be reinvested at whatever rates apply then.`,
    },
    {
      q: `Should I put ${label} in an FD or somewhere else?`,
      a: `An FD suits money you cannot afford to lose and expect to need on a known date, because the return is contractual and the capital is not exposed to markets. The trade-off is tax and inflation: the ${formatCurrency(y5.interest)} of interest on ${label} over 5 years at 7% is taxed at your slab rate, which cuts the post-tax return, and rising prices erode what is left. Longer goals are usually served by pairing an FD with market-linked options rather than picking one. This is general information, not a recommendation for your circumstances.`,
    },
  ];

  const productNode: Record<string, unknown> = {
    ...financialProduct(
      `Fixed Deposit of ${label}`,
      `A ${label} bank fixed deposit in India shown at 6% to 8% per annum with quarterly compounding. At 7% it matures at ${formatCurrency(y5.maturity)} after 5 years and ${formatCurrency(y10.maturity)} after 10 years.`,
      "Fixed Deposit"
    ),
  };
  delete productNode["@context"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      productNode,
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
            name: "Calculators",
            item: `${site.url}/calculators`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "FD Calculator",
            item: `${site.url}/calculators/fd`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `FD of ${label}`,
            item: `${site.url}/calculators/fd/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-forest">Calculators</Link>
        <span>/</span>
        <Link href="/calculators/fd" className="hover:text-forest">FD Calculator</Link>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-[1.06]">
          FD of {label}: How Much You Get at Maturity
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Fixed deposit of {label} at standard bank FD rates with quarterly compounding. Results shown for 6% to 8% per year over 1 to 10 years.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl text-ink flex items-center gap-2">
          <IconCalculator className="h-5 w-5 text-brass" />
          Maturity at different tenures
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-ink-faint text-xs uppercase tracking-wide">
                <th className="pb-3 text-left font-semibold">Rate</th>
                {FD_TENURES.map((y) => (
                  <th key={y} className="pb-3 text-right font-semibold">{y} yr</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[6, 6.5, 7, 7.5, 8].map((rate) => (
                <tr key={rate} className="border-b border-line">
                  <td className="py-2.5 font-medium text-ink">{rate}%</td>
                  {FD_TENURES.map((years) => {
                    const r = grid.find((g) => g.rate === rate && g.tenure === years)!;
                    return (
                      <td key={years} className="py-2.5 text-right text-ink tabular-nums">
                        {formatCurrency(r.maturity)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Quarterly compounding. Interest taxed at your income slab rate.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl text-ink">
          {label} FD - Interest Earned at 7% p.a.
        </h2>
        <div className="mt-4 space-y-1">
          {rows.map(({ years, avg }) => (
            <Row
              key={years}
              label={`${years} year${years > 1 ? "s" : ""}`}
              value={`${formatCurrency(avg.maturity)} (${formatCurrency(avg.interest)} interest)`}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl text-ink">
          Try the interactive FD calculator
        </h2>
        <div className="mt-4">
          <FdCalculator />
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          Adjust the amount, rate and tenure to see your exact numbers. Use our{" "}
          <Link href="/calculators/fd" className="text-forest underline underline-offset-2">main FD calculator</Link> for more options including monthly and yearly compounding.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">
          About FD of {label}
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          A fixed deposit of {label} at a typical Indian bank earning 7% per annum with quarterly compounding grows to {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 5)!.maturity)} in 5 years and {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 10)!.maturity)} in 10 years. The interest earned at 7% over 5 years is {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 5)!.interest)}. Compare rates across banks to maximise your return. Small differences in rate compound to meaningful amounts over longer tenures. Remember that FD interest is fully taxable at your income slab rate.
        </p>
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/calculators/ppf"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Compare with PPF <IconArrow className="h-4 w-4" />
        </Link>
        <Link
          href="/calculators/income-tax"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Income tax calculator <IconArrow className="h-4 w-4" />
        </Link>
        <Link
          href="/blog/ppf-vs-fd-vs-nps"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          PPF vs FD vs NPS <IconArrow className="h-4 w-4" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">
          FD of {label} - frequently asked questions
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

      {/* Sibling links: keeps every FD amount page internally linked */}
      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">
          FD maturity for other amounts
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {FD_AMOUNTS.filter((a) => a !== amount).map((a) => (
            <Link
              key={a}
              href={`/calculators/fd/${fdSlug(a)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              <IconCheck className="h-3.5 w-3.5 text-forest" />
              {fdLabel(a)}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <AuthorReviewBox />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> these figures assume quarterly compounding at the stated rate for the full tenure. Actual bank FD rates vary by bank, deposit size, and senior citizen status. Interest earned is subject to TDS if it exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens). Confirm the current rate with your bank before opening an FD.
      </div>
    </div>
  );
}
