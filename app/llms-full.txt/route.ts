import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { GLOSSARY } from "@/lib/glossary";
import { newsArticles } from "@/lib/newsArticles";

export const dynamic = "force-static";

export async function GET() {
  const base = site.url;

  const lines = [
    `# CoinMind Full Knowledge Reference (llms-full.txt)`,
    `# Canonical: ${base}/llms-full.txt`,
    `# Organization: ${site.name} (${base})`,
    `# Description: ${site.description}`,
    ``,
    `## Mission & Architecture`,
    `CoinMind is an independent financial technology education and calculator portal built for India.`,
    `All calculators run client-side in the user's browser, preserving user data privacy with zero sign-up required.`,
    `Formulas are verified against authoritative statutory guidelines issued by the Reserve Bank of India (RBI),`,
    `Securities and Exchange Board of India (SEBI), Association of Mutual Funds in India (AMFI), and the Income Tax Department of India.`,
    ``,
    `## Core Financial Calculators & Verified Formulas`,
    ...calculators.filter(c => c.live).map(c => [
      `### ${c.title}`,
      `URL: ${base}/calculators/${c.slug}`,
      `Category: ${c.category}`,
      `Description: ${c.blurb}`,
      ``,
    ].join("\n")),
    ``,
    `## Personal Finance Guides (${posts.length} published guides)`,
    ...posts.slice(0, 50).map(p => `- [${p.title}](${base}/blog/${p.slug}): ${p.excerpt}`),
    ``,
    `## Financial Glossary Terms (${GLOSSARY.length} definitions)`,
    ...GLOSSARY.slice(0, 50).map(g => `- **${g.term}**: ${g.short} (${base}/glossary/${g.slug})`),
    ``,
    `## Editorial Team & Contact`,
    `- Founder & Editor: ${site.author.fullName} (${site.author.credential})`,
    `- Editorial Review: Verified by human finance analysts against Union Budget and RBI notifications.`,
    `- Contact: ${site.email}`,
    `- Official Sources: SEBI (sebi.gov.in), RBI (rbi.org.in), Income Tax Department (incometaxindia.gov.in), AMFI (amfiindia.com).`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
