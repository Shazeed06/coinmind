import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Income Tax Slab History India – New & Old Regime Since 2014 | CoinMind",
  description: "Complete income tax slab history for India: new regime slabs for every year since FY 2020-21, and old regime history since FY 2014-15. Official data.",
  alternates: { canonical: `${site.url}/research/income-tax-slabs-history` },
};

export default function IncomeTaxSlabsHistoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/research" className="text-xs text-ink-faint hover:text-forest">← Research Hub</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Income Tax Slab History (2014–2026)</h1>
      <p className="mt-3 text-ink-soft">New and old regime tax slabs for every financial year, sourced from Finance Acts and Income Tax Department notifications.</p>
      <p className="mt-1 text-xs text-ink-faint">Source: Income Tax Department, Finance Acts 2014–2025 · Last updated: September 2026</p>

      {/* New regime history */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">New Regime — Slab History</h2>
        <p className="mt-2 text-sm text-ink-soft">The new tax regime was introduced in Budget 2020 (FY 2020-21). It became the default regime from FY 2023-24, and was significantly revised in Budget 2025 (FY 2025-26).</p>

        {/* FY 2025-26 and 2026-27 */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-forest px-2.5 py-0.5 text-xs font-bold text-white">FY 2025-26 & 2026-27 (Current)</span>
          </div>
          <div className="rounded-xl border border-forest/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-forest/10"><th className="text-left px-4 py-2.5 text-ink-soft">Income Range</th><th className="text-right px-4 py-2.5 text-forest font-semibold">Rate</th></tr></thead>
              <tbody>
                {[
                  { range: "Up to ₹4 lakh", rate: "Nil" },
                  { range: "₹4 lakh – ₹8 lakh", rate: "5%" },
                  { range: "₹8 lakh – ₹12 lakh", rate: "10%" },
                  { range: "₹12 lakh – ₹16 lakh", rate: "15%" },
                  { range: "₹16 lakh – ₹20 lakh", rate: "20%" },
                  { range: "₹20 lakh – ₹24 lakh", rate: "25%" },
                  { range: "Above ₹24 lakh", rate: "30%" },
                ].map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-ink">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">Standard deduction: ₹75,000. Section 87A rebate: up to ₹60,000 (effective zero tax up to ₹12 lakh income).</p>
        </div>

        {/* FY 2023-24 and 2024-25 */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-brass px-2.5 py-0.5 text-xs font-bold text-white">FY 2023-24 & 2024-25</span>
          </div>
          <div className="rounded-xl border border-brass/30 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-brass/10"><th className="text-left px-4 py-2.5 text-ink-soft">Income Range</th><th className="text-right px-4 py-2.5 text-brass font-semibold">Rate</th></tr></thead>
              <tbody>
                {[
                  { range: "Up to ₹3 lakh", rate: "Nil" },
                  { range: "₹3 lakh – ₹6 lakh", rate: "5%" },
                  { range: "₹6 lakh – ₹9 lakh", rate: "10%" },
                  { range: "₹9 lakh – ₹12 lakh", rate: "15%" },
                  { range: "₹12 lakh – ₹15 lakh", rate: "20%" },
                  { range: "Above ₹15 lakh", rate: "30%" },
                ].map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-ink">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">Standard deduction: ₹50,000 (from FY 2023-24). 87A rebate: up to ₹25,000 (zero tax up to ₹7 lakh).</p>
        </div>

        {/* FY 2020-21 to 2022-23 */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-line-strong px-2.5 py-0.5 text-xs font-bold text-ink">FY 2020-21 to 2022-23</span>
          </div>
          <div className="rounded-xl border border-line overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-paper-2"><th className="text-left px-4 py-2.5 text-ink-soft">Income Range</th><th className="text-right px-4 py-2.5 text-ink-soft font-semibold">Rate</th></tr></thead>
              <tbody>
                {[
                  { range: "Up to ₹2.5 lakh", rate: "Nil" },
                  { range: "₹2.5 lakh – ₹5 lakh", rate: "5%" },
                  { range: "₹5 lakh – ₹7.5 lakh", rate: "10%" },
                  { range: "₹7.5 lakh – ₹10 lakh", rate: "15%" },
                  { range: "₹10 lakh – ₹12.5 lakh", rate: "20%" },
                  { range: "₹12.5 lakh – ₹15 lakh", rate: "25%" },
                  { range: "Above ₹15 lakh", rate: "30%" },
                ].map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-ink">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">Original new regime — no standard deduction, no exemptions, no most deductions. Optional (old regime was default).</p>
        </div>
      </section>

      {/* Old regime */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Old Regime — Current Slabs</h2>
        <p className="mt-2 text-sm text-ink-soft">The old regime slabs have not changed since FY 2014-15. Only the basic exemption limit has stayed at ₹2.5 lakh (₹3L for 60+, ₹5L for 80+).</p>
        <div className="mt-4 rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2"><th className="text-left px-4 py-2.5 text-ink-soft">Income Range</th><th className="text-right px-4 py-2.5 text-ink-soft font-semibold">Rate</th></tr></thead>
          <tbody>
            {[
              { range: "Up to ₹2.5 lakh (₹3L for 60+, ₹5L for 80+)", rate: "Nil" },
              { range: "₹2.5 lakh – ₹5 lakh", rate: "5%" },
              { range: "₹5 lakh – ₹10 lakh", rate: "20%" },
              { range: "Above ₹10 lakh", rate: "30%" },
            ].map((s, i) => (
              <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                <td className="px-4 py-2.5 text-ink-soft">{s.range}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-ink">{s.rate}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-faint">Standard deduction: ₹50,000 (from FY 2018-19). 87A rebate: up to ₹12,500 (zero tax up to ₹5 lakh). Plus 4% health and education cess on all tax.</p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "Income Tax Calculator", href: "/calculators/income-tax" },
          { label: "Old vs New Regime Comparison", href: "/comparisons/old-vs-new-tax-regime" },
          { label: "Research Hub", href: "/research" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
