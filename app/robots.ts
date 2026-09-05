import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawl policy.
 *
 * Previously GPTBot and CCBot were allowed only on /blog/ and /glossary/ and
 * disallowed everywhere else, on the reasoning that an assistant can answer
 * from a calculator's explainer without sending anyone to the calculator.
 *
 * That reasoning holds for the interactive utilities and nothing else, and the
 * old rule was far broader than its stated intent: it also shut out the news
 * explainers, the AI tool reviews, the topic hubs and every programmatic guide,
 * which is most of the site's written content. It also contradicted
 * /llms.txt, which explicitly invites assistants to cite this site.
 *
 * The policy now matches the goal. AI crawlers have the same access as regular
 * crawlers (only /api/ blocked). The calculator and tool pages carry enough
 * explanatory prose that AI citations are valuable, and blocking those paths
 * caused audit tools to flag the site for restricting AI bot access.
 *
 * Named individually rather than with a wildcard because robots.txt matches a
 * user-agent by prefix, not by pattern, so an unlisted crawler silently falls
 * through to the "*" group.
 */
const AI_CRAWLERS = [
  "GPTBot",            // OpenAI, ChatGPT browsing and training
  "OAI-SearchBot",     // OpenAI, ChatGPT search
  "ChatGPT-User",      // OpenAI, user-initiated fetch
  "ClaudeBot",         // Anthropic
  "anthropic-ai",      // Anthropic, legacy token
  "Claude-Web",        // Anthropic, user-initiated fetch
  "PerplexityBot",     // Perplexity
  "Perplexity-User",   // Perplexity, user-initiated fetch
  "Google-Extended",   // Google, Gemini grounding (separate from Googlebot)
  "Applebot-Extended", // Apple Intelligence
  "CCBot",             // Common Crawl, feeds many downstream models
  "meta-externalagent",
  "Bytespider",
];

/**
 * Only the API. `/_next/` must stay crawlable: it holds the CSS and JS chunks
 * and the image optimizer, and Google needs all three to render the page it is
 * judging. Blocking it degrades rendering and Core Web Vitals assessment on
 * every route.
 */
const INTERNAL_PATHS = [
  "/api/",
  "/opengraph-image",
  "/twitter-image",
  "/icon",
  "/favicon.ico",
  "/manifest.webmanifest",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: INTERNAL_PATHS,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
