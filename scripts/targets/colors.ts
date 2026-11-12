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

  /**
   * Parses `#rrggbb` or `#rrggbbaa`.
   * @throws If the value is in any other format.
   */
  export function parse(hex: string): Rgba {
    // TODO(builder A): implement; throw new Error(`Colour "${hex}" must be #rrggbb or #rrggbbaa. Fix it in src/tokens/color.ts.`)
    void hex;
    throw new Error("ColorX.parse is not implemented yet.");
  }

  /**
   * Formats as Android `#AARRGGBB` (alpha first), as used in `colors.xml`.
   */
  export function toAndroidHex(hex: string): string {
    // TODO(builder A): implement
    return hex;
  }

  /**
   * Formats as a Kotlin `Color(0xAARRGGBB)` literal.
   */
  export function toKotlin(hex: string): string {
    // TODO(builder A): implement
    return `Color(0xFF000000) /* ${hex} */`;
  }

  /**
   * ANSI 24-bit escape body for a foreground (`38;2;r;g;b`) or background (`48;2;r;g;b`) colour.
   */
  export function toAnsi(hex: string, layer: "fg" | "bg"): string {
    // TODO(builder A): implement
    void hex;
    return layer === "fg" ? "39" : "49";
  }
}

export default ColorX;
