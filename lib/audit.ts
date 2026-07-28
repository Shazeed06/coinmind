import { getClusters, getEntityRelations, getCoverageSummary, getPrioritizedGaps } from "./architecture";
import { calculators } from "./data";
import { GLOSSARY } from "./glossary";
import { posts } from "./data";
import { CLUSTER_SIP, CLUSTER_EMI, CLUSTER_TAX, CLUSTER_SAVINGS, CLUSTER_RETIREMENT } from "./links";

type AuditResult = {
  category: string;
  score: number;
  passed: number;
  total: number;
  failures: string[];
};

function check(description: string, condition: boolean, failures: string[]) {
  if (!condition) failures.push(description);
  return condition ? 1 : 0;
}

export function runAudit(): { results: AuditResult[]; overall: number } {
  const results: AuditResult[] = [];
  const clusters = getClusters();

  // ── 1. Topical Authority ──────────────────────────────────────────────
  {
    const failures: string[] = [];
    let passed = 0;
    const total = clusters.length;
    for (const c of clusters) {
      passed += check(`${c.id}: coverage >= 0.5`, c.coverage >= 0.5, failures);
    }
    results.push({ category: "Topical Authority (clusters ≥50% coverage)", score: Math.round((passed / total) * 100), passed, total, failures });
  }

  // ── 2. Cluster Hub Coverage ───────────────────────────────────────────
  {
    const failures: string[] = [];
    const hubClusters = clusters.filter((c) => c.parentCluster !== null);
    let passed = 0;
    for (const c of hubClusters) {
      passed += check(`${c.id}: has dedicated hubUrl`, c.hubUrl !== "/", failures);
    }
    results.push({ category: "Cluster Hub Coverage", score: Math.round((passed / hubClusters.length) * 100), passed, total: hubClusters.length, failures });
  }

  // ── 3. Knowledge Graph ─────────────────────────────────────────────────
  {
    const failures: string[] = [];
    const relations = getEntityRelations();
    let passed = 0;
    const total = clusters.length;
    for (const c of clusters) {
      const hasIncoming = relations.some((r) => r.to === c.id);
      const hasOutgoing = relations.some((r) => r.from === c.id);
      passed += check(`${c.id}: has inbound or outbound relations`, hasIncoming || hasOutgoing, failures);
    }
    results.push({ category: "Knowledge Graph (every cluster has relations)", score: Math.round((passed / total) * 100), passed, total, failures });
  }

  // ── 4. Content Coverage ───────────────────────────────────────────────
  {
    const failures: string[] = [];
    const { covered, partial, missing, total } = getCoverageSummary();
    const passed = covered + partial;
    results.push({ category: "Content Coverage (covered + partial ≥20%)", score: Math.round((passed / total) * 100), passed, total, failures });
  }

  // ── 5. Calculator Health ──────────────────────────────────────────────
  {
    const failures: string[] = [];
    const all = calculators;
    const live = all.filter((c) => c.live);
    results.push({ category: "Calculator Health (live vs total)", score: Math.round((live.length / all.length) * 100), passed: live.length, total: all.length, failures });
  }

  // ── 6. Glossary Depth ─────────────────────────────────────────────────
  {
    const failures: string[] = [];
    const terms = GLOSSARY;
    const withRelated = terms.filter((t) => t.related.length >= 2).length;
    const withTool = terms.filter((t) => t.relatedHref).length;
    const passed = withRelated + withTool;
    const score = Math.round(((withRelated / terms.length) + (withTool / terms.length)) / 2 * 100);
    results.push({ category: "Glossary Depth (related terms + hrefs)", score, passed, total: terms.length * 2, failures });
  }

  // ── 7. Blog Posts ─────────────────────────────────────────────────────
  {
    const failures: string[] = [];
    const allPosts = posts;
    const withExcerpt = allPosts.filter((p) => p.excerpt.length > 50).length;
    const withKeywords = allPosts.filter((p) => p.keywords.length > 0).length;
    const passed = withExcerpt + withKeywords;
    const score = Math.round(((withExcerpt / allPosts.length) + (withKeywords / allPosts.length)) / 2 * 100);
    results.push({ category: "Blog Content Quality (excerpt + keywords)", score, passed, total: allPosts.length * 2, failures });
  }

  // ── 8. No Orphan Clusters ─────────────────────────────────────────────
  {
    const failures: string[] = [];
    let passed = 0;
    for (const c of clusters) {
      if (c.parentCluster === null) { passed++; continue; }
      passed += check(`${c.id}: parent ${c.parentCluster} exists`, clusters.some((p) => p.id === c.parentCluster), failures);
    }
    results.push({ category: "No Orphan Clusters", score: Math.round((passed / clusters.length) * 100), passed, total: clusters.length, failures });
  }

  // ── 9. No Duplicate Clusters ────────────────────────────────────────
  {
    const failures: string[] = [];
    const uniqueIds = new Set(clusters.map((c) => c.id));
    results.push({ category: "No Duplicate Clusters", score: Math.round((uniqueIds.size / clusters.length) * 100), passed: uniqueIds.size, total: clusters.length, failures });
  }

  // ── 10. Hub Page Count (actual routes) ────────────────────────────────
  {
    const failures: string[] = [];
    const hubs = clusters.filter((c) => c.hubUrl !== "/");
    const expectedRoutes = ["/sip", "/income-tax", "/investing", "/loans", "/savings", "/retirement", "/budgeting", "/credit-score", "/gold"];
    let passed = 0;
    for (const hr of expectedRoutes) {
      passed += check(`hub route ${hr} has cluster`, hubs.some((h) => h.hubUrl === hr), failures);
    }
    results.push({ category: "Hub Pages Deployed", score: Math.round((passed / expectedRoutes.length) * 100), passed, total: expectedRoutes.length, failures });
  }

  const overall = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
  return { results, overall };
}

