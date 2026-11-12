import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";
import { Icon } from "../Icon/Icon";

/**
 * Props for {@link IconTile}.
 */
export interface IconTileProps extends Omit<ComponentProps<"span">, "color">, HueProps {
  /**
   * Icon to show. Pass `children` instead for custom content (initials, an emoji).
   */
  icon?: LucideIcon;
  /**
   * `sm` 36px, `md` 40px, `lg` 56px. Default is `"md"`.
   */
  size?: "sm" | "md" | "lg";
}

/**
 * A tinted circle holding an icon, coloured by tone, category, priority or a custom colour. Used as the leading visual of
 * list rows, card headers, quick tiles and empty states.
 *
 * @example <IconTile icon={Server} category={1} />
 */
export function IconTile(props: IconTileProps) {
  const { icon, size = "md", tone, priority, category, color, className, style, children, ...rest } = props;
  return (
    <span
      className={cx("io-icon-tile io-hue", className)}
      data-size={size}
      {...hueAttributes({ tone, priority, category, color }, style)}
      {...rest}
    >
      {icon ? <Icon icon={icon} size={size === "lg" ? "xl" : "lg"} /> : children}
    </span>
  );
}

export default IconTile;
