import Link from "next/link";
import { site } from "@/lib/site";

export type Source = { label: string; href: string };

// E-E-A-T trust block: who wrote/reviewed the page, a link to our editorial
// standards, and the official sources the figures are checked against. Finance
// is a YMYL (Your Money or Your Life) topic where Google weighs this heavily,
// so it appears on every calculator and guide.
export default function AuthorReviewBox({
  sources,
  className = "",
}: {
  sources?: Source[];
  className?: string;
}) {
  return (
    // Was rounded-2xl (16px) sitting beside 12px cards on the same page. The
    // .panel class puts it on --radius-card with the rest.
    <aside
      className={`panel bg-bg-alt p-5 sm:p-6 text-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-forest text-white text-base font-semibold">
          {site.author.fullName.charAt(0)}
        </span>
        <div>
          <p className="font-semibold text-ink">
            Written &amp; reviewed by{" "}
            <Link href="/about#author" className="text-forest underline underline-offset-2 decoration-forest/40 transition-colors hover:decoration-forest">
              {site.author.fullName}
            </Link>
            , {site.author.credential}
          </p>
          {/* This sentence was text-ink-faint at the old #94a3b8: 2.34:1 on the
              panel fill, well under the 4.5:1 body-text minimum, and it is real
              prose rather than metadata. It moves up to the -soft step. */}
          <p className="mt-1 text-ink-soft leading-relaxed">
            Every formula and figure is checked against official sources and
            updated when rules change ·{" "}
            <Link
              href="/editorial-standards"
              className="text-forest underline underline-offset-2 decoration-forest/40 transition-colors hover:decoration-forest"
            >
              How we ensure accuracy
            </Link>
          </p>
        </div>
      </div>

      {sources && sources.length > 0 && (
        <p className="mt-4 border-t border-line pt-4 text-ink-faint leading-relaxed">
          <span className="font-semibold text-ink">Sources:</span>{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-forest underline underline-offset-2 decoration-forest/40 transition-colors hover:decoration-forest"
              >
                {s.label}
              </a>
              {i < sources.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
    </aside>
  );
}
