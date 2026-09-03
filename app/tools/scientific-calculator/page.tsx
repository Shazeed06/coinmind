import type { Metadata } from "next";
import ScientificCalculator from "@/components/tools/ScientificCalculator";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Scientific Calculator - Free Online" },
  description:
    "Free online scientific calculator with sin, cos, tan, log, ln, powers, roots, factorial, π and e. Keyboard support, runs 100% in your browser.",
  alternates: { canonical: "/tools/scientific-calculator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/scientific-calculator",
    title: "Scientific Calculator - Free Online",
    description:
      "Online scientific calculator with trig, logs, powers, roots and factorial. Keyboard support and Deg/Rad toggle - runs entirely in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scientific Calculator tool",
      },
    ],
  },
};

const faqData = [
  {
    q: "Is this scientific calculator free to use?",
    a: "Yes. This online scientific calculator is completely free with no sign-up, no ads in the way and no limits. It runs entirely in your browser, so you can use it as often as you like on your phone, tablet or computer.",
  },
  {
    q: "Does it work on a phone and with a keyboard?",
    a: "Both. The button grid is sized for touch on phones and tablets, and on a desktop you can type directly: digits, + − * / ^ ( ) ! and % all work, Enter evaluates the expression and Escape clears it.",
  },
  {
    q: "What is the difference between Deg and Rad?",
    a: "The Deg/Rad toggle controls how the trigonometry functions read angles. In Deg mode sin, cos and tan treat your input as degrees (so sin(30) = 0.5); in Rad mode they treat it as radians (so sin(π/6) = 0.5). Tap the toggle in the top-left of the display to switch.",
  },
  {
    q: "How do powers, roots and factorial work?",
    a: "Use xʸ (the ^ key) for any power, for example 2^10. The x² key squares the current value, √ takes a square root, and n! calculates the factorial of a non-negative whole number, such as 5! = 120. Percent (%) divides a value by 100, so 50% becomes 0.5.",
  },
  {
    q: "Is my calculation private?",
    a: "Yes. Everything is computed on your own device with JavaScript. No expression is uploaded, stored or sent to a server. The calculator even keeps working offline once the page has loaded.",
  },
  {
    q: "Can I see my calculation history?",
    a: "No. The calculator does not store history, previous expressions or results. Each calculation is isolated, which keeps the tool simple, fast and fully private with nothing recorded anywhere.",
  },
  {
    q: "Why does my expression show Error?",
    a: "An Error usually means the parser could not make sense of your input. Check for mismatched parentheses, missing operators between numbers and function names, or invalid characters that are not part of a mathematical expression.",
  },
  {
    q: "How do I use pi and e in a calculation?",
    a: "Press the dedicated constant keys and they are inserted at full precision rather than as a rounded value like 3.14. Implicit multiplication next to a constant is supported, so 2 followed by the pi key evaluates as 2 times pi. That makes expressions such as the circumference of a circle quick to enter without extra brackets.",
  },
  {
    q: "Why does 2^3^2 give 512 instead of 64?",
    a: "Because powers are right-associative, which is the standard mathematical convention. The calculator reads 2^3^2 as 2^(3^2), that is 2^9, which is 512. If you want the other reading, add brackets and enter (2^3)^2 to get 64. When a chain of powers matters, brackets remove all doubt.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
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
        name: "Scientific Calculator",
        item: `${site.url}/tools/scientific-calculator`,
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
        title="Scientific Calculator"
        description="A full online scientific calculator: trig, logarithms, powers, roots and factorial, with keyboard support and a Deg/Rad toggle, right in your browser."
        howToUse={[
          {
            step: "Set your angle mode",
            detail:
              "Tap the Deg/Rad toggle in the display corner to choose whether trigonometric functions read angles in degrees or radians. Deg is the default and works for most everyday calculations like sin(30) = 0.5.",
          },
          {
            step: "Type or click your expression",
            detail:
              "Use the on-screen buttons or your physical keyboard to enter an expression. Digits, operators (+, -, *, /), parentheses, and function keys like sin, cos, tan all work from the keyboard.",
          },
          {
            step: "Use scientific functions",
            detail:
              "Click sin, cos or tan for trigonometry; ln for natural log or log for base-10; xʸ (or the ^ key) for powers like 2^10; √ for square roots; and n! for factorials. Use the π and e buttons for those constants.",
          },
          {
            step: "Press equals or Enter",
            detail:
              "Press = on screen or Enter on your keyboard to evaluate. The expression is parsed following standard mathematical precedence: parentheses first, then powers, then multiplication and division, then addition and subtraction.",
          },
          {
            step: "Clear and start over",
            detail:
              "Press C on screen or Escape on your keyboard to clear the display and begin a fresh calculation. The calculator keeps no history and remembers nothing between sessions.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Doing homework or exam preparation",
            detail:
              "Need to check trigonometric identities, logarithmic equations or multi-step algebraic expressions? This calculator handles everything a physical scientific calculator does, with no device to carry around.",
          },
          {
            scenario: "Quick on-the-fly calculations at work",
            detail:
              "No need to find a physical calculator or wait for a heavy application to launch. This loads instantly in any browser tab and is ready for calculations the moment the page appears.",
          },
          {
            scenario: "Working offline or on a locked-down device",
            detail:
              "Since everything runs locally in the browser with no server dependency, the calculator works without an internet connection and on devices where you cannot install any software.",
          },
        ]}
        howItWorks="The calculator uses a custom expression parser built in JavaScript, not the browser's eval function, which would be a security risk. When you press equals, the parser tokenizes your input into numbers, operators and functions, then evaluates them using a recursive-descent algorithm that respects the correct order of operations. Powers are right-associative (so 2^3^2 = 2^(3^2) = 512), unary minus is handled correctly for negative numbers, and implicit multiplication next to constants like 2π is supported. The entire computation happens in your browser with zero network requests."
        tips={[
          "Use parentheses liberally. When in doubt about operator precedence, wrap parts of your expression in parentheses to make the intended order explicit and avoid surprises.",
          "Switch between Deg and Rad before typing your expression. The toggle only affects trig functions evaluated after you switch, not any number already on the display.",
          "Remember that the % key divides by 100. Typing 50% produces 0.5. This is convenient for percentage calculations but can be confusing if you expect a different behaviour.",
          "Factorial (n!) works only on non-negative integers. Entering 5! correctly returns 120, but 3.5! or (-2)! will show an Error on the display.",
          "On desktop, always use the keyboard. It is significantly faster than clicking on-screen buttons. All standard keys work: digits, arithmetic operators, parentheses, Enter for equals, and Escape to clear.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Unit Converter", href: "/tools/unit-converter" },
          { label: "GPA Calculator", href: "/tools/gpa-calculator" },
          { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
          { label: "Age Calculator", href: "/calculators/age-calculator" },
        ]}
      >
        <ScientificCalculator />
      </ToolPageLayout>
    </>
  );
}
