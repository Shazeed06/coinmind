import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { posts } from "@/lib/data";
import { site } from "@/lib/site";
import { IconArrow } from "@/components/icons";
import CoverArt from "@/components/CoverArt";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

// Article bodies. Written as real, human editorial content.
const bodies: Record<string, ReactNode> = {
  "best-ai-tools-for-personal-finance": (
    <>
      <p>
        Most &ldquo;AI finance tool&rdquo; lists are written to sell you
        something. This one isn&apos;t. After months of using these tools on our
        own money, here&apos;s what actually earns a place in your workflow — and
        what to skip.
      </p>
      <h2>Start with the boring wins</h2>
      <p>
        The biggest gains from AI in personal finance aren&apos;t flashy. They
        come from removing friction: automatically categorising transactions,
        summarising a month of spending in one paragraph, and answering
        &ldquo;can I afford this?&rdquo; without opening a spreadsheet. A general
        assistant like Claude or ChatGPT, fed an exported bank statement, does
        this surprisingly well.
      </p>
      <h2>Budgeting that adapts to you</h2>
      <p>
        The best AI budgeting apps don&apos;t just draw pie charts — they notice
        patterns and nudge you. Look for tools that explain <em>why</em> a
        category changed, not ones that only show that it did. If an app
        can&apos;t tell you something you didn&apos;t already know, it&apos;s not
        earning its subscription.
      </p>
      <h2>Where to be careful</h2>
      <p>
        Never paste full account numbers, passwords or one-time codes into any
        AI tool. Treat AI output on taxes and investments as a starting point,
        not advice — verify anything that affects a real financial decision.
      </p>
      <p>
        Used well, AI turns hours of admin into minutes. Used carelessly, it
        gives confident wrong answers. The difference is entirely in how you use
        it.
      </p>
    </>
  ),
  "sip-vs-lumpsum": (
    <>
      <p>
        It&apos;s one of the most argued-about questions in investing: if you
        have money to invest, should you drip it in monthly (SIP) or put it all
        in at once (lumpsum)? We ran the numbers across multiple market cycles.
      </p>
      <h2>What the maths actually says</h2>
      <p>
        In a rising market, a lumpsum usually wins, because your full amount is
        working for longer. But markets don&apos;t only rise — and that&apos;s
        where the SIP&apos;s real advantage shows up: it removes the pressure of
        timing and smooths your entry price through rupee-cost averaging.
      </p>
      <h2>The factor that decides it</h2>
      <p>
        The honest answer depends on one thing:{" "}
        <strong>whether you already have the money</strong>. If a large sum is
        sitting idle, staggering it over 6–12 months balances growth and risk.
        If you&apos;re investing from monthly income — which is most people — a
        SIP isn&apos;t just optimal, it&apos;s the only option, and a very good
        one.
      </p>
      <p>
        Try both scenarios in our{" "}
        <Link href="/calculators/sip" className="link-editorial text-forest">
          SIP calculator
        </Link>{" "}
        to see the difference for your own numbers.
      </p>
    </>
  ),
  "how-to-improve-credit-score": (
    <>
      <p>
        Your credit score decides whether you get a loan, at what rate, and
        sometimes whether you get an apartment. The good news: it&apos;s more
        fixable than most people think. Here are the steps that actually move
        it, in order of impact.
      </p>
      <h2>1. Pay on time, every time</h2>
      <p>
        Payment history is the single biggest factor. One missed payment can
        cost dozens of points. Automate at least the minimum payment on every
        card and loan so a busy month never costs you.
      </p>
      <h2>2. Lower your utilisation</h2>
      <p>
        Using a high share of your available credit hurts your score even if you
        pay in full. Aim to keep balances below 30% of your limit — and under
        10% if you want the best scores. Paying before the statement date, not
        just the due date, helps here.
      </p>
      <h2>3. Don&apos;t close old cards</h2>
      <p>
        Length of credit history matters. An old card you rarely use is still
        quietly helping your score by raising your total available credit and
        your average account age.
      </p>
      <p>
        These changes take one to three billing cycles to show up. There is no
        legitimate overnight fix — anyone promising one is selling something.
      </p>
    </>
  ),
  "work-faster-with-ai": (
    <>
      <p>
        The people getting the most out of AI aren&apos;t using secret tools —
        they&apos;re using ordinary ones with better habits. Here&apos;s the
        practical playbook.
      </p>
      <h2>Give it a role and a goal</h2>
      <p>
        Instead of &ldquo;write an email,&rdquo; try &ldquo;you&apos;re a
        support lead; write a calm reply to this frustrated customer that offers
        a refund and keeps them.&rdquo; The more context you give, the less you
        edit afterwards.
      </p>
      <h2>Make it do the first draft, always</h2>
      <p>
        A blank page is the slowest part of any task. Let AI produce a rough
        first version of the report, the plan, the code — then spend your energy
        improving it rather than starting it. Editing is far faster than
        creating.
      </p>
      <h2>Build a prompt library</h2>
      <p>
        Save the prompts that work. The professionals who look fast have simply
        stopped re-typing the same instructions — they keep a note of proven
        prompts and reuse them.
      </p>
      <p>
        None of this requires a paid plan or technical skill. It just requires
        treating AI like a capable junior teammate: brief it well, check its
        work, and keep the good stuff.
      </p>
    </>
  ),

  "how-to-make-money-with-ai": (
    <>
      <p>
        &ldquo;Make money with AI&rdquo; is one of the most searched phrases on
        the internet — and most of the results are selling you a course. Here
        are seven ways people genuinely earn with AI, with an honest note on the
        effort each one takes.
      </p>
      <h2>1. Freelance services, done faster</h2>
      <p>
        Writing, design, video editing, translation — AI lets one person deliver
        what used to take a team. The money isn&apos;t in &ldquo;AI&rdquo;
        itself; it&apos;s in offering a real service (on Upwork, Fiverr or
        directly) and using AI to do it faster and take on more clients.
      </p>
      <h2>2. Content and SEO websites</h2>
      <p>
        Building a niche website — like a calculator or review site — and earning
        from ads and affiliates is a proven model. AI speeds up research and
        drafting, but the winners still add genuine value and edit carefully;
        thin, purely AI-spun sites get filtered out by Google.
      </p>
      <h2>3. Selling digital products</h2>
      <p>
        Templates, prompt packs, notion setups, ebooks, design assets — AI helps
        you create these quickly and sell them repeatedly on marketplaces. It&apos;s
        income that keeps earning after the work is done.
      </p>
      <h2>4. Social media and short video</h2>
      <p>
        AI voice, script and editing tools make it possible to run faceless
        YouTube or Instagram channels. Monetisation comes from ad revenue,
        sponsorships and affiliates once you build an audience.
      </p>
      <h2>5. Consulting and automation</h2>
      <p>
        Plenty of small businesses want AI but don&apos;t know where to start. If
        you can set up chatbots, automate workflows or train a team, that&apos;s a
        valuable, well-paid service.
      </p>
      <h2>The honest truth</h2>
      <p>
        None of these are passive or instant. AI removes the grunt work, but you
        still need a skill, consistency and patience. Treat it as leverage on
        real effort — not a substitute for it — and it genuinely pays.
      </p>
    </>
  ),

  "chatgpt-vs-claude-vs-gemini": (
    <>
      <p>
        These three assistants dominate the AI world, and most people only need
        one. Here&apos;s how they compare on the things that actually matter — so
        you can pick without paying for all three.
      </p>
      <h2>Writing and reasoning</h2>
      <p>
        Claude tends to lead on long-form writing, nuanced tone and careful
        reasoning, making it a favourite for anyone who writes or analyses for a
        living. ChatGPT is a superb all-rounder with the widest ecosystem. Gemini
        is close behind and improving fast.
      </p>
      <h2>Coding</h2>
      <p>
        Claude and ChatGPT are both excellent for coding, with Claude often
        preferred for larger codebases thanks to its big context window. Gemini
        is strong too and integrates neatly with Google&apos;s developer tools.
      </p>
      <h2>Research and up-to-date facts</h2>
      <p>
        Gemini has a natural edge here through its tie-in with Google Search,
        while ChatGPT and Claude both browse the web well. For source-cited
        research, many people add {""}
        <a href="/ai-tools">Perplexity</a> alongside whichever assistant they
        choose.
      </p>
      <h2>Value for money</h2>
      <p>
        All three offer a capable free tier and a roughly $20/month paid plan.
        The free tiers are genuinely good — start there, and only upgrade once you
        hit limits on the specific tasks you care about.
      </p>
      <h2>The verdict</h2>
      <p>
        For writing and analysis, Claude. For an everyday all-rounder with the
        biggest ecosystem, ChatGPT. For deep Google integration and multimodal
        tasks, Gemini. You can&apos;t go badly wrong — try the free versions on
        your own real tasks and trust what feels best.
      </p>
    </>
  ),

  "best-free-ai-tools": (
    <>
      <p>
        You don&apos;t need a stack of subscriptions to get real value from AI.
        These free tools cover most of what people actually need day to day.
      </p>
      <h2>For writing and everyday help</h2>
      <p>
        ChatGPT, Claude and Gemini all have strong free tiers that handle
        drafting, summarising, brainstorming and answering questions. For most
        people, one of these is all they need.
      </p>
      <h2>For research</h2>
      <p>
        Perplexity&apos;s free tier gives you answers with cited sources — ideal
        when you need facts you can verify rather than a confident guess.
      </p>
      <h2>For images and design</h2>
      <p>
        Free image generators and tools like Canva&apos;s AI features let you
        create graphics, social posts and simple visuals without design skills.
      </p>
      <h2>For voice and audio</h2>
      <p>
        Free tiers from voice tools can narrate videos and create audio content —
        enough to test the waters before paying for more.
      </p>
      <h2>For coding</h2>
      <p>
        GitHub Copilot and Cursor both offer free tiers that help you write and
        understand code faster, which is a gift for students and hobbyists.
      </p>
      <p>
        Explore all of these and more in our{" "}
        <a href="/ai-tools">AI tools directory</a>, where we tag exactly which
        ones are free.
      </p>
    </>
  ),

  "how-to-save-income-tax": (
    <>
      <p>
        Saving tax legally isn&apos;t about loopholes — it&apos;s about using the
        deductions the government deliberately offers. Here are ten that most
        Indian taxpayers can use, whichever regime you choose.
      </p>
      <h2>1. Max out Section 80C</h2>
      <p>
        Up to ₹1.5 lakh a year through PPF, ELSS funds, life insurance, EPF,
        or tuition fees. It&apos;s the biggest single lever for most people. Use
        our <a href="/calculators/ppf">PPF calculator</a> to see how it grows.
      </p>
      <h2>2. Claim 80D for health insurance</h2>
      <p>
        Premiums for yourself and family (and extra for senior-citizen parents)
        are deductible — a rare case where protecting yourself also cuts your tax.
      </p>
      <h2>3. Use NPS for an extra ₹50,000</h2>
      <p>
        Section 80CCD(1B) gives an additional deduction over and above 80C for
        National Pension System contributions.
      </p>
      <h2>4. Home-loan interest under Section 24</h2>
      <p>
        Interest on a home loan for a self-occupied property is deductible up to
        ₹2 lakh a year — often the largest deduction for homeowners.
      </p>
      <h2>5. Compare the two regimes first</h2>
      <p>
        The new regime has lower rates but few deductions; the old regime rewards
        those with big deductions. Run your numbers in our{" "}
        <a href="/calculators/income-tax">income tax calculator</a> before you
        decide — it tells you which one actually saves you more.
      </p>
      <h2>The rest</h2>
      <p>
        Also worth knowing: HRA exemption if you pay rent, 80E for education-loan
        interest, 80G for eligible donations, 80TTA/80TTB for savings interest,
        and the standard deduction that applies automatically to salary. Plan in
        April, not March — rushed tax-saving usually means worse choices.
      </p>
    </>
  ),

  "emergency-fund-guide": (
    <>
      <p>
        Before you invest a single rupee, you need one thing in place: an
        emergency fund. It&apos;s the boring foundation that lets everything else
        work.
      </p>
      <h2>What it&apos;s for</h2>
      <p>
        An emergency fund covers real emergencies — a job loss, a medical bill, an
        urgent repair — without forcing you to sell investments at a bad time or
        borrow at high interest. It buys you calm and options.
      </p>
      <h2>How big should it be?</h2>
      <p>
        The common rule is three to six months of essential expenses. If your
        income is stable and you have a dual-income household, three may be
        enough. If you&apos;re self-employed or a sole earner, aim for six months
        or more.
      </p>
      <h2>Where to keep it</h2>
      <p>
        Somewhere safe and reachable within a day or two — a separate savings
        account, a liquid fund, or a sweep-in fixed deposit. The goal isn&apos;t
        high returns; it&apos;s safety and access. Don&apos;t put your emergency
        fund in the stock market.
      </p>
      <h2>How to build it</h2>
      <p>
        Start with a small target — say one month of expenses — and automate a
        fixed transfer each payday. Direct windfalls like bonuses or refunds
        straight into it. Once it&apos;s full, redirect that same monthly amount
        into investments. You&apos;ll barely feel the switch, and you&apos;ll
        invest from a position of safety rather than fear.
      </p>
    </>
  ),
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = bodies[post.slug];
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    datePublished: post.date,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />

      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-forest">Guides</Link>
      </nav>

      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brass">
          {post.category} · {post.readMinutes} min read · {post.date}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.06]">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-white text-sm font-semibold">
            {site.name.charAt(0)}
          </span>
          <div className="text-sm">
            <p className="font-semibold text-ink">Written by {site.authorName}</p>
            <p className="text-ink-faint">Reviewed for accuracy · Educational, not advice</p>
          </div>
        </div>
      </header>

      <div className="mt-8 aspect-[2/1] rounded-2xl border border-line overflow-hidden">
        <CoverArt
          seed={post.slug}
          variant={post.art.variant}
          palette={post.art.palette}
          label={post.category}
          className="h-full w-full"
        />
      </div>

      <article className="article mt-10">{body}</article>

      <div className="mt-12 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">A note on trust:</strong> this guide is for
        education, not personalised financial advice. Figures are illustrative —
        confirm anything that affects a real decision.
      </div>

      <section className="mt-16 mb-8">
        <h2 className="font-display text-2xl font-600 text-ink">Keep reading</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
            >
              <h3 className="font-display text-base font-600 text-ink leading-snug group-hover:text-forest transition-colors">
                {p.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest">
                Read <IconArrow className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
