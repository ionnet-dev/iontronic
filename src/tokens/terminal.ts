import type { ResolvedTheme } from "../theme";
import { color } from "./color";

/**
 * A terminal colour scheme. Every value is `#rrggbb`.
 */
export interface TerminalPalette {
  foreground: string;
  background: string;
  cursor: string;
  cursorText: string;
  selectionForeground: string;
  selectionBackground: string;
  url: string;
  tabBar: {
    background: string;
    activeForeground: string;
    activeBackground: string;
    inactiveForeground: string;
    inactiveBackground: string;
  };
  /**
   * The 16 ANSI colours: 0–7 normal (black, red, green, yellow, blue, magenta, cyan, white), 8–15 bright.
   */
  ansi: readonly [
    string, string, string, string, string, string, string, string,
    string, string, string, string, string, string, string, string,
  ];
}

const c = (key: keyof typeof color, theme: ResolvedTheme): string => {
  const value = color[key];
  if (!("light" in value)) throw new Error(`Token \`color.${key}\` is a group, not a colour. Reference a leaf.`);
  return value[theme];
};

/**
 * Builds the terminal palette for a theme. Normal ANSI colours come from tokens; the bright row has extra values that
 * are only used here (lifted in dark, deepened in light so they stay readable on the background).
 */
function palette(theme: ResolvedTheme): TerminalPalette {
  const bright = theme === "dark"
    ? ["#ff8fa6", "#7fe3b8", "#ffcc7a", "#93b6ff", "#bba9ff", "#6fe0d3"]
    : ["#c01f48", "#1f7a53", "#9e5c00", "#2c53e0", "#5232e6", "#0d6f69"];
  return {
    foreground: c("text", theme),
    background: c("bg", theme),
    cursor: c("spark", theme),
    cursorText: c("bg", theme),
    selectionForeground: c("text", theme),
    selectionBackground: c("accentSoft", theme),
    url: c("info", theme),
    tabBar: {
      background: c("bg", theme),
      activeForeground: c("onAccent", theme),
      activeBackground: c("accentFillEnd", theme),
      inactiveForeground: c("textMuted", theme),
      inactiveBackground: c("surfaceSoft", theme),
    },
    ansi: [
      theme === "dark" ? c("surfaceSoft", theme) : c("text", theme), // 0 black
      c("bad", theme), // 1 red
      c("ok", theme), // 2 green
      c("warn", theme), // 3 yellow
      c("info", theme), // 4 blue
      c("accent", theme), // 5 magenta
      theme === "dark" ? color.category["4"].dark : "#138a83", // 6 cyan (teal, deepened in light for contrast)
      c("textMuted", theme), // 7 white
      c("textSubtle", theme), // 8 bright black
      bright[0]!, // 9 bright red
      bright[1]!, // 10 bright green
      bright[2]!, // 11 bright yellow
      bright[3]!, // 12 bright blue
      bright[4]!, // 13 bright magenta
      bright[5]!, // 14 bright cyan
      theme === "dark" ? c("text", theme) : "#3a3360", // 15 bright white
    ],
  };
}

/**
 * Terminal palettes for both themes. Read by the `terminal` platform target (ionterm, kitty, Bash) and usable directly
 * as an xterm.js theme source.
 */
export const terminal: Readonly<Record<ResolvedTheme, TerminalPalette>> = {
  light: palette("light"),
  dark: palette("dark"),
};
