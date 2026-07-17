import type { Metadata } from "next";
import Link from "next/link";
import FaviconGenerator from "@/components/tools/FaviconGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Favicon Generator — Free Favicon Maker Online" },
  description:
    "Free favicon generator. Turn any image or logo into favicon PNGs at 16, 32, 180, 192 & 512 px, with ready-to-paste HTML. 100% private, made in your browser.",
  alternates: { canonical: "/tools/favicon-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/favicon-generator",
    title: "Favicon Generator — Free Favicon Maker Online",
    description:
      "Turn any image or logo into favicon PNGs at every standard size, with ready-to-paste HTML. 100% private — your image never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Favicon Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my image uploaded to a server?",
    a: "No. This favicon generator runs entirely in your browser using the HTML Canvas API. Your image is resized on your own device and never uploaded, stored or seen by anyone — it never leaves your computer.",
  },
  {
    q: "What image should I upload?",
    a: "A square image works best, ideally at least 512×512 pixels so the largest favicon stays crisp. A PNG with a transparent background is ideal for logos. If your image isn't square, it's scaled to fit inside the square and centred, so nothing gets cropped.",
  },
  {
    q: "Which favicon sizes do I actually need?",
    a: "16×16 and 32×32 cover classic browser tabs, 48×48 is used by Windows, 180×180 is the Apple touch icon for iPhones and iPads, and 192×192 plus 512×512 are used by Android and installable web apps (PWAs). Generating all of them means every device shows a sharp icon.",
  },
  {
    q: "How do I add the favicon to my website?",
    a: "Download the PNGs and upload them to the root folder of your site (the same place as your homepage). Then copy the <link> tags shown below the previews and paste them inside the <head> section of your HTML. That tells browsers where to find each icon.",
  },
  {
    q: "Why PNG instead of a .ico file?",
    a: "Every modern browser supports PNG favicons, and PNGs keep transparency and sharp edges at each exact size. Serving a set of PNGs is the current best practice; a single multi-resolution .ico is only needed for very old browsers.",
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
        name: "Favicon Generator",
        item: `${site.url}/tools/favicon-generator`,
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
        <span className="text-ink">Favicon Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Favicon Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Turn any image or logo into a full set of favicon PNGs &mdash; every
          size a browser, phone or web app needs, plus the HTML to paste. Nothing
          is uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <FaviconGenerator />
      </div>

      {/* Quick answer intro */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A <strong className="text-ink">favicon generator</strong> takes one
            image and produces the small square icons that show in browser tabs,
            bookmarks and home-screen shortcuts. Upload a square logo above and
            this tool renders it at every standard size &mdash;{" "}
            <strong className="text-ink">16, 32, 48, 64, 180, 192 and 512 px</strong>{" "}
            &mdash; then gives you each PNG plus the{" "}
            <strong className="text-ink">&lt;link&gt;</strong> tags to paste into
            your site. It is free, needs no sign-up, and everything is built in
            your browser, so your image stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What is a favicon?</h2>
        <p>
          A favicon (short for &ldquo;favourite icon&rdquo;) is the tiny image
          that represents your website. Browsers show it in the tab, next to the
          address, in the bookmarks list and in your history. On phones it becomes
          the icon when someone adds your site to their home screen. A clear,
          recognisable favicon makes your site look polished and helps people
          spot it among a row of open tabs &mdash; a small detail that quietly
          signals a professional, trustworthy site.
        </p>

        <h2>Why you need more than one size</h2>
        <p>
          Different places display the icon at different resolutions. A browser
          tab uses a 16- or 32-pixel icon, Windows reaches for 48 pixels, Apple
          devices use a 180-pixel <strong>apple-touch-icon</strong>, and Android
          and installable web apps (PWAs) use 192- and 512-pixel versions for
          home screens and splash screens. If you supply only one size, browsers
          have to stretch or shrink it, which looks blurry. Generating a
          purpose-built PNG for each size keeps your icon crisp everywhere.
        </p>

        <h2>How to install your favicon</h2>
        <p>
          Download the PNG set and upload the files to the root directory of your
          website &mdash; the same folder that serves your homepage. Then paste
          the <strong>&lt;link&gt;</strong> tags from the box above into the{" "}
          <strong>&lt;head&gt;</strong> of your HTML template so every page picks
          them up. After you deploy, do a hard refresh; browsers cache favicons
          aggressively, so it can take a little while for the new icon to appear.
        </p>

        <h2>Tips for a sharp favicon</h2>
        <p>
          Start from a <strong>square</strong> image at least 512&times;512
          pixels so the biggest size stays sharp. Keep the design simple &mdash;
          fine detail and small text vanish at 16 pixels, so a bold symbol,
          monogram or single letter reads far better than a shrunken full logo.
          Use a <strong>PNG with transparency</strong> if you want the icon to sit
          cleanly on any tab colour, and make sure there is strong contrast so it
          stands out against both light and dark browser themes.
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
            href="/tools/image-to-base64"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Image to Base64
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Encode an image as a data URI to embed directly in HTML or CSS.
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
