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
      intro="A Fixed Deposit (FD) is one of the safest ways to grow savings: you lock a lump sum with a bank for a fixed term at a fixed interest rate. Because banks usually compound interest quarterly, your effective return is a little higher than the headline rate suggests. This FD calculator shows your maturity amount and total interest earned for any deposit, rate, term and compounding frequency."
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
      ]}
    />
  );
}
