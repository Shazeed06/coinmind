import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import CompoundInterestCalculator from "@/components/calc/CompoundInterestCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "compound-interest")!;
export const metadata = calcMeta("compound-interest", CALC.title + " - Daily, Monthly & Yearly", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="compound-interest"
      title="Compound Interest Calculator"
      subtitle="Watch how interest on interest turns modest savings into serious money."
      calculator={<CompoundInterestCalculator />}
      intro="Compound interest is interest earned on both your original money and the interest it has already earned. Because each round of interest joins the balance and then earns interest itself, growth speeds up the longer you leave the money alone. That is why a fixed deposit compounded quarterly ends up worth more than the headline rate suggests, and why credit card debt spirals so quickly. This compound interest calculator shows exactly how powerful the effect becomes over time: enter your principal, the annual rate, the number of years and how often interest is added, and it returns your final amount, the total interest earned and how the compounding frequency changes the result."
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
        { q: "Why does compounding frequency matter?", a: "The more often interest is added, the sooner it starts earning its own interest. Monthly compounding beats yearly compounding for the same rate, though the difference is small over short periods." },
        { q: "What's the difference from simple interest?", a: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, so it grows much faster over time." },
        { q: "How can I make compounding work for me?", a: "Start early and stay invested. Time is the most powerful ingredient. Even small amounts grow dramatically over decades." },
        { q: "Does this work for loans too?", a: "Yes. The same maths explains why credit card debt grows so fast. Compounding works against you when you owe money." },
        { q: "What is the Rule of 72?", a: "The Rule of 72 is a mental shortcut for how long money takes to double under compounding: divide 72 by the annual rate. At 8% a year, money roughly doubles in 72 / 8 = 9 years; at 12% it takes about 6 years. It is an approximation that works best for rates between roughly 5% and 15%, so use the calculator above when you need the exact figure." },
        { q: "How much will Rs 1 lakh grow to in 10 years?", a: "At 8% a year compounded annually, Rs 1,00,000 becomes about Rs 2,15,900 in 10 years, so the interest alone is nearly Rs 1.16 lakh. At 12% the same amount grows to roughly Rs 3,10,600. Doubling the time matters more than nudging the rate: at 8% over 20 years the figure reaches about Rs 4,66,100. Enter your own numbers above to test any combination." },
        { q: "Which Indian savings products actually compound?", a: "Bank fixed deposits and recurring deposits are normally compounded quarterly. PPF and EPF credit interest once a year, and that credited interest then earns interest in following years. Savings accounts calculate interest on daily balances but usually pay it quarterly. Mutual funds have no stated interest rate; their compounding shows up as growth in NAV when gains stay invested rather than being withdrawn." },
        { q: "Is compound interest taxable in India?", a: "It depends on the product. Interest on bank fixed and recurring deposits is added to your income and taxed at your slab rate, with the bank deducting TDS once your interest crosses the annual threshold. PPF interest is exempt, and EPF interest is exempt subject to the conditions in the Income Tax Act. Because thresholds and conditions are revised in Budget announcements, check the current position on incometax.gov.in." },
      ]}
    />
  );
}
