import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Education Loan EMI Calculator — Student Loan EMI" },
  description:
    "Free education loan EMI calculator. Estimate your student loan EMI, total interest and payment at 8–13%, and see how a moratorium affects repayment.",
  alternates: { canonical: "/calculators/education-loan-emi" },
};

export default function Page() {
  return (
    <CalcPage
      slug="education-loan-emi"
      title="Education Loan EMI Calculator"
      subtitle="Estimate the monthly EMI on a student loan and plan repayment around your course and moratorium period."
      calculator={<EmiCalculator />}
      intro="An education loan EMI is the fixed monthly instalment you repay on a student loan once regular repayment begins, covering both interest and principal. In India education loans are relatively affordable, typically 8–13% a year, and most come with a moratorium — a period during your studies plus a grace period after, when you pay nothing or only the interest. This education loan EMI calculator estimates your monthly EMI, total interest and total payment for the loan amount, rate and tenure you expect, so you can plan repayment before, during and after your course."
      how={{
        heading: "How your education loan EMI is calculated",
        body: (
          <>
            <p>
              Once your repayment period starts, the calculator uses the standard
              reducing-balance EMI formula banks apply to student loans:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              M = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ − 1 ]
            </p>
            <p>
              Where <strong>M</strong> is the monthly EMI, <strong>P</strong> is
              the loan amount, <strong>r</strong> is the monthly interest rate
              (annual rate ÷ 12 ÷ 100) and <strong>n</strong> is the number of
              monthly instalments. During the moratorium you usually pay nothing
              or interest only; any interest left unpaid is added to the
              principal, so <strong>P</strong> — and your EMI — can be larger
              once repayment begins. Paying the interest during study keeps the
              loan from growing. After graduating, the{" "}
              <Link href="/calculators/emi" className="text-forest font-medium hover:underline">
                general EMI calculator
              </Link>{" "}
              shows the full schedule for whatever balance you finish study with.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a moratorium period on an education loan?",
          a: "The moratorium is a repayment holiday that runs through your course plus a grace period of typically 6 to 12 months after you finish or land a job. During it you usually pay nothing, or only the interest. If you skip payments entirely, the interest that accrues is added to your principal, so your EMI is higher afterwards. Paying at least the interest during the moratorium keeps the loan from ballooning.",
        },
        {
          q: "What interest rate do education loans charge in India?",
          a: "Education loan rates in India are generally around 8% to 13% a year, lower than unsecured personal loans because they are often backed by collateral or a co-applicant and sometimes subsidised. Loans for premier institutes, female students or those with a guarantor can attract lower rates. Enter the rate your bank quotes into the education loan EMI calculator to see the monthly EMI it produces.",
        },
        {
          q: "Can I claim a tax benefit on education loan interest?",
          a: "Yes. Under Section 80E of the Income Tax Act, the entire interest you pay on an education loan for higher studies is deductible from your taxable income, with no upper limit on the amount. The benefit is available for up to 8 years starting from the year you begin repayment, which effectively lowers the real cost of the loan below the headline interest rate.",
        },
        {
          q: "How long is the tenure on a student loan?",
          a: "Education loans are usually repaid over 5 to 15 years after the moratorium ends, longer than car or personal loans so that a new graduate's EMI stays manageable. A longer tenure lowers the monthly EMI but raises the total interest paid over the life of the loan. Once you are earning, prepaying or shortening the tenure is an effective way to cut the total interest on your student loan.",
        },
      ]}
      sources={[{ label: "Reserve Bank of India", href: "https://www.rbi.org.in" }]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">
            Compare your other loans
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Planning your finances beyond study? The general{" "}
            <Link href="/calculators/emi" className="text-forest font-medium hover:underline">
              EMI calculator
            </Link>{" "}
            works for home, car and personal loans side by side, while the{" "}
            <Link href="/calculators/home-loan-eligibility" className="text-forest font-medium hover:underline">
              home loan eligibility calculator
            </Link>{" "}
            shows how a running education loan EMI affects the home loan you can
            later qualify for.
          </p>
        </div>
      }
    />
  );
}
