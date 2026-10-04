// Authentic, topic-relevant editorial photography for articles, news and guides.
// Uses curated high-resolution, WebP-optimized photography matched to the article's
// exact financial or tech topic, replacing generic abstract shapes with real visuals.

export type CoverVariant =
  | "chart"
  | "coins"
  | "card"
  | "spark"
  | "nodes"
  | "candles"
  | "piggy"
  | "plant"
  | "shield"
  | "graph-up";

export type CoverPalette = "forest" | "brass" | "berry" | "deep";

// Curated high-res Unsplash photography IDs categorized by specific financial & tech domains
const TOPIC_PHOTOS: Record<string, string[]> = {
  tax: [
    "photo-1554224155-8d04cb21cd6c", // Calculator, accounting sheets, pen
    "photo-1586486855514-8c633cc6fd38", // Tax audit ledger and laptop
    "photo-1450133064473-71024230f91b", // Document review and official stamp
    "photo-1607604276583-eef5d076aa5f", // Indian currency notes and financial papers
  ],
  investing: [
    "photo-1611974789855-9c2a0a7236a3", // Stock market candlestick trading chart
    "photo-1590283603385-17ffb3a7f29f", // Financial dashboard with green analytics
    "photo-1579621970563-ebec7560ff3e", // Coins sprouting green plant (compounding)
    "photo-1642543492481-44e81e3914a7", // Upward financial analytics screen
  ],
  homeLoan: [
    "photo-1560518883-ce09059eeffa", // House keys held up in front of new home
    "photo-1570129477492-45c003edd2be", // Modern residential house architecture
    "photo-1582407947304-fd86f028f716", // Real estate property contract
    "photo-1560520653-9e0e4c89eb11", // Modern residential building
  ],
  carLoan: [
    "photo-1503376780353-7e6692767b70", // Modern car on open road
    "photo-1552519507-da3b142c6e3d", // Automobile in showroom
    "photo-1494976388531-d1058494cdd8", // Car on scenic highway
  ],
  savings: [
    "photo-1579621970795-87facc2f976d", // Glass piggy bank with coins
    "photo-1567427017947-545c5f8d16ad", // Coin savings jar
    "photo-1526304640581-d334cdbbf45e", // Banking cash notes and passbook
    "photo-1559526324-4b87b5e36e44", // Digital banking and payment card
  ],
  retirement: [
    "photo-1534528741775-53994a69daeb", // Relaxed senior living peacefully
    "photo-1507679799987-c73779587ccf", // Professional financial planning
    "photo-1476703993599-0035a21b17a9", // Peaceful nature, financial independence
  ],
  gold: [
    "photo-1610375461246-83df859d849d", // Stack of 999.9 pure gold bullion bars
    "photo-1601004890684-d8cbf643f5f2", // Gold bullion bars in vault
    "photo-1598439210625-5067c578f3f6", // Precious gold coins and bars
  ],
  credit: [
    "photo-1559526324-4b87b5e36e44", // Modern credit card at POS terminal
    "photo-1563013544-824ae1b704d3", // Credit card for online transactions
  ],
  salary: [
    "photo-1497215728101-856f4ea42174", // Corporate tech office workspace
    "photo-1522202176988-66273c2fd55f", // Tech professionals working together
    "photo-1454165804606-c3d57bc86b40", // Professional salary & performance planning
  ],
  crypto: [
    "photo-1518770660439-4636190af475", // Golden Bitcoin coin on circuit board
  ],
  ai: [
    "photo-1677442136019-21780ecad995", // Glowing AI digital intelligence
    "photo-1526374965328-7f61d4dc18c5", // Laptop with code & neural intelligence
  ],
  budgeting: [
    "photo-1554224154-26032ffc0d07", // Monthly budget planner notebook & coffee
    "photo-1434030216411-0b793f4b4173", // Tablet with personal finances
  ],
  insurance: [
    "photo-1576091160399-112ba8d25d1d", // Healthcare and medical policy
    "photo-1450133064473-71024230f91b", // Insurance agreement verification
  ],
};

