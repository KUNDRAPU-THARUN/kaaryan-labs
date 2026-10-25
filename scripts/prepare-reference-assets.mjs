// Extract only the reference's artwork, never its page content or fabricated claims.
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
const reference = process.argv[2];
if (!reference) throw new Error('Pass the absolute reference image path.');
await mkdir('public/images', { recursive: true });
await mkdir('design', { recursive: true });
await copyFile(reference, 'design/website-reference.png');
await sharp(reference).extract({ left: 521, top: 54, width: 601, height: 331 }).webp({ quality: 95 }).toFile('public/images/brand-architecture.webp');
await sharp(reference).extract({ left: 528, top: 488, width: 263, height: 167 }).webp({ quality: 95 }).toFile('public/images/studio-concept.webp');
await sharp(reference).extract({ left: 423, top: 732, width: 131, height: 106 }).webp({ quality: 95 }).toFile('public/images/products-geometry.webp');
await sharp(reference).extract({ left: 898, top: 732, width: 130, height: 106 }).webp({ quality: 95 }).toFile('public/images/solutions-geometry.webp');
// Whitespace-only crops. Artwork, proportions, colors and wording are unchanged.
await sharp('kaaryan-logo-primary.jpeg').extract({ left: 96, top: 347, width: 878, height: 265 }).webp({ quality: 100, lossless: true }).toFile('public/brand/kaaryan-lockup.webp');
await sharp('kaaryan-logo-horizontal.jpeg').extract({ left: 65, top: 283, width: 1140, height: 718 }).webp({ quality: 100, lossless: true }).toFile('public/brand/kaaryan-stacked.webp');
console.log('Reference saved and isolated architecture, studio, and original logo assets prepared.');
