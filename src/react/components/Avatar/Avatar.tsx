import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";

/**
 * Props for {@link Avatar}. The fallback background comes from {@link HueProps} (default tone `spark`).
 */
export interface AvatarProps extends HueProps {
  src?: string;
  /**
   * Image alt text. Default is `name`.
   */
  alt?: string;
  /**
   * Person or device name. Used for the initials fallback.
   */
  name?: string;
  /**
   * `sm` 28px, `md` 38px, `lg` 48px. Default is `"md"`.
   */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A round picture with an initials fallback (Base UI Avatar).
 *
 * @example <Avatar name="Ion" />
 */
export function Avatar(props: AvatarProps) {
  const { name, size = "md", tone = "spark", priority, category, color, className } = props;
  // TODO(builder C): Base UI Avatar.Root/Image/Fallback, initials from name
  return (
    <span className={cx("io-avatar io-hue", className)} data-size={size} {...hueAttributes({ tone, priority, category, color })}>
      <span className="io-avatar-fallback">{name?.charAt(0)}</span>
    </span>
  );
}

export default Avatar;
