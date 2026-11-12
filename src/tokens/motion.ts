import type { TokenTree } from "./types";

export const motion = {
  duration: {
    fast: "120ms",
    normal: "200ms",
    slow: "320ms",
  },
  ease: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    /**
     * Slight overshoot for thumbs and toggles.
     */
    spring: "cubic-bezier(0.34, 1.4, 0.64, 1)",
  },
} as const satisfies TokenTree;

/**
 * Stacking order for layered UI.
 */
export const z = {
  dropdown: "1000",
  sticky: "1100",
  overlay: "1200",
  modal: "1300",
  toast: "1400",
  tooltip: "1500",
} as const satisfies TokenTree;
