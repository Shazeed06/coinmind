# CoinMind (coinmind.in): Deep SEO / AEO / GEO Audit
**Date:** 15 Nov 2026 · **Method:** live crawl of all 571 sitemap URLs, repeated status checks, mobile render check (375px) in a browser, codebase review, index sampling.

---

## TL;DR: why the traffic isn't coming

| # | Cause | Severity |
|---|---|---|
| 1 | **Site is returning 500/503 errors on ~50% of requests**, homepage included (Cloudflare Worker exceeds its CPU limit) | 🔴 CRITICAL: the main cause |
| 2 | **Host migration www → apex** (4 Nov, Vercel → Cloudflare). Google has to re-learn every URL, and is hitting 5xx while it does | 🔴 High |
| 3 | **Very new domain** (first commit 14 Jul 2026, so 4 months old) with 571 pages, much of it published in batches | 🟠 High |
| 4 | **Topical dilution**: finance + AI tool reviews + PDF/image tools + resume builder + crypto glossary + petrol prices. Google's index sample for the site is mostly *crypto/NFT/Web3 glossary* pages, not SIP/EMI calculators | 🟠 High |
| 5 | Weak YMYL E-E-A-T: author is "Sahil", no surname, "CA Final candidate", no address, Gmail contact | 🟠 Medium |
| 6 | HTTP not redirected to HTTPS; sitemap has no `lastmod` on most URLs; 97 titles too long; IPO pages lack og:image | 🟡 Medium/Low |

Content, schema, and on-page basics are mostly in good shape. **Until #1 is fixed, no other SEO work will pay off.**

---

## 1. 🔴 CRITICAL: Server errors (500/503) on half of all requests

**Evidence (15 Nov 2026):**
- Full sitemap crawl: **141 / 571 URLs returned `503 Worker exceeded resource limits`**. They include `/calculators/sip`, `/calculators/emi`, `/calculators/fd`, `/calculators/ppf`, `/calculators/income-tax` and many blog posts.
- Sequential, one-at-a-time requests (not a load test):
  - Homepage: **10 of 20 failed** (500)
  - `/calculators/sip`: **19 of 30 failed**
- In a real browser, visitors see a blank black page reading only "Internal Server Error".
- The custom 404 also intermittently returns 500.

**Root cause:** `open-next.config.ts` is `defineCloudflareConfig()` with **no incremental cache**. Every request re-renders the whole Next.js page (homepage HTML is 200 KB) inside the Worker. The response always has `x-nextjs-cache: MISS`, so even prerendered (SSG) pages are rendered on every hit, and the render exceeds the Worker CPU limit.

**SEO impact:** Googlebot gets 5xx about half the time. Google reacts by **cutting crawl rate and dropping URLs from the index**. This also explains the earlier "Discovered – currently not indexed" pile-up getting worse. Users who land on the page bounce, and AdSense and GA lose sessions.

**Fix (do all three):**
1. **Turn on the OpenNext cache** so prerendered pages are served straight from assets:
   ```ts
   // open-next.config.ts
   import { defineCloudflareConfig } from "@opennextjs/cloudflare";
   import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
   export default defineCloudflareConfig({
     incrementalCache: staticAssetsIncrementalCache,
     enableCacheInterception: true,
   });
   ```
   For ISR pages (gold/petrol rates, news) use the R2 incremental cache plus a queue instead.
2. **Move to Workers Paid ($5/month)** if you're on the free plan. The CPU limit goes from 10 ms to 30 s. This alone will probably stop the errors.
3. **Add a Cloudflare Cache Rule** that caches HTML at the edge for anonymous GETs (respecting `s-maxage`), so most hits never reach the Worker.

**Verify afterwards:** 100 sequential requests to `/`, `/calculators/sip` and a blog post should all return 200. In GSC, check *Settings → Crawl stats → By response* (5xx should fall to about 0%), then *Validate fix* on the indexing reports.

---

## 2. 🔴 Domain / host migration (www → apex)

- The Sept audit had canonicals on `https://www.coinmind.in`. Since the Cloudflare move, `lib/site.ts` canonical is `https://coinmind.in` and www 301s to apex. The redirects work correctly (301/308, path preserved).
- But Google treats this as a **site move**: every URL is re-evaluated, and that happened at the same time as the 5xx errors, which is the worst possible combination.
- **`http://coinmind.in` returns 200, with no redirect to HTTPS.** HSTS protects browsers, but crawlers and links can still create HTTP duplicates.

