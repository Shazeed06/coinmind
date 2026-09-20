import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NPS Tier 1 vs Tier 2 – Difference, Tax & Which to Use | CoinMind",
  description: "NPS Tier 1 vs Tier 2: key differences in lock-in, tax benefits, withdrawal rules and when to use each account. Complete guide for Indian investors.",
  alternates: { canonical: `${site.url}/comparisons/nps-tier-1-vs-tier-2` },
};

const TABLE = [
  { param: "Purpose", t1: "Retirement savings (mandatory)", t2: "Flexible savings / investment account" },
  { param: "Eligibility", t1: "All Indian citizens 18–70", t2: "Must have an active Tier 1 account first" },
  { param: "Minimum contribution", t1: "₹500/contribution; ₹1,000/year minimum", t2: "₹250/contribution; no annual minimum" },
  { param: "Lock-in", t1: "Until age 60 (with limited partial withdrawals)", t2: "No lock-in — full withdrawal anytime" },
  { param: "Tax deduction (employee)", t1: "80CCD(1): up to ₹1.5L (part of 80C limit)", t2: "None — no tax deduction" },
  { param: "Extra deduction", t1: "80CCD(1B): additional ₹50,000 (over 80C)", t2: "None" },
  { param: "Employer contribution", t1: "80CCD(2): up to 10% of salary deductible (new regime eligible)", t2: "Not applicable" },
  { param: "Tax on withdrawal", t1: "60% lumpsum tax-free at 60; 40% must buy annuity (taxable)", t2: "Gains taxed as per applicable slab (debt fund rules apply)" },
  { param: "Partial withdrawal", t1: "After 3 years: up to 25% of own contributions for specific reasons", t2: "Full withdrawal at any time, no restrictions" },
  { param: "Investment options", t1: "Auto choice or Active choice (E, C, G, A asset classes)", t2: "Same as Tier 1 (E, C, G asset classes)" },
  { param: "Account closing", t1: "At 60 or after 20 years; before 60 only 20% lumpsum", t2: "Anytime — no penalty" },
  { param: "Pension / annuity", t1: "40% must go to annuity at 60 (monthly pension)", t2: "No annuity requirement" },
];

export default function NpsTier1VsTier2Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">NPS Tier 1 vs Tier 2</h1>
      <p className="mt-3 text-ink-soft">NPS has two account types. Tier 1 is the main pension account — locked in till 60 with powerful tax benefits. Tier 2 is a flexible investment account with no lock-in but no tax perks.</p>

      {/* Key insight */}
      <div className="mt-6 rounded-xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep mb-1">Quick answer</p>
        <p className="text-sm text-forest-deep">Tier 1 is for retirement savings — it has all the tax benefits but locks your money. Tier 2 is like a mutual fund with NPS's investment options — useful for medium-term goals, but gives no tax deduction (except for government employees under a special rule).</p>
      </div>

      {/* Full comparison table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Tier 1 vs Tier 2 — full comparison</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/3">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-1/3">Tier 1</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-1/3">Tier 2</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.t1}</td>
                  <td className="px-4 py-2.5 text-ink">{r.t2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tax benefit breakdown */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">NPS Tier 1 tax benefits (full picture)</h2>
        <div className="space-y-3">
          {[
            { section: "80CCD(1)", limit: "₹1,50,000", note: "Self contribution, part of overall 80C limit" },
            { section: "80CCD(1B)", limit: "+₹50,000", note: "Additional — OVER and ABOVE the 80C limit" },
            { section: "80CCD(2)", limit: "10% of basic salary", note: "Employer contribution — also deductible in the new tax regime" },
          ].map((r) => (
            <div key={r.section} className="flex items-start gap-4 rounded-xl border border-line bg-card p-4">
              <div className="shrink-0 rounded-lg bg-forest px-2.5 py-1 text-white text-xs font-bold">{r.section}</div>
              <div>
                <p className="font-semibold text-ink text-sm">{r.limit}</p>
                <p className="text-xs text-ink-soft">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-faint">A salaried employee with a 10% employer NPS contribution at ₹1L/month basic can save ₹12L + ₹1.5L + ₹50K = ₹2L in deductions per year via NPS (employer + 80CCD(1B) only).</p>
      </section>

      <section className="mt-8 rounded-xl bg-paper-2 border border-line p-5">
        <p className="font-semibold text-ink mb-2">When to use Tier 2</p>
        <p className="text-sm text-ink-soft">Tier 2 is useful for government employees (Central Government employees get Tier 2 as a tax-saving option under Section 80C with a 3-year lock-in). For private sector employees, Tier 2 is mostly a curiosity — a liquid investment with NPS fund management, but no tax edge over a regular mutual fund.</p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
          { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
          { label: "Old vs New Regime", href: "/comparisons/old-vs-new-tax-regime" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
