# CoinMind (coinmind.in): Fresh Deep Audit (v2, after fixes)
**Date:** 15 Nov 2026 (evening) · **Live build:** `a6ad331`
**Method:** 200 sequential uptime requests; full link-graph crawl of 693 pages (all 384 sitemap URLs plus every page reachable through internal links); mobile render check at 375px on 6 page types; source review; search-index sampling.

---

## Scorecard: before vs now

| Area | Morning audit | Now |
|---|---|---|
| Uptime (5xx) | ~50% of requests failed | ✅ **0/200 failed**; all 693 crawled pages return 200 |
| HTTP → HTTPS | `http://` returned 200 | ✅ 301 to https |
| www → apex | 301 | ✅ 301 (http://www takes 2 hops, minor) |
| Sitemap | 571 URLs, 141 returning 503, no lastmod | ✅ 384 URLs, all 200, no dupes, honest lastmod on 134 |
| Canonical / H1 / meta | OK | ✅ 0 issues; 0 duplicate titles, descriptions or H1s |
| og:image / twitter card | 165 missing | ✅ 0 missing |
| JSON-LD | OK | ✅ parses on every page; 0 errors |
| Topical focus | AI/tools/crypto indexed | 🟡 Much better (306 pages noindexed), with gaps (§4) |
| E-E-A-T | invented facts | 🟡 Honest now ("MD Sahil, CA (Final) candidate, New Delhi"), but thin (§6) |
| Freshness of "today" pages | n/a | 🔴 **New problem** (§1) |
| Calculator HTML structure | n/a | 🔴 **New finding** (§2) |

The site is technically healthy again. The open issues are now about content, freshness, and authority.

---

## 🔴 1. "Today/Live" pages are stale and will stay frozen

**a) `/ipos/ipo-gmp-today` is a month old.** The title says "Live Grey Market Premium List", but the page reads *"Last updated: 18 October 2026"*. Its table shows IPOs as "Open (close 19 Oct)" and "Opens 21 Oct". The same goes for the other IPO pages, which show 18 Oct data. For a YMYL "today" query this is a trust and helpful-content problem, and AI assistants will cite wrong numbers.
→ Either automate the data feed, or remove "Today/Live" from the title and H1 and show an honest "as of" date. Pages for IPOs that have already closed should switch to listing-day results.

**b) ISR no longer works under the new cache.** `staticAssetsIncrementalCache` is **read-only**: pages are served exactly as they were built at deploy time. So:
- `/gold-rate/*` declares `revalidate = 21600` (6 h), but the rate will **not** refresh until the next deploy. The page says "Updated 15 November 2026" and will keep saying it.
- `/petrol-price/*`, `/gold-rate/*` and `/finance-today` print `new Date()` ("Sunday, 15 November 2026") at build time. That date freezes too, and a week from now the page will claim today is 15 Nov.

→ Fix (pick one):
1. For ISR routes, switch to the **R2 incremental cache + Durable Object queue** (`r2IncrementalCache`, `doQueue`) in `open-next.config.ts`. Static pages can stay on assets.
2. Add a **daily scheduled redeploy** (Cloudflare Workers Builds deploy hook triggered by a cron). This is the simplest option.
3. Render the "today" date and the rates on the client from `/api/rates`, so the HTML never carries a stale "today".

---

## 🔴 2. Calculator and tool content sits in a hidden div at the end of the HTML

`app/calculators/loading.tsx` and `app/tools/loading.tsx` wrap every calculator in a Suspense boundary. The prerendered HTML has this shape:

```
<main id="main-content"> [loading skeleton: grey bars] </main>
<footer>…</footer>
<div hidden id="S:0"> … real calculator H1, explainer, FAQ (≈1,470 words) … </div>
<script> swap into main </script>
```

- **Googlebot** runs JS, so it sees the final page. That part is fine.
- **AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, CCBot) mostly **don't run JS**. They get a `<main>` that contains only a skeleton, and the real content sits inside `<div hidden>`, which many extractors discard as hidden text. That undermines all the AEO work on calculators: Quick Answer blocks, FAQs, formulas.
- The same applies to the `/calculators` and `/tools` hubs (0 words inside `<main>`).

→ **Delete `app/calculators/loading.tsx` and `app/tools/loading.tsx`.** These are static pages, so a loading skeleton serves no purpose. After rebuilding, `curl` a calculator and confirm the H1 and Quick Answer appear inside `<main>`.

