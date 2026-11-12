# Iontronic

The Ionnet design system: tokens, framework-agnostic CSS, React components and generated themes for every platform the
suite runs on.

## Features

- **Twilight look**
  - Soft, rounded shapes with pill controls and 20px cards, and more space than a typical admin UI.
  - Violet-to-blue gradient for actions, a deep indigo sidebar, and orange for whatever needs your eye (unread, active).
  - Bricolage Grotesque headings, Figtree body text and DM Mono for data. All are self-hosted, so there are no font CDN calls.
  - Light and dark are equal. Both follow the OS until you pick one, and either can be applied to any subtree.
- **One token source, every platform**
  - CSS variables (`--io-*`) and typed `vars` for TypeScript.
  - Tailwind v4 `@theme` mapping, so Tailwind apps get `bg-surface`, `bg-priority-5` and `rounded-card`.
  - W3C DTCG `tokens.json`, plus per-theme files.
  - Android `IontronicColors.kt` and `iontronic_colors.xml` resources (day and night) for native widgets and
    notifications.
  - Terminal themes for ionterm and kitty, plus `iontronic.sh` with ANSI colour variables for Bash CLIs.
- **About 40 React components on Base UI**
  - Forms: Button, Input, Select, Combobox, Checkbox, Radio, Switch, Slider, SegmentedControl, Field.
  - Overlays: Dialog (a bottom sheet on phones), AlertDialog, Menu, Popover, Tooltip, toasts with `useToast()`.
  - Display: Card, List, Badge (with `priority` 1–5), Chip, Avatar, Meter, Progress, Timeline, Table, Tabs, Accordion,
    CodeBlock, EmptyState.
  - App layout: AppShell, Sidebar, NavItem and TabBar. The layout switches between desktop (sidebar) and phone
    (bottom tab bar) on its own.
- **Framework-agnostic CSS**: every component is plain classes and data attributes, so server-rendered pages and other
  frameworks can use the markup directly.

## Pre-requisites

- Node.js 22+ and npm. npm 12 needs one opt-in for git installs (see below).
- For the React components: React 19, `@base-ui/react` and `lucide-react`. These are optional peer dependencies, so
  token-only and Tailwind-only apps don't need them.

## Installation

Iontronic is installed from GitHub for now, and will move to the npm registry later. npm 12 refuses git dependencies by
default, so allow them for your project's own dependencies first:

```sh
echo "allow-git=root" >> .npmrc
npm install github:ionnet-dev/iontronic#v0.1.0
# React apps also need the peers:
npm install react react-dom @base-ui/react lucide-react
```

npm builds the package on install. A warning that its `prepare` script was blocked is expected: npm already ran the build
while fetching it. When Iontronic moves to the registry, change the version to `^0.1.0`; your imports stay the same.

## Usage

### React

```tsx
import "@ionnet/iontronic/styles.css";
import { IontronicProvider, Button, Badge } from "@ionnet/iontronic/react";
import { RotateCw } from "@ionnet/iontronic/icons";

export default function App() {
  return (
    <IontronicProvider>
      <Badge priority={5} />
      <Button variant="primary" icon={RotateCw}>Restart agent</Button>
    </IontronicProvider>
  );
}
```

`IontronicProvider` sets up the theme (persisted under `io-theme`), toasts and tooltips. Change the theme with
`useTheme()`. To stop a stored dark preference flashing light while the bundle loads, put `getThemeScript()` (from
`@ionnet/iontronic`) in a `<script>` in `<head>`.

### Tailwind v4

```css
@import "@ionnet/iontronic/styles-no-fonts.css";   /* first: it declares the layer order */
@import "tailwindcss";
@import "@ionnet/iontronic/tailwind.css";
```

The utilities follow the `--io-*` variables, so they switch with the theme: `bg-surface text-text-muted rounded-card`.
`dark:` follows Iontronic's theme too, whether the user picked it or the OS did. For tokens only, without the component CSS,
import `@ionnet/iontronic/tokens.css` instead of `styles-no-fonts.css`.

### CSS layers

The component CSS sits in cascade layers, ordered against Tailwind's:

```
theme < base < components < iontronic.base < iontronic.components < utilities
```

Iontronic beats Tailwind's preflight, and Tailwind utilities beat Iontronic: `px-6` on a Button wins. Your own unlayered CSS
beats both. Import Iontronic before `tailwindcss`, or its layers end up after `utilities`. Tokens and fonts are unlayered.

### Without React

```html
<button class="io-button io-focus" data-variant="primary" data-size="md">Restart agent</button>
<span class="io-badge io-hue" data-priority="5">Urgent</span>
```

Theme any subtree with `data-io-theme="light"` or `"dark"`.

### Other platforms

| File | Use |
| --- | --- |
| `@ionnet/iontronic/tokens.json` | W3C design tokens (`tokens.light.json` / `tokens.dark.json` in `platforms/`) |
| `platforms/android/IontronicColors.kt`, `values/iontronic_colors.xml`, `values-night/iontronic_colors.xml` | Pocket's native widgets and notification colours. Copy the `values*` folders into `res/` |
| `platforms/terminal/ionterm.toml`, `kitty.conf` (+ `-light`) | Terminal themes |
| `platforms/terminal/iontronic.sh` | `source` it in Bash CLIs: `printf "${IO_ACCENT}ping${IO_RESET}\n"` |

| Import | Contents |
| --- | --- |
| `@ionnet/iontronic` | `tokens`, `vars`, theme helpers (`applyTheme`, `getThemeScript`), `cx`, `categoryFor`, types |
| `@ionnet/iontronic/react` | Every component, `IontronicProvider`, `useTheme`, `useToast` |
| `@ionnet/iontronic/icons` | Lucide icons |
| `@ionnet/iontronic/styles.css` | Fonts, tokens and all component CSS. `styles-no-fonts.css` leaves out the fonts, and `tokens.css` is the variables only |
| `@ionnet/iontronic/tailwind.css` | Tailwind v4 `@theme` mapping |

## Coming from Neutronic

Iontronic replaces [Neutronic](https://github.com/LucasionGS/neutronic). The structure is the same, with tokens feeding
framework-agnostic CSS and React components on Base UI. The look and the packaging changed:

- **Look:** the cold, dark-first, IBM Plex style is gone. Twilight is softer, warmer and roomier, and light and dark are
  equal.
- **Prefixes:** `nt-` becomes `io-`, `--nt-*` becomes `--io-*`, and `data-nt-theme` becomes `data-io-theme`.
- **Packages:** `@ionnet/neutronic` + `@ionnet/neutronic-react` become one package, `@ionnet/iontronic`, with
  `/react` and `/icons` subpaths.
- **New:** generated files for Tailwind, Android and terminals, priority and category colours, and AppShell, Sidebar,
  TabBar, List, Tile and Timeline for app layouts.
- **Changed props:** Button has no `outline` variant (use `secondary`). Badge and toasts take `tone`
  (`ok`/`warn`/`bad`/`info`) instead of `variant`/`type`.

## Development

```sh
npm install && npm run docs:install
npm run dev          # playground on http://localhost:5299 (?only=<section>&theme=dark for screenshots)
npm run build        # tokens → tsdown → CSS bundle + dist/platforms
```

`STRUCTURE.md` covers the layout, the component contract and where new things go. `CONVENTIONS.md` has the rules.
