import Link from "next/link";
import { calculators, posts } from "@/lib/data";
import { IconArrow, IconCalculator, IconSparkle } from "@/components/icons";

const liveCalcs = calculators.filter((c) => c.live);
const CALC_COUNT = liveCalcs.length;
const GUIDE_COUNT = posts.length;

const SEARCHES = [
  { label: "SIP Calculator", href: "/calculators/sip" },
  { label: "EMI Calculator", href: "/calculators/emi" },
  { label: "Income Tax Calculator", href: "/calculators/income-tax" },
  { label: "FD Calculator", href: "/calculators/fd" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-soft/30 via-transparent to-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pt-28 sm:pb-28">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest-soft bg-card/80 px-4 py-1.5 text-xs font-medium text-forest backdrop-blur-sm">
              <IconSparkle className="h-3.5 w-3.5" /> India&apos;s Personal Finance Knowledge Platform
            </span>

            <h1 className="mt-6 font-display text-[2.8rem] leading-[1.04] sm:text-6xl lg:text-7xl font-600 text-ink tracking-tight">
              India&apos;s Smartest{" "}
              <span className="relative whitespace-nowrap">
                <span className="text-forest">Personal Finance</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9C40 3 120 3 198 8" stroke="var(--color-brass)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Platform
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink-soft max-w-2xl">
              Learn, calculate, compare, and plan every financial decision with{" "}
              <strong className="text-ink">{CALC_COUNT} free calculators</strong>,{" "}
              <strong className="text-ink">{GUIDE_COUNT} expert guides</strong>, and{" "}
              <strong className="text-ink">AI-powered planning resources</strong>. No sign-up.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/calculators" className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-sm font-semibold text-white hover:bg-forest-deep transition-all shadow-xl shadow-forest/20 hover:shadow-forest/30">
                <IconCalculator className="h-4 w-4" /> Explore Calculators <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card/80 px-8 py-4 text-sm font-semibold text-ink hover:border-forest hover:text-forest backdrop-blur-sm transition-all">
                Learn Finance
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-card/70 backdrop-blur-sm p-2 flex items-center gap-2 max-w-lg">
              <IconCalculator className="h-4 w-4 text-ink-faint ml-2 shrink-0" />
              <span className="text-sm text-ink-faint">Search calculators, guides, investments&hellip;</span>
              <span className="ml-auto text-[11px] text-ink-faint bg-paper-2 px-2 py-1 rounded-md border border-line">Go</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {SEARCHES.map((s) => (
                <Link key={s.href} href={s.href} className="rounded-full bg-card border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-forest hover:text-forest transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { n: `${CALC_COUNT}+`, l: "Financial Calculators" },
                { n: `${GUIDE_COUNT}+`, l: "Expert Guides" },
                { n: "10,000+", l: "Calculations Monthly" },
                { n: "99.9%", l: "Accuracy" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl font-600 text-ink">{s.n}</dt>
                  <dd className="text-xs text-ink-faint">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 rounded-[32px] bg-forest-soft/40 blur-2xl -z-10" />
            <div className="rounded-2xl border border-line bg-card shadow-2xl overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-forest via-brass to-forest" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">SIP Calculator</span>
                  <span className="rounded-full bg-forest-soft px-2.5 py-0.5 text-[11px] font-semibold text-forest">Live</span>
                </div>
                <div className="space-y-4">
                  {[
                    { l: "Monthly investment", v: "₹10,000" },
                    { l: "Expected return", v: "12% p.a." },
                    { l: "Time period", v: "15 years" },
                  ].map((r) => (
                    <div key={r.l}>
                      <div className="flex justify-between text-sm mb-1"><span className="text-ink-soft">{r.l}</span><span className="font-semibold text-ink">{r.v}</span></div>
                      <div className="h-1.5 rounded-full bg-line overflow-hidden"><div className="h-full w-3/5 rounded-full bg-gradient-to-r from-forest to-brass" /></div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-paper-2 p-4">
                  <p className="text-xs text-ink-faint uppercase tracking-wide font-medium">Projected Corpus</p>
                  <p className="font-display text-3xl font-600 text-forest mt-1">₹50.4 Lakh</p>
                  <div className="flex gap-4 mt-2 text-xs text-ink-soft">
                    <span>Invested <strong className="text-ink">₹18.0L</strong></span>
                    <span className="text-line-strong">|</span>
                    <span>Returns <strong className="text-forest">₹32.4L</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
