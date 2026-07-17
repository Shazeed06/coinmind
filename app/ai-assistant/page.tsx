import type { Metadata } from "next";
import AiMoneyChat from "@/components/AiMoneyChat";
import { IconSparkle } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Free AI Money Assistant — Ask Anything" },
  description:
    "A free AI assistant for money and AI questions — investing, taxes, budgeting, saving and choosing AI tools. Instant answers, no sign-up.",
  alternates: { canonical: "/ai-assistant" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
      <header className="pt-14 pb-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconSparkle className="h-3.5 w-3.5" /> Free AI Assistant
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Your free AI money assistant
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
          Ask anything about investing, taxes, saving, budgeting or AI tools —
          and get a clear, instant answer. No sign-up, no cost.
        </p>
      </header>

      <AiMoneyChat />

      <section className="mt-14 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-600 text-ink">
          What can it help with?
        </h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-ink-soft">
          {[
            "Explain SIP, mutual funds, FD, PPF and other investments in simple terms",
            "Compare the new vs old income tax regime for your situation",
            "Help you budget, save more and build an emergency fund",
            "Suggest which AI tool fits a task — and how to use it well",
            "Break down financial jargon into plain English",
            "Point you to the right free CoinMind calculator",
          ].map((t) => (
            <div key={t} className="rounded-xl border border-line bg-card p-4">
              {t}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-faint leading-relaxed">
          This assistant gives general, educational information — not personalised
          financial advice. Always verify figures and, for major decisions,
          consider a qualified professional.
        </p>
      </section>
    </div>
  );
}
