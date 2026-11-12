import { useId, type ReactNode } from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cx } from "../../../cx";
import type { FieldBaseProps } from "../Field/Field";

/**
 * Props for {@link RadioGroup}.
 */
export interface RadioGroupProps<Value extends string = string> extends FieldBaseProps {
  value?: Value;
  defaultValue?: Value;
  onValueChange?: (value: Value) => void;
  /**
   * Default is `"vertical"`.
   */
  orientation?: "horizontal" | "vertical";
  name?: string;
  /**
   * `<Radio>` elements.
   */
  children: ReactNode;
  /**
   * Class name for the `io-radio-group` element.
   */
  className?: string;
}

/**
 * Props for {@link Radio}.
 */
export interface RadioProps<Value extends string = string> {
  value: Value;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  /**
   * Class name for the `io-check` row.
   */
  className?: string;
}

/**
 * A group of mutually exclusive options (Base UI RadioGroup), with an optional field label.
 *
 * @example
 * <RadioGroup label="Delivery" defaultValue="instant">
 *   <Radio value="instant" label="Instant" />
 *   <Radio value="digest" label="Digest" />
 * </RadioGroup>
 */
export function RadioGroup<Value extends string = string>(props: RadioGroupProps<Value>) {
  const { value, defaultValue, onValueChange, orientation = "vertical", name, label, description, error, required, disabled, fieldClassName, className, children } = props;
  const labelId = useId();
  const group = (
    <BaseRadioGroup
      className={cx("io-radio-group", className)}
      data-orientation={orientation}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next as Value) : undefined}
      name={name}
      required={required}
      disabled={disabled}
      aria-labelledby={label != null ? labelId : undefined}
      aria-invalid={error != null || undefined}
    >
      {children}
    </BaseRadioGroup>
  );
  if (label == null && description == null && error == null) return group;
  return (
    <BaseField.Root className={cx("io-field", fieldClassName)} disabled={disabled} invalid={error != null || undefined}>
      {label != null && (
        <div id={labelId} className="io-field-label">
          {label}
          {required && <span className="io-field-required" aria-hidden="true">*</span>}
        </div>
      )}
      {group}
      {description != null && <BaseField.Description className="io-field-description">{description}</BaseField.Description>}
      {error != null && <BaseField.Error className="io-field-error" match>{error}</BaseField.Error>}
    </BaseField.Root>
  );
}

/**
 * One option of a {@link RadioGroup} (Base UI Radio).
 */
export function Radio<Value extends string = string>(props: RadioProps<Value>) {
  const { value, label, description, disabled, className } = props;
  const labelId = useId();
  const descriptionId = useId();
  return (
    <label className={cx("io-check", className)} data-disabled={disabled || undefined}>
      <BaseRadio.Root aria-labelledby={label != null ? labelId : undefined} aria-describedby={description != null ? descriptionId : undefined} className="io-radio io-focus" value={value} disabled={disabled}>
        <BaseRadio.Indicator className="io-radio-indicator" />
      </BaseRadio.Root>
      {(label != null || description != null) && (
        <span className="io-check-text">
          {label != null && <span id={labelId} className="io-check-label">{label}</span>}
          {description != null && <span id={descriptionId} className="io-check-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default RadioGroup;
