type ProseProps = { children: React.ReactNode; className?: string };

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`prose-container w-full max-w-none text-text [&_h2]:h2 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24 [&_h3]:h3 [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:scroll-mt-24 [&_p]:body [&_p]:text-[17px] [&_p]:leading-[1.78] [&_p]:mb-5 [&_p]:text-text/90 [&_p]:text-justify [&_p]:[hyphens:auto] [&_p]:[text-wrap:pretty] [&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:my-5 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:text-[17px] [&_li]:leading-[1.7] [&_li]:text-text/90 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-brand/40 hover:[&_a]:decoration-brand [&_a]:transition-colors [&_strong]:font-semibold [&_strong]:text-text ${className}`}
    >
      {children}
    </div>
  );
}
