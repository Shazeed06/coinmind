import Link from "next/link";
import { IconArrow } from "@/components/icons";

const ROADMAPS = [
  { role: "Students", age: "18-24", focus: "Start investing early", href: "/blog/how-to-start-investing-in-india", steps: ["Open a demat account", "Start a ₹500 SIP", "Build credit history", "Learn budgeting"] },
  { role: "Working Professionals", age: "25-40", focus: "Grow wealth systematically", href: "/blog/sip-to-become-crorepati", steps: ["Max 80C deductions", "Build emergency fund", "Increase SIP yearly", "Buy term insurance"] },
  { role: "Families", age: "30-50", focus: "Protect & plan for goals", href: "/blog/emergency-fund-guide", steps: ["Health insurance for all", "Children education fund", "Home loan planning", "Retirement corpus"] },
  { role: "Retirement", age: "50+", focus: "Preserve & withdraw wisely", href: "/blog/fire-retire-early-india", steps: ["Shift to debt funds", "Plan SWP strategy", "Optimise tax in retirement", "Estate planning"] },
  { role: "Business Owners", age: "Any", focus: "Separate business & personal", href: "/blog/how-to-start-investing-in-india", steps: ["GST & TDS compliance", "Business emergency fund", "Retire without selling business", "Tax-efficient withdrawals"] },
  { role: "Home Buyers", age: "25-45", focus: "Plan your biggest purchase", href: "/calculators/home-loan-eligibility", steps: ["Check credit score", "Calculate affordability", "Save 20% down payment", "Compare loan offers"] },
];

export default function FinancialRoadmaps() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Roadmaps</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Your Financial Journey, Mapped Out
        </h2>
        <p className="mt-3 text-ink-soft">Wherever you are in life, we have a roadmap to guide your next financial decision.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROADMAPS.map((r) => (
          <Link key={r.role} href={r.href} className="group rounded-2xl border border-line bg-card p-6 transition-all hover:border-forest hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-forest">{r.role}</span>
                <p className="text-xs text-ink-faint mt-0.5">{r.age} · {r.focus}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {r.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest-soft text-[11px] font-semibold text-forest">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-forest opacity-0 group-hover:opacity-100 transition-opacity">
              View roadmap <IconArrow className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
