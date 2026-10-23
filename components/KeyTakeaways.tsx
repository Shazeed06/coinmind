import { Lightbulb, Check } from "lucide-react";

// Key Takeaways callout shown at the top of an article body. Renders only when
// a post supplies `keyTakeaways`, so posts without them are unaffected and the
// layout stays consistent across the blog.
export default function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <section
      aria-label="Key takeaways"
      className="not-prose mb-8 rounded-card border border-forest/20 bg-forest-soft/50 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest/10 text-forest">
          <Lightbulb className="h-4.5 w-4.5" />
        </span>
        <h2 className="h3 !mt-0 !mb-0 text-text">Key Takeaways</h2>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
            <span className="text-[15px] leading-relaxed text-text/90">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
