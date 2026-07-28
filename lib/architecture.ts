// ═══════════════════════════════════════════════════════════════════════════
// CoinMind — Enterprise Content Architecture Blueprint
// ═══════════════════════════════════════════════════════════════════════════
// This is THE single source of truth for:
//   • Every topic cluster and its hub
//   • Every entity, its relationships, and its place in the knowledge graph
//   • Content inventory (pages we have + gaps we must fill)
//   • URL hierarchy and route design
//   • Internal linking rules
//   • Search intent coverage
//   • Priority and effort estimates
// ═══════════════════════════════════════════════════════════════════════════

// ─── TYPE DEFINITIONS ─────────────────────────────────────────────────────

export type EntityId = string;

export type EntityRelation = {
  from: EntityId;
  to: EntityId;
  type:
    | "parent"        // broader → narrower (e.g. Investing → SIP)
    | "child"         // narrower → broader
    | "related"       // peer (e.g. SIP ↔ Mutual Fund)
    | "compares"      // comparison (e.g. SIP vs FD)
    | "calculates"    // calculator for a concept
    | "glossary"      // glossary term for a concept
    | "tool"          // tool for a concept
    | "guide"         // guide about a concept
    | "requires"      // prerequisite knowledge
    | "leads-to";     // next learning step
};

export type SearchIntent = "informational" | "commercial" | "navigational"
  | "transactional" | "educational" | "comparison" | "calculator"
  | "problem-solving";

export type PageType = "hub" | "guide" | "calculator" | "comparison"
  | "glossary" | "tool" | "pseo" | "static" | "faq" | "landing";

export type ContentItem = {
  id: string;
  title: string;
  url: string;
  type: PageType;
  cluster: EntityId;
  primaryKeyword: string;
  searchIntent: SearchIntent;
  exists: boolean;
  priority: 1 | 2 | 3;
  /** URL of the hub page this belongs under. */
  hubUrl: string;
};

export type Cluster = {
  id: EntityId;
  label: string;
  description: string;
  hubUrl: string;
  parentCluster: EntityId | null;
  childClusters: EntityId[];
  relatedClusters: EntityId[];
  primaryKeyword: string;
  coverage: number; // 0–1 fraction
  trafficPotential: "high" | "medium" | "low";
  businessValue: "high" | "medium" | "low";
  difficulty: "high" | "medium" | "low";
};

export type ArchitectureReport = {
  clusters: Cluster[];
  entities: EntityRelation[];
  inventory: ContentItem[];
  gaps: ContentItem[];
  coverageScore: number;
  orphanCount: number;
  duplicateCount: number;
};

// ─── CLUSTER DEFINITIONS ──────────────────────────────────────────────────

