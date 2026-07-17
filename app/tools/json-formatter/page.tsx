import type { Metadata } from "next";
import Link from "next/link";
import JsonFormatter from "@/components/tools/JsonFormatter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "JSON Formatter & Validator — Free Online" },
  description:
    "Free online JSON formatter, beautifier and validator. Pretty-print with 2 or 4 spaces, minify, and see the exact parse error with its location. 100% private, in your browser.",
  alternates: { canonical: "/tools/json-formatter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/json-formatter",
    title: "JSON Formatter & Validator — Free Online",
    description:
      "Beautify, minify and validate JSON with precise error locations. 100% private — your data never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JSON Formatter & Validator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my JSON uploaded to a server?",
    a: "No. The formatter runs entirely in your browser using the native JSON parser. Nothing you paste is uploaded, logged or seen by anyone — it never leaves your device, so it is safe for API keys, tokens and confidential payloads.",
  },
  {
    q: "What is the difference between beautify and minify?",
    a: "Beautify (or format) adds indentation and line breaks so the JSON is easy to read, using either 2 or 4 spaces. Minify strips all optional whitespace to produce the smallest valid JSON on a single line, which is ideal for sending over the network or embedding in code.",
  },
  {
    q: "How does it help me find errors?",
    a: "When the JSON can't be parsed, the tool shows the browser's parse error message plus an approximate line, column and character position. That points you close to the problem — usually a missing comma, an extra trailing comma, unquoted keys, or single quotes where double quotes are required.",
  },
  {
    q: "Why must JSON keys use double quotes?",
    a: "The JSON specification only allows double quotes around keys and string values, and forbids trailing commas and comments. JavaScript object literals are more relaxed, which is why code that looks fine can still fail to parse as JSON. This validator follows the strict standard.",
  },
  {
    q: "Is there a size limit?",
    a: "There is no fixed limit. Because everything is processed on your own device, you can format short snippets or large API responses; very large documents simply use a little more memory and take a moment longer.",
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
        name: "JSON Formatter",
        item: `${site.url}/tools/json-formatter`,
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
        <span className="text-ink">JSON Formatter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          JSON Formatter &amp; Validator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Beautify, minify and validate JSON in one click &mdash; with precise
          error locations, right in your browser and nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <JsonFormatter />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A JSON formatter turns messy, minified or hand-typed JSON into clean,
            indented, readable text &mdash; and tells you instantly whether it is
            valid. Paste your JSON above, then choose{" "}
            <strong className="text-ink">Format / Beautify</strong> (2 or 4
            spaces) to pretty-print it, <strong className="text-ink">Minify</strong>{" "}
            to compress it onto one line, or{" "}
            <strong className="text-ink">Validate</strong> to check it. If
            something is wrong, you get the exact error message and its
            approximate line and column. Everything runs privately in your
            browser.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why format and validate JSON</h2>
        <p>
          JSON is the everyday language of APIs, config files and data exchange,
          but it is unforgiving: a single missing comma or stray quote makes the
          whole document invalid. Formatting reveals the structure so you can
          scan nesting, spot duplicated keys and understand a response at a
          glance. Validation catches the small syntax mistakes &mdash; trailing
          commas, unquoted keys, single quotes &mdash; before they break your
          code or a webhook. Because this tool parses with the browser&apos;s own
          engine, what it accepts is exactly what your JavaScript will accept.
        </p>

        <h2>Beautify, minify and indentation</h2>
        <p>
          <strong>Beautifying</strong> adds line breaks and indentation so nested
          objects and arrays are easy to follow; pick <strong>2 spaces</strong>{" "}
          for compact readability or <strong>4 spaces</strong> when you want more
          visual separation. <strong>Minifying</strong> does the opposite,
          stripping every optional space and newline to produce the smallest
          valid payload &mdash; useful for reducing bandwidth, embedding JSON in
          a string, or fitting it into a query. You can move between the two
          freely without retyping anything.
        </p>

        <h2>Reading the error message</h2>
        <p>
          When parsing fails, the tool shows the raw parser message and an
          approximate <strong>line, column and character position</strong>. Jump
          to that spot in your source and look just before it: the most common
          culprits are a comma missing between two items, an extra comma after
          the last item, keys or strings wrapped in single quotes instead of
          double quotes, or unescaped line breaks inside a string. Fix the first
          error and re-validate, since one mistake can mask the next.
        </p>

        <h2>Private by design</h2>
        <p>
          API responses and config files often contain secrets &mdash; tokens,
          keys, personal data. Everything here is processed entirely on your own
          device with client-side JavaScript, so you can safely paste sensitive
          payloads. Nothing is sent to a server, stored or logged, and the tool
          keeps working even offline.
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
            href="/tools/base64"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Base64 Encode / Decode
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Convert text to and from Base64, with full Unicode support.
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
