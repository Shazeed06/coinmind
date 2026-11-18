import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { posts, indexablePosts, type Post, NOINDEX_POST_SLUGS } from "@/lib/data";
import { site } from "@/lib/site";
import { ChevronRight } from "lucide-react";
import CoverArt from "@/components/CoverArt";
import ArticleMarkdown from "@/components/ArticleMarkdown";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import KeyTakeaways from "@/components/KeyTakeaways";
import ArticleShareBar from "@/components/ArticleShareBar";
import ArticleCalcWidget, { type CalcWidgetType } from "@/components/ArticleCalcWidget";
import CreditScoreSimulator from "@/components/CreditScoreSimulator";
import RelatedArticles from "@/components/RelatedArticles";
import NewsletterCard from "@/components/NewsletterCard";
import { Prose } from "@/components/ui";
import { getKeyTakeaways } from "@/lib/takeaways";

export const dynamicParams = false;

function cleanTitle(t: string, maxLen = 60): string {
  if (!t) return "";
  const cleaned = t.trim();
  if (cleaned.length <= maxLen) return cleaned;
  const parts = cleaned.split(/\s*[:|–—-]\s*/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length >= 25 && trimmed.length <= maxLen) {
      return trimmed;
    }
  }
  if (parts[0] && parts[0].trim().length <= maxLen && parts[0].trim().length >= 20) {
    return parts[0].trim();
  }
  const sub = cleaned.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(" ");
  return (lastSpace > 25 ? sub.slice(0, lastSpace) : sub).trim();
}

function cleanDesc(d: string, maxLen = 155): string {
  if (!d) return "";
  const cleaned = d.trim();
  if (cleaned.length <= maxLen) return cleaned;
  const sentences = cleaned.split(/(?<=[.?!])\s+/);
  let acc = "";
  for (const s of sentences) {
    if ((acc + (acc ? " " : "") + s).length <= maxLen) {
      acc += (acc ? " " : "") + s;
    } else {
      break;
    }
  }
  if (acc.length >= 60) return acc;
  const sub = cleaned.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(" ");
  return (lastSpace > 40 ? sub.slice(0, lastSpace) : sub).trim() + ".";
}

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
  const metaTitle = cleanTitle(post.metaTitle ?? post.title);
  const metaDesc = cleanDesc(post.excerpt);
  return {
    title: { absolute: metaTitle },
    description: metaDesc,
    keywords: post.keywords,
    robots: NOINDEX_POST_SLUGS.has(post.slug) ? { index: false, follow: true } : undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: metaTitle,
      description: metaDesc,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: ["/opengraph-image"],
    },
  };
}

