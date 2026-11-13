import ColorMath from "./ColorMath";
import { tint } from "./shape";
import type { ResolvedTheme } from "../theme";
import type { ThemedValue, TokenTree } from "./types";

/**
 * The literal Twilight palette. Tints of a hue (soft badge backgrounds, icon tiles) are not tokens; component CSS mixes
 * them with `--io-tint-*`.
 */
const palette = {
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
   * Emphasised dividers.
   */
  lineStrong: { light: "#c9c2e6", dark: "#463e7c" },
  /**
   * Boundaries of form controls (inputs, selects, checkboxes, radios) and the off switch track. At least 3:1 against
   * `surface` and `surfaceRaised`, unlike the decorative `line`.
   */
  controlBorder: { light: "#8b86aa", dark: "#6d699e" },
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
  textSubtle: { light: "#696589", dark: "#8f8ab4" },
  //#endregion

  //#region Accent
  /**
   * Flat violet accent: links, ghost buttons, selection, focus. Also the fallback where `gradient.accentFill` can't render.
   */
  accent: { light: "#6346ee", dark: "#9b83ff" },
  /**
   * Accent on hover or press.
   */
  accentHover: { light: "#5436e0", dark: "#ae9bff" },
  /**
   * Selected rows and active tab-bar pills.
   */
  accentSoft: { light: "#e9e3ff", dark: "#2e2560" },
  /**
   * First stop of `gradient.accentFill` (violet).
   */
  accentFillStart: { light: "#7a4dff", dark: "#7f5beb" },
  /**
   * Last stop of `gradient.accentFill` (blue).
   */
  accentFillEnd: { light: "#3e69fa", dark: "#456ee3" },
  /**
   * Flat fill for primary actions and checked controls, behind `gradient.accentFill` or where it can't render. Unlike
   * `accent`, which stays light in dark mode for links, `onAccent` text reaches 4.5:1 on it in both themes.
   */
  accentFill: { light: "#6a4cff", dark: "#7a5aee" },
  /**
   * Text and icons on `accentFill` or `gradient.accentFill`.
   */
  onAccent: { light: "#ffffff", dark: "#ffffff" },
  /**
   * Focus ring.
   */
  focus: { light: "#6346ee", dark: "#9b83ff" },
  //#endregion

  //#region Spark
  /**
   * Orange spark: unread dots, the active nav bar, avatars, the end of the logo gradient.
   */
  spark: { light: "#ff7a2f", dark: "#ff8a45" },
  /**
   * Spark for small marks that must stand out on their own (unread dots): at least 3:1 on `surface` and `accentSoft`.
   */
  sparkMark: { light: "#e2560e", dark: "#ff8a45" },
  /**
   * Soft spark background.
   */
  sparkSoft: { light: "#ffe9dc", dark: "#3d2433" },
  //#endregion

  //#region Status
  ok: { light: "#2b9467", dark: "#4fd69c" },
  warn: { light: "#c27400", dark: "#ffb648" },
  bad: { light: "#dc2f58", dark: "#ff6b8a" },
  info: { light: "#3e69fa", dark: "#6a9bff" },
  /**
   * Default text on solid status, priority or category fills. Components read the per-hue `hueOnSolid` instead, which
   * falls back to the other theme's value where this one is too weak on a light or dark hue.
   */
  onSolid: { light: "#ffffff", dark: "#140f2b" },
  //#endregion

  /**
   * Message priority, 1 (min) to 5 (urgent).
   */
  priority: {
    "1": { light: "#9893b8", dark: "#7e79a6" },
    "2": { light: "#757199", dark: "#9d99c4" },
    "3": { light: "#4868f8", dark: "#7f97ff" },
    "4": { light: "#f57418", dark: "#ff9548" },
    "5": { light: "#dc3055", dark: "#ff5c80" },
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
    "6": { light: "#c93c95", dark: "#f27ac4" }, // Magenta
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

//#region Derived hue colours
/**
 * WCAG 2 contrast ratio for normal-size text.
 */
export const TEXT_CONTRAST = 4.5;
/**
 * WCAG 2 contrast ratio for large text and for meaningful non-text marks (icons, control boundaries, unread dots).
 */
export const MARK_CONTRAST = 3;

/**
 * A palette colour that the `io-hue` trait can take.
 */
type HueSource = ThemedValue;

/**
 * Every hue the `io-hue` trait offers, keyed like its `data-*` attribute in `base/hue.css`.
 */
const HUES = {
  neutral: palette.textMuted,
  accent: palette.accent,
  spark: palette.spark,
  ok: palette.ok,
  warn: palette.warn,
  bad: palette.bad,
  info: palette.info,
  priority: palette.priority,
  category: palette.category,
} as const;

type HueSet<T> = {
  readonly [K in keyof typeof HUES]: typeof HUES[K] extends HueSource ? T : { readonly [N in keyof typeof HUES[K]]: T };
};

/**
 * Builds one derived value per hue, keeping the shape of {@link HUES}.
 */
function perHue(build: (hue: HueSource) => ThemedValue): HueSet<ThemedValue> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(HUES)) {
    if ("light" in value) result[key] = build(value as HueSource);
    else result[key] = Object.fromEntries(Object.entries(value).map(([n, hue]) => [n, build(hue as HueSource)]));
  }
  return result as HueSet<ThemedValue>;
}

