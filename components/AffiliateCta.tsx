import Link from "next/link";
import { getOffer } from "@/lib/affiliates";

// Renders a relevant partner (affiliate) CTA — but ONLY when the matching offer
// in lib/affiliates.ts has a real href set. Until then it renders nothing, so
// no empty or non-earning links ever appear. Link uses rel="sponsored nofollow"
// and carries an inline disclosure (Google + FTC compliant).
export default function AffiliateCta({
  offer,
  className = "",
}: {
  offer?: string;
  className?: string;
}) {
  const o = getOffer(offer);
  if (!o) return null;

  return (
    <aside
      className={`rounded-2xl border border-line bg-forest-soft/40 p-5 sm:p-6 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-brass">
        Partner offer
      </p>
      <h3 className="mt-1 font-display text-lg font-600 text-ink">{o.label}</h3>
      <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{o.blurb}</p>
      <a
        href={o.href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
      >
        {o.cta}
      </a>
      <p className="mt-3 text-xs text-ink-faint leading-relaxed">
        Partner link — we may earn a commission if you sign up, at no extra cost
        to you. It never affects our calculators or what we recommend.{" "}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2">
          How this works
        </Link>
        .
      </p>
    </aside>
  );
}
