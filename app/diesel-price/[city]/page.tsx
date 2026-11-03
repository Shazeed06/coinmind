import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { FUEL_CITIES, FUEL_CITY_SLUGS, getFuelCity } from "@/lib/fuel-data";
import { graph, breadcrumb, faqPage } from "@/lib/ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return FUEL_CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getFuelCity(city);
  if (!cityData) return {};
  const { name, state } = cityData;
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return {
    title: { absolute: `Diesel Price Today in ${name} (${today}) - ₹/litre` },
    description: `Diesel price today in ${name}, ${state}: ₹${cityData.diesel}/litre. Latest diesel rates updated ${cityData.lastUpdated}. Compare with petrol, cost table, and price breakdown.`,
    alternates: { canonical: `/diesel-price/${city}` },
    openGraph: {
      type: "article",
      url: `${site.url}/diesel-price/${city}`,
      siteName: site.name,
      locale: "en_IN",
      title: `Diesel Price in ${name} Today`,
      description: `Diesel rate in ${name} today: ₹${cityData.diesel} per litre.`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Diesel price ${name}` }],
    },
  };
}

function fmt(n: number) {
  return "₹" + n.toFixed(2);
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getFuelCity(city);
  if (!cityData) notFound();

  const { name, state, petrol, diesel, lastUpdated } = cityData;
  const updatedDate = new Date(lastUpdated).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const todayFull = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const faqs = [
    {
      q: `What is the diesel price in ${name} today?`,
      a: `The diesel price in ${name} today is ${fmt(diesel)} per litre as per the last revision on ${updatedDate}. Diesel prices vary by state due to different VAT rates and are revised by oil marketing companies (IOC, BPCL, HPCL) based on international crude oil prices.`,
    },
    {
      q: `Is diesel cheaper than petrol in ${name}?`,
      a: `Yes. Diesel at ${fmt(diesel)}/litre is ₹${(petrol - diesel).toFixed(2)} cheaper than petrol (${fmt(petrol)}/litre) in ${name}. This gap, combined with diesel engines' higher mileage (~20–25% better than petrol), makes the per-km fuel cost significantly lower for diesel vehicles.`,
    },
    {
      q: "Why is diesel priced differently across Indian cities?",
      a: `Diesel prices differ across cities because of state VAT (Value Added Tax) and local body taxes, which vary significantly. The central excise duty is uniform at about ₹15.80/litre across India, but state VAT ranges from 10% to 30%+ — this creates price differences of ₹5–₹15/litre between states. ${state}'s local tax structure sets the ${name} rate at ${fmt(diesel)}/litre.`,
    },
    {
      q: "Who should buy a diesel car in India?",
      a: `Diesel makes financial sense if you drive more than 1,500 km/month. The per-km fuel saving (typically ₹1–₹2) must offset the higher purchase price (₹1–₹2 lakh premium for diesel) and higher maintenance costs. Frequent highway drivers and commercial users benefit most. With BS6 emission norms, newer diesel engines are cleaner but still costlier to maintain than petrol or CNG alternatives.`,
    },
    {
      q: "How is diesel price calculated in India?",
      a: `Retail diesel price = base price (linked to crude oil cost) + central excise duty (~₹15.80/L) + state VAT (${state}: varies) + dealer commission (~₹2.53/L) + transport. When crude oil prices change, oil companies adjust the base price, which flows through to the pump price. Since early 2022, prices have largely been frozen despite crude price movements.`,
    },
    {
      q: "What is the difference between regular diesel and premium diesel?",
      a: `Premium diesel (sold as HSD Hi+ by IOC, Speed D by BPCL, Power D by HPCL) has a higher cetane number (50+ vs 42 for regular), better lubrication additives, and detergent properties. It can improve fuel efficiency by 3–5% in well-maintained engines, reduce engine deposits, and extend injector life. The price premium is typically ₹5–₹8/litre. For most vehicles, regular diesel is fine; premium is worth it only if your injector maintenance intervals allow it.`,
    },
    {
      q: `How does diesel price in ${name} compare to petrol?`,
      a: `In ${name}, petrol is ${fmt(petrol)}/litre versus diesel at ${fmt(diesel)}/litre — a difference of ${fmt(petrol - diesel)}/litre. On a car getting 20 km/l on diesel vs 15 km/l on petrol (typical comparison), the per-km cost is ₹${(diesel / 20).toFixed(2)} for diesel vs ₹${(petrol / 15).toFixed(2)} for petrol — a saving of ₹${((petrol / 15) - (diesel / 20)).toFixed(2)} per km, or about ₹${Math.round(((petrol / 15) - (diesel / 20)) * 1500)}/month on 1,500 km of driving.`,
    },
  ];

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Diesel Price", path: "/diesel-price" },
      { name: `Diesel Price in ${name}` },
    ]),
    faqPage(faqs),
  ]);

  return (
    <div className="container-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/diesel-price" className="hover:text-forest">Diesel Price</Link>
        <span>/</span>
        <span>{name}</span>
      </nav>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Last updated: {updatedDate}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Diesel Price Today in {name}
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Current diesel rate in {name}, {state} — {todayFull}.
        </p>
      </header>

      {/* Rate cards */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="text-xs font-semibold text-ink-faint uppercase tracking-wider">Diesel</div>
          <div className="mt-2 text-3xl font-display font-semibold text-ink tabular-nums">
            {fmt(diesel)}
          </div>
          <div className="mt-1 text-sm text-ink-faint">per litre · {name}</div>
        </div>
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="text-xs font-semibold text-ink-faint uppercase tracking-wider">Petrol</div>
          <div className="mt-2 text-3xl font-display font-semibold text-ink tabular-nums">
            {fmt(petrol)}
          </div>
          <div className="mt-1 text-sm text-ink-faint">per litre · {name}</div>
        </div>
      </div>

      {/* Cost table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Diesel cost for different quantities</h2>
        <div className="rounded-2xl border border-line bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-paper-2">
              <tr className="text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 text-left font-semibold">Litres</th>
                <th className="px-4 py-3 text-right font-semibold">Cost (Diesel)</th>
                <th className="px-4 py-3 text-right font-semibold">Cost (Petrol)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[1, 5, 10, 20, 30, 40, 50].map((litres) => (
                <tr key={litres}>
                  <td className="px-4 py-3 font-medium text-ink">{litres}L</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">
                    ₹{(diesel * litres).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                    ₹{(petrol * litres).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Diesel vs Petrol */}
      <section className="mt-10 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">Diesel vs petrol: per-km cost in {name}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-ink-faint border-b border-line">
                <th className="py-2 text-left font-semibold">Mileage</th>
                <th className="py-2 text-right font-semibold">Diesel (₹/km)</th>
                <th className="py-2 text-right font-semibold">Petrol (₹/km)</th>
                <th className="py-2 text-right font-semibold">Savings/km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                { label: "15 km/l", petrolKmpl: 12, dieselKmpl: 15 },
                { label: "20 km/l", petrolKmpl: 15, dieselKmpl: 20 },
                { label: "25 km/l", petrolKmpl: 18, dieselKmpl: 25 },
              ].map((row) => {
                const dCost = diesel / row.dieselKmpl;
                const pCost = petrol / row.petrolKmpl;
                const saving = pCost - dCost;
                return (
                  <tr key={row.label}>
                    <td className="py-2.5 text-ink-soft">{row.label} (diesel) / {row.petrolKmpl} km/l (petrol)</td>
                    <td className="py-2.5 text-right tabular-nums text-ink">₹{dCost.toFixed(2)}</td>
                    <td className="py-2.5 text-right tabular-nums text-ink-soft">₹{pCost.toFixed(2)}</td>
                    <td className="py-2.5 text-right tabular-nums text-forest font-medium">₹{saving.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-faint">Diesel savings over petrol per kilometre of driving at typical mileage rates.</p>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Diesel price in {name} — FAQs</h2>
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
        <h2 className="font-display text-xl text-ink">Diesel price in other cities</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {FUEL_CITIES.filter((c) => c.slug !== city).map((c) => (
            <Link
              key={c.slug}
              href={`/diesel-price/${c.slug}`}
              className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              {c.name} — {fmt(c.diesel)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/petrol-price" className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors">
          Petrol price today →
        </Link>
        <Link href="/gold-rate" className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors">
          Gold rate today →
        </Link>
        <Link href="/calculators/emi" className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors">
          Car loan EMI calculator →
        </Link>
      </section>

      <p className="mt-8 text-xs text-ink-faint">
        Rates are as per last revision on {updatedDate}. Actual rates at fuel stations may vary. Check the oil company app (IOC FuelStation, HPCL Fuel) for the exact current rate.
      </p>
    </div>
  );
}
