import type { Post } from "./data";

export const cryptoPosts: Post[] = [
  /* ------------------------------------------------------------------ */
  /*  1. What is Cryptocurrency — Beginner's Guide for Indian Investors */
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-cryptocurrency-beginners-guide-india",
    title:
      "What is Cryptocurrency? A Beginner's Guide for Indian Investors",
    excerpt:
      "A plain-English explainer on what cryptocurrency is, how blockchain works, the main types of crypto assets, how to buy them in India, the 30% tax rule, legal status, and how crypto compares with traditional investments like stocks and mutual funds.",
    category: "Investing",
    readMinutes: 12,
    date: "Sep 4, 2026",
    keywords: [
      "what is cryptocurrency",
      "cryptocurrency explained",
      "crypto for beginners india",
      "cryptocurrency meaning",
    ],
    art: { variant: "chart", palette: "forest" },
    bodyMarkdown: `Cryptocurrency has gone from an obscure internet experiment to a topic that shows up in Indian newspaper headlines, family WhatsApp groups and Union Budget speeches. Yet for every person who can explain what Bitcoin actually is, there are ten who have heard the word but cannot say how it works or whether it is legal to own in India.

This guide answers the foundational questions. It is written for someone who has never bought a single crypto token and wants to understand the basics before deciding whether, and how, to get started.

## What is cryptocurrency?

A cryptocurrency is a digital asset that uses cryptography, a branch of mathematics dealing with codes and ciphers, to secure transactions and control the creation of new units. Unlike rupees or dollars, no central bank issues cryptocurrency. Instead, it runs on a decentralised network of computers spread across the world.

The word breaks down into two parts. "Crypto" refers to the cryptographic techniques that make transactions tamper-proof. "Currency" indicates its original purpose: to serve as a medium of exchange, much like money. In practice, many crypto assets today function more as investment instruments or technology platforms than as everyday payment methods.

The defining feature is **decentralisation**. When you transfer money through a bank, the bank verifies the transaction, updates its ledger and charges a fee. With cryptocurrency, that verification is performed by a network of independent computers following a shared protocol. No single entity controls the ledger.

## How does blockchain technology work?

Blockchain is the technology that makes cryptocurrency possible. Think of it as a shared, digital record book that thousands of computers maintain simultaneously. Each page in this book is called a **block**, and the pages are chained together in chronological order, hence the name "blockchain."

Here is a simplified step-by-step of what happens when you send cryptocurrency to someone:

1. You initiate a transaction from your crypto wallet, specifying the recipient's address and the amount.
2. The transaction is broadcast to the network of computers, called **nodes**.
3. Nodes verify the transaction by checking that you actually own the coins you are trying to send and that you have not already spent them (this prevents double-spending).
4. Once verified, the transaction is grouped with other recent transactions into a block.
5. The block is added to the existing chain through a process called **consensus** (more on this below).
6. The updated blockchain is distributed to every node in the network.

Because every node holds a copy of the full ledger, altering a past transaction would require changing the record on thousands of computers simultaneously, which is computationally impractical. This is what makes blockchain records effectively immutable.

### Consensus mechanisms

The two most common methods that networks use to agree on which transactions are valid are:

**Proof of Work (PoW).** Computers called miners compete to solve a complex mathematical puzzle. The first to solve it gets to add the next block and earns a reward in cryptocurrency. Bitcoin uses this method. It is extremely secure but consumes significant electricity.

**Proof of Stake (PoS).** Instead of solving puzzles, participants lock up (stake) their existing coins as collateral. The network selects a validator to propose the next block based on the size of their stake and other factors. Ethereum switched from PoW to PoS in 2022, reducing its energy consumption by over 99 percent.

## Types of cryptocurrencies

There are thousands of cryptocurrencies, but they broadly fall into a few categories.

### Bitcoin (BTC)

Bitcoin was the first cryptocurrency, launched in 2009 by a pseudonymous creator known as Satoshi Nakamoto. It has a hard cap of 21 million coins, which means no more than 21 million bitcoins will ever exist. This fixed supply is often compared to gold's scarcity. Bitcoin is primarily seen as a store of value and the benchmark against which all other crypto assets are measured.

### Ethereum (ETH)

Ethereum, launched in 2015, introduced the concept of **smart contracts**, self-executing programs that run on the blockchain. This turned blockchain from a simple payment rail into a programmable platform. Decentralised finance (DeFi) applications, non-fungible tokens (NFTs) and thousands of other crypto tokens are built on Ethereum's network.

### Altcoins

Any cryptocurrency other than Bitcoin is loosely called an altcoin. Some notable categories include:

- **Layer 1 blockchains** like Solana, Cardano and Avalanche, which compete with Ethereum by offering faster or cheaper transactions.
- **DeFi tokens** like Uniswap (UNI) and Aave (AAVE), which power decentralised lending, borrowing and trading platforms.
- **Utility tokens** that provide access to specific services within a blockchain ecosystem.

### Stablecoins

Stablecoins are designed to maintain a stable value, usually pegged to a fiat currency like the US dollar. Tether (USDT) and USD Coin (USDC) are the most widely used. They serve as a bridge between traditional finance and the crypto ecosystem, allowing traders to park funds without converting back to fiat currency.

### Meme coins

Coins like Dogecoin and Shiba Inu started as jokes but attracted large communities. They carry extremely high risk, have no fundamental utility in most cases, and their prices are driven almost entirely by speculation and social media trends.

## How to buy cryptocurrency in India

Indian investors can purchase cryptocurrency through regulated exchanges that comply with local laws. Here is the general process:

1. **Choose an exchange.** Popular options in India include WazirX, CoinDCX, CoinSwitch and ZebPay. Ensure the exchange is registered with the Financial Intelligence Unit (FIU) as required by Indian regulations.
2. **Complete KYC.** Every exchange requires Aadhaar and PAN-based identity verification.
3. **Add funds.** Deposit Indian rupees via UPI, bank transfer or net banking.
4. **Place an order.** You can buy as little as Rs 100 worth of Bitcoin or any other supported cryptocurrency.
5. **Store your crypto.** Beginners can keep their holdings on the exchange. For larger amounts, consider transferring to a personal wallet (hardware wallets like Ledger or Trezor offer the highest security).

You do not need to buy a whole Bitcoin. Cryptocurrencies are divisible, so you can own 0.001 BTC or even smaller fractions.

## Cryptocurrency tax rules in India

The Finance Act 2022 introduced a clear tax framework for what the law calls **Virtual Digital Assets (VDAs)**, which includes cryptocurrency.

### 30 percent flat tax on gains

Any income from the transfer (sale, exchange, or spending) of cryptocurrency is taxed at a flat rate of **30 percent** under Section 115BBH of the Income Tax Act. This rate applies regardless of your income tax slab, holding period, or the size of the gain. There is no distinction between short-term and long-term capital gains for crypto.

### 1 percent TDS on every transaction

Section 194S requires the buyer (or the exchange on the buyer's behalf) to deduct **1 percent TDS** on every crypto purchase above Rs 10,000 in a financial year (Rs 50,000 for specified persons). This TDS can be claimed as a credit when you file your income tax return.

### No loss set-off

Losses from one cryptocurrency cannot be set off against gains from another cryptocurrency or any other source of income. This is a significant difference from equity markets, where you can set off short-term capital losses against short-term capital gains.

### No deduction for expenses

The only deduction allowed is the **cost of acquisition** of the specific crypto asset being sold. You cannot deduct transaction fees, internet costs, electricity bills or any other expense.

You can calculate how your crypto gains affect your total tax liability using our [income tax calculator](/calculators/income-tax).

## Is cryptocurrency legal in India?

Cryptocurrency is **legal to own, buy, sell and trade** in India, but it is **not recognised as legal tender**. This means you can invest in it, but a shopkeeper is not obligated to accept it as payment for goods or services.

The legal journey has been eventful:

- In **2018**, the Reserve Bank of India (RBI) issued a circular prohibiting banks from dealing with crypto businesses, effectively cutting off exchanges from the banking system.
- In **2020**, the Supreme Court struck down the RBI circular, ruling it unconstitutional and disproportionate. This restored banking access for crypto platforms.
- In **2022**, the Union Budget introduced the 30 percent tax and 1 percent TDS, which many interpreted as implicit recognition that crypto is a legitimate (if heavily taxed) asset class.
- The RBI has repeatedly expressed concerns about crypto's potential to undermine monetary policy and has advocated for a ban, but no ban has been enacted by Parliament.
- India's G20 presidency in 2023 pushed for a global regulatory framework for crypto assets, signalling a preference for regulation over prohibition.

The practical reality is that millions of Indians buy and sell cryptocurrency through exchanges that are registered with the FIU and comply with anti-money-laundering regulations.

## How cryptocurrency differs from stocks and mutual funds

Understanding where crypto sits relative to familiar investment options helps frame the risk.

| Parameter | Cryptocurrency | Stocks | Mutual Funds |
|---|---|---|---|
| Regulator | None (FIU registration for exchanges) | SEBI | SEBI |
| Trading hours | 24/7, 365 days | Mon-Fri, 9:15 AM to 3:30 PM | NAV updated once daily |
| Volatility | Very high (20-50% swings common) | Moderate | Low to moderate |
| Tax on gains | 30% flat (no LTCG benefit) | 12.5% LTCG / 20% STCG for equity | Same as equity for equity funds |
| Loss set-off | Not allowed | Allowed within capital gains | Allowed within capital gains |
| Minimum investment | As low as Rs 100 | Price of one share | Rs 100 (SIP) |
| Fundamental valuation | Difficult (no earnings, no cash flow) | P/E ratio, earnings, dividends | NAV based on underlying assets |
| Investor protection | Limited | SEBI regulations, IEPF | SEBI regulations |

The key takeaway is that cryptocurrency operates outside the established regulatory safety net that protects stock and mutual fund investors. There is no SEBI-equivalent watchdog, no investor grievance forum, and no guarantee that an exchange will not shut down or be hacked.

## Risks of investing in cryptocurrency

Every asset class carries risk, but crypto has unique risk factors that beginners must understand.

**Extreme volatility.** Bitcoin has fallen 50 percent or more from its peak on multiple occasions. Altcoins can lose 80 to 90 percent of their value in a bear market. If you cannot watch your portfolio drop by half without panicking, crypto may not suit your temperament.

**Regulatory uncertainty.** While crypto is currently legal in India, the government could introduce stricter regulations, including potential restrictions on trading. The RBI's ongoing push for a ban remains a tail risk.

**Security risks.** Exchanges can be hacked, and if you lose access to your private keys (the password to your crypto wallet), there is no "forgot password" option. Lost crypto is lost permanently.

**Scams and fraud.** The crypto space is rife with fraudulent schemes, rug pulls (where project creators disappear with investor funds), and phishing attacks. New investors are particularly vulnerable.

**No fundamental anchor.** Unlike stocks (which represent ownership in profit-generating companies) or real estate (which generates rental income), most cryptocurrencies do not produce cash flow. Their value is driven largely by supply, demand and market sentiment.

**Tax inefficiency in India.** The 30 percent flat tax with no loss set-off and no expense deductions makes crypto significantly less tax-efficient than equity investments for Indian investors.

## Should you invest in cryptocurrency?

There is no universal answer. Consider cryptocurrency only if:

- You have already built an emergency fund (six months of expenses), have adequate health and life insurance, and are investing regularly in diversified instruments like mutual funds or index funds via SIP. Use our [SIP calculator](/calculators/sip) to project your long-term equity corpus.
- You can afford to lose the entire amount you invest in crypto without affecting your financial stability.
- You are investing for curiosity, learning, or a speculative allocation (typically no more than 5 to 10 percent of your overall portfolio).
- You understand the tax implications and are prepared to report your holdings in your income tax return under Schedule VDA.

Cryptocurrency is not a substitute for a disciplined, diversified investment plan. It is, at best, a small satellite allocation for investors who have their core financial house in order.

## Getting started safely

If you decide to invest, start with these principles:

1. **Begin with a small amount** you can afford to lose entirely. Rs 1,000 to Rs 5,000 is enough to learn how exchanges, wallets and transactions work.
2. **Stick to established cryptocurrencies** like Bitcoin and Ethereum until you understand the space better. Avoid chasing low-priced altcoins or meme coins.
3. **Use a registered exchange** that complies with FIU requirements and has robust security features (two-factor authentication, withdrawal whitelists).
4. **Never invest based on social media tips.** If someone promises guaranteed returns or a coin that will "100x," treat it as a red flag.
5. **Keep records** of every transaction, including purchase price, sale price, date and transaction fees. You will need these for your [ITR filing](/blog/how-to-report-crypto-itr-schedule-vda).
6. **Learn about self-custody** over time. Understand the difference between hot wallets (connected to the internet) and cold wallets (offline hardware devices).

Cryptocurrency is a fascinating technology with genuine potential to reshape parts of the financial system. But the gap between "interesting technology" and "sensible investment" is wide. Approach it with curiosity, caution and a clear understanding of both the potential and the pitfalls.

This article is for educational purposes and does not constitute financial or investment advice.`,
    faq: [
      {
        q: "What is cryptocurrency in simple words?",
        a: "Cryptocurrency is digital money that runs on a decentralised computer network called a blockchain. No bank or government issues it. Transactions are verified by the network itself using cryptography, making them secure and transparent without needing a central authority.",
      },
      {
        q: "Is cryptocurrency legal in India in 2026?",
        a: "Yes, it is legal to buy, sell and hold cryptocurrency in India. The Supreme Court struck down the RBI ban in 2020, and the Finance Act 2022 introduced a 30 percent tax on crypto gains, implicitly recognising it as a legitimate asset class. However, it is not legal tender.",
      },
      {
        q: "How much tax do I pay on cryptocurrency gains in India?",
        a: "You pay a flat 30 percent tax on any profit from selling or transferring cryptocurrency under Section 115BBH. Additionally, a 1 percent TDS is deducted on every purchase above Rs 10,000 under Section 194S. Losses cannot be set off against other income.",
      },
      {
        q: "What is the minimum amount needed to buy cryptocurrency in India?",
        a: "You can start with as little as Rs 100 on most Indian exchanges like WazirX, CoinDCX or CoinSwitch. Cryptocurrencies are divisible, so you do not need to buy one whole Bitcoin or Ethereum. Even a tiny fraction is purchasable.",
      },
      {
        q: "Is Bitcoin a good investment for beginners in India?",
        a: "Bitcoin is the most established cryptocurrency and is considered lower-risk relative to altcoins, but it remains highly volatile. Beginners should invest only money they can afford to lose, keep the allocation to 5-10 percent of their portfolio, and have their core finances in order first.",
      },
      {
        q: "What is the difference between cryptocurrency and digital rupee?",
        a: "The digital rupee (e-RUPI or CBDC) is issued and controlled by the Reserve Bank of India, making it a centralised digital currency with the same value as a physical rupee. Cryptocurrency is decentralised, not backed by any government, and its value fluctuates based on market demand.",
      },
      {
        q: "Can I lose all my money in cryptocurrency?",
        a: "Yes, it is possible. Individual coins can lose 90 percent or more of their value, and some projects fail entirely. Exchange hacks and scams are additional risks. This is why experts recommend allocating only a small, disposable portion of your portfolio to crypto.",
      },
      {
        q: "How is cryptocurrency different from mutual funds?",
        a: "Mutual funds are SEBI-regulated, invest in diversified baskets of stocks or bonds, and offer loss set-off benefits. Cryptocurrency is unregulated, extremely volatile, taxed at a flat 30 percent with no loss set-off, and has no underlying cash flow. Read our detailed [crypto vs mutual funds comparison](/blog/cryptocurrency-vs-mutual-funds-india).",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  2. Cryptocurrency vs Mutual Funds                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "cryptocurrency-vs-mutual-funds-india",
    title:
      "Cryptocurrency vs Mutual Funds: Which is Better for Indian Investors?",
    excerpt:
      "A head-to-head comparison of cryptocurrency and mutual funds for Indian investors — covering historical returns, risk, regulation, tax treatment, liquidity, SIP options, volatility, and which one suits your financial goals.",
    category: "Investing",
    readMinutes: 11,
    date: "Sep 4, 2026",
    keywords: [
      "crypto vs mutual funds",
      "cryptocurrency vs mutual funds india",
      "should i invest in crypto or mutual funds",
    ],
    art: { variant: "chart", palette: "brass" },
    bodyMarkdown: `Two of the most debated investment options in India today sit at opposite ends of the spectrum. Mutual funds have decades of track record, SEBI oversight and a systematic investment infrastructure that makes them accessible to virtually every salaried Indian. Cryptocurrency, on the other hand, is barely a decade old in mainstream awareness, unregulated by any securities authority, and capable of doubling or halving in value within months.

Yet both compete for the same pool of investable rupees, especially among younger investors who are comfortable with apps and willing to take on higher risk. This guide compares the two across every dimension that matters so you can decide where each fits, if at all, in your portfolio.

## What are mutual funds?

A mutual fund pools money from thousands of investors and invests it in a diversified portfolio of stocks, bonds or other securities, managed by a professional fund manager. In India, all mutual funds are regulated by the Securities and Exchange Board of India (SEBI). There are multiple categories: equity funds (large-cap, mid-cap, small-cap, flexi-cap), debt funds, hybrid funds and tax-saving ELSS funds.

You can invest through a Systematic Investment Plan (SIP) starting at Rs 100 per month, making mutual funds one of the most accessible investment options available. Returns depend on the category, but large-cap equity funds have historically delivered 10 to 14 percent annualised returns over 10-year periods, while mid-cap and small-cap funds have delivered 14 to 20 percent with higher volatility.

## What is cryptocurrency?

Cryptocurrency is a decentralised digital asset that runs on blockchain technology. Bitcoin, the first and most valuable cryptocurrency, was launched in 2009. Ethereum, the second-largest, powers a programmable blockchain used for smart contracts and decentralised applications.

Unlike mutual funds, cryptocurrency has no fund manager, no diversification built in (unless you buy multiple tokens yourself), and no regulatory body overseeing investor protection. The market operates 24 hours a day, 365 days a year, with no circuit breakers or trading halts.

For a deeper understanding of how crypto works, read our [beginner's guide to cryptocurrency](/blog/what-is-cryptocurrency-beginners-guide-india).

## Head-to-head comparison

| Parameter | Cryptocurrency | Mutual Funds |
|---|---|---|
| **Regulator** | None (exchanges registered with FIU) | SEBI |
| **Track record** | Bitcoin since 2009; most altcoins much younger | Several decades; SBI Magnum launched in 1987 |
| **Historical returns (10Y)** | Bitcoin: ~50-80% CAGR (with extreme drawdowns); altcoins: highly variable | Equity funds: 10-18% CAGR depending on category |
| **Volatility** | Very high; 50-80% drawdowns are common | Moderate; 20-40% drawdowns in equity funds during bear markets |
| **Tax on gains** | 30% flat (Section 115BBH), no LTCG benefit | Equity: 12.5% LTCG (above Rs 1.25 lakh) / 20% STCG |
| **TDS** | 1% on every transaction (Section 194S) | None |
| **Loss set-off** | Not allowed | Allowed within capital gains category |
| **Expense deductions** | Only cost of acquisition | Expense ratio is deducted by the fund |
| **Minimum investment** | Rs 100 on most exchanges | Rs 100 via SIP |
| **SIP availability** | Some exchanges offer auto-buy (not a true SIP) | Full SIP infrastructure with step-up, pause, modify |
| **Liquidity** | 24/7 trading; instant for major tokens | T+1 or T+2 settlement for equity funds; instant for liquid funds |
| **Investor protection** | No grievance forum, no insurance | SEBI SCORES, AMFI, trust structure separates assets |
| **Underlying value** | Driven by network adoption, speculation, sentiment | Based on earnings, dividends, cash flow of underlying companies |
| **Diversification** | Must build your own portfolio | Built-in via fund structure |

## Returns comparison: the numbers in context

Bitcoin's long-term returns look spectacular on paper. From 2014 to 2024, Bitcoin delivered a CAGR that dwarfs any mutual fund category. However, this headline number hides critical context.

**Drawdowns matter as much as peaks.** Bitcoin fell approximately 85 percent from its 2017 high to its 2018 low, 77 percent from its 2021 high to its 2022 low, and has experienced several 30 to 50 percent drops within bull markets. Most investors do not enter at the bottom and exit at the top. Real investor returns tend to be far lower than theoretical buy-and-hold CAGR because people buy during hype and sell during panic.

**Altcoin returns are even more misleading.** While a few altcoins have delivered 1,000 percent or more in short periods, the majority of altcoins from any given year underperform Bitcoin over a full market cycle, and many go to zero. Survivorship bias means you mostly hear about the winners.

**Mutual fund returns are boring but reliable.** A large-cap index fund tracking the Nifty 50 has delivered 11 to 13 percent annualised returns over most 10-year rolling periods. The drawdowns are real (30 to 40 percent in 2008, 2020) but recoveries have been consistent. More importantly, mutual fund investors who stayed with SIPs through downturns have been rewarded with strong long-term compounding. Use our [SIP calculator](/calculators/sip) to see how even modest monthly investments grow over decades.

## Risk profile

### Cryptocurrency risk

- **Market risk:** extreme volatility with no circuit breakers. A single tweet, regulatory announcement or exchange failure can move prices by 20 percent in a day.
- **Regulatory risk:** the Indian government could introduce stricter rules, including potential restrictions on trading.
- **Counterparty risk:** if an exchange is hacked or goes bankrupt (as happened with FTX globally in 2022), you may lose your funds with no recourse.
- **Technology risk:** smart contract bugs, blockchain forks and wallet security issues can result in permanent loss of assets.
- **Scam risk:** rug pulls, phishing attacks and fraudulent token launches are common, especially in smaller altcoins.

### Mutual fund risk

- **Market risk:** equity funds can fall 30 to 40 percent in a severe bear market, but diversification reduces the impact of individual stock failures.
- **Fund manager risk:** an active fund's performance depends on the manager's skill. This is mitigated in index funds.
- **Regulatory changes:** tax treatment can change (as it did in 2023 for debt funds), but SEBI's protective framework remains intact.
- **No counterparty risk on assets:** mutual fund assets are held in a trust structure separate from the AMC. Even if the fund house shuts down, your units and the underlying securities are protected.

The practical difference is this: a mutual fund investor who bought at the worst possible time and stayed invested for 10 years has almost always made money. The same cannot be said for most cryptocurrencies other than Bitcoin.

## Regulation and investor protection

This is the most fundamental difference and one that many new investors underestimate.

Mutual funds in India operate under SEBI's Mutual Fund Regulations, 1996 (as amended). Every aspect of the industry, from what a fund can invest in, to how expenses are charged, to how complaints are handled, is governed by detailed rules. The Asset Management Company (AMC) that manages the fund is a separate entity from the Trust that holds your money. If the AMC goes bankrupt, your investments are not affected because they sit in the trust.

SEBI's SCORES portal allows investors to file complaints that are tracked to resolution. AMFI (Association of Mutual Funds in India) provides additional oversight and standardisation.

Cryptocurrency exchanges in India must register with the Financial Intelligence Unit (FIU) under anti-money-laundering laws, but this is primarily about tracking suspicious transactions, not protecting investor interests. There is no SEBI equivalent, no trust structure, no grievance resolution mechanism, and no insurance for your holdings. If an exchange is compromised, you have no regulatory body to turn to.

## Tax treatment: a decisive factor for Indian investors

Tax is where mutual funds hold a massive structural advantage.

**Mutual funds (equity oriented):**
- Holding period over one year: long-term capital gains (LTCG) taxed at 12.5 percent on gains above Rs 1.25 lakh per year.
- Holding period under one year: short-term capital gains (STCG) taxed at 20 percent.
- Losses can be set off against gains from other capital assets (short-term against short-term; long-term against long-term) and carried forward for up to 8 years.

**Cryptocurrency:**
- All gains taxed at a flat 30 percent under Section 115BBH, regardless of holding period.
- 1 percent TDS deducted on every transaction above Rs 10,000 (Section 194S).
- No set-off of losses from one crypto against gains from another crypto, or against any other income.
- No deduction for any expenses other than the cost of acquisition.

Consider this example: you buy crypto at Rs 1 lakh and sell at Rs 2 lakh, making a gain of Rs 1 lakh. You owe Rs 30,000 in tax. If you also lost Rs 50,000 on another crypto trade, that loss is wasted. You still pay Rs 30,000 on the gain. Had these been equity mutual funds, your net gain would be Rs 50,000, and the long-term tax would be just Rs 6,250 (if held for over a year).

Use our [income tax calculator](/calculators/income-tax) to model how crypto gains affect your total tax outgo.

## Liquidity

Both asset classes are reasonably liquid, but in different ways.

Cryptocurrency markets operate around the clock, including weekends and holidays. For major tokens like Bitcoin and Ethereum, you can sell at any time and receive the proceeds in your exchange wallet instantly. Converting to INR and withdrawing to your bank account typically takes a few hours to one business day.

Mutual fund redemptions are processed at the day's Net Asset Value (NAV). Equity fund redemptions are settled in T+1 or T+2 business days. Liquid funds offer T+0 settlement for small amounts. ELSS funds have a mandatory three-year lock-in.

For practical purposes, both are liquid enough for most investors. Crypto has an edge for urgent, off-hours access, but you rarely need to sell an investment at 2 AM on a Sunday.

## SIP and systematic investing

Mutual funds pioneered the SIP concept in India. You can set up automatic monthly investments as low as Rs 100, with features like step-up SIP (automatic annual increase), pause and modification, all fully automated and supported by every platform.

Some crypto exchanges offer an auto-buy feature that mimics SIP by purchasing a fixed rupee amount of a cryptocurrency at regular intervals. However, this is not a true SIP in the regulatory sense. There is no mandate, no step-up feature, and the tax complexity of frequent crypto purchases (each buy-sell creates a separate taxable event with 1 percent TDS) makes the practical experience far more cumbersome.

## When cryptocurrency makes sense

Despite the disadvantages, there are scenarios where crypto exposure can be justified:

- **You have maxed out your core allocation** to mutual funds, PPF, EPF and insurance, and have disposable surplus to speculate with.
- **You want exposure to blockchain technology** as a secular growth trend and are willing to accept the risk of total loss.
- **You understand the tax implications** and are prepared to maintain detailed records for ITR filing.
- **You are allocating no more than 5 to 10 percent** of your investable portfolio, an amount whose total loss would not affect your financial goals.

## When mutual funds are the clear winner

For the vast majority of financial goals, building a corpus for retirement, funding children's education, saving for a house, or creating a passive income stream, mutual funds are the better choice. They offer professional management, diversification, regulatory protection, tax efficiency and a proven long-term track record.

If you are a salaried Indian investor with goals that are 5 to 20 years away, a portfolio of diversified equity mutual funds through SIP, supplemented by debt funds for stability, covers the core of your investment needs. Adding crypto is optional and should only happen after this foundation is solid.

## The hybrid approach

Many prudent investors treat crypto as a satellite allocation alongside a core mutual fund portfolio. The structure looks like this:

- **Core (80-95 percent):** diversified equity mutual funds (large-cap index fund + flexi-cap + mid-cap), debt funds for near-term goals, ELSS for tax saving.
- **Satellite (5-20 percent of equity allocation):** Bitcoin and possibly Ethereum for crypto exposure.

This approach ensures that even in the worst-case crypto scenario, a total loss of the satellite allocation, your overall financial plan remains intact.

## Bottom line

Mutual funds and cryptocurrency serve fundamentally different purposes. Mutual funds are the building blocks of a financial plan: regulated, diversified, tax-efficient and time-tested. Cryptocurrency is a high-risk, high-reward speculative asset that may have a place in your portfolio, but not at the centre of it.

Start with mutual funds. Build your SIPs. Let compounding do its work over decades. If you then have surplus capital and genuine interest in the crypto space, allocate a small, defined amount, and maintain the discipline to not let a good year in crypto tempt you into abandoning the boring investments that actually build wealth.

This article is for educational purposes and does not constitute financial or investment advice.`,
    faq: [
      {
        q: "Is it better to invest in cryptocurrency or mutual funds in India?",
        a: "For most Indian investors, mutual funds are better for long-term wealth building due to SEBI regulation, lower tax rates, diversification and SIP infrastructure. Cryptocurrency can be a small speculative allocation of 5-10 percent for those who understand the risks and have their core investments in order.",
      },
      {
        q: "Can I do SIP in cryptocurrency like mutual funds?",
        a: "Some Indian crypto exchanges offer auto-buy features that work like a SIP by purchasing crypto at regular intervals. However, each purchase creates a taxable event with 1 percent TDS, and there is no regulatory framework like SEBI governing these auto-buy plans.",
      },
      {
        q: "What is the tax difference between crypto and mutual funds in India?",
        a: "Crypto gains are taxed at a flat 30 percent with no loss set-off and 1 percent TDS on each transaction. Equity mutual fund long-term gains above Rs 1.25 lakh are taxed at 12.5 percent, with loss set-off allowed. This makes mutual funds significantly more tax-efficient.",
      },
      {
        q: "Are mutual fund returns better than cryptocurrency returns?",
        a: "Bitcoin has historically delivered higher annualised returns than mutual funds, but with extreme volatility and 50-80 percent drawdowns. Mutual funds offer steadier 10-18 percent CAGR with smaller drawdowns. Real investor returns in crypto are often much lower than headline figures because of panic selling.",
      },
      {
        q: "Can I lose all my money in mutual funds?",
        a: "Losing your entire investment in a diversified mutual fund is virtually impossible because the fund holds many securities and is regulated by SEBI. In a severe market crash, equity funds can lose 30-40 percent temporarily, but historical data shows full recovery over time. Crypto assets can lose 90-100 percent permanently.",
      },
      {
        q: "Should I invest in Bitcoin or an index fund in India?",
        a: "For core wealth building, a Nifty 50 index fund is more suitable due to lower tax, regulatory protection, and consistent compounding. Bitcoin can be a small supplementary allocation for those who accept its volatility and the 30 percent flat tax. Most financial planners recommend index funds first.",
      },
      {
        q: "Is cryptocurrency regulated by SEBI?",
        a: "No, cryptocurrency is not regulated by SEBI. Indian crypto exchanges must register with the Financial Intelligence Unit under anti-money-laundering laws, but there is no investor protection framework equivalent to what SEBI provides for mutual funds and stocks.",
      },
      {
        q: "How much of my portfolio should be in cryptocurrency?",
        a: "Most financial experts recommend limiting crypto exposure to 5-10 percent of your total investment portfolio, and only after you have established an emergency fund, insurance, and regular mutual fund SIPs. The amount should be money you can afford to lose entirely without affecting your financial goals.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  3. Cryptocurrency vs Gold Investment in India                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "cryptocurrency-vs-gold-investment-india",
    title:
      "Cryptocurrency vs Gold Investment in India: Detailed Comparison",
    excerpt:
      "A thorough comparison of cryptocurrency (Bitcoin) and gold as investment options for Indian investors — covering returns, volatility, tax treatment, regulation, cultural significance, and how each fits into a diversified portfolio.",
    category: "Investing",
    readMinutes: 11,
    date: "Sep 4, 2026",
    keywords: [
      "crypto vs gold",
      "bitcoin vs gold india",
      "cryptocurrency vs gold investment",
    ],
    art: { variant: "coins", palette: "brass" },
    bodyMarkdown: `Gold and cryptocurrency are two asset classes that share a surprising number of surface similarities while being fundamentally different in almost every way that matters. Both are often described as stores of value, both exist outside the traditional banking system, both have finite or limited supply, and both attract investors looking for alternatives to equities and fixed deposits.

Yet gold has been a trusted store of wealth for thousands of years, woven into the cultural and economic fabric of Indian society. Cryptocurrency, by contrast, is barely fifteen years old, runs on code rather than physical atoms, and remains one of the most volatile asset classes in history.

This comparison breaks down every meaningful dimension so Indian investors can make an informed decision about where each asset, if either, fits in their portfolio.

## Gold's role in India

India is the world's second-largest consumer of gold. The metal is far more than an investment here; it is a cultural institution. Gold jewellery is central to weddings, gifted during festivals, and passed down as family heirlooms across generations. The emotional and social value attached to gold in India has no equivalent in most other countries.

From a purely financial perspective, gold has served Indian investors well:

- **Inflation hedge.** Gold prices in INR have historically kept pace with or exceeded inflation over long periods. When the rupee weakens against the dollar, gold denominated in rupees tends to rise, providing a natural hedge against currency depreciation.
- **Crisis asset.** During market crashes, geopolitical tensions and economic uncertainty, gold prices typically rise as investors seek safe havens.
- **Liquidity.** Gold can be sold at any jeweller, bank or online platform with minimal friction.

### Modern forms of gold investment

Indian investors today have multiple ways to invest in gold beyond physical jewellery:

- **Sovereign Gold Bonds (SGBs):** issued by the RBI, these offer exposure to gold prices plus a 2.5 percent annual interest payment. Capital gains are tax-free if held to maturity (eight years). Widely considered the most tax-efficient way to invest in gold in India.
- **Gold ETFs:** traded on stock exchanges, these track domestic gold prices with expense ratios of 0.5 to 1 percent. Subject to capital gains tax.
- **Digital gold:** platforms like Paytm, PhonePe and Google Pay allow buying gold in small quantities (as low as Re 1), stored in insured vaults.
- **Physical gold:** bars, coins and jewellery. Carries making charges (10-25 percent for jewellery), storage costs and purity concerns.

## Cryptocurrency's value proposition

Bitcoin, the dominant cryptocurrency, is often called "digital gold." The comparison is not entirely unfounded:

- Bitcoin has a hard cap of 21 million coins, creating artificial scarcity similar to gold's finite supply.
- Bitcoin exists outside the control of any government or central bank.
- Bitcoin can be transferred across borders without intermediaries.

However, the similarities largely end there. Bitcoin is a fifteen-year-old technology asset, not a centuries-old commodity. Its price movements are driven by technology adoption, regulatory news, market speculation, and institutional interest rather than by the fundamental supply-demand dynamics that drive gold prices.

Other cryptocurrencies (Ethereum, Solana, etc.) have even less in common with gold as they serve primarily as technology platforms rather than stores of value.

## Detailed comparison

| Parameter | Cryptocurrency (Bitcoin) | Gold |
|---|---|---|
| **Age** | 15 years (since 2009) | Thousands of years |
| **Physical form** | Purely digital | Physical metal (also available as ETF, SGB, digital) |
| **Supply** | Bitcoin: capped at 21 million | Finite but unknown total; ~3,000 tonnes mined annually |
| **Volatility (annual)** | 50-100% price swings common | 10-20% annual movement typical |
| **10-year CAGR (INR)** | Bitcoin: ~50-80% (with massive drawdowns) | Gold: ~10-12% |
| **Worst drawdown** | -85% (2017-18), -77% (2021-22) | -28% (2013, in USD) |
| **Regulator in India** | None for the asset; exchanges register with FIU | RBI (for SGBs), SEBI (for ETFs) |
| **Tax on gains (>3 years)** | 30% flat (Section 115BBH) | 12.5% LTCG (physical gold, ETFs); nil if SGB held to maturity |
| **Tax on gains (<3 years)** | 30% flat | Slab rate (physical); 20% STCG (ETFs after Budget 2024 changes) |
| **TDS** | 1% on purchase (Section 194S) | None |
| **Loss set-off** | Not allowed | Allowed within capital gains |
| **Cultural significance in India** | Minimal | Enormous (weddings, festivals, inheritance) |
| **Correlation with equity** | Low but increasing in recent years | Low; often negative during crises |
| **24/7 trading** | Yes | SGBs: exchange hours; ETFs: exchange hours; digital gold: 24/7 |
| **Counterparty risk** | Exchange hacking, wallet loss | Minimal for physical gold; none for SGBs |
| **Divisibility** | Up to 8 decimal places (1 satoshi = 0.00000001 BTC) | Digital gold: Re 1 onwards; physical: limited by bar/coin sizes |

## Returns: what the numbers actually show

### Gold returns in India

Gold has delivered approximately 10 to 12 percent CAGR in INR terms over the past decade. This is lower than equity mutual funds but significantly higher than fixed deposits and savings accounts after adjusting for inflation. Gold also benefits from rupee depreciation: as the INR weakens against the USD, gold prices in rupees rise even if international gold prices are flat.

Critically, gold's returns come with relatively low volatility. The worst calendar year decline for gold in INR in the last two decades was around 10 to 15 percent, and it recovered within one to two years. This makes gold a genuine portfolio stabiliser.

SGBs add 2.5 percent annual interest on top of gold price appreciation, and if held to the eight-year maturity, the capital gains are entirely tax-free. This makes SGBs one of the most attractive investment options in India across all asset classes.

### Cryptocurrency returns

Bitcoin's long-term CAGR is staggering, but the journey is brutal. An investor who bought at the peak in late 2017 waited until 2020 to break even. An investor who bought at the peak in late 2021 waited until late 2023 to recover. During the intervening periods, the portfolio was down 50 to 85 percent.

Altcoins have delivered even more extreme returns, both positive and negative. Many tokens that ranked in the top 20 by market capitalisation five years ago no longer exist or trade at 95 percent below their highs.

The key insight is that Bitcoin's CAGR is impressive only if you held through drawdowns that most human beings find psychologically impossible to endure.

## Volatility and risk

Gold's volatility profile makes it suitable for conservative investors and as a portfolio diversifier. It rarely delivers exciting returns in any single year, but it almost never causes financial distress either. An allocation of 10 to 15 percent of a portfolio to gold (via SGBs or ETFs) is widely considered prudent by financial planners.

Cryptocurrency's volatility makes it unsuitable as a core holding for any investor who cannot tolerate losing half their investment and waiting years for recovery. The asset class has no circuit breakers, no regulatory intervention during crashes, and operates 24/7, which means severe price drops can occur while you sleep.

Risk tolerance is deeply personal, but a useful test is this: if your crypto allocation dropped 70 percent overnight, would you be able to continue your daily routine without distress? If not, the allocation is too large.

## Tax treatment: a crucial differentiator

Tax is where gold, particularly SGBs, holds a decisive advantage.

**Gold (Sovereign Gold Bonds):**
- If held to the eight-year maturity: capital gains are completely tax-free.
- Interest of 2.5 percent per annum is taxable at your slab rate.
- This combination makes SGBs one of the most tax-efficient investments in India.

**Gold (physical, ETF, digital):**
- Holding period over two years (physical) or listed ETFs: long-term capital gains taxed at 12.5 percent.
- Losses can be set off against other long-term capital gains and carried forward.

**Cryptocurrency:**
- All gains taxed at a flat 30 percent under Section 115BBH, regardless of holding period.
- 1 percent TDS on every purchase above Rs 10,000 (Section 194S).
- No loss set-off whatsoever.
- No deductions beyond cost of acquisition.

The difference is stark. On a Rs 1 lakh gain, you owe Rs 30,000 in crypto tax but zero tax on an SGB held to maturity. Even gold ETF gains are taxed at 12.5 percent, less than half the crypto rate. Use our [income tax calculator](/calculators/income-tax) to model the impact.

## Regulation and safety

Gold investment in India is well-regulated:

- SGBs are issued by the RBI, backed by the Government of India. Zero counterparty risk.
- Gold ETFs are regulated by SEBI, traded on recognised stock exchanges, and held in demat form.
- Physical gold purchased from BIS-hallmarked jewellers carries purity assurance.

Cryptocurrency operates outside this safety net. Exchanges must register with the FIU under anti-money-laundering regulations, but there is no investor protection body, no insurance on holdings, and no mechanism to recover funds from a failed exchange.

The collapse of FTX in 2022, which cost investors billions globally, demonstrated that even large, seemingly reputable crypto exchanges can fail without warning. There is no equivalent scenario in the gold market because gold's value is not dependent on any single platform or institution.

## Cultural and emotional factors

In India, gold occupies a unique emotional space that no financial analysis can fully capture. It is gifted at weddings, worn as jewellery that doubles as investment, passed down through generations, and serves as a financial safety net for millions of households, particularly in rural India.

Cryptocurrency has no cultural resonance in India. It is a purely financial and technological asset, understood primarily by tech-savvy urban investors. This cultural gap means that gold will continue to be the default "alternative asset" for the vast majority of Indian households regardless of cryptocurrency's financial performance.

## Portfolio role: how each fits

### Gold's role

Gold works best as a **portfolio stabiliser and diversifier**, typically allocated at 10 to 15 percent of a balanced portfolio. During equity market crashes, gold often moves in the opposite direction, cushioning your overall portfolio decline. SGBs are the ideal vehicle for this allocation due to their interest payments and tax-free maturity.

### Cryptocurrency's role

Cryptocurrency, if included at all, works best as a **small speculative satellite allocation** of 5 to 10 percent of your equity allocation (not your total portfolio). It is an asymmetric bet: you accept the possibility of total loss in exchange for the possibility of outsized returns. Only surplus capital that you do not need for any financial goal should go here.

## Can you invest in both?

Absolutely, and many thoughtful investors do. A practical portfolio structure might look like this:

- **Equity mutual funds (50-70 percent):** core wealth-building engine via SIP. Use our [SIP calculator](/calculators/sip) to project growth.
- **Debt/fixed income (15-25 percent):** for stability, emergency fund, and near-term goals. Compare with [FD rates](/calculators/fd).
- **Gold via SGBs (10-15 percent):** diversification, inflation hedge, tax-free maturity.
- **Cryptocurrency (0-5 percent of total):** optional speculative allocation in Bitcoin or Ethereum only.

This structure ensures your financial plan is not dependent on the performance of any single asset class, and a total loss in the crypto allocation would have minimal impact on your overall wealth.

## Bottom line

Gold and cryptocurrency serve different purposes in a portfolio. Gold is a time-tested, culturally embedded, tax-efficient diversifier that belongs in most Indian portfolios. Cryptocurrency is a volatile, speculative, heavily taxed asset that may offer asymmetric upside but carries the risk of total loss.

For most Indian investors, the practical choice is not gold versus crypto but gold first, then crypto only if surplus funds and risk appetite allow. Start with SGBs for gold exposure and build a diversified mutual fund portfolio before considering any crypto allocation.

This article is for educational purposes and does not constitute financial or investment advice.`,
    faq: [
      {
        q: "Is Bitcoin better than gold as an investment in India?",
        a: "Bitcoin has delivered higher historical returns than gold but with dramatically higher volatility and a 30 percent flat tax in India. Gold offers stability, cultural significance, and far better tax treatment, especially through Sovereign Gold Bonds. For most Indians, gold is the safer and more practical choice.",
      },
      {
        q: "What is the tax on gold vs cryptocurrency in India?",
        a: "Crypto gains are taxed at 30 percent flat with no loss set-off. Gold held as SGBs for eight years is completely tax-free on capital gains. Physical gold and gold ETFs attract 12.5 percent LTCG after the applicable holding period. Gold is significantly more tax-efficient.",
      },
      {
        q: "Is gold a safer investment than cryptocurrency?",
        a: "Yes, gold is considerably safer. Its maximum drawdown in recent decades has been around 28 percent, while Bitcoin has fallen over 80 percent multiple times. Gold is also backed by thousands of years of history, cultural demand, and in the case of SGBs, the Government of India.",
      },
      {
        q: "Should I buy Sovereign Gold Bonds or Bitcoin?",
        a: "For most investors, SGBs are the better choice. They offer gold price appreciation plus 2.5 percent annual interest, and capital gains are tax-free at maturity. Bitcoin may offer higher returns but comes with extreme volatility and a 30 percent tax. Consider SGBs for your core portfolio and Bitcoin only as a small speculative allocation.",
      },
      {
        q: "How much gold and crypto should I have in my portfolio?",
        a: "Financial planners typically recommend 10-15 percent of your portfolio in gold, preferably via SGBs or gold ETFs. Cryptocurrency, if included, should be limited to 5 percent or less of your total portfolio, using only surplus funds you can afford to lose without affecting your financial goals.",
      },
      {
        q: "Can cryptocurrency replace gold as a store of value?",
        a: "It is unlikely in the near term. Gold has thousands of years of trust, physical tangibility, central bank reserves backing, and deep cultural roots in India. Bitcoin is only fifteen years old and its store-of-value narrative remains unproven through multiple economic cycles.",
      },
      {
        q: "Is digital gold the same as cryptocurrency?",
        a: "No. Digital gold is physical gold bought online and stored in insured vaults on your behalf by platforms like Paytm or PhonePe. Its value tracks actual gold prices. Cryptocurrency like Bitcoin is a decentralised digital asset whose value is determined by market speculation and adoption, not by any physical commodity.",
      },
      {
        q: "Which has better liquidity, gold or crypto in India?",
        a: "Both are reasonably liquid. Crypto markets operate 24/7 with instant settlement on exchanges. Gold ETFs and SGBs trade during market hours. Physical gold can be sold at any jeweller. For large amounts, crypto liquidity may be limited on Indian exchanges while gold markets handle volume easily.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  4. Is Cryptocurrency Legal in India?                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "is-cryptocurrency-legal-india",
    title:
      "Is Cryptocurrency Legal in India? Rules, Tax, and RBI's Stance",
    excerpt:
      "A comprehensive explainer on cryptocurrency's legal status in India — covering the 2018 RBI ban, the 2020 Supreme Court reversal, the 2022 Budget tax framework, the digital rupee, and what Indian investors can and cannot do with crypto in 2026.",
    category: "Tax",
    readMinutes: 12,
    date: "Sep 4, 2026",
    keywords: [
      "is crypto legal in india",
      "cryptocurrency legal status india",
      "rbi crypto ban",
      "crypto regulation india",
    ],
    art: { variant: "shield", palette: "deep" },
    bodyMarkdown: `Few questions about cryptocurrency generate as much confusion in India as this one: is it legal? The answer has shifted multiple times over the past eight years, from a de facto ban by the RBI, to a Supreme Court reversal, to a tax framework that simultaneously legitimises and penalises crypto transactions. Each twist has left Indian investors uncertain about what they can and cannot do.

This guide traces the full regulatory history, explains the current legal position as of 2026, lays out the tax rules in detail, and clarifies what is permitted, what is prohibited, and what remains in regulatory grey area.

## The timeline: how we got here

### 2013-2017: cautious early warnings

The Reserve Bank of India first acknowledged cryptocurrency in December 2013, issuing a press release cautioning the public against the risks of virtual currencies. Similar advisories followed in 2017 as Bitcoin's price surged and Indian exchanges saw a sharp rise in trading volumes. At this stage, the warnings were advisory; no regulatory action was taken to ban or restrict crypto.

### April 2018: the RBI circular

On April 6, 2018, the RBI issued a circular (RBI/2017-18/154) directing all entities regulated by it, including banks, NBFCs and payment systems, to stop providing services to any person or business dealing in cryptocurrencies. Existing relationships were to be wound down within three months.

This was not technically a ban on cryptocurrency itself. Individuals could still own and trade crypto. However, by cutting off banking access, the RBI made it practically impossible for exchanges to operate and for investors to deposit or withdraw rupees. Several exchanges shut down or moved offshore. Peer-to-peer (P2P) trading became the only workaround.

The crypto industry challenged the circular in the Supreme Court, arguing that the RBI had overstepped its authority and that the ban was disproportionate.

### March 2020: Supreme Court strikes down the ban

On March 4, 2020, the Supreme Court of India delivered a landmark judgment in **Internet and Mobile Association of India (IAMAI) v. Reserve Bank of India**. The three-judge bench unanimously struck down the RBI circular, ruling that:

- The RBI had failed to demonstrate that crypto trading caused any actual harm to the entities it regulates.
- The ban was disproportionate because less restrictive measures (like regulation) could have achieved the RBI's objectives.
- Cryptocurrency, being intangible property, was protected under Article 19(1)(g) of the Constitution (right to practise any profession or carry on any trade or business).

This judgment restored banking access for crypto exchanges and reopened the market in India.

### 2020-2022: regulatory vacuum

After the Supreme Court verdict, India operated in a regulatory vacuum regarding crypto. There was no law specifically governing cryptocurrency, no licensing framework for exchanges, and no tax clarity. The government introduced and withdrew a "Cryptocurrency and Regulation of Official Digital Currency Bill" multiple times without ever tabling it in Parliament.

During this period, Indian crypto trading volumes surged. Exchanges like WazirX, CoinDCX and CoinSwitch grew rapidly, and millions of new investors entered the market.

### February 2022: the Budget tax framework

Finance Minister Nirmala Sitharaman's Union Budget for 2022-23 introduced the first concrete legislative framework for cryptocurrency in India, but it came entirely through the tax code rather than a standalone regulatory bill.

**Key provisions introduced:**

1. **Section 115BBH** of the Income Tax Act: a flat 30 percent tax on income from the transfer of Virtual Digital Assets (VDAs), with no deductions except cost of acquisition.
2. **Section 194S**: 1 percent Tax Deducted at Source (TDS) on every VDA transaction above Rs 10,000 (Rs 50,000 for specified persons).
3. **Section 2(47A)**: definition of "Virtual Digital Asset" (VDA) to include any information, code, number or token generated through cryptographic means, any non-fungible token (NFT), and any other digital asset as notified by the government.

These provisions took effect on April 1, 2022 (for Section 115BBH) and July 1, 2022 (for Section 194S).

### 2023: India's G20 presidency and global coordination

During India's G20 presidency in 2023, Prime Minister Narendra Modi and Finance Minister Sitharaman pushed for a coordinated global framework for crypto regulation. India advocated for international cooperation rather than country-level bans, signalling a preference for regulation over prohibition. The G20 leaders' declaration endorsed the principle of consistent regulation of crypto assets across jurisdictions.

### 2024-2026: FIU registration and ongoing developments

In 2024, the government required all crypto exchanges operating in or accessible from India to register with the Financial Intelligence Unit (FIU-IND) under the Prevention of Money Laundering Act (PMLA). Exchanges that did not comply, including Binance, were blocked. Binance subsequently complied with FIU requirements to resume operations.

A comprehensive Cryptocurrency Regulation Bill remains pending. As of September 2026, the government has not tabled any legislation that would either ban or formally regulate cryptocurrency as a financial product.

## Current legal status: what is and is not allowed

### What you CAN do

- **Buy, sell and hold cryptocurrency** using any FIU-registered exchange operating in India.
- **Transfer crypto** to other wallets, including international wallets (though transfers to non-compliant exchanges may be flagged).
- **Accept cryptocurrency as payment** for goods or services, though the recipient is responsible for applicable taxes.
- **Mine cryptocurrency**, though the income is taxable at 30 percent.
- **Trade cryptocurrency** on Indian exchanges without fear of criminal prosecution.

### What you CANNOT do

- **Use cryptocurrency as legal tender.** No one is obligated to accept crypto as payment. Only the Indian rupee (and the digital rupee) is legal tender in India.
- **Avoid tax on crypto gains.** The 30 percent tax and 1 percent TDS are mandatory. Non-compliance is treated as tax evasion.
- **Trade on unregistered exchanges from India.** Exchanges that have not registered with the FIU are blocked, and using VPNs to access them may violate PMLA provisions.

### Grey areas

- **DeFi (Decentralised Finance) transactions:** lending, staking and yield farming on decentralised protocols are technically subject to the 30 percent tax, but enforcement and reporting mechanisms are unclear since these platforms do not have a centralised entity to deduct TDS.
- **Airdrops and gifts:** receiving cryptocurrency as a gift is taxable under Section 56(2)(x) if the value exceeds Rs 50,000. Airdrops are treated as income and taxed at 30 percent. The cost of acquisition for airdropped tokens is treated as zero.
- **Cross-border transfers:** moving crypto to or from international wallets is not prohibited, but large transfers may trigger scrutiny under FEMA (Foreign Exchange Management Act) and PMLA provisions.

## The Finance Act 2022 tax framework in detail

### Section 115BBH: the 30 percent tax

This section imposes a flat 30 percent tax (plus applicable surcharge and cess, bringing the effective rate to approximately 31.2 to 34.3 percent depending on your income level) on any income from the transfer of Virtual Digital Assets.

Key features:
- **No distinction between short-term and long-term gains.** Whether you held the crypto for one day or five years, the rate is 30 percent.
- **No loss set-off.** Losses from one VDA cannot be set off against gains from another VDA, or against any other income under any other head.
- **No deductions allowed** other than the cost of acquisition of the specific asset being transferred. You cannot deduct transaction fees, internet costs, electricity (for mining) or any other expense.
- **No basic exemption threshold.** Even a Rs 100 gain is taxable at 30 percent.

### Section 194S: the 1 percent TDS

Any person paying consideration to a resident for the transfer of a VDA must deduct TDS at 1 percent if the total value exceeds Rs 10,000 in a financial year (Rs 50,000 for specified persons, defined as individuals or HUFs whose income is below the basic exemption limit and who do not have business income).

In practice, Indian exchanges automatically deduct this TDS on every buy transaction. The TDS is not an additional tax; it is an advance payment that can be claimed as a credit when you file your income tax return.

### Section 2(47A): VDA definition

The definition of Virtual Digital Asset is deliberately broad. It covers:
- Any information, code, number or token generated through cryptographic means (covers all cryptocurrencies).
- Any non-fungible token (NFT) or any other token of similar nature.
- Any other digital asset as notified by the Central Government.

This breadth ensures that new crypto products cannot escape the tax net through semantic arguments.

## The RBI's stance: consistent opposition

The RBI has been the most vocal institutional critic of cryptocurrency in India. Its key concerns include:

**Monetary policy transmission.** If a significant portion of the population shifts savings from bank deposits to crypto, it could weaken the banking system's ability to create credit and the RBI's ability to manage interest rates.

**Financial stability.** Crypto's extreme volatility and the lack of lender-of-last-resort facilities mean that a sharp crash could cause substantial losses for retail investors without any systemic backstop.

**Rupee substitution.** The RBI fears that widespread adoption of stablecoins pegged to the US dollar could accelerate de-dollarisation of the rupee, effectively allowing Indians to hold dollar-denominated assets without going through FEMA-regulated channels.

**Money laundering and terror financing.** The pseudonymous nature of crypto transactions makes them potentially useful for illicit financial flows, though the degree of actual misuse in India has not been publicly quantified by the RBI.

Despite these concerns, the RBI has not issued a fresh ban since the Supreme Court struck down the 2018 circular. Its primary response has been the development of the Central Bank Digital Currency (CBDC).

## The Digital Rupee (CBDC)

The RBI launched pilot programs for the digital rupee in 2022:

- **Wholesale CBDC (e-Rupee-W):** for interbank settlements.
- **Retail CBDC (e-Rupee-R):** for person-to-person and person-to-merchant transactions, piloted through select banks and cities.

The digital rupee is fundamentally different from cryptocurrency:
- It is issued and controlled by the RBI.
- Its value is identical to the physical rupee (1 digital rupee = 1 physical rupee).
- It is legal tender.
- It does not use decentralised blockchain (it runs on a centralised DLT managed by the RBI).
- It offers no investment potential since its value does not fluctuate.

The digital rupee is designed to complement, not replace, cryptocurrency. It addresses the RBI's desire for a digital payment tool that it can control, while cryptocurrency remains a market-driven asset class.

## What a future regulation bill might include

While no bill has been tabled as of September 2026, public statements from government officials and the G20 discussions suggest that any future regulation is likely to include:

- **Licensing requirements** for exchanges and other crypto service providers, similar to how SEBI regulates stock brokers.
- **Consumer protection provisions**, including mandatory disclosure of risks, segregation of customer funds, and insurance or reserve requirements.
- **Anti-money-laundering compliance** beyond the current FIU registration, potentially including travel rule requirements for crypto transfers.
- **Potential restrictions** on certain categories of tokens, particularly privacy coins and unregistered securities tokens.
- **No outright ban**, given the Supreme Court precedent and India's G20 position advocating for regulation over prohibition.

## Practical guidance for Indian crypto investors

Given the current legal landscape, here is what prudent Indian investors should do:

1. **Use only FIU-registered exchanges.** This protects you legally and ensures your transactions are properly documented.
2. **Maintain complete records** of every transaction: buy price, sell price, date, transaction fees, and the exchange used. You will need these for your [ITR filing](/blog/how-to-report-crypto-itr-schedule-vda).
3. **Report all crypto income in your ITR** under Schedule VDA. Failure to report crypto income is tax evasion and carries penalties.
4. **Pay the 1 percent TDS** (exchanges handle this automatically) and claim the credit when filing returns.
5. **Do not use unregistered or VPN-accessed exchanges.** This could expose you to PMLA violations.
6. **Understand the tax implications before trading.** The 30 percent tax with no loss set-off means that frequent trading can be very tax-inefficient. Buy-and-hold strategies are more tax-efficient for crypto.
7. **Consult a chartered accountant** if you have complex crypto transactions (DeFi, staking, airdrops, mining) since the tax treatment of these activities is not fully settled.

Use our [income tax calculator](/calculators/income-tax) to model how crypto gains affect your overall tax liability.

## Bottom line

Cryptocurrency is legal to own and trade in India, but it is not recognised as legal tender. The tax framework is punitive by design, with a 30 percent flat tax and no loss set-off, likely intended to discourage speculative trading without resorting to an outright ban. The regulatory landscape is still evolving, with a comprehensive bill pending.

For investors, the practical conclusion is straightforward: you can invest in crypto through registered exchanges, but you must report every transaction and pay the applicable taxes. Treat the regulatory uncertainty as one of the risk factors in your investment decision, alongside the inherent volatility and security risks of the asset class itself.

This article is for educational purposes and does not constitute legal, tax, or financial advice.`,
    faq: [
      {
        q: "Is cryptocurrency banned in India in 2026?",
        a: "No, cryptocurrency is not banned in India. The Supreme Court struck down the RBI's 2018 banking ban in 2020, and the Finance Act 2022 introduced a tax framework for crypto transactions. You can legally buy, sell, and hold cryptocurrency through FIU-registered exchanges.",
      },
      {
        q: "What did the Supreme Court say about cryptocurrency in India?",
        a: "In March 2020, the Supreme Court struck down the RBI circular that had barred banks from servicing crypto businesses. The court ruled the ban was disproportionate and unconstitutional, noting that cryptocurrency is intangible property protected under Article 19(1)(g) of the Constitution.",
      },
      {
        q: "Is it legal to buy Bitcoin in India?",
        a: "Yes, it is legal to buy Bitcoin in India. You can purchase it through exchanges registered with the Financial Intelligence Unit such as WazirX, CoinDCX, CoinSwitch, and ZebPay. Your gains will be taxed at 30 percent flat under Section 115BBH of the Income Tax Act.",
      },
      {
        q: "Does the RBI allow cryptocurrency in India?",
        a: "The RBI has consistently expressed concerns about cryptocurrency and has advocated for a ban, but the Supreme Court overturned its 2018 ban. Currently, the RBI has no active prohibition in place. The government, not the RBI, decides crypto's legal status through legislation.",
      },
      {
        q: "What is the penalty for not reporting crypto income in India?",
        a: "Failure to report crypto income in your ITR constitutes tax evasion. Penalties include interest on unpaid tax under Section 234, a penalty of up to 200 percent of the tax due under Section 270A, and potential prosecution under Section 276C for deliberate evasion.",
      },
      {
        q: "What is a Virtual Digital Asset under Indian tax law?",
        a: "Section 2(47A) of the Income Tax Act defines a Virtual Digital Asset as any information, code, number, or token generated through cryptographic means, including all cryptocurrencies, NFTs, and any other digital asset notified by the government. This definition covers virtually every crypto product.",
      },
      {
        q: "Is the digital rupee the same as cryptocurrency?",
        a: "No. The digital rupee is a Central Bank Digital Currency (CBDC) issued and controlled by the RBI with a fixed value equal to the physical rupee. Cryptocurrency is decentralised, not government-backed, and its value fluctuates based on market forces. They serve entirely different purposes.",
      },
      {
        q: "Can I use crypto to pay for goods in India?",
        a: "While not illegal, cryptocurrency is not legal tender in India, meaning no seller is obligated to accept it. If someone does accept crypto as payment, the transaction is treated as a transfer of VDA and subject to the 30 percent tax and 1 percent TDS provisions.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  5. How to Report Cryptocurrency in ITR — Schedule VDA Guide      */
  /* ------------------------------------------------------------------ */
  {
    slug: "how-to-report-crypto-itr-schedule-vda",
    title:
      "How to Report Cryptocurrency in ITR: Schedule VDA Guide",
    excerpt:
      "A step-by-step guide to reporting cryptocurrency gains and income in your Indian income tax return — covering Schedule VDA, which ITR form to use, how to calculate gains, TDS credit, and the rules for airdrops, gifts, mining, and staking income.",
    category: "Tax",
    readMinutes: 12,
    date: "Sep 4, 2026",
    keywords: [
      "crypto itr filing",
      "schedule vda",
      "how to report crypto in income tax",
      "cryptocurrency income tax india",
    ],
    art: { variant: "card", palette: "deep" },
    bodyMarkdown: `Filing income tax returns with cryptocurrency transactions has been a source of confusion for Indian investors ever since the Finance Act 2022 introduced the Virtual Digital Asset (VDA) tax framework. The 30 percent flat tax and 1 percent TDS rules are straightforward in principle, but the practical process of reporting, calculating gains, claiming TDS credits, and handling special situations like airdrops, mining, and DeFi income trips up many taxpayers.

This guide walks you through every step of reporting cryptocurrency in your ITR, using the Schedule VDA format introduced by the Income Tax Department.

## What is Schedule VDA?

Schedule VDA is a dedicated schedule (section) in the income tax return form where you report all income from the transfer of Virtual Digital Assets. It was introduced in the ITR forms starting from Assessment Year 2023-24 (financial year 2022-23) to capture crypto-related income separately from other capital gains or business income.

The schedule requires you to list each VDA transaction individually, including:
- Type of VDA (e.g., Bitcoin, Ethereum, NFT)
- Date of transfer (sale/exchange)
- Date of acquisition (purchase)
- Sale consideration (the amount you received)
- Cost of acquisition (the amount you paid to buy)
- Income from transfer (gain or loss)

The total income from VDA transfers is then taxed at 30 percent under Section 115BBH.

## Which ITR form should you use?

The ITR form depends on your overall income profile, not just your crypto activity. Here is a guide:

**ITR-2:** if you are a salaried individual or have income from capital gains, house property, or other sources (no business income). This is the most common form for crypto investors who are salaried employees. Schedule VDA is available in this form.

**ITR-3:** if you have business or professional income in addition to VDA income. Freelancers, self-employed individuals, and business owners use this form. Schedule VDA is available here as well.

**ITR-1 (Sahaj):** this form does NOT support Schedule VDA. If you have crypto income and were previously filing ITR-1, you must switch to ITR-2 or ITR-3.

**Important:** even if you only bought crypto and did not sell, the 1 percent TDS deducted on your purchases needs to be reconciled. However, Schedule VDA only requires you to report transactions where you transferred (sold, exchanged, or spent) VDA. Buying alone does not trigger a reporting requirement in Schedule VDA, but the TDS appears in your Form 26AS / AIS.

## Step-by-step: how to fill Schedule VDA

### Step 1: gather your transaction data

Before you start filling the ITR, compile a complete list of all crypto transactions during the financial year. You will need:

- **Buy transactions:** date, quantity, price per unit, total cost (including the cost of acquisition only; fees are not deductible).
- **Sell transactions:** date, quantity, price per unit, total proceeds.
- **Exchange/swap transactions:** these count as transfers. The sale consideration is the fair market value of the crypto received.
- **Airdrops received:** date and fair market value at the time of receipt.
- **Mining/staking income:** quantity and fair market value at the time of receipt.

Most Indian exchanges provide a downloadable transaction history or a tax statement. Download this from every exchange you used during the year. Keep these records for at least six years (the period for which the Income Tax Department can reopen assessments).

### Step 2: calculate gains on each transaction

For each sell or transfer transaction, the gain is calculated as:

**Income from transfer = Sale consideration - Cost of acquisition**

Key rules for the calculation:

**Cost of acquisition** is what you paid to buy the specific units being sold. You cannot deduct transaction fees, gas fees, network charges, or any other expense. Only the purchase price of the crypto itself counts.

**FIFO or specific identification?** The Income Tax Act does not prescribe a specific method for identifying which units were sold when you have bought the same cryptocurrency at different prices over time. In practice, most tax professionals recommend using the **First In, First Out (FIFO)** method, where the earliest purchased units are treated as the first sold. Be consistent across all transactions and financial years.

**No indexation benefit.** Unlike long-term capital gains on other assets, VDA gains do not receive indexation benefits. The cost of acquisition is the actual purchase price, not adjusted for inflation.

**Cost of acquisition for gifted or airdropped crypto.** If you received cryptocurrency as a gift, the cost of acquisition is the price at which the previous owner acquired it. If you received it as an airdrop or through mining, the cost of acquisition is **zero** (since you did not pay for it). The full sale proceeds become taxable income.

### Step 3: handle losses correctly

This is where crypto taxation is most punitive. Under Section 115BBH:

- **Loss from one VDA cannot be set off against gain from another VDA.** If you made Rs 50,000 on Bitcoin and lost Rs 30,000 on Ethereum, you pay 30 percent tax on the full Rs 50,000. The Ethereum loss is wasted.
- **VDA losses cannot be set off against any other income** (salary, business, house property, other capital gains).
- **VDA losses cannot be carried forward** to subsequent financial years.

This means every profitable transaction is taxed independently, and losses provide zero tax benefit. This is a critical factor to consider before engaging in frequent trading.

### Step 4: fill in Schedule VDA in the ITR form

When you open ITR-2 or ITR-3 on the Income Tax e-filing portal, navigate to Schedule VDA. For each transaction, enter:

| Field | What to enter |
|---|---|
| Sl. No. | Sequential number (1, 2, 3...) |
| Type of VDA | Name or ticker (e.g., Bitcoin, Ethereum, Solana) |
| Date of transfer | The date you sold or transferred the crypto |
| Date of acquisition | The date you originally purchased the crypto |
| Head under which income is to be reported | Select "115BBH" |
| Cost of acquisition | Your purchase price for those specific units |
| Consideration received/accrued | The sale price or fair market value received |
| Income from transfer | Automatically calculated (consideration minus cost) |

If you have many transactions (active traders may have hundreds or thousands), you can use the bulk upload facility on the e-filing portal, which accepts transaction data in a prescribed Excel format.

### Step 5: report in the income computation

The total income from Schedule VDA flows into the income computation section of your ITR under the head "Income from VDA under Section 115BBH." This amount is taxed at 30 percent (plus applicable surcharge and 4 percent health and education cess).

This income does NOT merge with your slab income. It is taxed separately at the flat rate, similar to how long-term capital gains on equity are taxed at a flat rate.

### Step 6: claim TDS credit

The 1 percent TDS deducted by exchanges on your buy transactions appears in your:

- **Form 26AS:** the annual tax statement that shows all TDS credited to your PAN.
- **Annual Information Statement (AIS):** a more detailed version that also shows transaction-level data.

When filling your ITR, enter the TDS details in the "TDS on sale of immovable property / VDA" section (Schedule TDS2). The TDS is claimed as a credit against your total tax liability. If the TDS exceeds your actual tax (for example, if you bought but did not sell, or sold at a loss), you can claim a refund.

**Reconcile carefully.** Cross-check the TDS amount in your exchange's tax statement with the amount shown in Form 26AS / AIS. Discrepancies are common and should be resolved before filing.

## Special situations

### Crypto-to-crypto swaps

When you exchange one cryptocurrency for another (e.g., sell Ethereum and receive Solana), both legs of the transaction are taxable events:

1. The sale of Ethereum is treated as a transfer. The gain is the fair market value of Solana received minus the cost of acquisition of the Ethereum sold.
2. The cost of acquisition of the Solana received is its fair market value at the time of the swap.

This means that even if you never converted to INR, the swap triggers a 30 percent tax on any gain in the Ethereum leg.

### Airdrops

Tokens received as airdrops are treated as income at the time of receipt. Since the cost of acquisition is zero, the entire fair market value at the time of receipt is your income, taxable at 30 percent under Section 115BBH.

If you later sell the airdropped tokens, the cost of acquisition for that sale is the fair market value at which you originally reported the airdrop income. Any further gain is again taxed at 30 percent.

**Example:** you receive 100 tokens via airdrop when the token is trading at Rs 10 each. You report Rs 1,000 as VDA income (cost of acquisition = zero, value received = Rs 1,000). You later sell the tokens at Rs 15 each (Rs 1,500 total). Your gain on the sale is Rs 500 (Rs 1,500 minus Rs 1,000 cost of acquisition), taxed at 30 percent.

### Mining income

Cryptocurrency generated through mining is treated similarly to airdrops. The income at the time of receipt is the fair market value of the coins mined, with a zero cost of acquisition. This is taxed at 30 percent.

Note that **electricity costs, hardware costs and internet expenses are NOT deductible** from mining income under Section 115BBH. This makes mining particularly tax-inefficient in India.

### Staking rewards

Tokens earned as staking rewards are treated as income at the time of receipt, with a cost of acquisition of zero. The full fair market value is taxable at 30 percent.

There is ongoing debate about whether staking rewards should be treated as income at the time of receipt (the current majority view) or only when subsequently sold. The safer approach is to report and pay tax at the time of receipt.

### Gifts of cryptocurrency

If you receive cryptocurrency as a gift:

- **From a relative (as defined in the Income Tax Act):** not taxable at the time of receipt, regardless of value. When you sell, the cost of acquisition is the price the gifter originally paid.
- **From a non-relative and value exceeds Rs 50,000:** the fair market value is taxable as income from other sources under Section 56(2)(x), at your slab rate (not the 30 percent VDA rate). When you sell, the cost of acquisition is the fair market value at the time of the gift.
- **From a non-relative and value is Rs 50,000 or less:** not taxable at receipt. Cost of acquisition when sold is the fair market value at the time of the gift.

### Lost or stolen crypto

Unfortunately, the current tax framework does not provide a mechanism to claim a loss deduction for cryptocurrency that is lost due to a hack, exchange failure or lost private keys. Since there is no loss set-off for VDA transactions, even if such a loss were recognised, it could not reduce your tax liability.

## Common mistakes to avoid

**Not reporting at all.** The Income Tax Department has access to exchange data via FIU and TDS records. Non-reporting can lead to notices, penalties under Section 270A (up to 200 percent of tax evaded), and potential prosecution under Section 276C.

**Using the wrong ITR form.** If you have VDA income, you cannot use ITR-1. File ITR-2 or ITR-3. Filing with the wrong form may lead to a defective return notice.

**Netting off gains and losses.** This is the most common computational error. You cannot subtract crypto losses from crypto gains. Each profitable transaction is independently taxable at 30 percent.

**Forgetting crypto-to-crypto swaps.** Every swap is a taxable event, even if no fiat currency was involved. Many investors overlook these transactions.

**Not reconciling TDS.** If the TDS shown in Form 26AS does not match your records, you may face issues during processing. Reconcile before filing and contact the exchange if there are discrepancies.

**Deducting expenses.** Transaction fees, gas fees, platform fees and other costs cannot be deducted from VDA income. Only the cost of acquisition of the specific asset is allowed.

## Penalties for non-compliance

The penalties for failing to report or underreporting crypto income include:

| Situation | Penalty |
|---|---|
| Non-filing of ITR | Rs 5,000 penalty under Section 234F (Rs 1,000 if total income is below Rs 5 lakh) |
| Underreporting of income | 50 percent of tax due under Section 270A |
| Misreporting of income | 200 percent of tax due under Section 270A |
| Interest on late payment | 1 percent per month under Section 234B and 234C |
| Non-deduction or non-payment of TDS | Penalties under Section 271C |
| Wilful tax evasion | Prosecution under Section 276C, with imprisonment up to 7 years |

Given the severity of these penalties and the increasing sophistication of the Income Tax Department's data matching (they receive transaction data from exchanges and can cross-reference with Form 26AS and AIS), non-compliance is both risky and inadvisable.

## Tools and resources for filing

Most Indian crypto exchanges now provide annual tax reports or integrate with tax filing platforms. Here are practical steps to simplify the process:

1. **Download transaction reports** from every exchange you used during the financial year.
2. **Use a crypto tax calculator** to aggregate transactions across exchanges and compute gains using FIFO. Several third-party tools are available.
3. **Cross-reference with Form 26AS and AIS** on the Income Tax e-filing portal to ensure TDS amounts match.
4. **Consult a chartered accountant** if you have complex situations (multiple exchanges, DeFi transactions, airdrops, foreign exchange transactions).
5. **File before the deadline** (typically July 31 for non-audit cases). Late filing attracts penalties and interest.

Use our [income tax calculator](/calculators/income-tax) to estimate your total tax liability including VDA income, and plan your advance tax payments accordingly.

## Bottom line

Reporting cryptocurrency in your ITR is not optional. The combination of exchange reporting to FIU, TDS records in Form 26AS, and the Annual Information Statement gives the Income Tax Department comprehensive visibility into your crypto transactions. The 30 percent tax with no loss set-off is steep, but the penalties for non-compliance are steeper.

Keep meticulous records, report every transaction in Schedule VDA, reconcile your TDS, and file on time. If your transaction volume is high or you have non-standard income types (airdrops, mining, DeFi), engage a tax professional who understands VDA taxation.

For more on the legal framework surrounding crypto in India, read our guide on [cryptocurrency's legal status](/blog/is-cryptocurrency-legal-india).

This article is for educational purposes and does not constitute tax or legal advice.`,
    faq: [
      {
        q: "What is Schedule VDA in income tax return?",
        a: "Schedule VDA is a dedicated section in the ITR form where you report all income from selling, exchanging, or transferring Virtual Digital Assets like cryptocurrency and NFTs. It requires transaction-level details including dates, cost of acquisition, sale consideration, and the computed gain for each transfer.",
      },
      {
        q: "Which ITR form should I use if I have crypto income?",
        a: "Use ITR-2 if you are salaried with no business income, or ITR-3 if you have business or professional income. ITR-1 (Sahaj) does not support Schedule VDA, so you cannot use it if you have cryptocurrency transactions to report.",
      },
      {
        q: "Can I set off crypto losses against crypto gains in ITR?",
        a: "No. Under Section 115BBH, losses from one cryptocurrency cannot be set off against gains from another cryptocurrency or any other source of income. Each profitable transaction is independently taxed at 30 percent. Losses provide zero tax benefit and cannot be carried forward.",
      },
      {
        q: "How do I claim TDS credit on crypto transactions?",
        a: "The 1 percent TDS deducted by exchanges appears in your Form 26AS and Annual Information Statement. Enter the details in the TDS section of your ITR (Schedule TDS2). The TDS reduces your total tax payable, and if it exceeds your liability, you can claim a refund.",
      },
      {
        q: "Do I need to report crypto in ITR if I only bought and did not sell?",
        a: "You do not need to fill Schedule VDA if you only bought cryptocurrency and did not sell, exchange, or spend it. However, the 1 percent TDS on your purchases will appear in Form 26AS. Filing your ITR allows you to claim this TDS as a credit or refund.",
      },
      {
        q: "How is airdropped cryptocurrency taxed in India?",
        a: "Airdropped tokens are taxed at 30 percent on their fair market value at the time of receipt, with a cost of acquisition of zero. If you later sell the tokens, any additional gain is also taxed at 30 percent, with the cost of acquisition being the value at which you originally reported them.",
      },
      {
        q: "What happens if I do not report crypto income in my ITR?",
        a: "Non-reporting can trigger penalties of up to 200 percent of the tax evaded under Section 270A, interest under Sections 234B and 234C, and potential prosecution under Section 276C with imprisonment up to seven years. The Income Tax Department receives transaction data from exchanges.",
      },
      {
        q: "Is crypto-to-crypto swap taxable in India?",
        a: "Yes. Exchanging one cryptocurrency for another is treated as a transfer of VDA under Section 115BBH. The gain on the crypto you sold is taxable at 30 percent, even though you did not convert to INR. The received crypto's cost of acquisition becomes its fair market value at the time of swap.",
      },
    ],
  },
];
