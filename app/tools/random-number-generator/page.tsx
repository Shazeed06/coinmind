import type { Metadata } from "next";
import Link from "next/link";
import RandomNumber from "@/components/tools/RandomNumber";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Random Number Generator — Fair & Free Online" },
  description:
    "Free random number generator. Pick fair numbers in any range, choose how many, and allow or block duplicates. Uses secure browser crypto — nothing uploaded.",
  alternates: { canonical: "/tools/random-number-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/random-number-generator",
    title: "Random Number Generator — Fair & Free Online",
    description:
      "Generate fair random numbers in any range with the Web Crypto API. Choose how many and allow or block duplicates. 100% private, in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Random Number Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How random are the numbers?",
    a: "Very. This generator uses crypto.getRandomValues, your browser's cryptographically secure random source, with rejection sampling to remove statistical bias. That is fairer than Math.random, which is not designed for unbiased draws.",
  },
  {
    q: "Can I stop the same number appearing twice?",
    a: "Yes. Turn off 'Allow duplicates' to draw unique numbers only — perfect for lottery lines, raffle tickets or picking winners. If you ask for more unique numbers than the range can hold, the tool tells you instead of hanging.",
  },
  {
    q: "What happens if the minimum is bigger than the maximum?",
    a: "The tool detects it and shows a clear message asking you to fix the range, and the Generate button stays disabled until the numbers make sense. The minimum and maximum are both included in the range.",
  },
  {
    q: "Can I generate many numbers at once?",
    a: "Yes, up to 10,000 in a single click. You can also sort the results in ascending order and copy them all to your clipboard as a comma-separated list.",
  },
  {
    q: "Are my numbers uploaded or stored?",
    a: "No. Every number is generated on your device in the browser. Nothing is uploaded, logged or sent anywhere, and the tool works offline.",
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
        name: "Random Number Generator",
        item: `${site.url}/tools/random-number-generator`,
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
        <span className="text-ink">Random Number Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Random Number Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Pick fair, unpredictable numbers in any range &mdash; choose how many
          and whether duplicates are allowed, generated securely in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <RandomNumber />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Set a <strong className="text-ink">minimum</strong> and{" "}
            <strong className="text-ink">maximum</strong>, choose{" "}
            <strong className="text-ink">how many</strong> numbers you need, then
            press Generate. Leave duplicates on to allow repeats, or turn them off
            for a set of unique numbers &mdash; ideal for lottery lines or raffle
            draws. Both ends of the range are included.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What you can use it for</h2>
        <p>
          A random number generator is a quiet workhorse. Use it to pick{" "}
          <strong>lottery or lucky-dip numbers</strong>, draw a{" "}
          <strong>raffle or giveaway winner</strong> from a numbered list, choose
          a random row in a spreadsheet, assign teams, seed a game, or sample
          data for a quick experiment. With duplicates switched off you get a set
          of distinct values &mdash; exactly what you want for tickets or
          positions &mdash; while leaving them on models independent draws like
          rolling the same die many times.
        </p>

        <h2>Why crypto randomness matters</h2>
        <p>
          Not all randomness is equal. Ordinary <span className="font-mono">Math.random</span>{" "}
          is fast but predictable and can show subtle bias, which is fine for a
          casual shuffle but not when fairness counts. This tool uses the{" "}
          <strong>Web Crypto API</strong> (<span className="font-mono">crypto.getRandomValues</span>)
          together with <em>rejection sampling</em>, which discards the rare
          values that would skew a range and so gives every number an equal
          chance. The result is a draw you can trust for competitions and picks.
        </p>

        <h2>Handling tricky settings gracefully</h2>
        <p>
          The generator checks your inputs before it runs. If the minimum is
          larger than the maximum, or you ask for more unique numbers than the
          range can possibly provide, it explains the problem in plain language
          and keeps the Generate button disabled until it is fixed &mdash; so you
          never get a confusing result or a frozen page. You can also sort the
          output in ascending order and copy the whole set to your clipboard in
          one click.
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
          More fun tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/random-wheel"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Random Wheel Picker
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Enter options, spin a colourful wheel and let it choose a winner.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools/coin-flip"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Coin Flip &amp; Dice
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Flip a coin or roll any dice &mdash; d4 through d20 &mdash; with a
              running tally.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
