import Link from "next/link";
import { TrendingUp, Receipt, Landmark, ArrowRight } from "lucide-react";

const TOP_CALCS = [
  {
    slug: "sip",
    icon: TrendingUp,
    label: "SIP Calculator",
    hook: "Plan your mutual fund SIP returns",
    detail: "Enter monthly amount, expected return and duration to see your projected corpus with step-up, LTCG tax and inflation adjustment.",
    cta: "Calculate SIP Returns",
  },
  {
    slug: "income-tax",
    icon: Receipt,
    label: "Income Tax Calculator",
    hook: "Compare new vs old tax regime",
    detail: "See which regime saves you more for FY 2026-27 with full slab breakup, deductions, rebate and cess calculation.",
    cta: "Compare Tax Regimes",
  },
  {
    slug: "emi",
    icon: Landmark,
    label: "EMI Calculator",
    hook: "Know your monthly loan payment",
    detail: "Works for home loans, car loans and personal loans. See your EMI, total interest and amortisation schedule instantly.",
    cta: "Calculate EMI",
  },
];

export default function QuickCalcCTA() {
  return (
    <section className="section-pad pb-0 bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOP_CALCS.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="group relative rounded-2xl border-2 border-border bg-bg p-5 sm:p-6 transition-all hover:border-brand hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <c.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-text">{c.label}</p>
              </div>
              <p className="mt-3 text-base font-semibold text-text leading-snug">
                {c.hook}
              </p>
              <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
                {c.detail}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5 transition-all">
                {c.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
