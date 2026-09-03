import type { Metadata } from "next";
import ImageConverter from "@/components/tools/ImageConverter";
import { site } from "@/lib/site";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Image Converter - JPG, PNG & WebP Online Free" },
  description:
    "Free online image converter. Convert between JPG, PNG and WebP instantly. 100% private - images are converted in your browser, never uploaded.",
  alternates: { canonical: "/tools/image-converter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/image-converter",
    title: "Image Converter - JPG, PNG & WebP Online Free",
    description:
      "Convert images between JPG, PNG and WebP instantly. 100% private - your images never leave your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image Converter tool",
      },
    ],
  },
};

const howToUse = [
  {
    step: "Add your images",
    detail: "Click the drop zone or browse to select one or more images in JPG, PNG, or WebP format. You can add files in any mix of formats. The converter handles them all together, and you can keep adding more images after the initial batch.",
  },
  {
    step: "Pick your target output format",
    detail: "Use the format selector to choose whether you want every image converted to JPG, PNG, or WebP. The same setting applies to all images in your batch, so pick the format that makes sense for your entire set.",
  },
  {
    step: "Review the conversion preview",
    detail: "Each image shows a thumbnail preview of how it will look in the target format. This is especially useful when converting from PNG to JPG. You can check that any transparency areas were filled with white as expected and the overall appearance is correct.",
  },
  {
    step: "Convert all images",
    detail: "The conversion happens immediately when you select a format. There's no separate convert button. The tool re-encodes each image in memory using your browser's Canvas API, replacing just the file format while keeping the pixel content intact.",
  },
  {
    step: "Download individually or all at once",
    detail: "Each converted image has its own download button for saving one at a time with the original filename but a new extension. Use the Download all button to save every converted image in a single batch download.",
  },
  {
    step: "Clear and start a new batch",
    detail: "Once you've saved your converted images, use the clear button to remove everything and start fresh with a new set of files. Your original images on disk remain untouched throughout.",
  },
];

const whenToUse = [
  {
    scenario: "Preparing images for a website that requires a specific format",
    detail: "Your CMS or website builder may only accept JPG uploads, but your designer sent logo files as PNGs with transparent backgrounds. Convert them to JPG here (the tool fills transparency with white automatically) and upload directly without needing desktop software.",
  },
  {
    scenario: "Converting a batch of screenshots from PNG to WebP for faster page loads",
    detail: "Screenshots saved by your operating system are typically large PNG files. Converting them to WebP can reduce their size by 50-70% with no visible quality loss, making your site dramatically faster for visitors without changing how the images look.",
  },
  {
    scenario: "Fixing format mismatches from different devices and apps",
    detail: "Some platforms produce images in formats that other apps can't open. A design tool may export WebP while your presentation software only reads JPG and PNG. Batch-convert everything to a universally supported format in one go.",
  },
];

const howItWorksParagraph =
  "This converter uses the HTML Canvas API built into every modern browser to re-encode images between formats without any server involvement. When you add an image, the browser decodes it into raw pixel data and draws it onto an invisible canvas element at full resolution. The canvas then exports that pixel data in whatever format you chose (JPG, PNG, or WebP) using the browser's native encoding engine. Because the encoding happens at the operating system level through the browser, it's fast, reliable, and respects format-specific features: JPG output strips transparency and replaces it with a white background, PNG output preserves every pixel losslessly, and WebP output balances small file size with quality. All of this runs entirely on your device; your images are never uploaded, stored, or transmitted over the network. The tool works offline as well once the page has loaded, and the original files on your disk are never modified.";

const tips = [
  "When converting PNG to JPG, transparency is filled with solid white. If your design relies on a transparent background, either keep it as PNG or convert to WebP instead. WebP supports transparency and produces much smaller files than PNG.",
  "Batch-convert with a clear purpose. Rather than converting everything to a single format by default, think about where the images will end up: JPG for email and social media, PNG for documents and presentations that need crisp edges, WebP for anything going on a website.",
  "Converting from JPG to PNG won't restore quality. If a JPG was originally compressed at low quality, converting it to PNG preserves that already-degraded state. It doesn't magically recover lost detail. Always work from the highest-quality original you have.",
  "The converter handles mixed-format batches smoothly: you can drop in JPGs, PNGs, and WebPs together and convert all of them to a single target format in one go. This saves time when you have a folder full of mixed image types.",
  "If you're converting for the web, prefer WebP as your target format. All modern browsers support it, and WebP consistently produces files 25-35% smaller than JPG or PNG at equivalent quality, which translates directly to faster page loads for your visitors.",
];

