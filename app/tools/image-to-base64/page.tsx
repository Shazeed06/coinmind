import type { Metadata } from "next";
import Link from "next/link";
import ImageToBase64 from "@/components/tools/ImageToBase64";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Image to Base64 — Free Data URI Encoder" },
  description:
    "Free image to Base64 encoder. Convert any image to a data URI with ready-to-copy HTML <img> and CSS snippets. 100% private — encoded in your browser.",
  alternates: { canonical: "/tools/image-to-base64" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/image-to-base64",
    title: "Image to Base64 — Free Data URI Encoder",
    description:
      "Convert any image to a Base64 data URI with ready-to-copy HTML and CSS snippets. 100% private — your image never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image to Base64 tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my image uploaded to a server?",
    a: "No. This encoder reads your image directly on your device using the browser's FileReader API. The image is never uploaded, stored or seen by anyone — the Base64 string is generated entirely in your browser.",
  },
  {
    q: "What is a Base64 data URI?",
    a: "It's a way of writing an image as plain text. The data URI starts with data:image/… followed by a long Base64-encoded string of the file's bytes. Because it's just text, you can paste it straight into HTML or CSS and the browser rebuilds the image — no separate file needed.",
  },
  {
    q: "When should I embed an image as Base64?",
    a: "It's handy for small assets like icons, logos or background patterns, for single-file HTML emails or documents, and to avoid an extra network request. For large images it's usually a poor trade-off, because embedding bloats your file and the browser can't cache the image separately.",
  },
  {
    q: "Why is the Base64 version bigger than my file?",
    a: "Base64 represents binary data using only text characters, which adds roughly 33% overhead. So a 90 KB image becomes about 120 KB of text. That's normal — the tool shows you the exact encoded size so you can decide whether inlining is worth it.",
  },
  {
    q: "How do I turn a data URI back into an image?",
    a: "Paste the full data:image URI into your browser's address bar and press Enter to view it, then right-click and choose Save image to write it back to a file. Any Base64 decoder will also convert it back to the original bytes.",
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
        name: "Image to Base64",
        item: `${site.url}/tools/image-to-base64`,
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
        <span className="text-ink">Image to Base64</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Image to Base64
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Encode any image as a Base64 data URI, with ready-to-copy HTML and CSS
          snippets &mdash; right in your browser, with nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <ImageToBase64 />
      </div>

      {/* Quick answer intro */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            An <strong className="text-ink">image to Base64</strong> encoder turns
            a picture into a long text string called a{" "}
            <strong className="text-ink">data URI</strong>, which you can paste
            directly into HTML or CSS instead of linking to a separate file. Drop
            an image above and this tool gives you the full data URI plus
            ready-made{" "}
            <strong className="text-ink">&lt;img&gt;</strong> and{" "}
            <strong className="text-ink">CSS background</strong> snippets, and
            shows the encoded size. It is free, needs no sign-up, and everything
            runs in your browser, so your image stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What is Base64 encoding?</h2>
        <p>
          Base64 is a way of representing binary data &mdash; like the bytes of an
          image &mdash; using only 64 plain text characters (A&ndash;Z,
          a&ndash;z, 0&ndash;9, plus a couple of symbols). Because the result is
          ordinary text, it can travel anywhere text can go: inside an HTML file,
          a stylesheet, a JSON payload or an email. A <strong>data URI</strong>{" "}
          wraps that text with a small header (for example{" "}
          <em>data:image/png;base64,</em>) that tells the browser what kind of
          file it is, so it can decode and display the image without ever
          downloading a separate file.
        </p>

        <h2>When to inline an image</h2>
        <p>
          Embedding an image as Base64 shines for <strong>small assets</strong>:
          icons, a logo, a tiny background texture, or graphics in an HTML email
          where external images are often blocked. It bundles everything into a
          single file and removes an extra network request, which can shave a few
          milliseconds off the first paint. It&apos;s also perfect for quick demos,
          prototypes and self-contained snippets you want to share without
          shipping image files alongside them.
        </p>

        <h2>When not to inline</h2>
        <p>
          For <strong>large or frequently reused images</strong>, a normal file
          URL is almost always better. Base64 adds about 33% to the size, and an
          inlined image can&apos;t be cached on its own &mdash; the browser has to
          re-download the whole string every time the HTML or CSS changes, and it
          can&apos;t be reused across pages. A giant data URI also makes your
          markup hard to read. As a rough rule, inline images under a few
          kilobytes and link to anything bigger.
        </p>

        <h2>Using the snippets</h2>
        <p>
          Once you&apos;ve encoded an image, copy the <strong>data URI</strong> on
          its own to drop into JavaScript or a framework, or grab the ready-made{" "}
          <strong>HTML &lt;img&gt;</strong> tag to paste straight into a page. The{" "}
          <strong>CSS background</strong> snippet is ideal for decorative images
          &mdash; paste it into a rule to set a background without a separate
          file. Everything is generated locally, so you can encode sensitive or
          unpublished images with confidence.
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
              Shrink an image first so its Base64 string is smaller.
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
