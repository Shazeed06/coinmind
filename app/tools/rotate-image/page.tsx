import type { Metadata } from "next";
import Link from "next/link";
import RotateFlipImage from "@/components/tools/RotateFlipImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Rotate & Flip Image — Free Online Image Rotator" },
  description:
    "Free tool to rotate an image 90° left or right and flip it horizontally or vertically, with a live preview. Download as JPG, PNG or WebP.",
  alternates: { canonical: "/tools/rotate-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/rotate-image",
    title: "Rotate & Flip Image — Free Online Image Rotator",
    description:
      "Rotate images left or right and mirror them horizontally or vertically with a live preview. 100% private — nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rotate and Flip Image tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. Rotating and flipping happen entirely in your browser using the HTML Canvas API. The image is transformed and re-encoded on your own device, so it is never uploaded, stored or seen by anyone.",
  },
  {
    q: "What's the difference between rotating and flipping?",
    a: "Rotating turns the whole image around its centre in 90° steps. Flipping mirrors it — horizontal flip swaps left and right (like a mirror), while vertical flip swaps top and bottom. You can combine both.",
  },
  {
    q: "Can I fix a sideways photo from my phone?",
    a: "Yes. If a photo imported sideways or upside down, use Rotate left or Rotate right until it looks correct in the live preview, then download. The saved file keeps the corrected orientation.",
  },
  {
    q: "Does rotating an image lose quality?",
    a: "Rotating by 90° or flipping is lossless — the pixels are just rearranged, not resampled. The only quality change comes from the output format: PNG stays pixel-perfect, while JPG and WebP re-encode at high quality.",
  },
  {
    q: "Can I combine a rotation and a flip?",
    a: "Yes. The buttons stack, so you can rotate 90° and then flip horizontally, for example. The preview always shows the final result, and the downloaded file matches exactly what you see.",
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
        name: "Rotate & Flip Image",
        item: `${site.url}/tools/rotate-image`,
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
        <span className="text-ink">Rotate &amp; Flip Image</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Rotate &amp; Flip Image
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Straighten a sideways photo or mirror an image in one click &mdash; rotate
          90&deg; left or right and flip horizontally or vertically, with a live
          preview and nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <RotateFlipImage />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Quick answer</h2>
        <p className="mt-3 rounded-2xl border border-line bg-card p-5 text-ink-soft leading-relaxed">
          To rotate or flip an image, upload it above, then use{" "}
          <strong className="text-ink">Rotate left</strong> or{" "}
          <strong className="text-ink">Rotate right</strong> to turn it in 90&deg;
          steps, or <strong className="text-ink">Flip horizontal / vertical</strong>{" "}
          to mirror it. The preview updates live; download when it looks right.
          Everything runs in your browser, so nothing is uploaded.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-10 max-w-3xl article">
        <h2>How rotating and flipping work</h2>
        <p>
          Both actions redraw your image onto a hidden HTML canvas using a transform.
          A <strong>rotation</strong> turns the canvas in 90&deg; steps around its
          centre &mdash; and because a quarter turn swaps width and height, the output
          dimensions swap too. A <strong>flip</strong> mirrors the canvas along the
          horizontal or vertical axis. The file is then re-encoded from that canvas, all
          on your own device, so the process is instant and completely private.
        </p>

        <h2>When to rotate vs flip</h2>
        <p>
          Reach for <strong>rotate</strong> when a photo imported sideways or upside
          down and you need to set it upright. Reach for <strong>flip</strong> when you
          want a mirror image &mdash; for example, to face a portrait the other way, undo
          the mirror effect from a selfie camera, or create a symmetrical design. You can
          apply a rotation and a flip together; the preview always reflects the final
          combination.
        </p>

        <h2>Keeping quality intact</h2>
        <p>
          Rotating in 90&deg; steps and flipping never resample your pixels, so there is
          no quality loss from the transform itself. To keep the file pixel-perfect,
          export as <strong>PNG</strong>; for a smaller file, choose{" "}
          <strong>JPG</strong> or <strong>WebP</strong>. If you also need to change the
          size, pair this with the{" "}
          <Link href="/tools/resize-image">image resizer</Link> or{" "}
          <Link href="/tools/crop-image">image cropper</Link>.
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
            href="/tools/resize-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">Resize Image</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Change width and height in pixels or by percentage, with an aspect lock.
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