// Article bodies. Written as real, human editorial content.
const bodies: Record<string, ReactNode> = {
  "best-ai-tools-for-personal-finance": (
    <>
      <p>
        Most &ldquo;AI finance tool&rdquo; lists are written to sell you
        something. This one isn&apos;t. Here&apos;s what actually earns a place in
        your workflow (based on features, pricing and real-world use cases) and
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
        The best AI budgeting apps don&apos;t just draw pie charts. They notice
        patterns and nudge you. Look for tools that explain <em>why</em> a
        category changed, not ones that only show that it did. If an app
        can&apos;t tell you something you didn&apos;t already know, it&apos;s not
        earning its subscription.
      </p>
      <h2>Where to be careful</h2>
      <p>
        Never paste full account numbers, passwords or one-time codes into any
        AI tool. Treat AI output on taxes and investments as a starting point,
        not advice. Verify anything that affects a real financial decision.
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
        in at once (lumpsum)? Looking at how markets tend to behave across cycles,
        here&apos;s what the trade-off really comes down to.
      </p>
      <h2>What the maths actually says</h2>
      <p>
        In a rising market, a lumpsum usually wins, because your full amount is
        working for longer. But markets don&apos;t only rise, and that&apos;s
        where the SIP&apos;s real advantage shows up: it removes the pressure of
        timing and smooths your entry price through rupee-cost averaging.
      </p>
      <h2>The factor that decides it</h2>
      <p>
        The honest answer depends on one thing:{" "}
        <strong>whether you already have the money</strong>. If a large sum is
        sitting idle, staggering it over 6-12 months balances growth and risk.
        If you&apos;re investing from monthly income, which is most people, a
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
        Your credit score (CIBIL in India, FICO globally) decides whether a bank approves your
        home loan, personal loan, or premium credit card — and more importantly, the exact
        interest rate you pay. On a ₹50 lakh home loan over 20 years, moving from a{" "}
        <strong>680 score to 760+</strong> can save you <strong>₹3.5 lakh to ₹6 lakh</strong> in
        interest alone.
      </p>
      <p>
        <strong>Can you improve your credit score in 3 months?</strong> Yes. Most people can
        realistically add <strong>+40 to +90 points within 60 to 90 days</strong> by targeting the
        two fastest-moving levers: credit card utilisation and billing-cycle payment timing. Use the
        interactive simulator below to estimate your 90-day boost before reading the step-by-step plan.
      </p>

      <CreditScoreSimulator />

      <h2>How your CIBIL / credit score is actually calculated</h2>
      <p>
        Before trying random credit score tips, look at the exact weights bureaus (TransUnion CIBIL,
        Experian, Equifax, CRIF High Mark) assign to each behaviour. Focus 80% of your effort on
        the top two rows:
      </p>
      <div className="overflow-x-auto my-5">
        <table className="w-full text-left text-sm border border-line rounded-xl overflow-hidden">
          <thead className="bg-paper-2 text-ink font-semibold">
            <tr>
              <th className="p-3">Factor</th>
              <th className="p-3">Weight</th>
              <th className="p-3">How fast it moves your score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-ink-soft">
            <tr>
              <td className="p-3 font-semibold text-ink">Payment history (EMIs &amp; cards)</td>
              <td className="p-3 font-semibold text-forest">35%</td>
              <td className="p-3">30–90 days of clean on-time payments rebuild momentum</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-ink">Credit utilisation ratio</td>
              <td className="p-3 font-semibold text-forest">30%</td>
              <td className="p-3"><strong>Fastest lever (30–45 days)</strong> — resets every statement cycle</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-ink">Credit history length (age)</td>
              <td className="p-3">15%</td>
              <td className="p-3">Gradual — protect it by keeping your oldest card open</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-ink">Credit mix (secured + unsecured)</td>
              <td className="p-3">10%</td>
              <td className="p-3">Medium term — home/gold/auto loan + card beats only cards</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-ink">New credit / hard inquiries</td>
              <td className="p-3">10%</td>
              <td className="p-3">3–6 months — avoid multiple loan applications together</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>7 proven steps to boost your credit score in 90 days</h2>

      <h3>1. Drop credit card utilisation below 30% (ideally under 10%)</h3>
      <p>
        This is the single fastest credit score improvement trick. Even if you pay your full bill
        every month, banks report your <strong>statement closing balance</strong> to bureaus. If
        your limit is ₹1,00,000 and your statement generates at ₹70,000, your utilisation is 70% —
        which drags your score down by 30–50 points. Pay down 70–80% of your balance{" "}
        <strong>2 days before the statement generation date</strong> so the reported balance stays
        under 10–20%.
      </p>

      <h3>2. Automate 100% of EMIs and card minimums (never miss a single day)</h3>
      <p>
        A single payment that is 30+ days past due can slash 60 to 100 points and stay on your
        report for 3 years. Turn on Auto-Debit (eNACH / standing instruction) for at least the
        minimum amount due on every card and full EMI on every loan so a busy travel week never
        triggers a late mark.
      </p>

      <h3>3. Pull your free report and dispute errors immediately</h3>
      <p>
        Under RBI rules, you are entitled to one free full credit report every calendar year from
        each bureau (CIBIL, Experian, Equifax, CRIF). Check for three common errors: a closed loan
        still marked &ldquo;Active&rdquo;, a duplicate account, or an incorrect &ldquo;Settled&rdquo;
        status. Raising an online dispute takes 5 minutes and bureaus must resolve it within{" "}
        <strong>30 days</strong> — removing one wrong late payment can jump your score by 40+
        points overnight.
      </p>

      <h3>4. Ask for a credit limit increase (without spending more)</h3>
      <p>
        If your card bank offers a pre-approved limit increase (no hard inquiry), accept it.
        Moving your limit from ₹1,00,000 to ₹2,00,000 while keeping monthly spending at ₹30,000
        instantly cuts your utilisation ratio in half — from 30% down to 15%.
      </p>

      <h3>5. Never close your oldest credit card</h3>
      <p>
        Closing an old lifetime-free card hurts you twice: it shrinks your total available credit
        limit (pushing utilisation up) and reduces your average credit age. Keep your oldest
        no-fee card alive with one tiny recurring bill (like a ₹199 mobile recharge) on autopay.
      </p>

      <h3>6. Stop applying for multiple loans or cards (hard inquiry freeze)</h3>
      <p>
        Every time you apply for a credit card or personal loan, the lender triggers a{" "}
        <strong>hard inquiry</strong>, knocking 5–10 points off your score. Applying to 4 banks in
        one month signals &ldquo;credit hunger&rdquo; and causes automatic rejections. Space new
        applications at least 90–180 days apart.
      </p>

      <h3>7. Starting from zero or below 620? Use an FD-backed secured credit card</h3>
      <p>
        If you have no credit history (&ldquo;NH&rdquo; / -1) or a damaged score below 620, regular
        cards will reject you. Open a small Fixed Deposit (₹10,000–₹25,000) with a bank offering a
        secured card, spend under 15% of the limit each month, and pay in full. Within 3–6 billing
        cycles, your score reliably climbs past 720–750.
      </p>

      <h2>Realistic 30 / 60 / 90-day credit improvement timeline</h2>
      <ul>
        <li>
          <strong>Day 1 – 30:</strong> Pay balances before statement date, freeze new loan
          applications, and file bureau disputes for any reporting mistakes.
        </li>
        <li>
          <strong>Day 31 – 60:</strong> First lower-utilisation statement hits CIBIL/Experian. Most
          users see their first <strong>+20 to +45 point jump</strong> here.
        </li>
        <li>
          <strong>Day 61 – 90:</strong> Three consecutive clean payment cycles + resolved disputes
          compound. Many borrowers cross the <strong>750+ prime threshold</strong> needed for the
          lowest{" "}
          <Link href="/calculators/home-loan-eligibility" className="link-editorial text-forest">
            home loan eligibility
          </Link>{" "}
          and{" "}
          <Link href="/calculators/emi" className="link-editorial text-forest">
            lowest monthly EMI rates
          </Link>
          .
        </li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <h3>Can I improve my credit score from 650 to 750 in 3 months?</h3>
      <p>
        If your score is 650 primarily because of high credit card balances (60%+ utilisation) or a
        reporting error, yes — dropping utilisation under 15% and fixing errors can lift you close
        to 740–750 within 90 days. If the drop was caused by recent loan defaults or settlements,
        expect 6 to 12 months of spotless payments to rebuild past 750.
      </p>
      <h3>Does checking my own CIBIL score reduce it?</h3>
      <p>
        No. Checking your own score is a <strong>soft inquiry</strong> and has zero impact on your
        credit score. Only lender applications trigger hard inquiries.
      </p>
      <h3>Should I settle a bad loan or close it in full?</h3>
      <p>
        Always pay in full (&ldquo;Closed&rdquo;) if possible. A &ldquo;Settled&rdquo; status tells
        future lenders you paid less than owed and severely damages your approval odds for up to 7
        years. Explore our full{" "}
        <Link href="/credit-score" className="link-editorial text-forest">
          India Credit Score Hub
        </Link>{" "}
        for bureau dispute links and card rules.
      </p>
    </>
  ),
  "work-faster-with-ai": (
    <>
      <p>
        The people getting the most out of AI aren&apos;t using secret tools.
        They&apos;re using ordinary ones with better habits. Here&apos;s the
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
        first version of the report, the plan, the code. Then spend your energy
        improving it rather than starting it. Editing is far faster than
        creating.
      </p>
      <h2>Build a prompt library</h2>
      <p>
        Save the prompts that work. The professionals who look fast have simply
        stopped re-typing the same instructions. They keep a note of proven
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
        the internet, and most of the results are selling you a course. Here
        are seven ways people genuinely earn with AI, with an honest note on the
        effort each one takes.
      </p>
      <h2>1. Freelance services, done faster</h2>
      <p>
        Writing, design, video editing, translation: AI lets one person deliver
        what used to take a team. The money isn&apos;t in &ldquo;AI&rdquo;
        itself; it&apos;s in offering a real service (on Upwork, Fiverr or
        directly) and using AI to do it faster and take on more clients.
      </p>
      <h2>2. Content and SEO websites</h2>
      <p>
        Building a niche website, like a calculator or review site, and earning
        from ads and affiliates is a proven model. AI speeds up research and
        drafting, but the winners still add genuine value and edit carefully;
        thin, purely AI-spun sites get filtered out by Google.
      </p>
      <h2>3. Selling digital products</h2>
      <p>
        Templates, prompt packs, notion setups, ebooks, design assets: AI helps
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
        real effort, not a substitute for it, and it genuinely pays.
      </p>
    </>
  ),

  "chatgpt-vs-claude-vs-gemini": (
    <>
      <p>
        These three assistants dominate the AI world, and most people only need
        one. Here&apos;s how they compare on the things that actually matter, so
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
        <Link href="/ai-tools/perplexity" className="link-editorial text-forest">
          Perplexity
        </Link>{" "}
        alongside whichever assistant they choose.
      </p>
      <h2>Value for money</h2>
      <p>
        All three offer a capable free tier and a roughly $20/month paid plan.
        The free tiers are genuinely good. Start there, and only upgrade once you
        hit limits on the specific tasks you care about.
      </p>
      <h2>The verdict</h2>
      <p>
        For writing and analysis, Claude. For an everyday all-rounder with the
        biggest ecosystem, ChatGPT. For deep Google integration and multimodal
        tasks, Gemini. You can&apos;t go badly wrong. Try the free versions on
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
        Perplexity&apos;s free tier gives you answers with cited sources, ideal
        when you need facts you can verify rather than a confident guess.
      </p>
      <h2>For images and design</h2>
      <p>
        Free image generators and tools like Canva&apos;s AI features let you
        create graphics, social posts and simple visuals without design skills.
      </p>
      <h2>For voice and audio</h2>
      <p>
        Free tiers from voice tools can narrate videos and create audio content,
        enough to test the waters before paying for more.
      </p>
      <h2>For coding</h2>
      <p>
        GitHub Copilot and Cursor both offer free tiers that help you write and
        understand code faster, which is a gift for students and hobbyists.
      </p>
      <p>
        Explore all of these and more in our{" "}
        <Link href="/ai-tools" className="link-editorial text-forest">
          AI tools directory
        </Link>
        , where we tag exactly which ones are free.
      </p>
    </>
  ),

  "how-to-save-income-tax": (
    <>
      <p>
        Saving tax legally isn&apos;t about loopholes; it&apos;s about using the
        deductions the government deliberately offers. Here are ten that most
        Indian taxpayers can use, whichever regime you choose.
      </p>
      <h2>1. Max out Section 80C</h2>
      <p>
        Up to ₹1.5 lakh a year through PPF, ELSS funds, life insurance, EPF,
        or tuition fees. It&apos;s the biggest single lever for most people. Use
        our{" "}
        <Link href="/calculators/ppf" className="link-editorial text-forest">
          PPF calculator
        </Link>{" "}
        to see how it grows.
      </p>
      <h2>2. Claim 80D for health insurance</h2>
      <p>
        Premiums for yourself and family (and extra for senior-citizen parents)
        are deductible, a rare case where protecting yourself also cuts your tax.
      </p>
      <h2>3. Use NPS for an extra ₹50,000</h2>
      <p>
        Section 80CCD(1B) gives an additional deduction over and above 80C for
        National Pension System contributions.
      </p>
      <h2>4. Home-loan interest under Section 24</h2>
      <p>
        Interest on a home loan for a self-occupied property is deductible up to
        ₹2 lakh a year, often the largest deduction for homeowners.
      </p>
      <h2>5. Compare the two regimes first</h2>
      <p>
        The new regime has lower rates but few deductions; the old regime rewards
        those with big deductions. Run your numbers in our{" "}
        <Link href="/calculators/income-tax" className="link-editorial text-forest">
          income tax calculator
        </Link>{" "}
        before you decide. It tells you which one actually saves you more.
      </p>
      <h2>The rest</h2>
      <p>
        Also worth knowing: HRA exemption if you pay rent, 80E for education-loan
        interest, 80G for eligible donations, 80TTA/80TTB for savings interest,
        and the standard deduction that applies automatically to salary. Plan in
        April, not March. Rushed tax-saving usually means worse choices.
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
        An emergency fund covers real emergencies (a job loss, a medical bill, an
        urgent repair) without forcing you to sell investments at a bad time or
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
        Somewhere safe and reachable within a day or two: a separate savings
        account, a liquid fund, or a sweep-in fixed deposit. The goal isn&apos;t
        high returns; it&apos;s safety and access. Don&apos;t put your emergency
        fund in the stock market.
      </p>
      <h2>How to build it</h2>
      <p>
        Start with a small target, say one month of expenses, and automate a
        fixed transfer each payday. Direct windfalls like bonuses or refunds
        straight into it. Once it&apos;s full, redirect that same monthly amount
        into investments. You&apos;ll barely feel the switch, and you&apos;ll
        invest from a position of safety rather than fear.
      </p>
    </>
  ),
};

