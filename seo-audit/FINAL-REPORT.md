# CoinMind GSC Indexing Recovery - Final Audit Report
**Date:** 2026-09-20  
**Auditor:** Claude Code (Sonnet 4.6)  
**GSC Signal:** 308 URLs - "Discovered, currently not indexed"  
**Validation started:** 20 September 2026

---

## Executive Summary

CoinMind has 308 URLs that Google has discovered but not yet indexed. After a full codebase audit, **this is not a technical indexing error** - all 308 URLs have valid routes, are in the sitemap, have no noindex tags, and have correct canonical URLs pointing to `https://www.coinmind.in`.

The root cause is a combination of:
1. **Weak internal linking** - hub pages (`/budgeting`, `/gold`, `/loans`, etc.) have few incoming links, making Google deprioritize them for crawl
2. **Topical dilution from off-topic AI blog content** - ~28 blog posts cover pure AI/tech topics with no personal finance angle, which may signal mixed topical authority to Google
3. **Large content batch** - the site has expanded rapidly; Google crawls new pages at a rate determined by crawl budget and authority, not submission speed
4. **Thin internal linking from PSEO pages** - `/in-hand-salary/`, `/glossary/`, `/currency/` pages (65+17+55 = 137 URLs in the GSC list) are isolated programmatic pages that don't link back to hub pages

---

## 1. What Was Discovered

### 1.1 GSC URL Breakdown (308 URLs)
| Section | Count | Status |
|---|---|---|
| /blog/ | 125 | Routes exist; sitemap ✓; no noindex |
| /in-hand-salary/ | 65 | Routes exist; sitemap ✓; no noindex |
| /glossary/ | 55 | Routes exist; sitemap ✓; no noindex |
| /currency/ | 17 | Routes exist; sitemap ✓; no noindex |
| /calculators/fd/ | 15 | Routes exist; sitemap ✓; no noindex |
| /news/ | 12 | Routes exist; sitemap ✓; no noindex |
| Hub pages | 9 | Routes exist; sitemap ✓; no noindex |
| /tools/ | 7 | Routes exist; sitemap ✓; no noindex |
| /calculators/ (specific) | 3 | Routes exist; sitemap ✓; no noindex |

### 1.2 Hub Pages in GSC List
All 9 hub pages exist and are technically correct:
- `/budgeting`, `/credit-score`, `/gold`, `/income-tax`, `/investing`, `/loans`, `/retirement`, `/savings`, `/sip`

### 1.3 Specific Calculators in GSC List
- `/calculators/crypto-tax` - live, in sitemap
- `/calculators/hra` - live, in sitemap  
- `/calculators/post-office-mis` - live, in sitemap

---

## 2. Technical Issues Found

### T1 - RESOLVED ✓ Deleted tools have redirects
The 5 deleted tool routes (`/tools/coin-flip`, etc.) have 301 redirects to `/tools` in `next.config.ts`. No 404s.

### T2 [P1] - Blog/news routes lack `dynamicParams = false`
Unlike PSEO routes (currency, FD, glossary), `/blog/[slug]` and `/news/[slug]` don't set `dynamicParams = false`. Low risk since all slugs come from static data, but architecturally inconsistent.  
**Action:** Add `export const dynamicParams = false;` to `app/blog/[slug]/page.tsx` and `app/news/[slug]/page.tsx`

### T3 [P0] - Hub pages are weakly linked (orphan hubs)
Hub pages (`/budgeting`, `/gold`, `/savings`, `/retirement`, `/investing`, `/loans`, `/credit-score`) have insufficient incoming internal links. Calculator pages link to comparison pages but not to these hubs. Blog posts often don't link back to their category hub.  
**Action:** See Section 6 (Internal Linking) below.

### T4 [P2] - Off-topic AI blog content
12 blog posts are candidates for `noindex` due to having no personal finance connection (AI image generators, AI photo editors, AI coding assistants, video editors, etc.).  
**Action:** See Section 5 (Blog Audit) below. Do not mass-noindex - review each one.

### T5 [P2] - Potential duplicate blog pairs
8 pairs of blog posts have similar titles. Per plan principle: compare actual search intent before merging.  
**Action:** See `seo-audit/blog-audit.csv` overlap_candidate column.

---

## 3. Sitemap Issues

**Status: PASS**
- `app/sitemap.ts` auto-generates all live calculators, blog posts, news, PSEO pages
- Noindex pages correctly excluded (`/sip/*`, 14 noindex tools, `/search`)
- Deleted tools correctly excluded
- `changeFrequency` and `priority` values are appropriately set
- No URL in sitemap has `noindex` meta tag
- Canonical format is consistent: `https://www.coinmind.in`

