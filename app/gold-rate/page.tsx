import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { GOLD_CITIES, fetchGoldRate, computeCityRates } from "@/lib/gold-data";
import { graph, breadcrumb, collectionPage } from "@/lib/ld";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: { absolute: "Gold Rate Today in India - 22K & 24K Price by City (2026)" },
  description: "Gold rate today in all major Indian cities. Live 22 carat and 24 carat gold prices per gram and per 10g for Mumbai, Delhi, Chennai, Kolkata, Bangalore and 20+ more cities.",
  alternates: { canonical: `${site.url}/gold-rate` },
  openGraph: {
    type: "website",
    url: `${site.url}/gold-rate`,
    siteName: site.name,
    locale: "en_IN",
    title: "Gold Rate Today in India by City",
    description: "Live 22K and 24K gold rate today in Mumbai, Delhi, Chennai, Bangalore and 20+ Indian cities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Gold rate India" }],
  },
};

export default async function Page() {
  const rateResult = await fetchGoldRate();

  const todayShort = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Gold Rate" },
    ]),
    collectionPage(
      "Gold Rate Today in India by City",
      "Live gold rate today in all major Indian cities — 22K and 24K prices.",
      GOLD_CITIES.map((c) => ({ name: `Gold Rate in ${c.name}`, url: `/gold-rate/${c.slug}` }))
    ),
  ]);

  return (
    <div className="container-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <span>Gold Rate</span>
      </nav>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Updated {todayShort}
          {rateResult.source === "live" ? " · Live Data" : " · Estimated"}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Gold Rate Today in India
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Live 22 carat and 24 carat gold price today in Mumbai, Delhi, Chennai, Bangalore and 20+ major Indian cities. Updated every 6 hours from international market data.
        </p>
      </header>

      {/* City grid */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-5">Gold rate by city — 22K per 10g</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOLD_CITIES.map((c) => {
            const r = computeCityRates(rateResult.price24K_10g, c.adj24K);
            return (
              <Link
                key={c.slug}
                href={`/gold-rate/${c.slug}`}
                className="group rounded-2xl border border-line bg-card p-5 hover:border-forest hover:shadow-card-lift transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-ink group-hover:text-forest transition-colors">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-faint mt-0.5">{c.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-display font-semibold text-ink tabular-nums">
                      ₹{r["22K"]["10g"].base.toLocaleString("en-IN")}
                    </div>
                    <div className="text-xs text-ink-faint mt-0.5">per 10g · 22K</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Info section */}
      <section className="mt-12 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">About gold rates in India</h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Gold rates in India are derived from the international spot price (USD per troy ounce) converted to INR and adjusted for city-level premiums. City rates differ by ₹50–₹500 per 10g due to local transportation, demand, and minor state-level factors. The 3% GST is charged by jewellers at the point of sale and is not included in the base rate shown on city pages. Making charges (8–25% for jewellery, 2–5% for coins) are an additional cost.
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          For investment in gold without making charges, consider <Link href="/gold" className="text-forest underline underline-offset-2">Gold ETFs or Sovereign Gold Bonds</Link>. The SGB has been discontinued for new subscriptions but existing bonds still trade on NSE/BSE.
        </p>
      </section>

      {/* Quick nav to related pages */}
      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/gold"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Gold investment guide →
        </Link>
        <Link
          href="/petrol-price"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Petrol price today →
        </Link>
        <Link
          href="/diesel-price"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Diesel price today →
        </Link>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Prices are indicative. Confirm with your jeweller before purchasing. GST and making charges are additional.
        {rateResult.source === "fallback" ? " (Showing estimated rates — live data temporarily unavailable.)" : ""}
      </p>
    </div>
  );
}
