import type { Metadata } from "next";
import PpfCalculator from "@/components/calc/PpfCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: "PPF Calculator — Public Provident Fund Maturity",
  description:
    "Free PPF calculator for India. Estimate your Public Provident Fund maturity and tax-free interest with yearly contributions over 15+ years.",
  alternates: { canonical: "/calculators/ppf" },
};

export default function Page() {
  return (
    <CalcPage
      slug="ppf"
      title="PPF Calculator"
      subtitle="Estimate the tax-free corpus you'll build with a Public Provident Fund."
      calculator={<PpfCalculator />}
      intro="The Public Provident Fund (PPF) is one of India's most popular long-term savings schemes. It offers government-backed safety, a tax-free return, and deductions under Section 80C. With a 15-year lock-in and yearly compounding, it rewards patient savers. This calculator projects your maturity amount."
      how={{
        heading: "How PPF returns are calculated",
        body: (
          <>
            <p>
              PPF interest is compounded annually on your yearly contributions. Because you contribute each year and interest is credited at year-end, the maturity value is the future value of a yearly annuity:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">FV = A × [ (1 + r)ⁿ − 1 ] / r × (1 + r)</p>
            <p>
              Where <strong>A</strong> is your yearly investment, <strong>r</strong> the annual rate (set by the government, around 7.1%), and <strong>n</strong> the number of years.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "Is PPF interest really tax-free?", a: "Yes. PPF enjoys EEE status — your contributions qualify for 80C deduction, the interest is tax-free, and the maturity amount is tax-free too. That's rare and valuable." },
        { q: "What is the current PPF interest rate?", a: "The government revises it every quarter. It has hovered around 7.1% recently. You can change the rate in the calculator to match the current figure." },
        { q: "Can I withdraw before 15 years?", a: "PPF has a 15-year lock-in. Partial withdrawals are allowed from the 7th year, and loans against the balance from the 3rd year, subject to rules." },
        { q: "What's the maximum I can invest?", a: "You can invest between ₹500 and ₹1.5 lakh per financial year in a PPF account." },
      ]}
    />
  );
}
