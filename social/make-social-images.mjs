// One-off: generate X/Twitter profile + banner images from the site logo,
// using the real brand palette from app/globals.css.
//   paper #f5f6fb · card #ffffff · ink #0f1424 · ink-soft #3f4661
//   forest #2563eb (the ring) · brass #16a34a (the bars)
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "social";
await mkdir(OUT, { recursive: true });

// The logo mark, scaled to a 0..100 viewBox so it can be placed anywhere.
const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40" fill="none">
  <circle cx="20" cy="20" r="15" fill="none" stroke="#2563eb" stroke-width="4.4" stroke-linecap="round" stroke-dasharray="72 22.2" transform="rotate(-4 20 20)"/>
  <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="#16a34a"/>
  <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="#16a34a"/>
  <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="#16a34a"/>
  <circle cx="25.7" cy="8.6" r="2.7" fill="#16a34a"/>
</svg>`;

// ── Profile picture: 400x400, white so it reads cleanly inside X's circle crop.
await sharp({
  create: {
    width: 400,
    height: 400,
    channels: 4,
    background: "#ffffff",
  },
})
  .composite([{ input: Buffer.from(mark(268)), top: 66, left: 66 }])
  .png()
  .toFile(`${OUT}/x-profile-400.png`);

// ── Banner: 1500x500. X crops the top and bottom on some layouts and overlaps
// the lower-left with the avatar, so everything important stays centre-right
// and vertically centred.
const banner = `
<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="500">
  <rect width="1500" height="500" fill="#f5f6fb"/>
  <rect x="0" y="0" width="1500" height="6" fill="#2563eb"/>
  <text x="470" y="215" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="#0f1424">CoinMind</text>
  <text x="474" y="272" font-family="Helvetica, Arial, sans-serif" font-size="31" fill="#3f4661">46 free calculators. 44 free tools. No sign-up.</text>
  <text x="474" y="322" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#16a34a">Everything runs in your browser — your numbers never leave your device.</text>
  <text x="474" y="378" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="700" fill="#2563eb">coinmind.in</text>
</svg>`;

await sharp(Buffer.from(banner))
  .composite([{ input: Buffer.from(mark(210)), top: 145, left: 215 }])
  .png()
  .toFile(`${OUT}/x-banner-1500x500.png`);

console.log("wrote social/x-profile-400.png and social/x-banner-1500x500.png");
