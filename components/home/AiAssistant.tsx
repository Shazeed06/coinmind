import Link from "next/link";
import { IconArrow, IconSparkle } from "@/components/icons";

const QUESTIONS = [
  { q: "How much should I invest each month to reach ₹1 crore?", href: "/blog/sip-to-become-crorepati" },
  { q: "How much home loan EMI can I afford on my salary?", href: "/calculators/home-loan-eligibility" },
  { q: "Can I retire early in India? What corpus do I need?", href: "/blog/fire-retire-early-india" },
  { q: "How much income tax will I pay under the new regime?", href: "/calculators/income-tax" },
  { q: "Should I invest in FD or mutual funds?", href: "/blog/sip-vs-lumpsum" },
  { q: "Which tax regime is better for me — old or new?", href: "/tax-regime-break-even" },
];

export default function AiAssistant() {
  return (
    <section className="bg-gradient-to-br from-forest-deep to-blue-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
              <IconSparkle className="h-3.5 w-3.5" /> AI-Powered Financial Assistant
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-600 leading-tight">
              Get Instant Answers to Your Money Questions
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Our AI assistant connects you to the right calculator, guide, or comparison for every financial question. No searching, no scrolling — just clear answers.
            </p>
            <Link
              href="/ai-assistant"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-all"
            >
              Try the AI Assistant <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-white text-xs font-bold">AI</span>
              <span className="text-sm font-medium">CoinMind Assistant</span>
              <span className="ml-auto text-xs text-white/40">Online</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/10 p-3.5 text-sm max-w-[85%]">
                How much should I invest each month to reach ₹1 crore in 20 years?
              </div>
              <div className="rounded-xl bg-forest/30 p-3.5 text-sm max-w-[90%] ml-auto">
                With a 12% expected annual return, a monthly SIP of approximately ₹10,000 would grow to ₹1 crore in 20 years. Use our SIP calculator to see different scenarios.
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              {QUESTIONS.slice(0, 3).map((q) => (
                <Link key={q.q} href={q.href} className="block rounded-lg bg-white/5 px-3.5 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  {q.q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