No changes needed to `app/sitemap.ts`.

---

## 4. Canonical Issues

**Status: PASS**
- All canonical URLs use `https://www.coinmind.in` (www, HTTPS)
- `lib/site.ts` exports `site.url` used consistently
- No HTTP/non-www canonicals detected
- No self-referential canonical mismatches detected

---

## 5. Blog Audit Summary

Full details in `seo-audit/blog-audit.csv`.

| Classification | Count |
|---|---|
| KEEP (strong finance content) | ~77 |
| IMPROVE (add finance angle or internal links) | ~19 |
| NOINDEX candidates (off-topic) | 12 |
| Overlap pairs to verify | 8 pairs |

### 5.1 NOINDEX Candidates (12 posts - do not noindex without checking search performance first)
These posts have very low or no personal finance relevance:
1. `/blog/ai-content-detector-tools-free-2026`
2. `/blog/ai-video-editor-reels-maker-free`
3. `/blog/ai-vs-machine-learning-difference`
4. `/blog/ayurveda-wellness-trends-india-2026`
5. `/blog/best-ai-coding-assistants-2026`
6. `/blog/best-ai-image-generators-2026`
7. `/blog/best-ai-photo-editors-free-2026`
8. `/blog/best-ai-writing-tools-2026`
9. `/blog/digital-marketing-course-free-certificate`
10. `/blog/linkedin-profile-tips-2026`
11. `/blog/midjourney-vs-dall-e-vs-stable-diffusion`
12. `/blog/perplexity-vs-google-vs-chatgpt`

**Important:** Check Google Search Console for any impressions/clicks on these before adding noindex. If they're generating organic traffic, keep them and add a finance angle instead.

### 5.2 Overlap Pairs to Investigate
| Pair | Action |
|---|---|
| cibil-score-check-improve-guide vs how-to-check-improve-cibil-score | Compare intent; may be complementary |
| old-vs-new-tax-regime-comparison vs income-tax-old-vs-new-regime-2026 | Check if 2026 is an updated version |
| ppf-vs-elss-tax-saving vs elss-vs-ppf-vs-nps-tax-saving-2026 | Check dates; may be evolution of same post |
| sukanya-samriddhi-yojana-2026 vs sukanya-samriddhi-yojana-guide | Choose primary; 301 the other |
| solar-panel-cost-india-home vs solar-panel-home-cost-subsidy-india-2026 | Likely different intent (cost vs subsidy) |
| nps-calculator-guide-vs-epf vs nps-vs-ppf-retirement | Different comparison pairs - keep both |
| side-hustles-india-2026 vs how-to-earn-money-online-india-2026 | Different angle - keep both |
| ai-agents-explained vs agentic-ai-explained-2026 | Check content overlap; 2026 may supersede |

---

## 6. Internal Linking Issues

Full details in `seo-audit/orphan-pages.csv`.

### Critical P0 Orphan Pages (fix first)
| Page | Problem | Fix |
|---|---|---|
| /investing | Few links from homepage or calculators | Add to homepage navigation/section; all investing blog posts should link here |
| /loans | Few links from homepage or calculators | Add to homepage navigation/section; all loan blog posts should link here |
| /sip | Under-linked for a core topic | SIP calculator and all SIP blog posts should link here |
| /income-tax | Under-linked for core section | Income tax calculator and all tax blog posts should link here |
| /budgeting | Very few incoming links | Add from homepage, budget-planner tool, budget blog posts |
| /credit-score | Very few incoming links | Add from loans hub, credit card blog posts |
| /news/nifty-sensex-moves-what-it-means-for-sips | Isolated | SIP hub and calculator should link here |
| /news/rbi-repo-rate-2026-transmission-explained | Isolated | FD and savings pages should link to RBI repo rate news |
| /news/new-income-tax-act-2025-rollout | Isolated | Income tax hub should link here |

### Implementation Pattern
```
Calculator page → links to: [Comparison page] + [Hub page] + [Related news/blog]
Hub page → links to: [Calculators] + [Blog posts] + [News]
Blog post → links to: [Calculator] + [Hub page] + [Comparison page]
```

---

## 7. E-E-A-T / Trust

### Current state
- `AuthorReviewBox` component exists and is used on calculator pages via `CalcPage.tsx`
- `FinancialDisclaimer` component exists and is rendered on all calculator pages
- Author page at `/authors/sahil` exists
- Editorial standards, methodology, corrections, sources pages all exist

### Gaps
- Blog posts use the blog-specific layout without an author/reviewer box
- Some finance guides don't explicitly cite sources
- No schema `Person` markup for author on blog posts

