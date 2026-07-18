import type { Metadata } from "next";
import FdCalculator from "@/components/calc/FdCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "FD Calculator — Fixed Deposit Maturity & Interest" },
  description:
    "Free fixed deposit (FD) calculator. Find the maturity value and interest earned on your FD with quarterly, monthly or yearly compounding.",
  alternates: { canonical: "/calculators/fd" },
};

export default function Page() {
  return (
    <CalcPage
      slug="fd"
      title="FD Calculator"
      subtitle="Find out exactly what your fixed deposit will be worth at maturity."
      calculator={<FdCalculator />}
      sources={[{ label: "Reserve Bank of India", href: "https://www.rbi.org.in" }]}
      intro="A Fixed Deposit (FD) is one of the safest ways to grow savings: you lock a lump sum with a bank for a fixed term at a fixed interest rate. Because most banks compound interest quarterly, your effective return is a little higher than the headline rate suggests. Use this FD maturity value calculator as a bank FD compound interest calculator — enter the rate your bank offers, the term and the compounding frequency, and it shows your maturity amount, the total interest earned and the annualized yield. It doubles as a compound interest calculator on FD for a single lump sum and as a cumulative deposit interest calculator where interest is reinvested each period rather than paid out."
      how={{
        heading: "How FD maturity is calculated",
        body: (
          <>
            <p>The calculator uses the compound-interest formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              A = P × (1 + r/n)^(n × t)
            </p>
            <p>
              Where <strong>P</strong> is your principal, <strong>r</strong> is
              the annual interest rate, <strong>n</strong> is the number of times
              interest compounds per year (4 for quarterly), and{" "}
              <strong>t</strong> is the term in years. More frequent compounding
              produces a slightly higher maturity value for the same rate.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is FD interest taxable?",
          a: "Yes. In India, FD interest is added to your income and taxed at your slab rate, and banks deduct TDS if interest crosses the annual threshold. The calculator shows gross interest before tax.",
        },
        {
          q: "Which compounding frequency is best?",
          a: "More frequent compounding earns slightly more. Most Indian banks compound quarterly. The difference between quarterly and monthly is small but real over long terms and large amounts.",
        },
        {
          q: "Can I withdraw before maturity?",
          a: "Usually yes, but premature withdrawal typically attracts a penalty and a lower interest rate. If you may need the money sooner, consider a shorter term or a flexi/sweep FD.",
        },
        {
          q: "Is an FD better than an SIP?",
          a: "They serve different goals. FDs offer safety and predictable returns; equity SIPs offer higher potential growth with market risk. Many people use FDs for short-term, capital-protected goals and SIPs for long-term wealth building.",
        },
        {
          q: "How is FD maturity value calculated?",
          a: "This fd compounding interest calculator uses A = P × (1 + r/n)^(n × t). It takes the rate your bank offers, compounds it — quarterly for most bank FDs, though you can switch to monthly or yearly — and returns the maturity amount and total interest. As a compound fd calculator it accounts for interest earning further interest, so a longer term or more frequent compounding lifts the final value for the same headline rate.",
        },
        {
          q: "What is the difference between a cumulative (reinvestment) FD and a payout FD?",
          a: "In a cumulative or reinvestment FD the interest is added back to the principal each period and paid as one lump sum at maturity, so it compounds. In a payout FD the interest is paid out monthly, quarterly or yearly and is not reinvested, so it does not compound. Use this reinvestment fd calculator — effectively a cumulative deposit interest calculator — for the first type; for a payout FD your interest stays flat across each payout.",
        },
        {
          q: "What does 'annualized yield' mean on an FD?",
          a: "Annualized yield is your effective annual return once compounding is included, which is why it sits slightly above the quoted nominal rate. An annualized yield calculator for fd converts the compounded growth into a single yearly percentage, letting you compare FDs with different compounding frequencies on an equal footing rather than by the headline rate alone.",
        },
      ]}
    />
  );
}