---

## 🟠 3. Internal linking gaps

**15 sitemap URLs have zero internal links (true orphans):**
- IPOs: `zepto-ipo`, `oyo-ipo`, `hero-fincorp-ipo`, `razorpay-ipo`, `ss-retail-ipo`
- Calculators: `simple-interest`, `sales-tax`, `hourly-to-salary`, `net-worth`, `goal`, `goal-child-education`, `goal-marriage`, `goal-car`, `goal-house-down-payment`, `goal-emergency-fund`

The `/calculators` hub links only 30 of 55 calculators, and the `/ipos` hub misses five IPO pages.

**76 sitemap URLs have two or fewer internal links.** These include most comparisons, research pages, `tax-regime-break-even`, `tds`, `fire` and `post-office-mis`.

**Link equity is going to noindexed pages:**
- `/income-tax/12-lakh` (noindex) is linked from **81 pages**.
- 11+ noindexed `/in-hand-salary/*` bands are linked from **65 pages each** (the salary navigation table).
- The homepage links to `/blog/fixed-deposit-interest-rates-2026`, which is noindexed.

→ Make the `/calculators` and `/ipos` hubs list every page. Add a "Related calculators" rail to the calculator template. Point the salary table only at the 15 indexed bands.

→ **Business decision:** "income tax on 12 lakh salary" is one of the highest-volume tax queries since the ₹12 L rebate. The 15 `/income-tax/*-lakh` pages are noindexed even though they're heavily linked. Consider indexing the top 5–6 (7, 10, 12, 12.75, 15, 20 lakh) after enriching them.

---

## 🟠 4. Topical focus: remaining gaps

What's done: 25 pure-AI blogs, 34 tools, 23 AI-tool reviews, 20 crypto glossary terms, diesel pages, currency pages and 50 salary bands are noindexed.

What's still indexable and off-topic:
- `/calculators/age-calculator`, `tip-calculator`, `date-difference-calculator`, `percentage-calculator`, `/tools/scientific-calculator`
- `/ai-tools` hub and `/ai-assistant` are indexable **and missing from the sitemap**. Decide one way or the other: either index them and add them to the sitemap, or noindex them.
- `/about` title still says "Finance Calculators **& AI Tool Reviews**".
- `/llms.txt` still advertises "AI tools comparisons" and "Free online tools (resume builder, PDF tools…)". It should describe what you now want cited.

Google's index still holds many **`www.coinmind.in`** URLs, including ones that are now off-topic. It will drop them as it recrawls the 301s; keep the redirects permanent.

---

## 🟠 5. Content quality

| Section | Indexed pages | Avg words | Issue |
|---|---|---|---|
| comparisons | 14 | **415** | Thin for "X vs Y" intent; no FAQ, Article schema or dateModified |
| research | 5 | **320** | The most citable section (rate histories) is the thinnest |
| petrol-price hubs | 21 | 698 | Template text |
| glossary | 82 | 1,194 | No dateModified |
| calculators | 55 | ~1,470 (hidden, see §2) | Quick Answer on only 6 of 55 |

- **326 of 384 pages have zero outbound links.** On YMYL pages, linking the actual source (an RBI circular, Income Tax Act section, or EPFO notification) is a trust signal, and AI answers favour pages that cite their sources.
- 307 images lack `alt` text, about 3 per blog post (cover and inline art).
- In-hand-salary pages compete in a saturated SERP. For "10 LPA in hand salary", 10+ near-identical pSEO sites all quote "₹71,129". To win, these pages need something others don't have, such as company-specific CTC breakups, old vs new regime with real deductions, or a payslip PDF.

---

## 🟠 6. E-E-A-T and brand entity

- The author is now honest: "MD Sahil, CA (Final) candidate, New Delhi". ✅ Keep it that way.
- Still missing:
  - an author photo
  - a LinkedIn profile
  - a **named qualified reviewer** (a practising CA) for tax pages
  - a domain email (contact is still Gmail)
- **Brand collision:** a different, active company named **"CoinMind AI"** (coinmind-ai.com, an Estonian startup with a Play Store app) does *AI personal finance*. Searching "coinmind" returns them first. LLMs may merge the two entities.
  → Use "CoinMind India" or "CoinMind.in" consistently in Organization schema `alternateName`, the About page and social bios. Build real `sameAs` profiles (LinkedIn page, X, YouTube) so the entity becomes distinct.
