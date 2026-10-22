import Link from "next/link";
import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import HraCalculator from "@/components/calc/HraCalculator";
import CalcPage from "@/components/calc/CalcPage";
import {
  Building2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const CALC = calculators.find((c) => c.slug === "hra")!;
export const metadata = calcMeta(
  "hra",
  "HRA Calculator India FY 2026-27 - Calculate House Rent Allowance Exemption",
  CALC.blurb
);

export default function Page() {
  return (
    <CalcPage
      slug="hra"
      title="HRA Calculator"
      subtitle="Calculate your House Rent Allowance tax exemption under Section 10(13A), see your taxable HRA, and estimate your tax savings under the Old Regime for FY 2026-27."
      calculator={<HraCalculator />}
      intro="House Rent Allowance (HRA) is one of the most valuable salary components for salaried taxpayers in India who live in rented accommodation. Governed by Section 10(13A) and Rule 2A of the Income Tax Act, HRA is not automatically 100% tax-free. Your exemption is calculated as the lowest of three specific statutory limits. This calculator applies all three rules instantly, identifies the capping rule, and computes your net tax-free allowance, taxable HRA, and actual tax savings."
      how={{
        heading: "How HRA Exemption Is Calculated in India",
        body: (
          <div className="space-y-8 text-ink">
            {/* The 3 Golden Rules Grid */}
            <div className="space-y-4">
              <p className="text-ink-soft leading-relaxed">
                Under <strong className="text-ink">Section 10(13A) read with Rule 2A</strong> of the Income Tax Rules, your exempt HRA is strictly the <strong className="text-forest">least (minimum)</strong> of the following three statutory amounts:
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-line bg-card p-4 shadow-2xs">
                  <span className="inline-block rounded-md bg-forest-soft px-2 py-0.5 text-xs font-bold text-forest">
                    Rule 1
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-ink">Actual HRA Received</h3>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    The total House Rent Allowance paid to you by your employer for the financial year.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4 shadow-2xs">
                  <span className="inline-block rounded-md bg-forest-soft px-2 py-0.5 text-xs font-bold text-forest">
                    Rule 2
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-ink">50% or 40% of Basic</h3>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    <strong className="text-ink">50%</strong> of basic salary for 4 metros (Delhi, Mumbai, Kolkata, Chennai); <strong className="text-ink">40%</strong> for all other cities.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4 shadow-2xs">
                  <span className="inline-block rounded-md bg-forest-soft px-2 py-0.5 text-xs font-bold text-forest">
                    Rule 3
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-ink">Rent Paid − 10% Basic</h3>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    Actual rent paid minus 10% of your eligible salary (basic + qualifying DA).
                  </p>
                </div>
              </div>

              {/* Formula Banner */}
              <div className="rounded-xl border border-forest/20 bg-forest-soft/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-forest">
                  Statutory Exemption Formula
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-ink">
                  Exempt HRA = Minimum(Actual HRA, 50% / 40% of Basic, Rent Paid − 10% of Basic)
                </p>
                <p className="mt-1 font-mono text-xs text-ink-soft">
                  Taxable HRA = Actual HRA Received − Exempt HRA (Added to gross salary)
                </p>
              </div>
            </div>

            {/* Step by Step Worked Example */}
            <div className="space-y-4 pt-4 border-t border-line">
              <h3 className="font-display text-xl text-ink">
                Step-by-Step Calculation Example (FY 2026-27)
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Suppose an employee lives in <strong className="text-ink">Delhi (Metro)</strong> and earns an annual basic salary of ₹6,00,000, receives ₹2,40,000 as annual HRA, and pays ₹18,000/month (₹2,16,000/year) in rent:
              </p>

              <div className="overflow-x-auto rounded-xl border border-line bg-card">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-line bg-paper-2 font-semibold text-ink">
                    <tr>
                      <th className="p-3">Statutory Condition</th>
                      <th className="p-3">Calculation Details</th>
                      <th className="p-3 text-right">Computed Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink-soft">
                    <tr>
                      <td className="p-3 font-medium text-ink">1. Actual HRA received</td>
                      <td className="p-3">₹20,000 × 12 months</td>
                      <td className="p-3 text-right font-semibold text-ink">₹2,40,000</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-ink">2. 50% of Basic Salary (Metro)</td>
                      <td className="p-3">50% of ₹6,00,000</td>
                      <td className="p-3 text-right font-semibold text-ink">₹3,00,000</td>
                    </tr>
                    <tr className="bg-forest-soft/40">
                      <td className="p-3 font-medium text-forest flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-forest shrink-0" />
                        3. Rent Paid − 10% of Basic
                      </td>
                      <td className="p-3 text-forest">₹2,16,000 − ₹60,000 (10% of ₹6L)</td>
                      <td className="p-3 text-right font-bold text-forest">₹1,56,000 (Lowest)</td>
                    </tr>
                    <tr className="bg-paper-2/60 font-semibold text-ink">
                      <td className="p-3" colSpan={2}>Exempt HRA (Tax-Free under Section 10(13A))</td>
                      <td className="p-3 text-right text-forest text-base font-bold">₹1,56,000</td>
                    </tr>
                    <tr className="text-ink">
                      <td className="p-3" colSpan={2}>Taxable HRA (₹2,40,000 − ₹1,56,000 added to salary)</td>
                      <td className="p-3 text-right font-bold text-brass">₹84,000</td>
                    </tr>
                    <tr className="bg-forest-soft/20 text-forest font-semibold">
                      <td className="p-3" colSpan={2}>Tax Saved (Assuming 20% slab + 4% cess = 20.8%)</td>
                      <td className="p-3 text-right text-base font-bold">₹32,448</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Old vs New Tax Regime Comparison */}
            <div className="space-y-4 pt-4 border-t border-line">
              <h3 className="font-display text-xl text-ink">
                Old vs New Tax Regime: Can You Claim HRA?
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                The most important rule in recent tax years: <strong className="text-ink">HRA exemption is ONLY available under the Old Tax Regime.</strong> Under the New Tax Regime (Section 115BAC), no HRA exemption is allowed; your entire HRA is fully taxable.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-line">
                    <span className="font-semibold text-ink text-sm">Old Tax Regime</span>
                    <span className="text-xs bg-forest-soft text-forest px-2 py-0.5 rounded-md font-semibold">HRA Allowed</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-ink-soft leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span>Section 10(13A) HRA tax exemption can be claimed in full.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span>Allows 80C (₹1.5L), 80D health insurance, and home loan interest.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span>Standard deduction of ₹50,000 for salaried employees.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-line">
                    <span className="font-semibold text-ink text-sm">New Tax Regime (Default)</span>
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-semibold">HRA Disallowed</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-ink-soft leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>No HRA exemption: 100% of HRA received is added to taxable salary.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span>Offers lower slab rates and zero tax up to ₹7.75 Lakhs (with standard deduction).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span>Standard deduction increased to ₹75,000 for salaried employees.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-ink-faint">
                💡 <em>Rule of thumb:</em> If your total deductions (HRA + 80C + 80D + home loan interest) exceed ₹3.75 Lakhs to ₹4.25 Lakhs (depending on income), the Old Regime usually saves more tax. Compare both regimes with our{" "}
                <Link href="/calculators/income-tax" className="text-forest underline font-medium">
                  Income Tax Calculator
                </Link>{" "}
                or read our{" "}
                <Link href="/tax-regime-break-even" className="text-forest underline font-medium">
                  Tax Regime Break-Even Guide
                </Link>.
              </p>
            </div>

            {/* Documents Required & Compliance Rules */}
            <div className="space-y-4 pt-4 border-t border-line">
              <h3 className="font-display text-xl text-ink">
                Documents Required to Claim HRA Exemption
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                To claim HRA through your employer’s payroll (via Form 12BB) or directly while filing your Income Tax Return (ITR-1 or ITR-2), keep the following records ready:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                    <FileText className="h-4 w-4 text-forest" />
                    <span>Rent Receipts</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    Monthly or quarterly rent receipts containing landlord name, address, rent amount, and tenant details. Revenue stamp required if cash payment exceeds ₹5,000.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                    <ShieldCheck className="h-4 w-4 text-forest" />
                    <span>Landlord PAN (If Rent &gt; ₹1 Lakh)</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    Mandatory under CBDT circular if annual rent exceeds ₹1,00,000 (i.e. ₹8,333/month). If landlord has no PAN, a signed declaration in Form 60 must be collected.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                    <Building2 className="h-4 w-4 text-forest" />
                    <span>Rental Agreement</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    A valid registered or notarized lease agreement stating the monthly rent, security deposit, tenancy period, and landlord and tenant terms.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm text-ink">
                    <CheckCircle2 className="h-4 w-4 text-forest" />
                    <span>Banking Proof / Bank Statement</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    Bank statements showing regular electronic fund transfers (NEFT, RTGS, IMPS, or UPI) to your landlord. Provides unshakeable proof in case of tax scrutiny.
                  </p>
                </div>
              </div>
            </div>

            {/* Special Scenarios */}
            <div className="space-y-4 pt-4 border-t border-line">
              <h3 className="font-display text-xl text-ink">
                Common Special Scenarios &amp; Tax Rules
              </h3>

              <div className="space-y-3">
                <div className="rounded-xl border border-line bg-card p-4">
                  <h4 className="font-semibold text-sm text-ink">
                    Can I pay rent to my parents and claim HRA?
                  </h4>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    <strong className="text-ink">Yes, absolutely.</strong> You can pay rent to your parents and claim HRA tax exemption provided: (1) your parents legally own the house (you cannot be a co-owner), (2) you actually transfer rent to their bank account every month, and (3) your parents declare this rental income in their personal income tax returns under <em>Income from House Property</em>. <strong>Caution:</strong> You cannot pay rent to your spouse, as husband and wife are legally viewed as living together.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <h4 className="font-semibold text-sm text-ink">
                    Can I claim both HRA and Home Loan tax benefits together?
                  </h4>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    <strong className="text-ink">Yes.</strong> If you own a home (e.g. in Pune or your hometown) on which you are paying home loan EMIs, but live in a rented accommodation in another city (e.g. Mumbai) due to employment, you can claim <em>both</em>: Section 10(13A) HRA exemption on rent paid, AND Section 24(b) home loan interest deduction (up to ₹2 Lakhs) + Section 80C principal repayment deduction.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-card p-4">
                  <h4 className="font-semibold text-sm text-ink">
                    What components count as &ldquo;Basic Salary&rdquo; for HRA?
                  </h4>
                  <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                    For HRA calculations under Rule 2A, &ldquo;Salary&rdquo; means <strong className="text-ink">Basic Salary + Dearness Allowance (DA)</strong> that forms part of retirement benefits, plus commission if it is based on a fixed percentage of turnover. Special allowances, bonus, medical allowance, and conveyance do <em>not</em> count as salary for HRA calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      }}
      faqs={[
        {
          q: "How is HRA exemption calculated in India?",
          a: "Under Section 10(13A) and Rule 2A of the Income Tax Act, HRA exemption is the least (minimum) of three statutory amounts: (1) Actual HRA received from your employer, (2) 50% of Basic Salary + DA for metro cities (40% for non-metro cities), and (3) Rent paid minus 10% of Basic Salary + DA. Whichever is lowest is 100% tax-free; the rest of your HRA is added to taxable salary.",
        },
        {
          q: "Which cities count as Metro for HRA exemption?",
          a: "For income tax HRA calculation, only four cities are legally classified as metros: Delhi (NCR), Mumbai, Kolkata, and Chennai. For these four cities, the limit is 50% of basic salary. All other cities across India (including major IT hubs like Bengaluru, Hyderabad, Pune, Gurugram, Noida, and Ahmedabad) are categorized as Non-Metro, where the 40% limit applies.",
        },
        {
          q: "Can I claim HRA exemption under the New Tax Regime?",
          a: "No. The HRA exemption under Section 10(13A) is exclusively available under the Old Tax Regime. If you opt for the New Tax Regime (Section 115BAC), your entire HRA is fully taxable. However, the new regime offers lower slab rates and a higher standard deduction of ₹75,000 for salaried employees.",
        },
        {
          q: "When is Landlord PAN mandatory for HRA claim?",
          a: "Under CBDT circulars, if your total rent paid exceeds ₹1,00,000 per year (which works out to ₹8,334 per month), submitting your landlord's PAN to your employer via Form 12BB is legally mandatory. If the landlord does not possess a PAN card, you must obtain a signed declaration in Form 60 from the landlord along with their ID proof.",
        },
        {
          q: "What happens if rent paid is less than 10% of basic salary?",
          a: "If your annual rent paid is less than or equal to 10% of your basic salary, Rule 3 (Rent Paid − 10% of Basic) becomes zero or negative. Because the exemption is the minimum of the three rules floored at zero, your exempt HRA becomes ₹0. In this case, your entire HRA allowance is taxable.",
        },
        {
          q: "Can I claim HRA if I pay rent to my parents?",
          a: "Yes, you can pay rent to your parents and claim HRA, provided the arrangement is genuine. Your parents must be the legal owners of the residential property, rent should be transferred via bank account (NEFT, UPI, or cheque), and your parents must declare this rental income under 'Income from House Property' in their income tax return. You cannot pay rent to your spouse.",
        },
        {
          q: "Can I claim both HRA exemption and Home Loan tax deduction?",
          a: "Yes. If you own a house purchased with a home loan but live in a rented home because your workplace is in another city (or the owned home is under construction or rented out), you can claim both: HRA exemption under Section 10(13A) for rent paid, and home loan interest deduction up to ₹2 Lakhs under Section 24(b) plus principal repayment under Section 80C.",
        },
        {
          q: "Can I claim HRA directly in my ITR if not submitted to employer?",
          a: "Yes. If you missed submitting rent receipts or Form 12BB to your employer before the payroll cutoff date, TDS will be deducted from your salary. However, you can still claim the eligible HRA exemption under Section 10(13A) directly while filing your Income Tax Return (ITR-1 or ITR-2) and claim a refund for the excess TDS deducted.",
        },
      ]}
      sources={[
        { label: "Income Tax Department - Section 10(13A)", href: "https://www.incometax.gov.in" },
        { label: "Income Tax Rules 1962 - Rule 2A", href: "https://incometaxindia.gov.in/rules/income-tax-rules-1962.aspx" },
        { label: "CBDT Circular on Tax Deduction from Salaries", href: "https://www.incometaxindia.gov.in" },
      ]}
    />
  );
}
