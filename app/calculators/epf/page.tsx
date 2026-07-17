import type { Metadata } from "next";
import Link from "next/link";
import EpfCalculator from "@/components/calc/EpfCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "EPF Calculator — PF Balance & Maturity Value" },
  description:
    "Free EPF calculator for India. Estimate your Employee Provident Fund corpus at retirement from your basic salary, contribution rate and EPF interest.",
  alternates: { canonical: "/calculators/epf" },
};

export default function Page() {
  return (
    <CalcPage
      slug="epf"
      title="EPF Calculator"
      subtitle="See how big your Employee Provident Fund will grow by the time you retire."
      calculator={<EpfCalculator />}
      intro="The Employee Provident Fund (EPF) is India's flagship retirement-savings scheme for salaried workers. Every month a slice of your basic salary is set aside, matched by your employer, and grown at an interest rate fixed each year by the EPFO. Because contributions rise with your salary and interest compounds year after year, even a modest monthly deduction can build into a substantial tax-free corpus by retirement. This EPF calculator projects that corpus from your current age, salary, existing balance and expected pay increases."
      how={{
        heading: "How your EPF corpus is calculated",
        body: (
          <>
            <p>
              Each month, 12% of your basic salary plus dearness allowance (DA)
              goes into EPF from your side. Your employer also contributes 12%,
              but 8.33% of that is diverted to the EPS pension scheme, so only
              3.67% actually lands in your EPF account.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Monthly EPF = 15.67% × (basic + DA)
            </p>
            <p>
              The calculator simulates every year until retirement: your basic
              grows by the annual increase you set, twelve months of
              contributions are added, and the EPFO interest rate is applied to
              the running balance. Starting from your current EPF balance, it
              compounds forward to show your final corpus, split between what you
              and your employer paid in and the interest it earned.
            </p>
            <p>
              Planning your full retirement picture? Pair this with the{" "}
              <Link href="/calculators/ppf" className="text-forest font-medium hover:underline">
                PPF calculator
              </Link>{" "}
              and the{" "}
              <Link href="/calculators/retirement" className="text-forest font-medium hover:underline">
                retirement calculator
              </Link>{" "}
              to see how your savings add up together.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is EPF and who is eligible?",
          a: "The Employee Provident Fund is a government-backed retirement savings scheme managed by the EPFO. It is mandatory for most salaried employees at companies with 20 or more staff, with both the employee and employer contributing every month toward a lump sum paid out at retirement.",
        },
        {
          q: "How much of my salary goes into EPF?",
          a: "You contribute 12% of your basic salary plus DA each month. Your employer matches 12%, but 8.33% of the employer share is routed to the EPS pension scheme, leaving 3.67% for your EPF. This calculator models a combined 15.67% flowing into the EPF corpus.",
        },
        {
          q: "What is the current EPF interest rate?",
          a: "The EPFO reviews the EPF interest rate every year. It has recently hovered around 8.25% per annum. Interest is credited annually and is tax-free, which is why the default in this calculator sits near that level, though you can change it to test other scenarios.",
        },
        {
          q: "EPF vs PPF — which is better?",
          a: "EPF is tied to salaried employment with employer matching, making it ideal while you work a job. PPF is open to anyone, has a 15-year lock-in and a fixed government rate, and suits the self-employed or those wanting extra tax-free savings. Many people use both to diversify their retirement corpus.",
        },
        {
          q: "When can I withdraw my EPF?",
          a: "The full balance can be withdrawn at retirement (age 58) or after two months of unemployment. Partial withdrawals are allowed earlier for specific needs such as a home purchase, medical emergencies, higher education or marriage, subject to EPFO rules and service-period conditions.",
        },
      ]}
    />
  );
}
