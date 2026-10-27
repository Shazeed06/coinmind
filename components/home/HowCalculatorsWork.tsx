import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";

const STEPS = [
  { n: "01", title: "Pick a calculator", desc: "Choose from 54+ tools — SIP, income tax, EMI, FD, PPF and more." },
  { n: "02", title: "Enter your numbers", desc: "Type your amounts, rates and timeframes. Every input is clearly labelled." },
  { n: "03", title: "See instant results", desc: "A full breakdown with charts, year-wise tables and the formula shown." },
];

export default function HowCalculatorsWork() {
  return (
    <Section variant="white">
      <SectionIntro
        eyebrow="How it works"
        title="Three steps to an answer"
        subline="No finance background needed — from your numbers to a clear result in seconds."
      />
      <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-bg p-7">
            <span className="font-display text-3xl font-extrabold tracking-tight text-brand/30">
              {s.n}
            </span>
            <h3 className="mt-4 text-lg font-bold text-text">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
