import Link from "next/link";
import type { Metadata } from "next";
import { calculators, aiTools, news, posts } from "@/lib/data";
import { site } from "@/lib/site";
import {
  IconArrow,
  IconCalculator,
  IconNews,
  IconShield,
  IconGlobe,
  IconBolt,
  IconStar,
  IconCheck,
} from "@/components/icons";
import CoverArt from "@/components/CoverArt";

export const metadata: Metadata = {
  title: { absolute: "Free Online Calculators, Tools & AI — CoinMind" },
  description:
    "30+ free calculators (SIP, EMI, income tax, FD) and 40+ free tools — resume builder, PDF, image, AI writers — plus honest AI reviews. No sign-up, all in your browser.",
  alternates: { canonical: "/" },
};

const liveCalcs = calculators.filter((c) => c.live);

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <PopularCalculators />
      <FreeTools />
      <Briefing />
      <AiToolsStrip />
      <GuidesStrip />
      <TrustRow />
      <ClosingCta />
    </>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              Trusted by readers in India, the US & the UK
            </span>

            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.03] font-600 text-ink">
              Make smarter money{" "}
              <span className="relative whitespace-nowrap text-forest">
                decisions
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C40 3 120 3 198 8"
                    stroke="var(--color-brass)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , powered by AI.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              30+ free calculators for SIP, EMI, income tax and more — plus free
              tools like a resume builder, PDF and image tools, and AI writers.
              Honest AI reviews and plain-English guides. No sign-up, no fluff.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
              >
                Explore calculators <IconArrow className="h-4 w-4" />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest hover:text-forest"
              >
                Read the explainers
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "30+", l: "Free calculators" },
                { n: "40+", l: "Free tools" },
                { n: "0", l: "Sign-up needed" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl font-600 text-ink">
                    {s.n}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-faint leading-snug">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Preview card — a static, premium-looking result panel */}
          <div className="reveal" style={{ animationDelay: "120ms" }}>
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreviewCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[26px] bg-forest-soft/60 -z-10 blur-sm" />
      <div className="rounded-[22px] border border-line bg-card shadow-[0_20px_50px_-24px_rgba(30,64,175,0.35)] overflow-hidden">
        <div className="rule-brass h-1 w-full" />
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-soft text-forest">
                <IconCalculator className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">SIP Calculator</p>
                <p className="text-xs text-ink-faint">Monthly investment</p>
              </div>
            </div>
            <span className="rounded-full bg-forest-soft px-2.5 py-1 text-[11px] font-semibold text-forest">
              Live
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <PreviewRow label="Monthly amount" value="₹10,000" pct={40} />
            <PreviewRow label="Expected return" value="12% p.a." pct={60} />
            <PreviewRow label="Time period" value="15 years" pct={50} />
          </div>

          <div className="mt-6 rounded-xl bg-paper-2 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Projected corpus
            </p>
            <p className="mt-1 font-display text-3xl font-600 text-forest">
              ₹50.4 Lakh
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
              <span>
                Invested{" "}
                <strong className="font-semibold text-ink">₹18.0L</strong>
              </span>
              <span className="h-3 w-px bg-line-strong" />
              <span>
                Returns{" "}
                <strong className="font-semibold text-forest">₹32.4L</strong>
              </span>
            </div>
          </div>

          <Link
            href="/calculators/sip"
            className="mt-5 flex items-center justify-center gap-1.5 rounded-xl border border-line-strong py-2.5 text-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors"
          >
            Try it yourself <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-soft">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-line">
        <div
          className="h-1 rounded-full bg-forest"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------ POPULAR CALCULATORS ------------------------ */

function PopularCalculators() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <SectionHead
        eyebrow="Calculators"
        title="Numbers, worked out in seconds"
        desc="The tools people search for most — free, private, and fast. Nothing leaves your browser."
        href="/calculators"
        hrefLabel="All calculators"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {liveCalcs.slice(0, 8).map((c) => (
          <Link
            key={c.slug}
            href={`/calculators/${c.slug}`}
            className="group rounded-2xl border border-line bg-card p-5 transition-all hover:border-forest hover:shadow-[0_16px_36px_-24px_rgba(30,64,175,0.4)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
              <IconCalculator className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-600 text-ink">
              {c.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft line-clamp-2">
              {c.blurb}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open{" "}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- FREE TOOLS ---------------------------- */

function FreeTools() {
  const items = [
    { href: "/resume-builder", emoji: "📄", title: "Resume Builder", desc: "Build a professional CV with a live preview and one-click PDF." },
    { href: "/tools/ai-summarizer", emoji: "📝", title: "AI Writing Tools", desc: "Summarize, paraphrase, fix grammar and write emails with AI." },
    { href: "/tools/merge-pdf", emoji: "📑", title: "PDF Tools", desc: "Merge, split, rotate and organize PDFs, or turn images into PDF." },
    { href: "/tools/compress-image", emoji: "🖼️", title: "Image Tools", desc: "Compress, resize, crop, convert and make favicons — no upload." },
    { href: "/tools/word-counter", emoji: "🔤", title: "Text & Dev Tools", desc: "Word counter, JSON formatter, Base64, case and number-to-words." },
    { href: "/tools/qr-code-generator", emoji: "🔳", title: "Generators", desc: "QR codes, strong passwords, invoices and a budget planner." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <SectionHead
        eyebrow="Free Tools"
        title="Premium tools, completely free"
        desc="The utilities other sites charge for — a resume builder, PDF and image tools, AI writers and more. Everything runs privately in your browser."
        href="/tools"
        hrefLabel="All free tools"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-2xl border border-line bg-card p-5 transition-all hover:border-forest hover:shadow-[0_16px_36px_-24px_rgba(30,64,175,0.4)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-soft text-xl">
              {t.emoji}
            </span>
            <h3 className="mt-4 font-display text-lg font-600 text-ink">
              {t.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {t.desc}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open{" "}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ BRIEFING ----------------------------- */

function Briefing() {
  const top = news.slice(0, 5);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="rounded-3xl border border-line bg-card overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-forest-deep p-8 sm:p-10 text-white flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
                <IconNews className="h-3.5 w-3.5" /> Explainers
              </span>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl font-600 leading-tight">
                The finance & AI developments that matter
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                We break down what&apos;s happening in markets and technology —
                and why it matters for your money and your tools — in plain
                English you can read in two minutes.
              </p>
            </div>
            <Link
              href="/news"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-colors"
            >
              Read the explainers <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="p-4 sm:p-6 divide-y divide-line">
            {top.map((n) => (
              <article
                key={n.title}
                className="flex gap-4 p-4 group cursor-default"
              >
                <span
                  className={`mt-1 h-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    n.category === "Finance"
                      ? "bg-forest-soft text-forest"
                      : "bg-brass-soft text-brass"
                  }`}
                >
                  {n.category}
                </span>
                <div>
                  <h3 className="font-medium text-ink leading-snug group-hover:text-forest transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-faint line-clamp-2">
                    {n.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- AI TOOLS STRIP -------------------------- */

function AiToolsStrip() {
  const featured = aiTools.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <SectionHead
        eyebrow="AI Tools"
        title="The best AI tools, honestly reviewed"
        desc="We test the tools so you don't waste money. Ratings, pricing and what each one is genuinely best at."
        href="/ai-tools"
        hrefLabel="Full directory"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-600 text-ink">
                  {t.name}
                </h3>
                <p className="text-xs font-medium text-ink-faint">
                  {t.category}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-paper-2 px-2.5 py-1 text-xs font-semibold text-ink">
                <IconStar className="h-3.5 w-3.5 text-brass" />
                {t.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {t.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="rounded-md bg-forest-soft px-2 py-1 font-semibold text-forest">
                {t.tier}
              </span>
              <span className="text-ink-faint">{t.maker} · {t.region}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- GUIDES STRIP --------------------------- */

function GuidesStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <SectionHead
        eyebrow="Guides"
        title="Learn the money & AI skills that pay off"
        desc="Clear, practical how-tos — written by people, checked for accuracy, and free of filler."
        href="/blog"
        hrefLabel="All guides"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 4).map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col"
          >
            <div className="aspect-[16/10] rounded-2xl border border-line overflow-hidden">
              <CoverArt
                seed={p.slug}
                variant={p.art.variant}
                palette={p.art.palette}
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brass">
              {p.category}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-600 leading-snug text-ink group-hover:text-forest transition-colors">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-ink-faint">{p.readMinutes} min read</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ TRUST -------------------------------- */

function TrustRow() {
  const items = [
    {
      icon: IconShield,
      title: "Private by default",
      body: "Calculators run entirely in your browser. We never see or store your numbers.",
    },
    {
      icon: IconGlobe,
      title: "Built for the world",
      body: "Switch between ₹, $ and £. Region-aware tools for India, the US and the UK.",
    },
    {
      icon: IconBolt,
      title: "Fast & free",
      body: "No sign-ups, no paywalls, no clutter. Just tools and answers that load instantly.",
    },
    {
      icon: IconCheck,
      title: "Human-checked",
      body: "Reviews and guides are written and fact-checked by people, not churned out.",
    },
  ];
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-card border border-line text-forest">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-600 text-ink">
                {it.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- CLOSING CTA ---------------------------- */

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="rounded-3xl bg-forest px-8 py-14 sm:px-14 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_20%,#fff,transparent_40%),radial-gradient(circle_at_80%_60%,#fff,transparent_35%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-600 max-w-3xl mx-auto leading-tight">
            Start with one calculation. Stay for smarter decisions.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/75">
            Whether you&apos;re planning an SIP, sizing a loan, or picking your
            next AI tool — {site.name} gives you a clear answer in seconds.
          </p>
          <Link
            href="/calculators"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-colors"
          >
            Explore the tools <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SHARED PIECES --------------------------- */

function SectionHead({
  eyebrow,
  title,
  desc,
  href,
  hrefLabel,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  hrefLabel: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">{desc}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:gap-2.5 transition-all"
      >
        {hrefLabel} <IconArrow className="h-4 w-4" />
      </Link>
    </div>
  );
}

function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free financial calculators",
    itemListElement: liveCalcs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${site.url}/calculators/${c.slug}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
