import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PPF vs FD – Which is Better in 2026? Returns, Tax & Lock-in Compared | CoinMind",
  description: "PPF vs Fixed Deposit for Indian investors: current rates, post-tax returns, lock-in and flexibility compared. With a clear verdict for 2026.",
  alternates: { canonical: `${site.url}/comparisons/ppf-vs-fd` },
};

const TABLE = [
  { param: "Current rate (2026)", ppf: "7.1% p.a. (compounded annually)", fd: "6.5–7.5% p.a. (varies by bank/tenure)" },
  { param: "Risk", ppf: "Zero — sovereign guarantee (Govt of India)", fd: "Zero — DICGC insured up to ₹5 lakh per bank" },
  { param: "Tax on interest/returns", ppf: "Completely tax-free (EEE)", fd: "Fully taxable as income at slab rate + TDS 10%" },
  { param: "Post-tax return @ 30% slab", ppf: "7.1% (unchanged — tax-free)", fd: "~4.5–5.3% (after 30% tax on 6.5–7.5%)" },
  { param: "80C deduction", ppf: "Yes — up to ₹1.5L/year (old regime)", fd: "Only 5-year tax-saving FD — up to ₹1.5L/year" },
  { param: "Lock-in period", ppf: "15 years (extendable)", fd: "7 days to 10 years (flexible)" },
  { param: "Premature withdrawal", ppf: "Partial from year 7; full after 15 years", fd: "Any time; 1% penalty on rate" },
  { param: "Loan facility", ppf: "Loan against PPF (year 3 to 6)", fd: "Loan up to 90% of FD value" },
  { param: "Monthly income option", ppf: "No — interest compounds annually", fd: "Yes — monthly interest payout FDs available" },
  { param: "Senior citizen benefit", ppf: "No extra rate for seniors", fd: "+0.25–0.5% extra for senior citizens" },
];

export default function PpfVsFdPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">PPF vs FD: Which is Better in 2026?</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">Both are safe, government-backed instruments — but PPF wins significantly on post-tax returns for anyone in the 20–30% bracket. Here's why.</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026 · Sources: NSI, RBI, Income Tax Dept</p>

      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict</p>
        <p className="mt-1 text-sm text-forest-deep">
          <strong>PPF is better</strong> for long-term (15+ year) tax-free wealth building. <strong>FD is better</strong> for short-term goals (under 5 years), monthly income needs, or if you are in the nil/5% tax bracket (where the tax-free advantage of PPF is reduced).
        </p>
      </div>

      {/* Post-tax comparison */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The tax advantage of PPF</h2>
        <p className="mt-2 text-sm text-ink-soft">At a 30% tax slab, a 7.1% PPF rate is equivalent to needing a 10.1% pre-tax return from an FD to match it. No FD in India offers 10%.</p>
        <div className="mt-4 rounded-xl bg-paper-2 border border-line p-5 text-sm">
          <p className="font-semibold text-ink mb-3">Post-tax effective return (30% tax bracket)</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-28 text-ink-faint shrink-0">FD at 7.5%</div>
              <div className="flex-1 bg-line h-4 rounded-full overflow-hidden">
                <div className="bg-brass h-full rounded-full" style={{ width: "50%" }} />
              </div>
              <div className="w-16 text-right font-semibold text-brass">~5.25%</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-28 text-ink-faint shrink-0">PPF at 7.1%</div>
              <div className="flex-1 bg-line h-4 rounded-full overflow-hidden">
                <div className="bg-forest h-full rounded-full" style={{ width: "71%" }} />
              </div>
              <div className="w-16 text-right font-semibold text-forest">7.1%</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-faint">PPF interest is completely exempt from income tax under Section 10(11).</p>
        </div>
      </section>

      {/* Table */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-4">Full comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">PPF</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">FD</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink-soft font-medium">{row.param}</td>
                  <td className="px-4 py-3 text-ink">{row.ppf}</td>
                  <td className="px-4 py-3 text-ink">{row.fd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line">
        <div className="flex flex-wrap gap-2">
          {[
            { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
            { label: "PPF vs NPS", href: "/comparisons/ppf-vs-nps" },
            { label: "PPF Calculator", href: "/calculators/ppf" },
            { label: "FD Calculator", href: "/calculators/fd" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-ink-faint">PPF rate is set by the Government of India and may change quarterly. FD rates vary by bank. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.</p>
    </main>
  );
}
