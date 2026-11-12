import fs from "node:fs";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import { tokens } from "../src/tokens";
import { TARGETS } from "./targets";

// Writes every target's files into src/generated/ (gitignored). build-css.ts copies them to dist/.
const root = Path.resolve(Path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = Path.join(root, "src/generated");

function writeIfChanged(file: string, content: string): void {
  const previous = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : undefined;
  if (previous === content) return;
  fs.mkdirSync(Path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

let count = 0;
for (const target of TARGETS) {
  for (const output of target.build(tokens)) {
    writeIfChanged(Path.join(outDir, output.path), output.content);
    count++;
  }
}
console.log(`[iontronic] ${count} token files generated ${new Date().toLocaleTimeString()}`);
