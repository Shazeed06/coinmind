import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import Link from "next/link";
import CurrencyConverter from "@/components/calc/CurrencyConverter";
import CalcPage from "@/components/calc/CalcPage";
import { CURRENCY_PAIRS, pairSlug } from "@/lib/pseo-currency";

const CALC = calculators.find((c) => c.slug === "currency-converter")!;
export const metadata = calcMeta("currency-converter", CALC.title + " - Live Exchange Rates", CALC.blurb);

// Internal links to the "<X> to INR" programmatic pages. Without these the 17
// currency pages are reachable only from each other and from the sitemap, so
// they receive no internal link equity at all (the orphan-page problem we
// already fixed for /sip/*).
function PopularCurrencyPairs() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-600 text-ink">
        Popular currency pairs
      </h2>
      <p className="mt-2 text-ink-soft leading-relaxed">
        Each pair has its own page with the live rate, a conversion table for
        common amounts, and what actually moves that exchange rate.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {CURRENCY_PAIRS.map((pair) => (
          <Link
            key={pairSlug(pair)}
            href={`/currency/${pairSlug(pair)}`}
            className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-forest hover:text-forest"
          >
            {pair.from} to {pair.to}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <CalcPage
      extra={<PopularCurrencyPairs />}
      slug="currency-converter"
      title="Currency Converter"
      subtitle="Convert between 20+ world currencies at live exchange rates."
      calculator={<CurrencyConverter />}
      intro="A currency converter tells you what an amount in one currency is worth in another, using the latest exchange rates. Whether you are shopping abroad, paying an overseas tuition bill, sending or receiving a remittance, budgeting a holiday, or just curious what the dollar is doing against the rupee, this free currency converter gives you an instant, up-to-date figure with no sign-up and no ads in your way. Rates shown are mid-market reference rates, the level at which currencies trade between banks, so they are the fairest benchmark for judging what your bank, card or transfer service is really charging you once its margin is added."
      how={{
        heading: "How the conversion works",
        body: (
          <>
            <p>
              Exchange rates are quoted against a base currency (here, the US
              dollar). To convert from one currency to another, we first express
              your amount in dollars, then multiply by the target currency&apos;s
              rate:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              result = (amount ÷ rate_from) × rate_to
            </p>
            <p>
              Rates are pulled from a live feed and refresh regularly. Real-world
              rates you get from a bank or card usually include a small margin, so
              treat this as the mid-market reference rate.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "Are these live exchange rates?",
          a: "Yes. Rates are fetched from a live currency feed and refreshed regularly. They reflect the mid-market rate, which is the 'real' rate before any bank or card markup.",
        },
        {
          q: "Why is the rate different from what my bank gives?",
          a: "Banks, cards and money-transfer services add a margin (spread) and sometimes fees on top of the mid-market rate. The rate here is the reference rate; expect to receive slightly less in practice.",
        },
        {
          q: "How many currencies can I convert?",
          a: "You can convert between 20+ major world currencies including USD, INR, EUR, GBP, JPY, AUD, CAD, CNY, AED and SGD. Use the dropdowns to pick any pair.",
        },
        {
          q: "Is this converter free?",
          a: "Completely free, with no sign-up and no limits. Convert as many amounts and currency pairs as you like.",
        },
        {
          q: "Why do exchange rates change every day?",
          a: "Currencies are traded continuously, so their prices move with supply and demand. The main drivers are interest rate differences between countries, inflation, trade and current account balances, crude oil prices (which matter a lot for the rupee since India imports most of its oil), foreign investor flows into and out of Indian markets, and occasional intervention by the Reserve Bank of India. A rate you see today can move by a fraction of a percent within hours.",
        },
        {
          q: "What is the difference between the buying rate and the selling rate?",
          a: "Banks and money changers quote two rates around the mid-market rate: the buying rate is what they pay when you sell them foreign currency, and the selling rate is what they charge when you buy it. The gap between them is the spread, and it is how they make money. On a mid-market rate of Rs 88 to the dollar you might be offered Rs 86.50 to sell and charged Rs 89.50 to buy. Always compare both quotes against the mid-market figure here.",
        },
        {
          q: "Should I use a forex card, a credit card or cash abroad?",
          a: "A prepaid forex card locks in a rate when you load it, which removes the risk of the rupee weakening mid-trip, but reloading and ATM withdrawals carry fees. Indian credit and debit cards typically add a cross-currency markup of roughly 2% to 3.5% on international spends, plus GST on that markup. Carrying a small amount of cash is useful for arrival costs, but airport counters usually give the worst rate. Check the exact charges in your card's schedule of fees.",
        },
        {
          q: "How much foreign currency can I send or take abroad from India?",
          a: "Under the Reserve Bank of India's Liberalised Remittance Scheme, a resident individual can remit up to USD 250,000 per financial year for permitted purposes such as education, travel, medical treatment, gifts and overseas investment. Remittances above certain limits attract tax collected at source, and the rates and exemptions have been revised several times, so confirm both the LRS ceiling and the current TCS position on rbi.org.in and with your bank before you transfer.",
        },
      ]}
    />
  );
}
