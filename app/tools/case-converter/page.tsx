import type { Metadata } from "next";
import Link from "next/link";
import CaseConverter from "@/components/tools/CaseConverter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Case Converter — Change Text Case Online" },
  description:
    "Free online case converter. Instantly change text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and more — private, in your browser.",
  alternates: { canonical: "/tools/case-converter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/case-converter",
    title: "Case Converter — Change Text Case Online",
    description:
      "Change text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and more in one click. 100% private — your text never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Case Converter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my text sent to a server?",
    a: "No. The case converter runs entirely in your browser with JavaScript. Nothing you type is uploaded, logged or seen by anyone — your text never leaves your device.",
  },
  {
    q: "What is the difference between Title Case and Sentence case?",
    a: "Title Case capitalises the first letter of every word, which suits headlines and titles. Sentence case capitalises only the first letter of each sentence, like normal prose.",
  },
  {
    q: "What are camelCase, PascalCase, snake_case and kebab-case for?",
    a: "These are programming naming styles. camelCase and PascalCase are common for variables and classes, snake_case is popular in Python and databases, and kebab-case is used for URLs, CSS classes and file names.",
  },
  {
    q: "Can I convert text back after choosing the wrong case?",
    a: "Each button transforms whatever is currently in the box, so you can keep clicking to reshape it. If you flatten the text too far — for example to all lowercase — the original capitalisation can't be recovered, so paste a fresh copy if needed.",
  },
  {
    q: "Is there a character limit?",
    a: "There's no fixed limit. Because everything is processed on your own device, you can convert short snippets or long documents; very large text just uses a little more memory.",
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
        name: "Case Converter",
        item: `${site.url}/tools/case-converter`,
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
        <span className="text-ink">Case Converter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Case Converter
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Change your text to UPPERCASE, lowercase, Title Case, camelCase and
          more in a single click &mdash; right in your browser, with nothing
          uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CaseConverter />
      </div>

      {/* Quick answer */}
      <section className="mt-12 max-w-3xl">
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A case converter changes the capitalisation of your text without
            retyping it. Paste your text, then choose a style: use{" "}
            <strong className="text-ink">UPPERCASE</strong> or{" "}
            <strong className="text-ink">lowercase</strong> to normalise
            shouting or stray caps, <strong className="text-ink">Title Case</strong>{" "}
            for headlines, <strong className="text-ink">Sentence case</strong>{" "}
            to clean up prose, and{" "}
            <strong className="text-ink">camelCase</strong>,{" "}
            <strong className="text-ink">PascalCase</strong>,{" "}
            <strong className="text-ink">snake_case</strong> or{" "}
            <strong className="text-ink">kebab-case</strong> when you&apos;re
            naming things in code. Everything runs privately in your browser.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>When to use each case</h2>
        <p>
          Picking the right case makes text clearer and, in code, avoids bugs.{" "}
          <strong>UPPERCASE</strong> is for constants, acronyms and short labels
          where you want emphasis, while <strong>lowercase</strong> is handy for
          normalising input, tags or hashtags. <strong>Title Case</strong>{" "}
          capitalises every word and suits headlines, article titles and button
          labels. <strong>Sentence case</strong> capitalises only the first
          letter of each sentence, which is the natural style for body copy,
          descriptions and UI microcopy.
        </p>

        <h2>Cases for writing code</h2>
        <p>
          Programmers rely on strict naming styles. <strong>camelCase</strong>{" "}
          (firstName) is standard for variables and functions in JavaScript,
          Java and many other languages. <strong>PascalCase</strong>{" "}
          (FirstName) names classes, React components and types.{" "}
          <strong>snake_case</strong> (first_name) is common in Python, Ruby and
          SQL databases, and <strong>kebab-case</strong> (first-name) is used for
          URLs, CSS class names and file names because it reads cleanly and is
          case-insensitive. This tool splits your text on spaces, hyphens,
          underscores and existing camelCase boundaries, so you can convert
          freely between all of them.
        </p>

        <h2>Fun and formatting cases</h2>
        <p>
          <strong>aLtErNaTiNg cAsE</strong> flips between lower and upper on each
          letter, a playful style popular in memes and social posts.{" "}
          <strong>InVeRsE case</strong> swaps the case of every letter, so
          uppercase becomes lowercase and the other way round &mdash; useful when
          your Caps Lock was on by mistake. Whatever you choose, the live
          character and word counts under the box help you keep an eye on length
          for titles, tweets or meta descriptions.
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
