import fs from "node:fs";
import Path from "node:path";
import { GRADIENTS, terminal } from "../src/tokens";
import { color } from "../src/tokens/color";
import ColorMath from "../src/tokens/ColorMath";
import { tint } from "../src/tokens/shape";
import type { ResolvedTheme } from "../src/theme";

/*
 * WCAG contrast check for every colour pairing the component CSS paints, in both themes, computed from src/tokens.
 * Soft tints, `color-mix()` and gradients are simulated the way browsers paint them (sRGB, premultiplied alpha), so a
 * pair here matches what the CSS puts on screen. Prints a table and exits 1 on any failure.
 *
 * Run: npm run contrast  (also part of npm run build)
 */

type Rgba = ColorMath.Rgba;

const TEXT = 4.5; // Normal text
const MARK = 3; // Large text, icons, control boundaries, meaningful marks

interface Check {
  group: string;
  name: string;
  ratio: number;
  min: number;
  /**
   * Why this pair may stay below `min`. Exempt pairs are reported but never fail.
   */
  exempt?: string;
}

const ROOT = Path.resolve(import.meta.dirname, "..");
const css = (file: string) => fs.readFileSync(Path.join(ROOT, "src/styles/components", file), "utf8");

// Example:
// .io-button[data-variant="primary"]:hover:not(...) { background-color: var(--_bg); filter: brightness(0.94); }
const hoverBrightness = (() => {
  const match = /filter:\s*brightness\(([\d.]+)\)/.exec(css("button.css"));
  if (!match) throw new Error("No `filter: brightness()` hover found in button.css. Update scripts/contrast.ts to match the hover style.");
  return parseFloat(match[1]!);
})();

const percent = (value: string) => parseFloat(value) / 100;

