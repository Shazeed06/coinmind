import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const revalidate = 86400; // daily revalidation

export const metadata: Metadata = {
  title: { absolute: "PPF Interest Rate Today (FY 2026-27): 7.1% + History (2000–2026)" },
  description:
    "Current PPF interest rate for FY 2026-27 (Q1–Q3) is 7.1% p.a. View Government-declared Public Provident Fund rates from 2000 to 2026 & calculate 15-year maturity.",
  alternates: { canonical: `${site.url}/research/ppf-rate-history` },
  openGraph: {
    locale: "en_IN",
    title: "PPF Interest Rate Today (FY 2026-27): 7.1% + Full History",
    description:
      "Current PPF interest rate is 7.1% p.a. Complete Government-declared Public Provident Fund rates from 2000 to 2026.",
    url: `${site.url}/research/ppf-rate-history`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPF Interest Rate Today (FY 2026-27): 7.1% + Full History",
    description:
      "Current PPF interest rate is 7.1% p.a. Complete Public Provident Fund rate history from 2000 to 2026.",
    images: ["/opengraph-image"],
  },
};

const PPF_RATES = [
  { period: "FY 2026-27 (Q1-Q3)", rate: "7.1%", notes: "Current rate (Oct–Dec 2026 quarter unchanged)" },
  { period: "FY 2025-26 (Q1-Q4)", rate: "7.1%", notes: "Unchanged since April 2020" },
  { period: "FY 2024-25 (Q1-Q4)", rate: "7.1%", notes: "" },
  { period: "FY 2023-24 (Q1-Q4)", rate: "7.1%", notes: "" },
  { period: "FY 2022-23 (Q1-Q4)", rate: "7.1%", notes: "" },
  { period: "FY 2021-22 (Q1-Q4)", rate: "7.1%", notes: "" },
  { period: "FY 2020-21 (Q1)", rate: "7.1%", notes: "Cut from 7.9% in April 2020 due to COVID" },
  { period: "FY 2019-20 (Q2-Q4)", rate: "7.9%", notes: "" },
  { period: "FY 2019-20 (Q1)", rate: "8.0%", notes: "" },
  { period: "FY 2018-19 (Q3-Q4)", rate: "8.0%", notes: "" },
  { period: "FY 2018-19 (Q1-Q2)", rate: "7.6%", notes: "" },
  { period: "FY 2017-18 (Q3-Q4)", rate: "7.8%", notes: "" },
  { period: "FY 2017-18 (Q2)", rate: "7.8%", notes: "" },
  { period: "FY 2017-18 (Q1)", rate: "7.9%", notes: "" },
  { period: "FY 2016-17 (Q3-Q4)", rate: "8.0%", notes: "" },
  { period: "FY 2016-17 (Q2)", rate: "8.0%", notes: "" },
  { period: "FY 2016-17 (Q1)", rate: "8.1%", notes: "Moved to quarterly revision from this period" },
  { period: "FY 2015-16", rate: "8.7%", notes: "" },
  { period: "FY 2014-15", rate: "8.7%", notes: "" },
  { period: "FY 2013-14", rate: "8.7%", notes: "" },
  { period: "FY 2012-13", rate: "8.8%", notes: "" },
  { period: "FY 2011-12", rate: "8.6%", notes: "Raised after years at 8%" },
  { period: "FY 2010-11", rate: "8.0%", notes: "" },
  { period: "FY 2009-10", rate: "8.0%", notes: "" },
  { period: "FY 2008-09", rate: "8.0%", notes: "" },
  { period: "FY 2007-08", rate: "8.0%", notes: "" },
  { period: "FY 2006-07", rate: "8.0%", notes: "" },
  { period: "FY 2005-06", rate: "8.0%", notes: "" },
  { period: "FY 2004-05", rate: "8.0%", notes: "" },
  { period: "FY 2003-04", rate: "8.0%", notes: "" },
  { period: "FY 2002-03", rate: "9.0%", notes: "" },
  { period: "FY 2001-02", rate: "9.5%", notes: "" },
  { period: "FY 2000-01", rate: "11.0%", notes: "Highest rate in 2000–2026 period" },
];

