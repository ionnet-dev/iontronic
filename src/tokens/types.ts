import type { ResolvedTheme } from "../theme";

/**
 * A token value that differs between the light and dark themes. Both are required; neither is the default.
 */
export interface ThemedValue {
  readonly light: string;
  readonly dark: string;
}

/**
 * A token leaf: a static CSS value or a per-theme value.
 */
export type TokenValue = string | ThemedValue;

/**
 * A nested group of tokens. Each path through the tree becomes one CSS custom property (`--io-<path>`).
 */
export interface TokenTree {
  readonly [key: string]: TokenValue | TokenTree;
}

/**
 * Returns `true` if `value` is a {@link ThemedValue} leaf rather than a nested group.
 */
export function isThemedValue(value: unknown): value is ThemedValue {
  if (typeof value !== "object" || value === null) return false;
  const keys = Object.keys(value);
  return keys.length === 2
    && typeof (value as ThemedValue).light === "string"
    && typeof (value as ThemedValue).dark === "string";
}

/**
 * Returns `true` if `value` is a leaf token rather than a nested group.
 */
export function isTokenValue(value: unknown): value is TokenValue {
  return typeof value === "string" || isThemedValue(value);
}

/**
 * Builds a {@link ThemedValue} by running `build` once per theme. Used for derived tokens (gradients, shadows) so they
 * stay literal in the generated CSS and theme correctly in any subtree.
 */
export function themed(build: (theme: ResolvedTheme) => string): ThemedValue {
  return { light: build("light"), dark: build("dark") };
}

/**
 * Reads a token leaf for one theme. Static tokens return their value unchanged.
 */
export function resolveToken(value: TokenValue, theme: ResolvedTheme): string {
  return typeof value === "string" ? value : value[theme];
}
