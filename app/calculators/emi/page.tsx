import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import EmiCalculator from "@/components/calc/EmiCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "emi")!;
export const metadata = calcMeta("emi", CALC.title + " - Home, Car & Personal Loan EMIs", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="emi"
      title="EMI Calculator"
      subtitle="Work out your monthly loan payment and see exactly how much interest you'll pay."
      calculator={<EmiCalculator />}
      intro="An Equated Monthly Instalment (EMI) is the fixed amount you repay to a lender each month until your loan is cleared. It covers both the interest for that month and a portion of the principal, with the interest share largest at the start and shrinking as the balance falls. Knowing your EMI before you borrow helps you check affordability, compare loan offers from different banks and see how much the borrowing actually costs on top of the amount you receive. This EMI calculator works for home loans, car loans, personal loans, education loans and any other reducing-balance loan, and shows your monthly instalment, the total interest and the total amount repaid."
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
              tenure lowers your EMI but increases the total interest you pay.
              The calculator makes that trade-off visible instantly.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Does a longer tenure reduce my total cost?",
          a: "No. A longer tenure lowers the monthly EMI, which feels easier, but you pay interest for more years, so the total interest, and total cost of the loan, goes up. Choose the shortest tenure whose EMI you can comfortably afford.",
        },
        {
          q: "Is the interest rate fixed or floating?",
          a: "This calculator assumes a fixed rate for the full tenure. If your loan has a floating rate, your EMI or tenure may change when the lender revises rates. Treat the result as an estimate for the current rate.",
        },
        {
          q: "Should I make prepayments?",
          a: "Prepaying reduces your outstanding principal, which cuts the interest you pay over the life of the loan, especially effective in the early years when most of your EMI goes toward interest.",
        },
        {
          q: "Can I use this for a US or UK mortgage?",
          a: "Yes. Switch the currency and enter your amount, rate and term. The reducing-balance formula is the same one used for most amortising mortgages worldwide.",
        },
        {
          q: "How is EMI calculated?",
          a: "EMI = P x r x (1 + r)^n divided by [(1 + r)^n minus 1], where P is the loan amount, r is the monthly rate (annual rate divided by 12 and by 100) and n is the number of months. A Rs 30,00,000 home loan at 9% for 20 years gives a monthly rate of 0.0075 over 240 months, producing an EMI of roughly Rs 26,990. Over the full term you would repay about Rs 64.8 lakh, so the interest alone is close to Rs 34.8 lakh.",
        },
        {
          q: "Does prepaying a loan reduce the EMI or the tenure?",
          a: "Most Indian lenders let you choose. Keeping the EMI the same and cutting the tenure saves far more interest, because the loan closes years earlier. Reducing the EMI and keeping the tenure eases monthly cash flow but you keep paying interest for the full term. RBI rules generally bar banks from charging foreclosure penalties on floating-rate loans to individuals, though fixed-rate loans can attract a charge, so confirm with your lender.",
        },
        {
          q: "What happens to my EMI if the repo rate changes?",
          a: "Most floating-rate retail loans in India are linked to an external benchmark, usually the RBI repo rate, and reset at set intervals. When the repo rate rises, banks commonly hold the EMI steady and extend the tenure instead, which is why a rate rise can silently add years to a home loan. RBI has required lenders to tell borrowers about the impact and offer the option of switching to a higher EMI or a fixed rate. Ask for the revised amortisation schedule after every reset.",
        },
        {
          q: "Can I claim tax deductions on my home loan EMI?",
          a: "Under the old tax regime, the interest portion of a home loan EMI on a self-occupied property is deductible under Section 24(b) up to Rs 2,00,000 a year, and the principal portion qualifies within the Rs 1,50,000 Section 80C limit alongside your other 80C investments. These deductions are largely unavailable under the new regime. Your lender issues an annual interest and principal certificate that splits the EMI for you. Verify the current position on incometax.gov.in.",
        },
      ]}
    />
  );
}
