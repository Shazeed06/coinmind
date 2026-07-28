import { IconCalculator, IconChart, IconCheck, IconSparkle } from "@/components/icons";

const STEPS = [
  { icon: IconCalculator, title: "Enter Your Numbers", body: "Type in your loan amount, monthly SIP, or investment value. Every field is clearly labelled with examples." },
  { icon: IconChart, title: "Apply Verified Formulas", body: "Our calculators use RBI, SEBI, and Income Tax approved formulas — updated after every Budget cycle." },
  { icon: IconSparkle, title: "See Instant Results", body: "Get your maturity value, EMI schedule, tax liability, or investment return in real time with interactive charts." },
  { icon: IconCheck, title: "Make Informed Decisions", body: "Compare scenarios, adjust variables, and understand what the numbers mean for your financial goals." },
];

export default function HowCalculatorsWork() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Process</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            How Our Calculators Work
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Every calculator follows the same transparent process — from input to insight. No black boxes, no hidden assumptions.
          </p>
          <div className="mt-8 space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <span className="shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest text-sm font-bold">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-forest-soft/40 to-brass-soft/30 rounded-3xl border border-line p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-3 w-3 rounded-full bg-forest" />
            <span className="h-3 w-3 rounded-full bg-brass" />
            <span className="h-3 w-3 rounded-full bg-line-strong" />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-card/80 backdrop-blur-sm border border-line p-4">
              <p className="text-xs text-ink-faint uppercase tracking-wide font-medium">Input</p>
              <p className="text-sm text-ink mt-1">Loan Amount: ₹50,00,000 | Rate: 8.5% | Tenure: 20 years</p>
            </div>
            <div className="flex items-center justify-center text-ink-faint">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <div className="rounded-xl bg-card/80 backdrop-blur-sm border border-line p-4">
              <p className="text-xs text-ink-faint uppercase tracking-wide font-medium">Formula</p>
              <p className="text-sm text-ink mt-1 font-mono">EMI = P × r × (1+r)^n / ((1+r)^n − 1)</p>
            </div>
            <div className="flex items-center justify-center text-ink-faint">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <div className="rounded-xl bg-card/80 backdrop-blur-sm border border-line p-4">
              <p className="text-xs text-ink-faint uppercase tracking-wide font-medium">Result</p>
              <p className="text-lg font-semibold text-forest mt-1">Monthly EMI: ₹43,391</p>
              <p className="text-xs text-ink-faint mt-1">Total Interest: ₹54,13,840 | Total Payment: ₹1,04,13,840</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