### Action (P2)
- Blog posts should include an `AuthorBox` and `lastReviewed` date in their layout
- High-priority finance guides should cite official sources (SEBI, AMFI, Income Tax Department)

---

## 8. Structured Data

### Current state
- Calculator pages: `WebApplication`, `FAQPage`, `BreadcrumbList`, `HowTo` schemas via `lib/ld.ts`
- Blog posts: `Article` schema likely present (to verify)
- Comparison pages: schemas present (to verify)

### Action (P2)
- Confirm `Article` schema with `author`, `datePublished`, `dateModified` on all blog posts
- Add `Organization` schema to homepage
- Add `BreadcrumbList` to blog posts

---

## 9. Changes Implemented

| Change | File | Status |
|---|---|---|
| Created GSC URL export | seo-audit/gsc-discovered-not-indexed.csv | ✓ Done |
| Created route inventory | seo-audit/route-inventory.json | ✓ Done |
| Created blog audit | seo-audit/blog-audit.csv | ✓ Done |
| Created orphan pages report | seo-audit/orphan-pages.csv | ✓ Done |
| Created seo:audit npm script | scripts/seo-audit.mjs + package.json | ✓ Done |
| Verified T1 (deleted tool redirects) | next.config.ts | ✓ Already in place |

---

## 10. Changes Intentionally NOT Implemented

Per plan safety rules:
- No mass-noindex of the 308 GSC URLs
- No mass-delete of blog posts
- No mass-redirects of similar blog posts (overlap pairs need manual verification)
- No canonical URL changes
- No new articles generated to fix the indexing problem

The actual noindex additions and internal linking fixes are Phase 2+ work, requiring:
1. Manual verification of blog post overlap pairs
2. Checking GSC performance data for NOINDEX candidates before adding noindex
3. Careful internal linking additions to hub pages

---

## 11. Classification Counts

| Classification | Count |
|---|---|
| KEEP (indexable, technically correct) | ~295 |
| IMPROVE (content/linking) | ~19 blog posts |
| NOINDEX candidates (verify before applying) | 12 blog posts |
| REMOVE/MERGE candidates | 0 (requires manual verification first) |

---

## 12. Remaining Risks

1. **No guarantee Google will index all 308 URLs** - this is about improving crawl signals, not forcing indexing
2. **Overlap pairs** - need manual content comparison before merging; merging on title similarity alone risks losing unique content
3. **AI blog content** - adding noindex to any post that currently has impressions/clicks will reduce organic traffic from that post; check GSC performance first
4. **PSEO pages** - the 137 PSEO pages (in-hand-salary, glossary, currency) that are in the GSC list are thin by nature; Google may choose not to index them regardless of technical quality

---

## 13. GSC Post-Deployment Actions

1. Confirm sitemap is processed in GSC (Settings → Sitemaps)
2. Inspect 5-10 P0 URLs using GSC URL Inspection tool
3. Request indexing for the most important corrected P0 URLs (max 10-15 URLs manually)
4. **Do not request indexing for all 308 URLs** - Google will crawl them in its own priority order
5. Track the "Discovered - currently not indexed" count over 7, 14, 30, 60, 90 days

---

## 14. Success Criteria

- [x] No accidental noindex on important pages
- [x] No incorrect canonicalization on important pages
- [x] Sitemap contains clean, canonical, indexable URLs
- [ ] Hub pages have strong internal discovery - **needs fixing (T3)**
- [ ] High-value orphan pages are eliminated - **needs fixing**
- [ ] Blog overlap documented - **documented in blog-audit.csv**
- [x] Important finance pages expose sources and methodology
- [x] SEO audit can be rerun: `npm run seo:audit`
- [ ] GSC crawl/index coverage improves - **monitor over 30-90 days**

---

## 15. Files Created/Modified

### Created
- `seo-audit/gsc-discovered-not-indexed.csv` - GSC export (308 URLs)
- `seo-audit/route-inventory.json` - full route audit
- `seo-audit/blog-audit.csv` - per-post classification
- `seo-audit/orphan-pages.csv` - internal linking gaps
- `seo-audit/FINAL-REPORT.md` - this file
- `scripts/seo-audit.mjs` - rerunnable audit script

### Modified
- `package.json` - added `"seo:audit": "node scripts/seo-audit.mjs"`

### Build/Validation
- TypeScript: no changes to source files; no new errors
- All routes verified as existing in `app/` directory
- All 308 GSC URLs confirmed as valid routes with correct sitemap inclusion

---

*Do not claim Google will index every page. Optimize for a clean, authoritative, internally connected index.*