const CLUSTERS: Cluster[] = [
  {
    id: "personal-finance",
    label: "Personal Finance",
    description: "Comprehensive money management for Indian households",
    hubUrl: "/",
    parentCluster: null,
    childClusters: [
      "investing", "tax", "loans", "savings", "retirement",
      "budgeting", "insurance", "credit-score", "salary",
    ],
    relatedClusters: [],
    primaryKeyword: "personal finance India",
    coverage: 0.8,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "investing",
    label: "Investing",
    description: "Build wealth through stocks, mutual funds, and smart allocation",
    hubUrl: "/investing",
    parentCluster: "personal-finance",
    childClusters: ["sip", "mutual-funds", "stock-market", "gold", "etf", "index-funds", "elss", "lumpsum", "cagr", "xirr", "net-worth"],
    relatedClusters: ["retirement", "tax"],
    primaryKeyword: "investing India",
    coverage: 0.75,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "medium",
  },
  {
    id: "sip",
    label: "SIP & Systematic Investing",
    description: "Systematic Investment Plans for disciplined wealth building",
    hubUrl: "/sip",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "lumpsum", "cagr", "swp"],
    primaryKeyword: "SIP investment",
    coverage: 0.85,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "mutual-funds",
    label: "Mutual Funds",
    description: "Equity, debt, hybrid and index mutual funds explained",
    hubUrl: "/mutual-funds",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["sip", "elss", "index-funds", "etf", "debt-funds", "hybrid-funds"],
    primaryKeyword: "mutual funds India",
    coverage: 0.65,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "medium",
  },
  {
    id: "stock-market",
    label: "Stock Market",
    description: "Equity investing, trading strategies and market analysis for India",
    hubUrl: "/stock-market",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "cagr", "xirr"],
    primaryKeyword: "stock market India",
    coverage: 0.15,
    trafficPotential: "high",
    businessValue: "medium",
    difficulty: "high",
  },
  {
    id: "gold",
    label: "Gold Investment",
    description: "SGB, gold ETFs, digital gold and physical gold investing",
    hubUrl: "/gold",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["savings", "investing"],
    primaryKeyword: "gold investment India",
    coverage: 0.55,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "etf",
    label: "Exchange Traded Funds",
    description: "Low-cost passive investing through ETFs on NSE and BSE",
    hubUrl: "/etf",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "index-funds", "gold"],
    primaryKeyword: "ETF India",
    coverage: 0.3,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "medium",
  },
  {
    id: "index-funds",
    label: "Index Funds",
    description: "Passive index fund investing tracking Nifty 50, Sensex and more",
    hubUrl: "/index-funds",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "etf", "sip"],
    primaryKeyword: "index funds India",
    coverage: 0.2,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "medium",
  },
  {
    id: "debt-funds",
    label: "Debt Mutual Funds",
    description: "Fixed-income mutual funds for capital preservation and steady returns",
    hubUrl: "/debt-funds",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "savings", "fd"],
    primaryKeyword: "debt mutual funds India",
    coverage: 0.15,
    trafficPotential: "medium",
    businessValue: "low",
    difficulty: "medium",
  },
  {
    id: "hybrid-funds",
    label: "Hybrid Mutual Funds",
    description: "Balanced funds mixing equity and debt for moderate risk",
    hubUrl: "/hybrid-funds",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "investing", "retirement"],
    primaryKeyword: "hybrid mutual funds India",
    coverage: 0.05,
    trafficPotential: "medium",
    businessValue: "low",
    difficulty: "medium",
  },
  {
    id: "elss",
    label: "ELSS Tax-Saving Funds",
    description: "Equity-linked savings schemes with tax benefits under Section 80C",
    hubUrl: "/elss",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["mutual-funds", "sip", "tax"],
    primaryKeyword: "ELSS tax saving funds India",
    coverage: 0.25,
    trafficPotential: "medium",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "lumpsum",
    label: "Lumpsum Investment",
    description: "One-time lump sum investing strategies and calculators",
    hubUrl: "/lumpsum",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["sip", "mutual-funds", "cagr"],
    primaryKeyword: "lumpsum investment",
    coverage: 0.6,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "swp",
    label: "Systematic Withdrawal Plan",
    description: "Regular monthly income from mutual fund investments",
    hubUrl: "/swp",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["sip", "retirement", "mutual-funds"],
    primaryKeyword: "SWP systematic withdrawal plan",
    coverage: 0.55,
    trafficPotential: "medium",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "cagr",
    label: "CAGR & Investment Returns",
    description: "Compound annual growth rate, absolute returns and XIRR explained",
    hubUrl: "/cagr",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["sip", "lumpsum", "mutual-funds", "xirr"],
    primaryKeyword: "CAGR calculator",
    coverage: 0.55,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "xirr",
    label: "XIRR",
    description: "Extended internal rate of return for irregular cash flows",
    hubUrl: "/xirr",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["cagr", "sip", "mutual-funds"],
    primaryKeyword: "XIRR calculator",
    coverage: 0.1,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "net-worth",
    label: "Net Worth",
    description: "Track and grow your personal net worth over time",
    hubUrl: "/net-worth",
    parentCluster: "investing",
    childClusters: [],
    relatedClusters: ["budgeting", "investing", "retirement"],
    primaryKeyword: "net worth calculator India",
    coverage: 0.1,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "tax",
    label: "Income Tax",
    description: "Indian income tax: regimes, deductions, exemptions and filing",
    hubUrl: "/income-tax",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["salary", "investing", "savings"],
    primaryKeyword: "income tax India",
    coverage: 0.88,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "salary",
    label: "Salary & Take-Home Pay",
    description: "CTC breakdown, in-hand salary, and salary negotiation",
    hubUrl: "/salary",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["tax", "budgeting", "investing"],
    primaryKeyword: "salary calculator India",
    coverage: 0.6,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "loans",
    label: "Loans & EMI",
    description: "Home loans, car loans, personal loans and education loans",
    hubUrl: "/loans",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["credit-score", "tax", "budgeting"],
    primaryKeyword: "loan EMI calculator",
    coverage: 0.85,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "savings",
    label: "Savings & Fixed Deposits",
    description: "FD, PPF, NSC, SCSS, Sukanya Samriddhi, Post Office schemes",
    hubUrl: "/savings",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["retirement", "tax", "investing"],
    primaryKeyword: "savings schemes India",
    coverage: 0.8,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "retirement",
    label: "Retirement Planning",
    description: "Retirement corpus, NPS, EPF, PPF and pension planning",
    hubUrl: "/retirement",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["savings", "investing", "tax", "insurance"],
    primaryKeyword: "retirement planning India",
    coverage: 0.7,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "medium",
  },
  {
    id: "budgeting",
    label: "Budgeting & Money Management",
    description: "Household budgets, expense tracking, 50/30/20 rule, emergency funds",
    hubUrl: "/budgeting",
    parentCluster: "personal-finance",
    childClusters: ["emergency-fund", "passive-income", "goal-planning"],
    relatedClusters: ["salary", "savings", "net-worth"],
    primaryKeyword: "budgeting India",
    coverage: 0.55,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "emergency-fund",
    label: "Emergency Fund",
    description: "Building and maintaining a financial safety net",
    hubUrl: "/emergency-fund",
    parentCluster: "budgeting",
    childClusters: [],
    relatedClusters: ["savings", "insurance", "budgeting"],
    primaryKeyword: "emergency fund India",
    coverage: 0.2,
    trafficPotential: "medium",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "goal-planning",
    label: "Financial Goal Planning",
    description: "Goal-based investing for milestones: education, wedding, house, retirement",
    hubUrl: "/goal-planning",
    parentCluster: "budgeting",
    childClusters: [],
    relatedClusters: ["sip", "investing", "retirement"],
    primaryKeyword: "financial goal planning India",
    coverage: 0.25,
    trafficPotential: "medium",
    businessValue: "high",
    difficulty: "low",
  },
  {
    id: "insurance",
    label: "Insurance",
    description: "Term life, health, and general insurance in India",
    hubUrl: "/insurance",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["retirement", "budgeting", "emergency-fund"],
    primaryKeyword: "insurance India",
    coverage: 0.1,
    trafficPotential: "high",
    businessValue: "high",
    difficulty: "high",
  },
  {
    id: "credit-score",
    label: "Credit Score",
    description: "CIBIL score, credit reports, and improving creditworthiness",
    hubUrl: "/credit-score",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["loans", "credit-cards", "budgeting"],
    primaryKeyword: "CIBIL score India",
    coverage: 0.55,
    trafficPotential: "high",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "credit-cards",
    label: "Credit Cards",
    description: "Best credit cards in India, rewards, and responsible usage",
    hubUrl: "/credit-cards",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["credit-score", "budgeting", "loans"],
    primaryKeyword: "credit cards India",
    coverage: 0.05,
    trafficPotential: "high",
    businessValue: "medium",
    difficulty: "high",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    description: "Property investment, home buying, and real estate market in India",
    hubUrl: "/real-estate",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["loans", "investing", "tax"],
    primaryKeyword: "real estate India investment",
    coverage: 0.35,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "high",
  },
  {
    id: "business-finance",
    label: "Business & Startup Finance",
    description: "Small business finance, GST, invoicing and startup budgeting",
    hubUrl: "/business-finance",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["tax", "investing", "budgeting"],
    primaryKeyword: "business finance India",
    coverage: 0.3,
    trafficPotential: "low",
    businessValue: "low",
    difficulty: "medium",
  },
  {
    id: "passive-income",
    label: "Passive Income",
    description: "Create income streams that earn while you sleep",
    hubUrl: "/passive-income",
    parentCluster: "budgeting",
    childClusters: [],
    relatedClusters: ["investing", "real-estate", "business-finance"],
    primaryKeyword: "passive income ideas India",
    coverage: 0.05,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "medium",
  },
  {
    id: "wealth-building",
    label: "Wealth Building",
    description: "Long-term wealth creation strategies for Indian investors",
    hubUrl: "/wealth-building",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["investing", "retirement", "passive-income", "budgeting"],
    primaryKeyword: "wealth building India",
    coverage: 0.2,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "financial-independence",
    label: "Financial Independence (FIRE)",
    description: "FIRE movement, early retirement, and financial freedom in India",
    hubUrl: "/financial-independence",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["retirement", "investing", "budgeting", "net-worth"],
    primaryKeyword: "FIRE India financial independence",
    coverage: 0.35,
    trafficPotential: "medium",
    businessValue: "medium",
    difficulty: "low",
  },
  {
    id: "gst",
    label: "GST",
    description: "Goods and Services Tax rates, returns, and compliance in India",
    hubUrl: "/gst",
    parentCluster: "business-finance",
    childClusters: [],
    relatedClusters: ["business-finance", "tax"],
    primaryKeyword: "GST India",
    coverage: 0.5,
    trafficPotential: "medium",
    businessValue: "low",
    difficulty: "low",
  },
  {
    id: "crypto",
    label: "Cryptocurrency (Education Only)",
    description: "Educational content on crypto, blockchain, Web3 and regulatory landscape",
    hubUrl: "/crypto",
    parentCluster: "personal-finance",
    childClusters: [],
    relatedClusters: ["investing"],
    primaryKeyword: "cryptocurrency India",
    coverage: 0.05,
    trafficPotential: "medium",
    businessValue: "low",
    difficulty: "high",
  },
];

