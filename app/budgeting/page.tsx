import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Budgeting & Money Management India - Free Budget Planner & Guides" },
  description: "Take control of your money. Free budget planner, 50/30/20 rule guide, expense tracking, emergency fund calculator, and money management tips for India.",
  alternates: { canonical: `${site.url}/budgeting` },
};

const BUDGETING_BODY = `
## Why most Indian budgets fail in the second month

Almost everyone who starts budgeting builds a beautiful spreadsheet in month one and abandons it in month two. The reason is rarely discipline. It is that the budget was built on **gross salary instead of take-home pay**, ignored irregular expenses like insurance premiums and festival spending, and left no room for the ordinary human need to buy something unplanned.

A budget that survives has three properties: it starts from the money that actually lands in your bank account, it reserves cash for expenses that arrive once or twice a year, and it includes a guilt-free spending category. Everything below is built around those three ideas.

## Step one: find your real monthly income

Your CTC is not your income. Between CTC and your bank balance sit employer PF, gratuity, professional tax, TDS and any insurance premium your employer deducts. For a ₹12 lakh CTC in a metro, in-hand pay typically lands somewhere between ₹78,000 and ₹88,000 a month depending on structure and tax regime.

Work out your figure with the [take-home salary calculator](/calculators/take-home-salary), and if you are unsure whether the old or new tax regime suits you, run both through the [income tax calculator](/calculators/income-tax) first. The answer can change your monthly budget by several thousand rupees.

If your income is irregular (freelance, commission, business) budget on your **lowest month from the last twelve**, and treat everything above that as surplus to be allocated deliberately rather than absorbed into lifestyle.

## The 50/30/20 rule, with real Indian numbers

The rule splits take-home pay into three buckets: 50% needs, 30% wants, 20% savings and debt repayment. It is popular because it is memorable, and useful because it forces a savings rate rather than leaving savings as whatever is left over.

| Take-home per month | Needs (50%) | Wants (30%) | Save & invest (20%) |
| --- | --- | --- | --- |
| ₹30,000 | ₹15,000 | ₹9,000 | ₹6,000 |
| ₹50,000 | ₹25,000 | ₹15,000 | ₹10,000 |
| ₹80,000 | ₹40,000 | ₹24,000 | ₹16,000 |
| ₹1,20,000 | ₹60,000 | ₹36,000 | ₹24,000 |
| ₹2,00,000 | ₹1,00,000 | ₹60,000 | ₹40,000 |

Two honest adjustments for Indian conditions:

- **In Mumbai, Bengaluru or Delhi NCR, rent alone can be 30-40% of take-home.** If needs cross 50%, the rule is not broken. It is telling you that housing is squeezing everything else. Either accept a lower wants percentage temporarily, or change your housing.
- **As income rises, the 20% should rise too.** Someone earning ₹2 lakh a month should be saving 30-40%, not 20%. Needs do not scale with income; lifestyle does, unless you stop it.

An alternative worth knowing is the **80/20 rule**: save 20% first, automatically, on salary day, and spend the remaining 80% however you like without tracking. It is far less precise but dramatically easier to sustain, and for many people a sustained 20% beats a perfect budget abandoned in March.

## Expense categories that actually match Indian life

Generic budgeting apps use American categories. Here is a category list that reflects how money genuinely leaves an Indian household.

**Fixed needs (usually 45-55%)**

- Rent or home loan EMI, plus maintenance and property tax
- Utilities: electricity, water, piped gas, broadband, mobile
- Groceries and household staples
- School fees, tuition and transport for children
- Insurance premiums: term life, health, motor
- Domestic help, cook, driver
- Loan EMIs other than home: check the true cost of each with the [EMI calculator](/calculators/emi)

**Wants (aim for 25-30%)**

- Eating out, food delivery and coffee
- Subscriptions: OTT, music, gym, cloud storage, apps
- Travel and weekend outings
- Clothes, gadgets and personal care beyond basics
- Gifts and social spending

**Save and invest (20% minimum)**

- Emergency fund contributions until fully funded
- Mutual fund SIPs: model these with the [SIP calculator](/calculators/sip)
- PPF, NPS or other retirement contributions
- Goal-specific savings such as a house down payment or a car

**The category almost everyone forgets: annual and lumpy expenses**

Insurance renewals, Diwali and wedding gifting, school admission fees, vehicle servicing, home repairs, travel for family functions, and the annual medical check-up. These easily total ₹80,000-₹2,00,000 a year for a middle-class household. Divide your realistic annual figure by twelve and treat it as a fixed monthly line called **sinking fund**. Park it in a separate savings account or liquid fund so it is genuinely there when the bill lands.

## How to actually track spending without hating it

You need less tracking than you think. Three levels, pick the lightest one you will sustain:

1. **Account-level (5 minutes a month).** Keep two accounts: one for fixed bills and savings transfers, one for spending. If the spending account lasts the month, you are on budget. No categorising at all.
2. **Weekly review (15 minutes a week).** Open your bank and credit card apps every Sunday, skim the transactions, and note anything that surprised you. Most overspending is invisible only because nobody looks.
3. **Full categorisation (30 minutes a month).** Export statements to a spreadsheet or use our [budget planner](/tools/budget-planner) to assign every transaction. Worth doing for two or three months to learn your real numbers, then downgrade to level 1 or 2.

The single highest-leverage habit is **automating the savings transfer for the day after salary credit**. Money that leaves before you see it is money you never had to resist spending.

## The emergency fund comes before investing

Before any SIP, build three to six months of essential expenses in cash. Essential means rent, food, utilities, EMIs, insurance and school fees, not your full spending. For a household with ₹45,000 of essential monthly costs, that is ₹1.35 lakh to ₹2.7 lakh.

Sizing guidance:

- Dual income, stable salaried jobs: **3 months**
- Single earner, salaried: **6 months**
- Freelance, commission or business income: **9-12 months**
- Sole earner with dependants and a home loan: **9 months**

Keep it in a sweep-in fixed deposit or a liquid fund, reachable within a day, not invested in equity. The [FD calculator](/calculators/fd) and the [savings hub](/savings) cover the options.

## Beating inflation into your budget

A budget built on today's prices quietly becomes wrong. At 6% inflation, a ₹50,000 monthly cost becomes about ₹67,000 in five years and ₹89,500 in ten. That is why a static savings amount is a shrinking savings rate in real terms.

Two practical responses. First, **raise your SIP amount every year by at least your salary increment percentage**. A step-up SIP of 10% a year roughly doubles the final corpus over 20 years compared with a flat SIP. Second, run your long-term goals through the [inflation calculator](/calculators/inflation) so the target number reflects future prices, then size the monthly contribution with the [goal SIP calculator](/calculators/goal-sip).

## Common budgeting mistakes

- **Budgeting on CTC instead of in-hand pay.** Every number downstream is then wrong.
- **No sinking fund.** Annual expenses then get funded by a credit card, which converts a planned cost into 36-42% annualised interest.
- **Zero fun budget.** Budgets with no discretionary allowance fail the same way crash diets do.
- **Tracking without acting.** Categorising six months of spending achieves nothing if the categories never change.
- **Treating a bonus as a windfall.** Decide the split (say 50% to goals, 30% to debt, 20% to spending) before the money arrives.
- **Carrying a credit card balance while running a SIP.** No investment reliably returns more than credit card interest costs. Clear that first.
- **Ignoring lifestyle creep.** The most common reason a ₹2 lakh earner saves the same rupees as a ₹1 lakh earner is that every increment went straight into a bigger flat, a newer car and more subscriptions.

## A 30-day plan to get started

1. **Days 1-2:** Calculate your real take-home pay and list every fixed monthly commitment.
2. **Days 3-5:** Pull three months of bank and card statements and total your actual spending by category. Expect a surprise.
3. **Day 6:** Estimate your annual lumpy expenses and divide by twelve to set your sinking fund figure.
4. **Day 7:** Write your 50/30/20 target, adjusted for your rent reality.
5. **Day 8:** Set up an automatic transfer for the day after salary credit, emergency fund first, SIP second.
6. **Days 9-30:** Spend from one account only, review weekly for fifteen minutes, and change nothing else.

At the end of one month you will have something more valuable than a perfect budget: a realistic one. Check where you stand overall with the [net worth check](/tools/are-you-rich), and once the emergency fund is full, move on to the [investing hub](/investing) to put the 20% to work.
`;

