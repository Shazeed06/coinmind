import type { Metadata } from "next";
import Link from "next/link";
import MemeGenerator from "@/components/tools/MemeGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Meme Generator — Free Meme Maker with Text" },
  description:
    "Free meme generator. Upload any image, add classic Impact top and bottom text, then download the meme. 100% private — everything is made in your browser.",
  alternates: { canonical: "/tools/meme-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/meme-generator",
    title: "Meme Generator — Free Meme Maker with Text",
    description:
      "Upload any image, add classic Impact-style top and bottom text, then download the meme. 100% private — your image never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meme Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my image uploaded anywhere?",
    a: "No. This meme generator runs entirely in your browser using the HTML Canvas API. Your image is drawn and captioned on your own device and is never uploaded, stored or seen by anyone — it never leaves your computer.",
  },
  {
    q: "Why is the text in that classic bold white font?",
    a: "That's the Impact typeface, the look most people picture when they think of a meme. The tool draws bold, uppercase white text with a black outline so it stays readable over any part of the image — light or dark.",
  },
  {
    q: "Can I change the font size and colours?",
    a: "Yes. A slider sets the font size as a percentage of the image width, so the text scales with the picture and stays sharp at full resolution. You can also pick any fill colour and outline colour if you want to move away from the classic white-on-black.",
  },
  {
    q: "Does the text wrap if it's long?",
    a: "Yes. Long top or bottom captions automatically wrap onto multiple lines to fit the width of the image, so nothing runs off the edge. Top text grows downward from the top and bottom text stacks upward from the bottom.",
  },
  {
    q: "What image formats can I use?",
    a: "You can upload PNG, JPG, WebP or GIF images. The meme is exported as a PNG at the full resolution of your original image, so it stays crisp when you post or share it.",
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
        name: "Meme Generator",
        item: `${site.url}/tools/meme-generator`,
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
        <span className="text-ink">Meme Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Meme Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Upload any image, add classic Impact top and bottom text, and download
          your meme &mdash; right in your browser, with nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <MemeGenerator />
      </div>

      {/* Quick answer intro */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A <strong className="text-ink">meme generator</strong> lets you add
            caption text to an image in the instantly recognisable meme style.
            Upload a picture above, type your{" "}
            <strong className="text-ink">top</strong> and{" "}
            <strong className="text-ink">bottom</strong> lines, and the tool draws
            them in bold, uppercase{" "}
            <strong className="text-ink">Impact</strong> with a black outline,
            then lets you download the finished PNG. It is free, needs no sign-up,
            and everything happens in your browser, so your image stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What makes a meme look like a meme?</h2>
        <p>
          The classic image-macro look comes down to one thing: bold, uppercase
          white text in the <strong>Impact</strong> typeface, outlined in black
          so it reads clearly over any background. That style became the internet
          shorthand for a meme in the late 2000s, and it still instantly signals
          &ldquo;this is a joke caption.&rdquo; This tool reproduces that look
          faithfully &mdash; heavy stroke, centred text, top and bottom lines
          &mdash; while letting you tweak the size and colours if you want
          something different.
        </p>

        <h2>How to make a meme</h2>
        <p>
          Start by uploading any image &mdash; a reaction photo, a screenshot, a
          stock picture or your own snapshot. Type a setup line into the{" "}
          <strong>top text</strong> box and a punchline into the{" "}
          <strong>bottom text</strong> box; the preview updates as you type.
          Adjust the font size so the captions fill the width without crowding the
          picture, then download the PNG. Because the meme is rendered at the full
          resolution of your image, it stays sharp when you post it to social
          media or a group chat.
        </p>

        <h2>Tips for memes that land</h2>
        <p>
          Keep captions <strong>short and punchy</strong> &mdash; a few words on
          top and a few on the bottom almost always beat a long sentence. Put the
          setup on top and the twist on the bottom so the joke reads in the right
          order. Make sure the text sits over a part of the image where the
          outline keeps it legible, and bump the font size up a little for busy or
          brightly coloured pictures. When in doubt, simpler wins.
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
              Shrink your finished meme&apos;s file size before you share it.
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
