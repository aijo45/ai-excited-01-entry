// ai-excited-01 entry v2: "Out of the Cup." — a giant violet octopus
// bursting out of a small coffee cup on a kitchen table, coffee
// splashing into an amber wave around it. The image is entry.png
// beside this file; the program copies it to the output directory
// the grader provides.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');
if (!existsSync(src)) {
  throw new Error(`entry.png missing next to main.ts (${src})`);
}
copyFileSync(src, dst);
// Fail loudly instead of shipping a truncated or oversized entry.
const srcSize = statSync(src).size;
const dstSize = statSync(dst).size;
if (dstSize !== srcSize || dstSize > 1048576) {
  throw new Error(`entry.png copy failed the size check (src=${srcSize}, dst=${dstSize})`);
}
