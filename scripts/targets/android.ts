import type { TokenTarget } from "./types";

/**
 * Android colours from `tokens.color` only (gradients via their stop colours).
 * - `android/IontronicColors.kt`: `package dev.ionnet.iontronic`, `import androidx.compose.ui.graphics.Color`,
 *   `object IontronicColors { object Light { val Bg = Color(0xFFF3F1FB) ... } object Dark { ... } }`. Names are the token
 *   path in PascalCase (`TextMuted`, `Priority5`, `Category3`, `SidebarActiveFg`).
 * - `android/colors.xml` (light, for `res/values/`) and `android/colors-night.xml` (dark, for `res/values-night/`):
 *   `<color name="io_text_muted">#FF66608C</color>`, names snake_case with an `io_` prefix, values `#AARRGGBB`.
 */
export const androidTarget: TokenTarget = {
  name: "android",
  build(tokens) {
    // TODO(builder A): implement with ColorX.toKotlin / ColorX.toAndroidHex
    void tokens;
    return [];
  },
};

export default androidTarget;
