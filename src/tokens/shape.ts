import { themed, type TokenTree } from "./types";

/**
 * Corner radii. Controls and chips are pills; text fields are rounded rectangles.
 */
export const radius = {
  /**
   * Buttons, segmented controls, switches, search fields.
   */
  control: "9999px",
  /**
   * Chips and badges.
   */
  chip: "9999px",
  /**
   * Text inputs, textareas, selects, comboboxes.
   */
  field: "0.875rem", // 14px
  /**
   * Items inside menus and lists in popups.
   */
  item: "0.75rem", // 12px
  /**
   * List rows and nav items.
   */
  row: "1rem", // 16px
  /**
   * Sidebar, menus, popovers.
   */
  panel: "1rem", // 16px
  /**
   * Quick-action tiles.
   */
  tile: "0.875rem", // 14px
  /**
   * Cards and list/detail panes.
   */
  card: "1.25rem", // 20px
  /**
   * Dialogs and bottom sheets.
   */
  sheet: "1.5rem", // 24px
  /**
   * Small details: `Kbd`, inline code, progress tracks on tables.
   */
  sm: "0.375rem", // 6px
  full: "9999px",
} as const satisfies TokenTree;

/**
 * Elevation.
 */
export const shadow = {
  /**
   * Cards, panes, tiles, toasts.
   */
  card: themed((theme) => theme === "light"
    ? "0 1px 2px rgb(40 30 90 / 0.06), 0 10px 28px rgb(40 30 90 / 0.09)"
    : "0 12px 32px rgb(0 0 0 / 0.4)"),
  /**
   * Floating layers: menus, popovers, dialogs.
   */
  overlay: themed((theme) => theme === "light"
    ? "0 2px 6px rgb(40 30 90 / 0.08), 0 18px 48px rgb(40 30 90 / 0.18)"
    : "0 2px 6px rgb(0 0 0 / 0.35), 0 20px 56px rgb(0 0 0 / 0.55)"),
  /**
   * Raised thumbs and the active segment.
   */
  thumb: themed((theme) => theme === "light"
    ? "0 1px 3px rgb(29 24 56 / 0.14)"
    : "0 1px 3px rgb(0 0 0 / 0.4)"),
} as const satisfies TokenTree;

/**
 * Focus ring geometry. The colour is `color.focus`.
 */
export const focus = {
  width: "2px",
  offset: "2px",
} as const satisfies TokenTree;

/**
 * Mix strengths for tinting a hue onto a surface: `color-mix(in srgb, var(--io-hue) var(--io-tint-soft), transparent)`.
 */
export const tint = {
  /**
   * Badge and soft chip backgrounds.
   */
  soft: "16%",
  /**
   * Icon tile backgrounds.
   */
  icon: "18%",
  /**
   * Urgent card background (priority 5 over `surface`).
   */
  urgent: "9%",
  /**
   * Hover wash on ghost and transparent controls.
   */
  hover: "8%",
} as const satisfies TokenTree;
