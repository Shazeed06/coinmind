import type { Metadata } from "next";
import Link from "next/link";
import AiCaptionGenerator from "@/components/tools/AiCaptionGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Instagram Caption Generator - AI Captions & Hashtags" },
  description:
    "Free AI caption and hashtag generator. Describe your post, pick a platform and tone, and get 5 ready-to-use captions plus 10-15 matching hashtags in seconds.",
  alternates: { canonical: "/tools/ai-caption-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/ai-caption-generator",
    title: "AI Caption & Hashtag Generator - Free",
    description:
      "Describe your post, pick a platform and tone, and get 5 engaging captions plus 10-15 relevant hashtags, powered by AI.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Caption & Hashtag Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is the caption generator free to use?",
    a: "Yes. You can generate captions and hashtags for Instagram, TikTok, LinkedIn, X, Facebook and YouTube for free: no sign-up, no credit card and no per-post limit. Just describe your post, choose a platform and tone, and generate as many sets as you like.",
  },
  {
    q: "Which platforms and tones does it support?",
    a: "You can tailor captions for Instagram, TikTok, LinkedIn, X (Twitter), Facebook and YouTube, in five tones: Fun, Professional, Inspirational, Witty and Bold. Each combination changes the length, style and hashtag mix so the result fits where you're posting.",
  },
  {
    q: "How many hashtags does it generate?",
    a: "Every result includes a set of roughly 10-15 relevant hashtags chosen to match your topic and platform. You can copy them all with one click and trim the list to suit each platform's best practice, for example a handful on LinkedIn or X and more on Instagram.",
  },
  {
    q: "Can I add emojis to my captions?",
    a: "Yes. There's an 'Include emojis' toggle. Leave it on for playful, scroll-stopping captions with tasteful emojis, or switch it off for a cleaner, text-only look that suits more formal LinkedIn or B2B posts.",
  },
  {
    q: "Should I edit the captions before posting?",
    a: "It's a good idea. The AI gives you five strong starting points, but the best captions reflect your own voice, offer and call to action. Pick your favourite, tweak the wording, add your link or handle, and double-check any facts or claims before you publish.",
  },
  {
    q: "Do I need to sign up or connect my social account?",
    a: "No. There is no account to create, no password to enter and no permission to link Instagram, TikTok or LinkedIn. You describe your post, generate, then copy the caption and paste it into whichever app you post from. The page works the same in a mobile browser as on a desktop, so you can write captions on your phone.",
  },
  {
    q: "Are the hashtags guaranteed to be trending?",
    a: "No. The AI picks tags that are topically relevant to your description and chosen platform, not ones checked against live search volume or a trending list. Treat the set as a strong starting point: drop anything that does not fit your niche, and search a few of the broader tags in the app to see whether the audience is right.",
  },
  {
    q: "Is my post description sent to a server?",
    a: "Yes, it has to be. Your brief travels over an encrypted connection to the AI model that writes the captions, which is why this tool needs an internet connection and cannot work offline. CoinMind does not store the text, link it to an account or show it to anyone else, but avoid pasting unannounced launch details.",
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
        name: "AI Caption & Hashtag Generator",
        item: `${site.url}/tools/ai-caption-generator`,
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
        <span className="text-ink">AI Caption &amp; Hashtag Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl text-ink leading-[1.05]">
          AI Caption &amp; Hashtag Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Describe your post, pick a platform and tone, and get five scroll-stopping
          captions plus a set of matching hashtags, ready to copy and post.
        </p>
      </header>

      <div className="flex items-start gap-2 p-4 rounded-card bg-brand/5 border border-brand/20 text-sm text-text-muted mb-6">
        <span className="text-brand font-bold shrink-0">AI</span>
        <span>This tool generates AI-assisted output. Results may contain inaccuracies. Always review, edit and verify names, dates, figures and facts before use. AI output is not a substitute for professional judgement.</span>
      </div>

      {/* The tool */}
      <div className="mt-8">
        <AiCaptionGenerator />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            An AI caption generator turns a short description of your post into
            ready-to-use social captions. Type what your post is about, choose a
            platform (Instagram, TikTok, LinkedIn, X, Facebook or YouTube) and a
            tone, then generate. In seconds you get five distinct captions plus
            10-15 relevant hashtags. Copy the whole set with one tap,
            tweak your favourite, and post.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why captions and hashtags matter</h2>
        <p>
          A great photo or video only does half the work. The caption is
          what stops the scroll, adds context and prompts people to like, save,
          comment or click. Hashtags then decide how far that post travels,
          helping the right audiences discover you beyond your existing
          followers. Writing both well, for every post, is one of the most
          time-consuming parts of social media. This tool takes a plain-English
          description of your post and does the heavy lifting, giving you several
          angles to choose from instead of a blank box and a blinking cursor.
        </p>

        <h2>How to write a caption that performs</h2>
        <p>
          Strong captions usually open with a <strong>hook</strong>: a
          question, bold claim or relatable line that earns the next second of
          attention. Keep the middle tight, write the way you speak, and finish
          with a clear <strong>call to action</strong> such as &ldquo;save this
          for later&rdquo; or &ldquo;tell us in the comments&rdquo;. Match the
          length to the platform: punchy for TikTok and X, a little more room to
          tell a story on Instagram, and a more professional, value-first angle
          on LinkedIn. Choosing a tone above (Fun, Professional,
          Inspirational, Witty or Bold) nudges the AI toward exactly that
          style.
        </p>

        <h2>Getting the most from hashtags</h2>
        <p>
          Hashtags work best when they mix reach and relevance: a few broad tags,
          several niche ones that describe your exact topic, and where it fits, a
          branded tag of your own. More is not always better. A tight,
          well-chosen set often outperforms 30 generic tags. Instagram and TikTok
          reward a fuller list, while <strong>LinkedIn</strong> and{" "}
          <strong>X</strong> tend to do better with just three to five. Treat the
          generated set as a smart starting point and trim it to suit each
          channel.
        </p>

        <h2>Tips for better results</h2>
        <p>
          The more specific your brief, the sharper the captions. Mention the
          product or subject, who it&apos;s for, the vibe you want and any offer
          or launch detail. Generate a set, then run it again with a different
          tone to compare styles side by side. Always give the output a quick
          human edit: add your handle or link, confirm any claims, and make
          sure the voice sounds like you before you hit publish.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">
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
        <h2 className="font-display text-2xl text-ink">
          More free tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/word-counter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg text-ink">
              Word Counter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Count words and characters to fit any platform&apos;s limit.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg text-ink">
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
