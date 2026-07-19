// Affiliate offers config.
//
// HOW TO USE: once you join a partner program (a broker's refer-&-earn program
// like Zerodha/Groww/Upstox, a credit-card affiliate network, a loan aggregator,
// etc.), paste YOUR referral/affiliate link into the `href` below. While `href`
// is empty, the CTA is completely HIDDEN — nothing misleading or non-earning is
// ever shown to users. All affiliate links render with rel="sponsored nofollow"
// and an on-page disclosure, per Google + FTC guidance.

export type AffiliateOffer = {
  href: string; // YOUR affiliate URL (with your referral id). Empty = hidden.
  label: string; // headline shown on the CTA card
  blurb: string; // one-line value proposition
  cta: string; // button text
};

export const affiliateOffers: Record<string, AffiliateOffer> = {
  demat: {
    href: "",
    label: "Ready to invest? Open a free demat account",
    blurb:
      "Start your SIP or lumpsum with a trusted broker — zero-cost account opening, all online.",
    cta: "Open a free account",
  },
  loan: {
    href: "",
    label: "Compare loan offers for your profile",
    blurb:
      "Check personalised interest rates and EMIs from top lenders before you apply.",
    cta: "Compare loan offers",
  },
  creditCard: {
    href: "",
    label: "Find a credit card that fits you",
    blurb:
      "Compare cashback, rewards and fee-free cards, and apply online in minutes.",
    cta: "Compare credit cards",
  },
  insurance: {
    href: "",
    label: "Protect your family — compare term insurance",
    blurb: "Compare high-cover, low-premium term plans from leading insurers.",
    cta: "Compare plans",
  },
};

// Map a calculator's category to the most relevant offer (or undefined).
export function offerForCategory(category?: string): string | undefined {
  if (category === "Investing") return "demat";
  if (category === "Loans") return "loan";
  return undefined; // Tax / Savings / Utility / Health → no offer by default
}

// Returns the offer ONLY when it has been configured with a real href.
export function getOffer(key?: string): AffiliateOffer | null {
  if (!key) return null;
  const o = affiliateOffers[key];
  return o && o.href ? o : null;
}