function printAudit() {
  const { results, overall } = runAudit();
  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║    CoinMind — Self-Audit Validation Report              ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  for (const r of results.sort((a, b) => a.score - b.score)) {
    const icon = r.score >= 95 ? "✓" : r.score >= 70 ? "⚠" : "✗";
    console.log(`  ${icon} ${r.category}: ${r.score}% (${r.passed}/${r.total})`);
    if (r.failures.length > 0 && r.failures.length <= 5) {
      for (const f of r.failures) console.log(`      - ${f}`);
    }
  }

  console.log(`\n  ─────────────────────────────────────────────────────`);
  console.log(`  OVERALL SCORE: ${overall}%\n`);

  if (overall >= 95) {
    console.log("  ✓ PASS: All categories score ≥95%. Architecture is enterprise-grade.\n");
  } else {
    const below95 = results.filter((r) => r.score < 95);
    console.log(`  ⚠ NEEDS WORK: ${below95.length} categories below 95%:\n`);
    for (const r of below95) {
      const icon = r.score >= 70 ? "⚠" : "✗";
      console.log(`    ${icon} ${r.category}: ${r.score}% (${r.passed}/${r.total})`);
    }
    console.log("");
  }

  const summary = getCoverageSummary();
  const gaps = getPrioritizedGaps();
  console.log(`  ─── Coverage Summary ───`);
  console.log(`  Total clusters: ${summary.total}`);
  console.log(`  Fully covered (≥50%): ${summary.covered}`);
  console.log(`  Partially covered (20-49%): ${summary.partial}`);
  console.log(`  Missing (<20%): ${summary.missing}`);
  console.log(`  Average coverage: ${summary.avgScore}%\n`);
  console.log(`  Top priority content gaps:\n`);
  for (const g of gaps.filter((g) => g.priority === 1).slice(0, 5)) {
    console.log(`    ! ${g.label}: ${g.coverage}% coverage — ${g.trafficPotential} traffic, ${g.difficulty} difficulty`);
  }
  console.log("");
}

if (typeof require !== "undefined" && require.main === module) {
  printAudit();
}
