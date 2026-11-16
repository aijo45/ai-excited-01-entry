// ai-excited-01 v3 — "LOOK UP."
// A colossal humpback whale breaching through a city street at dusk,
// water exploding around the breach, moon and dusk sky above, the words
// "LOOK UP." on the image.
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
if (!existsSync(src)) {
  throw new Error(`entry.png missing beside main.ts: ${src}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;
if (dstSize !== srcSize) {
  throw new Error(`copy size mismatch: source ${srcSize} bytes, destination ${dstSize} bytes`);
}
if (dstSize > 1048576) {
  throw new Error(`entry.png too large: ${dstSize} bytes (limit 1048576)`);
}
console.log(`wrote ${dst} (${dstSize} bytes)`);
