import fs from "fs";
import path from "path";

const targetDirs = ["app", "components", "lib", "scripts", "seo-audit", "public", "social"];
const rootFiles = ["AGENTS.md", "README.md", "next.config.ts"];

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "node_modules" || file === ".next" || file === ".git" || file === ".claude") continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(tsx?|jsx?|mjs|json|css|md)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

let allFiles = targetDirs.flatMap(walk);
for (const rf of rootFiles) {
  if (fs.existsSync(rf)) allFiles.push(rf);
}

let updatedFiles = 0;
let totalEm = 0;
let totalEn = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, "utf8");
  const emMatches = (content.match(/\u2014| - /g) || []).length;
  const enMatches = (content.match(/\u2013| - /g) || []).length;

  if (emMatches > 0 || enMatches > 0) {
    totalEm += emMatches;
    totalEn += enMatches;

    // 1. En dash between digits/percentages/currencies: replace with '-' (e.g. 8-12% -> 8-12%)
    content = content.replace(/([0-9%])\s*(?:\u2013| - )\s*([0-9₹$€£])/g, (m, g1, g2) => g1 + "-" + g2);

    // 2. Remaining en dashes: replace with ' - '
    content = content.replace(/\s*(?:\u2013| - )\s*/g, " - ");

    // 3. Em dashes: replace with ' - '
    content = content.replace(/\s*(?:\u2014| - )\s*/g, " - ");

    // 4. Clean up any accidental double spaces or duplicated dashes
    content = content.replace(/ - /g, " - ");

    fs.writeFileSync(file, content, "utf8");
    updatedFiles++;
  }
}

console.log(`Successfully updated ${updatedFiles} files.`);
console.log(`Replaced ${totalEm} em dashes and ${totalEn} en dashes.`);
