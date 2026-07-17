import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { TAX_SLUGS } from "@/lib/pseo-tax";
import { PAIR_SLUGS } from "@/lib/pseo-currency";
import { SIP_SLUGS } from "@/lib/pseo-sip";

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
    "/ai-assistant",
    "/ai-tools",
    "/news",
    "/blog",
    "/about",
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
