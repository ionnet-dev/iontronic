import { tokenVarName, walkTokens, type TokenTree, type Tokens } from "../../src/tokens";
import type { OutputFile, TokenTarget } from "./types";

const kebab = (segment: string) => segment.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

// Maps every leaf of `tree` (found at `base` in the token tree) to `--<namespace>-<path>: var(--io-<base>-<path>)`.
function declare(lines: string[], namespace: string, base: readonly string[], tree: TokenTree): void {
  walkTokens(tree, (path) => {
    lines.push(`  --${namespace}-${path.map(kebab).join("-")}: var(${tokenVarName([...base, ...path])});`);
  });
}

function build(tokens: Tokens): string {
  const lines: string[] = [];
  const section = (title: string) => lines.push("", `  /* ${title} */`);

  section("Colours: bg-surface, text-text-muted, border-line, bg-priority-5, text-category-3, bg-sidebar-bg");
  declare(lines, "color", ["color"], tokens.color);

  section("Fonts: font-display, font-body, font-mono (font-sans is the body font)");
  declare(lines, "font", ["font"], tokens.font);
  lines.push(`  --font-sans: var(${tokenVarName(["font", "body"])});`);

  section("Font sizes: text-2xs … text-5xl (replaces Tailwind's scale on purpose)");
  declare(lines, "text", ["text"], tokens.text);

  section("Leading and tracking: leading-tight, tracking-display, tracking-label");
  declare(lines, "leading", ["leading"], tokens.leading);
  declare(lines, "tracking", ["tracking"], tokens.tracking);

  section("Radius: rounded-control, rounded-field, rounded-card, rounded-sheet");
  declare(lines, "radius", ["radius"], tokens.radius);

  section("Shadows: shadow-card, shadow-overlay, shadow-thumb");
  declare(lines, "shadow", ["shadow"], tokens.shadow);

  section("Easing: ease-standard, ease-out, ease-in, ease-spring");
  declare(lines, "ease", ["motion", "ease"], tokens.motion.ease);

  section("Breakpoints (literal values: media queries can't read custom properties)");
  walkTokens(tokens.breakpoint, (path, value) => lines.push(`  --breakpoint-${path.join("-")}: ${value as string};`));

  const utilities = Object.keys(tokens.gradient).map((key) => [
    `@utility bg-${kebab(key)} {`,
    `  background-image: var(${tokenVarName(["gradient", key])});`,
    "}",
  ].join("\n"));

  return [
    "/* Generated from src/tokens by scripts/build-tokens.ts. Do not edit.",
    " *",
    " * Tailwind v4 theme for Iontronic. Import it after Tailwind and the Iontronic styles:",
    " *",
    " *   @import \"tailwindcss\";",
    " *   @import \"@ionnet/iontronic/styles.css\";",
    " *   @import \"@ionnet/iontronic/tailwind.css\";",
    " *",
    " * Every value is `inline`, so utilities read the `--io-*` custom properties and follow `data-io-theme`.",
    " *",
    " * Utilities (token path in kebab-case, without `color-`):",
    " *   colours      bg-bg, bg-surface, bg-surface-soft, bg-surface-raised, text-text, text-text-muted, text-text-subtle,",
    " *                bg-accent, bg-accent-soft, text-on-accent, bg-spark, text-ok, text-warn, text-bad, text-info,",
    " *                border-line, bg-priority-1..5, text-category-1..8, bg-sidebar-bg, text-sidebar-muted …",
    " *   gradients    bg-accent-fill, bg-logo-fill, bg-backdrop",
    " *   fonts        font-display, font-body, font-mono",
    " *   radius       rounded-control, rounded-chip, rounded-field, rounded-item, rounded-row, rounded-panel,",
    " *                rounded-tile, rounded-card, rounded-sheet",
    " *   shadows      shadow-card, shadow-overlay, shadow-thumb",
    " * Spacing is not mapped: Tailwind's 4px `--spacing` already matches the Iontronic scale.",
    " */",
    "",
    "@theme inline {",
    ...lines,
    "}",
    "",
    ...utilities.flatMap((block) => [block, ""]),
  ].join("\n");
}

/**
 * `tailwind.css`: a Tailwind v4 `@theme inline { ... }` block mapping Tailwind namespaces to the `--io-*` vars, so
 * utilities follow `data-io-theme`. Consumers import it after `tailwindcss` and `@ionnet/iontronic/styles.css`.
 *
 * Mapping (kebab-case token path, `io` prefix dropped):
 * - `--color-<path>: var(--io-color-<path>)` for every colour: `bg-surface`, `text-text-muted`, `bg-priority-5`,
 *   `text-category-3`, `bg-sidebar-bg`.
 * - `--font-display`, `--font-body`, `--font-mono`, and `--font-sans: var(--io-font-body)`.
 * - `--text-<key>` for the font-size scale (overrides Tailwind's sizes on purpose).
 * - `--radius-<key>`, `--shadow-<key>`, `--breakpoint-<key>`, `--ease-<key>`.
 * - Spacing is not mapped: Tailwind's default 4px `--spacing` already matches the scale.
 * - Gradients become utilities: `@utility bg-accent-fill`, `bg-logo-fill`, `bg-backdrop` setting `background-image`.
 */
export const tailwindTarget: TokenTarget = {
  name: "tailwind",
  build(tokens): OutputFile[] {
    return [{ path: "tailwind.css", content: build(tokens) }];
  },
};

export default tailwindTarget;
