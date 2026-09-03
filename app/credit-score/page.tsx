import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "CIBIL Score & Credit Score Guide India - Improve Your Credit Health" },
  description: "Learn how credit scores work in India. Check your CIBIL score, understand what affects it, and improve your credit health for better loan approvals and lower interest rates.",
  alternates: { canonical: `${site.url}/credit-score` },
};

const CREDIT_BODY = `
## What a CIBIL score actually is

CIBIL, TransUnion CIBIL, is one of four credit bureaus licensed by the RBI in India, alongside Experian, Equifax and CRIF High Mark. Each collects your borrowing and repayment history from banks, NBFCs and card issuers, and condenses it into a three-digit number from **300 to 900**.

Two things people commonly get wrong. First, **"CIBIL score" is not a synonym for "credit score"**. It is one bureau's version of it. Your four scores will differ, sometimes by 30-50 points, because lenders do not report to every bureau on the same schedule. Second, the score is a **summary, not the whole file**. Lenders read the underlying report (your account list, payment grid, enquiries and any written-off or settled flags) and a clean report with a 730 often beats a 780 carrying a settlement.

There is no single "approval score". Each lender sets its own cutoff, and the same score can get you a card from one issuer and a rejection from another.

## Score ranges and what they mean in practice

| Score band | Rating | What lenders typically do |
| --- | --- | --- |
| 800-900 | Excellent | Best advertised rates, highest limits, fastest approval, fee waivers negotiable |
| 750-799 | Very good | Approved at standard rates; the practical target for everyone |
| 700-749 | Good | Approved, but often 0.5-1.5% higher rate and lower limits |
| 650-699 | Fair | Frequent rejections for unsecured credit; secured loans possible with conditions |
| 550-649 | Poor | Mainstream lenders usually decline; NBFCs may lend at high rates |
| 300-549 | Very poor | Almost certain rejection; indicates defaults or write-offs |
| NA / NH | No history | Not bad, just unscored: new to credit |

**NA or NH is not a bad score.** It means you have no credit history yet. A first-time borrower needs to build a file, not repair one. A secured credit card against an FD is the standard route.

Why the 750 threshold matters in rupees: on a ₹50 lakh home loan over 20 years, a rate difference of 0.5% changes total interest by roughly ₹3.5 lakh. **The score is worth more than most people's annual savings.**

## What actually moves your score

Bureaus do not publish exact weights, but the broad hierarchy is consistent and well established:

**1. Payment history - roughly 30-35%**

This is the single biggest factor. The report carries a month-by-month payment grid for every account going back three years. A payment 30 days late is a real mark; 90 days late is serious; a write-off or settlement is severe and lingers for years. **One missed EMI can cost 50-80 points.**

**2. Credit utilisation - roughly 25-30%**

The share of your total card limit that you use. Keep it **below 30%, and below 10% if you want to reach the 800s**. Critically, utilisation is measured on your **statement date, not your due date**, so paying in full every month does not help if your statement is generated while the balance is high.

**3. Length of credit history - roughly 15%**

Older accounts are better. This is why closing your oldest credit card is usually a mistake, even one you barely use.

**4. Credit mix - roughly 10%**

A blend of secured credit (home, car, gold loans) and unsecured credit (cards, personal loans), all handled well, scores better than only one type.

**5. Recent enquiries and new accounts - roughly 10%**

Every formal application triggers a **hard enquiry**, and several within a few months signal credit hunger. Checking your own score is a **soft enquiry** and never affects it.

## How to go from 600 to 750 - a realistic plan

This is achievable in 9 to 18 months for most people. There is no legitimate 30-day fix, and anyone selling one is running a scam.

**Months 1-2: find out what is actually wrong**

Pull your full report from all four bureaus, not just the score. Look for: accounts you do not recognise, loans showing as active that you closed, incorrect late-payment markers, wrong personal details, and duplicate entries. **Bureau errors are common in India.** Dispute anything wrong through the bureau's online dispute portal. Bureaus are required to investigate, typically within 30 days, and a corrected error can add points immediately with no behaviour change at all.

**Months 1-3: stop the bleeding**

- Set auto-debit for at least the minimum due on every card and loan. Never miss another payment.
- Bring every overdue account current. Nothing else you do matters while an account is delinquent.
- Stop applying for new credit entirely during the repair period.

**Months 2-9: attack utilisation**

- Pay the card balance down before the statement date, not just before the due date. This alone can move a score 30-50 points within two or three cycles.
- Request a **credit limit increase** on an existing card. A higher limit with the same spending mechanically lowers utilisation. Ask your issuer for a limit review rather than opening a new card.
- Spread spending across cards rather than maxing one.
- If you have a large balance, consider converting it to a personal loan at 12-18% instead of carrying it at 36-46%. This cuts both the interest cost and the card utilisation.

**Months 3-18: build positive history**

- If your file is thin, take a **secured credit card against a fixed deposit**. It reports like a normal card and builds history with almost no approval risk.
- Keep old cards open and active with a small recurring charge, such as one subscription, paid automatically in full.
- Keep utilisation under 10% consistently. Consistency, not a single good month, is what the algorithms reward.
- Do not close accounts as you improve. A closed old account eventually stops helping your average age.

**What genuinely does not work:** paying someone to "delete" accurate negative information, taking a loan purely to build score while carrying card debt, or closing all your cards to look debt-free. That last one usually lowers the score by cutting total available credit and shortening history.

## How to check your credit score free in India

Every bureau is required by the RBI to provide **one free full credit report per calendar year** on request. Beyond that:

- **Directly from the bureaus**: CIBIL, Experian, Equifax and CRIF High Mark each have consumer portals. This gives you the full report, not just the number, which is what you actually need for dispute work.
- **Through your bank's app.** Most major Indian banks now show a bureau score inside net banking or the mobile app at no cost.
- **Through free consumer apps.** Convenient and genuinely free, but they are lead-generation businesses for loan and card offers, so expect marketing. All such checks are soft enquiries and never damage your score.

Check at least twice a year, and always **three to six months before a major loan application** so there is time to fix anything wrong.

## Credit score and loan pricing

| Score | Typical home loan rate | Typical personal loan rate | Card approval odds |
| --- | --- | --- | --- |
| 800+ | Lowest published rate | 10.5-12% | Premium cards available |
| 750-799 | Published rate | 11-14% | Most cards approved |
| 700-749 | +0.25-0.75% | 14-18% | Entry-level cards |
| 650-699 | +0.75-1.5%, extra conditions | 18-24% if approved | Secured cards only |
| Below 650 | Usually declined | Usually declined | Secured cards only |

Model what those rate differences mean for you with the [EMI calculator](/calculators/emi), check your borrowing ceiling with the [home loan eligibility calculator](/calculators/home-loan-eligibility), and see the [loans hub](/loans) for how lenders assess FOIR alongside the score.

## Myths worth discarding

- **"Checking my score lowers it."** Checking your own score is a soft enquiry. It has no effect, ever.
- **"I have no loans, so my score must be excellent."** No history means no score. Lenders cannot assess you.
- **"Settling a loan is as good as closing it."** A settlement is flagged as such and can block borrowing for years. Always aim to close in full and collect the NOC.
- **"Prepaying a loan hurts my score."** Closing a loan properly is neutral to positive. Any small dip from a changed credit mix is not a reason to keep paying interest.
- **"My salary affects my score."** Income is not reported to bureaus at all. It affects eligibility, not the score.
- **"A high limit is dangerous."** A higher limit lowers utilisation and helps, as long as your spending does not rise with it.

## Habits that keep a good score good

1. Auto-debit every card and EMI, at minimum for the minimum due.
2. Keep total utilisation under 30%, ideally under 10%, measured at the statement date.
3. Never close your oldest card.
4. Apply for new credit at most once or twice a year, and never scattershot across lenders.
5. Pull all four reports annually and dispute errors immediately.
6. Collect and keep the NOC every time you close a loan, then verify the bureau reflects it.

A strong score is not the goal in itself. It is what makes borrowing cheap when you genuinely need it. Pair it with a budget that keeps EMIs comfortable, using the [budgeting hub](/budgeting) and the [budget planner](/tools/budget-planner).
`;

