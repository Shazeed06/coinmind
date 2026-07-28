import Link from "next/link";
import { Section, SectionHeader, Card, CardBody } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const ROADMAPS = [
  {
    title: "For Starters",
    items: [
      { label: "Build an Emergency Fund", href: "/blog/emergency-fund-guide" },
      { label: "Start Your First SIP", href: "/calculators/sip" },
      { label: "Understand Your Salary", href: "/calculators/take-home-salary" },
      { label: "Open a PPF Account", href: "/calculators/ppf" },
      { label: "File Your First ITR", href: "/calculators/income-tax" },
    ],
  },
  {
    title: "For Growing",
    items: [
      { label: "Diversify Beyond FDs", href: "/calculators/fd" },
      { label: "Plan Your Retirement", href: "/calculators/retirement" },
      { label: "Save Capital Gains Tax", href: "/calculators/capital-gains" },
      { label: "Step-Up Your SIP", href: "/calculators/step-up-sip" },
      { label: "Calculate Home Loan EMI", href: "/calculators/home-loan-eligibility" },
    ],
  },
  {
    title: "For Retirement",
    items: [
      { label: "NPS Calculator", href: "/calculators/nps" },
      { label: "EPF Maturity", href: "/calculators/epf" },
      { label: "SWP Plan", href: "/calculators/swp" },
      { label: "SCSS for Seniors", href: "/calculators/scss" },
      { label: "Post Office MIS", href: "/calculators/post-office-mis" },
    ],
  },
  {
    title: "For Advanced",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROADMAPS.map((r) => (
          <Card key={r.title}>
            <CardBody>
              <h3 className="text-base font-semibold text-text text-center sm:text-left">{r.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {r.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-text-muted hover:text-brand transition-colors flex items-center gap-1.5 justify-center sm:justify-start">
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
