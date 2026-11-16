# CoinMind (coinmind.in): Deep Audit v3
**Date:** 15 Nov 2026 (night) · **Live build:** `b021503` · **Previous:** [v2](DEEP-AUDIT-2026-11-15-v2.md)
**Method:**
- 90 sequential uptime requests
- full link-graph crawl of 693 pages (all 200)
- no-JS (GPTBot user-agent) fetch of key pages
- mobile render check at 375px
- browser console and network inspection
- source review of the new commit

> Note: the working tree has **uncommitted edits** to `app/ipos/ipo-gmp-today/page.tsx`, `app/ipos/upcoming-ipo/page.tsx` and `components/IpoGmpTracker.tsx`. This audit covers what is **live**.

---

## Status of the v2 findings

| v2 finding | Status now |
|---|---|
| Calculator content hidden in `<div hidden>` (loading.tsx) | ✅ **Fixed.** No-JS fetch of `/calculators/sip` now has 1,472 words, H1 and Quick Answer inside `<main>`, with no hidden S:0 div. The same holds for income-tax, invoice-generator and the `/calculators` hub. |
| 5xx errors | ✅ 0/90 failures; all 693 pages return 200 |
| IPO GMP page stale (18 Oct) | ⚠️ **Replaced with something worse** (§1) |
| ISR frozen by the read-only cache | ❌ Not fixed. `open-next.config.ts` is unchanged. Gold shows "Updated 15 November 2026", petrol "Sunday, 15 November 2026", and both will freeze until the next deploy |
| Orphan pages (15) | 🟡 Down to 12. Zepto, OYO and Hero FinCorp now get links from the tracker; `ss-retail`, `razorpay` and the 6 goal calculators plus simple-interest, sales-tax, hourly-to-salary and net-worth are still orphaned |
| Link equity to noindex pages | ❌ Unchanged. `/income-tax/12-lakh` gets 81 links and the noindex salary bands get 65 each |
| Off-topic calculators indexable | ❌ Unchanged (age, tip, date-difference, percentage, scientific) |
| `/ai-tools`, `/ai-assistant` indexable but not in sitemap | ❌ Unchanged |
| Comparisons (415 words) / research (320 words) thin | ❌ Unchanged |
| 307 images without alt | ❌ Unchanged |
| Titles > 65 characters | ❌ **8 now** (was 6). The new IPO titles added 2 |
| `llms.txt` / About title still promote AI tools | ❌ Unchanged |

---

## 🔴 1. The new "Live IPO GMP Tracker" shows invented financial data (highest risk)

`components/IpoGmpTracker.tsx` hardcodes a `LIVE_IPOS` array, which the page presents as **"Live Market Quotes · 15 November 2026"** and **"Real-time grey market premium… updated daily"**. Problems:

1. **Real past IPOs are recycled with 2026 dates.**
   - "NTPC Green Energy, ₹102–108, lot 138, *Upcoming 19 Nov 2026*" is the **November 2024** IPO, with identical price band and lot size. NTPC Green has been listed since 2024 and cannot IPO again.
   - "Swiggy Limited, ₹371–390, lot 38, *Listed 13 Nov 2026*" is the same story: Swiggy listed in **November 2024**.
2. **The numbers contradict CoinMind's own pages:**

   | IPO | Tracker says | Own IPO page says |
   |---|---|---|
   | Zepto | ₹420–450 | ₹300–350 |
   | OYO | ₹120–135 | ₹55–58 |

   Hero FinCorp is ₹850–900 on the tracker, while an earlier audit saw "₹428" on its own page.
3. **GMP figures** (+₹3, +₹125, +₹245…) have no source and no feed. Nothing updates them, yet the page says "Real-time" and "Live".

**Why this is P0:**
- IPO GMP is YMYL content that readers use to make money decisions.
- Fabricated or recycled figures presented as live quotes break Google's misleading-content policies. They also risk AdSense policy action ("unreliable claims") and invite a Helpful Content or site-reputation hit that can drag down the **whole domain**, not just this page.
- AI assistants will quote these numbers with CoinMind as the source.

**Fix:**
- Remove the hardcoded array today.
- Show only IPOs whose price band and dates you can **source** (NSE/BSE issue documents, RHP), with a visible "Source / as of" line on every row.
- If there's no real data feed, drop "Live", "Real-time" and "updated daily" everywhere (title, H1, badge, meta, schema) and call it "Upcoming IPO list with indicative GMP (as of <date>)".
- Make every IPO figure come from **one** data file so pages can't contradict each other.

---

## 🔴 2. CSP is blocking AdSense ads and Google tags (revenue and measurement)

Console errors on every page:

| Blocked request | Directive | Effect |
|---|---|---|
| `googleads.g.doubleclick.net` (iframe) | `frame-src` | **AdSense ad iframes can't render.** The ad request is made, but the creative is blocked, so there's no revenue |
| `ep1.adtrafficquality.google` | `connect-src` | AdSense's ad-quality / invalid-traffic checks fail |
| `www.google.com/measurement/conversion` | `connect-src` | Google Ads / GTM conversion pings blocked |
| `stats.g.doubleclick.net/g/collect` | `connect-src` | GA4 demographics and Signals hits blocked |
| `static.cloudflareinsights.com` | `script-src` | Cloudflare Web Analytics beacon blocked |

