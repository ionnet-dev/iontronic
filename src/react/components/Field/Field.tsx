import type { ReactNode } from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "../../../cx";

/**
 * Label, help and error props shared by every field-wrapped control (`Input`, `Textarea`, `Select`, `Combobox`, `Slider`,
 * `RadioGroup`). Components that extend this render a {@link Field} around themselves.
 */
export interface FieldBaseProps {
  /**
   * Visible label above the control, also its accessible name.
   */
  label?: ReactNode;
  /**
   * Help text below the control.
   */
  description?: ReactNode;
  /**
   * Error message. When set the field is marked invalid and the message replaces nothing; it shows under the description.
   */
  error?: ReactNode;
  /**
   * Marks the field required and shows an asterisk after the label.
   */
  required?: boolean;
  disabled?: boolean;
  /**
   * Class name for the outer `io-field` wrapper (the control's own `className` goes on the control).
   */
  fieldClassName?: string;
}

/**
 * Props for {@link Field}.
 */
export interface FieldProps extends FieldBaseProps {
  children: ReactNode;
  /**
   * Form field name, passed to Base UI so validation messages attach to the right control.
   */
  name?: string;
  className?: string;
}

/**
 * Wraps a control with a label, description and error message (Base UI Field). Use it directly for custom controls;
 * the built-in controls take `label` / `description` / `error` themselves.
 *
 * @example <Field label="Topic" description="Sources can only publish to allowed topics."><MyControl /></Field>
 */
export function Field(props: FieldProps) {
  const { label, description, error, required, disabled, name, className, fieldClassName, children } = props;
  return (
    <BaseField.Root className={cx("io-field", className, fieldClassName)} name={name} disabled={disabled} invalid={error != null || undefined}>
      {label != null && (
        <BaseField.Label className="io-field-label">
          {label}
          {required && <span className="io-field-required" aria-hidden="true">*</span>}
        </BaseField.Label>
      )}
      {children}
      {description != null && <BaseField.Description className="io-field-description">{description}</BaseField.Description>}
      {error != null && <BaseField.Error className="io-field-error" match>{error}</BaseField.Error>}
    </BaseField.Root>
  );
}

export default Field;
