import { THEME_ATTRIBUTE } from "../theme";
import { isThemedValue, isTokenValue, type TokenTree, type TokenValue } from "./types";

/**
 * Options for {@link toCss}.
 */
export interface ToCssOptions {
  /**
   * Custom property prefix. Default is `"io"`.
   */
  prefix?: string;
  /**
   * Attribute that selects a theme. Default is {@link THEME_ATTRIBUTE}.
   */
  attribute?: string;
}

const kebab = (segment: string) => segment.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

/**
 * Builds the custom property name for a token path.
 *
 * @example tokenVarName(["color", "textMuted"]) // "--io-color-text-muted"
 */
export function tokenVarName(path: readonly string[], prefix = "io"): string {
  return `--${[prefix, ...path].map(kebab).join("-")}`;
}

/**
 * Visits every leaf in a token tree with its path.
 */
export function walkTokens(
  tree: TokenTree,
  visit: (path: readonly string[], value: TokenValue) => void,
  path: readonly string[] = [],
): void {
  for (const [key, node] of Object.entries(tree)) {
    const next = [...path, key];
    if (isTokenValue(node)) visit(next, node);
    else walkTokens(node, visit, next);
  }
}

/**
 * Serialises a token tree to CSS custom properties.  
 * Static tokens go on `:root`. Themed tokens are emitted four ways so light and dark are equal:
 * light on `:root` and `[data-io-theme="light"]`, dark inside `@media (prefers-color-scheme: dark)` for a root without
 * an explicit theme, and dark on `[data-io-theme="dark"]`. Any element can switch its subtree.
 */
export function toCss(tree: TokenTree, opts?: ToCssOptions): string {
  opts ??= {};
  const prefix = opts.prefix ?? "io";
  const attribute = opts.attribute ?? THEME_ATTRIBUTE;
  const base: string[] = [];
  const light: string[] = [];
  const dark: string[] = [];

  walkTokens(tree, (path, value) => {
    const name = tokenVarName(path, prefix);
    if (isThemedValue(value)) {
      light.push(`  ${name}: ${value.light};`);
      dark.push(`  ${name}: ${value.dark};`);
    }
    else {
      base.push(`  ${name}: ${value};`);
    }
  });

  const block = (selector: string, scheme: string, lines: string[], indent = "") =>
    `${indent}${selector} {\n${indent}  color-scheme: ${scheme};\n${lines.map((line) => indent + line).join("\n")}\n${indent}}`;

  return [
    `:root {\n${base.join("\n")}\n}`,
    block(`:root,\n[${attribute}="light"]`, "light", light),
    `@media (prefers-color-scheme: dark) {\n${block(`:root:not([${attribute}="light"])`, "dark", dark, "  ")}\n}`,
    block(`[${attribute}="dark"]`, "dark", dark),
  ].join("\n\n");
}
