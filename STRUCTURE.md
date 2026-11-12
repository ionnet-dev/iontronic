# Structure

One npm package, `@ionnet/iontronic`, at the repo root (installable from git; `prepare` builds `dist/`). The docs
playground in `apps/docs` is a separate, non-workspace app. Visual source of truth: the **Twilight** direction in
`reference/design-directions.html` (ignore candy, halo, signal, ember, dusk-only rules).

## Tree

```
package.json              @ionnet/iontronic: exports, peer deps (React, Base UI, Lucide all optional)
tsconfig.json             strict, Bundler resolution; includes src, scripts
tsdown.config.ts          two builds: `.` (neutral) and `./react` + `./icons` (with "use client")
scripts/
  build-tokens.ts         runs every target in TARGETS → src/generated/ (gitignored)
  build-css.ts            bundles styles to dist/*.css, copies src/generated → dist/platforms/
  targets/                one file per platform output (css, dtcg, tailwind, android, terminal) + registry + ColorX
src/
  index.ts                `.` barrel: theme, semantic, tokens, cx (no React)
  theme.ts                THEME_ATTRIBUTE, ThemeMode, applyTheme, watchSystemTheme
  semantic.ts             ControlSize, Tone, StatusTone, Priority, Category, PRIORITY_LABELS, categoryFor()
  cx.ts                   class-name joiner
  tokens/                 token source (the contract): color, gradient, typography, layout, shape, motion, terminal
  generated/              build output (tokens.css, tokens.json, tailwind.css, android/, terminal/). Never edit.
  styles/
    index.css             fonts + no-fonts.css          (frozen)
    no-fonts.css          tokens + base/* + components.css (frozen)
    components.css        @import of every component file (frozen)
    fonts.css             @fontsource imports
    base/                 reset, typography, focus, hue, utilities
    components/<name>.css one file per component; header comment = markup contract
  react/
    index.ts              `./react` barrel (frozen, lists every component)
    icons.ts              `./icons`: Lucide re-export
    theme/                ThemeProvider + useTheme, IontronicProvider (frozen)
    utils/hue.ts          HueProps + hueAttributes()
    components/<Name>/<Name>.tsx
apps/docs/                Vite + React playground; aliases @ionnet/iontronic* to ../../src
  src/App.tsx             theme switch + section list (frozen)
  src/docs/               Section/Example helpers, playground chrome CSS (frozen)
  src/sections/           Core, Forms, Overlays, Display (one per group), PingInbox (built last)
reference/                Twilight design reference HTML
```

## Layering and import rules

```
src/tokens  ──►  scripts/targets  ──►  src/generated  ──►  src/styles (CSS reads --io-* only)
     │
     └──►  src/index.ts (`.`)  ──►  src/react (`./react`)  ──►  apps/docs
```

- `src/tokens`, `src/theme.ts`, `src/semantic.ts`, `src/cx.ts`: no React, no DOM beyond `theme.ts`, no Node.
- `scripts/` may import `src/tokens` and Node built-ins. Nothing in `src/` imports `scripts/`.
- `src/styles/**`: only `var(--io-*)`, the private `--_*` vars and `--io-hue`. No literal colours. Component-unique
  dimensions may be literal rem inside a `--_` var.
- `src/react/**` imports core with relative paths (`../../../cx`, `../../../semantic`, `../../../tokens`), never the
  package name. It never imports CSS.
- A component may import **another group's public component** from its file (`Dialog` → `Button`, `Card` → `IconTile`)
  but never its private helpers, and never restyles another group's classes. Core (`Icon`, `IconTile`, `Stack`, `Grid`,
  `Separator`, `hueAttributes`, `cx`, popup classes) is free for all.
- `apps/docs` imports only `@ionnet/iontronic`, `/react`, `/icons`, `/styles.css`.

## Shared mechanisms (core, frozen)

