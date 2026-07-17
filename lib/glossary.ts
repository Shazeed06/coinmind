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
    bodyMarkdown: `A SIP automates investing. You commit a set amount, say ₹5,000 a month, and it is deducted automatically and used to buy units of your chosen mutual fund. Because you invest on the same date every month regardless of price, you buy more units when markets are low and fewer when they are high — a benefit known as [rupee cost averaging](/glossary/rupee-cost-averaging).

The main appeal is discipline and the power of [compound interest](/glossary/compound-interest) over time. A ₹5,000 monthly SIP earning about 12% a year would grow to roughly ₹11.6 lakh in 10 years, even though you only put in ₹6 lakh.

SIPs suit people investing from a regular salary rather than a windfall. You can start, pause, increase or stop them at any time, which makes them flexible as well as beginner-friendly.`,
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
    bodyMarkdown: `An ETF bundles many stocks or bonds into one fund, but unlike a regular mutual fund it is listed on an exchange and its price moves throughout the trading day. You buy and sell ETF units through a demat and trading account, just like a stock.

Most ETFs are passive, meaning they simply mirror an index such as the Nifty 50 rather than being actively picked by a manager. That keeps their [expense ratio](/glossary/expense-ratio) very low.

For example, a Nifty 50 ETF rises and falls with those 50 companies. ETFs offer instant [diversification](/glossary/diversification) and low cost, though you need a demat account and pay small brokerage on each trade.`,
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
    bodyMarkdown: `Before an IPO, a company is privately owned by founders and early investors. In the IPO it issues shares to the public for the first time, and afterwards those shares trade freely on an exchange like the NSE or BSE.

Companies do this to raise capital for growth and to give early backers a way to sell. Investors apply for shares at the offer price, often through the ASBA process in their bank or broker app.

For example, if a company offers shares at ₹500 and lists at ₹650, early allottees see a listing gain. But IPOs can also fall below the offer price, so they carry real risk and are never a guaranteed profit.`,
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
    bodyMarkdown: `CIBIL is India's best-known credit bureau, and its score is the number most lenders check first. It ranges from 300 to 900, and a score above 750 is generally considered good enough for easy loan approval.

The score is built from your repayment history, how much of your available credit you use, the length of your credit history, and how often you apply for new credit. Paying bills on time and keeping card balances low are the biggest levers.

For example, someone who always pays on time and uses under 30% of their card limit tends to score well above 750, unlocking lower interest rates. To raise a low score, see our guide on [how to improve your credit score](/blog/how-to-improve-credit-score).`,
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
    bodyMarkdown: `A credit score condenses your borrowing track record into a single figure. In India the CIBIL, Experian and Equifax scores run from 300 to 900; in other countries the scales differ, but the idea is the same.

Five things drive it: payment history (the biggest factor), credit utilisation, length of history, credit mix and recent applications. Missing payments or maxing out cards pulls the score down; consistent on-time payments push it up.

For example, two people may earn the same salary, but the one with a 780 score gets a home loan approved faster and at a lower rate than the one at 650. It is one of the most valuable numbers in your financial life. See [CIBIL score](/glossary/cibil-score) for the Indian version.`,
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
    bodyMarkdown: `With an FD you deposit a sum — say ₹1 lakh — for a chosen period, from 7 days to 10 years, at a rate fixed on the day you invest. The bank pays that rate regardless of what happens to interest rates afterwards, which makes returns predictable.

FDs are considered very safe: deposits up to ₹5 lakh per bank are insured by the DICGC. The trade-off is lower returns than market investments, and breaking the FD early usually costs a small penalty.

For example, ₹1 lakh in a 5-year FD at 7% compounded quarterly grows to about ₹1.41 lakh. The interest is taxable, and banks deduct [TDS](/glossary/tds) if it crosses the annual threshold.`,
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
    bodyMarkdown: `An RD is like a fixed deposit you build up in instalments. You commit to depositing a set amount — for example ₹5,000 a month — for a term such as one to five years, and the bank pays a fixed rate on your growing balance.

It suits people who want FD-like safety and returns but do not have a lump sum to invest upfront. Each monthly deposit earns interest for the remaining months of the term.

For instance, ₹5,000 a month for 3 years at 7% grows to roughly ₹2 lakh, of which about ₹20,000 is interest. Like an FD, RD interest is taxable and the deposit is safe, but returns trail equity [mutual funds](/glossary/mutual-fund) over the long run.`,
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
