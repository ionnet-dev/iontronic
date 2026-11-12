import { useState, type ReactNode } from "react";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import { Icon } from "../Icon/Icon";

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
  const { options, value, defaultValue, onValueChange, size = "md", fullWidth, disabled, className, "aria-label": ariaLabel } = props;
  const [inner, setInner] = useState<Value | undefined>(defaultValue ?? options[0]?.value);
  const selected = value ?? inner;
  return (
    <ToggleGroup<Value>
      aria-label={ariaLabel}
      className={cx("io-segmented", className)}
      data-size={size}
      data-full-width={fullWidth || undefined}
      value={selected === undefined ? [] : [selected]}
      disabled={disabled}
      onValueChange={(next) => {
        const picked = next[0];
        if (picked === undefined) return;
        setInner(picked);
        onValueChange?.(picked);
      }}
    >
      {options.map((option) => (
        <Toggle key={option.value} value={option.value} disabled={option.disabled} aria-label={option["aria-label"]} className="io-segmented-item io-focus">
          {option.icon && <Icon icon={option.icon} size="sm" />}
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

export default SegmentedControl;
