import type { ReactNode } from "react";
import { cx } from "../../../cx";
import type { Tone } from "../../../semantic";

/**
 * Props for {@link Progress}.
 */
export interface ProgressProps {
  /**
   * Current value, or `null` for an indeterminate bar.
   */
  value: number | null;
  /**
   * Default is `100`.
   */
  max?: number;
  label?: ReactNode;
  /**
   * Shows the formatted value next to the label.
   */
  showValue?: boolean;
  /**
   * Formats the shown value. Default is a percentage.
   */
  format?: (value: number, max: number) => string;
  /**
   * Track height 4px (`sm`) or 8px (`md`). Default is `"md"`.
   */
  size?: "sm" | "md";
  /**
   * Indicator colour. `accent` (default) uses the accent gradient.
   */
  tone?: Tone;
  "aria-label"?: string;
  className?: string;
}

/**
 * A task-progress bar (Base UI Progress).
 *
 * @example <Progress label="Uploading" value={40} showValue />
 */
export function Progress(props: ProgressProps) {
  const { value, size = "md", tone = "accent", className } = props;
  // TODO(builder C): Base UI Progress.Root/Track/Indicator/Label/Value
  return (
    <div className={cx("io-progress io-hue", className)} data-tone={tone} data-size={size} data-indeterminate={value === null || undefined}>
      <div className="io-progress-track"><div className="io-progress-indicator" /></div>
    </div>
  );
}

export default Progress;
