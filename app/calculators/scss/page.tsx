import type { Metadata } from "next";
import ScssCalculator from "@/components/calc/ScssCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "SCSS Calculator — Senior Citizen Savings Scheme" },
  description:
    "Free SCSS calculator. Find your Senior Citizen Savings Scheme quarterly payout, annual income and total interest over the 5-year term.",
  alternates: { canonical: "/calculators/scss" },
  openGraph: { url: "/calculators/scss" },
};

export default function Page() {
  return (
    <CalcPage
      slug="scss"
      title="SCSS Calculator"
      subtitle="Work out the quarterly income you'll earn from the Senior Citizen Savings Scheme."
      calculator={<ScssCalculator />}
      sources={[
        { label: "National Savings Institute / India Post", href: "https://www.nsiindia.gov.in" },
      ]}
      intro="The Senior Citizen Savings Scheme (SCSS) is a government-backed scheme that gives people aged 60 and above a regular, dependable income. It runs for a fixed 5 years and pays interest as a simple quarterly payout, with your full principal returned at maturity. Because it is a small savings scheme, the interest rate is set by the government and revised each quarter. This SCSS calculator turns your deposit and the current rate into your quarterly payout, annual income and total interest over five years, so you can plan around a steady senior citizen savings scheme income."
      how={{
        heading: "How SCSS interest is calculated",
        body: (
          <>
            <p>
              SCSS pays a simple (non-compounded) interest payout every quarter,
              and returns your principal untouched at the end of the 5-year term.
              The scss interest calculator works out each figure like this:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Quarterly payout = P &times; r/100 &divide; 4
            </p>
            <p>
              Where <strong>P</strong> is your deposit and <strong>r</strong> is
              the annual interest rate (a current rate, set and revised by the
              government each quarter &mdash; you can edit it to match
              today&apos;s figure). Annual income is P &times; r/100, and total
              interest over the term is that annual figure multiplied by five.
              For example, &#8377;5,00,000 at 8.2% pays about &#8377;10,250 every
              quarter and &#8377;2,05,000 of interest over five years, with the{" "}
              &#8377;5,00,000 principal returned at maturity.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Who can open an SCSS account and how does this SCSS calculator help?",
          a: "The Senior Citizen Savings Scheme is for people aged 60 and above (with some exceptions, such as certain retirees from 55). This senior citizen savings scheme calculator shows the quarterly payout, annual income and total interest on your deposit, so an eligible senior can see exactly how much regular income the scheme will provide.",
        },
        {
          q: "What is the maximum I can invest in SCSS?",
          a: "The maximum deposit is ₹30 lakh per individual across all SCSS accounts, which is why this scss calculator caps the investment at ₹30 lakh. The minimum is ₹1,000, and deposits are made in multiples of ₹1,000.",
        },
        {
          q: "What is the current SCSS interest rate?",
          a: "The SCSS interest rate is a current rate that is set and revised by the government each quarter, so there is no permanently fixed number. This scss interest calculator lets you enter the latest government-notified rate, which you can verify on the National Savings Institute / India Post source below.",
        },
        {
          q: "Is SCSS eligible for tax benefits, and is the interest taxable?",
          a: "Deposits in SCSS qualify for a deduction under Section 80C, up to the ₹1.5 lakh annual limit. However, the quarterly interest income is fully taxable in your hands and TDS may apply if your total interest crosses the threshold, so treat the payout shown by this senior citizen savings scheme calculator as a pre-tax figure.",
        },
      ]}
    />
  );
}
