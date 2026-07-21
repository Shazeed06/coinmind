import type { Metadata } from "next";
import SimpleInterestCalculator from "@/components/calc/SimpleInterestCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Simple Interest Calculator — Interest & Amount" },
  description:
    "Free simple interest calculator. Work out interest and total amount using the SI = P×R×T/100 formula, and see how it compares with compound interest.",
  alternates: { canonical: "/calculators/simple-interest" },
  openGraph: { url: "/calculators/simple-interest" },
};

export default function Page() {
  return (
    <CalcPage
      slug="simple-interest"
      title="Simple Interest Calculator"
      subtitle="Find the interest and total amount on any loan or deposit in seconds."
      calculator={<SimpleInterestCalculator />}
      intro="Simple interest is interest charged only on the original principal, never on interest already earned. It keeps the maths predictable, which is why it's common for short-term personal loans, car loans and some fixed deposits. This calculator shows the interest, the total amount you'll pay or receive, and how the result would differ if the same money compounded instead."
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
          a: "No. Unlike compound interest, simple interest depends only on the principal, rate and total time — not on how often you pay. The formula gives the same figure regardless of payment frequency.",
        },
        {
          q: "Is simple or compound interest better for me?",
          a: "As a borrower, simple interest is cheaper because interest never stacks on interest. As a saver or investor, compound interest is better because your returns start earning their own returns. Try our compound interest calculator to see the gap.",
        },
      ]}
    />
  );
}
