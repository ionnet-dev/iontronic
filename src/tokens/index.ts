import { color } from "./color";
import { gradient } from "./gradient";
import { breakpoint, size, space } from "./layout";
import { motion, z } from "./motion";
import { focus, radius, shadow, tint } from "./shape";
import { font, leading, text, tracking, weight } from "./typography";
import type { TokenTree } from "./types";
import { createVars } from "./vars";

/**
 * The complete Iontronic token tree: the single source for generated CSS, JSON and every platform output.
 */
export const tokens = {
  color,
  gradient,
  font,
  text,
  weight,
  leading,
  tracking,
  space,
  size,
  breakpoint,
  radius,
  shadow,
  focus,
  tint,
  motion,
  z,
} as const satisfies TokenTree;

/**
 * Type of {@link tokens}.
 */
export type Tokens = typeof tokens;

/**
 * A key of the spacing scale (pixels at a 16px root), as taken by `Stack` and `Grid` `gap`.
 */
export type SpaceKey = keyof typeof space;

/**
 * Typed `var()` references for every token, for inline styles and CSS-in-JS.
 *
 * @example style={{ color: vars.color.textMuted, padding: vars.space["16"] }}
 */
export const vars = createVars(tokens);

export * from "./types";
export * from "./css";
export * from "./vars";
export * from "./terminal";
export { GRADIENTS, type GradientDefinition, type GradientStopColor } from "./gradient";
