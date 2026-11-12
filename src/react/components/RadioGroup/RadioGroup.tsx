import type { ReactNode } from "react";
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
  const { orientation = "vertical", className, children } = props;
  // TODO(builder B): Base UI RadioGroup inside <Field> (label/description/error)
  return <div role="radiogroup" className={cx("io-radio-group", className)} data-orientation={orientation}>{children}</div>;
}

/**
 * One option of a {@link RadioGroup} (Base UI Radio).
 */
export function Radio<Value extends string = string>(props: RadioProps<Value>) {
  const { label, description, disabled, className } = props;
  // TODO(builder B): Base UI Radio.Root + Indicator
  return (
    <label className={cx("io-check", className)} data-disabled={disabled || undefined}>
      <span className="io-radio io-focus"><span className="io-radio-indicator" /></span>
      {(label != null || description != null) && (
        <span className="io-check-text">
          {label != null && <span className="io-check-label">{label}</span>}
          {description != null && <span className="io-check-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default RadioGroup;