const themes: readonly ResolvedTheme[] = ["light", "dark"];
const perTheme = (build: (theme: ResolvedTheme) => string): ThemedValue => ({ light: build("light"), dark: build("dark") });
const rgb = (value: ThemedValue, theme: ResolvedTheme) => ColorMath.parse(value[theme]);
const percent = (value: string) => parseFloat(value) / 100;

/**
 * Surfaces a hue's text can sit on: the plain surfaces, a selected row (`accentSoft`), and the hue's own soft tint over
 * each. Icon tiles use a slightly stronger tint but only need 3:1, which this always leaves room for.
 */
function hueTextBackgrounds(hue: string, theme: ResolvedTheme): ColorMath.Rgba[] {
  const surfaces = [palette.surface, palette.surfaceRaised, palette.surfaceSoft, palette.accentSoft].map((s) => rgb(s, theme));
  return surfaces.flatMap((surface) => [surface, ColorMath.tint(ColorMath.parse(hue), percent(tint.soft), surface)]);
}

/**
 * The hue with its OKLCH lightness moved toward `text` (darker in light, lighter in dark) just far enough to reach 4.5:1
 * on every background from {@link hueTextBackgrounds}. Hue and chroma are kept, so the text still reads as that hue.
 * Hues that already pass come back unchanged.
 */
function deriveHueText(hue: HueSource): ThemedValue {
  return perTheme((theme) => {
    const base = rgb(hue, theme);
    const backgrounds = hueTextBackgrounds(hue[theme], theme);
    const start = ColorMath.lightness(base);
    const direction = theme === "light" ? -1 : 1;
    for (let step = 0; step <= 200; step++) {
      const target = Math.min(1, Math.max(0, start + direction * step * 0.005));
      const candidate = ColorMath.round(step === 0 ? base : ColorMath.withLightness(base, target));
      const worst = Math.min(...backgrounds.map((bg) => ColorMath.contrast(candidate, bg)));
      if (worst >= TEXT_CONTRAST + 0.05) return ColorMath.toHex(candidate);
    }
    throw new Error(`Hue ${hue[theme]} (${theme}) can't reach ${TEXT_CONTRAST}:1 on its tints. Adjust the surfaces in src/tokens/color.ts.`);
  });
}

/**
 * Text on the hue as a solid fill: the theme's `onSolid` when it reaches 4.5:1, else the other theme's `onSolid` when that
 * is stronger (dark text on light hues in the light theme, white on dark hues in the dark theme).
 */
function deriveHueOnSolid(hue: HueSource): ThemedValue {
  return perTheme((theme) => {
    const fill = rgb(hue, theme);
    const own = palette.onSolid[theme];
    const other = palette.onSolid[themes.find((t) => t !== theme)!];
    const ownRatio = ColorMath.contrast(ColorMath.parse(own), fill);
    if (ownRatio >= TEXT_CONTRAST) return own;
    return ColorMath.contrast(ColorMath.parse(other), fill) > ownRatio ? other : own;
  });
}
//#endregion

/**
 * Semantic colour tokens (Twilight). Every leaf is `{ light, dark }` and every value is `#rrggbb` or `#rrggbbaa`,
 * so platform targets (Android, terminals) can convert them without a CSS parser.  
 * `hueText` and `hueOnSolid` are derived from the palette above, so they follow any change to a hue.
 */
export const color = {
  ...palette,
  /**
   * Each hue as text or an icon on surfaces and on its own soft tint (soft badges, icon tiles, field errors, menu items):
   * the hue darkened (light) or lifted (dark) just enough for 4.5:1. Read through `--io-hue-text` on `io-hue` elements.
   */
  hueText: perHue(deriveHueText),
  /**
   * Text on each hue as a solid fill (solid badges, avatars, danger buttons, hot counts). Read through `--io-hue-on-solid`.
   */
  hueOnSolid: perHue(deriveHueOnSolid),
} as const satisfies TokenTree;