const BUDGETING_FAQS = [
  {
    q: "What is the 50/30/20 rule and does it work in India?",
    a: "The 50/30/20 rule allocates 50% of take-home pay to needs, 30% to wants and 20% to savings and debt repayment. It works well in India as a starting framework, but needs adjusting in expensive metros where rent alone can consume 30-40% of take-home pay. In that case, treat 20% savings as the non-negotiable number and squeeze the wants bucket rather than abandoning the rule.",
  },
  {
    q: "How much should I save from a ₹50,000 monthly salary in India?",
    a: "At minimum ₹10,000 a month, which is the 20% savings share of the 50/30/20 rule. If your rent is low or you live with family, aim for ₹15,000-₹20,000. Prioritise in this order: clear any credit card balance, build three to six months of essential expenses as an emergency fund, then start a monthly SIP with whatever remains.",
  },
  {
    q: "How do I make a monthly budget in India?",
    a: "Start with your actual in-hand salary, not CTC. List fixed needs such as rent, EMIs, utilities, groceries, insurance and school fees. Add a sinking fund line equal to your annual lumpy expenses divided by twelve. Set your savings transfer to run automatically the day after salary credit. Whatever remains is your genuine discretionary spending for the month.",
  },
  {
    q: "What is a sinking fund and why do Indian budgets need one?",
    a: "A sinking fund is a monthly set-aside for expenses that arrive once or twice a year: insurance renewals, festival and wedding gifting, school admission fees, vehicle servicing and home repairs. These commonly total ₹80,000 to ₹2 lakh a year for a middle-class household. Without a sinking fund, these bills get funded by credit cards at 36-42% annualised interest.",
  },
  {
    q: "How much emergency fund do I need in India?",
    a: "Three to six months of essential expenses for a salaried person, nine to twelve months if your income is from freelancing, commission or business. Essential expenses mean rent, food, utilities, EMIs, insurance and school fees, not your full lifestyle spending. Keep it in a sweep-in fixed deposit or a liquid fund so it is accessible within a day.",
  },
  {
    q: "Should I pay off loans or invest first?",
    a: "Compare interest rates. Credit card debt at 36-42% and personal loans at 12-18% should be cleared before investing, because no reliable investment beats those rates. Home loan interest at 8-9% is closer to expected equity returns and carries tax benefits, so it is usually reasonable to run a home loan alongside investing. Always keep the emergency fund intact regardless.",
  },
  {
    q: "What is the best free budgeting app or tool for India?",
    a: "For most people a simple spreadsheet plus the two-account method (one account for fixed bills and savings, one for spending) beats any app, because the friction of categorising in an app is what kills the habit. If you want structure without a spreadsheet, our free budget planner covers income, expenses and savings goals with no sign-up required.",
  },
  {
    q: "How do I budget when my income is irregular?",
    a: "Budget on your lowest-earning month from the past twelve and treat everything above that as surplus. Allocate the surplus deliberately: for example, half to the emergency fund until it reaches nine to twelve months, then split between investing and a tax reserve. Freelancers should also set aside advance tax quarterly rather than facing a large bill in March.",
  },
  {
    q: "Why does my budget keep failing after a month or two?",
    a: "The three usual causes are budgeting on CTC instead of take-home pay, forgetting annual and lumpy expenses so an unexpected bill blows up the plan, and leaving no discretionary spending allowance at all. Fix those three and the budget becomes something you can follow for years rather than weeks.",
  },
  {
    q: "How much should I increase my savings each year?",
    a: "At least by your salary increment percentage, and ideally more. A step-up SIP that rises 10% a year can produce roughly double the final corpus over 20 years compared with a flat SIP. Because inflation of around 6% doubles costs in about twelve years, a savings amount that never rises is effectively a shrinking savings rate.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Budgeting & Money Management"
      description="Every rupee needs a job. Learn to budget, track expenses, build an emergency fund, and manage your money so it works for you instead of the other way around."
      badge="Budgeting Hub"
      sections={[
        {
          title: "Budgeting Tools",
          columns: 2,
          links: [
            { title: "Budget Planner", href: "/tools/budget-planner", desc: "Track income, expenses, and savings goals" },
            { title: "Are You Rich?", href: "/tools/are-you-rich", desc: "See your income percentile in India" },
            { title: "Net Worth Check", href: "/tools/are-you-rich", desc: "See where your net worth places you" },
            { title: "Goal Planning", href: "/calculators/goal-sip", desc: "Plan and track financial milestones" },
          ],
        },
        {
          title: "Budgeting Guides",
          columns: 2,
          links: [
            { title: "50/30/20 Budget Rule", href: "/blog/50-30-20-budget-rule", desc: "Simple budgeting framework with Indian examples" },
            { title: "Emergency Fund Guide", href: "/blog/emergency-fund-india", desc: "How much emergency savings you need" },
            { title: "Saving Money Tips", href: "/blog/saving-money-tips-india", desc: "Practical saving strategies for Indian households" },
            { title: "Expense Tracking Guide", href: "/blog/expense-tracking", desc: "How to track expenses without spreadsheets" },
          ],
        },
        {
          title: "Related Calculators",
          columns: 3,
          links: [
            { title: "Take-Home Salary Calculator", href: "/calculators/take-home-salary", desc: "Know your real in-hand pay" },
            { title: "Inflation Calculator", href: "/calculators/inflation", desc: "See how inflation affects your budget" },
            { title: "EMI Calculator", href: "/calculators/emi", desc: "Plan your loan EMIs" },
            { title: "Goal SIP Calculator", href: "/calculators/goal-sip", desc: "Save for specific goals" },
            { title: "FD Calculator", href: "/calculators/fd", desc: "Grow your emergency fund" },
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Plan your retirement savings" },
          ],
        },
      ]}
      intro="A budget is not a restriction. It is a decision made in advance so you do not have to make it again every time you open a payment app. This hub covers the 50/30/20 rule adapted to Indian salaries and metro rents, the expense categories most people forget, and the automation that makes a budget survive past its second month."
      bodyMarkdown={BUDGETING_BODY}
      faqs={BUDGETING_FAQS}
      relatedHubs={[
        { title: "Savings", href: "/savings" },
        { title: "Take-Home Salary", href: "/calculators/take-home-salary" },
        { title: "Investing", href: "/investing" },
        { title: "Retirement", href: "/retirement" },
      ]}
    />
  );
}
