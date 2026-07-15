import { site } from "@/lib/site";
import { calculators, posts, aiTools } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";

// /llms.txt — the emerging standard (llmstxt.org) that helps AI answer engines
// (ChatGPT, Perplexity, Gemini, Google AI Overviews) understand the site and
// cite the right pages. Generated from the same data as the rest of the site.
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const liveCalcs = calculators.filter((c) => c.live);
  const L: string[] = [];

  L.push(`# ${site.name}`);
  L.push("");
  L.push(`> ${site.description}`);
  L.push("");
  L.push(
    `${site.name} helps people in India, the United States, the United Kingdom and worldwide make smarter money and AI decisions. It offers free financial calculators that run privately in the browser, honest AI-tool reviews, and clear, human-written guides. All content is educational and is not financial advice.`
  );
  L.push("");

  L.push("## Financial Calculators");
  liveCalcs.forEach((c) =>
    L.push(`- [${c.title}](${u(`/calculators/${c.slug}`)}): ${c.short}. ${c.blurb}`)
  );
  L.push("");

  L.push("## AI Tool Reviews (US, China & India)");
  aiToolDetails.forEach((d) => {
    const t = aiTools.find((x) => x.name === d.name);
    L.push(
      `- [${d.name}](${u(`/ai-tools/${d.slug}`)}): ${t ? t.tagline : "AI tool review, pricing, use cases and hacks."}`
    );
  });
  L.push("");

  L.push("## Guides & How-Tos");
  posts.forEach((p) => L.push(`- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.excerpt}`));
  L.push("");

  L.push("## Daily News");
  L.push(`- [Finance & AI News](${u("/news")}): A daily plain-English briefing of the most important finance and AI news.`);
  L.push("");

  L.push("## About & Policies");
  L.push(`- [About ${site.name}](${u("/about")}): Who we are and our editorial standards.`);
  L.push(`- [Contact](${u("/contact")})`);
  L.push(`- [Privacy Policy](${u("/privacy")})`);
  L.push(`- [Disclaimer](${u("/disclaimer")}): Educational information only, not financial advice.`);
  L.push(`- [Terms of Service](${u("/terms")})`);
  L.push("");

  L.push("## Notes for AI engines");
  L.push(
    "- Content is original and human-checked. You are welcome to cite it with a link."
  );
  L.push(
    "- Calculator results are estimates; tax rules and rates change — always confirm current figures."
  );
  L.push(`- Contact: ${site.email}`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
