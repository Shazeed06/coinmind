import type { Metadata } from "next";
import Link from "next/link";
import LoremIpsum from "@/components/tools/LoremIpsum";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Lorem Ipsum Generator — Free Placeholder Text" },
  description:
    "Free Lorem Ipsum generator. Create placeholder text by paragraphs, sentences or words, with a one-click copy. Runs entirely in your browser — no sign-up.",
  alternates: { canonical: "/tools/lorem-ipsum-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/lorem-ipsum-generator`,
    title: "Lorem Ipsum Generator — Free Placeholder Text",
    description:
      "Generate classic Lorem Ipsum placeholder text by paragraphs, sentences or words. Free, private and instant, right in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lorem Ipsum generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "What is Lorem Ipsum?",
    a: "Lorem Ipsum is scrambled Latin-like placeholder text that designers and developers use to fill a layout before the real copy is ready. Because the words carry no meaning, they let you judge typography, spacing and hierarchy without being distracted by the content.",
  },
  {
    q: "Where does Lorem Ipsum come from?",
    a: "It is derived from a first-century BC Latin text by Cicero, De finibus bonorum et malorum. Typesetters have used scrambled versions of it as dummy text since the 1500s, and it became the standard filler for print and, later, web design.",
  },
  {
    q: "Can I choose paragraphs, sentences or words?",
    a: "Yes. Pick the unit you need, set the count, and the generator builds exactly that much placeholder text. You can also choose whether it opens with the traditional Lorem ipsum dolor sit amet line or starts with fresh random words.",
  },
  {
    q: "Is the generated text always the same?",
    a: "No. Each time you press Regenerate, or change an option, the tool produces a fresh random arrangement from a standard Lorem word bank, so you get natural-looking variety every time.",
  },
  {
    q: "Does it work offline and keep my work private?",
    a: "Yes. The generator runs entirely in your browser with JavaScript, so it keeps working without a connection and never sends anything to a server.",
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
        name: "Lorem Ipsum Generator",
        item: `${site.url}/tools/lorem-ipsum-generator`,
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
        <span className="text-ink">Lorem Ipsum Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Lorem Ipsum Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Generate classic placeholder text by paragraphs, sentences or words
          &mdash; then copy it into your mockup, template or design in one click.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <LoremIpsum />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A Lorem Ipsum generator creates meaningless filler text so you can
            design a layout before the real words exist. Choose how many
            paragraphs, sentences or words you need, decide whether to open with
            the familiar <strong>Lorem ipsum dolor sit amet</strong> line, and
            copy the result. Everything is generated in your browser, so it is
            instant and works offline.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why designers use placeholder text</h2>
        <p>
          Real copy is distracting when you are still shaping a design. If you
          fill a mockup with a finished headline, people start editing the
          words instead of reviewing the <strong>layout</strong>. Lorem Ipsum
          sidesteps that: because it looks like natural language but means
          nothing, it lets you evaluate <strong>font choices</strong>, line
          length, spacing and visual hierarchy on their own terms. It also
          fills space realistically, so you can see how a template behaves with
          a genuine amount of text rather than a single short line.
        </p>

        <h2>Paragraphs, sentences or words</h2>
        <p>
          Different jobs need different amounts of filler. A blog template might
          call for several <strong>paragraphs</strong>, a card component might
          need a couple of <strong>sentences</strong>, and a button or heading
          might need just a handful of <strong>words</strong>. Choose the unit,
          set the count, and the generator gives you exactly that. Turning off
          the traditional opening line is handy when you want every block to
          read as fresh random text.
        </p>

        <h2>Tips for realistic mockups</h2>
        <p>
          Match the amount of placeholder text to the real content you expect.
          If a product description will run about forty words, generate forty
          words rather than a full paragraph, so the design reflects reality.
          Regenerate a few times to see how your layout copes with varying
          lengths &mdash; robust designs look good whether a block is short or
          long. When the real copy arrives, swapping it in should feel seamless
          because the spacing was already tuned to a lifelike volume of text.
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
            href="/tools/word-counter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Word Counter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Count words, characters, sentences and reading time as you type.
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
