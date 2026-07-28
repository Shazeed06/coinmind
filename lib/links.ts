// Internal linking engine — topical clusters for contextual cross-linking.
// Hub pages defined in lib/architecture.ts. This file provides quick-access
// link sets for calculators, guides, and glossary pages.

type LinkItem = { title: string; href: string; desc: string };

function mk(title: string, href: string, desc: string): LinkItem {
  return { title, href, desc };
}

// ─── Topic clusters ───

export const CLUSTER_SIP = {
  label: "SIP & Mutual Funds",
  links: [
    mk("SIP Hub", "/sip", "Complete SIP resource hub — calculators, guides, strategies"),
    mk("SIP Calculator", "/calculators/sip", "Calculate monthly SIP returns with step-up and LTCG tax"),
    mk("Lumpsum Calculator", "/calculators/lumpsum", "Project one-time investment growth"),
    mk("Goal SIP Calculator", "/calculators/goal-sip", "Find SIP needed for ₹1 crore or any goal"),
    mk("Step-Up SIP Calculator", "/calculators/step-up-sip", "Compare flat vs step-up SIP returns"),
    mk("Mutual Fund Returns Calculator", "/calculators/mutual-fund-returns", "Project MF lumpsum returns with CAGR"),
    mk("SWP Calculator", "/calculators/swp", "See how long your corpus lasts with monthly withdrawals"),
    mk("Compound Interest Calculator", "/calculators/compound-interest", "See compounding across daily/monthly/yearly periods"),
    mk("CAGR Calculator", "/calculators/cagr", "Turn start/end values into smoothed annual growth rate"),
    mk("SIP Returns (year-wise PSEO)", "/sip-returns/1-lakh-sip-for-1-year", "Year-by-year SIP return scenarios"),
    mk("SIP Guides & Strategy", "/sip/step-up-sip-benefits", "Deep dives on SIP investment strategy"),
    mk("Finance Glossary", "/glossary", "SIP, CAGR, NAV terms explained simply"),
  ],
};

export const CLUSTER_EMI = {
  label: "Loans & EMI",
  links: [
    mk("Loans Hub", "/loans", "Complete loans resource — calculators, guides, eligibility"),
    mk("EMI Calculator", "/calculators/emi", "Home, car & personal loan EMI with amortisation"),
    mk("Home Loan Eligibility", "/calculators/home-loan-eligibility", "How much home loan you qualify for"),
    mk("Car Loan EMI Calculator", "/calculators/car-loan-emi", "Monthly auto loan payment"),
    mk("Personal Loan EMI Calculator", "/calculators/personal-loan-emi", "Monthly EMI and total interest"),
    mk("Education Loan EMI Calculator", "/calculators/education-loan-emi", "Student loan repayment with moratorium"),
    mk("Mortgage Calculator", "/calculators/mortgage", "Monthly payment and amortisation schedule"),
    mk("Simple Interest Calculator", "/calculators/simple-interest", "Compare simple vs compound interest"),
  ],
};

export const CLUSTER_TAX = {
  label: "Income Tax & Salary",
  links: [
    mk("Income Tax Hub", "/income-tax", "Complete tax resource — calculators, regimes, deductions"),
    mk("Income Tax Calculator", "/calculators/income-tax", "New vs old regime comparison FY 2026-27"),
    mk("Take-Home Salary Calculator", "/calculators/take-home-salary", "CTC to in-hand pay after PF and tax"),
    mk("HRA Calculator", "/calculators/hra", "House Rent Allowance exemption"),
    mk("TDS Calculator", "/calculators/tds", "Tax deducted at source on salary and interest"),
    mk("Capital Gains Tax Calculator", "/calculators/capital-gains", "LTCG and STCG on equity and property"),
    mk("Gratuity Calculator", "/calculators/gratuity", "Gratuity owed under Payment of Gratuity Act"),
    mk("Old vs New Tax Regime", "/tax-regime-break-even", "Find your break-even deduction amount"),
    mk("Income Tax PSEO pages", "/income-tax/5-lakh-salary", "Salary-specific tax regime comparisons"),
    mk("In-Hand Salary PSEO", "/in-hand-salary/30000-per-month", "Salary-specific take-home calculations"),
  ],
};

export const CLUSTER_SAVINGS = {
  label: "Savings & FD",
  links: [
    mk("Savings Hub", "/savings", "Complete savings resource — FD, PPF, NPS, NSC and more"),
    mk("FD Calculator", "/calculators/fd", "Fixed deposit maturity with quarterly compounding"),
    mk("PPF Calculator", "/calculators/ppf", "15-year Public Provident Fund maturity"),
    mk("NPS Calculator", "/calculators/nps", "Pension corpus and monthly annuity"),
    mk("EPF Calculator", "/calculators/epf", "PF balance and pension estimate"),
    mk("NSC Calculator", "/calculators/nsc", "National Savings Certificate maturity"),
    mk("SCSS Calculator", "/calculators/scss", "Senior Citizen Savings Scheme quarterly payout"),
    mk("Sukanya Samriddhi Yojana Calculator", "/calculators/sukanya-samriddhi", "SSY tax-free corpus for girl child"),
    mk("Post Office MIS Calculator", "/calculators/post-office-mis", "Monthly Income Scheme fixed payout"),
    mk("Inflation Calculator", "/calculators/inflation", "Future value of money adjusted for India CPI"),
  ],
};

