import type { Metadata } from "next";
import CagrCalculator from "@/components/calc/CagrCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "CAGR Calculator — Compound Annual Growth Rate" },
  description:
    "Free CAGR calculator. Find the compound annual growth rate, absolute return and total gain of any investment from its initial value, final value and duration.",
  alternates: { canonical: "/calculators/cagr" },
};

export default function Page() {
  return (
    <CalcPage
      slug="cagr"
      title="CAGR Calculator"
      subtitle="Measure how fast an investment really grew, smoothed into a single annual rate."
      calculator={<CagrCalculator />}
      intro="CAGR (Compound Annual Growth Rate) tells you the steady annual rate at which an investment would have grown from its starting value to its ending value, as if it climbed at the same pace every year. It is the fairest way to compare investments held over different time periods, because it strips out the noise of year-to-year ups and downs. This CAGR calculator turns any initial amount, final value and duration into a clean annualised growth rate, along with the absolute return and total gain."
      how={{
        heading: "How CAGR is calculated",
        body: (
          <>
            <p>The calculator uses the standard CAGR formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              CAGR = (Final value / Initial value)^(1 / years) &minus; 1
            </p>
            <p>
              The result is expressed as a percentage. For example, growing{" "}
              &#8377;100,000 into &#8377;200,000 over 5 years works out to a CAGR
              of about 14.87% &mdash; the constant yearly rate that doubles the
              money in that time. Alongside CAGR, the calculator also shows the{" "}
              <strong>absolute return</strong>, which is the total percentage
              gain ignoring time, and the <strong>total gain</strong> in your
              chosen currency.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is CAGR?",
          a: "CAGR stands for Compound Annual Growth Rate. It is the smoothed, constant annual rate at which an investment would need to grow each year to go from its starting value to its ending value over a given period. It assumes gains are reinvested and compounded every year.",
        },
        {
          q: "What is the difference between CAGR and absolute return?",
          a: "Absolute return is the total percentage gain over the whole period, ignoring how long you held the investment. CAGR converts that into a per-year rate, so it accounts for time. Doubling your money is a 100% absolute return whether it took 2 years or 20, but the CAGR is very different in each case.",
        },
        {
          q: "What is the CAGR formula?",
          a: "CAGR = (Final value / Initial value) raised to the power of (1 / number of years), minus 1, expressed as a percentage. It only needs three inputs: the starting amount, the final amount and the duration in years.",
        },
        {
          q: "Is CAGR the same as actual returns?",
          a: "No. CAGR is a smoothed average that assumes even growth every year, but real investments rise and fall unevenly. A fund can post a 15% CAGR while having negative years in between. CAGR is best for comparing long-term performance, not for predicting any single year's return.",
        },
        {
          q: "What counts as a good CAGR?",
          a: "It depends on the asset and risk. For long-term equity investments, a CAGR of roughly 10 to 15% is generally considered healthy, while fixed deposits and bonds sit lower. Higher CAGR usually comes with higher risk, and past growth never guarantees future returns.",
        },
      ]}
    />
  );
}
