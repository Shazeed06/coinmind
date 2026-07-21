import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/data";
import { IconArrow } from "@/components/icons";
import CoverArt from "@/components/CoverArt";

export const metadata: Metadata = {
  title: "Guides & How-Tos — Money and AI, Explained",
  description:
    "Practical, jargon-free guides on personal finance, investing, credit and working smarter with AI. Written by people, checked for accuracy.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default function Page() {
  const [lead, ...rest] = posts;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pt-14 pb-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Guides
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Money & AI, explained clearly
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          No filler, no fake urgency — just practical guides that help you keep
          more of your money and get more done with AI.
        </p>
      </header>

      {/* Lead post */}
      <Link
        href={`/blog/${lead.slug}`}
        className="group block rounded-3xl border border-line bg-card overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          <div className="min-h-[220px] overflow-hidden">
            <CoverArt
              seed={lead.slug}
              variant={lead.art.variant}
              palette={lead.art.palette}
              label={lead.category}
              className="h-full w-full"
            />
          </div>
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-brass">
              {lead.category} · {lead.readMinutes} min read
            </p>
            <h2 className="mt-3 font-display text-3xl font-600 text-ink leading-tight group-hover:text-forest transition-colors">
              {lead.title}
            </h2>
            <p className="mt-3 text-ink-soft leading-relaxed">{lead.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
              Read guide{" "}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
            <div className="aspect-[16/10] rounded-2xl border border-line overflow-hidden">
              <CoverArt
                seed={p.slug}
                variant={p.art.variant}
                palette={p.art.palette}
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brass">
              {p.category} · {p.readMinutes} min
            </p>
            <h3 className="mt-1.5 font-display text-xl font-600 leading-snug text-ink group-hover:text-forest transition-colors">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              {p.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
