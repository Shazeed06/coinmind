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
    title: { absolute: `Petrol Price Today in ${name} (${today}) - ₹/litre` },
    description: `Petrol price today in ${name}, ${state}: ₹${cityData.petrol}/litre. Latest fuel rates updated ${cityData.lastUpdated}. Check daily petrol price, how it is calculated, and tips to save fuel.`,
    alternates: { canonical: `/petrol-price/${city}` },
    openGraph: {
      type: "article",
      url: `${site.url}/petrol-price/${city}`,
      siteName: site.name,
      locale: "en_IN",
      title: `Petrol Price in ${name} Today`,
      description: `Petrol rate in ${name} today: ₹${cityData.petrol} per litre as of ${today}.`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Petrol price ${name}` }],
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
      q: `What is the petrol price in ${name} today?`,
      a: `The petrol price in ${name} today is ${fmt(petrol)} per litre as per the last revision on ${updatedDate}. Fuel prices in India are revised by oil marketing companies (IOC, BPCL, HPCL) and vary by state due to different VAT and local taxes.`,
    },
    {
      q: `Why is petrol more expensive in ${name} than Delhi?`,
      a: `Petrol prices vary across Indian cities primarily due to state VAT (Value Added Tax) and local body taxes. States like ${state} levy different rates. The central government's excise duty is uniform across India, but state VAT, which can range from 15% to 35%, creates price differences of ₹5–₹20/litre between cities.`,
    },
    {
      q: "How is the petrol price calculated in India?",
      a: `The retail price of petrol in India is the sum of: (1) the base price linked to international crude oil prices, (2) central excise duty (currently around ₹19.90/litre), (3) state VAT (varies by state, typically 20–35%), (4) dealer commission, and (5) freight and other charges. When international crude prices rise or fall, oil companies adjust the base price, which flows through to the retail price.`,
    },
    {
      q: "How often does petrol price change in India?",
      a: `Petrol prices in India are revised daily by oil marketing companies (IOC, BPCL, HPCL), effective from 6:00 AM each day. In practice, revisions are made only when crude oil prices move significantly. During periods of stable global crude prices, the retail price at the pump can remain unchanged for weeks or months.`,
    },
    {
      q: "How can I save fuel costs?",
      a: `Practical fuel-saving tips: (1) Maintain tyre pressure at recommended levels — under-inflated tyres cut mileage by 2–3%. (2) Avoid aggressive acceleration and braking. (3) Use engine oil recommended by the manufacturer. (4) Turn off AC at low speeds. (5) Avoid idling for more than 30 seconds. (6) Keep the vehicle serviced — a clogged air filter alone can increase consumption by 10%. (7) Use a petrol credit card that gives cashback on fuel purchases.`,
    },
    {
      q: "What is the difference between regular petrol and premium petrol?",
      a: `Regular petrol has an octane rating of 87–91, while premium petrol (sold as Speed, Power, or XP100 by different companies) has an octane rating of 95–100. Higher octane resists engine knock and can improve performance and mileage in high-compression engines. For most vehicles, regular petrol is sufficient; premium is recommended only if your car's manual specifies it. The price difference is typically ₹5–₹10/litre.`,
    },
    {
      q: `Is diesel cheaper than petrol in ${name}?`,
      a: `Yes. The current diesel price in ${name} is ${fmt(diesel)} per litre, compared to ${fmt(petrol)} for petrol — a difference of ${fmt(petrol - diesel)} per litre. Diesel cars generally offer better mileage too, making the per-kilometre cost significantly lower. However, diesel vehicles carry a higher purchase price and stricter emission norms.`,
    },
  ];

  const jsonLd = graph([
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Petrol Price", path: "/petrol-price" },
      { name: `Petrol Price in ${name}` },
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
        <Link href="/petrol-price" className="hover:text-forest">Petrol Price</Link>
        <span>/</span>
        <span>{name}</span>
      </nav>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest mb-3">
          Last updated: {updatedDate}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Petrol Price Today in {name}
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          Current petrol rate in {name}, {state} — {todayFull}.
        </p>
      </header>

      {/* Rate cards */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="text-xs font-semibold text-ink-faint uppercase tracking-wider">Petrol</div>
          <div className="mt-2 text-3xl font-display font-semibold text-ink tabular-nums">
            {fmt(petrol)}
          </div>
          <div className="mt-1 text-sm text-ink-faint">per litre · {name}</div>
        </div>
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="text-xs font-semibold text-ink-faint uppercase tracking-wider">Diesel</div>
          <div className="mt-2 text-3xl font-display font-semibold text-ink tabular-nums">
            {fmt(diesel)}
          </div>
          <div className="mt-1 text-sm text-ink-faint">per litre · {name}</div>
        </div>
      </div>

      {/* Cost table */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Petrol cost for different quantities</h2>
        <div className="rounded-2xl border border-line bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-paper-2">
              <tr className="text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 text-left font-semibold">Litres</th>
                <th className="px-4 py-3 text-right font-semibold">Cost (Petrol)</th>
                <th className="px-4 py-3 text-right font-semibold">Cost (Diesel)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[1, 5, 10, 20, 30, 40, 50].map((litres) => (
                <tr key={litres}>
                  <td className="px-4 py-3 font-medium text-ink">{litres}L</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">
                    ₹{(petrol * litres).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                    ₹{(diesel * litres).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Price breakdown */}
      <section className="mt-10 rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-lg text-ink">How petrol price in {name} is calculated</h2>
        <div className="mt-4 space-y-2 text-sm">
          {[
            ["Base price (linked to crude oil)", "~₹57–60/L"],
            ["Central excise duty", "~₹19.90/L"],
            [`${state} VAT & local levies`, `~₹${(petrol - 80).toFixed(2)}/L`],
            ["Dealer commission", "~₹3.86/L"],
            ["Transport & handling", "~₹0.30/L"],
            [`Final retail price in ${name}`, `${fmt(petrol)}/L`],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-line py-2">
              <span className={label.startsWith("Final") ? "font-semibold text-ink" : "text-ink-soft"}>{label}</span>
              <span className={label.startsWith("Final") ? "font-semibold text-ink tabular-nums" : "text-ink tabular-nums"}>{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Figures are approximate. The base price is the variable component; excise and VAT are largely fixed.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Petrol price in {name} — FAQs</h2>
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
        <h2 className="font-display text-xl text-ink">Petrol price in other cities</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {FUEL_CITIES.filter((c) => c.slug !== city).map((c) => (
            <Link
              key={c.slug}
              href={`/petrol-price/${c.slug}`}
              className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
            >
              {c.name} — {fmt(c.petrol)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/diesel-price" className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-medium text-ink hover:border-forest transition-colors">
          Diesel price today →
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
