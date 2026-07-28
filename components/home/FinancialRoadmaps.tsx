import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui";
import { Sprout, TrendingUp, Sunset, Target, ArrowRight } from "lucide-react";

const ROADMAPS = [
  {
    icon: Sprout,
    title: "For Starters",
    caption: "Just beginning your financial journey",
    items: [
      { label: "Build an Emergency Fund", href: "/blog/emergency-fund-guide" },
      { label: "Start Your First SIP", href: "/calculators/sip" },
      { label: "Understand Your Salary", href: "/calculators/take-home-salary" },
      { label: "Open a PPF Account", href: "/calculators/ppf" },
      { label: "File Your First ITR", href: "/calculators/income-tax" },
    ],
  },
  {
    icon: TrendingUp,
    title: "For Growing",
    caption: "Building wealth and diversifying",
    items: [
      { label: "Diversify Beyond FDs", href: "/calculators/fd" },
      { label: "Plan Your Retirement", href: "/calculators/retirement" },
      { label: "Save Capital Gains Tax", href: "/calculators/capital-gains" },
      { label: "Step-Up Your SIP", href: "/calculators/step-up-sip" },
      { label: "Calculate Home Loan EMI", href: "/calculators/home-loan-eligibility" },
    ],
  },
  {
    icon: Sunset,
    title: "For Retirement",
    caption: "Securing your golden years",
    items: [
      { label: "NPS Calculator", href: "/calculators/nps" },
      { label: "EPF Maturity", href: "/calculators/epf" },
      { label: "SWP Plan", href: "/calculators/swp" },
      { label: "SCSS for Seniors", href: "/calculators/scss" },
      { label: "Post Office MIS", href: "/calculators/post-office-mis" },
    ],
  },
  {
    icon: Target,
    title: "For Advanced",
    caption: "Deep dive into advanced planning",
    items: [
      { label: "CAGR & XIRR Explained", href: "/calculators/cagr" },
      { label: "Goal SIP Planning", href: "/calculators/goal-sip" },
      { label: "LTCG Planning", href: "/calculators/capital-gains" },
      { label: "Currency Converter", href: "/calculators/currency-converter" },
      { label: "Compound Interest", href: "/calculators/compound-interest" },
    ],
  },
];

export default function FinancialRoadmaps() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="Journeys"
        title="Your Financial Journey, Mapped Out"
        subline="Start where you are — we will show you the next step."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {ROADMAPS.map((r) => (
          <div key={r.title} className="card flex flex-col h-full p-6">
            <r.icon className="h-8 w-8 text-brand" />
            <h3 className="text-lg font-semibold text-text mt-2">{r.title}</h3>
            <p className="text-sm text-text-muted mt-1">{r.caption}</p>
            <div className="mt-5 space-y-1 flex-1">
              {r.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 h-9 text-sm text-text-muted hover:text-brand transition-colors rounded-input hover:bg-bg-alt px-2 -mx-2"
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-border">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                View roadmap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
