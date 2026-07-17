import type { Metadata } from "next";
import Link from "next/link";
import RandomWheel from "@/components/tools/RandomWheel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Random Wheel Picker — Spin to Choose, Free" },
  description:
    "Free spinning wheel picker. Enter your options, spin a colourful wheel and let it choose a random winner. 100% private — everything runs in your browser.",
  alternates: { canonical: "/tools/random-wheel" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/random-wheel",
    title: "Random Wheel Picker — Spin to Choose, Free",
    description:
      "Enter your options, spin a colourful wheel and let it pick a random winner. Free, private and instant — right in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Random Wheel Picker tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How does the wheel pick a winner?",
    a: "When you press Spin, the tool picks one option at random and rotates the wheel so that segment lands under the pointer. Every option has an equal chance each spin, and the choice is made only after you click — nothing is decided in advance.",
  },
  {
    q: "Is the spin actually random or is it rigged?",
    a: "It is genuinely random. The winner is chosen with your browser's built-in random number generator at the moment you spin, and each segment is exactly the same size, so no option is ever favoured.",
  },
  {
    q: "Can I remove the winner and spin again?",
    a: "Yes. Turn on 'Remove the winner after each spin' to run an elimination-style draw, or use the Remove & respin button on the winner banner. This is handy for raffles, picking teams or working through a to-do list.",
  },
  {
    q: "How many options can I add?",
    a: "Add as many as you like — one per line in the options box. The wheel resizes its segments automatically. For very long lists the labels shorten to fit, but the full text still shows as the winner.",
  },
  {
    q: "Are my options saved or uploaded anywhere?",
    a: "No. The wheel runs entirely in your browser. Your options are never uploaded, stored or seen by anyone, and the tool keeps working even offline.",
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
        name: "Random Wheel Picker",
        item: `${site.url}/tools/random-wheel`,
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
        <span className="text-ink">Random Wheel</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Random Wheel Picker
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Enter your choices, spin a colourful wheel and let chance pick the
          winner &mdash; perfect for decisions, raffles, games and giveaways.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <RandomWheel />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            To pick something at random, type each option on its own line, then
            press <strong className="text-ink">Spin the wheel</strong>. The wheel
            spins and stops on one option chosen fairly at random &mdash; every
            item has an equal chance. Want a fast decision with no animation? Use{" "}
            <strong className="text-ink">Pick a random option</strong> instead.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What a random wheel is good for</h2>
        <p>
          A spinning wheel turns any either-or dilemma into a quick, fair and
          slightly theatrical decision. Use it to settle{" "}
          <strong>what to eat</strong>, who does the washing up, which film to
          watch or where to go on the weekend. Teachers use wheels to pick a
          pupil to answer, streamers use them to choose a giveaway winner, and
          managers use them to assign tasks without anyone feeling singled out.
          Because the choice is visibly random, everyone accepts the outcome
          &mdash; which is often the real point of spinning at all.
        </p>

        <h2>Why a wheel feels fairer than choosing yourself</h2>
        <p>
          When a person picks, there is always a suspicion of bias. A wheel
          removes that: each option occupies an identical slice, and the winner
          is selected the instant you spin, using your browser&apos;s random
          number generator. Nothing is weighted and nothing is decided
          beforehand. Turn on <strong>Remove the winner after each spin</strong>{" "}
          to draw names one by one without repeats &mdash; ideal for raffles,
          shuffling a running order or building teams from a single list.
        </p>

        <h2>Tips for a good spin</h2>
        <p>
          Keep each option short so its label stays readable on the wheel &mdash;
          full text always appears in the winner banner, so you lose nothing by
          abbreviating. Two options is the minimum; between about four and twelve
          looks best and lands most satisfyingly. For a giveaway, paste your list
          of entrants one per line, enable winner removal, and keep spinning to
          draw first, second and third place in order.
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
          <Link
            href="/tools/random-number-generator"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Random Number Generator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Pick fair random numbers in any range, with or without duplicates.
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
