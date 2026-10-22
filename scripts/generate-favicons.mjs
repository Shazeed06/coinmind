import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// High-fidelity CoinMind brand SVG (48x48 base grid, scalable to 512x512)
// Brand blue background (#2563eb) with rounded squircle corners,
// white circular arc (#ffffff) and bright emerald green growth bars (#4ade80).
// Padded to fit inside circular Google Search favicon masks without clipping.
function getSvgSource(size = 512) {
  const rx = Math.round(size * 0.22); // Modern iOS/Android/Chrome squircle radius
  const strokeW = (size * 0.11).toFixed(1);
  const cx = (size * 0.5).toFixed(1);
  const cy = (size * 0.5).toFixed(1);
  const r = (size * 0.36).toFixed(1);

  // Scaled coordinates
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#2563eb"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff" stroke-width="${strokeW}" stroke-linecap="round" stroke-dasharray="${(size * 1.75).toFixed(1)} ${(size * 0.55).toFixed(1)}" transform="rotate(-4 ${cx} ${cy})"/>
  <rect x="${(size * 0.31).toFixed(1)}" y="${(size * 0.54).toFixed(1)}" width="${(size * 0.09).toFixed(1)}" height="${(size * 0.21).toFixed(1)}" rx="${(size * 0.04).toFixed(1)}" fill="#4ade80"/>
  <rect x="${(size * 0.45).toFixed(1)}" y="${(size * 0.44).toFixed(1)}" width="${(size * 0.09).toFixed(1)}" height="${(size * 0.31).toFixed(1)}" rx="${(size * 0.04).toFixed(1)}" fill="#4ade80"/>
  <rect x="${(size * 0.59).toFixed(1)}" y="${(size * 0.33).toFixed(1)}" width="${(size * 0.09).toFixed(1)}" height="${(size * 0.42).toFixed(1)}" rx="${(size * 0.04).toFixed(1)}" fill="#4ade80"/>
  <circle cx="${(size * 0.635).toFixed(1)}" cy="${(size * 0.21).toFixed(1)}" r="${(size * 0.065).toFixed(1)}" fill="#4ade80"/>
</svg>`;
}

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let currentOffset = headerSize;
  const entries = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    entries.push(entry);
    currentOffset += buf.length;
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  const svg512 = Buffer.from(getSvgSource(512));

  // Write canonical public/icon.svg
  fs.writeFileSync(path.join('public', 'icon.svg'), svg512);
  console.log('Saved public/icon.svg');

  // Generate PNGs at required resolutions
  const p16 = await sharp(svg512).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svg512).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svg512).resize(48, 48).png().toBuffer();
  const p96 = await sharp(svg512).resize(96, 96).png().toBuffer();
  const p180 = await sharp(svg512).resize(180, 180).png().toBuffer();
  const p192 = await sharp(svg512).resize(192, 192).png().toBuffer();
  const p512 = await sharp(svg512).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join('public', 'favicon-48x48.png'), p48);
  console.log('Saved public/favicon-48x48.png');

  fs.writeFileSync(path.join('public', 'favicon-96x96.png'), p96);
  console.log('Saved public/favicon-96x96.png');

  fs.writeFileSync(path.join('public', 'apple-touch-icon.png'), p180);
  console.log('Saved public/apple-touch-icon.png');

  fs.writeFileSync(path.join('public', 'icon-192.png'), p192);
  console.log('Saved public/icon-192.png');

  fs.writeFileSync(path.join('public', 'icon-512.png'), p512);
  console.log('Saved public/icon-512.png');

  // Multi-size ICO: 16x16, 32x32, 48x48
  const icoBuf = createIco([p16, p32, p48], [16, 32, 48]);
  fs.writeFileSync(path.join('public', 'favicon.ico'), icoBuf);
  console.log('Saved public/favicon.ico');

  fs.writeFileSync(path.join('app', 'favicon.ico'), icoBuf);
  console.log('Updated app/favicon.ico');

  // Remove scratch preview files
  ['scratch_preview_white.png', 'scratch_preview_brand.png', 'scratch_preview_trans.png'].forEach(f => {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  });
  console.log('All favicon assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
