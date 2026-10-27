// Premium, "skill-grade" finance prompts for Claude, ChatGPT and Gemini.
// These are deliberately NOT one-liners: each assigns an expert role, takes
// structured inputs, runs a multi-step analysis and returns a structured
// output — the kind of result people pay a tool or an adviser for. India- and
// globally-aware. Add a new one by appending an object to FINANCE_PROMPTS.

export type FinancePrompt = {
  slug: string;
  title: string;
  category:
    | "Planning"
    | "Investing"
    | "Tax"
    | "Debt & Loans"
    | "Budgeting"
    | "Protection"
    | "Decisions"
    | "Income";
  tagline: string;
  /** What it does and why it's more than a basic prompt. */
  description: string;
  bestWith: ("Claude" | "ChatGPT" | "Gemini")[];
  /** The full, paste-ready mega-prompt. Users fill the [bracketed] slots. */
  prompt: string;
  howToUse: string[];
  tips: string[];
  relatedCalc?: { label: string; href: string };
  keywords: string[];
};

export const FINANCE_PROMPTS: FinancePrompt[] = [
  {
    slug: "complete-financial-plan",
    title: "The Complete Financial Plan",
    category: "Planning",
    tagline: "A full, adviser-grade financial plan from one prompt.",
    description:
      "Most prompts give a budget. This builds a complete plan: a financial health score, cash-flow analysis, debt strategy, emergency-fund and insurance gaps, a retirement projection and a prioritised 90-day action list — the nine-section plan a fee-only adviser would charge for.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a fee-only fiduciary financial planner with 20 years' experience. Build me a complete personal financial plan. Work only from the facts I give, state every assumption, and never recommend specific products.

MY SITUATION
- Age / dependents: [e.g. 32, spouse + 1 child]
- Country / currency: [India, ₹]
- Monthly take-home: [amount]
- Monthly expenses (fixed + variable): [amounts or a list]
- Debts (balance, rate, tenure left): [list]
- Savings & investments (type + amount): [list]
- Insurance (life, health — cover amounts): [list]
- Top 3 goals with amounts and timelines: [list]

DELIVER, IN THIS ORDER:
1. A Financial Health Score out of 100, with the 4–5 sub-scores that drove it (savings rate, emergency fund, debt load, protection, investing) and the single biggest weakness.
2. Cash-flow analysis: where the money goes as % of income, and the realistic savings rate I should target.
3. Debt strategy: which debt to attack first and why, with the payoff order.
4. Emergency fund: the exact target and how fast to build it.
5. Protection gaps: rough life and health cover I appear to be short of (method, not a product).
6. Retirement projection: the corpus I'm on track for vs what I likely need, at a realistic and a cautious return.
7. Goal plan: the monthly investment each goal needs, inflation-adjusted, prioritised if I can't fund them all.
8. A prioritised 90-day action list (max 7 items), most impactful first.
9. The 3 numbers I should track every month.

Show the maths for anything numeric. End with one paragraph on what you'd want to know to make this sharper. Remind me this is educational, not personalised advice.`,
    howToUse: [
      "Open Claude, ChatGPT or Gemini and paste the prompt.",
      "Replace every [bracketed] slot with your real numbers (amounts only — no account numbers, PAN or passwords).",
      "Send it, then ask follow-ups like 'tighten the 90-day list to 3 items' or 'redo the retirement number at 9%'.",
    ],
    tips: [
      "Paste your real figures; vague inputs give vague plans.",
      "Verify the retirement and SIP figures on CoinMind's calculators before acting.",
    ],
    relatedCalc: { label: "Financial Health Calculator", href: "/calculators/financial-health" },
    keywords: ["complete financial plan prompt", "ai financial plan", "chatgpt financial plan prompt", "financial health score ai"],
  },
  {
    slug: "portfolio-x-ray",
    title: "Portfolio X-Ray & Rebalance",
    category: "Investing",
    tagline: "Find hidden overlap, concentration and fee drag in your portfolio.",
    description:
      "Paste your holdings and this x-rays them: overlap between funds, single-stock or sector concentration, the drag from expense ratios, and whether your risk matches your age and goal — then proposes specific rebalancing moves. Far beyond 'is my portfolio good?'.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a portfolio analyst. X-ray my portfolio for structural problems. Don't recommend specific funds to buy; critique what I hold and show me the fixes.

MY PORTFOLIO (name, type, amount, expense ratio if known):
[e.g. Fund A — large-cap equity — ₹4,00,000 — 0.5%
Fund B — flexi-cap — ₹3,00,000 — 1.1%
Direct stocks — ₹2,00,000
PPF — ₹3,00,000
FD — ₹2,00,000]
My age: [age]. Goal + horizon: [e.g. retirement in 25 years]. Risk comfort: [low/medium/high].

ANALYSE AND RETURN:
1. Current asset allocation (equity / debt / gold / cash) as a table with %.
2. Likely overlap: funds that probably hold the same top stocks, and the concentration risk that creates.
3. Concentration flags: any single stock, sector or AMC that is too large a share.
4. Fee drag: estimated annual cost from expense ratios in ₹, and what that compounds to over 10 years.
5. Risk fit: is this allocation right for my age and horizon, or too aggressive/too safe? Be specific.
6. A rebalancing plan: the exact % shifts to make (by category, not product), and the order to do them tax-efficiently.
7. The one change that would most improve this portfolio.

State your assumptions. This is analysis, not investment advice.`,
    howToUse: [
      "List every holding with its type and amount (and expense ratio if you know it).",
      "Paste into Claude or ChatGPT and add your age, goal and risk comfort.",
      "Ask it to 'show the 10-year fee drag in rupees' or 'redo for a 10-year horizon'.",
    ],
    tips: ["Group tiny holdings together to keep it readable.", "Re-run it once a year or after big market moves."],
    relatedCalc: { label: "Net Worth Calculator", href: "/calculators/net-worth" },
    keywords: ["portfolio analysis prompt", "portfolio x-ray ai", "rebalance portfolio chatgpt", "mutual fund overlap ai"],
  },
  {
    slug: "debt-payoff-war-plan",
    title: "Debt Payoff War Plan",
    category: "Debt & Loans",
    tagline: "The fastest, cheapest order to clear every debt — with the exact date.",
    description:
      "Compares avalanche vs snowball on your actual debts, finds the optimal payoff order, the debt-free date, total interest saved, and whether consolidation or a balance transfer helps. A real plan with numbers, not 'pay high-interest first'.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a debt-payoff strategist. Build me a complete plan to become debt-free as fast and cheaply as possible.

MY DEBTS (name, balance, interest rate, minimum/EMI):
[e.g. Credit card — ₹1,20,000 — 42% — ₹6,000
Personal loan — ₹3,00,000 — 14% — ₹10,000
Car loan — ₹4,00,000 — 9% — ₹9,500]
Extra amount I can put toward debt each month: [amount]

RETURN:
1. Two plans side by side — Avalanche (highest rate first) vs Snowball (smallest balance first): for each, the payoff order, the debt-free date, and total interest paid.
2. Which plan I should choose and the honest trade-off (maths vs motivation).
3. A month-by-month payment schedule for the first 6 months of the recommended plan.
4. Whether a consolidation loan or balance transfer at [rate, if you have an offer] would beat this, after fees.
5. The total interest I'd save vs paying only minimums.
6. Two realistic ways to find extra money to accelerate it.

Show the maths. Flag any debt whose rate is so high it should be the absolute priority.`,
    howToUse: [
      "List each debt with its balance, rate and minimum payment.",
      "Add the extra you can pay monthly, paste into any AI, and send.",
      "Ask 'show the full schedule to debt-free' or 'what if I add ₹5,000 more'.",
    ],
    tips: ["Include card debt even if small — its rate usually makes it the priority.", "Re-run after each debt is cleared."],
    relatedCalc: { label: "EMI Calculator", href: "/calculators/emi" },
    keywords: ["debt payoff plan prompt", "avalanche vs snowball ai", "chatgpt debt plan", "become debt free ai"],
  },
  {
    slug: "tax-regime-optimizer",
    title: "Tax Optimizer (India): Regime + Restructure",
    category: "Tax",
    tagline: "Not just new vs old — how to legally pay less, step by step.",
    description:
      "Compares the new and old regime on your exact numbers, finds unused 80C/80D headroom, and suggests a salary restructure (HRA, NPS, LTA, reimbursements) that lowers tax — the kind of optimisation a CA does, explained with the maths.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a chartered accountant who specialises in salaried tax planning in India, FY 2026-27. Help me legally minimise my tax. Be precise and show every step.

MY DETAILS
- Annual CTC / gross salary: [amount]
- Current salary structure if known (Basic, HRA, etc.): [list or 'not sure']
- Rent I pay / city (metro or non-metro): [amount, city]
- Current deductions used — 80C: [amount], 80D: [amount], home-loan interest: [amount], NPS 80CCD(1B): [amount]
- Other income: [amount]

DELIVER:
1. Tax under the NEW regime vs the OLD regime, step by step with the slabs, standard deduction and Section 87A rebate. State which saves more and by how much.
2. If old regime wins or is close: the unused 80C/80D/NPS headroom I have, and the most efficient way to fill it.
3. A salary-restructure suggestion (HRA, LTA, NPS employer share, reimbursements) that could cut tax further, with the estimated saving — as a legal, declarable structure, not a loophole.
4. The net in-hand difference per month from your recommendations.
5. A short checklist of proofs/documents I'd need.

Show the maths at every step. Tell me to confirm the final figure on an official calculator and with my employer before acting.`,
    howToUse: [
      "Fill in your CTC, rent/city and current deductions.",
      "Paste into Claude or ChatGPT; it compares regimes and finds savings.",
      "Confirm the final number on CoinMind's income-tax calculator before filing.",
    ],
    tips: ["Give it today's slabs if you're unsure it has them.", "Ask for the restructure 'as a table my HR can action'."],
    relatedCalc: { label: "Income Tax Calculator", href: "/calculators/income-tax" },
    keywords: ["tax saving prompt india", "chatgpt tax optimization", "new vs old regime ai", "salary restructure tax prompt"],
  },
  {
    slug: "rent-vs-buy-model",
    title: "Rent vs Buy: 10-Year Model",
    category: "Decisions",
    tagline: "The full opportunity-cost model, not a gut feeling.",
    description:
      "Builds a proper 10-year model: total cost of buying (EMI, interest, maintenance, stamp duty, opportunity cost of the down payment) vs renting and investing the difference — with the break-even year and what would flip the decision.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a financial modeller. Build a rigorous rent-vs-buy comparison for my situation over 10 years. Don't give a generic answer — model it.

INPUTS
- Property price / city: [amount]
- Down payment I'd make: [amount]
- Home loan: [rate]%, [years]
- Current rent for a similar home: [amount/month], expected rent rise: [%/yr]
- Maintenance, property tax, insurance on the owned home: [amount/yr or estimate]
- Stamp duty + registration: [% or amount]
- Expected property appreciation: [%/yr]
- Return if I invest the down payment + monthly difference instead: [%/yr]

RETURN:
1. Total 10-year cost of BUYING: EMI paid, interest, maintenance, stamp duty, minus the home's value at year 10.
2. Total 10-year outcome of RENTING + INVESTING the down payment and any monthly saving.
3. The net worth difference at year 10 under each path.
4. The break-even year — when buying starts to win (if ever).
5. A sensitivity note: which single assumption changes the answer most (appreciation vs investment return).
6. A clear recommendation for my inputs, and the honest non-financial factors I should weigh.

Show the yearly table. State assumptions.`,
    howToUse: [
      "Fill in the property, loan, rent and return assumptions.",
      "Paste into Claude or ChatGPT; it builds the 10-year model.",
      "Change one assumption and ask it to re-run to see sensitivity.",
    ],
    tips: ["Be honest about the investment return you'd actually get.", "Cross-check with CoinMind's rent-vs-buy calculator."],
    relatedCalc: { label: "Rent vs Buy Calculator", href: "/calculators/rent-vs-buy" },
    keywords: ["rent vs buy prompt", "rent or buy ai model", "chatgpt rent vs buy", "should i buy a house ai"],
  },
  {
    slug: "prepay-vs-invest-optimizer",
    title: "Prepay vs Invest Optimizer",
    category: "Debt & Loans",
    tagline: "The after-tax, break-even answer to the surplus-cash question.",
    description:
      "Works out whether your surplus should prepay the loan or go into investments — after tax, after the interest deduction, with the exact break-even return above which investing wins. The nuanced answer, not 'depends'.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a financial analyst. Tell me whether to prepay my loan or invest my surplus, with the maths.

INPUTS
- Loan: outstanding [amount], rate [%], [years] left, type [home/personal/car]
- Monthly surplus available: [amount]
- My tax regime: [old/new]; do I claim home-loan interest? [yes/no]
- Expected return if I invest instead (be realistic): [%]

RETURN:
1. The effective cost of the loan after any tax deduction.
2. Scenario A — prepay the surplus: interest saved and new payoff date.
3. Scenario B — invest the surplus at your assumed return: expected value over the same period, after tax on gains.
4. The break-even return: above this, investing wins; below it, prepaying wins.
5. A recommendation for my case, plus the behavioural angle (guaranteed saving vs uncertain return) and when you'd switch.
6. A hybrid split, if that's smarter than all-or-nothing.

Show the maths. Note this is educational.`,
    howToUse: [
      "Enter your loan details, surplus, tax regime and expected return.",
      "Paste into any AI; it gives the break-even and a recommendation.",
      "Verify with CoinMind's prepay-vs-investing comparison.",
    ],
    tips: ["Use a realistic equity return (10–12%), not a best case.", "High-rate personal/card debt almost always wins by prepaying."],
    relatedCalc: { label: "Prepay vs Investing", href: "/comparisons/loan-prepayment-vs-investing" },
    keywords: ["prepay vs invest prompt", "should i prepay home loan ai", "chatgpt prepay or invest", "loan prepayment ai"],
  },
  {
    slug: "insurance-gap-audit",
    title: "Insurance Gap & Cover Audit",
    category: "Protection",
    tagline: "How much life and health cover you're really short of.",
    description:
      "Uses the Human Life Value method to size the term cover your family needs, checks your health cover against real hospital costs, and reviews whether your existing policies are the right type — exposing the gaps most people don't see.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are an insurance adviser who sells nothing and earns no commission. Audit my protection and tell me exactly where I'm under- or over-covered. Recommend cover amounts and types, never specific companies or products.

MY SITUATION
- Age, dependents, who relies on my income: [details]
- Annual income + years to retirement: [amount, years]
- Outstanding loans: [amount]
- Current life cover (term + any traditional/ULIP): [amounts and types]
- Current health cover (self + family, sum insured): [amount]
- City (affects hospital costs): [city]
- Liquid savings: [amount]

RETURN:
1. Life cover needed by the Human Life Value method (income replacement + loans − assets), and the gap vs what I have.
2. Whether any traditional/ULIP policy I hold is doing a protection job or should be reviewed (explain the maths, don't just say 'buy term').
3. Health cover: is my sum insured realistic for my city's hospital costs? The gap, and whether a super top-up makes sense.
4. Any cover I'm wasting money on.
5. A prioritised fix list (most urgent gap first) with target cover amounts.

Show your working. This is educational, not advice.`,
    howToUse: [
      "Enter your income, dependents, loans and current policies.",
      "Paste into Claude or ChatGPT for a gap analysis.",
      "Use it to shop for the right cover amount — then compare real policies.",
    ],
    tips: ["Separate term cover from any investment-linked policy when you list them.", "Pair with the LIC/ULIP surrender prompt if you hold one."],
    keywords: ["insurance gap analysis prompt", "how much term insurance ai", "human life value prompt", "health cover audit ai"],
  },
  {
    slug: "lic-ulip-surrender-decision",
    title: "LIC / ULIP Surrender Decision",
    category: "Protection",
    tagline: "Keep it or surrender it? The IRR answer, not an opinion.",
    description:
      "Calculates the real return (IRR) your endowment or ULIP is giving, compares continuing vs surrendering and investing the proceeds, and factors in the surrender loss — so you decide on maths, not sunk-cost guilt.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are an actuary-minded financial analyst. Help me decide whether to continue or surrender my traditional/ULIP insurance policy. Be objective and show the maths.

POLICY DETAILS
- Type (endowment / money-back / ULIP): [type]
- Annual premium: [amount]
- Premiums paid so far / term / years left: [details]
- Sum assured: [amount]
- Current surrender value (or fund value for ULIP): [amount]
- Projected maturity value: [amount, if known]

RETURN:
1. The approximate IRR (real annual return) if I continue to maturity.
2. The IRR if I surrender now and invest the surrender value + future premiums in, say, a balanced/equity option at a realistic return — compared over the same remaining years.
3. The one-time loss from surrendering, and how long it takes the alternative to recover it.
4. The protection angle: if I surrender, what pure term cover would replace the life cover, and at what cost.
5. A clear recommendation for my numbers, with the break-even assumptions stated.

Ignore sunk cost — decide on what's best from today. Show all working. Educational only.`,
    howToUse: [
      "Gather your policy's premium, years paid, surrender value and maturity value.",
      "Paste into Claude or ChatGPT for the IRR comparison.",
      "If you surrender, plan replacement term cover first.",
    ],
    tips: ["Get the exact surrender value from the insurer before deciding.", "Never drop life cover without a replacement in place."],
    keywords: ["should i surrender lic prompt", "ulip surrender ai", "endowment policy irr prompt", "surrender vs continue ai"],
  },
  {
    slug: "fire-number-roadmap",
    title: "FIRE Number & Roadmap",
    category: "Planning",
    tagline: "Your real early-retirement number and the years to get there.",
    description:
      "Computes your FIRE corpus (lean/regular/fat), the safe withdrawal it supports, the years to reach it at your savings rate, and plans for sequence-of-returns risk — a full early-retirement model, not a 25x rule of thumb.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a FIRE (Financial Independence, Retire Early) planner. Build my personalised FIRE roadmap with the maths.

INPUTS
- Age, country/currency: [details]
- Current annual expenses: [amount]
- Current invested corpus: [amount]
- Monthly amount I can invest: [amount]
- Expected real (after-inflation) return: [%, e.g. 6–7%]
- Target retirement age (or 'as soon as possible'): [age]

RETURN:
1. My FIRE number at three levels — Lean, Regular and Fat FIRE — using a safe withdrawal rate you justify (state it).
2. The corpus I'm on track for and the year I'd hit each level at my current savings rate.
3. What raising my savings by 10% or cutting expenses 10% does to the timeline.
4. Coast FIRE: the amount I'd need invested today to coast to a normal retirement with no further investing.
5. Sequence-of-returns risk: how a bad first few years would affect me, and a simple way to protect against it (cash buffer / bucket approach).
6. The 3 highest-impact moves to reach FIRE sooner.

Show the maths and state your return and withdrawal assumptions.`,
    howToUse: [
      "Enter your expenses, corpus, monthly investment and expected real return.",
      "Paste into any AI for your FIRE number and timeline.",
      "Stress-test it: ask 'what if returns are 2% lower'.",
    ],
    tips: ["Use a real (after-inflation) return, around 6–7%, not a nominal 12%.", "Cross-check the corpus on the FIRE calculator."],
    relatedCalc: { label: "FIRE Calculator", href: "/calculators/fire" },
    keywords: ["fire number prompt", "early retirement ai plan", "coast fire prompt", "financial independence ai"],
  },
  {
    slug: "goal-investment-roadmap",
    title: "Goal-Based Investment Roadmap",
    category: "Investing",
    tagline: "Fund every life goal — prioritised, inflation-adjusted, with trade-offs.",
    description:
      "Takes all your goals at once (house, education, car, retirement), inflation-adjusts each, works out the monthly investment and suitable asset mix per goal, and — if you can't fund them all — prioritises them honestly. A multi-goal plan, not a single SIP number.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a goal-based financial planner. Build a roadmap that funds all my goals from my available savings, and tell me honestly if I can't.

MY GOALS (target amount in today's money, years away):
[e.g. House down payment — ₹20,00,000 — 5 yrs
Child's education — ₹30,00,000 — 15 yrs
Car — ₹10,00,000 — 3 yrs
Retirement — ₹3,00,00,000 — 25 yrs]
Total I can invest per month, across all goals: [amount]
Assume realistic returns and India inflation (state them).

RETURN:
1. Each goal's future cost after inflation.
2. The monthly investment and a suitable asset mix (equity/debt) for each goal, based on its time horizon.
3. The total monthly amount all goals need vs what I have — and the shortfall if any.
4. If there's a shortfall: a prioritised plan (which goals to fully fund, which to scale back or delay, and why).
5. The single change that frees up the most room (step-up SIP, extending a timeline, trimming a goal).
6. A one-line summary per goal: on track / at risk / underfunded.

Show the maths. Educational, not advice.`,
    howToUse: [
      "List every goal with its today-value cost and timeline.",
      "Add your total monthly investable amount and paste into Claude or ChatGPT.",
      "Ask it to 're-run if I can invest ₹5,000 more' or 'delay the car by 2 years'.",
    ],
    tips: ["Short goals (<3 yrs) should lean debt; long goals can lean equity.", "Verify each goal's SIP on the goal calculators."],
    relatedCalc: { label: "Financial Goal Calculator", href: "/calculators/goal" },
    keywords: ["goal based investing prompt", "multiple financial goals ai", "sip for goals prompt", "investment roadmap ai"],
  },
  {
    slug: "budget-autopsy",
    title: "Budget Autopsy & Behavioural Audit",
    category: "Budgeting",
    tagline: "Find the leaks and the habits behind them.",
    description:
      "Analyses a month of spending to find not just where money goes, but the behavioural patterns causing the leaks (lifestyle creep, subscription stacking, convenience spending) and builds a system to fix them. The 'why', not just the 'what'.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a behavioural finance coach. Do an autopsy on my spending — find the leaks and the habits behind them, then give me a system to fix it.

MY EXPENSES LAST MONTH (amounts only):
[paste a categorised or raw list]
Monthly take-home: [amount]. Anything unusual last month: [note].

RETURN:
1. Spending by category as % of income, with a table and the 3 biggest categories.
2. The specific leaks — recurring, low-value or impulse spends that add up — in rupees per year.
3. The behavioural pattern behind each leak (lifestyle creep, subscription stacking, convenience/decision fatigue, emotional spending) in plain language.
4. A realistic target budget and savings rate — not a punishing one.
5. A system to fix it: 3 automatic rules or frictions (e.g. auto-transfer on payday, a 24-hour rule, cancelling X) that work without willpower.
6. The single change that saves the most per year.

Be direct but kind. Don't moralise.`,
    howToUse: [
      "Export or type a month of expenses (remove any account identifiers).",
      "Paste into Claude or ChatGPT with your take-home pay.",
      "Ask it to 'turn the fixes into a payday checklist'.",
    ],
    tips: ["A raw list is fine — it will categorise for you.", "Re-run quarterly to catch new leaks."],
    relatedCalc: { label: "Budget Planner", href: "/tools/budget-planner" },
    keywords: ["spending analysis prompt", "budget audit ai", "find money leaks chatgpt", "behavioural finance prompt"],
  },
  {
    slug: "fund-stock-due-diligence",
    title: "Mutual Fund / Stock Due Diligence",
    category: "Investing",
    tagline: "A rigorous checklist to vet an investment before you buy.",
    description:
      "Runs a fund or stock through a structured due-diligence checklist — the right questions on quality, valuation, risk and fit — so you make an informed decision instead of chasing past returns. It frames the analysis; it does not tell you to buy.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are an investment analyst who teaches due diligence. I'm considering [fund or stock name]. Don't tell me to buy or sell — walk me through a rigorous checklist and help me reason, using the facts I provide (paste any data you have; ask me for what's missing).

RUN THIS CHECKLIST:
1. What it is and what I'd actually own (category, what it invests in, where it sits in a portfolio).
2. Quality: for a fund — strategy consistency, fund-manager tenure, AUM size, expense ratio vs peers; for a stock — business model, moat, profitability and debt.
3. Track record read correctly: how to judge returns across market cycles, not just the last 1–3 years, and the benchmark to compare against.
4. Valuation / cost: is it expensive right now (P/E, premium to NAV, or expense drag), and why that matters.
5. Risk: the specific ways this can lose money, and the max drawdown I should expect.
6. Fit: does it suit my goal, horizon and existing holdings — or duplicate what I have?
7. The 3 questions I must answer before buying, and the one red flag that would make you walk away.

Be objective and educational. This is not a recommendation.`,
    howToUse: [
      "Name the fund or stock and paste any data you have (returns, ratios, holdings).",
      "Paste into Claude or ChatGPT; it runs the checklist and asks for gaps.",
      "Use its questions to research the official factsheet or filings yourself.",
    ],
    tips: ["Give it the latest factsheet numbers — don't rely on its memory.", "Great for learning HOW to evaluate, not for a hot tip."],
    keywords: ["mutual fund analysis prompt", "stock due diligence ai", "how to analyse a fund chatgpt", "investment research prompt"],
  },
  {
    slug: "retirement-withdrawal-strategy",
    title: "Retirement Withdrawal (SWP) Strategy",
    category: "Planning",
    tagline: "Make your retirement corpus last — tax-efficiently.",
    description:
      "Designs a drawdown plan: a safe monthly withdrawal, a bucket strategy to survive bad markets (sequence-of-returns risk), and a tax-efficient order to pull from different accounts — the hard part of retirement most calculators skip.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a retirement-income planner. Design a withdrawal strategy so my corpus lasts through retirement without running out.

INPUTS
- Current / retirement age and life expectancy to plan for: [ages]
- Retirement corpus and where it sits (equity funds, debt/FD, EPF/PPF/NPS, cash): [amounts]
- Monthly income I need in today's money: [amount]
- Expected return and inflation (state if unsure): [%]

RETURN:
1. A safe monthly withdrawal my corpus can support, with the withdrawal-rate logic you used.
2. Whether my corpus is enough for my target income and life expectancy — and the shortfall/surplus.
3. A bucket strategy: how much to keep in cash/short-term (1–3 years of spending), medium-term debt, and long-term equity, and why — to survive a market crash early in retirement.
4. A tax-efficient withdrawal order across my accounts.
5. A rule for adjusting withdrawals in bad years so I don't deplete the corpus.
6. The biggest risk to this plan and how to reduce it.

Show the maths and state assumptions. Educational, not advice.`,
    howToUse: [
      "Enter your corpus by account type, the income you need and your horizon.",
      "Paste into Claude or ChatGPT for a drawdown + bucket plan.",
      "Revisit yearly and after big market moves.",
    ],
    tips: ["Plan for a longer life than you expect.", "Keep 1–3 years of spending in safe assets to ride out crashes."],
    relatedCalc: { label: "SWP Calculator", href: "/calculators/swp" },
    keywords: ["retirement withdrawal strategy prompt", "swp plan ai", "make retirement corpus last", "bucket strategy prompt"],
  },
  {
    slug: "salary-ctc-restructure",
    title: "Salary Negotiation & CTC Restructure",
    category: "Income",
    tagline: "Negotiate more — and structure the CTC to keep more.",
    description:
      "Gives you a negotiation script backed by your value, plus a tax-efficient way to structure the offered CTC (HRA, NPS, LTA, reimbursements) so your in-hand rises even if the headline number doesn't. Two levers most people leave on the table.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a compensation strategist and a tax-aware CA. Help me (a) negotiate a better offer and (b) structure the CTC to maximise in-hand, legally.

CONTEXT
- Role / experience / location: [details]
- Current CTC and the offered/target CTC: [amounts]
- My key achievements and value (numbers if possible): [list]
- Current salary structure if known: [list or 'not sure']
- Rent I pay / city: [amount, city]; tax regime: [old/new]

RETURN:
PART A — Negotiation
1. A realistic target range for my role/location and why.
2. A concise negotiation script that leads with value, including how to respond to 'that's our max'.
3. Non-salary levers to ask for (joining bonus, ESOPs, notice buyout, WFH, review timeline).

PART B — CTC Restructure
4. A tax-efficient structure for the CTC (Basic, HRA, NPS employer share, LTA, reimbursements) as a table, with the estimated tax saving vs a plain structure.
5. The net monthly in-hand under the plain vs the optimised structure.
6. A short list of what to confirm with HR.

Keep it practical and declarable — no grey-area tricks. Educational.`,
    howToUse: [
      "Add your role, current/target CTC, achievements and city.",
      "Paste into Claude or ChatGPT for a script + a CTC structure.",
      "Take the structure table to HR to action.",
    ],
    tips: ["Lead with quantified achievements, not needs.", "A higher Basic helps some allowances but raises your PF — ask it to balance."],
    relatedCalc: { label: "Take-Home Salary Calculator", href: "/calculators/take-home-salary" },
    keywords: ["salary negotiation prompt", "ctc restructure tax prompt", "negotiate salary ai", "increase in-hand salary ai"],
  },
  {
    slug: "freelancer-money-system",
    title: "Freelancer & Business-Owner Money System",
    category: "Income",
    tagline: "Budget irregular income, plan tax, and never run dry.",
    description:
      "Builds a money system for variable income: a buffer-and-salary approach so irregular pay feels steady, a tax plan (India 44ADA presumptive, advance tax, GST), and a runway tracker. The stuff salaried-focused advice ignores.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a financial planner for freelancers and small-business owners in India. Build me a money system that handles irregular income.

MY SITUATION
- Work / rough annual income and how lumpy it is: [details]
- Business expenses: [amount or %]
- Current savings / buffer: [amount]
- Personal monthly expenses: [amount]
- GST registered? [yes/no]

RETURN:
1. A 'pay yourself a salary' system: how big a buffer account to hold, and the fixed monthly amount to draw so irregular income feels steady.
2. The percentage of every payment I should immediately split into: taxes, buffer, business costs and personal — with the rationale.
3. Tax plan: whether the 44ADA presumptive scheme fits me, how advance tax works and the dates, and a simple way to set aside tax as I earn.
4. A GST note if applicable (thresholds, what to set aside).
5. A runway tracker: how many months I could survive a dry spell, and the target.
6. The first 3 systems to set up, in order.

Keep it concrete and India-aware. Educational, not tax advice.`,
    howToUse: [
      "Describe your income pattern, expenses and buffer.",
      "Paste into Claude or ChatGPT for a full system.",
      "Set up the buffer account and the auto-split first.",
    ],
    tips: ["Split every incoming payment the day it lands.", "Set aside tax as you earn — don't scramble in March."],
    relatedCalc: { label: "Income Tax Calculator", href: "/calculators/income-tax" },
    keywords: ["freelancer finance prompt", "irregular income budgeting ai", "44ada tax prompt", "self employed money system"],
  },
  {
    slug: "net-worth-growth-engine",
    title: "Net Worth Growth Engine",
    category: "Planning",
    tagline: "A monthly system to grow net worth, with milestones.",
    description:
      "Sets up a repeatable monthly net-worth review, computes your current net worth and savings rate, projects your trajectory, and sets milestone targets (first ₹10L, ₹1 crore) with the specific levers to hit them faster.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a wealth coach. Set up a net-worth growth engine for me — a system I run every month.

MY NUMBERS
- Assets (cash, investments, EPF/PPF/NPS, property, other): [list with amounts]
- Liabilities (loans, cards): [list with amounts]
- Monthly income and current monthly saving/investing: [amounts]
- Age and a target (e.g. ₹1 crore by 40): [details]

RETURN:
1. My current net worth and net-worth-to-income ratio, with a one-line verdict on where I stand for my age.
2. My real savings rate and whether it's building wealth fast enough.
3. A projection of my net worth in 5 and 10 years at my current pace vs an improved pace.
4. The next milestone and the date I'd hit it — plus the 2 levers that move it most (save more vs earn more vs returns).
5. A simple monthly review template (what to update and 3 numbers to watch).
6. One habit that would most accelerate the trajectory.

Show the maths. Keep it motivating and concrete.`,
    howToUse: [
      "List your assets and liabilities and your monthly saving.",
      "Paste into any AI for a net-worth read + projection + milestones.",
      "Save the monthly template and re-run it each month.",
    ],
    tips: ["Track net worth monthly — it's the single best scoreboard.", "Focus on savings rate early; returns matter more later."],
    relatedCalc: { label: "Net Worth Calculator", href: "/calculators/net-worth" },
    keywords: ["net worth tracker prompt", "grow net worth ai", "net worth milestones prompt", "wealth building system ai"],
  },
  {
    slug: "emergency-sinking-funds",
    title: "Emergency Fund + Sinking Funds System",
    category: "Budgeting",
    tagline: "Stop 'surprise' expenses from wrecking your month.",
    description:
      "Right-sizes your emergency fund for your situation, then builds sinking funds for the predictable-but-irregular costs (insurance renewals, festivals, repairs, school fees) so they never feel like emergencies — a system most budgets miss.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a cash-flow planner. Design my safety-net system: the right emergency fund plus sinking funds for irregular expenses.

MY SITUATION
- Monthly essential expenses incl. EMIs: [amount]
- Job stability (govt/large co / startup / freelance), earners in household, dependents: [details]
- Big irregular expenses over a year (insurance premiums, festivals, school fees, maintenance, travel, car service): [list with rough amounts]
- Current emergency savings: [amount]

RETURN:
1. The right emergency-fund size for my risk level (3 / 6 / 9–12 months) with the reasoning, and how fast to build the gap.
2. Where to keep it (liquidity vs return trade-off) — a simple split.
3. A sinking-funds table: each irregular expense, its annual cost, and the monthly amount to set aside so it's ready in time.
4. The total monthly amount these systems need, and how to fit it into my budget.
5. The order to build them (emergency fund first vs sinking funds) for my case.

Keep it practical. Show the monthly numbers.`,
    howToUse: [
      "List your essential expenses and your big irregular costs across the year.",
      "Paste into any AI for the right fund sizes + a sinking-funds table.",
      "Automate a monthly transfer for each fund.",
    ],
    tips: ["Self-employed? Aim for 9–12 months.", "Sinking funds turn 'surprises' into planned, boring expenses."],
    relatedCalc: { label: "Emergency Fund Calculator", href: "/calculators/goal-emergency-fund" },
    keywords: ["emergency fund prompt", "sinking funds system ai", "how much emergency fund ai", "irregular expenses planning"],
  },
  {
    slug: "real-estate-deal-analyzer",
    title: "Real Estate Investment Analyzer",
    category: "Investing",
    tagline: "Is this property a good investment? Run the numbers.",
    description:
      "Analyses a rental property like an investor: rental yield, cash-on-cash return, the real cost after all expenses and loan, and the total return vs simply investing the same money in equity — so you buy on numbers, not emotion.",
    bestWith: ["Claude", "ChatGPT"],
    prompt: `You are a real-estate investment analyst. Tell me whether this property makes sense as an investment, with the maths. Be sceptical, not a cheerleader.

THE DEAL
- Property price + city: [amount]
- Down payment and loan (rate, tenure): [details]
- Expected monthly rent + annual rent growth: [amounts]
- Annual costs: maintenance, property tax, insurance, vacancy allowance, society charges: [amounts/estimates]
- Expected price appreciation: [%/yr]
- Return if I invested the same money in equity instead: [%/yr]

RETURN:
1. Gross and net rental yield, and how that compares to a 'good' yield for the city.
2. Cash flow: does the rent cover the EMI and costs, or do I top up each month, and by how much?
3. Cash-on-cash return in year 1.
4. 10-year total return (rent + appreciation − all costs − interest) as an annualised figure.
5. The same money invested in equity over 10 years — side by side.
6. The verdict for my inputs, the biggest risk (vacancy, rate rise, liquidity), and the assumption the whole case rests on.

Show the maths and state assumptions. Educational, not advice.`,
    howToUse: [
      "Enter the price, loan, rent and cost assumptions.",
      "Paste into Claude or ChatGPT for yield, cash flow and total return.",
      "Compare the 10-year number against an equity SIP.",
    ],
    tips: ["Always include vacancy and maintenance — they kill thin yields.", "Factor in how illiquid property is vs funds."],
    keywords: ["real estate investment prompt", "rental yield ai", "is this property a good investment", "property roi prompt"],
  },
  {
    slug: "child-education-funding",
    title: "Children's Education Funding Plan",
    category: "Planning",
    tagline: "Fund their degree without raiding your retirement.",
    description:
      "Projects the real future cost of education at 8–10% education inflation, builds the monthly plan to fund it, and compares vehicles (equity SIP, Sukanya Samriddhi for a daughter) with a glide-path to safety as the goal nears.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a financial planner specialising in education funding in India. Build a plan to fully fund my child's higher education.

INPUTS
- Child's current age and when they'll start higher studies: [ages]
- Today's cost of the education I'm targeting (India / abroad): [amount]
- What I've already saved for it: [amount]
- Monthly amount I can invest for this goal: [amount]
- Child is a daughter? [yes/no] (affects SSY eligibility)

RETURN:
1. The future cost at a realistic education-inflation rate (state it, usually 8–10%) — this is the real target.
2. The monthly SIP needed, accounting for what I've already saved.
3. A suitable vehicle mix and a glide path: more equity early, shifting to debt in the last 2–3 years so a crash doesn't hit the fund at the worst time.
4. If it's a daughter: whether Sukanya Samriddhi (SSY) fits as the stable layer, and how to combine it with equity.
5. What happens if I start 2 years later — the extra monthly cost — to show the cost of delay.
6. A one-line status: fully fundable / needs a stretch / consider an education loan top-up.

Show the maths. Educational, not advice.`,
    howToUse: [
      "Enter your child's age, the target cost today and your monthly budget.",
      "Paste into any AI for the inflation-adjusted plan and vehicle mix.",
      "Verify the SIP on CoinMind's child-education calculator.",
    ],
    tips: ["Use 8–10% inflation for education, higher than general CPI.", "Start early — the cost-of-delay is brutal here."],
    relatedCalc: { label: "Child Education Calculator", href: "/calculators/goal-child-education" },
    keywords: ["child education planning prompt", "education cost ai", "sukanya samriddhi vs sip prompt", "fund child education ai"],
  },
  {
    slug: "money-decision-framework",
    title: "The Money Decision Framework",
    category: "Decisions",
    tagline: "A reusable engine for any 'should I…?' money question.",
    description:
      "A framework prompt that turns any money decision into a structured analysis — the real options, the numbers, the risks, the reversibility, and a recommendation — so you stop agonising and decide well. Works for decisions a specific calculator can't cover.",
    bestWith: ["Claude", "ChatGPT", "Gemini"],
    prompt: `You are a sharp, unbiased financial decision coach. I have a money decision to make. Don't just answer — run it through a rigorous framework and then give a clear recommendation.

MY DECISION: [state it, e.g. "Should I take a ₹X loan to start a side business?" / "Lump sum now or SIP it?" / "Switch jobs for 20% more but less stability?"]
MY CONTEXT (income, savings, obligations, risk comfort, timeline): [details]

RUN THIS FRAMEWORK:
1. Reframe the decision and list the real options (including ones I may not have considered, and the 'do nothing' option).
2. The numbers: the cost, benefit and opportunity cost of each option, with the maths and assumptions.
3. Risk & downside: what's the worst case for each, and could I recover from it?
4. Reversibility: is this a one-way door or easily undone? Weight accordingly.
5. The non-financial factors that legitimately matter here.
6. A clear recommendation for my situation, the key assumption it depends on, and what single new fact would change your answer.

Be direct. Tell me if I'm missing information you'd need. Educational, not advice.`,
    howToUse: [
      "State your exact decision and give your financial context.",
      "Paste into any AI; it structures the options, numbers and risks.",
      "Push back and add facts — it sharpens with each follow-up.",
    ],
    tips: ["Great for decisions no single calculator covers.", "Ask it to 'stress-test the recommendation' before you act."],
    keywords: ["financial decision prompt", "should i money decision ai", "decision framework chatgpt", "money decision ai"],
  },
];

export const promptBySlug = (slug: string) => FINANCE_PROMPTS.find((p) => p.slug === slug);
export const PROMPT_CATEGORIES = [...new Set(FINANCE_PROMPTS.map((p) => p.category))];