const faqs = [
  {
    q: "Are my images uploaded anywhere?",
    a: "No. The converter runs entirely in your browser using the HTML Canvas API. Your images are decoded and re-encoded locally on your own device. They are never uploaded, stored, cached on any server, or seen by anyone else. The tool continues to work offline once the page has loaded, so you can convert images without an active internet connection.",
  },
  {
    q: "Which formats can I convert between?",
    a: "You can convert freely between JPG (JPEG), PNG, and WebP. Upload any of the three formats as input and export to any of the three as output. The tool handles mixed-format batches. You can add JPGs, PNGs, and WebPs all at once and convert the entire batch to a single target format with one setting.",
  },
  {
    q: "What happens to transparency when I convert to JPG?",
    a: "JPG does not support transparency. It has no alpha channel. When you convert a PNG or WebP with transparent areas to JPG, the tool fills those transparent regions with solid white before export. The rest of the image converts normally. If you need to preserve transparency, choose PNG or WebP as your output format instead. WebP is usually the better choice because it supports transparency and produces much smaller files than PNG.",
  },
  {
    q: "Which format should I choose?",
    a: "Use JPG for photographs and images with smooth colour gradients where small file size matters and transparency isn't needed. It's universally supported and produces compact files. Use PNG for logos, icons, screenshots with text, and any graphic with sharp edges, flat colours, or transparency requirements. PNG is lossless so text stays crisp. Use WebP when you want the best of both worlds: it supports transparency like PNG, produces files 25-35% smaller than JPG at equivalent quality, and is supported by every current browser.",
  },
  {
    q: "Does converting reduce image quality?",
    a: "Converting to PNG is lossless. Every pixel is preserved exactly, so there is zero quality loss regardless of the source format. Converting to JPG or WebP re-encodes the image at high quality (approximately 92% on the quality scale), which is visually near-identical to the original for most images while keeping the output file reasonably small. However, if you convert a JPG to another JPG (changing format for compatibility), you're re-compressing an already-compressed image, which may introduce minor generational loss.",
  },
  {
    q: "Can I convert several images at once?",
    a: "Yes. Drop or select multiple images at the same time, pick your desired output format, and the tool converts every image in the batch simultaneously. Each image gets its own individual download button, and the Download all button lets you save every converted image at once as a batch.",
  },
  {
    q: "Does the converter change image dimensions or file size?",
    a: "The converter keeps the original pixel width and height exactly. It only changes the file format and container. File size will change depending on the formats involved: converting a large PNG photo to JPG or WebP usually shrinks the file dramatically; converting a heavily compressed JPG to PNG may actually increase the file size because PNG stores every pixel losslessly. If you specifically want a smaller file, use the Compress Image tool instead.",
  },
  {
    q: "Can I convert HEIC photos from my iPhone?",
    a: "No. The file picker accepts JPG, PNG and WebP only, because browsers on Windows and Android cannot decode HEIC. The simplest fix is to change your iPhone setting under Camera, then Formats, to Most Compatible so new photos save as JPG, or use the Share sheet, which converts to JPG when you export an existing photo.",
  },
];

const relatedTools = [
  { label: "Compress Image", href: "/tools/compress-image" },
  { label: "Resize Image", href: "/tools/resize-image" },
  { label: "Crop Image", href: "/tools/crop-image" },
  { label: "Image to PDF", href: "/tools/image-to-pdf" },
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
        name: "Image Converter",
        item: `${site.url}/tools/image-converter`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Image Converter"
      description="Convert images between JPG, PNG, and WebP instantly. Batch-convert multiple images to a single format in one click. Everything happens in your browser, with nothing uploaded."
      howToUse={howToUse}
      whenToUse={whenToUse}
      howItWorks={howItWorksParagraph}
      tips={tips}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <ImageConverter />
    </ToolPageLayout>
  );
}
