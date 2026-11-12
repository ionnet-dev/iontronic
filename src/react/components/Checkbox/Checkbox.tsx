import { useId, type ReactNode } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { cx } from "../../../cx";
import { Icon } from "../Icon/Icon";

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
  const { checked, defaultChecked, onCheckedChange, indeterminate, label, description, placement = "start", disabled, required, name, value, className, "aria-label": ariaLabel } = props;
  const labelId = useId();
  const descriptionId = useId();
  return (
    <label className={cx("io-check", className)} data-placement={placement} data-disabled={disabled || undefined}>
      <BaseCheckbox.Root
        aria-labelledby={label != null ? labelId : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
                className="io-checkbox io-focus"
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange ? (next) => onCheckedChange(next) : undefined}
        indeterminate={indeterminate}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        aria-label={ariaLabel}
      >
        <BaseCheckbox.Indicator className="io-checkbox-indicator">
          <Icon icon={indeterminate ? Minus : Check} strokeWidth={3} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {(label != null || description != null) && (
        <span className="io-check-text">
          {label != null && <span id={labelId} className="io-check-label">{label}</span>}
          {description != null && <span id={descriptionId} className="io-check-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
