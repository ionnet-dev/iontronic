import type { TokenTarget } from "./types";

/**
 * `tailwind.css`: a Tailwind v4 `@theme inline { ... }` block mapping Tailwind namespaces to the `--io-*` vars, so
 * utilities follow `data-io-theme`. Consumers import it after `tailwindcss` and `@ionnet/iontronic/styles.css`.
 *
 * Mapping (kebab-case token path, `io` prefix dropped):
 * - `--color-<path>: var(--io-color-<path>)` for every colour: `bg-surface`, `text-text-muted`, `bg-priority-5`,
 *   `text-category-3`, `bg-sidebar-bg`.
 * - `--font-display`, `--font-body`, `--font-mono`, and `--font-sans: var(--io-font-body)`.
 * - `--text-<key>` for the font-size scale (overrides Tailwind's sizes on purpose).
 * - `--radius-<key>`, `--shadow-<key>`, `--breakpoint-<key>`, `--ease-<key>`.
 * - Spacing is not mapped: Tailwind's default 4px `--spacing` already matches the scale.
 * - Gradients become utilities: `@utility bg-accent-fill`, `bg-logo-fill`, `bg-backdrop` setting `background-image`.
 */
export const tailwindTarget: TokenTarget = {
  name: "tailwind",
  build(tokens) {
    // TODO(builder A): implement
    void tokens;
    return [];
  },
};

export default tailwindTarget;
