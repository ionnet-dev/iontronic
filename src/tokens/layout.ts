import type { TokenTree } from "./types";

/**
 * Spacing. Keys are pixels (at a 16px root), values are rem: `space["14"]` is `0.875rem`.  
 * `Stack` and `Grid` take these keys for `gap`.
 */
export const space = {
  "0": "0",
  "2": "0.125rem",
  "4": "0.25rem",
  "6": "0.375rem",
  "8": "0.5rem",
  "10": "0.625rem",
  "12": "0.75rem",
  "14": "0.875rem",
  "16": "1rem",
  "18": "1.125rem",
  "20": "1.25rem",
  "24": "1.5rem",
  "28": "1.75rem",
  "32": "2rem",
  "40": "2.5rem",
  "48": "3rem",
  "64": "4rem",
  "80": "5rem",
} as const satisfies TokenTree;

/**
 * Shared component dimensions. Dimensions used by only one component stay in that component's CSS as `--_` vars.
 */
export const size = {
  /**
   * Control heights (buttons, inputs, selects, segmented controls).
   */
  control: {
    sm: "2rem", // 32px
    md: "2.5rem", // 40px
    lg: "3rem", // 48px
  },
  /**
   * Minimum touch target on phone layouts.
   */
  touch: "2.75rem", // 44px
  /**
   * Icon glyph sizes, as used by `Icon` (`xs`–`xl`).
   */
  icon: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
  },
  /**
   * Tinted circular icon tiles (list rows, card headers, quick tiles, empty states).
   */
  iconTile: {
    sm: "2.25rem", // 36px
    md: "2.5rem", // 40px
    lg: "3.5rem", // 56px
  },
  /**
   * Desktop sidebar width.
   */
  sidebar: "13.5rem", // 216px
} as const satisfies TokenTree;

/**
 * Layout breakpoints (min-widths). CSS can't read custom properties in media queries, so component CSS writes the
 * literal value with a comment; these exist for JS and the Tailwind mapping. Phone layout is below `md`.
 */
export const breakpoint = {
  sm: "40rem", // 640px
  md: "48rem", // 768px
  lg: "64rem", // 1024px
  xl: "80rem", // 1280px
} as const satisfies TokenTree;
