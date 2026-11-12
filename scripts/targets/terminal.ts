import { terminal, walkTokens, isThemedValue, type TerminalPalette, type Tokens } from "../../src/tokens";
import type { ResolvedTheme } from "../../src/theme";
import { ColorX } from "./colors";
import type { OutputFile, TokenTarget } from "./types";

function ionterm(palette: TerminalPalette, theme: ResolvedTheme): string {
  const line = (key: string, value: string) => `${key} = "${value}"`;
  return [
    `# ionterm theme (Iontronic Twilight, ${theme}), generated from src/tokens/terminal.ts`,
    line("foreground", palette.foreground),
    line("background", palette.background),
    "background_opacity = 1.0",
    line("cursor", palette.cursor),
    line("cursor_text", palette.cursorText),
    line("selection_foreground", palette.selectionForeground),
    line("selection_background", palette.selectionBackground),
    line("url", palette.url),
    "",
    "[tab_bar]",
    line("background", palette.tabBar.background),
    line("active_foreground", palette.tabBar.activeForeground),
    line("active_background", palette.tabBar.activeBackground),
    line("inactive_foreground", palette.tabBar.inactiveForeground),
    line("inactive_background", palette.tabBar.inactiveBackground),
    "",
    "[palette]",
    "colors = [",
    ...palette.ansi.map((value) => `  "${value}",`),
    "]",
    "",
  ].join("\n");
}

function kitty(palette: TerminalPalette, theme: ResolvedTheme): string {
  return [
    `# Iontronic Twilight (${theme}) colours for kitty, generated from src/tokens/terminal.ts`,
    `foreground           ${palette.foreground}`,
    `background           ${palette.background}`,
    `selection_foreground ${palette.selectionForeground}`,
    `selection_background ${palette.selectionBackground}`,
    `cursor               ${palette.cursor}`,
    `cursor_text_color    ${palette.cursorText}`,
    `url_color            ${palette.url}`,
    "",
    `tab_bar_background      ${palette.tabBar.background}`,
    `active_tab_foreground   ${palette.tabBar.activeForeground}`,
    `active_tab_background   ${palette.tabBar.activeBackground}`,
    `inactive_tab_foreground ${palette.tabBar.inactiveForeground}`,
    `inactive_tab_background ${palette.tabBar.inactiveBackground}`,
    "",
    ...palette.ansi.map((value, index) => `color${index}`.padEnd(8) + ` ${value}`),
    "",
  ].join("\n");
}

interface ShellVar {
  name: string;
  light: string;
  dark: string;
}

const SHELL_COLORS = ["text", "textMuted", "textSubtle", "accent", "spark", "ok", "warn", "bad", "info"] as const;

function shellVars(tree: Tokens): ShellVar[] {
  const vars: ShellVar[] = [];
  const upper = (key: string) => key.replace(/[A-Z]/g, (char) => `_${char}`).toUpperCase();
  for (const key of SHELL_COLORS) {
    const value = tree.color[key];
    vars.push({ name: upper(key), light: value.light, dark: value.dark });
  }
  walkTokens(tree.color, (path, value) => {
    if (path[0] !== "priority" && path[0] !== "category") return;
    if (!isThemedValue(value)) return;
    vars.push({ name: `${path[0]!.toUpperCase()}_${path[1]}`, light: value.light, dark: value.dark });
  });
  return vars;
}

function shell(tree: Tokens): string {
  const vars = shellVars(tree);
  const esc = (hex: string, layer: "fg" | "bg") => `$'\\e[${ColorX.toAnsi(hex, layer)}m'`;
  const assign = (theme: "light" | "dark") => vars.flatMap((entry) => [
    `  IO_${entry.name}=${esc(entry[theme], "fg")}`,
    `  IO_BG_${entry.name}=${esc(entry[theme], "bg")}`,
  ]).join("\n");
  return [
    "# Iontronic Twilight colours for Bash scripts, generated from src/tokens by scripts/build-tokens.ts. Do not edit.",
    "#",
    "# Usage:  source iontronic.sh; printf \"${IO_ACCENT}hello${IO_RESET}\\n\"",
    "# Theme:  $IONTRONIC_THEME (light | dark), else $COLORFGBG (background 0-6 or 8 = dark), else dark.",
    "# Vars:   IO_<NAME> sets the foreground and IO_BG_<NAME> the background, for TEXT, TEXT_MUTED, TEXT_SUBTLE, ACCENT,",
    "#         SPARK, OK, WARN, BAD, INFO, PRIORITY_1..5 and CATEGORY_1..8. Plus IO_RESET, IO_BOLD, IO_DIM and IO_THEME.",
    "",
    "IO_RESET=$'\\e[0m'",
    "IO_BOLD=$'\\e[1m'",
    "IO_DIM=$'\\e[2m'",
    "",
    "IO_THEME=${IONTRONIC_THEME:-}",
    "if [[ \"$IO_THEME\" != light && \"$IO_THEME\" != dark ]]; then",
    "  IO_THEME=dark",
    "  if [[ -n \"${COLORFGBG:-}\" ]]; then",
    "    _io_bg=${COLORFGBG##*;}",
    "    case \"$_io_bg\" in",
    "      [0-6]|8) IO_THEME=dark ;;",
    "      *[0-9]) IO_THEME=light ;;",
    "    esac",
    "    unset _io_bg",
    "  fi",
    "fi",
    "",
    "if [[ \"$IO_THEME\" == light ]]; then",
    assign("light"),
    "else",
    assign("dark"),
    "fi",
    "",
    "export IO_THEME IO_RESET IO_BOLD IO_DIM",
    "",
  ].join("\n");
}

/**
 * Terminal themes from `terminal` in `src/tokens/terminal.ts` (the ANSI mapping lives there, not here).
 * - `terminal/ionterm.toml` (dark) and `terminal/ionterm-light.toml`: same keys as
 *   `~/development/ionix-themes/themes/gi-navia/ionterm/theme.toml` (foreground, background, background_opacity = 1.0,
 *   cursor, cursor_text, selection_*, url, `[tab_bar]`, `[palette] colors = [16]`).
 * - `terminal/kitty.conf` (dark) and `terminal/kitty-light.conf`: colour keys only (foreground, background,
 *   selection_*, cursor, cursor_text_color, url_color, active/inactive_tab_*, color0–color15).
 * - `terminal/iontronic.sh`: sourceable Bash. Picks the palette from `$IONTRONIC_THEME` (`light` | `dark`), else
 *   `$COLORFGBG` (background 0–6 or 8 means dark), else dark. Defines `IO_RESET`, `IO_BOLD`, `IO_DIM` and, for
 *   text, muted, subtle, accent, spark, ok, warn, bad, info, priority 1–5 and category 1–8, a foreground var
 *   (`IO_ACCENT=$'\e[38;2;106;76;255m'`) and a background var (`IO_BG_ACCENT`). Uses no external commands.
 */
export const terminalTarget: TokenTarget = {
  name: "terminal",
  build(tokens): OutputFile[] {
    return [
      { path: "terminal/ionterm.toml", content: ionterm(terminal.dark, "dark") },
      { path: "terminal/ionterm-light.toml", content: ionterm(terminal.light, "light") },
      { path: "terminal/kitty.conf", content: kitty(terminal.dark, "dark") },
      { path: "terminal/kitty-light.conf", content: kitty(terminal.light, "light") },
      { path: "terminal/iontronic.sh", content: shell(tokens) },
    ];
  },
};

export default terminalTarget;