- No off-site footprint was found apart from a Contra listing. Backlinks and mentions are the biggest growth lever left.

---

## 🟡 7. On-page details

- **6 titles over 65 characters:** 8th Pay Commission (79), HRA (74), and four news headlines (66–74).
- **22 descriptions over 160 characters.** 4 descriptions are under 70 characters: `cagr-vs-xirr`, `sukanya-samriddhi-yojana-guide`, `how-to-build-emergency-fund`, `how-to-calculate-income-tax-salary`.
- **20 titles under 30 characters**, mostly blogs ("Home Loan Tax Benefit 2026", "UPI Payment Apps Compared"). They lose keyword modifiers. Consider "Home Loan Tax Benefit 2026: 24(b), 80C & 80EEA Explained".
- `HowTo` schema appears on 56 pages. Google retired HowTo rich results, so it's harmless but gives no SERP benefit.
- `http://www.coinmind.in` → `https://www.coinmind.in` → `https://coinmind.in` is a 2-hop chain. A single Cloudflare redirect rule (any host or scheme → `https://coinmind.in/$path`) would make it one hop.

---

## ✅ 8. Layout and mobile (375px)

| Page | Horizontal overflow | CLS | Notes |
|---|---|---|---|
| Home | none | 0 | Decorative blob is clipped. OK |
| SIP calculator | none | 0 | Quick Answer renders well; maths checked (₹10k × 15 y × 12% = ₹50.46 L ✓) |
| Blog post | none | 0 | "Written & reviewed by MD Sahil" byline is visible |
| In-hand salary | none | 0 | — |
| IPO GMP | none | 0 | Wide table scrolls inside its own container. OK |

- The cookie banner is now **104 px** (the commit claimed ~50 px; it was 158 px). Acceptable.
- Home has 4 tap targets under 24 px, and blog and salary pages have 6–9 (inline links and footer). Minor.
- Average HTML is 92 KB (≈25 KB compressed). Responses are served from the edge cache (`x-opennext-cache: HIT`).

---

## 🟢 9. AEO / GEO status

- ✅ AI crawlers are allowed; `llms.txt` and `llms-full.txt` (5.3k words) both return 200.
- ✅ FAQPage schema on 298 pages, Article on 136, DefinedTerm on 81, plus WebApplication and Breadcrumbs.
- 🔴 Calculator content is hidden from non-JS crawlers (§2). This is the top AEO fix.
- 🟠 Add Quick Answer blocks to the other 49 calculators; only 6 have them.
- 🟠 The research pages (repo, PPF and EPF rate history, tax slab history) are your best citation bait but run about 320 words. Expand them with full tables, sources and a CSV download.
- 🟠 `llms.txt` still promotes off-topic sections (§4).

---

## Priority list

### P0: this week
1. Delete `app/calculators/loading.tsx` and `app/tools/loading.tsx` so content is server-rendered inside `<main>`.
2. Fix freshness: add a daily redeploy cron **or** move ISR routes to the R2 cache. Fix the IPO GMP page (data or wording).
3. Submit the sitemap in GSC (Domain property) and Bing; check Crawl stats over the next 7 days for 5xx (should be 0).

### P1: next 2 weeks
4. Link every orphan: complete the `/calculators` and `/ipos` hubs and add a related-calculators rail.
5. Stop linking noindexed salary bands and income-tax pages, or index the strong ones (business call).
6. Noindex the age, tip, date and percentage calculators and the scientific calculator; resolve `/ai-tools` and `/ai-assistant`; update the About title and `llms.txt`.
7. Expand `/comparisons/*` and `/research/*` to 1,000+ words with sources.
8. Add source links on tax and rate pages; add alt text to the 307 images.
9. Fix 6 long titles, 22 long descriptions, 4 short descriptions and the weak short blog titles.

### P2: 1–3 months
10. Add Quick Answer blocks to all 55 calculators.
11. Brand entity work: `alternateName`, real social profiles, a CA reviewer, domain email.
12. Build off-site authority: Reddit and Quora answers, finance newsletters, and guest posts on Indian finance blogs.
13. Re-audit monthly. Run `npm run seo:audit`, and test GPTBot-style fetches with `curl` (no JS) to confirm content is visible.
