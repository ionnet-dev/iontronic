import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { PRIORITY_LABELS } from "../../../semantic";
import { Icon } from "../Icon/Icon";
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
  const { appearance = "soft", size = "md", icon, tone, priority, category, color, className, style, children, ...rest } = props;
  const content = children ?? (priority ? PRIORITY_LABELS[priority] : undefined);
  return (
    <span className={cx("io-badge io-hue", className)} data-appearance={appearance} data-size={size} {...hueAttributes({ tone, priority, category, color }, style)} {...rest}>
      {icon && <Icon icon={icon} size="xs" />}
      {content}
    </span>
  );
}

export default Badge;
