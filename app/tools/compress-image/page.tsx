import type { Metadata } from "next";
import Link from "next/link";
import CompressImage from "@/components/tools/CompressImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Compress Image — Shrink JPG, PNG & WebP Free" },
  description:
    "Free online image compressor. Reduce JPG, PNG and WebP file size with a quality slider. 100% private — images are compressed in your browser.",
  alternates: { canonical: "/tools/compress-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/compress-image",
    title: "Compress Image — Shrink JPG, PNG & WebP Free",
    description:
      "Reduce JPG, PNG and WebP file size with a quality slider. 100% private — your images never leave your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Compress Image tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. This compressor runs entirely in your browser using the HTML Canvas API. Your images are never uploaded, stored or seen by anyone — they never leave your device.",
  },
  {
    q: "How much can I shrink a photo?",
    a: "For typical JPG photos you can often cut 40–80% of the file size at 70% quality with little visible difference. WebP usually shrinks even further at the same quality.",
  },
  {
    q: "Why doesn't my PNG get much smaller?",
    a: "PNG is a lossless format, so re-encoding it rarely saves much. For real savings on photos, convert the PNG to JPG or WebP using the format buttons above.",
  },
  {
    q: "What does the quality slider do?",
    a: "It controls how much detail JPG and WebP keep. Lower quality means a smaller file but more compression artefacts. 70% is a good all-round balance for photos.",
  },
  {
    q: "Is there a file size or count limit?",
    a: "There's no hard limit — you can compress as many images as you like, and multiple at once. Very large images use more memory because everything is processed on your own device.",
  },
  {
    q: "Does compressing an image reduce its dimensions?",
    a: "No. This tool keeps the original width and height in pixels; it only re-encodes the image at a lower quality or a more efficient format to reduce the file size.",
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
        name: "Compress Image",
        item: `${site.url}/tools/compress-image`,
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
        <span className="text-ink">Compress Image</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Compress Image
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Shrink JPG, PNG and WebP images with a simple quality slider &mdash;
          right in your browser, with nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CompressImage />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>How image compression works</h2>
        <p>
          Every image file is a trade-off between visual quality and size.
          Compression removes data the human eye is least likely to miss and
          stores what remains more efficiently. This tool re-encodes your image
          on a hidden HTML canvas: it decodes the picture, redraws it, then
          exports a new file at the quality and format you choose. Because all
          of that happens on your device, the tool works offline and keeps your
          files completely private.
        </p>

        <h2>Lossy vs lossless</h2>
        <p>
          <strong>Lossy</strong> formats such as JPG and WebP throw away some
          detail to achieve dramatically smaller files. At sensible quality
          levels the loss is invisible, which is why lossy compression is ideal
          for photos. <strong>Lossless</strong> formats such as PNG keep every
          pixel exactly, so they never lose quality &mdash; but they also can&apos;t
          shrink photographic images very much. If your PNG is a photo rather
          than a logo or screenshot with flat colours, converting it to JPG or
          WebP will usually save far more space than compressing the PNG itself.
        </p>

        <h2>Tips for the best results</h2>
        <p>
          Start at <strong>70% quality</strong> and only drop lower if you need
          a smaller file &mdash; watch the preview for blockiness or fuzzy edges.
          For photographs, prefer <strong>WebP</strong>: it typically produces
          files 25–35% smaller than JPG at the same quality. Keep{" "}
          <strong>PNG</strong> only when you need transparency or crisp text and
          line art. Finally, remember that compression here does not change the
          pixel dimensions; if you also need smaller dimensions, resize the image
          before compressing.
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
            href="/tools/image-converter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Image Converter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Convert images between JPG, PNG and WebP in one click.
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
