import Link from "next/link";
import { IconArrow } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-28 text-center">
      <p className="font-display text-7xl font-600 text-forest">404</p>
      <h1 className="mt-4 font-display text-3xl font-600 text-ink">
        This page took an unplanned withdrawal
      </h1>
      <p className="mt-3 text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
        get you back to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition-colors"
        >
          Back home <IconArrow className="h-4 w-4" />
        </Link>
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-6 py-3 text-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors"
        >
          Browse calculators
        </Link>
      </div>
    </div>
  );
}
