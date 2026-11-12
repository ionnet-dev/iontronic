import { tokenVarName } from "./css";
import { isTokenValue, type TokenTree, type TokenValue } from "./types";

/**
 * A CSS `var()` reference to an Iontronic custom property.
 */
export type CssVar = `var(--${string})`;

/**
 * Mirrors a token tree, replacing every leaf with its `var()` reference.
 */
export type TokenVars<T> = {
  readonly [K in keyof T]: T[K] extends TokenValue ? CssVar : TokenVars<T[K]>;
};

/**
 * Builds a {@link TokenVars} object for a token tree.
 */
export function createVars<T extends TokenTree>(tree: T, prefix = "io", path: readonly string[] = []): TokenVars<T> {
  const result: Record<string, unknown> = {};
  for (const [key, node] of Object.entries(tree)) {
    const next = [...path, key];
    result[key] = isTokenValue(node) ? `var(${tokenVarName(next, prefix)})` : createVars(node, prefix, next);
  }
  return result as TokenVars<T>;
}
