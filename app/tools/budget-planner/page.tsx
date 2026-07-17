import type { Metadata } from "next";
import Link from "next/link";
import BudgetPlanner from "@/components/tools/BudgetPlanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Budget Planner — Free Monthly Budget Tool" },
  description:
    "Free monthly budget planner. Enter your income and expenses to see what's left to save, your savings rate and how you compare with the 50/30/20 rule.",
  alternates: { canonical: "/tools/budget-planner" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/budget-planner",
    title: "Budget Planner — Free Monthly Budget Tool",
    description:
      "Plan your monthly budget in seconds. See money left to save, your savings rate and a live 50/30/20 breakdown — private, in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Budget Planner tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How do I make a monthly budget?",
    a: "Start with your take-home income, then list every regular expense — rent or EMI, groceries, bills, transport, fun and savings. Subtract total expenses from income to see what's left. If the number is positive you have room to save more; if it's negative you're overspending and need to trim. This planner does the maths live as you type.",
  },
  {
    q: "What is the 50/30/20 budget rule?",
    a: "It's a simple guideline: put 50% of your take-home pay toward needs (rent, food, bills, transport, health), 30% toward wants (dining, shopping, subscriptions) and save 20% (investments, an emergency fund, debt payoff). Tag each expense in the planner as a Need, Want or Save and it shows how your real spending compares.",
  },
  {
    q: "What is a good savings rate?",
    a: "Saving 20% of your income is the classic target, but any consistent saving is progress. If you can push past 20% you'll build wealth and reach goals faster. The planner counts both your explicit savings category and any money left over at the end of the month toward your savings rate.",
  },
  {
    q: "Is my budget data private?",
    a: "Yes. Everything runs in your browser and your budget is saved only to your own device using local storage. Nothing is uploaded to a server, so your income and expenses never leave your computer or phone.",
  },
  {
    q: "What should I do if my expenses are more than my income?",
    a: "The planner flags a deficit in red. Focus first on your largest wants — dining out, shopping and subscriptions are usually the easiest to cut. If needs alone exceed your income, look at bigger moves such as cheaper rent, refinancing loans or raising your income. Aim to get back to a positive number before adding new spending.",
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
        name: "Budget Planner",
        item: `${site.url}/tools/budget-planner`,
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
        <span className="text-ink">Budget Planner</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Budget Planner
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Enter your income and monthly expenses to see exactly what&apos;s left to
          save, your savings rate and a live 50/30/20 breakdown &mdash; saved
          privately in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <BudgetPlanner />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>How to budget your money each month</h2>
        <p>
          A budget is simply a plan for where your money goes before the month
          begins. Start with your <strong>take-home income</strong> &mdash; the
          amount that actually lands in your account after tax and deductions.
          List every recurring expense you can think of, from rent and loan EMIs
          to groceries, bills, transport, the odd night out and the money you set
          aside to invest. Subtract those expenses from your income and you have
          the single most useful number in personal finance: how much is left.
          When that number is positive you have breathing room to save or invest
          more; when it&apos;s negative, your spending has outrun your earnings and
          something has to give.
        </p>
        <p>
          The goal isn&apos;t to track every rupee, dollar or pound with perfect
          precision &mdash; it&apos;s to make deliberate choices. Reviewing your budget
          once a month is usually enough to catch subscriptions you forgot about,
          spot categories that are quietly creeping up, and redirect that money
          toward goals that matter more to you.
        </p>

        <h2>The 50/30/20 rule explained</h2>
        <p>
          Popularised by US senator Elizabeth Warren, the{" "}
          <strong>50/30/20 rule</strong> is a friendly starting framework that
          splits your take-home pay into three buckets. Roughly{" "}
          <strong>50% goes to needs</strong> &mdash; the essentials you can&apos;t
          skip, such as housing, food, utilities, transport and healthcare.{" "}
          <strong>30% goes to wants</strong> &mdash; the lifestyle spending that
          makes life enjoyable, like dining out, shopping, streaming services and
          hobbies. The final <strong>20% goes to savings</strong> &mdash; building
          an emergency fund, investing for the future and paying down debt faster
          than the minimum.
        </p>
        <p>
          Treat these percentages as targets, not rigid rules. In high-cost
          cities your needs may swallow more than half your income, which simply
          means your wants and savings have to flex. What matters is that you can
          see the split clearly and nudge it in the right direction over time. In
          this planner, tag each expense as a <em>Need</em>, <em>Want</em> or{" "}
          <em>Save</em> and the bars show how your real budget compares with the
          50/30/20 ideal, with any leftover money counted toward savings.
        </p>

        <h2>Turn your plan into action</h2>
        <p>
          Once you know your numbers, small changes compound quickly. Cancelling
          one unused subscription, cooking a few more meals at home or automating
          a transfer to your investments on payday can move your savings rate by
          several points. If your budget shows a deficit, attack your largest
          wants first &mdash; they&apos;re usually the easiest to trim without hurting
          your quality of life. Re-check your plan whenever your income or costs
          change, and let the surplus flow straight into your goals.
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

      {/* Cross-links */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          Keep going
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/blog/50-30-20-budget-rule"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              The 50/30/20 rule, in depth
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              A plain-English guide to budgeting your salary with the 50/30/20
              method.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Read the guide &rarr;
            </span>
          </Link>
          <Link
            href="/calculators/take-home-salary"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Take-home salary calculator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Work out your monthly in-hand pay after tax &mdash; the starting
              point for any budget.
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
