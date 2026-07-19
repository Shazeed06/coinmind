import type { Metadata } from "next";
import HourlyToSalaryCalculator from "@/components/calc/HourlyToSalaryCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Hourly to Salary Calculator — Annual Pay" },
  description:
    "Free hourly to salary calculator. Convert an hourly wage into annual, monthly, weekly and daily pay using your hours and weeks worked.",
  alternates: { canonical: "/calculators/hourly-to-salary" },
};

export default function Page() {
  return (
    <CalcPage
      slug="hourly-to-salary"
      title="Hourly to Salary Calculator"
      subtitle="Turn an hourly wage into annual, monthly, weekly and daily pay in seconds."
      calculator={<HourlyToSalaryCalculator />}
      intro="An hourly to salary calculator converts an hourly wage into a full-year salary and everything in between. Enter your hourly rate, the hours you work each week, and the number of weeks you work per year, and it shows your annual, monthly, weekly and daily pay. It is the fast way to compare an hourly job offer against a salaried one, size up a contract or freelance rate, or check how a pay rise flows through to your yearly income."
      how={{
        heading: "How hourly pay converts to a salary",
        body: (
          <>
            <p>
              We build up from weekly earnings. Multiply your wage by hours per
              week to get weekly pay, then multiply by the weeks you work to get
              the annual salary:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              annual = hourly wage × hours per week × weeks per year · monthly =
              annual ÷ 12
            </p>
            <p>
              For example, $25 an hour at 40 hours a week over 52 weeks is
              $52,000 a year, or about $4,333 a month. Using 52 weeks assumes you
              are paid for holidays; drop it to 48 or 50 weeks to allow for
              unpaid time off. These are gross figures &mdash; your take-home pay
              is lower once tax and other deductions come out.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I convert my hourly wage to an annual salary?",
          a: "Multiply your hourly wage by the hours you work per week, then by the number of weeks you work per year. At $20 an hour, 40 hours a week for 52 weeks, that's 20 × 40 × 52 = $41,600 a year. This wage calculator does the maths and also breaks it down to monthly, weekly and daily pay.",
        },
        {
          q: "What is $25 an hour as an annual salary?",
          a: "At a standard 40 hours a week for 52 weeks, $25 an hour works out to $52,000 per year, roughly $4,333 a month. Change the hours or weeks above to match your own schedule — part-time or seasonal work will give a lower annual figure.",
        },
        {
          q: "How many hours are in a work year?",
          a: "A full-time year at 40 hours a week over 52 weeks is 2,080 hours. If you take unpaid leave, use fewer weeks — 48 weeks is 1,920 hours. This hourly to annual salary calculator lets you set both hours per week and weeks per year for an accurate total.",
        },
        {
          q: "Is the calculated salary before or after tax?",
          a: "It's your gross salary, before income tax, national insurance, retirement contributions or other deductions. Your actual take-home pay will be lower. Use this salary calculator to compare offers on a like-for-like gross basis, then apply your local tax rules to estimate net pay.",
        },
      ]}
    />
  );
}
