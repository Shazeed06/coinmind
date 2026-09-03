import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import PpfCalculator from "@/components/calc/PpfCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "ppf")!;
export const metadata = calcMeta("ppf", CALC.title + " - Public Provident Fund Maturity", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="ppf"
      title="PPF Calculator"
      subtitle="Estimate the tax-free corpus you'll build with a Public Provident Fund."
      calculator={<PpfCalculator />}
      sources={[
        { label: "National Savings Institute / India Post", href: "https://www.nsiindia.gov.in" },
        { label: "Reserve Bank of India", href: "https://www.rbi.org.in" },
      ]}
      intro="The Public Provident Fund (PPF) is one of India's most popular long-term savings schemes. It offers government-backed safety, a tax-free return, and deductions under Section 80C. With a 15-year lock-in and yearly compounding, it rewards patient savers. This PPF calculator for India works the same whether you open the account at a post office or a bank, because the interest rate is set by the government. Enter your yearly (or monthly) deposit and the current rate to project your maturity amount and total tax-free interest as a PPF return calculator."
      how={{
        heading: "How PPF returns are calculated",
        body: (
          <>
            <p>
              PPF interest is compounded annually on your yearly contributions. Because you contribute each year and interest is credited at year-end, the maturity value is the future value of a yearly annuity:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">FV = A × [ (1 + r)ⁿ − 1 ] / r × (1 + r)</p>
            <p>
              Where <strong>A</strong> is your yearly investment, <strong>r</strong> the annual rate (set by the government, around 7.1%), and <strong>n</strong> the number of years.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "Is PPF interest really tax-free?", a: "Yes. PPF enjoys EEE status: your contributions qualify for 80C deduction, the interest is tax-free, and the maturity amount is tax-free too. That's rare and valuable." },
        { q: "What is the current PPF interest rate?", a: "The government revises it every quarter. It has hovered around 7.1% recently. You can change the rate in the calculator to match the current figure." },
        { q: "Can I withdraw before 15 years?", a: "PPF has a 15-year lock-in. Partial withdrawals are allowed from the 7th year, and loans against the balance from the 3rd year, subject to rules." },
        { q: "What's the maximum I can invest?", a: "You can invest between ₹500 and ₹1.5 lakh per financial year in a PPF account, and the same ₹1.5 lakh also qualifies for a deduction under Section 80C." },
        { q: "Is PPF the same at the post office and at banks?", a: "Yes. PPF is a central government scheme, so the interest rate and rules are identical whether you open the account at a post office or an authorised bank. The government sets a single rate for everyone. That is why this ppf calculator post office monthly view and the bank view give the same result. Confirm the latest rate on the National Savings Institute / India Post source before you calculate." },
        { q: "What is the PPF interest rate today?", a: "There is no permanently fixed figure: the government reviews and notifies the PPF rate every quarter, so the 'ppf interest rate today' can change from one quarter to the next. Rather than hard-coding a number, this ppf calculator india lets you enter the current government-notified rate, which you can verify on the National Savings Institute / India Post source linked below." },
        { q: "Do monthly PPF deposits earn the same as a yearly lump sum?", a: "Not exactly. PPF interest is worked out on the lowest balance between the 5th and the last day of each month, so money paid in earlier, both earlier in the month and earlier in the financial year, earns more. Depositing the full ₹1.5 lakh before the 5th of April typically earns the most, while spreading it across monthly deposits earns slightly less. This ppf return calculator assumes contributions are invested at the start of each period, so treat the monthly-versus-yearly gap as small." },
        { q: "Can I have two PPF accounts?", a: "No. One person is allowed only one PPF account in their own name, whether it is opened at a post office or a bank. If a second account is discovered it is treated as irregular: the extra account is typically closed and the balance refunded without interest, and the accounts are not merged. You may separately open and operate an account as guardian for a minor child, but your own deposits across all of them still count toward the ₹1.5 lakh yearly ceiling." },
        { q: "What happens if I miss a PPF deposit in a year?", a: "The account becomes dormant or discontinued. While it is inactive you cannot take a loan or make a partial withdrawal against it, though the existing balance keeps earning interest. To revive it you deposit the ₹500 minimum for each missed financial year plus a small default fee per missed year, paid along with your current-year contribution. The penalty is nominal, so it is almost always worth reviving rather than leaving the account frozen for the rest of the 15-year term." },
        { q: "Can I extend PPF after 15 years?", a: "Yes, in blocks of 5 years, as many times as you like. You have two options: extend with fresh contributions, which you must elect in writing within a year of maturity and which keeps the ₹1.5 lakh yearly limit and the 80C benefit, or extend without contributions, which happens by default if you do nothing and lets the balance keep earning tax-free interest. The without-contribution route allows one withdrawal per financial year of any amount from the balance." },
      ]}
    />
  );
}
