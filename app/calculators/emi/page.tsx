import type { Metadata } from "next";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "EMI Calculator — Home, Car & Personal Loan EMIs" },
  description:
    "Free EMI calculator for home, car and personal loans. Instantly find your monthly EMI, total interest and total payment for any loan amount, rate and tenure.",
  alternates: { canonical: "/calculators/emi" },
  openGraph: { url: "/calculators/emi" },
};

export default function Page() {
  return (
    <CalcPage
      slug="emi"
      title="EMI Calculator"
      subtitle="Work out your monthly loan payment and see exactly how much interest you'll pay."
      calculator={<EmiCalculator />}
      intro="An Equated Monthly Instalment (EMI) is the fixed amount you repay to a lender each month until your loan is cleared. It covers both interest and a portion of the principal. Knowing your EMI before you borrow helps you check affordability and compare loan offers. This EMI calculator works for home loans, car loans, personal loans and any other reducing-balance loan."
      how={{
        heading: "How EMI is calculated",
        body: (
          <>
            <p>The calculator uses the standard reducing-balance EMI formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              EMI = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ − 1 ]
            </p>
            <p>
              Where <strong>P</strong> is the loan amount, <strong>r</strong> is
              the monthly interest rate (annual rate ÷ 12 ÷ 100), and{" "}
              <strong>n</strong> is the number of monthly instalments. A longer
              tenure lowers your EMI but increases the total interest you pay —
              the calculator makes that trade-off visible instantly.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Does a longer tenure reduce my total cost?",
          a: "No. A longer tenure lowers the monthly EMI, which feels easier, but you pay interest for more years — so the total interest, and total cost of the loan, goes up. Choose the shortest tenure whose EMI you can comfortably afford.",
        },
        {
          q: "Is the interest rate fixed or floating?",
          a: "This calculator assumes a fixed rate for the full tenure. If your loan has a floating rate, your EMI or tenure may change when the lender revises rates — treat the result as an estimate for the current rate.",
        },
        {
          q: "Should I make prepayments?",
          a: "Prepaying reduces your outstanding principal, which cuts the interest you pay over the life of the loan — especially effective in the early years when most of your EMI goes toward interest.",
        },
        {
          q: "Can I use this for a US or UK mortgage?",
          a: "Yes. Switch the currency and enter your amount, rate and term. The reducing-balance formula is the same one used for most amortising mortgages worldwide.",
        },
      ]}
    />
  );
}