export const CLUSTER_RETIREMENT = {
  label: "Retirement Planning",
  links: [
    mk("Retirement Hub", "/retirement", "Complete retirement resource — NPS, PPF, EPF, SWP"),
    mk("Retirement Calculator", "/calculators/retirement", "Corpus needed and monthly SIP for retirement"),
    mk("NPS Calculator", "/calculators/nps", "NPS pension corpus and tax-free lump sum"),
    mk("EPF Calculator", "/calculators/epf", "Employee Provident Fund maturity"),
    mk("PPF Calculator", "/calculators/ppf", "PPF as a retirement savings vehicle"),
    mk("Step-Up SIP Calculator", "/calculators/step-up-sip", "Top-up SIP strategy for retirement goals"),
  ],
};

export const CLUSTER_HEALTH = {
  label: "Health & Fitness",
  links: [
    mk("BMI Calculator", "/calculators/bmi", "Body Mass Index and healthy weight range"),
    mk("Calorie Calculator", "/calculators/calorie", "Daily TDEE for weight goals"),
    mk("Ideal Weight Calculator", "/calculators/ideal-weight", "Healthy weight by height and age"),
    mk("Pregnancy Due Date Calculator", "/calculators/pregnancy-due-date", "Due date from LMP or conception"),
  ],
};

export const CLUSTER_UTILITY = {
  label: "Everyday Calculators",
  links: [
    mk("Percentage Calculator", "/calculators/percentage-calculator", "% of number, change and difference"),
    mk("Discount Calculator", "/calculators/discount", "Sale price and savings"),
    mk("Sales Tax & VAT Calculator", "/calculators/sales-tax", "Add or remove tax from any amount"),
    mk("Currency Converter", "/calculators/currency-converter", "Live exchange rates across 20+ currencies"),
    mk("Age Calculator", "/calculators/age-calculator", "Exact age in years, months and days"),
    mk("Date Difference Calculator", "/calculators/date-difference-calculator", "Days between two dates"),
    mk("Tip Calculator", "/calculators/tip-calculator", "Split the bill with tip"),
    mk("Hourly to Salary Calculator", "/calculators/hourly-to-salary", "Convert hourly wage to annual pay"),
  ],
};

export const CLUSTER_TOOLS = {
  label: "Free Online Tools",
  links: [
    mk("Resume Builder", "/resume-builder", "Create ATS-friendly resume with PDF download"),
    mk("Compress Image", "/tools/compress-image", "Shrink JPG, PNG and WebP sizes"),
    mk("Image to PDF", "/tools/image-to-pdf", "Convert JPG, PNG to PDF"),
    mk("Merge PDF", "/tools/merge-pdf", "Combine multiple PDFs into one"),
    mk("Image Converter", "/tools/image-converter", "Convert between JPG, PNG, WebP"),
    mk("Password Generator", "/tools/password-generator", "Create secure random passwords"),
    mk("QR Code Generator", "/tools/qr-code-generator", "Custom QR codes with logo"),
    mk("Invoice Generator", "/tools/invoice-generator", "Professional invoices as PDF"),
    mk("Budget Planner", "/tools/budget-planner", "Track monthly income and expenses"),
    mk("All Free Tools", "/tools", "Browse all 44 free online tools"),
  ],
};

export const CLUSTER_AI = {
  label: "AI Tools & Reviews",
  links: [
    mk("AI Assistant", "/ai-assistant", "Free AI money assistant — ask anything"),
    mk("AI Tools Directory", "/ai-tools", "Compare ChatGPT, Claude, Gemini, DeepSeek"),
    mk("AI Text Summarizer", "/tools/ai-summarizer", "Summarize articles and documents free"),
    mk("AI Paraphrasing Tool", "/tools/ai-paraphraser", "Rewrite text with different tones"),
    mk("AI Grammar Checker", "/tools/ai-grammar-checker", "Fix grammar and spelling free"),
    mk("AI Email Writer", "/tools/ai-email-writer", "Generate professional emails and cover letters"),
    mk("AI Caption Generator", "/tools/ai-caption-generator", "Instagram captions and hashtags"),
    mk("AI Business Name Generator", "/tools/ai-business-name-generator", "Startup name ideas"),
  ],
};

export const CLUSTER_GUIDES = {
  label: "Finance & AI Guides",
  links: [
    mk("Finance Guides", "/blog", "Practical money tips and how-tos"),
    mk("Finance & AI News", "/news", "Plain-English explainers of current events"),
    mk("Finance & AI Glossary", "/glossary", "100+ terms explained simply"),
    mk("Currency PSEO", "/currency/usd-to-inr", "Currency conversion guides"),
  ],
};

// ─── Helpers ───

type Cluster = { label: string; links: LinkItem[] };

const allClusters: Cluster[] = [
  CLUSTER_SIP,
  CLUSTER_EMI,
  CLUSTER_TAX,
  CLUSTER_SAVINGS,
  CLUSTER_RETIREMENT,
  CLUSTER_HEALTH,
  CLUSTER_UTILITY,
  CLUSTER_TOOLS,
  CLUSTER_AI,
  CLUSTER_GUIDES,
];

const slugToCluster = new Map<string, Cluster>();
for (const c of allClusters) {
  for (const link of c.links) {
    const slug = link.href.replace(/^\//, "").replace(/\/$/, "");
    slugToCluster.set(slug, c);
    // also match with trailing variants
    if (slug.includes("/")) {
      slugToCluster.set(link.href, c);
    }
  }
}

export function clusterForSlug(slug: string): Cluster | undefined {
  return slugToCluster.get(slug) || slugToCluster.get(`/${slug}`) || slugToCluster.get(slug.replace(/^\//, ""));
}

export function relatedLinksForSlug(slug: string, max = 6): LinkItem[] {
  const c = clusterForSlug(slug);
  if (!c) return [];
  const self = c.links.find((l) => l.href === slug || l.href.replace(/^\//, "") === slug.replace(/^\//, ""));
  if (!self) return c.links.slice(0, max);
  const others = c.links.filter((l) => l !== self);
  return others.slice(0, max);
}

export { type LinkItem, type Cluster };
