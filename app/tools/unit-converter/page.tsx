import type { Metadata } from "next";
import Link from "next/link";
import UnitConverter from "@/components/tools/UnitConverter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Unit Converter — Length, Weight, Temperature" },
  description:
    "Free online unit converter for length, weight, temperature, area, volume, speed, time and digital storage. Instant, accurate and 100% private in your browser.",
  alternates: { canonical: "/tools/unit-converter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/unit-converter",
    title: "Unit Converter — Length, Weight, Temperature",
    description:
      "Convert length, weight, temperature, area, volume, speed, time and data units instantly — free and private in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Unit Converter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this unit converter free and private?",
    a: "Yes. It's completely free with no sign-up, and every calculation runs inside your browser using plain JavaScript. Nothing you type is uploaded, tracked or stored, so it also works offline once the page has loaded.",
  },
  {
    q: "How do you convert Celsius to Fahrenheit?",
    a: "Multiply the Celsius value by 9/5 (that's 1.8) and add 32. So 20°C becomes 20 × 1.8 + 32 = 68°F. To go the other way, subtract 32 first, then divide by 1.8. The temperature tab above does this automatically.",
  },
  {
    q: "Is a US gallon the same as a UK gallon?",
    a: "No — they're different sizes. A US gallon is about 3.785 litres, while a UK (imperial) gallon is about 4.546 litres, roughly 20% larger. The volume tab includes both so you can pick the right one.",
  },
  {
    q: "Does 1 KB equal 1000 or 1024 bytes?",
    a: "This converter uses the binary (1024-based) definition, where 1 KB = 1024 bytes, 1 MB = 1024 KB and so on. That matches how operating systems such as Windows report file and drive sizes. Storage manufacturers often use the decimal 1000-based definition instead, which is why a 1 TB drive can show as roughly 931 GB.",
  },
  {
    q: "How many feet are in a metre?",
    a: "One metre equals about 3.28084 feet, and one foot is exactly 0.3048 metres. For a quick estimate you can multiply metres by 3.28 or divide feet by 3.28.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Unit Converter",
        item: `${site.url}/tools/unit-converter`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-forest">
          Tools
        </Link>
        <span>/</span>
        <span className="text-ink">Unit Converter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Unit Converter
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert length, weight, temperature, area, volume, speed, time and
          digital storage &mdash; instantly and accurately, right in your
          browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <UnitConverter />
      </div>

      {/* Quick answer */}
      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A unit converter changes a measurement from one unit into another
            &mdash; metres to feet, kilograms to pounds, Celsius to Fahrenheit,
            and more. Pick a category above, choose your{" "}
            <strong className="text-ink">from</strong> and{" "}
            <strong className="text-ink">to</strong> units, type a value, and the
            result updates as you type. Every unit is converted through a common
            base unit for accuracy, while temperature uses exact scale formulas.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>How to use the unit converter</h2>
        <p>
          Start by choosing a category &mdash; length, weight, temperature, area,
          volume, speed, time or digital storage. Then select the unit you are
          converting <strong>from</strong> and the unit you want the answer{" "}
          <strong>in</strong>, and enter your amount. The converted value appears
          live, along with a handy &ldquo;1 unit = X&rdquo; reference line so you
          can sanity-check the scale. The swap button flips the two units in a
          single click, which is useful when you realise you need the reverse
          conversion.
        </p>

        <h2>Metric vs imperial units</h2>
        <p>
          Most of the world uses the <strong>metric</strong> system (metres,
          kilograms, litres, Celsius), while the United States and, for some
          everyday measures, the United Kingdom still use{" "}
          <strong>imperial</strong> or US customary units (feet, pounds, gallons,
          Fahrenheit). Converting between the two is where most people get stuck,
          because the ratios are rarely round numbers. This tool stores exact
          conversion factors &mdash; for example 1 inch is defined as exactly
          0.0254 metres and 1 pound as 0.45359237 kilograms &mdash; so your
          answers stay precise rather than relying on rough rules of thumb.
        </p>

        <h2>Common conversions at a glance</h2>
        <p>
          These are some of the conversions people search for most often. Use the
          tool above for any exact value, but this table is handy for quick
          mental checks.
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-paper-2 text-left text-ink">
                <th className="px-4 py-2.5 font-semibold">From</th>
                <th className="px-4 py-2.5 font-semibold">Equals</th>
              </tr>
            </thead>
            <tbody className="text-ink-soft">
              {[
                ["1 metre", "3.28084 feet"],
                ["1 kilometre", "0.621371 miles"],
                ["1 inch", "2.54 centimetres"],
                ["1 kilogram", "2.20462 pounds"],
                ["1 pound", "0.453592 kilograms"],
                ["0°C", "32°F"],
                ["100°C", "212°F"],
                ["1 US gallon", "3.78541 litres"],
                ["1 mile / hour", "1.60934 km/h"],
                ["1 GB", "1024 MB"],
              ].map(([a, b]) => (
                <tr key={a} className="border-t border-line">
                  <td className="px-4 py-2.5">{a}</td>
                  <td className="px-4 py-2.5 font-medium text-ink">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How the converter stays accurate</h2>
        <p>
          For length, weight, area, volume, speed, time and data, each unit is
          stored as a factor relative to a single base unit, so a conversion is
          just <em>value × from-factor ÷ to-factor</em>. Temperature is the
          exception: because Celsius, Fahrenheit and Kelvin have different zero
          points, it can&apos;t use a simple ratio, so the tool applies the exact
          scale formulas instead. Results are then tidied to remove
          floating-point noise, and there are no &ldquo;NaN&rdquo; surprises if
          you clear the box &mdash; you&apos;ll just see a dash until you type a
          number.
        </p>
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

      {/* Cross-link */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          More free tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/compress-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Compress Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Shrink JPG, PNG and WebP files with a quality slider.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              All tools
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Browse every free, private, browser-based tool on CoinMind.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Browse &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
