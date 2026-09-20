import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "income-tax")!;
export const metadata = calcMeta(
  "income-tax",
  "Income Tax Calculator India FY 2026-27 – New vs Old Regime",
  CALC.blurb
);

export default function Page() {
  return (
    <CalcPage
      slug="income-tax"
      title="Income Tax Calculator"
      subtitle="Estimate your income tax under India's new and old regimes for FY 2026-27 and see which saves you more."
      calculator={<IncomeTaxCalculator />}
      sources={[
        { label: "Income Tax Department, Government of India", href: "https://www.incometaxindia.gov.in" },
        { label: "Finance Act 2026 (Union Budget)", href: "https://www.indiabudget.gov.in" },
      ]}
      intro="India has two income tax regimes since FY 2020-21: the old regime with its familiar deductions and exemptions, and the new regime with lower slab rates but fewer deductions. From FY 2023-24 onwards, the new regime became the default. This calculator lets you enter your gross income and common deductions to instantly compare your tax liability under both regimes and see which one saves you more for FY 2026-27."
      how={{
        heading: "How income tax is calculated",
        body: (
          <>
            <p>
              Under both regimes, income tax is levied at slab rates on your taxable income. In the new regime, the standard deduction of ₹75,000 (for salaried individuals from FY 2024-25 onward) is allowed. In the old regime, you can claim 80C (up to ₹1.5L), 80D, HRA, home loan interest and other deductions.
            </p>
            <p>
              After computing slab-wise tax, a Section 87A rebate of up to ₹25,000 is available for income below ₹7 lakh (new regime) or ₹5 lakh (old regime). Surcharge applies above ₹50 lakh. A 4% health and education cess applies to total tax.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Tax = Slab Tax + Surcharge − Rebate (87A) + 4% Cess
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Which regime is better for me?",
          a: "It depends on your deductions. If your Section 80C, 80D, HRA, home loan interest and other deductions exceed a certain breakeven amount (which varies by income level), the old regime saves more. This calculator computes both instantly.",
        },
        {
          q: "What is the standard deduction in 2026-27?",
          a: "Salaried employees and pensioners can claim a standard deduction of ₹75,000 under the new regime and ₹50,000 under the old regime. This is automatically included in this calculator.",
        },
        {
          q: "Does the calculator include surcharge?",
          a: "Yes. Surcharge of 10% applies above ₹50 lakh, 15% above ₹1 crore, 25% above ₹2 crore and 37% above ₹5 crore (old regime). The marginal relief cap is applied for the new regime.",
        },
        {
          q: "Is this calculator accurate for all income types?",
          a: "This calculator is designed for salaried income with common deductions. For complex situations — business income, capital gains, multiple house properties, foreign income — consult a Chartered Accountant.",
        },
        {
          q: "Can I switch regimes every year?",
          a: "Salaried individuals can switch regimes every year. If you have business income, you can only switch once from old to new and cannot return unless you close the business.",
        },
      ]}
    />
  );
}
