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

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = Path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

let count = 0;
const written = new Set<string>();
for (const target of TARGETS) {
  for (const output of target.build(tokens)) {
    const file = Path.join(outDir, output.path);
    writeIfChanged(file, output.content);
    written.add(file);
    count++;
  }
}

// Remove outputs of renamed or deleted targets so they don't linger in dist/platforms.
for (const file of listFiles(outDir)) {
  if (!written.has(file)) fs.rmSync(file);
}
console.log(`[iontronic] ${count} token files generated ${new Date().toLocaleTimeString()}`);
