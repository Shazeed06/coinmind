import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      {/* The separator chevrons were the same colour as the links, so the trail
          read as one continuous grey string. They are now a step lighter than
          the labels, which is what lets the eye split the levels apart. Links
          also pick up an underline on hover: colour alone is a weak affordance
          at 14px, and the ancestor links were otherwise indistinguishable from
          the current page label. */}
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-text-muted">
        <li>
          <Link href="/" className="rounded-input hover:text-brand hover:underline underline-offset-2 transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="rounded-input hover:text-brand hover:underline underline-offset-2 transition-colors">{item.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-text truncate max-w-[200px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
