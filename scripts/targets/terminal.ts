import type { TokenTarget } from "./types";

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
  build(tokens) {
    // TODO(builder A): implement with ColorX.toAnsi
    void tokens;
    return [];
  },
};

export default terminalTarget;
