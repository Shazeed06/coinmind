import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import ScssCalculator from "@/components/calc/ScssCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "scss")!;
export const metadata = calcMeta("scss", CALC.title + " - Senior Citizen Savings Scheme", CALC.blurb);

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
              government each quarter; you can edit it to match
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
        {
          q: "Can I close an SCSS account before 5 years?",
          a: "Yes. Unlike some small savings schemes there is no minimum waiting period for closure, but a percentage of your deposit is deducted as a penalty, and the deduction is larger if you close in the first couple of years than if you close later in the term. The quarterly payouts already received are yours to keep. Confirm the current penalty percentages with the National Savings Institute or your post office before breaking the account.",
        },
        {
          q: "Can SCSS be extended after 5 years?",
          a: "Yes. At maturity you can extend the account for a further block of 3 years, and the extension can be requested within a year of the maturity date. The extended account earns the rate applicable on the date of maturity, not the rate you originally opened at, so your quarterly payout may rise or fall. An extended account can also be closed after a year of extension without any penalty deduction.",
        },
        {
          q: "Is TDS deducted on SCSS interest, and how do I avoid it?",
          a: "Yes. The post office or bank deducts TDS under Section 194A once your interest for the year crosses the notified threshold, which is set higher for senior citizens than for others. Two things help: Section 80TTB allows senior citizens a deduction of up to ₹50,000 a year on interest income, and if your total income is below the taxable limit you can submit Form 15H to stop the deduction at source. Verify the current thresholds with the Income Tax Department.",
        },
        {
          q: "Can I open a joint SCSS account with my spouse?",
          a: "Yes, but only with your spouse, and the whole deposit is treated as belonging to the first holder. That matters for the ₹30 lakh ceiling: it applies per individual across all SCSS accounts, so a joint account does not double your limit the way it does in the Post Office Monthly Income Scheme. The spouse can be below 60 in a joint account. On the death of the first holder the account can pass to the spouse if they are eligible.",
        },
      ]}
    />
  );
}
