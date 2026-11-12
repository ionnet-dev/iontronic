# Conventions

Iontronic keeps Neutronic's architecture (tokens → generated CSS vars; framework-agnostic component CSS driven by
classes and data attributes; React on Base UI that outputs that markup) with a new look: Twilight. Layout and
ownership are in `STRUCTURE.md`.

## Look

- Pill buttons, segmented controls, switches and chips (`radius.control` / `radius.chip`). Text fields 14px, rows 16px,
  cards 20px, dialogs 24px.
- Fonts: Bricolage Grotesque for display (`io-display`, weight 750, tracking -0.025em), Figtree for all interface and
  body text, DM Mono only for data: code, counts, timestamps, identifiers (topics, hosts), and small uppercase labels
  (`io-label`, badges). Buttons, tabs, inputs and headings are never mono.
- Primary actions use `gradient.accentFill` over the flat `color.accent` fallback. Orange `spark` marks unread and
  active things (unread dots, active nav bar, tab-bar badges). The sidebar is deep indigo in both themes.
- Air: body 15px (`text.base`), controls 14px (`text.md`), control heights 32/40/48, touch targets ≥ 44px below `md`.
- No borders on soft surfaces (secondary buttons, segmented tracks, chips, search, sidebar); depth comes from
  `shadow.card` and fills.

## Tokens

- Source in `src/tokens/*.ts`. A leaf is a static string or `{ light, dark }`. Light and dark are equal; there is no
  default theme.
- Every `color` leaf is `#rrggbb` or `#rrggbbaa`, so Android and terminal targets can convert it. Gradients are built
  from colour stops in `GRADIENTS`; derived values use `themed()` so they stay literal in CSS.
- Hue tints are not tokens: mix them in CSS with `color-mix(in srgb, <hue> var(--io-tint-*), transparent)`.
- `npm run tokens` writes `src/generated/` (gitignored). Never edit generated files.

## Styling

- Classes `io-<component>`, parts `io-<component>-<part>`, state and variants as data attributes (`data-variant`,
  `data-size`, `data-active`, and Base UI's `data-checked`, `data-highlighted`…). Private vars `--_name`.
- Theme a subtree with `data-io-theme="light|dark"`; without it the CSS follows `prefers-color-scheme`.
- Hue-driven components add `io-hue` and read `var(--io-hue)`; set it with `data-tone`, `data-category`,
  `data-priority` or an inline `--io-hue`.
- Focus: `io-focus` / `io-focus-within`. Never remove outlines without one of them.
- Component CSS references only `--io-*`, `--_*` and `--io-hue`. Each file starts with its markup contract comment.
- Phone layout is below `48rem` (`breakpoint.md`); write `@media (max-width: 47.99rem)` with that comment.

## React

- Functional components, React 19 (`ref` is a normal prop; no `forwardRef`). `Props` interface directly above the
  component, props destructured with defaults on the first line, named export plus `export default` at the bottom.
- Ergonomic props for common cases (`<Select options label />`), compound namespaces where composition is the point
  (`Dialog.Content`, `Menu.Item`, `Tabs.List`). Link-like components take Base UI's `render` prop for routers.
- Merge classes with `cx`, colour props with `hueAttributes`. Import core by relative path, other groups only through
  their public component.
- JSDoc on every exported symbol (`/** … */`, multi-line). No other comments unless they explain a non-obvious why.

## Code style

2-space indent, semicolons, double quotes, `else` on a new line after `}`, `catch` on the same line, one-line guard
clauses. `node:` imports in scripts. No Prettier, no `deno fmt`, no test framework: verify in the playground.
