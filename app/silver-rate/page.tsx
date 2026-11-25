import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { fetchGoldRate, computeSilverRates, GOLD_CITIES } from "@/lib/gold-data";
import { graph, article, breadcrumb, faqPage } from "@/lib/ld";
import GoldBillCalculator from "@/components/GoldBillCalculator";
import { Sparkles, TrendingUp, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

export const revalidate = 3600; // 1 hour revalidation

export const metadata: Metadata = {
  title: { absolute: "Silver Rate Today in India: 1 Kg, 100g & 10g Chandi Price (2026) | CoinMind" },
  description:
    "Live silver rate today in India: real-time price per 1 kg, 100g, 10g, and 1 gram for 999 Fine Silver and 925 Sterling Silver. Sourced from MCX markets with 3% GST calculation.",
  keywords: [
    "silver rate today",
    "chandi ka bhav today",
    "silver price in India",
    "1 kg silver price today",
    "10 gram silver rate today",
    "silver rate today in Delhi",
    "999 fine silver price",
    "925 sterling silver price",
    "silver GST calculator",
  ],
  alternates: { canonical: `${site.url}/silver-rate` },
  openGraph: {
    locale: "en_IN",
    title: "Silver Rate Today in India: 1 Kg, 100g & 10g Chandi Price",
    description:
      "Track live silver rate today in India: 1 kg, 100g, 10g rates for 999 Fine and 925 Sterling Silver with GST invoice calculator.",
    url: `${site.url}/silver-rate`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Silver rate India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Rate Today in India: 1 Kg & 10g Live Chandi Price",
    description: "Track live silver rates in India across 999 Fine & 925 Sterling grades.",
    images: ["/opengraph-image"],
  },
};

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default async function SilverRatePage() {
  const rateData = await fetchGoldRate();
  const baseSilverKg = rateData.silverPerKg || 141000;
  const rates = computeSilverRates(baseSilverKg);

  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const faqs = [
    {
      q: "What is the silver rate today in India for 1 kg?",
      a: `Today's pure 999 Fine Silver rate in India is approximately ${fmt(rates["1kg"].base)} per kilogram before GST, and ${fmt(rates["1kg"].gst)} including 3% GST. Rates fluctuate with international COMEX spot prices and MCX futures.`,
    },
    {
      q: "What is the difference between 999 Silver and 925 Sterling Silver?",
      a: "999 Fine Silver is 99.9% pure silver, mainly used for investment bars, coins, and bullion. 925 Sterling Silver contains 92.5% silver alloyed with 7.5% copper or zinc to make it durable for daily-wear jewellery, anklets (payal), and utensils.",
    },
    {
      q: "How much GST is applicable on buying silver in India?",
      a: "A uniform 3% GST is applied to the raw value of silver metal. In addition, if you are buying crafted silver jewellery or utensils, jewellers charge 5% GST on the craftsmanship (making charges).",
    },
    {
      q: "Why is silver price outperforming gold in 2026?",
      a: "Unlike gold (which is primarily a monetary hedge and jewellery asset), silver has dual demand: investment demand plus massive industrial consumption in photovoltaic solar panels, 5G infrastructure, and Electric Vehicle (EV) batteries, causing tight global physical supplies.",
    },
  ];

  const schema = graph([
    article(
      "Silver Rate Today in India: 1 Kg, 100g & 10g Chandi Price",
      "Live silver rate in India with 1kg, 100g, 10g and 1g price breakdown, GST rates, and interactive jewellery invoice calculator.",
      new Date().toISOString().split("T")[0]
    ),
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Gold Rate", path: "/gold-rate" },
      { name: "Silver Rate Today", path: "/silver-rate" },
    ]),
    faqPage(faqs),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="container-main py-10 lg:py-14 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-text-muted flex items-center gap-1.5">
          <Link href="/" className="hover:text-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/gold-rate" className="hover:text-text transition-colors">Precious Metals</Link>
          <span>/</span>
          <span className="text-text font-medium">Silver Rate Today</span>
        </nav>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-slate-600 animate-pulse" />
              Live Bullion Data · Updated {todayStr}
            </span>
            <span className="text-xs text-text-muted">USD/INR: ₹{rateData.usdInr}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            Silver Rate Today in India (Chandi Ka Bhav)
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
            Live prices for 999 Fine Silver and 925 Sterling Silver across India. Check rates per 1 gram, 10 grams, 100 grams, and 1 kilogram with 3% GST calculation and showroom making charges.
          </p>
        </header>

        {/* Quick Highlights Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">1 Kg Silver (Base)</p>
            <p className="mt-1 text-xl font-bold text-text">{fmt(rates["1kg"].base)}</p>
            <p className="text-[11px] text-text-muted">Without GST</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">1 Kg with 3% GST</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{fmt(rates["1kg"].gst)}</p>
            <p className="text-[11px] text-text-muted">Final Bullion Landing</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">100 Grams Silver</p>
            <p className="mt-1 text-xl font-bold text-text">{fmt(rates["100g"].base)}</p>
            <p className="text-[11px] text-text-muted">{fmt(rates["100g"].gst)} with GST</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">10 Grams (Coins)</p>
            <p className="mt-1 text-xl font-bold text-brand">{fmt(rates["10g"].base)}</p>
            <p className="text-[11px] text-text-muted">{fmt(rates["10g"].gst)} with GST</p>
          </div>
        </div>

        {/* Interactive Jewellery Bill & Making Charges Calculator */}
        <section className="space-y-4">
          <GoldBillCalculator
            initialGoldRate24K={rateData.price24K_10g}
            initialSilverRateKg={baseSilverKg}
            cityName="India Live"
          />
        </section>

        {/* Comprehensive Weight Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">Live Silver Rates by Weight in India</h2>
          <p className="text-sm text-text-muted">
            Rates for pure 999 Fine Silver bars and coins as per domestic bullion trade benchmarks.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-alt/50 text-text-muted text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Weight</th>
                  <th className="px-5 py-3.5">999 Pure Silver (Excl. GST)</th>
                  <th className="px-5 py-3.5">Price with 3% GST</th>
                  <th className="px-5 py-3.5">925 Sterling Silver (Excl. GST)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { w: "1 Gram", b999: rates["1g"].base, g999: rates["1g"].gst, b925: Math.round(rates["1g"].base * 0.925) },
                  { w: "10 Grams", b999: rates["10g"].base, g999: rates["10g"].gst, b925: Math.round(rates["10g"].base * 0.925) },
                  { w: "50 Grams", b999: rates["10g"].base * 5, g999: rates["10g"].gst * 5, b925: Math.round(rates["10g"].base * 5 * 0.925) },
                  { w: "100 Grams", b999: rates["100g"].base, g999: rates["100g"].gst, b925: Math.round(rates["100g"].base * 0.925) },
                  { w: "500 Grams", b999: rates["100g"].base * 5, g999: rates["100g"].gst * 5, b925: Math.round(rates["100g"].base * 5 * 0.925) },
                  { w: "1 Kilogram (1000g)", b999: rates["1kg"].base, g999: rates["1kg"].gst, b925: Math.round(rates["1kg"].base * 0.925) },
                ].map((row) => (
                  <tr key={row.w} className="hover:bg-bg-alt/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-text">{row.w}</td>
                    <td className="px-5 py-3.5 font-semibold text-text">{fmt(row.b999)}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-600">{fmt(row.g999)}</td>
                    <td className="px-5 py-3.5 font-medium text-text-muted">{fmt(row.b925)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Silver vs Gold Investment Analysis */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">How Silver Rate is Calculated in India</h2>
          <div className="prose prose-slate max-w-none text-text-muted space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Silver rates in India are derived from international London Bullion Market (LBMA) and COMEX spot markets, where silver trades in USD per Troy Ounce (1 Troy Oz = 31.1035 grams).
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800">
              India 1 Kg Silver Base (₹) = (COMEX Silver Spot in USD / 31.1035) × 1000 × (USD/INR Exchange Rate) × 1.06 (Customs Duty)
            </div>
            <p>
              Local bullion associations (such as Delhi Bullion Association, Mumbai Zaveri Bazaar, and Jaipur Sarafa) then factor in domestic transport logistics, supply variations, and the mandatory 3% GST on delivery.
            </p>
          </div>
        </section>

        {/* Major City Silver Rate Hubs */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">Check City-wise Precious Metals & Gold Rates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {GOLD_CITIES.slice(0, 15).map((city) => (
              <Link
                key={city.slug}
                href={`/gold-rate/${city.slug}`}
                className="p-3 rounded-xl border border-border bg-white hover:border-brand hover:text-brand transition-all text-xs font-semibold text-text flex items-center justify-between"
              >
                <span>{city.name}</span>
                <ArrowRight className="h-3 w-3 text-text-muted" />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4 border-t border-border pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-text flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand" />
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-white p-4 shadow-sm space-y-1.5">
                <h3 className="font-bold text-sm text-text">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
