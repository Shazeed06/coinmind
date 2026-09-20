import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finance Today India – Current Interest Rates, Tax & Scheme Rates 2026 | CoinMind",
  description: "Today's financial rates in India: current RBI repo rate, PPF rate, EPF rate, FD rates, NSC rate, home loan rates and income tax slabs — all in one place.",
  alternates: { canonical: `${site.url}/finance-today` },
  openGraph: {
    title: "Finance Today – Current India Finance Rates 2026 | CoinMind",
    description: "All current Indian finance rates in one place: RBI repo, PPF, EPF, FD, income tax slabs — updated from official sources.",
    url: `${site.url}/finance-today`,
  },
};

const CURRENT_RATES = {
  lastUpdated: "September 2026",
  rbi: {
    repo: "5.75%",
    reverseRepo: "5.50%",
    crr: "4.0%",
    slr: "18.0%",
  },
  savingsSchemes: [
    { name: "Public Provident Fund (PPF)", rate: "7.1%", period: "FY 2025-26", calc: "/calculators/ppf" },
    { name: "Sukanya Samriddhi Yojana", rate: "8.2%", period: "Q2 FY 2025-26", calc: "/calculators/sukanya-samriddhi" },
    { name: "Senior Citizen Savings Scheme (SCSS)", rate: "8.2%", period: "Q2 FY 2025-26", calc: "/calculators/scss" },
    { name: "National Savings Certificate (NSC)", rate: "7.7%", period: "Q2 FY 2025-26", calc: "/calculators/nsc" },
    { name: "Post Office MIS", rate: "7.4%", period: "Q2 FY 2025-26", calc: "/calculators/post-office-mis" },
    { name: "Kisan Vikas Patra (KVP)", rate: "7.5%", period: "Q2 FY 2025-26", calc: null },
    { name: "Post Office Time Deposit (5-yr)", rate: "7.5%", period: "Q2 FY 2025-26", calc: null },
    { name: "Post Office RD", rate: "6.7%", period: "Q2 FY 2025-26", calc: "/calculators/rd" },
  ],
  epf: { rate: "8.25%", year: "2024-25" },
  taxNew: [
    { range: "Up to ₹4L", rate: "Nil" },
    { range: "₹4L–₹8L", rate: "5%" },
    { range: "₹8L–₹12L", rate: "10%" },
    { range: "₹12L–₹16L", rate: "15%" },
    { range: "₹16L–₹20L", rate: "20%" },
    { range: "₹20L–₹24L", rate: "25%" },
    { range: "Above ₹24L", rate: "30%" },
  ],
  bankFD: [
    { bank: "SBI", rate1yr: "6.80%", rate3yr: "6.75%", rate5yr: "6.50%" },
    { bank: "HDFC Bank", rate1yr: "6.60%", rate3yr: "7.00%", rate5yr: "7.00%" },
    { bank: "ICICI Bank", rate1yr: "6.70%", rate3yr: "7.00%", rate5yr: "7.00%" },
    { bank: "Axis Bank", rate1yr: "6.70%", rate3yr: "7.10%", rate5yr: "7.00%" },
    { bank: "Kotak Mahindra", rate1yr: "7.10%", rate3yr: "7.25%", rate5yr: "6.20%" },
  ],
};

