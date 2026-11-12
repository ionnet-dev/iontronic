import fs from "node:fs";
import fsp from "node:fs/promises";
import Path from "node:path";
import { fileURLToPath } from "node:url";

const root = Path.resolve(Path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = Path.join(root, "dist");
const IMPORT = /^@import\s+["']([^"']+)["'];\s*$/gm;

interface Bundle {
  external: string[];
  body: string;
}

/**
 * Inlines relative `@import`s recursively. Package imports (such as `@fontsource/...`) stay as `@import` rules and are
 * hoisted to the top, since CSS only allows imports before other rules.
 */
async function bundle(file: string, seen = new Set<string>()): Promise<Bundle> {
  const result: Bundle = { external: [], body: "" };
  if (seen.has(file)) return result;
  seen.add(file);

  const source = await fsp.readFile(file, "utf8");
  let cursor = 0;
  for (const match of source.matchAll(IMPORT)) {
    result.body += source.slice(cursor, match.index);
    cursor = match.index + match[0].length;
    const target = match[1]!;
    if (target.startsWith(".")) {
      const inner = await bundle(Path.resolve(Path.dirname(file), target), seen);
      result.external.push(...inner.external);
      result.body += inner.body;
    }
    else {
      result.external.push(target);
    }
  }
  result.body += source.slice(cursor);
  return result;
}

async function write(entry: string, name: string): Promise<void> {
  const { external, body } = await bundle(Path.join(root, entry));
  const imports = [...new Set(external)].map((target) => `@import "${target}";`).join("\n");
  const css = `${imports}${imports ? "\n\n" : ""}${body.replace(/\n{3,}/g, "\n\n").trim()}\n`;
  await fsp.writeFile(Path.join(outDir, name), css);
}

fs.mkdirSync(outDir, { recursive: true });
await write("src/styles/index.css", "styles.css");
await write("src/styles/no-fonts.css", "styles-no-fonts.css");
await write("src/styles/fonts.css", "fonts.css");
await fsp.cp(Path.join(root, "src/generated"), Path.join(outDir, "platforms"), { recursive: true });
await fsp.copyFile(Path.join(root, "src/generated/tokens.css"), Path.join(outDir, "tokens.css"));
console.log("[iontronic] css and platform files written to dist/");
