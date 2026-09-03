import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

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
            { title: "₹6 Lakh Salary Tax", href: "/income-tax/6-lakh", desc: "Tax on ₹6 lakh salary under both regimes" },
            { title: "₹10 Lakh Salary Tax", href: "/income-tax/10-lakh", desc: "Tax on ₹10 lakh salary under both regimes" },
            { title: "₹15 Lakh Salary Tax", href: "/income-tax/15-lakh", desc: "Tax on ₹15 lakh salary under both regimes" },
            { title: "₹20 Lakh Salary Tax", href: "/income-tax/20-lakh", desc: "Tax on ₹20 lakh salary under both regimes" },
            { title: "₹25 Lakh Salary Tax", href: "/income-tax/25-lakh", desc: "Tax on ₹25 lakh salary under both regimes" },
            { title: "₹30 Lakh Salary Tax", href: "/income-tax/30-lakh", desc: "Tax on ₹30 lakh salary under both regimes" },
            { title: "₹50 Lakh Salary Tax", href: "/income-tax/50-lakh", desc: "Tax on ₹50 lakh salary under both regimes" },
            { title: "₹1 Crore Salary Tax", href: "/income-tax/1-crore", desc: "Tax on ₹1 crore salary under both regimes" },
          ],
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