| Mechanism | Where | Use |
| --- | --- | --- |
| Theme | `data-io-theme="light\|dark"` on any element; absent = `prefers-color-scheme` | `applyTheme()`, `ThemeProvider` (default `"system"`) |
| Focus ring | `.io-focus`, `.io-focus-within` (`base/focus.css`) | add to focusable roots / input boxes |
| Hue trait | `.io-hue` + `data-tone` / `data-category` / `data-priority` / `style="--io-hue"` (`base/hue.css`) | `hueAttributes(HueProps)`; CSS reads `var(--io-hue)` |
| Tints | `color-mix(in srgb, var(--io-hue) var(--io-tint-soft\|icon\|urgent\|hover), transparent)` | soft badges, icon tiles, urgent cards |
| Popup surface | `.io-popup-positioner`, `.io-popup`, `.io-popup-item…` (`components/popup.css`) | Select, Combobox, Menu |
| Keyframes | `io-spin`, `io-pulse` (`base/utilities.css`) | Button spinner, Spinner, indeterminate progress |
| Typography | `io-display[data-size]`, `io-mono`, `io-label`, `io-text-muted`, `io-tnum`, `io-truncate` | headings, data, section labels |
| Backdrop | `io-backdrop` | AppShell root, docs root |

## Tokens (`src/tokens`, prefix `--io-`)

| Group | Keys |
| --- | --- |
| `color` | bg, surface, surfaceSoft, surfaceRaised, inverse, onInverse, scrim, backdropStart/Mid/End, line, lineStrong, text, textMuted, textSubtle, accent, accentHover, accentSoft, accentFillStart/End, onAccent, focus, spark, sparkSoft, ok, warn, bad, info, onSolid, `priority.1–5`, `category.1–8`, `sidebar.{bg,fg,muted,hover,active,activeFg,line}` (all `{light,dark}`, all hex) |
| `gradient` | accentFill, logoFill, backdrop (built from `GRADIENTS` + colour stops) |
| `font` / `text` / `weight` / `leading` / `tracking` | display, body, mono / 2xs 11, xs 12, sm 13, md 14 (controls), base 15 (body), lg 17, xl 20, 2xl 26, 3xl 30, 4xl 40, 5xl 56 / regular…bold, display 750 / none, tight, snug, normal / display, tight, normal, caps, label |
| `space` | keys are px: 0 2 4 6 8 10 12 14 16 18 20 24 28 32 40 48 64 80 |
| `size` | control sm/md/lg 32/40/48, touch 44, icon xs–xl, iconTile sm/md/lg 36/40/56, sidebar 216 |
| `breakpoint` | sm 640, md 768 (phone layout below), lg 1024, xl 1280 |
| `radius` | control, chip (pill), field 14, item 12, row 16, panel 16, tile 14, card 20, sheet 24, sm 6, full |
| `shadow` / `focus` / `tint` | card, overlay, thumb / width, offset / soft 16%, icon 18%, urgent 9%, hover 8% |
| `motion` / `z` | duration fast/normal/slow, ease standard/out/in/spring / dropdown…tooltip |
| `terminal` (not CSS) | `terminal.light`, `terminal.dark`: fg/bg/cursor/selection/url/tab bar + 16 ANSI colours |

`vars.color.textMuted` → `"var(--io-color-text-muted)"`; `vars.space["14"]`; `vars.color.priority["5"]`.

## Component contract

Full markup per component is in the header of `src/styles/components/<file>.css`. React props are the exported
`<Name>Props` in `src/react/components/<Name>/<Name>.tsx`. Every root takes `className`.

### A. Core

| Component | Classes / parts / data | Key React props |
| --- | --- | --- |
| Icon | `io-icon` `data-size` | `icon`, `size` (xs–xl \| px), `label`, `strokeWidth`=2 |
| IconTile | `io-icon-tile io-hue` `data-size` | `icon`, `size` sm\|md\|lg, HueProps |
| Stack | `io-stack` `data-direction/align/justify/wrap/inline`, `--_gap` | `direction`, `gap: SpaceKey`, `align`, `justify`, `wrap`, `inline` |
| Grid | `io-grid` `--_columns/--_template/--_min/--_gap` | `columns` (n \| template), `minChildWidth`, `gap` |
| Separator | `io-separator` `data-orientation/inset` | Base UI props, `inset` |
| Popup (CSS only) | `io-popup-positioner`, `io-popup`, `-item`, `-item-indicator/-icon/-shortcut`, `-label`, `-separator`, `-empty` | n/a |
| ThemeProvider / useTheme / IontronicProvider | sets `data-io-theme` on `<html>` | `defaultMode`="system", `storageKey`="io-theme"; `toast`, `tooltip` |

