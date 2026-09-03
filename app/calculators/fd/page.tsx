import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import FdCalculator from "@/components/calc/FdCalculator";
import CalcPage from "@/components/calc/CalcPage";
import { FD_AMOUNTS, fdSlug, fdLabel } from "@/lib/pseo-fd";

const CALC = calculators.find((c) => c.slug === "fd")!;
export const metadata = calcMeta("fd", CALC.title + " - Fixed Deposit Maturity & Interest", CALC.blurb);

// Internal links to the "FD on Rs X" programmatic pages. Without these the 15
// amount pages have no inbound links anywhere on the site, so they receive no
// internal link equity at all (the same orphan problem already fixed for
// /currency/*, /in-hand-salary/* and /income-tax/*). The list is derived from
// FD_AMOUNTS so a new amount can never ship unlinked.
function FdByAmount() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-ink">
        FD maturity by deposit amount
      </h2>
      <p className="mt-3 text-ink-soft leading-relaxed">
        Already know how much you want to deposit? Each amount has its own page
        with the full maturity grid from 6% to 8% across 1, 2, 3, 5 and 10 year
        tenures, the interest earned at each, and the tax and TDS rules that
        apply to it.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {FD_AMOUNTS.map((amount) => (
          <Link
            key={amount}
            href={`/calculators/fd/${fdSlug(amount)}`}
            className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest"
          >
            {fdLabel(amount)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <CalcPage
      extra={<FdByAmount />}
      slug="fd"
      title="FD Calculator"
      subtitle="Find out exactly what your fixed deposit will be worth at maturity."
      calculator={<FdCalculator />}
      sources={[{ label: "Reserve Bank of India", href: "https://www.rbi.org.in" }]}
      intro="A Fixed Deposit (FD) is one of the safest ways to grow savings: you lock a lump sum with a bank for a fixed term at a fixed interest rate. Because most banks compound interest quarterly, your effective return is a little higher than the headline rate suggests. Use this FD maturity value calculator as a bank FD compound interest calculator: enter the rate your bank offers, the term and the compounding frequency, and it shows your maturity amount, the total interest earned and the annualized yield. It doubles as a compound interest calculator on FD for a single lump sum and as a cumulative deposit interest calculator where interest is reinvested each period rather than paid out."
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
          a: "This fd compounding interest calculator uses A = P × (1 + r/n)^(n × t). It takes the rate your bank offers, compounds it (quarterly for most bank FDs, though you can switch to monthly or yearly) and returns the maturity amount and total interest. As a compound fd calculator it accounts for interest earning further interest, so a longer term or more frequent compounding lifts the final value for the same headline rate.",
        },
        {
          q: "What is the difference between a cumulative (reinvestment) FD and a payout FD?",
          a: "In a cumulative or reinvestment FD the interest is added back to the principal each period and paid as one lump sum at maturity, so it compounds. In a payout FD the interest is paid out monthly, quarterly or yearly and is not reinvested, so it does not compound. Use this reinvestment fd calculator, effectively a cumulative deposit interest calculator, for the first type; for a payout FD your interest stays flat across each payout.",
        },
        {
          q: "Do senior citizens get a higher FD rate?",
          a: "Most Indian banks add a small extra rate for depositors above 60, and many run special senior citizen schemes on selected tenures. The uplift differs by bank and by term, so check the senior citizen rate card rather than assuming a fixed addition, then enter that rate in the calculator to see what it is worth on your deposit.",
        },
        {
          q: "What happens when my FD matures?",
          a: "Banks either credit the maturity amount to your linked account or auto-renew the deposit for the same term at the rate applicable on the renewal date, depending on the instruction you gave when booking. Auto-renewal is convenient but silently re-prices your money at whatever rate is current then, which can be higher or lower, so check the maturity instruction on your deposit receipt and set a reminder for the date.",
        },
        {
          q: "What does 'annualized yield' mean on an FD?",
          a: "Annualized yield is your effective annual return once compounding is included, which is why it sits slightly above the quoted nominal rate. An annualized yield calculator for fd converts the compounded growth into a single yearly percentage, letting you compare FDs with different compounding frequencies on an equal footing rather than by the headline rate alone.",
        },
        {
          q: "What is a tax-saving FD and how is it different from a regular FD?",
          a: "A tax-saving fixed deposit carries a mandatory five-year lock-in and qualifies for deduction under Section 80C, within the overall Rs 1,50,000 limit shared with PPF, ELSS and other 80C investments, and only under the old tax regime. Unlike a regular FD you cannot withdraw early or borrow against it, and the interest it earns is still fully taxable at your slab rate. Confirm the current 80C position on incometax.gov.in before you rely on the deduction.",
        },
      ]}
    />
  );
}
