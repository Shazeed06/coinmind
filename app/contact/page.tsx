import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CoinMind team — feedback, corrections, partnership enquiries or a tool you'd like us to build.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <header className="pt-14">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Spotted an error, have feedback, or want a calculator we don&apos;t
          have yet? We read every message.
        </p>
      </header>

      <div className="mt-10">
        <ContactForm />
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <p>
          Prefer email? Write to{" "}
          <span className="font-semibold text-ink">{site.email}</span>. We
          usually reply within two business days.
        </p>
      </div>
    </div>
  );
}
