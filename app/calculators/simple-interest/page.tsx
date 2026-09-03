import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import SimpleInterestCalculator from "@/components/calc/SimpleInterestCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "simple-interest")!;
export const metadata = calcMeta("simple-interest", CALC.title + " - Interest & Amount", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="simple-interest"
      title="Simple Interest Calculator"
      subtitle="Find the interest and total amount on any loan or deposit in seconds."
      calculator={<SimpleInterestCalculator />}
      intro="Simple interest is interest charged only on the original principal, never on interest already earned. It keeps the maths predictable, which is why it turns up on short-term personal loans, most car loans, gold loans and some fixed deposits. This simple interest calculator takes your principal, annual rate and time in years and instantly returns the interest, the total amount you will pay or receive, and how the same money would have grown if it compounded instead. Seeing both side by side makes the difference obvious: over a year or two the gap is small, but stretch the period out and compounding pulls decisively ahead. Use it to check a lender's quote, verify a deposit payout, or work a school or competitive exam question."
      how={{
        heading: "How simple interest is calculated",
        body: (
          <>
            <p>The formula is:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              SI = (P × R × T) / 100
            </p>
            <p>
              Where <strong>P</strong> is the principal, <strong>R</strong> is
              the annual interest rate, and <strong>T</strong> is the time in
              years. The total amount is simply <strong>P + SI</strong>. Because
              the interest never earns interest of its own, it grows in a
              straight line rather than a curve.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is the simple interest formula?",
          a: "Simple interest is SI = (P × R × T) / 100, where P is the principal, R is the yearly rate and T is the time in years. The total amount you owe or receive is the principal plus this interest.",
        },
        {
          q: "How is simple interest different from compound interest?",
          a: "Simple interest is charged only on the original principal, so it stays flat each year. Compound interest is charged on the principal plus any interest already added, so it grows faster over time. This calculator shows both so you can compare.",
        },
        {
          q: "Where is simple interest actually used?",
          a: "It's common on short-term personal loans, most car and auto loans, some student loans and certain fixed deposits. Lenders like it because the interest is easy to understand and doesn't balloon.",
        },
        {
          q: "Does more frequent payment change simple interest?",
          a: "No. Unlike compound interest, simple interest depends only on the principal, rate and total time, not on how often you pay. The formula gives the same figure regardless of payment frequency.",
        },
        {
          q: "Is simple or compound interest better for me?",
          a: "As a borrower, simple interest is cheaper because interest never stacks on interest. As a saver or investor, compound interest is better because your returns start earning their own returns. Try our compound interest calculator to see the gap.",
        },
        {
          q: "How do I calculate simple interest for months or days?",
          a: "Convert the period into a fraction of a year and use it as T. For 9 months, T is 9 ÷ 12 = 0.75, so ₹1,00,000 at 10% earns (100000 × 10 × 0.75) ÷ 100 = ₹7,500. For days, divide by 365, so 90 days gives T = 0.2466. Enter the period as a decimal number of years above and the calculator handles the rest.",
        },
        {
          q: "What is the simple interest on ₹1,00,000 for 3 years at 10%?",
          a: "Apply SI = (P × R × T) ÷ 100, which gives (100000 × 10 × 3) ÷ 100 = ₹30,000, for a total amount of ₹1,30,000. The same money at 10% compounded annually would grow to about ₹1,33,100, so compounding adds roughly ₹3,100 over three years. The gap widens quickly with time: over ten years it runs to tens of thousands on the same principal.",
        },
        {
          q: "How do I find the rate or the time from simple interest?",
          a: "Rearrange the same formula. Rate = (SI × 100) ÷ (P × T), and Time = (SI × 100) ÷ (P × R). If ₹50,000 earned ₹12,000 of interest over 4 years, the rate is (12000 × 100) ÷ (50000 × 4) = 6%. This is a useful check on a lender's quote, because it converts a flat rupee interest figure into the annual percentage you are actually being charged.",
        },
        {
          q: "Do Indian banks use simple or compound interest?",
          a: "Mostly compound. Savings accounts, fixed deposits and recurring deposits generally compound quarterly, and home, car and personal loan EMIs use a reducing-balance method rather than plain simple interest. Simple interest still appears on some short-tenure loans, gold loans, certain non-cumulative deposits that pay interest out rather than reinvesting it, and on the interest charged for delayed tax payments. Always ask which method applies before comparing two quotes.",
        },
      ]}
    />
  );
}
