import { readdirSync, statSync, readFileSync } from "fs";
import { join, relative } from "path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

// Recursive scan for all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(APP_DIR);
console.log(`Found ${htmlFiles.length} rendered HTML files in .next/server/app\n`);

// Build a set of all valid routes from the HTML files
const routeMap = new Map();
for (const file of htmlFiles) {
  let route = relative(APP_DIR, file).replace(/\\/g, "/");
  if (route === "index.html") {
    route = "/";
  } else if (route.endsWith(".html")) {
    route = "/" + route.slice(0, -5);
  }
  routeMap.set(route, file);
}

const stats = {
  total: htmlFiles.length,
  passed: 0,
  failed: 0,
  warnings: 0,
  missingTitle: [],
  missingDesc: [],
  missingCanonical: [],
  canonicalMismatch: [],
  unexpectedNoindex: [],
  unexpectedIndex: [],
  invalidJsonLd: [],
  missingH1: [],
  imagesMissingAlt: [],
  brokenInternalLinks: new Map(), // route -> [broken hrefs]
  ogLocaleCounts: {},
};

// Read traffic post slugs directly from files to build the expected noindex set
const trafficSlugs = new Set();
for (let i = 1; i <= 11; i++) {
  try {
    const raw = readFileSync(join(process.cwd(), "lib", `trafficPosts${i}.ts`), "utf-8");
    const matches = raw.matchAll(/slug:\s*["']([^"']+)["']/g);
    for (const m of matches) trafficSlugs.add(m[1]);
  } catch (e) {}
}

// Expected noindex paths (or prefixes)
function isExpectedNoindex(route) {
  if (route === "/search" || route === "/_not-found") return true;
  if (route.startsWith("/sip/") && route !== "/sip") return true;
  if (route.startsWith("/currency/") && route !== "/currency") return true;
  if (route.startsWith("/income-tax/") && route !== "/income-tax") return true;
  if (route.startsWith("/calculators/fd/") && route !== "/calculators/fd") return true;
  if (route.startsWith("/blog/")) {
    const slug = route.slice(6);
    if (trafficSlugs.has(slug)) return true;
  }
  const noindexTools = [
    "color-picker", "base64", "url-encode-decode", "json-formatter",
    "case-converter", "character-counter", "word-counter", "text-compare",
    "remove-duplicate-lines", "image-to-base64", "stopwatch-timer",
    "countdown-to-date", "favicon-generator", "number-to-words",
  ];
  if (noindexTools.some((t) => route === `/tools/${t}`)) return true;
  return false;
}

for (const [route, file] of routeMap.entries()) {
  const html = readFileSync(file, "utf-8");
  let fileHasError = false;

  // 1. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) {
    stats.missingTitle.push(route);
    fileHasError = true;
  }

  // 2. Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : "";
  if (!desc && route !== "/_not-found") {
    stats.missingDesc.push(route);
  }

  // 3. Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : "";
  if (!canonical && route !== "/_not-found") {
    stats.missingCanonical.push(route);
    fileHasError = true;
  } else if (canonical) {
    if (!canonical.startsWith("https://www.coinmind.in")) {
      stats.canonicalMismatch.push({ route, canonical });
    }
  }

  // 4. Robots
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1].toLowerCase() : "";
  const isNoindexed = robots.includes("noindex");
  const expectedNoindex = isExpectedNoindex(route);

  if (isNoindexed && !expectedNoindex) {
    stats.unexpectedNoindex.push(route);
    fileHasError = true;
  } else if (!isNoindexed && expectedNoindex) {
    stats.unexpectedIndex.push(route);
    fileHasError = true;
  }

  // 5. OG Locale
  const ogLocaleMatch = html.match(/<meta[^>]*property=["']og:locale["'][^>]*content=["']([^"']*)["']/i);
  const ogLocale = ogLocaleMatch ? ogLocaleMatch[1] : "none";
  stats.ogLocaleCounts[ogLocale] = (stats.ogLocaleCounts[ogLocale] || 0) + 1;

  // 6. JSON-LD scripts
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
    const rawJson = jsonMatch[1];
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed["@context"]) {
        stats.invalidJsonLd.push({ route, issue: "Missing @context" });
      }
    } catch (e) {
      stats.invalidJsonLd.push({ route, issue: `Syntax error: ${e.message}` });
      fileHasError = true;
    }
  }

  // 7. H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match && route !== "/_not-found") {
    stats.missingH1.push(route);
  }

  // 8. Img tags without alt
  const imgRegex = /<img\b(?![^>]*\balt=)[^>]*>/gi;
  const missingAltImgs = html.match(imgRegex);
  if (missingAltImgs) {
    stats.imagesMissingAlt.push({ route, count: missingAltImgs.length });
  }

  // 9. Check internal links
  const hrefRegex = /<a[^>]*href=["'](\/[^"'#?]*)["']/gi;
  let hrefMatch;
  const brokenLinksOnPage = [];
  while ((hrefMatch = hrefRegex.exec(html)) !== null) {
    const target = hrefMatch[1];
    // Ignore api, static assets, xml, manifest
    if (target.startsWith("/api/") || target.startsWith("/_next/") || target.includes(".") || target === "") continue;
    // Normalize target
    const normalized = target.endsWith("/") && target.length > 1 ? target.slice(0, -1) : target;
    // Check if route exists in routeMap (or redirect in next.config.ts)
    if (!routeMap.has(normalized) && normalized !== "/sitemap.xml" && normalized !== "/robots.txt") {
      brokenLinksOnPage.push(normalized);
    }
  }
  if (brokenLinksOnPage.length > 0) {
    stats.brokenInternalLinks.set(route, [...new Set(brokenLinksOnPage)]);
  }

  if (fileHasError) {
    stats.failed++;
  } else {
    stats.passed++;
  }
}

