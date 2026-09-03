import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import RentVsBuyCalculator from "@/components/calc/RentVsBuyCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "rent-vs-buy")!;
export const metadata = calcMeta("rent-vs-buy", CALC.title + " - Should You Buy?", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="rent-vs-buy"
      title="Rent vs Buy Calculator"
      subtitle="Compare buying a home against renting and investing the difference, and see which leaves you wealthier."
      calculator={<RentVsBuyCalculator />}
      intro="Buying a home is one of the biggest financial decisions you'll ever make, and it isn't always the smarter one. This rent vs buy calculator compares two honest paths over the years you plan to stay: buying with a home loan, or renting the same home and investing the money you would have tied up in a down payment and higher monthly costs. It weighs your loan EMIs, home appreciation, rising rent and investment returns to estimate the net worth you'd end up with either way, so you can decide with numbers instead of gut feel."
      how={{
        heading: "How the comparison works",
        body: (
          <>
            <p>
              On the <strong>buy</strong> side, the calculator works out your
              down payment, monthly EMI and how much loan is still outstanding
              when you sell. It grows the home&apos;s value at your appreciation
              rate and subtracts the remaining loan to get your ending net worth,
              along with the total cash you paid out (down payment, EMIs and a
              simple maintenance estimate of about 1% of the price a year).
            </p>
            <p>
              On the <strong>rent</strong> side, it assumes you invest the money
              you didn&apos;t sink into a down payment, plus any month where
              owning would have cost more than renting. That pot grows at your
              expected investment return while your rent rises each year. The
              final investment corpus is your net worth as a renter.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Verdict = net worth (buy) − net worth (rent)
            </p>
            <p>
              Whichever path leaves you richer wins, and the calculator shows the
              gap. Once you&apos;ve decided to buy, the{" "}
              <Link
                href="/calculators/emi"
                className="text-forest font-medium hover:underline"
              >
                EMI calculator
              </Link>{" "}
              breaks down your monthly payment, and the{" "}
              <Link
                href="/calculators/home-loan-eligibility"
                className="text-forest font-medium hover:underline"
              >
                home loan eligibility calculator
              </Link>{" "}
              shows how big a loan your income can actually support.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Is it better to rent or buy a house?",
          a: "It depends on how long you'll stay, how fast homes appreciate versus what your investments earn, and the gap between rent and an EMI. Over a short stay, renting and investing the down payment often wins because buying costs (down payment, interest-heavy early EMIs, stamp duty and maintenance) haven't had time to pay off. Over a long stay in a market where prices rise steadily, buying usually pulls ahead. Run your own numbers above. The honest answer changes with your assumptions.",
        },
        {
          q: "What is the 5% rule and the break-even point for buying?",
          a: "A popular shortcut is the 5% rule: estimate the yearly cost of owning as roughly 5% of the home's value (about 1% maintenance, 1% property-related costs and 3% for the money tied up), then divide by 12. If that monthly figure is higher than the rent for a similar home, renting and investing the difference tends to win. The break-even point is the number of years you'd need to stay for buying to overtake renting, often somewhere between 5 and 10 years, but it varies a lot by city and interest rate.",
        },
        {
          q: "When is renting the smarter choice?",
          a: "Renting usually wins when you might move within a few years, when property prices are flat or falling, when rent is cheap relative to home prices, or when you can reliably earn more by investing the down payment than the home would appreciate. It also keeps you flexible and free of large upfront costs, money you can channel into a diversified portfolio instead of a single illiquid asset.",
        },
        {
          q: "What hidden costs of buying does this calculator miss?",
          a: "To stay simple the calculator focuses on the down payment, EMIs, home appreciation and a rough 1% maintenance estimate. Real purchases also carry stamp duty and registration, brokerage, property tax, home insurance, society or HOA fees, and selling costs when you exit. These extra costs push the break-even further out, so treat the result as an optimistic-to-fair estimate for buying rather than a floor.",
        },
        {
          q: "Are these results financial advice?",
          a: "No. This is an educational estimate that depends heavily on the assumptions you enter, especially home appreciation and investment return, which nobody can predict. Small changes to those inputs can flip the verdict. Use it to understand the trade-off and pressure-test your plan, then confirm the specifics with a qualified financial advisor before making a decision this large.",
        },
        {
          q: "What is the price to rent ratio and what is a good number?",
          a: "Divide the home price by the annual rent for a similar home. A ₹1 crore flat renting for ₹30,000 a month gives 10000000 ÷ 360000, a ratio of about 28. Broadly, a ratio under 15 favours buying, 15 to 20 is a toss-up, and above 20 tends to favour renting and investing the difference. Ratios in many Indian metros sit well above 25, which is why renting often looks better there than the cultural default suggests.",
        },
        {
          q: "Do home loan tax benefits change the rent vs buy answer?",
          a: "They can, but less than people expect. Under the old tax regime you may claim interest on a self-occupied home loan under Section 24(b) up to ₹2 lakh a year, and the principal repayment counts inside the ₹1.5 lakh Section 80C ceiling. Under the new regime most of that is unavailable for a self-occupied property. If you rent, HRA exemption offers its own relief. This calculator ignores both, so run your own regime through an income tax calculator before deciding.",
        },
        {
          q: "How much rent should I pay relative to my income?",
          a: "A widely used guideline is to keep rent at or below about 30% of your take-home pay, and no more than 40% if you live in an expensive metro and have few other commitments. On a ₹1,00,000 monthly in-hand salary that means roughly ₹30,000 of rent. The same test is worth applying to an EMI: if buying pushes your housing cost far past that share of income, the calculator may say buy while your monthly cash flow says otherwise.",
        },
        {
          q: "How many years do I need to stay for buying to make sense?",
          a: "Long enough for appreciation to cover the one-time costs of buying and selling. In India stamp duty and registration alone commonly run around 5 to 7% of the price depending on the state, and brokerage on both ends adds more. That is a large hole to climb out of, which is why the break-even usually lands somewhere between 5 and 10 years. If you may relocate or change cities inside that window, renting is generally the safer call.",
        },
      ]}
    />
  );
}
