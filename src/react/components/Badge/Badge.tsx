import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";

/**
 * Props for {@link Badge}. Colour comes from `tone`, `priority`, `category` or `color` (see {@link HueProps}).
 */
export interface BadgeProps extends Omit<ComponentProps<"span">, "color">, HueProps {
  /**
   * `soft` (default) tints the hue; `solid` fills it; `outline` draws a ring.
   */
  appearance?: "soft" | "solid" | "outline";
  /**
   * Default is `"md"`.
   */
  size?: "sm" | "md";
  icon?: LucideIcon;
}

/**
 * A small uppercase status label. With `priority` and no children it shows the priority's name (`PRIORITY_LABELS`).
 *
 * @example <Badge priority={5} />
 * @example <Badge tone="ok" appearance="solid">Healthy</Badge>
 */
export function Badge(props: BadgeProps) {
  const { appearance = "soft", size = "md", icon, tone = "neutral", priority, category, color, className, style, children, ...rest } = props;
  // TODO(builder C): icon, PRIORITY_LABELS fallback
  return (
    <span className={cx("io-badge io-hue", className)} data-appearance={appearance} data-size={size} {...hueAttributes({ tone, priority, category, color }, style)} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
