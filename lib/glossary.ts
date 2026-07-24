// Programmatic Finance + AI glossary.
//
// Each term becomes a statically-generated page at /glossary/<slug> (see
// app/glossary/[slug]/page.tsx) plus a row on the /glossary index. The `short`
// is a tight 1–2 sentence definition written to be lifted verbatim into Google
// AI Overviews and cited by ChatGPT/Perplexity (AEO/GEO), so keep it accurate
// and self-contained (≤160 chars for the meta description). `bodyMarkdown` is
// prose rendered by components/ArticleMarkdown.tsx — it supports ## headings,
// paragraphs, **bold** and [links](/path) but NO markdown lists.

export type GlossaryCategory = "Investing" | "Tax" | "Credit" | "Banking" | "AI";

export type GlossaryTerm = {
  slug: string;
  term: string;
  category: GlossaryCategory;
  /** 1–2 sentence plain-English definition — the AEO snippet target (≤160 chars). */
  short: string;
  /** 2–4 short prose paragraphs (## optional, **bold** and [links] ok, NO lists). */
  bodyMarkdown: string;
  /** Slugs of other glossary terms to cross-link. */
  related: string[];
  /** Optional link to a real calculator/tool/guide most relevant to the term. */
  relatedHref?: string;
  /** Button label for relatedHref. */
  relatedLabel?: string;
};

/** Display order for the index page and category grouping. */
export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "Investing",
  "Tax",
  "Credit",
  "Banking",
  "AI",
];

