import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EPF Interest Rate History 2000–2026 – All EPFO Declared Rates | CoinMind",
  description: "Complete EPF interest rate history from 2000 to 2026. All EPFO-declared Employee Provident Fund rates, year by year, with official sources.",
  alternates: { canonical: `${site.url}/research/epf-rate-history` },
};

const EPF_RATES = [
  { year: "2024-25", rate: "8.25%", notes: "Same as previous year" },
  { year: "2023-24", rate: "8.25%", notes: "Raised from 8.15%" },
  { year: "2022-23", rate: "8.15%", notes: "Recovery from 5-decade low" },
  { year: "2021-22", rate: "8.10%", notes: "Lowest rate in over 40 years — significant cut" },
  { year: "2020-21", rate: "8.50%", notes: "" },
  { year: "2019-20", rate: "8.50%", notes: "" },
  { year: "2018-19", rate: "8.65%", notes: "" },
  { year: "2017-18", rate: "8.55%", notes: "" },
  { year: "2016-17", rate: "8.65%", notes: "" },
  { year: "2015-16", rate: "8.80%", notes: "Highest rate in recent decade" },
  { year: "2014-15", rate: "8.75%", notes: "" },
  { year: "2013-14", rate: "8.75%", notes: "" },
  { year: "2012-13", rate: "8.50%", notes: "" },
  { year: "2011-12", rate: "8.25%", notes: "" },
  { year: "2010-11", rate: "9.50%", notes: "Temporarily raised" },
  { year: "2009-10", rate: "8.50%", notes: "" },
  { year: "2008-09", rate: "8.50%", notes: "" },
  { year: "2007-08", rate: "8.50%", notes: "" },
  { year: "2006-07", rate: "8.50%", notes: "" },
  { year: "2005-06", rate: "8.50%", notes: "" },
  { year: "2004-05", rate: "9.50%", notes: "" },
  { year: "2003-04", rate: "9.50%", notes: "" },
  { year: "2002-03", rate: "9.50%", notes: "" },
  { year: "2001-02", rate: "9.50%", notes: "" },
  { year: "2000-01", rate: "10.25%", notes: "" },
  { year: "1999-2000", rate: "12.00%", notes: "Historical high in modern era" },
];

export default function EpfRateHistoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/research" className="text-xs text-ink-faint hover:text-forest">← Research Hub</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">EPF Interest Rate History (2000–2026)</h1>
      <p className="mt-3 text-ink-soft">Year-by-year EPF interest rates declared by EPFO (Employee Provident Fund Organisation), sourced from official notifications.</p>
      <p className="mt-1 text-xs text-ink-faint">Source: EPFO, Ministry of Labour and Employment · Last updated: September 2026</p>

      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm text-forest-deep font-semibold">EPF rate for FY 2024-25</p>
        <p className="mt-1 font-display text-4xl text-forest font-600">8.25% p.a.</p>
        <p className="mt-1 text-sm text-forest-deep">Declared by EPFO in March 2025. Interest credited annually to members&apos; accounts.</p>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "FY 2024-25 rate", value: "8.25%", sub: "Declared March 2025" },
          { label: "Recent low (2021-22)", value: "8.10%", sub: "Lowest in 40+ years" },
          { label: "Recent high (2015-16)", value: "8.80%", sub: "Last decade peak" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-card p-4 text-center">
            <p className="font-display text-2xl text-ink">{s.value}</p>
            <p className="text-xs text-brass font-semibold mt-0.5">{s.label}</p>
            <p className="text-xs text-ink-faint mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Year-by-year EPF rates</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Financial Year</th>
                <th className="text-left px-4 py-3 font-semibold text-ink">Interest Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-ink-faint hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {EPF_RATES.map((r, i) => (
                <tr key={r.year} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.year}</td>
                  <td className="px-4 py-2.5 font-semibold text-forest">{r.rate}</td>
                  <td className="px-4 py-2.5 text-ink-faint text-xs hidden sm:table-cell">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink">How EPF interest is calculated</h2>
        <p className="mt-2 text-sm text-ink-soft">
          EPF interest is calculated on the monthly running balance. The rate is declared at the end of each financial year by the EPFO Central Board of Trustees (CBT) and ratified by the Ministry of Finance. Interest is credited to the member&apos;s account at the end of the financial year.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Note: Contributions made after March 2021 above ₹2.5 lakh/year (employee contribution) attract tax on the interest earned — this changed with Finance Act 2021.
        </p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "EPF Calculator", href: "/calculators/epf" },
          { label: "PPF Rate History", href: "/research/ppf-rate-history" },
          { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
