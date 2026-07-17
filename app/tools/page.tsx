import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { IconArrow, IconSparkle, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Free Online Tools — Resume, PDF & Image Utilities" },
  description:
    "Free browser tools others charge for: resume builder, PDF merger, image compressor and converter. No sign-up — everything runs privately in your browser.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Online Tools — Resume, PDF & Image Utilities",
    description:
      "A resume builder, PDF merger, image compressor and converter — free, private and instant.",
    url: `${site.url}/tools`,
  },
};

type Tool = {
  slug: string;
  href: string;
  emoji: string;
  title: string;
  blurb: string;
  tag: string;
  featured?: boolean;
};

const tools: Tool[] = [
  {
    slug: "resume-builder",
    href: "/resume-builder",
    emoji: "📄",
    title: "Resume Builder",
    blurb:
      "Build a clean, professional CV with a live preview and one-click PDF download. Optional AI polish for your summary.",
    tag: "Careers",
    featured: true,
  },
  {
    slug: "compress-image",
    href: "/tools/compress-image",
    emoji: "🗜️",
    title: "Compress Image",
    blurb:
      "Shrink JPG, PNG and WebP file sizes with a quality slider. See the exact savings before you download.",
    tag: "Image",
  },
  {
    slug: "image-converter",
    href: "/tools/image-converter",
    emoji: "🔄",
    title: "Image Converter",
    blurb:
      "Convert images between JPG, PNG and WebP in one click — great for uploads, sharing and the web.",
    tag: "Image",
  },
  {
    slug: "image-to-pdf",
    href: "/tools/image-to-pdf",
    emoji: "🖼️",
    title: "Image to PDF",
    blurb:
      "Combine JPG and PNG images into a single PDF. Reorder pages, pick A4 or Letter, and export instantly.",
    tag: "PDF",
  },
  {
    slug: "merge-pdf",
    href: "/tools/merge-pdf",
    emoji: "📑",
    title: "Merge PDF",
    blurb:
      "Join multiple PDF files into one document. Reorder and remove files, then download the merged PDF.",
    tag: "PDF",
  },
];

export default function Page() {
  const featured = tools.filter((t) => t.featured);
  const rest = tools.filter((t) => !t.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pt-14 pb-8 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconSparkle className="h-3.5 w-3.5" /> Free tools
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Premium tools, completely free
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          The utilities other sites lock behind sign-ups and paywalls — a resume
          builder, PDF merger and image tools — free and instant. Everything runs
          in your browser, so your files are never uploaded.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm text-ink-soft">
          <IconShield className="h-4 w-4 text-brass" />
          100% private — your files never leave your device
        </p>
      </header>

      {/* Featured */}
      {featured.map((t) => (
        <Link
          key={t.slug}
          href={t.href}
          className="group mb-8 block rounded-2xl border border-line bg-gradient-to-br from-forest-soft to-card p-6 sm:p-8 transition-all hover:border-forest hover:shadow-[0_16px_36px_-24px_rgba(30,64,175,0.4)]"
        >
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card text-2xl shadow-sm">
              {t.emoji}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-600 text-ink">
                  {t.title}
                </h2>
                <span className="rounded-full bg-forest px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  Popular
                </span>
              </div>
              <p className="mt-2 max-w-xl text-ink-soft leading-relaxed">
                {t.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                Open {t.title}{" "}
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-14">
        {rest.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="group rounded-2xl border border-line bg-card p-6 transition-all hover:border-forest hover:shadow-[0_16px_36px_-24px_rgba(30,64,175,0.4)]"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-soft text-xl">
                {t.emoji}
              </span>
              <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                {t.tag}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-600 text-ink">
              {t.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {t.blurb}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open{" "}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Cross-link */}
      <section className="mb-16 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
        <h2 className="font-display text-xl font-600 text-ink">
          Looking for money tools?
        </h2>
        <p className="mt-2 text-ink-soft">
          Try our free{" "}
          <Link href="/calculators" className="font-semibold text-forest hover:underline">
            financial calculators
          </Link>{" "}
          (SIP, EMI, income tax and more) or ask the{" "}
          <Link href="/ai-assistant" className="font-semibold text-forest hover:underline">
            AI money assistant
          </Link>{" "}
          anything about saving, investing and taxes.
        </p>
      </section>
    </div>
  );
}
