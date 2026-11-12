import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
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
 * Initials from a name: the first letter of its first and last word.
 */
function initialsOf(name: string | undefined): string {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const first = words.at(0);
  const last = words.at(-1);
  if (first === undefined || last === undefined) return "?";
  const letter = (word: string) => Array.from(word).at(0) ?? "";
  return words.length === 1 ? letter(first) : letter(first) + letter(last);
}

/**
 * A round picture with an initials fallback (Base UI Avatar).
 *
 * @example <Avatar name="Ion" />
 */
export function Avatar(props: AvatarProps) {
  const { src, alt, name, size = "md", tone, priority, category, color, className } = props;
  const hasHue = Boolean(priority || category || color);
  return (
    <BaseAvatar.Root className={cx("io-avatar io-hue", className)} data-size={size} {...hueAttributes({ tone: tone ?? (hasHue ? undefined : "spark"), priority, category, color })}>
      {src && <BaseAvatar.Image className="io-avatar-image" src={src} alt={alt ?? name ?? ""} />}
      <BaseAvatar.Fallback className="io-avatar-fallback">{initialsOf(name)}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

export default Avatar;