// ─── ENTITY RELATIONSHIPS (KNOWLEDGE GRAPH) ───────────────────────────────

const ENTITY_RELATIONS: EntityRelation[] = [
  // Investing hierarchy
  { from: "personal-finance", to: "investing", type: "parent" },
  { from: "investing", to: "personal-finance", type: "child" },
  { from: "investing", to: "sip", type: "parent" },
  { from: "sip", to: "investing", type: "child" },
  { from: "investing", to: "mutual-funds", type: "parent" },
  { from: "mutual-funds", to: "investing", type: "child" },
  { from: "investing", to: "stock-market", type: "parent" },
  { from: "stock-market", to: "investing", type: "child" },
  { from: "investing", to: "gold", type: "parent" },
  { from: "gold", to: "investing", type: "child" },
  { from: "investing", to: "etf", type: "parent" },
  { from: "etf", to: "investing", type: "child" },
  { from: "investing", to: "elss", type: "parent" },
  { from: "elss", to: "investing", type: "child" },

  // Peer relationships
  { from: "sip", to: "mutual-funds", type: "related" },
  { from: "sip", to: "lumpsum", type: "compares" },
  { from: "sip", to: "swp", type: "related" },
  { from: "sip", to: "cagr", type: "requires" },
  { from: "mutual-funds", to: "index-funds", type: "compares" },
  { from: "mutual-funds", to: "etf", type: "compares" },
  { from: "mutual-funds", to: "debt-funds", type: "related" },
  { from: "mutual-funds", to: "hybrid-funds", type: "related" },
  { from: "ppf", to: "fd", type: "compares" },
  { from: "ppf", to: "nps", type: "compares" },
  { from: "epf", to: "nps", type: "compares" },
  { from: "savings", to: "investing", type: "related" },
  { from: "savings", to: "retirement", type: "related" },
  { from: "loans", to: "credit-score", type: "requires" },
  { from: "retirement", to: "investing", type: "requires" },
  { from: "budgeting", to: "investing", type: "leads-to" },
  { from: "emergency-fund", to: "investing", type: "leads-to" },
  { from: "tax", to: "investing", type: "related" },
  { from: "insurance", to: "retirement", type: "related" },
  { from: "gold", to: "etf", type: "related" },
  { from: "investing", to: "financial-independence", type: "leads-to" },
  { from: "budgeting", to: "financial-independence", type: "leads-to" },
  { from: "goal-planning", to: "sip", type: "leads-to" },
  { from: "index-funds", to: "etf", type: "compares" },
  { from: "elss", to: "tax", type: "related" },
  { from: "cagr", to: "xirr", type: "compares" },
  { from: "real-estate", to: "loans", type: "requires" },
  { from: "business-finance", to: "gst", type: "requires" },
  { from: "business-finance", to: "tax", type: "related" },
  { from: "credit-cards", to: "credit-score", type: "requires" },
  { from: "credit-cards", to: "budgeting", type: "related" },
  { from: "passive-income", to: "investing", type: "requires" },
  { from: "passive-income", to: "real-estate", type: "related" },
  { from: "wealth-building", to: "investing", type: "requires" },
  { from: "wealth-building", to: "budgeting", type: "requires" },
  { from: "financial-independence", to: "retirement", type: "related" },
  { from: "financial-independence", to: "budgeting", type: "requires" },
  { from: "emergency-fund", to: "savings", type: "related" },
  { from: "emergency-fund", to: "insurance", type: "related" },
  { from: "goal-planning", to: "sip", type: "leads-to" },
  { from: "goal-planning", to: "budgeting", type: "requires" },
  { from: "xirr", to: "cagr", type: "compares" },
  { from: "xirr", to: "sip", type: "requires" },
  { from: "net-worth", to: "budgeting", type: "requires" },
  { from: "net-worth", to: "investing", type: "leads-to" },
  { from: "debt-funds", to: "savings", type: "related" },
  { from: "debt-funds", to: "fd", type: "compares" },
  { from: "hybrid-funds", to: "mutual-funds", type: "child" },
  { from: "hybrid-funds", to: "investing", type: "related" },
  { from: "crypto", to: "investing", type: "related" },
  { from: "crypto", to: "tax", type: "related" },
  { from: "stock-market", to: "mutual-funds", type: "compares" },
  { from: "stock-market", to: "cagr", type: "requires" },
  { from: "gold", to: "savings", type: "related" },
  { from: "savings", to: "loans", type: "related" },
  { from: "insurance", to: "emergency-fund", type: "related" },
  { from: "retirement", to: "financial-independence", type: "leads-to" },
  { from: "tax", to: "financial-independence", type: "related" },
  { from: "salary", to: "tax", type: "requires" },
  { from: "salary", to: "budgeting", type: "related" },
  { from: "lumpsum", to: "mutual-funds", type: "related" },
  { from: "swp", to: "retirement", type: "related" },
  { from: "cagr", to: "investing", type: "requires" },
  { from: "personal-finance", to: "real-estate", type: "parent" },
  { from: "real-estate", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "insurance", type: "parent" },
  { from: "insurance", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "credit-cards", type: "parent" },
  { from: "credit-cards", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "crypto", type: "parent" },
  { from: "crypto", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "wealth-building", type: "parent" },
  { from: "wealth-building", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "financial-independence", type: "parent" },
  { from: "financial-independence", to: "personal-finance", type: "child" },
  { from: "personal-finance", to: "business-finance", type: "parent" },
  { from: "business-finance", to: "personal-finance", type: "child" },
];

