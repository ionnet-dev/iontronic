import { GRADIENTS, isThemedValue, isTokenValue, type TokenTree, type TokenValue, type Tokens } from "../../src/tokens";
import type { ResolvedTheme } from "../../src/theme";
import { ColorX } from "./colors";
import type { OutputFile, TokenTarget } from "./types";

const EXTENSION = "dev.ionnet.iontronic";

type Json = string | number | boolean | Json[] | { [key: string]: Json };
type Theme = ResolvedTheme | undefined;

interface Shadow {
  color: string;
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
}

const SHADOW_LAYER = /^\s*(-?[\d.]+)(?:px)?\s+(-?[\d.]+)(?:px)?\s+([\d.]+)(?:px)?(?:\s+(-?[\d.]+)(?:px)?)?\s+rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)\s*$/;

/**
 * Splits `a, b` at top-level commas, ignoring commas inside parentheses and quotes.
 */
function splitTop(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote = "";
  let current = "";
  for (const char of value) {
    if (quote) {
      if (char === quote) quote = "";
    }
    else if (char === "\"" || char === "'") quote = char;
    else if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current.trim());
  return parts;
}

function parseShadow(path: string, value: string): Shadow | Shadow[] {
  const layers = splitTop(value).map((layer) => {
    const match = SHADOW_LAYER.exec(layer);
    if (!match) throw new Error(`Shadow \`${path}\` has a layer "${layer}" that the DTCG target can't parse. Use "<x> <y> <blur> [spread] rgb(r g b / a)" in src/tokens/shape.ts.`);
    const [, x, y, blur, spread, r, g, b, a] = match;
    const hex = `#${[r, g, b].map((channel) => Number(channel).toString(16).padStart(2, "0")).join("")}${Math.round(Number(a) * 255).toString(16).padStart(2, "0")}`;
    return { color: hex, offsetX: `${x}px`, offsetY: `${y}px`, blur: `${blur}px`, spread: `${spread ?? 0}px` };
  });
  return layers.length === 1 ? layers[0]! : layers;
}

function parseEase(path: string, value: string): number[] {
  const match = /^cubic-bezier\(([^)]+)\)$/.exec(value);
  if (!match) throw new Error(`Easing \`${path}\` must be cubic-bezier(a, b, c, d) to export as DTCG.`);
  return match[1]!.split(",").map(Number);
}

function parseFontFamily(value: string): string[] {
  return splitTop(value).map((family) => family.replace(/^["']|["']$/g, ""));
}

function dimension(value: string): string {
  return value === "0" ? "0px" : value;
}

function typeOf(path: readonly string[]): string {
  const [group, sub] = path;
  switch (group) {
    case "color": return "color";
    case "font": return "fontFamily";
    case "weight": return "fontWeight";
    case "leading": case "tint": case "z": return "number";
    case "motion": return sub === "duration" ? "duration" : "cubicBezier";
    case "shadow": return "shadow";
    case "gradient": return "gradient";
    default: return "dimension";
  }
}

function convertValue(path: readonly string[], value: string): Json {
  const name = path.join(".");
  switch (typeOf(path)) {
    case "fontFamily": return parseFontFamily(value);
    case "fontWeight": case "number": return path[0] === "tint" ? Number(value.replace("%", "")) / 100 : Number(value);
    case "cubicBezier": return parseEase(name, value);
    case "shadow": return parseShadow(name, value) as unknown as Json;
    case "dimension": return dimension(value);
    default: return value;
  }
}

function gradientValue(name: keyof typeof GRADIENTS, theme: Theme, tokens: Tokens): Json {
  return GRADIENTS[name].stops.map((stop) => ({
    color: theme ? tokens.color[stop.color][theme] : `{color.${stop.color}}`,
    position: stop.position,
  }));
}

function leaf(path: readonly string[], value: TokenValue, theme: Theme, tokens: Tokens): Json {
  const type = typeOf(path);
  if (type === "gradient") {
    const definition = GRADIENTS[path[1] as keyof typeof GRADIENTS];
    return {
      $type: "gradient",
      $value: gradientValue(path[1] as keyof typeof GRADIENTS, theme, tokens),
      $extensions: { [EXTENSION]: { angle: definition.angle } },
    };
  }
  if (!isThemedValue(value)) return { $type: type, $value: convertValue(path, value) };
  const light = convertValue(path, value.light);
  const dark = convertValue(path, value.dark);
  if (theme) return { $type: type, $value: theme === "light" ? light : dark };
  return { $type: type, $value: light, $extensions: { [EXTENSION]: { modes: { light, dark } } } };
}

function walk(tree: TokenTree, path: readonly string[], theme: Theme, tokens: Tokens): { [key: string]: Json } {
  const result: { [key: string]: Json } = {};
  for (const [key, node] of Object.entries(tree)) {
    const next = [...path, key];
    result[key] = isTokenValue(node) ? leaf(next, node, theme, tokens) : walk(node, next, theme, tokens);
  }
  return result;
}

function serialise(tokens: Tokens, theme: Theme): string {
  const document = {
    $description: `Iontronic design tokens (W3C DTCG)${theme ? `, resolved for the ${theme} theme` : ". Themed tokens carry both values in $extensions"}.`,
    ...walk(tokens, [], theme, tokens),
  };
  return `${JSON.stringify(document, null, 2)}\n`;
}

/**
 * `tokens.json` in W3C Design Tokens (DTCG) format, plus `tokens.light.json` / `tokens.dark.json` with every value resolved
 * for one theme (for tools without mode support).
 *
 * Format of `tokens.json`:
 * - Groups mirror the token tree (`color.textMuted`, `space.16`…). Every leaf has `$type` and `$value`.
 * - `$type` by group: color → `color`; font → `fontFamily`; weight → `fontWeight`; text, space, size, breakpoint, radius,
 *   focus, tracking → `dimension`; leading → `number`; motion.duration → `duration`; motion.ease → `cubicBezier`;
 *   shadow → `shadow`; gradient → `gradient`; tint, z → `number`.
 * - Themed leaves: `$value` is the light value and
 *   `$extensions["dev.ionnet.iontronic"].modes = { light, dark }` holds both.
 * - Gradients come from `GRADIENTS` and reference stops as aliases (`"{color.accentFillStart}"`). Shadows are parsed into
 *   DTCG shadow objects; throw if one can't be parsed.
 */
export const dtcgTarget: TokenTarget = {
  name: "dtcg",
  build(tokens): OutputFile[] {
    return [
      { path: "tokens.json", content: serialise(tokens, undefined) },
      { path: "tokens.light.json", content: serialise(tokens, "light") },
      { path: "tokens.dark.json", content: serialise(tokens, "dark") },
    ];
  },
};

export default dtcgTarget;
