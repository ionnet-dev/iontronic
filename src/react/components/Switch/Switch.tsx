import type { ReactNode } from "react";
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
  const { label, description, placement = "start", size = "md", disabled, className } = props;
  // TODO(builder B): Base UI Switch.Root + Thumb inside the io-check row
  return (
    <label className={cx("io-check", className)} data-placement={placement} data-disabled={disabled || undefined}>
      <span className="io-switch io-focus" data-size={size}><span className="io-switch-thumb" /></span>
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
