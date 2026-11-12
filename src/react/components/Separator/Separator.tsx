import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cx } from "../../../cx";

/**
 * Props for {@link Separator}.
 */
export interface SeparatorProps extends Omit<BaseSeparator.Props, "className"> {
  /**
   * Insets a horizontal separator from both sides.
   */
  inset?: boolean;
  className?: string;
}

/**
 * A 1px divider line.
 */
export function Separator(props: SeparatorProps) {
  const { inset, className, ...rest } = props;
  return <BaseSeparator className={cx("io-separator", className)} data-inset={inset || undefined} {...rest} />;
}

export default Separator;