// ---------------------------------------------------------------------------
// FAQ visibility
//
// The FAQPage node below used to be emitted for every post carrying a `faq`
// array while the page rendered nothing for it, which is exactly Google's
// "marked-up content is not visible to users" violation. The fix is to render
// the FAQs, matching the section in app/news/[slug]/page.tsx.
//
// The wrinkle: 20 posts also carry their own FAQ section inside bodyMarkdown,
// and those markdown sections have drifted out of sync with the array (they
// cover some of the questions, never all of them). Blanket-rendering the array
// on those posts would print the same Q and A twice.
//
// The rule chosen is per question rather than per post:
//   1. A question whose text already appears in the visible body is skipped.
//      The markdown section is its visible answer, so the markup is honest.
//   2. Every other question is rendered in the FAQ block below the article.
//   3. If the body happens to cover all of them, nothing extra is rendered and
//      the JSON-LD is still fully backed by visible text.
// Either way the FAQPage node and the visible page carry the same set of
// questions, with nothing duplicated. No FAQPage node is ever emitted for
// questions a reader cannot see.
// ---------------------------------------------------------------------------

const FAQ_HEADING =
  /^#{1,6}\s*(?:frequently asked questions|faqs?|common questions)\b/im;

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function faqToRender(post: Post) {
  const markdown = post.bodyMarkdown ?? "";
  const bodyText = normalizeText(markdown);
  const items = (post.faq ?? []).filter(
    (f) => !bodyText.includes(normalizeText(f.q)),
  );
  return { items, bodyHasFaqSection: FAQ_HEADING.test(markdown) };
}