const FAQS = [
  {
    q: "What is the current PPF interest rate in FY 2026-27?",
    a: "The current Public Provident Fund (PPF) interest rate for Q3 FY 2026-27 (October–December 2026) is 7.1% per annum, compounded annually. The Government of India has kept it unchanged at 7.1% since April 2020.",
  },
  {
    q: "How much will ₹1.5 lakh per year in PPF become after 15 years at 7.1%?",
    a: "If you invest the maximum ₹1.5 lakh every year for 15 years at 7.1% p.a., your total investment of ₹22.50 lakh grows to ₹40,68,209 (entirely tax-free under EEE status).",
  },
  {
    q: "What is the best date of the month to deposit into PPF?",
    a: "Deposit before the 5th of every month (or in a lump sum before April 5 each financial year). PPF interest is calculated on the lowest balance held between the 5th and the last day of each month.",
  },
];

export default function PpfRateHistoryPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="container-main py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-2">
        <Link href="/research" className="text-xs text-ink-faint hover:text-forest">← Research Hub</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">PPF Interest Rate Today &amp; History (2000–2026)</h1>
      <p className="mt-3 text-ink-soft">Complete year-by-year record of Public Provident Fund interest rates declared by the Government of India.</p>
      <p className="mt-1 text-xs text-ink-faint">Source: National Savings Institute (NSI), Ministry of Finance notifications · Verified: November 2026</p>

      {/* Current rate + instant calculator link */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-forest-deep font-semibold">Current PPF interest rate (Q3 FY 2026-27 · Oct–Dec 2026)</p>
          <p className="mt-1 font-display text-4xl text-forest font-600">7.1% p.a.</p>
          <p className="mt-1 text-sm text-forest-deep">Compounded annually · 100% Tax-Free (EEE). Unchanged since April 2020.</p>
        </div>
        <Link
          href="/calculators/ppf"
          className="inline-flex items-center justify-center rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest/90 transition-colors shrink-0"
        >
          Calculate PPF Maturity →
        </Link>
      </div>

      {/* Key facts */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "Highest ever rate", value: "12%", sub: "At PPF launch in 1968" },
          { label: "Recent high", value: "8.8%", sub: "FY 2012-13" },
          { label: "Current (since Apr 2020)", value: "7.1%", sub: "Unchanged for 6+ years" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-card p-4 text-center">
            <p className="font-display text-2xl text-ink">{s.value}</p>
            <p className="text-xs text-brass font-semibold mt-0.5">{s.label}</p>
            <p className="text-xs text-ink-faint mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Rate table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Year-by-year PPF rates (FY 2000-01 to FY 2026-27)</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Period</th>
                <th className="text-left px-4 py-3 font-semibold text-ink">Interest Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-ink-faint hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PPF_RATES.map((r, i) => (
                <tr key={r.period} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.period}</td>
                  <td className="px-4 py-2.5 font-semibold text-forest">{r.rate}</td>
                  <td className="px-4 py-2.5 text-ink-faint text-xs hidden sm:table-cell">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-faint">Rates are compounded annually and paid on the lowest balance held between the 5th and the last day of each month. PPF rates moved to quarterly revision from Q1 FY 2016-17.</p>
      </section>

      {/* How PPF rate is set */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink">How the PPF rate is set</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The PPF interest rate is set by the Ministry of Finance, Government of India. Since FY 2016-17, rates are reviewed and declared quarterly (though in practice, the PPF rate has been unchanged since April 2020). The rate is linked to government security (G-Sec) yields — specifically, PPF is meant to offer a spread of 0.25% above the average yield of comparable government bonds.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10 space-y-4">
        <h2 className="font-display text-xl text-ink">PPF Interest Rate FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-xl border border-line bg-card p-4">
              <p className="text-sm font-semibold text-ink">{f.q}</p>
              <p className="mt-1 text-sm text-ink-soft">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "PPF Calculator", href: "/calculators/ppf" },
          { label: "EPF Rate History", href: "/research/epf-rate-history" },
          { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
          { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
