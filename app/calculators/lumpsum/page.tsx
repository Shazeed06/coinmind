import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import LumpsumCalculator from "@/components/calc/LumpsumCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "lumpsum")!;
export const metadata = calcMeta("lumpsum", CALC.title + " - One-Time Investment Returns", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="lumpsum"
      title="Lumpsum Calculator"
      subtitle="See what a single, one-time investment could grow into over the years."
      calculator={<LumpsumCalculator />}
      intro="A lumpsum investment is a one-time deposit. You put a large amount to work in a single go rather than spreading it out monthly like an SIP, which makes it the natural choice when you receive an annual bonus, sell a property, collect maturity proceeds or find savings sitting idle in a bank account. Because the entire sum starts compounding from day one, a lumpsum can outperform an equivalent staggered investment in a rising market, though it carries more timing risk. This lumpsum calculator shows the projected future value of a one-time investment, the total gain, and how dramatically the outcome changes with the return you assume and the number of years you stay invested."
      how={{
        heading: "How lumpsum growth is calculated",
        body: (
          <>
            <p>The calculator uses the compound growth formula:</p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">FV = P × (1 + r)ⁿ</p>
            <p>
              Where <strong>P</strong> is your investment, <strong>r</strong> is the annual return, and <strong>n</strong> is the number of years. Because returns compound, the growth accelerates the longer you stay invested.
            </p>
          </>
        ),
      }}
      faqs={[
        { q: "Is lumpsum better than SIP?", a: "In a steadily rising market a lumpsum often wins because your full amount is invested for longer. But an SIP reduces timing risk by averaging your entry price. If you have a large idle sum, many advisors suggest staggering it over a few months." },
        { q: "What return should I assume?", a: "For diversified equity funds, 10-12% is a reasonable long-term assumption. For debt, use 6-8%. Plan conservatively so you aren't disappointed." },
        { q: "Are the returns guaranteed?", a: "No. Market investments carry risk and returns vary year to year. This is an illustration based on a constant assumed rate." },
        { q: "Can I use it for USD or GBP?", a: "Yes. Switch the currency and use it for any one-time investment anywhere in the world." },
        { q: "How much will Rs 10 lakh grow to in 15 years?", a: "At an assumed 12% annual return, Rs 10,00,000 grows to roughly Rs 54.7 lakh over 15 years, so the gain is about Rs 44.7 lakh on your original capital. At a more conservative 10% the same amount reaches around Rs 41.8 lakh, and at 8% about Rs 31.7 lakh. The spread between those three figures shows why the return you assume matters enormously over long periods. None of them is guaranteed." },
        { q: "How is a lumpsum mutual fund investment taxed in India?", a: "For equity mutual funds, units redeemed after more than 12 months attract long-term capital gains tax at 12.5% on gains above the Rs 1,25,000 annual exemption, while units sold within 12 months are taxed at 20%. Gains on specified debt funds are added to your income and taxed at your slab rate regardless of holding period. Tax rules change with each Budget, so confirm the current rates on incometax.gov.in before you redeem." },
        { q: "What is an STP and should I use one for a large lumpsum?", a: "A Systematic Transfer Plan parks your money in a liquid or ultra-short debt fund and moves a fixed amount into an equity fund at regular intervals. It is a common way to deploy a large sum without betting everything on a single day's market level: the parked portion earns a modest return while the transfers average your entry price. The trade-off is that money still waiting to be transferred misses any market rally." },
        { q: "Where can I invest a lumpsum in India?", a: "The usual options are fixed deposits and debt funds for money you may need within a few years, equity mutual funds or index funds for horizons beyond five to seven years, and instruments such as PPF or the National Savings Certificate for long-term tax-favoured saving. Each carries a different risk and liquidity profile. This is general information, not personalised advice, so speak to a SEBI-registered investment adviser about your own situation." },
      ]}
    />
  );
}
