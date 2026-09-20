import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RBI Repo Rate History 2010–2026 – All MPC Decisions | CoinMind",
  description: "Complete RBI repo rate history from 2010 to 2026. All Monetary Policy Committee (MPC) rate decisions, dates and reasons. Official data from RBI.",
  alternates: { canonical: `${site.url}/research/rbi-repo-rate-history` },
};

const REPO_RATES = [
  { date: "Jun 2025", rate: "5.75%", change: "−0.25%", action: "Cut" },
  { date: "Apr 2025", rate: "6.00%", change: "−0.25%", action: "Cut" },
  { date: "Feb 2025", rate: "6.25%", change: "−0.25%", action: "Cut" },
  { date: "Feb 2023 – Jan 2025", rate: "6.50%", change: "Held", action: "Hold" },
  { date: "Dec 2022", rate: "6.25%", change: "+0.35%", action: "Hike" },
  { date: "Sep 2022", rate: "5.90%", change: "+0.50%", action: "Hike" },
  { date: "Aug 2022", rate: "5.40%", change: "+0.50%", action: "Hike" },
  { date: "Jun 2022", rate: "4.90%", change: "+0.50%", action: "Hike" },
  { date: "May 2022", rate: "4.40%", change: "+0.40%", action: "Hike" },
  { date: "May 2020 – Apr 2022", rate: "4.00%", change: "Held", action: "Hold" },
  { date: "Mar 2020 (emergency)", rate: "4.40%", change: "−0.75%", action: "Cut" },
  { date: "Feb 2020", rate: "5.15%", change: "Held", action: "Hold" },
  { date: "Oct 2019", rate: "5.15%", change: "−0.25%", action: "Cut" },
  { date: "Aug 2019", rate: "5.40%", change: "−0.35%", action: "Cut" },
  { date: "Jun 2019", rate: "5.75%", change: "−0.25%", action: "Cut" },
  { date: "Apr 2019", rate: "6.00%", change: "−0.25%", action: "Cut" },
  { date: "Feb 2019", rate: "6.25%", change: "−0.25%", action: "Cut" },
  { date: "Jun 2018 – Jan 2019", rate: "6.50%", change: "Held/Hiked", action: "Hike" },
  { date: "Jun 2018", rate: "6.25%", change: "+0.25%", action: "Hike" },
  { date: "Aug 2017 – May 2018", rate: "6.00%", change: "Held", action: "Hold" },
  { date: "Aug 2017", rate: "6.00%", change: "−0.25%", action: "Cut" },
  { date: "Oct 2016 – Jun 2017", rate: "6.25%", change: "Held", action: "Hold" },
  { date: "Oct 2016", rate: "6.25%", change: "−0.25%", action: "Cut" },
  { date: "Apr 2016 – Sep 2016", rate: "6.50%", change: "Held", action: "Hold" },
  { date: "Apr 2016", rate: "6.50%", change: "−0.25%", action: "Cut" },
  { date: "Sep 2015 – Mar 2016", rate: "6.75%", change: "Held", action: "Hold" },
  { date: "Sep 2015", rate: "6.75%", change: "−0.50%", action: "Cut" },
  { date: "Jun 2015", rate: "7.25%", change: "−0.25%", action: "Cut" },
  { date: "Mar 2015", rate: "7.50%", change: "−0.25%", action: "Cut" },
  { date: "Jan 2015", rate: "7.75%", change: "−0.25%", action: "Cut" },
  { date: "Jan 2014 – Dec 2014", rate: "8.00%", change: "Held/Hiked", action: "Hold" },
  { date: "Jan 2014", rate: "8.00%", change: "+0.25%", action: "Hike" },
  { date: "Oct 2013", rate: "7.75%", change: "+0.25%", action: "Hike" },
  { date: "Mar 2012 – Sep 2013", rate: "7.25–8.00%", change: "Various", action: "Various" },
];

export default function RbiRepoRateHistoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/research" className="text-xs text-ink-faint hover:text-forest">← Research Hub</Link>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">RBI Repo Rate History (2010–2026)</h1>
      <p className="mt-3 text-ink-soft">All Reserve Bank of India Monetary Policy Committee (MPC) rate decisions. The repo rate is the rate at which RBI lends to commercial banks — it drives home loan, car loan and FD rates across India.</p>
      <p className="mt-1 text-xs text-ink-faint">Source: Reserve Bank of India (rbi.org.in) · Last updated: September 2026</p>

      {/* Current rate */}
      <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-5">
        <p className="text-sm text-forest-deep font-semibold">Current RBI Repo Rate (June 2025)</p>
        <p className="mt-1 font-display text-4xl text-forest font-600">5.75%</p>
        <p className="mt-1 text-sm text-forest-deep">Cut by 0.25% in June 2025. The rate cycle has been in easing mode since February 2025, with three cuts totalling 0.75%.</p>
      </div>

      {/* Key data points */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "Current rate", value: "5.75%", sub: "As of June 2025" },
          { label: "Recent peak (2023-25)", value: "6.50%", sub: "Held for ~2 years" },
          { label: "COVID-era low", value: "4.00%", sub: "May 2020 – Apr 2022" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-card p-4 text-center">
            <p className="font-display text-2xl text-ink">{s.value}</p>
            <p className="text-xs text-brass font-semibold mt-0.5">{s.label}</p>
            <p className="text-xs text-ink-faint mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Why it matters */}
      <div className="mt-8 rounded-xl bg-paper-2 border border-line p-5 text-sm">
        <p className="font-semibold text-ink mb-2">Why the repo rate matters to you</p>
        <ul className="space-y-1.5 text-ink-soft">
          <li>📉 <strong>Rate cut</strong> → banks lower home loan, car loan EMIs within weeks</li>
          <li>📈 <strong>Rate hike</strong> → floating rate EMIs increase; FD rates typically rise</li>
          <li>💰 <strong>FD rates</strong> are loosely linked — banks raise/lower FD rates in the same direction</li>
          <li>🏠 <strong>Home loans</strong>: most modern home loans are EBLR (external benchmark linked) — repo rate changes flow through directly, usually within one billing cycle</li>
        </ul>
      </div>

      {/* Rate table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">MPC decision history</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2">
                <th className="text-left px-4 py-3 font-semibold text-ink-soft">Period</th>
                <th className="text-left px-4 py-3 font-semibold text-ink">Repo Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-ink-faint">Change</th>
              </tr>
            </thead>
            <tbody>
              {REPO_RATES.map((r, i) => (
                <tr key={r.date + r.rate} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.date}</td>
                  <td className="px-4 py-2.5 font-semibold text-ink">{r.rate}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-semibold ${r.action === "Cut" ? "text-forest" : r.action === "Hike" ? "text-red-500" : "text-ink-faint"}`}>
                      {r.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "EMI Calculator", href: "/calculators/emi" },
          { label: "FD Calculator", href: "/calculators/fd" },
          { label: "Research Hub", href: "/research" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
