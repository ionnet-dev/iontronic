import { isThemedValue, walkTokens, type Tokens } from "../../src/tokens";
import { ColorX } from "./colors";
import type { OutputFile, TokenTarget } from "./types";

const HEADER = "Generated from src/tokens by scripts/build-tokens.ts. Do not edit.";

interface Entry {
  path: readonly string[];
  light: string;
  dark: string;
}

const pascal = (path: readonly string[]) => path.map((part) => part[0]!.toUpperCase() + part.slice(1)).join("");
const snake = (path: readonly string[]) => ["io", ...path].map((part) => part.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`)).join("_");

function collect(tokens: Tokens): Entry[] {
  const entries: Entry[] = [];
  walkTokens(tokens.color, (path, value) => {
    if (!isThemedValue(value)) throw new Error(`Colour token \`color.${path.join(".")}\` must be { light, dark }. Fix it in src/tokens/color.ts.`);
    entries.push({ path, light: value.light, dark: value.dark });
  });
  return entries;
}

function kotlin(entries: Entry[]): string {
  const block = (name: string, theme: "light" | "dark") => [
    `  object ${name} {`,
    ...entries.map((entry) => `    val ${pascal(entry.path)} = ${ColorX.toKotlin(entry[theme])}`),
    "  }",
  ].join("\n");
  return [
    `// ${HEADER}`,
    "package dev.ionnet.iontronic",
    "",
    "import androidx.compose.ui.graphics.Color",
    "",
    "object IontronicColors {",
    block("Light", "light"),
    "",
    block("Dark", "dark"),
    "}",
    "",
  ].join("\n");
}

function xml(entries: Entry[], theme: "light" | "dark"): string {
  return [
    "<?xml version=\"1.0\" encoding=\"utf-8\"?>",
    `<!-- ${HEADER} -->`,
    "<resources>",
    ...entries.map((entry) => `  <color name="${snake(entry.path)}">${ColorX.toAndroidHex(entry[theme])}</color>`),
    "</resources>",
    "",
  ].join("\n");
}

/**
 * Android colours from `tokens.color` only (gradients via their stop colours).
 * - `android/IontronicColors.kt`: `package dev.ionnet.iontronic`, `import androidx.compose.ui.graphics.Color`,
 *   `object IontronicColors { object Light { val Bg = Color(0xFFF3F1FB) ... } object Dark { ... } }`. Names are the token
 *   path in PascalCase (`TextMuted`, `Priority5`, `Category3`, `SidebarActiveFg`).
 * - `android/colors.xml` (light, for `res/values/`) and `android/colors-night.xml` (dark, for `res/values-night/`):
 *   `<color name="io_text_muted">#FF66608C</color>`, names snake_case with an `io_` prefix, values `#AARRGGBB`.
 */
export const androidTarget: TokenTarget = {
  name: "android",
  build(tokens): OutputFile[] {
    const entries = collect(tokens);
    return [
      { path: "android/IontronicColors.kt", content: kotlin(entries) },
      { path: "android/colors.xml", content: xml(entries, "light") },
      { path: "android/colors-night.xml", content: xml(entries, "dark") },
    ];
  },
};

export default androidTarget;
