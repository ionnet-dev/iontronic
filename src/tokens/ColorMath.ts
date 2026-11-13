/**
 * Colour maths for deriving and checking colour tokens: hex parsing, WCAG 2 contrast, and the same mixing browsers do
 * for `color-mix()` and alpha compositing. Pure functions, no DOM and no Node, so `src/tokens` and `scripts/` share it.
 */
export namespace ColorMath {
  /**
   * An sRGB colour with channels 0–255 (not rounded) and alpha 0–1.
   */
  export interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  const HEX = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i;

  /**
   * Parses `#rrggbb` or `#rrggbbaa`.
   * @throws If the value is in any other format.
   */
  export function parse(hex: string): Rgba {
    const match = HEX.exec(hex);
    if (!match) throw new Error(`Colour "${hex}" must be #rrggbb or #rrggbbaa. Fix it in src/tokens/color.ts.`);
    const rgb = parseInt(match[1]!, 16);
    return {
      r: (rgb >> 16) & 0xff,
      g: (rgb >> 8) & 0xff,
      b: rgb & 0xff,
      a: match[2] ? parseInt(match[2], 16) / 255 : 1,
    };
  }

  /**
   * Formats an opaque colour as lowercase `#rrggbb`, rounding each channel.
   */
  export function toHex(color: Rgba): string {
    const byte = (value: number) => Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, "0");
    return `#${byte(color.r)}${byte(color.g)}${byte(color.b)}`;
  }

  const toLinear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const fromLinear = (value: number) => {
    const c = value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
    return c * 255;
  };

  /**
   * WCAG 2 relative luminance of an opaque colour, 0–1.
   */
  export function luminance(color: Rgba): number {
    return 0.2126 * toLinear(color.r) + 0.7152 * toLinear(color.g) + 0.0722 * toLinear(color.b);
  }

  /**
   * WCAG 2 contrast ratio (1–21) between two opaque colours. Channels are rounded first, as on screen.
   */
  export function contrast(a: Rgba, b: Rgba): number {
    const la = luminance(round(a));
    const lb = luminance(round(b));
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  /**
   * Rounds the channels to whole 8-bit values.
   */
  export function round(color: Rgba): Rgba {
    return { r: Math.round(color.r), g: Math.round(color.g), b: Math.round(color.b), a: color.a };
  }

  /**
   * Composites `top` (which may be translucent) over an opaque `bottom`, as the browser paints it.
   */
  export function over(top: Rgba, bottom: Rgba): Rgba {
    const a = top.a;
    return {
      r: top.r * a + bottom.r * (1 - a),
      g: top.g * a + bottom.g * (1 - a),
      b: top.b * a + bottom.b * (1 - a),
      a: 1,
    };
  }

  /**
   * `color-mix(in srgb, a <amount>, b)`: linear interpolation of premultiplied sRGB 0–255 channels.
   * @param amount Share of `a`, 0–1.
   */
  export function mixSrgb(a: Rgba, b: Rgba, amount: number): Rgba {
    const alpha = a.a * amount + b.a * (1 - amount);
    if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
    const channel = (ca: number, cb: number) => (ca * a.a * amount + cb * b.a * (1 - amount)) / alpha;
    return { r: channel(a.r, b.r), g: channel(a.g, b.g), b: channel(a.b, b.b), a: alpha };
  }

  /**
   * The soft tint used by component CSS: `color-mix(in srgb, <hue> <amount>, transparent)` painted over `surface`.
   * @param amount Share of the hue, 0–1 (`tint.soft` is 0.16).
   */
  export function tint(hue: Rgba, amount: number, surface: Rgba): Rgba {
    return over(mixSrgb(hue, { r: 0, g: 0, b: 0, a: 0 }, amount), surface);
  }

  const toOklab = (color: Rgba) => {
    const r = toLinear(color.r);
    const g = toLinear(color.g);
    const b = toLinear(color.b);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return {
      L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      A: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      B: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    };
  };
  const fromOklab = (L: number, A: number, B: number): Rgba => {
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    return {
      r: fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
      g: fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
      b: fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
      a: 1,
    };
  };

  /**
   * `color-mix(in oklab, a <amount>, b)` for opaque colours. Keeps the hue's character better than sRGB when mixing
   * toward a dark or light text colour.
   * @param amount Share of `a`, 0–1.
   */
  export function mixOklab(a: Rgba, b: Rgba, amount: number): Rgba {
    const la = toOklab(a);
    const lb = toOklab(b);
    const lerp = (x: number, y: number) => x * amount + y * (1 - amount);
    const mixed = fromOklab(lerp(la.L, lb.L), lerp(la.A, lb.A), lerp(la.B, lb.B));
    return { r: Math.min(255, Math.max(0, mixed.r)), g: Math.min(255, Math.max(0, mixed.g)), b: Math.min(255, Math.max(0, mixed.b)), a: 1 };
  }

  /**
   * The colour with its Oklab/OKLCH lightness set to `lightness` (0–1), keeping hue and as much chroma as fits in sRGB.
   * Used to deepen or lift a hue for text without changing which hue it reads as.
   */
  export function withLightness(color: Rgba, lightness: number): Rgba {
    const { A, B } = toOklab(color);
    const inGamut = (rgb: Rgba) => [rgb.r, rgb.g, rgb.b].every((value) => value >= -0.5 && value <= 255.5);
    let low = 0;
    let high = 1;
    let best = fromOklab(lightness, 0, 0);
    // Largest share of the original chroma that stays inside sRGB at this lightness
    for (let i = 0; i < 20; i++) {
      const share = (low + high) / 2;
      const candidate = fromOklab(lightness, A * share, B * share);
      if (inGamut(candidate)) {
        best = candidate;
        low = share;
      }
      else {
        high = share;
      }
    }
    if (inGamut(fromOklab(lightness, A, B))) best = fromOklab(lightness, A, B);
    return { r: Math.min(255, Math.max(0, best.r)), g: Math.min(255, Math.max(0, best.g)), b: Math.min(255, Math.max(0, best.b)), a: 1 };
  }

  /**
   * Oklab lightness (0–1) of a colour.
   */
  export function lightness(color: Rgba): number {
    return toOklab(color).L;
  }

  /**
   * CSS `filter: brightness(<factor>)`: multiplies each sRGB channel, clamped.
   */
  export function brightness(color: Rgba, factor: number): Rgba {
    const scale = (value: number) => Math.min(255, value * factor);
    return { r: scale(color.r), g: scale(color.g), b: scale(color.b), a: color.a };
  }
}

export default ColorMath;
