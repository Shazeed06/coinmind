import type { Metadata } from "next";
import Link from "next/link";
import UrlEncodeTool from "@/components/tools/UrlEncodeTool";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "URL Encode & Decode — Free Online Tool" },
  description:
    "Free online URL encoder and decoder. Percent-encode query values and whole URLs with encodeURIComponent or encodeURI, and decode them back. 100% private, in your browser.",
  alternates: { canonical: "/tools/url-encode-decode" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/url-encode-decode",
    title: "URL Encode & Decode — Free Online Tool",
    description:
      "Percent-encode and decode URLs and query strings with encodeURIComponent or encodeURI. 100% private — your text never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "URL Encode and Decode tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my input uploaded to a server?",
    a: "No. Encoding and decoding run entirely in your browser with JavaScript. Nothing you type or paste is uploaded, logged or seen by anyone — it never leaves your device, so it is safe for private URLs and data.",
  },
  {
    q: "What is the difference between encodeURIComponent and encodeURI?",
    a: "encodeURIComponent escapes almost everything, including reserved characters like : / ? # & and =, so it is right for a single query value or path segment. encodeURI leaves those reserved characters intact because it is meant for encoding a whole, already-structured URL.",
  },
  {
    q: "When should I URL-encode text?",
    a: "Whenever you put user text or arbitrary data into a URL — a search term, a filter value, a redirect target — encode it so spaces, ampersands, plus signs and non-ASCII characters don't break the link or get misread as separators. Use component encoding for individual values.",
  },
  {
    q: "Why does decoding sometimes show an error?",
    a: "Decoding fails on malformed percent-sequences — a lone % sign, or % not followed by two hexadecimal digits. When that happens the tool reports the problem instead of returning a broken or misleading result.",
  },
  {
    q: "How are spaces handled?",
    a: "encodeURIComponent and encodeURI turn a space into %20. Note that the older application/x-www-form-urlencoded style used in form submissions encodes a space as a plus sign instead — this tool follows the modern %20 behaviour used in URLs.",
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
        name: "URL Encode / Decode",
        item: `${site.url}/tools/url-encode-decode`,
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
        <span className="text-ink">URL Encode / Decode</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          URL Encode &amp; Decode
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Percent-encode query values and whole URLs, or decode them back &mdash;
          in one click, right in your browser and nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <UrlEncodeTool />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            URL encoding (percent-encoding) replaces unsafe characters with a{" "}
            <strong className="text-ink">%</strong> followed by two hex digits so
            they can travel safely inside a link. Choose{" "}
            <strong className="text-ink">Encode</strong> or{" "}
            <strong className="text-ink">Decode</strong>, then pick the method:{" "}
            <strong className="text-ink">component</strong> (encodeURIComponent)
            for a single query value, or <strong className="text-ink">whole URI</strong>{" "}
            (encodeURI) for a complete URL. Paste your text to see the result
            instantly. Everything runs privately in your browser.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why URLs need encoding</h2>
        <p>
          URLs may only contain a limited set of characters, and several of those
          &mdash; <strong>? # &amp; = /</strong> &mdash; carry special meaning as
          separators. If you drop a raw search phrase or a value containing those
          characters straight into a link, the browser or server misreads where
          one part ends and the next begins. Percent-encoding replaces each
          unsafe byte with <strong>%XX</strong>, so a space becomes{" "}
          <strong>%20</strong> and an ampersand becomes <strong>%26</strong>,
          keeping the link unambiguous and unbroken.
        </p>

        <h2>Component vs whole URI</h2>
        <p>
          The right method depends on what you are encoding.{" "}
          <strong>encodeURIComponent</strong> escapes nearly everything,
          including the reserved separators, which is exactly what you want for a
          single piece &mdash; one query value, one path segment, a redirect
          target. <strong>encodeURI</strong> is gentler: it leaves the structural
          characters <strong>: / ? # &amp; =</strong> alone so an entire,
          already-formed URL stays usable. As a rule, encode individual values
          with the component method and assemble the final URL around them.
        </p>

        <h2>Decoding safely</h2>
        <p>
          Decoding reverses percent-encoding back to readable text, which is
          handy for inspecting a query string or a logged URL. It only fails when
          the input is malformed &mdash; a lone <strong>%</strong> or a{" "}
          <strong>%</strong> not followed by two hex digits &mdash; and this tool
          reports that clearly instead of returning garbled output. Use the same
          method you encoded with: component for values, whole URI for full
          links.
        </p>

        <h2>Private by design</h2>
        <p>
          URLs can hold tokens, IDs and personal parameters, so privacy matters.
          Every conversion here happens on your own device with client-side
          JavaScript. Nothing is uploaded, stored or logged, and the tool keeps
          working even offline.
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
            href="/tools/json-formatter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              JSON Formatter &amp; Validator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Beautify, minify and validate JSON with precise error locations.
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
