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
    <aside
      className={`rounded-2xl border border-line bg-paper-2 p-5 sm:p-6 text-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-white text-base font-semibold">
          {site.author.name.charAt(0)}
        </span>
        <div>
          <p className="font-semibold text-ink">
            Written &amp; reviewed by{" "}
            <Link href="/about#author" className="text-forest hover:underline">
              {site.author.name}
            </Link>
            , {site.author.credential}
          </p>
          <p className="mt-0.5 text-ink-faint leading-relaxed">
            Every formula and figure is checked against official sources and
            updated when rules change ·{" "}
            <Link
              href="/editorial-standards"
              className="text-forest underline underline-offset-2"
            >
              How we ensure accuracy
            </Link>
          </p>
        </div>
      </div>

      {sources && sources.length > 0 && (
        <p className="mt-4 border-t border-line pt-3 text-ink-soft leading-relaxed">
          <span className="font-semibold text-ink">Sources:</span>{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-forest underline underline-offset-2"
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
