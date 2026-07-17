import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { SIP_SLUGS } from "@/lib/pseo-sip";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculators",
    "/tools",
    "/resume-builder",
    "/tools/compress-image",
    "/tools/image-converter",
    "/tools/image-to-pdf",
    "/tools/merge-pdf",
    "/tools/ai-summarizer",
    "/tools/ai-paraphraser",
    "/tools/ai-grammar-checker",
    "/tools/ai-email-writer",
    "/tools/ai-business-name-generator",
    "/tools/ai-caption-generator",
    "/tools/word-counter",
    "/tools/case-converter",
    "/tools/password-generator",
    "/tools/qr-code-generator",
    "/tools/unit-converter",
    "/tools/invoice-generator",
    "/tools/budget-planner",
    "/tools/are-you-rich",
    "/ai-assistant",
    "/ai-tools",
    "/news",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/terms",
  ];

  const calcRoutes = calculators
    .filter((c) => c.live)
    .map((c) => `/calculators/${c.slug}`);

  const blogRoutes = posts.map((p) => `/blog/${p.slug}`);

  const toolRoutes = aiToolDetails.map((d) => `/ai-tools/${d.slug}`);

  // Programmatic SEO landing pages (long-tail, high-intent).
  const pseoRoutes = [
    ...TAX_SLUGS.map((s) => `/income-tax/${s}`),
    ...PAIR_SLUGS.map((s) => `/currency/${s}`),
    ...SIP_SLUGS.map((s) => `/sip/${s}`),
  ];

  const all = [
    ...staticRoutes,
    ...calcRoutes,
    ...blogRoutes,
    ...toolRoutes,
    ...pseoRoutes,
  ];

  return all.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/news" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/calculators/") ? 0.9 : 0.7,
  }));
}
