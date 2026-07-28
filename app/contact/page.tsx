import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CoinMind team — feedback, corrections, partnership enquiries or a tool you'd like us to build.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function Page() {
  return (
    <LegalPage pill="Contact" title="Get in touch">
      <ContactForm />
      <div className="mt-10 p-6 rounded-card bg-bg-alt border border-border text-sm text-text-muted">
        <p>
          Prefer email? Write to{" "}
          <span className="font-semibold text-ink">{site.email}</span>. We&apos;ll
          do our best to get back to you.
        </p>
      </div>
    </LegalPage>
  );
}
