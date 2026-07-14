import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/calc/CompoundInterestCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Daily, Monthly & Yearly",
  description:
    "Free compound interest calculator. See how your money grows with monthly, quarterly or yearly compounding for any principal, rate and time.",
  alternates: { canonical: "/calculators/compound-interest" },
};

export default function Page() {
  return (
    <CalcPage
      slug="compound-interest"
      title="Compound Interest Calculator"
      subtitle="Watch how interest on interest turns modest savings into serious money."
      calculator={<CompoundInterestCalculator />}
      intro="Compound interest is interest earned on both your original money and the interest it has already earned. Albert Einstein reportedly called it the eighth wonder of the world. This calculator shows exactly how powerful it becomes over time, and how the compounding frequency changes your result."
      how={{
        heading: "How compound interest works",
        body: (
          <>
            <p>The formula is:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">A = P × (1 + r/n)^(n × t)</p>
            <p>
              Where <strong>P</strong> is the principal, <strong>r</strong> the annual rate, <strong>n</strong> the number of times interest compounds per year, and <strong>t</strong> the number of years. More frequent compounding and more time both increase your final amount.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "Why does compounding frequency matter?", a: "The more often interest is added, the sooner it starts earning its own interest. Monthly compounding beats yearly compounding for the same rate — though the difference is small over short periods." },
        { q: "What's the difference from simple interest?", a: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, so it grows much faster over time." },
        { q: "How can I make compounding work for me?", a: "Start early and stay invested. Time is the most powerful ingredient — even small amounts grow dramatically over decades." },
        { q: "Does this work for loans too?", a: "Yes — the same maths explains why credit card debt grows so fast. Compounding works against you when you owe money." },
      ]}
    />
  );
}
