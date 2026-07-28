import type { Metadata } from "next";
import IncomePercentile from "@/components/tools/IncomePercentile";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Are You Rich? Income Percentile Calculator" },
  description:
    "See where your income ranks. Enter your salary and country to estimate your income percentile and find out if you're rich by local standards.",
  alternates: { canonical: "/tools/are-you-rich" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/are-you-rich",
    title: "Are You Rich? Income Percentile Calculator",
    description:
      "Enter your income and country to estimate your income percentile — and find out where you rank versus everyone else.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Are You Rich? Income Percentile Calculator",
      },
    ],
  },
};

const faqData = [
  {
    q: "What does an income percentile actually mean?",
    a: "Your income percentile is the share of people who earn less than you. If you're in the 80th percentile, you earn more than roughly 80% of earners in that country — and are in the top 20%. It's a way to see where your salary sits in the bigger picture.",
  },
  {
    q: "How accurate are these numbers?",
    a: "They're deliberately rough. The reference points are round, approximate figures loosely based on public income data for individual pre-tax income. Real distributions differ by source, year and how income is defined, so treat your result as a fun ballpark rather than an exact or official ranking.",
  },
  {
    q: "Does a high income mean I'm rich?",
    a: "Not on its own. Income is what you earn; wealth is what you keep — savings, investments, property and other assets minus debt. Two people on the same salary can have completely different net worth. Cost of living, family size and location matter just as much.",
  },
  {
    q: "Is this based on individual or household income?",
    a: "The estimates are for individual (personal) income, not combined household income. If you want a household comparison, add up everyone's income — but remember these tables are built for single earners, so the ranking will be approximate.",
  },
  {
    q: "Why does the same salary rank differently across countries?",
    a: "Because typical incomes differ hugely between countries. A salary that's top-10% in India might be around the median in the United States once you convert it, simply because average earnings and prices are different. That's why we ask for your country before ranking you.",
  },
  {
    q: "What countries are supported?",
    a: "The tool includes India, the United States, the United Kingdom, Canada, Australia and several other countries where sufficient public income distribution data is available. More countries are added as reference data becomes accessible and verifiable.",
  },
  {
    q: "Is my income data stored or shared?",
    a: "No. Your salary is processed entirely in your browser and never leaves your device. There are no accounts, no servers and no tracking — the calculation runs locally and nothing you enter is recorded or transmitted anywhere.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
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
        name: "Are You Rich?",
        item: `${site.url}/tools/are-you-rich`,
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
        title="Are You Rich?"
        description="Enter your income and country to estimate your income percentile — and see how you rank against everyone else. Everything runs in your browser; nothing is uploaded."
        howToUse={[
          {
            step: "Enter your annual income",
            detail:
              "Type your pre-tax personal income. If you are paid monthly, multiply your monthly salary by 12. If you are paid weekly, multiply by 52. The tool converts everything to an annual figure for comparison against the reference data.",
          },
          {
            step: "Select your country",
            detail:
              "Pick your country from the dropdown list. Income distributions vary enormously between countries — the same salary can rank in the top 10% in one country and around the median in another — so this is essential for an accurate comparison.",
          },
          {
            step: "See your income percentile",
            detail:
              "The tool estimates where your income ranks in the selected country. For example, a result of 80th percentile means you earn more than roughly 80% of individual earners — placing you in the top 20% of that population.",
          },
          {
            step: "Read the context card",
            detail:
              "Below your percentile, a plain-language explanation describes what your rank means — whether it is considered low, middle, upper-middle or top-earner in your country — along with perspective on what the number does and does not tell you.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Curiosity about where you stand",
            detail:
              "Ever wondered how your salary really compares to everyone else around you, not just your immediate circle? This gives you a data-backed answer in seconds with no account or sign-up required.",
          },
          {
            scenario: "Evaluating a job offer or career move",
            detail:
              "See how a proposed salary stacks up against the broader population in your country before you negotiate. It provides objective context that goes beyond industry averages.",
          },
          {
            scenario: "Understanding income inequality across borders",
            detail:
              "Compare what the same absolute salary means in different countries. A number that feels modest in one place can represent a completely different standard of living and social standing elsewhere.",
          },
        ]}
        howItWorks="The calculator stores a small set of approximate reference points for each supported country — rough income figures for the 10th, 25th, 50th (median), 75th, 90th, 95th and 99th percentiles, based on publicly available income distribution data from sources like national statistics offices and global databases. When you enter a salary, the tool converts it to an annual figure, finds which two reference points bracket your income, and interpolates between them to estimate your percentile. The result is deliberately presented as an approximation — useful for a general sense of where you stand, not for official or precise financial rankings."
        tips={[
          "Use individual income, not household income — the reference data is based on personal earnings. Including a partner's or family member's salary will overstate your percentile.",
          "Enter pre-tax (gross) income — the distribution data reflects earnings before tax and deductions, so entering your net take-home pay will underestimate your true rank.",
          "Remember that income and wealth are not the same — a high income percentile does not mean you are rich if you carry high expenses, debt or live in an expensive area. Your net worth tells a different story.",
          "Cost of living changes the practical picture — the same salary goes much further in a small town than in a major metro city. The percentile compares you nationally, not locally, so adjust your interpretation accordingly.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Income Tax Calculator", href: "/calculators/income-tax" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "Compound Interest Calculator", href: "/calculators/compound-interest" },
          { label: "All tools", href: "/tools" },
        ]}
      >
        <IncomePercentile />
      </ToolPageLayout>
    </>
  );
}
