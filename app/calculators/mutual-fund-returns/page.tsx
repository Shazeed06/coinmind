import type { Metadata } from "next";
import MutualFundReturnsCalculator from "@/components/calc/MutualFundReturnsCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Mutual Fund Returns Calculator — Growth & CAGR" },
  description:
    "Free mutual fund returns calculator. Project the future value, total return, absolute return and CAGR of a one-time lumpsum mutual fund investment.",
  alternates: { canonical: "/calculators/mutual-fund-returns" },
  openGraph: { url: "/calculators/mutual-fund-returns" },
};

export default function Page() {
  return (
    <CalcPage
      slug="mutual-fund-returns"
      title="Mutual Fund Returns Calculator"
      subtitle="Project how a one-time mutual fund investment grows, with its total return and annualised CAGR."
      calculator={<MutualFundReturnsCalculator />}
      intro="A mutual fund returns calculator estimates how much a one-time (lumpsum) investment could grow to over time, based on an expected annual rate of return. Enter what you invested, the return you expect and how long you stay invested, and this mutual fund calculator projects the future value along with the total return, the absolute return in percentage terms and the compound annual growth rate (CAGR). It is a quick way to compare funds and set realistic expectations before you invest, whether you are a first-time investor in India or reviewing an existing folio."
      how={{
        heading: "How mutual fund returns are calculated",
        body: (
          <>
            <p>
              For a lumpsum investment, the calculator compounds your money once
              a year using the standard future-value formula:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Future value = P &times; (1 + r)^t
            </p>
            <p>
              Here <strong>P</strong> is the amount you invested,{" "}
              <strong>r</strong> is the expected annual return (as a decimal) and{" "}
              <strong>t</strong> is the number of years. The{" "}
              <strong>total return</strong> is simply the future value minus what
              you put in, the <strong>absolute return</strong> expresses that gain
              as a percentage of the amount invested, and the{" "}
              <strong>CAGR</strong> is the smoothed annual growth rate,
              (Future value / P)^(1 / t) &minus; 1.
            </p>
            <p>
              For example, investing &#8377;100,000 at an expected 12% for 10
              years projects to roughly &#8377;310,585 &mdash; a total return of
              about &#8377;210,585. This is the lumpsum view; if you invest a
              fixed amount every month instead, use the SIP calculator, which
              compounds each instalment separately.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How does a mutual fund returns calculator work?",
          a: "A mutual fund returns calculator takes your invested amount, an expected annual return and a duration, then compounds the money using Future value = P × (1 + r)^t. It shows the projected future value, the total return in money terms, the absolute return as a percentage and the CAGR. It assumes a steady annual return, so actual fund performance will differ year to year.",
        },
        {
          q: "What is the difference between lumpsum and SIP returns?",
          a: "A lumpsum is a single one-time investment, so the whole amount compounds for the full period. A SIP (Systematic Investment Plan) spreads smaller amounts across many months, so each instalment compounds for a different length of time and benefits from rupee-cost averaging. This mf return calculator handles the lumpsum case; use our SIP calculator for monthly investing.",
        },
        {
          q: "What return should I expect from mutual funds in India?",
          a: "Returns depend entirely on the fund type. Equity mutual funds in India have historically delivered roughly 10 to 14% CAGR over long periods, debt funds far less, and hybrid funds in between. These are historical averages, not promises — mutual fund investments are subject to market risk, and past performance does not guarantee future returns.",
        },
        {
          q: "Is CAGR or absolute return better for judging a mutual fund?",
          a: "CAGR is usually the better measure because it accounts for time, giving you a per-year growth rate you can compare across funds held for different durations. Absolute return only tells you the total percentage gain and can look impressive simply because the money was invested for many years. For lumpsum investments the CAGR equals your expected annual return.",
        },
      ]}
      sources={[
        { label: "AMFI", href: "https://www.amfiindia.com" },
        { label: "SEBI", href: "https://www.sebi.gov.in" },
      ]}
    />
  );
}
