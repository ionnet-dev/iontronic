import type { CSSProperties } from "react";
import type { Category, Priority, Tone } from "../../semantic";

/**
 * Props shared by every hue-driven component (`Badge`, `Chip`, `IconTile`, `Avatar`, timeline items…).  
 * Precedence: `color` > `priority` > `category` > `tone`. The root must also carry the `io-hue` class.
 */
export interface HueProps {
  /**
   * Semantic tone.
   */
  tone?: Tone;
  /**
   * Message priority 1–5.
   */
  priority?: Priority;
  /**
   * Categorical palette slot 1–8 (topics, sources). Use `categoryFor(name)` for a stable slot per name.
   */
  category?: Category;
  /**
   * Any CSS colour. Sets `--io-hue` inline and wins over the other props. Its text variant is approximated (mixed toward
   * `text`), so check contrast yourself; the named hues are guaranteed 4.5:1.
   */
  color?: string;
}

/**
 * The attributes {@link hueAttributes} returns, ready to spread on the root element.
 */
export interface HueAttributes {
  "data-tone"?: Tone;
  "data-priority"?: Priority;
  "data-category"?: Category;
  style?: CSSProperties;
}

/**
 * Share of a custom `color` kept in its text variant; the rest is `--io-color-text`.
 */
const CUSTOM_TEXT_SHARE = "65%";

/**
 * Turns {@link HueProps} into the data attributes and inline style read by `base/hue.css`.
 * @param hue The hue props.
 * @param style The component's own `style` prop, merged in.
 */
export function hueAttributes(hue: HueProps, style?: CSSProperties): HueAttributes {
  const result: HueAttributes = {};
  if (hue.tone) result["data-tone"] = hue.tone;
  if (hue.category) result["data-category"] = hue.category;
  if (hue.priority) result["data-priority"] = hue.priority;
  if (hue.color) {
    result.style = {
      ...style,
      "--io-hue": hue.color,
      "--io-hue-text": `color-mix(in oklab, ${hue.color} ${CUSTOM_TEXT_SHARE}, var(--io-color-text))`,
      "--io-hue-on-solid": "var(--io-color-on-solid)",
    } as CSSProperties;
  }
  else if (style) result.style = style;
  return result;
}

export default hueAttributes;
