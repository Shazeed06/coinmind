import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CurrencyConverter from "@/components/calc/CurrencyConverter";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { site } from "@/lib/site";
import {
  CURRENCY_PAIRS,
  NAMES,
  PAIR_SLUGS,
  pairSlug,
  parsePairSlug,
} from "@/lib/pseo-currency";
import { IconArrow } from "@/components/icons";

// Only the pairs in PAIR_SLUGS exist; anything else 404s.
export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return PAIR_SLUGS.map((slug) => ({ slug }));
}

// ---- Data source -----------------------------------------------------------
//
// Every figure on these pages comes from one upstream feed: the free
// open.er-api.com endpoint operated by Exchange Rate API, quoted against USD.
// It is the sole source for all 17 pages, so it is named in the visible copy,
// in the FAQs and in the AuthorReviewBox sources rather than left implicit.
const RATES_ENDPOINT = "https://open.er-api.com/v6/latest/USD";
const SOURCE_NAME = "open.er-api.com";
const SOURCE_ORG = "Exchange Rate API";
const SOURCE_URL = "https://www.exchangerate-api.com";

// Checked-in fallback. These are NOT live figures: they are the open.er-api.com
// USD rates as captured on the date below. They exist so that a build-time or
// run-time upstream failure still ships a page with a usable order-of-magnitude
// number, a full conversion table and every FAQ, instead of a rate-less page
// whose only slug-varying content is the currency codes. Anything rendered from
// this table is labelled approximate in the visible copy, and no current rate is
// emitted in the JSON-LD while it is in use.
const REFERENCE_CAPTURED_ISO = "2026-09-03";
const REFERENCE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.863349,
  GBP: 0.741569,
  AED: 3.6725,
  CAD: 1.386499,
  AUD: 1.396686,
  SGD: 1.271719,
  JPY: 159.088772,
  CNY: 6.736468,
  CHF: 0.813381,
  NZD: 1.710674,
  ZAR: 16.066631,
  SAR: 3.75,
  MYR: 4.043245,
  INR: 94.892446,
};

type RatesResponse = {
  rates?: Record<string, number>;
  time_last_update_utc?: string;
};

type RateData = {
  rates: Record<string, number>;
  /** ISO 8601 stamp of the upstream update, null whenever the data is not live. */
  updatedIso: string | null;
  live: boolean;
};