const CREDIT_FAQS = [
  {
    q: "What is a good CIBIL score in India?",
    a: "750 and above is the practical target. At that level you get approved at standard advertised rates. Above 800 you can often negotiate better rates, higher limits and fee waivers. Between 700 and 749 you will usually be approved but priced 0.5-1.5% higher, and below 650 most mainstream lenders decline unsecured credit entirely.",
  },
  {
    q: "How can I improve my CIBIL score from 600 to 750?",
    a: "Expect 9 to 18 months. Start by pulling your full report from all four bureaus and disputing any errors, which are common and can add points immediately. Then set auto-debit on every account so no payment is ever missed, pay card balances down before the statement date to push utilisation under 10%, request a limit increase rather than a new card, and stop applying for new credit during the repair period.",
  },
  {
    q: "How can I check my credit score for free in India?",
    a: "Every RBI-licensed bureau (CIBIL, Experian, Equifax and CRIF High Mark) must provide one free full credit report per calendar year on request through its consumer portal. Most major bank apps also display a bureau score at no cost, and several free consumer apps offer it in exchange for showing you loan offers. All of these are soft enquiries and never affect your score.",
  },
  {
    q: "Does checking my own credit score reduce it?",
    a: "No. Checking your own score is a soft enquiry and has no effect on the score, no matter how often you do it. Only hard enquiries, generated when you formally apply for a loan or card and a lender pulls your report, can lower it, which is why applying to several lenders in a short period is damaging.",
  },
  {
    q: "How long do late payments stay on my credit report in India?",
    a: "Payment history typically remains visible on your credit report for several years, with the detailed month-by-month payment grid usually covering the last three years. Serious events such as write-offs and settlements stay longer and weigh more heavily. The impact fades with time and consistent on-time payments afterwards, but you cannot have accurate negative information removed.",
  },
  {
    q: "What is credit utilisation and how much should I use?",
    a: "Credit utilisation is the share of your total credit card limit that you are using. Keep it below 30%, and below 10% if you want to reach the 800s. Crucially, it is measured on your statement date rather than your due date, so paying in full each month does not help if the statement is generated while the balance is high. Pay down before the statement is cut.",
  },
  {
    q: "Why is my CIBIL score different from my Experian score?",
    a: "Each bureau receives data from lenders on its own schedule and uses its own scoring model, so a 30-50 point difference between bureaus is normal. Some lenders report to only two or three of the four bureaus. Lenders usually pull one or two bureaus, so it is worth checking all four before a major loan application to make sure none of them carries an error.",
  },
  {
    q: "Does closing a credit card hurt my credit score?",
    a: "Usually yes, for two reasons. Closing a card removes its limit from your total available credit, which pushes your utilisation percentage up, and closing your oldest card eventually shortens your average credit history. Keep old cards open with one small recurring charge paid automatically in full, unless a high annual fee makes the card genuinely not worth keeping.",
  },
  {
    q: "Can I get a loan with a low CIBIL score?",
    a: "Secured borrowing is often still possible: a gold loan, a loan against a fixed deposit, or a loan against property depends far more on the collateral than the score. Some NBFCs offer unsecured loans below 650 but at very high rates. A better path is usually to take a secured credit card against an FD, use it responsibly for six to twelve months, and borrow once the score recovers.",
  },
  {
    q: "What CIBIL score is needed for a credit card in India?",
    a: "Most issuers look for 750 or above for standard cards, and 700-749 is often enough for entry-level cards from your existing bank. Below 700, the reliable route is a secured credit card issued against a fixed deposit, which almost always gets approved, reports to bureaus like a normal card, and builds history so you can upgrade later.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Credit Score & CIBIL"
      description="Your credit score is your financial reputation. Understand how it's calculated, what affects it, and how to improve it for better loan terms and credit card approvals."
      badge="Credit Hub"
      sections={[
        {
          title: "Credit Score Guides",
          columns: 2,
          links: [
            { title: "What is CIBIL Score?", href: "/glossary/cibil-score", desc: "How CIBIL scores are calculated and what they mean" },
            { title: "How to Check CIBIL Score", href: "/blog/how-to-check-cibil-score", desc: "Free ways to check your credit score in India" },
            { title: "How to Improve Credit Score", href: "/blog/improve-credit-score", desc: "10 proven ways to boost your CIBIL score" },
            { title: "Credit Score vs CIBIL Score", href: "/blog/credit-score-vs-cibil", desc: "Understanding the difference between credit bureaus" },
            { title: "Minimum CIBIL for Home Loan", href: "/blog/cibil-home-loan", desc: "What credit score you need for home loan approval" },
            { title: "CIBIL Score for Personal Loan", href: "/blog/cibil-personal-loan", desc: "Credit score requirements for unsecured loans" },
          ],
        },
        {
          title: "Related Calculators",
          columns: 3,
          links: [
            { title: "EMI Calculator", href: "/calculators/emi", desc: "See how EMIs affect your credit utilization" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "Check eligibility based on FOIR" },
            { title: "Personal Loan EMI", href: "/calculators/personal-loan-emi", desc: "Calculate personal loan EMIs" },
            { title: "Car Loan EMI", href: "/calculators/car-loan-emi", desc: "Auto loan EMI calculator" },
            { title: "Education Loan EMI", href: "/calculators/education-loan-emi", desc: "Student loan repayment calculator" },
            { title: "Budget Planner", href: "/tools/budget-planner", desc: "Plan payments to improve credit health" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "CIBIL Score", href: "/glossary/cibil-score", desc: "Credit score explained" },
            { title: "Credit Utilization", href: "/glossary/credit-utilization", desc: "How much credit you use matters" },
            { title: "Credit Report", href: "/glossary/credit-report", desc: "Your credit history summary" },
            { title: "FOIR", href: "/glossary/foir", desc: "Fixed Obligation to Income Ratio" },
            { title: "Default", href: "/glossary/default", desc: "What happens when you miss payments" },
            { title: "EMI", href: "/glossary/emi", desc: "Equated Monthly Installment" },
            { title: "Amortisation", href: "/glossary/amortisation", desc: "How loan payments work" },
            { title: "Secured vs Unsecured Loan", href: "/glossary/secured-vs-unsecured-loan", desc: "Collateral and loan types" },
          ],
        },
      ]}
      intro="On a ₹50 lakh home loan over 20 years, a 0.5% rate difference costs about ₹3.5 lakh, and that difference is usually decided by three digits on your credit report. This hub explains what CIBIL and the other three RBI-licensed bureaus actually measure, what each score band means to a lender, and a realistic 9-to-18 month plan to move a 600 to 750."
      bodyMarkdown={CREDIT_BODY}
      faqs={CREDIT_FAQS}
      relatedHubs={[
        { title: "Loans", href: "/loans" },
        { title: "Credit Cards", href: "/blog/best-credit-cards-india-2026" },
        { title: "Budgeting", href: "/budgeting" },
        { title: "Take-Home Salary", href: "/calculators/take-home-salary" },
      ]}
    />
  );
}
