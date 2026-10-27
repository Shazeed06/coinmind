import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import AiGuidePage, { GuideH2, PromptBox } from "@/components/AiGuidePage";

const slug = "claude-for-finance";
const title = "How to Use Claude AI for Personal Finance: 5 Ways (+ Prompts)";
const description =
  "5 practical ways to use Claude for personal finance — budgeting, investing, money decisions, tax planning and building a finance tracker — each with a ready-to-paste prompt. For India and worldwide.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "claude for personal finance", "how to use claude for finance", "claude ai financial advisor",
    "claude for budgeting", "claude for investing", "claude money management",
    "ai for financial decisions", "claude financial planning prompts", "claude for taxes",
  ],
  alternates: { canonical: `/ai-tools/${slug}` },
  openGraph: {
    type: "article", url: `${site.url}/ai-tools/${slug}`, siteName: site.name, locale: "en_IN",
    title: "How to Use Claude for Personal Finance — 5 Ways + Prompts", description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const faqs = [
  { q: "Can Claude give financial advice?", a: "Claude is a general-purpose AI assistant, not a licensed financial adviser. It is excellent for explaining concepts, doing the maths, drafting a plan and giving a structured second opinion, but it does not know your full situation and can make mistakes. Treat its output as educational, verify every number, and consult a SEBI-registered adviser (India) or a licensed professional before any major decision." },
  { q: "Is it safe to share my financial data with Claude?", a: "Never paste account numbers, passwords, card numbers, PAN or Aadhaar. For analysis you only need the figures — amounts, categories and dates — not identifiers. Anthropic does not train on your conversations by default on paid plans, but you should still redact anything sensitive. For live bank data, use an official, consent-based connector rather than pasting raw statements." },
  { q: "Which Claude plan do I need for finance tasks?", a: "The free plan handles most budgeting and planning questions. Claude Pro (about $20/month, ~₹1,700) adds more usage, larger documents and access to the most capable models — useful if you upload long statements or build a tracker. Claude Max and Claude Code suit heavier, repeated workflows like a full finance dashboard." },
  { q: "Can Claude connect to my bank or spreadsheet?", a: "Yes, through MCP (the Model Context Protocol) and connectors. You can connect Claude to Google Drive, a spreadsheet, or a consent-based financial data provider so it reads live figures instead of pasted text. See our guides on what MCP is and what MCP can do for the setup." },
  { q: "Does this work for Indian finance (SIP, PPF, income tax)?", a: "Yes. Claude understands Indian products — SIP, mutual funds, PPF, NPS, the new vs old tax regime and more — if you give it the current rates and your numbers. For exact, rule-checked figures, pair it with CoinMind's free calculators, which are verified against RBI, SEBI and the Income Tax Department." },
];

const sources = [
  { label: "Anthropic — Claude for Financial Services", href: "https://www.anthropic.com/news/claude-for-financial-services" },
  { label: "Anthropic — Claude plans & pricing", href: "https://www.anthropic.com/pricing" },
];

export default function Page() {
  return (
    <AiGuidePage
      slug={slug}
      eyebrow="AI for money"
      title={title}
      intro="Claude — Anthropic's AI assistant — is one of the best tools for thinking through money, because it is strong at long-form reasoning, maths and reading documents. It will not replace a financial adviser, but it is a brilliant second brain for budgeting, planning and decisions. Here are five practical ways to use it, each with a prompt you can copy and paste, written to work whether you are in India or anywhere else."
      date="2026-10-27"
      faqs={faqs}
      sources={sources}
      financeDisclaimer
    >
      <section>
        <GuideH2>1. Analyse your spending and build a budget</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Paste a month of expenses (or export a statement to CSV and upload it — remove account numbers first). Claude will group them into categories, flag the biggest leaks, and suggest a realistic budget such as the 50/30/20 split. Because it reasons in plain language, you can push back: &ldquo;that eating-out number is one-off&rdquo; and it adjusts.
        </p>
        <PromptBox prompt={`Here are my expenses for last month (amounts only, no account details):\n[paste your expenses — e.g. Rent 25000, Groceries 9000, Dining 6000, Fuel 3500, EMI 18000, Subscriptions 1200, ...]\n\nMy monthly take-home income is ₹[amount].\n\n1. Group these into clear categories and show the % of income each takes.\n2. Point out the 3 categories where I'm likely overspending.\n3. Build me a realistic monthly budget using the 50/30/20 rule, adjusted to my real fixed costs.\n4. Suggest one specific change that would free up the most money.\nKeep it concise and use a table.`} />
        <p className="mt-4 text-sm text-ink-soft">
          Then size the savings you free up with the{" "}
          <Link href="/tools/budget-planner" className="font-semibold text-brand hover:underline">budget planner</Link> or an{" "}
          <Link href="/calculators/goal-emergency-fund" className="font-semibold text-brand hover:underline">emergency-fund calculator</Link>.
        </p>
      </section>

      <section>
        <GuideH2>2. Plan your investments and retirement</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Retirement and portfolio planning is the single most popular finance use of Claude. Tell it your age, how much you can invest, and your goal, and it will sketch an asset allocation, estimate the corpus you&rsquo;re on track for, and show what changing the SIP or timeline does. It explains the trade-offs instead of just giving a number.
        </p>
        <PromptBox prompt={`Act as a patient financial planner. I'm [age], I can invest ₹[amount]/month, and I want to retire at [age] / build a corpus of ₹[amount].\n\n1. Suggest a simple asset allocation (equity / debt / gold) for my age and horizon, and why.\n2. Estimate the corpus I'd reach at a realistic 11–12% long-run equity return, and separately at a cautious 9%.\n3. Show how much more I'd have if I stepped up the SIP 10% a year.\n4. List the risks I should plan for.\nAssume Indian products (equity mutual fund SIP, PPF, NPS) and show the maths.`} />
        <p className="mt-4 text-sm text-ink-soft">
          Check its figures against the{" "}
          <Link href="/calculators/sip" className="font-semibold text-brand hover:underline">SIP calculator</Link>,{" "}
          <Link href="/calculators/retirement" className="font-semibold text-brand hover:underline">retirement calculator</Link> and{" "}
          <Link href="/calculators/step-up-sip" className="font-semibold text-brand hover:underline">step-up SIP calculator</Link>.
        </p>
      </section>

      <section>
        <GuideH2>3. Get a structured second opinion on a money decision</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          &ldquo;Should I rent or buy?&rdquo; &ldquo;Prepay the home loan or invest the surplus?&rdquo; &ldquo;Which term plan?&rdquo; These are the questions where people freeze. Claude is strong here because it lays out both sides, does the comparison maths, and tells you what it would take to change the answer — without the sales incentive a bank or agent has.
        </p>
        <PromptBox prompt={`Help me decide: should I prepay my home loan or invest the surplus?\n\nMy details:\n- Outstanding loan: ₹[amount] at [rate]% for [years] left\n- Monthly surplus I can use: ₹[amount]\n- I'm in the [old/new] tax regime\n\n1. Compare prepaying vs investing that surplus in an equity SIP (assume ~11% return), after tax.\n2. Factor in the home-loan interest deduction if it applies.\n3. Give me the break-even return — above which investing wins.\n4. Give a clear recommendation for my situation, and when you'd change it.`} />
        <p className="mt-4 text-sm text-ink-soft">
          Then verify with the{" "}
          <Link href="/comparisons/loan-prepayment-vs-investing" className="font-semibold text-brand hover:underline">prepay vs invest comparison</Link> and{" "}
          <Link href="/calculators/rent-vs-buy" className="font-semibold text-brand hover:underline">rent vs buy calculator</Link>.
        </p>
      </section>

      <section>
        <GuideH2>4. Plan and simplify your taxes</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Claude can explain which tax regime fits you, where your deductions are going to waste, and what a salary restructure does — in plain English. Give it your income and investments and it will walk through the comparison. (Always confirm the final number against an official calculator before you file.)
        </p>
        <PromptBox prompt={`I earn ₹[annual CTC] a year in India, FY 2026-27. My deductions: 80C ₹[amount], 80D ₹[amount], HRA/rent ₹[amount], home-loan interest ₹[amount].\n\n1. Compare my tax under the new vs old regime, step by step with the slabs and the Section 87A rebate.\n2. Tell me which regime saves more and by how much.\n3. If I'm in the old regime, suggest the most efficient way to use any 80C headroom I have left.\nShow the maths and keep it simple.`} />
        <p className="mt-4 text-sm text-ink-soft">
          Confirm the figure with the{" "}
          <Link href="/calculators/income-tax" className="font-semibold text-brand hover:underline">income tax calculator</Link> and the{" "}
          <Link href="/tax-regime-break-even" className="font-semibold text-brand hover:underline">old vs new break-even</Link>.
        </p>
      </section>

      <section>
        <GuideH2>5. Build your own finance tracker or dashboard</GuideH2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          This is where Claude goes beyond chat. With Claude&rsquo;s projects, Skills, or Claude Code, people build a personal finance system that remembers their accounts and goals, imports transactions, and produces a monthly report — a &ldquo;financial health score,&rdquo; cash-flow breakdown and a plan. You can connect live data through MCP so it reads real figures instead of pasted text.
        </p>
        <PromptBox prompt={`I want to build a simple personal finance tracker I can reuse every month.\n\n1. Design a spreadsheet structure (sheets + columns) for income, expenses, investments and net worth.\n2. Give me a monthly review checklist you'll run each time I paste my latest numbers.\n3. Define a simple "financial health score" (0–100) from savings rate, emergency fund, debt and investing, and how to calculate it.\n4. Produce a template monthly report I can fill in.\nKeep it beginner-friendly and India-aware (SIP, PPF, EPF).`} />
        <p className="mt-4 text-sm text-ink-soft">
          To let Claude read live data, see{" "}
          <Link href="/ai-tools/what-is-mcp" className="font-semibold text-brand hover:underline">what MCP is</Link> and{" "}
          <Link href="/ai-tools/mcp-use-cases" className="font-semibold text-brand hover:underline">what MCP can do</Link>.
        </p>
      </section>

      <section>
        <GuideH2>Get the best results — and the limits</GuideH2>
        <ul className="mt-4 space-y-2.5 text-ink-soft">
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Give it your real numbers and the current rates.</strong> Claude&rsquo;s training has a cutoff, so paste today&rsquo;s interest rate, tax slab or NAV rather than trusting its memory.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Ask it to show the maths.</strong> That lets you spot an error — and verify the final figure on a rule-checked calculator.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">Redact anything sensitive.</strong> Amounts and categories are enough; never share account numbers, PAN, Aadhaar or passwords.</span></li>
          <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><strong className="text-ink">It is not a licensed adviser.</strong> Use it to understand and plan, then confirm big moves with a SEBI-registered adviser or a qualified professional.</span></li>
        </ul>
      </section>
    </AiGuidePage>
  );
}
