import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import SukanyaSamriddhiCalculator from "@/components/calc/SukanyaSamriddhiCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "sukanya-samriddhi")!;
export const metadata = calcMeta("sukanya-samriddhi", CALC.title + " - SSY Maturity", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="sukanya-samriddhi"
      title="Sukanya Samriddhi Yojana Calculator"
      subtitle="Project the tax-free corpus an SSY account can build for your daughter."
      calculator={<SukanyaSamriddhiCalculator />}
      sources={[
        {
          label: "National Savings Institute / India Post",
          href: "https://www.nsiindia.gov.in",
        },
      ]}
      intro="Sukanya Samriddhi Yojana (SSY) is a government-backed small-savings scheme for a girl child, offering one of the highest fixed rates among such schemes plus full tax benefits. This Sukanya Samriddhi Yojana calculator, an SSY calculator that doubles as an SSY maturity calculator, estimates the corpus your account can grow into by maturity. You deposit for the first 15 years and the account keeps earning annually compounded interest until it matures 21 years after opening. Enter your yearly deposit, the girl's current age and the current interest rate, and this sukanya samriddhi calculator shows your total invested amount, total interest and final maturity value. SSY enjoys EEE tax status, so deposits qualify under Section 80C and both the interest and the maturity amount are tax-free."
      how={{
        heading: "How SSY maturity is calculated",
        body: (
          <>
            <p>
              You contribute for 15 years, but the account matures 21 years
              after opening, so the balance keeps compounding annually for the
              final years with no fresh deposits. The calculator compounds each
              yearly deposit annually until year 21 using:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              A = Σ D × (1 + r)^(22 &minus; y), for each deposit year y = 1…15
            </p>
            <p>
              Where <strong>D</strong> is your yearly deposit and{" "}
              <strong>r</strong> is the annual rate. The interest rate is set by
              the government every quarter, currently 8.2%, and is not
              guaranteed for the full term, so treat the result as an estimate
              and update the rate whenever it changes. Deposits range from ₹250
              to ₹1.5 lakh per financial year.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is a Sukanya Samriddhi Yojana calculator?",
          a: "A Sukanya Samriddhi Yojana calculator estimates the maturity value of an SSY account for a girl child. You enter the yearly deposit, the girl's current age and the current interest rate, and this SSY calculator compounds each deposit annually to maturity, showing your total invested amount, interest earned and final corpus.",
        },
        {
          q: "How is SSY maturity value calculated?",
          a: "This ssy maturity calculator applies annual compounding. Deposits are made for the first 15 years, then the balance keeps compounding until the account matures 21 years after opening. Each yearly deposit grows at the annual rate for the number of years until year 21, and the maturity value is the sum of all those grown deposits.",
        },
        {
          q: "What is the current SSY interest rate?",
          a: "The government reviews and notifies the Sukanya Samriddhi Yojana rate every quarter, so there is no permanently fixed figure. It is currently around 8.2%, but it can change from one quarter to the next. This sukanya samriddhi calculator lets you enter the current rate rather than assuming a guaranteed one. Confirm the latest figure on the National Savings Institute / India Post source before you calculate.",
        },
        {
          q: "Is SSY tax-free?",
          a: "Yes. SSY has EEE (Exempt-Exempt-Exempt) tax status. Your deposits qualify for a deduction under Section 80C up to ₹1.5 lakh a year, the interest earned each year is tax-free, and the final maturity amount is tax-free too, a rare combination that makes the sukanya samriddhi yojana calculator's projected corpus fully yours.",
        },
        {
          q: "Who can open an SSY account and how many are allowed?",
          a: "A parent or legal guardian can open the account for a girl child before she turns 10, and the account is held in her name. The limit is two accounts per family, one for each girl, with an exception allowing a third where twins or triplets are born, supported by a birth certificate. Only one account is permitted per girl, whether opened at a post office or an authorised bank. Deposits across all your accounts still sit inside the ₹1.5 lakh yearly ceiling.",
        },
        {
          q: "What happens if I miss the minimum SSY deposit in a year?",
          a: "The account is treated as in default. The existing balance continues to earn the notified interest, but you cannot deposit fresh money until the account is regularised. Reviving it means paying the ₹250 minimum for each missed financial year plus a small penalty per defaulted year. The fee is nominal, so reviving is almost always worth it, since a gap in contributions directly reduces the maturity value this ssy calculator projects.",
        },
        {
          q: "Can I withdraw from SSY before maturity?",
          a: "Only in specific situations. Once the girl turns 18 or passes class 10, up to 50% of the balance at the end of the preceding financial year can be withdrawn for her higher education, on production of an admission or fee document, taken either as a lump sum or in instalments. The account can also be closed for her marriage after she turns 18. Premature closure otherwise is allowed only on grounds such as the death of the account holder.",
        },
        {
          q: "SSY or PPF: which is better for a girl child?",
          a: "SSY usually carries a higher notified rate and both are EEE, so the tax treatment is identical and both share the ₹1.5 lakh Section 80C ceiling. The real difference is control: SSY money is earmarked for the girl and can only be used for her education or marriage, and matures 21 years after opening, while PPF matures in 15 years and can be extended and used freely. Many families run both, and you can compare them using this calculator and the PPF calculator.",
        },
      ]}
    />
  );
}