export const GLOSSARY: GlossaryTerm[] = [
  // ── Investing ──────────────────────────────────────────────────────────
  {
    slug: "sip",
    term: "SIP",
    category: "Investing",
    short:
      "A Systematic Investment Plan (SIP) is a way to invest a fixed amount in a mutual fund at regular intervals, usually monthly, instead of a lump sum.",
    bodyMarkdown: `A SIP automates investing. You commit a set amount — say ₹5,000 a month — and it is debited from your bank account automatically on a fixed date and used to buy units of the mutual fund you chose. You do not time the market, place an order, or make a decision each month. That is the entire point.

## How a SIP actually works

On your chosen date, the money leaves your account and buys units at that day's [NAV](/glossary/nav), the fund's per-unit price. If the NAV is ₹50, your ₹5,000 buys 100 units. If markets have fallen and the NAV is ₹40, the same ₹5,000 buys 125 units. Your unit count grows every month, and what those units are worth depends on where the fund's holdings are priced when you eventually sell.

There is no lock-in on an open-ended equity fund, with one exception: an [ELSS](/glossary/elss) tax-saving fund locks each instalment for three years from the date it was invested.

## Rupee cost averaging, with real numbers

This is the mechanism people mean when they say SIPs reduce risk, and it is worth seeing rather than taking on trust.

Suppose you invest ₹6,000 a month for three months and the NAV moves ₹100, then ₹75, then ₹120. You buy 60 units, then 80 units, then 50 units — 190 units for ₹18,000, an average cost of about ₹94.74 per unit. But the simple average of the three prices is ₹98.33. You paid less than the average price, without predicting anything, purely because a fixed rupee amount automatically buys more units when prices are low. That is [rupee cost averaging](/glossary/rupee-cost-averaging).

It does not protect you from a market that falls and stays down. It protects you from the far more common problem of investing everything on one unlucky day.

## What a SIP can realistically grow to

A ₹5,000 monthly SIP, if it earned 12% a year, would be worth roughly ₹11.6 lakh after 10 years against ₹6 lakh invested. Stretch it to 20 years and it reaches about ₹50 lakh against ₹12 lakh invested. Doubling the time did not double the outcome — it more than quadrupled it, because [compound interest](/glossary/compound-interest) does most of its work late.

Treat 12% as an assumption, not a promise. Equity returns are not smooth or guaranteed, and a decade that averages 12% will still contain years of double-digit losses. Our [SIP calculator](/calculators/sip) lets you test more conservative rates, which is a healthier way to plan.

## SIP or lump sum?

If the money arrives monthly from a salary, the question does not really exist — a SIP is simply how you invest income as it comes. The comparison only matters when you are holding a lump sum, from a bonus or a maturity, and wondering whether to deploy it at once or spread it out.

Mathematically, investing a lump sum immediately wins more often than not, because markets rise over most long periods and money invested earlier compounds longer. Behaviourally, staggering it hurts far less when the market drops the following week. Our guide on [SIP vs lump sum](/blog/sip-vs-lumpsum) works through both cases.

## How to start one

You need a PAN, a bank account and completed KYC. From there you can start directly on a fund house's own website, through a broker or investment app, or via a registered mutual fund distributor. You choose the fund, the amount, the date and the frequency, and set up a mandate that lets the fund debit your account each month.

Start with an amount you will not be tempted to stop during a bad quarter. ₹1,000 sustained for a decade beats ₹10,000 abandoned after eight months.

## Where people go wrong

The most expensive mistake is stopping a SIP when markets fall. Those are precisely the instalments that buy the most units, and cancelling them converts a temporary decline into a permanent loss of the recovery.

The second is chasing last year's best-performing fund each year, which reliably buys high. The third is running a SIP with no goal and no horizon, so there is nothing to hold on to when the value dips. Decide upfront what the money is for and when you need it, then let the automation do its job.`,
    related: ["mutual-fund", "rupee-cost-averaging", "lumpsum", "compound-interest"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "mutual-fund",
    term: "Mutual Fund",
    category: "Investing",
    short:
      "A mutual fund pools money from many investors and a professional manager invests it across stocks, bonds or other assets on their behalf.",
    bodyMarkdown: `When you buy a mutual fund, your money is combined with that of thousands of other investors and managed as one large portfolio. You own units, and the value of each unit — its [NAV](/glossary/nav) — rises or falls with the underlying holdings.

Funds are grouped by what they invest in: equity funds hold shares, debt funds hold bonds, and hybrid funds mix both. This built-in [diversification](/glossary/diversification) means one bad stock has limited impact on your total investment.

For example, an equity fund might hold 50 different companies. If you put the same money into a single stock, one company's collapse could wipe you out; in the fund it is just one holding among many. You can invest through a [SIP](/glossary/sip) or a one-time [lumpsum](/glossary/lumpsum).`,
    related: ["sip", "nav", "etf", "index-fund", "expense-ratio"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "ppf",
    term: "PPF",
    category: "Investing",
    short:
      "The Public Provident Fund (PPF) is a government-backed savings scheme with a 15-year lock-in, tax-free interest and Section 80C tax deductions.",
    bodyMarkdown: `PPF is one of India's safest ways to build long-term wealth. You can invest between ₹500 and ₹1.5 lakh a year, and the government sets the interest rate each quarter (around 7.1% recently), compounded annually.

Its biggest draw is the tax treatment. Contributions qualify for a [Section 80C](/glossary/section-80c) deduction, the interest is tax-free, and the maturity amount is tax-free too — a rare triple exemption known as EEE.

The catch is liquidity: the account matures in 15 years, though partial withdrawals are allowed from year seven. For example, investing ₹1.5 lakh a year for 15 years at 7.1% builds a corpus of roughly ₹40 lakh, entirely tax-free.`,
    related: ["epf", "nps", "elss", "section-80c", "fixed-deposit"],
    relatedHref: "/calculators/ppf",
    relatedLabel: "PPF Calculator",
  },
  {
    slug: "nps",
    term: "NPS",
    category: "Investing",
    short:
      "The National Pension System (NPS) is a government retirement scheme where you invest during your career to build a pension, with extra tax benefits.",
    bodyMarkdown: `NPS lets you contribute during your working years to a mix of equity and debt, managed by professional pension fund managers. Your money grows until you turn 60, when part of the corpus is paid out and the rest buys an annuity that provides a monthly pension.

Its standout feature is an extra tax deduction. Beyond the ₹1.5 lakh [Section 80C](/glossary/section-80c) limit, NPS offers an additional ₹50,000 deduction under Section 80CCD(1B).

The trade-off is a lock-in until retirement and a rule that part of the maturity must buy an annuity. For a young investor, decades of [compound interest](/glossary/compound-interest) on equity exposure can build a substantial retirement corpus.`,
    related: ["epf", "ppf", "section-80c", "compound-interest"],
    relatedHref: "/calculators/nps",
    relatedLabel: "NPS Calculator",
  },
  {
    slug: "epf",
    term: "EPF",
    category: "Investing",
    short:
      "The Employees' Provident Fund (EPF) is a retirement scheme where you and your employer each contribute 12% of your basic salary every month.",
    bodyMarkdown: `EPF is deducted automatically from most salaried employees' pay. You contribute 12% of your basic salary plus dearness allowance, and your employer contributes a matching amount, part of which goes to a linked pension scheme.

The balance earns interest set by the government each year — around 8.25% recently — compounded annually and largely tax-free if you stay invested for at least five years.

For example, if your basic salary is ₹40,000, roughly ₹4,800 from you and a similar amount from your employer flows into EPF each month. Over a full career this becomes one of the largest parts of most people's retirement savings, and it also counts toward your [Section 80C](/glossary/section-80c) deduction.`,
    related: ["ppf", "nps", "gratuity", "section-80c"],
    relatedHref: "/calculators/epf",
    relatedLabel: "EPF Calculator",
  },
  {
    slug: "elss",
    term: "ELSS",
    category: "Investing",
    short:
      "An ELSS is a tax-saving equity mutual fund that qualifies for Section 80C and has just a three-year lock-in, the shortest of any 80C option.",
    bodyMarkdown: `ELSS funds combine tax saving with equity growth. Investing up to ₹1.5 lakh a year qualifies for a [Section 80C](/glossary/section-80c) deduction, while your money is invested in the stock market for potentially higher long-term returns than PPF or FDs.

The lock-in is only three years, far shorter than PPF's 15 or a 5-year tax-saving FD. Because it is equity, returns are not guaranteed and can be volatile in the short term.

For example, a ₹1.5 lakh investment in an ELSS through a [SIP](/glossary/sip) both reduces your taxable income and gives you market exposure. Gains above ₹1.25 lakh a year are taxed as long-term [capital gains](/glossary/capital-gains).`,
    related: ["mutual-fund", "section-80c", "ppf", "sip", "capital-gains"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "nav",
    term: "NAV",
    category: "Investing",
    short:
      "Net Asset Value (NAV) is the per-unit price of a mutual fund: its total assets minus liabilities, divided by the number of units outstanding.",
    bodyMarkdown: `NAV tells you what one unit of a mutual fund is worth on a given day. If a fund holds assets worth ₹100 crore with ₹1 crore of liabilities and has 9.9 crore units, its NAV is ₹10.

When you invest, your money buys units at the current NAV; when you redeem, you sell at that day's NAV. A ₹6,000 investment at a NAV of ₹30 buys you 200 units.

A common myth is that a low NAV means a fund is cheap or better value. It does not — NAV simply reflects the fund's history and unit count. What matters for returns is the percentage change in NAV, not its absolute number.`,
    related: ["mutual-fund", "etf", "index-fund", "expense-ratio"],
  },
  {
    slug: "etf",
    term: "ETF",
    category: "Investing",
    short:
      "An Exchange-Traded Fund (ETF) is a basket of securities, often tracking an index, that trades on a stock exchange like a single share at low cost.",
    bodyMarkdown: `An ETF bundles many stocks or bonds into a single fund, but unlike a regular mutual fund it is listed on a stock exchange and its price moves throughout the trading day. You buy and sell ETF units through a demat and trading account exactly as you would a share.

## How an ETF differs from a mutual fund

The holdings can be identical. The difference is the wrapper.

A mutual fund is priced once a day. Whatever time you place your order, you get that day's [NAV](/glossary/nav), and you transact with the fund house itself. An ETF trades continuously, so its price moves minute to minute, and you transact with another investor on the exchange rather than with the fund.

That gives ETFs intraday flexibility — you can place limit orders, buy at a specific price, or sell mid-session. It also introduces two frictions a mutual fund does not have: you pay brokerage on each trade, and the market price can drift slightly away from the fund's true underlying value.

## Tracking error and the price gap

Two small imperfections are worth understanding before you buy.

**Tracking error** is the gap between the index's return and the ETF's return. It exists because the fund charges a fee, holds a little cash, and has to trade when the index rebalances. A well-run large ETF keeps this small; a thinly-traded one may not.

**The premium or discount** is the gap between the ETF's market price and the value of what it actually holds. In a liquid ETF this stays negligible. In an illiquid one, especially during a volatile session, you can pay meaningfully more than the units are worth. Checking the traded volume before buying matters more with ETFs than with mutual funds.

## Why the cost is so low

Most ETFs are passive: they mirror an index such as the Nifty 50 rather than employing a manager to pick stocks. No research team means no research budget, which is why the [expense ratio](/glossary/expense-ratio) on a large index ETF is often a small fraction of what an actively managed fund charges.

That gap looks trivial in one year and decisive over twenty. A difference of one percentage point in annual cost, compounded across a working life, is a large amount of money that stays in your account instead of the fund's.

## What you actually own

A Nifty 50 ETF gives you a proportional stake in India's fifty largest listed companies in a single trade. If those companies collectively rise, so does your ETF, minus the fee. If they fall, so does it. You are accepting the market's return rather than trying to beat it — and consistently beating it turns out to be rare.

Beyond equity indices, ETFs exist for gold, for bonds, for international indices, and for narrower themes and sectors. The broad, boring ones are generally the ones worth owning; the narrow thematic ones concentrate risk in exactly the way an ETF is supposed to avoid.

## ETF or index fund?

They do the same job through different plumbing, and for most people the [index fund](/glossary/index-fund) is the more practical choice.

An index fund needs no demat account, charges no brokerage, and accepts a [SIP](/glossary/sip) — you can automate ₹2,000 a month and never think about it. An ETF needs a demat and trading account and cannot be automated in the same way, but gives you intraday pricing and often a marginally lower expense ratio.

If you are investing a fixed amount every month and want it hands-off, the index fund wins on convenience. If you already trade, hold a demat account, and are deploying larger sums at once, the ETF's lower running cost starts to matter.

Either way you get instant [diversification](/glossary/diversification) at a low cost, which is the substance of the decision. The wrapper is a detail.`,
    related: ["index-fund", "mutual-fund", "nav", "expense-ratio", "diversification"],
  },
  {
    slug: "index-fund",
    term: "Index Fund",
    category: "Investing",
    short:
      "An index fund is a mutual fund that passively tracks a market index like the Nifty 50, aiming to match the market's return at a very low cost.",
    bodyMarkdown: `Instead of a manager choosing stocks, an index fund simply buys all the shares in an index in the same proportion. If the Nifty 50 rises 10%, a Nifty 50 index fund aims to return close to 10%, minus a tiny fee.

Because there is no expensive research team, index funds charge a very low [expense ratio](/glossary/expense-ratio), often under 0.2%. Over decades, that cost saving compounds into a meaningful advantage over most actively managed funds.

For example, a [SIP](/glossary/sip) into a Nifty 50 index fund gives you a stake in India's 50 largest listed companies in one go — simple, cheap and diversified. You accept the market's return rather than trying to beat it.`,
    related: ["etf", "mutual-fund", "expense-ratio", "sip", "diversification"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "compound-interest",
    term: "Compound Interest",
    category: "Investing",
    short:
      "Compound interest is interest earned on both your original money and the interest it has already earned, making savings grow faster over time.",
    bodyMarkdown: `With simple interest you earn a return only on your original amount. With compound interest, each period's interest is added to your balance, so the next period you earn interest on a larger sum — interest on interest.

The effect is small at first but dramatic over long periods. ₹1 lakh at 10% simple interest becomes ₹3 lakh after 20 years; at 10% compounded annually it becomes about ₹6.7 lakh.

## Why time matters most

The longer money compounds, the steeper the curve. This is why starting to invest early, even with small amounts, often beats investing larger amounts later. It is the engine behind [SIPs](/glossary/sip), [PPF](/glossary/ppf) and long-term wealth building.`,
    related: ["cagr", "inflation", "sip", "ppf"],
    relatedHref: "/calculators/compound-interest",
    relatedLabel: "Compound Interest Calculator",
  },
  {
    slug: "inflation",
    term: "Inflation",
    category: "Investing",
    short:
      "Inflation is the gradual rise in prices over time, which reduces the purchasing power of money, so the same amount buys less in the future.",
    bodyMarkdown: `If inflation is 6% a year, something that costs ₹100 today will cost about ₹106 next year. Your money has not changed, but what it can buy has shrunk.

This is why keeping all your savings in cash is risky over the long run. Money sitting idle loses real value every year, while investments that beat inflation preserve and grow your purchasing power.

For example, at 6% inflation, ₹10 lakh would have the buying power of only about ₹5.6 lakh in 10 years. To stay ahead, your investment returns need to exceed the inflation rate — the gap between them is your real return.`,
    related: ["compound-interest", "cagr", "fixed-deposit", "net-worth"],
    relatedHref: "/calculators/inflation",
    relatedLabel: "Inflation Calculator",
  },
  {
    slug: "cagr",
    term: "CAGR",
    category: "Investing",
    short:
      "CAGR (Compound Annual Growth Rate) is the smoothed average yearly return of an investment over a period, as if it grew at a steady rate each year.",
    bodyMarkdown: `Real investments rarely grow by the same amount every year — they jump up and down. CAGR strips out that year-to-year noise and tells you the single yearly rate that would have taken you from the start value to the end value.

The idea is the ending value divided by the starting value, annualised over the number of years. If ₹1 lakh grows to ₹2 lakh in 6 years, the CAGR is about 12.2%.

CAGR is useful for comparing investments on an equal footing, but it hides volatility — two funds with the same CAGR can carry very different risk. For investments with irregular cash flows, [XIRR](/glossary/xirr) is more accurate.`,
    related: ["xirr", "compound-interest", "inflation", "mutual-fund"],
    relatedHref: "/calculators/cagr",
    relatedLabel: "CAGR Calculator",
  },
  {
    slug: "xirr",
    term: "XIRR",
    category: "Investing",
    short:
      "XIRR is the annualised return of an investment when money goes in and out on irregular dates, such as a SIP with many monthly instalments.",
    bodyMarkdown: `CAGR assumes a single investment held for a set period. But a [SIP](/glossary/sip) adds money every month, and you may withdraw at odd times too. XIRR handles these irregular, dated cash flows and gives one annualised percentage return.

It works by finding the rate at which all your inflows and outflows, each weighted by its date, net to zero. Spreadsheet functions like XIRR do the maths for you.

For example, if you invested ₹5,000 monthly for three years and the final value is ₹2.1 lakh, XIRR tells you the true annual return, accounting for the fact that each instalment was invested for a different length of time — something a simple [CAGR](/glossary/cagr) cannot capture.`,
    related: ["cagr", "sip", "mutual-fund", "compound-interest"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "ipo",
    term: "IPO",
    category: "Investing",
    short:
      "An IPO (Initial Public Offering) is the first time a private company sells shares to the public and lists on a stock exchange.",
    bodyMarkdown: `Before an IPO, a company is privately owned by its founders, employees and early investors. In the IPO it sells shares to the public for the first time, and once listing day passes those shares trade freely on an exchange such as the NSE or BSE.

## Why companies go public

Two reasons, usually at once. The company raises capital it does not have to repay, funding expansion or clearing debt. And early backers — founders, employees, venture investors who have been locked in for years — finally get a market where they can sell.

That second reason matters to you as a buyer. An IPO where the company issues new shares brings money into the business. An offer for sale, where existing shareholders simply sell their stakes, brings the company nothing at all — the cash goes to the sellers. The offer document says which is which, and the mix tells you something about who the listing is really for.

## How to apply

You apply through ASBA, which stands for Application Supported by Blocked Amount, from your bank's net banking or your broker's app. Your money is not debited when you apply — it is **blocked** in your account. If you get an allotment, the amount is taken; if you do not, the block simply lifts and the money was never gone.

You apply in lots at a price within the announced band, and the issue stays open for a few days. Retail applications up to ₹2 lakh fall in the retail category, which has its own reserved portion.

## What happens when it is oversubscribed

Popular issues attract far more applications than there are shares. When that happens, retail investors go into a lottery: applications are randomly selected, and you either get one full lot or nothing at all.

This has a practical consequence people learn the hard way. Applying for a larger quantity does not improve your odds in the retail lottery, because selection happens per application, not per rupee. Nor does applying on the last day, or the first.

## Grey market premium is not information

Before listing, you will see a widely-quoted grey market premium purporting to predict the listing price. It is worth knowing what this actually is: an unofficial, unregulated, entirely opaque number produced by an off-market trading circle, with no disclosure requirements and no enforceable settlement behind it.

It is frequently wrong, it can be moved by people who benefit from moving it, and it says nothing about whether the business is worth owning. Treat it as noise.

## The real risk

If a company offers shares at ₹500 and lists at ₹650, early allottees see a listing gain. That is the version that gets discussed. Issues also list below their offer price, and there is no mechanism protecting you when they do.

The deeper problem is that an IPO is the one moment when the seller controls the timing, the price band and the narrative, and knows the business far better than you do. Companies list when conditions favour sellers, not buyers. That does not make every IPO bad, but it does mean the odds are not naturally tilted your way.

## How to look at one seriously

Read the red herring prospectus rather than the coverage. It is long, but the sections that matter are short: what the money will be used for, the risk factors, the financial history, and whether promoters are selling.

Compare the asking valuation to already-listed peers you can actually check. A company priced at a large premium to established competitors needs a specific reason for that premium, and if you cannot articulate the reason, that is your answer.

Finally, size the position as though it might halve, because sometimes it does. If you want equity exposure without judging individual listings, a [mutual fund](/glossary/mutual-fund) or [index fund](/glossary/index-fund) gets you there without needing to be right about any single company. When you do sell, remember the profit is taxable — see [capital gains](/glossary/capital-gains).`,
    related: ["dividend", "capital-gains", "mutual-fund", "diversification"],
  },
  {
    slug: "dividend",
    term: "Dividend",
    category: "Investing",
    short:
      "A dividend is a share of a company's profits paid out to its shareholders, usually in cash, as a reward for owning the stock.",
    bodyMarkdown: `When a company earns a profit, it can either reinvest it or return some to shareholders as a dividend. If a company pays a ₹10 dividend per share and you own 100 shares, you receive ₹1,000.

Not all companies pay dividends. Fast-growing firms often reinvest everything to expand, while mature, stable companies tend to pay regular dividends. Mutual funds also offer dividend (now called IDCW) options that pass payouts to investors.

Dividends are taxable in the investor's hands at their slab rate. For long-term investors, whether a company pays dividends or reinvests for growth matters less than its total return — dividends plus price appreciation.`,
    related: ["ipo", "capital-gains", "mutual-fund", "net-worth"],
  },
  {
    slug: "expense-ratio",
    term: "Expense Ratio",
    category: "Investing",
    short:
      "The expense ratio is the annual fee a mutual fund or ETF charges to manage your money, shown as a percentage of your investment.",
    bodyMarkdown: `If a fund has a 1% expense ratio, it deducts 1% of your invested amount each year to cover management, admin and marketing costs. The fee is taken from the fund's assets, so it quietly reduces your returns rather than appearing as a separate bill.

The number sounds small but matters hugely over decades. On a ₹10 lakh investment, 1% is ₹10,000 a year, and that drag compounds as your balance grows.

This is why low-cost [index funds](/glossary/index-fund) and [ETFs](/glossary/etf), often charging under 0.3%, appeal to long-term investors. Actively managed funds charge more and must beat the market by enough to justify the extra cost.`,
    related: ["index-fund", "etf", "mutual-fund", "nav"],
  },
  {
    slug: "lumpsum",
    term: "Lumpsum",
    category: "Investing",
    short:
      "A lumpsum investment is a one-time deposit of a large amount, as opposed to spreading it out through regular instalments like a SIP.",
    bodyMarkdown: `With a lumpsum you invest a big sum all at once — say ₹5 lakh from a bonus, inheritance or maturing FD — instead of drip-feeding it monthly. The full amount starts working, and compounding, from day one.

In a steadily rising market, a lumpsum often beats a [SIP](/glossary/sip) because more money is invested for longer. The risk is timing: invest just before a market fall and you sit on losses until it recovers.

For example, ₹5 lakh invested as a lumpsum at 12% grows to about ₹15.5 lakh in 10 years. Many investors compromise by staggering a large sum over several months to reduce timing risk while still deploying it fairly quickly.`,
    related: ["sip", "rupee-cost-averaging", "mutual-fund", "compound-interest"],
    relatedHref: "/calculators/lumpsum",
    relatedLabel: "Lumpsum Calculator",
  },
  {
    slug: "swp",
    term: "SWP",
    category: "Investing",
    short:
      "A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount from a mutual fund at regular intervals while the rest stays invested.",
    bodyMarkdown: `An SWP is the mirror image of a [SIP](/glossary/sip). Instead of putting money in each month, you take a fixed amount out — for example ₹20,000 a month — while your remaining units stay invested and can keep growing.

It is popular with retirees who want a regular, predictable income from a corpus without withdrawing everything at once. You control the amount and frequency, and can stop any time.

For example, from a ₹50 lakh corpus you might withdraw ₹25,000 a month. If the fund grows faster than your withdrawals, your capital can even last indefinitely; if not, it slowly depletes. SWPs can also be more tax-efficient than dividend payouts.`,
    related: ["sip", "mutual-fund", "lumpsum", "capital-gains"],
    relatedHref: "/calculators/swp",
    relatedLabel: "SWP Calculator",
  },
  {
    slug: "rupee-cost-averaging",
    term: "Rupee Cost Averaging",
    category: "Investing",
    short:
      "Rupee cost averaging is the effect of investing a fixed amount regularly, buying more units when prices are low and fewer when they are high.",
    bodyMarkdown: `When you invest the same rupee amount every month through a [SIP](/glossary/sip), your money buys a varying number of units depending on the price that month. In a dip, ₹5,000 buys more units; in a rally, it buys fewer.

Over time this averages out your purchase price and removes the temptation to time the market. You never invest everything at a peak, and you keep buying steadily through downturns when others panic.

For example, if a fund's price swings between ₹40 and ₹60, a fixed monthly investment ends up with an average cost below the simple midpoint, because more units were bought at the lower price. It is one of the quiet advantages of disciplined, regular investing.`,
    related: ["sip", "lumpsum", "mutual-fund", "diversification"],
    relatedHref: "/calculators/sip",
    relatedLabel: "SIP Calculator",
  },
  {
    slug: "diversification",
    term: "Diversification",
    category: "Investing",
    short:
      "Diversification means spreading money across different investments so a loss in any one of them has only a limited impact on your portfolio.",
    bodyMarkdown: `The idea behind diversification is captured in the old saying about not putting all your eggs in one basket. By holding a mix of assets — equity, debt, gold and cash — and many holdings within each, you reduce the damage any single failure can do.

If you own one stock and it crashes, your wealth crashes with it. Own 50 stocks across sectors and one crash barely dents the whole. [Mutual funds](/glossary/mutual-fund) and [index funds](/glossary/index-fund) provide this diversification automatically.

For example, in a year when stocks fall but gold rises, a diversified portfolio holds up better than an all-equity one. Diversification does not guarantee profits, but it is the simplest way to control risk without predicting the future.`,
    related: ["mutual-fund", "index-fund", "etf", "net-worth"],
  },

  // ── Tax ────────────────────────────────────────────────────────────────
  {
    slug: "capital-gains",
    term: "Capital Gains",
    category: "Tax",
    short:
      "A capital gain is the profit you make when you sell an asset, such as shares or property, for more than you paid for it — and it is taxable.",
    bodyMarkdown: `If you buy shares for ₹1 lakh and sell them for ₹1.5 lakh, your capital gain is ₹50,000. The tax you pay depends on the holding period, which splits gains into short-term and long-term.

For listed equity and equity mutual funds, gains on holdings of over one year are long-term and taxed at 12.5% above a ₹1.25 lakh yearly exemption. Sell within a year and the gain is short-term, taxed at 20%.

Different rules and rates apply to property, debt funds and gold. Holding longer usually means a lower tax rate, which rewards patient investing, and losses can often be set off against gains to reduce the tax.`,
    related: ["elss", "dividend", "tds", "mutual-fund"],
  },
  {
    slug: "tds",
    term: "TDS",
    category: "Tax",
    short:
      "TDS (Tax Deducted at Source) is income tax a payer deducts before paying you — on salary, interest or rent — and deposits with the government.",
    bodyMarkdown: `Rather than collecting all tax at year-end, the government requires certain payers to withhold a slice upfront. Your employer deducts TDS from salary; a bank deducts it on [fixed deposit](/glossary/fixed-deposit) interest above ₹40,000 a year (₹50,000 for seniors).

The deducted amount is credited against your total tax liability. You see it in your Form 26AS and Annual Information Statement, and you claim it when filing your return.

For example, if a bank deducts ₹5,000 TDS on your FD interest but your actual tax on it is only ₹2,000, you claim a ₹3,000 refund when you file. If no tax is due, you can submit Form 15G or 15H to avoid TDS altogether.`,
    related: ["fixed-deposit", "capital-gains", "gst", "section-80c"],
  },
  {
    slug: "gst",
    term: "GST",
    category: "Tax",
    short:
      "GST (Goods and Services Tax) is a single indirect tax on most goods and services in India, collected along the supply chain but paid by the consumer.",
    bodyMarkdown: `GST replaced a tangle of older taxes like VAT, service tax and excise with one unified system. It applies at rates such as 5%, 12%, 18% and 28% depending on the product or service.

Although businesses collect and remit GST, the cost is passed along until the final customer bears it. Businesses claim credit for GST they paid on inputs, so tax is effectively charged only on the value they add.

For example, on a ₹1,000 service taxed at 18%, you pay ₹1,180 — ₹180 of which is GST. Registered businesses charge, collect and file this with the government, offsetting the GST on their own purchases.`,
    related: ["tds", "capital-gains", "hra", "section-80c"],
    relatedHref: "/calculators/gst",
    relatedLabel: "GST Calculator",
  },
  {
    slug: "hra",
    term: "HRA",
    category: "Tax",
    short:
      "HRA (House Rent Allowance) is a salary component for rent; part of it can be exempt from income tax under the old regime if you actually pay rent.",
    bodyMarkdown: `If your salary includes HRA and you live in rented accommodation, you can claim an exemption that lowers your taxable income under the old regime. The exempt amount is the least of three figures: the actual HRA received, rent paid minus 10% of basic salary, or 50% of basic salary in a metro (40% elsewhere).

For example, on a ₹40,000 basic salary with ₹20,000 HRA, paying ₹18,000 rent in a metro, the exemption is the lowest of those three formulas — often a few lakh a year.

HRA exemption is only available in the old tax regime, not the new one. If you do not receive HRA but pay rent, you may instead claim a smaller deduction under Section 80GG.`,
    related: ["section-80c", "tds", "gratuity", "gst"],
    relatedHref: "/calculators/hra",
    relatedLabel: "HRA Calculator",
  },
  {
    slug: "section-80c",
    term: "Section 80C",
    category: "Tax",
    short:
      "Section 80C lets you cut up to ₹1.5 lakh from your taxable income by investing in options like PPF, ELSS and EPF, under the old tax regime.",
    bodyMarkdown: `Section 80C is the most-used tax deduction in India. By putting money into eligible instruments, you reduce your taxable income by up to ₹1.5 lakh, which can save a 30% taxpayer up to about ₹45,000 in tax a year.

Qualifying options include [PPF](/glossary/ppf), [ELSS](/glossary/elss) funds, [EPF](/glossary/epf), life insurance premiums, 5-year tax-saving FDs, principal repayment on a home loan, and children's tuition fees.

The catch is that Section 80C only applies under the old tax regime. The new regime has lower slab rates but does not allow these deductions, so it is worth comparing both before deciding. Learn more in our guide on [how to save income tax](/blog/how-to-save-income-tax).`,
    related: ["ppf", "elss", "epf", "hra", "nps"],
    relatedHref: "/blog/how-to-save-income-tax",
    relatedLabel: "How to Save Income Tax",
  },

  // ── Credit ─────────────────────────────────────────────────────────────
  {
    slug: "cibil-score",
    term: "CIBIL Score",
    category: "Credit",
    short:
      "A CIBIL score is a three-digit number from 300 to 900 that summarises your credit history; lenders use it to decide loan and card approvals.",
    bodyMarkdown: `CIBIL is India's oldest and best-known credit bureau, and its score is the number most lenders pull first. It runs from **300 to 900**, and above **750** is generally treated as comfortable for approval.

## What the bands actually mean

Below 600 you will struggle to get an unsecured loan or a decent card at all, and offers that do arrive carry high rates. Between 600 and 700 approval becomes possible but the pricing is poor. Between 700 and 750 most lenders will say yes at ordinary rates. Above 750 you reach the band where you can negotiate, and above 800 you are in the territory where banks compete for you.

A special case trips people up: a score of **-1** or **NA/NH** does not mean bad credit. It means there is no credit history to score — usually a young applicant who has never borrowed. Lenders treat it as an unknown rather than a negative, but it can still slow a first loan.

## What moves the number

Five inputs, and they are not equally weighted.

**Repayment history** is the single largest factor. One payment more than 30 days late is recorded and visibly drags the score for a long time. This is the lever that matters most, and it is entirely within your control.

**Credit utilisation** is how much of your available limit you are using. Keeping it under **30%** is the widely-used benchmark. Someone with a ₹2 lakh limit who habitually carries a ₹1.6 lakh balance looks stretched, even if every payment is on time.

**Length of history** rewards age. The oldest card on your file is doing quiet work, which is why closing it can lower your score rather than tidying things up.

**Credit mix** slightly favours a blend of secured borrowing, like a home or car loan, and unsecured borrowing like cards.

**Recent enquiries** count. Each formal application triggers a hard enquiry, and several within a short window reads as someone urgently seeking credit. Checking your own score does not do this — that is a soft enquiry and is free of consequence.

## How to check it without cost

Every credit bureau operating in India is required to give you one free full credit report each year. You can also see a score free through many banking and fintech apps, though those often show a bureau other than CIBIL, so the number may differ slightly from the one your lender sees.

There is no reason to pay for routine monitoring, and no legitimate service can remove accurate negative information from your file.

## Fixing errors, which are more common than people expect

Pull the full report, not just the score, and read the account list line by line. Loans you never took, accounts you closed years ago still showing open, an incorrect overdue amount, a duplicate entry — all of these appear regularly, and each one is costing you.

Disputes are raised free on the bureau's own website. The bureau must investigate with the lender, and the timeline is measured in weeks. Correcting a genuine error is the fastest available improvement, because it does not require you to change any behaviour.

## Rebuilding a low score

There is no shortcut, and anyone selling one is selling a fraud. What works is unglamorous.

Clear every current overdue first, because an active default outweighs everything else. Then pay every bill on time without exception, since recent behaviour carries more weight than old behaviour. Bring utilisation down, either by paying balances or by requesting a higher limit and not using it. Stop applying for new credit while you repair. And keep old accounts open, because their age is an asset.

If you have no history at all, a secured card against a fixed deposit is the standard way to start one.

Expect visible movement in three to six months and a genuine recovery over a year or two. Our guide on [how to improve your credit score](/blog/how-to-improve-credit-score) sets out the sequence in more detail, and the related [credit score](/glossary/credit-score) entry covers how the other bureaus differ.`,
    related: ["credit-score", "emi", "term-insurance", "net-worth"],
    relatedHref: "/blog/how-to-improve-credit-score",
    relatedLabel: "How to Improve Your Credit Score",
  },
  {
    slug: "credit-score",
    term: "Credit Score",
    category: "Credit",
    short:
      "A credit score is a number showing how reliably you repay borrowed money; a higher score means lower risk and better loan and card rates.",
    bodyMarkdown: `A credit score condenses your entire borrowing track record into a single figure a lender can read in seconds. In India the CIBIL, Experian, Equifax and CRIF High Mark scores all run from **300 to 900**. Other countries use different scales — FICO in the United States runs 300 to 850 — but the logic is identical everywhere: a number standing in for how reliably you repay.

## India has four bureaus, not one

This surprises people who assume there is one official score. There are four bureaus licensed by the RBI, they each hold their own data, and lenders do not all report to all of them at the same time.

The practical consequence is that your scores will differ, sometimes by a noticeable margin, and none of them is the wrong one. A lender checking Experian sees a different file from one checking CIBIL. If you are preparing for a large loan, it is worth pulling more than one report, because an error may sit on one file and not another.

## The five things that drive it

**Payment history** dominates. It is the largest single input at every bureau, and a single default sits on your record far longer than most people expect.

**Credit utilisation** comes next: the proportion of your available limit you actually use, where under 30% is the usual benchmark.

**Length of credit history** rewards accounts that have been open and well-handled for years.

**Credit mix** gives modest credit for handling both secured borrowing, such as a home loan, and unsecured borrowing, such as a card.

**Recent applications** count against you when they cluster, because several hard enquiries in a short period read as distress.

## What it costs you in rupees

The abstraction hides how expensive this is, so it is worth making concrete.

Two people apply for a ₹50 lakh home loan over 20 years. One has a score of 780 and is offered 8.5%; the other has 650 and is offered 9.5%. The monthly EMI differs by roughly ₹3,300. Over the full term that is about **₹8 lakh** in additional interest, paid by the person with the weaker score for exactly the same house.

Many lenders now price risk explicitly this way, publishing different rates for different score bands. The number is not a formality — it is a price tag. You can see how a rate change moves your own instalment with the [EMI calculator](/calculators/emi).

## Where else it is used

Lending is no longer the only application. Credit-linked checks now appear in some rental agreements, in post-paid telecom and utility connections, and increasingly in insurance underwriting. In parts of the financial sector it is also referenced in hiring for roles involving money handling.

The score has quietly become a general-purpose reliability signal, which is a good argument for maintaining it even in years when you are not borrowing.

## Common misconceptions

**Checking your own score does not hurt it.** That is a soft enquiry. Only a lender's formal application check is a hard enquiry.

**Closing an old card is often counterproductive.** You lose that account's history and reduce your total limit, which raises utilisation on what remains.

**A high income does not produce a high score.** Income is not an input. A well-paid person who pays late will score below a modestly-paid person who never does.

**Carrying a balance to build history is a myth.** Using the card and paying it in full builds history perfectly well and costs nothing in interest.

**No one can legally delete accurate negative information.** Services promising to do so are frauds. Genuine errors can and should be disputed free with the bureau, but accurate records stay until they age out.

For the India-specific bureau and its score bands, see [CIBIL score](/glossary/cibil-score).`,
    related: ["cibil-score", "emi", "term-insurance", "net-worth"],
    relatedHref: "/blog/how-to-improve-credit-score",
    relatedLabel: "How to Improve Your Credit Score",
  },

  // ── Banking ────────────────────────────────────────────────────────────
  {
    slug: "emi",
    term: "EMI",
    category: "Banking",
    short:
      "An EMI (Equated Monthly Instalment) is the fixed monthly amount you repay on a loan, covering both the principal and the interest, until it is cleared.",
    bodyMarkdown: `Each EMI is split between interest on the outstanding balance and repayment of the principal. In the early months most of the EMI goes toward interest; over time the balance shifts and more of each payment reduces the principal.

The size of an EMI depends on three things: the loan amount, the interest rate and the tenure. A longer tenure lowers the monthly EMI but increases the total interest you pay over the life of the loan.

For example, a ₹20 lakh home loan at 9% over 20 years works out to an EMI of about ₹17,995. Stretch it to 30 years and the EMI drops, but you hand the bank far more interest overall.`,
    related: ["fixed-deposit", "compound-interest", "credit-score", "cibil-score"],
    relatedHref: "/calculators/emi",
    relatedLabel: "EMI Calculator",
  },
  {
    slug: "fixed-deposit",
    term: "Fixed Deposit (FD)",
    category: "Banking",
    short:
      "A fixed deposit (FD) locks a lump sum with a bank for a fixed term at a guaranteed interest rate, earning more than a regular savings account.",
    bodyMarkdown: `With a fixed deposit you place a lump sum with a bank for a chosen period — anywhere from 7 days to 10 years — at a rate fixed on the day you invest. The bank pays that rate for the full term no matter what happens to interest rates afterwards, which is what makes an FD predictable in a way almost nothing else is.

## How the return is actually calculated

Most bank FDs compound quarterly, which is why the maturity value is a little higher than simple interest would suggest.

Put ₹1,00,000 into a 5-year FD at 7% compounded quarterly and it matures at roughly **₹1,41,478**. Simple interest at the same rate would have given ₹1,35,000. The extra ₹6,478 is interest earning interest — modest over five years, and the reason longer terms pull ahead disproportionately. You can test any combination in the [FD calculator](/calculators/fd).

Note that the advertised rate is annual. A "7% FD" does not pay 7% per quarter.

## Cumulative or payout

An FD comes in two shapes, and the right one depends on whether you need income now.

A **cumulative** FD reinvests the interest, so nothing is paid out until maturity and the whole sum compounds. This is the version that produces the ₹1,41,478 above, and it suits anyone who does not need the money in the meantime.

A **non-cumulative** FD pays interest out monthly or quarterly. The total return is slightly lower because nothing compounds, but it produces regular income — which is why retirees frequently choose it.

## How safe it really is

Deposits are insured by the DICGC up to **₹5 lakh per depositor per bank**, and that limit is worth reading carefully. It covers principal and interest combined, it applies per bank rather than per deposit, and it aggregates across all your accounts at that bank including savings.

Someone holding ₹12 lakh at a single bank is insured for ₹5 lakh, not ₹12 lakh. Spreading large sums across banks is the straightforward fix, and it matters most with small finance banks and co-operative banks, which is precisely where the highest advertised rates tend to appear. A higher rate is compensation for higher risk, not a free gift.

## Tax, and the TDS threshold people miss

FD interest is fully taxable at your slab rate, and it is taxable **as it accrues** each year, not only when the deposit matures. People with 5-year cumulative FDs are regularly caught out by this, having declared nothing for four years.

Banks deduct [TDS](/glossary/tds) once interest crosses the annual threshold, and that deduction shows in your Form 26AS and AIS. If your total income is below the taxable limit you can file Form 15G, or Form 15H if you are a senior citizen, to stop the deduction — but neither form makes the income tax-free, only the withholding.

Senior citizens also receive a higher interest rate at most banks, usually around half a percentage point.

## Breaking it early

You can withdraw before maturity, and it costs you twice. The bank applies a penalty, typically around 0.5% to 1%, and — more significantly — recalculates your interest at the rate applicable to the period you actually stayed invested, not the rate you originally booked.

Break a 5-year FD after 18 months and you earn the 18-month rate minus the penalty, which can be far below what you expected. Splitting a large amount into several smaller FDs is a simple hedge: you break only the one you need.

## Where an FD fits

An FD is the right home for money you cannot afford to see fall — an emergency fund, a house deposit you need next year, cash you will spend within a defined period. It is a poor vehicle for long-horizon wealth building, because the post-tax return often barely clears [inflation](/glossary/inflation).

For goals a decade away, a [SIP](/glossary/sip) into equity has historically done far better while being far more volatile along the way. The comparison in our [PPF vs FD vs NPS guide](/blog/ppf-vs-fd-vs-nps) sets out where each one belongs. See also [recurring deposit](/glossary/recurring-deposit) if you want FD-like safety but are saving monthly rather than investing a lump sum.`,
    related: ["recurring-deposit", "ppf", "tds", "compound-interest"],
    relatedHref: "/calculators/fd",
    relatedLabel: "FD Calculator",
  },
  {
    slug: "recurring-deposit",
    term: "Recurring Deposit (RD)",
    category: "Banking",
    short:
      "A recurring deposit (RD) lets you save a fixed amount every month for a set term at a guaranteed rate, like a fixed deposit built in instalments.",
    bodyMarkdown: `An RD is a fixed deposit you build in instalments. You commit to depositing a set amount every month — say ₹5,000 — for a term usually between six months and ten years, and the bank pays a fixed rate on the growing balance. The rate is locked when you open the RD and does not change if rates move afterwards.

## Who it is actually for

An RD suits someone who wants [fixed deposit](/glossary/fixed-deposit) safety and predictability but does not have a lump sum to place. That is most salaried people early in their careers, and anyone saving toward a defined near-term goal from monthly income.

The commitment is the feature. Money leaves the account on a fixed date before it can be spent, which is the same behavioural trick that makes a [SIP](/glossary/sip) work — with a guaranteed return instead of a market-linked one.

## Why the return is lower than an FD at the same rate

This is the single most misunderstood thing about RDs, and it is not a trick or a hidden charge.

In a fixed deposit the entire amount earns interest for the whole term. In a recurring deposit each instalment only earns interest for the months remaining after it is paid. Your first ₹5,000 earns for the full term; your last ₹5,000 earns for about a month.

Deposit ₹5,000 a month for 12 months at 7% and you will have paid in ₹60,000 and receive roughly **₹62,275** at maturity — about ₹2,275 of interest. A single ₹60,000 FD at the same 7% for the same year would have earned closer to ₹4,300, because all of it was working from day one.

Neither is a better rate. They are the same rate applied to different amounts of time, which is exactly what you would expect. The RD's real comparison is not against an FD you could not have funded — it is against leaving the money in a savings account, where it would have earned considerably less.

## RD or SIP?

They solve the same behavioural problem and produce very different outcomes, so the choice comes down to your time horizon.

An RD gives a **guaranteed** return, taxed at your slab rate, with no possibility of loss. Over one to three years, for money you know you will spend — a deposit, a wedding, a planned purchase — that certainty is worth more than a higher expected return.

An equity SIP has no guarantee and can be worth less than you put in at any given moment. Over ten years or more it has historically delivered considerably more, and its long-term gains are taxed more favourably than interest income. For money you will not touch for a decade, that trade has usually been worth making.

The mistake is using an RD for a twenty-year goal, where inflation quietly erodes it, or a SIP for money you need in fourteen months, where a bad quarter can force you to sell at the worst time.

## Missing an instalment

Miss a month and the bank levies a small penalty, and repeated defaults can lead to the account being closed prematurely with interest recalculated on less favourable terms. Set the standing instruction for a date shortly after your salary lands rather than late in the month.

## Tax

RD interest is fully taxable at your slab rate, and taxable as it accrues rather than only at maturity. Banks deduct [TDS](/glossary/tds) once interest crosses the annual threshold across your deposits at that bank, and it appears in your Form 26AS and AIS. Form 15G, or 15H for senior citizens, stops the withholding if your income is below the taxable limit — it does not make the interest tax-free.

Senior citizens generally receive a higher rate, and the same **₹5 lakh per depositor per bank** DICGC insurance that covers fixed deposits covers recurring deposits too, counted together across all your accounts at that bank.

## Before you open one

Compare rates across banks, since the spread is wider than people assume, and check the premature-closure terms rather than assuming they are standard. Use the [RD calculator](/calculators/rd) to see the actual maturity value for your amount and term before committing — the number is usually lower than a first guess, for the timing reason above, and it is better to know that at the start.`,
    related: ["fixed-deposit", "ppf", "sip", "tds"],
    relatedHref: "/calculators/fd",
    relatedLabel: "FD Calculator",
  },
  {
    slug: "gratuity",
    term: "Gratuity",
    category: "Banking",
    short:
      "Gratuity is a lump-sum reward an employer pays for long service, usually after five or more years with the same company.",
    bodyMarkdown: `Gratuity rewards loyalty. Under the Payment of Gratuity Act, employees who complete at least five continuous years qualify for a payout when they resign, retire or are laid off.

The standard formula is your last drawn monthly salary (basic plus dearness allowance) multiplied by 15/26, multiplied by the number of completed years of service. So 10 years at a ₹50,000 basic works out to about ₹2.88 lakh.

Gratuity up to ₹20 lakh is tax-free for most employees, making it a valuable retirement benefit. It sits alongside [EPF](/glossary/epf) as part of the corpus you build simply by staying employed.`,
    related: ["epf", "nps", "hra", "net-worth"],
    relatedHref: "/calculators/gratuity",
    relatedLabel: "Gratuity Calculator",
  },
  {
    slug: "term-insurance",
    term: "Term Insurance",
    category: "Banking",
    short:
      "Term insurance is a pure life-cover policy that pays your family a lump sum if you die during the term, at a low premium, with no maturity payout.",
    bodyMarkdown: `Term insurance is the simplest and cheapest form of life cover. You pay a modest annual premium, and if you pass away during the term, your nominee receives the full sum assured — often ₹1 crore or more.

Because it has no investment or savings element, premiums are far lower than endowment or ULIP policies. A healthy 30-year-old might secure ₹1 crore of cover for around ₹10,000 to ₹15,000 a year.

The guiding principle is to keep insurance and investment separate: buy cheap term cover for protection, and invest the money you save through [mutual funds](/glossary/mutual-fund) or [PPF](/glossary/ppf). A common rule is cover worth 10 to 15 times your annual income.`,
    related: ["emergency-fund", "net-worth", "mutual-fund", "cibil-score"],
  },
  {
    slug: "emergency-fund",
    term: "Emergency Fund",
    category: "Banking",
    short:
      "An emergency fund is easily accessible savings set aside for unexpected costs — like a job loss or medical bill — so you avoid going into debt.",
    bodyMarkdown: `An emergency fund is the foundation of a healthy financial plan. It covers real shocks without forcing you to sell investments at a bad time or borrow at high interest.

The common guideline is three to six months of essential expenses. If your income is stable, three months may do; if you are self-employed or a sole earner, aim for six or more.

Keep it somewhere safe and reachable within a day or two — a separate savings account, a liquid fund, or a sweep-in [fixed deposit](/glossary/fixed-deposit). The goal is safety and access, not high returns. Read our full [emergency fund guide](/blog/emergency-fund-guide) to build one.`,
    related: ["fixed-deposit", "net-worth", "term-insurance", "recurring-deposit"],
    relatedHref: "/blog/emergency-fund-guide",
    relatedLabel: "Emergency Fund Guide",
  },
  {
    slug: "net-worth",
    term: "Net Worth",
    category: "Banking",
    short:
      "Net worth is the total value of everything you own minus everything you owe — the clearest single measure of your overall financial health.",
    bodyMarkdown: `To find your net worth, add up your assets — cash, bank balances, investments, property, gold — and subtract your liabilities, such as home loans, car loans and credit card dues.

If you own ₹50 lakh in assets and owe ₹20 lakh, your net worth is ₹30 lakh. It can be negative early in life, for instance when a student loan exceeds your savings, and that is normal.

Tracking net worth once or twice a year shows whether you are truly getting wealthier, not just earning more. Rising income means little if debt rises faster; growing net worth is the real signal of progress.`,
    related: ["emergency-fund", "diversification", "term-insurance", "inflation"],
  },

  // ── AI ─────────────────────────────────────────────────────────────────
  {
    slug: "artificial-intelligence",
    term: "Artificial Intelligence",
    category: "AI",
    short:
      "Artificial Intelligence (AI) is the field of building computer systems that can perform tasks that normally require human intelligence.",
    bodyMarkdown: `AI covers any technique that lets machines mimic aspects of human thinking. Early AI relied on hand-coded rules, while modern AI mostly learns patterns from data through [machine learning](/glossary/machine-learning).

You already use AI daily: it filters spam, recommends videos, powers maps and answers questions through assistants like ChatGPT. These systems do not think like people; they find statistical patterns in vast amounts of data and use them to predict, classify or generate.

For example, an AI trained on millions of photos can tell a cat from a dog without ever being told the rules that distinguish them — it learns the difference from examples. Explore practical AI in our [AI tools directory](/ai-tools).`,
    related: ["machine-learning", "large-language-model", "generative-ai", "neural-network"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
  {
    slug: "machine-learning",
    term: "Machine Learning",
    category: "AI",
    short:
      "Machine learning is a branch of AI where computers learn to make predictions from data and examples, rather than following fixed programmed rules.",
    bodyMarkdown: `In traditional programming, a human writes every rule. In machine learning, you instead feed the computer many examples and let it work out the rules itself by finding patterns in the data.

The more high-quality data it sees, the better it gets. A spam filter, for instance, learns from millions of emails labelled spam or not-spam, then applies what it learned to new messages it has never seen.

Machine learning powers recommendations, fraud detection, voice recognition and much more. Modern breakthroughs like [large language models](/glossary/large-language-model) are built on a form of machine learning that uses [neural networks](/glossary/neural-network) trained on enormous datasets.`,
    related: ["artificial-intelligence", "neural-network", "large-language-model", "generative-ai"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
  {
    slug: "large-language-model",
    term: "Large Language Model (LLM)",
    category: "AI",
    short:
      "A Large Language Model (LLM) is an AI trained on massive amounts of text to understand and generate human-like language, like ChatGPT and Claude.",
    bodyMarkdown: `An LLM learns the patterns of language by reading enormous quantities of text — books, articles and websites. From this it learns which words tend to follow which, allowing it to answer questions, write, summarise and translate.

Under the hood, an LLM predicts the next [token](/glossary/token) (a word or word-piece) over and over to build a response. It has no true understanding or beliefs; it is an extremely sophisticated pattern-matcher.

For example, when you ask an LLM to draft an email, it generates each word based on everything before it and the patterns it learned in training. This power comes with limits, including a tendency to [hallucinate](/glossary/hallucination) confident but wrong answers.`,
    related: ["generative-ai", "token", "prompt", "hallucination", "machine-learning"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
  {
    slug: "generative-ai",
    term: "Generative AI",
    category: "AI",
    short:
      "Generative AI is artificial intelligence that creates new content — text, images, audio, video or code — rather than just analysing existing data.",
    bodyMarkdown: `Where older AI mainly recognised or sorted things, generative AI produces something new. Give it a [prompt](/glossary/prompt) and it generates an original response: an essay, a picture, a song, or working code.

It works by learning the patterns in huge datasets, then using those patterns to generate fresh output that resembles, but does not copy, what it learned. Tools like ChatGPT for text and Midjourney for images are generative AI.

For example, asking a tool to create a logo of a blue fox produces an image that never existed before. The same technology drafts marketing copy, writes code and composes music — which is why it is reshaping so many kinds of creative and knowledge work.`,
    related: ["large-language-model", "artificial-intelligence", "prompt", "prompt-engineering"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
  {
    slug: "prompt",
    term: "Prompt",
    category: "AI",
    short:
      "A prompt is the instruction or question you give an AI tool; its clarity and detail strongly shape the quality of the response you get back.",
    bodyMarkdown: `Every interaction with a tool like ChatGPT starts with a prompt — the text you type in. It can be a simple question or a detailed brief with context, examples and formatting instructions.

Because the AI responds to exactly what you ask, small changes in wording can produce very different results. A vague prompt like write an email gives a generic reply; a specific one produces something you can use with little editing.

For example, instead of summarise this, a stronger prompt is summarise this report in three sentences for a busy manager, focusing on the risks. Getting good at writing prompts is a skill in itself, known as [prompt engineering](/glossary/prompt-engineering). Try it in our [AI assistant](/ai-assistant).`,
    related: ["prompt-engineering", "large-language-model", "generative-ai", "token"],
    relatedHref: "/ai-assistant",
    relatedLabel: "Ask AI",
  },
  {
    slug: "token",
    term: "Token",
    category: "AI",
    short:
      "A token is a small chunk of text — a word or part of a word — that an AI language model reads and generates. Models measure their work in tokens.",
    bodyMarkdown: `Language models do not process text letter by letter or as whole sentences; they break it into tokens. A token is roughly four characters of English, so a common word may be one token while a longer word splits into several.

Tokens matter for two practical reasons. First, a model can only handle so many tokens at once — its context window — which limits how much text it can consider. Second, paid AI services usually charge per token, for both your input and the model's output.

For example, the phrase AI is useful is about four tokens, and a 500-word document is roughly 650 to 700 tokens. Understanding tokens helps explain why very long documents can hit limits or cost more to process.`,
    related: ["large-language-model", "prompt", "hallucination", "generative-ai"],
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    category: "AI",
    short:
      "In AI, a hallucination is when a language model produces information that sounds confident and plausible but is actually false or made up.",
    bodyMarkdown: `Because a language model generates text by predicting likely words rather than looking up verified facts, it can state wrong information with complete confidence. This is called hallucination.

It happens most with specific details the model was not reliably trained on: fake citations, invented statistics, non-existent product features, or wrong dates. The output reads fluently, which makes errors easy to miss.

For example, an AI might confidently cite a court case or research paper that does not exist. The practical lesson is to treat AI output as a helpful draft, not a source of truth, and to verify anything important — especially numbers, quotes and facts that affect real decisions.`,
    related: ["large-language-model", "token", "prompt", "artificial-intelligence"],
    relatedHref: "/ai-assistant",
    relatedLabel: "Ask AI",
  },
  {
    slug: "prompt-engineering",
    term: "Prompt Engineering",
    category: "AI",
    short:
      "Prompt engineering is the skill of writing clear, well-structured instructions for AI tools so they return more accurate and useful results.",
    bodyMarkdown: `Since an AI responds to exactly what you ask, how you ask matters enormously. Prompt engineering is the practice of crafting [prompts](/glossary/prompt) that get the best possible output.

Effective techniques include giving the AI a role, providing context and examples, specifying the format you want, and breaking complex tasks into steps. A well-engineered prompt turns a vague, generic answer into one you can use straight away.

For example, instead of write a product description, a strong prompt says you are a copywriter; write a 50-word product description for eco-friendly water bottles aimed at young professionals, in a friendly tone. Our guide on [working faster with AI](/blog/work-faster-with-ai) has more practical tips.`,
    related: ["prompt", "large-language-model", "generative-ai", "ai-agent"],
    relatedHref: "/blog/work-faster-with-ai",
    relatedLabel: "Work Faster With AI",
  },
  {
    slug: "neural-network",
    term: "Neural Network",
    category: "AI",
    short:
      "A neural network is a computing system loosely inspired by the brain, using layers of connected nodes to learn patterns in data — the basis of modern AI.",
    bodyMarkdown: `A neural network is built from simple units called nodes, or artificial neurons, arranged in layers. Each connection has a weight, and the network learns by adjusting those weights as it sees more training examples.

Data enters the first layer, passes through hidden layers that progressively detect patterns, and produces a result at the output layer. Early layers might detect edges in an image, later ones whole objects like faces.

Deep learning simply means a neural network with many hidden layers. This architecture underpins [machine learning](/glossary/machine-learning) breakthroughs from image recognition to the [large language models](/glossary/large-language-model) behind today's AI assistants.`,
    related: ["machine-learning", "artificial-intelligence", "large-language-model", "generative-ai"],
  },
  {
    slug: "ai-agent",
    term: "AI Agent",
    category: "AI",
    short:
      "An AI agent is an AI that takes actions to complete a goal on its own — planning steps and using tools — rather than just answering one question.",
    bodyMarkdown: `A regular chatbot answers one prompt at a time. An AI agent goes further: given a goal, it breaks the task into steps, decides what to do next, and uses tools such as web search, code, or apps to get there.

For example, told to research a topic and write a report, an agent might search the web, read several pages, take notes, and assemble a draft — looping until the job is done, with limited human input.

Agents are powerful but need guardrails, because they act rather than just suggest. That makes checking their work and limiting what they can touch especially important. They build on [large language models](/glossary/large-language-model) for reasoning and [prompt engineering](/glossary/prompt-engineering) to steer their behaviour.`,
    related: ["large-language-model", "prompt-engineering", "generative-ai", "artificial-intelligence"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
];

/** Slugs for every generated glossary page — consumed by the sitemap and route. */
export const GLOSSARY_SLUGS: string[] = GLOSSARY.map((t) => t.slug);

/** Look up a single term by slug. */
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
