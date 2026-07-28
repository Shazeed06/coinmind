import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Loans & EMI Guide — Home, Car, Personal & Education Loans India" },
  description: "Compare loan options, calculate EMIs, check eligibility, and understand interest costs. Free calculators for home, car, personal, and education loans. Updated 2026.",
  alternates: { canonical: `${site.url}/loans` },
};

export default function Page() {
  return (
    <HubPage
      title="Loans & EMI"
      description="Make smart borrowing decisions. Calculate EMIs, compare loan options, check your eligibility, and understand the true cost of borrowing. Free calculators designed for India."
      badge="Loans Hub"
      sections={[
        {
          title: "Loan Calculators",
          columns: 2,
          links: [
            { title: "EMI Calculator", href: "/calculators/emi", desc: "Monthly payment, total interest, and full amortisation for any loan" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "How much home loan you qualify for based on salary and FOIR" },
            { title: "Car Loan EMI Calculator", href: "/calculators/car-loan-emi", desc: "Monthly auto loan payment and total interest" },
            { title: "Personal Loan EMI Calculator", href: "/calculators/personal-loan-emi", desc: "Monthly EMI for unsecured loans at 11-18% over 1-5 years" },
            { title: "Education Loan EMI Calculator", href: "/calculators/education-loan-emi", desc: "Student loan repayment with moratorium period" },
            { title: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Monthly payment and amortisation for any mortgage" },
          ],
        },
        {
          title: "Rent vs Buy Analysis",
          columns: 2,
          links: [
            { title: "Rent vs Buy Calculator", href: "/calculators/rent-vs-buy", desc: "Compare buying a home against renting and investing the difference" },
            { title: "Home Loan vs Rent", href: "/blog/home-loan-vs-rent", desc: "An honest, numbers-first look at buying vs renting in India" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "Check your home loan eligibility before applying" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "EMI", href: "/glossary/emi", desc: "Equated Monthly Installment explained" },
            { title: "FOIR", href: "/glossary/foir", desc: "Fixed Obligation to Income Ratio for loan eligibility" },
            { title: "CIBIL Score", href: "/glossary/cibil-score", desc: "How your credit score affects loan approval" },
            { title: "Amortisation", href: "/glossary/amortisation", desc: "How loan payments are split over time" },
            { title: "Simple Interest", href: "/glossary/simple-interest", desc: "Interest calculated on the principal only" },
            { title: "Compound Interest", href: "/glossary/compound-interest", desc: "Interest on interest — how debt can grow" },
          ],
        },
      ]}
      relatedHubs={[
        { title: "Credit Score", href: "/credit-score" },
        { title: "Real Estate", href: "/real-estate" },
        { title: "Budgeting", href: "/budgeting" },
        { title: "Tax", href: "/income-tax" },
      ]}
    />
  );
}
