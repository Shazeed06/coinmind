import { calcMeta } from "@/lib/seo";
import ZeroTaxSalaryCalculator from "@/components/calc/ZeroTaxSalaryCalculator";
import CalcPage from "@/components/calc/CalcPage";
import Link from "next/link";

export const metadata = calcMeta(
  "zero-tax-salary",
  "Zero Tax Salary Calculator India (2026): Pay ₹0 Tax on ₹10L - ₹12L CTC",
  "Discover how to legally pay ₹0 income tax on ₹10 Lakh and ₹12 Lakh salary in India. Compare New vs Old Regime with 80C, 80D, NPS, and HRA exemptions.",
  "Tax"
);

export default function Page() {
  return (
    <CalcPage
      slug="zero-tax-salary"
      title="Zero Tax Salary Calculator India"
      subtitle="The complete blueprint to legally pay ₹0 tax on ₹7.75 Lakh, ₹10 Lakh, and ₹12 Lakh salary in India."
      calculator={<ZeroTaxSalaryCalculator />}
      intro="Paying income tax is mandatory, but paying more than your legal minimum is not. In India for FY 2026-27 (AY 2027-28), you can legally pay exactly ₹0 tax on a salary of ₹7.75 Lakhs without investing a single rupee under the New Tax Regime, or on a salary of up to ₹10 Lakhs to ₹12 Lakhs by strategically combining Chapter VI-A deductions (Section 80C, 80D, 80CCD) and HRA exemptions under the Old Tax Regime. Use this calculator to see your exact tax under both regimes and find out how close you are to ₹0 tax."
      how={{
        heading: "How to Pay ₹0 Tax on ₹10 Lakh & ₹12 Lakh Salary: Step-by-Step Blueprint",
        body: (
          <>
            <p>
              Under the Indian Income Tax Act, you do not pay tax if your net taxable income is reduced to or below the <strong>Section 87A rebate threshold</strong>:
            </p>
            <ul className="list-disc pl-5 my-2 space-y-1 text-ink-soft">
              <li><strong>New Tax Regime:</strong> Taxable income up to ₹7,00,000 gets a 100% rebate (zero tax). With the standard deduction of ₹75,000, anyone earning up to <strong>₹7,75,000 pays ₹0 tax</strong> automatically.</li>
              <li><strong>Old Tax Regime:</strong> Taxable income up to ₹5,00,000 gets a 100% rebate (zero tax). By claiming eligible deductions against your gross salary, you can bring an income of ₹10,00,000 or ₹12,00,000 down to ₹5,00,000.</li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              Blueprint 1: Paying ₹0 Tax on ₹10,00,000 Salary (Old Regime)
            </h3>
            <p>
              To pay zero tax on a ₹10 Lakh CTC under the Old Regime, you need total deductions and exemptions of <strong>₹5,00,000</strong>:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs border border-line rounded-xl overflow-hidden">
                <thead className="bg-paper-2 text-ink uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Deduction / Section</th>
                    <th className="p-3">Eligible Components</th>
                    <th className="p-3 text-right">Amount Deducted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr>
                    <td className="p-3 font-medium text-ink">Gross Salary (CTC)</td>
                    <td className="p-3">Annual compensation</td>
                    <td className="p-3 text-right font-semibold text-ink">₹10,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-3">Standard Deduction (Sec 16(ia))</td>
                    <td className="p-3">Automatic for all salaried employees</td>
                    <td className="p-3 text-right text-forest">- ₹50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3">Section 80C</td>
                    <td className="p-3">EPF, PPF, ELSS Mutual Funds, Life Insurance</td>
                    <td className="p-3 text-right text-forest">- ₹1,50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3">Section 80CCD(1B) NPS</td>
                    <td className="p-3">National Pension System (Tier-1 self contribution)</td>
                    <td className="p-3 text-right text-forest">- ₹50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3">Section 80D Health Insurance</td>
                    <td className="p-3">₹25k self & family + ₹25k parents</td>
                    <td className="p-3 text-right text-forest">- ₹50,000</td>
                  </tr>
                  <tr>
                    <td className="p-3">Section 10(13A) HRA Exemption</td>
                    <td className="p-3">Rent paid in metro/non-metro</td>
                    <td className="p-3 text-right text-forest">- ₹2,00,000</td>
                  </tr>
                  <tr className="bg-forest/5 font-semibold text-forest">
                    <td className="p-3">Net Taxable Income</td>
                    <td className="p-3">₹10,00,000 - ₹5,00,000 Deductions</td>
                    <td className="p-3 text-right text-base">₹5,00,000</td>
                  </tr>
                  <tr className="bg-paper-2 font-bold text-ink">
                    <td className="p-3">Tax Payable after Sec 87A Rebate</td>
                    <td className="p-3">Rebate of ₹12,500 applied fully</td>
                    <td className="p-3 text-right text-forest text-lg">₹0 (ZERO TAX!)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              Blueprint 2: Paying ₹0 Tax on ₹12,00,000 Salary (Old Regime)
            </h3>
            <p>
              To eliminate tax on a ₹12 Lakh salary, you need total deductions of <strong>₹7,00,000</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink-soft">
              <li><strong>Standard Deduction:</strong> ₹50,000</li>
              <li><strong>Section 80C:</strong> ₹1,50,000 (EPF + ELSS / PPF)</li>
              <li><strong>Section 80CCD(1B) NPS:</strong> ₹50,000</li>
              <li><strong>Section 80D Health Insurance:</strong> ₹50,000 (Self + Senior Citizen Parents)</li>
              <li><strong>Section 24(b) Home Loan Interest:</strong> Up to ₹2,00,000 (or higher HRA exemption up to ₹2.5L - ₹3L)</li>
              <li><strong>Section 10(13A) HRA:</strong> ₹2,50,000 (rent receipts submitted to employer)</li>
              <li><strong>Net Taxable Income:</strong> ₹12,00,000 - ₹7,00,000 = <strong>₹5,00,000 → ₹0 Tax!</strong></li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              Which Regime Should You Choose if You Cannot Claim High Deductions?
            </h3>
            <p>
              If you live with parents (no rent receipts), have no home loan, and don&apos;t want to lock your money into tax-saving schemes, the <strong>New Tax Regime is almost always superior</strong>. In the New Regime:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-ink-soft">
              <li>On ₹10 Lakh salary, New Regime tax is only ₹44,200 (vs ₹1,17,000 in Old Regime without deductions).</li>
              <li>On ₹12 Lakh salary, New Regime tax is only ₹75,400 (vs ₹1,79,400 in Old Regime without deductions).</li>
              <li>You don&apos;t need to lock money in 3-5 year lock-in instruments like ELSS, PPF, or NPS.</li>
            </ul>

            <div className="mt-6 rounded-xl border border-line bg-paper p-4">
              <p className="text-sm text-ink-soft">
                Want to calculate your exact month-on-month take-home salary after PF and professional tax? Check our{" "}
                <Link
                  href="/calculators/take-home-salary"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  In-Hand Take Home Salary Calculator
                </Link>
                , explore our{" "}
                <Link
                  href="/tax-regime-break-even"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  Tax Regime Break-Even Guide
                </Link>
                , or calculate your HRA exemption with our{" "}
                <Link
                  href="/calculators/hra"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  HRA Exemption Calculator
                </Link>
                .
              </p>
            </div>
          </>
        ),
      }}
      faqs={[
        {
          q: "How can I pay zero tax on a 10 lakh salary in India?",
          a: "Under the Old Tax Regime, you can pay ₹0 tax on a ₹10 Lakh salary by claiming ₹5,00,000 in deductions: Standard Deduction (₹50,000), Section 80C (₹1,50,000), Section 80CCD(1B) NPS (₹50,000), Section 80D Health Insurance (₹50,000), and HRA Exemption (₹2,00,000). This reduces your taxable income to ₹5,00,000, qualifying for a full tax rebate under Section 87A.",
        },
        {
          q: "Can I pay zero tax on a 12 lakh salary in India?",
          a: "Yes. Under the Old Tax Regime, you must claim ₹7,00,000 in total deductions to bring taxable income down to ₹5,00,000. This is typically achieved with Standard Deduction (₹50k) + 80C (₹1.5L) + NPS 80CCD (₹50k) + Health Insurance 80D (₹50k) + Home loan interest under Section 24b (₹2L) + HRA exemption (₹2L).",
        },
        {
          q: "What is the maximum salary with zero tax under the New Tax Regime?",
          a: "Under the New Tax Regime for FY 2025-26 and FY 2026-27, a salary of up to ₹7,75,000 attracts exactly ₹0 tax. This is because the Standard Deduction of ₹75,000 brings the taxable income down to ₹7,00,000, which gets a 100% tax rebate of ₹25,000 under Section 87A.",
        },
        {
          q: "Can I claim both HRA and Home Loan Interest deductions together?",
          a: "Yes. You can claim both Section 10(13A) HRA exemption and Section 24(b) Home Loan Interest deduction if you own a home in another city (or in a distant suburb) and reside in a rented house closer to your workplace for employment reasons, provided you can substantiate genuine genuine rent payments and home loan interest certificates.",
        },
        {
          q: "What is Section 87A rebate and how does it work?",
          a: "Section 87A is an income tax rebate provided to individual resident taxpayers. Under the New Regime, if taxable income is ₹7,00,000 or less, you get a rebate of up to ₹25,000 (tax becomes ₹0). Under the Old Regime, if taxable income is ₹5,00,000 or less, you get a rebate of up to ₹12,500 (tax becomes ₹0).",
        },
        {
          q: "Is EPF contribution included in the Section 80C limit?",
          a: "Yes. Your employee EPF contribution (12% of basic pay deducted from your monthly salary) is counted towards the overall ₹1,50,000 limit under Section 80C. For most salaried professionals earning ₹10-12 Lakhs, EPF already utilizes ₹50,000 to ₹80,000 of their 80C basket.",
        },
        {
          q: "Can employer NPS contribution save tax in the New Regime?",
          a: "Yes! Section 80CCD(2) allows employer contributions to NPS (up to 14% of Basic + DA for Central/State Govt and 14% for corporate employees under recent budget updates) as a deductible expense even under the New Tax Regime. This allows you to reduce taxable income even further in the New Regime.",
        },
        {
          q: "What is the break-even deduction point between New and Old Regime?",
          a: "For a ₹10 Lakh salary, the break-even deduction point is approximately ₹4,12,500. If your eligible deductions (80C + 80D + HRA + Home loan) exceed ₹4,12,500, the Old Regime saves you more tax; if your deductions are below ₹4,12,500, the New Regime is more beneficial.",
        },
      ]}
    />
  );
}
