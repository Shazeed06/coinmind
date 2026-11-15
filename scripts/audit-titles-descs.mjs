import fs from "fs";
import path from "path";

function scanDir(dir, list = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name !== "node_modules" && f.name !== ".next" && f.name !== ".git") {
        scanDir(full, list);
      }
    } else if (f.name === "page.tsx") {
      list.push(full);
    }
  }
  return list;
}

const pages = scanDir("app");
console.log(`Auditing metadata in ${pages.length} page.tsx files...`);

for (const p of pages) {
  const content = fs.readFileSync(p, "utf8");

  // Check for hardcoded titles in metadata
  const titleMatches = [...content.matchAll(/title:\s*(?:\{[^}]*absolute:\s*["`']([^"`']+)["`'][^}]*\}|["`']([^"`']+)["`'])/g)];
  for (const tm of titleMatches) {
    const title = tm[1] || tm[2];
    if (title) {
      if (title.includes("CoinMind · CoinMind") || title.includes("CoinMind") && title.includes("· CoinMind")) {
        console.log(`[DOUBLE COINMIND] in ${p}: "${title}"`);
      }
      if (title.length > 65) {
        console.log(`[STATIC TITLE > 65 chars (${title.length})] in ${p}: "${title}"`);
      }
      if (title.includes("…") || title.includes("...")) {
        console.log(`[ELLIPSIS IN TITLE] in ${p}: "${title}"`);
      }
    }
  }

  // Check for descriptions
  const descMatches = [...content.matchAll(/description:\s*["`']([^"`']+)["`']/g)];
  for (const dm of descMatches) {
    const desc = dm[1];
    if (desc && desc.length > 165) {
      console.log(`[STATIC DESC > 165 chars (${desc.length})] in ${p}: "${desc.slice(0, 70)}..."`);
    }
  }
}
