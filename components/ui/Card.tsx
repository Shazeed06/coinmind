import Link from "next/link";

type CardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export function Card({ children, href, className = "" }: CardProps) {
  const classes = `card card-h-full p-6 ${className}`;
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <div className={classes}>{children}</div>;
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer pt-4">{children}</div>;
}

export function CardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-flex rounded-pill bg-[#2F5BEA]/10 px-2.5 py-1 text-[#2F5BEA]">
      {children}
    </span>
  );
}
