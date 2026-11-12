import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";

/**
 * One segment of a {@link SegmentedControl}.
 */
export interface SegmentedOption<Value extends string> {
  value: Value;
  label: ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
  /**
   * Accessible name, required when `label` is icon-only.
   */
  "aria-label"?: string;
}

/**
 * Props for {@link SegmentedControl}.
 */
export interface SegmentedControlProps<Value extends string> {
  options: SegmentedOption<Value>[];
  /**
   * Selected value, for a controlled control.
   */
  value?: Value;
  /**
   * Initial value for an uncontrolled control.
   */
  defaultValue?: Value;
  /**
   * Called with the newly selected value. A segment can't be deselected.
   */
  onValueChange?: (value: Value) => void;
  /**
   * Default is `"md"`.
   */
  size?: ControlSize;
  /**
   * Stretches segments to fill the container.
   */
  fullWidth?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

/**
 * A single-choice pill switcher (Base UI ToggleGroup), like the inbox All / Unread / Acked filter.
 *
 * @example <SegmentedControl aria-label="Filter" defaultValue="all" options={[{ value: "all", label: "All" }, { value: "unread", label: "Unread" }]} />
 */
export function SegmentedControl<Value extends string>(props: SegmentedControlProps<Value>) {
  const { options, value, defaultValue, size = "md", fullWidth, className, "aria-label": ariaLabel } = props;
  const selected = value ?? defaultValue;
  // TODO(builder B): Base UI ToggleGroup + Toggle, single selection that can't be emptied
  return (
    <div role="group" aria-label={ariaLabel} className={cx("io-segmented", className)} data-size={size} data-full-width={fullWidth || undefined}>
      {options.map((option) => (
        <button key={option.value} type="button" className="io-segmented-item io-focus" aria-pressed={option.value === selected} data-pressed={option.value === selected || undefined} disabled={option.disabled}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;