GA4 page views still work: `analytics.google.com/g/collect` is allowed and was seen firing.

**Fix (`next.config.ts`, CSP lines 5–10):**
- `frame-src`: add `https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://www.googleadservices.com`
- `connect-src`: add `https://*.adtrafficquality.google https://www.google.com https://stats.g.doubleclick.net https://*.doubleclick.net https://*.google-analytics.com https://*.analytics.google.com https://cloudflareinsights.com`
- `script-src`: add `https://*.adtrafficquality.google https://static.cloudflareinsights.com https://*.googlesyndication.com`
- `img-src https:` already covers pixels.

Also:
- **Clarity loads twice**, once through GTM (`?ref=gtm`) and once through the `Clarity` component. Remove one.
- **AdSense loads twice**: the new `<script>` in `layout.tsx` plus the existing `<AdSense>` component. Keep one.

---

## 🟠 3. Freshness (carried over from v2, not fixed)

- `staticAssetsIncrementalCache` is read-only, so `revalidate = 21600` on gold pages does nothing, and dates printed with `new Date()` freeze at build time.
- Tomorrow, `/gold-rate/*`, `/petrol-price/*` and `/finance-today` will still claim "Sunday, 15 November 2026".
- **Fix (pick one):**
  1. A daily redeploy through a Workers Builds deploy hook plus a cron.
  2. R2 incremental cache + DO queue for the ISR routes.
  3. Render the date and rate on the client from `/api/rates`.

---

## 🟠 4. Deploy skew (new, minor)

Each deploy deletes the previous build's `/_next/static` chunks. Visitors with a page open from the earlier build got `404` plus "MIME type text/plain" errors for `085qr4eu-nn8v.js` and `14jcu3gzdlntv.css`. With several deploys a day this breaks client navigation for users mid-session.
→ Enable OpenNext **skew protection**, or keep the previous build's assets, and deploy less often.

---

## 🟠 5. Internal linking (partly carried over)

- **12 orphans with zero inlinks:**
  - IPOs: `/ipos/ss-retail-ipo`, `/ipos/razorpay-ipo`
  - Calculators: `simple-interest`, `sales-tax`, `hourly-to-salary`, `net-worth`, `goal`, and 5 `goal-*` pages
- **75 sitemap URLs have two or fewer internal links.**
- **Noindex pages that soak up links:**
  - `/income-tax/12-lakh` gets 81 links
  - 11 noindex salary bands get 65 links each
  - the homepage links to the noindexed `/blog/fixed-deposit-interest-rates-2026`

---

## 🟡 6. On-page

| Check | Result |
|---|---|
| Canonical / H1 / duplicate titles, descriptions, H1s / og:image / twitter / JSON-LD parse | ✅ 0 issues |
| Titles > 65 | **8** (new: "IPO GMP Today: Live Grey Market Premium Tracker (Nov 2026) \| CoinMind" at 69, and "Jio IPO Allotment Status Check Online…" at 68) |
| Descriptions > 160 / < 70 | 22 / 4 |
| Blog titles < 30 characters | 14 (weak keyword modifiers) |
| Images without alt | 307 |
| Pages with 0 outbound source links | most of the sitemap |
| Thin sections | comparisons 415, research 320, contact 244, finance-today 323 |

---

## ✅ 7. Layout / UX (mobile 375px)

- Home and the IPO tracker: no horizontal overflow, CLS 0. The tracker's table and filter chips scroll inside their own containers.
- The cookie banner is 104 px, which is acceptable.
- ⚠️ The "Live Market Quotes · 15 November 2026" badge is a trust problem, not a layout one (see §1).

---

## ✅ 8. AEO / GEO

- ✅ Non-JS crawlers now see full calculator content inside `<main>`. This was the biggest AEO fix from v2.
- ✅ The robots allowlist, `llms.txt`, `llms-full.txt` and FAQ/Article/DefinedTerm schema are all in place.
- ❌ `llms.txt` still lists "AI tools comparisons" and "resume builder, PDF tools…".
- ❌ The IPO tracker data (§1) is exactly the kind of content assistants scrape and quote. Fix it before it spreads.
- 🟠 Only 6 of 55 calculators have a Quick Answer block. Research pages are still about 320 words.

---

## Priority list

### P0: today
1. **Pull the fabricated IPO data.** Remove the recycled NTPC Green and Swiggy entries and the unsourced GMPs; drop "Live", "Real-time" and "updated daily"; put all IPO figures in a single sourced data file.
2. **Fix the CSP** so AdSense iframes, ad-quality checks and Google tags work, and remove the duplicate AdSense and Clarity loaders.

### P1: this week
3. Freshness: daily redeploy cron, or R2 cache for ISR routes.
4. Link the 12 orphans; stop linking noindex salary and income-tax pages (or index the strong ones).
5. Noindex the off-topic calculators; resolve `/ai-tools` and `/ai-assistant`; update `llms.txt` and the About title.
6. Fix the 8 long titles, 22 long descriptions and 4 short descriptions.
7. Enable skew protection and batch deploys.

### P2: 2–6 weeks
8. Expand comparisons and research to 1,000+ words with sources and tables.
9. Add Quick Answer blocks to the remaining 49 calculators; add alt text to 307 images; link primary sources.
10. Brand entity work and off-site authority (as in v2 §6).
