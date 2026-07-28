import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { SIP_SLUGS } from "@/lib/pseo-sip";
import { SIP_YEAR_SLUGS } from "@/lib/pseo-sip-years";
import { INHAND_SLUGS } from "@/lib/pseo-inhand";
import { FD_SLUGS } from "@/lib/pseo-fd";
import { GLOSSARY } from "@/lib/glossary";

const d = new Date("2026-07-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "daily" },
    { path: "/calculators", priority: 0.9, freq: "weekly" },
    { path: "/tools", priority: 0.9, freq: "weekly" },
    { path: "/glossary", priority: 0.8, freq: "weekly" },
    { path: "/resume-builder", priority: 0.8, freq: "weekly" },
    { path: "/ai-assistant", priority: 0.8, freq: "weekly" },
    { path: "/ai-tools", priority: 0.7, freq: "weekly" },
    { path: "/news", priority: 0.7, freq: "daily" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/sip", priority: 0.9, freq: "weekly" },
    { path: "/income-tax", priority: 0.9, freq: "weekly" },
    { path: "/investing", priority: 0.9, freq: "weekly" },
    { path: "/loans", priority: 0.8, freq: "weekly" },
    { path: "/savings", priority: 0.8, freq: "weekly" },
    { path: "/retirement", priority: 0.8, freq: "weekly" },
    { path: "/budgeting", priority: 0.7, freq: "weekly" },
    { path: "/credit-score", priority: 0.7, freq: "weekly" },
    { path: "/gold", priority: 0.7, freq: "weekly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
    { path: "/tax-regime-break-even", priority: 0.8, freq: "weekly" },
    { path: "/search", priority: 0.3, freq: "monthly" },
    { path: "/editorial-standards", priority: 0.4, freq: "monthly" },
    { path: "/affiliate-disclosure", priority: 0.3, freq: "monthly" },
    { path: "/contact", priority: 0.4, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "monthly" },
    { path: "/disclaimer", priority: 0.3, freq: "monthly" },
    { path: "/terms", priority: 0.3, freq: "monthly" },
  ];

  const calcRoutes = calculators
    .filter((c) => c.live)
    .map((c) => `/calculators/${c.slug}`);

  const blogRoutes = posts.map((p) => `/blog/${p.slug}`);

  const toolSlugs = [
    "compress-image", "image-converter", "image-to-pdf", "merge-pdf",
    "split-pdf", "rotate-pdf", "organize-pdf", "resize-image",
    "crop-image", "rotate-image", "favicon-generator", "meme-generator",
    "ai-summarizer", "ai-paraphraser", "ai-grammar-checker",
    "ai-email-writer", "ai-business-name-generator", "ai-caption-generator",
    "word-counter", "case-converter", "password-generator",
    "qr-code-generator", "unit-converter", "invoice-generator",
    "budget-planner", "are-you-rich", "number-to-words",
    "lorem-ipsum-generator", "text-compare", "remove-duplicate-lines",
    "json-formatter", "base64", "url-encode-decode",
    "stopwatch-timer", "countdown-to-date", "random-wheel",
    "coin-flip", "random-number-generator", "scientific-calculator",
    "gpa-calculator", "color-picker", "character-counter",
    "image-to-base64",
  ];

  const aiToolRoutes = aiToolDetails.map((d) => `/ai-tools/${d.slug}`);

  const pseoRoutes = [
    ...TAX_SLUGS.map((s) => `/income-tax/${s}`),
    ...PAIR_SLUGS.map((s) => `/currency/${s}`),
    ...SIP_SLUGS.map((s) => `/sip/${s}`),
    ...SIP_YEAR_SLUGS.map((s) => `/sip-returns/${s}`),
    ...INHAND_SLUGS.map((s) => `/in-hand-salary/${s}`),
    ...FD_SLUGS.map((s) => `/calculators/fd/${s}`),
    ...GLOSSARY.map((g) => `/glossary/${g.slug}`),
  ];

  const all = [
    ...staticRoutes,
    ...calcRoutes.map((p) => ({ path: p, priority: 0.9, freq: "weekly" as const })),
    ...blogRoutes.map((p) => ({ path: p, priority: 0.7, freq: "monthly" as const })),
    ...toolSlugs.map((s) => ({ path: `/tools/${s}`, priority: 0.7, freq: "monthly" as const })),
    ...aiToolRoutes.map((p) => ({ path: p, priority: 0.7, freq: "weekly" as const })),
    ...pseoRoutes.map((p) => ({ path: p, priority: 0.7, freq: "weekly" as const })),
  ];

  const postDateByPath = new Map(posts.map((p) => [`/blog/${p.slug}`, p.date]));

  return all.map((r) => {
    const postDate = postDateByPath.get(r.path);
    return {
      url: `${site.url}${r.path}`,
      lastModified: postDate ? new Date(postDate) : d,
      changeFrequency: r.freq,
      priority: r.priority,
    };
  });
}
