import type { Metadata } from "next";
import Link from "next/link";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Car Loan EMI Calculator — Monthly Car Loan EMI" },
  description:
    "Free car loan EMI calculator. Work out your monthly car loan EMI, total interest and total payment for any car price, 8–12% rate and 5–7 year tenure.",
  alternates: { canonical: "/calculators/car-loan-emi" },
};

export default function Page() {
  return (
    <CalcPage
      slug="car-loan-emi"
      title="Car Loan EMI Calculator"
      subtitle="Work out the monthly EMI on a new or used car loan and see exactly how much interest the car adds to its price."
      calculator={<EmiCalculator />}
      intro="A car loan EMI is the fixed monthly instalment you repay on an auto loan until the vehicle is fully paid off — each payment covers the interest plus a slice of the principal. In India car loans are secured against the car itself, so rates stay relatively low, typically 8–12% a year, over tenures of 5 to 7 years. This car loan EMI calculator turns the on-road price, your interest rate and tenure into an exact monthly EMI, total interest and total payment, so you can size an affordable car before you set foot in the showroom."
      how={{
        heading: "How your car loan EMI is calculated",
        body: (
          <>
            <p>
              The calculator uses the standard reducing-balance EMI formula that
              banks and NBFCs apply to auto loans:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              M = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ − 1 ]
            </p>
            <p>
              Where <strong>M</strong> is the monthly EMI, <strong>P</strong> is
              the loan amount (car price minus your down payment),{" "}
              <strong>r</strong> is the monthly interest rate (annual rate ÷ 12 ÷
              100) and <strong>n</strong> is the number of monthly instalments.
              Because the loan is secured by the vehicle, a car loan usually
              carries a lower rate than an unsecured{" "}
              <Link href="/calculators/personal-loan-emi" className="text-forest font-medium hover:underline">
                personal loan
              </Link>
              . A bigger down payment shrinks <strong>P</strong> and your EMI,
              while a longer tenure lowers the monthly EMI but raises the total
              interest you hand over on the car.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a typical car loan interest rate in India?",
          a: "New car loans in India usually carry interest of about 8% to 12% a year, because the loan is secured against the vehicle. Your exact rate depends on your credit score, income, the lender and whether the car is new or used — used-car loans are riskier for the lender and often price 1–4% higher. Enter the rate your bank quotes into the car loan EMI calculator to see the real monthly EMI.",
        },
        {
          q: "What car loan tenure should I choose?",
          a: "Most car loans run for 5 to 7 years. A shorter tenure means a higher monthly EMI but far less total interest and quicker ownership, while a longer tenure lowers the EMI at the cost of paying interest for more years on a depreciating asset. As a rule, pick the shortest tenure whose EMI fits comfortably within your monthly budget so the car does not cost far more than its sticker price.",
        },
        {
          q: "Does a bigger down payment lower my car loan EMI?",
          a: "Yes. The EMI is charged on the loan amount, which is the on-road price minus your down payment. Putting down 20–30% upfront reduces the principal, so both your monthly EMI and the total interest fall, and it lowers the risk of owing more than the car is worth. Try different down payments in the calculator to see how much each one trims from your monthly car loan EMI.",
        },
        {
          q: "Can I prepay or foreclose a car loan to save interest?",
          a: "Usually yes. Prepaying reduces your outstanding principal, which cuts the interest charged over the rest of the tenure — most effective in the early years when the interest share of each EMI is highest. Fixed-rate car loans may levy a foreclosure charge of around 3–6% of the outstanding amount, so weigh that fee against the interest you would save before closing the loan early.",
        },
      ]}
      sources={[{ label: "Reserve Bank of India", href: "https://www.rbi.org.in" }]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">
            Compare your other loans
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Weighing a car loan against other borrowing? The general{" "}
            <Link href="/calculators/emi" className="text-forest font-medium hover:underline">
              EMI calculator
            </Link>{" "}
            works for home, car and personal loans side by side, and the{" "}
            <Link href="/calculators/home-loan-eligibility" className="text-forest font-medium hover:underline">
              home loan eligibility calculator
            </Link>{" "}
            shows how an existing car EMI affects the home loan you can qualify
            for.
          </p>
        </div>
      }
    />
  );
}
