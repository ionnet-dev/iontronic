import type { TokenTree } from "./types";

/**
 * Font families. `fonts.css` self-hosts all three through `@fontsource`; `styles-no-fonts.css` leaves loading to you.  
 * Interface text uses `body`. `mono` is for data only: code, counts, timestamps, identifiers and uppercase labels.
 */
export const font = {
  display: "\"Bricolage Grotesque Variable\", \"Bricolage Grotesque\", \"Segoe UI\", system-ui, sans-serif",
  body: "\"Figtree Variable\", Figtree, system-ui, -apple-system, \"Segoe UI\", sans-serif",
  mono: "\"DM Mono\", ui-monospace, \"SF Mono\", Menlo, Consolas, monospace",
} as const satisfies TokenTree;

/**
 * Font sizes. Body text is `base` (15px); controls use `md` (14px).
 */
export const text = {
  "2xs": "0.6875rem", // 11px: uppercase labels, priority badges
  xs: "0.75rem", // 12px: chips, counts, timestamps
  sm: "0.8125rem", // 13px: meta, descriptions, field labels, small controls
  md: "0.875rem", // 14px: buttons, inputs, menus
  base: "0.9375rem", // 15px: body, row titles
  lg: "1.0625rem", // 17px: lead paragraphs
  xl: "1.25rem", // 20px: brand, card display titles
  "2xl": "1.625rem", // 26px: section display
  "3xl": "1.875rem", // 30px: page display
  "4xl": "2.5rem", // 40px: hero display
  "5xl": "3.5rem", // 56px: specimen
} as const satisfies TokenTree;

export const weight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  /**
   * Bricolage Grotesque display weight.
   */
  display: "750",
} as const satisfies TokenTree;

export const leading = {
  none: "1",
  /**
   * Display headings.
   */
  tight: "1.1",
  snug: "1.3",
  /**
   * Body text.
   */
  normal: "1.55",
} as const satisfies TokenTree;

/**
 * Letter spacing.
 */
export const tracking = {
  /**
   * Display headings.
   */
  display: "-0.025em",
  tight: "-0.01em",
  normal: "0",
  /**
   * Uppercase badges (priority).
   */
  caps: "0.05em",
  /**
   * Uppercase mono section labels.
   */
  label: "0.08em",
} as const satisfies TokenTree;
