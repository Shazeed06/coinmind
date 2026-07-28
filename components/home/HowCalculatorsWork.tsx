import { Section, SectionHeader } from "@/components/ui";
import { Search, Calculator, BarChart3, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: Search, step: "1", title: "Choose Your Calculator", desc: "Pick from 46 calculators — SIP, EMI, income tax, FD, PPF and more." },
  { icon: Calculator, step: "2", title: "Enter Your Numbers", desc: "Type in your amounts, rates and timeframes. Every input is clearly labelled." },
  { icon: BarChart3, step: "3", title: "See Instant Results", desc: "Get your answer immediately with breakdowns, charts and year-wise tables." },
  { icon: CheckCircle, step: "4", title: "Take Action", desc: "Use the insight to open a SIP, apply for a loan, or save on taxes." },
];

export default function HowCalculatorsWork() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="How It Works"
        title="How Our Calculators Work"
        subline="From entering your numbers to actionable insight — in seconds."
      />
      <div className="relative">
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-border" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center text-lg font-bold mx-auto relative z-10">
                {s.step}
              </div>
              <s.icon className="h-8 w-8 text-brand mx-auto mt-4" />
              <h3 className="text-base font-semibold text-text mt-3">{s.title}</h3>
              <p className="text-sm text-text-muted mt-1">{s.desc}</p>
              {i === 2 && (
                <div className="mt-4 p-3 bg-bg-alt rounded-card border border-border text-left">
                  <p className="text-xs font-mono text-text-muted">
                    FV = P × [((1+r)<sup>n</sup> − 1) / r] × (1+r)
                  </p>
                  <p className="text-sm font-semibold text-accent mt-1">Result: ₹50.4 Lakh</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
