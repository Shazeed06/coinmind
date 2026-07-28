import Link from "next/link";
import { site } from "@/lib/site";

type AuthorBylineProps = { className?: string };

export function AuthorByline({ className = "" }: AuthorBylineProps) {
  const a = site.author;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link href={`/authors/${a.slug}`} className="shrink-0">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white text-sm font-semibold">
          {a.fullName.charAt(0)}
        </span>
      </Link>
      <div className="text-sm">
        <p className="font-semibold text-text">
          Written by{" "}
          <Link href={`/authors/${a.slug}`} className="hover:text-brand hover:underline">
            {a.fullName}
          </Link>
          <span className="font-normal text-text-muted"> · {a.credential}</span>
        </p>
        <p className="text-text-muted text-xs mt-0.5">{a.sebiDisclaimer}</p>
      </div>
    </div>
  );
}
