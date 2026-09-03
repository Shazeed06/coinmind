import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "personal-loan-emi")!;
export const metadata = calcMeta("personal-loan-emi", CALC.title + " - Monthly EMI", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="personal-loan-emi"
      title="Personal Loan EMI Calculator"
      subtitle="Find the monthly EMI on an unsecured personal loan and see the true cost of borrowing without collateral."
      calculator={<EmiCalculator />}
      intro="A personal loan EMI is the fixed amount you repay each month on an unsecured loan until it is cleared, covering both interest and principal. Because there is no collateral backing the loan, lenders price in more risk, so personal loan rates in India are typically 11-18% a year over shorter tenures of 1 to 5 years. This personal loan EMI calculator instantly converts your loan amount, interest rate and tenure into a monthly EMI, total interest and total repayment, so you can check affordability and compare offers before you sign."
      how={{
        heading: "How your personal loan EMI is calculated",
        body: (
          <>
            <p>
              The calculator uses the standard reducing-balance EMI formula that
              lenders apply to unsecured personal loans:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              M = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ − 1 ]
            </p>
            <p>
              Where <strong>M</strong> is the monthly EMI, <strong>P</strong> is
              the loan amount, <strong>r</strong> is the monthly interest rate
              (annual rate ÷ 12 ÷ 100) and <strong>n</strong> is the number of
              monthly instalments. A personal loan carries no security, so its
              rate is usually higher than a{" "}
              <Link href="/calculators/car-loan-emi" className="text-forest font-medium hover:underline">
                car loan
              </Link>
              , which makes the interest rate and a short tenure the two levers
              that matter most for keeping the total cost down.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Why are personal loan interest rates higher than other loans?",
          a: "A personal loan is unsecured (there is no house or car the lender can repossess if you default), so the bank takes on more risk and charges a higher rate to cover it. In India personal loan rates typically run from about 11% to 18% a year, versus roughly 8-12% on a secured car loan. Your exact rate is driven by your credit score, income and relationship with the lender, so a strong score can meaningfully lower your EMI.",
        },
        {
          q: "What is the usual tenure for a personal loan?",
          a: "Personal loans are short-term borrowing, usually repaid over 1 to 5 years. A longer tenure lowers the monthly EMI but, at these higher interest rates, adds a lot to the total interest you pay. Because the loan is unsecured and costly, it is generally best to choose the shortest tenure whose EMI you can comfortably manage, then clear it quickly.",
        },
        {
          q: "How can I get a lower personal loan EMI or interest rate?",
          a: "Improve or maintain a high credit score (ideally 750+), keep your existing EMIs low so lenders see spare income, and compare offers from several banks and NBFCs rather than taking the first quote. Borrowing only what you truly need and choosing a slightly longer tenure both trim the monthly EMI, though a longer tenure raises the total interest. Run each scenario through the calculator before you decide.",
        },
        {
          q: "Are there prepayment or foreclosure charges on a personal loan?",
          a: "Often, yes. Many lenders allow you to foreclose or part-prepay a personal loan after a few EMIs but charge a fee of roughly 2-5% of the outstanding principal, and some bar prepayment during an initial lock-in. Since personal loans carry high interest, prepaying early usually still saves money overall. Just confirm the exact charges in your loan agreement and compare them against the interest you would save.",
        },
        {
          q: "How much personal loan can I get on my salary?",
          a: "Most Indian lenders work to a FOIR, or fixed obligation to income ratio, of roughly 40 to 50%. That means all your EMIs together, including this new one, should stay under about half your monthly take-home. On a ₹60,000 monthly in-hand salary with ₹10,000 of existing EMIs, a lender may accept a new EMI of around ₹15,000 to ₹20,000. Enter that EMI target here and work backwards to see the loan amount it supports.",
        },
        {
          q: "What credit score do I need for a personal loan?",
          a: "Most banks and NBFCs want a CIBIL or equivalent score of 750 or above for their advertised rates. Between roughly 700 and 750 you will usually still be approved but at a higher rate or a smaller amount, and below 650 approvals become difficult without a co-applicant or a secured alternative. Since the rate drives the EMI, a score improvement of even 30 or 40 points before you apply can be worth more than negotiating with the lender.",
        },
        {
          q: "What charges apply on a personal loan besides interest?",
          a: "The main one is a processing fee, commonly around 1 to 3% of the loan amount plus GST, deducted upfront so you receive slightly less than you borrowed. Lenders may also charge documentation or stamping fees, EMI bounce charges if a mandate fails, and foreclosure or part-prepayment fees. Ask for the annual percentage rate rather than just the interest rate, since it folds these costs in and makes competing offers comparable.",
        },
        {
          q: "Is personal loan interest tax deductible in India?",
          a: "Not by default. Personal loans taken for consumption carry no deduction. The interest can become deductible if you can document that the money was used for a qualifying purpose: interest on funds used to buy, build or renovate a house may be claimed under Section 24(b), and interest on funds put into a business can be treated as a business expense. You need a clear paper trail, so keep the disbursal and usage records and check with a tax professional.",
        },
      ]}
      sources={[{ label: "Reserve Bank of India", href: "https://www.rbi.org.in" }]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">
            Compare your other loans
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Deciding between a personal loan and a secured one? The general{" "}
            <Link href="/calculators/emi" className="text-forest font-medium hover:underline">
              EMI calculator
            </Link>{" "}
            works for home, car and personal loans side by side, while the{" "}
            <Link href="/calculators/home-loan-eligibility" className="text-forest font-medium hover:underline">
              home loan eligibility calculator
            </Link>{" "}
            shows how an existing personal loan EMI reduces the home loan you can
            qualify for.
          </p>
        </div>
      }
    />
  );
}