### B. Actions & forms

| Component | Classes / parts / data | Key React props |
| --- | --- | --- |
| Button | `io-button io-focus` `-label`, `-spinner`; `data-variant/size/icon-only/loading/full-width` | `variant` primary\|secondary\|ghost\|danger (secondary), `size`, `icon`, `iconOnly`, `loading`, `fullWidth` |
| Field | `io-field` `-label`, `-required`, `-description`, `-error`; `data-invalid/disabled` | `label`, `description`, `error`, `required`, `disabled`, `name` (`FieldBaseProps` shared) |
| Input | `io-input io-focus-within` `-control`, `-slot[data-side]`; `data-size/appearance/mono/invalid/disabled` | FieldBaseProps, `size`, `appearance` outline\|soft, `mono`, `leading`, `trailing`, native input props |
| Textarea | `io-textarea io-focus` `data-resize/mono/invalid` | FieldBaseProps, `mono`, `resize` none\|vertical\|auto |
| Select | `io-select io-focus` `-value[data-placeholder]`, `-icon`, `-popup` + popup classes | `options` (+ groups), `value/defaultValue/onValueChange`, `placeholder`, `size`, FieldBaseProps |
| Combobox | `io-input io-combobox` `-input`, `-clear`, `-trigger`, `-popup` + popup classes | `options`, `value…`, `inputValue/onInputValueChange`, `emptyText`, `mono`, `size`, FieldBaseProps |
| Checkbox | `io-check` row + `io-checkbox` `-indicator`; `data-checked/indeterminate` | `checked/defaultChecked/onCheckedChange`, `indeterminate`, `label`, `description`, `placement` |
| RadioGroup / Radio | `io-radio-group[data-orientation]`; `io-check` + `io-radio` `-indicator` | group: `value…`, `orientation`, FieldBaseProps; radio: `value`, `label`, `description` |
| Switch | `io-check` + `io-switch` `-thumb`; `data-checked/size` | `checked…`, `label`, `description`, `placement`, `size` sm\|md |
| Slider | `io-slider` `-header`, `-value`, `-control`, `-track`, `-indicator`, `-thumb` | `value/defaultValue` (number \| number[]), `min/max/step`, `showValue`, `format`, FieldBaseProps |
| SegmentedControl | `io-segmented` `-item[data-pressed]`; `data-size/full-width` | `options`, `value/defaultValue/onValueChange`, `size`, `fullWidth` |
| Check row (CSS) | `io-check` `-text`, `-label`, `-description`; `data-placement/disabled` | used by Checkbox, Radio, Switch |

### C. Overlays & feedback

| Component | Classes / parts / data | Key React props |
| --- | --- | --- |
| Dialog | `io-dialog-backdrop`, `-viewport`, `io-dialog[data-size]` `-header`, `-heading`, `-title`, `-description`, `-close`, `-body`, `-footer`; bottom sheet < md | `Dialog.Root/Trigger/Content/Body/Footer/Close`; Content: `title`, `description`, `size`, `showClose` |
| AlertDialog | same classes + `data-alert` | `AlertDialog.*`; Content `title` required |
| Menu | popup classes + `io-menu`; item `data-tone="bad"` | `Menu.Root/Trigger/Content/Item/CheckboxItem/RadioGroup/RadioItem/Group/Label/Separator`; Item: `icon`, `shortcut`, `tone` |
| Popover | `io-popover` `-arrow`, `-title`, `-description` | `Popover.Root/Trigger/Content/Close`; Content: `title`, `description`, `side`, `align`, `showArrow` |
| Tooltip | `io-tooltip` `-arrow`, `-shortcut` | `content`, `children` (trigger), `shortcut`, `side`, `align`; `TooltipProvider` `delay` |
| Toast | `io-toast-viewport`, `io-toast[data-tone]` `-icon`, `-content`, `-title`, `-description`, `-action`, `-close` | `ToastProvider` `limit`, `timeout`; `useToast()` → `add/close/update/promise`; `ToastOptions.tone` |
| Progress | `io-progress io-hue` `-header`, `-label`, `-value`, `-track`, `-indicator`; `data-size/indeterminate` | `value` (null = indeterminate), `max`, `label`, `showValue`, `format`, `size`, `tone`=accent |
| Meter | `io-meter` `-header`, `-label`, `-value`, `-track`, `-indicator`, `-segment`, `-legend`, `-legend-item`, `-swatch`; `data-segmented` | `value/min/max` or `segments: MeterSegment[]`, `legend`, `label`, `format`, `size`, HueProps |
| Spinner | `io-spinner[data-size]` | `size` (icon scale), `label` |
| Badge | `io-badge io-hue` `data-appearance/size` | HueProps (`priority` → default label), `appearance` soft\|solid\|outline, `size`, `icon` |
| Chip | `io-chip io-hue` `-dot`, `-icon`, `-label`, `-remove`; `data-interactive/selected/removable` | HueProps (adds dot), `onClick` + `selected`, `onRemove`, `removeLabel`, `icon` |
| Avatar | `io-avatar io-hue` `-image`, `-fallback`; `data-size` | `src`, `name`, `alt`, `size`, HueProps (tone=spark) |
| Kbd | `io-kbd[data-size]`, `io-kbd-group` | `keys`, `size` |

