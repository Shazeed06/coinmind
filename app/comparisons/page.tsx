import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Comparisons India – SIP vs FD, PPF vs NPS, Old vs New Tax Regime | CoinMind",
  description: "Side-by-side financial comparisons for Indian investors: SIP vs FD, PPF vs NPS, old vs new tax regime, rent vs buy, loan prepayment vs investing, and more.",
  alternates: { canonical: `${site.url}/comparisons` },
  openGraph: {
    title: "Financial Comparisons India | CoinMind",
    description: "Make smarter money decisions with data-driven comparisons of India's most important financial choices.",
    url: `${site.url}/comparisons`,
  },
};

const COMPARISONS = [
  {
    category: "Investments",
    items: [
      {
        title: "SIP vs FD",
        desc: "Mutual fund SIP vs fixed deposit — returns, risk, liquidity and tax implications compared.",
        href: "/comparisons/sip-vs-fd",
        badge: "Most read",
      },
      {
        title: "PPF vs FD",
        desc: "Public Provident Fund vs Fixed Deposit — which is better for long-term tax-free savings?",
        href: "/comparisons/ppf-vs-fd",
      },
      {
        title: "PPF vs NPS",
        desc: "Compare India's two flagship retirement savings instruments on returns, lock-in and tax.",
        href: "/comparisons/ppf-vs-nps",
      },
      {
        title: "NPS vs EPF",
        desc: "Employee Provident Fund vs National Pension System — for salaried Indians planning retirement.",
        href: "/comparisons/nps-vs-epf",
      },
      {
        title: "SIP vs Lumpsum",
        desc: "Monthly SIP or one-time lumpsum investment — which strategy suits your situation?",
        href: "/comparisons/sip-vs-lumpsum",
      },
      {
        title: "Mutual Fund vs Stocks",
        desc: "DIY equity investing vs mutual funds — risk, effort, returns and suitability compared.",
        href: "/comparisons/mutual-fund-vs-stocks",
      },
    ],
  },
  {
    category: "Tax",
    items: [
      {
        title: "Old Regime vs New Regime",
        desc: "Which income tax regime saves you more? Side-by-side breakeven analysis by income and deductions.",
        href: "/comparisons/old-vs-new-tax-regime",
        badge: "Most read",
      },
      {
        title: "ELSS vs PPF for 80C",
        desc: "Best 80C investment — ELSS mutual funds or PPF? Returns, lock-in and tax treatment compared.",
        href: "/comparisons/elss-vs-ppf",
      },
      {
        title: "NPS Tier-I vs Tier-II",
        desc: "What is the difference between NPS Tier-I and Tier-II accounts, and when to use each?",
        href: "/comparisons/nps-tier-1-vs-tier-2",
      },
    ],
  },
  {
    category: "Loans & Big Decisions",
    items: [
      {
        title: "Rent vs Buy",
        desc: "Should you rent or buy a home in India? A financial model with city-specific price-to-rent ratios.",
        href: "/calculators/rent-vs-buy",
        badge: "Calculator",
      },
      {
        title: "Home Loan Prepayment vs Investing",
        desc: "Should you prepay your home loan or invest the extra EMI? A post-tax return comparison.",
        href: "/comparisons/loan-prepayment-vs-investing",
      },
      {
        title: "FD vs Debt Mutual Fund",
        desc: "Fixed deposits vs debt mutual funds — post-tax returns, liquidity and risk profile compared.",
        href: "/comparisons/fd-vs-debt-mutual-fund",
      },
    ],
  },
  {
    category: "Insurance",
    items: [
      {
        title: "Term vs ULIP vs Endowment",
        desc: "Pure term insurance vs ULIPs vs traditional endowment plans — the total cost of mixing insurance and investment.",
        href: "/comparisons/term-vs-ulip-vs-endowment",
      },
      {
        title: "Health Insurance: Floater vs Individual",
        desc: "Family floater vs individual health insurance policies — which offers better coverage per rupee?",
        href: "/comparisons/floater-vs-individual-health-insurance",
      },
    ],
  },
];

export default function ComparisonsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass mb-2">Comparisons</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Financial Comparison Engine</h1>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Side-by-side analyses of India&apos;s most important financial choices — built on real numbers, not opinions. Each comparison uses the same metrics so you can make a fair decision.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {COMPARISONS.map((section) => (
          <section key={section.category}>
            <h2 className="font-display text-xl text-ink mb-4 pb-2 border-b border-line">{section.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-line bg-card p-4 hover:border-forest transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-ink group-hover:text-forest transition-colors">{item.title}</h3>
                    {item.badge && (
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${item.badge === "Calculator" ? "bg-forest text-white" : "bg-brass/15 text-brass"}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-faint">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* How comparisons work */}
      <div className="mt-12 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink mb-2">How our comparisons work</h2>
        <p className="text-sm text-ink-soft">
          Every comparison on CoinMind uses real current rates from official sources (RBI, SEBI, Income Tax Dept), shows post-tax returns, and discloses its assumptions. We do not accept payment to favour any product or instrument.
          See our <Link href="/editorial-policy" className="text-forest hover:underline">editorial policy</Link> and{" "}
          <Link href="/affiliate-disclosure" className="text-forest hover:underline">affiliate disclosure</Link>.
        </p>
      </div>
    </main>
  );
}
