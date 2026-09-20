import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NPS vs EPF – Which is Better for Salaried Indians? | CoinMind",
  description: "NPS vs EPF comparison for salaried Indians: returns, contributions, tax treatment and withdrawal rules for FY 2026-27.",
  alternates: { canonical: `${site.url}/comparisons/nps-vs-epf` },
};

const TABLE = [
  { param: "Who can join", nps: "Any Indian resident 18–70 (voluntary)", epf: "Mandatory for employees in covered establishments (20+ employees)" },
  { param: "Current returns (2025-26)", nps: "Market-linked; equity option ~12–14% (10-yr avg)", epf: "8.25% p.a. (declared for 2024-25)" },
  { param: "Risk", nps: "Market risk — equity allocation fluctuates", epf: "Guaranteed — declared annually by EPFO" },
  { param: "Employee contribution", nps: "Any amount (voluntary)", epf: "12% of basic + DA (mandatory)" },
  { param: "Employer contribution", nps: "Up to 14% of basic (central govt), 10% (others)", epf: "12% of basic + DA (3.67% to EPF, 8.33% to EPS)" },
  { param: "Tax on contributions (employee)", nps: "80CCD(1): up to 10% of salary; 80CCD(1B): extra ₹50,000", epf: "80C: up to ₹1.5L/year" },
  { param: "Tax on employer contribution", nps: "80CCD(2): up to 14% of salary — tax-free in both regimes", epf: "Exempt up to ₹7,500/month (excess taxable)" },
  { param: "Tax on maturity", nps: "60% tax-free; 40% must buy annuity (taxable income)", epf: "100% tax-free after 5 continuous years of service" },
  { param: "Withdrawal at retirement", nps: "60% lumpsum + 40% mandatory annuity", epf: "Full balance withdrawn or monthly pension via EPS" },
  { param: "Premature withdrawal", nps: "After 10 years: 20% lumpsum + 80% annuity", epf: "After 5 years: full withdrawal; before 5 years: taxable" },
  { param: "Portability", nps: "PRAN number — fully portable, job change no issue", epf: "UAN — portable, but transfer required on job change" },
];

export default function NpsVsEpfPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">NPS vs EPF: Which Builds More Retirement Wealth?</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">For salaried Indians, both EPF and NPS contribute to retirement — but they work very differently. Here's a clear breakdown.</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026 · Sources: EPFO, PFRDA</p>

      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict</p>
        <p className="mt-1 text-sm text-forest-deep">
          <strong>EPF wins on safety and full tax-free withdrawal</strong>. <strong>NPS wins on potential returns and the extra ₹50,000 tax deduction</strong> (80CCD-1B). The ideal strategy for a 30% bracket employee: maximise EPF (mandatory), then add voluntary NPS to claim the extra deduction and boost returns.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Detailed comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">NPS</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">EPF</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink-soft font-medium">{row.param}</td>
                  <td className="px-4 py-3 text-ink">{row.nps}</td>
                  <td className="px-4 py-3 text-ink">{row.epf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The NPS employer contribution advantage</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The biggest under-utilised NPS benefit: <strong>80CCD(2)</strong> — employer's NPS contribution is deductible from income <em>even in the new tax regime</em>. This means if your employer contributes 10–14% of your basic salary to NPS, that entire amount is tax-free income. This is one of the only deductions available in the new regime besides the standard deduction.
        </p>
        <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-900 dark:text-amber-200">
          <strong>Example:</strong> Basic salary ₹60,000/month. Employer NPS contribution at 10% = ₹6,000/month = ₹72,000/year. At 30% tax bracket, this saves ₹22,464/year — purely from the employer contributing to NPS. Ask your HR if your employer offers this.
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "NPS Calculator", href: "/calculators/nps" },
          { label: "EPF Calculator", href: "/calculators/epf" },
          { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
          { label: "Old vs New Tax Regime", href: "/comparisons/old-vs-new-tax-regime" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-faint">EPF interest rate is declared annually by EPFO and may change. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
    </main>
  );
}
