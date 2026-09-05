import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { newsArticles } from "@/lib/newsArticles";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { INHAND_SLUGS } from "@/lib/pseo-inhand";
import { FD_SLUGS } from "@/lib/pseo-fd";
import { GLOSSARY } from "@/lib/glossary";

// Noindex by design: programmatic pages (AdSense Phase 3), thin utility tools.
// "/sip/" covers both slug shapes now served by app/sip/[slug]: the amount
// pages and the amount×duration pages that used to live at /sip-returns/*.
// The /sip hub itself is unaffected: "/sip" does not start with "/sip/".
const NOINDEX_SECTIONS = ["/sip/"];
const NOINDEX_TOOLS = new Set([
  "color-picker", "base64", "url-encode-decode", "json-formatter",
  "case-converter", "character-counter", "word-counter", "text-compare",
  "remove-duplicate-lines", "image-to-base64", "stopwatch-timer",
  "countdown-to-date", "favicon-generator", "number-to-words",
]);
const NOINDEX_CALCS = new Set(["bmi", "ideal-weight", "calorie", "pregnancy-due-date"]);

// Deleted/redirected tools (AdSense Phase 2.1)
const DELETED_TOOLS = new Set([
  "coin-flip", "random-number-generator", "random-wheel", "meme-generator", "lorem-ipsum-generator",
]);

function shouldIndex(path: string): boolean {
  if (NOINDEX_SECTIONS.some((s) => path.startsWith(s))) return false;
  const toolMatch = path.match(/^\/tools\/(.+)/);
  if (toolMatch && (NOINDEX_TOOLS.has(toolMatch[1]) || DELETED_TOOLS.has(toolMatch[1]))) return false;
  const calcMatch = path.match(/^\/calculators\/(.+)$/);
  if (calcMatch && NOINDEX_CALCS.has(calcMatch[1])) return false;
  return true;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { path: string; lastmod?: string }[] = [];

  // Static pages
  const staticPaths = [
    "", "/calculators", "/tools", "/glossary", "/resume-builder", "/ai-assistant",
    "/ai-tools", "/news", "/blog", "/sip", "/income-tax", "/investing",
    "/loans", "/savings", "/retirement", "/budgeting", "/credit-score", "/gold",
    "/about", "/tax-regime-break-even", "/editorial-standards",
    "/affiliate-disclosure", "/contact", "/privacy", "/disclaimer", "/terms",
    "/methodology", "/corrections", "/authors/sahil",
  ];
  // NOTE: /search is deliberately absent because app/search/page.tsx sets
  // robots.index=false, and listing a noindex URL in the sitemap is a
  // contradictory signal that shows up in GSC as "Submitted URL marked
  // noindex". It stays crawlable and linkable, just not submitted.
  entries.push(...staticPaths.map((p) => ({ path: p })));

  // Live calculators (Health ones excluded by live:false)
  calculators.filter((c) => c.live).forEach((c) => entries.push({ path: `/calculators/${c.slug}` }));

  // Blog posts
  posts.forEach((p) => entries.push({ path: `/blog/${p.slug}`, lastmod: p.date }));

  // News explainers
  newsArticles.forEach((a) => entries.push({ path: `/news/${a.slug}`, lastmod: a.date }));

  // AI tool details
  aiToolDetails.forEach((d) => entries.push({ path: `/ai-tools/${d.slug}` }));

  // Keeper tool pages (excluding deleted + noindex)
  const keeperTools = [
    "compress-image", "image-converter", "image-to-pdf", "merge-pdf",
    "split-pdf", "rotate-pdf", "organize-pdf", "resize-image",
    "crop-image", "rotate-image",
    "ai-summarizer", "ai-paraphraser", "ai-grammar-checker",
    "ai-email-writer", "ai-business-name-generator", "ai-caption-generator",
    "password-generator", "qr-code-generator", "unit-converter",
    "invoice-generator", "budget-planner", "are-you-rich",
    "scientific-calculator", "gpa-calculator",
  ];
  keeperTools.forEach((s) => entries.push({ path: `/tools/${s}` }));

  // PSEO routes. The /sip/* programmatic pages are excluded by
  // NOINDEX_SECTIONS above, so they are not listed here.
  TAX_SLUGS.forEach((s) => entries.push({ path: `/income-tax/${s}` }));
  PAIR_SLUGS.forEach((s) => entries.push({ path: `/currency/${s}` }));
  INHAND_SLUGS.forEach((s) => entries.push({ path: `/in-hand-salary/${s}` }));
  FD_SLUGS.forEach((s) => entries.push({ path: `/calculators/fd/${s}` }));
  GLOSSARY.forEach((g) => entries.push({ path: `/glossary/${g.slug}` }));

  // Filter: only include indexable URLs
  const filtered = entries.filter((e) => shouldIndex(e.path));

  const STATIC_PAGES = new Set([
    "/about", "/privacy", "/disclaimer", "/terms", "/methodology",
    "/corrections", "/editorial-standards", "/affiliate-disclosure",
    "/contact", "/authors/sahil",
  ]);

  return filtered.map((entry) => {
    const p = entry.path;
    const isStatic = STATIC_PAGES.has(p);
    const isHome = p === "";
    const isCalc = p.startsWith("/calculators");
    const isBlog = p.startsWith("/blog");
    const isGlossary = p.startsWith("/glossary");
    const isAiTool = p.startsWith("/ai-tools");
    const isNews = p.startsWith("/news");

    const changeFrequency: "daily" | "weekly" | "monthly" | "yearly" =
      isHome ? "daily" :
      isBlog || isNews ? "monthly" :
      isCalc || isGlossary || isAiTool ? "weekly" :
      isStatic ? "yearly" :
      "weekly";

    const priority =
      isHome ? 1.0 :
      isCalc || isBlog ? 0.9 :
      isGlossary || isAiTool || isNews ? 0.8 :
      isStatic ? 0.3 :
      0.7;

    return {
      url: `${site.url}${p}`,
      lastModified: entry.lastmod ? new Date(entry.lastmod) : new Date("2026-09-05"),
      changeFrequency,
      priority,
    };
  });
}
