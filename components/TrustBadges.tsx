import { ShieldCheck, Calculator, BookOpen, RefreshCw } from "lucide-react";

// Full-width trust strip shown below every article, matching the site footer
// badges. Purely presentational, so it renders identically on all posts.
const BADGES = [
  { icon: ShieldCheck, title: "Expert-Reviewed Content", desc: "Backed by research and data" },
  { icon: Calculator, title: "Free Financial Calculators", desc: "Plan your goals with ease" },
  { icon: BookOpen, title: "Practical Investment Guides", desc: "Simple and easy to understand" },
  { icon: RefreshCw, title: "Regular Updates", desc: "Stay informed with latest insights" },
];

export default function TrustBadges() {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-5 border-t border-border bg-bg py-7 lg:grid-cols-4">
      {BADGES.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-soft text-forest">
            <Icon className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text leading-tight">{title}</p>
            <p className="mt-0.5 text-xs text-text-muted">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
