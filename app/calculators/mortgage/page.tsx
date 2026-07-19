import type { Metadata } from "next";
import MortgageCalculator from "@/components/calc/MortgageCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Mortgage Calculator — Monthly Payment & Interest" },
  description:
    "Free mortgage calculator. Estimate your monthly home loan payment, total interest and total paid from the home price, down payment, term and interest rate.",
  alternates: { canonical: "/calculators/mortgage" },
};

export default function Page() {
  return (
    <CalcPage
      slug="mortgage"
      title="Mortgage Calculator"
      subtitle="Estimate your monthly home loan payment and the total interest you will pay over the life of the loan."
      calculator={<MortgageCalculator />}
      intro="A mortgage calculator turns a home price, down payment, loan term and interest rate into the one number that matters most: your monthly payment. Enter the details and this mortgage payment calculator works out the loan amount, the monthly principal-and-interest payment, the total interest over the full term and the total amount you will repay. It is built for US and UK buyers comparing 30-year and 25-year loans, but the currency toggle lets anyone run the numbers. Use it to see how a bigger down payment, a shorter term or a lower rate changes what you pay each month."
      how={{
        heading: "How your mortgage payment is calculated",
        body: (
          <>
            <p>
              First the calculator finds the loan amount &mdash; the home price
              minus your down payment. It then applies the standard amortising
              mortgage formula:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              M = P &times; i &times; (1 + i)^n / ((1 + i)^n &minus; 1)
            </p>
            <p>
              Here <strong>M</strong> is the monthly payment, <strong>P</strong>{" "}
              is the loan amount, <strong>i</strong> is the monthly interest rate
              (the annual rate divided by 12 and by 100) and <strong>n</strong> is
              the number of monthly payments (the term in years multiplied by 12).
              Because the loan amortises, early payments are mostly interest and
              later ones mostly principal, but the monthly amount stays level.
            </p>
            <p>
              The result covers <strong>principal and interest only</strong>.
              Property taxes, homeowners or buildings insurance, HOA or service
              charges and any private mortgage insurance are additional and depend
              on where you buy, so budget for them on top of this figure.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How does this mortgage calculator work?",
          a: "The mortgage calculator subtracts your down payment from the home price to get the loan amount, then applies the amortisation formula M = P·i·(1+i)^n / ((1+i)^n − 1), where i is the monthly interest rate and n is the number of monthly payments. It returns your monthly principal-and-interest payment, the total interest and the total amount repaid over the term.",
        },
        {
          q: "What is included in the monthly mortgage payment?",
          a: "This home loan calculator shows principal and interest only — the core repayment on the money you borrowed. It does not include property taxes, homeowners or buildings insurance, HOA or service charges, or private mortgage insurance. Those costs vary by location and lender, so add them separately to estimate your true monthly housing cost.",
        },
        {
          q: "How does the down payment affect my mortgage?",
          a: "A larger down payment reduces the loan amount, which lowers both your monthly payment and the total interest you pay over the life of the loan. It can also help you avoid private mortgage insurance and may qualify you for a better interest rate. Use the mortgage payment calculator to compare different down payment amounts side by side.",
        },
        {
          q: "Should I choose a 15, 25 or 30-year mortgage term?",
          a: "A shorter term such as 15 or 25 years means higher monthly payments but far less total interest, while a 30-year term keeps monthly payments lower at the cost of more interest overall. The 30-year loan is the US standard and 25 years is common in the UK. Adjust the term in this monthly mortgage calculator to see the trade-off for your situation.",
        },
      ]}
    />
  );
}
