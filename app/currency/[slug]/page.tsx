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

  const title = `${from} to ${to} — Convert ${fromName} to ${toName}`;
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

  // FAQs — numeric answers when the rate is live, generic fallback otherwise.
  const faqs =
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
            q: `Is this the live ${from} to ${to} rate?`,
            a: `Yes. The figure shown is the live mid-market ${from}/${to} rate, refreshed roughly every hour. It's the reference rate before any bank or card markup.`,
          },
          {
            q: `Why is my bank's ${from} to ${to} rate different?`,
            a: `Banks, cards and money-transfer services add a margin (spread) and sometimes a flat fee on top of the mid-market rate, so you'll usually receive a little less than the figure here.`,
          },
          {
            q: `How do I convert ${from} to ${to}?`,
            a: `Multiply the ${from} amount by ${fmtRate(
              rate
            )} to get ${to}. For example, 50 ${from} × ${fmtRate(
              rate
            )} = ${fmtMoney(50 * rate, to)}.`,
          },
        ]
      : [
          {
            q: `Is this the live ${from} to ${to} rate?`,
            a: `The converter on this page fetches the latest mid-market ${from}/${to} rate. It's the reference rate before any bank or card markup.`,
          },
          {
            q: `Why is my bank's ${from} to ${to} rate different?`,
            a: `Banks, cards and money-transfer services add a margin (spread) and sometimes a flat fee on top of the mid-market rate, so you'll usually receive a little less.`,
          },
        ];

  const factors = [
    "Interest-rate decisions by the two central banks",
    "Inflation and growth data from each economy",
    "Trade balances, remittances and foreign investment flows",
    "Global risk sentiment and demand for safe-haven currencies",
  ];

  const aboutPara = `The ${from}/${to} pair tracks how many ${toName} one ${fromName} will buy. The rate isn't fixed — it moves throughout the trading day as currency markets react to fresh economic data and shifting demand for each currency.`;

  const midMarketPara = `The number on this page is the mid-market (interbank) reference rate — the midpoint between the buy and sell price that banks trade at. When you actually exchange money, a bank, card or remittance service quotes a slightly worse rate because it adds a margin and, sometimes, a flat fee. Treat this as the "real" rate and expect to receive a little less in practice.`;

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

      {/* Quick answer — AEO / featured-snippet target */}
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
            Live rates are momentarily unavailable. Use the converter below — it
            fetches the latest {from} to {to} rate directly in your browser.
          </p>
        )}
      </section>

      {/* Interactive converter — pre-set to this pair */}
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

      {/* Related pairs — internal linking */}
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
