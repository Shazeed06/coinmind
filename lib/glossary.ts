// Programmatic Finance + AI glossary.
//
// Each term becomes a statically-generated page at /glossary/<slug> (see
// app/glossary/[slug]/page.tsx) plus a row on the /glossary index. The `short`
// is a tight 1-2 sentence definition written to be lifted verbatim into Google
// AI Overviews and cited by ChatGPT/Perplexity (AEO/GEO), so keep it accurate
// and self-contained (max 160 chars for the meta description). `bodyMarkdown` is
// prose rendered by components/ArticleMarkdown.tsx. It supports ## headings,
// paragraphs, **bold** and inline links to internal routes, plus pipe tables.

export type GlossaryCategory = "Investing" | "Tax" | "Credit" | "Banking" | "AI";

/** One People-Also-Ask style question and its 40-70 word answer. */
export type GlossaryFaq = {
  q: string;
  a: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  category: GlossaryCategory;
  /** 1-2 sentence plain-English definition: the AEO snippet target (max 160 chars). */
  short: string;
  /** Long-form explainer: ## headings, paragraphs, **bold**, [links], bullet lists and pipe tables. */
  bodyMarkdown: string;
  /** Minimum 5 India-specific FAQs; rendered on-page and emitted as FAQPage JSON-LD. */
  faq: GlossaryFaq[];
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
  // -- Investing ----------------------------------------------------------
  {
    slug: "sip",
    term: "SIP",
    category: "Investing",
    short:
      "A Systematic Investment Plan (SIP) is a way to invest a fixed amount in a mutual fund at regular intervals, usually monthly, instead of a lump sum.",
    bodyMarkdown: `A SIP automates investing. You commit a set amount, say Rs 5,000 a month, and it is debited from your bank account automatically on a fixed date and used to buy units of the mutual fund you chose. You do not time the market, place an order, or make a decision each month. That is the entire point.

## How a SIP actually works

On your chosen date, the money leaves your account and buys units at that day's [NAV](/glossary/nav), the fund's per-unit price. If the NAV is Rs 50, your Rs 5,000 buys 100 units. If markets have fallen and the NAV is Rs 40, the same Rs 5,000 buys 125 units. Your unit count grows every month, and what those units are worth depends on where the fund's holdings are priced when you eventually sell.

There is no lock-in on an open-ended equity fund, with one exception: an [ELSS](/glossary/elss) tax-saving fund locks each instalment for three years from the date it was invested.

## Rupee cost averaging, with real numbers

This is the mechanism people mean when they say SIPs reduce risk, and it is worth seeing rather than taking on trust.

Suppose you invest Rs 6,000 a month for three months and the NAV moves Rs 100, then Rs 75, then Rs 120. You buy 60 units, then 80 units, then 50 units: 190 units for Rs 18,000, an average cost of about Rs 94.74 per unit. But the simple average of the three prices is Rs 98.33. You paid less than the average price, without predicting anything, purely because a fixed rupee amount automatically buys more units when prices are low. That is [rupee cost averaging](/glossary/rupee-cost-averaging).

It does not protect you from a market that falls and stays down. It protects you from the far more common problem of investing everything on one unlucky day.

## What a SIP can realistically grow to

A Rs 5,000 monthly SIP, if it earned 12% a year, would be worth roughly Rs 11.6 lakh after 10 years against Rs 6 lakh invested. Stretch it to 20 years and it reaches about Rs 50 lakh against Rs 12 lakh invested. Doubling the time did not double the outcome. It more than quadrupled it, because [compound interest](/glossary/compound-interest) does most of its work late.

Treat 12% as an assumption, not a promise. Equity returns are not smooth or guaranteed, and a decade that averages 12% will still contain years of double-digit losses. Our [SIP calculator](/calculators/sip) lets you test more conservative rates, which is a healthier way to plan.

## SIP or lump sum?

If the money arrives monthly from a salary, the question does not really exist. A SIP is simply how you invest income as it comes. The comparison only matters when you are holding a lump sum, from a bonus or a maturity, and wondering whether to deploy it at once or spread it out.

Mathematically, investing a lump sum immediately wins more often than not, because markets rise over most long periods and money invested earlier compounds longer. Behaviourally, staggering it hurts far less when the market drops the following week. Our guide on [SIP vs lump sum](/blog/sip-vs-lumpsum) works through both cases.

## How to start one

You need a PAN, a bank account and completed KYC. From there you can start directly on a fund house's own website, through a broker or investment app, or via a registered mutual fund distributor. You choose the fund, the amount, the date and the frequency, and set up a mandate that lets the fund debit your account each month.

Start with an amount you will not be tempted to stop during a bad quarter. Rs 1,000 sustained for a decade beats Rs 10,000 abandoned after eight months.

## Where people go wrong

The most expensive mistake is stopping a SIP when markets fall. Those are precisely the instalments that buy the most units, and cancelling them converts a temporary decline into a permanent loss of the recovery.

The second is chasing last year's best-performing fund each year, which reliably buys high. The third is running a SIP with no goal and no horizon, so there is nothing to hold on to when the value dips. Decide upfront what the money is for and when you need it, then let the automation do its job.`,
    faq: [
      {
        q: "What is the minimum amount to start a SIP in India?",
        a: "Most Indian fund houses accept SIPs from Rs 500 a month, and several now allow Rs 100 on selected schemes. The minimum is set by the fund, not by regulation, so it varies. Check the scheme information document before assuming a figure, and pick an amount you can sustain for years.",
      },
      {
        q: "Can I stop or pause my SIP anytime?",
        a: "Yes. An open-ended fund SIP can be cancelled or paused online with no exit penalty, though most platforms need a few working days notice before the next debit date. The exception is ELSS, where each instalment already invested stays locked for three years even after you stop.",
      },
      {
        q: "Is SIP better than a fixed deposit?",
        a: "They answer different questions. An FD guarantees a return and suits money you need within one to three years. An equity SIP has no guarantee and can fall in value, but over ten years or more it has historically delivered considerably higher returns. Horizon, not preference, should decide.",
      },
      {
        q: "Do I need a demat account for a SIP?",
        a: "No. Mutual fund units are held in a statement of account with the registrar, so a PAN, a bank account and completed KYC are enough. A demat account is only needed if you want to hold units in demat form or buy ETFs, which trade on an exchange.",
      },
      {
        q: "How is SIP return taxed in India?",
        a: "Each instalment is treated as a separate purchase with its own holding period. For equity funds, units held over a year attract long-term capital gains tax above an annual exemption limit; units sold within a year are taxed at the short-term rate. Rates change in Budget announcements, so verify current figures.",
      },
      {
        q: "What happens if my SIP debit fails?",
        a: "One failed debit is not a default. The instalment is simply missed, your bank may levy a mandate bounce charge, and the SIP continues next month. Most fund houses cancel the SIP only after three or so consecutive failures, and you can restart it at any time.",
      },
    ],
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
    bodyMarkdown: `When you buy a mutual fund, your money is combined with that of thousands of other investors and managed as one large portfolio by a professional fund manager. You do not own the underlying shares or bonds directly. You own units, and the value of each unit, its [NAV](/glossary/nav), rises or falls with whatever the fund holds.

In India every mutual fund is run by an asset management company registered with SEBI, and the money itself sits with a separate custodian and trustee. That structure matters: if a fund house were to fail, your units are not part of its balance sheet.

## How the money actually moves

Say you invest Rs 10,000 in an equity fund whose NAV that day is Rs 25. You are allotted 400 units. The fund manager pools your money with everyone else's and buys shares according to the scheme's mandate.

If the portfolio rises 10% over the next year, the NAV moves to roughly Rs 27.50 and your 400 units are worth Rs 11,000. You have not received any cash. The gain sits in the unit price until you redeem. When you do redeem, the fund sells assets, credits your bank account, and the profit becomes a taxable [capital gain](/glossary/capital-gains).

## The main types you will meet

- **Equity funds** hold shares. Highest long-term potential, highest short-term swings. Sub-categories include large cap, mid cap, small cap, flexi cap and sector funds.
- **Debt funds** hold bonds, treasury bills and money market instruments. Steadier, but not risk-free: they can fall when interest rates rise or an issuer defaults.
- **Hybrid funds** mix equity and debt in a defined ratio, aiming for a middle path.
- **Index funds and ETFs** simply track an index instead of picking stocks, which is why their fees are so much lower. See [index fund](/glossary/index-fund) and [ETF](/glossary/etf).
- **[ELSS](/glossary/elss)** is an equity fund that also earns a Section 80C deduction, with a three year lock-in on each instalment.
- **Liquid and overnight funds** are used as a parking place for short-term money, often as part of an [emergency fund](/glossary/emergency-fund).

## Regular plan or direct plan

Every scheme comes in two versions holding exactly the same portfolio.

| | Regular plan | Direct plan |
| --- | --- | --- |
| Bought through | Distributor, agent, bank | Fund house or a direct platform |
| Commission built into fee | Yes | No |
| Typical extra annual cost | Roughly 0.5% to 1% | None |
| Advice included | Usually | You decide yourself |

On a Rs 10 lakh holding, a 0.8% difference is Rs 8,000 in year one and considerably more as the balance grows, because the fee is charged on the whole corpus every year. If you are comfortable choosing your own funds, the direct plan is simply the cheaper way to own the identical thing.

## Why diversification is the real product

An equity fund might hold 50 or 60 companies. If you put the same money into a single stock, one accounting scandal can wipe you out. In a fund it is one holding among many, and the damage is capped at that weight.

This is the practical value most first-time investors underrate. You are not primarily buying stock-picking skill. You are buying instant [diversification](/glossary/diversification) for a few thousand rupees, which is something you could not build yourself at that size.

## What it costs and what it returns

The [expense ratio](/glossary/expense-ratio) is deducted from the fund's assets daily, so the NAV you see is already net of fees. There is no separate bill, which is exactly why the cost is so easy to ignore.

Some funds also charge an exit load, typically around 1%, if you redeem within a defined period such as one year. Read that before investing money you might need back quickly.

Published returns are historical and say nothing binding about the future. A fund that returned 22% over the last three years was very likely helped by a strong market, not only by skill.

## Common mistakes

- **Chasing last year's top performer.** Rankings reshuffle constantly, and buying the recent winner is usually buying high.
- **Owning eight funds that hold the same fifty stocks.** That is duplication, not diversification.
- **Judging a fund by NAV.** A Rs 12 NAV is not cheaper than a Rs 400 NAV. Only the percentage change matters.
- **Redeeming during a fall.** This converts a paper decline into a permanent loss.
- **Ignoring the horizon.** Equity money you need in eight months is in the wrong place.

You can invest through a [SIP](/glossary/sip) for regular monthly amounts or a one-time [lumpsum](/glossary/lumpsum) when you have a windfall, and returns are best measured with [XIRR](/glossary/xirr) rather than a simple percentage.`,
    faq: [
      {
        q: "Are mutual funds safe in India?",
        a: "They are tightly regulated by SEBI, and the assets are held by an independent custodian, so fraud risk at the fund house level is low. But safety of structure is not safety of value. Equity funds can and do fall sharply in a bad year, and no return is guaranteed.",
      },
      {
        q: "What is the difference between a direct and a regular mutual fund plan?",
        a: "Both hold the identical portfolio. A regular plan pays a distributor commission out of the fund, so its expense ratio is higher, typically by 0.5% to 1% a year. A direct plan is bought from the fund house and charges no commission, which compounds into a meaningful gap over a decade.",
      },
      {
        q: "How much money do I need to start investing in mutual funds?",
        a: "Many schemes accept a lumpsum from Rs 500 or Rs 1,000, and SIPs commonly start at Rs 500 a month with some as low as Rs 100. You need a PAN, a bank account and completed KYC. A demat account is not required for regular mutual fund units.",
      },
      {
        q: "Can I lose all my money in a mutual fund?",
        a: "Losing everything is extremely unlikely because a fund holds dozens of securities and is regulated. Losing a large share of your value temporarily is entirely possible in equity funds, where 30% or more drawdowns have happened in past market cycles. Debt funds carry smaller but real credit and rate risk.",
      },
      {
        q: "How long should I stay invested in an equity mutual fund?",
        a: "Five years is usually treated as the minimum sensible horizon for equity, and seven to ten years is more comfortable. Shorter horizons expose you to the risk of having to sell during a downturn. For money needed within three years, a debt fund or a fixed deposit is a better fit.",
      },
      {
        q: "Do mutual funds pay dividends in India?",
        a: "Some schemes offer an IDCW option, formerly called the dividend option, which pays out part of the gains. The payout is not extra money: the NAV falls by the same amount, and the receipt is taxed at your slab rate. The growth option is usually the more tax-efficient default.",
      },
    ],
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
    bodyMarkdown: `The Public Provident Fund is a savings scheme run by the Government of India, opened at a post office or an authorised bank, with a 15 year term. It is the closest thing an Indian saver has to a risk-free long-term instrument: the returns are declared by the government rather than set by a market, and the balance is backed by a sovereign guarantee.

It is deliberately illiquid. That is a weakness if you need the money and a strength if your problem is that you keep spending it.

## The rules that define the account

- **Deposit limits.** A minimum of Rs 500 and a maximum of Rs 1.5 lakh in a financial year, across all PPF accounts you hold. You can pay it in one go or in instalments.
- **One account per person.** You may also open one on behalf of a minor child, but the Rs 1.5 lakh ceiling is combined, not doubled.
- **Term.** 15 financial years, counted from the end of the year in which you open it, which is why the account effectively runs a few months past 15 calendar years.
- **Extension.** After maturity you can extend in blocks of 5 years, with or without fresh contributions.
- **Interest rate.** Set by the Ministry of Finance each quarter and compounded annually. It has been in the region of 7.1% in recent years, but it is reviewed quarterly and has been both higher and lower in the past. Check the current notified rate before you plan around a number.

## Why the deposit date matters

Interest is calculated on the **lowest balance between the 5th and the last day of each month**. Deposit on the 6th and that month's contribution earns nothing for the month.

Paying your annual Rs 1.5 lakh before the 5th of April, rather than in March of the following year, earns a full year of extra interest on that contribution. Over a 15 year account, that habit alone is worth a meaningful sum for zero extra money invested.

## A worked example

Suppose you deposit Rs 1.5 lakh at the start of every financial year for 15 years, and the rate averages 7.1%.

You will have contributed Rs 22.5 lakh. The maturity value works out to roughly **Rs 40 lakh**, meaning about Rs 17.5 lakh is interest, and none of it is taxed. Halve the contribution to Rs 75,000 a year and the corpus lands near Rs 20 lakh on Rs 11.25 lakh invested.

Because the rate is reset quarterly, treat these figures as illustrations rather than promises. Run your own numbers in the [PPF calculator](/calculators/ppf).

## The EEE tax treatment

PPF sits in the small group of instruments taxed at Exempt-Exempt-Exempt:

- **Exempt on the way in:** contributions count toward the [Section 80C](/glossary/section-80c) deduction, subject to the overall Rs 1.5 lakh cap shared with EPF, ELSS, life insurance premiums and the rest.
- **Exempt while growing:** the annual interest is not taxable and does not need to be declared as income.
- **Exempt on the way out:** the maturity amount is received tax-free.

One important caveat: the 80C deduction is available under the **old tax regime**. If you have opted for the new regime you still get tax-free interest and tax-free maturity, but not the deduction on the way in. That changes the arithmetic of whether PPF is the right 80C vehicle for you, so compare both regimes before deciding.

## Getting money out early

You cannot simply close a PPF account when you feel like it, but there are three routes:

- **Partial withdrawal** is allowed from the 7th financial year, capped at 50% of the balance at the end of the 4th preceding year or the previous year, whichever is lower.
- **Loan against the balance** is available between roughly the 3rd and 6th years, at a small spread over the PPF rate, repayable within a defined window.
- **Premature closure** is permitted after 5 years only for specified reasons such as serious illness or higher education, and it carries an interest penalty.

## Where PPF fits, and where it does not

PPF is excellent for the safe, long-horizon part of a portfolio: retirement money, a child's education fund, the ballast that lets you hold equity through a bad year without panicking.

It is a poor fit for an [emergency fund](/glossary/emergency-fund), because the money is not reachable. And relying on it alone for a 25 year goal is risky in a different way: a roughly 7% return is only a couple of points above typical [inflation](/glossary/inflation), so real growth is slow. Most people are better served pairing PPF with equity through [ELSS](/glossary/elss) or an index [SIP](/glossary/sip). See how it compares against fixed deposits and pension products in our [PPF vs FD vs NPS guide](/blog/ppf-vs-fd-vs-nps).`,
    faq: [
      {
        q: "Is PPF interest tax free in India?",
        a: "Yes. PPF interest is exempt from income tax and does not need to be added to your taxable income, and the maturity amount is tax-free too. Combined with the deduction on contributions under the old regime, this gives PPF its Exempt-Exempt-Exempt status, which very few Indian instruments have.",
      },
      {
        q: "What is the current PPF interest rate?",
        a: "The rate is notified by the Ministry of Finance every quarter and has hovered around 7.1% in recent years. Because it is reviewed four times a year and has been both higher and lower historically, check the latest notification on the India Post or your bank's website before planning around a figure.",
      },
      {
        q: "Can I withdraw PPF money before 15 years?",
        a: "Partly. Partial withdrawals are allowed from the seventh financial year, subject to a cap based on earlier balances. A loan against the account is available in the earlier years. Full premature closure is permitted after five years only for specified reasons such as serious illness or higher education, with an interest penalty.",
      },
      {
        q: "Can I open more than one PPF account?",
        a: "No. An individual is allowed one PPF account. You may additionally open one on behalf of a minor child, but the Rs 1.5 lakh annual ceiling applies to your own and the minor's account combined. Duplicate accounts are typically frozen and earn no interest on the extra deposits.",
      },
      {
        q: "What happens if I do not deposit the minimum Rs 500 in a year?",
        a: "The account is treated as discontinued. It keeps earning interest on the existing balance, but you cannot take a loan or make partial withdrawals until it is revived. Reviving it means paying a small default fee plus the Rs 500 minimum for each missed year.",
      },
      {
        q: "Which is better, PPF or ELSS?",
        a: "They serve different roles. PPF gives a guaranteed, tax-free return with a 15 year lock-in. ELSS invests in equity, has only a three year lock-in per instalment, and has historically returned more over long periods, but with real volatility and taxable gains. Many investors hold both rather than choosing.",
      },
    ],
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
    bodyMarkdown: `The National Pension System is a retirement account regulated by the PFRDA. You contribute during your working years, professional pension fund managers invest the money across equity, corporate bonds and government securities, and at 60 the accumulated corpus is split: part comes to you as a lump sum and part must be used to buy an annuity that pays a monthly pension for life.

It is open to any Indian citizen between 18 and 70, salaried or self-employed, and it is one of very few retirement products in India with genuinely low running costs.

## Tier I and Tier II

- **Tier I** is the actual pension account. It has the lock-in, and it is the only tier that carries tax benefits.
- **Tier II** is a voluntary, no lock-in investment account that works more like a low-cost mutual fund. You can withdraw any time, but there is no deduction for ordinary subscribers. You need a Tier I account before you can open Tier II.

Almost everything people mean when they say NPS refers to Tier I.

## Where your money goes

You choose between two approaches:

- **Active choice** lets you set your own split across four asset classes: equity (E), corporate bonds (C), government securities (G) and alternative investments (A). Equity allocation is capped, tapering down as you age.
- **Auto choice** puts you in a lifecycle fund that starts equity-heavy and shifts automatically toward debt as you approach 60. Aggressive, moderate and conservative variants exist.

For someone in their twenties or thirties, auto choice on the aggressive setting or a high equity active allocation is what makes long-run [compound interest](/glossary/compound-interest) do the heavy lifting.

## The tax benefits, which are the main draw

| Section | What it covers | Approximate limit |
| --- | --- | --- |
| 80CCD(1) | Your own contribution | Inside the Rs 1.5 lakh 80C ceiling |
| 80CCD(1B) | Additional self contribution | Rs 50,000 over and above 80C |
| 80CCD(2) | Employer contribution to your NPS | A percentage of basic plus DA, over and above the above |

The Rs 50,000 under 80CCD(1B) is the headline feature, because it is deduction space that no other instrument gives you. A taxpayer in the 30% bracket saves roughly Rs 15,000 of tax by using it in full.

The employer contribution route under 80CCD(2) is the least understood and often the most valuable, and in recent years a version of it has been available under the new tax regime as well, unlike most other deductions. Rules and percentages here have changed more than once, so confirm the current position with your payroll team or a tax adviser before restructuring your salary around it.

## A worked example

Suppose you are 30 and contribute Rs 5,000 a month until 60, with the corpus averaging 10% a year across equity and debt.

You will have put in Rs 18 lakh. The corpus lands somewhere near **Rs 1.13 crore**. Under current rules, up to 60% of that can be withdrawn tax-free and the remaining 40% must buy an annuity. So roughly Rs 68 lakh comes as a lump sum, and about Rs 45 lakh buys a pension. At an annuity rate of around 6%, that is in the region of Rs 22,000 a month, taxable as income.

Both the 10% return and the annuity rate are assumptions, not entitlements. Test other numbers in the [NPS calculator](/calculators/nps).

## The trade-offs to be honest about

- **The annuity requirement.** You do not get the whole corpus. Annuity rates in India have historically been modest, and the income is taxable at your slab rate.
- **Real lock-in.** Partial withdrawals from Tier I are allowed after three years for specified purposes such as education, marriage, a house or serious illness, capped at 25% of your own contributions. Otherwise the money is unavailable until 60.
- **Market risk.** NPS is not a guaranteed pension. The equity portion falls when markets fall.

## NPS or PPF or EPF?

They overlap but are not substitutes. [EPF](/glossary/epf) is automatic for most salaried employees and is debt-heavy. [PPF](/glossary/ppf) is fully tax-free but capped and conservative. NPS is the only one that gives you meaningful equity exposure inside a retirement wrapper plus that extra Rs 50,000 deduction.

A common sequence is: EPF happens on its own, PPF or ELSS fills the Section 80C space, and NPS is used specifically to claim the additional 80CCD(1B) room. Our [PPF vs FD vs NPS guide](/blog/ppf-vs-fd-vs-nps) works through the comparison in detail.`,
    faq: [
      {
        q: "Is NPS better than PPF for retirement?",
        a: "NPS offers equity exposure and an extra Rs 50,000 deduction that PPF does not, so its long-run return potential is higher. PPF is fully guaranteed and completely tax-free at maturity, while NPS forces part of your corpus into a taxable annuity. Many people use both rather than picking one.",
      },
      {
        q: "How much tax can I save with NPS?",
        a: "Under the old regime, your contribution counts within the Rs 1.5 lakh 80C limit, plus an additional Rs 50,000 under 80CCD(1B), which alone saves about Rs 15,000 for a 30% taxpayer. Employer contributions under 80CCD(2) are deductible separately. Confirm current limits, as they have changed in recent Budgets.",
      },
      {
        q: "Can I withdraw my full NPS corpus at 60?",
        a: "No. Under current rules you can withdraw up to 60% as a tax-free lump sum, and at least 40% must be used to buy an annuity that pays a monthly pension. If the total corpus is below a small specified threshold, full withdrawal is permitted. Verify the current thresholds with PFRDA.",
      },
      {
        q: "Is the NPS pension taxable in India?",
        a: "Yes. The lump sum portion withdrawn at 60 is tax-free under current rules, but the monthly annuity you receive afterwards is treated as income and taxed at your applicable slab rate in each year you receive it. This is an important detail people miss when projecting retirement income.",
      },
      {
        q: "What is the minimum contribution to keep an NPS Tier I account active?",
        a: "A Tier I account requires a small minimum contribution in each financial year, commonly Rs 1,000, to stay active. If you miss it the account is frozen and must be reactivated by paying the shortfall plus a nominal penalty. Check the current minimum with your CRA before assuming a figure.",
      },
      {
        q: "Can I change my NPS fund manager or asset allocation?",
        a: "Yes. PFRDA allows you to switch your pension fund manager and to change your allocation between active and auto choice, with a limited number of free changes each financial year. The switch happens within the same account, so it does not trigger a withdrawal or a tax event.",
      },
    ],
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
    bodyMarkdown: `The Employees' Provident Fund is a compulsory retirement savings scheme run by the EPFO for most salaried employees in India. It applies to establishments with 20 or more employees, and for anyone covered, the deduction happens before the salary reaches your account. That is the point: it is retirement saving that does not depend on your willpower.

Every member has a Universal Account Number, or UAN, which stays with you across employers. Getting your UAN activated and your KYC seeded is the single most useful administrative thing you can do with EPF, because everything else, from checking the balance to transferring the account, runs through it.

## Where the 12% actually goes

You contribute **12% of basic salary plus dearness allowance**. Your employer contributes a matching 12%, but that half is split:

- **8.33%** goes to the Employees' Pension Scheme (EPS), which pays a monthly pension after 58, subject to a wage ceiling.
- **3.67%** goes into your EPF balance alongside your own contribution.

So your EPF corpus does not grow by 24% of basic. It grows by roughly 15.67%, and the rest builds a separate, and generally modest, pension entitlement.

## A worked example

Take a basic salary of Rs 40,000 a month.

- Your contribution: Rs 4,800
- Employer to EPF: Rs 1,468
- Employer to EPS: Rs 1,250 (subject to the statutory wage ceiling)

That is roughly Rs 6,268 a month flowing into the EPF balance itself. At an interest rate near 8.25%, with normal salary increments, a career of 30 years on this basis builds a corpus running into the crores. It is quietly the largest single asset most salaried Indians own outside a house.

## The interest rate and how it is credited

The EPFO board recommends a rate each financial year and the government notifies it. It has been in the region of 8.25% recently, which is materially higher than [PPF](/glossary/ppf) and most fixed deposits. It is not a guaranteed forward rate: it is declared annually and has moved over time, so verify the current notified figure.

Interest is calculated on the monthly running balance but credited once a year, which is why your passbook often shows a lump credit appearing months after the year ends.

## Tax treatment, including the parts people get wrong

- **On the way in:** your own contribution counts toward the [Section 80C](/glossary/section-80c) deduction under the old regime, inside the shared Rs 1.5 lakh ceiling.
- **While growing:** interest is tax-free, with one significant exception. Where an employee's own contributions in a year exceed a specified threshold, interest on the excess is taxable. This mainly affects high earners and anyone making large Voluntary Provident Fund contributions.
- **On the way out:** withdrawal is tax-free if you have completed **five years of continuous service**, counting service across employers if you properly transferred the account rather than withdrawing between jobs. Withdraw before five years and both the accumulated interest and the employer's share become taxable, and [TDS](/glossary/tds) may be deducted.

Thresholds and rules here have changed in recent Budgets, so confirm the current position before withdrawing a large balance.

## The mistake that costs the most

When people change jobs, many withdraw the EPF balance rather than transferring it. It feels like free money. It is not.

Withdrawing resets your five year continuous service clock, can trigger tax, and, most expensively, removes a compounding balance from a roughly 8% tax-free environment decades before it was needed. A Rs 3 lakh balance withdrawn at 30 and spent is worth well over Rs 30 lakh at 58 had it stayed.

Transferring is now largely online through the EPFO member portal using your UAN.

## Partial withdrawal and VPF

EPF allows advances for defined purposes: a house, marriage, higher education, medical treatment, and periods of unemployment. Each has its own eligibility and limit.

If you want to save more in the same wrapper, the **Voluntary Provident Fund** lets you contribute above the mandatory 12% at the same interest rate. Your employer is not obliged to match it. For a conservative saver who has exhausted PPF's Rs 1.5 lakh cap, VPF is often the best available fixed-income option, subject to the taxable-interest threshold noted above.

EPF sits alongside [gratuity](/glossary/gratuity) and [NPS](/glossary/nps) as the corpus you build simply by staying employed. Estimate yours with the [EPF calculator](/calculators/epf).`,
    faq: [
      {
        q: "What is the current EPF interest rate?",
        a: "The EPFO recommends a rate each financial year and the government notifies it. It has been around 8.25% in recent years, which is higher than PPF and most bank fixed deposits. The rate is declared annually rather than guaranteed in advance, so check the latest EPFO notification before planning around it.",
      },
      {
        q: "Is EPF withdrawal taxable in India?",
        a: "It is tax-free if you have completed five years of continuous service, counting time across employers where you transferred rather than withdrew. Withdraw before five years and the employer's contribution and the accumulated interest become taxable, and TDS may be deducted unless the amount is below the notified threshold.",
      },
      {
        q: "Should I transfer or withdraw EPF when changing jobs?",
        a: "Almost always transfer. Transferring preserves your continuous service record for the five year tax exemption and keeps the balance compounding at roughly 8% tax-free. Withdrawing resets the clock, may trigger tax, and removes decades of compounding. The transfer can be done online through the EPFO portal using your UAN.",
      },
      {
        q: "How much does the employer actually contribute to EPF?",
        a: "The employer contributes 12% of basic plus dearness allowance, but only 3.67% of it goes into your EPF balance. The remaining 8.33% goes to the Employees' Pension Scheme, subject to a statutory wage ceiling. So your EPF corpus grows by about 15.67% of basic, not 24%.",
      },
      {
        q: "Can I withdraw EPF while still employed?",
        a: "Full withdrawal requires you to be unemployed for a specified period, but partial advances are allowed while employed for defined reasons: buying or building a house, marriage, higher education, medical treatment and a few others. Each has its own service requirement and withdrawal limit set by EPFO rules.",
      },
      {
        q: "What is VPF and is it worth it?",
        a: "Voluntary Provident Fund lets you contribute more than the mandatory 12% into the same account at the same interest rate, with no employer matching. For a conservative saver who has already used the Rs 1.5 lakh PPF cap, it is usually the best fixed-income option available, subject to the taxable-interest threshold on large contributions.",
      },
    ],
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
    bodyMarkdown: `An Equity Linked Savings Scheme is an ordinary equity [mutual fund](/glossary/mutual-fund) with one extra feature: money you put into it qualifies for a deduction under [Section 80C](/glossary/section-80c), and in exchange each investment is locked for three years. SEBI requires an ELSS to keep at least 65% of its portfolio in equity, so it behaves like a diversified equity fund, not a safe savings product.

It is the only Section 80C option that gives you meaningful stock market exposure, and it has the shortest lock-in of the lot.

## The lock-in works instalment by instalment

This is the detail that surprises people running a monthly [SIP](/glossary/sip), and it is worth being precise about.

The three years are counted from **each individual purchase**, not from when you started. A SIP instalment paid in April 2026 is free in April 2029. The instalment paid in March 2027 is not free until March 2030. So a 12 month SIP does not become fully liquid three years later, it unlocks in twelve monthly tranches.

There is no way to break the lock-in early. Not for an emergency, not for a job loss, not by paying a penalty. Unlike a fixed deposit, there is no premature-withdrawal window at all.

## How the tax saving actually works

Investing Rs 1.5 lakh in an ELSS reduces your taxable income by Rs 1.5 lakh, subject to the shared Section 80C ceiling.

| Your tax slab | Approximate tax saved on Rs 1.5 lakh |
| --- | --- |
| 30% | About Rs 45,000 |
| 20% | About Rs 30,000 |
| 5% | About Rs 7,500 |

Two important qualifications. First, the Rs 1.5 lakh is a **shared** limit: your [EPF](/glossary/epf) contribution, life insurance premiums, home loan principal, children's tuition fees and [PPF](/glossary/ppf) all compete for the same space, and many salaried people have already used a large part of it through EPF alone.

Second, the deduction is available only under the **old tax regime**. If you have chosen the new regime, an ELSS gives you no tax benefit at all, and you are simply buying an equity fund with a pointless three year lock-in. In that case a plain [index fund](/glossary/index-fund) is the better instrument.

## Tax when you sell

The deduction on the way in does not make the gains tax-free on the way out. ELSS is taxed like any other equity fund.

Because of the three year lock-in, every redemption is automatically a long-term [capital gain](/glossary/capital-gains). Long-term gains from equity are taxed above an annual exemption threshold, which has been Rs 1.25 lakh in recent years at a rate of 12.5%. These figures move with Budget announcements, so verify the current numbers before you sell a large holding.

## ELSS against the other 80C options

| | ELSS | PPF | 5 year tax-saving FD |
| --- | --- | --- | --- |
| Lock-in | 3 years per instalment | 15 years | 5 years |
| Return | Market linked, not guaranteed | Government declared | Fixed at booking |
| Risk of loss | Real | None | None |
| Tax on gains | LTCG above the annual exemption | Fully exempt | Taxed at your slab rate |

The three way trade is straightforward. ELSS offers the highest long-run potential and the only real risk of loss. PPF offers certainty and tax-free maturity at the cost of a very long lock-in. A tax-saving FD offers certainty with the worst tax treatment of the three.

## How to use one sensibly

**Invest monthly, not in March.** The annual scramble to save tax in the last week of the financial year means you buy at whatever price the market happens to be at, and you lock the whole amount for three years from that single date. A 12 month SIP spreads both the price and the unlock dates. That is [rupee cost averaging](/glossary/rupee-cost-averaging) doing useful work.

**Do not redeem at the three year mark by default.** The lock-in ending is not a signal to sell. If the fund is good and you do not need the money, an ELSS after year three is just a normal equity fund with no restrictions, and equity rewards long holding periods.

**Do not accumulate a new ELSS every year.** Investors who buy a different scheme each March end up with eight overlapping funds holding the same large-cap stocks. One or two is enough.

**Check the plan.** A direct plan of the same ELSS charges no distributor commission, and that gap compounds.`,
    faq: [
      {
        q: "What is the lock-in period for ELSS in India?",
        a: "Three years, counted separately from the date of each individual purchase. In a monthly SIP, each instalment unlocks three years after it was invested, so a 12 month SIP becomes fully liquid over 12 staggered months. There is no premature withdrawal option, even for an emergency.",
      },
      {
        q: "Is ELSS return tax free?",
        a: "No. The contribution earns a Section 80C deduction, but gains are taxed. Because of the mandatory three year hold, every ELSS redemption is a long-term capital gain from equity, taxed above an annual exemption threshold that has recently been Rs 1.25 lakh, at 12.5%. Verify current rates before selling.",
      },
      {
        q: "Is ELSS worth it under the new tax regime?",
        a: "Generally no. The Section 80C deduction is available only under the old regime, so under the new regime an ELSS is an ordinary equity fund carrying a three year lock-in for no benefit. If you have opted for the new regime, a plain index fund or flexi cap fund is the better choice.",
      },
      {
        q: "Can I withdraw ELSS before three years in an emergency?",
        a: "No. The lock-in is statutory, not a bank policy, so there is no penalty payment or hardship clause that releases the units early. This is why an ELSS should never hold money you might need at short notice. Keep that money in an emergency fund instead.",
      },
      {
        q: "How much can I invest in ELSS in a year?",
        a: "There is no upper limit on how much you can invest, but only Rs 1.5 lakh in a financial year qualifies for the Section 80C deduction, and that ceiling is shared with EPF, PPF, insurance premiums and other eligible items. Anything above that is locked for three years without any tax benefit.",
      },
      {
        q: "Should I sell my ELSS as soon as the lock-in ends?",
        a: "Not automatically. Once the three years pass, an ELSS behaves like any other equity fund with no restrictions. If the scheme is performing reasonably and you do not need the money, staying invested lets compounding continue. Sell only if the fund is genuinely underperforming or you have a real use for the money.",
      },
    ],
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
    bodyMarkdown: `Net Asset Value is the per-unit price of a [mutual fund](/glossary/mutual-fund). It is calculated by taking everything the fund owns, subtracting everything it owes, and dividing by the number of units investors hold.

If a fund holds securities and cash worth Rs 100 crore, owes Rs 1 crore in fees and payables, and has 9.9 crore units outstanding, its NAV is Rs 10 per unit.

## When the NAV is set

Indian mutual funds are priced **once a day**, after the markets close. The fund values every holding at that day's closing price, deducts expenses, and publishes a single NAV for the day.

This has a practical consequence people trip over. If you place an order at 11 am, you do not get the price you saw at 11 am. You get that day's closing NAV, provided your money reached the fund before the applicable cut-off time. Miss the cut-off, or have your payment clear the next morning, and you receive the following day's NAV instead.

Under current SEBI rules, units are allotted based on the NAV of the day the money is actually **realised** by the fund, not the day you clicked submit. For a large lumpsum, that one day gap can matter.

An [ETF](/glossary/etf) works differently: it trades continuously on an exchange, so its market price moves through the day and can sit slightly above or below its true underlying NAV.

## A worked example

You invest Rs 6,000 in a fund with a NAV of Rs 30. You are allotted 200 units.

Two years later the NAV is Rs 45. Your 200 units are now worth Rs 9,000. Your return is not "Rs 15 per unit", it is 50%, which is the only number that lets you compare this fund against any other.

If you had instead put Rs 6,000 into a fund with a NAV of Rs 300, you would hold 20 units. If that fund also rose 50%, your holding is also worth Rs 9,000. The unit count is bookkeeping. The percentage move is the return.

## The biggest myth in Indian mutual fund investing

A low NAV does not mean a fund is cheap, and a new fund offer at Rs 10 is not a bargain.

A share price of Rs 50 tells you something, because it is a claim on a specific business relative to its earnings. A mutual fund NAV tells you almost nothing, because it is simply the fund's assets divided by its units. Both numbers move together whenever anyone invests or redeems.

A fund with a NAV of Rs 800 is usually just an old fund that has compounded for twenty years. A fund with a NAV of Rs 10 is usually just a new one. Neither fact predicts anything about future returns.

The related and equally wrong belief is that a lower NAV means more units and therefore more growth. You get more units of something worth proportionally less. The arithmetic cancels exactly.

## What NAV does and does not include

- **Already deducted:** the [expense ratio](/glossary/expense-ratio), accrued daily. The NAV you see is net of fees, which is why fund costs are so easy to overlook.
- **Not deducted:** exit load, which is applied at redemption if you sell within the specified period, and any tax on your [capital gains](/glossary/capital-gains), which is your responsibility.

So the amount that reaches your bank account is NAV multiplied by units, minus exit load, and you settle the tax separately when you file.

## Growth versus IDCW, and why the NAV differs

The same scheme shows two different NAVs for its growth and IDCW options. This confuses people, but the reason is simple.

In the growth option, gains stay inside the fund and the NAV compounds upward. In the IDCW option, payouts are made from the fund, and the NAV drops by exactly the amount paid out. You did not gain anything on payout day. Money moved from one pocket to another, and it became taxable in the process.

## How to use NAV properly

Use it for two things only: to work out how many units you hold, and to track the percentage change in your investment. Judge a fund by its returns over full market cycles, its consistency, its expense ratio and its mandate. Never by the absolute size of its NAV.`,
    faq: [
      {
        q: "Is a lower NAV better when buying a mutual fund?",
        a: "No. A low NAV simply means the fund is newer or has issued more units. You get more units at a proportionally lower price, so the value of your investment is identical. Returns depend on the percentage change in NAV, not on whether the number starts at Rs 10 or Rs 800.",
      },
      {
        q: "At what time is mutual fund NAV declared in India?",
        a: "Funds calculate NAV after market close and typically publish it the same evening, with AMFI hosting the official figures. Equity fund NAVs are usually available by late evening on a working day. There is no intraday NAV, which is one of the main differences between a mutual fund and an exchange-traded fund.",
      },
      {
        q: "Which day's NAV will I get for my mutual fund purchase?",
        a: "Under current SEBI rules, you receive the NAV of the day on which your money is actually realised by the fund, provided it is credited before the applicable cut-off time. Clicking submit does not lock a price. For large transfers, allow a day for clearing when timing matters.",
      },
      {
        q: "Why does NAV fall after a dividend or IDCW payout?",
        a: "Because the payout comes out of the fund's own assets. If a fund with a Rs 40 NAV pays Rs 2 per unit, the NAV drops to Rs 38 the same day. You have not gained anything, and the payout is taxable at your slab rate, which is why the growth option is usually more efficient.",
      },
      {
        q: "Does the expense ratio get deducted from NAV?",
        a: "Yes. Fund expenses are accrued daily and already reflected in the published NAV, so you never receive a separate bill. This is why a higher expense ratio quietly reduces returns without ever appearing as a visible charge, and why comparing direct and regular plans of the same scheme is worth doing.",
      },
      {
        q: "Can a mutual fund NAV become zero?",
        a: "Effectively no for a diversified fund, because it would require every holding to become worthless simultaneously. NAV can fall sharply in a market crash or, for a debt fund, if a large issuer defaults and the holding is written down. Falling significantly is possible; going to zero is not realistic.",
      },
    ],
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

That gives ETFs intraday flexibility. You can place limit orders, buy at a specific price, or sell mid-session. It also introduces two frictions a mutual fund does not have: you pay brokerage on each trade, and the market price can drift slightly away from the fund's true underlying value.

## Tracking error and the price gap

Two small imperfections are worth understanding before you buy.

**Tracking error** is the gap between the index's return and the ETF's return. It exists because the fund charges a fee, holds a little cash, and has to trade when the index rebalances. A well-run large ETF keeps this small; a thinly-traded one may not.

**The premium or discount** is the gap between the ETF's market price and the value of what it actually holds. In a liquid ETF this stays negligible. In an illiquid one, especially during a volatile session, you can pay meaningfully more than the units are worth. Checking the traded volume before buying matters more with ETFs than with mutual funds.

## Why the cost is so low

Most ETFs are passive: they mirror an index such as the Nifty 50 rather than employing a manager to pick stocks. No research team means no research budget, which is why the [expense ratio](/glossary/expense-ratio) on a large index ETF is often a small fraction of what an actively managed fund charges.

That gap looks trivial in one year and decisive over twenty. A difference of one percentage point in annual cost, compounded across a working life, is a large amount of money that stays in your account instead of the fund's.

## What you actually own

A Nifty 50 ETF gives you a proportional stake in India's fifty largest listed companies in a single trade. If those companies collectively rise, so does your ETF, minus the fee. If they fall, so does it. You are accepting the market's return rather than trying to beat it, and consistently beating it turns out to be rare.

Beyond equity indices, ETFs exist for gold, for bonds, for international indices, and for narrower themes and sectors. The broad, boring ones are generally the ones worth owning; the narrow thematic ones concentrate risk in exactly the way an ETF is supposed to avoid.

## ETF or index fund?

They do the same job through different plumbing, and for most people the [index fund](/glossary/index-fund) is the more practical choice.

An index fund needs no demat account, charges no brokerage, and accepts a [SIP](/glossary/sip). You can automate Rs 2,000 a month and never think about it. An ETF needs a demat and trading account and cannot be automated in the same way, but gives you intraday pricing and often a marginally lower expense ratio.

If you are investing a fixed amount every month and want it hands-off, the index fund wins on convenience. If you already trade, hold a demat account, and are deploying larger sums at once, the ETF's lower running cost starts to matter.

Either way you get instant [diversification](/glossary/diversification) at a low cost, which is the substance of the decision. The wrapper is a detail.`,
    faq: [
      {
        q: "Do I need a demat account to buy an ETF in India?",
        a: "Yes. ETFs are listed securities, so you need both a demat account to hold the units and a trading account to place orders. This is the main practical difference from an index fund, which needs only a PAN, a bank account and completed KYC.",
      },
      {
        q: "Which is better in India, an ETF or an index fund?",
        a: "For most retail investors an index fund is more practical: no demat account, no brokerage, and you can automate a monthly SIP. An ETF suits those who already trade, are deploying larger lump sums, and want intraday pricing and a marginally lower expense ratio. Both track the same index.",
      },
      {
        q: "How are ETFs taxed in India?",
        a: "Equity ETFs are taxed like equity mutual funds: long-term gains above an annual exemption threshold at a concessional rate, short-term gains at a higher rate. Gold and international ETFs have historically followed different rules that have changed more than once, so verify the current treatment before investing.",
      },
      {
        q: "What is tracking error in an ETF?",
        a: "It is the gap between the index return and the ETF return. It arises from the expense ratio, cash held for redemptions, and trading costs when the index rebalances. A large, liquid ETF typically keeps this small. A thinly traded one can drift noticeably, which is why volume is worth checking.",
      },
      {
        q: "Can I do a SIP in an ETF?",
        a: "Not in the automated way you can with a mutual fund. Because ETFs trade on an exchange, most brokers cannot debit your bank and buy units automatically each month. Some platforms offer a scheduled-order feature that approximates it, but if hands-off automation matters, an index fund is the cleaner option.",
      },
      {
        q: "Why is an ETF cheaper than an actively managed fund?",
        a: "Because it is passive. It mirrors an index rather than paying a research team to select stocks, so there is no research budget to recover. Large Indian index ETFs often charge a small fraction of what an active fund charges, and that gap compounds substantially across a working lifetime.",
      },
    ],
    related: ["index-fund", "mutual-fund", "nav", "expense-ratio", "diversification"],
  },
  {
    slug: "index-fund",
    term: "Index Fund",
    category: "Investing",
    short:
      "An index fund is a mutual fund that passively tracks a market index like the Nifty 50, aiming to match the market's return at a very low cost.",
    bodyMarkdown: `An index fund is a [mutual fund](/glossary/mutual-fund) that makes no attempt to pick winners. It buys every share in a chosen index in the same proportion the index holds them, and then leaves them alone except when the index itself changes. If the Nifty 50 rises 10% in a year, a Nifty 50 index fund aims to return close to 10%, minus a small fee.

That sounds like giving up. In practice it is a well-evidenced strategy, because consistently beating a broad index after costs turns out to be very difficult over long periods.

## How it works mechanically

Suppose the Nifty 50 has a particular company at a 6% weight. The index fund holds roughly 6% of its portfolio in that company. When money comes in, the manager buys across all 50 names in those proportions. When the index provider adds or removes a company at its periodic review, the fund follows.

There is no analyst deciding anything is overvalued. There is no view. The fund's only job is to mirror the benchmark as closely as possible, and its quality is judged by **tracking error**, the gap between the index return and the fund's return.

## The cost argument, with numbers

A large Nifty 50 index fund often charges an [expense ratio](/glossary/expense-ratio) well under 0.3%. An actively managed large cap fund typically charges considerably more, and a regular plan more still.

Take a Rs 10,000 monthly [SIP](/glossary/sip) over 25 years at a gross 12%:

- At a total cost of 0.2%, the corpus lands near Rs 1.85 crore.
- At a total cost of 1.7%, the same gross return delivers roughly Rs 1.50 crore.

That gap of around Rs 35 lakh is not caused by worse investing. It is the fee, compounded. This is the entire case for indexing, and it is a mathematical certainty rather than a forecast: the active fund has to beat the index by its extra cost every year just to break even with you.

## What indexes are available in India

- **Nifty 50 and Sensex** track the largest listed companies. The default starting point.
- **Nifty Next 50** covers the tier below the top 50, historically more volatile.
- **Nifty 500 and total market indices** give the broadest domestic coverage in one fund.
- **Midcap and smallcap indices** concentrate risk deliberately and swing much harder.
- **International indices**, such as US-focused ones, add currency and geography diversification, though Indian rules on overseas investment limits have changed periodically.
- **Debt indices** track government or corporate bond baskets with defined maturities.

For a first equity investment, a broad large cap or total market index fund does the job. The narrower the index, the more you are making an active bet while telling yourself you are being passive.

## Index fund or ETF?

They track the same thing through different plumbing.

| | Index fund | [ETF](/glossary/etf) |
| --- | --- | --- |
| Account needed | PAN, bank, KYC | Demat plus trading account |
| Priced | Once daily at [NAV](/glossary/nav) | Continuously through the session |
| Monthly SIP | Fully automatic | Not really |
| Extra costs | None | Brokerage on each trade |
| Expense ratio | Very low | Often marginally lower |

If you are investing a fixed amount monthly and want it hands-off, the index fund wins. If you already hold a demat account and deploy larger sums at once, the ETF's slightly lower running cost starts to count.

## What indexing does not protect you from

An index fund gives you the market's return. That includes the market's losses. In a year when the Nifty falls 25%, your index fund falls close to 25%, and no manager will step in to cut exposure. Passive means passive in both directions.

It also does not remove the need for a horizon. Index investing works because it is held through cycles. Sold in a panic after eighteen months, it fails exactly as badly as anything else.

## Common mistakes

- **Comparing two Nifty 50 index funds on returns.** They hold identical stocks. Compare expense ratio and tracking error instead.
- **Buying a regular plan.** A regular plan of an index fund pays a commission out of the fund and undoes much of the cost advantage that is the whole point.
- **Owning five index funds.** A Nifty 50, a Sensex and a large cap index fund are largely the same thirty companies. That is duplication, not [diversification](/glossary/diversification).
- **Chasing a thematic index.** A narrow sector index is an active bet in a passive costume.`,
    faq: [
      {
        q: "Are index funds good for beginners in India?",
        a: "They are one of the simplest sensible starting points. You get exposure to a broad set of large companies, costs are very low, no fund manager judgement is involved, and a monthly SIP can be automated. The main requirement is a horizon of at least five to seven years to ride out volatility.",
      },
      {
        q: "What returns do Nifty 50 index funds give?",
        a: "They deliver the Nifty 50's return minus a small expense ratio and tracking error. Long-run Indian equity returns have historically averaged in the low teens over multi-decade periods, but individual years have ranged from sharp losses to large gains. No return is guaranteed, and past averages are not a forecast.",
      },
      {
        q: "Index fund or actively managed fund, which is better?",
        a: "An index fund guarantees you the market return minus a very small cost. An active fund might beat it, and might not, while charging considerably more. Evidence across markets shows most active large cap funds trail their benchmark over long periods after fees. Many investors index the core and use active funds selectively.",
      },
      {
        q: "Do index funds pay dividends in India?",
        a: "Dividends received from the underlying companies are reinvested into the fund in the growth option, which is reflected in a rising NAV rather than a cash payout. Some schemes offer an IDCW option that distributes them, but the NAV falls by the payout amount and the receipt is taxed at your slab rate.",
      },
      {
        q: "How much should I invest in an index fund each month?",
        a: "There is no universal figure. Start with an amount you can sustain through a bad year without stopping, since consistency matters far more than size. Many funds accept Rs 500 a month. Increase it with each salary rise rather than trying to start large and abandoning the SIP later.",
      },
      {
        q: "What is tracking error and why does it matter?",
        a: "Tracking error is how far a fund's return drifts from its index. It comes from expenses, cash holdings and rebalancing costs. Since two funds tracking the same index hold identical stocks, tracking error and expense ratio are effectively the only things that distinguish them, so compare those rather than past returns.",
      },
    ],
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
    bodyMarkdown: `With simple interest you earn a return only on the money you originally put in. With compound interest, each period's interest is added to your balance, so the following period you earn interest on a larger sum. Interest earns interest, and then that earns interest too.

It is the single most important idea in personal finance, and it works against you just as reliably as it works for you.

## Simple against compound, with numbers

Put Rs 1,00,000 away at 10% a year.

| Years | Simple interest | Compounded annually |
| --- | --- | --- |
| 5 | Rs 1,50,000 | Rs 1,61,051 |
| 10 | Rs 2,00,000 | Rs 2,59,374 |
| 20 | Rs 3,00,000 | Rs 6,72,750 |
| 30 | Rs 4,00,000 | Rs 17,44,940 |

Look at what happens between year 20 and year 30. Simple interest adds another Rs 1 lakh, exactly as it did in every previous decade. Compounding adds nearly Rs 11 lakh. Same rate, same money, entirely different outcome, purely because of time.

## Why compounding frequency matters

Interest can be added annually, half-yearly, quarterly, monthly or daily. The more often it is added, the sooner it starts earning on itself.

Rs 1,00,000 at 8% for 5 years:

- Compounded annually: about Rs 1,46,933
- Compounded quarterly: about Rs 1,48,595
- Compounded monthly: about Rs 1,48,985

The differences look small over five years and widen over twenty. In India, most bank [fixed deposits](/glossary/fixed-deposit) compound quarterly, [PPF](/glossary/ppf) and [EPF](/glossary/epf) compound annually, and savings accounts credit interest quarterly on a daily balance. This is also why the "effective annual rate" can be slightly higher than the advertised rate.

## The rule of 72

A shortcut worth memorising: divide 72 by the annual return to estimate how many years your money takes to double.

- At 6%, money doubles in about 12 years
- At 8%, about 9 years
- At 12%, about 6 years
- At 15%, about 4.8 years

It also works in reverse for [inflation](/glossary/inflation). At 6% inflation, prices double in roughly 12 years, which is the same statement as your money losing half its purchasing power.

## The cost of starting late

This is where compounding is most brutal, and most useful to understand at 25 rather than 45.

Two people both invest until 60 at an assumed 12%:

- **Ananya** invests Rs 5,000 a month from age 25. She contributes Rs 21 lakh over 35 years and ends near **Rs 3.2 crore**.
- **Rohit** starts at 35 with the same Rs 5,000 a month. He contributes Rs 15 lakh over 25 years and ends near **Rs 95 lakh**.

Rohit invested 71% of what Ananya did and ended with under a third of her corpus. The missing decade was the one where her early money had the longest to compound. Rohit would need roughly Rs 17,000 a month to catch up, which is why "start early" is advice about arithmetic rather than discipline.

Treat 12% as an assumption for illustration, not a promise. Equity returns are lumpy and no rate is guaranteed. Test different assumptions in our [compound interest calculator](/calculators/compound-interest).

## It works against you too

Compounding is the reason credit card debt is so dangerous. A card charging around 3.5% a month is compounding at roughly 42% a year. An unpaid Rs 50,000 balance, left alone, becomes over Rs 71,000 in twelve months and more than doubles in two years.

The same mechanism that builds a retirement corpus builds a debt trap. Clearing high-interest debt before investing is usually the highest-return decision available to you, because you are guaranteed to avoid a rate that no investment reliably matches.

## What actually determines your outcome

Three levers: how much you invest, what rate you earn, and how long you leave it. Most people obsess over the second, which they control least. Time is the lever with the steepest effect and the one that quietly expires.

This is the engine behind a [SIP](/glossary/sip), behind PPF's 15 year term, and behind why interrupting a long-term investment to fund a short-term want is more expensive than it looks. See [CAGR](/glossary/cagr) for how compounded returns are measured after the fact.`,
    faq: [
      {
        q: "What is the formula for compound interest?",
        a: "The standard formula is A equals P multiplied by (1 plus r divided by n) raised to the power of n times t. Here P is the principal, r the annual rate as a decimal, n the number of times interest compounds per year, and t the number of years. A is the final amount.",
      },
      {
        q: "How is compound interest different from simple interest?",
        a: "Simple interest is calculated only on the original principal, so it adds the same amount every year. Compound interest is calculated on the principal plus all accumulated interest, so each year adds more than the last. Over five years the gap is modest. Over thirty years it can be several times over.",
      },
      {
        q: "Which Indian investments offer compound interest?",
        a: "PPF and EPF compound annually, bank fixed deposits and recurring deposits usually compound quarterly, and savings accounts credit quarterly on a daily balance. Mutual funds do not pay interest at all, but reinvested growth in the NAV produces a compounding effect that behaves similarly over long periods.",
      },
      {
        q: "What is the rule of 72?",
        a: "Divide 72 by your annual return to estimate the years needed to double your money. At 8% that is about nine years, at 12% about six. It is an approximation, most accurate for rates between roughly 5% and 15%, but it is fast enough to do in your head.",
      },
      {
        q: "Does compound interest apply to credit card debt in India?",
        a: "Yes, and aggressively. Indian credit cards commonly charge around 3% to 3.5% a month, which compounds to roughly 40% or more a year, plus GST on the interest. Unpaid balances grow far faster than most people expect, which is why clearing card debt usually beats any investment return available.",
      },
      {
        q: "Is monthly compounding better than annual compounding?",
        a: "Yes, at the same nominal rate, because interest starts earning on itself sooner. The difference is small over short periods and grows over long ones. When comparing deposits, look at the effective annual yield rather than the headline rate, since compounding frequency is often the reason two similar-looking offers differ.",
      },
    ],
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
    bodyMarkdown: `Inflation is the rate at which the general price level rises over time. If inflation is 6% a year, a basket of goods costing Rs 100 today costs about Rs 106 next year. The number in your bank account has not changed. What it can buy has shrunk.

In India it is measured mainly by the Consumer Price Index, which tracks a basket weighted towards food, fuel, housing and services. The Reserve Bank of India operates a flexible inflation targeting framework, aiming for CPI inflation around 4% with a tolerance band of plus or minus two percentage points, and it adjusts the repo rate largely in response to it.

## The compounding you did not sign up for

Inflation compounds exactly as [compound interest](/glossary/compound-interest) does, just in the wrong direction.

At 6% a year, the purchasing power of Rs 10 lakh sitting in cash:

| Years from now | What it can buy in today's terms |
| --- | --- |
| 5 | About Rs 7.47 lakh |
| 10 | About Rs 5.58 lakh |
| 20 | About Rs 3.12 lakh |
| 30 | About Rs 1.74 lakh |

Nothing was stolen. No transaction appears anywhere. Over thirty years, roughly 83% of the value quietly evaporated while the balance stayed at Rs 10 lakh.

## Real return is the only return that matters

Nominal return is what the product advertises. Real return is what you keep after inflation.

The approximation most people use is simply nominal minus inflation. A fixed deposit paying 7% while inflation runs at 6% gives a real return of about 1%.

Now apply tax, which is charged on the nominal figure, not the real one:

- FD interest: 7%
- Tax at a 30% slab: minus 2.1%
- Post-tax return: 4.9%
- Inflation: 6%
- **Real return: about minus 1.1%**

The deposit grew. The buying power fell. This is the trap in treating fixed deposits as a safe place for long-horizon money: safe from volatility is not the same as safe from erosion. See [fixed deposit](/glossary/fixed-deposit) for how the tax works.

## Why your personal inflation is usually higher

Headline CPI is an average across a national basket. Your own rate depends on what you actually spend on.

Education fees, private healthcare, domestic help and residential rent in Indian metros have frequently risen faster than headline CPI. Electronics and telecom have often risen more slowly or fallen. A young family paying school fees and rent experiences a materially higher effective inflation rate than the headline number suggests.

If you are planning for a child's education twenty years out, using 6% will almost certainly understate the bill.

## What this means for planning

- **An [emergency fund](/glossary/emergency-fund) should still be in cash-like instruments.** Losing a little to inflation is the price of certain access, and it is worth paying for money you might need next week.
- **Long-horizon money needs assets that can outpace inflation.** Historically that has meant equity through a [SIP](/glossary/sip) or [index fund](/glossary/index-fund), which is volatile in the short run and has beaten inflation comfortably over long periods.
- **Retirement figures must be inflated.** Rs 50,000 a month of expenses today becomes roughly Rs 1.6 lakh a month in 20 years at 6%. Planning on today's numbers is the most common and most expensive retirement mistake.
- **Fixed income has a role, just not the whole role.** [PPF](/glossary/ppf) and [EPF](/glossary/epf) have historically stayed slightly ahead of inflation with the advantage of favourable tax treatment.

Test your own numbers with our [inflation calculator](/calculators/inflation).

## Related terms worth knowing

**Deflation** is falling prices, which sounds pleasant and is generally a sign of a weak economy. **Disinflation** is inflation slowing down while prices still rise. **Stagflation** is high inflation combined with weak growth, the hardest combination for a central bank to fix, because raising rates to fight inflation weakens growth further.

## The mistake to avoid

The most common error is not investing badly. It is treating cash as risk-free. A large savings account balance held for a decade "just to be safe" is a guaranteed loss in real terms, and it is invisible because the number on the statement never goes down.`,
    faq: [
      {
        q: "What is the current inflation rate in India?",
        a: "India's headline retail inflation is published monthly as the Consumer Price Index by the Ministry of Statistics, and the RBI targets 4% with a two percentage point tolerance band on either side. The actual figure moves month to month with food and fuel prices, so check the latest MoSPI or RBI release.",
      },
      {
        q: "How do I calculate the real return on my investment?",
        a: "Subtract inflation from your post-tax nominal return. A fixed deposit paying 7%, taxed at a 30% slab, gives about 4.9% post-tax. If inflation is 6%, the real return is roughly minus 1.1%. The precise formula divides one plus the nominal rate by one plus inflation, but subtraction is close enough for planning.",
      },
      {
        q: "Which investments beat inflation in India?",
        a: "Over long periods, equity through index funds, diversified mutual funds and SIPs has historically outpaced inflation by a comfortable margin, though with real volatility. Gold has broadly kept pace over very long horizons. Savings accounts and most fixed deposits struggle to beat inflation once tax is applied.",
      },
      {
        q: "Why does inflation hurt fixed deposit investors most?",
        a: "Because FD interest is taxed at your full slab rate on the nominal amount, not the real one. A 7% FD taxed at 30% yields about 4.9%, which loses to 6% inflation. The deposit grows in rupees while shrinking in buying power, and the loss never appears on any statement.",
      },
      {
        q: "How much will Rs 1 crore be worth in 20 years?",
        a: "At 6% inflation, Rs 1 crore twenty years from now would buy roughly what Rs 31 lakh buys today. At 7% it falls closer to Rs 26 lakh. This is why retirement targets set in today's rupees are usually far too low, and why long-term goals must be inflated before you plan for them.",
      },
      {
        q: "Does the RBI repo rate affect inflation?",
        a: "Yes. The RBI raises the repo rate to make borrowing costlier and cool demand when inflation runs above its target, and cuts it to support growth when inflation is contained. The effect works with a lag of several quarters, and it also feeds directly into your home loan EMI and deposit rates.",
      },
    ],
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
    bodyMarkdown: `Real investments rarely grow by the same amount two years running. They jump, fall and jump again. Compound Annual Growth Rate strips out that year-to-year noise and answers one question: what single steady annual rate would have taken this investment from its starting value to its ending value over this period?

It is a smoothed, backward-looking number. Nothing actually grew at that rate. It is the rate that would have produced the same destination.

## The formula, in words

Divide the ending value by the beginning value, raise the result to the power of one divided by the number of years, then subtract one.

If Rs 1,00,000 grows to Rs 2,00,000 over 6 years, the ratio is 2. The sixth root of 2 is about 1.122, so the CAGR is roughly **12.2%**.

## A worked example that shows why it is needed

Suppose a fund's actual annual returns over five years are:

- Year 1: plus 30%
- Year 2: minus 15%
- Year 3: plus 25%
- Year 4: minus 5%
- Year 5: plus 20%

The simple average of those five numbers is 11%. But an investment of Rs 1,00,000 actually ends at about Rs 1,59,800, which is a CAGR of about **9.8%**.

The simple average overstates the outcome, and it always will when returns fluctuate, because a loss requires a larger percentage gain to recover from. A 50% fall needs a 100% rise to get back to level. CAGR accounts for this automatically. A simple average never does.

## Where CAGR is the right tool and where it is not

CAGR assumes one amount invested at the start and left untouched until the end. That makes it correct for:

- A [lumpsum](/glossary/lumpsum) mutual fund investment
- A fixed deposit or PPF balance over a defined period
- A property bought once and sold once
- Comparing two funds over the same fixed window

It is the wrong tool the moment money goes in or out at different dates. A monthly [SIP](/glossary/sip) makes 36 separate investments over three years, each held for a different length of time. Applying CAGR to the total invested against the final value overstates or understates the return depending on the pattern. That is what [XIRR](/glossary/xirr) exists for, and it is the number Indian mutual fund statements now report for SIPs.

## What CAGR deliberately hides

| | Fund A | Fund B |
| --- | --- | --- |
| 3 year CAGR | 12% | 12% |
| Worst single year | minus 4% | minus 38% |
| Best single year | plus 21% | plus 61% |
| Path | Steady | Violent |

Both funds have the same CAGR and are not remotely the same investment. Fund B is far harder to hold, and an investor who panicked and sold at the bottom would never have realised that 12%.

CAGR tells you where you arrived. It says nothing about how uncomfortable the journey was, and discomfort is what causes people to sell at the wrong time.

## Two more limitations worth knowing

**Start and end dates are chosen, and can be chosen flatteringly.** A 5 year CAGR measured from a market bottom looks spectacular. The same fund measured from the peak a year earlier looks poor. When you see an impressive CAGR in marketing material, check the window, and compare rolling returns across several starting points rather than one convenient one.

**It is not adjusted for inflation or tax.** A 9% CAGR while [inflation](/glossary/inflation) runs at 6% is a real return of roughly 3%, before any tax on [capital gains](/glossary/capital-gains). The headline number flatters.

## Typical benchmarks in India

Useful reference points, though none is a promise: bank fixed deposits have run around 6% to 7.5%, PPF around 7% to 8%, EPF slightly above that, and broad Indian equity indices have delivered low-to-mid teens over multi-decade periods with severe interim drawdowns. Any product advertising a guaranteed CAGR far above these ranges deserves suspicion rather than interest.

Work out the CAGR on your own investments with our [CAGR calculator](/calculators/cagr).`,
    faq: [
      {
        q: "What is a good CAGR for an investment in India?",
        a: "It depends entirely on the asset. For a debt instrument, 7% to 8% is reasonable. For broad Indian equity over a long horizon, low-to-mid teens has been the historical range, with severe interim falls. Any product promising a guaranteed CAGR well above these levels should be treated with suspicion.",
      },
      {
        q: "What is the difference between CAGR and absolute return?",
        a: "Absolute return is the total percentage gain regardless of time: Rs 1 lakh becoming Rs 2 lakh is 100%, whether it took two years or twenty. CAGR annualises that into a per-year rate, which is the only way to compare investments held for different lengths of time on equal footing.",
      },
      {
        q: "Can CAGR be negative?",
        a: "Yes. If the ending value is lower than the starting value, the CAGR is negative and tells you the average annual rate of decline. A fund that fell from Rs 1 lakh to Rs 80,000 over three years has a CAGR of roughly minus 7.2% a year.",
      },
      {
        q: "Should I use CAGR or XIRR for my SIP returns?",
        a: "Use XIRR. CAGR assumes a single investment held for the full period, which is wrong for a SIP where each instalment is invested for a different length of time. XIRR weights every dated cash flow correctly. Indian fund statements and platforms now report XIRR for SIPs for exactly this reason.",
      },
      {
        q: "Does CAGR account for inflation and tax?",
        a: "No. CAGR is a nominal, pre-tax figure. A 9% CAGR with 6% inflation is a real return of roughly 3%, and capital gains tax reduces it further when you sell. To judge whether an investment genuinely built wealth, subtract inflation and estimated tax from the headline CAGR.",
      },
      {
        q: "Why can two funds with the same CAGR be very different?",
        a: "Because CAGR describes only the start and end points, not the path. One fund may have moved steadily while another swung between a 38% loss and a 61% gain. The volatile one is far harder to hold, and investors who sell during a sharp fall never actually receive the headline CAGR.",
      },
    ],
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
    bodyMarkdown: `XIRR stands for Extended Internal Rate of Return. It is the annualised return of an investment where money goes in and out on **irregular dates**, which describes almost every real portfolio: a monthly [SIP](/glossary/sip), a top-up after a bonus, a partial redemption for a wedding, a fresh purchase eight months later.

[CAGR](/glossary/cagr) can only handle one amount in and one amount out. XIRR handles any number of dated cash flows, which is why Indian mutual fund statements and platforms now report XIRR rather than CAGR for SIP investors.

## Why a SIP needs it

Consider a Rs 5,000 monthly SIP run for three years. You have invested Rs 1,80,000 in total, but not on one day. The first instalment has been working for 36 months. The last has been working for one.

If the portfolio is worth Rs 2,10,000 at the end, a naive calculation says you gained Rs 30,000 on Rs 1,80,000, which is 16.7%, and over three years that "sounds like" about 5.3% a year. Both figures are wrong. Your average rupee was invested for roughly 18 months, not 36, so the actual annualised return is closer to **10.5%**.

XIRR gets this right automatically because it weights every instalment by how long it was actually invested.

## How the calculation works

XIRR finds the single annual discount rate at which the present value of all your cash flows, each dated, sums to zero.

You do not solve this by hand. There is no closed-form answer; spreadsheets find it by iteration. In practice:

- List every date on which money moved
- Enter money you paid in as a **negative** number
- Enter money you received, plus the current value on today's date, as a **positive** number
- Apply the XIRR function to the two columns

The sign convention is where most people go wrong. If every number is positive, the function returns an error or nonsense.

## A worked layout

| Date | Cash flow |
| --- | --- |
| 01 Apr 2023 | minus 5,000 |
| 01 May 2023 | minus 5,000 |
| ... each month ... | minus 5,000 |
| 01 Mar 2026 | minus 5,000 |
| 04 Sep 2026 | plus 2,10,000 |

The final positive row is not a real redemption. It is the current market value entered on today's date, which is how you measure an ongoing investment without selling anything.

## XIRR against the alternatives

| | Best used for | Handles multiple dates | Handles withdrawals |
| --- | --- | --- | --- |
| Absolute return | Total gain, any period | No | No |
| CAGR | A single lumpsum, start to end | No | No |
| XIRR | SIPs, top-ups, partial exits | Yes | Yes |

For a one-time [lumpsum](/glossary/lumpsum) held untouched, XIRR and CAGR give the same answer. The moment there is a second transaction, only XIRR is correct.

## Reading your XIRR sensibly

**A short-horizon XIRR is unstable.** In the first year of a SIP, a small market move produces an extreme annualised figure because the numbers are being scaled up to a yearly rate from a few months of data. A 40% XIRR after eight months means very little.

**It is nominal and pre-tax.** Subtract [inflation](/glossary/inflation) and the tax you will owe on [capital gains](/glossary/capital-gains) to know what you actually kept.

**It reflects your behaviour, not just the fund's.** If you invested heavily near a peak and stopped during a fall, your XIRR will be below the fund's own published return. That gap is the cost of timing, and seeing it measured is genuinely useful.

**Compare like with like.** An XIRR on an equity SIP started three years ago is not comparable to an FD rate, because one is a realised path through a specific market and the other is a contracted rate.

## Where to find yours

Most Indian platforms show XIRR on the portfolio page. The consolidated account statement from CAMS or KFintech can be exported and run through a spreadsheet if you hold funds across several apps and want one honest number across all of them.`,
    faq: [
      {
        q: "What is a good XIRR for a SIP in India?",
        a: "For an equity SIP held over five years or more, a double-digit XIRR is a reasonable long-run expectation, though not a guarantee. For debt funds, 6% to 8% is typical. Judge XIRR against the fund's own benchmark over the same period rather than against an absolute target.",
      },
      {
        q: "What is the difference between XIRR and CAGR?",
        a: "CAGR measures a single investment from one start date to one end date. XIRR handles many cash flows on irregular dates, weighting each by how long it was invested. For a one-time lumpsum they give the same answer. For a SIP or any portfolio with top-ups and withdrawals, only XIRR is accurate.",
      },
      {
        q: "How do I calculate XIRR in Excel or Google Sheets?",
        a: "Put every transaction date in one column and the amount in the next, entering investments as negative numbers and redemptions plus today's portfolio value as positive. Then use the XIRR function with the values range first and the dates range second. It returns an annualised decimal you format as a percentage.",
      },
      {
        q: "Why is my XIRR lower than the fund's advertised return?",
        a: "Because the fund's published return assumes a lumpsum held for the full period, while your XIRR reflects when you actually invested. If you invested more heavily near a market peak or paused during a fall, your personal return will trail the fund's. That gap measures the cost of your timing.",
      },
      {
        q: "Can XIRR be negative?",
        a: "Yes. A negative XIRR means your portfolio is worth less than what you put in, on a time-weighted basis. It is common in the first year or two of an equity SIP started before a market correction, and it usually reverses over longer holding periods rather than indicating a broken investment.",
      },
      {
        q: "Is XIRR reliable for a SIP less than a year old?",
        a: "Not really. XIRR annualises whatever happened, so a few months of data gets scaled up into an extreme yearly figure in either direction. A 45% or minus 30% XIRR after six months is mathematically correct and practically meaningless. Wait at least two to three years before drawing conclusions.",
      },
    ],
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

Two reasons, usually at once. The company raises capital it does not have to repay, funding expansion or clearing debt. And early backers (founders, employees, venture investors who have been locked in for years) finally get a market where they can sell.

That second reason matters to you as a buyer. An IPO where the company issues new shares brings money into the business. An offer for sale, where existing shareholders simply sell their stakes, brings the company nothing at all. The cash goes to the sellers. The offer document says which is which, and the mix tells you something about who the listing is really for.

## How to apply

You apply through ASBA, which stands for Application Supported by Blocked Amount, from your bank's net banking or your broker's app. Your money is not debited when you apply. It is **blocked** in your account. If you get an allotment, the amount is taken; if you do not, the block simply lifts and the money was never gone.

You apply in lots at a price within the announced band, and the issue stays open for a few days. Retail applications up to Rs 2 lakh fall in the retail category, which has its own reserved portion.

## What happens when it is oversubscribed

Popular issues attract far more applications than there are shares. When that happens, retail investors go into a lottery: applications are randomly selected, and you either get one full lot or nothing at all.

This has a practical consequence people learn the hard way. Applying for a larger quantity does not improve your odds in the retail lottery, because selection happens per application, not per rupee. Nor does applying on the last day, or the first.

## Grey market premium is not information

Before listing, you will see a widely-quoted grey market premium purporting to predict the listing price. It is worth knowing what this actually is: an unofficial, unregulated, entirely opaque number produced by an off-market trading circle, with no disclosure requirements and no enforceable settlement behind it.

It is frequently wrong, it can be moved by people who benefit from moving it, and it says nothing about whether the business is worth owning. Treat it as noise.

## The real risk

If a company offers shares at Rs 500 and lists at Rs 650, early allottees see a listing gain. That is the version that gets discussed. Issues also list below their offer price, and there is no mechanism protecting you when they do.

The deeper problem is that an IPO is the one moment when the seller controls the timing, the price band and the narrative, and knows the business far better than you do. Companies list when conditions favour sellers, not buyers. That does not make every IPO bad, but it does mean the odds are not naturally tilted your way.

## How to look at one seriously

Read the red herring prospectus rather than the coverage. It is long, but the sections that matter are short: what the money will be used for, the risk factors, the financial history, and whether promoters are selling.

Compare the asking valuation to already-listed peers you can actually check. A company priced at a large premium to established competitors needs a specific reason for that premium, and if you cannot articulate the reason, that is your answer.

Finally, size the position as though it might halve, because sometimes it does. If you want equity exposure without judging individual listings, a [mutual fund](/glossary/mutual-fund) or [index fund](/glossary/index-fund) gets you there without needing to be right about any single company. When you do sell, remember the profit is taxable. See [capital gains](/glossary/capital-gains).`,
    faq: [
      {
        q: "How do I apply for an IPO in India?",
        a: "Apply through ASBA from your bank's net banking or your broker's app. You need a demat account and a PAN. You select the number of lots and a price within the band, and the amount is blocked in your account rather than debited. UPI-based applications are also available for retail investors.",
      },
      {
        q: "Does applying for more shares improve my IPO allotment chances?",
        a: "No, not in the retail category. When an issue is oversubscribed, retail allotment happens by lottery on a per-application basis, so a larger application does not improve your odds of being selected. Applying through multiple demat accounts belonging to different family members is the legitimate way to increase chances.",
      },
      {
        q: "What is grey market premium and should I trust it?",
        a: "GMP is an unofficial, unregulated price quoted by an off-market trading circle before listing. It has no disclosure requirements, no enforceable settlement, and can be moved by people who benefit from moving it. It is frequently wrong and says nothing about business quality. Treat it as noise, not information.",
      },
      {
        q: "What happens to my money if I do not get an IPO allotment?",
        a: "Nothing is lost. Under ASBA the amount is only blocked in your bank account, not debited, so it continues to earn savings interest. If you receive no allotment, the block is released automatically on the specified date and the funds become usable again, typically within a few working days.",
      },
      {
        q: "Are IPO listing gains taxable in India?",
        a: "Yes. Selling on listing day means the holding period is well under a year, so the profit is a short-term capital gain on listed equity and taxed at the applicable short-term rate. Hold beyond a year and it becomes a long-term gain with different treatment. Verify current rates before filing.",
      },
      {
        q: "Can I apply for an IPO without a demat account?",
        a: "No. Allotted shares are credited in electronic form, so a demat account is mandatory before you apply. Opening one takes a day or two with any SEBI-registered broker and requires PAN, Aadhaar, a bank account and completed KYC. You also need a linked bank account for the ASBA block.",
      },
    ],
    related: ["dividend", "capital-gains", "mutual-fund", "diversification"],
  },
  {
    slug: "dividend",
    term: "Dividend",
    category: "Investing",
    short:
      "A dividend is a share of a company's profits paid out to its shareholders, usually in cash, as a reward for owning the stock.",
    bodyMarkdown: `A dividend is a share of a company's profits paid out in cash to its shareholders. When a company earns money, its board has a choice: reinvest the profit into the business, or distribute part of it. The distributed part is the dividend.

If a company declares a dividend of Rs 10 per share and you hold 100 shares, Rs 1,000 is credited to your bank account, usually within a few weeks of the record date.

## The four dates that matter

Dividends run on a fixed calendar, and knowing it prevents a common mistake.

- **Declaration date:** the board announces the dividend and its amount.
- **Ex-dividend date:** the cutoff. To receive the dividend you must own the share **before** this date. Buy on or after it and the dividend goes to the seller.
- **Record date:** the company checks its register to see who holds shares. In India this is typically one working day after the ex-date.
- **Payment date:** the money actually reaches your bank account.

Here is the part people miss: on the ex-dividend date, the share price typically **falls by roughly the dividend amount**. A Rs 500 share paying a Rs 10 dividend tends to open around Rs 490. You have not gained Rs 10. Rs 10 of company value moved from the share price into your bank account, and it became taxable on the way.

Buying a share purely to capture an upcoming dividend is therefore not free money. It is usually a way to convert untaxed unrealised value into taxed income.

## Dividend yield

Dividend yield is the annual dividend divided by the current share price.

A share priced at Rs 400 paying Rs 20 a year yields 5%. In India, public sector undertakings, utilities, large FMCG companies and established banks have historically been among the higher-yielding names, while fast-growing companies often pay nothing at all.

A very high yield is worth investigating rather than celebrating. Yield rises when the price falls, so an unusually high figure often means the market expects trouble, or reflects a one-off special dividend that will not repeat. Check whether the dividend is sustainable out of actual earnings before treating the yield as an income stream.

## How dividends are taxed in India

The rules changed significantly in 2020. Before then, companies paid a Dividend Distribution Tax and dividends were largely tax-free to the investor. That system is gone.

Under the current position:

- Dividends are added to your total income and taxed at **your slab rate**. A 30% bracket taxpayer keeps roughly Rs 700 of a Rs 1,000 dividend.
- Companies deduct [TDS](/glossary/tds) once dividends paid to you cross an annual threshold, which you claim back or adjust when filing.
- There is no separate concessional rate as there is for long-term [capital gains](/glossary/capital-gains).

This makes dividends tax-inefficient for higher earners compared with letting value compound inside the share price and paying capital gains tax on eventual sale. Rates and thresholds change with Budget announcements, so confirm the current numbers.

## Mutual funds and IDCW

Mutual funds once offered a "dividend option", renamed **IDCW**, meaning Income Distribution cum Capital Withdrawal. SEBI required the change because the old name was misleading, and the new one describes exactly what happens.

An IDCW payout is not a bonus. It comes out of the fund's own assets, so the [NAV](/glossary/nav) drops by the amount distributed, and the payout is taxed at your slab rate. You are being handed back part of your own investment and taxed on it.

For almost every investor, the **growth option** is the better default: value stays in the NAV, compounds, and is taxed only when you sell, at capital gains rates that are usually more favourable than slab rates. If you need regular income, an [SWP](/glossary/swp) is generally more tax-efficient than IDCW because only the gain portion of each withdrawal is taxed.

## What dividends tell you about a company

A long, unbroken dividend record signals stable cash generation and a management that is disciplined about returning capital. That is genuinely informative.

But a company paying no dividend is not necessarily worse. A firm reinvesting profits at a high rate of return is compounding your money inside the business, which is often more valuable than a cash payout you then have to reinvest yourself after tax.

What matters is **total return**: dividends plus price appreciation. A share that pays a 4% dividend while the price stagnates has done worse than one that pays nothing and rises 12%.`,
    faq: [
      {
        q: "Are dividends taxable in India?",
        a: "Yes. Since 2020, dividends are added to your total income and taxed at your applicable slab rate rather than being tax-free in your hands. Companies also deduct TDS once your annual dividend income crosses a specified threshold, which you adjust or claim back when filing your return.",
      },
      {
        q: "When do I need to buy a share to receive its dividend?",
        a: "You must own the share before the ex-dividend date. Buying on or after that date means the dividend goes to the previous holder. In India the record date is typically the next working day after the ex-date, and payment usually follows within a few weeks.",
      },
      {
        q: "Does the share price fall after a dividend?",
        a: "Typically yes, by roughly the dividend amount, on the ex-dividend date. A Rs 500 share paying Rs 10 tends to open near Rs 490. You have not gained anything: company value moved into your bank account and became taxable. This is why buying purely to capture a dividend rarely helps.",
      },
      {
        q: "What is a good dividend yield in India?",
        a: "Yields of 2% to 4% are common among established Indian large caps, with some PSUs and utilities running higher. Treat an unusually high yield as a question rather than an opportunity: yield rises when price falls, so it may reflect market concern or a one-off special dividend that will not repeat.",
      },
      {
        q: "What is IDCW in mutual funds?",
        a: "Income Distribution cum Capital Withdrawal, formerly called the dividend option. SEBI renamed it because the payout comes from the fund's own assets, not from extra earnings. The NAV falls by the amount paid, and the receipt is taxed at your slab rate, which makes the growth option more efficient for most investors.",
      },
      {
        q: "Should I choose growth or dividend option in a mutual fund?",
        a: "Growth suits almost everyone accumulating wealth: gains stay invested, compound, and are taxed only on sale at capital gains rates. Choose IDCW only if you genuinely need periodic cash, and even then a systematic withdrawal plan is usually more tax-efficient because only the gain portion of each withdrawal is taxed.",
      },
    ],
    related: ["ipo", "capital-gains", "mutual-fund", "net-worth"],
  },
  {
    slug: "expense-ratio",
    term: "Expense Ratio",
    category: "Investing",
    short:
      "The expense ratio is the annual fee a mutual fund or ETF charges to manage your money, shown as a percentage of your investment.",
    bodyMarkdown: `The expense ratio is the annual fee a [mutual fund](/glossary/mutual-fund) or [ETF](/glossary/etf) charges for running your money, expressed as a percentage of the assets it manages. It covers the fund manager's salary, research, custodian and registrar charges, audit, marketing, and, in a regular plan, the commission paid to whoever sold you the fund.

The critical thing to understand is that you never see it. It is not billed, not debited, and never appears on your statement.

## How it is actually charged

The fee is accrued **daily** and deducted from the fund's assets before the [NAV](/glossary/nav) is published. So the NAV you see every evening is already net of costs.

A fund with a 1.5% annual expense ratio deducts roughly 1.5 divided by 365 of its assets each day. If the underlying portfolio gained 10% in a year, the NAV rises by about 8.5%. Nothing tells you the other 1.5% existed.

This invisibility is why cost is the most consistently underweighted factor in Indian investing. People will switch banks over a Rs 500 annual card fee and hold a fund quietly charging them Rs 15,000 a year on a Rs 10 lakh corpus.

## What it costs over a lifetime

Take a Rs 10,000 monthly [SIP](/glossary/sip) for 25 years, assuming the underlying portfolio returns 12% before fees.

| Expense ratio | Final corpus (approx) | Cost of the fee |
| --- | --- | --- |
| 0.2% | Rs 1.85 crore | Baseline |
| 1.0% | Rs 1.66 crore | About Rs 19 lakh |
| 1.8% | Rs 1.48 crore | About Rs 37 lakh |
| 2.2% | Rs 1.40 crore | About Rs 45 lakh |

The percentages look like rounding errors. The rupee figures do not. The reason is that the fee is charged on the **whole balance every year**, so it grows exactly as your corpus grows, and the money removed also stops compounding.

An active fund charging 1.8% instead of an index fund charging 0.2% is not competing to beat the market. It is competing to beat the market by 1.6 percentage points a year, every year, which very few sustain.

## Typical ranges in India

SEBI caps expense ratios on a sliding scale, with the cap falling as a scheme's assets grow. In practice:

- **Index funds and large ETFs:** often 0.05% to 0.4%
- **Actively managed equity, direct plan:** roughly 0.5% to 1.2%
- **Actively managed equity, regular plan:** roughly 1.5% to 2.2%
- **Debt funds:** generally lower, often 0.2% to 1%
- **Liquid funds:** the lowest, frequently under 0.3%

## Direct versus regular is the single biggest lever

A direct plan and a regular plan of the same scheme hold an **identical portfolio** managed by the same person. The only difference is that the regular plan's expense ratio includes distributor commission.

That gap is commonly 0.5% to 1% a year. Switching to direct plans is the one portfolio improvement available to you that requires no forecasting, no skill and no risk. You simply stop paying a commission.

The trade-off is that you give up the distributor's advice and hand-holding. If that advice is genuinely stopping you from panic-selling in a crash, it may be worth more than the fee. If it consists of being sold whichever fund pays the highest commission, it is not.

## What the expense ratio does not include

- **Exit load**, charged if you redeem within a defined period, commonly around 1% within a year
- **Brokerage** you pay your broker when buying or selling an ETF
- **Securities transaction tax** and other statutory charges
- **Your own tax** on [capital gains](/glossary/capital-gains) when you sell

So the true cost of owning a fund is a little higher than the headline ratio.

## How to use this when choosing a fund

For two funds tracking the same index, the expense ratio and tracking error are essentially the only things that differ, so pick the cheaper one. See [index fund](/glossary/index-fund).

For active funds, cost is not the only consideration but it is the only one you can know in advance. Past returns may not repeat. The fee definitely will. A fund charging 2.2% needs to be reliably excellent to be worth it, and reliability is exactly what active management struggles to deliver.

Check the current ratio on the scheme's factsheet or the AMFI website rather than assuming, because it changes as fund size changes.`,
    faq: [
      {
        q: "What is a good expense ratio for a mutual fund in India?",
        a: "For an index fund or large ETF, under 0.4% is reasonable and many charge far less. For an actively managed equity fund in a direct plan, roughly 0.5% to 1.2% is typical. Anything above 2% needs a strong justification, since that fee is charged every year regardless of performance.",
      },
      {
        q: "Is the expense ratio deducted from my investment separately?",
        a: "No. It is accrued daily and taken out of the fund's assets before the NAV is published, so the NAV you see is already net of fees. You never receive a bill or see a debit, which is precisely why fund costs are so easy to ignore over long holding periods.",
      },
      {
        q: "How much difference does a 1% expense ratio really make?",
        a: "A great deal over decades. On a Rs 10,000 monthly SIP over 25 years at a gross 12%, moving from 0.2% to 1.2% costs roughly Rs 20 lakh of final corpus. The fee is charged on the whole balance every year, so it grows as your corpus grows and the money removed stops compounding.",
      },
      {
        q: "Why is the direct plan expense ratio lower than the regular plan?",
        a: "Because a regular plan builds distributor commission into its fee while a direct plan does not. Both plans hold the identical portfolio managed by the same person. The gap is commonly 0.5% to 1% a year, making a switch to direct plans one of the few risk-free improvements available.",
      },
      {
        q: "Does SEBI cap mutual fund expense ratios?",
        a: "Yes. SEBI sets maximum total expense ratios on a sliding scale that tightens as a scheme's assets under management grow, with separate caps for equity and debt schemes. Funds must disclose their current ratio, and it changes as the fund's size changes, so check the latest factsheet rather than an old figure.",
      },
      {
        q: "Does the expense ratio include exit load and taxes?",
        a: "No. Exit load, charged if you redeem within a specified period, is separate. So are brokerage on ETF trades, securities transaction tax, and your own capital gains tax on redemption. The true cost of owning a fund is therefore somewhat higher than the headline expense ratio suggests.",
      },
    ],
    related: ["index-fund", "etf", "mutual-fund", "nav"],
  },
  {
    slug: "lumpsum",
    term: "Lumpsum",
    category: "Investing",
    short:
      "A lumpsum investment is a one-time deposit of a large amount, as opposed to spreading it out through regular instalments like a SIP.",
    bodyMarkdown: `A lumpsum investment is a single, one-time deposit of a large amount, as opposed to spreading the same money across monthly instalments through a [SIP](/glossary/sip). The whole sum starts working, and compounding, from day one.

Most people do not choose between the two in the abstract. The question arises when money arrives in a lump: an annual bonus, a maturing [fixed deposit](/glossary/fixed-deposit), gratuity on leaving a job, the sale of a property, an inheritance.

## What Rs 5 lakh becomes

At an assumed 12% a year, compounded:

| Years | Value of Rs 5 lakh |
| --- | --- |
| 5 | About Rs 8.8 lakh |
| 10 | About Rs 15.5 lakh |
| 15 | About Rs 27.4 lakh |
| 20 | About Rs 48.2 lakh |

Twelve percent is an assumption for illustration, not a forecast. Equity returns are uneven and any of these paths would contain years of losses. Run your own assumptions in the [lumpsum calculator](/calculators/lumpsum).

## Lumpsum against SIP, honestly

The mathematical answer and the practical answer differ, and both are worth knowing.

**The maths favours lumpsum.** Markets rise over most long periods, so money invested earlier compounds longer. Studies across markets consistently find that investing a lump sum immediately beats staggering it a clear majority of the time.

**Behaviour often favours staggering.** The majority-of-the-time result is cold comfort if you deploy Rs 20 lakh a fortnight before a 25% correction. Staggering does not improve the expected return. It improves your odds of still being invested in two years, which for many people is the binding constraint.

| | Lumpsum | SIP |
| --- | --- | --- |
| Money working from day one | All of it | A twelfth each month |
| Timing risk | Concentrated on one date | Spread across dates |
| Best when | Markets rise from here | Markets fall then recover |
| Emotional difficulty | High | Low |
| Suits | Existing capital | Monthly income |

## The middle path: STP

Indian fund houses offer a **Systematic Transfer Plan**, which is the practical compromise most advisers suggest for a large sum.

You park the full amount in a liquid or ultra-short debt fund of the same fund house, where it earns a modest return with low volatility. You then instruct the AMC to transfer a fixed amount into your chosen equity fund every week or month, typically over six to twelve months.

The idle portion keeps earning something rather than sitting in a savings account, and the equity exposure builds gradually. Note that each transfer out of the debt fund is technically a redemption and can create a small taxable gain, so check the treatment before setting up a long STP.

## Where lumpsum is clearly right

- **Debt and guaranteed instruments.** There is no timing risk in a fixed deposit or a PPF contribution, so staggering achieves nothing. Deposit early and earn more.
- **Money that has been sitting in cash for months.** Waiting for a better entry point is itself a timing bet, and one you have already been losing to [inflation](/glossary/inflation).
- **A long horizon.** Over fifteen or twenty years, the entry date matters far less than the number of years invested.

## Where it is clearly wrong

- **Money you need within three years.** Lumpsum into equity with a short horizon is not investing, it is a bet on the next 24 months.
- **Your entire emergency reserve.** Keep that separate and accessible. See [emergency fund](/glossary/emergency-fund).
- **Immediately after a large windfall, without a plan.** Sitting on it in a liquid fund for a month while you decide costs very little and prevents expensive impulses.

## Common mistakes

**Waiting for a correction.** People hold cash for a year waiting for a dip, then miss a 20% rally and invest at a higher price anyway. Time in the market has historically beaten timing it.

**Putting it all in one fund or one sector.** A large sum is exactly where [diversification](/glossary/diversification) matters most.

**Forgetting the tax.** A lumpsum redeemed later is a single large [capital gain](/glossary/capital-gains) in one financial year, which may push you past the annual exemption in a way that staggered redemptions would not.

If the money arrives monthly from a salary, this whole debate does not apply. A SIP is simply how you invest income as it comes, and [rupee cost averaging](/glossary/rupee-cost-averaging) happens as a by-product.`,
    faq: [
      {
        q: "Is lumpsum better than SIP in India?",
        a: "Mathematically, investing a lump sum immediately wins more often, because markets rise over most long periods and earlier money compounds longer. Behaviourally, staggering hurts far less if the market falls soon after. If your money arrives monthly from salary, a SIP is simply the natural method and the comparison does not apply.",
      },
      {
        q: "What is the minimum amount for a lumpsum mutual fund investment?",
        a: "Most Indian schemes accept a one-time investment from Rs 1,000, and some from Rs 500 or Rs 5,000 depending on the fund. There is no regulatory minimum, so the figure is set by each asset management company. Check the scheme information document before assuming a particular amount.",
      },
      {
        q: "Should I invest a bonus as a lumpsum or spread it out?",
        a: "For debt instruments, invest immediately since there is no timing risk. For equity, either works. A Systematic Transfer Plan over six to twelve months is a common compromise: park the money in a liquid fund and move a fixed amount into equity each month, keeping the idle portion productive.",
      },
      {
        q: "What is an STP and how does it help with a lumpsum?",
        a: "A Systematic Transfer Plan parks your lump sum in a liquid or short-duration debt fund and moves a fixed amount into an equity fund at set intervals. The waiting money earns more than a savings account while equity exposure builds gradually. Each transfer is a redemption, so small capital gains can arise.",
      },
      {
        q: "How is a lumpsum mutual fund investment taxed?",
        a: "The same way as any mutual fund investment: equity units held over a year attract long-term capital gains tax above an annual exemption, and units sold within a year are taxed at the short-term rate. A single large redemption can exceed the annual exemption in one year, so staggering exits can help.",
      },
      {
        q: "Is it a good idea to wait for a market crash before investing a lumpsum?",
        a: "Rarely. Waiting is itself a timing bet, and the cash loses purchasing power to inflation while you wait. Investors commonly hold out for a dip, miss a rally, and end up buying higher anyway. If timing genuinely worries you, an STP over several months is a more disciplined answer than waiting.",
      },
    ],
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
    bodyMarkdown: `A Systematic Withdrawal Plan is the mirror image of a [SIP](/glossary/sip). Instead of putting a fixed amount in each month, you instruct the fund house to take a fixed amount out and credit it to your bank account, while the rest of your units stay invested and continue to grow or fall with the market.

It is the standard way Indian retirees convert a lump sum corpus into a monthly income without liquidating everything at once.

## How the mechanics work

You hold units. Each month, on your chosen date, the fund redeems just enough units to pay you the amount you specified, at that day's [NAV](/glossary/nav).

Say you hold Rs 50 lakh and want Rs 25,000 a month. If the NAV is Rs 100, the fund sells 250 units. If the NAV has risen to Rs 110 the next month, it sells about 227 units. If it has fallen to Rs 90, it sells about 278.

That last case is the important one. When markets fall, an SWP sells **more** units for the same rupees. This is [rupee cost averaging](/glossary/rupee-cost-averaging) running in reverse, and it works against you rather than for you.

## Will the corpus last?

The arithmetic is simply growth against withdrawal rate.

On a Rs 50 lakh corpus with an assumed 10% annual return:

| Monthly withdrawal | Annual withdrawal rate | Rough outcome |
| --- | --- | --- |
| Rs 25,000 | 6% | Corpus grows slowly over time |
| Rs 35,000 | 8.4% | Roughly stable, sensitive to bad years |
| Rs 50,000 | 12% | Depletes within about 15 years |
| Rs 70,000 | 16.8% | Depletes within about 8 years |

The widely-cited guideline is to keep withdrawals in the region of 4% to 6% of the corpus a year if you want it to last indefinitely, and to review it as [inflation](/glossary/inflation) raises your expenses.

## Sequence of returns risk

This is the genuine danger in an SWP, and it is not obvious.

Two retirees both average 10% a year over twenty years. One has good years first and bad years later; the other has the bad years first. The average is identical, the outcome is not. The one who hit a market crash in the first three years of withdrawals sold a large number of units at depressed prices, permanently removing them from the recovery, and may run out of money years earlier.

The practical defences are to keep two to three years of planned withdrawals in a liquid or short-duration debt fund so you are not forced to sell equity during a fall, to hold the equity portion for the later years of the plan, and to be willing to reduce withdrawals temporarily in a bad year.

## Why an SWP beats IDCW on tax

This is the main technical reason advisers prefer SWPs.

An IDCW or dividend payout is taxed in full at your **slab rate**. Receive Rs 25,000 and, in a 30% bracket, roughly Rs 7,500 goes to tax.

An SWP withdrawal is a redemption, so only the **gain portion** of each withdrawal is taxable, and it is taxed at [capital gains](/glossary/capital-gains) rates. If Rs 25,000 of units includes Rs 5,000 of gain, only that Rs 5,000 is assessed, and for equity units held over a year it falls under the long-term rate with an annual exemption threshold applied first.

The rest is your own capital coming back, which was never income. For a retiree drawing from a large corpus, the difference over a decade is substantial. Rates and exemptions change with Budget announcements, so confirm the current figures.

## Practical points before you start one

- **Check the exit load.** Withdrawals within the load period, often one year, attract a charge on top of tax. Many people start an SWP only after that window closes.
- **Growth option only.** Running an SWP on an IDCW plan combines the worst of both.
- **Debt funds for short horizons.** If the corpus must last only three or four years, an equity SWP exposes you to exactly the volatility you cannot afford.
- **You can change or stop it any time.** Unlike an annuity, an SWP is fully reversible and the corpus remains yours and inheritable, which is one of its main advantages over the annuity leg of [NPS](/glossary/nps).

Model your own withdrawal rate in the [SWP calculator](/calculators/swp).`,
    faq: [
      {
        q: "How is SWP taxed in India?",
        a: "Each withdrawal is a redemption, so only the capital gain portion is taxed, not the whole amount. For equity funds held over a year, that gain falls under long-term capital gains rules with an annual exemption applied first. This is considerably more efficient than an IDCW payout taxed fully at your slab rate.",
      },
      {
        q: "How much can I withdraw monthly through an SWP without exhausting my corpus?",
        a: "A commonly used guideline is 4% to 6% of the corpus a year. On Rs 50 lakh that is roughly Rs 17,000 to Rs 25,000 a month. Higher rates work only if returns cooperate, and a market fall in the early years can deplete the corpus much faster than the average return suggests.",
      },
      {
        q: "Is SWP better than a fixed deposit for regular income?",
        a: "An SWP usually delivers better post-tax income because only the gain portion is taxed, while FD interest is fully taxed at your slab rate. The trade-off is that an SWP corpus can fall in value, whereas an FD cannot. Many retirees use both: an FD for essentials, an SWP for the rest.",
      },
      {
        q: "Can I stop or change my SWP anytime?",
        a: "Yes. An SWP is an instruction to the fund house, not a contract. You can pause it, change the amount or frequency, or cancel it entirely, usually with a few working days notice. The corpus remains yours throughout and passes to your nominee, unlike money locked into an annuity.",
      },
      {
        q: "What is sequence of returns risk in an SWP?",
        a: "It is the risk of hitting a market fall in the early years of withdrawals. Selling units at depressed prices permanently removes them from the eventual recovery, so two retirees with the same average return can end up very differently. Keeping two to three years of withdrawals in debt funds is the usual defence.",
      },
      {
        q: "Should I run an SWP from an equity or a debt fund?",
        a: "It depends on the horizon. For a corpus that must last twenty years or more, an equity-heavy allocation with a debt buffer for near-term withdrawals is common. For a corpus needed within three to five years, a debt or conservative hybrid fund avoids the volatility that could force selling at a bad time.",
      },
    ],
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
    bodyMarkdown: `Rupee cost averaging is what happens automatically when you invest a **fixed rupee amount** at regular intervals rather than buying a fixed number of units. Because the amount is fixed and the price is not, your money buys more units when prices are low and fewer when they are high. Your average cost per unit ends up below the average of the prices you paid.

It is not a strategy you execute. It is a mathematical by-product of running a [SIP](/glossary/sip), and it is worth seeing the arithmetic rather than taking it on trust.

## The proof, with numbers

Invest Rs 6,000 a month for four months into a fund whose [NAV](/glossary/nav) moves as follows.

| Month | NAV | Units bought |
| --- | --- | --- |
| 1 | Rs 100 | 60 |
| 2 | Rs 75 | 80 |
| 3 | Rs 60 | 100 |
| 4 | Rs 120 | 50 |

Total invested: Rs 24,000. Total units: 290.

Your average cost per unit is 24,000 divided by 290, which is about **Rs 82.76**.

Now take the simple average of the four prices: (100 plus 75 plus 60 plus 120) divided by 4 equals **Rs 88.75**.

You paid roughly Rs 6 less per unit than the average price, without predicting anything, without a view on the market, and without a single decision after setting up the mandate. The mechanism is entirely arithmetic: the low-price months automatically received more of your money because each rupee bought more.

Technically this is the harmonic mean coming in below the arithmetic mean. Practically, it means volatility works slightly in your favour rather than against you.

## What it does not do

This is where honest explanations diverge from marketing.

**It does not guarantee a profit.** If a fund falls steadily for five years and stays down, rupee cost averaging simply means you accumulated units cheaply in a market that never recovered. You still lose money.

**It does not beat a lumpsum on average.** Over most historical periods, investing a lump sum immediately has outperformed staggering it, because markets rise more often than they fall and earlier money compounds longer. See [lumpsum](/glossary/lumpsum) for that comparison.

**It is not risk management.** It reduces the risk of a single unlucky entry date. It does nothing about the risk of the asset itself.

**It has no benefit in a fixed-return product.** A recurring deposit involves no varying price, so there is nothing to average. The averaging effect exists only where the purchase price fluctuates.

## What it actually gives you

Three real benefits, none of them magical:

- **It removes the entry-date decision.** You never have to be right about whether today is a good day to invest, which is a judgement almost nobody makes consistently well.
- **It keeps you buying during falls.** This is the one that matters most. The instalments during a bad quarter are the ones that buy the most units, and they are precisely the ones people cancel.
- **It matches how income arrives.** Salary comes monthly, so investing monthly is simply the natural rhythm, not a compromise.

## Where investors defeat it

The single most expensive mistake is stopping a SIP when markets fall. Pausing during a correction cancels exactly the instalments that rupee cost averaging depends on, and converts a temporary decline into a permanent loss of the recovery.

The second is treating it as a licence to ignore what you are buying. Averaging into a persistently poor fund still leaves you in a poor fund. The mechanism improves your entry price; it does not improve the asset.

The third is expecting it to work over short periods. Four months of averaging in a flat market achieves nothing measurable. Its value accumulates across full market cycles, which is another way of saying it needs years.

## The reverse also exists

An [SWP](/glossary/swp) applies the same arithmetic in reverse: withdrawing a fixed amount monthly sells more units when prices are low, which works against you. Retirees drawing an income should understand that the mechanism is symmetric, and it is not friendly on the way out.`,
    faq: [
      {
        q: "Does rupee cost averaging guarantee a profit?",
        a: "No. It lowers your average purchase price relative to the average of prices paid, but if the fund falls and never recovers you still lose money. It reduces the risk of investing everything on one unlucky date. It does nothing about the underlying risk of the asset you chose.",
      },
      {
        q: "Is rupee cost averaging better than a lumpsum investment?",
        a: "Over most historical periods, a lump sum invested immediately has outperformed, because markets rise more often than they fall and earlier money compounds longer. Averaging wins when the market falls soon after you would have invested. Its real advantage is behavioural: it is far easier to stick with.",
      },
      {
        q: "How does rupee cost averaging work in a SIP?",
        a: "Your instalment amount is fixed but the NAV is not, so a Rs 5,000 debit buys 100 units at a Rs 50 NAV and 125 units at Rs 40. Low-price months automatically absorb more of your money, pulling your average cost below the simple average of the prices you paid.",
      },
      {
        q: "Should I stop my SIP when the market is falling?",
        a: "No, and this is the most costly common mistake. Falling markets are when your fixed instalment buys the most units, which is the entire mechanism working. Stopping cancels exactly those purchases and turns a temporary decline into a permanent loss of the eventual recovery.",
      },
      {
        q: "Does rupee cost averaging apply to recurring deposits?",
        a: "No. An RD has a fixed contracted interest rate and no varying purchase price, so there is nothing to average. The effect exists only where you are buying units at a fluctuating price, which means market-linked products such as equity mutual funds, index funds and ETFs.",
      },
      {
        q: "How long does rupee cost averaging take to show a benefit?",
        a: "It needs full market cycles, so think in years rather than months. A few instalments in a flat market produce no measurable effect. The advantage accumulates when a SIP runs through at least one meaningful correction and the subsequent recovery, which typically means a horizon of five years or more.",
      },
    ],
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
    bodyMarkdown: `Diversification means spreading money across investments that do not all move together, so a loss in any one of them has only a limited effect on your total portfolio. The old saying about eggs and baskets captures it, but the useful version is more precise: what matters is not how many holdings you have, it is whether they behave differently from each other.

It is the closest thing personal finance has to a free lunch. You can reduce risk without a corresponding reduction in expected return, which is not true of almost any other adjustment you can make.

## The two layers

**Within an asset class.** Owning 50 stocks instead of one. If a single company collapses in a fraud or a sector downturn, it is one holding among many rather than your entire savings. A [mutual fund](/glossary/mutual-fund) or [index fund](/glossary/index-fund) delivers this automatically for a few thousand rupees, which is why it is the practical starting point for most investors.

**Across asset classes.** Holding equity, debt, gold, real estate and cash. This is the layer that matters more, because within-equity diversification does nothing when the whole market falls. In 2008 and again in early 2020, essentially every Indian stock fell together. Debt and gold did not.

## What correlation means in practice

Two assets are correlated when they tend to rise and fall at the same time. Diversification only works when correlation is low.

- **Equity and debt** typically have low or negative correlation. Bonds often hold up or rise when equity falls, particularly when interest rates are cut in response.
- **Equity and gold** have historically been weakly correlated in India, and gold has often risen during crises and currency weakness.
- **Two large-cap equity funds** are close to perfectly correlated. Owning both is duplication.
- **International equity** adds geographic and currency diversification, though global markets have become more correlated over time.

## A worked comparison

Suppose Indian equity falls 30% in a year while debt returns 7% and gold rises 15%.

| Portfolio | Composition | Approximate year return |
| --- | --- | --- |
| All equity | 100% equity | minus 30% |
| Diversified | 60% equity, 30% debt, 10% gold | minus 14.4% |

The diversified portfolio still lost money. Diversification is not insurance. But a 14% fall is one most investors can hold through, and a 30% fall is where people capitulate and sell at the bottom. The real benefit is that it keeps you invested.

The cost is symmetric: in a year when equity rises 30%, the diversified portfolio gains roughly 20%. You give up upside to buy the ability to stay in the game.

## A common starting framework

There is no single correct allocation. It depends on your horizon, your income stability and how much volatility you can actually tolerate rather than how much you think you can.

- **Long horizon, stable income:** equity-heavy, with debt as ballast and a small gold allocation.
- **Approaching a goal within three to five years:** shift progressively into debt so a crash cannot derail it.
- **Retired and drawing income:** enough in debt and liquid funds to cover several years of withdrawals, so equity is never sold at a low. See [SWP](/glossary/swp).

Whatever you choose, **rebalance** periodically, perhaps once a year. If equity has run up and now forms 80% of a portfolio you intended to be 60%, selling the excess and topping up debt restores your intended risk. It also forces you to sell high and buy low, which is difficult to do on instinct. Note that rebalancing triggers [capital gains](/glossary/capital-gains), so consider doing it with fresh contributions where possible.

## Over-diversification is real

Owning twelve mutual funds does not make you twelve times safer. Beyond a point, additional funds add overlap, not protection.

Three equity funds in India frequently hold the same twenty large companies at similar weights. What you have built is an expensive, hard-to-track index fund. Two or three well-chosen funds across market caps, plus a debt allocation, is usually sufficient. Adding more mainly adds paperwork and dilutes any advantage your better holdings provide.

## What diversification cannot do

- **It does not prevent losses.** In a systemic crash, correlations rise and nearly everything falls together, at least temporarily.
- **It does not rescue a bad plan.** Diversifying across five poor investments still produces a poor outcome.
- **It does not remove the need for an [emergency fund](/glossary/emergency-fund).** A diversified portfolio can still be down when you need cash.

Its purpose is narrower and more valuable than people assume: it makes the outcome less dependent on you being right about any single thing.`,
    faq: [
      {
        q: "How many mutual funds should I hold for proper diversification?",
        a: "Usually two to four equity funds across market caps, plus a debt allocation, is sufficient for most Indian investors. Beyond that, funds start holding the same large companies and you gain overlap rather than protection. A single broad index fund plus a debt fund is a perfectly reasonable complete portfolio.",
      },
      {
        q: "Does diversification reduce returns?",
        a: "It reduces the range of outcomes in both directions. In a year when equity surges, a diversified portfolio lags an all-equity one. In a crash it falls far less. Over long periods the smoother path often produces a better real result, because investors are far more likely to stay invested through it.",
      },
      {
        q: "What is a good asset allocation for an Indian investor?",
        a: "There is no universal answer, since it depends on your horizon, income stability and genuine tolerance for volatility. A common approach is equity-heavy for goals more than seven years away, shifting progressively into debt as the goal approaches, with a small gold allocation for crisis protection.",
      },
      {
        q: "Is investing in five different equity funds diversification?",
        a: "Often not. Indian large cap funds frequently hold the same twenty or thirty companies at similar weights, so five of them behave almost identically. Real diversification comes from holding assets that move differently: equity alongside debt, gold and cash, rather than several versions of the same exposure.",
      },
      {
        q: "How often should I rebalance my portfolio?",
        a: "Once a year is enough for most people, or whenever an allocation drifts more than about five to ten percentage points from your target. Where possible, rebalance using fresh contributions rather than selling, since selling triggers capital gains tax and, within a year of purchase, possible exit load.",
      },
      {
        q: "Does gold help diversify an Indian portfolio?",
        a: "Historically yes, to a degree. Gold has been weakly correlated with Indian equity and has often risen during crises and periods of rupee weakness. Most allocations keep it modest, around 5% to 10%, since gold produces no income and its long-run real return has trailed equity.",
      },
    ],
    related: ["mutual-fund", "index-fund", "etf", "net-worth"],
  },

  // -- Tax ----------------------------------------------------------------
  {
    slug: "capital-gains",
    term: "Capital Gains",
    category: "Tax",
    short:
      "A capital gain is the profit you make when you sell an asset, such as shares or property, for more than you paid for it, and it is taxable.",
    bodyMarkdown: `A capital gain is the profit you make when you sell a capital asset for more than you paid for it. Buy shares for Rs 1 lakh, sell them for Rs 1.5 lakh, and the Rs 50,000 difference is a capital gain that has to be reported and taxed.

The crucial point is that the gain is taxed **only when you sell**. A portfolio that has doubled on paper owes nothing. Nothing is due until you actually book the profit, which is why the timing of a sale is itself a tax decision.

## Short-term or long-term

Everything turns on the holding period, and the threshold differs by asset.

| Asset | Long-term if held for |
| --- | --- |
| Listed equity shares and equity mutual funds | More than 12 months |
| Immovable property and unlisted shares | More than 24 months |
| Gold, debt funds and most other assets | More than 24 months |

Sell before the threshold and the gain is short-term. Cross it and it is long-term, and long-term treatment is almost always more favourable. This is a deliberate policy choice that rewards patient holding.

## Rates on listed equity

For listed equity and equity mutual funds, the position following the 2024 changes has been:

- **Long-term gains:** taxed at 12.5%, and only on the amount above an annual exemption of Rs 1.25 lakh across all such gains in a financial year.
- **Short-term gains:** taxed at 20%.

So a Rs 3 lakh long-term equity gain in a year is taxed on Rs 1.75 lakh, producing a liability of roughly Rs 21,875.

These rates and the exemption threshold were revised in a recent Budget and can be revised again. Treat them as current-as-of figures and confirm the position for the relevant financial year before filing or before booking a large gain.

## Debt funds, gold and property

Rules outside listed equity have changed materially in recent years, and old advice circulating online is frequently out of date.

**Debt mutual funds** bought after a specified date lost their long-term concession and indexation benefit, and gains are now generally added to income and taxed at slab rates regardless of holding period. Units bought before that cutoff may follow different rules.

**Property** carries its own regime, and the indexation position for property was changed in the 2024 Budget with an option offered for older acquisitions. This is an area where the arithmetic genuinely turns on your purchase date, so it is worth checking rather than assuming.

Given how much has moved here, verify current rules with the Income Tax Department or a qualified adviser before a large property or debt fund sale.

## Setting off losses, which most people ignore

A capital loss is not wasted. It can be set off against gains, which directly reduces the tax you pay.

The rules follow a clear logic:

- **Short-term losses** can be set off against both short-term and long-term gains.
- **Long-term losses** can only be set off against long-term gains.
- Unused losses can be **carried forward for eight assessment years**, but only if you file your return by the due date. Miss the deadline and the carry-forward is lost.

This gives rise to **tax loss harvesting**: deliberately selling a loss-making holding before the financial year ends to book the loss against gains elsewhere, then reinvesting. Done carefully it is legitimate planning. Done carelessly it just generates transaction costs.

## Practical ways to reduce the bill

- **Use the annual exemption every year.** If you have unrealised long-term equity gains, booking around Rs 1.25 lakh of gain annually and reinvesting resets your cost base at no tax cost. Unused exemption does not carry forward.
- **Wait past the threshold where sensible.** Selling equity at 11 months instead of 13 can nearly double the tax on that gain.
- **Stagger large redemptions.** Splitting a big sale across two financial years uses two years of exemption.
- **Keep records.** Purchase dates, amounts and reinvestments determine your cost of acquisition, and reconstructing them years later is unpleasant.

Note that [ELSS](/glossary/elss) redemptions are always long-term because of the three year lock-in, and that [SIP](/glossary/sip) instalments each carry their own purchase date and holding period, so a partial redemption applies units on a first-in-first-out basis.

## Related exemptions

Sections 54, 54F and 54EC provide relief on property gains where the proceeds are reinvested in a residential house or in specified bonds within defined timeframes. These have detailed conditions and strict deadlines, and they are worth understanding before, not after, a property sale.

Gains from a [dividend](/glossary/dividend) are not capital gains at all. Dividends are taxed as income at your slab rate, which is a separate regime entirely.`,
    faq: [
      {
        q: "What is the capital gains tax rate on shares in India?",
        a: "Following the 2024 changes, long-term gains on listed equity held over 12 months have been taxed at 12.5% above an annual exemption of Rs 1.25 lakh, and short-term gains at 20%. These figures were revised recently and can change again, so confirm the rates for the relevant financial year.",
      },
      {
        q: "How can I save capital gains tax in India?",
        a: "Hold assets past the long-term threshold, use the annual exemption every year rather than letting it lapse, stagger large redemptions across financial years, and set off capital losses against gains. For property, Sections 54, 54F and 54EC offer relief when proceeds are reinvested within specified timeframes.",
      },
      {
        q: "Do I pay capital gains tax if I do not sell?",
        a: "No. Capital gains tax is triggered only on sale or transfer. A portfolio that has doubled on paper creates no tax liability until you actually redeem. This is why the timing of a sale is itself a tax decision and why long-term holders can defer tax for many years.",
      },
      {
        q: "Can I set off capital losses against gains?",
        a: "Yes. Short-term losses can offset both short-term and long-term gains, while long-term losses can only offset long-term gains. Unused losses carry forward for eight assessment years, but only if you file your return by the due date. Missing the deadline forfeits the carry-forward entirely.",
      },
      {
        q: "How are debt mutual funds taxed now?",
        a: "The treatment changed significantly. Debt fund units bought after a specified cutoff date lost the long-term concession and indexation benefit, with gains generally added to income and taxed at slab rates regardless of holding period. Units bought before the cutoff may follow older rules, so check your purchase dates.",
      },
      {
        q: "Is capital gains tax applicable on ELSS after the lock-in?",
        a: "Yes. The Section 80C deduction applies to the investment, not the gains. Because of the mandatory three year lock-in, every ELSS redemption is automatically a long-term equity gain, taxed above the annual exemption at the applicable long-term rate. Verify current rates before booking a large redemption.",
      },
    ],
    related: ["elss", "dividend", "tds", "mutual-fund"],
  },
  {
    slug: "tds",
    term: "TDS",
    category: "Tax",
    short:
      "TDS (Tax Deducted at Source) is income tax a payer deducts before paying you (on salary, interest or rent) and deposits with the government.",
    bodyMarkdown: `Tax Deducted at Source is income tax collected at the moment a payment is made, rather than waiting for you to pay it at the end of the year. The person paying you, called the deductor, withholds a percentage and deposits it with the government against your PAN. You receive the remainder.

The purpose is collection efficiency: the government gets revenue through the year instead of in one annual rush, and it builds a paper trail linking income to a PAN. TDS is **not an extra tax**. It is an advance instalment of the tax you already owe.

## Where you will meet it

| Payment | Who deducts | Rough threshold |
| --- | --- | --- |
| Salary | Employer | Once income exceeds the basic exemption |
| Bank interest on FD and RD | Bank | Above an annual limit per bank, higher for senior citizens |
| Rent paid by a tenant | Tenant, in specified cases | Above a monthly or annual limit |
| Professional or contract fees | The paying business | Above an annual limit |
| Dividend | Company or fund house | Above an annual limit |
| Sale of property | The buyer | Above a specified sale value |

Thresholds and rates are set in the Income Tax Act and have been revised in several recent Budgets, including changes to the interest and rent limits. Verify the current figures for your financial year rather than relying on a number you remember.

## How it flows back to you

Everything deducted against your PAN appears in two places:

- **Form 26AS**, the consolidated tax statement on the income tax portal
- **The Annual Information Statement (AIS)**, which shows a broader picture of reported transactions

When you file your return, you add up your total income, compute the tax due, then subtract the TDS already deducted. Three outcomes are possible:

- **TDS exceeds your liability:** you claim a refund
- **TDS is less than your liability:** you pay the balance as self-assessment tax
- **They match:** nothing further to do

A worked case. A bank deducts Rs 5,000 of TDS on your FD interest, but once you apply your deductions your actual tax on that interest is Rs 2,000. You claim the Rs 3,000 back as a refund when you file.

## The trap with fixed deposits

Two things catch people out repeatedly.

**TDS is not the full tax.** Banks deduct at a flat rate on interest. If you are in the 30% slab, that deduction covers only part of what you owe, and the balance is payable when you file. People who assume "the bank already deducted tax" often discover a shortfall.

**The threshold is per bank, not per deposit.** Splitting money into five FDs at the same bank does not avoid TDS, because the bank aggregates interest across your accounts. Spreading across different banks does affect it, though the income remains fully taxable either way. See [fixed deposit](/glossary/fixed-deposit) for how FD interest is taxed as it accrues.

## Form 15G and Form 15H

If your total income for the year is below the taxable limit, you can ask the payer not to deduct TDS at all.

- **Form 15G** is for individuals below 60
- **Form 15H** is for senior citizens aged 60 and above

Both are self-declarations submitted to each bank, usually at the start of the financial year, and they must be filed separately with every bank where you hold deposits. Critically, neither form makes the income tax-free. It only stops the withholding. Submitting one when your income is in fact taxable is a false declaration with consequences.

## When PAN is missing

If the deductor does not have your PAN, TDS is deducted at a significantly higher penal rate, and the amount will not be credited to you properly because there is no PAN to map it to. Keeping PAN updated with your bank, employer and any client who pays you is a small piece of administration that prevents an expensive problem.

## TDS on rent and property

Two cases individuals commonly stumble into.

A tenant paying rent above a specified monthly threshold to a resident landlord must deduct TDS and deposit it. Many salaried tenants claiming a large [HRA](/glossary/hra) exemption are unaware of this obligation.

A buyer purchasing immovable property above a specified value must deduct TDS from the payment to the seller and file the relevant challan. The obligation sits with the buyer, not the seller, and non-compliance attracts interest and penalty.

## TDS is not TCS or GST

**TCS**, Tax Collected at Source, works in the opposite direction: the seller collects an amount from the buyer in specified transactions, such as certain foreign remittances and overseas tour packages. It too is adjustable against your final tax.

**[GST](/glossary/gst)** is an indirect tax on goods and services and has nothing to do with your income tax. The two are frequently confused because both appear as deductions on an invoice.`,
    faq: [
      {
        q: "How do I claim a TDS refund in India?",
        a: "File your income tax return, declare the income and the TDS already deducted as shown in Form 26AS, and the excess is refunded to your pre-validated bank account. Refunds are processed after the return is verified, and you can track the status on the income tax e-filing portal.",
      },
      {
        q: "What is the TDS threshold on fixed deposit interest?",
        a: "Banks deduct TDS once your total interest across all deposits at that bank crosses an annual limit in a financial year, with a higher limit for senior citizens. These limits were revised in recent Budgets, so check the current figures. Note the threshold is per bank, not per deposit.",
      },
      {
        q: "Does TDS mean my tax is fully paid?",
        a: "Not necessarily. TDS is deducted at a flat prescribed rate, which may be less than the rate applicable to your slab. If you are in the 30% bracket and the bank deducted at a lower rate, the shortfall is payable as self-assessment tax when you file your return.",
      },
      {
        q: "Who can submit Form 15G or 15H?",
        a: "Form 15G is for individuals below 60 and Form 15H for senior citizens, in both cases only where total income for the year falls below the taxable limit. They must be submitted separately to each bank, usually at the start of the financial year. They stop withholding, not tax liability.",
      },
      {
        q: "What happens if my PAN is not linked with my bank account?",
        a: "TDS is deducted at a significantly higher penal rate, and the credit may not appear against you in Form 26AS because there is no PAN to map it to. That makes claiming it back difficult. Keeping PAN updated with banks, employers and clients avoids the problem entirely.",
      },
      {
        q: "Do I have to deduct TDS on the rent I pay?",
        a: "Yes, if your monthly rent to a resident landlord exceeds the specified threshold. The obligation sits with the tenant, who must deduct, deposit and file the relevant form. Many salaried tenants claiming a large HRA exemption are unaware of this, and non-compliance attracts interest and penalty.",
      },
    ],
    related: ["fixed-deposit", "capital-gains", "gst", "section-80c"],
  },
  {
    slug: "gst",
    term: "GST",
    category: "Tax",
    short:
      "GST (Goods and Services Tax) is a single indirect tax on most goods and services in India, collected along the supply chain but paid by the consumer.",
    bodyMarkdown: `The Goods and Services Tax is a single indirect tax on the supply of most goods and services in India. It came into effect on 1 July 2017 and replaced a tangle of older levies: VAT, service tax, central excise, octroi, entry tax and several others that each applied at different points and often stacked on top of one another.

It is an **indirect** tax, meaning it is collected by businesses but ultimately borne by the final consumer. Your income tax and [TDS](/glossary/tds) are direct taxes on you. GST is a tax on what you buy.

## The three components

Every GST transaction splits into components depending on where buyer and seller are located.

- **CGST** goes to the central government
- **SGST** goes to the state government
- **IGST** applies to inter-state supplies and imports, and is later apportioned between centre and state

For a sale within Maharashtra at 18%, the invoice shows 9% CGST and 9% SGST. For a sale from Maharashtra to Karnataka at 18%, it shows 18% IGST. The total you pay is the same either way, so this split matters to businesses filing returns rather than to you as a buyer.

## Rate slabs

GST has historically operated on a multi-rate structure, with the main slabs being 5%, 12%, 18% and 28%, plus a nil rate for essentials and a compensation cess on a few categories such as tobacco and large vehicles.

Broadly, essential food items and basic services sit at the lower end, most standard goods and services at 12% or 18%, and luxury and demerit goods at the top. Petrol, diesel, alcohol for human consumption and electricity remain outside GST and continue to be taxed separately by states, which is one reason fuel prices vary so much across state borders.

Rate slabs and the classification of individual items are decided by the GST Council and have been revised repeatedly since 2017, including a significant restructuring exercise. Check the current rate for a specific item rather than assuming a figure.

## Input tax credit, which is the whole design

This is the mechanism that makes GST different from the taxes it replaced, and it is worth understanding even as a consumer.

A registered business can claim credit for the GST it paid on its own purchases and set that off against the GST it collects on sales. So tax is effectively charged only on the **value added** at each stage rather than compounding at every link in the chain.

A simplified chain at 18%:

| Stage | Value added | GST charged | Credit claimed | Net paid |
| --- | --- | --- | --- | --- |
| Manufacturer | Rs 1,000 | Rs 180 | Nil | Rs 180 |
| Wholesaler | Rs 400 | Rs 252 | Rs 180 | Rs 72 |
| Retailer | Rs 600 | Rs 360 | Rs 252 | Rs 108 |

The government collects Rs 360 in total, which is exactly 18% of the Rs 2,000 final price. The consumer pays it. Nobody in the chain pays tax on tax, which is what used to happen under the older cascading system.

## When you actually see it

On a Rs 1,000 service taxed at 18%, your invoice reads Rs 1,180, of which Rs 180 is GST. Common consumer touchpoints include restaurant bills, telecom and broadband, insurance premiums, hotel stays, and the interest and fees on a credit card.

That last one surprises people: GST applies to credit card interest and charges, so the effective cost of carrying a balance is higher than the stated interest rate alone.

## Registration and compliance for small businesses

Registration is mandatory once turnover crosses a specified threshold, with separate limits for goods and services and lower limits for certain special category states. Registration is also compulsory regardless of turnover in some cases, such as inter-state supply of goods and most e-commerce selling.

Registered businesses file periodic returns, with the main ones being an outward supplies statement and a summary return, plus an annual return above a turnover threshold. A **composition scheme** is available for very small businesses, offering a flat low rate with simplified filing but no input tax credit.

Thresholds, return formats and due dates have changed frequently since 2017. A small business should confirm current requirements on the GST portal or with a practitioner rather than working from older guidance.

## Common misconceptions

**GST is not a tax on income.** A freelancer charging GST is collecting it on behalf of the government; it is not part of their earnings and it does not reduce their income tax.

**Charging GST without registration is illegal.** If an invoice shows GST, it should show a valid GSTIN, and you can verify it on the GST portal.

**GST is not always in addition to the price.** Consumer goods are typically sold at an MRP that is inclusive of GST. Use our [GST calculator](/calculators/gst) to work backwards from an inclusive price or forwards from an exclusive one.`,
    faq: [
      {
        q: "What are the current GST rates in India?",
        a: "GST has historically operated on main slabs of 5%, 12%, 18% and 28%, plus a nil rate for essentials and a cess on a few categories. The GST Council revises rates and item classifications regularly, so check the current rate for a specific product or service on the official GST portal.",
      },
      {
        q: "What is the GST registration threshold for a small business?",
        a: "Registration becomes mandatory once annual turnover crosses a specified threshold, with different limits for goods and services and lower limits in certain special category states. Registration is also compulsory regardless of turnover for inter-state supply of goods and most e-commerce sellers. Verify current limits on the GST portal.",
      },
      {
        q: "What is input tax credit in GST?",
        a: "It lets a registered business offset the GST it paid on purchases against the GST it collects on sales, so tax applies only to the value it adds. This prevents tax cascading through the supply chain. Credit requires a valid invoice and the supplier having actually reported the transaction.",
      },
      {
        q: "Is GST charged on credit card interest in India?",
        a: "Yes. GST applies to credit card interest, late fees, annual fees and most other charges, which makes the true cost of carrying a balance higher than the stated monthly interest rate suggests. The same applies to processing fees and charges on many other financial services.",
      },
      {
        q: "Is GST applicable on petrol and diesel?",
        a: "No. Petrol, diesel, aviation turbine fuel, natural gas, crude oil and alcohol for human consumption remain outside GST and are taxed by states through excise and VAT. This is why fuel prices differ noticeably across state borders and why bringing fuel under GST is a recurring policy debate.",
      },
      {
        q: "How do I calculate GST on an inclusive price?",
        a: "Divide the inclusive amount by one plus the rate as a decimal to get the base price, then subtract to find the GST. For Rs 1,180 at 18%, divide by 1.18 to get Rs 1,000, so the GST is Rs 180. A GST calculator handles both inclusive and exclusive directions.",
      },
    ],
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
    bodyMarkdown: `House Rent Allowance is a component of your salary paid specifically to help with accommodation costs. Under Section 10(13A) of the Income Tax Act, part of it can be exempt from tax, provided you actually pay rent for accommodation you do not own.

The exemption is one of the largest available to salaried people living in Indian metros, and it is also one of the most commonly miscalculated.

## The three-way test

The exempt amount is the **lowest** of these three figures, calculated for the period concerned:

1. The actual HRA received from your employer
2. Rent actually paid minus 10% of salary
3. 50% of salary if you live in Delhi, Mumbai, Kolkata or Chennai; 40% everywhere else

For this purpose, "salary" means basic salary plus dearness allowance (where it forms part of retirement benefits) plus any commission based on a fixed percentage of turnover. It does **not** include your other allowances or bonuses, which is where most miscalculations originate.

## A worked example

Take a Mumbai employee with a basic salary of Rs 40,000 a month, HRA of Rs 20,000 a month, paying rent of Rs 18,000 a month. Annualised: basic Rs 4,80,000, HRA Rs 2,40,000, rent Rs 2,16,000.

- **Actual HRA received:** Rs 2,40,000
- **Rent paid minus 10% of salary:** Rs 2,16,000 minus Rs 48,000 equals Rs 1,68,000
- **50% of salary (metro):** Rs 2,40,000

The lowest is **Rs 1,68,000**, and that is the exempt amount. The remaining Rs 72,000 of HRA is taxable. For a taxpayer in the 30% bracket, the exemption saves roughly Rs 50,000 of tax.

Notice what drives the result. The middle figure is almost always the binding one, and it rises with the rent you pay. Someone paying Rs 8,000 rent on the same salary would get an exemption of only Rs 48,000, no matter how much HRA their payslip shows.

If your rent is at or below 10% of your salary, the exemption is zero. Use the [HRA calculator](/calculators/hra) to work out your own figure.

## Old regime only

This is the point that has changed the calculation for millions of taxpayers.

The HRA exemption is available **only under the old tax regime**. The new regime offers lower slab rates but removes most exemptions and deductions, including HRA and [Section 80C](/glossary/section-80c).

If you pay substantial rent in a metro and also use 80C fully, the old regime often still works out better. If you own your home, pay little rent, or have few deductions, the new regime frequently wins. The new regime has been the default in recent years, so if you want the old one you generally have to opt for it. Run both calculations before choosing, and note that the rules on switching differ for salaried people and those with business income.

## Documentation your employer will want

- **Rent receipts**, typically monthly or quarterly, signed by the landlord
- **A rent agreement**, which most employers now ask for
- **The landlord's PAN**, required where annual rent exceeds Rs 1,00,000. If the landlord refuses to provide it, you can furnish a declaration, but employers frequently reject the claim without a PAN
- **Proof of payment.** Bank transfers are far safer than cash, since the tax department can and does question cash rent claims

If you miss the employer's submission deadline, you can still claim the exemption directly when filing your return, though you should keep the documents ready in case of scrutiny.

## Situations people ask about

**Paying rent to your parents.** This is legitimate if the arrangement is genuine: the property must be owned by them and not by you, rent must actually be transferred, and your parents must declare that rent as income in their return. Done properly it is legal planning. Done as a paper arrangement with no money moving, it is a false claim and is increasingly detected.

**Living with parents rent-free.** No rent paid means no exemption. There is nothing to claim.

**Owning a house and renting elsewhere.** You can claim HRA on the rent you pay while also claiming home loan interest on the property you own, provided the situations are genuine, for example your own house is in another city or is let out.

**Living in your own home.** No HRA exemption is available.

## If you pay rent but get no HRA

Section 80GG offers a deduction for people who pay rent but receive no HRA, typically the self-employed or those whose salary structure has no HRA component. The limit is considerably lower, and conditions apply, including that you, your spouse or minor child must not own residential property at the place of work. It is also an old regime deduction.`,
    faq: [
      {
        q: "How is HRA exemption calculated in India?",
        a: "It is the lowest of three amounts: the actual HRA received, rent paid minus 10% of salary, or 50% of salary in Delhi, Mumbai, Kolkata and Chennai (40% elsewhere). Salary here means basic plus dearness allowance, not your total package, which is the most common source of error.",
      },
      {
        q: "Can I claim HRA under the new tax regime?",
        a: "No. The HRA exemption is available only under the old regime. The new regime offers lower slab rates but removes HRA along with most other exemptions and deductions. If you pay high rent in a metro and use Section 80C fully, the old regime often still produces a lower total tax.",
      },
      {
        q: "Can I pay rent to my parents and claim HRA?",
        a: "Yes, if the arrangement is genuine. Your parents must own the property, you must not be a co-owner, the rent must actually be transferred, and they must declare it as rental income in their own return. A paper arrangement with no money moving is a false claim and is increasingly detected.",
      },
      {
        q: "Is the landlord's PAN mandatory for an HRA claim?",
        a: "It is required where your annual rent exceeds Rs 1,00,000. If the landlord will not provide it, you can submit a declaration with their name and address, but many employers reject claims without a PAN. In that case you can still claim directly in your return, keeping documentation ready.",
      },
      {
        q: "Can I claim both HRA and home loan interest?",
        a: "Yes, where both situations are genuine. For example, if you own a house in one city on which you pay a home loan and rent accommodation in another city for work, both claims are permissible. Claiming HRA while living in the same house you own is not.",
      },
      {
        q: "What if I forgot to submit rent receipts to my employer?",
        a: "You can still claim the exemption when filing your income tax return, adjusting the taxable salary figure accordingly. Your employer will have deducted more TDS, so the excess comes back as a refund. Keep rent receipts, the agreement and bank transfer proof in case the claim is questioned.",
      },
    ],
    related: ["section-80c", "tds", "gratuity", "gst"],
    relatedHref: "/calculators/hra",
    relatedLabel: "HRA Calculator",
  },
  {
    slug: "section-80c",
    term: "Section 80C",
    category: "Tax",
    short:
      "Section 80C lets you cut up to Rs 1.5 lakh from your taxable income by investing in options like PPF, ELSS and EPF, under the old tax regime.",
    bodyMarkdown: `Section 80C of the Income Tax Act lets you reduce your taxable income by up to **Rs 1.5 lakh** a year by investing in or spending on specified items. It is the most widely used deduction in India, and for many salaried people it is the only tax planning they ever do.

The mechanics are simple. If you earn Rs 12 lakh and claim the full Rs 1.5 lakh, you are taxed as though you earned Rs 10.5 lakh. What that saves depends on your slab.

| Your marginal slab | Approximate tax saved on Rs 1.5 lakh |
| --- | --- |
| 30% | About Rs 45,000 |
| 20% | About Rs 30,000 |
| 5% | About Rs 7,500 |

## The critical point: it is one shared limit

The Rs 1.5 lakh is a **single combined ceiling**, not a limit per instrument. Every eligible item competes for the same space, and this is where most people misunderstand the section.

Many salaried employees have already used a large part of it before making any deliberate investment at all, because their [EPF](/glossary/epf) contribution counts. Someone with a Rs 50,000 monthly basic contributes Rs 72,000 a year to EPF, which leaves only Rs 78,000 of 80C room to fill.

**Check what is already counted before you invest anything new.** Buying an insurance policy in March to save tax you had already saved is a very common and expensive error.

## What qualifies

**Investments:**

- [PPF](/glossary/ppf) contributions
- [EPF](/glossary/epf) and Voluntary Provident Fund
- [ELSS](/glossary/elss) tax-saving mutual funds
- 5 year tax-saving fixed deposits with a scheduled bank
- National Savings Certificate
- Sukanya Samriddhi Yojana for a girl child
- Senior Citizens Savings Scheme
- ULIP premiums

**Expenses:**

- Life insurance premiums, for self, spouse or children
- Principal repayment on a home loan (the interest is separate, under Section 24)
- Tuition fees for up to two children at a recognised institution in India
- Stamp duty and registration charges on a house purchase, in the year paid

## Comparing the main options

| | Lock-in | Return | Risk | Tax on gains |
| --- | --- | --- | --- | --- |
| ELSS | 3 years per instalment | Market linked | Real | LTCG above annual exemption |
| PPF | 15 years | Government declared | None | Fully exempt |
| Tax-saving FD | 5 years | Fixed at booking | None | Taxed at slab rate |
| NSC | 5 years | Government declared | None | Taxed, though reinvested interest also qualifies for 80C |
| Sukanya Samriddhi | Long, goal-linked | Government declared | None | Exempt |

The 5 year tax-saving FD is usually the weakest of these, because it combines a modest return with the worst tax treatment and a longer lock-in than ELSS.

## Sections that sit outside the Rs 1.5 lakh

This is where meaningful additional saving is available, and it is often overlooked.

- **80CCD(1B):** an extra Rs 50,000 for [NPS](/glossary/nps) contributions, entirely separate from the 80C ceiling
- **80D:** health insurance premiums for yourself, family and parents, with a higher limit where parents are senior citizens
- **80TTA and 80TTB:** savings account interest, with a more generous limit for senior citizens
- **80E:** interest on an education loan, with no upper cap, for a defined number of years
- **Section 24(b):** home loan interest on a self-occupied property, which is separate from the principal counted under 80C

## The regime question comes first

Section 80C is available **only under the old tax regime**. The new regime offers lower slab rates and a higher standard deduction but disallows 80C, [HRA](/glossary/hra), 80D and most other deductions.

Since the new regime became the default, the sensible sequence is to compute your tax both ways before deciding what to invest for tax reasons. A rough rule of thumb: if your total eligible deductions including 80C, HRA and 80D are substantial, the old regime may still win. If you have few deductions, the new regime is usually lower. Limits and slab rates have changed in successive Budgets, so run the current year's numbers rather than repeating last year's decision.

## Mistakes worth avoiding

**Investing in March.** The annual rush leads to buying whatever is available rather than what is suitable, and it removes any [rupee cost averaging](/glossary/rupee-cost-averaging) benefit from an ELSS.

**Buying insurance as an investment.** Endowment and money-back policies bought purely for 80C typically deliver poor returns and lock you in for decades. Buy [term insurance](/glossary/term-insurance) for protection and invest separately.

**Ignoring the lock-in.** Every 80C instrument locks money up. Do not use it for funds you may need.

**Forgetting to claim what you already spent.** Home loan principal, tuition fees and stamp duty often go unclaimed simply because people do not realise they qualify.

Our guide on [how to save income tax](/blog/how-to-save-income-tax) goes through the full sequence.`,
    faq: [
      {
        q: "What is the Section 80C limit for this year?",
        a: "The deduction has been capped at Rs 1.5 lakh a year for some time, covering all eligible investments and expenses combined. Limits are set in the annual Budget and have been the subject of repeated revision proposals, so confirm the current figure for your financial year before planning around it.",
      },
      {
        q: "Is Section 80C available under the new tax regime?",
        a: "No. Section 80C applies only under the old regime, which is why the choice of regime should come before any tax-saving investment decision. The new regime offers lower slab rates and a higher standard deduction instead, and it has been the default in recent years unless you actively opt out.",
      },
      {
        q: "Which is the best investment under Section 80C?",
        a: "It depends on your horizon and risk tolerance. ELSS has the shortest lock-in at three years and the highest return potential, with real risk. PPF is fully safe and tax-free at maturity but locks money for 15 years. Tax-saving FDs are usually the weakest, combining modest returns with slab-rate taxation.",
      },
      {
        q: "Does EPF count towards the Section 80C limit?",
        a: "Yes. Your own EPF contribution counts within the same Rs 1.5 lakh ceiling. Someone with a Rs 50,000 monthly basic already contributes about Rs 72,000 a year through EPF, leaving far less room than they assume. Always check your existing contributions before making new tax-saving investments.",
      },
      {
        q: "Can I claim more than Rs 1.5 lakh in deductions?",
        a: "Yes, through other sections. NPS contributions under 80CCD(1B) give an additional Rs 50,000, health insurance under 80D has its own limit, education loan interest under 80E has no cap, and home loan interest under Section 24(b) is separate from the principal counted under 80C.",
      },
      {
        q: "Does home loan principal repayment qualify under 80C?",
        a: "Yes. The principal portion of your EMI qualifies within the Rs 1.5 lakh limit, and stamp duty and registration charges qualify in the year they are paid. The interest portion is claimed separately under Section 24(b). Many borrowers already fill most of their 80C space through home loan principal alone.",
      },
    ],
    related: ["ppf", "elss", "epf", "hra", "nps"],
    relatedHref: "/blog/how-to-save-income-tax",
    relatedLabel: "How to Save Income Tax",
  },

  // -- Credit -------------------------------------------------------------
  {
    slug: "cibil-score",
    term: "CIBIL Score",
    category: "Credit",
    short:
      "A CIBIL score is a three-digit number from 300 to 900 that summarises your credit history; lenders use it to decide loan and card approvals.",
    bodyMarkdown: `CIBIL is India's oldest and best-known credit bureau, and its score is the number most lenders pull first. It runs from **300 to 900**, and above **750** is generally treated as comfortable for approval.

## What the bands actually mean

Below 600 you will struggle to get an unsecured loan or a decent card at all, and offers that do arrive carry high rates. Between 600 and 700 approval becomes possible but the pricing is poor. Between 700 and 750 most lenders will say yes at ordinary rates. Above 750 you reach the band where you can negotiate, and above 800 you are in the territory where banks compete for you.

A special case trips people up: a score of **-1** or **NA/NH** does not mean bad credit. It means there is no credit history to score, usually a young applicant who has never borrowed. Lenders treat it as an unknown rather than a negative, but it can still slow a first loan.

## What moves the number

Five inputs, and they are not equally weighted.

**Repayment history** is the single largest factor. One payment more than 30 days late is recorded and visibly drags the score for a long time. This is the lever that matters most, and it is entirely within your control.

**Credit utilisation** is how much of your available limit you are using. Keeping it under **30%** is the widely-used benchmark. Someone with a Rs 2 lakh limit who habitually carries a Rs 1.6 lakh balance looks stretched, even if every payment is on time.

**Length of history** rewards age. The oldest card on your file is doing quiet work, which is why closing it can lower your score rather than tidying things up.

**Credit mix** slightly favours a blend of secured borrowing, like a home or car loan, and unsecured borrowing like cards.

**Recent enquiries** count. Each formal application triggers a hard enquiry, and several within a short window reads as someone urgently seeking credit. Checking your own score does not do this; that is a soft enquiry and is free of consequence.

## How to check it without cost

Every credit bureau operating in India is required to give you one free full credit report each year. You can also see a score free through many banking and fintech apps, though those often show a bureau other than CIBIL, so the number may differ slightly from the one your lender sees.

There is no reason to pay for routine monitoring, and no legitimate service can remove accurate negative information from your file.

## Fixing errors, which are more common than people expect

Pull the full report, not just the score, and read the account list line by line. Loans you never took, accounts you closed years ago still showing open, an incorrect overdue amount, a duplicate entry: all of these appear regularly, and each one is costing you.

Disputes are raised free on the bureau's own website. The bureau must investigate with the lender, and the timeline is measured in weeks. Correcting a genuine error is the fastest available improvement, because it does not require you to change any behaviour.

## Rebuilding a low score

There is no shortcut, and anyone selling one is selling a fraud. What works is unglamorous.

Clear every current overdue first, because an active default outweighs everything else. Then pay every bill on time without exception, since recent behaviour carries more weight than old behaviour. Bring utilisation down, either by paying balances or by requesting a higher limit and not using it. Stop applying for new credit while you repair. And keep old accounts open, because their age is an asset.

If you have no history at all, a secured card against a fixed deposit is the standard way to start one.

Expect visible movement in three to six months and a genuine recovery over a year or two. Our guide on [how to improve your credit score](/blog/how-to-improve-credit-score) sets out the sequence in more detail, and the related [credit score](/glossary/credit-score) entry covers how the other bureaus differ.`,
    faq: [
      {
        q: "What is a good CIBIL score in India?",
        a: "Above 750 is generally treated as comfortable for approval at ordinary rates, and above 800 puts you in the band where lenders compete for you. Between 700 and 750 most lenders will approve. Below 600 you will struggle to get an unsecured loan or a decent credit card at all.",
      },
      {
        q: "How can I check my CIBIL score for free?",
        a: "Every credit bureau operating in India must provide one free full credit report each year on request through its own website. Many banking and fintech apps also show a score at no cost, though these often display a different bureau, so the figure may differ slightly from what your lender sees.",
      },
      {
        q: "Does checking my own CIBIL score reduce it?",
        a: "No. Checking your own score is a soft enquiry and has no effect whatsoever. Only a formal application to a lender triggers a hard enquiry, and several hard enquiries clustered in a short period can lower your score because they read as someone urgently seeking credit.",
      },
      {
        q: "How long does it take to improve a CIBIL score?",
        a: "Expect visible movement in three to six months of consistent on-time payments and lower utilisation, and a genuine recovery over one to two years. Correcting a genuine reporting error is faster, since it does not depend on changing behaviour. No legitimate service can remove accurate negative information.",
      },
      {
        q: "What does a CIBIL score of -1 or NA mean?",
        a: "It means there is no credit history to score, usually because you have never borrowed or held a credit card. It is not a bad score. Lenders treat it as an unknown rather than a negative, though it can slow a first loan. A secured card against a fixed deposit is the standard way to start.",
      },
      {
        q: "How do I dispute an error on my CIBIL report?",
        a: "Raise a dispute free on the bureau's own website, quoting the specific account and what is wrong. The bureau must investigate with the reporting lender, typically within a few weeks. Loans you never took, closed accounts showing open and incorrect overdue amounts are all common and worth checking line by line.",
      },
    ],
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
    bodyMarkdown: `A credit score condenses your entire borrowing track record into a single figure a lender can read in seconds. In India the CIBIL, Experian, Equifax and CRIF High Mark scores all run from **300 to 900**. Other countries use different scales (FICO in the United States runs 300 to 850), but the logic is identical everywhere: a number standing in for how reliably you repay.

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

Two people apply for a Rs 50 lakh home loan over 20 years. One has a score of 780 and is offered 8.5%; the other has 650 and is offered 9.5%. The monthly EMI differs by roughly Rs 3,300. Over the full term that is about **Rs 8 lakh** in additional interest, paid by the person with the weaker score for exactly the same house.

Many lenders now price risk explicitly this way, publishing different rates for different score bands. The number is not a formality. It is a price tag. You can see how a rate change moves your own instalment with the [EMI calculator](/calculators/emi).

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
    faq: [
      {
        q: "How many credit bureaus are there in India?",
        a: "Four are licensed by the RBI: CIBIL, Experian, Equifax and CRIF High Mark. Each holds its own data, and lenders do not all report to all of them at the same time, so your scores will differ. None is the official one. Before a large loan, pull more than one report.",
      },
      {
        q: "Why is my credit score different on different apps?",
        a: "Because they source from different bureaus, and each bureau holds slightly different data depending on which lenders report to it and how recently. A gap of a few dozen points is normal. It also means an error can sit on one file and not another, which is why checking multiple reports matters.",
      },
      {
        q: "Does closing an old credit card improve my score?",
        a: "Usually the opposite. Closing an old card removes its long history from your file and reduces your total available limit, which pushes utilisation higher on the cards that remain. Both effects tend to lower the score. Keeping an old no-fee card open and lightly used is generally better.",
      },
      {
        q: "How much does a low credit score cost on a home loan?",
        a: "A great deal. On a Rs 50 lakh, 20 year loan, the difference between an 8.5% rate offered to a strong applicant and 9.5% offered to a weaker one is roughly Rs 3,300 a month, which totals around Rs 8 lakh of extra interest over the full term for the same house.",
      },
      {
        q: "Does my income affect my credit score?",
        a: "No. Income is not an input into the score at all. A well-paid person who pays late will score below a modestly paid person who never does. Lenders assess income separately when deciding how much to lend, but it does not move the three-digit number itself.",
      },
      {
        q: "Do I need to carry a credit card balance to build credit history?",
        a: "No, and this is a costly myth. Using the card and paying the statement in full each month builds history perfectly well and costs nothing in interest. Carrying a balance simply hands the bank interest at roughly 40% annualised while doing nothing extra for your score.",
      },
    ],
    related: ["cibil-score", "emi", "term-insurance", "net-worth"],
    relatedHref: "/blog/how-to-improve-credit-score",
    relatedLabel: "How to Improve Your Credit Score",
  },

  // -- Banking ------------------------------------------------------------
  {
    slug: "emi",
    term: "EMI",
    category: "Banking",
    short:
      "An EMI (Equated Monthly Instalment) is the fixed monthly amount you repay on a loan, covering both the principal and the interest, until it is cleared.",
    bodyMarkdown: `An Equated Monthly Instalment is the fixed amount you pay a lender each month until a loan is cleared. Each instalment covers two things: interest on the outstanding balance, and a repayment of principal. The total stays constant, but the split between the two changes every single month.

Three inputs determine the size of an EMI: the loan amount, the interest rate, and the tenure. Nothing else.

## The amortisation shift

This is the part borrowers underestimate.

In the early months, almost all of your EMI is interest, because the outstanding balance is at its largest. As the principal slowly falls, the interest component shrinks and more of the same fixed payment goes toward reducing the loan.

Take a Rs 20 lakh home loan at 9% over 20 years. The EMI is about **Rs 17,995**.

| Month | Interest portion | Principal portion |
| --- | --- | --- |
| 1 | About Rs 15,000 | About Rs 2,995 |
| 60 | About Rs 13,300 | About Rs 4,695 |
| 120 | About Rs 10,600 | About Rs 7,395 |
| 240 | About Rs 134 | About Rs 17,861 |

After five years of paying Rs 17,995 every month, roughly Rs 10.8 lakh has left your account and the loan balance has fallen by only about Rs 2.3 lakh. This is not a trick; it is simply what interest on a large outstanding balance looks like. But it explains why selling a house early in a loan often leaves borrowers surprised at how little equity they have built.

## Tenure is the most expensive decision

Lengthening the tenure lowers the monthly figure and raises the total cost sharply.

On the same Rs 20 lakh at 9%:

| Tenure | EMI | Total interest paid |
| --- | --- | --- |
| 10 years | About Rs 25,335 | About Rs 10.4 lakh |
| 15 years | About Rs 20,285 | About Rs 16.5 lakh |
| 20 years | About Rs 17,995 | About Rs 23.2 lakh |
| 30 years | About Rs 16,092 | About Rs 37.9 lakh |

Going from 20 to 30 years saves Rs 1,903 a month and costs nearly Rs 15 lakh extra in interest. Lenders will often suggest a longer tenure because it makes the EMI look affordable. It is the most expensive kind of affordable.

Test your own combination in the [EMI calculator](/calculators/emi).

## Fixed and floating rates

**Floating rate** loans are linked to an external benchmark, usually the RBI repo rate under the external benchmark lending rate framework. When the repo rate moves, your rate moves. Most Indian home loans are floating.

Important detail: when rates rise on a floating home loan, most lenders keep your EMI unchanged and **extend the tenure** instead. Your monthly outgo looks stable while the loan quietly gets longer and more expensive. Check your amortisation schedule after any rate change rather than assuming nothing happened.

**Fixed rate** loans hold the rate for a defined period. They cost more upfront and remove uncertainty. They are more common in personal and car loans than home loans.

## Prepayment is where the real saving is

Because interest is charged on the outstanding balance, any prepayment removes interest for the entire remaining tenure. The earlier it happens, the more it saves.

On the Rs 20 lakh, 20 year, 9% loan, paying an extra Rs 5,000 a month from the start clears the loan in roughly 13 years instead of 20 and saves in the region of Rs 8 lakh of interest.

Under RBI rules, **floating rate loans taken by individuals for non-business purposes carry no prepayment or foreclosure penalty**. Fixed rate loans and business loans may. When you prepay, tell the lender explicitly to reduce the tenure rather than the EMI, since reducing the tenure saves far more.

## What else affects your EMI

Your [credit score](/glossary/credit-score) directly determines the rate you are offered, and many lenders now publish different rates for different score bands. A one percentage point difference on a Rs 50 lakh, 20 year loan is roughly Rs 8 lakh over the term, which makes the score a price tag rather than a formality.

Lenders also apply a **fixed obligation to income ratio**, usually wanting your total EMIs to stay within roughly 40% to 50% of net monthly income. Existing car loans and credit card dues therefore reduce how much home loan you can get.

## Common mistakes

- **Choosing the longest tenure the bank offers** because the EMI looks comfortable
- **Prepaying and asking for a lower EMI** instead of a shorter tenure
- **Ignoring processing fees, insurance bundled with the loan, and legal charges** when comparing offers
- **Taking a personal loan to close a credit card** without addressing the spending that created the balance
- **Not maintaining a buffer.** A missed EMI is reported to the bureaus and damages your score for years

Home loan interest also carries tax relief under Section 24(b) and the principal counts toward [Section 80C](/glossary/section-80c), but only under the old tax regime.`,
    faq: [
      {
        q: "How is EMI calculated in India?",
        a: "The standard formula is P multiplied by r multiplied by (1 plus r) to the power n, divided by (1 plus r) to the power n minus 1. P is the principal, r the monthly interest rate (annual rate divided by 12 divided by 100), and n the number of months. An EMI calculator does this instantly.",
      },
      {
        q: "Is it better to reduce EMI or tenure when prepaying?",
        a: "Reducing the tenure saves considerably more interest, because interest accrues on the outstanding balance for however long the loan runs. Lenders often default to reducing the EMI, so state your preference explicitly in writing when you make a prepayment and confirm the revised amortisation schedule afterwards.",
      },
      {
        q: "Is there a penalty for prepaying a home loan in India?",
        a: "Under RBI rules, floating rate loans taken by individuals for non-business purposes carry no prepayment or foreclosure charge. Fixed rate loans and loans taken for business purposes may attract a penalty. Check your loan agreement, since the distinction turns on the rate type and the stated purpose.",
      },
      {
        q: "Why does my home loan EMI stay the same when interest rates rise?",
        a: "Most Indian lenders keep the EMI unchanged and extend the tenure instead when a floating rate rises. Your monthly outgo looks stable while the loan silently gets longer and costlier. Ask for the revised amortisation schedule after any rate change, and consider increasing the EMI to hold the tenure.",
      },
      {
        q: "How much EMI can I afford on my salary?",
        a: "Lenders typically want total EMIs to stay within roughly 40% to 50% of net monthly income, including existing car loans and card dues. Many advisers suggest keeping housing EMI closer to 30% to leave room for savings, insurance and emergencies. Borrowing to the maximum offered is rarely comfortable in practice.",
      },
      {
        q: "What happens if I miss an EMI payment?",
        a: "You are charged a late fee and penal interest, and once the delay crosses about 30 days it is reported to the credit bureaus, where it visibly drags your score for years. Repeated defaults can lead to the loan being classified as non-performing and recovery action on any security pledged.",
      },
    ],
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
    bodyMarkdown: `With a fixed deposit you place a lump sum with a bank for a chosen period, anywhere from 7 days to 10 years, at a rate fixed on the day you invest. The bank pays that rate for the full term no matter what happens to interest rates afterwards, which is what makes an FD predictable in a way almost nothing else is.

## How the return is actually calculated

Most bank FDs compound quarterly, which is why the maturity value is a little higher than simple interest would suggest.

Put Rs 1,00,000 into a 5-year FD at 7% compounded quarterly and it matures at roughly **Rs 1,41,478**. Simple interest at the same rate would have given Rs 1,35,000. The extra Rs 6,478 is interest earning interest: modest over five years, and the reason longer terms pull ahead disproportionately. You can test any combination in the [FD calculator](/calculators/fd).

Note that the advertised rate is annual. A "7% FD" does not pay 7% per quarter.

## Cumulative or payout

An FD comes in two shapes, and the right one depends on whether you need income now.

A **cumulative** FD reinvests the interest, so nothing is paid out until maturity and the whole sum compounds. This is the version that produces the Rs 1,41,478 above, and it suits anyone who does not need the money in the meantime.

A **non-cumulative** FD pays interest out monthly or quarterly. The total return is slightly lower because nothing compounds, but it produces regular income, which is why retirees frequently choose it.

## How safe it really is

Deposits are insured by the DICGC up to **Rs 5 lakh per depositor per bank**, and that limit is worth reading carefully. It covers principal and interest combined, it applies per bank rather than per deposit, and it aggregates across all your accounts at that bank including savings.

Someone holding Rs 12 lakh at a single bank is insured for Rs 5 lakh, not Rs 12 lakh. Spreading large sums across banks is the straightforward fix, and it matters most with small finance banks and co-operative banks, which is precisely where the highest advertised rates tend to appear. A higher rate is compensation for higher risk, not a free gift.

## Tax, and the TDS threshold people miss

FD interest is fully taxable at your slab rate, and it is taxable **as it accrues** each year, not only when the deposit matures. People with 5-year cumulative FDs are regularly caught out by this, having declared nothing for four years.

Banks deduct [TDS](/glossary/tds) once interest crosses the annual threshold, and that deduction shows in your Form 26AS and AIS. If your total income is below the taxable limit you can file Form 15G, or Form 15H if you are a senior citizen, to stop the deduction, but neither form makes the income tax-free, only the withholding.

Senior citizens also receive a higher interest rate at most banks, usually around half a percentage point.

## Breaking it early

You can withdraw before maturity, and it costs you twice. The bank applies a penalty, typically around 0.5% to 1%, and, more significantly, recalculates your interest at the rate applicable to the period you actually stayed invested, not the rate you originally booked.

Break a 5-year FD after 18 months and you earn the 18-month rate minus the penalty, which can be far below what you expected. Splitting a large amount into several smaller FDs is a simple hedge: you break only the one you need.

## Where an FD fits

An FD is the right home for money you cannot afford to see fall: an emergency fund, a house deposit you need next year, cash you will spend within a defined period. It is a poor vehicle for long-horizon wealth building, because the post-tax return often barely clears [inflation](/glossary/inflation).

For goals a decade away, a [SIP](/glossary/sip) into equity has historically done far better while being far more volatile along the way. The comparison in our [PPF vs FD vs NPS guide](/blog/ppf-vs-fd-vs-nps) sets out where each one belongs. See also [recurring deposit](/glossary/recurring-deposit) if you want FD-like safety but are saving monthly rather than investing a lump sum.`,
    faq: [
      {
        q: "Is FD interest taxable in India?",
        a: "Yes, fully, at your income tax slab rate. It is also taxable as it accrues each year, not only at maturity, which catches out holders of five year cumulative deposits. Banks deduct TDS once interest crosses an annual threshold, but that deduction may be less than your actual liability.",
      },
      {
        q: "How much FD amount is insured in India?",
        a: "The DICGC insures up to Rs 5 lakh per depositor per bank, covering principal and interest combined and aggregating across all your accounts at that bank, including savings. Someone holding Rs 12 lakh at one bank is insured for Rs 5 lakh. Spreading large sums across banks is the straightforward fix.",
      },
      {
        q: "What is the penalty for breaking an FD early?",
        a: "It costs you twice. The bank charges a penalty, typically around 0.5% to 1%, and recalculates your interest at the rate applicable to the period you actually stayed invested rather than the rate you booked. Breaking a five year FD after 18 months can therefore earn far less than expected.",
      },
      {
        q: "Do senior citizens get a higher FD rate?",
        a: "Yes. Most Indian banks offer senior citizens aged 60 and above an additional rate, commonly around 0.5 percentage points, on most tenures. Senior citizens also have a higher TDS threshold on interest and can use Form 15H to stop withholding where their total income is below the taxable limit.",
      },
      {
        q: "Is a 5 year tax-saving FD worth it?",
        a: "It qualifies for a Section 80C deduction under the old regime, but the interest is fully taxed at your slab rate and the money is locked for five years with no premature withdrawal. Compared with ELSS, which has a three year lock-in, or PPF, which is tax-free, it is usually the weakest 80C option.",
      },
      {
        q: "Which is better, a cumulative or non-cumulative FD?",
        a: "A cumulative FD reinvests interest so the whole sum compounds until maturity, producing a higher total return. A non-cumulative FD pays interest out monthly or quarterly, giving regular income at a slightly lower total. Choose cumulative if you do not need the money meanwhile, non-cumulative if you need the income.",
      },
    ],
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
    bodyMarkdown: `An RD is a fixed deposit you build in instalments. You commit to depositing a set amount every month, say Rs 5,000, for a term usually between six months and ten years, and the bank pays a fixed rate on the growing balance. The rate is locked when you open the RD and does not change if rates move afterwards.

## Who it is actually for

An RD suits someone who wants [fixed deposit](/glossary/fixed-deposit) safety and predictability but does not have a lump sum to place. That is most salaried people early in their careers, and anyone saving toward a defined near-term goal from monthly income.

The commitment is the feature. Money leaves the account on a fixed date before it can be spent, which is the same behavioural trick that makes a [SIP](/glossary/sip) work, with a guaranteed return instead of a market-linked one.

## Why the return is lower than an FD at the same rate

This is the single most misunderstood thing about RDs, and it is not a trick or a hidden charge.

In a fixed deposit the entire amount earns interest for the whole term. In a recurring deposit each instalment only earns interest for the months remaining after it is paid. Your first Rs 5,000 earns for the full term; your last Rs 5,000 earns for about a month.

Deposit Rs 5,000 a month for 12 months at 7% and you will have paid in Rs 60,000 and receive roughly **Rs 62,275** at maturity, about Rs 2,275 of interest. A single Rs 60,000 FD at the same 7% for the same year would have earned closer to Rs 4,300, because all of it was working from day one.

Neither is a better rate. They are the same rate applied to different amounts of time, which is exactly what you would expect. The RD's real comparison is not against an FD you could not have funded. It is against leaving the money in a savings account, where it would have earned considerably less.

## RD or SIP?

They solve the same behavioural problem and produce very different outcomes, so the choice comes down to your time horizon.

An RD gives a **guaranteed** return, taxed at your slab rate, with no possibility of loss. Over one to three years, for money you know you will spend (a deposit, a wedding, a planned purchase), that certainty is worth more than a higher expected return.

An equity SIP has no guarantee and can be worth less than you put in at any given moment. Over ten years or more it has historically delivered considerably more, and its long-term gains are taxed more favourably than interest income. For money you will not touch for a decade, that trade has usually been worth making.

The mistake is using an RD for a twenty-year goal, where inflation quietly erodes it, or a SIP for money you need in fourteen months, where a bad quarter can force you to sell at the worst time.

## Missing an instalment

Miss a month and the bank levies a small penalty, and repeated defaults can lead to the account being closed prematurely with interest recalculated on less favourable terms. Set the standing instruction for a date shortly after your salary lands rather than late in the month.

## Tax

RD interest is fully taxable at your slab rate, and taxable as it accrues rather than only at maturity. Banks deduct [TDS](/glossary/tds) once interest crosses the annual threshold across your deposits at that bank, and it appears in your Form 26AS and AIS. Form 15G, or 15H for senior citizens, stops the withholding if your income is below the taxable limit; it does not make the interest tax-free.

Senior citizens generally receive a higher rate, and the same **Rs 5 lakh per depositor per bank** DICGC insurance that covers fixed deposits covers recurring deposits too, counted together across all your accounts at that bank.

## Before you open one

Compare rates across banks, since the spread is wider than people assume, and check the premature-closure terms rather than assuming they are standard. Use the [RD calculator](/calculators/rd) to see the actual maturity value for your amount and term before committing. The number is usually lower than a first guess, for the timing reason above, and it is better to know that at the start.`,
    faq: [
      {
        q: "Why is my RD maturity amount lower than I expected?",
        a: "Because each instalment earns interest only for the months remaining after it is paid. Your first deposit earns for the full term, your last for about a month. The rate is not lower than advertised; it is simply applied to money that was invested for different lengths of time.",
      },
      {
        q: "Is recurring deposit interest taxable in India?",
        a: "Yes, fully, at your income tax slab rate, and taxable as it accrues rather than only at maturity. Banks deduct TDS once interest across your deposits at that bank crosses the annual threshold. Form 15G, or 15H for senior citizens, stops the withholding but not the tax liability.",
      },
      {
        q: "What happens if I miss an RD instalment?",
        a: "The bank levies a small penalty for the missed month and the deposit continues. Repeated defaults, often three or more consecutive misses, can lead to premature closure with interest recalculated on less favourable terms. Setting the standing instruction for shortly after your salary date avoids the problem.",
      },
      {
        q: "Is an RD better than a SIP?",
        a: "For money you will spend within one to three years, an RD's guaranteed return and zero chance of loss usually matters more than a higher expected return. For money you will not touch for a decade, an equity SIP has historically delivered considerably more and is taxed more favourably.",
      },
      {
        q: "Can I withdraw an RD before maturity?",
        a: "Yes, but it costs you. The bank applies a premature closure penalty and recalculates interest at the rate applicable to the period you actually stayed invested rather than the contracted rate. Some banks also refuse withdrawals within an initial minimum period, so check the terms before opening one.",
      },
      {
        q: "Is a recurring deposit covered by deposit insurance?",
        a: "Yes. The DICGC cover of Rs 5 lakh per depositor per bank applies to recurring deposits alongside fixed deposits, savings and current accounts, all counted together across your accounts at that bank. This matters most with small finance and co-operative banks, which often advertise the highest rates.",
      },
    ],
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
    bodyMarkdown: `Gratuity is a lump sum an employer pays you for long service. It is not a bonus at the employer's discretion. Under the Payment of Gratuity Act, 1972, it is a **statutory right** for employees of covered establishments, and the employer must pay it whether or not you asked.

The Act applies to factories, mines, plantations, shops and establishments employing 10 or more people. Once the Act applies to an establishment, it continues to apply even if the headcount later falls below 10.

## When you become eligible

You qualify after **five years of continuous service** with the same employer, and it becomes payable when you resign, retire, are terminated, or in the case of death or disablement.

Two important exceptions to the five year rule:

- **Death or disablement.** The five year requirement does not apply. Gratuity is paid to the nominee or the employee regardless of tenure.
- **The 4 years 240 days question.** Courts have held in several cases that a fifth year is treated as complete where the employee has worked 240 days in that year. This is not universally applied by every employer, and it depends on the establishment's working pattern, so it is worth checking rather than assuming either way.

Gratuity is payable on resignation, not only retirement. Many employees leaving a job after six or seven years simply never claim it.

## The formula

For employees covered by the Act:

**Last drawn monthly salary multiplied by 15 divided by 26, multiplied by completed years of service.**

- "Salary" means **basic pay plus dearness allowance** only. Not HRA, not allowances, not bonus, not your CTC.
- 26 represents working days in a month, and 15 represents half a month's wages for each year served.
- Service beyond six months in the final year is rounded up to a full year; six months or less is rounded down.

A worked example. Basic plus DA of Rs 50,000, with 10 years of service:

50,000 multiplied by 15 divided by 26 equals Rs 28,846 per year of service. Multiply by 10 years and the gratuity is roughly **Rs 2.88 lakh**.

Now the same person after 15 years and 7 months. The service rounds to 16 years, giving about Rs 4.62 lakh.

For employees **not** covered by the Act, the formula uses 15 divided by 30 instead of 15 divided by 26, and rounding is not applied in the same way, producing a somewhat lower figure. Check which basis your employer uses.

Work out your own number with the [gratuity calculator](/calculators/gratuity).

## Tax treatment

Gratuity is tax-free up to a ceiling. For non-government employees covered by the Act, the exempt amount is the least of:

- The actual gratuity received
- The amount calculated by the statutory formula
- The notified ceiling, which has been Rs 20 lakh

Anything above that is taxable as salary income. Government employees receive gratuity fully exempt.

The ceiling has been revised upward more than once (from Rs 10 lakh to Rs 20 lakh, with further revisions discussed), so confirm the current notified limit before assuming a figure. Note also that the exemption is a **lifetime limit** across all employers, not a fresh Rs 20 lakh at each job.

## Timing and what to do if it is not paid

The employer must pay gratuity **within 30 days** of it becoming due. Beyond that, simple interest is payable on the delayed amount.

The process is straightforward. Submit **Form I** to the employer, normally within 30 days of leaving, though a late application does not by itself extinguish the claim. If the employer refuses or delays, the escalation is a written notice, then an application to the Controlling Authority under the Act, which is usually the local labour commissioner. This is a genuine legal remedy that employees use successfully, and it does not require a lawyer to start.

## Points that catch people out

- **Job changes reset the clock.** Gratuity is per employer. Four years at each of three companies earns nothing. This is one of the quiet costs of frequent switching.
- **Contract and consultant roles usually do not count.** Gratuity applies to employees, not to those engaged on a contract for service.
- **Transfers within a group** may or may not preserve continuous service depending on how the transfer is documented. Get it in writing.
- **CTC statements often show a gratuity line.** That is an accrual, not money you own until you complete five years.
- **Forfeiture is possible** where an employee is terminated for wilful misconduct causing damage or for an offence involving moral turpitude, and only to the extent of the damage.

Gratuity sits alongside [EPF](/glossary/epf) and [NPS](/glossary/nps) as part of the retirement corpus you accumulate simply by staying employed, and it is worth adding to your [net worth](/glossary/net-worth) calculation once you have crossed five years.`,
    faq: [
      {
        q: "How is gratuity calculated in India?",
        a: "For employees covered by the Payment of Gratuity Act, it is last drawn basic plus dearness allowance, multiplied by 15, divided by 26, multiplied by completed years of service. A Rs 50,000 basic with 10 years of service gives roughly Rs 2.88 lakh. Only basic and DA count, not your full CTC.",
      },
      {
        q: "Do I get gratuity if I resign before 5 years?",
        a: "Generally no. Five years of continuous service is the requirement, except in cases of death or disablement, where it is waived entirely. Courts have held in several cases that 4 years and 240 days in the fifth year counts as complete, though not every employer applies this, so it is worth checking.",
      },
      {
        q: "Is gratuity tax free in India?",
        a: "It is exempt up to a notified ceiling, which has been Rs 20 lakh for non-government employees, calculated as the least of actual gratuity, the statutory formula amount, and the ceiling. The exemption is a lifetime limit across all employers, not per job. Confirm the current ceiling before assuming a figure.",
      },
      {
        q: "How long does an employer have to pay gratuity?",
        a: "Within 30 days of it becoming due. Beyond that, simple interest is payable on the delayed amount. If the employer refuses or delays, you can apply to the Controlling Authority under the Act, usually the local labour commissioner, which is a genuine remedy employees use successfully without needing a lawyer.",
      },
      {
        q: "Is gratuity paid on resignation or only on retirement?",
        a: "On resignation as well, provided you have completed five years of continuous service. Many employees leaving after six or seven years simply never claim it. Submit Form I to your employer when you leave, and follow up in writing if the payment does not arrive within 30 days.",
      },
      {
        q: "Does gratuity carry over when I change jobs?",
        a: "No. Gratuity accrues per employer, so the five year clock restarts at each new company. Four years at each of three employers earns nothing at all. This is a real and often overlooked cost of frequent job changes, particularly when you leave shortly before completing five years.",
      },
    ],
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
    bodyMarkdown: `Term insurance is pure life cover and nothing else. You pay a premium for a defined term, and if you die during that term your nominee receives the sum assured. If you survive the term, you get nothing back. That absence of a maturity payout is not a defect. It is the reason the cover is so cheap.

Its only job is to replace your income for the people who depend on it. Judged on that job, nothing else in the Indian market comes close on value.

## Why it costs so little

An endowment or money-back policy bundles a small amount of cover with a savings component. Most of your premium goes into the savings part, which typically returns somewhere in the region of 4% to 6% and locks you in for decades. The cover that results is usually a fraction of what your family would actually need.

Term insurance strips the savings out. A healthy 30 year old non-smoker can often secure **Rs 1 crore of cover for roughly Rs 10,000 to Rs 15,000 a year**, depending on insurer, term and health. Getting Rs 1 crore of cover through an endowment policy would cost many times that.

| | Term plan | Endowment or ULIP |
| --- | --- | --- |
| Typical cover for Rs 15,000 a year | Around Rs 1 crore | Often under Rs 5 lakh |
| Maturity payout | None | Yes |
| Return on the savings part | Not applicable | Historically modest |
| Flexibility | High | Low, heavy surrender penalties |

The principle almost every independent adviser repeats: **keep insurance and investment separate**. Buy cheap term cover for protection, and invest the difference in a [mutual fund](/glossary/mutual-fund), [PPF](/glossary/ppf) or [index fund](/glossary/index-fund) where you can see and control what it earns.

## How much cover you need

The common rule of thumb is **10 to 15 times your annual income**. It is a starting point, not an answer.

A more careful method adds up:

- The income your dependants would need, multiplied by the years they would need it
- All outstanding liabilities, especially a home loan, so the family is not forced to sell the house
- Specific future costs such as children's education and marriage
- Then subtracts existing assets and any employer-provided cover

Someone earning Rs 12 lakh a year with a Rs 40 lakh home loan and two young children may need considerably more than Rs 1.2 crore.

Do not rely on employer group cover as your main protection. It usually ends the day you leave the job, and it is typically a small multiple of salary.

## Buy it early

Premiums are locked at the age and health at which you buy, and they stay level for the whole term. The same Rs 1 crore cover bought at 25 costs materially less each year than at 35, and that difference is paid every year for decades.

Health also matters. Once a condition such as diabetes or hypertension is on record, premiums rise or exclusions appear. Buying while healthy is one of the few decisions in personal finance where waiting has no upside at all.

## Disclosure is the thing that actually matters

The most common reason an Indian term insurance claim is rejected is **non-disclosure**. Smoking, alcohol consumption, existing medical conditions, family medical history, income, and any other policies you hold must all be declared truthfully.

Understating smoking to get a cheaper premium is a false statement that can void the entire claim at exactly the moment your family needs it. The premium difference is small. The consequence of hiding it is total.

Insurers must generally settle honestly disclosed claims, and Section 45 of the Insurance Act limits an insurer's ability to challenge a policy after three years. That protection depends on having disclosed properly in the first place.

## Riders and variants worth understanding

- **Critical illness rider:** pays a lump sum on diagnosis of specified conditions. Often useful, but compare against a standalone health or critical illness policy.
- **Accidental death benefit:** increases the payout if death is accidental. Cheap, and of limited value if your base cover is already adequate.
- **Waiver of premium:** future premiums are waived on disability. Usually worth having.
- **Return of premium plans:** give your premiums back if you survive. They cost substantially more, and the implied return on that extra premium is poor. Buying a plain term plan and investing the difference is almost always better.

## Practical points

- **Name a nominee and keep it updated.** Under the MWP Act, a policy taken for the benefit of wife and children is protected from creditors, which is worth knowing if you have business liabilities.
- **Tell your family the policy exists.** A large number of Indian policies go unclaimed simply because nobody knew.
- **Check the claim settlement ratio and the amount settlement ratio** of the insurer, published annually by IRDAI.
- **Premiums qualify under [Section 80C](/glossary/section-80c)** under the old regime, though tax saving is a reason to buy the right cover, never a reason to buy the wrong product.

Term insurance protects income. An [emergency fund](/glossary/emergency-fund) protects against smaller shocks. Health insurance protects against medical bills. All three do different jobs, and none substitutes for another.`,
    faq: [
      {
        q: "How much term insurance cover do I need in India?",
        a: "A common rule is 10 to 15 times your annual income, adjusted upward for outstanding loans and future costs like children's education, and downward for existing assets. Someone earning Rs 12 lakh with a Rs 40 lakh home loan and young children may need well above Rs 1.5 crore of cover.",
      },
      {
        q: "Do I get my money back if I survive the term insurance period?",
        a: "No, and that is why it is so cheap. A plain term plan pays only on death during the term. Return of premium variants give the money back but cost substantially more, and the implied return on that extra premium is poor. Buying plain term and investing the difference usually works out better.",
      },
      {
        q: "What is the right age to buy term insurance?",
        a: "As soon as someone depends on your income, and ideally while you are young and healthy. Premiums lock at your entry age and stay level for the whole term, so cover bought at 25 costs materially less every year than the same cover bought at 35. Health conditions later raise premiums or add exclusions.",
      },
      {
        q: "Why do term insurance claims get rejected in India?",
        a: "Overwhelmingly because of non-disclosure. Hiding smoking, alcohol use, an existing medical condition, family history or other policies can void the claim entirely. Section 45 of the Insurance Act limits an insurer's ability to challenge a policy after three years, but that protection assumes you disclosed honestly.",
      },
      {
        q: "Is term insurance premium eligible for tax deduction?",
        a: "Yes, premiums qualify under Section 80C within the Rs 1.5 lakh limit, and the death benefit is generally exempt under Section 10(10D), subject to conditions. Both apply under the old regime. Tax saving is a reason to structure cover well, never a reason to buy a worse product.",
      },
      {
        q: "Is employer-provided life cover enough?",
        a: "Usually not. Group cover is typically a small multiple of salary and, more importantly, it ends the day you leave the job, often at exactly the point when you are between employers. Treat it as a supplement to your own individual term policy, not a replacement for one.",
      },
    ],
    related: ["emergency-fund", "net-worth", "mutual-fund", "cibil-score"],
  },
  {
    slug: "emergency-fund",
    term: "Emergency Fund",
    category: "Banking",
    short:
      "An emergency fund is easily accessible savings set aside for unexpected costs, like a job loss or medical bill, so you avoid going into debt.",
    bodyMarkdown: `An emergency fund is money set aside specifically to absorb unexpected shocks, held somewhere safe and reachable within a day or two. It is the foundation everything else rests on, and it is the step most people skip because it feels unproductive.

It is not an investment. Its return is measured in what it prevents: selling equity during a market fall, breaking a [fixed deposit](/glossary/fixed-deposit) at a penalty, or borrowing on a credit card at roughly 40% a year.

## How much you actually need

The standard guideline is **three to six months of essential expenses**, but the right number depends on how stable your income is and how many people rely on it.

| Your situation | Suggested buffer |
| --- | --- |
| Salaried, dual income, no dependants | 3 months |
| Salaried, sole earner with dependants | 6 months |
| Freelance, contract or commission income | 9 to 12 months |
| Business owner with variable receipts | 12 months |
| Approaching retirement or with health issues in the family | Larger, and more conservative |

Note the phrase **essential expenses**, not income. Count rent or EMI, groceries, utilities, school fees, insurance premiums, medicines, fuel and transport. Exclude eating out, travel and discretionary shopping, since those stop in a genuine emergency.

A household spending Rs 45,000 a month on essentials needs roughly Rs 1.35 lakh for three months and Rs 2.7 lakh for six.

## Where to keep it

The requirements are safety, access within a day or two, and no chance of the value falling. Return is the last consideration, not the first.

- **A separate savings account.** Simplest, instantly accessible, and the low interest is the price of that. Keeping it at a different bank from your salary account creates helpful friction against casual spending.
- **A sweep-in or flexi fixed deposit.** Earns FD rates while allowing withdrawal in units without breaking the whole deposit. A good middle option.
- **Liquid or overnight mutual funds.** Slightly better returns, redemption typically in one working day, with instant redemption available up to a limit on many schemes. Very low but not literally zero risk.
- **Several smaller FDs rather than one large one.** So you break only what you need. See [fixed deposit](/glossary/fixed-deposit).

Where **not** to keep it: equity funds, stocks, [ELSS](/glossary/elss) (locked three years), [PPF](/glossary/ppf) (locked 15 years), real estate, gold jewellery, or anything with an exit load or a lock-in. The one guarantee about emergencies is that they do not wait for a good market.

## What counts as an emergency

The test is whether the expense is **unexpected, necessary and urgent**. All three.

Genuine: job loss, a medical bill insurance does not cover, urgent home or vehicle repair, an unplanned trip for a family emergency, sudden income loss for the self-employed.

Not emergencies: a festival sale, a phone upgrade, a planned holiday, an insurance premium you knew was due, a wedding you have known about for a year. Those are planned expenses and belong in a separate savings pot, often a [recurring deposit](/glossary/recurring-deposit).

## Building one from nothing

The full six months is intimidating, which is why people never start. Break it up.

1. **Reach Rs 25,000 first.** This alone covers most small shocks and stops the reflex of reaching for a credit card.
2. **Get to one month of expenses.** Automate a transfer on salary day so it happens before you can spend it.
3. **Build to three months.** Direct bonuses, tax refunds, appraisal increments and any windfall here rather than into lifestyle.
4. **Extend to six, or more if your income is irregular.**

A useful sequencing note: if you are carrying credit card debt at 40% annualised, build a small buffer of around Rs 25,000, then clear that debt aggressively, then return to building the full fund. Paying down 40% debt beats holding cash earning 3%.

## After you use it

Using the fund is not a failure. That is what it was for. But rebuilding it becomes the immediate priority, ahead of resuming [SIP](/glossary/sip) top-ups or discretionary spending, because you are now exposed until it is replenished.

## It is not a substitute for insurance

An emergency fund handles the gap and the deductible. It does not handle a Rs 15 lakh hospital bill or the loss of a breadwinner's income permanently.

Health insurance covers medical costs. [Term insurance](/glossary/term-insurance) replaces income for dependants. The emergency fund covers everything smaller and faster than those. All three are separate jobs, and holding one does not excuse skipping the others.

Read our full [emergency fund guide](/blog/emergency-fund-guide) for a step by step plan.`,
    faq: [
      {
        q: "How much should an emergency fund be in India?",
        a: "Three to six months of essential expenses for most salaried people, and nine to twelve months if your income is freelance, commission-based or otherwise irregular. Base it on essential outgoings such as rent, EMI, groceries, utilities and school fees, not on your full income, since discretionary spending stops in a real emergency.",
      },
      {
        q: "Where should I keep my emergency fund?",
        a: "Somewhere safe and reachable within a day or two: a separate savings account, a sweep-in or flexi fixed deposit, or a liquid mutual fund. Avoid equity, ELSS, PPF, property or anything with a lock-in or exit load, since emergencies never coincide with a convenient market.",
      },
      {
        q: "Should I invest my emergency fund to earn better returns?",
        a: "No. The purpose of the fund is certainty of access, not return. Chasing an extra two or three percent by putting it in equity means it may be down exactly when you need it. Accept a modest return as the cost of the guarantee, and invest separately for growth.",
      },
      {
        q: "Is a liquid fund good for an emergency fund?",
        a: "Yes, for part of it. Liquid and overnight funds typically redeem within one working day, and many offer instant redemption up to a limit. They usually earn more than a savings account with very low risk. Keeping some money in a savings account alongside covers the truly immediate needs.",
      },
      {
        q: "Should I build an emergency fund or repay debt first?",
        a: "Build a small buffer of around Rs 25,000 first so a minor shock does not send you back to the credit card, then clear high-interest debt aggressively, then return to building the full fund. Credit card interest at roughly 40% annualised beats any return you can earn on cash.",
      },
      {
        q: "Does an emergency fund replace health insurance?",
        a: "No. They do different jobs. An emergency fund handles smaller, faster shocks and the gaps insurance does not cover, such as a deductible or a non-payable item. A serious hospitalisation can cost several times a typical emergency fund, which is what health insurance exists for.",
      },
    ],
    related: ["fixed-deposit", "net-worth", "term-insurance", "recurring-deposit"],
    relatedHref: "/blog/emergency-fund-guide",
    relatedLabel: "Emergency Fund Guide",
  },
  {
    slug: "net-worth",
    term: "Net Worth",
    category: "Banking",
    short:
      "Net worth is the total value of everything you own minus everything you owe, the clearest single measure of your overall financial health.",
    bodyMarkdown: `Net worth is everything you own minus everything you owe. It is a single number that answers a question your salary cannot: are you actually getting wealthier?

Income tells you what flows in. Net worth tells you what you have kept. Two people earning identical salaries can have wildly different net worths after ten years, and the gap has almost nothing to do with the salary.

## How to calculate it

**Assets:** cash and bank balances, [fixed deposits](/glossary/fixed-deposit) and recurring deposits, [mutual funds](/glossary/mutual-fund) and stocks at current market value, [PPF](/glossary/ppf) and [EPF](/glossary/epf) balances, [NPS](/glossary/nps) corpus, gold at current value, the market value of any property, the surrender value of insurance policies, and money genuinely owed to you.

**Liabilities:** the outstanding principal on a home loan, car loan, personal loan or education loan, credit card balances, any borrowing from family, and taxes payable.

**Net worth equals assets minus liabilities.**

A worked example for a 32 year old:

| Assets | Amount |
| --- | --- |
| Savings and emergency fund | Rs 3,00,000 |
| EPF balance | Rs 8,00,000 |
| Mutual funds | Rs 6,50,000 |
| PPF | Rs 4,00,000 |
| Flat, current market value | Rs 65,00,000 |
| Gold | Rs 2,50,000 |
| **Total assets** | **Rs 89,00,000** |

| Liabilities | Amount |
| --- | --- |
| Home loan outstanding | Rs 48,00,000 |
| Car loan outstanding | Rs 4,00,000 |
| Credit card balance | Rs 60,000 |
| **Total liabilities** | **Rs 52,60,000** |

Net worth: **Rs 36,40,000**.

## Getting the numbers honest

The calculation is only as useful as the inputs, and there are four places people flatter themselves.

**Value property realistically.** Use a price similar flats in your building have actually sold for, not the asking price of the most optimistic listing. If you would need to accept 10% less to sell within three months, use that.

**Use current market value, not what you paid.** For equity and gold, today's value is the only relevant number, in both directions.

**Count the outstanding loan principal, not the total you borrowed.** Your amortisation schedule shows the current balance, which early in an [EMI](/glossary/emi) schedule is far higher than people expect.

**Do not count a car as an appreciating asset.** It is worth roughly its resale value, and that falls every year while the loan on it may not fall as quickly.

**Depreciating assets like electronics and furniture** are usually left out entirely, because their resale value is negligible and including them just adds noise.

## Negative net worth is normal

Early in a career, a student loan or a new home loan can easily exceed your assets. That is not failure. A 26 year old with an education loan and Rs 40,000 in savings has a negative net worth and may be in an excellent position, because the loan bought earning capacity.

What matters is the **direction of travel**, measured over years. Net worth improving steadily is the signal. A single snapshot means very little.

## Why it beats income as a scorecard

Income is easy to grow and easy to spend. Net worth only grows when you keep some of it.

The pattern that catches people is lifestyle inflation: a salary doubles, and so does spending, so net worth barely moves. Meanwhile someone earning less but saving 30% of it compounds quietly past them. Tracking net worth makes this visible in a way a payslip never does.

It also captures debt properly. A person who buys a Rs 15 lakh car on loan sees their assets rise and their liabilities rise more, and their net worth falls. Income accounting would have shown nothing.

## How to track it

Once or twice a year is enough. Quarterly if you enjoy it. More often than that and you are just watching market noise.

Keep a simple spreadsheet with the same categories each time so the comparison is meaningful. Record the date. Over five years the trend line tells you more about your financial life than any single decision within it.

Useful things to watch alongside the headline number:

- **Savings rate:** what percentage of income you actually kept this year
- **The debt portion:** liabilities as a share of assets, which should fall over time
- **Liquid net worth:** net worth excluding your primary residence, since you cannot spend the house you live in
- **Real growth:** whether net worth grew faster than [inflation](/glossary/inflation)

That last point matters. A net worth rising 5% a year while inflation runs at 6% is quietly shrinking.

Net worth is a scorecard, not a plan. It works best alongside an adequate [emergency fund](/glossary/emergency-fund), sensible [diversification](/glossary/diversification), and enough [term insurance](/glossary/term-insurance) that a single event cannot undo years of accumulation.`,
    faq: [
      {
        q: "How do I calculate my net worth in India?",
        a: "Add the current value of everything you own: bank balances, fixed deposits, mutual funds, stocks, EPF, PPF, NPS, gold and property. Then subtract everything you owe: outstanding home, car, personal and education loan principal, plus credit card balances. The difference is your net worth.",
      },
      {
        q: "Is a negative net worth bad?",
        a: "Not necessarily, especially early in a career. An education loan or a new home loan can easily exceed your assets while representing a sound decision. What matters is the direction over several years. Persistently negative net worth driven by consumption debt is a genuine problem; a temporary dip from productive borrowing is not.",
      },
      {
        q: "Should I include my house in my net worth?",
        a: "Yes, at a realistic market value, with the outstanding home loan counted as a liability. But also track liquid net worth separately, excluding your primary residence, since you cannot spend the house you live in. Many Indian households have most of their net worth locked in property they will never sell.",
      },
      {
        q: "How often should I track my net worth?",
        a: "Once or twice a year is enough for most people, and quarterly at most. More frequent checks mainly capture market noise rather than progress. Use the same categories each time so the comparison is meaningful, and record the date so you can see the trend over five or ten years.",
      },
      {
        q: "What is a good net worth for my age in India?",
        a: "There is no reliable benchmark, since it depends on income, city, family responsibilities and when you started earning. A more useful measure is your savings rate and whether net worth is growing faster than inflation. Comparing your own trajectory year on year is far more informative than comparing against averages.",
      },
      {
        q: "Does my EPF balance count as an asset?",
        a: "Yes. Your accumulated EPF, PPF and NPS balances are real assets and should be included, even though they are illiquid until specified conditions are met. For many salaried Indians, EPF is the single largest financial asset outside a house, and leaving it out understates net worth considerably.",
      },
    ],
    related: ["emergency-fund", "diversification", "term-insurance", "inflation"],
  },

  // -- AI -----------------------------------------------------------------
  {
    slug: "artificial-intelligence",
    term: "Artificial Intelligence",
    category: "AI",
    short:
      "Artificial Intelligence (AI) is the field of building computer systems that can perform tasks that normally require human intelligence.",
    bodyMarkdown: `Artificial Intelligence is the broad field of building computer systems that do things which normally require human intelligence: recognising a face, understanding a sentence, planning a route, spotting a fraudulent transaction, writing a paragraph.

The term covers a huge range of techniques with very different capabilities, which is why "AI" in a news headline and "AI" in a product brochure often mean entirely different things.

## The layers, from widest to narrowest

- **Artificial Intelligence** is the umbrella: any technique that makes a machine behave in a way we would call intelligent.
- **[Machine learning](/glossary/machine-learning)** is the subset where the system learns patterns from examples instead of being given explicit rules.
- **Deep learning** is machine learning built on [neural networks](/glossary/neural-network) with many layers, which is what made modern image and speech recognition work.
- **[Generative AI](/glossary/generative-ai)** is deep learning applied to producing new content rather than only classifying existing content.
- **[Large language models](/glossary/large-language-model)** are the specific kind of generative AI behind ChatGPT, Claude and Gemini.

When someone says "we use AI", the useful follow-up question is which of these layers they actually mean.

## Rule-based AI and learned AI

Early AI was written by hand. An expert wrote out thousands of if-then rules, and the system followed them. This worked for narrow problems like chess openings and tax calculations, and failed completely at anything fuzzy, because nobody can write down the rules that distinguish a cat from a dog.

Modern AI mostly learns. You show it a million labelled photos and it works out the distinguishing patterns itself. Nobody programmed the definition of a cat. The system inferred it from examples, which is why it can also be confidently wrong in ways nobody anticipated.

## Narrow AI is all that currently exists

Every AI system in use today is **narrow**: excellent at the specific task it was trained for, and useless outside it. A model that beats every human at Go cannot order a taxi. A model that writes fluent essays cannot reliably add up a column of numbers.

**Artificial general intelligence**, a system with broad human-level ability across arbitrary tasks, does not exist. It is a research goal and a subject of serious disagreement about timelines. Marketing that implies otherwise is marketing.

This matters practically. The right question about an AI tool is never "is it intelligent" but "what exactly was it trained to do, and is my task inside that boundary".

## Where you already meet it in India

Most people use AI dozens of times a day without noticing:

- **UPI and card fraud detection** flagging an unusual transaction in milliseconds
- **Loan underwriting** at banks and NBFCs scoring applications
- **Voice assistants and speech recognition** in Hindi, Tamil, Bengali and other Indian languages
- **Recommendations** on YouTube, Instagram, Amazon and streaming apps
- **Maps** predicting traffic and arrival times
- **Spam and phishing filters** in Gmail
- **Chatbots** on banking, telecom and government service portals
- **Document processing** for KYC, insurance claims and cheque reading

## Practical implications if you are using AI tools

**It does not understand, it predicts.** A model producing a confident paragraph about Indian tax law is producing statistically likely text, not consulting the Income Tax Act. See [hallucination](/glossary/hallucination).

**It can be wrong in an authoritative voice.** This is the single most dangerous property for anyone using AI for finance, health, legal or tax questions. Verify anything that affects a real decision.

**Training data has a cutoff.** Unless a tool is explicitly searching the web, it does not know about rules, rates or events after its training data ended, which matters a great deal for Indian tax and regulatory questions that change every Budget.

**It reflects the biases in its data.** Models trained mainly on Western English text often handle Indian names, addresses, contexts and languages less reliably.

**Your inputs may be retained.** Free consumer AI tools frequently use conversations to improve their models. Do not paste Aadhaar numbers, PAN details, bank statements, salary slips, client contracts or anything covered by confidentiality obligations. India's Digital Personal Data Protection Act places real obligations on organisations handling personal data, and pasting customer information into a public chatbot can breach them.

**It is a drafting tool, not an authority.** The reliable pattern is to use AI to produce a first version quickly and then apply your own judgement, rather than to outsource the judgement.

Explore practical tools in our [AI tools directory](/ai-tools) and see [prompt engineering](/glossary/prompt-engineering) for how to get better output.`,
    faq: [
      {
        q: "What is the difference between AI and machine learning?",
        a: "AI is the broad field of making machines behave intelligently, including old rule-based systems. Machine learning is the subset where the system learns patterns from data instead of following hand-written rules. All machine learning is AI, but not all AI is machine learning.",
      },
      {
        q: "Is AI safe to use for financial decisions?",
        a: "Use it for explanation and drafting, not for decisions. AI tools produce confident text that may be outdated or simply wrong, and Indian tax rules, rates and limits change with every Budget. Treat AI output as a starting point and verify anything affecting real money against official sources or a qualified adviser.",
      },
      {
        q: "What is artificial general intelligence?",
        a: "AGI refers to a hypothetical system with broad, human-level ability across arbitrary tasks rather than a single narrow one. It does not currently exist. Every AI system in use today is narrow: strong at what it was trained for and unreliable outside it, however fluent it may sound.",
      },
      {
        q: "Is it safe to paste personal or company data into AI chatbots?",
        a: "Generally no with free consumer tools, which often use conversations to improve their models. Avoid Aadhaar, PAN, bank statements, salary slips, client contracts and anything confidential. India's Digital Personal Data Protection Act places real obligations on organisations, so pasting customer data into a public chatbot can create legal exposure.",
      },
      {
        q: "How is AI used in Indian banking?",
        a: "Widely, mostly invisibly. It powers UPI and card fraud detection, credit underwriting and risk scoring, document verification during KYC, cheque and form reading, chatbot support on banking apps, and collections prioritisation. Most of these are narrow, well-defined tasks where machine learning genuinely outperforms manual review.",
      },
      {
        q: "Do AI tools know about recent events and current tax rules?",
        a: "Only if they explicitly search the web. Otherwise a model's knowledge stops at its training cutoff, which can be months or years old. This matters a lot for Indian finance questions, where slab rates, exemption limits and scheme rules change every Budget. Always verify current figures against official sources.",
      },
    ],
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
    bodyMarkdown: `Machine learning is the branch of [artificial intelligence](/glossary/artificial-intelligence) where a computer learns to make predictions from examples rather than following rules a human wrote out.

The distinction is worth making concrete. In traditional programming, a developer writes the logic: if the transaction is above Rs 50,000 and from a new device and outside the usual city, flag it. In machine learning, you instead show the system a few million past transactions labelled fraudulent or genuine, and it works out the patterns itself, including patterns no analyst would have thought to write down.

## The three main styles

**Supervised learning** uses labelled examples. Each training case comes with the right answer, and the model learns to map inputs to outputs. This covers most practical business use: predicting loan default from applicant history, classifying an email as spam, estimating a house price from its features, reading the amount on a cheque.

**Unsupervised learning** has no labels. The model finds structure on its own, typically by grouping similar things together. A bank might use it to discover natural customer segments it had not defined in advance, or to spot transactions that look unlike anything else and therefore deserve a look.

**Reinforcement learning** learns by trial and feedback. The system takes actions, receives a reward or penalty, and adjusts. This is how systems learn to play games, route delivery fleets, or manage warehouse robots.

## How training actually works

Take a model predicting whether a loan applicant will default.

1. **Gather data.** Thousands of past applicants with their income, existing obligations, credit history, employment type, and crucially whether they actually defaulted.
2. **Split it.** Most of the data trains the model. A held-back portion tests it on cases it has never seen.
3. **Train.** The model makes predictions, compares them with the true outcomes, and adjusts its internal parameters to reduce the error. It repeats this many times.
4. **Test.** Accuracy is measured on the held-back data. Only this number means anything.
5. **Deploy and monitor.** Real-world performance drifts as behaviour changes, so models are retrained periodically.

## Overfitting, in one image

A model that memorises the training data rather than learning the underlying pattern is **overfitted**. It scores brilliantly on data it has seen and poorly on anything new.

The everyday analogy: a student who memorises the answers to last year's paper and is lost when the questions change. This is why the held-back test set exists, and why any claim of very high accuracy should be met with the question "on data the model had never seen?"

## Garbage in, garbage out

A machine learning model can only learn what its data contains, including the data's mistakes.

If a lender's historical decisions were biased against applicants from certain areas, a model trained on those decisions learns to reproduce that bias, and it does so with an air of mathematical objectivity that makes it harder to challenge. If the training data covers only metro customers, performance on rural applicants will be worse without anyone noticing.

For Indian applications specifically, models trained mostly on Western data often handle Indian names, addresses, transliteration, regional languages and local income patterns poorly. This is a data problem, not a technology problem, and it is fixed with better local data rather than a bigger model.

## Where you meet it in India

- **Credit scoring** at banks and NBFCs, increasingly using alternative data alongside bureau scores
- **UPI and card fraud detection**, which must decide in milliseconds
- **Insurance claim triage** and premium pricing
- **Crop yield and price prediction** in agri-tech
- **Demand forecasting** for quick commerce and logistics
- **Speech recognition** across Indian languages
- **Recommendations** on every content and shopping app you use

## Practical implications if you are using AI tools

Machine learning is the engine underneath [large language models](/glossary/large-language-model), which are trained on enormous text datasets using [neural networks](/glossary/neural-network). That inheritance explains their behaviour:

- **They generalise from patterns, so they can be confidently wrong** on anything underrepresented in training data.
- **They have a training cutoff.** A model does not know a rule changed in the last Budget unless it can search.
- **They reflect their data's skew,** which is why output about Indian contexts is sometimes noticeably weaker than about American ones.
- **Accuracy claims need context.** "95% accurate" is meaningless without knowing on what data and against what baseline.

If you are evaluating an AI product for a business, the questions that matter are what data it was trained on, how it performs on cases like yours, and what happens when it is wrong.`,
    faq: [
      {
        q: "What is the difference between machine learning and deep learning?",
        a: "Deep learning is a subset of machine learning that uses neural networks with many layers. Traditional machine learning often needs humans to specify which features matter; deep learning learns those features itself from raw data, which is why it transformed image recognition, speech and language but requires far more data and computing power.",
      },
      {
        q: "Do I need to know coding to understand machine learning?",
        a: "Not to understand the concepts, which are largely about learning patterns from examples rather than following written rules. To build models you would typically need Python and libraries such as scikit-learn or PyTorch. Many business roles now involve evaluating machine learning systems without writing any code at all.",
      },
      {
        q: "What is overfitting in machine learning?",
        a: "It is when a model memorises its training data instead of learning the underlying pattern, so it performs brilliantly on data it has seen and poorly on anything new. It is the reason a portion of data is always held back for testing, and why accuracy claims should specify unseen data.",
      },
      {
        q: "How is machine learning used in Indian banks?",
        a: "For credit scoring and underwriting, real-time UPI and card fraud detection, document and KYC verification, cheque reading, customer segmentation, collections prioritisation and chatbot support. These are narrow, well-defined prediction tasks with plenty of historical data, which is exactly where machine learning tends to outperform manual review.",
      },
      {
        q: "Can machine learning models be biased?",
        a: "Yes, and routinely are. A model learns whatever patterns exist in its training data, including historical human bias. If past lending decisions disadvantaged certain groups, a model trained on them reproduces that with an appearance of objectivity. Models trained mainly on Western data also handle Indian names and contexts less reliably.",
      },
      {
        q: "How much data does machine learning need?",
        a: "It depends entirely on the problem. A simple classification task might work with a few thousand well-labelled examples, while deep learning for images or language typically needs millions. Data quality usually matters more than quantity: a smaller, accurately labelled and representative dataset often beats a larger messy one.",
      },
    ],
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
    bodyMarkdown: `A Large Language Model is an AI system trained on an enormous quantity of text so that it can understand and generate human-like language. ChatGPT, Claude, Gemini and Llama are all LLMs. So are the Indian language models being built by domestic research groups and startups.

"Large" refers to two things: the volume of text it was trained on, measured in trillions of words, and the number of internal parameters it adjusts during training, often in the hundreds of billions.

## How it actually produces a sentence

An LLM does one thing repeatedly: it predicts the next [token](/glossary/token).

You type a [prompt](/glossary/prompt). The model reads it, and calculates a probability distribution over what should come next. It picks a token, appends it, then reads everything including that new token and predicts the next one. Again and again, until it produces a stop signal.

That is the whole mechanism. There is no plan drafted in advance, no lookup in a database of facts, no internal record of what is true. A fluent answer about Section 80C is a statistically likely continuation of your question, assembled one fragment at a time.

Understanding this explains almost every strange behaviour you will encounter with these tools.

## How they are trained

**Pre-training** is the expensive part. The model reads a vast corpus of text from books, websites, code repositories and articles, learning grammar, facts, reasoning patterns and style purely by predicting missing text. This takes months and enormous computing resources.

**Fine-tuning** then shapes the raw model into something useful and safe, teaching it to follow instructions, refuse harmful requests and answer in a helpful format. Techniques such as reinforcement learning from human feedback are used here, where human raters compare responses and the model learns which style of answer people prefer.

An important consequence: the model is optimised to produce answers people **rate highly**, which correlates with being correct but is not the same thing. A confident wrong answer often rates better than an honest "I do not know".

## The three limits that matter in practice

**Training cutoff.** The model's knowledge stops when its training data stops. Unless it can search the web, it will not know about the latest Budget, a rate change, or anything from the last several months. For Indian tax and regulatory questions this is a serious limitation, because the answer changes annually.

**Context window.** The model can only consider a limited number of tokens at once, covering your prompt, any documents you paste, and its own reply. Large context windows now run to hundreds of thousands of tokens, but in a long conversation, early messages can fall out of view.

**[Hallucination](/glossary/hallucination).** Because it generates plausible text rather than retrieving verified facts, it will invent citations, statistics, section numbers and case names, in the same confident tone it uses for correct information. There is no built-in signal distinguishing the two.

## What LLMs are genuinely good at

- Drafting and rewriting: emails, summaries, job descriptions, first versions of anything
- Explaining a concept at whatever level you ask for
- Translating and switching register between languages, including Hindi and other Indian languages, with quality varying by language
- Summarising a long document you supply
- Structuring messy notes into an organised form
- Writing and debugging code
- Being a patient tutor that never gets bored of your third clarifying question

## What they are unreliable at

- Precise arithmetic, unless connected to a calculator tool
- Current facts, rates, prices and law
- Citations, which they will fabricate convincingly
- Anything requiring certainty about a specific number that affects money
- Knowing what they do not know

## Practical use in India

For everyday work, LLMs are genuinely useful for drafting client emails, summarising long PDFs, preparing study material, translating between Indian languages, and getting a plain-English explanation of a financial or legal concept before you verify it.

Two cautions worth taking seriously. First, do not paste PAN, Aadhaar, bank statements, salary slips or client contracts into free consumer tools, which often use conversations for further training and may create obligations under the Digital Personal Data Protection Act if the data belongs to someone else.

Second, treat any number the model gives you about Indian tax, interest rates or scheme limits as a hypothesis to check, not an answer. It may be a figure from two Budgets ago, delivered with complete confidence.

See [prompt engineering](/glossary/prompt-engineering) for how to get substantially better output from the same model.`,
    faq: [
      {
        q: "How does an LLM actually work?",
        a: "It repeatedly predicts the next token, meaning a word or word fragment, based on everything that came before. There is no plan and no fact lookup: each fragment is chosen because it is statistically likely to follow. Fluency comes from scale, which is why the output can be both convincing and wrong.",
      },
      {
        q: "Which is the best LLM to use in India?",
        a: "ChatGPT, Claude and Gemini all have free tiers and handle English well, with varying quality across Indian languages. Domestic models focused on Indian languages are also emerging. The practical answer depends on your task, so try the same prompt on two or three and compare the output yourself.",
      },
      {
        q: "Can an LLM access the internet or current information?",
        a: "Only if the specific tool has a search or browsing feature enabled. Otherwise its knowledge stops at its training cutoff, which may be months or years old. This matters greatly for Indian tax and regulatory questions, where slab rates, exemption limits and scheme rules change with every Budget.",
      },
      {
        q: "Why does an LLM give confidently wrong answers?",
        a: "Because it generates statistically likely text rather than retrieving verified facts, and because fine-tuning rewards answers people rate highly. A confident answer typically rates better than an honest admission of uncertainty. There is no internal signal separating what it knows from what it invented.",
      },
      {
        q: "Is it safe to use an LLM for tax or legal advice in India?",
        a: "Use it to understand concepts, not to decide anything. Models routinely cite outdated slab rates, wrong section numbers and non-existent case law with total confidence. Treat any figure as a hypothesis, verify it against official Income Tax Department sources, and consult a qualified professional for decisions involving real money.",
      },
      {
        q: "What is a context window in an LLM?",
        a: "It is the maximum number of tokens the model can consider at once, covering your prompt, any pasted documents and its own response. Modern models offer large windows running to hundreds of thousands of tokens, but in very long conversations earlier messages can still fall out of the model's view.",
      },
    ],
    related: ["generative-ai", "token", "prompt", "hallucination", "machine-learning"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },
  {
    slug: "generative-ai",
    term: "Generative AI",
    category: "AI",
    short:
      "Generative AI is artificial intelligence that creates new content (text, images, audio, video or code) rather than just analysing existing data.",
    bodyMarkdown: `Generative AI is artificial intelligence that **creates new content** rather than only analysing existing content. Give it a [prompt](/glossary/prompt) and it produces something that did not exist before: a paragraph, an image, a voice recording, a video clip, a spreadsheet formula, working code.

The shift is easiest to see by comparison. Older AI was mostly discriminative: it looked at an input and put it in a category. Is this email spam? Is this transaction fraudulent? Is this photo a cat? Generative AI is asked the harder question: produce a new email, a new photo, a new melody.

## What it can generate

- **Text.** ChatGPT, Claude and Gemini, built on [large language models](/glossary/large-language-model)
- **Images.** Midjourney, DALL-E, Stable Diffusion and the image features inside general assistants
- **Audio and voice.** Speech synthesis good enough to clone a specific voice from a short sample, plus music generation
- **Video.** Text-to-video systems, improving quickly and still visibly imperfect
- **Code.** GitHub Copilot and similar tools that write and complete code inside an editor
- **Structured output.** Slide decks, spreadsheets, summaries and formatted documents

## How it produces something new

Two mechanisms dominate, and they work differently.

**Language models** generate text one [token](/glossary/token) at a time, each chosen as a statistically likely continuation of everything before it. The output is new because that exact sequence has probably never been written, even though every pattern in it was learned from existing text.

**Diffusion models** generate images by starting with random noise and repeatedly removing a little of it, steered by your prompt, until a coherent picture emerges. It is closer to sculpting than drawing, and it is why image models produce different results from the same prompt each time.

Neither is retrieving and pasting. Asking for a logo of a blue fox in the style of a woodcut produces an image assembled from learned patterns about foxes, blue, logos and woodcuts, which is why it can also produce a fox with five legs.

## What it is genuinely good and bad at

**Good at:** first drafts, variations on a theme, summarising, translating, restructuring messy input, explaining concepts, boilerplate code, and getting past a blank page.

**Bad at:** precise arithmetic, current facts, citations, consistent details across a long piece, hands and text inside generated images, and knowing when it is wrong. See [hallucination](/glossary/hallucination).

The reliable pattern for real work is to use it for the first 70% and apply your own judgement to the rest. Using it for the final 100% is where people get into trouble.

## Practical points for users in India

**Cost and access.** Most major tools have a usable free tier, with paid plans commonly priced in dollars and running to roughly Rs 1,500 to Rs 2,000 a month. Some now offer India-specific pricing or bundled access through telecom and productivity subscriptions, so it is worth checking before subscribing at list price.

**Indian language quality varies a lot.** Hindi is generally handled reasonably; Tamil, Bengali, Marathi, Telugu and others range from decent to noticeably weaker, and transliterated Hinglish input often produces better results than expected. Several Indian research groups and startups are building models specifically for Indian languages.

**Data privacy.** Free consumer tools frequently use your inputs to improve their models. Do not paste PAN, Aadhaar, bank statements, salary slips, medical records or client contracts. Under India's Digital Personal Data Protection Act, feeding someone else's personal data into a public tool can create obligations and exposure for your organisation.

**Copyright and ownership.** Indian law on the copyright status of AI-generated work is unsettled, and the terms of service of the tool you used govern what you may do commercially. If output is going into paid client work, read those terms.

**Deepfakes and fraud.** Voice cloning from a short audio sample is now cheap and convincing, and it is being used in India for fraud calls impersonating family members in distress. Agreeing a verification question with family, and refusing to act on an urgent-sounding voice call about money without independent confirmation, is a reasonable precaution.

## What it means for work

The honest framing is that generative AI compresses the time between having an idea and having a rough version of it. That is genuinely valuable for anyone who writes, designs, codes or analyses.

It does not replace domain judgement, and in regulated areas such as finance, tax, law and medicine it should not be allowed to. The advantage goes to people who use it to move faster on the drafting while keeping the checking firmly human. Our guide on [working faster with AI](/blog/work-faster-with-ai) covers the practical workflow.`,
    faq: [
      {
        q: "What is the difference between generative AI and traditional AI?",
        a: "Traditional AI mostly classifies or predicts: is this email spam, will this loan default. Generative AI produces new content instead: an essay, an image, a voice clip, working code. Both are built on machine learning, but generative models are trained to create rather than only to categorise.",
      },
      {
        q: "Is generative AI free to use in India?",
        a: "Most major tools offer a usable free tier with limits on speed, model quality or daily usage. Paid plans are commonly priced in dollars, working out to roughly Rs 1,500 to Rs 2,000 a month. Some now offer India-specific pricing or bundled access, so check before subscribing at list price.",
      },
      {
        q: "Can I use AI-generated content commercially in India?",
        a: "It depends on the tool's terms of service, which govern what you may do with the output. Indian copyright law on AI-generated work remains unsettled, with no clear position on authorship. If output is going into paid client work, read the terms and consider disclosing AI involvement where it matters.",
      },
      {
        q: "How well does generative AI handle Indian languages?",
        a: "Quality varies considerably. Hindi is generally handled reasonably well, while Tamil, Bengali, Marathi, Telugu and others range from adequate to noticeably weaker, since training data is dominated by English. Several Indian research groups and startups are building models specifically for Indian language coverage.",
      },
      {
        q: "What are AI deepfakes and how do I protect myself?",
        a: "Deepfakes are synthetic audio, images or video convincing enough to impersonate a real person, and voice cloning now needs only a short sample. Fraud calls impersonating a family member in distress are a real problem in India. Agree a verification question with family and never act on an urgent voice call about money without independent confirmation.",
      },
      {
        q: "Will generative AI replace jobs in India?",
        a: "It is changing tasks more than eliminating whole roles so far, particularly drafting, first-pass analysis and routine content work. The consistent pattern is that it compresses the time from idea to rough version while leaving judgement, verification and domain expertise with people. The practical response is to learn to use it well.",
      },
    ],
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
    bodyMarkdown: `A prompt is the instruction, question or context you give an AI tool. It is the only thing the model has to work with, and it determines almost everything about the quality of what comes back.

Every interaction with ChatGPT, Claude, Gemini or an image generator starts with one. It can be three words or three paragraphs. The difference in output between those two is usually larger than the difference between two competing models.

## Why the wording matters so much

A [large language model](/glossary/large-language-model) does not infer what you meant. It continues from what you wrote. Your prompt sets the entire statistical context for what follows, so every detail you leave out is a detail the model fills in with whatever is most generic.

Ask for **write an email** and you get a bland template, because the model had nothing to narrow it down. Ask for **write a 120 word email to a client in Mumbai, politely following up on an invoice that is 20 days overdue, warm but firm, no apology at the start** and you get something you can send with light editing.

Nothing about the model changed. You simply removed the ambiguity it was going to resolve badly.

## The parts of a good prompt

Not every prompt needs all of these, but most weak prompts are missing several.

- **Role.** Who the model should act as. "You are an experienced Indian tax consultant explaining to a first-time filer."
- **Task.** The specific thing to do, stated as a verb. Summarise, rewrite, compare, draft, critique, explain.
- **Context.** Background it cannot know. Your audience, your constraints, what has already been tried.
- **Format.** Length, structure, tone. Bullet points or paragraphs. 200 words or 800.
- **Examples.** One or two samples of the output style you want. This is the single most effective addition for a specific style.
- **Constraints.** What to avoid. Jargon, assumptions, or making things up.

## Weak and strong, side by side

| Weak prompt | Strong prompt |
| --- | --- |
| Summarise this | Summarise this report in three sentences for a busy manager, focusing only on the financial risks |
| Write a blog post about SIPs | Write a 700 word explainer on SIPs for a 25 year old first-time investor in India, using rupee examples, no jargon, and a short section on what people get wrong |
| Is this a good investment | Explain the main risks and trade-offs of this investment in plain English, list what information is missing before anyone could judge it, and do not give a recommendation |
| Fix my code | This Python function should return the EMI for a loan but returns a negative number for long tenures. Here is the code and a failing example. Explain what is wrong and show the corrected version |

## Techniques worth knowing

**Iterate rather than perfect.** Send a reasonable prompt, read the output, then say what to change. "Shorter." "More formal." "Use an Indian example." Conversation almost always beats trying to write the ideal prompt in one go.

**Ask it to think step by step** for reasoning tasks. It genuinely improves accuracy on multi-step problems, because the model produces intermediate reasoning it can build on rather than jumping to an answer.

**Give it the source.** Pasting the actual document and asking it to work only from that reduces invention substantially, though it does not eliminate it. See [hallucination](/glossary/hallucination).

**Ask what is missing.** "What else would you need to know to answer this well?" often surfaces assumptions you should have specified.

**Split large tasks.** One prompt for an outline, another for each section, produces better results than one prompt for an entire document.

## Practical notes for users in India

**Language.** English generally gives the strongest results, Hindi is handled reasonably, and other Indian languages vary. Writing in transliterated Hinglish often works better than people expect, and asking for the output in your preferred language while prompting in English is a useful hybrid.

**Be specific about Indian context.** Models default to American assumptions. Saying "in India", "in rupees", "under Indian tax law" or "for the Indian market" changes the output substantially and is worth doing every time.

**Do not put confidential data in the prompt.** Everything you type may be retained and used for training by free consumer tools. Keep PAN, Aadhaar, bank statements, salary details and client information out of them.

**Verify anything factual.** A well-crafted prompt improves clarity and relevance. It does not make the model's facts correct, and it will not stop it inventing a section number or a rate.

Getting consistently good at this is a learnable skill in its own right. See [prompt engineering](/glossary/prompt-engineering), and try it in our [AI assistant](/ai-assistant).`,
    faq: [
      {
        q: "What makes a good AI prompt?",
        a: "Specificity. State the role you want the model to take, the exact task, the context it cannot know, the format and length you want, and any constraints. Adding one or two examples of the output style you want is the single most effective improvement for getting a consistent tone.",
      },
      {
        q: "Does prompt length affect the answer quality?",
        a: "Detail helps up to a point, but relevance matters more than length. A focused 60 word prompt with clear context beats a rambling 400 word one. Very long prompts also consume more tokens, which matters if you are using an API where you pay per token or working near a context limit.",
      },
      {
        q: "Can I write prompts in Hindi or other Indian languages?",
        a: "Yes. English generally produces the strongest results and Hindi is handled reasonably well, with other Indian languages varying. Transliterated Hinglish often works better than expected. A useful hybrid is to prompt in English while asking for the output in your preferred language.",
      },
      {
        q: "Why does the same prompt give different answers each time?",
        a: "Because these models sample from a probability distribution rather than picking the single most likely continuation, which is what makes output feel natural rather than robotic. If you need consistency, ask for a specific format, provide an example, or run the prompt through a tool with a lower randomness setting.",
      },
      {
        q: "Should I include personal or company data in a prompt?",
        a: "No, not in free consumer tools, which often retain inputs and use them for training. Keep PAN, Aadhaar, bank statements, salary slips, medical records and client contracts out. Under India's Digital Personal Data Protection Act, pasting someone else's personal data into a public tool can create real exposure for your organisation.",
      },
      {
        q: "How do I stop AI from making things up in its answers?",
        a: "Give it the source material and instruct it to answer only from what you provided, ask it to say when it does not know, and request that it flag anything uncertain. These reduce invention substantially but do not eliminate it, so any figure, citation or legal reference still needs verifying.",
      },
    ],
    related: ["prompt-engineering", "large-language-model", "generative-ai", "token"],
    relatedHref: "/ai-assistant",
    relatedLabel: "Ask AI",
  },
  {
    slug: "token",
    term: "Token",
    category: "AI",
    short:
      "A token is a small chunk of text, a word or part of a word, that an AI language model reads and generates. Models measure their work in tokens.",
    bodyMarkdown: `A token is the unit of text an AI language model actually works with. Models do not read letter by letter, and they do not read whole sentences. They break text into tokens, which are words or fragments of words, and everything they do is expressed in those units.

As a rough rule for English, **one token is about four characters**, and 100 tokens is roughly 75 words. A common word like "bank" is a single token. A longer or unusual word like "diversification" splits into several.

## Why models tokenise at all

A model needs a fixed vocabulary of symbols it can predict from. Using whole words would require a vocabulary of millions and would break on any word it had never seen. Using individual letters would work but would make sequences impossibly long and strip away meaning.

Sub-word tokens are the compromise. Common words get their own token, rare words are assembled from pieces, and the model can therefore handle a word it has never encountered by building it from fragments.

## Rough conversions worth remembering

| Text | Approximate tokens |
| --- | --- |
| One common English word | 1 |
| The phrase "AI is useful" | About 4 |
| A short paragraph, 100 words | About 130 |
| A 500 word document | About 650 to 700 |
| A 10 page PDF | Roughly 5,000 to 7,000 |
| A 300 page book | Roughly 100,000 or more |

## Why tokens cost more in Indian languages

This is a real and underappreciated issue.

Tokenisers are trained mostly on English text, so English is encoded efficiently. Hindi, Tamil, Bengali, Telugu, Marathi and other Indian languages written in their own scripts are frequently split into far more tokens for the same meaning, sometimes several times as many.

Two practical consequences follow. On a paid API, the same message in Hindi can cost noticeably more than in English. And because the context window is measured in tokens, a Tamil document fills the available space faster than an English one of the same length. Indian language models being built domestically are addressing exactly this by training tokenisers on Indian scripts.

## The two things tokens actually govern

**The context window.** A model can only hold a limited number of tokens in view at once, and this budget covers your [prompt](/glossary/prompt), any documents you paste, the conversation so far, and the reply it is generating. Modern models offer large windows, but in a long conversation or with a big document, earlier content can drop out of view. If a chatbot seems to have forgotten something you said an hour ago, this is usually why.

**The price.** Paid APIs charge per token, separately for input and output, with output usually costing more. If you are building anything on top of an AI API, token count is your cost model. A chatbot that resends the entire conversation history with every message is paying for that history repeatedly.

For ordinary users on a monthly subscription, tokens are invisible. For anyone building a product or automating a workflow, they are the main line item.

## Practical implications

- **Long documents may need splitting.** If a PDF exceeds the context window, break it into sections and summarise each, then combine the summaries.
- **Trim what you paste.** Sending only the relevant pages rather than an entire annual report reduces cost and often improves the answer, since the model has less irrelevant material to weigh.
- **Long conversations degrade.** Starting a fresh chat for a new task usually produces better results than continuing a thread that has drifted across five topics.
- **Output limits are separate.** A model may accept a very large input but cap how much it will generate in one response, which is why asking for a 10,000 word document in one go often produces something shorter.

Tokens are also the mechanism behind how a [large language model](/glossary/large-language-model) generates text: it predicts one token at a time, appends it, and repeats. That is why responses stream in gradually rather than appearing all at once.`,
    faq: [
      {
        q: "How many words is 1000 tokens?",
        a: "Roughly 750 words in English, since one token averages about four characters. The ratio varies with vocabulary: common words use one token each while rare or technical words split into several. Numbers, code and punctuation also tokenise differently, so treat any conversion as an estimate rather than an exact figure.",
      },
      {
        q: "Why do Indian languages use more tokens than English?",
        a: "Because tokenisers are trained mostly on English text, so English is encoded efficiently while Hindi, Tamil, Bengali and other Indian scripts are split into many more pieces for the same meaning. This makes API usage costlier and fills the context window faster, which domestic Indian language models are working to address.",
      },
      {
        q: "What is a context window and how does it relate to tokens?",
        a: "The context window is the maximum number of tokens a model can consider at once, covering your prompt, pasted documents, the conversation history and the response being generated. When a long conversation exceeds it, earlier messages fall out of view, which is why a chatbot can appear to forget what you said.",
      },
      {
        q: "Do I pay per token when using ChatGPT or Claude?",
        a: "Not on a consumer monthly subscription, where you pay a flat fee and tokens are invisible to you. You do pay per token when using the API to build applications, charged separately for input and output, with output usually costing more. For developers, token count is effectively the cost model.",
      },
      {
        q: "How do I handle a document that is too long for the AI?",
        a: "Split it into sections, summarise each separately, then combine the summaries into a final pass. Trimming to only the relevant pages before pasting also helps, since it reduces both cost and the amount of irrelevant material the model has to weigh when forming an answer.",
      },
      {
        q: "Why does the AI stop mid-answer sometimes?",
        a: "Usually because it hit the maximum output length for a single response, which is set separately from the input context window. Asking it to continue generally resumes from where it stopped. For long documents, requesting one section at a time produces more complete results than asking for everything in one go.",
      },
    ],
    related: ["large-language-model", "prompt", "hallucination", "generative-ai"],
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    category: "AI",
    short:
      "In AI, a hallucination is when a language model produces information that sounds confident and plausible but is actually false or made up.",
    bodyMarkdown: `In AI, a hallucination is output that is fluent, confident and false. The model states something that is not true, in exactly the same authoritative tone it uses for things that are true, with no signal that anything is wrong.

The word is slightly misleading, because it implies a malfunction. It is not one. Hallucination is a direct consequence of how these systems work, and it cannot be fully removed by better engineering.

## Why it happens

A [large language model](/glossary/large-language-model) generates text by predicting the next [token](/glossary/token) based on statistical patterns. It is not consulting a database. It has no internal store of verified facts, and no mechanism for checking whether something it just produced corresponds to reality.

When you ask about something well represented in its training data, the most statistically likely continuation is usually also the true one. When you ask about something obscure, specific or recent, the most likely continuation is whatever **looks like** a correct answer. A plausible-sounding case citation has the same shape as a real one. So the model produces it.

Fine-tuning makes this worse in one respect. Models are trained on human ratings, and a confident answer typically rates better than "I do not know". The system is optimised to be helpful, and inventing something helpful-looking scores well.

## Where it shows up most

- **Citations and references.** Research papers, court cases and book titles that do not exist, complete with plausible authors and years. This has led to lawyers being sanctioned in more than one jurisdiction.
- **Numbers.** Statistics, percentages, interest rates, market sizes, delivered with a specificity that implies a source.
- **Legal and tax specifics.** Section numbers, exemption limits, slab rates and scheme rules. Extremely dangerous in an Indian context, where these change with every Budget.
- **Recent events.** Anything after the training cutoff, which the model may either refuse or confabulate.
- **Product and API details.** Functions, features and settings that sound right and do not exist.
- **People.** Biographical details about anyone not widely written about.
- **Arithmetic.** Multi-step calculations, unless the tool has a calculator attached.

## Why it is a particular problem for Indian finance questions

Indian tax and regulatory figures change annually. A model trained on data from two years ago will confidently tell you the Section 80C limit, the LTCG exemption threshold, the TDS threshold on FD interest or the gratuity ceiling, using a figure that was correct when it was trained and may not be now.

It will not warn you. The answer will be well structured and reassuring. This is the specific failure mode most likely to cost an Indian reader real money, which is why any figure from an AI tool about tax, rates or limits should be treated as a prompt to check the official source rather than as an answer.

## How to reduce it

You cannot eliminate hallucination, but you can substantially reduce it.

- **Give it the source.** Paste the actual document and instruct it to answer only from what you provided. This is by far the most effective single step.
- **Use tools with search or retrieval.** Systems that look up documents and cite them (a technique called retrieval augmented generation) are materially more reliable for factual questions, though the summarising step can still distort.
- **Ask for uncertainty.** "Tell me what you are unsure about" and "say if you do not know" genuinely change the output.
- **Ask twice, differently.** If two differently-worded questions produce inconsistent answers, at least one is invented.
- **Verify every citation.** If a source is named, look it up. This takes a minute and catches the most damaging errors.
- **Never trust unverified arithmetic.** Recompute anything numerical yourself or in a spreadsheet.

## How to spot one

Hallucinations rarely look uncertain. The warning signs are indirect:

- Unusual specificity without a source, such as an exact percentage for a niche statistic
- A citation you cannot find anywhere
- Confident detail about something very recent
- An answer that contradicts something the same model said two messages earlier
- Perfect fluency on a question you know is genuinely contested

## The right mental model

Treat AI output as a **well-read colleague who never says they are unsure**. Useful for structure, explanation, first drafts and getting oriented on an unfamiliar topic. Not a source of record for anything you would not want to be wrong about.

For finance, tax, legal, medical and compliance work in particular, the appropriate workflow is AI for the draft and a human plus an authoritative source for the facts. That is not a temporary limitation to be engineered away next year. It follows from what these systems are.`,
    faq: [
      {
        q: "Why does AI make up facts and citations?",
        a: "Because it generates statistically likely text rather than retrieving verified information. A plausible-looking citation has the same linguistic shape as a real one, so the model produces it. Fine-tuning compounds this, since a confident answer typically rates better with human raters than an admission of uncertainty.",
      },
      {
        q: "How can I tell if an AI answer is a hallucination?",
        a: "Look for unusual specificity without a source, citations you cannot find, confident detail about recent events, and inconsistency when you ask the same question differently. Fluency is not evidence of accuracy. The reliable test is verifying any figure, citation or legal reference against an authoritative source.",
      },
      {
        q: "Can AI hallucination be fixed completely?",
        a: "No, not with current architectures. It follows directly from generating likely text rather than retrieving verified facts. Retrieval systems that supply source documents reduce it substantially, and better training helps, but no method eliminates it. Verification of anything consequential remains a human responsibility.",
      },
      {
        q: "Is it safe to use AI for Indian tax questions?",
        a: "Use it to understand concepts, never to confirm figures. Indian tax limits, slab rates, exemption thresholds and scheme rules change with every Budget, and a model trained earlier will state outdated numbers with total confidence. Always verify against the Income Tax Department or a qualified professional.",
      },
      {
        q: "How do I reduce hallucinations in AI answers?",
        a: "Paste the actual source document and instruct the model to answer only from it, use tools with search or retrieval enabled, explicitly ask it to flag uncertainty, and ask the same question twice in different words to see whether the answers agree. Verify every citation and recompute any arithmetic yourself.",
      },
      {
        q: "Are some AI models less prone to hallucination than others?",
        a: "Yes, to a degree. Newer and larger models generally hallucinate less, and tools with live search or document retrieval are noticeably more reliable on factual questions. But no model is free of it, and a lower rate can be more dangerous by encouraging complacency about checking.",
      },
    ],
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
    bodyMarkdown: `Prompt engineering is the practice of writing and refining instructions so an AI tool produces genuinely useful output rather than generic filler. Since a model responds to exactly what you asked, the quality of your [prompt](/glossary/prompt) is usually the biggest variable you control.

The name sounds more technical than the activity is. Most of it is clear thinking, written down: deciding what you actually want, saying so precisely, and adjusting when the first attempt misses.

## The techniques that make the most difference

**Assign a role.** Telling the model who to be shifts vocabulary, assumptions and depth. "You are a chartered accountant explaining to a first-time filer in India" produces something quite different from the same question asked cold.

**Give one or two examples.** This is called few-shot prompting and it is the single most reliable way to control style. If you want emails in a particular voice, paste two you have written before. The model matches patterns far better than it follows adjectives.

**Ask it to reason step by step.** For anything with multiple stages, instructing the model to work through it in order measurably improves accuracy, because it generates intermediate reasoning it can then build on rather than jumping straight to a conclusion.

**Specify the output format.** Length, structure, tone, and what to leave out. "Six bullet points, under 20 words each, no introduction" removes an entire round of editing.

**Chain your prompts.** One prompt for an outline, then one per section, then one to tighten the whole thing. Trying to get a long, structured document from a single prompt reliably produces something shallow.

**State the negatives.** What to avoid is often more useful than what to include. "Do not use the words leverage, robust or seamless. Do not invent statistics. Do not add a summary at the end."

**Ask what is missing.** "Before answering, tell me what else you would need to know." This surfaces assumptions you should have specified and frequently improves the second attempt more than any rewording would have.

## Weak against strong

| Weak | Strong |
| --- | --- |
| Write a product description | You are a copywriter. Write a 50 word product description for a steel water bottle aimed at Indian office workers aged 25 to 35, friendly and specific, no exclamation marks, mention it fits a standard bag pocket |
| Analyse this data | Here is a CSV of monthly sales. Identify the three clearest trends, state what data would be needed to confirm each, and flag anything that looks like an error rather than a trend |
| Help me with my resume | Rewrite these three bullet points from my resume for a mid-level data analyst role in Bengaluru. Lead each with a verb, include a measurable outcome, keep each under 25 words, and do not invent numbers |

## Iteration beats perfection

The most common mistake is treating prompting as a one-shot exercise. Experienced users send a decent prompt, read the output, and then steer: shorter, more concrete, remove the third point, use an Indian example, make the tone less formal.

Three quick rounds almost always beat one carefully crafted attempt, because you are reacting to what the model actually produced rather than guessing at it.

Keep the prompts that work. Most people who use AI seriously end up with a small file of reusable prompts for the tasks they repeat.

## Practical notes for India

**Say "in India" explicitly.** Models default to American assumptions about currency, tax, regulation, salary ranges and cultural context. Adding "in India", "in rupees" or "under Indian law" changes the output substantially, and it needs saying every time.

**Language.** English generally produces the strongest results. A useful pattern is to write your prompt in English, since instructions are followed more reliably, while asking for the output in Hindi or another Indian language.

**Prompting does not fix facts.** A brilliantly structured prompt produces a well-organised answer that may still contain an outdated slab rate or an invented section number. See [hallucination](/glossary/hallucination). Verification is a separate step and it does not go away.

**Keep confidential data out.** Free consumer tools often retain inputs for training. No amount of prompt skill makes it safe to paste a client contract or a salary sheet.

## Is it a career?

"Prompt engineer" briefly appeared as a standalone job title, and the market for it has largely reabsorbed into ordinary roles. What has proved durable is prompting as a **component skill** inside existing jobs: marketers, analysts, developers, lawyers and researchers who prompt well simply work faster than colleagues who do not.

For anyone building on AI, prompting also extends into system design: writing the instructions that sit behind an application, structuring how documents are retrieved and supplied, and defining what an [AI agent](/glossary/ai-agent) is permitted to do. That is closer to engineering in the ordinary sense.

Our guide on [working faster with AI](/blog/work-faster-with-ai) has more practical patterns.`,
    faq: [
      {
        q: "Is prompt engineering a real skill worth learning?",
        a: "Yes, though less as a job title than as a component skill inside an existing role. Marketers, analysts, developers and researchers who prompt well simply get more out of the same tools than colleagues who do not. It takes hours to learn the basics rather than months, and the payoff is immediate.",
      },
      {
        q: "What is few-shot prompting?",
        a: "It means including one or two examples of the output you want inside the prompt itself. Models match patterns far more reliably than they follow descriptive adjectives, so pasting two emails in your preferred voice controls tone better than any amount of describing that voice in words.",
      },
      {
        q: "Does asking AI to think step by step actually work?",
        a: "Yes, measurably, on tasks with multiple stages. Instructing the model to work through the problem in order makes it generate intermediate reasoning it can then build on, rather than jumping to a conclusion. It helps least on simple factual recall and most on calculation and multi-step logic.",
      },
      {
        q: "How do I get better answers about Indian topics from AI?",
        a: "Say so explicitly every time. Add in India, in rupees, or under Indian law to the prompt, since models default to American assumptions about currency, tax, regulation and salary ranges. Naming the city, the audience and the regulatory context sharpens the output considerably.",
      },
      {
        q: "Can prompt engineering stop AI from giving wrong answers?",
        a: "It reduces vagueness and irrelevance, not factual error. A well-structured prompt produces a well-organised answer that may still contain an outdated tax limit or an invented citation. Supplying source documents and instructing the model to use only those helps most, but verification remains a separate human step.",
      },
      {
        q: "Should I write one long prompt or several shorter ones?",
        a: "Several, chained. Ask for an outline, then work through it section by section, then do a final tightening pass. A single prompt for a long structured document reliably produces something shallow, because the model has to commit to an entire shape before it has developed any of it.",
      },
    ],
    related: ["prompt", "large-language-model", "generative-ai", "ai-agent"],
    relatedHref: "/blog/work-faster-with-ai",
    relatedLabel: "Work Faster With AI",
  },
  {
    slug: "neural-network",
    term: "Neural Network",
    category: "AI",
    short:
      "A neural network is a computing system loosely inspired by the brain, using layers of connected nodes to learn patterns in data, the basis of modern AI.",
    bodyMarkdown: `A neural network is a computing system built from many simple units, called nodes or artificial neurons, arranged in connected layers. The name comes from a loose analogy with the brain, and the analogy should be held loosely: an artificial neuron is a small piece of arithmetic, not a biological cell.

It is the architecture underneath essentially all modern AI, from face unlock on your phone to the [large language models](/glossary/large-language-model) behind ChatGPT.

## The structure

- **The input layer** receives the raw data. For an image, one node per pixel value. For text, numbers representing each [token](/glossary/token).
- **Hidden layers** sit in between and do the work. Each node takes the values from the previous layer, multiplies each by a **weight**, adds them up, and passes the result through a simple function that decides how strongly to fire.
- **The output layer** produces the answer: a probability that this is a cat, a predicted price, the next token in a sentence.

Every connection between nodes has a weight, a number expressing how much that input matters. A large network has billions of them. Those weights are the entire content of what the model has learned.

## How it learns

The training loop is conceptually simple and repeated an enormous number of times.

1. Feed in an example and let it flow forward through the layers to produce a prediction.
2. Compare that prediction with the correct answer and measure the error.
3. Work backwards through the network, calculating how much each weight contributed to the error. This is **backpropagation**.
4. Nudge every weight slightly in the direction that would have reduced the error.
5. Repeat with the next example. Millions of times.

Nobody writes the rules. The rules end up encoded in the weights, distributed across billions of numbers in a form no human can read directly. This is why neural networks are often called black boxes: you can see the output and measure the accuracy, but you cannot open it up and read the reasoning.

## What the layers actually learn

For image recognition, the progression is unusually easy to visualise and has been studied directly.

Early layers detect edges and colour gradients. Middle layers combine those into textures, corners and simple shapes. Later layers combine those into recognisable parts: an eye, a wheel, a leaf. The final layers assemble parts into whole objects.

Nobody specified this hierarchy. It emerged from training, because building simple features into complex ones is an efficient way to solve the problem.

## Deep learning, and why depth mattered

**Deep learning** just means a neural network with many hidden layers. The idea is decades old, but it only became practical when three things arrived together: very large labelled datasets, GPUs capable of the necessary parallel arithmetic, and training techniques that stopped very deep networks from failing to learn.

That combination is what produced the step change in image recognition, speech and translation from roughly 2012 onward.

## The kinds you will hear about

- **Convolutional neural networks (CNNs)** for images and video
- **Recurrent networks and LSTMs** for sequences, largely superseded for language
- **Transformers**, introduced in 2017, which handle sequences by attending to all positions at once rather than reading strictly left to right. Every major language model today is a transformer, and the attention mechanism is what made them scale.

## Practical implications for someone using AI tools

**The black box property is real.** When a bank's model declines a loan or a fraud system blocks a card, tracing exactly why is genuinely difficult. Regulators in India and elsewhere are increasingly asking for explainability in credit and insurance decisions, and this is the technical reason it is hard.

**Neural networks learn correlations, not reasons.** A model can be highly accurate and still have latched onto something irrelevant in the training data that happens to correlate with the answer.

**They need a great deal of data.** Which is why AI performs better on tasks and languages with abundant training data, and noticeably worse on underrepresented Indian languages and local contexts.

**Confidence is not accuracy.** The output layer produces a probability, and a network can assign high probability to a wrong answer. This is the mechanism underlying [hallucination](/glossary/hallucination) in language models.

Neural networks are one technique within [machine learning](/glossary/machine-learning), which sits within [artificial intelligence](/glossary/artificial-intelligence) more broadly.`,
    faq: [
      {
        q: "How is a neural network different from the human brain?",
        a: "Only superficially similar. Artificial neurons are simple arithmetic units passing numbers forward, while biological neurons are vastly more complex electrochemical cells. Neural networks also need millions of labelled examples to learn what a child learns from a handful. The analogy inspired the design; it does not describe how either actually works.",
      },
      {
        q: "What is deep learning?",
        a: "It is machine learning using neural networks with many hidden layers. Depth lets the network build simple features into progressively complex ones, such as edges into shapes into objects. It became practical only when large datasets, GPU computing power and better training techniques arrived together around 2012.",
      },
      {
        q: "Why are neural networks called black boxes?",
        a: "Because what they have learned is stored as billions of numerical weights distributed across the network, in a form no human can read as reasoning. You can measure accuracy and inspect outputs, but tracing exactly why a specific decision was made is genuinely hard, which matters for regulated lending and insurance decisions.",
      },
      {
        q: "What is a transformer in AI?",
        a: "A neural network architecture introduced in 2017 that processes a sequence by attending to all positions simultaneously rather than reading strictly in order. That attention mechanism is what allowed language models to scale to their current size, and every major LLM today, including ChatGPT and Claude, is a transformer.",
      },
      {
        q: "Do I need to understand neural networks to use AI tools?",
        a: "Not to use them, but the basics explain a lot of their behaviour. Knowing that they learn correlations from data, store what they learn as unreadable weights, and output probabilities rather than certainties makes their failure modes much less surprising, particularly confident wrong answers.",
      },
      {
        q: "How much data does a neural network need to train?",
        a: "Far more than most people expect. Image recognition typically needs hundreds of thousands to millions of labelled examples, and large language models are trained on trillions of words. This is why AI performs noticeably worse on underrepresented Indian languages and local contexts where less training data exists.",
      },
    ],
    related: ["machine-learning", "artificial-intelligence", "large-language-model", "generative-ai"],
  },
  {
    slug: "ai-agent",
    term: "AI Agent",
    category: "AI",
    short:
      "An AI agent is an AI that takes actions to complete a goal on its own, planning steps and using tools, rather than just answering one question.",
    bodyMarkdown: `An AI agent is an AI system that pursues a goal by taking actions, rather than answering a single question and stopping. Given an objective, it plans steps, uses tools, observes what happened, and decides what to do next, looping until the job is done or it gives up.

The difference from a chatbot is the difference between advice and action. A chatbot tells you how to book a flight. An agent opens the site, searches, and fills the form.

## The loop that makes it an agent

Almost every agent runs some version of the same cycle:

1. **Understand the goal** it was given
2. **Plan** the next step
3. **Act**, by calling a tool: a web search, a calculator, a database query, a code interpreter, an API
4. **Observe** the result
5. **Decide** whether the goal is met, and if not, return to step 2

The [large language model](/glossary/large-language-model) provides the reasoning at each step. The tools provide everything the model cannot do itself, which is a longer list than people assume: it cannot browse, cannot calculate reliably, cannot remember across sessions, and cannot affect anything in the world without being connected to something.

## A worked example

Ask an agent to research the best current fixed deposit rates for a senior citizen and produce a comparison.

A chatbot answers from training data, which may be two years out of date. An agent would search for current rates, open several bank pages, extract the relevant tenures and senior citizen premiums, notice that one page failed to load and retry, compile the figures into a table, and hand you a document with sources.

Same underlying model. The difference is the ability to act, observe and iterate.

## What agents are actually good at today

- Multi-step research where the sub-questions are not known upfront
- Writing code, running it, reading the error, and fixing it
- Extracting structured data from many documents
- Routine multi-app workflows: read a form submission, look up a record, draft a reply
- Monitoring something and acting when a condition is met

## Where they fall down

**Errors compound.** A single wrong step early can send the whole run in the wrong direction, and the agent will pursue it with the same confidence it applies to correct steps.

**Loops and stalling.** Agents get stuck repeating an action that is not working, or declare success without having achieved anything.

**Cost.** Every step consumes [tokens](/glossary/token), and a long run can consume a very large number of them.

**[Hallucination](/glossary/hallucination) does not disappear.** An agent can invent a fact, act on it, and then reason from the consequence as though it were established.

**Judgement is absent.** An agent does not know that a step is unusual, irreversible or a bad idea unless you told it.

## Guardrails, which are the whole practical question

Because an agent acts rather than suggests, the important design decisions are about limits, not capability.

- **Restrict what it can touch.** Read-only access wherever possible. An agent that can query a database is far safer than one that can modify it.
- **Require confirmation for anything irreversible.** Sending messages, spending money, deleting records, publishing anything. A human should approve each of these.
- **Cap the run.** Maximum steps, maximum spend, a hard timeout.
- **Log everything.** You need to be able to reconstruct what it did and why.
- **Sandbox it.** Give it a scratch environment rather than production access.
- **Never hand it credentials it does not need.** Financial account access in particular should not be delegated to an autonomous process.

## Practical notes for use in India

**Never let an agent transact.** Do not give an agent access to net banking, UPI, a trading account or a payment method. Even setting aside failure modes, an autonomous process moving money is a category of risk with no upside proportionate to it.

**Watch what it sends.** An agent with email or messaging access can send something on your behalf that you would not have sent. Approval before sending is the minimum sensible setting.

**Data protection applies.** An agent reading customer records and pushing them into a third-party AI service raises real obligations under the Digital Personal Data Protection Act. This is an organisational compliance question, not just a technical one.

**Verify factual output.** An agent that searched and cited sources is more reliable than one working from memory, but the summarising step can still distort. Check the sources it named.

## Where this is heading

Agents are improving quickly and are already genuinely useful for coding, research and structured data work. They remain unreliable enough that unsupervised operation on anything consequential is not yet reasonable.

The sensible current posture is to use them where the work is easy to verify and the cost of an error is low, and to keep a human approving anything that touches money, sends a message, or cannot be undone. They build on [prompt engineering](/glossary/prompt-engineering) for steering and on [generative AI](/glossary/generative-ai) for the underlying capability. Explore practical tools in our [AI tools directory](/ai-tools).`,
    faq: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot responds to one message at a time and stops. An agent is given a goal and works towards it across multiple steps, planning, calling tools such as web search or code execution, observing results and deciding what to do next. The difference is acting versus advising.",
      },
      {
        q: "Are AI agents safe to use?",
        a: "They are safe in proportion to what you let them touch. Read-only research agents carry little risk. Agents with access to email, payments, databases or production systems carry real risk, because errors compound and the agent has no judgement about what is irreversible. Require human approval for anything consequential.",
      },
      {
        q: "Can an AI agent manage my investments or make payments?",
        a: "It should not, and you should not give it the access to do so. Do not connect an agent to net banking, UPI, a trading account or a saved payment method. An autonomous process moving money carries a category of risk with no proportionate upside, whatever the tool claims.",
      },
      {
        q: "What tools can AI agents use?",
        a: "Typically web search and browsing, code execution, file reading and writing, database queries, calculators, and APIs for services such as email, calendars and internal systems. The tools define what the agent can actually do, since the underlying language model cannot browse, calculate reliably or affect anything on its own.",
      },
      {
        q: "Why do AI agents fail or get stuck?",
        a: "Errors compound: one wrong early step sends the whole run astray, and the agent pursues it confidently. They also loop on actions that are not working, declare success without achieving anything, and act on invented facts. Capping the number of steps and logging every action helps catch this.",
      },
      {
        q: "Do AI agents cost more than regular chatbots?",
        a: "Usually yes, sometimes considerably. Every step in an agent's loop consumes tokens for reasoning, tool calls and observations, so a single task can involve dozens of model calls. On subscription tools this appears as usage limits; on APIs it appears directly as cost, which is worth capping.",
      },
    ],
    related: ["large-language-model", "prompt-engineering", "generative-ai", "artificial-intelligence"],
    relatedHref: "/ai-tools",
    relatedLabel: "AI Tools Directory",
  },

  // -- Credit (borrowing mechanics) ---------------------------------------
  {
    slug: "foir",
    term: "FOIR",
    category: "Credit",
    short:
      "FOIR, or Fixed Obligation to Income Ratio, is the share of your monthly income already going to EMIs. Lenders cap it when sizing a new loan.",
    bodyMarkdown: `FOIR stands for Fixed Obligation to Income Ratio. It is the single number that decides how large a loan a bank will actually give you, and it is the reason two people on the same salary get very different sanction letters.

The calculation is deliberately simple. Add up every fixed monthly obligation you already carry, divide by your net monthly income, and express it as a percentage. A lender then checks whether adding the proposed new EMI would push that percentage past its internal ceiling.

Your [credit score](/glossary/credit-score) decides whether a lender will lend to you at all and at what rate. FOIR decides how much. Both have to clear before a loan is sanctioned.

## What counts as a fixed obligation

Lenders include existing home, car, personal, education and gold loan EMIs, credit card minimum dues or a notional percentage of the outstanding card balance, and any statutory or contractual commitment such as court-ordered maintenance. Most lenders also add the proposed new EMI itself, which is the whole point of the exercise.

What they usually exclude is ordinary living cost. Groceries, school fees, utilities and rent are typically not counted, though some lenders do treat rent as an obligation for a personal loan applicant who is not buying a house. This is exactly why FOIR is a lender's affordability test rather than yours. A 50% FOIR can look comfortable on paper and still leave a household with nothing left after school fees.

## Which income figure banks use

Almost always net take-home pay, not CTC. Employer PF, professional tax and TDS are stripped out first. Some lenders will add back a portion of stable variable pay, rental income or spouse income if the spouse is a co-applicant, and most discount irregular income such as commissions or freelance receipts to a conservative average of the last twelve to twenty-four months.

## A worked example

Take a salaried applicant with Rs 80,000 net take-home pay each month, an existing car loan EMI of Rs 12,000 and a personal loan EMI of Rs 6,000.

Current fixed obligations are Rs 18,000, so the existing FOIR is 18,000 divided by 80,000, which is 22.5%.

If the lender works to a 50% ceiling, total permitted obligations are Rs 40,000. Subtracting the Rs 18,000 already committed leaves headroom of Rs 22,000 a month for a new EMI.

At an interest rate of 9% over 20 years, an EMI of roughly Rs 900 services about Rs 1 lakh of principal, so Rs 22,000 supports a home loan of approximately Rs 24.5 lakh. Clearing the Rs 6,000 personal loan first would lift the headroom to Rs 28,000 and the eligible loan to roughly Rs 31 lakh, without the applicant earning a single rupee more.

Run your own version of this with the [home loan eligibility calculator](/calculators/home-loan-eligibility) and check the EMI at different tenures with the [EMI calculator](/calculators/emi).

## Typical FOIR bands

Ceilings are set by each lender rather than by regulation, and they move with income, employment type and product. The pattern below is the one applicants most commonly encounter.

| Monthly net income | Typical FOIR ceiling | Practical reading |
| --- | --- | --- |
| Below Rs 30,000 | 40% to 45% | Little room for a second loan |
| Rs 30,000 to Rs 60,000 | 45% to 50% | Standard salaried band |
| Rs 60,000 to Rs 1.5 lakh | 50% to 55% | Most home loan applicants sit here |
| Above Rs 1.5 lakh | 55% to 65% | Higher surplus after living costs |
| Self-employed | Often stricter | Assessed on ITR-declared income |

Treat these as indicative. Confirm the ceiling with the specific lender, because the difference between 45% and 55% on the same salary can change your sanction by several lakh rupees.

## How to improve your FOIR before applying

The fastest lever is closing or prepaying the smallest high-EMI loan, because FOIR responds to the monthly outflow rather than the outstanding balance. Paying off a Rs 40,000 credit card balance can remove a notional obligation worth far more than Rs 40,000 of eligibility.

The second lever is tenure. Stretching a home loan from 15 to 20 years cuts the EMI and therefore the FOIR, at the cost of considerably more total interest, so it buys eligibility rather than savings.

The third is adding an earning co-applicant, which raises the income side of the ratio. A spouse or parent with steady income can lift eligibility substantially, though they take on joint liability for the whole loan.

Finally, avoid taking any new credit in the six months before a large application. A new car loan taken two months before a home loan application reduces your eligible loan by many times the car loan's value.`,
    faq: [
      {
        q: "What is a good FOIR for a home loan in India?",
        a: "Most lenders want total fixed obligations, including the proposed EMI, to stay within 50% to 55% of net monthly income. Below 40% is comfortable and improves your negotiating position on rate. Applicants with high incomes are sometimes allowed 60% or more, because a large absolute surplus remains after the EMIs.",
      },
      {
        q: "Does FOIR use gross salary or take-home pay?",
        a: "Take-home pay in almost every case. Lenders start from net salary credited to your bank account after employer PF, professional tax and TDS, not CTC. Some will add back a share of stable variable pay, rental income or a co-applicant's salary, but the base figure is what actually reaches your account.",
      },
      {
        q: "Are credit card dues included in FOIR?",
        a: "Yes. Lenders typically count either the minimum amount due or a notional percentage of your outstanding card balance as a fixed obligation. This is why carrying a large revolving balance can quietly reduce your home loan eligibility by several lakh rupees even though no formal EMI exists.",
      },
      {
        q: "How can I increase my loan eligibility if my FOIR is too high?",
        a: "Close or prepay your smallest high-EMI loan first, since FOIR reacts to monthly outflow rather than balance. Then consider a longer tenure to reduce the EMI, or add an earning co-applicant to raise the income side. Avoid taking any new credit in the six months before applying.",
      },
      {
        q: "Is FOIR the same as debt-to-income ratio?",
        a: "They are close cousins. Debt-to-income ratio is the international term and is usually computed on gross income, while FOIR is the Indian lending term and is normally computed on net take-home pay. Both measure the same thing: how much of your income is already committed before the new loan starts.",
      },
      {
        q: "Do lenders count rent in FOIR?",
        a: "It varies. For a home loan the rent usually disappears once you move into the purchased property, so most lenders exclude it. For personal and car loans some lenders do include rent as a fixed obligation, particularly for applicants in expensive metros. Ask the specific lender rather than assuming.",
      },
    ],
    related: ["emi", "credit-score", "cibil-score", "amortisation"],
    relatedHref: "/calculators/home-loan-eligibility",
    relatedLabel: "Home Loan Eligibility Calculator",
  },
  {
    slug: "amortisation",
    term: "Amortisation",
    category: "Credit",
    short:
      "Amortisation is repaying a loan in equal instalments where each payment covers interest first, so the principal falls slowly at the start.",
    bodyMarkdown: `Amortisation is the schedule behind an [EMI](/glossary/emi). Your monthly payment stays the same for the life of the loan, but the split inside it changes every single month. Early on, most of the EMI is interest. Late on, most of it is principal.

Understanding this split is what turns a vague sense that "loans are expensive" into a decision you can act on, because it explains exactly why prepaying in year three is worth many times more than prepaying in year fifteen.

## How the split is calculated

Each month the lender charges interest on the outstanding balance at that moment. Whatever is left of your EMI after that interest is deducted goes to reducing the principal. Next month, the balance is slightly smaller, so the interest charge is slightly smaller, so slightly more of the same EMI goes to principal. The effect compounds gently in your favour, but it starts almost invisibly.

## A worked example on a Rs 50 lakh home loan

Take Rs 50,00,000 borrowed at 9% a year over 20 years. The EMI works out to roughly Rs 44,990.

In the first month, interest is the outstanding balance times the monthly rate: Rs 50,00,000 times 0.75%, which is Rs 37,500. Only about Rs 7,490 of that first EMI reduces the loan. Put differently, **83% of your first payment is pure interest**.

Twelve payments later you have paid roughly Rs 5.4 lakh and the outstanding balance has fallen by less than Rs 1 lakh. That is not a mistake and it is not a bad loan. It is simply what amortisation looks like.

The crossover, the month where principal repayment finally exceeds interest, arrives around year 12 of a 20-year loan at this rate. From there the balance falls quickly.

Over the full term you pay roughly Rs 1.08 crore for a Rs 50 lakh loan, so total interest is close to Rs 58 lakh, more than the amount borrowed. Test the same numbers at different tenures with the [EMI calculator](/calculators/emi).

## Why early prepayment is so powerful

A prepayment goes entirely to principal. In year three of the loan above, every Rs 1 lakh prepaid removes not just Rs 1 lakh of debt but every future interest charge that Rs 1 lakh would have generated for the remaining 17 years. In year eighteen the same Rs 1 lakh saves interest for only two years.

There are two ways a lender can apply a prepayment. **Reducing the tenure keeps the EMI the same and ends the loan sooner, which saves far more interest. Reducing the EMI keeps the tenure and lowers the monthly outflow, which helps cash flow but saves much less.** Ask which one your lender is applying, because the default is not always the one you want.

Under RBI rules, floating-rate home loans taken by individuals for non-business purposes cannot carry foreclosure or prepayment penalties. Fixed-rate loans and many business loans still can, so check your sanction letter.

## What an amortisation schedule shows

| Column | What it tells you |
| --- | --- |
| Opening balance | Principal outstanding at the start of the month |
| EMI | The fixed instalment, unchanged through the term |
| Interest portion | Opening balance times the monthly rate |
| Principal portion | EMI minus the interest portion |
| Closing balance | Opening balance minus the principal portion |

Ask your lender for this schedule at sanction and again after any rate change. For a home loan it is also the document you use at tax time, because the interest and principal columns map directly to the deductions you can claim.

## Where amortisation shows up beyond home loans

Car loans, personal loans, education loans and mortgages all amortise the same way. The shorter the tenure and the lower the rate, the less lopsided the early split becomes. A five-year personal loan at 14% still front-loads interest, but the crossover arrives in about year three rather than year twelve.

The two common loans that are **not** amortised this way are credit card revolving balances, where interest is charged daily on the full balance and a minimum payment can leave the principal untouched for years, and flat-rate loans priced on [simple interest](/glossary/simple-interest), where interest is calculated on the original amount for the whole tenure regardless of what you have repaid.

## The practical takeaway

Do not judge a loan by its EMI alone. Ask for the total interest over the term, ask what a Rs 1 lakh prepayment in year three would save, and ask whether prepayments cut the tenure or the EMI. Those three questions are worth more than a 0.1% rate negotiation.`,
    faq: [
      {
        q: "Why is most of my home loan EMI going to interest?",
        a: "Because interest is charged on the outstanding balance, which is at its largest in the early years. On a Rs 50 lakh loan at 9% over 20 years, about 83% of the first EMI is interest and only around Rs 7,500 reduces the principal. The split shifts steadily and principal overtakes interest around year 12.",
      },
      {
        q: "Should prepayment reduce my EMI or my tenure?",
        a: "Reducing the tenure saves considerably more interest, because you keep paying the same amount but for fewer months. Reducing the EMI helps monthly cash flow but leaves the loan running its full term. Lenders do not always apply the option you would prefer by default, so state it in writing.",
      },
      {
        q: "Is there a prepayment penalty on home loans in India?",
        a: "RBI rules bar foreclosure charges and prepayment penalties on floating-rate home loans taken by individuals for non-business purposes. Fixed-rate loans, loans to businesses and many personal and car loans can still carry charges, commonly a percentage of the amount prepaid. Check the sanction letter before you prepay.",
      },
      {
        q: "What is an amortisation schedule and how do I get one?",
        a: "It is a month-by-month table showing the opening balance, EMI, interest portion, principal portion and closing balance for the whole loan. Every lender must provide it, usually in net banking or on request, and you should ask for a fresh one after any interest rate reset so the figures match reality.",
      },
      {
        q: "Does a longer loan tenure mean I pay more interest?",
        a: "Substantially more. A longer tenure lowers the EMI, which is why lenders offer it to improve eligibility, but the balance stays high for longer and interest accrues on it every month. Moving a Rs 50 lakh loan from 20 years to 15 raises the EMI but cuts total interest by many lakhs.",
      },
      {
        q: "Do car loans and personal loans amortise the same way?",
        a: "Yes, when they are reducing-balance loans, which most bank personal and car loans are. The shorter tenure just makes the front-loading less extreme. Watch out for flat-rate or simple-interest loans from some dealers and NBFCs, where interest is charged on the original amount for the entire tenure.",
      },
    ],
    related: ["emi", "compound-interest", "simple-interest", "foir"],
    relatedHref: "/calculators/emi",
    relatedLabel: "EMI Calculator",
  },
  {
    slug: "credit-utilization",
    term: "Credit Utilisation",
    category: "Credit",
    short:
      "Credit utilisation is the share of your card limit you are using. Bureaus read it on your statement date, and under 30% protects your score.",
    bodyMarkdown: `Credit utilisation is the percentage of your available credit card limit that you are actually using. It is the second-largest input into an Indian [credit score](/glossary/credit-score) after payment history, contributing somewhere around a quarter to a third of the total, and it is by far the fastest input to change.

Payment history takes years to repair. Utilisation can move your score within two or three billing cycles, which makes it the first thing to fix before any large loan application.

## How it is measured, and the detail that trips everyone up

The formula is total balance divided by total limit across all your cards. Two cards with limits of Rs 2,00,000 and Rs 1,00,000 give you Rs 3,00,000 of available credit. A combined statement balance of Rs 1,20,000 is 40% utilisation.

Here is the part almost nobody knows: **bureaus see the balance reported on your statement date, not the balance after you pay the bill.** Your card issuer sends the statement figure to CIBIL, Experian, Equifax and CRIF High Mark. If you spend Rs 1,20,000, let the statement generate, and then pay in full before the due date, you paid no interest at all and still reported 40% utilisation to every bureau.

This is why people who never carry a balance and never miss a payment are sometimes puzzled by a score stuck in the low 700s.

## A worked example

Suppose you have the Rs 3,00,000 combined limit above and you typically run Rs 1,20,000 of monthly spending through your cards, paying in full every month.

Reported utilisation is 40%, which sits in the band that costs points.

Pay Rs 60,000 towards the balance a few days **before** the statement date rather than after it, and the reported balance falls to Rs 60,000, which is 20% utilisation. Your spending has not changed, your interest cost has not changed, and nothing has left your pocket that was not leaving anyway. Only the timing changed.

Do this consistently for two or three cycles and a 30 to 50 point improvement is a realistic expectation for a file that is otherwise clean.

## The bands lenders and bureaus react to

| Reported utilisation | Effect on score |
| --- | --- |
| Under 10% | Best band, the level associated with scores above 800 |
| 10% to 30% | Healthy, no meaningful drag |
| 30% to 50% | Noticeable drag, and lenders start reading credit hunger |
| 50% to 75% | Significant damage, unsecured approvals get harder |
| Above 75% | Severe, often read as financial stress regardless of payment record |
| 0% on every card | Not ideal either, since an unused card generates no positive data |

Per-card utilisation matters as well as the overall figure. Maxing one card to 95% while three others sit empty still hurts, so spread spending rather than concentrating it.

## Raising the denominator instead of cutting the numerator

Utilisation is a ratio, and the limit is the half most people ignore. Requesting a credit limit increase on an existing card lowers utilisation mechanically without changing a single spending habit. A limit review with your existing issuer is usually a soft enquiry, unlike a new card application which triggers a hard enquiry.

Raising the Rs 3,00,000 limit above to Rs 4,50,000 takes the same Rs 1,20,000 balance from 40% to 27% by itself.

The obvious trap is that a higher limit tempts higher spending. If that is a real risk for you, use the pay-before-statement method instead. It achieves the same reported number without adding temptation.

## Other things that move the number

Closing an old card removes its limit from the denominator and can push utilisation up sharply overnight, which is one of the two reasons closing your oldest card is usually a mistake. The other is the loss of credit history length.

Converting a large card balance into a personal loan also helps twice over: it moves the debt off the revolving line, and personal loan rates of 12% to 18% are far below typical card rates of 36% to 46%. See [personal loan versus credit card](/blog/personal-loan-vs-credit-card) for how that comparison usually plays out.

Checking your own utilisation or score is a soft enquiry and never damages anything, so check before a big application and give yourself two or three cycles to fix the number. The step-by-step version is in our [guide to checking and improving a CIBIL score](/blog/cibil-score-check-improve-guide).`,
    faq: [
      {
        q: "What is a good credit utilisation ratio in India?",
        a: "Below 30% is the standard target and below 10% is what files scoring above 800 typically show. Zero on every card is not ideal either, because an unused card generates no positive repayment data. Aim for consistent low single-digit or low double-digit usage rather than a single good month.",
      },
      {
        q: "Does paying my credit card in full every month fix utilisation?",
        a: "Not necessarily. Bureaus receive the balance shown on your statement date, not the balance after you pay. If your statement generates while the balance is high, that high figure is reported even though you clear it in full before the due date and pay no interest. Pay down before the statement date instead.",
      },
      {
        q: "How fast does credit utilisation affect my score?",
        a: "Faster than any other factor. Because the reported figure resets with each billing cycle, a sustained drop in utilisation often shows up in your score within two or three cycles, roughly two to three months. Payment history, by contrast, takes years of clean behaviour to repair.",
      },
      {
        q: "Will increasing my credit limit improve my score?",
        a: "Usually yes, provided your spending does not rise with it. A higher limit lowers utilisation mechanically. Request a limit review from an existing issuer, which is normally a soft enquiry, rather than opening a new card, which triggers a hard enquiry and shortens your average account age.",
      },
      {
        q: "Does credit utilisation include personal loans and home loans?",
        a: "No. Utilisation applies to revolving credit, which in practice means credit cards and overdraft lines. Term loans such as home, car, personal and education loans affect your score through payment history and credit mix instead, and they count towards FOIR when a lender assesses affordability.",
      },
      {
        q: "Does closing a credit card raise my utilisation?",
        a: "Yes, immediately. Closing a card removes its limit from your total available credit, so the same spending becomes a larger percentage. Closing your oldest card also eventually shortens your credit history. Keep old cards open with one small recurring charge paid automatically in full, unless a high annual fee makes it not worth holding.",
      },
    ],
    related: ["credit-score", "cibil-score", "credit-report", "loan-default"],
    relatedHref: "/credit-score",
    relatedLabel: "Credit Score Hub",
  },
  {
    slug: "credit-report",
    term: "Credit Report",
    category: "Credit",
    short:
      "A credit report is the full record a bureau holds on you: every loan and card, a month-by-month payment grid, and every enquiry.",
    bodyMarkdown: `A credit report is the underlying file. A [credit score](/glossary/credit-score) is a three-digit summary of that file. Lenders look at both, and when they decline an application that has a decent score, it is almost always because of something in the report rather than the number.

Four bureaus are licensed by the RBI in India: TransUnion CIBIL, Experian, Equifax and CRIF High Mark. Each builds its own report from data that banks, NBFCs and card issuers submit, and each does so on its own schedule. That is why your four reports will not be identical.

## What is actually inside the report

**Identity section.** Name, date of birth, PAN, Aadhaar reference where linked, addresses, phone numbers and employer details as reported by your lenders. Wrong entries here are the most common cause of someone else's account appearing on your file.

**Account section.** Every loan and credit card, open or closed, with the sanctioned amount, current balance, ownership type (sole, joint or guarantor) and account status. A guarantor entry matters: if you guaranteed a relative's loan, their missed payments sit on your report.

**Payment history grid.** A month-by-month record, usually covering the last 36 months, showing whether each account was paid on time or how many days it was overdue. This grid is the single heaviest input into the score.

**Enquiry section.** Every hard enquiry from a lender who pulled your report because you applied for credit, usually for the last one to two years. Checking your own report is a soft enquiry and does not appear here.

**Adverse flags.** Written-off, settled, suit-filed and wilful defaulter markers. These are the entries that block borrowing regardless of what the score says. A clean report at 730 routinely beats a 780 carrying a settlement.

## Score versus report, in practice

| What it is | Credit score | Credit report |
| --- | --- | --- |
| Format | One number, 300 to 900 | Multi-page document |
| What lenders use it for | Initial filter and pricing | Final underwriting decision |
| What you use it for | Tracking progress | Finding and fixing errors |
| Where errors are visible | Not visible at all | Fully visible |
| Free access | Widely available in bank apps | One free full report per bureau per year |

You cannot dispute a score. You can only dispute the entries in the report that produced it, which is why pulling the full report matters more than tracking the number.

## Getting yours free

Every RBI-licensed bureau must give you **one free full credit report per calendar year** on request through its own consumer portal. Because there are four bureaus, that is four free full reports a year if you stagger them, which is enough to check quarterly.

Bank apps and consumer finance apps also show a bureau score, often continuously and at no charge. Those are convenient for tracking but they usually show a summary rather than the full report, and the apps are lead-generation businesses for loan offers. Use them to monitor, and go to the bureau portal when you need the actual document.

Every one of these checks is a soft enquiry. Checking your own report can never reduce your score, no matter how often you do it.

## Disputing an error

Bureau errors are common in India, and a corrected error can add points immediately with no change in behaviour. The usual offenders are a closed loan still showing as active, a late marker on a payment you made on time, an account you never opened, a duplicate entry of the same loan, and a loan settled in full but flagged as "settled" rather than "closed".

File the dispute through the bureau's online dispute portal with supporting documents such as the loan closure letter or NOC. **The bureau is required to investigate and respond, typically within 30 days.** It contacts the lender, and if the lender confirms the correction the report is updated. If the lender disputes your version, escalate to the lender's grievance officer and then to the RBI Ombudsman scheme.

Keep the NOC every time you close a loan, then verify a month later that the bureau reflects it. That single habit prevents most of the disputes people end up filing years later.

## When to check

Pull all four reports at least once a year as a routine, and always **three to six months before a large loan application** so there is time for a dispute to run its 30-day course. Applying with an uncorrected error costs you either the loan or a worse rate, and both are avoidable.`,
    faq: [
      {
        q: "How can I get my credit report free in India?",
        a: "Every RBI-licensed bureau, meaning CIBIL, Experian, Equifax and CRIF High Mark, must provide one free full credit report per calendar year through its consumer portal. Staggering the four gives you roughly quarterly coverage at no cost. Bank apps also show a score continuously, though usually as a summary rather than the full report.",
      },
      {
        q: "What is the difference between a credit score and a credit report?",
        a: "The report is the full file: every account, a month-by-month payment grid, all enquiries and any adverse flags. The score is a single number summarising it. Lenders filter on the score but underwrite on the report, which is why a clean file at 730 often beats a 780 carrying a settlement flag.",
      },
      {
        q: "How do I dispute an error on my credit report?",
        a: "Raise it through the bureau's online dispute portal with supporting documents such as a loan closure letter or NOC. The bureau contacts the lender and is required to investigate and respond, typically within 30 days. If the lender disputes your version, escalate to its grievance officer and then to the RBI Ombudsman scheme.",
      },
      {
        q: "How long does negative information stay on an Indian credit report?",
        a: "The detailed payment grid normally covers the last 36 months, while accounts and serious events such as write-offs, settlements and suit-filed flags remain visible for several years. You cannot have accurate negative information removed. Its weight fades with time and a consistent record of on-time payments afterwards.",
      },
      {
        q: "Why is my CIBIL report different from my Experian report?",
        a: "Lenders report to each bureau on their own schedule and not every lender reports to all four. Combined with different scoring models, a 30 to 50 point gap between bureaus is normal. Since you cannot control which bureau a lender pulls, check all four before a major application.",
      },
      {
        q: "Does checking my own credit report lower my score?",
        a: "No. Checking your own report is a soft enquiry, it is recorded separately from lender enquiries, and it has no effect on the score however often you do it. Only hard enquiries, generated when you formally apply and a lender pulls your file, can reduce it.",
      },
    ],
    related: ["credit-score", "cibil-score", "credit-utilization", "loan-default"],
    relatedHref: "/blog/cibil-score-check-improve-guide",
    relatedLabel: "Check and Improve Your CIBIL Score",
  },
  {
    slug: "loan-default",
    term: "Loan Default",
    category: "Credit",
    short:
      "A default is a lender formally recognising that you have stopped repaying. In India an account is usually classed as an NPA after 90 days.",
    bodyMarkdown: `A default is not the same as a late payment, and the difference matters enormously. A payment that lands a week after the due date is a delinquency: it costs you a late fee, some interest and a mark on your [credit report](/glossary/credit-report). A default is the point at which the lender stops treating the account as performing and starts treating it as a loss to be recovered.

Under RBI norms, a loan account is generally classified as a **non-performing asset once payment is overdue for more than 90 days**. That is the threshold most lenders work to, and it is the line between a problem you can quietly fix and one that follows you for years.

## The stages before a default

**1 to 30 days overdue.** A late fee is charged, penal interest may apply, and the account is reported as 30 days past due in the bureau payment grid. This alone can cost 50 to 80 score points. Collection calls usually begin.

**31 to 60 days.** The account is reported as 60 days past due. Contact from the lender becomes more insistent and a field visit may be arranged.

**61 to 90 days.** Reported as 90 days past due. This is the last window in which a normal payment restores the account to standard classification without a lasting flag.

**Beyond 90 days.** The account is classified as an NPA. Recovery action begins in earnest, and the report starts carrying markers that no future lender will overlook.

## What appears on your report afterwards

| Flag | What it means | How lenders read it |
| --- | --- | --- |
| Days past due | Payment late by 30, 60 or 90 days | A warning, recoverable with clean behaviour |
| Sub-standard or doubtful | Lender's internal NPA grading | Serious, unsecured credit becomes hard to get |
| Settled | You paid less than owed and the lender accepted | Severe, blocks mainstream borrowing for years |
| Written off | Lender gave up on recovery | Among the worst markers on a file |
| Suit filed | Lender has gone to court | Effectively closes mainstream credit |
| Wilful defaulter | Lender says you could pay and chose not to | The most serious classification in Indian lending |

**"Settled" is the flag people walk into by accident.** A collections agent offering to "close" a Rs 5 lakh outstanding for Rs 3 lakh sounds like relief. It is recorded as a settlement, which tells every future lender that you did not repay in full, and it can block borrowing for years. Where you can, negotiate a repayment plan that ends in full closure rather than a settlement, and get the closure in writing with an NOC.

## What the lender can actually do

For an **unsecured** loan or credit card, the lender has no asset to seize. It can charge penal interest, report you to the bureaus, use recovery agents within the RBI's rules on conduct and calling hours, and eventually file a civil suit or a proceeding under the negotiable instruments law if a cheque bounced.

For a **secured** loan, the lender can enforce the collateral. Under the SARFAESI Act, a secured creditor can issue a 60-day demand notice on an NPA account and, if unpaid, take possession of and sell the mortgaged property without a court order for qualifying loans. A gold loan lender can auction the pledged gold after due notice. A car financier can repossess the vehicle. This is the core practical difference explained in [secured versus unsecured loans](/glossary/secured-vs-unsecured-loan).

Borrowers retain real protections. Recovery agents must identify themselves, cannot use intimidation, and are restricted on when and how they may contact you. Complaints go to the lender's grievance officer and then to the RBI Ombudsman.

## A worked example of the cost

Suppose you carry a Rs 5,00,000 personal loan at 15% with an EMI of about Rs 12,000 and you stop paying.

By day 90 you have missed three EMIs of Rs 12,000, roughly Rs 36,000, plus late fees and penal interest that commonly add 2% to 3% a month on the overdue amount. The account becomes an NPA. Your score may fall by 100 points or more, and the flag remains visible for years.

The knock-on cost is larger than the arrears. With an NPA on file, a Rs 50 lakh home loan two years later either gets declined or gets priced 1% to 1.5% higher. On a 20-year loan that is several lakh rupees of extra interest, so a Rs 36,000 shortfall becomes a multi-lakh problem.

## What to do if you are heading towards default

Talk to the lender before the 90-day line, not after. Restructuring, a tenure extension, an EMI moratorium or a temporary interest-only period are all things banks would rather do than write a loan off, and all of them are far less damaging than an NPA classification.

If the pressure comes from card debt at 36% to 46%, converting it to a personal loan at 12% to 18% often makes the EMI survivable. And protect the emergency fund that exists precisely for this: see the [budgeting hub](/budgeting) for how to size one before it is needed.`,
    faq: [
      {
        q: "After how many missed EMIs is a loan considered a default in India?",
        a: "Under RBI norms a loan account is generally classified as a non-performing asset once a payment is overdue by more than 90 days, which usually means three consecutive missed EMIs. Earlier misses are reported as 30 or 60 days past due and already damage the score, but the 90-day mark is the formal line.",
      },
      {
        q: "How long does a loan default stay on my credit report?",
        a: "Default-related markers such as written-off, settled and suit-filed entries remain visible on your report for several years, considerably longer than the 36-month payment grid. You cannot have accurate negative information removed. Its weight fades gradually as newer on-time payments accumulate, but no legitimate service can delete it.",
      },
      {
        q: "Is settling a loan the same as closing it?",
        a: "No, and the difference is severe. Closure means you repaid in full and receive an NOC. A settlement means the lender accepted less than owed, and it is flagged as such on your report, telling every future lender you did not repay fully. Where possible negotiate a repayment plan ending in full closure instead.",
      },
      {
        q: "Can a bank seize my property if I default on a personal loan?",
        a: "Not directly, because a personal loan is unsecured and no asset is pledged. The lender can charge penal interest, report the default, use recovery agents within RBI conduct rules and eventually file a civil suit. Only secured loans allow enforcement of specific collateral, such as SARFAESI action on a mortgaged property.",
      },
      {
        q: "What should I do if I cannot pay my EMI this month?",
        a: "Contact the lender before the payment is missed rather than after. Restructuring, extending the tenure, a short moratorium or a temporary interest-only period are all outcomes banks prefer to a write-off. Getting the arrangement in writing keeps the account performing and avoids a lasting flag on your report.",
      },
      {
        q: "Can I get a loan after a default?",
        a: "Yes, though it takes time and usually starts with secured borrowing. A loan against a fixed deposit, a gold loan or a secured credit card issued against an FD depends far more on the collateral than the score. Twelve to twenty-four months of clean repayment on such an account rebuilds a file that mainstream lenders will look at.",
      },
    ],
    related: ["credit-report", "credit-score", "secured-vs-unsecured-loan", "emi"],
    relatedHref: "/credit-score",
    relatedLabel: "Credit Score Hub",
  },
  {
    slug: "secured-vs-unsecured-loan",
    term: "Secured vs Unsecured Loan",
    category: "Credit",
    short:
      "A secured loan is backed by an asset the lender can seize, such as a house or gold. An unsecured loan is backed only by your income and credit record.",
    bodyMarkdown: `Every loan in India falls into one of two families, and which family it belongs to explains almost everything about its interest rate, its approval odds and what happens if you cannot pay.

A **secured loan** is backed by collateral: a specific asset the lender has a legal charge over and can sell if you default. A **home loan**, car loan, gold loan, loan against property and loan against a fixed deposit are all secured.

An **unsecured loan** has no collateral behind it. The lender's only protection is your promise to repay, assessed through your income and your [credit report](/glossary/credit-report). Personal loans, credit cards, most education loans below a threshold, consumer durable loans and business loans without collateral sit here.

## Why the rate gap is so wide

When a lender can seize an asset, its loss on a default is limited to the shortfall after selling the asset. When it cannot, a default means losing the entire outstanding amount. That risk difference is priced directly into the interest rate, and the gap in India is large.

| Feature | Secured loan | Unsecured loan |
| --- | --- | --- |
| Typical rate range | 8% to 12% for home loans, higher for gold and LAP | 11% to 18% for personal loans, 36% to 46% on card revolving balances |
| Loan size | Driven by asset value, often Rs 50 lakh and above | Usually capped, commonly Rs 25 lakh or less |
| Tenure | Up to 20 to 30 years | Typically 1 to 5 years |
| Approval speed | Slower, needs valuation and title checks | Fast, sometimes within hours |
| Credit score sensitivity | Lower, the asset carries the risk | High, often the deciding factor |
| Consequence of default | Lender can enforce and sell the collateral | Recovery action, legal proceedings, no specific asset seized |
| Paperwork | Heavy, including title and valuation documents | Light, mostly income proof and KYC |

The practical implication is simple. If you have an asset to pledge, borrowing against it is nearly always cheaper. If you do not, you are paying for the lender's uncertainty about you.

## A worked example

Take a household needing Rs 10,00,000 for a medical emergency, with property they could pledge.

An unsecured personal loan at 15% over 5 years carries an EMI of roughly Rs 23,790 and total interest of about Rs 4.27 lakh.

A loan against property at 10% over the same 5 years carries an EMI of roughly Rs 21,250 and total interest of about Rs 2.75 lakh. That is around **Rs 1.5 lakh saved on the same borrowing**.

The trade-off is not free. The property is now encumbered, the loan takes weeks rather than days to arrange, there are valuation and legal charges, and a default puts the home itself at risk rather than just the credit file. For a short-term need with a clear repayment path, many households reasonably choose the costlier unsecured loan precisely to keep the house out of the equation. Model both with the [EMI calculator](/calculators/emi).

## Where a low credit score changes the answer

Below roughly 650, mainstream lenders decline unsecured credit outright, but secured borrowing often remains available because the collateral, not the score, carries the risk. A gold loan, a loan against a fixed deposit and a secured credit card issued against an FD are the three routes that usually stay open.

That last one is also the standard way to rebuild. A secured credit card reports to bureaus exactly like a normal card, so twelve months of low [credit utilisation](/glossary/credit-utilization) and on-time payments builds a file that mainstream lenders will look at again.

## What happens on default in each case

For secured loans, the lender enforces the collateral. Under the SARFAESI Act a secured creditor can issue a demand notice on a non-performing account and, after the statutory notice period, take possession of and sell mortgaged property for qualifying loans without going to court. A gold loan lender can auction pledged gold after due notice.

For unsecured loans the lender must pursue you rather than an asset: penal interest, bureau reporting, recovery agents operating within RBI conduct rules, and eventually a civil suit. Slower for the lender, but it does not cost you your home. Either path leaves lasting marks, as covered under [loan default](/glossary/loan-default).

## Choosing between them

Ask three questions. First, is the need genuinely worth the cheaper rate given the paperwork and the timeline? Second, is the repayment plan robust enough that you are comfortable putting the asset behind it? Third, does your [FOIR](/glossary/foir) leave room for the EMI at all, because neither type of loan is affordable if the monthly outflow does not fit.

For anything you can repay within a year or two, the rate difference is often smaller in rupees than it looks in percentages, and keeping the asset unencumbered has real value.`,
    faq: [
      {
        q: "Which is better, a secured or an unsecured loan?",
        a: "Secured loans are cheaper, larger and longer, so they win on cost whenever you have an asset to pledge and time to complete the paperwork. Unsecured loans win on speed and on keeping your assets free of any charge. For short-term needs the rate gap in rupees is often smaller than it appears in percentage terms.",
      },
      {
        q: "Is a personal loan secured or unsecured?",
        a: "Unsecured. No collateral is pledged, so approval rests entirely on your income and credit record, which is why rates typically run 11% to 18% against 8% to 12% for a home loan. It also means a lender cannot seize a specific asset if you default, though it can still pursue recovery and legal action.",
      },
      {
        q: "Can I get a secured loan with a low CIBIL score?",
        a: "Often yes. Because the collateral carries the risk, gold loans, loans against a fixed deposit and loans against property remain available well below the roughly 650 mark where unsecured credit gets declined. Terms will be less favourable, but the asset makes approval far less dependent on the score.",
      },
      {
        q: "What can a lender do if I default on a secured loan?",
        a: "Enforce the collateral. Under the SARFAESI Act a secured creditor can issue a demand notice on a non-performing account and, after the statutory notice period, take possession of and sell mortgaged property for qualifying loans without a court order. A gold loan lender can auction the pledged gold after due notice.",
      },
      {
        q: "Are education loans secured or unsecured?",
        a: "It depends on the amount. Indian banks commonly lend smaller education loans without collateral against a co-applicant's income, and require tangible security above a higher threshold. The exact cut-offs vary by bank and by whether the course is in India or abroad, so confirm the current policy with the specific lender.",
      },
      {
        q: "Does a secured loan build credit the same way as an unsecured one?",
        a: "Yes. Both report to the bureaus with the same payment grid, and holding a healthy mix of secured and unsecured credit slightly helps the credit mix component of the score. A secured credit card issued against a fixed deposit reports exactly like a normal card, which is why it is the standard rebuilding tool.",
      },
    ],
    related: ["emi", "foir", "loan-default", "credit-score"],
    relatedHref: "/loans",
    relatedLabel: "Loans Hub",
  },
  {
    slug: "simple-interest",
    term: "Simple Interest",
    category: "Banking",
    short:
      "Simple interest is calculated only on the original principal, never on interest already earned. It is principal times rate times time.",
    bodyMarkdown: `Simple interest is the more basic of the two ways interest is calculated. It applies only to the original principal for the whole term, and interest already earned never earns anything further.

The formula is:

**Simple interest = Principal times Rate times Time, divided by 100**, where rate is per year and time is in years.

Its counterpart, [compound interest](/glossary/compound-interest), adds each period's interest back to the balance so the next period's interest is charged on a larger amount. That single difference is why simple interest is a poor deal when you are saving and, deceptively, an expensive deal when you are borrowing.

## A worked example on savings

Invest Rs 1,00,000 at 8% a year for 10 years.

Under simple interest you earn Rs 8,000 every year without variation. Over 10 years that is Rs 80,000, and the total value is Rs 1,80,000.

Under annual compounding, the same Rs 1,00,000 at 8% grows to roughly Rs 2,15,890, so interest earned is about Rs 1,15,890.

The gap is roughly **Rs 35,890 on the identical rate and term**, and it widens sharply with time. Over 20 years the simple interest total is Rs 2,60,000 while compounding reaches about Rs 4,66,000. Test this with the [compound interest calculator](/calculators/compound-interest).

## Where you actually meet simple interest in India

Genuine simple interest is rarer than people assume, but it appears in several places worth recognising.

Savings account interest is calculated on the daily closing balance and typically **credited quarterly**, at which point it starts earning too, so it is effectively compounded quarterly rather than simple.

Most bank fixed deposits compound quarterly. However, a **non-cumulative FD**, where interest is paid out monthly or quarterly instead of being reinvested, behaves like simple interest from the depositor's point of view, because the payout never joins the principal. This is a real and reasonable choice for retirees who need the income, but it is important to know it earns less than the cumulative option over the same term.

Short-term loans of under a year, some corporate fixed deposits, certain post office instruments and many informal loans are also quoted on a simple interest basis.

## The flat rate trap on car and consumer loans

This is where simple interest costs borrowers real money. Some dealers, consumer finance companies and NBFCs quote a **flat rate**, where interest is computed on the original loan amount for the entire tenure even though your outstanding balance falls every month.

Take a Rs 2,00,000 car loan quoted at "8% flat" over 5 years.

Interest is Rs 2,00,000 times 8% times 5, which is Rs 80,000. Total repayment is Rs 2,80,000, so the EMI is Rs 2,80,000 divided by 60, which is Rs 4,667.

That looks cheap next to a bank quoting 14%. It is not. By the final year you owe only a fraction of the original Rs 2,00,000, yet you are still being charged interest as though the full amount were outstanding. The equivalent reducing-balance rate on that EMI is roughly **14.2%, close to double the quoted flat rate**.

| Basis | Quoted rate | What interest is charged on | EMI on Rs 2 lakh over 5 years |
| --- | --- | --- | --- |
| Flat or simple | 8% | The original Rs 2,00,000, every month | About Rs 4,667 |
| Reducing balance | 14.2% | The falling outstanding balance | About Rs 4,667 |

The two rows describe the same loan. **A flat rate roughly doubles when converted to a reducing-balance rate**, so always ask for the reducing-balance or annual percentage rate before comparing offers, and check the EMI itself with the [car loan EMI calculator](/calculators/car-loan-emi) rather than trusting the headline percentage.

## The rule of thumb worth remembering

You want compounding on money you are saving and reducing-balance calculation on money you are borrowing. Any product that offers you the reverse is doing so because the reverse is cheaper for the institution.

When you are shown a rate, ask one question: is interest charged on the original amount or on what I still owe? The answer changes the true cost by nearly a factor of two, and it is the fastest way to compare two loans that look nothing alike on paper. The mechanics of the alternative are covered under [amortisation](/glossary/amortisation).`,
    faq: [
      {
        q: "What is the simple interest formula?",
        a: "Simple interest equals principal multiplied by the annual rate multiplied by time in years, divided by 100. On Rs 1,00,000 at 8% for 10 years that is Rs 80,000 of interest, paid at a flat Rs 8,000 a year, because the interest already earned never itself earns anything further.",
      },
      {
        q: "Do Indian banks use simple or compound interest on fixed deposits?",
        a: "Most bank fixed deposits compound quarterly, which is why the effective yield is slightly above the quoted rate. A non-cumulative FD that pays interest out monthly or quarterly behaves like simple interest for the depositor, since the payout never joins the principal, and therefore earns less over the same term.",
      },
      {
        q: "What is a flat interest rate on a car loan?",
        a: "A flat rate charges interest on the original loan amount for the entire tenure, even though your outstanding balance falls every month. It sounds far cheaper than it is. An 8% flat rate over five years works out to roughly 14.2% on a reducing-balance basis, close to double the quoted figure.",
      },
      {
        q: "Is simple interest better than compound interest?",
        a: "It depends which side you are on. For money you are saving, compounding is clearly better because earned interest starts earning too. For money you are borrowing, you want interest charged on the falling outstanding balance rather than on the original amount, which is what a reducing-balance loan does.",
      },
      {
        q: "How do I convert a flat rate to a reducing-balance rate?",
        a: "As a rough guide, multiply the flat rate by about 1.8 to 1.9 for a typical multi-year loan. The precise figure depends on the tenure. Rather than estimating, ask the lender for the annual percentage rate or the reducing-balance rate in writing, which lenders are expected to disclose.",
      },
      {
        q: "Does a savings account pay simple interest?",
        a: "Not quite. Interest is calculated on the daily closing balance but is typically credited to the account quarterly, and once credited it starts earning too. That makes it effectively quarterly compounding rather than true simple interest, though at typical savings rates the difference over a year is small.",
      },
    ],
    related: ["compound-interest", "emi", "amortisation", "fixed-deposit"],
    relatedHref: "/calculators/compound-interest",
    relatedLabel: "Compound Interest Calculator",
  },

  // -- Gold ---------------------------------------------------------------
  {
    slug: "sovereign-gold-bond",
    term: "Sovereign Gold Bond",
    category: "Investing",
    short:
      "A Sovereign Gold Bond is a government security denominated in grams of gold that pays 2.5% annual interest over an 8-year term.",
    bodyMarkdown: `A Sovereign Gold Bond, or SGB, is a government security whose value is denominated in grams of gold. You are not buying metal, you are buying a bond issued by the Reserve Bank of India on behalf of the Government of India whose redemption value moves with the gold price.

It was designed to solve a specific Indian problem: households buying physical gold as an investment and losing 8% to 25% of the value to making charges, plus storage cost and purity risk. An SGB removes all three.

## What makes it different from every other gold option

The defining feature is the **2.5% annual interest, paid half-yearly on the original issue value**. Physical gold, [gold ETFs](/glossary/gold-etf) and [digital gold](/glossary/digital-gold) all pay nothing. Gold sitting in a locker generates no income at all. An SGB pays you to hold it while still giving you the full price movement of the metal.

There are no making charges, no storage cost, no insurance to arrange and no purity question. The bond is a book entry, held in your demat account or as a certificate.

## Term, exit and how the money actually works

The tenure is **8 years**, with an option to redeem early from the end of the fifth year on an interest payment date. Bonds are also listed on the stock exchanges, so a demat-held bond can be sold before that, though secondary market liquidity has often been thin and the price can trade at a discount to the underlying gold value.

Redemption value at maturity is based on the prevailing price of gold at that time, calculated on a published average, and is paid in rupees. You never receive physical gold.

## A worked example

Suppose you subscribe to 50 grams at an issue price of Rs 6,000 per gram, so an outlay of Rs 3,00,000.

The 2.5% coupon is calculated on that Rs 3,00,000, giving Rs 7,500 a year, paid as Rs 3,750 every six months. Over the full 8 years that is Rs 60,000 of interest, or 20% of the amount invested, entirely separate from what gold does.

If gold at maturity is worth Rs 9,000 per gram, the 50 grams redeem at Rs 4,50,000. Your total return is Rs 4,50,000 plus Rs 60,000 of interest against Rs 3,00,000 invested.

The same 50 grams bought as jewellery would have cost noticeably more upfront because of making charges, paid nothing along the way, and been sold at a discount for those same making charges. That gap, not the gold price, is the argument for the instrument.

## The tax treatment, which is the other headline

**Capital gains arising on redemption of an SGB at maturity are exempt from tax for individual investors.** This is a genuinely unusual concession and the strongest single reason to hold to term.

The 2.5% interest is fully taxable as income at your slab rate, and is not exempt.

If you sell on the exchange before maturity rather than redeeming, the exemption does not apply and normal [capital gains](/glossary/capital-gains) rules do. Because tax rules on gold and on listed securities have been changed in recent Budgets, verify the current position on incometax.gov.in before you sell.

## How SGBs compare with the other ways to own gold

| Feature | SGB | Gold ETF | Digital gold | Physical gold |
| --- | --- | --- | --- | --- |
| Extra income | 2.5% a year | None | None | None |
| Upfront cost | None beyond issue price | Brokerage plus expense ratio | GST plus a buy-sell spread | Making charges of 8% to 25% |
| Storage and purity risk | None | None | Held by provider | Yours to manage |
| Exit | Maturity at 8 years, early exit from year 5, or sell on exchange | Sell on exchange any trading day | Sell back to the provider | Sell to a jeweller at a discount |
| Regulator | RBI and Government of India | SEBI | Not directly regulated | Not applicable |

## The one practical catch

New SGB tranches are announced by the RBI and there is often no tranche open at a given moment. **Check the RBI website for whether a fresh issue is available before assuming you can subscribe.** When none is open, the alternatives are buying existing bonds on the exchange, which may trade at a discount and in small volume, or using a gold ETF instead.

For how gold fits alongside equity and debt in a portfolio at all, see [asset allocation](/glossary/asset-allocation) and our [gold investment guide](/blog/gold-investment-guide-india).`,
    faq: [
      {
        q: "What is the interest rate on Sovereign Gold Bonds?",
        a: "2.5% a year, paid half-yearly and calculated on the original issue value rather than the current gold price. On a Rs 3,00,000 subscription that is Rs 7,500 a year, or Rs 3,750 every six months. This income is fully taxable at your slab rate and is separate from any gain on the gold price itself.",
      },
      {
        q: "Are Sovereign Gold Bonds tax free?",
        a: "Partly. Capital gains arising on redemption at maturity are exempt from tax for individual investors, which is the scheme's biggest advantage. The 2.5% interest, however, is fully taxable at your slab rate. If you sell on the exchange before maturity instead of redeeming, normal capital gains rules apply rather than the exemption.",
      },
      {
        q: "Can I exit a Sovereign Gold Bond before 8 years?",
        a: "Yes, in two ways. You can redeem early from the end of the fifth year on an interest payment date, or sell on the stock exchange at any time if the bond is held in demat form. Exchange liquidity has often been thin and bonds can trade at a discount to the underlying gold value.",
      },
      {
        q: "Are new SGB tranches still being issued?",
        a: "Issuance depends on tranches announced by the RBI, and there is frequently no tranche open at a given time. Check rbi.org.in for the current position rather than assuming you can subscribe. When nothing is open, the alternatives are buying existing bonds on the exchange or using a gold ETF.",
      },
      {
        q: "SGB or gold ETF, which is better?",
        a: "For an eight-year horizon, SGBs are hard to beat because of the 2.5% coupon and the maturity gains exemption. Gold ETFs win on flexibility, since you can buy and sell any trading day at close to the market price, and they are always available whereas SGB tranches are not.",
      },
      {
        q: "Do I get physical gold when an SGB matures?",
        a: "No. Redemption is settled in rupees based on the prevailing gold price at maturity, calculated on a published average. The bond is a government security denominated in grams of gold, not a claim on metal, which is precisely why it carries no storage cost, insurance requirement or purity risk.",
      },
    ],
    related: ["gold-etf", "digital-gold", "capital-gains", "asset-allocation"],
    relatedHref: "/gold",
    relatedLabel: "Gold Investment Hub",
  },
  {
    slug: "gold-etf",
    term: "Gold ETF",
    category: "Investing",
    short:
      "A gold ETF is an exchange-listed mutual fund unit tracking the domestic gold price, backed by physical gold held with a custodian.",
    bodyMarkdown: `A gold exchange-traded fund is a SEBI-regulated mutual fund scheme that holds physical gold and issues units that trade on the stock exchange like a share. One unit typically represents a small, fixed quantity of gold, commonly one gram or a fraction of it, and the unit price tracks the domestic gold price closely.

You get the price exposure of gold without a locker, without making charges and without any question about purity, because the gold backing the scheme is held in vaults by a custodian and is subject to periodic audit.

## How buying and selling actually works

You need a demat account and a trading account, exactly as you would for a share. During market hours you place a buy order, the units settle into your demat account, and you can sell them on any trading day at the prevailing market price.

Two costs apply. **Brokerage** on each trade, which is whatever your broker charges, and the scheme's **expense ratio**, deducted daily from the fund's assets, typically in the region of 0.4% to 0.8% a year for Indian gold ETFs. The [expense ratio](/glossary/expense-ratio) is not billed to you separately, it quietly reduces the [NAV](/glossary/nav).

There is also a small **tracking difference**. Because of expenses and cash held for redemptions, the fund's return is normally a fraction below the pure gold price. This is expected and is not a sign of a bad fund, but a fund with a persistently large tracking difference is worth avoiding.

## Gold ETF versus gold fund of funds

Many people conflate these. A **gold ETF** requires a demat account and is bought on the exchange. A **gold fund of funds** is a regular mutual fund scheme that invests in a gold ETF, needs no demat account, can be bought directly from the fund house and supports a monthly [SIP](/glossary/sip). It carries the underlying ETF's expense ratio plus its own small layer on top.

If you want to accumulate gold monthly without a broker, the fund of funds is usually the more practical route. If you want the lowest cost and already have a demat account, the ETF wins.

## A worked example

Suppose you invest Rs 1,00,000 in a gold ETF where each unit represents one gram and the price per unit is Rs 6,200. You get roughly 16.1 units after brokerage.

If gold rises 12% over the next year, the units are worth about Rs 1,12,000 before costs. Subtract an expense ratio of, say, 0.5%, and roughly Rs 560 is absorbed, leaving about Rs 1,11,440 before tax and exit brokerage.

Compare that with buying 16 grams of 22 carat jewellery. At a making charge of 12% you would have paid roughly Rs 12,000 extra at purchase, and a jeweller buying it back would typically not return those making charges. Gold would need to rise substantially just to reach break-even. That gap is the entire practical case for holding gold in paper form.

## How it compares with the alternatives

| Feature | Gold ETF | SGB | Digital gold | Physical gold |
| --- | --- | --- | --- | --- |
| Regulator | SEBI | RBI and Government of India | Not directly regulated | Not applicable |
| Extra income | None | 2.5% a year | None | None |
| Ongoing cost | Expense ratio of roughly 0.4% to 0.8% | None | Storage free only for a limited period | Locker and insurance |
| Entry cost | Brokerage | None beyond issue price | GST plus a buy-sell spread | Making charges of 8% to 25% |
| Liquidity | Any trading day | Maturity, year 5 exit, or thin exchange market | Sell back to the provider | Sell to a jeweller at a discount |
| Needs demat | Yes, unless using a fund of funds | Optional | No | No |

## Tax, and why you must check the current rule

The taxation of gold ETFs and gold funds in India has been changed more than once in recent Budgets, and the treatment can depend on when the units were purchased. Rather than relying on any figure quoted online, confirm the applicable holding period and rate for your purchase date on incometax.gov.in or with a tax adviser before you sell. The general framework is covered under [capital gains](/glossary/capital-gains).

## How much gold to hold at all

Gold pays no dividend, no rent and no coupon. Its role in a portfolio is diversification rather than growth: it has historically held value when equity has fallen, which is why a modest allocation, commonly discussed in the 5% to 15% range, is a defensible position rather than a bet. See [asset allocation](/glossary/asset-allocation) for how that decision fits with everything else, and the [gold hub](/gold) for the full comparison.`,
    faq: [
      {
        q: "Do I need a demat account to buy a gold ETF?",
        a: "For a gold ETF, yes, because units trade on the stock exchange like shares. If you would rather not open one, a gold fund of funds is a regular mutual fund that invests in a gold ETF, needs no demat account, can be bought directly from the fund house and supports a monthly SIP.",
      },
      {
        q: "What are the charges on a gold ETF in India?",
        a: "Two. Brokerage on each buy and sell trade, set by your broker, and the scheme's expense ratio, typically around 0.4% to 0.8% a year, which is deducted daily from the fund's assets and shows up as a slightly lower NAV rather than a separate bill. A small tracking difference against the gold price is normal.",
      },
      {
        q: "Is a gold ETF safer than physical gold?",
        a: "On the risks people usually worry about, yes. There is no theft or storage risk, no purity uncertainty and no making charge loss on exit, and the scheme is SEBI-regulated with gold held by a custodian and periodically audited. You still carry the full price risk of gold itself, which can fall substantially.",
      },
      {
        q: "Gold ETF or Sovereign Gold Bond, which should I choose?",
        a: "For an eight-year horizon SGBs are usually better, because of the 2.5% annual coupon and the exemption on capital gains at maturity. Gold ETFs win when you want to buy or sell on any trading day, when no SGB tranche is open, or when the horizon is shorter than five years.",
      },
      {
        q: "How is a gold ETF taxed in India?",
        a: "The rules for gold ETFs and gold funds have changed in recent Budgets and the treatment can depend on your purchase date, so any single figure quoted online risks being out of date. Confirm the applicable holding period and rate for your specific purchase on incometax.gov.in or with a tax adviser before selling.",
      },
      {
        q: "Can I convert gold ETF units into physical gold?",
        a: "Not as a normal retail investor. Redemption in physical form is generally available only in large creation-unit sizes through authorised participants, which is far beyond an ordinary holding. In practice you sell the units on the exchange for cash and buy metal separately if you actually want it.",
      },
    ],
    related: ["sovereign-gold-bond", "digital-gold", "etf", "expense-ratio"],
    relatedHref: "/gold",
    relatedLabel: "Gold Investment Hub",
  },
  {
    slug: "digital-gold",
    term: "Digital Gold",
    category: "Investing",
    short:
      "Digital gold lets you buy gold online from as little as Rs 1, stored in an insured vault. It is convenient but not directly regulated.",
    bodyMarkdown: `Digital gold is gold you buy through an app or a payments platform in tiny amounts, with the corresponding physical metal held in an insured vault by the provider on your behalf. It is offered through partnerships with a small number of refiners and vaulting companies, and it appears inside many popular payment and broking apps.

The appeal is obvious. You can buy Rs 100 of gold on a phone in under a minute, accumulate over time, and eventually take delivery as a coin or bar if you want the metal.

## The three costs, and why they matter more than the convenience

**GST of 3%** applies on purchase, exactly as it does on physical gold. Buy Rs 10,000 of digital gold and roughly Rs 9,700 of gold value actually reaches your holding.

**A buy-sell spread.** The provider quotes one price to buy and a lower price to sell back at the same moment. That gap has commonly run in the region of 3% to 6%.

**Storage.** Vaulting is typically free only for a limited period, often around five years, after which the provider may charge a fee, require delivery or require you to sell.

Put the first two together and the arithmetic is uncomfortable for short holdings. **After GST and a mid-range spread, the gold price needs to rise roughly 8% before you break even on a same-year exit.** For a purchase held for a few months, that is a high hurdle.

## A worked example

You buy Rs 10,000 of digital gold. GST of 3% takes Rs 300, so Rs 9,700 of gold is credited to your account at the buy price.

Suppose the gold price rises 5% over the next year, taking that holding to about Rs 10,185 at the buy price. But you sell at the sell price, and with a 5% spread the realisable value is closer to Rs 9,676.

**You are marginally down despite gold having risen 5%.** Nothing has gone wrong and no one has cheated you. The costs simply consumed the gain.

Run the same 5% rise through a [gold ETF](/glossary/gold-etf) with a 0.5% expense ratio and small brokerage and you keep almost all of it, because there is no GST on the units and no dealer spread.

## The regulatory gap that matters most

**Digital gold is not directly regulated by SEBI or the RBI.** It is not a security, not a mutual fund and not a bank deposit. Your protection comes from the contract with the provider, the independent vaulting and insurance arrangements, and any trustee appointed to hold the metal.

SEBI has previously directed registered intermediaries to stop offering unregulated digital gold products, which is why some broking apps withdrew it. That is a meaningful signal about where the product sits.

This does not make it a scam. It does mean you are relying on a private company's arrangements rather than on a statutory framework, and that is a materially different risk from an SGB backed by the Government of India or a SEBI-regulated ETF.

## Where digital gold genuinely fits

| Use case | Is digital gold the right tool? |
| --- | --- |
| Buying Rs 100 to Rs 500 at a time as a habit | Yes, nothing else allows amounts this small |
| Accumulating towards a future jewellery purchase | Yes, delivery as coins or bars is the design intent |
| Gifting small amounts | Yes, convenient and instant |
| Building a 5% to 15% portfolio allocation to gold | No, use an SGB or a gold ETF instead |
| Holding gold for 5 years or more | No, the storage window and spread work against you |
| Short-term trading on the gold price | No, the spread alone defeats it |

## The practical rule

Treat digital gold as a savings habit that ends in physical metal, not as an investment vehicle. If your intention is to own gold as part of a portfolio, a [Sovereign Gold Bond](/glossary/sovereign-gold-bond) pays you 2.5% a year to hold it and exempts capital gains at maturity, and a gold ETF costs a fraction of a percent a year with no GST on the units.

If you do use it, check three things with your specific provider before buying: the current buy-sell spread quoted side by side, how long storage is free and what happens at the end of that period, and who the vaulting partner and trustee actually are. Those three answers tell you more than any advertised feature list. The full comparison across all four ways of owning gold is in the [gold hub](/gold).`,
    faq: [
      {
        q: "Is digital gold safe in India?",
        a: "The metal is normally held in an insured vault by a third party, but digital gold is not directly regulated by SEBI or the RBI. It is not a security, a mutual fund or a deposit, so your protection comes from the provider's contract and vaulting arrangements rather than a statutory framework. SEBI has previously told registered intermediaries to stop offering it.",
      },
      {
        q: "What are the charges on digital gold?",
        a: "Three. GST of 3% on purchase, a buy-sell spread that has commonly run around 3% to 6%, and storage which is typically free only for a limited period, often around five years. Together the first two mean gold usually needs to rise roughly 8% before a same-year exit breaks even.",
      },
      {
        q: "Digital gold or gold ETF, which is better?",
        a: "For anything you intend to hold as an investment, a gold ETF is materially cheaper and is SEBI-regulated, with no GST on units and an expense ratio of well under 1% a year. Digital gold wins only on minimum ticket size, since you can buy Rs 100 at a time, and on the ability to take delivery as coins.",
      },
      {
        q: "Can I convert digital gold into physical gold?",
        a: "Yes, that is the design intent. Once your holding reaches the provider's minimum, usually equivalent to a standard coin or bar weight, you can request delivery. Making, packaging and delivery charges apply on top of what you have already paid, so factor those in before treating delivery as free.",
      },
      {
        q: "What happens after the free storage period on digital gold ends?",
        a: "It depends on the provider, but the usual outcomes are that a storage fee starts, you are asked to take delivery of the metal, or you are asked to sell the holding back. Confirm the exact policy and the timeline with your specific provider before buying, because the window is commonly around five years.",
      },
      {
        q: "Is there a minimum amount to buy digital gold?",
        a: "It is extremely low, often Rs 1 to Rs 100 depending on the platform, which is the product's main advantage over every other way of owning gold. That does make it useful for a small recurring savings habit, but the GST and spread mean it works poorly for building a long-term portfolio allocation.",
      },
    ],
    related: ["sovereign-gold-bond", "gold-etf", "hallmark", "gst"],
    relatedHref: "/gold",
    relatedLabel: "Gold Investment Hub",
  },
  {
    slug: "hallmark",
    term: "Hallmark",
    category: "Banking",
    short:
      "A hallmark is the BIS purity mark on Indian gold jewellery, carrying the BIS logo, the purity in carats and fineness, and a unique six-digit HUID code.",
    bodyMarkdown: `A hallmark is an official certification of the purity of a precious metal article. In India it is administered by the Bureau of Indian Standards, and hallmarking of gold jewellery and artefacts has been made mandatory for sellers in notified districts, with the scheme expanded in stages since 2021.

The point of it is simple. Gold is sold by weight and priced by purity, and without an independent mark you have no way to verify what you are actually buying. A piece sold as 22 carat that is really 18 carat overstates the metal content by a large margin, and the difference is not visible to the eye.

## What the mark actually contains

Since the introduction of the HUID system, a hallmarked gold article carries **three marks**:

**The BIS logo**, a standard triangular mark identifying the Bureau of Indian Standards.

**The purity and fineness**, such as 22K916, 18K750 or 14K585. The number is parts of gold per thousand.

**A six-digit alphanumeric HUID**, the Hallmark Unique Identification code, which is unique to that individual article and is recorded against the jeweller who registered it.

The HUID is the part that changed the system meaningfully. It is verifiable: the BIS Care app lets you enter the six-digit code and see the registered details of that specific piece, including the jeweller and the purity it was certified at. **If a code does not verify, walk away.**

## Reading purity by the numbers

| Carat | Fineness | Gold content | Common use |
| --- | --- | --- | --- |
| 24K | 999 | 99.9% | Coins and bars, too soft for jewellery |
| 22K | 916 | 91.6% | Traditional Indian gold jewellery |
| 18K | 750 | 75% | Diamond and studded jewellery |
| 14K | 585 | 58.5% | Lighter and more durable pieces |

Pure 24 carat gold is too soft to hold a setting, which is why jewellery is alloyed. That is legitimate. The problem is only ever a piece being sold as a higher purity than it is.

## A worked example of what purity is worth

Take 10 grams sold to you as 22 carat when it is actually 18 carat.

At 22K the metal is 91.6% gold, so 10 grams contains 9.16 grams of gold. At 18K it is 75%, so 7.5 grams.

You have paid for 9.16 grams of gold and received 7.5 grams, a shortfall of 1.66 grams. That is an overpayment of about **18% of the metal value**, on top of whatever making charges were added. On a Rs 60,000 purchase that is roughly Rs 11,000 gone, invisibly.

This is exactly the loss the hallmark exists to prevent, and it is why the six-digit code being verifiable matters more than the mark simply being present.

## Making charges are a separate question

Hallmarking certifies purity. It says nothing about price. **Making charges of 8% to 25% are still added on top of the metal value, and they are almost never recovered when you sell.** A jeweller buying back a piece typically pays for the gold content at the prevailing rate, minus a deduction, and returns nothing for the craftsmanship you paid for.

That is the core reason jewellery is a poor investment even when it is perfectly hallmarked, and why gold held for investment is better owned as a [Sovereign Gold Bond](/glossary/sovereign-gold-bond) or a [gold ETF](/glossary/gold-etf), which carry no making charges at all.

## What to check at the counter

Ask to see the HUID and verify it in the BIS Care app before paying, not after. Get an invoice that states the net gold weight separately from the weight of any stones, the purity in carats, the making charges as a distinct line and the applicable GST. Stones are commonly weighed as part of the gross weight and charged at the gold rate, which is a well-known way of inflating a bill.

Keep the invoice. It is what establishes your purchase cost when you eventually sell, which matters for [capital gains](/glossary/capital-gains), and it is what a jeweller will ask for during a buyback or exchange.

Complaints about a piece that does not match its hallmark can be raised with BIS through the BIS Care app, which is a genuine and usable route rather than a theoretical one. For the wider question of how much gold to hold and in what form, see the [gold hub](/gold).`,
    faq: [
      {
        q: "What is HUID in gold hallmarking?",
        a: "HUID stands for Hallmark Unique Identification. It is a six-digit alphanumeric code unique to each individual hallmarked article, recorded against the jeweller who registered it. You can verify it in the BIS Care app, which shows the registered purity and jeweller for that specific piece. A code that does not verify is a reason to walk away.",
      },
      {
        q: "Is hallmarking of gold jewellery compulsory in India?",
        a: "Hallmarking of gold jewellery and artefacts has been made mandatory for sellers in notified districts, with the scheme rolled out in stages since 2021 and extended over time. Because the list of notified districts and covered categories has expanded in phases, check the current position on the BIS website for your location.",
      },
      {
        q: "What do 916 and 750 mean on gold jewellery?",
        a: "They are fineness marks giving parts of gold per thousand. 916 means 91.6% gold, which is 22 carat, the standard for traditional Indian jewellery. 750 means 75%, which is 18 carat and common in studded and diamond pieces. 999 is 24 carat, used for coins and bars because it is too soft for jewellery.",
      },
      {
        q: "How do I check if my gold is really hallmarked?",
        a: "Look for all three marks: the BIS logo, the purity and fineness such as 22K916, and the six-digit alphanumeric HUID. Then enter the HUID in the BIS Care app to confirm it matches the piece and the jeweller. Do this before paying rather than after, and keep the itemised invoice.",
      },
      {
        q: "Does a hallmark mean I am paying a fair price?",
        a: "No. A hallmark certifies purity only and says nothing about price. Making charges of 8% to 25% are added on top of the metal value and are generally not recovered when you sell. Ask for the net gold weight, purity, making charges and GST as separate lines on the invoice.",
      },
      {
        q: "Can I sell old gold jewellery that has no hallmark?",
        a: "Yes. The mandate applies to sellers rather than to consumers holding older pieces. A jeweller buying it back will typically test the purity, commonly by an XRF machine or a touchstone test, and pay on the assessed gold content. Expect a deduction, and expect nothing back for the original making charges.",
      },
    ],
    related: ["digital-gold", "sovereign-gold-bond", "gold-etf", "gst"],
    relatedHref: "/gold",
    relatedLabel: "Gold Investment Hub",
  },

  // -- Portfolio and retirement -------------------------------------------
  {
    slug: "asset-allocation",
    term: "Asset Allocation",
    category: "Investing",
    short:
      "Asset allocation is how you split money across equity, debt, gold and cash. It drives risk and return far more than fund choice does.",
    bodyMarkdown: `Asset allocation is the decision about how much of your money sits in each broad asset class: equity, debt, gold, real estate and cash. It is made before any fund or stock is chosen, and it explains far more of what eventually happens to a portfolio than the choice of fund does.

The reason is that asset classes behave differently from one another, while funds within the same class mostly move together. Two large-cap equity funds will rise and fall in near lockstep. Equity and short-duration debt will not. So the split between them, not the choice between the two funds, is what determines how much your portfolio falls in a bad year.

## What each asset class is actually for

**Equity** is the growth engine. Over long periods it has delivered the highest returns of the main classes in India, and it is also the only one that can fall 30% or more in a year. It belongs to money you will not need for at least five to seven years.

**Debt** covers fixed deposits, debt mutual funds, PPF, EPF and bonds. Its job is stability and predictability, not returns. It is what lets you leave equity alone during a crash instead of selling it.

**Gold** is a diversifier. It pays no income at all, but it has historically held or gained value in periods when equity has fallen, which is the whole argument for a modest holding. See the [gold hub](/gold) for how to own it.

**Cash** is the emergency fund and near-term goals. It is not an investment and should not be judged as one.

## A simple worked example, including the rebalancing

Take a Rs 20,00,000 portfolio at a 60% equity, 30% debt, 10% gold allocation. That is Rs 12,00,000 in equity, Rs 6,00,000 in debt and Rs 2,00,000 in gold.

Say over a year equity returns 25%, debt returns 7% and gold returns 10%. The holdings become Rs 15,00,000, Rs 6,42,000 and Rs 2,20,000, a total of Rs 23,62,000.

Equity is now **63.5% of the portfolio rather than 60%**. Nothing was done wrong. Good performance itself pushed the portfolio into taking more risk than you chose.

Rebalancing means selling about Rs 83,000 of equity and moving roughly Rs 67,000 into debt and Rs 16,000 into gold, restoring 60/30/10.

Notice what that mechanically does: it sells the asset that has run up and buys the ones that have lagged. It is a rule that makes you sell high and buy low without requiring you to predict anything, which is why it is one of the few genuinely reliable pieces of portfolio discipline.

## Choosing a split

There is no single correct allocation, and anyone who gives you one without asking about your horizon and your income stability is guessing. The variables that actually matter are how many years until you need the money, how much of a fall you can sit through without selling, and how stable your income is.

| Horizon and situation | A commonly discussed starting point |
| --- | --- |
| Under 3 years, goal is fixed | Mostly debt and cash, little or no equity |
| 3 to 7 years | Balanced, often around 40% to 50% equity |
| 7 years or more, stable income | Equity-heavy, often 65% to 80% |
| Approaching retirement | Reducing equity steadily, raising debt |
| Already retired, drawing income | Enough debt to cover several years of withdrawals |

These are illustrations of how the trade-off is usually framed, not recommendations. **This site does not give personalised investment advice, and an allocation is a personal decision best made with a SEBI-registered investment adviser if you want it tailored.**

The old rule of thumb of "100 minus your age in equity" is a memorable starting point and nothing more. It ignores income stability, existing assets, dependants and whether you have a pension, all of which matter more than the birthday.

## The mistakes that cost most

The commonest is **having no allocation at all**, just a collection of funds bought at different times for different reasons. If you cannot state your equity percentage, you do not have an allocation, you have an accumulation.

The second is **owning eight equity funds and calling it [diversification](/glossary/diversification)**. Eight funds holding the same fifty large-cap stocks is one bet wearing eight labels.

The third is **changing the allocation after a crash**, which converts a temporary fall into a permanent loss and usually results in returning to equity only after the recovery.

The fourth is **ignoring EPF and PPF**. For many salaried Indians these are the largest debt holdings they own, and a portfolio that looks 100% equity in a broking app may actually be closer to 60/40 once they are counted. Count everything, then decide.

Rebalance on a schedule, once a year is plenty, or when a class drifts more than five percentage points from target. Track the whole picture with the [net worth](/glossary/net-worth) view rather than fund by fund.`,
    faq: [
      {
        q: "What is a good asset allocation by age in India?",
        a: "The old rule of thumb is to hold 100 minus your age in equity, so 70% equity at 30. It is a starting point rather than an answer, because it ignores income stability, dependants, existing assets and whether you have a pension. Horizon and your ability to sit through a fall matter more than the birthday.",
      },
      {
        q: "How often should I rebalance my portfolio?",
        a: "Once a year is enough for most people, or whenever an asset class drifts more than about five percentage points from its target. Rebalancing more often adds transaction costs and tax events without improving outcomes. The discipline matters more than the frequency, because it mechanically sells what has run up and buys what has lagged.",
      },
      {
        q: "Does asset allocation include my EPF and PPF?",
        a: "It should. For many salaried Indians, EPF and PPF are the largest debt holdings they own, and leaving them out badly overstates the equity share. A portfolio that looks entirely equity in a broking app may be closer to 60/40 once these are counted, which changes what you should be buying next.",
      },
      {
        q: "How much gold should be in my portfolio?",
        a: "A modest allocation, commonly discussed in the 5% to 15% range, is the usual framing, because gold pays no income but has historically held value when equity has fallen. The right figure depends on your overall plan. Owning it as a Sovereign Gold Bond or a gold ETF avoids the making charges that make jewellery a poor holding.",
      },
      {
        q: "Is asset allocation the same as diversification?",
        a: "They are related but not identical. Asset allocation is the split between broad classes such as equity, debt and gold. Diversification is spreading risk within a class, for example across sectors and market capitalisations. Owning eight equity funds that hold the same fifty stocks is neither, it is one bet under eight labels.",
      },
      {
        q: "Should I change my asset allocation when markets fall?",
        a: "Changing the target allocation because of a fall is usually the most expensive decision an investor makes, since it converts a temporary decline into a permanent loss and typically leads to buying back only after the recovery. Rebalancing back to your existing target is the opposite action and is generally the right one.",
      },
    ],
    related: ["diversification", "mutual-fund", "sip", "net-worth"],
    relatedHref: "/investing",
    relatedLabel: "Investing Hub",
  },
  {
    slug: "annuity",
    term: "Annuity",
    category: "Banking",
    short:
      "An annuity is a contract where you pay an insurer a lump sum and receive a guaranteed income for life. NPS requires buying one at exit.",
    bodyMarkdown: `An annuity is a contract with a life insurance company. You hand over a lump sum, called the purchase price, and in exchange the insurer pays you a fixed income at regular intervals, most commonly monthly, usually for the rest of your life.

It is the one retirement product that solves longevity risk, which is the risk of outliving your money. Every other retirement approach requires you to guess how long you will live. An annuity moves that guess onto the insurer's balance sheet.

That protection is real, and it is also the reason annuities feel expensive: you are buying insurance, not chasing a return.

## The main variants sold in India

**Immediate annuity** starts paying shortly after purchase. This is what almost every Indian retiree buys.

**Deferred annuity** takes the money now and begins paying at a chosen future date, accumulating in the meantime.

**Life annuity without return of purchase price** pays the highest income, and the capital is gone when you die. Nothing passes to your heirs.

**Life annuity with return of purchase price** pays a noticeably lower income, but the original lump sum is returned to your nominee on death. This is the most popular option in India for exactly that reason.

**Joint life annuity** continues paying the surviving spouse, at the same or a reduced rate, and therefore starts lower than a single life annuity.

**Annuity with a guaranteed period** pays for a minimum number of years even if the annuitant dies earlier.

Each additional protection lowers the monthly income. There is no free option in that list.

## Where an annuity is compulsory: NPS

For most people the first real encounter with an annuity is the [NPS](/glossary/nps) exit rule. On exiting NPS at the normal retirement age, **at least 40% of the accumulated corpus must be used to buy an annuity from an empanelled insurer**, and up to 60% can be withdrawn as a lump sum, which is tax-exempt. Smaller corpuses below a threshold can be withdrawn in full, and different rules apply on early exit and on death.

Because this is compulsory rather than optional, it is worth understanding the pricing before you reach 60 rather than after.

## A worked example

Suppose you retire at 60 with an NPS corpus of Rs 50,00,000.

You withdraw 60%, which is Rs 30,00,000, as a tax-free lump sum. The remaining Rs 20,00,000 must buy an annuity.

Annuity rates quoted by Indian insurers have commonly sat somewhere in the region of 5.5% to 7% depending on the option chosen, the age at purchase and the insurer, so treat the following as an illustration and get live quotes rather than relying on any figure here.

At an illustrative 6% on a life annuity without return of purchase price, Rs 20,00,000 produces about Rs 1,20,000 a year, roughly **Rs 10,000 a month before tax**, for life, with nothing left for heirs.

Choosing return of purchase price instead might drop the rate to around 5%, giving roughly Rs 8,300 a month, but the Rs 20,00,000 goes to your nominee on death.

**The annuity income is fully taxable at your slab rate**, which is the detail most people miss when comparing it with other options.

## How it compares with a systematic withdrawal plan

| Feature | Annuity | SWP from mutual funds |
| --- | --- | --- |
| Income certainty | Guaranteed for life | Depends on markets and withdrawal rate |
| Longevity risk | Carried by the insurer | Carried by you |
| Capital access | Locked, cannot be withdrawn | Fully accessible at any time |
| Growth on remaining capital | None to you | Continues to be invested |
| Legacy to heirs | Only with return of purchase price | Whatever remains |
| Taxation | Income taxed at slab rate | Only the gain portion, under capital gains rules |
| Flexibility to change | Effectively none | Change or stop the withdrawal anytime |

A [systematic withdrawal plan](/glossary/swp) usually produces a better outcome on paper and leaves the capital accessible. An annuity produces certainty. Many retirees reasonably use both: an annuity sized to cover non-negotiable monthly costs such as food, utilities and medicines, and an SWP for everything above that. Model the SWP side with the [SWP calculator](/calculators/swp) and the corpus itself with the [retirement calculator](/calculators/retirement).

## Before you buy one

Get quotes from several empanelled insurers on the same date for the same option, because rates differ meaningfully between them and the choice is effectively irreversible. Compare like with like: a higher headline rate is often a life annuity without return of purchase price sitting next to a with-return quote.

And be clear about what the product does not do. **A fixed annuity income does not rise with inflation.** At 6% inflation, Rs 10,000 a month buys roughly half as much in twelve years. That is the strongest argument for not annuitising more of the corpus than the compulsory portion, and for keeping the rest invested. This is general information and not personalised advice.`,
    faq: [
      {
        q: "Is buying an annuity compulsory in NPS?",
        a: "Yes for most subscribers. On exiting NPS at the normal retirement age, at least 40% of the accumulated corpus must be used to buy an annuity from an empanelled insurer, with up to 60% withdrawable as a tax-exempt lump sum. Smaller corpuses below a threshold can be withdrawn in full, and different rules apply on early exit.",
      },
      {
        q: "Is annuity income taxable in India?",
        a: "Yes. Annuity payouts are taxable as income at your applicable slab rate, in full, for the whole life of the annuity. This is a key difference from a systematic withdrawal plan from mutual funds, where only the gain portion of each withdrawal is taxed and it is taxed under capital gains rules.",
      },
      {
        q: "What is return of purchase price in an annuity?",
        a: "It is an option under which the original lump sum you paid is returned to your nominee when you die, instead of the capital being retained by the insurer. It is the most popular choice in India, and it comes at a real cost: the monthly income is noticeably lower than a life annuity without it.",
      },
      {
        q: "Annuity or SWP, which is better for retirement income?",
        a: "An annuity gives certainty and removes the risk of outliving your money, but the capital is locked, the income does not rise with inflation and it is fully taxable. An SWP keeps capital accessible and invested and is taxed more lightly, but the income depends on markets. Many retirees use an annuity for essential costs and an SWP above that.",
      },
      {
        q: "What annuity rate can I expect in India?",
        a: "Rates quoted by Indian insurers have commonly sat somewhere in the region of 5.5% to 7%, varying by insurer, by your age at purchase and heavily by the option chosen. Because the decision is effectively irreversible, get live quotes from several empanelled insurers on the same date for the same option before deciding.",
      },
      {
        q: "Can I surrender or exit an annuity after buying it?",
        a: "Generally no. An annuity is designed to be irreversible once the free-look period ends, which is precisely why the income can be guaranteed for life. A small number of products allow surrender under specific conditions, usually at a significant cost. Treat the purchase as permanent and compare quotes carefully beforehand.",
      },
    ],
    related: ["nps", "swp", "4-percent-rule", "epf"],
    relatedHref: "/calculators/nps",
    relatedLabel: "NPS Calculator",
  },
  {
    slug: "4-percent-rule",
    term: "4% Rule",
    category: "Investing",
    short:
      "The 4% rule says you withdraw 4% of your retirement corpus in year one, then raise it with inflation. In India it is seen as aggressive.",
    bodyMarkdown: `The 4% rule is a rule of thumb for how much a retiree can withdraw from an investment portfolio each year without running out of money. It says: withdraw 4% of the corpus in the first year, then increase that rupee amount by inflation every year afterwards, regardless of what markets do.

The convenient corollary is the **25 times rule**: if 4% is your withdrawal rate, then the corpus you need is 25 times your first year of expenses.

It originated in American research on US market history over rolling 30-year retirement periods, most famously the Trinity Study. That origin is the whole reason it needs adjusting before being applied in India.

## The arithmetic, with Indian numbers

Suppose your annual expenses at retirement are Rs 9,00,000, which is Rs 75,000 a month.

At 4%, the corpus needed is 25 times that, which is **Rs 2.25 crore**.

At 3.5%, the multiple becomes about 28.6 times, so **Rs 2.57 crore**.

At 3%, it is 33.3 times, so **Rs 3 crore**.

Half a percentage point on the withdrawal rate changed the target by more than Rs 30 lakh. This is why the number you assume matters far more than which funds you pick.

| Annual expenses at retirement | Corpus at 4% | Corpus at 3.5% | Corpus at 3% |
| --- | --- | --- | --- |
| Rs 6,00,000 | Rs 1.5 crore | Rs 1.71 crore | Rs 2 crore |
| Rs 9,00,000 | Rs 2.25 crore | Rs 2.57 crore | Rs 3 crore |
| Rs 12,00,000 | Rs 3 crore | Rs 3.43 crore | Rs 4 crore |
| Rs 18,00,000 | Rs 4.5 crore | Rs 5.14 crore | Rs 6 crore |

Work out your own figure with the [retirement calculator](/calculators/retirement), and remember to inflate today's expenses to what they will cost at your retirement date before applying any multiple.

## Why 4% is usually considered too high for India

**Inflation has historically run higher than in the US.** The rule was built around long-run US inflation. Indian retirees have generally faced higher general inflation, and medical inflation in particular has typically outpaced the headline rate. A withdrawal that rises faster in rupee terms drains a corpus faster.

**The horizon is often longer.** The original research tested 30-year retirements. Someone retiring early, which is the whole premise of the [FIRE movement in India](/blog/fire-retire-early-india), may need the money to last 40 or 50 years. The rule was never tested for that.

**Sequence of returns risk is unforgiving.** Two retirees with identical average returns can end very differently depending on when the bad years arrive. A severe fall in the first three years, while withdrawals continue, permanently reduces the capital base that the later recovery works on.

**Costs and tax reduce the real rate.** Every fund charges an [expense ratio](/glossary/expense-ratio), and withdrawals attract [capital gains](/glossary/capital-gains) tax. A 4% gross withdrawal is a smaller net amount in your hand.

For these reasons, Indian planners commonly discuss **3% to 3.5%** as a more defensible starting rate, which translates to a corpus of roughly 28 to 33 times annual expenses.

## What the rule leaves out entirely

It assumes a fixed real withdrawal forever, which no real retiree actually does. In practice people spend more in the early active years, less in the middle, and more again on healthcare later.

It ignores other income. A pension, [NPS](/glossary/nps) annuity, rental income or part-time earnings all reduce what the portfolio has to provide, and therefore reduce the corpus needed.

It assumes you hold your nerve through every crash without cutting spending, which is both unrealistic and unnecessary. A retiree who simply skips the inflation increase after a bad year materially improves the odds of the money lasting, at very little cost to their life.

And it says nothing about health cover. In India, adequate health insurance is arguably a bigger determinant of whether a retirement corpus survives than the withdrawal rate is, because a single uninsured hospitalisation can remove years of planned withdrawals at once.

## How to use it sensibly

Treat it as a sanity check, not a plan. Use 25 times expenses to know roughly what order of magnitude you are aiming at, then plan against a lower withdrawal rate, keep two to three years of expenses in [debt or cash](/glossary/asset-allocation) so you never have to sell equity into a crash, and stay flexible about the inflation increase in bad years.

This is general educational information about a widely discussed rule of thumb, not personalised financial advice. For a plan matched to your own situation, speak to a SEBI-registered investment adviser.`,
    faq: [
      {
        q: "Does the 4% rule work in India?",
        a: "Most Indian planners treat it as too aggressive. It was derived from US market and inflation history over 30-year retirements, while Indian retirees have generally faced higher inflation, particularly medical inflation, and early retirees may need the money to last 40 years or more. A 3% to 3.5% starting rate is the more commonly discussed range.",
      },
      {
        q: "How much corpus do I need to retire in India?",
        a: "As a rough sanity check, 25 times your first year of retirement expenses at a 4% withdrawal rate, or roughly 28 to 33 times at the more conservative 3% to 3.5%. On Rs 9 lakh of annual expenses that is Rs 2.25 crore to Rs 3 crore. Inflate today's expenses to your retirement date first.",
      },
      {
        q: "What is the 25 times rule for retirement?",
        a: "It is the 4% rule stated the other way round. If you can safely withdraw 4% of a corpus each year, then the corpus you need is one divided by 0.04, which is 25 times your annual expenses. At a 3.5% withdrawal rate the multiple rises to about 28.6, and at 3% to about 33.",
      },
      {
        q: "What is sequence of returns risk?",
        a: "It is the risk that a market fall arrives early in retirement, while you are withdrawing. Two retirees with identical average returns can end very differently depending on the order those returns arrive, because withdrawing during a fall permanently shrinks the capital that the later recovery works on. Holding two to three years of expenses in debt reduces it.",
      },
      {
        q: "Should my withdrawal rate change during retirement?",
        a: "In practice most retirees do vary it, and that flexibility improves the odds of the money lasting. Skipping the inflation increase after a bad market year is a small change in lifestyle with a large effect on portfolio survival. Spending also naturally shifts, higher in the early active years and again later on healthcare.",
      },
      {
        q: "Does the 4% rule account for taxes and fund charges?",
        a: "No. It describes a gross withdrawal from the portfolio. Fund expense ratios reduce returns before you see them, and withdrawals attract capital gains tax, so the amount reaching your bank account is less than 4% of the corpus. Building both into your own assumption is one reason a lower rate is safer.",
      },
    ],
    related: ["swp", "nps", "asset-allocation", "inflation"],
    relatedHref: "/calculators/retirement",
    relatedLabel: "Retirement Calculator",
  },
];

/** Slugs for every generated glossary page, consumed by the sitemap and route. */
export const GLOSSARY_SLUGS: string[] = GLOSSARY.map((t) => t.slug);

/** Look up a single term by slug. */
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
