import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import EighthPayCommissionCalculator from "@/components/calc/EighthPayCommissionCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "8th-pay-commission")!;
export const metadata = calcMeta(
  "8th-pay-commission",
  "8th Pay Commission Calculator 2026: Salary Hike, Fitment Factor & New Basic Pay",
  CALC.blurb,
);

export default function Page() {
  return (
    <CalcPage
      slug="8th-pay-commission"
      title="8th Pay Commission Calculator"
      subtitle="Estimate your revised basic pay, HRA and salary hike under the 8th Pay Commission for different fitment factors."
      calculator={<EighthPayCommissionCalculator />}
      intro="The 8th Pay Commission is the next salary and pension revision for central government employees and pensioners, with a reference date of 1 January 2026. The exact pay matrix and fitment factor are not yet finalised, so this calculator estimates your revised basic pay by applying an expected fitment factor to your current 7th CPC basic pay, and adds an HRA estimate based on your city. Treat every figure here as an indicative projection, not an official number - the final salary will depend on the pay matrix the government notifies after the Commission submits its report."
      how={{
        heading: "How the 8th Pay Commission salary is calculated",
        body: (
          <>
            <p>
              A pay commission revises the basic pay of central government
              employees using a single multiplier called the{" "}
              <strong>fitment factor</strong>. The core formula is simple:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              New basic pay = Current basic pay × Fitment factor
            </p>
            <p>
              For example, if your current basic pay is ₹25,500 and the fitment
              factor is 2.86, your revised basic pay would be about ₹72,930. The
              7th Pay Commission used a fitment factor of 2.57; for the 8th,
              reported estimates run from about 1.83 to 2.86, while employee
              unions have demanded up to 3.25. The actual number will be decided
              by the government.
            </p>
            <h3>Allowances and DA</h3>
            <p>
              On top of the new basic pay you also get House Rent Allowance
              (HRA), Transport Allowance and other allowances. HRA is shown here
              at the current 7th CPC rates - 24% of basic for X-class (metro)
              cities, 18% for Y-class and 9% for Z-class - though these rates may
              themselves be revised. Importantly, Dearness Allowance (DA) is{" "}
              <strong>reset to 0% when a new pay commission is implemented</strong>{" "}
              and then starts building up again, so it is not added to the
              estimate above.
            </p>
            <h3>When will it be implemented?</h3>
            <p>
              The reference date is 1 January 2026, but the actual revised salary
              and arrears are widely expected only in late 2026 or 2027, once the
              Commission submits its report and the government approves the new
              structure. Arrears are calculated from the reference date, so a
              delay does not reduce what you are eventually owed.
            </p>
            <p>
              To see how your take-home pay changes once you know your gross,
              use the{" "}
              <a href="/calculators/take-home-salary" className="link-editorial text-forest">
                take-home salary calculator
              </a>
              , and plan the tax on a higher salary with the{" "}
              <a href="/calculators/income-tax" className="link-editorial text-forest">
                income tax calculator
              </a>
              .
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is the fitment factor in the 8th Pay Commission?",
          a: "The fitment factor is the multiplier applied to your current basic pay to arrive at the revised basic pay. New basic pay = current basic pay × fitment factor. The 7th Pay Commission used 2.57. For the 8th, reported estimates range from about 1.83 to 2.86, and unions have demanded up to 3.25. The final figure has not been announced.",
        },
        {
          q: "How much salary hike will the 8th Pay Commission give?",
          a: "It depends entirely on the fitment factor the government approves. At a factor of 2.57 your basic pay would rise about 157%, and at 2.86 about 186%, before allowances. Remember that Dearness Allowance resets to 0% at implementation, so the increase in take-home pay is smaller than the jump in basic pay alone suggests.",
        },
        {
          q: "When will the 8th Pay Commission be implemented?",
          a: "The reference date is 1 January 2026. However, the actual revised salary and arrears are widely expected only in late 2026 or 2027, after the Commission submits its report and the government notifies the new pay matrix. Arrears are paid from the 1 January 2026 reference date regardless of the delay.",
        },
        {
          q: "Will pensioners benefit from the 8th Pay Commission?",
          a: "Yes. Basic pension is revised using the same fitment factor, Dearness Relief is recalculated, and pension arrears are payable from the reference date. You can use this calculator with your current basic pension in place of basic pay for a rough estimate of the revised pension.",
        },
        {
          q: "Is this 8th Pay Commission calculator accurate?",
          a: "It is an estimate, not an official figure. The fitment factor, the new pay matrix and the revised allowance rates have not been finalised, so the output should be treated as an indicative projection. Always rely on the official notification from the government and your pay-fixation order for the actual numbers.",
        },
        {
          q: "What is the minimum basic pay expected under the 8th Pay Commission?",
          a: "The current 7th CPC minimum basic pay (Level 1) is ₹18,000. At a fitment factor of 1.83 it would become about ₹32,940, at 2.28 about ₹41,040, and at 2.86 about ₹51,480. The exact minimum depends on the fitment factor and pay matrix the government finally adopts.",
        },
        {
          q: "Does the calculator include DA and other allowances?",
          a: "The calculator shows the revised basic pay and an HRA estimate. Dearness Allowance is not added because it resets to 0% when a new pay commission is implemented and then builds up again. Transport Allowance, medical and other special allowances are extra and vary by pay level and posting.",
        },
      ]}
      sources={[
        {
          label: "Department of Expenditure, Ministry of Finance",
          href: "https://doe.gov.in/",
        },
        {
          label: "7th Central Pay Commission report",
          href: "https://doe.gov.in/order-circular/seventh-central-pay-commission-7cpc-recommendations",
        },
      ]}
    />
  );
}
