import type { Metadata } from "next";
import Link from "next/link";
import HomeLoanEligibilityCalculator from "@/components/calc/HomeLoanEligibilityCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Home Loan Eligibility Calculator — How Much Can I Get?" },
  description:
    "See how much home loan you qualify for on your salary. Free eligibility calculator using FOIR, your existing EMIs, interest rate and tenure.",
  alternates: { canonical: "/calculators/home-loan-eligibility" },
};

export default function Page() {
  return (
    <CalcPage
      slug="home-loan-eligibility"
      title="Home Loan Eligibility Calculator"
      subtitle="See how much home loan you could qualify for based on your income, existing EMIs and the loan terms."
      calculator={<HomeLoanEligibilityCalculator />}
      intro="Home loan eligibility is the maximum loan a lender is willing to give you, based mainly on how much of your monthly income can safely go toward repayments. This calculator estimates that limit from your net income, any EMIs you already pay, the interest rate, tenure and the lender's FOIR cap. Use it to set a realistic budget before you start house-hunting or applying, and to see how a longer tenure or lower existing debt changes what you can borrow."
      how={{
        heading: "How eligibility is worked out",
        body: (
          <>
            <p>
              First the calculator finds the largest EMI you can afford: it takes
              the share of your income lenders permit for repayments (your FOIR)
              and subtracts the EMIs you already pay.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Max EMI = income × FOIR − existing EMIs
            </p>
            <p>
              It then reverses the standard EMI formula to find the loan principal
              that EMI can service over your chosen tenure:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Loan = EMI × [ 1 − (1 + r)⁻ⁿ ] / r
            </p>
            <p>
              Where <strong>r</strong> is the monthly interest rate (annual rate ÷
              12 ÷ 100) and <strong>n</strong> is the number of monthly
              instalments. A longer tenure or lower interest rate lets the same
              EMI support a bigger loan. Once you know your EMI, the{" "}
              <Link href="/calculators/emi" className="text-forest font-medium hover:underline">
                EMI calculator
              </Link>{" "}
              shows the full repayment schedule for any amount you settle on.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How is home loan eligibility decided?",
          a: "Lenders look at how much of your monthly income can safely cover loan repayments. They apply a FOIR cap to your net income, subtract the EMIs you already pay, and treat the remainder as the maximum EMI you can take on. That EMI, combined with the interest rate and tenure, sets the largest loan they will approve. Credit score, job stability and property value also feed into the final decision.",
        },
        {
          q: "What is FOIR and what percentage of salary can go toward EMIs?",
          a: "FOIR stands for Fixed Obligations to Income Ratio — the share of your income that can be used for all EMIs combined. Most lenders cap it between 40% and 55%, so if you earn 100,000 a month at a 50% FOIR, up to 50,000 can go toward EMIs. Higher earners are sometimes allowed a higher ratio because more income is left over for living costs.",
        },
        {
          q: "Does my existing EMI reduce how much I can borrow?",
          a: "Yes. Any car loan, personal loan or credit-card EMI you already pay is subtracted from the amount your FOIR allows, which lowers the EMI left for a new home loan — and therefore the loan you qualify for. Closing or paying down existing debt before you apply is one of the fastest ways to increase your eligibility.",
        },
        {
          q: "How can I increase my home loan eligibility?",
          a: "Choose a longer tenure so the same EMI supports a larger loan, clear or reduce existing EMIs, and add a co-applicant such as a spouse so both incomes count. Improving your credit score can also earn a lower interest rate, and any bonus, rental or freelance income you can document may lift the income the lender considers.",
        },
        {
          q: "Is this eligibility figure guaranteed by lenders?",
          a: "No — it is an estimate to help you plan. Actual approval depends on the lender's own FOIR policy, your credit history, the property's valuation and their loan-to-value limits. Treat the result as a realistic starting point and confirm the exact amount with your lender.",
        },
      ]}
    />
  );
}
