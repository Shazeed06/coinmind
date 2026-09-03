import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "education-loan-emi")!;
export const metadata = calcMeta("education-loan-emi", CALC.title + " - Student Loan EMI", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="education-loan-emi"
      title="Education Loan EMI Calculator"
      subtitle="Estimate the monthly EMI on a student loan and plan repayment around your course and moratorium period."
      calculator={<EmiCalculator />}
      intro="An education loan EMI is the fixed monthly instalment you repay on a student loan once regular repayment begins, covering both interest and principal. In India education loans are relatively affordable, typically 8-13% a year, and most come with a moratorium: a period during your studies plus a grace period after, when you pay nothing or only the interest. This education loan EMI calculator estimates your monthly EMI, total interest and total payment for the loan amount, rate and tenure you expect, so you can plan repayment before, during and after your course."
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
              principal, so <strong>P</strong>, and your EMI, can be larger
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
        {
          q: "How much education loan can I get without collateral?",
          a: "Under the Indian Banks' Association model education loan scheme, banks generally lend up to about Rs 4 lakh with no collateral and no third-party guarantee, take a guarantor for roughly Rs 4 lakh to Rs 7.5 lakh, and ask for tangible security above that. A central credit guarantee covers a slice of unsecured lending, which is why Rs 7.5 lakh is a common collateral-free ceiling. Limits differ by bank and by institute, so confirm with the lender.",
        },
        {
          q: "What is margin money on an education loan?",
          a: "Margin money is the share of the course cost you fund yourself, with the bank lending the rest. Banks typically waive it on smaller loans and then ask for around 5% for study in India and around 15% for study abroad on larger amounts. Scholarships and assistantships are usually allowed to count towards your margin. Enter only the amount actually borrowed into the education loan EMI calculator, not the full course fee.",
        },
        {
          q: "What expenses does an education loan cover?",
          a: "Beyond tuition, most Indian education loans cover examination, library and laboratory fees, hostel charges, a caution deposit, books and equipment, a laptop where the course requires one, and for overseas study the airfare and travel costs. Some lenders also fund life insurance on the borrower. Ask the bank for its sanction letter breakdown, because anything outside the approved list must come from your own funds.",
        },
        {
          q: "Is there an interest subsidy on education loans in India?",
          a: "The government has run interest subsidy schemes for economically weaker students, most notably a central scheme that pays the interest accruing during the moratorium for eligible professional and technical courses below a family income ceiling and a loan ceiling. Eligibility criteria, income limits and the schemes themselves have changed in recent years, so check the current scheme details with your bank and on the Department of Higher Education portal before assuming you qualify.",
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