// ---------------------------------------------------------------------------
// "Keep reading"
//
// This was posts.filter(...).slice(0, 3), so all 159 posts recommended the
// same first three entries in lib/data.ts. Scored instead: same category wins,
// then exact shared keywords, then shared keyword words, then the more recent
// post, then original data order. Every tiebreak is deterministic because
// these pages are statically generated and must not change between builds.
// ---------------------------------------------------------------------------

const KEYWORD_STOPWORDS = new Set([
  "the", "and", "for", "with", "your", "how", "what", "why", "best", "top",
  "vs", "guide", "india", "indian", "2024", "2025", "2026", "calculator",
  "online", "free", "new", "list",
]);

function keywordWords(keywords: string[]) {
  const words = new Set<string>();
  for (const keyword of keywords) {
    for (const word of keyword.toLowerCase().split(/[^a-z0-9]+/)) {
      if (word.length > 2 && !KEYWORD_STOPWORDS.has(word)) words.add(word);
    }
  }
  return words;
}

function relatedPosts(post: Post, limit = 3) {
  const exactKeywords = new Set(post.keywords.map((k) => k.toLowerCase()));
  const words = keywordWords(post.keywords);

  // Recommend only indexable posts, so a crawlable article never links out to a
  // noindexed traffic post.
  return indexablePosts
    .map((candidate, index) => ({ candidate, index }))
    .filter(({ candidate }) => candidate.slug !== post.slug)
    .map(({ candidate, index }) => {
      const exact = candidate.keywords.filter((k) =>
        exactKeywords.has(k.toLowerCase()),
      ).length;
      let overlap = 0;
      for (const word of keywordWords(candidate.keywords)) {
        if (words.has(word)) overlap++;
      }
      return {
        candidate,
        index,
        score:
          (candidate.category === post.category ? 100 : 0) +
          exact * 10 +
          overlap,
        time: Date.parse(candidate.date) || 0,
      };
    })
    .sort(
      (a, b) => b.score - a.score || b.time - a.time || a.index - b.index,
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

function getRelatedResources(category: string, slug: string) {
  const s = slug.toLowerCase();
  const c = category.toLowerCase();

  if (s.includes("crypto") || s.includes("bitcoin") || c.includes("crypto")) {
    return {
      calc: { label: "Crypto Tax Calculator", href: "/calculators/crypto-tax", desc: "Calculate 30% flat tax on VDA gains" },
      hub: { label: "Investing Hub", href: "/investing" },
    };
  }
  if (s.includes("hra")) {
    return {
      calc: { label: "HRA Calculator", href: "/calculators/hra", desc: "Calculate your HRA tax exemption amount" },
      hub: { label: "Income Tax Hub", href: "/income-tax" },
    };
  }
  if (s.includes("tax") || s.includes("itr") || s.includes("regime") || s.includes("deduction") || c.includes("tax")) {
    return {
      calc: { label: "Income Tax Calculator", href: "/calculators/income-tax", desc: "Compare new vs old regime tax liability" },
      hub: { label: "Income Tax Hub", href: "/income-tax" },
    };
  }
  if (s.includes("salary") || s.includes("in-hand") || s.includes("take-home") || s.includes("ctc")) {
    return {
      calc: { label: "In-Hand Salary Calculator", href: "/calculators/take-home-salary", desc: "Calculate exact monthly take-home pay" },
      hub: { label: "Income Tax Hub", href: "/income-tax" },
    };
  }
  if (s.includes("loan") || s.includes("emi") || s.includes("mortgage") || s.includes("prepayment") || c.includes("loan")) {
    return {
      calc: { label: "Loan EMI Calculator", href: "/calculators/emi", desc: "Calculate monthly EMI, interest and tenure" },
      hub: { label: "Loans Hub", href: "/loans" },
    };
  }
  if (s.includes("ppf") || s.includes("public-provident") || c.includes("ppf")) {
    return {
      calc: { label: "PPF Calculator", href: "/calculators/ppf", desc: "Calculate PPF maturity and tax-free interest" },
      hub: { label: "Savings Hub", href: "/savings" },
    };
  }
  if (s.includes("fd") || s.includes("fixed-deposit") || s.includes("rd") || s.includes("saving") || c.includes("saving")) {
    return {
      calc: { label: "FD Calculator", href: "/calculators/fd", desc: "Calculate fixed deposit maturity returns" },
      hub: { label: "Savings Hub", href: "/savings" },
    };
  }
  if (s.includes("nps") || c.includes("nps")) {
    return {
      calc: { label: "NPS Calculator", href: "/calculators/nps", desc: "Calculate pension corpus and monthly annuity" },
      hub: { label: "Retirement Hub", href: "/retirement" },
    };
  }
  if (s.includes("epf") || s.includes("provident-fund") || c.includes("epf")) {
    return {
      calc: { label: "EPF Calculator", href: "/calculators/epf", desc: "Calculate EPF maturity balance & employer share" },
      hub: { label: "Retirement Hub", href: "/retirement" },
    };
  }
  if (s.includes("retirement") || s.includes("pension") || s.includes("fire") || c.includes("retirement")) {
    return {
      calc: { label: "Retirement Calculator", href: "/calculators/retirement", desc: "Plan retirement corpus & FIRE target" },
      hub: { label: "Retirement Hub", href: "/retirement" },
    };
  }
  if (s.includes("sip") || s.includes("mutual-fund") || c.includes("sip") || c.includes("mutual fund")) {
    return {
      calc: { label: "SIP Calculator", href: "/calculators/sip", desc: "See monthly mutual fund wealth growth" },
      hub: { label: "SIP Hub", href: "/sip" },
    };
  }
  if (s.includes("gold") || s.includes("sgb")) {
    return {
      calc: { label: "Compound Interest Calculator", href: "/calculators/compound-interest", desc: "Calculate compounding growth" },
      hub: { label: "Gold Guide Hub", href: "/gold" },
    };
  }
  if (s.includes("credit-score") || s.includes("cibil") || s.includes("credit-card")) {
    return {
      calc: { label: "Loan Eligibility Calculator", href: "/calculators/home-loan-eligibility", desc: "Check borrowing eligibility by credit" },
      hub: { label: "Credit Score Hub", href: "/credit-score" },
    };
  }
  if (s.includes("budget") || s.includes("50-30-20")) {
    return {
      calc: { label: "Budget Planner", href: "/tools/budget-planner", desc: "Track expenses with 50-30-20 rule" },
      hub: { label: "Budgeting Hub", href: "/budgeting" },
    };
  }
  return {
    calc: { label: "SIP Calculator", href: "/calculators/sip", desc: "See monthly mutual fund wealth growth" },
    hub: { label: "Investing Hub", href: "/investing" },
  };
}

// Maps the topic-matched calculator to the live widget variant it can compute
// in the sidebar. Anything without a quick formula falls back to a CTA card.
function calcTypeFor(href: string): CalcWidgetType {
  if (href.includes("/calculators/sip")) return "sip";
  if (href.includes("/calculators/emi")) return "emi";
  if (href.includes("/calculators/fd")) return "fd";
  if (href.includes("/calculators/ppf")) return "ppf";
  if (href.includes("/calculators/compound-interest")) return "lumpsum";
  return "cta";
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const body = post.bodyMarkdown ? (
    <ArticleMarkdown markdown={post.bodyMarkdown} />
  ) : (
    bodies[post.slug]
  );
  const more = relatedPosts(post);
  const { items: faqItems, bodyHasFaqSection } = faqToRender(post);
  const related = getRelatedResources(post.category, post.slug);
  const calcType = calcTypeFor(related.calc.href);
  const keyTakeaways = getKeyTakeaways(post);
  const articleUrl = `${site.url}/blog/${post.slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: [`${site.url}/opengraph-image`],
      author: {
        "@type": "Person",
        name: site.author.fullName,
        url: `${site.url}/authors/${site.author.slug}`,
        jobTitle: site.author.role,
        description: site.author.bio,
      },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
      },
      publishingPrinciples: `${site.url}/editorial-standards`,
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
      ],
    },
  ];
  // Every question here is visible on the page: the ones in `faqItems` render
  // in the FAQ section below, the rest are already spelled out in the body.
  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const articleJson = { "@context": "https://schema.org", "@graph": graph };

  return (
    <div className="bleep-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />

      {/* Hero — Bleep style: centred, airy, on the pale-blue page. */}
      <section className="pt-8 sm:pt-12 pb-2">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 text-center">
          {/* Breadcrumb — minimal, centred */}
          <nav className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-ink transition-colors">Guides</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-ink truncate max-w-[220px] sm:max-w-none">{post.category}</span>
          </nav>

          {/* Big, medium-weight, centred title */}
          <h1 className="mx-auto mt-5 max-w-[820px] font-display text-[2rem] font-medium leading-[1.12] tracking-tight text-[#111] sm:text-[2.5rem] md:text-[2.85rem]">
            {post.title}
          </h1>

          {/* Lead excerpt */}
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-ink-soft sm:text-lg">
            {post.excerpt}
          </p>

          {/* Author + meta + share, centred */}
          <div className="mt-7 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href={`/authors/${site.author.slug}`}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  {site.author.fullName.charAt(0)}
                </span>
              </Link>
              <div className="text-left text-sm">
                <p className="font-semibold text-ink">
                  <Link href={`/authors/${site.author.slug}`} className="hover:underline">
                    {site.author.fullName}
                  </Link>
                  <span className="font-normal text-ink-soft"> · {site.author.credential}</span>
                </p>
                <p className="text-xs text-ink-faint">{post.date} · {post.readMinutes} min read · Reviewed for accuracy</p>
              </div>
            </div>
            <ArticleShareBar url={articleUrl} title={post.title} />
          </div>

          {/* Featured hero image */}
          <div className="mt-9 aspect-[16/9] sm:aspect-[2/1] max-h-[480px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
            <CoverArt
              seed={post.slug}
              variant={post.art.variant}
              palette={post.art.palette}
              label={post.category}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Article body — one centred reading column, no sidebar. */}
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 pb-14 pt-10 sm:pt-12">
        <article id={`post-${post.slug}`} className="scroll-mt-24">
          {keyTakeaways.length ? <KeyTakeaways items={keyTakeaways} /> : null}
          <Prose>{body}</Prose>

          {faqItems.length > 0 && (
            <section className="mt-14 border-t border-[#d7e7f0] pt-8 scroll-mt-24" id="faq">
              <h2 className="font-display text-2xl font-medium text-[#111]">
                {bodyHasFaqSection
                  ? "More frequently asked questions"
                  : "Frequently asked questions"}
              </h2>
              <div className="mt-5 space-y-3.5">
                {faqItems.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-[#d7e7f0] bg-white p-4"
                  >
                    <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink marker:hidden">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 border-t border-[#d7e7f0] pt-8">
            <AuthorReviewBox />
          </div>

          <div className="mt-6 rounded-2xl border border-[#d7e7f0] bg-white p-5 text-sm text-ink-soft">
            <strong className="text-ink">A note on trust:</strong> this guide is for education, not personalised financial advice.
            Figures are illustrative. Confirm anything that affects a real decision.
          </div>

          {/* End-of-article resources, stacked in the single column. */}
          <div className="mt-12 space-y-6">
            <ArticleCalcWidget
              type={calcType}
              href={related.calc.href}
              label={related.calc.label}
              desc={related.calc.desc}
            />
            <RelatedArticles posts={more} />
            <NewsletterCard />
          </div>
        </article>
      </div>
    </div>
  );
}
