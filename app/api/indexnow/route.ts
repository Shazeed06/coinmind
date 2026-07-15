import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import { aiToolDetails } from "@/lib/aiToolDetails";

// GET /api/indexnow — submits every public URL to IndexNow (Bing, Yandex, Naver,
// Seznam). Bing's index feeds ChatGPT Search, so this gets pages discovered in
// hours instead of weeks. Trigger it after each deploy (visit the URL) or wire it
// into CI. Google ignores IndexNow — keep using GSC + sitemap there.
export const dynamic = "force-dynamic";

function allUrls(): string[] {
  const paths = [
    "",
    "/calculators",
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
