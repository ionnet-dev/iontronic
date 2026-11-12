/**
 * Colour helpers shared by the platform targets. Colour tokens are always `#rrggbb` or `#rrggbbaa` (see `src/tokens/color.ts`).
 */
export namespace ColorX {
  /**
   * An 8-bit RGBA colour. `a` is 0–255.
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
      a: match[2] ? parseInt(match[2], 16) : 255,
    };
  }

  const byte = (value: number) => value.toString(16).padStart(2, "0").toUpperCase();

  /**
   * Formats as uppercase `AARRGGBB` digits without a prefix.
   */
  export function toArgb(hex: string): string {
    const { r, g, b, a } = parse(hex);
    return `${byte(a)}${byte(r)}${byte(g)}${byte(b)}`;
  }

  /**
   * Formats as Android `#AARRGGBB` (alpha first), as used in Android colour resources.
   */
  export function toAndroidHex(hex: string): string {
    return `#${toArgb(hex)}`;
  }

  /**
   * Formats as a Kotlin `Color(0xAARRGGBB)` literal.
   */
  export function toKotlin(hex: string): string {
    return `Color(0x${toArgb(hex)})`;
  }

  /**
   * Formats a colour as `#rrggbb` in lowercase, dropping alpha. Terminals have no per-colour alpha.
   */
  export function toRgbHex(hex: string): string {
    const { r, g, b } = parse(hex);
    return `#${byte(r)}${byte(g)}${byte(b)}`.toLowerCase();
  }

  /**
   * ANSI 24-bit escape body for a foreground (`38;2;r;g;b`) or background (`48;2;r;g;b`) colour.
   */
  export function toAnsi(hex: string, layer: "fg" | "bg"): string {
    const { r, g, b } = parse(hex);
    return `${layer === "fg" ? 38 : 48};2;${r};${g};${b}`;
  }
}

export default ColorX;
