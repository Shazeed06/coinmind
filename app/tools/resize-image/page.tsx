import type { Metadata } from "next";
import ResizeImage from "@/components/tools/ResizeImage";
import { site } from "@/lib/site";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export const metadata: Metadata = {
  title: { absolute: "Resize Image - Free Online Image Resizer (JPG/PNG)" },
  description:
    "Free image resizer: set new width and height in pixels or by percent, lock the aspect ratio, and download as JPG, PNG or WebP. 100% in your browser.",
  alternates: { canonical: "/tools/resize-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/resize-image",
    title: "Resize Image - Free Online Image Resizer (JPG/PNG)",
    description:
      "Change image width and height in pixels or by percentage, lock the aspect ratio, and download. 100% private - nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Resize Image tool",
      },
    ],
  },
};

const howToUse = [
  {
    step: "Add your image",
    detail: "Click the drop zone or browse to select the image you want to resize. The tool supports JPG, PNG, and WebP formats and immediately displays a preview along with the current width and height in pixels.",
  },
  {
    step: "Choose your resizing method",
    detail: "You can resize by typing exact pixel dimensions for width and height, great for hitting a specific target like 1200 px wide for a blog header. Or use the percentage scale field to shrink or enlarge relative to the original size, such as entering 50 to halve the image or 200 to double it.",
  },
  {
    step: "Lock the aspect ratio (recommended)",
    detail: "Keep the Lock aspect ratio toggle turned on to prevent distortion. When locked, changing the width automatically recalculates the height proportionally, and vice versa. Turn it off only if you intentionally want to stretch or squash the image to fit non-proportional dimensions.",
  },
  {
    step: "Pick an output format (optional)",
    detail: "By default, the resized image saves in its original format. You can switch to JPG, PNG, or WebP if you want a different format for the output, useful when shrinking a large PNG photo that you'd rather save as a compact JPG or WebP.",
  },
  {
    step: "Preview and download",
    detail: "The tool shows a live preview of the resized image with the new dimensions displayed below. Once satisfied, click the download button to save the resized image. Your original file remains completely untouched on your device.",
  },
  {
    step: "Repeat or switch images",
    detail: "After downloading, you can adjust the dimensions again for a different size or click the clear button to remove the current image and start over with a new file. There are no limits on how many times you resize.",
  },
];

const whenToUse = [
  {
    scenario: "Resizing photos for a website or blog to exact dimensions",
    detail: "Your blog theme expects header images to be exactly 1200 pixels wide. Use pixel mode to set the width to 1200 with the aspect ratio locked (the height adjusts automatically) and upload a perfectly sized image that won't be stretched or cropped by your CMS.",
  },
  {
    scenario: "Shrinking large photos before email or messaging",
    detail: "A photo fresh from your phone might be 4000 pixels wide and 8 MB, far too large for email or WhatsApp, which will compress it aggressively and ruin the quality anyway. Resize it down to 1200-1600 pixels wide first so the file is manageable and the recipient sees exactly what you intended.",
  },
  {
    scenario: "Creating thumbnails or social media assets at specific sizes",
    detail: "Instagram posts work best at 1080 × 1080 pixels, YouTube thumbnails at 1280 × 720, and Twitter cards at 1200 × 675. Use pixel mode with the aspect ratio unlocked to hit precise non-square dimensions, or crop first to the right ratio and then resize to the exact pixel target.",
  },
];

const howItWorksParagraph =
  "This resizer uses the HTML Canvas API built into every modern browser to change an image's pixel dimensions without any server involvement. When you add an image, the browser decodes the original file into raw pixel data and draws it onto a hidden canvas element. The canvas is then resized to the exact width and height you specified, either in pixels directly or calculated from the percentage scale you entered. The browser's built-in image scaling engine handles the interpolation, using bicubic or bilinear algorithms depending on the platform, to produce smooth results when shrinking and acceptable results when enlarging. Once the canvas is at the target size, the tool exports it as a new image file in the format you chose. Every step happens in memory on your own device: the original image is never uploaded, transmitted, or stored on any server, and your source file on disk is never modified. The tool works offline once the page has loaded.";

