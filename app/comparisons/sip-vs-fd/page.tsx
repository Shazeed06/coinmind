import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SIP vs FD – Which is Better in 2026? Returns, Tax & Risk Compared | CoinMind",
  description: "SIP vs Fixed Deposit: detailed comparison of returns, tax treatment, liquidity and risk for Indian investors in 2026. With real numbers and a verdict.",
  alternates: { canonical: `${site.url}/comparisons/sip-vs-fd` },
  openGraph: {
    title: "SIP vs FD: Which is Better? (2026) | CoinMind",
    description: "SIP vs FD: real return comparison, post-tax analysis, liquidity and risk — everything an Indian investor needs to decide.",
    url: `${site.url}/comparisons/sip-vs-fd`,
  },
};

const COMPARISON_TABLE = [
  { param: "Returns (historical)", sip: "10–12% CAGR (equity MF, 10 yr avg)", fd: "6.5–7.5% p.a. (major banks, 2026)" },
  { param: "Returns (inflation-adjusted)", sip: "~4–6% real return", fd: "0–1% real return (after 6% inflation)" },
  { param: "Risk", sip: "Market risk — value can fall short-term", fd: "Zero risk — principal guaranteed (up to ₹5L/bank by DICGC)" },
  { param: "Tax on returns", sip: "LTCG 12.5% above ₹1.25L/yr (held >1 yr); STCG 20% if sold within 1 yr", fd: "Interest taxed as income at slab rate (up to 30% + cess)" },
  { param: "Effective post-tax return (30% slab)", sip: "~10.5% (after 12.5% LTCG on gains)", fd: "~4.9% (after 30% tax on 7% FD)" },
  { param: "Liquidity", sip: "Redeemable any time; 1% exit load within 1 yr (most equity funds)", fd: "Premature withdrawal allowed; 1% penalty on rate" },
  { param: "Minimum investment", sip: "₹100/month", fd: "₹1,000 (most banks)" },
  { param: "Inflation protection", sip: "Yes — equity historically beats inflation", fd: "No — FD returns often lag inflation net of tax" },
  { param: "Suitable horizon", sip: "5+ years (equity needs time to smooth volatility)", fd: "1 month to 10 years" },
  { param: "80C benefit", sip: "ELSS only (3-yr lock-in)", fd: "5-year tax-saving FD (5-yr lock-in)" },
];

export default function SipVsFdPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">SIP vs FD: Which is Better in 2026?</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">
        A data-driven comparison of Systematic Investment Plans (mutual fund SIPs) and Fixed Deposits — the two most popular savings instruments in India.
      </p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026 · Sources: AMFI, RBI, Income Tax Dept</p>

      {/* Quick verdict */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict</p>
        <p className="mt-1 text-sm text-forest-deep">
          For goals <strong>5+ years away</strong>, SIP in a diversified equity mutual fund typically delivers 2–3× more wealth than an FD, especially after tax. For goals <strong>under 3 years</strong> or when capital safety is non-negotiable, FD wins — guaranteed returns and zero volatility.
        </p>
      </div>

      {/* ₹10,000/month example */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">Real numbers: ₹10,000/month for 10 years</h2>
        <p className="mt-2 text-sm text-ink-faint">Assumptions: SIP at 11% p.a. CAGR; FD at 7% p.a. (reinvested). Pre-tax figures.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {[
            { label: "SIP (equity MF, 11%)", invested: "₹12,00,000", value: "₹21,87,000", gain: "₹9,87,000", color: "border-forest" },
            { label: "FD (bank, 7%)", invested: "₹12,00,000", value: "₹17,31,000", gain: "₹5,31,000", color: "border-line" },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl border-2 ${r.color} bg-card p-5`}>
              <p className="font-semibold text-ink">{r.label}</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-ink-faint">Amount invested</span><span className="text-ink">{r.invested}</span></div>
                <div className="flex justify-between"><span className="text-ink-faint">Maturity value</span><span className="font-bold text-ink">{r.value}</span></div>
                <div className="flex justify-between"><span className="text-ink-faint">Gains</span><span className="text-forest font-semibold">{r.gain}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Side-by-side comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">SIP (Equity MF)</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">Fixed Deposit</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink-soft font-medium">{row.param}</td>
                  <td className="px-4 py-3 text-ink">{row.sip}</td>
                  <td className="px-4 py-3 text-ink">{row.fd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tax section */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The tax difference is massive</h2>
        <p className="mt-2 text-ink-soft">
          This is where SIP wins decisively for anyone in the 20–30% tax bracket. FD interest is added to your income and taxed at your slab rate. Equity SIP gains are taxed as Long-Term Capital Gains at a flat 12.5% (with a ₹1.25 lakh annual exemption).
        </p>
        <div className="mt-4 rounded-xl bg-paper-2 border border-line p-5 text-sm">
          <p className="font-semibold text-ink mb-3">Post-tax returns at 30% slab (FY 2026-27)</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-24 text-ink-faint">FD at 7%</div>
              <div className="flex-1 bg-line h-4 rounded-full overflow-hidden">
                <div className="bg-brass h-full rounded-full" style={{ width: "49%" }} />
              </div>
              <div className="w-16 text-right font-semibold text-brass">~4.9%</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 text-ink-faint">SIP at 11%</div>
              <div className="flex-1 bg-line h-4 rounded-full overflow-hidden">
                <div className="bg-forest h-full rounded-full" style={{ width: "96%" }} />
              </div>
              <div className="w-16 text-right font-semibold text-forest">~10.5%</div>
            </div>
          </div>
        </div>
      </section>

      {/* When to choose */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">When to choose which</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-forest/30 bg-forest-soft p-5">
            <p className="font-semibold text-forest-deep mb-3">Choose SIP when…</p>
            <ul className="space-y-2 text-sm text-forest-deep">
              <li>✓ Goal is 5+ years away (retirement, children's education)</li>
              <li>✓ You can tolerate short-term fluctuations</li>
              <li>✓ You are in the 20–30% tax bracket</li>
              <li>✓ You want to beat inflation over time</li>
              <li>✓ You want to build long-term wealth systematically</li>
            </ul>
          </div>
          <div className="rounded-xl border border-brass/30 bg-amber-50 dark:bg-amber-950/20 p-5">
            <p className="font-semibold text-brass mb-3">Choose FD when…</p>
            <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-200">
              <li>✓ Goal is within 1–3 years</li>
              <li>✓ Capital preservation is critical (emergency fund, down payment)</li>
              <li>✓ You are retired and need predictable income</li>
              <li>✓ You are in the nil or 5% tax bracket</li>
              <li>✓ Market volatility is emotionally difficult for you</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mt-10 pt-6 border-t border-line">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Related comparisons</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "PPF vs FD", href: "/comparisons/ppf-vs-fd" },
            { label: "SIP vs Lumpsum", href: "/comparisons/sip-vs-lumpsum" },
            { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
            { label: "Old vs New Tax Regime", href: "/comparisons/old-vs-new-tax-regime" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Returns are historical and not guaranteed. Mutual fund investments are subject to market risk. This is not investment advice. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.
      </p>
    </main>
  );
}
