import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mutual Fund vs Stocks – Which is Better for You? | CoinMind",
  description: "Mutual fund vs direct stocks: detailed comparison of returns, risk, time needed, tax and who should choose what. Verdict for Indian investors in 2026.",
  alternates: { canonical: `${site.url}/comparisons/mutual-fund-vs-stocks` },
};

const TABLE = [
  { param: "Who manages it", mf: "Fund manager (active) or index (passive)", stocks: "You" },
  { param: "Minimum investment", mf: "₹100/month SIP or ₹500 lumpsum", stocks: "Price of 1 share (₹1 to ₹30,000+)" },
  { param: "Diversification", mf: "Built-in (50–100+ stocks per fund)", stocks: "Manual — most retail investors hold 5–15 stocks" },
  { param: "Time needed", mf: "15 min/year (review once yearly)", stocks: "2–10 hours/week minimum" },
  { param: "Knowledge required", mf: "Low (choose fund category + fund house)", stocks: "High (sector, valuation, annual reports, management)" },
  { param: "Returns (historical avg)", mf: "Nifty 50 index: ~12–14% CAGR | Active large-cap: ~10–12% CAGR", stocks: "Skilled investors: 15–20%+ | Average retail: underperforms index" },
  { param: "Costs", mf: "Expense ratio 0.1–2.5% p.a.", stocks: "Brokerage + STT + exchange charges (~0.1–0.5% per trade)" },
  { param: "Tax (equity)", mf: "LTCG 12.5% above ₹1.25L/year | STCG 20%", stocks: "Same as MF for listed shares" },
  { param: "Liquidity", mf: "T+1 for most equity funds (same next day)", stocks: "T+1 settlement (instant selling)" },
  { param: "SIP/automation", mf: "Yes — auto-debit every month", stocks: "Manual or via specific brokers" },
  { param: "Emotional discipline", mf: "Fund manager doesn't panic-sell for you", stocks: "You must resist panic selling in downturns" },
  { param: "Demat account needed", mf: "Not needed for direct/regular plans", stocks: "Yes" },
];

export default function MutualFundVsStocksPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Mutual Fund vs Stocks</h1>
      <p className="mt-3 text-ink-soft">Which is better for building wealth — investing in mutual funds or picking individual stocks? Detailed comparison for Indian investors.</p>

      {/* Verdict banner */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-forest bg-forest-soft p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-1">Choose Mutual Funds if…</p>
          <ul className="text-sm text-forest-deep space-y-1.5">
            <li>✓ You have under 2 hours/week for investing</li>
            <li>✓ You want instant diversification</li>
            <li>✓ You are building towards a goal (retirement, home)</li>
            <li>✓ You lack stock-picking knowledge</li>
            <li>✓ You want to automate via SIP</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-brass bg-brass/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-1">Choose Stocks if…</p>
          <ul className="text-sm text-ink-soft space-y-1.5">
            <li>✓ You enjoy analysing businesses</li>
            <li>✓ You can dedicate 5–10 hours/week</li>
            <li>✓ You have read at least 5 annual reports</li>
            <li>✓ You have a 10+ year horizon</li>
            <li>✓ You have a demat account and broker setup</li>
          </ul>
        </div>
      </div>

      {/* Example */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">₹10,000/month for 20 years — MF vs Stocks</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Scenario</th>
              <th className="text-right px-4 py-3 text-ink">Corpus (12% CAGR)</th>
              <th className="text-right px-4 py-3 text-ink">Corpus (15% CAGR)</th>
            </tr></thead>
            <tbody>
              {[
                { s: "Nifty 50 index fund (~12%)", c12: "₹99.9L", c15: "—" },
                { s: "Active large-cap MF (~11–13%)", c12: "₹91–₹1.1Cr", c15: "—" },
                { s: "Direct stocks, skilled (~15%)", c12: "—", c15: "₹1.34Cr" },
                { s: "Direct stocks, average (~9%)", c12: "—", c15: "₹67.5L" },
              ].map((r, i) => (
                <tr key={r.s} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.s}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-forest">{r.c12}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-ink">{r.c15}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint mt-2">Research shows ~80–90% of active fund managers underperform their benchmark over 10+ years. Most retail stock pickers underperform even further due to behavioural biases.</p>
      </section>

      {/* Comparison table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Full comparison</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/4">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-[37.5%]">Mutual Fund</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-[37.5%]">Direct Stocks</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.mf}</td>
                  <td className="px-4 py-2.5 text-ink">{r.stocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-xl bg-paper-2 border border-line p-5">
        <p className="font-semibold text-ink mb-2">The smart middle path</p>
        <p className="text-sm text-ink-soft">Most wealth builders use both. Index funds or SIPs form the core (80–90% of portfolio) for disciplined compounding, while a small direct stock allocation (10–20%) satisfies the urge to pick stocks without risking the full corpus.</p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "SIP vs Lumpsum", href: "/comparisons/sip-vs-lumpsum" },
          { label: "ELSS vs PPF", href: "/comparisons/elss-vs-ppf" },
          { label: "FIRE Calculator", href: "/calculators/fire" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
