import type { Metadata } from "next";
import Link from "next/link";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import CalcPage from "@/components/calc/CalcPage";
import { TAX_SALARIES, salarySlug, salaryLabel } from "@/lib/pseo-tax";

export const metadata: Metadata = {
  title: { absolute: "Income Tax Calculator India FY 2026-27 - New vs Old Regime" },
  description:
    "Compare new vs old tax regime for FY 2026-27. See which saves more, with breakup, deductions, rebate and cess. Free, instant, private.",
  keywords: ["income tax calculator", "income tax calculator India", "new vs old tax regime calculator", "tax calculator FY 2026-27", "income tax on salary", "how to save tax on 15 lakh salary", "tax regime comparison calculator", "income tax slab calculator"],
  alternates: { canonical: "/calculators/income-tax" },
  openGraph: { url: "/calculators/income-tax" },
  twitter: {
    card: "summary_large_image",
    title: "Income Tax Calculator India FY 2026-27 - New vs Old Regime",
    description: "Compare new vs old tax regime for FY 2026-27. See which saves more, with breakup, deductions, rebate and cess.",
    images: ["/opengraph-image"],
  },
};

function TaxBySalary() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-ink">Income tax by salary</h2>
      <p className="mt-2 text-ink-soft leading-relaxed">
        Already know your package? Each salary has its own page with the slab-by-slab breakdown, the effective rate and an old-vs-new comparison.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {TAX_SALARIES.map((s) => (
          <Link key={s} href={`/income-tax/${salarySlug(s)}`} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest">
            ₹{salaryLabel(s)}
          </Link>
        ))}
      </div>
      <p className="mt-5 text-ink-soft leading-relaxed">
        Deciding between the regimes? Our{" "}
        <Link href="/tax-regime-break-even" className="text-forest underline underline-offset-2">old vs new regime break-even grid</Link>{" "}
        gives the exact deduction amount at which the old regime starts winning, for every income from ₹6 lakh to ₹50 lakh.
      </p>
    </div>
  );
}