function getDeterministicItem(items: string[], seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % items.length;
  return items[index];
}

export function resolveCoverImageUrl(
  seed: string,
  label?: string,
  variant?: CoverVariant
): string {
  const s = seed.toLowerCase();
  const l = (label || "").toLowerCase();

  let pool = TOPIC_PHOTOS.investing;

  if (s.includes("tax") || s.includes("itr") || s.includes("regime") || s.includes("deduction") || l.includes("tax")) {
    pool = TOPIC_PHOTOS.tax;
  } else if (s.includes("home-loan") || s.includes("mortgage") || s.includes("house") || s.includes("rent-vs-buy") || s.includes("property") || s.includes("real-estate")) {
    pool = TOPIC_PHOTOS.homeLoan;
  } else if (s.includes("car-loan") || s.includes("vehicle") || s.includes("auto")) {
    pool = TOPIC_PHOTOS.carLoan;
  } else if (s.includes("loan") || s.includes("emi") || l.includes("loan")) {
    pool = TOPIC_PHOTOS.homeLoan;
  } else if (s.includes("gold") || s.includes("sgb") || s.includes("silver") || l.includes("gold")) {
    pool = TOPIC_PHOTOS.gold;
  } else if (s.includes("credit-score") || s.includes("cibil") || s.includes("credit-card") || l.includes("credit")) {
    pool = TOPIC_PHOTOS.credit;
  } else if (s.includes("fd") || s.includes("fixed-deposit") || s.includes("rd") || s.includes("savings") || l.includes("saving")) {
    pool = TOPIC_PHOTOS.savings;
  } else if (s.includes("retirement") || s.includes("fire") || s.includes("epf") || s.includes("nps") || s.includes("pension") || s.includes("gratuity") || l.includes("retirement")) {
    pool = TOPIC_PHOTOS.retirement;
  } else if (s.includes("salary") || s.includes("in-hand") || s.includes("pay-commission") || s.includes("ctc") || s.includes("appraisal") || s.includes("career")) {
    pool = TOPIC_PHOTOS.salary;
  } else if (s.includes("crypto") || s.includes("bitcoin") || s.includes("web3")) {
    pool = TOPIC_PHOTOS.crypto;
  } else if (s.includes("ai") || s.includes("chatgpt") || s.includes("claude") || s.includes("gemini") || l.includes("ai") || variant === "nodes" || variant === "spark") {
    pool = TOPIC_PHOTOS.ai;
  } else if (s.includes("budget") || s.includes("50-30-20") || s.includes("expense") || l.includes("budget")) {
    pool = TOPIC_PHOTOS.budgeting;
  } else if (s.includes("insurance") || s.includes("health") || s.includes("policy") || variant === "shield") {
    pool = TOPIC_PHOTOS.insurance;
  } else if (variant === "coins") {
    pool = TOPIC_PHOTOS.gold;
  } else if (variant === "piggy") {
    pool = TOPIC_PHOTOS.savings;
  } else if (variant === "card") {
    pool = TOPIC_PHOTOS.credit;
  }

  const photoId = getDeterministicItem(pool, seed);
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=675&q=85`;
}

export default function CoverArt({
  seed,
  variant,
  palette = "forest",
  className = "",
  label,
  imageUrl,
}: {
  seed: string;
  variant?: CoverVariant;
  palette?: CoverPalette;
  className?: string;
  label?: string;
  imageUrl?: string;
}) {
  const photoSrc = imageUrl || resolveCoverImageUrl(seed, label, variant);
  const displayLabel = label || "";

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Real High-Resolution Editorial Image */}
      <img
        src={photoSrc}
        alt={displayLabel ? `${displayLabel} editorial cover` : "Article cover illustration"}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
      />

      {/* Editorial Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Category / Topic Badge */}
      {displayLabel && (
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {displayLabel}
          </span>
        </div>
      )}
    </div>
  );
}
