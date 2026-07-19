import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { SIP_SLUGS } from "@/lib/pseo-sip";
import { GLOSSARY_SLUGS } from "@/lib/glossary";

// GET /api/indexnow — submits every public URL to IndexNow (Bing, Yandex, Naver,
// Seznam). Bing's index feeds ChatGPT Search, so this gets pages discovered in
// hours instead of weeks. Trigger it after each deploy (visit the URL) or wire it
// into CI. Google ignores IndexNow — keep using GSC + sitemap there.
export const dynamic = "force-dynamic";

function allUrls(): string[] {
  const paths = [
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
    "/tools/split-pdf",
    "/tools/rotate-pdf",
    "/tools/organize-pdf",
    "/tools/resize-image",
    "/tools/crop-image",
    "/tools/rotate-image",
    "/tools/favicon-generator",
    "/tools/meme-generator",
    "/tools/image-to-base64",
    "/tools/number-to-words",
    "/tools/lorem-ipsum-generator",
    "/tools/text-compare",
    "/tools/remove-duplicate-lines",
    "/tools/json-formatter",
    "/tools/base64",
    "/tools/url-encode-decode",
    "/tools/stopwatch-timer",
    "/tools/countdown-to-date",
    "/tools/random-wheel",
    "/tools/coin-flip",
    "/tools/random-number-generator",
    "/tools/scientific-calculator",
    "/tools/gpa-calculator",
    "/tools/color-picker",
    "/tools/character-counter",
    "/ai-assistant",
    "/ai-tools",
    "/glossary",
    "/news",
    "/blog",
    "/about",
    "/editorial-standards",
    "/affiliate-disclosure",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/terms",
    ...calculators.filter((c) => c.live).map((c) => `/calculators/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    ...aiToolDetails.map((d) => `/ai-tools/${d.slug}`),
    ...TAX_SLUGS.map((s) => `/income-tax/${s}`),
    ...PAIR_SLUGS.map((s) => `/currency/${s}`),
    ...SIP_SLUGS.map((s) => `/sip/${s}`),
    ...GLOSSARY_SLUGS.map((s) => `/glossary/${s}`),
  ];
  return paths.map((p) => `${site.url}${p}`);
}

export async function GET() {
  const host = new URL(site.url).host;
  const urlList = allUrls();
  const body = {
    host,
    key: site.indexNowKey,
    keyLocation: `${site.url}/${site.indexNowKey}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return Response.json({
      submitted: urlList.length,
      indexNowStatus: res.status,
      ok: res.ok,
    });
  } catch (err) {
    return Response.json(
      { error: "IndexNow submission failed", detail: String(err) },
      { status: 500 }
    );
  }
}
