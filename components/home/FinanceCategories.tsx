import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui";
import { calculators } from "@/lib/data";
import { Calculator, TrendingUp, Landmark, Receipt, PiggyBank, Wrench } from "lucide-react";

const CAT_ICONS: Record<string, typeof Calculator> = {
  Investing: TrendingUp, Loans: Landmark, Tax: Receipt, Savings: PiggyBank, Utility: Wrench, Health: Calculator,
};

const cats = (["Investing", "Loans", "Tax", "Savings", "Utility", "Health"] as const)
  .map((cat) => ({ cat, items: calculators.filter((c) => c.category === cat).slice(0, 2) }))
  .filter(({ items }) => items.length);

export default function FinanceCategories() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="Explore"
        title="Explore Every Aspect of Personal Finance"
        subline="8 categories covering everything from investments to taxes."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </Section>
  );
}
