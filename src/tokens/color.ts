import type { TokenTree } from "./types";

/**
 * Semantic colour tokens (Twilight). Every leaf is `{ light, dark }` and every value is `#rrggbb` or `#rrggbbaa`,
 * so platform targets (Android, terminals) can convert them without a CSS parser.  
 * Tints of a hue (soft badge backgrounds, icon tiles) are not tokens; component CSS mixes them with `--io-tint-*`.
 */
export const color = {
  //#region Surfaces
  /**
   * Page background behind the `backdrop` gradient. Also the flat fallback for it.
   */
  bg: { light: "#f3f1fb", dark: "#120f26" },
  /**
   * Cards, list panes, inputs and secondary surfaces.
   */
  surface: { light: "#ffffff", dark: "#1c1838" },
  /**
   * Soft fill on a surface: secondary buttons, segmented tracks, chips, search fields.
   */
  surfaceSoft: { light: "#ece8f8", dark: "#27214b" },
  /**
   * Floating layers: menus, popovers, select lists, dialogs.
   */
  surfaceRaised: { light: "#ffffff", dark: "#241f45" },
  /**
   * Inverted surface for toasts and tooltips.
   */
  inverse: { light: "#1d1838", dark: "#efecff" },
  /**
   * Text on `inverse`.
   */
  onInverse: { light: "#f3f1fb", dark: "#120f26" },
  /**
   * Background behind modal content.
   */
  scrim: { light: "#1d183859", dark: "#0503108c" },
  //#endregion

  //#region Backdrop gradient stops (see `gradient.backdrop`)
  backdropStart: { light: "#efecfc", dark: "#120f26" },
  backdropMid: { light: "#eef1fd", dark: "#131330" },
  backdropEnd: { light: "#fbeee7", dark: "#22142a" },
  //#endregion

  //#region Lines
  /**
   * Dividers, input borders and table rules.
   */
  line: { light: "#e0dbf1", dark: "#302a5a" },
  /**
   * Hovered input borders and emphasised dividers.
   */
  lineStrong: { light: "#c9c2e6", dark: "#463e7c" },
  //#endregion

  //#region Text
  /**
   * Primary text.
   */
  text: { light: "#1d1838", dark: "#efecff" },
  /**
   * Secondary text: descriptions, meta, timestamps.
   */
  textMuted: { light: "#66608c", dark: "#a39ecb" },
  /**
   * Placeholders and disabled labels.
   */
  textSubtle: { light: "#948fb5", dark: "#716b9c" },
  //#endregion

  //#region Accent
  /**
   * Flat violet accent: links, ghost buttons, selection, focus. Also the fallback where `gradient.accentFill` can't render.
   */
  accent: { light: "#6a4cff", dark: "#9b83ff" },
  /**
   * Accent on hover or press.
   */
  accentHover: { light: "#5a3bf0", dark: "#ae9bff" },
  /**
   * Selected rows and active tab-bar pills.
   */
  accentSoft: { light: "#e9e3ff", dark: "#2e2560" },
  /**
   * First stop of `gradient.accentFill` (violet).
   */
  accentFillStart: { light: "#7a4dff", dark: "#8a63ff" },
  /**
   * Last stop of `gradient.accentFill` (blue).
   */
  accentFillEnd: { light: "#3f6bff", dark: "#4f7dff" },
  /**
   * Text and icons on `accent` or `gradient.accentFill`.
   */
  onAccent: { light: "#ffffff", dark: "#ffffff" },
  /**
   * Focus ring.
   */
  focus: { light: "#6a4cff", dark: "#9b83ff" },
  //#endregion

  //#region Spark
  /**
   * Orange spark: unread dots, the active nav bar, avatars, the end of the logo gradient.
   */
  spark: { light: "#ff7a2f", dark: "#ff8a45" },
  /**
   * Soft spark background.
   */
  sparkSoft: { light: "#ffe9dc", dark: "#3d2433" },
  //#endregion

  //#region Status
  ok: { light: "#2b9467", dark: "#4fd69c" },
  warn: { light: "#c27400", dark: "#ffb648" },
  bad: { light: "#e0305a", dark: "#ff6b8a" },
  info: { light: "#3f6bff", dark: "#6a9bff" },
  /**
   * Text on any solid status, priority or category fill (danger buttons, hot counts, solid badges).
   */
  onSolid: { light: "#ffffff", dark: "#140f2b" },
  //#endregion

  /**
   * Message priority, 1 (min) to 5 (urgent).
   */
  priority: {
    "1": { light: "#9893b8", dark: "#7a75a3" },
    "2": { light: "#7a76a0", dark: "#9d99c4" },
    "3": { light: "#4a6bff", dark: "#7f97ff" },
    "4": { light: "#f57418", dark: "#ff9548" },
    "5": { light: "#e8335a", dark: "#ff5c80" },
  },

  /**
   * Categorical palette for topics, sources and tags. 1–5 are the Twilight topic colours; 6–8 extend them.
   */
  category: {
    "1": { light: "#ff7a2f", dark: "#ff8a45" }, // Orange (grid)
    "2": { light: "#6a4cff", dark: "#a08bff" }, // Violet (deploy)
    "3": { light: "#eba000", dark: "#ffbf47" }, // Amber (time)
    "4": { light: "#19a39a", dark: "#3cd0c1" }, // Teal (ledger)
    "5": { light: "#3f7bff", dark: "#6a9bff" }, // Blue (backup)
    "6": { light: "#d6409f", dark: "#f27ac4" }, // Magenta
    "7": { light: "#4f9a2e", dark: "#86d65e" }, // Green
    "8": { light: "#0e93c4", dark: "#52c4f0" }, // Sky
  },

  /**
   * The sidebar is deep indigo in both themes, so it has its own set.
   */
  sidebar: {
    bg: { light: "#221b4d", dark: "#0e0b20" },
    fg: { light: "#ffffff", dark: "#efecff" },
    muted: { light: "#aaa3d9", dark: "#8c86b8" },
    hover: { light: "#ffffff12", dark: "#ffffff0a" },
    active: { light: "#ffffff21", dark: "#ffffff14" },
    activeFg: { light: "#ffffff", dark: "#ffffff" },
    line: { light: "#ffffff1f", dark: "#ffffff14" },
  },
} as const satisfies TokenTree;
