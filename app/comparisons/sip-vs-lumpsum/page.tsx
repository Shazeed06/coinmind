import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SIP vs Lumpsum Investment – Which Strategy is Better? | CoinMind",
  description: "SIP vs lumpsum investment comparison: which strategy gives better returns, lower risk and suits your situation. With real number examples for Indian investors.",
  alternates: { canonical: `${site.url}/comparisons/sip-vs-lumpsum` },
};

export default function SipVsLumpsumPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← All comparisons</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">SIP vs Lumpsum: Which is Better?</h1>
      <p className="mt-3 text-ink-soft max-w-2xl">Two ways to invest in mutual funds — monthly SIP or a one-time lumpsum. Which one suits your situation?</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: September 2026</p>

      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm font-semibold text-forest-deep">Quick verdict</p>
        <p className="mt-1 text-sm text-forest-deep">
          <strong>SIP is better</strong> when you have regular income and want to avoid timing the market. <strong>Lumpsum is better</strong> when you have a large amount ready and markets have just corrected significantly. Both can coexist: SIP for regular income, lumpsum for windfalls (bonus, inheritance).
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">How they compare</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Parameter</th>
                <th className="text-left px-4 py-3 font-semibold text-forest">SIP</th>
                <th className="text-left px-4 py-3 font-semibold text-brass">Lumpsum</th>
              </tr>
            </thead>
            <tbody>
              {[
                { param: "How it works", sip: "Fixed amount invested every month", lump: "One-time large investment" },
                { param: "Timing risk", sip: "Eliminated — buy at all market levels (rupee cost averaging)", lump: "High — investing at a market peak is costly" },
                { param: "Best in", sip: "Flat or volatile sideways markets", lump: "Bull markets (rising markets over the investment period)" },
                { param: "Minimum to start", sip: "₹100/month", lump: "₹1,000" },
                { param: "Requires market timing", sip: "No", lump: "Ideally yes (buy the dip)" },
                { param: "Suitable for", sip: "Salaried investors with regular income", lump: "Investors with a lump sum (bonus, windfall)" },
                { param: "Returns in rising markets", sip: "Slightly lower (later investments buy at higher NAV)", lump: "Higher (all money invested from day 1)" },
                { param: "Returns in falling markets", sip: "Better (later investments buy at lower NAV)", lump: "Worse (full amount exposed to fall)" },
                { param: "Psychological ease", sip: "High — small, regular, automatic", lump: "Lower — watching a large sum fall is stressful" },
              ].map((row, i) => (
                <tr key={row.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink-soft font-medium">{row.param}</td>
                  <td className="px-4 py-3 text-ink">{row.sip}</td>
                  <td className="px-4 py-3 text-ink">{row.lump}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The rupee cost averaging advantage</h2>
        <p className="mt-2 text-ink-soft text-sm">
          SIP's main advantage is <strong>rupee cost averaging</strong>: you buy more units when NAV is low and fewer when it is high, averaging down your purchase cost over time. In a volatile market, this leads to a lower average cost per unit than investing everything at once.
        </p>
        <div className="mt-4 rounded-xl bg-paper-2 border border-line p-5 text-sm">
          <p className="font-semibold text-ink mb-3">Example: ₹10,000/month SIP for 3 months in a volatile market</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-ink-faint">
                  <th className="text-left py-1">Month</th>
                  <th className="text-right py-1">NAV</th>
                  <th className="text-right py-1">Amount</th>
                  <th className="text-right py-1">Units bought</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-1">Month 1</td><td className="text-right">₹100</td><td className="text-right">₹10,000</td><td className="text-right">100</td></tr>
                <tr><td className="py-1">Month 2</td><td className="text-right">₹80</td><td className="text-right">₹10,000</td><td className="text-right">125</td></tr>
                <tr><td className="py-1">Month 3</td><td className="text-right">₹110</td><td className="text-right">₹10,000</td><td className="text-right">90.9</td></tr>
                <tr className="border-t border-line font-semibold"><td className="py-1.5">Total</td><td className="text-right">Avg ₹96.9</td><td className="text-right">₹30,000</td><td className="text-right">315.9</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-ink-faint">Average cost per unit: ₹94.97 — lower than the average NAV of ₹96.67. Lumpsum at month 1 (₹30,000 at ₹100) = 300 units. SIP = 315.9 units. SIP wins in this volatile scenario.</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink">The smart hybrid approach</h2>
        <p className="mt-2 text-ink-soft text-sm">
          Most financial planners recommend a <strong>combination</strong>: a regular SIP from your monthly salary, plus deploying any windfall (annual bonus, matured FD, inheritance) as a lumpsum after market corrections. This gives you both the discipline of SIP and the return advantage of lumpsum during dips.
        </p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "Lumpsum Calculator", href: "/calculators/lumpsum" },
          { label: "SIP vs FD", href: "/comparisons/sip-vs-fd" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
