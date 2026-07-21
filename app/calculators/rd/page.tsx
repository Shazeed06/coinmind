import type { Metadata } from "next";
import RdCalculator from "@/components/calc/RdCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "RD Calculator — Recurring Deposit Maturity & Interest" },
  description:
    "Free RD calculator to find your recurring deposit maturity value and total interest, with quarterly compounding. Works for bank and post office RD plans.",
  alternates: { canonical: "/calculators/rd" },
  openGraph: { url: "/calculators/rd" },
};

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
      intro="A Recurring Deposit (RD) lets you save a fixed amount every month and earn compound interest on it, making it one of the easiest disciplined-savings habits for salaried earners. This RD calculator is a recurring deposit calculator that turns your monthly deposit, interest rate and tenure into a maturity value, so you can plan a goal before you open the account. Because banks and the post office compound RD interest quarterly, this rd maturity calculator applies quarterly compounding to every installment and shows your total invested amount, total interest and final maturity value. Use it as a post office RD calculator or a bank RD calculator — the maths is the same; only the interest rate differs by provider."
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
      ]}
    />
  );
}
