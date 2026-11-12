import { cx } from "../../../cx";
import type { IconSize } from "../Icon/Icon";

/**
 * Props for {@link Spinner}.
 */
export interface SpinnerProps {
  /**
   * Same scale as icons. Default is `"md"`.
   */
  size?: IconSize;
  /**
   * Accessible label. Default is `"Loading"`.
   */
  label?: string;
  className?: string;
}

/**
 * An indeterminate loading ring in the current text colour.
 */
export function Spinner(props: SpinnerProps) {
  const { size = "md", label = "Loading", className } = props;
  return <span className={cx("io-spinner", className)} data-size={size} role="status" aria-label={label} />;
}

export default Spinner;
