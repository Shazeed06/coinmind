import Link from "next/link";
import { getOffer } from "@/lib/affiliates";

// Renders a relevant partner (affiliate) CTA, but ONLY when the matching offer
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
    // rounded-2xl -> .panel (--radius-card), and the CTA moves from a raw
    // rounded-full onto the .btn/.btn-accent pair, so it shares its radius,
    // padding, hover and press states with the consent bar's Accept button
    // instead of being a separately tuned green pill.
    <aside
      className={`panel bg-forest-soft/40 p-5 sm:p-6 ${className}`}
    >
      <p className="eyebrow text-brass">Partner offer</p>
      <h3 className="mt-1 text-ink">{o.label}</h3>
      <p className="mt-2 text-sm text-ink-soft leading-relaxed">{o.blurb}</p>
      <a
        href={o.href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="btn btn-accent mt-4"
      >
        {o.cta}
      </a>
      <p className="mt-4 text-xs text-ink-faint leading-relaxed">
        Partner link. We may earn a commission if you sign up, at no extra cost
        to you. It never affects our calculators or what we recommend.{" "}
        <Link href="/affiliate-disclosure" className="underline underline-offset-2 transition-colors hover:text-ink-soft">
          How this works
        </Link>
        .
      </p>
    </aside>
  );
}
