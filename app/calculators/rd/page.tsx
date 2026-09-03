import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import RdCalculator from "@/components/calc/RdCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "rd")!;
export const metadata = calcMeta("rd", CALC.title + " - Recurring Deposit Maturity & Interest", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="rd"
      title="RD Calculator"
      subtitle="See what a fixed monthly recurring deposit will be worth at maturity."
      calculator={<RdCalculator />}
      sources={[
        { label: "Reserve Bank of India", href: "https://www.rbi.org.in" },
        { label: "India Post", href: "https://www.indiapost.gov.in" },
      ]}
      intro="A Recurring Deposit (RD) lets you save a fixed amount every month and earn compound interest on it, making it one of the easiest disciplined-savings habits for salaried earners. This RD calculator is a recurring deposit calculator that turns your monthly deposit, interest rate and tenure into a maturity value, so you can plan a goal before you open the account. Because banks and the post office compound RD interest quarterly, this rd maturity calculator applies quarterly compounding to every installment and shows your total invested amount, total interest and final maturity value. Use it as a post office RD calculator or a bank RD calculator. The maths is the same; only the interest rate differs by provider."
      how={{
        heading: "How RD maturity is calculated",
        body: (
          <>
            <p>
              Each monthly installment earns interest that compounds quarterly,
              so the total maturity value is the sum of every installment grown
              to the end of the term. The standard recurring deposit formula is:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              M = P × [ (1 + i)ⁿ &minus; 1 ] / [ 1 &minus; (1 + i)^(&minus;1/3) ]
            </p>
            <p>
              Where <strong>P</strong> is your monthly deposit,{" "}
              <strong>i</strong> is the quarterly interest rate (annual rate ÷
              4, as a decimal) and <strong>n</strong> is the number of quarters
              in the tenure. For example, ₹5,000 a month at 7% for 5 years
              (60 months) grows to roughly ₹3.6 lakh, of which about ₹60,000 is
              interest. Longer tenures and higher rates lift the maturity value
              because more of your money spends more time compounding.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is an RD calculator?",
          a: "An RD calculator is a tool that estimates the maturity value of a recurring deposit. You enter your monthly deposit, the interest rate your bank or post office offers and the tenure, and this recurring deposit calculator applies quarterly compounding to show your maturity amount, total invested and total interest earned.",
        },
        {
          q: "How is RD maturity value calculated?",
          a: "This rd maturity calculator uses M = P × [(1 + i)ⁿ − 1] / [1 − (1 + i)^(−1/3)], where P is the monthly deposit, i is the quarterly rate (annual rate ÷ 4) and n is the number of quarters. Each installment compounds quarterly until the deposit matures, so early installments earn slightly more interest than later ones.",
        },
        {
          q: "Is a post office RD calculator different from a bank RD calculator?",
          a: "No. A post office RD calculator and a bank RD calculator use the same quarterly-compounding formula; only the interest rate differs. The post office sets its RD rate quarterly, while banks set their own rates, so enter whichever rate applies to your account to get an accurate maturity value.",
        },
        {
          q: "Is RD interest taxable?",
          a: "Yes. RD interest is added to your income and taxed at your slab rate, and banks deduct TDS if your annual interest crosses the threshold. This RD calculator shows gross interest before tax, so factor in your slab rate when planning post-tax returns.",
        },
        {
          q: "What is the minimum RD amount and tenure?",
          a: "At the post office an RD can be started with as little as ₹100 a month, in multiples of ₹10, and runs for a fixed 5-year term. Banks are more flexible: most accept ₹500 or ₹1,000 a month and offer tenures anywhere from 6 months to 10 years, usually in multiples of 3 months. There is no upper limit on the monthly instalment at either. Enter whichever combination matches your account above.",
        },
        {
          q: "What happens if I miss an RD installment?",
          a: "You are charged a small default fee for each missed month, and the maturity value falls because that instalment never got the chance to compound. Post office RD rules allow you to pay the missed instalment later with the default fee attached, but if too many months are missed in a row the account can be discontinued. Set a standing instruction from your salary account, since even one or two skipped months meaningfully dent the final figure this calculator projects.",
        },
        {
          q: "Can I withdraw my RD before maturity?",
          a: "Yes, but you lose some of the return. Premature closure is generally allowed after a minimum period, and the bank or post office pays interest at a rate below the contracted one, often with an additional penalty of around 1%. Many banks also offer a loan or overdraft against the RD balance, commonly up to a high percentage of it, which is usually cheaper than breaking the deposit if you only need money for a short while.",
        },
        {
          q: "RD or FD: which is better?",
          a: "It depends on whether you have the money now. An FD needs a lump sum upfront and every rupee compounds for the full tenure, so for the same rate and period an FD earns more in total. An RD lets you save out of monthly income, but your later instalments compound for only a few months. If you already have ₹1.2 lakh, an FD wins; if you can only spare ₹10,000 a month, an RD is the practical choice.",
        },
      ]}
    />
  );
}
