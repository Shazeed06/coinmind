import type { Metadata } from "next";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "QR Code Generator — Free Custom QR Codes" },
  description:
    "Free QR code generator. Create custom QR codes for any URL or text — pick colours, size and error correction, then download as PNG or SVG in your browser.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/qr-code-generator",
    title: "QR Code Generator — Free Custom QR Codes",
    description:
      "Create custom QR codes for any URL or text — choose colours, size and error correction, then download as PNG or SVG. 100% private, made in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "QR Code Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my QR codes generated privately?",
    a: "Yes. Everything runs in your browser — the text or URL you enter is turned into a QR code on your own device and is never uploaded, stored, or seen by anyone. You can even use the tool offline once the page has loaded, since the QR generation happens entirely in JavaScript with no server dependency.",
  },
  {
    q: "What do the error-correction levels (L, M, Q, H) mean?",
    a: "Error correction lets a QR code still be read when part of it is dirty, damaged, or covered by a logo. Level L recovers about 7% of the code area, M about 15%, Q about 25%, and H about 30%. Higher levels are more robust but pack data more densely, so the pattern looks busier. Level M is a good default for on-screen use; choose H if the code will be printed on packaging, laminated, or have a logo placed over the centre.",
  },
  {
    q: "Should I download the PNG or the SVG?",
    a: "Use the PNG for websites, social media posts, presentation slides, and messaging apps — it is a ready-to-use raster image at the exact pixel dimensions you chose. Use the SVG for print and large-format applications such as posters, banners, or business cards: it is a vector file that stays perfectly crisp at any size, from a sticker to a billboard, with no pixelation.",
  },
  {
    q: "Do these QR codes expire or stop working?",
    a: "No. These are static QR codes, meaning the link or text is encoded directly into the pattern of black and white modules. There is no tracking redirect service and no account involved, so the code will keep working indefinitely — but it also cannot be edited later. Double-check the URL before you print it, because changing the destination afterwards requires generating a new code.",
  },
  {
    q: "What can I put in a QR code?",
    a: "Almost anything short enough to fit: a website URL, plain text, an email address, a phone number, an SMS message, Wi-Fi login credentials, or a vCard contact. Very long content reduces the code's reliability when scanned, so keep the input concise. For lengthy URLs, run them through a URL shortener first to produce a cleaner, less dense code that scans faster and from greater distances.",
  },
  {
    q: "Why won't my custom colours scan?",
    a: "QR scanners rely on strong contrast between the dark pattern modules and the light background. Keep the foreground noticeably darker than the background, never invert them (a light pattern on a dark background often fails entirely), and leave the quiet-zone margin around the code untouched. If a code refuses to scan, revert to classic black on white and test again before printing.",
  },
  {
    q: "What is the quiet zone and why does it matter?",
    a: "The quiet zone is the blank margin that surrounds a QR code on all four sides. Scanners use this empty border to distinguish the code from surrounding text, graphics, or other visual elements. Without an adequate quiet zone — typically at least four modules wide — a scanner may fail to locate the code at all. The PNG and SVG exports from this tool include the quiet zone automatically.",
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
        name: "QR Code Generator",
        item: `${site.url}/tools/qr-code-generator`,
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
        title="QR Code Generator"
        description="Turn any website link or piece of text into a custom QR code in seconds. Choose your preferred size and colours, set the error-correction level, and download a crisp PNG for screens or a vector SVG for print — everything happens in your browser with nothing uploaded."
        howToUse={[
          {
            step: "Enter your link or text",
            detail: "Paste a URL into the input field, or type any short piece of text you want the QR code to contain. This could be a website address, a Wi-Fi network password, a phone number, or even a plain-text message. For long URLs, consider using a link shortener first — shorter input produces a less dense QR code that scans faster and more reliably from a distance or in low light.",
          },
          {
            step: "Adjust the size and colours",
            detail: "Use the size slider to set the pixel dimensions of your exported code. Larger sizes work better for print; smaller sizes are fine for on-screen use. If you want a branded look, pick custom foreground and background colours instead of the default black and white. Keep the foreground dark and the background light — strong contrast between the two is essential for reliable scanning.",
          },
          {
            step: "Choose an error-correction level",
            detail: "Select L, M, Q, or H from the dropdown. Level M is a safe default for most uses: it recovers about 15% of the code if damaged and keeps the pattern relatively clean. Step up to H (30% recovery) if the code will be printed on rough material, exposed to wear, or have a logo placed in the centre. The live preview updates instantly so you can see how each level changes the density of the code.",
          },
          {
            step: "Check the live preview",
            detail: "The preview updates in real time as you change any setting — the text, size, colours, or error correction. This lets you experiment freely without needing to download a file to see the result. Make sure the code looks visually clean and that your chosen colours maintain enough contrast for phone cameras to read the pattern easily.",
          },
          {
            step: "Download as PNG or SVG",
            detail: "Once you are happy with the result, click Download PNG for a raster image ready to drop into a website, social post, or presentation. Choose Download SVG if the code is destined for print — vector graphics stay perfectly sharp at any size, from a small sticker to a large poster. Both formats include the necessary quiet-zone margin around the code for reliable scanning.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are printing marketing materials",
            detail: "Flyers, posters, business cards, product packaging, and event banners all benefit from a QR code that takes someone straight to a website, menu, or sign-up page. Adding a scannable code removes the friction of typing a URL — particularly on mobile, where QR scanning is built into the default camera app on both iOS and Android. Customise the colours to match your brand palette so the code looks like an intentional part of the design rather than an afterthought.",
          },
          {
            scenario: "You are sharing Wi-Fi access with guests",
            detail: "Instead of spelling out a long network password or typing it into each person's phone individually, encode your Wi-Fi credentials into a QR code. Guests scan the code with their phone camera and connect instantly. Print the code and frame it in a guest room, add it to a welcome card, or display it at the counter of a café or co-working space.",
          },
          {
            scenario: "You need a quick digital-to-physical bridge",
            detail: "QR codes shine when you want to connect something physical — a sticker, a label, a slide in a presentation, a printed receipt — to something digital like a survey, a payment page, an app download link, or a calendar event. Instead of asking people to type a URL, you put the destination one scan away. The PNG download is ready to drop into any document or design tool.",
          },
        ]}
        howItWorks="This generator builds QR codes entirely in your browser using a JavaScript QR encoding library. When you enter text or a URL, the library converts it into a two-dimensional matrix of black and white squares called modules, adding position markers in three corners, timing patterns, and the error-correction data you select. The tool renders this matrix onto an HTML canvas element in real time, which is why you see the preview update instantly as you adjust settings. When you click download, the canvas is exported to either a PNG file (a raster image at your chosen pixel size) or an SVG file (a vector graphic that stays sharp at any size). No data ever leaves your browser during this entire process."
        tips={[
          "Test every QR code with at least two different phones before you print or publish it. Different camera apps, lighting conditions, and screen types can affect scannability. Testing catches contrast issues and encoding errors that the preview might not reveal.",
          "Keep your input short. A concise URL or text block produces a less dense QR code with larger, more distinct modules. Dense codes packed with data require the scanner to work harder and are more likely to fail at small sizes or in uneven lighting.",
          "Never invert the colours to a light pattern on a dark background. QR scanners are calibrated to look for dark modules on a light field, and inverted codes fail on most devices. If you need a dark-themed QR code, test it thoroughly on multiple phones before committing.",
          "Leave the quiet zone alone. The blank border around the code is not decorative — it is a functional part of the QR specification that helps scanners isolate the code from surrounding graphics. Trimming the quiet zone is a reliable way to make a code unscannable.",
          "Use SVG for anything that will be printed. Raster formats like PNG have a fixed pixel grid and will look blurry or pixelated when enlarged beyond their native size. SVG files are mathematical descriptions of shapes that scale cleanly to any dimension, making them the right choice for posters, banners, and packaging.",
        ]}
        faqs={faqs}
        relatedTools={[
          { label: "Password Generator", href: "/tools/password-generator" },
          { label: "Invoice Generator", href: "/tools/invoice-generator" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
          { label: "Resume Builder", href: "/resume-builder" },
        ]}
        disclaimerType="general"
      >
        <QrCodeGenerator />
      </ToolPageLayout>
    </>
  );
}
