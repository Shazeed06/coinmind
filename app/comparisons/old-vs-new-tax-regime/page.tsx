import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Old vs New Tax Regime FY 2026-27 – Which is Better for You? | CoinMind",
  description: "Old vs new income tax regime comparison for FY 2026-27. Breakeven deductions, slab rates, who should switch — with real examples for ₹8L to ₹50L income.",
  alternates: { canonical: `${site.url}/comparisons/old-vs-new-tax-regime` },
};

const NEW_SLABS_2526 = [
  { range: "Up to ₹4 lakh", rate: "Nil" },
  { range: "₹4 lakh – ₹8 lakh", rate: "5%" },
  { range: "₹8 lakh – ₹12 lakh", rate: "10%" },
  { range: "₹12 lakh – ₹16 lakh", rate: "15%" },
  { range: "₹16 lakh – ₹20 lakh", rate: "20%" },
  { range: "₹20 lakh – ₹24 lakh", rate: "25%" },
  { range: "Above ₹24 lakh", rate: "30%" },
];

const OLD_SLABS = [
  { range: "Up to ₹2.5 lakh", rate: "Nil" },
  { range: "₹2.5 lakh – ₹5 lakh", rate: "5%" },
  { range: "₹5 lakh – ₹10 lakh", rate: "20%" },
  { range: "Above ₹10 lakh", rate: "30%" },
];

const EXAMPLES = [
  { income: "₹8 lakh", newTax: "₹0", oldTax: "₹0*", winner: "New", note: "87A rebate applies in both; new regime zero by rebate" },
  { income: "₹12 lakh", newTax: "₹0", oldTax: "₹52,500 (after ₹1.5L 80C + ₹50K std dedn)", winner: "New", note: "New regime: nil by ₹60,000 rebate under 87A" },
  { income: "₹15 lakh", newTax: "₹1,05,000", oldTax: "₹1,05,000 (with ~₹4.25L deductions)", winner: "Tie", note: "Breakeven at ~₹4.25L in deductions" },
  { income: "₹20 lakh", newTax: "₹2,10,000", oldTax: "₹2,10,000 (with ~₹5.75L deductions)", winner: "Tie", note: "Breakeven at ~₹5.75L in deductions" },
  { income: "₹30 lakh", newTax: "₹4,60,000", oldTax: "₹4,60,000 (with ~₹8L deductions)", winner: "Tie", note: "Very high deductions needed to match new regime" },
];

export default function OldVsNewTaxRegimePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Old vs New Tax Regime FY 2026-27</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">Which income tax regime saves you more money? A slab-by-slab breakdown with real examples and a breakeven calculator.</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026 · Source: Finance Act 2025, Income Tax Department</p>

      {/* Quick verdict */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict for FY 2026-27</p>
        <p className="mt-1 text-sm text-forest-deep">
          The <strong>new regime wins for most salaried Indians</strong> — especially those with income up to ₹12 lakh (zero tax via 87A rebate) or those without large deductions. The old regime only wins if your total deductions exceed the breakeven amount for your income level.
        </p>
      </div>

      {/* What changed */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">What changed in FY 2025-26 (Budget 2025)</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Budget 2025 made the new regime even more attractive: the 87A rebate was raised to ₹60,000 (making income up to ₹12 lakh effectively tax-free), new slabs were restructured with lower rates, and the standard deduction was retained at ₹75,000. These changes apply from FY 2025-26 onwards.
        </p>
      </section>

      {/* Slab tables side by side */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Tax slabs: FY 2026-27</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-forest/30 overflow-hidden">
            <div className="bg-forest px-4 py-2.5">
              <p className="font-semibold text-white text-sm">New Regime (Default)</p>
              <p className="text-xs text-white/70">Standard deduction: ₹75,000 · 87A rebate: up to ₹60,000</p>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {NEW_SLABS_2526.map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink text-right">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-brass/30 overflow-hidden">
            <div className="bg-brass px-4 py-2.5">
              <p className="font-semibold text-white text-sm">Old Regime (Opt-in)</p>
              <p className="text-xs text-white/70">Standard deduction: ₹50,000 · 87A rebate: up to ₹12,500</p>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {OLD_SLABS.map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2.5 font-semibold text-ink text-right">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-paper-2 text-xs text-ink-faint">
              Old regime allows: 80C (₹1.5L), 80D, HRA, home loan interest, LTA, NPS (80CCD), and more
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Real examples by income level</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Gross Income</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">New Regime Tax</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">Old Regime Tax</th>
                <th className="text-left px-4 py-3 font-semibold text-ink">Winner</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((ex, i) => (
                <tr key={ex.income} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 font-semibold text-ink">{ex.income}</td>
                  <td className="px-4 py-3 text-forest font-medium">{ex.newTax}</td>
                  <td className="px-4 py-3 text-brass font-medium">{ex.oldTax}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ex.winner === "New" ? "bg-forest text-white" : ex.winner === "Tie" ? "bg-line text-ink" : "bg-brass text-white"}`}>
                      {ex.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-faint">* Old regime examples assume standard deductions only unless stated. Surcharge and cess not included. All figures approximate.</p>
      </section>

      {/* Deductions that make old regime win */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Deductions that make old regime win</h2>
        <p className="mt-2 text-ink-soft text-sm">
          The old regime wins only if you claim enough deductions to bring your taxable income down significantly. Here are the main ones:
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            { label: "Section 80C", limit: "Up to ₹1,50,000", items: "PPF, ELSS, life insurance, EPF, home loan principal, NPS" },
            { label: "Standard Deduction", limit: "₹50,000 (salaried)", items: "Automatic for salaried and pensioners — no proof needed" },
            { label: "Section 80D (Health)", limit: "₹25,000–₹1,00,000", items: "Health insurance premium for self, spouse, children, parents" },
            { label: "HRA Exemption", limit: "Actual rent minus 10% of salary", items: "For employees who pay rent and get HRA from employer" },
            { label: "Home Loan Interest (24b)", limit: "Up to ₹2,00,000", items: "Interest on self-occupied home loan" },
            { label: "NPS Employer (80CCD2)", limit: "Up to 14% of basic salary", items: "Available in new regime too — big advantage if employer contributes" },
          ].map((d) => (
            <div key={d.label} className="rounded-xl border border-line bg-card p-4 text-sm">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-ink">{d.label}</p>
                <span className="text-xs bg-brass/15 text-brass rounded px-1.5 py-0.5 shrink-0">{d.limit}</span>
              </div>
              <p className="text-ink-faint mt-1 text-xs">{d.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-xl text-ink">Calculate your actual tax</h2>
        <p className="mt-1 text-sm text-ink-soft">Enter your exact income and deductions to see both regimes side by side instantly.</p>
        <Link href="/calculators/income-tax" className="mt-4 inline-block rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest/90 transition-colors">
          Open Income Tax Calculator →
        </Link>
      </section>

      <div className="mt-8 pt-6 border-t border-line">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Related comparisons</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
            { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
            { label: "ELSS vs PPF", href: "/comparisons/elss-vs-ppf" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-ink-faint">Tax figures are approximate and based on Finance Act 2025. Consult a Chartered Accountant for your specific situation. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
    </main>
  );
}
