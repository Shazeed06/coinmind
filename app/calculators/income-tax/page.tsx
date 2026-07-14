import type { Metadata } from "next";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: "Income Tax Calculator FY 2025-26 — New vs Old Regime",
  description:
    "Free income tax calculator for FY 2025-26 (AY 2026-27). Compare the new and old tax regimes for India and instantly see which one saves you more tax.",
  alternates: { canonical: "/calculators/income-tax" },
};

export default function Page() {
  return (
    <CalcPage
      slug="income-tax"
      title="Income Tax Calculator"
      subtitle="Compare the new and old regimes for FY 2025-26 and see which one saves you more."
      calculator={<IncomeTaxCalculator />}
      intro="Every year, salaried taxpayers in India face the same question: new regime or old regime? The new regime has lower rates but removes most deductions; the old regime keeps deductions like 80C and HRA but taxes at higher rates. This calculator estimates your tax under both for FY 2025-26 (AY 2026-27) and tells you which one leaves more money in your pocket."
      how={{
        heading: "New vs old regime — how it's calculated",
        body: (
          <>
            <p>
              Under the <strong>new regime</strong>, you get a ₹75,000 standard
              deduction and a rebate that makes tax zero up to ₹12 lakh of
              taxable income — but you cannot claim most other deductions.
            </p>
            <p>
              Under the <strong>old regime</strong>, you get a ₹50,000 standard
              deduction plus deductions such as 80C (up to ₹1.5 lakh), 80D, and
              home-loan interest — but the slab rates are higher and the rebate
              applies only up to ₹5 lakh.
            </p>
            <p>
              The calculator applies both slab structures, adds the 4% health &
              education cess, and highlights the cheaper option. It is an
              estimate for a salaried individual below 60 — always confirm with a
              tax professional before filing.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is the new regime always better?",
          a: "Not always. If you claim large deductions — a big home-loan interest, full 80C, 80D and HRA — the old regime can still win. If you have few deductions, the new regime usually comes out ahead. That's exactly what this calculator checks for your numbers.",
        },
        {
          q: "What income is tax-free under the new regime?",
          a: "For FY 2025-26, a salaried person effectively pays no tax up to about ₹12.75 lakh (₹12 lakh rebate limit plus the ₹75,000 standard deduction), thanks to the Section 87A rebate.",
        },
        {
          q: "Does this include cess and surcharge?",
          a: "The calculator adds the standard 4% health & education cess. It does not model surcharge on very high incomes (above ₹50 lakh), so treat high-income results as approximate.",
        },
        {
          q: "Which deductions count for the old regime?",
          a: "Common ones include 80C (PF, ELSS, life insurance, PPF up to ₹1.5 lakh), 80D (health insurance), 80CCD(1B) (NPS), home-loan interest under Section 24, and HRA. Add them together in the deductions field.",
        },
      ]}
    />
  );
}
