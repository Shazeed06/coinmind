import type { Metadata } from "next";
import Link from "next/link";
import CharacterCounter from "@/components/tools/CharacterCounter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Character Counter — Count Characters Online" },
  description:
    "Free online character counter. Live character count with and without spaces, plus words, sentences and Twitter, SMS & meta limits. 100% private.",
  alternates: { canonical: "/tools/character-counter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/character-counter",
    title: "Character Counter — Count Characters Online",
    description:
      "Count characters online in real time — with and without spaces, plus words, sentences and live Twitter, SMS and meta-tag limits. Runs in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Character Counter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my text uploaded anywhere?",
    a: "No. The character counter runs entirely in your browser with JavaScript. Nothing you type or paste is uploaded, stored or seen by anyone — it never leaves your device, so it is safe for private or confidential text.",
  },
  {
    q: "What is the difference between characters with and without spaces?",
    a: "Characters (with spaces) counts every character you enter, including spaces, tabs and line breaks. Characters (no spaces) ignores all whitespace. Social platforms and SMS count characters with spaces, while some style guides quote the no-spaces figure.",
  },
  {
    q: "Do the platform limits count spaces?",
    a: "Yes. Twitter/X (280), SMS (160), Instagram captions (2200) and the meta title (60) and meta description (160) all count every character including spaces, so the live meters use the characters-with-spaces total.",
  },
  {
    q: "How are words, sentences and lines counted?",
    a: "A word is any run of characters separated by spaces or line breaks. A sentence ends in a full stop, question mark or exclamation mark. Lines are counted by the number of line breaks, so a single paragraph on one line counts as one line.",
  },
  {
    q: "Why does a character count matter for SEO and social media?",
    a: "Platforms truncate text that runs past their limit. A page title over about 60 characters or a meta description over 160 gets cut off in Google, and a tweet over 280 characters simply will not post. Watching the live count lets you trim to fit before you publish.",
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
        name: "Character Counter",
        item: `${site.url}/tools/character-counter`,
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
        <span className="text-ink">Character Counter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Character Counter
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Count characters online as you type &mdash; with and without spaces,
          plus words, sentences and lines, and live meters for Twitter, SMS and
          meta-tag limits.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CharacterCounter />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">Quick answer</h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A character counter tells you exactly how many characters your text
            contains. Paste or type into the box above and every figure updates
            instantly &mdash; characters with and without spaces, words,
            sentences and lines &mdash; alongside live &ldquo;used /
            remaining&rdquo; meters for Twitter/X, SMS, Instagram and SEO
            meta-tag limits. It all runs in your browser, so your text stays
            private and works offline.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why character count matters</h2>
        <p>
          Almost every place you publish text enforces a character limit, and
          going over it means your words get cut off &mdash; or rejected
          outright. A <strong>tweet</strong> stops at 280 characters, a single{" "}
          <strong>SMS</strong> segment holds 160, and an{" "}
          <strong>Instagram</strong> caption caps out at 2,200. Seeing the count
          rise as you type lets you shape a message to fit rather than pasting it
          somewhere else just to check, then editing and pasting again.
        </p>

        <h2>Characters, letters and the no-spaces count</h2>
        <p>
          People search for a <strong>character counter</strong>, a{" "}
          <strong>letter counter</strong> and a way to{" "}
          <strong>count characters</strong> for slightly different reasons, but
          the numbers here cover them all. The main figure counts every
          character including spaces, which is what social platforms and SMS
          gateways measure. The characters-no-spaces figure strips out all
          whitespace, which some academic and style-guide limits refer to. Words,
          sentences and lines round out the picture for longer writing.
        </p>

        <h2>Meta titles, descriptions and SEO</h2>
        <p>
          For search engine optimisation, two limits matter most. A page{" "}
          <strong>title tag</strong> should stay under roughly 60 characters and
          a <strong>meta description</strong> under about 160, or Google
          truncates them with an ellipsis in the results. The live meters above
          turn red the moment you cross a limit, so you can write a snippet that
          displays in full. Because everything is calculated on your own device,
          you can safely paste confidential drafts, client copy or unpublished
          content.
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
        <h2 className="font-display text-2xl font-600 text-ink">More free tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/word-counter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Word Counter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Count words, sentences and reading time as you type.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">All tools</h3>
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