function checksFor(theme: ResolvedTheme): Check[] {
  const checks: Check[] = [];
  const hex = (value: { light: string; dark: string }) => ColorMath.parse(value[theme]);
  const c = (key: keyof typeof color) => {
    const value = color[key];
    if (!("light" in value)) throw new Error(`\`color.${key}\` is a group. Reference a leaf.`);
    return hex(value as { light: string; dark: string });
  };
  const worst = (fg: Rgba | Rgba[], bgs: Rgba[]) => Math.min(...[fg].flat().flatMap((f) => bgs.map((bg) => ColorMath.contrast(f, bg))));
  const add = (group: string, name: string, min: number, fg: Rgba | Rgba[], bgs: Rgba[], exempt?: string) => {
    checks.push({ group, name, ratio: worst(fg, bgs), min, exempt });
  };
  const soft = (hue: Rgba, over: Rgba) => ColorMath.tint(hue, percent(tint.soft), over);
  const icon = (hue: Rgba, over: Rgba) => ColorMath.tint(hue, percent(tint.icon), over);
  const gradientSamples = (definition: { stops: readonly { color: string; position: number }[] }) => {
    const stops = definition.stops.map((stop) => c(stop.color as keyof typeof color));
    const samples: Rgba[] = [];
    for (let i = 0; i < stops.length - 1; i++) {
      for (let t = 0; t <= 10; t++) samples.push(ColorMath.mixSrgb(stops[i + 1]!, stops[i]!, t / 10));
    }
    return samples;
  };

  const surface = c("surface");
  const surfaceSoft = c("surfaceSoft");
  const surfaceRaised = c("surfaceRaised");
  const accentSoft = c("accentSoft");
  const bg = c("bg");
  const surfaces = [surface, surfaceSoft, surfaceRaised];

  //#region Text
  add("text", "text on bg, surfaces, accentSoft", TEXT, c("text"), [bg, ...surfaces, accentSoft]);
  add("text", "textMuted on bg, surfaces, accentSoft", TEXT, c("textMuted"), [bg, ...surfaces, accentSoft]);
  add("text", "textSubtle (placeholders, shortcuts, line numbers) on bg, surfaces", TEXT, c("textSubtle"), [bg, ...surfaces]);
  add("text", "onInverse on inverse (toasts, tooltips)", TEXT, c("onInverse"), [c("inverse")]);
  //#endregion

  //#region Accent
  const ghostHover = ColorMath.tint(c("accent"), percent(tint.hover), surface);
  add("accent", "accent text on surfaces, ghost hover", TEXT, c("accent"), [...surfaces, ghostHover]);
  add("accent", "accent text on accentSoft (selected chip, active tab)", TEXT, c("accent"), [accentSoft]);
  add("accent", "onAccent on accentFill (flat primary fallback)", TEXT, c("onAccent"), [c("accentFill")]);
  const fill = gradientSamples(GRADIENTS.accentFill);
  add("accent", "onAccent on gradient.accentFill (primary button)", TEXT, c("onAccent"), fill);
  add("accent", `onAccent on gradient.accentFill, hover brightness(${hoverBrightness})`, TEXT, c("onAccent"), fill.map((f) => ColorMath.brightness(f, hoverBrightness)));
  add("accent", "focus ring on bg and surfaces", MARK, c("focus"), [bg, ...surfaces]);
  add("accent", "checked checkbox/radio fill on surfaces", MARK, c("accentFill"), [surface, surfaceRaised]);
  add("accent", "switch on-track (accent) on surfaces", MARK, c("accent"), [surface, surfaceRaised]);
  //#endregion

  //#region Controls
  add("controls", "controlBorder (input, select, combobox, textarea, checkbox, radio) on bg, surface, surfaceRaised", MARK, c("controlBorder"), [bg, surface, surfaceRaised]);
  add("controls", "switch off-track (controlBorder) on surface, surfaceRaised", MARK, c("controlBorder"), [surface, surfaceRaised]);
  add("controls", "hover border (textMuted) on surface, surfaceRaised", MARK, c("textMuted"), [surface, surfaceRaised]);
  add("controls", "invalid border (bad) on surface, surfaceRaised", MARK, c("bad"), [surface, surfaceRaised]);
  add("controls", "soft input cue: leading icon (textMuted) on surfaceSoft", MARK, c("textMuted"), [surfaceSoft]);
  //#endregion

  //#region Spark
  add("spark", "sparkMark unread dot on surface, accentSoft", MARK, c("sparkMark"), [surface, surfaceRaised, accentSoft]);
  add("spark", "spark active nav bar on sidebar bg", MARK, c("spark"), [hex(color.sidebar.bg)]);
  //#endregion

  //#region Hues
  const hues: [string, Rgba, Rgba, Rgba][] = [
    ["neutral", c("textMuted"), hex(color.hueText.neutral), hex(color.hueOnSolid.neutral)],
    ["accent", c("accent"), hex(color.hueText.accent), hex(color.hueOnSolid.accent)],
    ["spark", c("spark"), hex(color.hueText.spark), hex(color.hueOnSolid.spark)],
    ["ok", c("ok"), hex(color.hueText.ok), hex(color.hueOnSolid.ok)],
    ["warn", c("warn"), hex(color.hueText.warn), hex(color.hueOnSolid.warn)],
    ["bad", c("bad"), hex(color.hueText.bad), hex(color.hueOnSolid.bad)],
    ["info", c("info"), hex(color.hueText.info), hex(color.hueOnSolid.info)],
    ...Object.entries(color.priority).map(([n, v]) => [`priority ${n}`, hex(v), hex(color.hueText.priority[n as keyof typeof color.priority]), hex(color.hueOnSolid.priority[n as keyof typeof color.priority])] as [string, Rgba, Rgba, Rgba]),
    ...Object.entries(color.category).map(([n, v]) => [`category ${n}`, hex(v), hex(color.hueText.category[n as keyof typeof color.category]), hex(color.hueOnSolid.category[n as keyof typeof color.category])] as [string, Rgba, Rgba, Rgba]),
  ];
  const under = [surface, surfaceRaised, surfaceSoft, accentSoft];
  for (const [name, hue, text, onSolid] of hues) {
    add("hue text", `${name}: soft badge / chip text on its tint`, TEXT, text, under.map((u) => soft(hue, u)));
    add("hue text", `${name}: icon tile glyph on its tint`, MARK, text, under.map((u) => icon(hue, u)));
    add("hue text", `${name}: as text on surfaces (field error, menu item, outline badge)`, TEXT, text, under);
    add("hue solid", `${name}: onSolid on solid fill (solid badge, avatar, count)`, TEXT, onSolid, [hue]);
  }
  const bad = c("bad");
  add("hue solid", `bad: danger button text, hover brightness(${hoverBrightness})`, TEXT, hex(color.hueOnSolid.bad), [ColorMath.brightness(bad, hoverBrightness)]);
  //#endregion

  //#region Toasts (status icons on inverse)
  const inverse = c("inverse");
  const onInverse = c("onInverse");
  const inverseShare = percent(tint.inverse[theme]);
  for (const tone of ["neutral", "ok", "warn", "bad", "info"] as const) {
    const hue = tone === "neutral" ? c("textMuted") : c(tone);
    add("toast", `${tone} icon (${tint.inverse[theme]} hue, rest onInverse) on inverse`, MARK, ColorMath.mixSrgb(hue, onInverse, inverseShare), [inverse]);
  }
  //#endregion

  //#region Sidebar
  const sidebarBg = hex(color.sidebar.bg);
  const sidebarHover = ColorMath.over(hex(color.sidebar.hover), sidebarBg);
  const sidebarActive = ColorMath.over(hex(color.sidebar.active), sidebarBg);
  add("sidebar", "fg on sidebar bg, hover, active", TEXT, hex(color.sidebar.fg), [sidebarBg, sidebarHover, sidebarActive]);
  add("sidebar", "muted (counts, section labels) on sidebar bg, hover", TEXT, hex(color.sidebar.muted), [sidebarBg, sidebarHover]);
  add("sidebar", "activeFg on active", TEXT, hex(color.sidebar.activeFg), [sidebarActive]);
  //#endregion

  //#region Terminal
  const palette = terminal[theme];
  const termBg = ColorMath.parse(palette.background);
  add("terminal", "foreground on background", TEXT, ColorMath.parse(palette.foreground), [termBg]);
  palette.ansi.forEach((value, index) => {
    if (index === 0) return;
    add("terminal", `ANSI ${index} on background`, TEXT, ColorMath.parse(value), [termBg]);
  });
  add("terminal", "active tab fg on active tab bg", TEXT, ColorMath.parse(palette.tabBar.activeForeground), [ColorMath.parse(palette.tabBar.activeBackground)]);
  add("terminal", "inactive tab fg on inactive tab bg", TEXT, ColorMath.parse(palette.tabBar.inactiveForeground), [ColorMath.parse(palette.tabBar.inactiveBackground)]);
  //#endregion

  //#region Decorative exemptions
  add("exempt", "line: dividers, table rules, card and list edges", MARK, c("line"), [surface, surfaceRaised], "decorative divider");
  add("exempt", "lineStrong: emphasised dividers", MARK, c("lineStrong"), [surface, surfaceRaised], "decorative divider");
  add("exempt", "sidebar.line", MARK, ColorMath.over(hex(color.sidebar.line), sidebarBg), [sidebarBg], "decorative divider");
  add("exempt", "soft input fill (surfaceSoft) on surface", MARK, surfaceSoft, [surface], "identified by its leading icon and placeholder (checked above)");
  add("exempt", "category / tone dots (chips, topic nav, timeline, meter) on surface", MARK, hues.map(([, hue]) => hue), [surface], "supplementary to the text label beside it");
  add("exempt", "logo glyph (onAccent) on gradient.logoFill", MARK, c("onAccent"), gradientSamples(GRADIENTS.logoFill), "brand mark");
  add("exempt", "ANSI 0 (black) on background", TEXT, ColorMath.parse(palette.ansi[0]), [termBg], "terminal black is a background colour by convention");
  //#endregion

  return checks;
}

const pad = (value: string, width: number) => value.length >= width ? value : value + " ".repeat(width - value.length);
let failures = 0;
for (const theme of ["light", "dark"] as const) {
  console.log(`\n${theme.toUpperCase()}`);
  console.log(`${pad("group", 10)} ${pad("ratio", 7)} ${pad("min", 4)} ${pad("", 6)} pair`);
  for (const check of checksFor(theme)) {
    const ok = check.ratio >= check.min;
    const status = ok ? "ok" : check.exempt ? "exempt" : "FAIL";
    if (!ok && !check.exempt) failures++;
    const note = check.exempt ? ` (${check.exempt})` : "";
    console.log(`${pad(check.group, 10)} ${pad(check.ratio.toFixed(2), 7)} ${pad(String(check.min), 4)} ${pad(status, 6)} ${check.name}${note}`);
  }
}

console.log(failures === 0 ? "\nAll contrast checks pass." : `\n${failures} contrast check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