function BreakEvenTable() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-display text-2xl text-ink">The regime break-even point</h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          The new regime is the default. It wins for most people, but not everyone. The break-even is the deduction amount at which the old regime starts saving you more tax. If your actual deductions exceed this number, pick the old regime.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left p-3 font-semibold text-ink">Gross Income</th>
                <th className="text-left p-3 font-semibold text-ink">New Regime Tax</th>
                <th className="text-left p-3 font-semibold text-ink">Deductions Needed for Old Regime to Win</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr><td className="p-3 text-ink">₹8,00,000</td><td className="p-3 text-ink-soft">₹0 (rebate)</td><td className="p-3 text-ink-soft">₹1,75,000+</td></tr>
              <tr><td className="p-3 text-ink">₹10,00,000</td><td className="p-3 text-ink-soft">₹15,600</td><td className="p-3 text-ink-soft">₹2,25,000+</td></tr>
              <tr><td className="p-3 text-ink">₹12,00,000</td><td className="p-3 text-ink-soft">₹0 (rebate)</td><td className="p-3 text-ink-soft">₹2,75,000+</td></tr>
              <tr><td className="p-3 text-ink">₹15,00,000</td><td className="p-3 text-ink-soft">₹1,45,600</td><td className="p-3 text-ink-soft">₹3,50,000+</td></tr>
              <tr><td className="p-3 text-ink">₹20,00,000</td><td className="p-3 text-ink-soft">₹3,01,600</td><td className="p-3 text-ink-soft">₹4,25,000+</td></tr>
              <tr><td className="p-3 text-ink">₹25,00,000</td><td className="p-3 text-ink-soft">₹4,83,600</td><td className="p-3 text-ink-soft">₹5,00,000+</td></tr>
              <tr><td className="p-3 text-ink">₹30,00,000</td><td className="p-3 text-ink-soft">₹6,91,600</td><td className="p-3 text-ink-soft">₹5,75,000+</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">Last updated: July 2026. Tax computed on gross income minus ₹75,000 standard deduction under the new regime. Old regime tax computed at the legacy slab rates with ₹50,000 standard deduction. Both include 4% cess. Surcharge not modelled.</p>
      </div>

      <div>
        <h2 className="font-display text-2xl text-ink">Three worked examples</h2>
        <div className="mt-4 space-y-6">
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-semibold text-ink">₹8,00,000 salary</h3>
            <p className="mt-2 text-sm text-ink-soft">
              <strong>New regime:</strong> Gross ₹8,00,000 − ₹75,000 standard deduction = ₹7,25,000 taxable. Tax before rebate: ₹22,500. Section 87A rebate eliminates it. <strong>Tax = ₹0.</strong>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              <strong>Old regime:</strong> Gross ₹8,00,000 − ₹50,000 standard deduction − ₹1,50,000 (80C) − ₹25,000 (80D) = ₹5,75,000 taxable. Tax: ₹22,500. Rebate (up to ₹5 lakh) does not apply. <strong>Tax = ₹23,400</strong> (with cess). New regime wins by ₹23,400.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-semibold text-ink">₹15,00,000 salary</h3>
            <p className="mt-2 text-sm text-ink-soft">
              <strong>New regime:</strong> Gross ₹15,00,000 − ₹75,000 = ₹14,25,000 taxable. Tax: ₹1,40,000. With 4% cess: <strong>₹1,45,600.</strong>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              <strong>Old regime (no deductions):</strong> Gross ₹15,00,000 − ₹50,000 = ₹14,50,000 taxable. Tax: ₹2,02,500. With cess: <strong>₹2,10,600.</strong> New regime wins.
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              <strong>Old regime (₹4L deductions):</strong> Taxable = ₹10,50,000. Tax: ₹1,27,500. With cess: <strong>₹1,32,600.</strong> Old regime now wins by ₹13,000.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-5">
            <h3 className="font-semibold text-ink">₹30,00,000 salary</h3>
            <p className="mt-2 text-sm text-ink-soft">
              <strong>New regime:</strong> Gross ₹30,00,000 − ₹75,000 = ₹29,25,000 taxable. Tax: ₹6,65,000. With cess: <strong>₹6,91,600.</strong>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              <strong>Old regime (₹6L deductions):</strong> Taxable = ₹23,50,000. Tax: ₹5,92,500. With cess: <strong>₹6,16,200.</strong> Old regime wins by ₹75,400 if you genuinely have that level of deductions.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl text-ink">Who should NOT switch to the new regime</h2>
        <ul className="mt-3 space-y-2 text-ink-soft leading-relaxed">
          <li>• Anyone with <strong>home loan interest above ₹1.5 lakh</strong>: the Section 24 deduction of up to ₹2 lakh applies only under the old regime.</li>
          <li>• Anyone claiming <strong>full Section 80C (₹1.5 lakh) plus 80D (₹25,000) plus NPS (₹50,000)</strong>: at higher incomes, these stack to overcome the new regime&apos;s lower rates.</li>
          <li>• Anyone with <strong>HRA exemption above ₹1 lakh</strong>: HRA is not available under the new regime.</li>
          <li>• Anyone whose employer has already deducted tax under the old regime in their Form 16: switching may create a cash-flow mismatch if you have already invested under the old regime assumptions.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-display text-2xl text-ink">How often can you switch between regimes?</h2>
        <p className="mt-2 text-ink-soft leading-relaxed">
          For salaried individuals, you can choose your regime every financial year, independently. You can be in the new regime in FY 2025-26 and switch to the old regime in FY 2026-27, or vice versa. There is no lock-in and no restriction on the number of times you switch across years.
        </p>
        <p className="mt-2 text-ink-soft leading-relaxed">
          However, within a single financial year, you must file under the regime you have selected. If your employer has deducted tax under the new regime but you realise the old regime would save you more, you can file under the old regime when submitting your ITR, but you may need to pay the difference as self-assessment tax if your employer did not deduct enough.
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <CalcPage
      extra={
        <>
          <TaxBySalary />
          <div className="mt-14"><BreakEvenTable /></div>
        </>
      }
      slug="income-tax"
      title="Income Tax Calculator"
      subtitle="Compare the new and old regimes for FY 2026-27 and see which one saves you more."
      calculator={<IncomeTaxCalculator />}
      intro="Every year, salaried taxpayers in India face the same question: new regime or old regime? The new regime has lower rates but removes most deductions; the old regime keeps deductions like 80C and HRA but taxes at higher rates. This calculator estimates your tax under both for FY 2026-27 (AY 2027-28) and tells you which one leaves more money in your pocket."
      how={{
        heading: "New vs old regime - how it's calculated",
        body: (
          <>
            <p>
              Under the <strong>new regime</strong>, you get a ₹75,000 standard deduction and a rebate that makes tax zero up to ₹12 lakh of taxable income, but you cannot claim most other deductions.
            </p>
            <p>
              Under the <strong>old regime</strong>, you get a ₹50,000 standard deduction plus deductions such as 80C (up to ₹1.5 lakh), 80D, and home-loan interest, but the slab rates are higher and the rebate applies only up to ₹5 lakh.
            </p>
            <p>
              The calculator applies both slab structures, adds the 4% health & education cess, and highlights the cheaper option. It is an estimate for a salaried individual below 60. Always confirm with a tax professional before filing.
            </p>
            <p>
              Want to pay less? Our guide on{" "}
              <Link href="/blog/best-tax-saving-investments-india" className="text-forest">best tax-saving investments</Link>{" "}
              walks through 80C, 80D, NPS and home-loan deductions in detail, and once you have picked a regime you can see the effect on your monthly pay with the{" "}
              <Link href="/calculators/take-home-salary" className="text-forest">Take-Home Salary Calculator</Link>.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is the new regime always better?",
          a: "Not always. If you claim large deductions (a big home-loan interest, full 80C, 80D and HRA), the old regime can still win. If you have few deductions, the new regime usually comes out ahead. That's exactly what this calculator checks for your numbers.",
        },
        {
          q: "What income is tax-free under the new regime?",
          a: "For FY 2026-27, a salaried person effectively pays no tax up to about ₹12.75 lakh (₹12 lakh rebate limit plus the ₹75,000 standard deduction), thanks to the Section 87A rebate.",
        },
        {
          q: "Does this include cess and surcharge?",
          a: "The calculator adds the standard 4% health & education cess. It does not model surcharge on very high incomes (above ₹50 lakh), so treat high-income results as approximate.",
        },
        {
          q: "Which deductions count for the old regime?",
          a: "Common ones include 80C (PF, ELSS, life insurance, PPF up to ₹1.5 lakh), 80D (health insurance), 80CCD(1B) (NPS), home-loan interest under Section 24, and HRA. Add them together in the deductions field.",
        },
        {
          q: "How to save income tax in India under the old regime?",
          a: "The main levers are Section 80C (up to ₹1.5 lakh across EPF, PPF, ELSS, life insurance and home-loan principal), Section 80D for health-insurance premiums, an extra ₹50,000 for NPS under Section 80CCD(1B), home-loan interest up to ₹2 lakh under Section 24, and HRA exemption if you pay rent. Stacked together these can sharply cut your taxable income, but they only apply if you choose the old regime. See our detailed guide on best tax-saving investments.",
        },
        {
          q: "New vs old regime - which saves the most tax?",
          a: "It depends on how much you claim. The new regime for FY 2026-27 gives a ₹75,000 standard deduction and makes tax zero up to ₹12,00,000 of taxable income through the Section 87A rebate, but drops most deductions. The old regime keeps 80C, 80D, 80CCD(1B), Section 24 home-loan interest and HRA, at higher slab rates. If your deductions exceed ₹3-4 lakh at higher incomes, the old regime can still win.",
        },
        {
          q: "Can I switch between regimes every year?",
          a: "Yes. Salaried individuals can choose between the new and old regime independently each financial year. There is no lock-in. You can be in the new regime in one year and the old regime in the next. Within a single year, file under the regime that saves you more, regardless of what your employer selected for TDS.",
        },
        {
          q: "Who should stay in the old regime?",
          a: "Anyone with substantial deductions: home loan interest above ₹1.5 lakh, full 80C (₹1.5 lakh), 80D, NPS (₹50,000), and HRA. At incomes above ₹20 lakh with total deductions exceeding ₹4-5 lakh, the old regime often wins. Use this calculator with your actual figures to confirm.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
