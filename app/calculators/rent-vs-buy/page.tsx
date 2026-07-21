import type { Metadata } from "next";
import Link from "next/link";
import RentVsBuyCalculator from "@/components/calc/RentVsBuyCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Rent vs Buy Calculator — Should You Buy?" },
  description:
    "Should you rent or buy a house? This rent vs buy calculator compares your net worth from buying against renting and investing the difference over your stay.",
  alternates: { canonical: "/calculators/rent-vs-buy" },
  openGraph: { url: "/calculators/rent-vs-buy" },
};

export default function Page() {
  return (
    <CalcPage
      slug="rent-vs-buy"
      title="Rent vs Buy Calculator"
      subtitle="Compare buying a home against renting and investing the difference — and see which leaves you wealthier."
      calculator={<RentVsBuyCalculator />}
      intro="Buying a home is one of the biggest financial decisions you'll ever make, and it isn't always the smarter one. This rent vs buy calculator compares two honest paths over the years you plan to stay: buying with a home loan, or renting the same home and investing the money you would have tied up in a down payment and higher monthly costs. It weighs your loan EMIs, home appreciation, rising rent and investment returns to estimate the net worth you'd end up with either way — so you can decide with numbers instead of gut feel."
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
          a: "It depends on how long you'll stay, how fast homes appreciate versus what your investments earn, and the gap between rent and an EMI. Over a short stay, renting and investing the down payment often wins because buying costs (down payment, interest-heavy early EMIs, stamp duty and maintenance) haven't had time to pay off. Over a long stay in a market where prices rise steadily, buying usually pulls ahead. Run your own numbers above — the honest answer changes with your assumptions.",
        },
        {
          q: "What is the 5% rule and the break-even point for buying?",
          a: "A popular shortcut is the 5% rule: estimate the yearly cost of owning as roughly 5% of the home's value (about 1% maintenance, 1% property-related costs and 3% for the money tied up), then divide by 12. If that monthly figure is higher than the rent for a similar home, renting and investing the difference tends to win. The break-even point is the number of years you'd need to stay for buying to overtake renting — often somewhere between 5 and 10 years, but it varies a lot by city and interest rate.",
        },
        {
          q: "When is renting the smarter choice?",
          a: "Renting usually wins when you might move within a few years, when property prices are flat or falling, when rent is cheap relative to home prices, or when you can reliably earn more by investing the down payment than the home would appreciate. It also keeps you flexible and free of large upfront costs — money you can channel into a diversified portfolio instead of a single illiquid asset.",
        },
        {
          q: "What hidden costs of buying does this calculator miss?",
          a: "To stay simple the calculator focuses on the down payment, EMIs, home appreciation and a rough 1% maintenance estimate. Real purchases also carry stamp duty and registration, brokerage, property tax, home insurance, society or HOA fees, and selling costs when you exit. These extra costs push the break-even further out, so treat the result as an optimistic-to-fair estimate for buying rather than a floor.",
        },
        {
          q: "Are these results financial advice?",
          a: "No. This is an educational estimate that depends heavily on the assumptions you enter — especially home appreciation and investment return, which nobody can predict. Small changes to those inputs can flip the verdict. Use it to understand the trade-off and pressure-test your plan, then confirm the specifics with a qualified financial advisor before making a decision this large.",
        },
      ]}
    />
  );
}
