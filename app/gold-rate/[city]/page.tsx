import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  GOLD_CITIES,
  GOLD_CITY_SLUGS,
  getGoldCity,
  fetchGoldRate,
  computeCityRates,
} from "@/lib/gold-data";
import { graph, breadcrumb, faqPage } from "@/lib/ld";

export const dynamicParams = false;
export const revalidate = 21600; // revalidate every 6 hours

export function generateStaticParams() {
  return GOLD_CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getGoldCity(city);
  if (!cityData) return {};
  const { name, state } = cityData;
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return {
    title: { absolute: `Gold Rate Today in ${name} (${today}) - 22K & 24K Price` },
    description: `Gold rate in ${name} today: 22 carat and 24 carat gold price per gram, 5g, 8g, 10g, and 100g with and without 3% GST. Updated 6-hourly from live market data.`,
    alternates: { canonical: `/gold-rate/${city}` },
    openGraph: {
      type: "article",
      url: `${site.url}/gold-rate/${city}`,
      siteName: site.name,
      locale: "en_IN",
      title: `Gold Rate Today in ${name} (${today})`,
      description: `Today's 22K and 24K gold price in ${name}, ${state}. Prices per gram and per 10 grams with and without GST.`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Gold rate ${name}` }],
    },
  };
}

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getGoldCity(city);
  if (!cityData) notFound();

  const { name, state, adj24K } = cityData;
  const rateResult = await fetchGoldRate();
  const rates = computeCityRates(rateResult.price24K_10g, adj24K);

  const todayFull = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const todayShort = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const WEIGHTS = ["1g", "5g", "8g", "10g", "100g"] as const;
  const KARATS = ["24K", "22K", "18K"] as const;

  const faqs = [
    {
      q: `What is the gold rate in ${name} today?`,
      a: `The 22 carat gold rate in ${name} today is ${fmt(rates["22K"]["10g"].base)} per 10 grams (${fmt(rates["22K"]["1g"].base)} per gram) before GST. The 24 carat gold rate is ${fmt(rates["24K"]["10g"].base)} per 10 grams. These prices are sourced from live international gold market data and updated every 6 hours.`,
    },
    {
      q: `What is the 22 carat gold price per gram in ${name}?`,
      a: `The 22 carat (916) gold price per gram in ${name} today is approximately ${fmt(rates["22K"]["1g"].base)} without GST and ${fmt(rates["22K"]["1g"].gst)} including 3% GST. Jewellers add making charges and GST on top of the base rate, so the final bill will be higher than the base rate shown here.`,
    },
    {
      q: `Why is the gold rate different in ${name} compared to other cities?`,
      a: `Gold rates vary slightly between Indian cities due to local transportation costs, state levies, and demand patterns. ${name} in ${state} typically runs ${adj24K > 0 ? `about ₹${adj24K} per 10g higher than Mumbai` : "close to the Mumbai base rate"} due to regional factors. The international spot price of gold forms the base, and city-level differences are small (₹50–₹500 per 10g) relative to the total price.`,
    },
    {
      q: "How is the gold rate calculated?",
      a: `The gold rate is derived from the international spot price of gold in USD per troy ounce (1 troy oz = 31.1035 grams), converted to INR using the current USD/INR exchange rate. The 22K rate is 22/24 × the 24K rate. A 3% GST is added separately at the point of purchase. The IBJA (India Bullion and Jewellers Association) publishes official daily rates that jewellers follow.`,
    },
    {
      q: "What is the difference between 22K and 24K gold?",
      a: `24 carat (24K or 999.9) is pure gold — 99.9% gold content. 22 carat (22K or 916) is 91.6% gold mixed with 8.4% other metals like silver or copper to add hardness. Most Indian jewellery is made in 22K because pure 24K is too soft. Coins and bars are often 24K. The price difference reflects the purity: 22K is about 91.6% of the 24K price.`,
    },
    {
      q: "Is GST charged on gold purchases in India?",
      a: `Yes. A 3% GST (Goods and Services Tax) is charged on the purchase of gold jewellery and coins in India. Additionally, jewellers charge 5% GST on making charges. So the effective total tax when buying jewellery is higher than just 3%. The gold rate tables on this page show prices both with and without the 3% GST on the metal itself.`,
    },
    {
      q: "How often does the gold rate change?",
      a: `The international gold price changes every second during market hours, just like stock prices. In practice, most Indian jewellers update their displayed rates once or twice a day (morning and sometimes evening). This page fetches live international data and updates every 6 hours. Rates on this page are indicative; always confirm the current rate with your jeweller before purchasing.`,
    },
    {
      q: `Where can I buy gold in ${name}?`,
      a: `Gold can be bought in ${name} from hallmarked jewellery shops, banks (for coins and bars), and online platforms for digital gold. Always insist on BIS hallmarking (look for the HUID six-digit code on physical gold) and a proper GST invoice. For investment purposes, gold ETFs or Sovereign Gold Bonds offer the same price exposure without making charges. Compare rates across a few jewellers before purchasing.`,
    },
  ];

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Gold Rate", path: "/gold-rate" },
      { name: `Gold Rate in ${name}` },
    ]),
    faqPage(faqs),
    {
      "@type": "WebPage",
      "@id": `${site.url}/gold-rate/${city}`,
      name: `Gold Rate Today in ${name}`,
      description: `Today's gold rate in ${name}: 22K and 24K prices per gram and 10 grams.`,
      dateModified: rateResult.fetchedAt,
      inLanguage: "en-IN",
    },
  ]);

  return (
    <div className="container-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/gold-rate" className="hover:text-forest">Gold Rate</Link>
        <span>/</span>
        <span>{name}</span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Updated {todayShort}
          {rateResult.source === "live" ? " · Live Market Data" : " · Estimated Rate"}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Gold Rate Today in {name}
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          22 carat and 24 carat gold price in {name}, {state} — {todayFull}. Prices per gram, 5g, 8g, 10g and 100g with and without GST.
        </p>
      </header>

      {/* Quick rate cards */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(["24K", "22K", "18K"] as const).map((k) => (
          <div key={k} className="rounded-2xl border border-line bg-card p-5">
            <div className="text-xs font-semibold text-ink-faint uppercase tracking-wider">{k} Gold / 10g</div>
            <div className="mt-2 text-2xl font-display font-semibold text-ink tabular-nums">
              {fmt(rates[k]["10g"].base)}
            </div>
            <div className="mt-1 text-xs text-ink-faint">incl. GST: {fmt(rates[k]["10g"].gst)}</div>
          </div>
        ))}
      </div>

      {/* Rate tables */}
      {KARATS.map((karat) => (
        <section key={karat} className="mt-10">
          <h2 className="font-display text-xl text-ink mb-4">
            {karat} Gold Rate in {name} Today
          </h2>
          <div className="rounded-2xl border border-line bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-paper-2">
                  <tr className="text-xs uppercase tracking-wide text-ink-faint">
                    <th className="px-4 py-3 text-left font-semibold">Weight</th>
                    <th className="px-4 py-3 text-right font-semibold">Without GST</th>
                    <th className="px-4 py-3 text-right font-semibold">With 3% GST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {WEIGHTS.map((w) => (
                    <tr key={w} className={w === "10g" ? "bg-forest-soft/40" : ""}>
                      <td className="px-4 py-3 font-medium text-ink">{w}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink">
                        {fmt(rates[karat][w].base)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink font-semibold">
                        {fmt(rates[karat][w].gst)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Explainer */}
      <section className="mt-10 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">About gold rates in {name}</h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          The gold rate shown above is derived from the live international spot price of gold in USD, converted to INR and adjusted for {name}&apos;s local market premium. The {adj24K > 0 ? `₹${adj24K} per 10g premium over Mumbai` : "Mumbai-equivalent base rate"} reflects {state}&apos;s transportation costs and regional demand. All prices are the metal-only rate; jewellers will add making charges (typically 8–25% for ornate jewellery, 2–5% for coins) and 3% GST on the metal plus 5% GST on making charges. For investment, a gold ETF or Sovereign Gold Bond costs far less than physical jewellery.
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Rates on this page are updated every 6 hours from the international gold market. Always confirm the current rate with your jeweller before purchasing, as they may apply their own spread.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Gold rate in {name} — FAQs</h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other cities */}
      <section className="mt-14">
        <h2 className="font-display text-xl text-ink">Gold rate in other cities</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {GOLD_CITIES.filter((c) => c.slug !== city).map((c) => (
            <Link
              key={c.slug}
              href={`/gold-rate/${c.slug}`}
              className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/gold"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Gold investment guide →
        </Link>
        <Link
          href="/calculators/sip"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          SIP calculator →
        </Link>
        <Link
          href="/calculators/lumpsum"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Lumpsum calculator →
        </Link>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Rates are indicative and sourced from international gold market data. Actual jeweller rates may vary. GST and making charges are additional. This is not financial advice.
        {rateResult.source === "fallback" ? " (Showing estimated rates — live data temporarily unavailable.)" : ""}
      </p>
    </div>
  );
}
