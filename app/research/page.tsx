import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Historical Finance Data India – Tax Slabs, Interest Rate History | CoinMind Research",
  description: "Free access to India's historical finance data: income tax slab history, PPF/EPF/NPS rate history, RBI repo rate timeline, inflation series, and more.",
  alternates: { canonical: `${site.url}/research` },
  openGraph: {
    title: "Historical Finance Data India | CoinMind Research",
    description: "India's historical tax slabs, PPF rate history, RBI repo rates, inflation data — all free, sourced from official government records.",
    url: `${site.url}/research`,
  },
};

const RESEARCH_SECTIONS = [
  {
    title: "Income Tax History",
    icon: "📊",
    desc: "How India's tax slabs have changed since 2014 — both old and new regimes.",
    items: [
      { label: "New Regime Tax Slabs: FY 2020–21 to FY 2026–27", href: "/research/income-tax-slabs-history", live: true },
      { label: "Old Regime Tax Slabs History", href: "/research/old-regime-slabs-history", live: false },
      { label: "Section 80C Limit History", href: "/research/80c-limit-history", live: false },
      { label: "Standard Deduction History", href: "/research/standard-deduction-history", live: false },
    ],
  },
  {
    title: "Savings Scheme Rates",
    icon: "💰",
    desc: "Government-declared interest rates for PPF, EPF, NSC, SCSS, and Post Office schemes over the years.",
    items: [
      { label: "PPF Interest Rate History (2000–2026)", href: "/research/ppf-rate-history", live: true },
      { label: "EPF Interest Rate History", href: "/research/epf-rate-history", live: true },
      { label: "NSC Interest Rate History", href: "/research/nsc-rate-history", live: false },
      { label: "SCSS Interest Rate History", href: "/research/scss-rate-history", live: false },
      { label: "Post Office MIS Rate History", href: "/research/post-office-mis-rate-history", live: false },
      { label: "Sukanya Samriddhi Rate History", href: "/research/sukanya-samriddhi-rate-history", live: false },
    ],
  },
  {
    title: "RBI & Monetary Policy",
    icon: "🏦",
    desc: "Reserve Bank of India repo rate decisions, CRR/SLR history, and policy timelines.",
    items: [
      { label: "RBI Repo Rate History (2000–2026)", href: "/research/rbi-repo-rate-history", live: true },
      { label: "RBI Reverse Repo Rate History", href: "/research/reverse-repo-rate-history", live: false },
      { label: "CRR & SLR History", href: "/research/crr-slr-history", live: false },
    ],
  },
  {
    title: "Inflation Data",
    icon: "📈",
    desc: "India CPI and WPI inflation series, year-by-year.",
    items: [
      { label: "India CPI Inflation History (2013–2026)", href: "/research/cpi-inflation-history", live: false },
      { label: "India WPI Inflation History", href: "/research/wpi-inflation-history", live: false },
      { label: "Food Inflation vs. Headline CPI", href: "/research/food-vs-headline-inflation", live: false },
    ],
  },
  {
    title: "NPS & Pension",
    icon: "🎯",
    desc: "NPS scheme returns, annuity rates, and historical performance data.",
    items: [
      { label: "NPS Tier-I Returns by Fund Manager (5-year)", href: "/research/nps-returns-history", live: false },
      { label: "Annuity Rates in India", href: "/research/annuity-rates", live: false },
    ],
  },
];

export default function ResearchPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass mb-2">CoinMind Research</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Historical Finance Data Hub</h1>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Free access to India&apos;s official financial data — tax slab history, savings scheme rates, RBI policy decisions, and inflation series — all sourced from government records.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {RESEARCH_SECTIONS.map((section) => (
          <section key={section.title}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h2 className="font-display text-xl text-ink">{section.title}</h2>
                <p className="text-sm text-ink-faint">{section.desc}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                item.live ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-line bg-card px-4 py-3 text-sm font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                  >
                    {item.label}
                    <span className="ml-2 text-ink-faint">→</span>
                  </Link>
                ) : (
                  <span
                    key={item.href}
                    className="rounded-xl border border-line bg-card px-4 py-3 text-sm font-medium text-ink-faint cursor-default flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="ml-2 text-xs bg-line text-ink-faint px-2 py-0.5 rounded-full">Coming soon</span>
                  </span>
                )
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Data sources note */}
      <div className="mt-12 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink mb-3">Data sources</h2>
        <p className="text-sm text-ink-soft mb-4">
          All data on CoinMind Research is sourced from official Indian government and regulatory bodies. We do not modify or estimate historical data — figures are transcribed directly from official notifications and press releases.
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-ink-faint">
          {[
            "Income Tax Department – incometaxindia.gov.in",
            "Reserve Bank of India – rbi.org.in",
            "Ministry of Finance – finmin.nic.in",
            "EPFO – epfindia.gov.in",
            "PFRDA / NPS Trust – npstrust.org.in",
            "National Savings Institute – nsiindia.gov.in",
            "MOSPI (Inflation data) – mospi.gov.in",
            "Finance Ministry Budget documents",
          ].map((s) => (
            <div key={s} className="flex items-start gap-1.5">
              <span className="text-forest mt-0.5">✓</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
