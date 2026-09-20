import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Term vs ULIP vs Endowment – Which Life Insurance Is Best? | CoinMind",
  description: "Term plan vs ULIP vs endowment: a clear comparison of returns, costs, cover and who should choose what. Why most financial planners recommend term-only.",
  alternates: { canonical: `${site.url}/comparisons/term-vs-ulip-vs-endowment` },
};

const TABLE = [
  { param: "Type", term: "Pure risk cover — no savings", ulip: "Insurance + market-linked investment", endo: "Insurance + guaranteed savings" },
  { param: "Sum assured (₹50L cover)", term: "₹800–1,500/month premium", ulip: "₹5,000–15,000/month premium", endo: "₹4,000–12,000/month premium" },
  { param: "Maturity benefit", term: "Nil (unless return-of-premium)", ulip: "Fund value (market-linked, can lose value)", endo: "Sum assured + bonus (4–5%)" },
  { param: "Death benefit", term: "Full sum assured to nominee", ulip: "Higher of sum assured or fund value", endo: "Sum assured (sometimes + bonus)" },
  { param: "Investment return (internal)", term: "N/A — it is pure insurance", ulip: "4–8% (net of charges) — highly variable", endo: "3.5–5% (implicit IRR)" },
  { param: "Transparency", term: "Very clear — premium, cover, term", ulip: "Complex: mortality charge, fund management fee, admin charges", endo: "Low — bonus rates not guaranteed" },
  { param: "Lock-in / surrender", term: "No lock-in; cancel anytime", ulip: "5-year lock-in; heavy surrender charges before 5 years", endo: "Heavy loss if surrendered early (below paid-up value)" },
  { param: "Tax benefit", term: "80C (premium); 10(10D) (death benefit)", ulip: "80C; 10(10D) maturity tax-free if premium ≤ 10% of sum assured", endo: "80C; 10(10D) if premium ≤ 10% of sum assured" },
  { param: "Flexibility", term: "Can be increased/decreased or canceled", ulip: "Can switch funds; top-up allowed", endo: "Very rigid — fixed premium for full term" },
  { param: "Recommended by?", term: "Virtually all financial planners, SEBI registered advisors", ulip: "Primarily insurance agents (high commission)", endo: "LIC agents / traditional bank advisors (high commission)" },
];

export default function TermVsUlipVsEndowmentPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Term vs ULIP vs Endowment</h1>
      <p className="mt-3 text-ink-soft">Three types of life insurance — but only one of them is actually good value. Here's the honest breakdown that insurance agents won't tell you.</p>

      {/* Strong verdict */}
      <div className="mt-8 rounded-2xl border-2 border-forest bg-forest-soft p-5">
        <p className="text-sm font-bold text-forest-deep mb-2">The financial planner consensus</p>
        <p className="text-sm text-forest-deep">
          <strong>Buy term insurance for protection. Invest separately in mutual funds for wealth creation.</strong> Mixing insurance and investment (ULIP or endowment) almost always gives you poor insurance cover AND poor investment returns — the worst of both worlds. The one exception: if you&apos;ve already maxed all tax-saving options and need one more 80C avenue, some ULIPs can work — but evaluate the charges carefully.
        </p>
      </div>

      {/* Cost comparison example */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">₹1 crore cover for 30 years — what you pay</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Product</th>
              <th className="text-right px-4 py-3 text-ink">Monthly Premium</th>
              <th className="text-right px-4 py-3 text-ink">Total paid (30yr)</th>
              <th className="text-right px-4 py-3 text-ink">Maturity / return</th>
            </tr></thead>
            <tbody>
              {[
                { p: "Term plan (₹1Cr, 35yr male)", m: "~₹900/month", t: "₹3.24L", r: "Nil (pure cover)" },
                { p: "ULIP (₹1Cr equivalent)", m: "~₹10,000/month", t: "₹36L", r: "Fund value (maybe ₹40–80L after charges)" },
                { p: "Endowment (₹50L cover)", m: "~₹8,000/month", t: "₹28.8L", r: "~₹35–40L (4–5% IRR)" },
                { p: "Term + SIP (₹9,100 invested)", m: "₹900 + ₹9,100", t: "₹36L total", r: "₹1.5–2Cr at 12% CAGR (separate)" },
              ].map((r, i) => (
                <tr key={r.p} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.p}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.m}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.t}</td>
                  <td className={`px-4 py-2.5 text-right text-sm ${i === 3 ? "font-semibold text-forest" : "text-ink"}`}>{r.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint mt-2">Same ₹10,000/month budget: term + SIP generates ₹1.5–2Cr corpus vs ULIP's ₹40–80L (highly variable). The difference is staggering.</p>
      </section>

      {/* Full comparison */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Full comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="min-w-[640px] w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/4">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-1/4">Term Plan</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-1/4">ULIP</th>
              <th className="text-left px-4 py-3 text-ink-soft font-semibold w-1/4">Endowment</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.term}</td>
                  <td className="px-4 py-2.5 text-ink">{r.ulip}</td>
                  <td className="px-4 py-2.5 text-ink">{r.endo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "Floater vs Individual Health", href: "/comparisons/floater-vs-individual-health-insurance" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "Financial Health Score", href: "/calculators/financial-health" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
