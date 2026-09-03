import { SectionHeader } from "@/components/ui";

/**
 * Homepage wrapper around the shared <SectionHeader/>.
 *
 * The shared header ships a `lg:mb-24` (96px) gap below itself. Measured on the
 * live homepage that is larger than the 76.8px `section-pad` above it, so every
 * section header ended up sitting closer to the previous section's edge than to
 * the content it introduces: the grouping read backwards, and the eyebrow/title/
 * subline trio floated alone in the middle of the band.
 *
 * The override below pulls that gap back under the section padding so a header
 * visibly belongs to the content beneath it. It is applied here, from the
 * homepage side, rather than by editing the shared component, because the same
 * header is used on pages this pass does not cover.
 *
 * The child selector outranks SectionHeader's own utility class on specificity,
 * so this wins independently of stylesheet order.
 */
export default function SectionIntro(
  props: React.ComponentProps<typeof SectionHeader>,
) {
  return (
    <div className="[&>header]:mb-10 sm:[&>header]:mb-12 lg:[&>header]:mb-16">
      <SectionHeader {...props} />
    </div>
  );
}
