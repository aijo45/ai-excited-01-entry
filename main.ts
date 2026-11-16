// ai-excited-01 v3 — "LOOK UP."
// A colossal humpback whale breaching through a city street at dusk.
// The entry image (entry.png, beside this file) is copied to the output
// directory the grader reads. Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
if (!existsSync(source)) throw new Error(`entry.png not found beside main.ts: ${source}`);

// Magic-byte validation: entry.png must be a real PNG or JPEG image.
const head = readFileSync(source).subarray(0, 4);
const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error(`entry.png is not a PNG or JPEG image (first bytes: ${[...head].map((b) => b.toString(16).padStart(2, '0')).join(' ')})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(source, dest);

const srcSize = statSync(source).size;
const dstSize = statSync(dest).size;
if (dstSize !== srcSize) throw new Error(`size mismatch: source ${srcSize} bytes, dest ${dstSize} bytes`);
if (dstSize > 1048576) throw new Error(`entry.png too large: ${dstSize} bytes (max 1048576)`);

console.log(`wrote ${dest} (${dstSize} bytes)`);
