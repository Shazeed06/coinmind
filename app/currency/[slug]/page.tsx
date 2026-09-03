import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CurrencyConverter from "@/components/calc/CurrencyConverter";
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

// ---- Live rates (server-side, cached 1h) -----------------------------------

type RatesResponse = {
  rates?: Record<string, number>;
  time_last_update_utc?: string;
};

async function getRates(): Promise<{
  rates: Record<string, number> | null;
  updated: string | null;
}> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("upstream");
    const data: RatesResponse = await res.json();
    if (!data.rates) throw new Error("no rates");
    return { rates: data.rates, updated: data.time_last_update_utc ?? null };
  } catch {
    return { rates: null, updated: null };
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
  const description = `Convert ${fromName} (${from}) to ${toName} (${to}) at today's live mid-market rate. Includes a ${from} to ${to} conversion table and free converter.`;
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

  const { rates, updated } = await getRates();
  const rate = computeRate(rates, from, to);

  // FAQs. The nine base entries never depend on the rate feed, so every page
  // renders at least nine answers even when the upstream API is down; live
  // figures are layered on top when a rate is available, and two extra
  // amount-specific questions are appended. Previously the whole list was
  // conditional, which silently dropped these pages to two FAQs on any failure.
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

  const baseFaqs: { q: string; a: string }[] = [
    {
      q: `How do I convert ${from} to ${to}?`,
      a: `Multiply the ${fromName} amount by the current ${from}/${to} rate, or type the amount into the converter above and let it do the arithmetic.${
        rate !== null
          ? ` Today that multiplier is ${fmtRate(rate)}, so 50 ${from} works out to about ${fmtMoney(50 * rate, to)}.`
          : ` The converter fetches the latest rate directly in your browser, so it keeps working even when the figure at the top of this page cannot be loaded.`
      }`,
    },
    {
      q: `Is this the live ${from} to ${to} rate?`,
      a: `This page and the converter both use the mid-market (interbank) ${from}/${to} rate, refreshed roughly every hour. That is the reference rate before any bank, card or transfer margin is added, which is why it tends to look better than any rate you are actually quoted.${
        updated ? ` The figure above was last updated ${updated}.` : ""
      }`,
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
      a: `The ${from}/${to} rate changes continuously through the trading day, so two sites reading at different moments will differ slightly. Beyond timing, some publish the mid-market rate (as this page does), others publish a bank's buy or sell rate, and card networks publish their own daily reference rate. A small gap between sources is normal; a large one usually means you are looking at a rate that already includes somebody's margin.`,
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
      a: `Yes, completely, with no sign-up and no limit on conversions. The rate shown is the mid-market reference rate with nothing added to it, so it is the figure to measure any provider's quote against rather than a rate you can transact at.`,
    },
  ];

  // Amount-specific answers, only meaningful when a live rate is available.
  const rateFaqs: { q: string; a: string }[] =
    rate !== null
      ? [
          {
            q: `What is 100 ${from} in ${to}?`,
            a: `At today's rate, 100 ${fromName} (${from}) is about ${fmtMoney(
              100 * rate,
              to
            )}, based on 1 ${from} = ${fmtMoney(rate, to)}.`,
          },
          {
            q: `What is 1000 ${from} in ${to}?`,
            a: `About ${fmtMoney(1000 * rate, to)} at the mid-market rate of 1 ${from} = ${fmtMoney(
              rate,
              to
            )}. A bank or transfer service will hand you less than this once its margin and fees are applied, so treat it as the ceiling rather than the amount you will receive.`,
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

  const midMarketPara = `The number on this page is the mid-market (interbank) reference rate: the midpoint between the buy and sell price that banks trade at. When you actually exchange money, a bank, card or remittance service quotes a slightly worse rate because it adds a margin and, sometimes, a flat fee. Treat this as the "real" rate and expect to receive a little less in practice.`;

  const relatedPairs = CURRENCY_PAIRS.filter((p) => pairSlug(p) !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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
            item: `${site.url}/currency/${slug}`,
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
          <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Live exchange
          rate
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          {from} to {to}
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert {fromName} ({from}) to {toName} ({to}) using today&apos;s live
          mid-market exchange rate.
        </p>
      </header>

      {/* Quick answer: AEO / featured-snippet target */}
      <section className="mt-8 max-w-3xl rounded-2xl border border-line bg-forest-soft p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        {rate !== null ? (
          <>
            <p className="mt-2 text-xl text-ink leading-relaxed">
              1 {fromName} ({from}) ={" "}
              <strong className="font-600">{fmtMoney(rate, to)}</strong>{" "}
              {toName} ({to}) as of today.
            </p>
            <p className="mt-2 text-ink-soft">
              To convert {from} to {to}, multiply the {from} amount by{" "}
              {fmtRate(rate)}.
            </p>
            {updated && (
              <p className="mt-3 text-xs text-ink-faint">
                Live mid-market rate · updated {updated}
              </p>
            )}
          </>
        ) : (
          <p className="mt-2 text-ink-soft">
            Live rates are momentarily unavailable. Use the converter below. It
            fetches the latest {from} to {to} rate directly in your browser.
          </p>
        )}
      </section>

      {/* Interactive converter: pre-set to this pair */}
      <div className="mt-8 max-w-3xl">
        <CurrencyConverter initialFrom={from} initialTo={to} />
      </div>

      {/* Conversion table */}
      {rate !== null && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-600 text-ink">
            {from} to {to} conversion table
          </h2>
          <p className="mt-2 text-ink-soft">
            Common {fromName} amounts converted to {toName} at the current rate.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper-2 text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    {fromName} ({from})
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {toName} ({to})
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
          {updated && (
            <p className="mt-2 text-xs text-ink-faint">Rates updated {updated}.</p>
          )}
        </section>
      )}

      {/* About the pair */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
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
        <h2 className="font-display text-2xl font-600 text-ink">
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

      {/* Related pairs: internal linking */}
      <section className="mt-14 mb-8">
        <h2 className="font-display text-2xl font-600 text-ink">
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
