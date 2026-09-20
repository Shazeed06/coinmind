import Link from "next/link";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { calculators } from "@/lib/data";
import { Calculator, TrendingUp, Landmark, Receipt, PiggyBank, Wrench } from "lucide-react";

const HUBS = [
  { label: "Investing", href: "/investing" },
  { label: "SIP & Mutual Funds", href: "/sip" },
  { label: "Loans", href: "/loans" },
  { label: "Savings", href: "/savings" },
  { label: "Retirement", href: "/retirement" },
  { label: "Income Tax", href: "/income-tax" },
  { label: "Budgeting", href: "/budgeting" },
  { label: "Credit Score", href: "/credit-score" },
  { label: "Gold", href: "/gold" },
];

const CAT_ICONS: Record<string, typeof Calculator> = {
  Investing: TrendingUp, Loans: Landmark, Tax: Receipt, Savings: PiggyBank, Utility: Wrench, Health: Calculator,
};

const cats = (["Investing", "Loans", "Tax", "Savings", "Utility"] as const)
  .map((cat) => ({ cat, items: calculators.filter((c) => c.category === cat && c.live).slice(0, 2) }))
  .filter(({ items }) => items.length);

export default function FinanceCategories() {
  return (
    <Section variant="alt">
      <SectionIntro
        eyebrow="Explore"
        title="Explore Every Aspect of Personal Finance"
        subline="8 categories covering everything from investments to taxes."
      />
      <p className="body text-text-muted text-center max-w-[720px] mx-auto mb-10">
        From SIP and FD calculators to income tax and loan EMI estimators — browse by category to find the tool that fits your financial goal.
      </p>
      {/* Five categories x two calculators = ten cards. At lg:grid-cols-4 that
          left two orphans stranded on a third row; five columns lands them as
          two clean rows and makes this the one tighter, wider grid on the page
          instead of a fourth repeat of the same 4-up card layout. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cats.flatMap(({ cat, items }) => {
          const Icon = CAT_ICONS[cat] || Calculator;
          return items.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-4 group">
              <Icon className="h-8 w-8 text-brand mx-auto sm:mx-0" />
              <p className="text-sm font-semibold text-text mt-2 text-center sm:text-left">{c.title}</p>
              <p className="text-xs text-text-muted mt-0.5 text-center sm:text-left">{c.short}</p>
            </Link>
          ));
        })}
      </div>
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        <span className="text-xs text-text-muted self-center">Explore topics:</span>
        {HUBS.map((h) => (
          <Link
            key={h.href}
            href={h.href}
            className="inline-flex items-center rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-muted hover:border-brand hover:text-brand transition-colors"
          >
            {h.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
