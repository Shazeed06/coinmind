import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { FUEL_CITIES } from "@/lib/fuel-data";
import { graph, breadcrumb, collectionPage } from "@/lib/ld";

export const metadata: Metadata = {
  title: { absolute: "Diesel Price Today in India - All Cities (2026)" },
  description: "Diesel price today in all major Indian cities — Delhi, Mumbai, Chennai, Kolkata, Bangalore and 15+ more. Current diesel rates per litre and comparison with petrol.",
  alternates: { canonical: `${site.url}/diesel-price` },
  openGraph: {
    type: "website",
    url: `${site.url}/diesel-price`,
    siteName: site.name,
    locale: "en_IN",
    title: "Diesel Price Today in India by City",
    description: "Current diesel price in Delhi, Mumbai, Chennai, Bangalore and 15+ Indian cities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Diesel price India" }],
  },
};

export default function Page() {
  const todayShort = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Diesel Price" },
    ]),
    collectionPage(
      "Diesel Price Today in India by City",
      "Current diesel price today in all major Indian cities.",
      FUEL_CITIES.map((c) => ({ name: `Diesel Price in ${c.name}`, url: `/diesel-price/${c.slug}` }))
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
        <span>Diesel Price</span>
      </nav>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Updated {todayShort}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Diesel Price Today in India
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Current diesel rates in major Indian cities. Prices vary by state due to different VAT and local levies.
        </p>
      </header>

      {/* City grid */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-5">Diesel price by city</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUEL_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/diesel-price/${c.slug}`}
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
                    ₹{c.diesel.toFixed(2)}
                  </div>
                  <div className="text-xs text-ink-faint mt-0.5">per litre</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="mt-12 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">Diesel vs petrol: which is cheaper?</h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Diesel is cheaper per litre than petrol across all Indian cities — typically by ₹10–₹15/litre. Combined with diesel engines&apos; better fuel efficiency (20–25% more km per litre), the per-km cost of diesel is significantly lower. However, diesel cars cost more to buy and maintain, and emission norms (BS6) have narrowed the gap in running costs. Diesel makes economic sense for high-mileage users (1,500+ km/month).
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Commercial vehicles (trucks, buses, tractors) predominantly use diesel because the economics are compelling at scale. Personal car buyers should factor in the higher upfront cost and plan for at least 3–5 years of ownership to recover the price premium through fuel savings.
        </p>
      </section>

      {/* Quick nav */}
      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/petrol-price"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Petrol price today →
        </Link>
        <Link
          href="/gold-rate"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Gold rate today →
        </Link>
        <Link
          href="/calculators/emi"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Car loan EMI calculator →
        </Link>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Prices are as per latest available revision. Actual rates at fuel stations may vary slightly.
      </p>
    </div>
  );
}
