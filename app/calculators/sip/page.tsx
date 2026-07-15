import type { Metadata } from "next";
import SipCalculator from "@/components/calc/SipCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "SIP Calculator — Estimate Your Mutual Fund Returns" },
  description:
    "Free online SIP calculator. See how much your monthly SIP grows over time with expected returns. Calculate mutual fund maturity value instantly in ₹, $ or £.",
  alternates: { canonical: "/calculators/sip" },
};

export default function Page() {
  return (
    <CalcPage
      slug="sip"
      title="SIP Calculator"
      subtitle="See exactly how your monthly investment compounds into wealth over the years."
      calculator={<SipCalculator />}
      intro="A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals — usually every month. Because you invest consistently regardless of market ups and downs, you benefit from rupee-cost averaging and the long-term power of compounding. This SIP calculator shows the projected maturity value of your investments so you can plan realistic goals."
      how={{
        heading: "How the SIP calculator works",
        body: (
          <>
            <p>
              The calculator uses the standard future-value formula for a series
              of monthly investments:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              FV = P × [ (1 + i)ⁿ − 1 ] / i × (1 + i)
            </p>
            <p>
              Here <strong>P</strong> is your monthly investment,{" "}
              <strong>i</strong> is the monthly rate of return (annual rate ÷
              12), and <strong>n</strong> is the total number of months. Move
              the sliders and the projected corpus updates instantly — nothing
              is sent to a server, so your numbers stay private.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is the SIP return guaranteed?",
          a: "No. Mutual funds are subject to market risk and returns vary year to year. The calculator uses an assumed constant annual return for illustration. Equity funds have historically averaged 10–14% over long periods, but past performance does not guarantee future results.",
        },
        {
          q: "What return rate should I assume?",
          a: "A conservative long-term assumption for diversified equity funds is 10–12%. For debt or hybrid funds, use 6–8%. It's wise to plan with a slightly lower rate so you're pleasantly surprised rather than short.",
        },
        {
          q: "Does a longer SIP really make that much difference?",
          a: "Yes — dramatically. Because returns compound on returns, the last few years of a long SIP contribute the most growth. Starting even a few years earlier can add lakhs to your final corpus.",
        },
        {
          q: "Can I use this calculator outside India?",
          a: "Absolutely. Switch the currency to USD or GBP and use it for any regular monthly investing plan, such as a US 401(k) contribution or a UK stocks & shares ISA.",
        },
      ]}
    />
  );
}
