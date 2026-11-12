import type { ReactNode } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link Checkbox}.
 */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Shows a dash for a partially selected group.
   */
  indeterminate?: boolean;
  /**
   * Text next to the box.
   */
  label?: ReactNode;
  /**
   * Muted line under the label.
   */
  description?: ReactNode;
  /**
   * Puts the label first and the box at the end of the row (settings lists). Default is `"start"`.
   */
  placement?: "start" | "end";
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  "aria-label"?: string;
  /**
   * Class name for the `io-check` row.
   */
  className?: string;
}

/**
 * A checkbox with an optional label and description (Base UI Checkbox).
 *
 * @example <Checkbox label="Show acknowledged" defaultChecked />
 */
export function Checkbox(props: CheckboxProps) {
  const { label, description, placement = "start", disabled, className } = props;
  // TODO(builder B): Base UI Checkbox.Root + Indicator inside the io-check row
  return (
    <label className={cx("io-check", className)} data-placement={placement} data-disabled={disabled || undefined}>
      <span className="io-checkbox io-focus"><span className="io-checkbox-indicator" /></span>
      {(label != null || description != null) && (
        <span className="io-check-text">
          {label != null && <span className="io-check-label">{label}</span>}
          {description != null && <span className="io-check-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
