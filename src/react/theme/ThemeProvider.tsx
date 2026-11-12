import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { applyTheme, resolveTheme, watchSystemTheme, type ResolvedTheme, type ThemeMode } from "../../theme";

/**
 * The value exposed by {@link useTheme}.
 */
export interface ThemeContextValue {
  /**
   * The user's preference, which may be `"system"`.
   */
  mode: ThemeMode;
  /**
   * The theme actually rendering.
   */
  resolved: ResolvedTheme;
  /**
   * Changes the preference and persists it when a `storageKey` is set.
   */
  setMode: (mode: ThemeMode) => void;
  /**
   * Flips between light and dark, leaving `"system"` mode.
   */
  toggle: () => void;
}

/**
 * Props for {@link ThemeProvider}.
 */
export interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Preference used when nothing is stored. Default is `"system"`: light and dark are equal, so the OS decides.
   */
  defaultMode?: ThemeMode;
  /**
   * `localStorage` key that remembers the preference. Pass `null` to disable persistence. Default is `"io-theme"`.
   */
  storageKey?: string | null;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(key: string | null): ThemeMode | null {
  if (!key || typeof localStorage === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    return value === "light" || value === "dark" || value === "system" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Applies the theme preference to `<html>` (`data-io-theme`, or no attribute in `"system"` mode) and provides it to
 * {@link useTheme}. Follows OS changes in `"system"` mode.
 */
export function ThemeProvider(props: ThemeProviderProps) {
  const { children, defaultMode = "system", storageKey = "io-theme" } = props;
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode(storageKey) ?? defaultMode);
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(mode));

  // Layout effect, so a stored preference lands before the first paint instead of fading in through component
  // background transitions. Pair with `getThemeScript()` in <head> to also cover the moment before React loads.
  useLayoutEffect(() => {
    setResolved(applyTheme(mode));
    if (mode !== "system") return;
    return watchSystemTheme(setResolved);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, next);
    } catch { }
  }, [storageKey]);

  const toggle = useCallback(() => setMode(resolved === "dark" ? "light" : "dark"), [resolved, setMode]);
  const value = useMemo(() => ({ mode, resolved, setMode, toggle }), [mode, resolved, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Reads and controls the current theme.
 * @throws If called outside a {@link ThemeProvider}.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider> or <IontronicProvider>. Wrap your app root in one.");
  return context;
}

export default ThemeProvider;