### D. Layout, navigation & display

| Component | Classes / parts / data | Key React props |
| --- | --- | --- |
| Card | `io-card` `-header`, `-heading`, `-title`, `-description`, `-actions`, `-body`, `-footer[data-stretch]`; `data-padding/interactive/selected/urgent` | `padding`, `interactive`, `selected`, `urgent`, `render`; `CardHeader` `leading/title/description/actions`; `CardFooter` `stretch` |
| AppShell | `io-app-shell io-backdrop` `-sidebar`, `-main`, `-tab-bar`; `data-has-sidebar/has-tab-bar` | `sidebar`, `tabBar`, children |
| Sidebar / NavSection | `io-sidebar` `-brand`, `-logo`, `-name`, `-nav`, `-footer`; `io-nav-section` `-header`, `-label`, `-action` | `brand`, `logo`, `footer`; NavSection `label`, `action` |
| NavItem | `io-nav-item io-focus` `-icon`, `-dot`, `-label`, `-count[data-hot]`; `data-active/variant` | `icon`, `label`, `count`, `hotCount`, `active`, `variant` default\|topic, `category`, `color`, `render` |
| TabBar / TabBarItem | `io-tab-bar` (`--_count`); `io-tab-bar-item` `-icon`, `-label`, `-badge`; `data-active` | item: `icon`, `label`, `active`, `badge`, `render` |
| Tabs | `io-tabs`, `io-tabs-list[data-variant]`, `-tab`, `-count`, `-indicator`, `-panel` | `Tabs.Root/List/Tab/Panel`; List `variant` line\|pill; Tab `icon`, `count` |
| Accordion | `io-accordion[data-variant]` `-item`, `-header`, `-trigger`, `-icon`, `-panel`, `-content` | `Accordion.Root/Item/Trigger/Panel`; Root `variant` separated\|divided |
| Table family | `io-table-wrap[data-plain]`, `io-table[data-density/interactive]`, `-header`, `-body`, `-row[data-selected]`, `-head`/`-cell[data-align/numeric]` | Table `density`, `interactive`, `plain`; Row `selected`; Head/Cell `align`, `numeric` |
| List / ListGroup / ListItem | `io-list`, `io-list-group` `-label`, `io-list-item` `-leading`, `-main`, `-top`, `-title`, `-badges`, `-description`, `-meta`, `-trailing`, `-time`, `-unread`; `data-selected/unread/interactive/dense` | ListItem: `icon` + HueProps or `leading`, `title`, `badges`, `description`, `meta`, `trailing`, `unread`, `selected`, `interactive`, `render` |
| Tile | `io-tile` `-label`; `data-active` | `icon`, `label`, HueProps, `active`, `render` |
| Timeline | `io-timeline`, `io-timeline-item io-hue` `-dot`, `-content`, `-title`, `-description`, `-time` | TimelineItem `title`, `description`, `time`, HueProps (tone=ok) |
| EmptyState | `io-empty-state[data-size]` `-title`, `-description`, `-actions` | `icon`, `tone`, `title`, `description`, `actions`, `size` |
| CodeBlock | `io-code-block[data-wrap]` `-header`, `-title`, `-language`, `-copy[data-copied]`, `-pre[data-line-numbers]`, `-code`, `-line` | `code`, `language`, `title`, `copyable`, `lineNumbers`, `wrap`, `maxHeight` |

