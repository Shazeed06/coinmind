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
import FdCalculator from "@/components/calc/FdCalculator";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { IconArrow, IconCalculator } from "@/components/icons";

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
    description: `Fixed deposit of ${label} — how much you get at 6%, 6.5%, 7%, 7.5% and 8% for 1 to 10 years. See maturity and interest for each rate and tenure.`,
    alternates: { canonical: `/calculators/fd/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/calculators/fd/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: `FD of ${label} — Full Maturity Breakdown`,
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

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-forest">Calculators</Link>
        <span>/</span>
        <Link href="/calculators/fd" className="hover:text-forest">FD Calculator</Link>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-3xl sm:text-4xl font-600 text-ink leading-[1.06]">
          FD of {label}: How Much You Get at Maturity
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Fixed deposit of {label} at standard bank FD rates with quarterly compounding. Results shown for 6% to 8% per year over 1 to 10 years.
        </p>
      </header>

      <section className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink flex items-center gap-2">
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
        <h2 className="font-display text-xl font-600 text-ink">
          {label} FD — Interest Earned at 7% p.a.
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
        <h2 className="font-display text-xl font-600 text-ink">
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
        <h2 className="font-display text-lg font-600 text-ink">
          About FD of {label}
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          A fixed deposit of {label} at a typical Indian bank earning 7% per annum with quarterly compounding grows to {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 5)!.maturity)} in 5 years and {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 10)!.maturity)} in 10 years. The interest earned at 7% over 5 years is {formatCurrency(grid.find((g) => g.rate === 7 && g.tenure === 5)!.interest)}. Compare rates across banks to maximise your return — small differences in rate compound to meaningful amounts over longer tenures. Remember that FD interest is fully taxable at your income slab rate.
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

      <div className="mt-12">
        <AuthorReviewBox />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> these figures assume quarterly compounding at the stated rate for the full tenure. Actual bank FD rates vary by bank, deposit size, and senior citizen status. Interest earned is subject to TDS if it exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens). Confirm the current rate with your bank before opening an FD.
      </div>
    </div>
  );
}