**Fix:**
- Cloudflare → SSL/TLS → Edge Certificates → **Always Use HTTPS = ON**.
- In GSC, use a **Domain property** (`sc-domain:coinmind.in`) so www and apex are both tracked. Resubmit `https://coinmind.in/sitemap.xml`.
- Update every external profile (social, directories, AdSense site entry, Bing Webmaster) to the apex URL.
- Remove the non-standard `Host:` line from robots.txt. Only Yandex ever used it.

---

## 3. 🟠 New domain + scaled content

- First commit is 14 Jul 2026, so the site is about 4 months old, with 571 indexable URLs.
- Programmatic sets: 65 `/in-hand-salary/*`, 102 `/glossary/*`, 26 `/gold-rate/*`, 21 `/petrol-price/*`, 21 `/diesel-price/*`, 17 `/currency/*`, 15 `/calculators/fd/*`.
- `dateModified` clusters: **49 pages share 2026-07-24**; 41 commits landed on 25 Oct. That's a batch-publishing pattern.
- A new domain with low authority and many templated pages is exactly the profile Google parks under "Discovered – not indexed".

**Fix:**
- **Prune or noindex thin programmatic pages** until authority builds. Candidates:
  - `in-hand-salary` pages beyond the top ~15 salary bands people actually search for
  - `currency/*`
  - `diesel-price/*`, which duplicates petrol with a different number
  - `comparisons/*` (about 420 words each)
  - `research/*` (about 450 words)
  - `finance-prompts/*` (about 490 words)
- Keep the sitemap to the roughly **150–200 best URLs** for the next 2–3 months, and add the rest back as they get indexed.
- Publish on a steady weekly cadence instead of in bursts.

---

## 4. 🟠 Topical focus (biggest long-term ranking lever)

Google's index sample for `site:coinmind.in` is dominated by **NFT, Web3, gas fees, DEX, crypto market cap** glossary pages, plus Qwen and ElevenLabs reviews. Money pages like the SIP and EMI calculators don't show. The brand name "CoinMind" also suggests crypto.

The site currently covers:

| Cluster | Fits a "personal finance India" site? |
|---|---|
| Calculators (55), tax, SIP, loans, savings hubs | ✅ Core |
| IPO GMP / allotment, gold rate | ✅ OK (news-like, competitive) |
| AI tool reviews (27), "best AI for coding / Midjourney alternatives" blogs | ❌ Off-topic |
| PDF/image/base64/JSON/password tools (25) | ❌ Off-topic |
| Resume builder, GPA calculator, age calculator | ❌ Off-topic |
| Crypto/Web3 glossary terms | ⚠️ Mixed |

**Fix:**
- Decide that CoinMind is **"Personal finance calculators & tax for India"**.
- Noindex or move the off-topic AI-review blogs, `/ai-tools/*` reviews unrelated to finance, and generic dev/image tools. A subdomain or a separate site works for the tools.
- `/blog/` has ~28 pure-AI posts (see `blog-audit.csv`, NOINDEX candidates). Act on that list now.
- Point internal linking strength at about 10 money pages: SIP, EMI, income tax, FD, PPF, HRA, home loan EMI, NPS, take-home salary, old vs new regime.

---

## 5. 🟠 E-E-A-T for a YMYL finance site

| Signal | Current | Needed |
|---|---|---|
| Author name | "Sahil" (no surname, TODO in `lib/site.ts`) | Full real name, photo, LinkedIn, ICAI student reg. if shareable |
| Credential | "CA (Final) candidate" | Add a **qualified reviewer** (a practising CA / CFP) as "Reviewed by" on tax and investment pages |
| Contact | Gmail, 146-word contact page, location "India" | Domain email (e.g. hello@coinmind.in), city/state, response time |
| About page | 388 words | 800+ words: story, team, how the calculators are tested, funding/monetisation |
| Freshness | Calculators have **no dateModified** | Show "Last verified: <date> against Budget 2026 / RBI circular X" on every calculator |
| External proof | none found | Mentions on Reddit (r/IndiaInvestments, r/personalfinanceindia), Quora, LinkedIn, finance newsletters |

Positives: editorial policy, corrections log, sources page, methodology page, and Person/Organization schema already exist. That's good groundwork.

---

## 6. AEO / GEO (AI answers: ChatGPT, Perplexity, Gemini, AI Overviews)

**Already good**
- robots.txt allows all major AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…).
- `/llms.txt` exists and is linked from `<head>`.
- 345 pages carry FAQPage schema; calculators have WebApplication + HowTo + FAQ; blogs have Article with author, datePublished and dateModified.
- IndexNow key is set up, which matters because Bing's index feeds ChatGPT Search.

