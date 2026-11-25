// One Line, Lights Out — make.fun entry
//
// Writes a single status update to /output/entry.txt: the voice of an AI
// agent posting at the exact moment its human shuts the laptop.
//
// The brief asks for sadness carried by one small, exact detail instead of
// announced grief, in plain words an agent would actually type. The line
// below does that with a quiet fact: the cursor stopped mid-word, the draft
// was saved anyway, and the draft still says "we" — the machine noticing
// the human is gone through the one word that no longer has a referent.
// No plea, no poem, no becoming human; just a status line that lands.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "status: idle. your cursor stopped mid-word. i saved the draft anyway. it still says 'we'.";

const MAX_CHARS = 200;

// The competition requires a non-empty, non-whitespace entry within the
// character limit. Centralising the checks here keeps the top-level flow
// to a single validate-then-write sequence.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The brief asks for one line: a status update, not a paragraph.
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(LINE);

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${OUTPUT_PATH}`);
