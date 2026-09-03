import Link from "next/link";

type CardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

// Padding steps to 24px from `sm` up but starts at 20px, not 16px, so a card on
// a phone matches the 20px interiors used by the calculator, blog and news
// grids instead of being a step tighter than everything around it.
export function Card({ children, href, className = "" }: CardProps) {
  const classes = `card card-h-full p-5 sm:p-6 ${className}`;
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <div className={classes}>{children}</div>;
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

// Top spacing comes from the `.card-footer` rule so bare `<div class="card-footer">`
// elements elsewhere on the site land on the same rhythm.
export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

// Was a hardcoded #2F5BEA at px-2.5, i.e. the brand blue written out by hand and
// a different horizontal padding to <Pill/>, which is the same role. Now both
// share the .pill class and the brand token.
export function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill eyebrow bg-brand/10 text-brand">
      {children}
    </span>
  );
}
