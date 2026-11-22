import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { calculators, posts, NOINDEX_POST_SLUGS } from "@/lib/data";
import { newsArticles } from "@/lib/newsArticles";
import { INHAND_SLUGS, parseLpaSlug } from "@/lib/pseo-inhand";
import { GOLD_CITY_SLUGS } from "@/lib/gold-data";
import { FUEL_CITY_SLUGS } from "@/lib/fuel-data";
import { GLOSSARY } from "@/lib/glossary";
import { aiToolDetails } from "@/lib/aiToolDetails";

// Noindex sections: programmatic and auxiliary directories excluded from sitemap submission.
const NOINDEX_SECTIONS = [
  "/sip/",
  "/currency/",
  "/income-tax/",
  "/calculators/fd/",
  "/diesel-price/",
  "/finance-prompts/",
];

const FINANCE_TOOLS = new Set([
  "invoice-generator",
  "budget-planner",
  "are-you-rich",
  "scientific-calculator",
]);

const TOP_INHAND_LPA = new Set([
  3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 10.5, 11.5, 12, 14.5, 15, 15.5, 17.5, 18,
  18.5, 20, 25, 30, 34, 36, 38, 42, 50, 55, 65,
]);

function shouldIndex(path: string): boolean {
  if (NOINDEX_SECTIONS.some((s) => path.startsWith(s))) return false;
  const toolMatch = path.match(/^\/tools\/(.+)/);
  if (toolMatch && !FINANCE_TOOLS.has(toolMatch[1])) return false;
  return true;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { path: string; lastmod?: string }[] = [];

  // Core static & hub pages (focus on Indian personal finance authority)
  const staticPaths = [
    "",
    "/calculators",
    "/tools",
    "/glossary",
    "/news",
    "/blog",
    "/sip",
    "/income-tax",
    "/investing",
    "/loans",
    "/savings",
    "/retirement",
    "/budgeting",
    "/credit-score",
    "/gold",
    "/gold-rate",
    "/silver-rate",
    "/petrol-price",
    "/about",
    "/widgets",
    "/tax-regime-break-even",
    "/editorial-standards",
    "/affiliate-disclosure",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/terms",
    "/methodology",
    "/corrections",
    "/authors/sahil",
    // Hubs
    "/finance-today",
    "/research",
    "/comparisons",
    // IPO tracker
    "/ipos",
    "/ipos/ntpc-green-energy-ipo",
    "/ipos/nse-ipo",
    "/ipos/reliance-jio-ipo",
    "/ipos/jio-ipo-gmp-today",
    "/ipos/jio-ipo-allotment-status",
    "/ipos/zepto-ipo",
    "/ipos/ss-retail-ipo",
    "/ipos/oyo-ipo",
    "/ipos/hero-fincorp-ipo",
    "/ipos/phonepe-ipo",
    "/ipos/eaaa-india-alternatives-ipo",
    "/ipos/sfc-environmental-technologies-ipo",
    "/ipos/razorpay-ipo",
    // Evergreen IPO hubs
    "/ipos/ipo-gmp-today",
    "/ipos/upcoming-ipo",
    "/ipos/best-upcoming-ipos-2026",
    "/ipos/sme-ipo",
    "/ipos/mainboard-vs-sme-ipo",
    "/ipos/ipo-allotment-status",
    // Trust & Transparency
    "/editorial-policy",
    "/financial-review-process",
    "/sources",
    // Research data pages
    "/research/ppf-rate-history",
    "/research/epf-rate-history",
    "/research/income-tax-slabs-history",
    "/research/rbi-repo-rate-history",
    // Comparisons
    "/comparisons/sip-vs-fd",
    "/comparisons/sip-vs-lumpsum",
    "/comparisons/ppf-vs-fd",
    "/comparisons/ppf-vs-nps",
    "/comparisons/old-vs-new-tax-regime",
    "/comparisons/nps-vs-epf",
    "/comparisons/mutual-fund-vs-stocks",
    "/comparisons/elss-vs-ppf",
    "/comparisons/nps-tier-1-vs-tier-2",
    "/comparisons/loan-prepayment-vs-investing",
    "/comparisons/fd-vs-debt-mutual-fund",
    "/comparisons/term-vs-ulip-vs-endowment",
    "/comparisons/floater-vs-individual-health-insurance",
  ];

  entries.push(...staticPaths.map((p) => ({ path: p })));

  // Live financial calculators
  calculators
    .filter((c) => c.live)
    .forEach((c) => entries.push({ path: `/calculators/${c.slug}` }));

  // Editorial blog posts
  posts
    .filter((p) => !NOINDEX_POST_SLUGS.has(p.slug))
    .forEach((p) => entries.push({ path: `/blog/${p.slug}`, lastmod: p.date }));

  // News explainers
  newsArticles.forEach((a) => entries.push({ path: `/news/${a.slug}`, lastmod: a.date }));

  // Finance-relevant browser tools
  FINANCE_TOOLS.forEach((t) => entries.push({ path: `/tools/${t}` }));

  // In-hand salary calculation pages (all salary bands)
  INHAND_SLUGS.forEach((s) => entries.push({ path: `/in-hand-salary/${s}` }));

  // Gold & petrol rates by city
  GOLD_CITY_SLUGS.forEach((s) => entries.push({ path: `/gold-rate/${s}` }));
  FUEL_CITY_SLUGS.forEach((s) => entries.push({ path: `/petrol-price/${s}` }));

  // Personal finance glossary terms (Crypto terms excluded from sitemap to prevent dilution)
  GLOSSARY.filter((g) => g.category !== "Crypto").forEach((g) =>
    entries.push({ path: `/glossary/${g.slug}` })
  );

  // AI tool reviews & directories (high-intent Indian AI queries)
  aiToolDetails.forEach((t) => entries.push({ path: `/ai-tools/${t.slug}` }));

  // Filter out any paths matching noindex criteria and deduplicate
  const filtered = entries.filter((e) => shouldIndex(e.path));
  const seen = new Set<string>();
  const uniqueFiltered: typeof filtered = [];
  for (const item of filtered) {
    if (!seen.has(item.path)) {
      seen.add(item.path);
      uniqueFiltered.push(item);
    }
  }

  const STATIC_PAGES = new Set([
    "/about",
    "/privacy",
    "/disclaimer",
    "/terms",
    "/methodology",
    "/corrections",
    "/editorial-standards",
    "/affiliate-disclosure",
    "/contact",
    "/authors/sahil",
  ]);

  return uniqueFiltered.map((entry) => {
    const p = entry.path;
    const isStatic = STATIC_PAGES.has(p);
    const isHome = p === "";
    const isCalc = p.startsWith("/calculators");
    const isBlog = p.startsWith("/blog");
    const isGlossary = p.startsWith("/glossary");
    const isNews = p.startsWith("/news");
    const isAi = p.startsWith("/ai-tools");

    const changeFrequency: "daily" | "weekly" | "monthly" | "yearly" =
      isHome
        ? "daily"
        : isBlog || isNews
        ? "monthly"
        : isCalc || isGlossary || isAi
        ? "weekly"
        : isStatic
        ? "yearly"
        : "weekly";

    const priority =
      isHome
        ? 1.0
        : isCalc || isBlog
        ? 0.9
        : isGlossary || isNews || isAi
        ? 0.8
        : isStatic
        ? 0.3
        : 0.7;

    // Honest lastmod: use the real content date when we have one (blog/news),
    // a current date for the home page and the actively-maintained IPO tracker,
    // and OMIT lastmod entirely for pages whose true edit date we do not track.
    // A single hardcoded date stamped across hundreds of URLs is a weak/suspect
    // freshness signal, so no lastmod is better than a fake uniform one.
    const lastModified = entry.lastmod
      ? new Date(entry.lastmod)
      : p === "" || p.startsWith("/ipos")
        ? new Date("2026-10-25")
        : undefined;

    return {
      url: `${site.url}${p}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
    };
  });
}
