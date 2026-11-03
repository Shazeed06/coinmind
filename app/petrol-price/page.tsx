import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { FUEL_CITIES } from "@/lib/fuel-data";
import { graph, breadcrumb, collectionPage } from "@/lib/ld";

export const metadata: Metadata = {
  title: { absolute: "Petrol Price Today in India - All Cities (2026)" },
  description: "Petrol price today in all major Indian cities — Delhi, Mumbai, Chennai, Kolkata, Bangalore and 15+ more. Current fuel rates per litre, price breakdown, and FAQs.",
  alternates: { canonical: `${site.url}/petrol-price` },
  openGraph: {
    type: "website",
    url: `${site.url}/petrol-price`,
    siteName: site.name,
    locale: "en_IN",
    title: "Petrol Price Today in India by City",
    description: "Current petrol price in Delhi, Mumbai, Chennai, Bangalore and 15+ Indian cities.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Petrol price India" }],
  },
};

export default function Page() {
  const todayShort = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Petrol Price" },
    ]),
    collectionPage(
      "Petrol Price Today in India by City",
      "Current petrol price today in all major Indian cities.",
      FUEL_CITIES.map((c) => ({ name: `Petrol Price in ${c.name}`, url: `/petrol-price/${c.slug}` }))
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
        <span>Petrol Price</span>
      </nav>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Updated {todayShort}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Petrol Price Today in India
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Current petrol rates in major Indian cities. Prices vary by state due to different VAT and local levies.
        </p>
      </header>

      {/* City grid */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-5">Petrol price by city</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUEL_CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/petrol-price/${c.slug}`}
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
                    ₹{c.petrol.toFixed(2)}
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
        <h2 className="font-display text-lg text-ink">Why petrol prices differ across cities</h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Petrol prices in India vary by ₹5–₹20/litre across cities due to state Value Added Tax (VAT). States like Rajasthan, Maharashtra, and Telangana levy higher VAT, while Delhi and Chandigarh have lower rates. The central excise duty (around ₹19.90/litre) is uniform across India. Oil marketing companies (IOC, BPCL, HPCL) revise prices based on international crude oil costs; in practice, prices have been stable for extended periods.
        </p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          For daily commuters, the per-kilometre fuel cost matters more than the per-litre price. A car getting 15 km/l in Hyderabad (₹107.41/L) costs ₹7.16/km — compared to ₹6.31/km in Delhi (₹94.72/L), a difference of less than one rupee per kilometre.
        </p>
      </section>

      {/* Quick nav */}
      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/diesel-price"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors"
        >
          Diesel price today →
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
