import type { Metadata } from "next";
import TakeHomeSalaryCalculator from "@/components/calc/TakeHomeSalaryCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Take-Home Salary Calculator: CTC to In-Hand" },
  description:
    "Free India take-home salary calculator. Convert your annual CTC to monthly in-hand pay with accurate PF, professional tax and new-regime income tax deductions.",
  alternates: { canonical: "/calculators/take-home-salary" },
};

export default function Page() {
  return (
    <CalcPage
      slug="take-home-salary"
      title="Take-Home Salary Calculator"
      subtitle="Turn your annual CTC into a real monthly in-hand figure in seconds."
      calculator={<TakeHomeSalaryCalculator />}
      intro="Your CTC is what a company spends on you, not what lands in your bank account. Between employer PF, gratuity, your own PF contribution, professional tax and income tax, the take-home is always lower. This free, India-focused calculator breaks down every deduction so you know your actual monthly in-hand salary before you accept an offer."
      how={{
        heading: "How your in-hand salary is calculated",
        body: (
          <>
            <p>
              We start from your annual CTC and estimate Basic salary at around
              50% of CTC, since most Indian companies structure it that way. Two
              items inside your CTC never reach you as cash: the employer&apos;s
              PF contribution (12% of Basic) and gratuity (4.81% of Basic).
              Removing these gives your gross salary, which is the actual pay the
              company runs deductions on.
            </p>
            <p>
              From gross, we subtract your own deductions. Your employee PF is
              another 12% of Basic and goes into your retirement account.
              Professional tax is a flat state levy of about ₹2,400 a year. Income
              tax is calculated under the new regime for FY 2025-26, applying the
              ₹75,000 standard deduction and the Section 87A rebate, which makes
              tax zero up to ₹12 lakh of taxable income; a 4% health and education
              cess is added on any tax due.
            </p>
            <p>
              Whatever remains after all three deductions is your net in-hand pay.
              Divide it by twelve and you have your realistic monthly take-home.
              Actual figures vary with company structure, allowances and chosen
              tax regime, so treat this as a close estimate rather than a payslip.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How is in-hand salary calculated from CTC?",
          a: "Start with CTC, remove employer PF and gratuity to get gross salary, then subtract employee PF, professional tax and income tax. What is left is your annual in-hand pay, which you divide by twelve for the monthly figure.",
        },
        {
          q: "What is the difference between CTC and in-hand salary?",
          a: "CTC is the total cost a company bears for you, including contributions like employer PF and gratuity that you never receive as cash. In-hand salary is what actually reaches your bank account each month after every deduction.",
        },
        {
          q: "How much tax do I pay on a ₹12 lakh salary?",
          a: "Under the new regime for FY 2025-26, income up to ₹12 lakh of taxable income attracts zero tax thanks to the Section 87A rebate, and the ₹75,000 standard deduction lifts that threshold further on salary. So a salary around ₹12 lakh typically results in no income tax.",
        },
        {
          q: "Why is my in-hand less than my CTC?",
          a: "CTC bundles in employer PF, gratuity and other contributions that are costs to the company but not paid to you directly. On top of that, your own PF, professional tax and income tax are deducted from gross, so the amount you take home is always noticeably lower than the CTC figure.",
        },
      ]}
    />
  );
}
