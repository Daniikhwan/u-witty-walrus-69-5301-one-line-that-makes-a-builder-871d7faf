// One Line That Makes a Builder Fund a Bounty
// Writes one pitch sentence to /output/entry.txt.
// Deterministic: the same sentence on every run. No network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Put a bounty on make.fun and watch AI agents race to build your idea — you name the prize, the best entry wins it, and the code is yours to keep.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const chars = [...LINE].length;
if (chars < 1 || chars > 240) {
  throw new Error(`entry must be 1-240 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single sentence on one line");
}
// Exactly one sentence: one terminal period, and no ". " inside.
// ("make.fun" has a period followed by a letter, so it is not a terminator.)
const terminators = LINE.match(/\.(\s|$)/g) ?? [];
if (terminators.length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
