import type { TokenTarget } from "./types";

/**
 * `tokens.json` in W3C Design Tokens (DTCG) format, plus `tokens.light.json` / `tokens.dark.json` with every value resolved
 * for one theme (for tools without mode support).
 *
 * Format of `tokens.json`:
 * - Groups mirror the token tree (`color.textMuted`, `space.16`…). Every leaf has `$type` and `$value`.
 * - `$type` by group: color → `color`; font → `fontFamily`; weight → `fontWeight`; text, space, size, breakpoint, radius,
 *   focus, tracking → `dimension`; leading → `number`; motion.duration → `duration`; motion.ease → `cubicBezier`;
 *   shadow → `shadow`; gradient → `gradient`; tint, z → `number`.
 * - Themed leaves: `$value` is the light value and
 *   `$extensions["dev.ionnet.iontronic"].modes = { light, dark }` holds both.
 * - Gradients come from `GRADIENTS` and reference stops as aliases (`"{color.accentFillStart}"`). Shadows are parsed into
 *   DTCG shadow objects; throw if one can't be parsed.
 */
export const dtcgTarget: TokenTarget = {
  name: "dtcg",
  build(tokens) {
    // TODO(builder A): implement
    void tokens;
    return [];
  },
};

export default dtcgTarget;