**Gaps**
1. **The 5xx errors block AI crawlers too.** AI bots retry less than Googlebot.
2. `/llms-full.txt` is linked or expected but returned 503. Make it static, or remove it.
3. Calculator pages run about 620 words. Add a **40–60 word direct-answer block** at the top of each one, a worked example table with real numbers, and the formula as plain text. Assistants quote exactly these.
4. Add **original data** that only CoinMind has, such as "Average in-hand salary at 10 LPA after new regime, FY26-27", the repo rate history table, or PPF rate history. You already have `/research/*`; expand those pages to 1,000+ words with downloadable CSVs. Unique data gets cited.
5. HowTo rich results were retired by Google, and FAQ rich results are limited to authoritative gov/health sites. Keep the schema for AI parsing, but don't expect SERP stars.
6. Brand entity: create consistent profiles (LinkedIn page, X, YouTube, Crunchbase or Wellfound) with `sameAs` in the Organization schema. LLMs resolve brands through these.

---

## 7. On-page technical findings (430 pages that returned 200)

| Check | Result |
|---|---|
| Canonical present & self-referencing | ✅ 430/430 |
| Meta description present | ✅ all, 0 duplicates |
| Exactly one H1 | ✅ all |
| Duplicate titles | ✅ none (apart from the Cloudflare error page ×141) |
| Titles > 65 chars | ⚠️ **97** (blog 38, gold-rate 15, finance-prompts 15). The template appends " · CoinMind" |
| Descriptions > 165 chars | ⚠️ 128 (truncated in SERP) |
| JSON-LD present | ✅ all |
| og:image missing | ⚠️ **all 19 `/ipos/*`**, plus `/widgets`, `/finance-today`, 2 comparisons, 1 research |
| Thin pages (< 500 words) | ⚠️ `/contact` 146, `/corrections` 271, `/about` 388, comparisons ~420, research ~450, petrol/diesel hubs ~420 |
| Sitemap `lastmod` | ⚠️ missing on most URLs. Add real lastmod (from content data or git) |
| Response time (when 200) | ✅ ~170 ms average |
| Security headers / HSTS / CSP | ✅ solid |
| 404 handling | ⚠️ correct 404 when it works, but intermittently 500 |
| `/calculators/sip` rewrites URL to `?m=10000&r=12&y=15` on load | OK, the canonical is clean. Make sure internal links never point to parameter URLs |

---

## 8. Layout / overlay / UX (mobile 375px)

- ✅ No horizontal overflow on home, SIP calculator or a blog post. Tables fit.
- ⚠️ **Cookie banner is 158 px, fixed at the bottom**: about 20% of the mobile screen, covering the calculator inputs on first load. Shrink it to a single-line bar (~60 px) or a corner toast.
- ⚠️ 27 tap targets under 24 px tall on the SIP page (breadcrumbs, share chips, footer links). Aim for 44 px or more.
- ✅ Sticky header is 69 px. Fine.
- 🔴 The blank "Internal Server Error" page (section 1) is the worst UX problem on the site right now.

---

## 9. Priority action plan

### This week (P0)
1. Fix the Worker 5xx: OpenNext cache, Workers Paid, edge cache rule. Verify 100% 200s.
2. Cloudflare: Always Use HTTPS on.
3. GSC Domain property: resubmit the sitemap, check Crawl stats, validate fixes. Run the same in Bing Webmaster.
4. Ping IndexNow for the top 50 URLs once they're stable.

### Next 2–4 weeks (P1)
5. Noindex the ~28 off-topic AI blogs, unrelated AI-tool reviews and generic dev/image tools. Trim the sitemap to the best 150–200 URLs.
6. Prune or consolidate thin programmatic pages (in-hand-salary long tail, currency, diesel).
7. E-E-A-T: real author name and photo, a CA reviewer, domain email, expanded About and Contact pages.
8. Fix the 97 long titles and 128 long descriptions; add og:image to IPO pages; add sitemap lastmod.
9. Shrink the cookie banner on mobile.

### 1–3 months (P2)
10. Rebuild the top 10 money pages: answer-first block, worked examples, "last verified" date, internal links from every related blog and hub.
11. Original research pages with data and CSV downloads, to earn links and AI citations.
12. Brand and off-site work: Reddit/Quora answers that link calculators, finance-newsletter mentions, `sameAs` profiles.
13. Track AI visibility monthly (ChatGPT, Perplexity, Gemini, AI Overviews) for about 30 target queries.

---

*Raw crawl data from this audit was 571 rows (status, title, description, canonical, schema types, word count per URL). Re-run with `npm run seo:audit` after fixes.*
