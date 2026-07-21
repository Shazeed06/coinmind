import type { Metadata } from "next";
import PpfCalculator from "@/components/calc/PpfCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "PPF Calculator — Public Provident Fund Maturity" },
  description:
    "Free PPF calculator for India. Estimate your Public Provident Fund maturity and tax-free interest with yearly contributions over 15+ years.",
  alternates: { canonical: "/calculators/ppf" },
  openGraph: { url: "/calculators/ppf" },
};

export default function Page() {
  return (
    <CalcPage
      slug="ppf"
      title="PPF Calculator"
      subtitle="Estimate the tax-free corpus you'll build with a Public Provident Fund."
      calculator={<PpfCalculator />}
      sources={[
        { label: "National Savings Institute / India Post", href: "https://www.nsiindia.gov.in" },
        { label: "Reserve Bank of India", href: "https://www.rbi.org.in" },
      ]}
      intro="The Public Provident Fund (PPF) is one of India's most popular long-term savings schemes. It offers government-backed safety, a tax-free return, and deductions under Section 80C. With a 15-year lock-in and yearly compounding, it rewards patient savers. This PPF calculator for India works the same whether you open the account at a post office or a bank, because the interest rate is set by the government — enter your yearly (or monthly) deposit and the current rate to project your maturity amount and total tax-free interest as a PPF return calculator."
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
        { q: "What's the maximum I can invest?", a: "You can invest between ₹500 and ₹1.5 lakh per financial year in a PPF account, and the same ₹1.5 lakh also qualifies for a deduction under Section 80C." },
        { q: "Is PPF the same at the post office and at banks?", a: "Yes. PPF is a central government scheme, so the interest rate and rules are identical whether you open the account at a post office or an authorised bank — the government sets a single rate for everyone. That is why this ppf calculator post office monthly view and the bank view give the same result. Confirm the latest rate on the National Savings Institute / India Post source before you calculate." },
        { q: "What is the PPF interest rate today?", a: "There is no permanently fixed figure: the government reviews and notifies the PPF rate every quarter, so the 'ppf interest rate today' can change from one quarter to the next. Rather than hard-coding a number, this ppf calculator india lets you enter the current government-notified rate, which you can verify on the National Savings Institute / India Post source linked below." },
        { q: "Do monthly PPF deposits earn the same as a yearly lump sum?", a: "Not exactly. PPF interest is worked out on the lowest balance between the 5th and the last day of each month, so money paid in earlier — both earlier in the month and earlier in the financial year — earns more. Depositing the full ₹1.5 lakh before the 5th of April typically earns the most, while spreading it across monthly deposits earns slightly less. This ppf return calculator assumes contributions are invested at the start of each period, so treat the monthly-versus-yearly gap as small." },
      ]}
    />
  );
}
