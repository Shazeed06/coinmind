import type { Metadata } from "next";
import Link from "next/link";
import ResizeImage from "@/components/tools/ResizeImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Resize Image — Free Online Image Resizer (JPG/PNG)" },
  description:
    "Free image resizer: set new width and height in pixels or by percent, lock the aspect ratio, and download as JPG, PNG or WebP. 100% in your browser.",
  alternates: { canonical: "/tools/resize-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/resize-image",
    title: "Resize Image — Free Online Image Resizer (JPG/PNG)",
    description:
      "Change image width and height in pixels or by percentage, lock the aspect ratio, and download. 100% private — nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Resize Image tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. The resizer runs entirely in your browser using the HTML Canvas API. Your image is decoded, redrawn at the new size and re-encoded on your own device — it never leaves your computer.",
  },
  {
    q: "How do I keep the image from looking stretched?",
    a: "Turn on 'Lock aspect ratio'. When it's on, changing the width updates the height automatically (and vice versa) so the picture keeps its original proportions and never looks squashed.",
  },
  {
    q: "What does the scale percentage do?",
    a: "The scale field resizes both dimensions together relative to the original. Enter 50 to make the image half its size, or 200 to double it. It's the quickest way to shrink or enlarge without doing the maths.",
  },
  {
    q: "Will enlarging an image make it sharper?",
    a: "No. Making an image larger than its original size stretches the existing pixels, so it can look soft or blocky. For the crispest result, resize down from a bigger original rather than up from a small one.",
  },
  {
    q: "Which output format should I choose?",
    a: "Keep the original format for a like-for-like copy. Pick JPG for photos you want small, PNG when you need transparency or crisp text, and WebP for the best size-to-quality balance on the web.",
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
        name: "Resize Image",
        item: `${site.url}/tools/resize-image`,
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
        <span className="text-ink">Resize Image</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Resize Image
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Change an image&apos;s width and height in pixels or by percentage, with
          an optional aspect-ratio lock &mdash; right in your browser, with nothing
          uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <ResizeImage />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Quick answer</h2>
        <p className="mt-3 rounded-2xl border border-line bg-card p-5 text-ink-soft leading-relaxed">
          To resize an image, upload it above, type the new{" "}
          <strong className="text-ink">width</strong> or{" "}
          <strong className="text-ink">height</strong> in pixels (or set a scale
          percentage), keep <strong className="text-ink">Lock aspect ratio</strong>{" "}
          on to avoid stretching, then download. Everything happens in your browser,
          so the image is never uploaded and there are no watermarks or limits.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-10 max-w-3xl article">
        <h2>How resizing an image works</h2>
        <p>
          Resizing changes how many pixels an image is made of. This tool decodes
          your picture, redraws it onto a hidden HTML canvas at the exact width and
          height you ask for, then exports a fresh file. Scaling down throws away
          pixels the eye won&apos;t miss and produces smaller files; scaling up
          invents new pixels by interpolation, which is why enlarged images can look
          soft. Because all of this runs on your device, the tool works offline and
          keeps your files completely private.
        </p>

        <h2>Pixels vs percentage</h2>
        <p>
          Use <strong>pixel dimensions</strong> when you have an exact target &mdash;
          a 1200&nbsp;px-wide blog header, a 512&nbsp;px app icon or a profile photo
          that must fit a box. Use the <strong>percentage scale</strong> when you
          simply want the image a bit smaller or larger and don&apos;t care about the
          precise numbers. With the aspect-ratio lock on, either method keeps the
          picture&apos;s proportions intact so nothing looks stretched.
        </p>

        <h2>Tips for the best results</h2>
        <p>
          Always resize <strong>down</strong> from the largest original you have
          rather than up from a small copy. If you also want a smaller file, export
          to <strong>WebP</strong> or <strong>JPG</strong> rather than PNG. And if you
          only need to reduce the file size without changing the dimensions, use the{" "}
          <Link href="/tools/compress-image">image compressor</Link> instead &mdash;
          it re-encodes at a lower quality while keeping the pixel size the same.
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
          More free image tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/crop-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">Crop Image</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Trim an image to a region or fixed aspect ratio with a draggable box.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools/compress-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Compress Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Shrink JPG, PNG and WebP file sizes with a quality slider.
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
