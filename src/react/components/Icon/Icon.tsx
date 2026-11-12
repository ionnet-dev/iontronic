import type { LucideIcon, LucideProps } from "lucide-react";
import { cx } from "../../../cx";

const SIZES = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 } as const;

/**
 * Named icon sizes in pixels: `xs` 12, `sm` 14, `md` 16, `lg` 20, `xl` 24 (matches `--io-size-icon-*`).
 */
export type IconSize = keyof typeof SIZES;

/**
 * Props for {@link Icon}.
 */
export interface IconProps extends Omit<LucideProps, "ref" | "size"> {
  /**
   * Any icon from `@ionnet/iontronic/icons` (Lucide).
   */
  icon: LucideIcon;
  /**
   * Named size or pixel value. Default is `"md"`.
   */
  size?: IconSize | number;
  /**
   * Accessible name. When omitted the icon is hidden from assistive technology.
   */
  label?: string;
}

/**
 * Renders a Lucide icon with Iontronic sizing and the Twilight stroke (2px, round).
 *
 * @example <Icon icon={Search} size="sm" />
 */
export function Icon(props: IconProps) {
  const { icon: Glyph, size = "md", label, strokeWidth = 2, className, ...rest } = props;
  const pixels = typeof size === "number" ? size : SIZES[size];
  return (
    <Glyph
      size={pixels}
      strokeWidth={strokeWidth}
      className={cx("io-icon", className)}
      data-size={typeof size === "number" ? undefined : size}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      {...rest}
    />
  );
}

export default Icon;