const tips = [
  "Always resize down, never up. Making an image larger than its original size stretches existing pixels, which doesn't create new detail. It just makes the blur and blockiness more obvious. Start from the largest original you have and shrink to the desired size.",
  "Keep Lock aspect ratio on unless you have a specific reason to turn it off. An unlocked aspect ratio is the most common source of accidentally distorted images: stretched faces, squashed logos, or warped screenshots that look unprofessional.",
  "Use the percentage scale for quick proportional changes. Entering 50 halves both dimensions, 25 quarters them, and 200 doubles them. It's faster than calculating pixel dimensions and eliminates arithmetic errors, especially with unusual image sizes.",
  "Combine resizing with format selection to kill two birds with one stone. If you have a 4000-pixel-wide PNG photo, resize it to 1200 pixels wide and switch the output to WebP or JPG. You'll get a much smaller file both from the reduced dimensions and the more efficient format.",
  "If you only want a smaller file size without changing the visual dimensions, use the Compress Image tool instead. Compression reduces the file size in bytes by lowering encoding quality, while resizing changes the actual pixel count. They serve different purposes and are often used together.",
];

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. The resizer runs entirely in your browser using the HTML Canvas API. Your image is decoded, rendered at the new size on a hidden canvas, and re-encoded, all on your own device. It is never uploaded, stored, cached on any server, or seen by anyone else. The tool also works offline once the page has loaded, so you can resize images without an active internet connection.",
  },
  {
    q: "How do I keep the image from looking stretched?",
    a: "Turn on the Lock aspect ratio toggle. When it's enabled, changing either the width or height automatically recalculates the other dimension to preserve the original proportions. For example, if your image is 3000 × 2000 pixels (a 3:2 ratio) and you set the width to 1500, the height updates to 1000 automatically. Leave it locked at all times unless you specifically intend to stretch or squash the image to non-proportional dimensions for a creative effect.",
  },
  {
    q: "What does the scale percentage do?",
    a: "The scale field resizes both width and height simultaneously relative to the original dimensions. Enter 50 to make the image exactly half its original size in both directions (one quarter the total pixels), 200 to double it, or any other percentage. When the aspect ratio is locked, which it should be, scale percentage gives you the fastest way to shrink or enlarge proportionally without doing any pixel arithmetic yourself.",
  },
  {
    q: "Will enlarging an image make it sharper?",
    a: "No. Making an image larger than its original pixel dimensions (for example, taking a 500-pixel-wide thumbnail and enlarging it to 2000 pixels) forces the browser to interpolate and invent new pixels that don't exist in the source. The result will look soft, blurry, or blocky because no new detail is being recovered. For the sharpest output, always start from the largest original you have and resize down to the target size.",
  },
  {
    q: "Which output format should I choose?",
    a: "Keep the original format for a like-for-like copy where you only want different dimensions. Choose JPG for photographs where file size matters and transparency isn't needed. It produces compact files universally supported everywhere. Choose PNG when you need transparency, crisp text, or pixel-perfect reproduction of logos and screenshots, but expect larger files. Choose WebP for the best size-to-quality balance on the web, with transparency support and files typically 25-35% smaller than JPG at equivalent quality.",
  },
  {
    q: "Does resizing change the file size?",
    a: "Yes. Reducing pixel dimensions almost always results in a smaller file size in bytes because the image contains fewer pixels to store. However, the amount of reduction depends on the output format: resizing a PNG screenshot from 4000 to 1200 pixels wide will shrink the file dramatically, while resizing an already well-compressed JPG may produce a smaller but proportionally less dramatic reduction. If you need to minimise file size further after resizing, use the Compress Image tool on the resized output.",
  },
  {
    q: "Is there a limit on input image size?",
    a: "There's no fixed limit, but very large images, such as 50-megapixel photos or enormous panoramic stitches, use more browser memory when decoded and rendered on the canvas. Most images from smartphones, DSLRs, and the web (up to around 6000-8000 pixels on the long edge) resize smoothly. If you encounter sluggish performance with an extremely large image, try resizing it in stages or temporarily closing other browser tabs to free memory.",
  },
  {
    q: "Does resizing remove EXIF data such as GPS location?",
    a: "Yes, and that is usually a benefit. The image is redrawn onto a canvas and encoded as a brand-new file, so camera metadata including GPS coordinates, device model, timestamps and copyright fields is not carried over. If you rely on that metadata for cataloguing, keep the original file, because the resized copy will not contain it.",
  },
  {
    q: "Does the resizer work on a phone?",
    a: "Yes. The Canvas API is available in every current mobile browser, so resizing works the same in Chrome, Safari and Firefox on Android and iOS. Tap the drop zone to pick a photo from your camera roll, set the width or scale percentage, and save the result to your downloads. Very large photos simply take a moment longer on a phone.",
  },
];

const relatedTools = [
  { label: "Compress Image", href: "/tools/compress-image" },
  { label: "Crop Image", href: "/tools/crop-image" },
  { label: "Image Converter", href: "/tools/image-converter" },
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
        name: "Resize Image",
        item: `${site.url}/tools/resize-image`,
      },
    ],
  };

  return (
    <ToolPageLayout
      title="Resize Image"
      description="Change an image's width and height in pixels or by percentage. Lock the aspect ratio to avoid distortion, pick a new output format if needed, and download, all in your browser, with nothing uploaded."
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
      <ResizeImage />
    </ToolPageLayout>
  );
}
