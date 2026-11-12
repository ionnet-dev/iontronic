/**
 * A concrete colour scheme that styles can be resolved against. Light and dark are equal; neither is the default.
 */
export type ResolvedTheme = "light" | "dark";

/**
 * A user-facing theme preference. `"system"` follows `prefers-color-scheme`.
 */
export type ThemeMode = ResolvedTheme | "system";

/**
 * The attribute Iontronic reads to pick a token set. Set it on any element to theme that subtree.  
 * When no ancestor has it, the generated CSS follows `prefers-color-scheme`.
 */
export const THEME_ATTRIBUTE = "data-io-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Returns the OS-preferred theme, or `"light"` outside the browser.
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * Resolves a theme preference to the concrete theme that will render.
 */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

/**
 * Applies a theme preference to an element. `"system"` removes {@link THEME_ATTRIBUTE} so the CSS media query takes over.
 * @param mode The preference to apply.
 * @param target The element to theme. Default is `document.documentElement`.
 * @returns The theme that now renders on `target`.
 */
export function applyTheme(mode: ThemeMode, target?: HTMLElement): ResolvedTheme {
  const element = target ?? document.documentElement;
  if (mode === "system") element.removeAttribute(THEME_ATTRIBUTE);
  else element.setAttribute(THEME_ATTRIBUTE, mode);
  return resolveTheme(mode);
}

/**
 * Subscribes to OS colour-scheme changes.
 * @returns A function that removes the listener.
 */
export function watchSystemTheme(callback: (theme: ResolvedTheme) => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => { };
  const query = window.matchMedia(DARK_QUERY);
  const listener = (event: MediaQueryListEvent) => callback(event.matches ? "dark" : "light");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

/**
 * Returns a tiny inline script that applies the stored theme before the page paints. Put it in a `<script>` tag in
 * `<head>` (e.g. through Vite's `transformIndexHtml`, or pasted into `index.html`) so a stored dark preference doesn't
 * flash light while the JS bundle loads.
 * It reads the same key as `ThemeProvider`, so pass the same `storageKey` if you changed it.
 * @param storageKey The `localStorage` key holding the preference. Default is `"io-theme"`.
 */
export function getThemeScript(storageKey = "io-theme"): string {
  return `(function(){try{var m=localStorage.getItem(${JSON.stringify(storageKey)});`
    + `if(m==="light"||m==="dark")document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)},m)}catch(e){}})();`;
}
