import type { Metadata } from "next";
import BudgetPlanner from "@/components/tools/BudgetPlanner";
import { ToolPageLayout } from "@/components/ToolPageLayout";
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
    a: "Start with your take-home income, then list every regular expense — rent or EMI, groceries, bills, transport, discretionary spending and the money you deliberately set aside to invest or save. Subtract your total expenses from your income to see what is left over. If the number is positive you have room to save more; if it is negative your spending has outrun your earnings and something needs to be cut. This planner does all the arithmetic live as you type, so you can experiment and see the effect of each change immediately.",
  },
  {
    q: "What is the 50/30/20 budget rule?",
    a: "It is a simple guideline that splits your take-home pay into three buckets: roughly 50% for needs (housing, food, utilities, transport, healthcare), 30% for wants (dining out, shopping, entertainment, subscriptions) and 20% for savings (investments, an emergency fund, paying down debt). Tag each expense in the planner as a Need, Want or Save and the visual breakdown shows how your real spending compares with the rule-of-thumb targets, with any unspent money automatically counted toward savings.",
  },
  {
    q: "What is a good savings rate?",
    a: "Saving 20% of your income is the classic personal-finance target, but any consistent saving is genuine progress. If you can push beyond 20% you will build wealth and reach your goals faster. The planner counts both your explicit savings category and any money left over at the end of the month toward your effective savings rate, so you see the full picture.",
  },
  {
    q: "Is my budget data private?",
    a: "Yes. Everything runs in your browser and your budget is saved only to your own device using the browser's local storage. Nothing is uploaded to a server, so your income figures and expense breakdowns never leave your computer or phone. The tool also works offline once the page has loaded.",
  },
  {
    q: "What should I do if my expenses are more than my income?",
    a: "The planner flags a deficit in red so you cannot miss it. Focus your cuts first on your largest wants — dining out, shopping, and subscriptions are usually the easiest categories to trim without hurting your quality of life. If your needs alone already exceed your income, look at bigger structural moves such as reducing your housing cost, refinancing high-interest loans, or finding ways to increase your earnings. The goal is to get back to a positive number before you add any new recurring spending.",
  },
  {
    q: "How often should I review my budget?",
    a: "A monthly review is the sweet spot for most people — frequent enough to catch creeping spending early, but not so frequent that it becomes a chore. Pick a regular day, such as the first Sunday of each month, and spend fifteen minutes comparing your actual spending against the plan. Adjust categories that consistently run over budget and redirect any surplus toward your highest-priority goal.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ToolPageLayout
        title="Budget Planner"
        description="Enter your monthly income and every recurring expense to see exactly what is left to save, your effective savings rate, and a live 50/30/20 breakdown that shows how your real spending compares with a healthy budget. All your numbers stay private in your browser — nothing is ever uploaded or stored on a server."
        howToUse={[
          {
            step: "Enter your monthly take-home income",
            detail: "Start with the amount that actually lands in your bank account each month, not your gross salary. This is your income after tax, provident fund deductions, insurance premiums, and any other automatic deductions. Using your take-home figure rather than your headline salary ensures your budget reflects the money you can actually spend and save.",
          },
          {
            step: "List every regular expense",
            detail: "Go through your bank statement from the last two or three months and write down every recurring outgoing. Include housing costs like rent or EMI, utility bills, groceries, transport, insurance premiums, loan repayments, subscriptions, and the money you deliberately set aside each month for investing or saving. Be thorough — small, regular expenses like a streaming subscription or a daily coffee add up to significant amounts over a month.",
          },
          {
            step: "Tag each expense as a Need, Want, or Save",
            detail: "For every expense line you add, use the tag dropdown to mark it as a Need (essentials you cannot skip), a Want (lifestyle spending that improves your quality of life), or Save (money directed toward investments, an emergency fund, or debt repayment beyond the minimum). This tagging drives the automatic 50/30/20 comparison bars, so tag honestly — classing a weekend takeaway as a \"Need\" will give you a misleading picture.",
          },
          {
            step: "Review the savings rate and surplus",
            detail: "As you type, three key numbers update live: your total spending, the amount left over after all expenses, and your effective savings rate as a percentage of income. The savings rate counts both your explicit Save category and any leftover surplus. A green number means you are in surplus; a red number means you are spending more than you earn and need to trim some categories.",
          },
          {
            step: "Adjust your plan and recheck",
            detail: "If your surplus is smaller than you would like, start trimming from the Wants column first — these are the easiest expenses to reduce without affecting your basic standard of living. Try cancelling one unused subscription, cooking a couple more meals at home, or setting a monthly cap on discretionary shopping. Re-run the numbers each month, especially when your income changes or a major expense like rent adjusts, and redirect any new surplus toward your savings goals.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are trying to figure out where your money goes each month",
            detail: "Many people reach the end of the month surprised by how little is left without being able to point to any single obvious overspend. A budget planner forces you to list every outgoing, which surfaces the small, frequent expenses that quietly eat into your surplus — subscriptions you forgot about, delivery fees, impulse purchases. Seeing the monthly total of each category is often enough to change behaviour immediately.",
          },
          {
            scenario: "You are saving toward a specific goal",
            detail: "Whether it is an emergency fund of six months' expenses, a home down payment, a wedding, or an international trip, a tangible savings goal needs a realistic timeline. By lining up your income against your expenses, you can calculate exactly how many months it will take to hit your target at your current savings rate — and then decide whether to cut spending, increase income, or adjust the timeline.",
          },
          {
            scenario: "Your income or expenses have recently changed",
            detail: "A new job, a raise, a rent increase, the arrival of a baby, or paying off a loan all shift the financial ground under you. Running your numbers through a budget planner after any major change ensures your spending and saving habits match your new reality rather than drifting on autopilot. It is the fastest way to confirm that you are still on track — or to course-correct before a small drift becomes a large problem.",
          },
        ]}
        howItWorks="This budget planner runs entirely in your browser using JavaScript and the browser's local storage for persistence. You enter your monthly take-home income at the top, then add individual expense lines — each with a name, a monthly amount, and a tag marking it as a Need, Want, or Save. The tool instantly calculates your total expenses, your surplus or deficit, and your effective savings rate as a percentage of income. It also draws live 50/30/20 comparison bars that show how your real split of Needs, Wants, and Savings compares with the rule-of-thumb ideal. All arithmetic happens on your device with no server calls, and your data is saved to local storage so you can close the page and return later without losing your work."
        tips={[
          "Use your take-home pay, not your gross salary. Your budget should be built on the money that actually reaches your bank account after tax, deductions, and contributions. Basing your plan on a larger headline figure that you never see will make every category feel affordable until the end of the month proves otherwise.",
          "Track irregular expenses with an annual average. Costs like car maintenance, annual insurance premiums, holiday gifts, or school fees arrive in lump sums but are entirely predictable. Estimate what you spend in a year on each and divide by twelve to turn them into a monthly budget line. This prevents surprise expenses from blowing a hole in a single month.",
          "Automate your savings on payday. Set up a recurring transfer that moves your target savings amount into a separate account or investment the moment your salary arrives. Money you do not see in your main account is far less likely to be spent, and automation removes the willpower required to save manually each month.",
          "Review your subscriptions every quarter. Streaming services, apps, gym memberships, and cloud storage plans often renew quietly long after you stop using them. A quarterly audit through your bank statement or payment history usually finds at least one charge you can cancel, freeing up money for categories that matter more.",
          "Do not aim for a perfect budget on your first attempt. The goal of a budget is not to predict every rupee to the last decimal — it is to build awareness and make intentional choices. Start with rough estimates, check against your actual spending after a month, and refine. A budget you stick to loosely beats a perfect one you abandon after two weeks.",
        ]}
        faqs={faqs}
        relatedTools={[
          { label: "Invoice Generator", href: "/tools/invoice-generator" },
          { label: "Resume Builder", href: "/resume-builder" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
          { label: "Password Generator", href: "/tools/password-generator" },
        ]}
        disclaimerType="general"
      >
        <BudgetPlanner />
      </ToolPageLayout>
    </>
  );
}
