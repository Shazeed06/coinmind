import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { GOLD_CITIES, fetchGoldRate, computeCityRates } from "@/lib/gold-data";
import { graph, breadcrumb, collectionPage, faqPage } from "@/lib/ld";
import GoldBillCalculator from "@/components/GoldBillCalculator";

export const revalidate = 3600; // 1 hour background revalidation

export const metadata: Metadata = {
  title: { absolute: "Gold Rate Today in India - 22K & 24K Price by City (2026)" },
  description: "Live 22K and 24K gold rates today across major Indian cities: Mumbai, Delhi, Chennai, Bengaluru. Price per gram and 10g, trends, and buying guide.",
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
  const indiaRates = computeCityRates(rateResult.price24K_10g, 0);

  const faqs = [
    {
      q: "What is the gold rate today in India for 22K and 24K?",
      a: `Today's indicative base gold rate in India is ₹${indiaRates["24K"]["10g"].base.toLocaleString("en-IN")} per 10g for 24K (99.9% pure) gold and ₹${indiaRates["22K"]["10g"].base.toLocaleString("en-IN")} per 10g for 22K (91.6% hallmark) gold before 3% GST and making charges.`,
    },
    {
      q: "How much GST and making charges apply on gold jewellery in India?",
      a: "A mandatory 3% GST applies on the raw gold metal value, plus 5% GST on jeweller making charges. Jewellery making charges typically range from 8% to 25% (or ₹400–₹1,200 per gram) depending on design complexity.",
    },
    {
      q: "Why do gold prices vary between Delhi, Mumbai, Pune and Chennai?",
      a: "Gold rates differ slightly by ₹50–₹500 per 10g across Indian cities due to bullion transport insurance, local jewellers association benchmarks, and state-level supply-demand premiums.",
    },
    {
      q: "How can I verify if 22K gold jewellery is genuine in India?",
      a: "Always check for the BIS Hallmark carrying three symbols: the triangular BIS logo, purity grade (e.g. 22K916), and a unique 6-digit alphanumeric HUID code that you can verify instantaneously on the official BIS Care mobile app.",
    },
  ];

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
    faqPage(faqs),
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

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/silver-rate"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Looking for Silver? Check Live Silver Rate (Chandi Ka Bhav) →
          </Link>
        </div>
      </header>

      {/* Interactive Jewellery Bill & Making Charges Calculator */}
      <section className="mt-8">
        <GoldBillCalculator
          initialGoldRate24K={rateResult.price24K_10g}
          initialSilverRateKg={rateResult.silverPerKg}
          cityName="India"
        />
      </section>

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

      {/* FAQs */}
      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl text-ink">Gold Rate &amp; Purity FAQs</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-line bg-card p-4">
              <h3 className="text-sm font-semibold text-ink">{f.q}</h3>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Prices are indicative. Confirm with your jeweller before purchasing. GST and making charges are additional.
        {rateResult.source === "fallback" ? " (Showing estimated rates — live data temporarily unavailable.)" : ""}
      </p>
    </div>
  );
}
