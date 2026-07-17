import type { Metadata } from "next";
import Link from "next/link";
import AiEmailWriter from "@/components/tools/AiEmailWriter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Email & Cover Letter Writer — Free" },
  description:
    "Free AI email and cover letter writer. Enter a few key points, pick a tone, and get a complete, ready-to-send email or cover letter in seconds.",
  alternates: { canonical: "/tools/ai-email-writer" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/ai-email-writer`,
    title: "AI Email & Cover Letter Writer — Free",
    description:
      "Enter a few key points, pick a tone, and get a complete, ready-to-send email or cover letter in seconds.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Email & Cover Letter Writer",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is the AI email and cover letter writer free?",
    a: "Yes. You can generate as many emails and cover letters as you like, with no sign-up and no cost. Just describe what it's about, choose a tone and click Generate.",
  },
  {
    q: "How do I write a good prompt for it?",
    a: "List the key points you want covered — the purpose, any names or dates, and the outcome you want. The more specific your bullet points, the more accurate and personal the draft. You can always tweak the result before sending.",
  },
  {
    q: "Can it match a formal or friendly tone?",
    a: "Yes. Pick from Professional, Friendly, Formal, Persuasive or Apologetic and the writer adapts the wording, greeting and sign-off to suit. Change the tone and regenerate to compare versions.",
  },
  {
    q: "Will an employer know my cover letter was written with AI?",
    a: "Treat the output as a first draft. Read it through, add specific achievements and details only you know, and adjust the wording so it sounds like you. That personal edit is what makes it land — and it's good practice for any AI-assisted writing.",
  },
  {
    q: "Does it include a subject line for emails?",
    a: "Yes. When you choose Email, the writer adds a clear subject line at the top. For cover letters it produces the letter body, ready to drop into your application or a document.",
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
        name: "AI Email & Cover Letter Writer",
        item: `${site.url}/tools/ai-email-writer`,
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
        <span className="text-ink">AI Email &amp; Cover Letter Writer</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          AI Email &amp; Cover Letter Writer
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Describe what you need in a few words, pick a tone, and get a complete,
          ready-to-send email or cover letter in seconds &mdash; then copy, edit
          and send.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <AiEmailWriter />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            To write an email or cover letter with AI, choose the format, type a
            few key points about what you want to say, pick a tone
            (Professional, Friendly, Formal, Persuasive or Apologetic) and click
            Generate. You get a full draft &mdash; complete with a subject line
            for emails &mdash; that you can copy and refine. It&apos;s free,
            needs no account, and works for follow-ups, outreach, resignations,
            job applications and more.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>How the AI email &amp; cover letter writer works</h2>
        <p>
          Writing from a blank page is the hard part. This tool flips that
          around: instead of drafting sentence by sentence, you give it the raw
          ingredients &mdash; who it&apos;s for, what you want to happen and the
          points that matter &mdash; and it assembles a coherent, correctly
          structured message around them. For emails that means a subject line,
          a natural greeting, a clear body and an appropriate sign-off. For
          cover letters it means an opening that states the role, a middle that
          connects your experience to the job, and a confident close.
        </p>

        <h2>Choosing the right tone</h2>
        <p>
          Tone changes everything about how a message lands.{" "}
          <strong>Professional</strong> suits most work emails and applications.{" "}
          <strong>Formal</strong> fits legal, academic or first-contact
          situations. <strong>Friendly</strong> warms up notes to colleagues or
          contacts you know. <strong>Persuasive</strong> helps with pitches,
          proposals and requests, while <strong>Apologetic</strong> strikes the
          right note when something has gone wrong. Try one, read the result,
          then switch tone and regenerate to compare &mdash; it takes seconds.
        </p>

        <h2>Tips for a stronger draft</h2>
        <p>
          Be specific in your key points: real names, dates, numbers and the
          exact outcome you want give the AI something concrete to work with.
          For cover letters, name the role and one or two achievements that map
          to it. Always read the draft through before sending &mdash; check the
          facts, adjust anything that doesn&apos;t sound like you, and remove
          placeholder details. Pair a cover letter with a polished CV from the{" "}
          <Link href="/resume-builder">Resume Builder</Link> to apply with a
          consistent, professional set.
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
            href="/resume-builder"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Resume Builder
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Build a clean, professional CV with a live preview and one-click
              PDF download.
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
