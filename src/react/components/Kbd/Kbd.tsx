import type { ComponentProps } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link Kbd}.
 */
export interface KbdProps extends ComponentProps<"kbd"> {
  /**
   * Renders one `<kbd>` per key in an `io-kbd-group` (`["⌘", "K"]`). Otherwise `children` is used.
   */
  keys?: string[];
  /**
   * Default is `"md"`.
   */
  size?: "sm" | "md";
}

/**
 * A keyboard key or shortcut.
 *
 * @example <Kbd keys={["⌘", "K"]} />
 */
export function Kbd(props: KbdProps) {
  const { keys, size = "md", className, children, ...rest } = props;
  // TODO(builder C): keys → io-kbd-group
  return <kbd className={cx("io-kbd", className)} data-size={size} {...rest}>{keys ? keys.join("") : children}</kbd>;
}

export default Kbd;
