import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";
import { TAX_SALARIES, salarySlug, salaryLabel } from "@/lib/pseo-tax";

// Driven straight off TAX_SALARIES so the hub can never link a subset of the
// generated pages again. Every slug in generateStaticParams gets a card here.
const salaryLinks = TAX_SALARIES.map((s) => {
  const label = salaryLabel(s);
  // ₹12L is the Section 87A rebate threshold and the most-searched page in the
  // set, so it gets a description that answers the query rather than a template.
  const desc =
    s === 1200000
      ? "Zero tax at ₹12 lakh: how the Section 87A rebate wipes out the liability"
      : s > 5000000
        ? `Tax on a ₹${label} salary including surcharge, cess and the full slab breakdown`
        : `Tax on a ₹${label} salary under both regimes, with the full slab breakdown`;
  return {
    title: `₹${label} Salary Tax`,
    href: `/income-tax/${salarySlug(s)}`,
    desc,
  };
});

export const metadata: Metadata = {
  title: { absolute: "Income Tax India Guide - New vs Old Regime, Deductions & Filing" },
  description: "Complete income tax guide for India: compare new and old tax regimes, calculate your tax, claim deductions under 80C to 80U, and file your ITR. Updated for FY 2026-27.",
  alternates: { canonical: `${site.url}/income-tax` },
};

export default function Page() {
  return (
    <HubPage
      title="Income Tax India"
      description="Navigate India's income tax system with confidence. Compare tax regimes, calculate your liability, claim every deduction you are entitled to, and file your returns correctly. Updated for FY 2026-27."
      badge="Tax Hub"
      sections={[
        {
          title: "Tax Calculators",
          columns: 2,
          links: [
            { title: "Income Tax Calculator", href: "/calculators/income-tax", desc: "Compare new vs old tax regimes instantly. See exact tax on your salary with Section 87A rebate." },
            { title: "Take-Home Salary Calculator", href: "/calculators/take-home-salary", desc: "Convert CTC to in-hand pay after PF, professional tax, and income tax deductions." },
            { title: "HRA Exemption Calculator", href: "/calculators/hra", desc: "Work out how much HRA is tax-exempt under Indian rules." },
            { title: "TDS Calculator", href: "/calculators/tds", desc: "Estimate TDS on salary, interest, rent, and professional fees." },
            { title: "Capital Gains Tax Calculator", href: "/calculators/capital-gains", desc: "Calculate LTCG and STCG on equity, property, and gold." },
            { title: "GST Calculator", href: "/calculators/gst", desc: "Add or remove GST at 5%, 12%, 18%, and 28% rates." },
          ],
        },
        {
          title: "Tax Regime Comparison",
          columns: 2,
          links: [
            { title: "Old vs New Tax Regime", href: "/tax-regime-break-even", desc: "Find the exact deduction amount where the old regime beats the new one." },
          ],
        },
        {
          title: "Income Tax by Salary",
          columns: 3,
          links: salaryLinks,
        },
        {
          title: "Tax-Saving Investments",
          columns: 3,
          links: [
            { title: "Best Tax-Saving Investments", href: "/blog/best-tax-saving-investments-india", desc: "PPF, ELSS, EPF, life insurance, and more 80C options" },
            { title: "NPS Tax Benefits", href: "/calculators/nps", desc: "Extra ₹50,000 deduction under Section 80CCD(1B)" },
            { title: "ELSS Tax-Saving Funds", href: "/calculators/sip", desc: "Equity-linked savings with 3-year lock-in and tax benefits" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "Tax-free returns with 80C deduction" },
            { title: "EPF Calculator", href: "/calculators/epf", desc: "Employee Provident Fund tax benefits" },
            { title: "NSC Calculator", href: "/calculators/nsc", desc: "National Savings Certificate with 80C benefit" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "Section 80C", href: "/glossary/section-80c", desc: "Tax deductions up to ₹1.5 lakh" },
            { title: "HRA", href: "/glossary/hra", desc: "House Rent Allowance exemption" },
            { title: "TDS", href: "/glossary/tds", desc: "Tax Deducted at Source explained" },
            { title: "Which ITR Form to File", href: "/blog/which-itr-form-should-i-file", desc: "Pick the right ITR form for your income" },
            { title: "LTCG Tax", href: "/glossary/capital-gains", desc: "Capital gains tax on investments" },
            { title: "New Tax Regime", href: "/blog/new-tax-regime-fy-2026-27", desc: "Lower rates without deductions" },
            { title: "Old vs New Regime", href: "/blog/income-tax-old-vs-new-regime-2026", desc: "Which regime saves you more" },
            { title: "How to Save Income Tax", href: "/blog/how-to-save-income-tax", desc: "Practical ways to cut your tax bill" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Salary & Take-Home", href: "/calculators/take-home-salary" },
        { title: "Investing", href: "/investing" },
        { title: "Savings", href: "/savings" },
        { title: "Retirement", href: "/retirement" },
      ]}
    />
  );
}
