import Link from "next/link";
import { Section, SectionHeader, Card, CardBody } from "@/components/ui";
import { calculators } from "@/lib/data";
import { Calculator, TrendingUp, Landmark, Receipt, PiggyBank, Wrench } from "lucide-react";

const CAT_ICONS: Record<string, typeof Calculator> = {
  Investing: TrendingUp, Loans: Landmark, Tax: Receipt, Savings: PiggyBank, Utility: Wrench, Health: Calculator,
};

const categories = ["Investing", "Loans", "Tax", "Savings", "Utility", "Health"] as const;

export default function FinanceCategories() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="Explore"
        title="Explore Every Aspect of Personal Finance"
        subline="8 categories covering everything from investments to taxes."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.flatMap((cat) => {
          const items = calculators.filter((c) => c.category === cat);
          const Icon = CAT_ICONS[cat] || Calculator;
          const visible = items.slice(0, 2);
          return visible.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-4 group">
              <Icon className="h-8 w-8 text-brand" />
              <p className="text-sm font-semibold text-text mt-2">{c.title}</p>
              <p className="text-xs text-text-muted mt-0.5">{c.short}</p>
            </Link>
          ));
        })}
      </div>
    </Section>
  );
}
