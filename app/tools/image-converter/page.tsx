import type { Metadata } from "next";
import Link from "next/link";
import ImageConverter from "@/components/tools/ImageConverter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Image Converter — JPG, PNG & WebP Online Free" },
  description:
    "Free online image converter. Convert between JPG, PNG and WebP instantly. 100% private — images are converted in your browser, never uploaded.",
  alternates: { canonical: "/tools/image-converter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/image-converter",
    title: "Image Converter — JPG, PNG & WebP Online Free",
    description:
      "Convert images between JPG, PNG and WebP instantly. 100% private — your images never leave your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image Converter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded anywhere?",
    a: "No. The converter runs entirely in your browser using the HTML Canvas API. Your images are processed locally and never uploaded, so they stay completely private.",
  },
  {
    q: "Which formats can I convert between?",
    a: "You can convert freely between JPG, PNG and WebP. Upload any of the three and export to any of the three — including mixed batches of multiple images at once.",
  },
  {
    q: "What happens to transparency when I convert to JPG?",
    a: "JPG does not support transparency, so any transparent areas are filled with white before export. If you need to keep transparency, choose PNG or WebP instead.",
  },
  {
    q: "Which format should I choose?",
    a: "Use JPG for photos where small size matters, PNG for logos, icons and screenshots that need transparency or crisp edges, and WebP when you want the best of both — small files with transparency support.",
  },
  {
    q: "Does converting reduce image quality?",
    a: "Converting to PNG is lossless. Converting to JPG or WebP re-encodes at high quality (about 92%), which is visually near-identical for most images while keeping files small.",
  },
  {
    q: "Can I convert several images at once?",
    a: "Yes. Drop or select multiple images, pick your output format, and download them individually or all at once with the Download all button.",
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
        name: "Image Converter",
        item: `${site.url}/tools/image-converter`,
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
        <span className="text-ink">Image Converter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Image Converter
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert images between JPG, PNG and WebP in one click &mdash; right in
          your browser, with nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <ImageConverter />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>JPG, PNG and WebP — what&apos;s the difference?</h2>
        <p>
          These three formats cover almost every image on the web, and each is
          built for a different job. Converting between them is really just
          re-encoding the same pixels using a different compression scheme. This
          tool does that on a hidden canvas inside your browser, so your files
          are converted instantly and never leave your device.
        </p>

        <h2>When to use JPG</h2>
        <p>
          <strong>JPG</strong> (also written JPEG) uses lossy compression tuned
          for photographs and other images with smooth colour gradients. It
          produces small files and is supported everywhere, which makes it the
          default choice for photos on websites, email and social media. Its
          limitation: it has no transparency, and repeatedly re-saving a JPG
          slowly degrades quality.
        </p>

        <h2>When to use PNG</h2>
        <p>
          <strong>PNG</strong> is lossless and supports full transparency, so
          it&apos;s perfect for logos, icons, screenshots, and any graphic with
          sharp edges or flat colour. Text and lines stay crisp with no
          artefacts. The trade-off is file size: PNG photos are much larger than
          the JPG or WebP equivalent, so reserve PNG for graphics rather than
          photographs.
        </p>

        <h2>When to use WebP</h2>
        <p>
          <strong>WebP</strong> is the modern all-rounder. It supports both
          lossy and lossless compression <em>and</em> transparency, and it
          typically produces files 25–35% smaller than JPG or PNG at comparable
          quality. It&apos;s supported by every current browser, so WebP is usually
          the best choice for images you serve on a website. Keep JPG or PNG on
          hand for older software or platforms that still expect them.
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
              Shrink JPG, PNG and WebP file size with a quality slider.
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