## File ownership

| Group | Owns |
| --- | --- |
| A Core | `src/tokens/*`, `scripts/**`, `src/styles/base/*`, `src/styles/fonts.css`, styles `icon`, `icon-tile`, `layout`, `separator`, `popup`; React `Icon`, `IconTile`, `Stack`, `Grid`, `Separator`, `theme/ThemeProvider.tsx`, `utils/hue.ts`; `apps/docs/src/sections/Core.tsx` |
| B Forms | styles `button`, `field`, `input`, `textarea`, `select`, `combobox`, `check`, `checkbox`, `radio`, `switch`, `slider`, `segmented-control`; React `Button`, `Field`, `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `SegmentedControl`; `sections/Forms.tsx` |
| C Overlays | styles `dialog`, `menu`, `popover`, `tooltip`, `toast`, `progress`, `meter`, `spinner`, `badge`, `chip`, `avatar`, `kbd`; React `Dialog`, `AlertDialog`, `Menu`, `Popover`, `Tooltip`, `Toast`, `Progress`, `Meter`, `Spinner`, `Badge`, `Chip`, `Avatar`, `Kbd`; `sections/Overlays.tsx` |
| D Display | styles `card`, `app-shell`, `sidebar`, `nav-item`, `tab-bar`, `tabs`, `accordion`, `table`, `list`, `tile`, `timeline`, `empty-state`, `code-block`; React `Card`, `AppShell`, `Sidebar`, `NavItem`, `TabBar`, `Tabs`, `Accordion`, `Table`, `List`, `Tile`, `Timeline`, `EmptyState`, `CodeBlock`; `sections/Display.tsx` |
| Main session | `sections/PingInbox.tsx` (built last), everything frozen below |

**Frozen / shared** (main session only): `package.json`, `tsconfig.json`, `tsdown.config.ts`, `.gitignore`,
`src/index.ts`, `src/theme.ts`, `src/semantic.ts`, `src/cx.ts`, `src/tokens/{types,css,vars,index}.ts` (A may add
values to the value files but not change the leaf shape), `src/styles/{index,no-fonts,components}.css`,
`src/styles/base/{focus,hue}.css`, `src/react/index.ts`, `src/react/icons.ts`, `src/react/theme/IontronicProvider.tsx`,
`apps/docs/{package.json,vite.config.ts,tsconfig.json,index.html}`, `apps/docs/src/{main,App}.tsx`, `apps/docs/src/docs/*`.
Exported `Props` interfaces are the contract: builders may add optional props, never rename or remove.

## Where does new X go?

| New… | Do this |
| --- | --- |
| Component | `src/styles/components/<kebab>.css` (contract header first) + `src/react/components/<Name>/<Name>.tsx`; add one line to `styles/components.css` and `react/index.ts`; demo in the owning section |
| Token | add a leaf to the right `src/tokens/<group>.ts` file (colours: `{ light, dark }` hex); run `npm run tokens`; Tailwind/Android/terminal pick it up automatically |
| Platform output | `scripts/targets/<name>.ts` exporting a `TokenTarget`; register in `scripts/targets/index.ts`; add an export path if it needs one |
| Tone / hue-driven variant | extend `Tone` in `semantic.ts` + a rule in `base/hue.css`; components get it for free via `io-hue` |
| Category colour | add `category.9` to `color.ts`, extend `Category`/`CATEGORIES`, add the `hue.css` rule |
| Framework binding (Svelte, plain HTML) | output the same classes/data attributes; no CSS changes |
| Docs demo | the owning `apps/docs/src/sections/<Group>.tsx` |

## Verify

```sh
npm install                     # root; runs prepare → build
npm run typecheck               # tokens + tsc for the package
npm run docs:install            # once
npm run typecheck:docs
npm run build                   # clean → tokens → tsdown → css bundle + dist/platforms
npm pack --dry-run              # only dist/, README.md, package.json
npm run dev                     # token watcher + playground on http://localhost:5299 (run headless; screenshot both themes)
```
