import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Personal Loan EMI Calculator — Monthly EMI" },
  description:
    "Free personal loan EMI calculator. Work out your monthly EMI, total interest and total payment on an unsecured personal loan at 11–18% over 1–5 years.",
  alternates: { canonical: "/calculators/personal-loan-emi" },
  openGraph: { url: "/calculators/personal-loan-emi" },
};

export default function Page() {
  return (
    <CalcPage
      slug="personal-loan-emi"
      title="Personal Loan EMI Calculator"
      subtitle="Find the monthly EMI on an unsecured personal loan and see the true cost of borrowing without collateral."
      calculator={<EmiCalculator />}
      intro="A personal loan EMI is the fixed amount you repay each month on an unsecured loan until it is cleared, covering both interest and principal. Because there is no collateral backing the loan, lenders price in more risk, so personal loan rates in India are typically 11–18% a year over shorter tenures of 1 to 5 years. This personal loan EMI calculator instantly converts your loan amount, interest rate and tenure into a monthly EMI, total interest and total repayment — so you can check affordability and compare offers before you sign."
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
              </Link>{" "}
              — which makes the interest rate and a short tenure the two levers
              that matter most for keeping the total cost down.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Why are personal loan interest rates higher than other loans?",
          a: "A personal loan is unsecured — there is no house or car the lender can repossess if you default — so the bank takes on more risk and charges a higher rate to cover it. In India personal loan rates typically run from about 11% to 18% a year, versus roughly 8–12% on a secured car loan. Your exact rate is driven by your credit score, income and relationship with the lender, so a strong score can meaningfully lower your EMI.",
        },
        {
          q: "What is the usual tenure for a personal loan?",
          a: "Personal loans are short-term borrowing, usually repaid over 1 to 5 years. A longer tenure lowers the monthly EMI but, at these higher interest rates, adds a lot to the total interest you pay. Because the loan is unsecured and costly, it is generally best to choose the shortest tenure whose EMI you can comfortably manage, then clear it quickly.",
        },
        {
          q: "How can I get a lower personal loan EMI or interest rate?",
          a: "Improve or maintain a high credit score (ideally 750+), keep your existing EMIs low so lenders see spare income, and compare offers from several banks and NBFCs rather than taking the first quote. Borrowing only what you truly need and choosing a slightly longer tenure both trim the monthly EMI — though a longer tenure raises the total interest. Run each scenario through the calculator before you decide.",
        },
        {
          q: "Are there prepayment or foreclosure charges on a personal loan?",
          a: "Often, yes. Many lenders allow you to foreclose or part-prepay a personal loan after a few EMIs but charge a fee of roughly 2–5% of the outstanding principal, and some bar prepayment during an initial lock-in. Since personal loans carry high interest, prepaying early usually still saves money overall — just confirm the exact charges in your loan agreement and compare them against the interest you would save.",
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
