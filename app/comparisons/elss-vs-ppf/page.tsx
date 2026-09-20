import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ELSS vs PPF – Which is Better for 80C Tax Saving? | CoinMind",
  description: "ELSS vs PPF: returns, lock-in, tax treatment and who should choose what for Section 80C tax saving in India. Data-backed comparison for 2026.",
  alternates: { canonical: `${site.url}/comparisons/elss-vs-ppf` },
};

const TABLE = [
  { param: "Full form", elss: "Equity Linked Savings Scheme", ppf: "Public Provident Fund" },
  { param: "Type", elss: "Equity mutual fund (market-linked)", ppf: "Government-backed (risk-free)" },
  { param: "Lock-in period", elss: "3 years (shortest among 80C options)", ppf: "15 years (extendable in 5-yr blocks)" },
  { param: "Max 80C deduction", elss: "₹1.5 lakh/year", ppf: "₹1.5 lakh/year" },
  { param: "Returns (historical)", elss: "12–15% CAGR (Nifty 50 index: ~12–14%)", ppf: "7.1% p.a. (current, compounded annually)" },
  { param: "Risk", elss: "High — can fall 30–50% in bear markets", ppf: "Zero — sovereign guarantee" },
  { param: "Tax on returns", elss: "LTCG 12.5% above ₹1.25L/year", ppf: "Completely tax-free (EEE status)" },
  { param: "Liquidity", elss: "After 3-year lock-in; fully liquid then", ppf: "Partial withdrawal after year 7; premature closure only after 5 years" },
  { param: "Loan against", elss: "Not available against ELSS", ppf: "Available from year 3 to 6 (up to 25% of balance)" },
  { param: "SIP option", elss: "Yes — monthly SIP of ₹500+", ppf: "Manual deposits; no auto-SIP" },
  { param: "Demat needed", elss: "No (direct plan via MFU/CAMS/AMC)", ppf: "No (post office or bank)" },
  { param: "Applicable regime", elss: "80C deduction — only old tax regime", ppf: "80C deduction — only old tax regime" },
];

export default function ElssVsPpfPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">ELSS vs PPF</h1>
      <p className="mt-3 text-ink-soft">Both save tax under Section 80C. But their returns, risk and lock-in are very different. Here's how to choose.</p>

      {/* Key note on new regime */}
      <div className="mt-6 rounded-xl border border-brass/40 bg-brass/10 p-4 text-sm">
        <p className="font-semibold text-brass mb-1">Important: New vs Old Tax Regime</p>
        <p className="text-ink-soft">Both ELSS and PPF give 80C deductions only under the <strong>old tax regime</strong>. If you are under the new tax regime (default from FY 2023-24), neither gives you a tax deduction — though PPF interest remains tax-free either way.</p>
      </div>

      {/* Verdict */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-forest bg-forest-soft p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-1">Choose ELSS if…</p>
          <ul className="text-sm text-forest-deep space-y-1.5">
            <li>✓ You have a 5+ year horizon</li>
            <li>✓ You can stomach market volatility</li>
            <li>✓ You want higher potential returns (12–15%)</li>
            <li>✓ You want the shortest 80C lock-in (3 years)</li>
            <li>✓ You are under 45 with stable income</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-brass bg-brass/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-1">Choose PPF if…</p>
          <ul className="text-sm text-ink-soft space-y-1.5">
            <li>✓ You are risk-averse or near retirement</li>
            <li>✓ You want guaranteed, tax-free returns</li>
            <li>✓ You need a long-term debt allocation</li>
            <li>✓ You want a corpus untouched for 15 years</li>
            <li>✓ You are in the 30% tax bracket (EEE is powerful)</li>
          </ul>
        </div>
      </div>

      {/* ₹1.5L for 15 years example */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">₹1.5 lakh/year for 15 years — what you get</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Option</th>
              <th className="text-right px-4 py-3 text-ink">Corpus after 15 years</th>
              <th className="text-right px-4 py-3 text-ink">Tax on gains</th>
            </tr></thead>
            <tbody>
              {[
                { o: "PPF @ 7.1%", c: "₹41.0L", t: "Nil (EEE)" },
                { o: "ELSS @ 12% CAGR", c: "₹74.9L", t: "12.5% LTCG on gains above ₹1.25L/yr" },
                { o: "ELSS @ 15% CAGR", c: "₹1.07Cr", t: "12.5% LTCG on gains above ₹1.25L/yr" },
              ].map((r, i) => (
                <tr key={r.o} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.o}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-forest">{r.c}</td>
                  <td className="px-4 py-2.5 text-right text-ink-soft text-xs">{r.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint mt-2">ELSS corpus is pre-tax. After 12.5% LTCG on gains above ₹1.25L/year, net ELSS at 12% CAGR ≈ ₹70–72L — still well ahead of PPF, but with market risk.</p>
      </section>

      {/* Full comparison */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Full comparison</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/3">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-1/3">ELSS</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-1/3">PPF</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.elss}</td>
                  <td className="px-4 py-2.5 text-ink">{r.ppf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-xl bg-paper-2 border border-line p-5">
        <p className="font-semibold text-ink mb-2">The smart approach: both</p>
        <p className="text-sm text-ink-soft">Many investors split ₹1.5 lakh between ELSS (₹1 lakh) and PPF (₹50,000). This captures ELSS's equity upside while maintaining a guaranteed, tax-free PPF debt component for stability.</p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "PPF Calculator", href: "/calculators/ppf" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
          { label: "Old vs New Regime", href: "/comparisons/old-vs-new-tax-regime" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
