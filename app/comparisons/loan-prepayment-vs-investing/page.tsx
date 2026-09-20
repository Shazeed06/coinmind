import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loan Prepayment vs Investing – Which is Better? | CoinMind",
  description: "Should you prepay your home loan or invest the extra money? Data-driven comparison with break-even analysis, tax impact and verdict for Indian borrowers.",
  alternates: { canonical: `${site.url}/comparisons/loan-prepayment-vs-investing` },
};

export default function LoanPrepaymentVsInvestingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Loan Prepayment vs Investing</h1>
      <p className="mt-3 text-ink-soft">You have ₹5 lakh extra. Do you prepay your home loan or invest in equity? The math is clear — but so is the psychology.</p>

      {/* Rule of thumb */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep mb-1">The rule of thumb</p>
        <p className="text-sm text-forest-deep">If your loan interest rate is <strong>higher</strong> than your expected post-tax investment return → prepay. If your expected investment return is <strong>higher</strong> → invest. For most home loans at 8–9% today, a diversified equity index fund at ~12% CAGR wins mathematically — but psychology matters.</p>
      </div>

      {/* Break-even analysis */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">Break-even: home loan at 8.5%</h2>
        <p className="text-sm text-ink-soft mb-3">Home loan interest is effectively an 8.5% guaranteed return (tax-adjusted may be ~7.2% if you claim 24b deduction in old regime). Compare to post-tax equity returns:</p>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Scenario</th>
              <th className="text-right px-4 py-3 text-ink">Return on ₹5L after 5 years</th>
              <th className="text-right px-4 py-3 text-ink">Winner</th>
            </tr></thead>
            <tbody>
              {[
                { s: "Prepay home loan (8.5% saving)", r: "₹7.52L (guaranteed)", w: "Safe choice" },
                { s: "Nifty 50 index fund @ 12% CAGR", r: "₹8.81L (pre-tax)", w: "Invest (if 12%)" },
                { s: "Nifty 50 after LTCG tax (~11.5%)", r: "₹8.58L (post-tax)", w: "Invest (slightly)" },
                { s: "Equity @ 9% (bad decade)", r: "₹7.69L", w: "Tie / Prepay" },
                { s: "FD @ 7.0% (taxed at 30% slab)", r: "₹6.41L (post-tax)", w: "Prepay wins" },
              ].map((r, i) => (
                <tr key={r.s} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.s}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-ink">{r.r}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-forest">{r.w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to prepay vs invest */}
      <section className="mt-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-forest bg-forest-soft p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-2">Prepay the loan when…</p>
            <ul className="text-sm text-forest-deep space-y-1.5">
              <li>✓ Your loan rate is above 9% (personal/car loan)</li>
              <li>✓ You are in the new tax regime (no 24b deduction)</li>
              <li>✓ You lose sleep over debt</li>
              <li>✓ You have less than 5 years left on the loan</li>
              <li>✓ You want lower EMI to free up cash flow</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-brass bg-brass/10 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brass mb-2">Invest instead when…</p>
            <ul className="text-sm text-ink-soft space-y-1.5">
              <li>✓ Loan rate is under 8.5% (subsidised home loan)</li>
              <li>✓ Old regime: claiming 24b deduction (reduces effective rate)</li>
              <li>✓ You have no emergency fund yet — build that first</li>
              <li>✓ You have 15+ years left and a long equity horizon</li>
              <li>✓ Employer NPS contribution not yet maxed (80CCD-2)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tax section */}
      <section className="mt-8 rounded-xl bg-paper-2 border border-line p-5">
        <p className="font-semibold text-ink mb-3">Tax dimension — old regime only</p>
        <div className="space-y-2 text-sm text-ink-soft">
          <p><strong>Section 24(b):</strong> Deduction up to ₹2 lakh on home loan interest (self-occupied). At 30% tax slab: saves ₹60,000/year in tax → reduces effective interest rate from 8.5% to ~7.2%.</p>
          <p><strong>New regime:</strong> No 24b deduction → effective rate stays at 8.5%. This tilts the math more towards prepayment for new-regime taxpayers.</p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-line bg-card p-5">
        <p className="font-semibold text-ink mb-2">The practical answer for most Indians</p>
        <p className="text-sm text-ink-soft">First ensure 6 months emergency fund. Then: if loan rate &gt; 9% → prepay aggressively. If loan rate &lt; 8.5% and you claim 24b → invest in equity via SIP. If unsure: split 50/50. The guaranteed peace of mind from being debt-free has real value that math doesn't capture.</p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "EMI Calculator", href: "/calculators/emi" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "FD vs Debt MF", href: "/comparisons/fd-vs-debt-mutual-fund" },
          { label: "Financial Health Score", href: "/calculators/financial-health" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