console.log("════════════════════════════════════════════════════════════════");
console.log("                 FULL ROUTE AUDIT RESULTS                       ");
console.log("════════════════════════════════════════════════════════════════\n");

console.log(`Total HTML Routes Audited: ${stats.total}`);
console.log(`Passed Integrity Checks:   ${stats.passed}`);
console.log(`Failed Integrity Checks:   ${stats.failed}`);

console.log("\n─── 1. Metadata Checks ──────────────────────────────────────────");
console.log(`Missing Title:            ${stats.missingTitle.length}`);
if (stats.missingTitle.length) console.log("  ", stats.missingTitle);

console.log(`Missing Description:      ${stats.missingDesc.length}`);
if (stats.missingDesc.length) console.log("  ", stats.missingDesc.slice(0, 10));

console.log(`Missing Canonical:        ${stats.missingCanonical.length}`);
if (stats.missingCanonical.length) console.log("  ", stats.missingCanonical);

console.log(`Canonical Domain Mismatch: ${stats.canonicalMismatch.length}`);
if (stats.canonicalMismatch.length) console.log("  ", stats.canonicalMismatch.slice(0, 5));

console.log("\n─── 2. Indexability (Robots) ───────────────────────────────────");
console.log(`Unexpected Noindex:       ${stats.unexpectedNoindex.length}`);
if (stats.unexpectedNoindex.length) console.log("  ", stats.unexpectedNoindex);

console.log(`Unexpected Index:         ${stats.unexpectedIndex.length}`);
if (stats.unexpectedIndex.length) console.log("  ", stats.unexpectedIndex);

console.log("\n─── 3. Structured Data (JSON-LD) ───────────────────────────────");
console.log(`JSON-LD Issues:           ${stats.invalidJsonLd.length}`);
if (stats.invalidJsonLd.length) console.log("  ", stats.invalidJsonLd);

console.log("\n─── 4. Headings & Accessibility ────────────────────────────────");
console.log(`Missing H1:               ${stats.missingH1.length}`);
if (stats.missingH1.length) console.log("  ", stats.missingH1);

console.log(`Images Missing Alt:       ${stats.imagesMissingAlt.length}`);
if (stats.imagesMissingAlt.length) console.log("  ", stats.imagesMissingAlt);

console.log("\n─── 5. OpenGraph Locale Consistency ────────────────────────────");
console.log("OG Locales:", stats.ogLocaleCounts);

console.log("\n─── 6. Internal Link Verification ──────────────────────────────");
console.log(`Routes with potentially broken internal links: ${stats.brokenInternalLinks.size}`);
if (stats.brokenInternalLinks.size > 0) {
  for (const [route, links] of [...stats.brokenInternalLinks.entries()].slice(0, 15)) {
    console.log(`  Route: ${route} -> Broken:`, links);
  }
}
