import { color } from "./color";
import { themed, type TokenTree } from "./types";

/**
 * Colour tokens in `color` that a gradient stop may reference.
 */
export type GradientStopColor = { [K in keyof typeof color]: typeof color[K] extends { light: string } ? K : never }[keyof typeof color];

/**
 * A structured gradient definition. Platform targets read this instead of parsing CSS.
 */
export interface GradientDefinition {
  /**
   * Angle in degrees, as in CSS `linear-gradient()`.
   */
  angle: number;
  /**
   * Stops in order. `position` is 0–1.
   */
  stops: readonly { color: GradientStopColor; position: number }[];
}

/**
 * The source definitions for every gradient token.
 */
export const GRADIENTS = {
  /**
   * Primary action fill (violet to blue).
   */
  accentFill: { angle: 135, stops: [{ color: "accentFillStart", position: 0 }, { color: "accentFillEnd", position: 1 }] },
  /**
   * App logo mark (violet to spark orange).
   */
  logoFill: { angle: 135, stops: [{ color: "accentFillStart", position: 0 }, { color: "spark", position: 1 }] },
  /**
   * Page backdrop (lavender to peach in light, indigo to plum in dark).
   */
  backdrop: { angle: 165, stops: [{ color: "backdropStart", position: 0 }, { color: "backdropMid", position: 0.55 }, { color: "backdropEnd", position: 1 }] },
} as const satisfies Record<string, GradientDefinition>;

const toCssGradient = (definition: GradientDefinition) => themed((theme) => {
  const stops = definition.stops.map((stop) => `${color[stop.color][theme]} ${Math.round(stop.position * 100)}%`);
  return `linear-gradient(${definition.angle}deg, ${stops.join(", ")})`;
});

/**
 * Gradient tokens. Use them only as `background` / `background-image`; pair with the flat fallback colour
 * (`accent` for `accentFill`, `bg` for `backdrop`).
 */
export const gradient = {
  accentFill: toCssGradient(GRADIENTS.accentFill),
  logoFill: toCssGradient(GRADIENTS.logoFill),
  backdrop: toCssGradient(GRADIENTS.backdrop),
} as const satisfies TokenTree;