// The upstream stamp arrives as an RFC 1123 string ("Thu, 03 Sep 2026 00:02:31
// +0000"), which is not machine readable in a datetime attribute. Parse it once
// here so the page can render a <time> element with a valid ISO value.
function toIso(raw: string | undefined): string | null {
  if (!raw) return null;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

async function getRates(): Promise<RateData> {
  try {
    const res = await fetch(RATES_ENDPOINT, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("upstream");
    const data: RatesResponse = await res.json();
    if (!data.rates) throw new Error("no rates");
    return {
      rates: data.rates,
      updatedIso: toIso(data.time_last_update_utc),
      live: true,
    };
  } catch {
    // Fall back to the checked-in reference table rather than returning nulls.
    // live:false is what every piece of copy on the page keys off, so the
    // approximate figures can never be presented as today's rate.
    return { rates: REFERENCE_RATES, updatedIso: null, live: false };
  }
}

// Rates are keyed to a USD base: rates[X] = units of X per 1 USD.
function computeRate(
  rates: Record<string, number> | null,
  from: string,
  to: string
): number | null {
  if (!rates || !rates[from] || !rates[to]) return null;
  return rates[to] / rates[from];
}

// ---- Formatting ------------------------------------------------------------

function fmtMoney(value: number, currency: string): string {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const digits = Math.abs(value) > 0 && Math.abs(value) < 1 ? 4 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function fmtRate(rate: number): string {
  const digits = rate < 1 ? 4 : 2;
  return rate.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

// "Sep 3, 2026" / "Sep 3, 2026 at 00:02 UTC": the short-month, day, year form
// the rest of the site uses for dates (see lib/newsArticles.ts, lib/data.ts).
const DAY_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const CLOCK_FMT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

function fmtDay(iso: string): string {
  return DAY_FMT.format(new Date(iso));
}

function fmtStamp(iso: string): string {
  const d = new Date(iso);
  return `${DAY_FMT.format(d)} at ${CLOCK_FMT.format(d)} UTC`;
}

const TABLE_AMOUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

// ---- Metadata --------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) return {};

  const { from, to } = pair;
  const fromName = NAMES[from] ?? from;
  const toName = NAMES[to] ?? to;

  const title = `${from} to ${to} - Convert ${fromName} to ${toName}`;
  // 141 to 155 characters across all 17 pairs, against a 140 to 160 target, and
  // every slug-specific value (both names, both codes) is still in it. It no
  // longer promises "today's live rate", because generateMetadata does not know
  // whether the feed was reachable when the page was built.
  const description = `Convert ${fromName} (${from}) to ${toName} (${to}) at the mid-market rate from ${SOURCE_NAME}. Free converter, a ${from} to ${to} table and what banks add.`;
  const canonical = `/currency/${pairSlug(pair)}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: `${site.url}${canonical}`,
      siteName: site.name,
      locale: "en_US",
      title,
      description,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: title },
      ],
    },
  };
}

// ---- Page ------------------------------------------------------------------

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) notFound();

  const { from, to } = pair;
  const fromName = NAMES[from] ?? from;
  const toName = NAMES[to] ?? to;

  const data = await getRates();

  // A live response that happens to be missing one of the two currencies is
  // treated exactly like an outage: use the reference table and say so.
  const liveRate = data.live ? computeRate(data.rates, from, to) : null;
  const rate = liveRate ?? computeRate(REFERENCE_RATES, from, to);
  const live = liveRate !== null;
  const updatedIso = live ? data.updatedIso : null;
  const capturedDay = fmtDay(REFERENCE_CAPTURED_ISO);

  // One sentence, reused in the copy and the FAQs, that states what the number
  // on the page actually is. Never claims a live rate unless there is one.
  const approxNote = `an approximate reference rate captured on ${capturedDay}, not today's rate`;

  // FAQs. The nine base entries never depend on the rate feed, and the two
  // amount-specific entries now always render because a rate is always
  // available (live, or from the checked-in reference table). So the visible
  // list and the FAQPage JSON-LD are the same eleven questions in both states;
  // only the wording of the rate-dependent answers changes.
  const remittanceQ =
    to === "INR"
      ? `What is the cheapest way to send money to India?`
      : from === "INR"
        ? `What is the cheapest way to send money out of India?`
        : `What is the cheapest way to send ${fromName} abroad?`;

  const remittanceA =
    from === "INR"
      ? `Compare the amount that actually arrives, not the advertised rate. Outward transfers from India run through an authorised dealer bank under the RBI's Liberalised Remittance Scheme, and depending on the purpose and the amount they can attract tax collected at source, so confirm the current rules and your remaining limit with your bank first. After that, the deciding factor is the provider's margin over the mid-market ${from}/${to} rate plus any flat fee, so ask for the exact ${to} figure the recipient will receive and compare it with the number on this page.`
      : `Compare the total cost rather than the headline rate: what matters is how many ${toName} land in the recipient's account after the provider's margin over the mid-market rate and any transfer fee. Specialist online remittance services and direct bank transfers usually beat airport counters, cash exchanges and card cash advances. Because most fees are flat, one larger transfer is normally cheaper than several small ones. Ask each provider to quote the exact ${to} amount that will be received, then measure that against the mid-market figure shown here.`;

  const convertHowA = `Multiply the ${fromName} amount by the current ${from}/${to} rate, or type the amount into the converter above and let it do the arithmetic.${
    rate === null
      ? ` A ${from}/${to} figure cannot be shown right now, so take the current rate from your bank or provider before you calculate anything.`
      : live
        ? ` Today that multiplier is ${fmtRate(rate)}, so 50 ${from} works out to about ${fmtMoney(50 * rate, to)}. The figure at the top of this page and the converter read the same feed (${SOURCE_NAME}), so the two agree.`
        : ` The multiplier shown on this page right now is ${fmtRate(rate)}, ${approxNote}. This page and the converter read the same feed (${SOURCE_NAME}), so when that feed cannot be reached neither of them can show a live number. Use ${fmtRate(rate)} for a rough estimate only, and confirm the current rate with your bank or provider before you convert anything.`
  }`;

  const isLiveA = live
    ? `This page and the converter both use the mid-market (interbank) ${from}/${to} rate published by ${SOURCE_NAME} (${SOURCE_ORG}), refreshed roughly every hour. That is the reference rate before any bank, card or transfer margin is added, which is why it tends to look better than any rate you are actually quoted.${
        updatedIso ? ` The figure above was last updated ${fmtStamp(updatedIso)}.` : ""
      }`
    : `Not at this moment, and the page says so where the rate appears. Both this page and the converter read the mid-market (interbank) ${from}/${to} rate from ${SOURCE_NAME} (${SOURCE_ORG}), and that feed cannot be reached right now, so every figure here is ${approxNote}. A mid-market rate is in any case the reference rate before any bank, card or transfer margin is added, so it is a benchmark to measure quotes against rather than a rate you can transact at. Check the live rate with your bank or provider before acting on anything on this page.`;

  const baseFaqs: { q: string; a: string }[] = [
    {
      q: `How do I convert ${from} to ${to}?`,
      a: convertHowA,
    },
    {
      q: `Is this the live ${from} to ${to} rate?`,
      a: isLiveA,
    },
    {
      q: `Where does this ${from} to ${to} rate come from?`,
      a: `From ${SOURCE_NAME}, the free exchange-rate feed operated by ${SOURCE_ORG}. It publishes mid-market rates against a US Dollar base, which is why every pair on this site is derived from the USD figures rather than quoted directly. We refresh it about once an hour and show the upstream update time next to the rate. It is a single public source: it is accurate enough to benchmark a quote against, and it is not a dealing rate, so no bank is obliged to trade with you at it.`,
    },
    {
      q: `Why is the bank rate worse than the mid-market rate?`,
      a: `Because the mid-market rate is the midpoint between the price at which banks buy and sell ${from} for ${to}, and nobody trades at the midpoint. Banks, card networks and transfer services quote you a rate on one side of it, keeping the difference as their margin, and many add a flat fee as well. The margin is often the larger cost of the two and it is rarely stated as a percentage, so the only reliable check is to compare the amount you actually receive against the mid-market figure on this page.`,
    },
    {
      q: remittanceQ,
      a: remittanceA,
    },
    {
      q: `Are forex cards better than debit cards abroad?`,
      a: `Often, but not always. A prepaid forex card locks the ${from}/${to} rate when you load it, which removes the risk of the rate moving against you and usually carries a smaller margin than a debit card used overseas. Debit and credit cards typically apply a foreign transaction markup on each purchase and can charge extra for ATM withdrawals. Against that, forex cards have issue, reload and inactivity charges, and leftover balance is converted back at a worse rate. Compare the total of margin plus fees for the amount you plan to spend rather than assuming either is cheaper.`,
    },
    {
      q: `Why do different websites show different ${from} to ${to} rates?`,
      a: `The ${from}/${to} rate changes continuously through the trading day, so two sites reading at different moments will differ slightly. Beyond timing, some publish the mid-market rate (as this page does, via ${SOURCE_NAME}), others publish a bank's buy or sell rate, and card networks publish their own daily reference rate. A small gap between sources is normal; a large one usually means you are looking at a rate that already includes somebody's margin.`,
    },
    {
      q: `What moves the ${from}/${to} exchange rate?`,
      a: `Mainly interest-rate decisions at the two central banks, inflation and growth data from each economy, trade balances and remittance and investment flows between them, and global risk sentiment, which pushes money toward currencies seen as safe havens. None of these move in a predictable order, which is why exchange rates cannot be forecast reliably even by the institutions that trade them.`,
    },
    {
      q: `When is the best time to convert ${from} to ${to}?`,
      a: `There is no reliable way to time it, and waiting for a better rate is a bet rather than a strategy. If you need the money on a set date, converting on a schedule or splitting a large amount into a few tranches reduces the impact of any single day's rate. If you are converting a large sum, the provider's margin will usually cost you more than the day-to-day movement in the rate, so shopping around beats waiting.`,
    },
    {
      q: `Is this ${from} to ${to} converter free?`,
      a: `Yes, completely, with no sign-up and no limit on conversions. The rate shown is the mid-market reference rate from ${SOURCE_NAME} with nothing added to it, so it is the figure to measure any provider's quote against rather than a rate you can transact at.`,
    },
  ];

  // Amount-specific answers. They render in both states; when the feed is down
  // the answer names the figure as approximate and dated instead of "today's".
  const rateFaqs: { q: string; a: string }[] =
    rate !== null
      ? [
          {
            q: `What is 100 ${from} in ${to}?`,
            a: live
              ? `At today's rate, 100 ${fromName} (${from}) is about ${fmtMoney(
                  100 * rate,
                  to
                )}, based on 1 ${from} = ${fmtMoney(rate, to)}.`
              : `About ${fmtMoney(100 * rate, to)}, based on 1 ${from} = ${fmtMoney(
                  rate,
                  to
                )}. That is ${approxNote}, because live data from ${SOURCE_NAME} is unavailable at the moment, so treat it as an estimate and check the current rate before you convert.`,
          },
          {
            q: `What is 1000 ${from} in ${to}?`,
            a: live
              ? `About ${fmtMoney(1000 * rate, to)} at the mid-market rate of 1 ${from} = ${fmtMoney(
                  rate,
                  to
                )}. A bank or transfer service will hand you less than this once its margin and fees are applied, so treat it as the ceiling rather than the amount you will receive.`
              : `About ${fmtMoney(1000 * rate, to)} at a mid-market rate of 1 ${from} = ${fmtMoney(
                  rate,
                  to
                )}, which is ${approxNote} because live data from ${SOURCE_NAME} is unavailable at the moment. Even on a live rate a bank or transfer service hands you less than the mid-market figure once its margin and fees are applied, so treat this as a rough ceiling and confirm the current rate first.`,
          },
        ]
      : [];

  const faqs = [...baseFaqs, ...rateFaqs];

  const factors = [
    "Interest-rate decisions by the two central banks",
    "Inflation and growth data from each economy",
    "Trade balances, remittances and foreign investment flows",
    "Global risk sentiment and demand for safe-haven currencies",
  ];

  const aboutPara = `The ${from}/${to} pair tracks how many ${toName} one ${fromName} will buy. The rate isn't fixed. It moves throughout the trading day as currency markets react to fresh economic data and shifting demand for each currency.`;

  const midMarketPara = `The number on this page is the mid-market (interbank) reference rate published by ${SOURCE_NAME} (${SOURCE_ORG}): the midpoint between the buy and sell price that banks trade at. When you actually exchange money, a bank, card or remittance service quotes a slightly worse rate because it adds a margin and, sometimes, a flat fee. Treat this as the "real" rate and expect to receive a little less in practice.`;

  const relatedPairs = CURRENCY_PAIRS.filter((p) => pairSlug(p) !== slug);

  const pageUrl = `${site.url}/currency/${slug}`;

  // Entity node for the thing this page is actually about: the currency pair.
  // A machine-readable currentExchangeRate is emitted ONLY while the feed is
  // live. In the fallback state the node stays, so the page still describes its
  // subject, but it publishes no current rate and its description says the
  // visible figures are approximate and when they were captured.
  const exchangeRateNode: Record<string, unknown> = {
    "@type": "ExchangeRateSpecification",
    "@id": `${pageUrl}#exchange-rate`,
    name: `${from} to ${to} exchange rate`,
    currency: from,
    ...(live && rate !== null
      ? {
          description: `Mid-market (interbank) ${from}/${to} reference rate published by ${SOURCE_NAME} (${SOURCE_ORG}).`,
          currentExchangeRate: {
            "@type": "UnitPriceSpecification",
            price: Number(rate.toFixed(6)),
            priceCurrency: to,
            ...(updatedIso ? { validFrom: updatedIso } : {}),
          },
        }
      : {
          description: `Live ${from}/${to} data from ${SOURCE_NAME} is unavailable, so this page shows an approximate reference rate captured on ${capturedDay}. No current rate is published here.`,
        }),
  };

  const converterNode = {
    "@type": "WebApplication",
    "@id": `${pageUrl}#converter`,
    name: `${from} to ${to} Currency Converter`,
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    featureList: [
      `Convert ${fromName} (${from}) to ${toName} (${to})`,
      `${from} to ${to} conversion table`,
      "Mid-market (interbank) reference rates",
    ],
    about: { "@id": `${pageUrl}#exchange-rate` },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      exchangeRateNode,
      converterNode,
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Currency Converter",
            item: `${site.url}/calculators/currency-converter`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${from} to ${to}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/calculators/currency-converter"
          className="hover:text-forest"
        >
          Currency Converter
        </Link>
        <span>/</span>
        <span className="text-ink">
          {from} to {to}
        </span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          {live ? "Live exchange rate" : "Approximate reference rate"}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl text-ink leading-[1.05]">
          {from} to {to}
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert {fromName} ({from}) to {toName} ({to}) at the mid-market
          exchange rate published by {SOURCE_NAME}.
        </p>
      </header>

      {/* Quick answer: AEO / featured-snippet target */}
      <section className="mt-8 max-w-3xl rounded-2xl border border-line bg-forest-soft p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        {rate !== null ? (
          <>
            {!live && (
              <p className="mt-3 rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink leading-relaxed">
                <strong className="font-600">
                  Live rates are unavailable right now.
                </strong>{" "}
                Every figure on this page is an approximate reference rate
                captured on{" "}
                <time dateTime={REFERENCE_CAPTURED_ISO}>{capturedDay}</time>, not
                today&apos;s rate. Confirm the current rate with your bank or
                provider before you convert or send money.
              </p>
            )}
            <p className="mt-3 text-xl text-ink leading-relaxed">
              1 {fromName} ({from}) ={" "}
              <strong className="font-600">{fmtMoney(rate, to)}</strong>{" "}
              {toName} ({to}){" "}
              {live ? (
                "as of today."
              ) : (
                <>
                  (approximate, captured{" "}
                  <time dateTime={REFERENCE_CAPTURED_ISO}>{capturedDay}</time>).
                </>
              )}
            </p>
            <p className="mt-2 text-ink-soft">
              To convert {from} to {to}, multiply the {from} amount by{" "}
              {fmtRate(rate)}.
            </p>
            <p className="mt-3 text-xs text-ink-faint">
              {live ? (
                <>
                  Live mid-market rate from{" "}
                  <a
                    href={SOURCE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline underline-offset-2"
                  >
                    {SOURCE_NAME}
                  </a>
                  {updatedIso ? (
                    <>
                      , updated{" "}
                      <time dateTime={updatedIso}>{fmtStamp(updatedIso)}</time>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  Approximate mid-market rate captured from{" "}
                  <a
                    href={SOURCE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline underline-offset-2"
                  >
                    {SOURCE_NAME}
                  </a>{" "}
                  on <time dateTime={REFERENCE_CAPTURED_ISO}>{capturedDay}</time>
                  . Not a live rate.
                </>
              )}
            </p>
          </>
        ) : (
          <p className="mt-2 text-ink-soft">
            A {from} to {to} rate cannot be shown right now. Take the current
            rate from your bank or provider instead of relying on this page.
          </p>
        )}
      </section>

      {/* Interactive converter: pre-set to this pair */}
      <div className="mt-8 max-w-3xl">
        <CurrencyConverter initialFrom={from} initialTo={to} />
      </div>

      {/* Conversion table. Rendered in both states: when the feed is down the
          structure stays and the numbers are labelled approximate. */}
      {rate !== null && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl text-ink">
            {from} to {to} conversion table
          </h2>
          <p className="mt-2 text-ink-soft">
            Common {fromName} amounts converted to {toName} at{" "}
            {live ? (
              "the current rate."
            ) : (
              <>
                an approximate reference rate captured on{" "}
                <time dateTime={REFERENCE_CAPTURED_ISO}>{capturedDay}</time>, not
                today&apos;s rate.
              </>
            )}
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                {from} to {to} conversion table at{" "}
                {live
                  ? "the current mid-market rate"
                  : `an approximate reference rate captured on ${capturedDay}`}
              </caption>
              <thead className="bg-paper-2 text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    {fromName} ({from})
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {toName} ({to}){live ? "" : " (approximate)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {TABLE_AMOUNTS.map((n) => (
                  <tr key={n} className="text-ink-soft">
                    <td className="px-4 py-3">
                      {n.toLocaleString("en-US")} {from}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">
                      {fmtMoney(n * rate, to)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Source: {SOURCE_NAME} ({SOURCE_ORG}).{" "}
            {live ? (
              updatedIso ? (
                <>
                  Rates updated{" "}
                  <time dateTime={updatedIso}>{fmtStamp(updatedIso)}</time>.
                </>
              ) : (
                "Rates refreshed hourly."
              )
            ) : (
              <>
                Figures captured{" "}
                <time dateTime={REFERENCE_CAPTURED_ISO}>{capturedDay}</time> and
                shown because live data is unavailable.
              </>
            )}
          </p>
        </section>
      )}

      {/* About the pair */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
          About converting {fromName} to {toName}
        </h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>{aboutPara}</p>
          <div>
            <p className="text-ink font-medium">
              What moves the {from}/{to} rate?
            </p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              {factors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <p>{midMarketPara}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Link to the full converter */}
      <section className="mt-10 max-w-3xl">
        <Link
          href="/calculators/currency-converter"
          className="group inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-forest hover:border-forest transition-colors"
        >
          Open the full Currency Converter (20+ currencies)
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <div className="mt-12 max-w-3xl">
        <AuthorReviewBox
          sources={[
            { label: `${SOURCE_ORG} (${SOURCE_NAME})`, href: SOURCE_URL },
            { label: "Reserve Bank of India", href: "https://www.rbi.org.in" },
            {
              label: "Income Tax Department (TCS on remittances)",
              href: "https://www.incometax.gov.in",
            },
          ]}
        />
      </div>

      <div className="mt-8 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft leading-relaxed">
        <strong className="text-ink">A note on accuracy:</strong> exchange rates
        move continuously, and the mid-market figure shown here is a reference
        rate rather than a rate you can deal at. No bank, card network or
        transfer service is obliged to give it to you. Always confirm the exact{" "}
        {to} amount your provider will deliver before you commit to a transfer.
      </div>

      {/* Related pairs: internal linking */}
      <section className="mt-14 mb-8">
        <h2 className="font-display text-2xl text-ink">
          Popular conversions
        </h2>
        <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {relatedPairs.map((p) => (
            <Link
              key={pairSlug(p)}
              href={`/currency/${pairSlug(p)}`}
              className="group rounded-xl border border-line bg-card px-4 py-3 hover:border-forest transition-colors"
            >
              <span className="font-display text-base font-600 text-ink group-hover:text-forest transition-colors">
                {p.from} to {p.to}
              </span>
              <span className="mt-0.5 block text-xs text-ink-faint">
                {NAMES[p.from] ?? p.from} → {NAMES[p.to] ?? p.to}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