// ─── CONTENT INVENTORY ────────────────────────────────────────────────────

const hubUrlForCluster = (c: Cluster): string => c.hubUrl;

const ALL_CLUSTERS_BY_ID = new Map(CLUSTERS.map((c) => [c.id, c]));

export function getCluster(id: EntityId): Cluster | undefined {
  return ALL_CLUSTERS_BY_ID.get(id);
}

export function getClusters(): Cluster[] {
  return CLUSTERS;
}

export function getEntityRelations(): EntityRelation[] {
  return ENTITY_RELATIONS;
}

export function getArchitectureReport(): ArchitectureReport {
  const coverageScore = CLUSTERS.reduce((s, c) => s + c.coverage, 0) / CLUSTERS.length;
  return {
    clusters: CLUSTERS,
    entities: ENTITY_RELATIONS,
    inventory: [],
    gaps: [],
    coverageScore: Math.round(coverageScore * 100),
    orphanCount: 0,
    duplicateCount: 0,
  };
}

// ─── TOPICAL AUTHORITY & COVERAGE ─────────────────────────────────────────

export function getCoverageSummary() {
  const total = CLUSTERS.length;
  const covered = CLUSTERS.filter((c) => c.coverage >= 0.5).length;
  const partial = CLUSTERS.filter((c) => c.coverage >= 0.2 && c.coverage < 0.5).length;
  const missing = CLUSTERS.filter((c) => c.coverage < 0.2).length;
  const avgScore = Math.round(CLUSTERS.reduce((s, c) => s + c.coverage, 0) / total * 100);

  const highTrafficMissing = CLUSTERS.filter(
    (c) => c.coverage < 0.5 && c.trafficPotential === "high"
  ).map((c) => ({ id: c.id, label: c.label, coverage: Math.round(c.coverage * 100) }));

  return { total, covered, partial, missing, avgScore, highTrafficMissing };
}

