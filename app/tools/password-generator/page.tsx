import type { Metadata } from "next";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Password Generator — Strong Random Passwords" },
  description:
    "Free password generator. Create strong, random passwords in your browser — choose length, symbols, numbers and case. Nothing is ever uploaded or stored.",
  alternates: { canonical: "/tools/password-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/password-generator",
    title: "Password Generator — Strong Random Passwords",
    description:
      "Create strong, random passwords in your browser with the Web Crypto API. 100% private — passwords never leave your device.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Password Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are the passwords sent to a server?",
    a: "No. Every password is generated entirely in your browser using the Web Crypto API, the same cryptographic primitives browsers use for HTTPS encryption. Nothing is uploaded, logged, or stored anywhere — the passwords never leave your device, and the tool works offline once the page has loaded because no server interaction is involved at any point.",
  },
  {
    q: "How random are the passwords?",
    a: "They use crypto.getRandomValues, the browser's cryptographically secure pseudo-random number generator, with rejection sampling to avoid statistical bias toward any particular character. This is the same class of randomness relied upon for TLS session keys and other security-critical browser functions. It is fundamentally stronger than Math.random, which is designed for speed and statistical distribution — not for security — and must never be used to generate passwords or tokens.",
  },
  {
    q: "How long should my password be?",
    a: "Aim for at least 16 characters. Length is the single most powerful factor in password strength because every additional character multiplies the number of possible combinations an attacker must try by the size of the character pool — typically around 90 or more if you include mixed case, digits, and symbols. A 16-character random password drawn from a 90-character set has more possible combinations than there are seconds in the age of the universe, making brute-force attacks infeasible. The strength meter above updates in real time as you adjust the length.",
  },
  {
    q: "What are ambiguous characters?",
    a: "Characters that are easy to misread or mistype, such as the uppercase letter O and the digit 0, the lowercase letter l, the uppercase I, and the digit 1. Turn on \"Exclude ambiguous characters\" when you anticipate needing to type the password manually rather than pasting it. This is especially useful for passwords you might need to enter on a TV remote, a game console, or any device without a convenient paste function.",
  },
  {
    q: "Should I use the same password everywhere?",
    a: "Never. Password reuse is one of the most common and dangerous security mistakes. When a website you use suffers a data breach — and breaches happen routinely — attackers take the leaked email-and-password pairs and try them on banking sites, email providers, and online retailers in automated attacks called credential stuffing. A unique password per account contains the damage to the one service that was breached. Use a reputable password manager to generate, store, and autofill unique passwords so you do not have to remember them.",
  },
  {
    q: "What is a password manager and do I need one?",
    a: "A password manager is an application that stores all of your passwords in an encrypted vault protected by one master password that only you know. It can generate strong random passwords for new accounts, autofill them on websites and apps, and sync across your devices. Using a password manager is widely recommended by security professionals because it makes using long, unique, random passwords for every account practical — something that is essentially impossible to do by memory alone.",
  },
  {
    q: "What makes a password-phrase different from a password?",
    a: "A passphrase is a sequence of random, unrelated words strung together — something like \"correct-horse-battery-staple\" — rather than a shorter jumble of characters and symbols. Passphrases are easier to remember and type while still being very strong if they are long enough and the words are chosen randomly rather than forming a meaningful sentence. This generator produces traditional character-based passwords, which tend to be stronger at shorter lengths, but both approaches are valid as long as the result is long and unpredictable.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Password Generator",
        item: `${site.url}/tools/password-generator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ToolPageLayout
        title="Password Generator"
        description="Create strong, cryptographically random passwords with full control over length and character types. Toggle uppercase letters, lowercase letters, numbers, and symbols on or off, exclude ambiguous characters that are easy to misread, and get an instant strength estimate — all inside your browser with the Web Crypto API. Nothing is ever uploaded or stored."
        howToUse={[
          {
            step: "Set your desired password length",
            detail: "Use the length slider or input field to choose the number of characters. The strength meter updates in real time and shows you whether the current length is weak, fair, good, strong, or excellent. For important accounts such as email, banking, and password manager master passwords, aim for at least 16 characters — the jump from 12 to 16 characters increases the number of possible combinations by a factor measured in the billions.",
          },
          {
            step: "Choose which character types to include",
            detail: "Toggle the checkboxes for uppercase letters (A–Z), lowercase letters (a–z), numbers (0–9), and symbols (!@#$ and similar). A password that draws from all four categories has a character pool of roughly 90 symbols, giving far more possible combinations than one limited to only letters. The generator ensures at least one character from each selected type appears in the result, so you never get a password missing a category you turned on.",
          },
          {
            step: "Decide whether to exclude ambiguous characters",
            detail: "If you will need to type this password manually — on a phone, a smart TV, a game console, or any device without a paste function — check \"Exclude ambiguous characters\" to remove lookalikes like O and 0, l and I. The character pool shrinks slightly when this option is on, so the generator compensates by still drawing from the remaining pool with full randomness.",
          },
          {
            step: "Generate and review the password",
            detail: "Click the Generate button to produce a fresh random password. You can click it as many times as you like — each press uses a new call to the browser's secure random number generator, so no two outputs are related. The strength meter recalculates immediately for the new value. If you do not like the look of the result, generate again until you get one you are comfortable with.",
          },
          {
            step: "Copy and use the password securely",
            detail: "Click the copy button to put the password onto your clipboard. Paste it directly into the account registration form or password-change field, and also save it in your password manager. The clipboard is cleared after a short timeout in many browsers, but it is a good habit to copy the password immediately rather than leaving it visible on screen. Generate a new, unique password for every account — never reuse the same one.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are creating a new online account",
            detail: "Every new account — an email address, a shopping site, a streaming service, a forum — should get its own unique, randomly generated password. Using this tool for every sign-up ensures you never fall back on a weak, memorable password or, worse, reuse one you already use elsewhere. Pair the generated password with a password manager so you never have to type or remember it.",
          },
          {
            scenario: "You are replacing old or compromised passwords",
            detail: "If a service you use announces a data breach, change your password on that service immediately using a freshly generated random password. You should also proactively replace any password that is short, predictable, or based on a dictionary word, a name, a birthday, or a keyboard walk like \"qwerty.\" Old passwords that pre-date your use of a password manager are especially worth auditing and replacing.",
          },
          {
            scenario: "You are setting up shared or temporary access",
            detail: "When you need to give someone temporary access — a contractor logging into your Wi-Fi, a family member using a shared streaming account, a colleague accessing a staging server — generate a strong random password for that purpose alone. Revoke or change it when access is no longer needed. This prevents temporary credentials from becoming permanent backdoors because someone reused a memorable password.",
          },
        ]}
        howItWorks="This generator uses the Web Crypto API, specifically the crypto.getRandomValues method, to produce cryptographically secure random numbers directly in your browser. The generator builds a pool of allowed characters based on the toggles you select — uppercase letters, lowercase letters, numbers, and symbols — and rejects ambiguous characters if that option is enabled. It then draws characters from that pool one at a time using rejection sampling, which ensures a statistically uniform distribution with no bias toward any particular character. The strength meter estimates entropy in bits based on the character set size and password length, mapping the result to a qualitative label from Weak to Excellent. Every step of this process runs locally in your browser's JavaScript engine with no network requests, no logging, and no data storage of any kind."
        tips={[
          "Use a password manager alongside this generator. Generating strong random passwords is only half the battle — storing and retrieving them securely is the other half. A password manager fills both roles: generate the password here, save it in the manager, and let the manager autofill it on websites and apps going forward.",
          "Favour length over complexity. A 20-character password using only lowercase letters is often stronger than a 10-character password using mixed case, digits, and symbols, because length contributes exponentially to the number of possible combinations. Do not sacrifice length for the sake of adding a symbol that you will struggle to type later.",
          "Treat the strength meter as a rough guide, not a guarantee. It estimates mathematical entropy — how hard the password would be to brute-force — but it cannot account for real-world weaknesses like using your pet's name, a date, or a phrase that appears in a known password list. Randomness is the property that makes the estimate meaningful.",
          "Change passwords after a breach, not on a fixed schedule. Security research shows that mandatory periodic password changes — every 90 days, for instance — often lead to weaker passwords because people make small, predictable modifications. Focus your effort on generating a strong password once and changing it only when there is evidence of compromise.",
          "Do not share passwords through insecure channels. If you need to send a generated password to someone else, use an end-to-end encrypted messaging app, a password manager's sharing feature, or a one-time secret link that expires after being viewed. Never send passwords over email, SMS, or unencrypted chat.",
        ]}
        faqs={faqs}
        relatedTools={[
          { label: "QR Code Generator", href: "/tools/qr-code-generator" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
          { label: "Invoice Generator", href: "/tools/invoice-generator" },
          { label: "Resume Builder", href: "/resume-builder" },
        ]}
        disclaimerType="general"
      >
        <PasswordGenerator />
      </ToolPageLayout>
    </>
  );
}
