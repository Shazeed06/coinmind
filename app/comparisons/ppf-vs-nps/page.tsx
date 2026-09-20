import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PPF vs NPS – Which is Better for Retirement in 2026? | CoinMind",
  description: "PPF vs NPS comparison for retirement: returns, tax treatment, lock-in, flexibility and verdict for Indian investors in 2026.",
  alternates: { canonical: `${site.url}/comparisons/ppf-vs-nps` },
};

const TABLE = [
  { param: "Current rate / returns", ppf: "7.1% p.a. (govt-set, tax-free)", nps: "Market-linked; Tier-I equity: ~12–14% (10-yr avg)" },
  { param: "Risk", ppf: "Zero — backed by Government of India", nps: "Market risk on equity allocation (up to 75%)" },
  { param: "Tax on contributions", ppf: "80C deduction up to ₹1.5L (old regime)", nps: "80C up to ₹1.5L + 80CCD(1B) extra ₹50,000" },
  { param: "Tax on maturity", ppf: "EEE — completely tax-free (principal + interest)", nps: "EET — 60% tax-free lump sum; 40% must buy annuity (taxable)" },
  { param: "Lock-in period", ppf: "15 years (extendable in 5-yr blocks)", nps: "Until age 60 (exit possible at 60+ or on death)" },
  { param: "Partial withdrawal", ppf: "Allowed from year 7 (up to 50% of balance)", nps: "Allowed after 3 years — up to 25% for specific reasons" },
  { param: "Premature exit", ppf: "Allowed after 15 years freely; before: only for serious illness/education", nps: "Allowed after 10 years — but 80% must go into annuity" },
  { param: "Min. investment", ppf: "₹500/year", nps: "₹1,000/year (Tier-I)" },
  { param: "Max. investment", ppf: "₹1,50,000/year", nps: "No upper limit" },
  { param: "Who can open", ppf: "Any Indian resident (minor through parent)", nps: "Indian resident aged 18–70" },
  { param: "Annuity requirement", ppf: "None — full amount available at maturity", nps: "40% must purchase annuity at 60 (annuity income is taxable)" },
];

export default function PpfVsNpsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">PPF vs NPS: Which is Better for Retirement?</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">India's two flagship retirement savings instruments compared on returns, tax, lock-in and flexibility.</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026 · Sources: Finance Ministry, PFRDA, NSI</p>

      {/* Verdict */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict</p>
        <p className="mt-1 text-sm text-forest-deep">
          <strong>NPS wins on returns and additional tax savings</strong> (extra ₹50,000 via 80CCD-1B). <strong>PPF wins on simplicity, EEE tax status and flexibility</strong> — the entire corpus is yours at maturity, tax-free. Best strategy: use both — PPF for a safe guaranteed foundation, NPS for higher-return growth with the added tax deduction.
        </p>
      </div>

      {/* ₹1.5L/year for 25 years example */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">₹1,50,000/year for 25 years (starting age 35)</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {[
            { label: "PPF @ 7.1%", corpus: "₹1,02,00,000", tax: "Fully tax-free", note: "No annuity required", color: "border-forest" },
            { label: "NPS (60% equity @ 12%)", corpus: "₹2,38,00,000", tax: "60% tax-free (₹1.43Cr); 40% in annuity (taxable income)", note: "Higher corpus, partial tax on exit", color: "border-brass" },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl border-2 ${r.color} bg-card p-5`}>
              <p className="font-semibold text-ink">{r.label}</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-faint">Corpus at 60</span><span className="font-bold text-ink">{r.corpus}</span></div>
                <div className="flex justify-between gap-2"><span className="text-ink-faint shrink-0">Tax on exit</span><span className="text-ink text-right">{r.tax}</span></div>
                <div className="flex justify-between"><span className="text-ink-faint">Annuity</span><span className="text-ink">{r.note}</span></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-faint">Illustrative only. NPS returns depend on fund manager and allocation; PPF rate may change quarterly.</p>
      </section>

      {/* Table */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Detailed comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">PPF</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">NPS</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink-soft font-medium">{row.param}</td>
                  <td className="px-4 py-3 text-ink">{row.ppf}</td>
                  <td className="px-4 py-3 text-ink">{row.nps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The annuity problem */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The NPS annuity issue</h2>
        <p className="mt-2 text-ink-soft text-sm">
          NPS's biggest disadvantage: at 60, you <strong>must</strong> use 40% of your corpus to buy an annuity. Current annuity rates in India are 5.5–6.5% p.a. — meaning that 40% of your corpus earns a low fixed income that is also fully taxable. This significantly reduces the real benefit of NPS's higher returns.
        </p>
        <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-900 dark:text-amber-200">
          <strong>Example:</strong> ₹2.38 crore NPS corpus at 60 → ₹95.2L goes into annuity at 6% = ₹5.7L/year taxable income. The remaining ₹1.43Cr is yours tax-free. Compare: PPF ₹1.02Cr — all yours, completely tax-free, no strings attached.
        </div>
      </section>

      {/* Who should choose what */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Who should choose what</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-forest/30 bg-forest-soft p-5">
            <p className="font-semibold text-forest-deep mb-3">Choose PPF when…</p>
            <ul className="space-y-2 text-sm text-forest-deep">
              <li>✓ You want a completely safe, tax-free retirement fund</li>
              <li>✓ You want full control over your money at maturity</li>
              <li>✓ You are self-employed (no EPF, NPS not available from employer)</li>
              <li>✓ Your income is in nil or 5% tax bracket</li>
              <li>✓ Simplicity is more important than maximum return</li>
            </ul>
          </div>
          <div className="rounded-xl border border-brass/30 bg-amber-50 dark:bg-amber-950/20 p-5">
            <p className="font-semibold text-brass mb-3">Choose NPS when…</p>
            <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
              <li>✓ You are in 30% tax bracket (extra ₹50K deduction saves ₹15,600+)</li>
              <li>✓ Your employer contributes to NPS (80CCD-2 — free money)</li>
              <li>✓ You have a long horizon (20+ years) to absorb equity returns</li>
              <li>✓ You are comfortable with market-linked returns</li>
              <li>✓ You want the maximum possible retirement corpus</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "NPS vs EPF", href: "/comparisons/nps-vs-epf" },
            { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
            { label: "FIRE Calculator", href: "/calculators/fire" },
            { label: "Retirement Calculator", href: "/calculators/retirement" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-ink-faint">Returns are illustrative. NPS returns vary by fund manager. PPF rate is subject to quarterly revision. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
    </main>
  );
}
