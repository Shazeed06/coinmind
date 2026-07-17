import type { Metadata } from "next";
import Link from "next/link";
import CoinDice from "@/components/tools/CoinDice";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Coin Flip & Dice Roller — Free Online, Heads or Tails" },
  description:
    "Free coin flip and dice roller. Flip heads or tails with a running count, or roll 1–6 dice from d4 to d20. 100% private — everything runs in your browser.",
  alternates: { canonical: "/tools/coin-flip" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/coin-flip",
    title: "Coin Flip & Dice Roller — Free Online, Heads or Tails",
    description:
      "Flip a coin with a running heads/tails count, or roll d4–d20 dice with a total. Free, private and instant in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Coin Flip and Dice Roller tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is the coin flip really 50/50?",
    a: "Yes. Each flip is decided the moment you click, with an equal chance of heads or tails, using your browser's built-in random number generator. The running tally lets you watch the split settle towards 50/50 as you flip more times.",
  },
  {
    q: "Which dice can I roll?",
    a: "You can roll between one and six dice at once, and choose d4, d6, d8, d10, d12 or d20 sides. The tool rolls each die independently and shows every face plus the combined total.",
  },
  {
    q: "Do you show the total of the dice?",
    a: "Yes. After each roll you see each individual die and the sum of all of them, along with the breakdown — for example 4 + 6 + 2 = 12 — which is useful for board games and tabletop RPGs.",
  },
  {
    q: "Are the results random or predictable?",
    a: "They are random. Both the coin flip and every die use your browser's random number generator at the moment you roll, so results can't be predicted and aren't stored or reused.",
  },
  {
    q: "Does this work offline and stay private?",
    a: "Yes. Everything runs on your device in the browser. No flips or rolls are uploaded, logged or sent anywhere, and the tool keeps working with no internet connection.",
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
        name: "Coin Flip & Dice",
        item: `${site.url}/tools/coin-flip`,
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
        <span className="text-ink">Coin Flip &amp; Dice</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Coin Flip &amp; Dice Roller
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Flip a coin for heads or tails, or roll up to six dice from d4 to d20
          &mdash; with a running tally and instant totals.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CoinDice />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Pick the <strong className="text-ink">Coin flip</strong> tab and press
            Flip for a fair heads-or-tails result with a live count, or switch to{" "}
            <strong className="text-ink">Dice roller</strong>, choose how many
            dice and how many sides, and press Roll to see every die and the
            total. Each result is decided at random the instant you click.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Flipping a coin to decide</h2>
        <p>
          A coin flip is the classic way to settle a two-way choice: who goes
          first, which option wins, or simply yes versus no. This flipper gives
          each side an even 50% chance every time and keeps a{" "}
          <strong>running count</strong> of heads and tails so you can see the
          split even out over many flips &mdash; a small, satisfying
          demonstration of probability. Because the outcome is generated only
          when you click, there is no way to game it and no result is fixed in
          advance.
        </p>

        <h2>Rolling dice for games and RPGs</h2>
        <p>
          The dice roller covers everything from a quick board-game turn to a
          full tabletop role-playing session. Choose <strong>d6</strong> for
          most family games, or reach for <strong>d4, d8, d10, d12</strong> and
          the mighty <strong>d20</strong> when a game calls for them. Roll up to
          six dice together and the tool adds them up for you, showing the
          breakdown like <span className="font-mono">5 + 3 = 8</span> so you can
          check the maths at a glance. It is a handy stand-in whenever the real
          dice have gone missing down the back of the sofa.
        </p>

        <h2>Fair, private and instant</h2>
        <p>
          Both tools use your browser&apos;s random number generator, so results
          are unpredictable and unbiased. Everything happens on your device
          &mdash; no flips or rolls are uploaded or stored &mdash; and the page
          works offline, which makes it reliable for game night even when the
          Wi-Fi is not. Reduced-motion settings are respected too, so the
          animations calm down if your device asks them to.
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
