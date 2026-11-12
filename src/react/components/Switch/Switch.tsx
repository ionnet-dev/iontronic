import type { ReactNode } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../../../cx";

/**
 * Props for {@link Switch}.
 */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  /**
   * Puts the label first and the switch at the end of the row (settings lists). Default is `"start"`.
   */
  placement?: "start" | "end";
  /**
   * Track 36×22 (`sm`) or 46×28 (`md`). Default is `"md"`.
   */
  size?: "sm" | "md";
  disabled?: boolean;
  name?: string;
  "aria-label"?: string;
  /**
   * Class name for the `io-check` row.
   */
  className?: string;
}

/**
 * An on/off toggle with an optional label (Base UI Switch).
 *
 * @example <Switch label="Quiet hours 23:00–07:30" defaultChecked />
 */
export function Switch(props: SwitchProps) {
  const { checked, defaultChecked, onCheckedChange, label, description, placement = "start", size = "md", disabled, name, className, "aria-label": ariaLabel } = props;
  return (
    <label className={cx("io-check", className)} data-placement={placement} data-disabled={disabled || undefined}>
      <BaseSwitch.Root
        className="io-switch io-focus"
        data-size={size}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange ? (next) => onCheckedChange(next) : undefined}
        disabled={disabled}
        name={name}
        aria-label={ariaLabel}
      >
        <BaseSwitch.Thumb className="io-switch-thumb" />
      </BaseSwitch.Root>
      {(label != null || description != null) && (
        <span className="io-check-text">
          {label != null && <span className="io-check-label">{label}</span>}
          {description != null && <span className="io-check-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default Switch;
