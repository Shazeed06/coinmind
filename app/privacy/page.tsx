import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CoinMind handles data, cookies and advertising. Our calculators run in your browser and we never store the figures you enter.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <header className="pt-14">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 14 July 2026</p>
      </header>

      <div className="article mt-10">
        <p>
          This policy explains what information {site.name} collects, how it is
          used, and the choices you have. By using this website you agree to the
          practices described here.
        </p>

        <h2>Calculator data stays in your browser</h2>
        <p>
          Every calculator on {site.name} runs entirely on your device. The
          amounts, rates and figures you type are processed in your browser and
          are never transmitted to or stored on our servers.
        </p>

        <h2>Information we collect</h2>
        <p>
          We collect standard, non-identifying analytics such as pages visited,
          approximate region, device type and referring site. This helps us
          understand what&apos;s useful and improve the site. We do not ask you
          to create an account and we do not sell personal data.
        </p>

        <h2>Cookies and advertising</h2>
        <p>
          We use cookies to run the site and to measure traffic. We also display
          advertising, and our advertising partners (including Google and its
          AdSense product) may use cookies to serve ads based on your prior
          visits to this and other websites. You can opt out of personalised
          advertising through Google&apos;s Ads Settings, and you can control
          cookies through your browser settings.
        </p>

        <h2>Third-party links</h2>
        <p>
          Our reviews and guides may link to third-party websites and tools,
          some through affiliate programmes. We are not responsible for the
          privacy practices of those sites; please review their policies
          separately.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          {site.name} is intended for adults and is not directed at children
          under 13. We do not knowingly collect data from children.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct or
          delete personal data we hold about you. To make a request, contact us
          using the details below.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be
          reflected by the &ldquo;last updated&rdquo; date at the top of this
          page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy? Email <strong>{site.email}</strong> or use
          our <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
