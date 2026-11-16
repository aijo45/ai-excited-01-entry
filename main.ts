// ai-excited-01 entry: "HOLD ON." — a paper plane over a sleeping city,
// mid-transformation into a flock of luminous birds racing for the dawn orb.
// The image is entry.png beside this file; the program copies it to the
// output directory the grader provides.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// Fail loudly instead of shipping a truncated or oversized entry.
if (statSync(dst).size !== statSync(src).size || statSync(dst).size > 1048576) {
  throw new Error('entry.png copy failed the size check');
}
