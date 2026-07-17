import type { Metadata } from "next";
import Link from "next/link";
import Base64Tool from "@/components/tools/Base64Tool";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Base64 Encode & Decode — Free Online Tool" },
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and back with full Unicode and emoji support. 100% private — everything runs in your browser.",
  alternates: { canonical: "/tools/base64" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/base64",
    title: "Base64 Encode & Decode — Free Online Tool",
    description:
      "Encode text to Base64 or decode it back, with correct UTF-8 handling. 100% private — your text never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Base64 Encode and Decode tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my text uploaded to a server?",
    a: "No. Encoding and decoding happen entirely in your browser with JavaScript. Nothing you type or paste is uploaded, logged or seen by anyone — it never leaves your device, so it is safe for private data.",
  },
  {
    q: "What is Base64 and when should I use it?",
    a: "Base64 represents binary or text data using 64 safe ASCII characters. It is used to embed images in CSS or HTML (data URIs), to carry data in JSON, JWTs and email attachments, and anywhere raw bytes need to travel through a text-only channel without corruption.",
  },
  {
    q: "Is Base64 encryption?",
    a: "No. Base64 is encoding, not encryption — it scrambles nothing and protects nothing. Anyone can decode it back instantly, exactly like this tool does. Never use Base64 to hide passwords or secrets; use real encryption for that.",
  },
  {
    q: "Does it handle emoji and non-English characters?",
    a: "Yes. Input is converted to UTF-8 bytes before encoding, so emoji, accents and non-Latin scripts survive the round trip intact. Naive encoders that skip this step corrupt any character outside basic ASCII.",
  },
  {
    q: "Why do I get an error when decoding?",
    a: "Decoding fails when the input isn't valid Base64 — for example it contains characters outside the Base64 alphabet, or the length and padding are wrong. The tool ignores spaces and line breaks automatically, but genuinely malformed input will show an error rather than a wrong result.",
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
        name: "Base64 Encode / Decode",
        item: `${site.url}/tools/base64`,
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
        <span className="text-ink">Base64</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Base64 Encode &amp; Decode
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert text to Base64 and back in one click &mdash; with correct
          Unicode and emoji handling, right in your browser and nothing
          uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <Base64Tool />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Base64 encoding rewrites data using 64 safe characters so it can
            travel through text-only channels without being corrupted. Switch to{" "}
            <strong className="text-ink">Encode</strong> and paste any text to
            get its Base64 form, or switch to{" "}
            <strong className="text-ink">Decode</strong> and paste Base64 to read
            it back. Because the text is converted to UTF-8 first, emoji and
            accented or non-Latin characters round-trip correctly. Everything
            runs privately in your browser.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What Base64 is for</h2>
        <p>
          Base64 turns arbitrary bytes into a string of 64 printable ASCII
          characters (A&ndash;Z, a&ndash;z, 0&ndash;9, plus{" "}
          <strong>+</strong> and <strong>/</strong>). That matters whenever data
          has to pass through a system that only understands text: embedding a
          small image directly in HTML or CSS as a <strong>data URI</strong>,
          carrying binary inside <strong>JSON</strong> or a{" "}
          <strong>JWT</strong>, encoding <strong>email attachments</strong>, or
          storing credentials in an HTTP Basic <strong>Authorization</strong>{" "}
          header. It trades size for safety &mdash; encoded output is about a
          third larger than the original.
        </p>

        <h2>Encoding is not encryption</h2>
        <p>
          It is worth repeating: Base64 offers <strong>no security</strong>.
          Anyone can decode it in a moment, exactly as this page does, so it must
          never be used to hide passwords, API keys or personal data. If you need
          confidentiality, reach for real encryption. Base64 solves a transport
          problem, not a privacy one.
        </p>

        <h2>Getting Unicode right</h2>
        <p>
          The classic bug is encoding text with characters beyond basic ASCII.
          The raw <strong>btoa</strong> function only handles bytes 0&ndash;255,
          so passing it an emoji or an accented letter throws an error or mangles
          the output. This tool first converts your text to <strong>UTF-8</strong>{" "}
          bytes and encodes those, then reverses the process on decode &mdash; so{" "}
          caf&eacute;, na&iuml;ve and full emoji all survive intact. When
          decoding, stray spaces and line breaks are ignored so pasted blocks
          just work.
        </p>

        <h2>Private by design</h2>
        <p>
          Because encoding and decoding happen on your own device, you can safely
          convert tokens, payloads and confidential text. Nothing is uploaded,
          stored or logged, and the tool keeps working offline.
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
            href="/tools/url-encode-decode"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              URL Encode / Decode
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Percent-encode and decode URLs and query strings safely.
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
