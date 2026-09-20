import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FD vs Debt Mutual Fund – Which is Better After Tax? | CoinMind",
  description: "FD vs debt mutual fund: returns, tax treatment, liquidity and who should choose what. Post-tax comparison for Indian investors in 2026.",
  alternates: { canonical: `${site.url}/comparisons/fd-vs-debt-mutual-fund` },
};

const TABLE = [
  { param: "Returns (typical)", fd: "6.5–7.5% p.a. (fixed)", dmf: "6–8% p.a. (variable, market-linked)" },
  { param: "Safety", fd: "DICGC insured up to ₹5 lakh per bank", dmf: "Not insured; credit and interest rate risk" },
  { param: "Tax treatment", fd: "Interest taxed as per income slab every year", dmf: "Gains taxed as per slab (post-April 2023 rule change)" },
  { param: "Liquidity", fd: "Premature withdrawal allowed with ~0.5–1% penalty", dmf: "Exit loads (0–1%); T+1 to T+3 settlement" },
  { param: "Minimum investment", fd: "₹1,000 (most banks)", dmf: "₹500 (direct plan)" },
  { param: "TDS", fd: "10% TDS if interest > ₹40,000/year (₹50,000 for seniors)", dmf: "No TDS (self-reporting at ITR time)" },
  { param: "Pre-mature penalty", fd: "0.5–1% reduction in interest rate", dmf: "Exit load (usually 0–1% within 30–180 days)" },
  { param: "Types", fd: "Cumulative / non-cumulative, tax-saving (5-yr)", dmf: "Liquid, overnight, ultra-short, short, medium, gilt" },
  { param: "Best use case", fd: "Emergency fund, senior citizens, capital protection", dmf: "Active investors, sweep accounts, parking surplus" },
  { param: "Nomination / joint", fd: "Easy — standard banking process", dmf: "Possible but slightly more paperwork" },
];

export default function FdVsDebtMutualFundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">FD vs Debt Mutual Fund</h1>
      <p className="mt-3 text-ink-soft">Both are safer alternatives to equity. But their tax treatment, risk and returns differ. Here's the post-2023 picture.</p>

      {/* 2023 rule change callout */}
      <div className="mt-6 rounded-xl border border-brass/40 bg-brass/10 p-4 text-sm">
        <p className="font-semibold text-brass mb-1">Tax change: April 2023 onwards</p>
        <p className="text-ink-soft">Before April 2023, debt mutual fund gains held 3+ years were taxed at 20% with indexation — making them far more tax-efficient than FDs for people in the 30% bracket. <strong>Since April 2023, all debt MF gains are taxed as per income slab</strong> — the indexation advantage is gone. The tax gap between FD and debt MF is now narrow.</p>
      </div>

      {/* Tax comparison */}
      <section className="mt-8">
        <h2 className="font-display text-xl text-ink mb-3">Post-tax returns: ₹5 lakh for 3 years at 7.5%</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Scenario</th>
              <th className="text-right px-4 py-3 text-ink">Gain (₹)</th>
              <th className="text-right px-4 py-3 text-ink">Tax (30% slab)</th>
              <th className="text-right px-4 py-3 text-ink">Post-tax gain</th>
            </tr></thead>
            <tbody>
              {[
                { s: "FD @ 7.5% (cumulative)", g: "₹1,24,000", t: "₹37,200/yr (TDS)", pt: "₹86,800" },
                { s: "Debt MF @ 7.5% (post-2023)", g: "₹1,24,000", t: "₹37,200 (at redemption)", pt: "₹86,800" },
                { s: "FD (20% slab)", g: "₹1,24,000", t: "₹24,800", pt: "₹99,200" },
                { s: "Debt MF (20% slab)", g: "₹1,24,000", t: "₹24,800", pt: "₹99,200" },
              ].map((r, i) => (
                <tr key={r.s} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.s}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.g}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.t}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-forest">{r.pt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint mt-2">Post April 2023, FD and debt MF have nearly identical post-tax returns. The remaining differences are liquidity, TDS timing and credit risk.</p>
      </section>

      {/* Verdict */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-forest bg-forest-soft p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-2">Choose FD when…</p>
          <ul className="text-sm text-forest-deep space-y-1.5">
            <li>✓ Safety is the #1 priority (₹5L DICGC cover)</li>
            <li>✓ You are a senior citizen (extra 0.5% rate)</li>
            <li>✓ You want fixed, predictable returns</li>
            <li>✓ You dislike mutual fund paperwork</li>
            <li>✓ You need monthly interest payout</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-brass bg-brass/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-2">Choose Debt MF when…</p>
          <ul className="text-sm text-ink-soft space-y-1.5">
            <li>✓ You want instant liquidity (liquid/overnight funds)</li>
            <li>✓ No TDS auto-deduction</li>
            <li>✓ Slightly higher potential returns via gilt/duration</li>
            <li>✓ You want to park salary surplus each month</li>
            <li>✓ You already have a demat/MF account</li>
          </ul>
        </div>
      </div>

      {/* Full comparison */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Full comparison</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/3">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-1/3">Fixed Deposit</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-1/3">Debt Mutual Fund</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.fd}</td>
                  <td className="px-4 py-2.5 text-ink">{r.dmf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "FD Calculator", href: "/calculators/fd" },
          { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
          { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