export default function FinanceTodayPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brass">Live Rates</span>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink">Finance Today</h1>
      <p className="mt-2 text-ink-soft">All current Indian finance rates in one place — updated from official sources.</p>
      <p className="mt-1 text-xs text-ink-faint">Last updated: {CURRENT_RATES.lastUpdated} · Sources: RBI, EPFO, Ministry of Finance, NSI</p>

      {/* RBI Policy Rates */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">RBI Policy Rates</h2>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { label: "Repo Rate", value: CURRENT_RATES.rbi.repo, sub: "Rate RBI lends to banks" },
            { label: "Reverse Repo", value: CURRENT_RATES.rbi.reverseRepo, sub: "Rate RBI borrows from banks" },
            { label: "CRR", value: CURRENT_RATES.rbi.crr, sub: "Cash Reserve Ratio" },
            { label: "SLR", value: CURRENT_RATES.rbi.slr, sub: "Statutory Liquidity Ratio" },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-line bg-card p-4 text-center">
              <p className="font-display text-2xl font-600 text-forest">{r.value}</p>
              <p className="text-sm font-semibold text-ink mt-1">{r.label}</p>
              <p className="text-xs text-ink-faint mt-0.5">{r.sub}</p>
            </div>
          ))}
        </div>
        <Link href="/research/rbi-repo-rate-history" className="mt-2 inline-block text-xs text-forest hover:underline">
          View full RBI repo rate history →
        </Link>
      </section>

      {/* Savings Schemes */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Government Savings Scheme Rates (Q2 FY 2025-26)</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Scheme</th>
                <th className="text-right px-4 py-3 font-semibold text-ink">Rate</th>
                <th className="text-right px-4 py-3 font-semibold text-ink-faint hidden sm:table-cell">Calculator</th>
              </tr>
            </thead>
            <tbody>
              {CURRENT_RATES.savingsSchemes.map((s, i) => (
                <tr key={s.name} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-3 text-ink">{s.name}</td>
                  <td className="px-4 py-3 text-right font-display text-lg font-600 text-forest">{s.rate}</td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    {s.calc ? (
                      <Link href={s.calc} className="text-xs text-forest hover:underline">Calculate →</Link>
                    ) : (
                      <span className="text-xs text-ink-faint">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex gap-3">
          <Link href="/research/ppf-rate-history" className="text-xs text-forest hover:underline">PPF rate history →</Link>
        </div>
      </section>

      {/* EPF */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">EPF Interest Rate</h2>
        <div className="rounded-xl border border-line bg-card p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-soft">Employee Provident Fund (EPFO)</p>
            <p className="mt-1 text-xs text-ink-faint">FY {CURRENT_RATES.epf.year} · Declared by EPFO Central Board of Trustees</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-600 text-forest">{CURRENT_RATES.epf.rate}</p>
            <Link href="/calculators/epf" className="text-xs text-forest hover:underline">Calculate →</Link>
          </div>
        </div>
        <Link href="/research/epf-rate-history" className="mt-2 inline-block text-xs text-forest hover:underline">
          EPF rate history →
        </Link>
      </section>

      {/* Income Tax */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">Income Tax Slabs FY 2026-27 (New Regime)</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-line overflow-hidden">
            <div className="bg-forest px-4 py-2"><p className="text-white text-sm font-semibold">New Regime (Default)</p></div>
            <table className="w-full text-sm">
              <tbody>
                {CURRENT_RATES.taxNew.map((s, i) => (
                  <tr key={s.range} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                    <td className="px-4 py-2 text-ink-soft">{s.range}</td>
                    <td className="px-4 py-2 text-right font-semibold text-ink">{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-line bg-card p-4 text-sm space-y-2">
            <p className="font-semibold text-ink">Key tax facts FY 2026-27</p>
            <ul className="space-y-1.5 text-ink-soft text-xs">
              <li>✓ Standard deduction: <strong>₹75,000</strong> (salaried/pensioners)</li>
              <li>✓ 87A rebate: <strong>₹60,000</strong> — zero tax up to ₹12L income</li>
              <li>✓ Surcharge: 10% above ₹50L, 15% above ₹1Cr</li>
              <li>✓ Cess: 4% on all tax + surcharge</li>
              <li>✓ NPS employer contribution (80CCD-2): deductible in new regime</li>
            </ul>
            <Link href="/calculators/income-tax" className="mt-2 inline-block text-xs font-semibold text-forest hover:underline">
              Calculate your exact tax →
            </Link>
          </div>
        </div>
        <Link href="/research/income-tax-slabs-history" className="mt-2 inline-block text-xs text-forest hover:underline">
          Full income tax slab history →
        </Link>
      </section>

      {/* Bank FD Rates */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">Bank FD Rates (General Public)</h2>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Bank</th>
                <th className="text-right px-4 py-3 font-semibold text-ink">1 Year</th>
                <th className="text-right px-4 py-3 font-semibold text-ink">3 Years</th>
                <th className="text-right px-4 py-3 font-semibold text-ink">5 Years</th>
              </tr>
            </thead>
            <tbody>
              {CURRENT_RATES.bankFD.map((r, i) => (
                <tr key={r.bank} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 font-medium text-ink">{r.bank}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.rate1yr}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.rate3yr}</td>
                  <td className="px-4 py-2.5 text-right text-ink">{r.rate5yr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-faint">FD rates change frequently. Verify with your bank before investing. Senior citizens typically get +0.25–0.5% extra.</p>
        <Link href="/calculators/fd" className="mt-1 inline-block text-xs text-forest hover:underline">FD Calculator →</Link>
      </section>

      {/* Quick links */}
      <section className="mt-12 pt-6 border-t border-line">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Historical data</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "PPF Rate History", href: "/research/ppf-rate-history" },
            { label: "EPF Rate History", href: "/research/epf-rate-history" },
            { label: "RBI Repo Rate History", href: "/research/rbi-repo-rate-history" },
            { label: "Income Tax Slab History", href: "/research/income-tax-slabs-history" },
            { label: "All Research", href: "/research" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
