import type { Metadata } from "next";
import Link from "next/link";
import TakeHomeSalaryCalculator from "@/components/calc/TakeHomeSalaryCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Take-Home Salary Calculator: CTC to In-Hand" },
  description:
    "Free India take-home salary calculator. Convert annual CTC to monthly in-hand pay with PF, professional tax and new-regime income tax.",
  alternates: { canonical: "/calculators/take-home-salary" },
};

export default function Page() {
  return (
    <CalcPage
      slug="take-home-salary"
      title="Take-Home Salary Calculator"
      subtitle="Turn your annual CTC into a real monthly in-hand figure in seconds."
      calculator={<TakeHomeSalaryCalculator />}
      intro="Your CTC is what a company spends on you, not what lands in your bank account. The gap between CTC vs in-hand salary trips up even experienced professionals every time they switch jobs. Between employer PF, gratuity, your own PF contribution, professional tax and income tax, the take-home is always lower than the headline number on your offer letter. This free take home calculator is built for India: it breaks down every deduction so you know your actual monthly in-hand salary before you accept an offer. If you have been trying to understand how in-hand salary vs CTC in India really works, this is the full breakdown, plus a tool that does the math for you."
      how={{
        heading: "How your in-hand salary is calculated",
        body: (
          <>
            <p>
              We start from your annual CTC and estimate Basic salary at around
              50% of CTC, since most Indian companies structure it that way. Two
              items inside your CTC never reach you as cash: the employer&apos;s
              PF contribution (12% of Basic) and gratuity (4.81% of Basic).
              Removing these gives your gross salary, which is the actual pay the
              company runs deductions on.
            </p>
            <p>
              From gross, we subtract your own deductions. Your employee PF is
              another 12% of Basic and goes into your retirement account.
              Professional tax is a flat state levy of about ₹2,400 a year. Income
              tax is calculated under the new regime for FY 2026-27, applying the
              ₹75,000 standard deduction and the Section 87A rebate, which makes
              tax zero up to ₹12 lakh of taxable income; a 4% health and education
              cess is added on any tax due.
            </p>
            <p>
              Whatever remains after all three deductions is your net in-hand pay.
              Divide it by twelve and you have your realistic monthly take-home.
              Actual figures vary with company structure, allowances and chosen
              tax regime, so treat this as a close estimate rather than a payslip.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How is in-hand salary calculated from CTC?",
          a: "Start with CTC, remove employer PF and gratuity to get gross salary, then subtract employee PF, professional tax and income tax. What is left is your annual in-hand pay, which you divide by twelve for the monthly figure.",
        },
        {
          q: "What is the difference between CTC and in-hand salary?",
          a: "CTC is the total cost a company bears for you, including contributions like employer PF and gratuity that you never receive as cash. In-hand salary is what actually reaches your bank account each month after every deduction.",
        },
        {
          q: "How much tax do I pay on a ₹12 lakh salary?",
          a: "Under the new regime for FY 2026-27, income up to ₹12 lakh of taxable income attracts zero tax thanks to the Section 87A rebate, and the ₹75,000 standard deduction lifts that threshold further on salary. So a salary around ₹12 lakh typically results in no income tax.",
        },
        {
          q: "Why is my in-hand less than my CTC?",
          a: "CTC bundles in employer PF, gratuity and other contributions that are costs to the company but not paid to you directly. On top of that, your own PF, professional tax and income tax are deducted from gross, so the amount you take home is always noticeably lower than the CTC figure.",
        },
        {
          q: "CTC vs in-hand salary: why is the gap so large?",
          a: "CTC vs in-hand salary differ because CTC bundles costs you never receive as cash — the employer's PF contribution (12% of basic) and a gratuity provision (about 4.81% of basic). Your gross salary is CTC minus those two. From gross, your own PF, professional tax and income tax are then deducted. What survives is your in-hand pay, which is why an ₹18 lakh CTC can land around ₹1.2 lakh a month rather than the ₹1.5 lakh the headline suggests.",
        },
        {
          q: "How does this take home calculator convert CTC to in-hand salary?",
          a: "The take home calculator estimates Basic at around 50% of CTC and splits the rest into HRA and allowances. It removes the employer PF contribution and gratuity provision to reach your gross salary, then subtracts your employee PF (12% of Basic), professional tax (about ₹2,400 a year) and income tax under the new regime for FY 2026-27, before showing the monthly figure that remains.",
        },
        {
          q: "In-hand salary vs CTC in India: what actually gets deducted?",
          a: "Six things sit between CTC and in-hand salary in India: employer PF and gratuity (part of CTC but never paid to you as cash), then your own PF, professional tax and income tax deducted from gross. Under the new regime for FY 2026-27, taxable income up to ₹12,00,000 is effectively tax-free after the Section 87A rebate, and salaried people also get a ₹75,000 standard deduction — so lower salaries often keep their entire gross apart from PF and professional tax.",
        },
      ]}
      sources={[
        { label: "Income Tax Department", href: "https://www.incometax.gov.in" },
        { label: "EPFO", href: "https://www.epfindia.gov.in" },
      ]}
      extra={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">
            Related salary &amp; tax tools
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Once you know your take-home, dig into the pieces that shape it:
          </p>
          <ul className="mt-4 space-y-2 text-ink-soft leading-relaxed">
            <li>
              <Link href="/calculators/income-tax" className="text-forest hover:underline">
                Income Tax Calculator
              </Link>{" "}
              — compare the new and old regimes for FY 2026-27.
            </li>
            <li>
              <Link href="/calculators/hra" className="text-forest hover:underline">
                HRA Calculator
              </Link>{" "}
              — see how much of your House Rent Allowance is tax-free.
            </li>
            <li>
              <Link href="/calculators/gratuity" className="text-forest hover:underline">
                Gratuity Calculator
              </Link>{" "}
              — estimate the lump sum that sits inside your CTC.
            </li>
            <li>
              <Link href="/blog/ctc-vs-in-hand-salary" className="text-forest hover:underline">
                CTC vs In-Hand Salary in India
              </Link>{" "}
              — a full walkthrough of every deduction with a worked example.
            </li>
          </ul>
        </div>
      }
    />
  );
}