// ─── GAP PRIORITIZATION ──────────────────────────────────────────────────

export function getPrioritizedGaps(): {
  id: EntityId;
  label: string;
  coverage: number;
  priority: 1 | 2 | 3;
  trafficPotential: string;
  businessValue: string;
  difficulty: string;
}[] {
  return CLUSTERS
    .filter((c) => c.coverage < 0.5)
    .sort((a, b) => {
      const score = (c: Cluster) =>
        (c.trafficPotential === "high" ? 3 : c.trafficPotential === "medium" ? 2 : 1) * 3
        + (c.businessValue === "high" ? 3 : c.businessValue === "medium" ? 2 : 1) * 2
        + (c.difficulty === "low" ? 3 : c.difficulty === "medium" ? 2 : 1);
      return score(b) - score(a);
    })
    .map((c) => ({
      id: c.id,
      label: c.label,
      coverage: Math.round(c.coverage * 100),
      priority: (c.trafficPotential === "high" && c.businessValue === "high" ? 1
        : c.trafficPotential === "high" || c.businessValue === "high" ? 2
        : 3) as 1 | 2 | 3,
      trafficPotential: c.trafficPotential,
      businessValue: c.businessValue,
      difficulty: c.difficulty,
    }));
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────

export type NavSection = {
  label: string;
  href: string;
  children: { label: string; href: string }[];
};

export function getTopicalNav(): NavSection[] {
  return [
    {
      label: "Investing", href: "/investing",
      children: [
        { label: "SIP", href: "/sip" },
        { label: "Mutual Funds", href: "/mutual-funds" },
        { label: "Stock Market", href: "/stock-market" },
        { label: "Gold", href: "/gold" },
        { label: "ETF & Index Funds", href: "/etf" },
        { label: "ELSS", href: "/elss" },
        { label: "Lumpsum", href: "/lumpsum" },
        { label: "SWP", href: "/swp" },
        { label: "CAGR & XIRR", href: "/cagr" },
      ],
    },
    {
      label: "Tax", href: "/income-tax",
      children: [
        { label: "Income Tax Calculator", href: "/calculators/income-tax" },
        { label: "Tax Regime Comparison", href: "/tax-regime-break-even" },
        { label: "HRA Exemption", href: "/calculators/hra" },
        { label: "TDS", href: "/calculators/tds" },
        { label: "Capital Gains", href: "/calculators/capital-gains" },
        { label: "GST", href: "/calculators/gst" },
      ],
    },
    {
      label: "Loans", href: "/loans",
      children: [
        { label: "EMI Calculator", href: "/calculators/emi" },
        { label: "Home Loan", href: "/calculators/home-loan-eligibility" },
        { label: "Car Loan", href: "/calculators/car-loan-emi" },
        { label: "Personal Loan", href: "/calculators/personal-loan-emi" },
        { label: "Education Loan", href: "/calculators/education-loan-emi" },
      ],
    },
    {
      label: "Savings", href: "/savings",
      children: [
        { label: "FD Calculator", href: "/calculators/fd" },
        { label: "PPF Calculator", href: "/calculators/ppf" },
        { label: "NPS Calculator", href: "/calculators/nps" },
        { label: "EPF Calculator", href: "/calculators/epf" },
        { label: "NSC & SCSS", href: "/calculators/nsc" },
      ],
    },
    {
      label: "Retirement", href: "/retirement",
      children: [
        { label: "Retirement Calculator", href: "/calculators/retirement" },
        { label: "NPS", href: "/calculators/nps" },
        { label: "PPF", href: "/calculators/ppf" },
        { label: "EPF", href: "/calculators/epf" },
        { label: "SWP", href: "/calculators/swp" },
      ],
    },
    {
      label: "Budgeting", href: "/budgeting",
      children: [
        { label: "Budget Planner", href: "/tools/budget-planner" },
        { label: "50/30/20 Rule", href: "/blog/50-30-20-budget-rule" },
        { label: "Net Worth", href: "/net-worth" },
        { label: "Goal Planning", href: "/goal-planning" },
      ],
    },
  ];
}
