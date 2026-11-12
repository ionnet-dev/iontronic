# Iontronic

Design system for Ionnet apps: design tokens, framework-agnostic CSS, React components on Base UI, and generated
themes for Tailwind, Android and terminals. Light and dark are equal and follow the OS unless you pick one.

## Install

```sh
npm install github:ionnet-dev/iontronic#v0.1.0
# React apps also need the optional peers:
npm install react react-dom @base-ui/react lucide-react
```

## Use

```tsx
import "@ionnet/iontronic/styles.css";
import { IontronicProvider, Button } from "@ionnet/iontronic/react";
import { RotateCw } from "@ionnet/iontronic/icons";

<IontronicProvider>
  <Button variant="primary" icon={RotateCw}>Restart agent</Button>
</IontronicProvider>
```

| Import | Contents |
| --- | --- |
| `@ionnet/iontronic` | `tokens`, `vars`, theme helpers (`applyTheme`), `cx`, `categoryFor`, types |
| `@ionnet/iontronic/react` | every component, `IontronicProvider`, `useTheme`, `useToast` |
| `@ionnet/iontronic/icons` | Lucide icons |
| `@ionnet/iontronic/styles.css` | fonts + tokens + all component CSS (`styles-no-fonts.css` without fonts, `tokens.css` variables only) |
| `@ionnet/iontronic/tailwind.css` | Tailwind v4 `@theme` mapping (import after `tailwindcss` and `styles.css`) |
| `@ionnet/iontronic/tokens.json` | W3C design tokens |
| `@ionnet/iontronic/platforms/*` | `android/IontronicColors.kt`, `android/colors.xml`, `android/colors-night.xml`, `terminal/ionterm.toml`, `terminal/kitty.conf`, `terminal/iontronic.sh` and light variants |

Theme a subtree with `data-io-theme="light"` or `"dark"`. Without React, write the markup directly:
`<button class="io-button io-focus" data-variant="primary">`.

## Develop

```sh
npm install && npm run docs:install
npm run dev          # http://localhost:5299
```

See `STRUCTURE.md` for the layout and the component contract, and `CONVENTIONS.md` for the rules.
