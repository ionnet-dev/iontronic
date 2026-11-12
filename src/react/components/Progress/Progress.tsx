import type { ReactNode } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
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
  const { value, max = 100, label, showValue, format, size = "md", tone = "accent", className, "aria-label": ariaLabel } = props;
  const formatValue = format ?? ((current: number, total: number) => `${Math.round(current / total * 100)}%`);
  const hasHeader = label != null || (showValue && value !== null);
  return (
    <BaseProgress.Root className={cx("io-progress io-hue", className)} value={value} max={max} data-tone={tone} data-size={size} data-indeterminate={value === null || undefined} aria-label={ariaLabel} getAriaValueText={(_formatted, current) => (current === null ? "Loading" : formatValue(current, max))}>
      {hasHeader && (
        <div className="io-progress-header">
          {label != null && <BaseProgress.Label className="io-progress-label">{label}</BaseProgress.Label>}
          {showValue && value !== null && <BaseProgress.Value className="io-progress-value">{() => formatValue(value, max)}</BaseProgress.Value>}
        </div>
      )}
      <BaseProgress.Track className="io-progress-track">
        <BaseProgress.Indicator className="io-progress-indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

export default Progress;
