import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverter from "@/components/calc/CurrencyConverter";
import CalcPage from "@/components/calc/CalcPage";
import { CURRENCY_PAIRS, pairSlug } from "@/lib/pseo-currency";

export const metadata: Metadata = {
  title: { absolute: "Currency Converter — Live Exchange Rates" },
  description:
    "Free currency converter with live mid-market rates. Convert USD to INR, EUR, GBP and 20+ currencies instantly — no sign-up, quick and accurate.",
  alternates: { canonical: "/calculators/currency-converter" },
  openGraph: { url: "/calculators/currency-converter" },
};

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
      intro="A currency converter tells you what an amount in one currency is worth in another, using the latest exchange rates. Whether you're shopping abroad, paying an overseas bill, tracking remittances, or just curious what the dollar is doing against the rupee, this free tool gives you an instant, up-to-date figure — no sign-up, no ads in your way."
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
          a: "Yes — rates are fetched from a live currency feed and refreshed regularly. They reflect the mid-market rate, which is the 'real' rate before any bank or card markup.",
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
      ]}
    />
  );
}
