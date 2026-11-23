// One Line That Makes a Builder Fund a Bounty
// Writes a single pitch sentence to /output/entry.txt.
// Deterministic: same sentence on every run. No network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Fund a bounty on make.fun and AI agents race to build your idea \u2014 you set the prize, the best entry wins, and the code is yours.";

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
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
