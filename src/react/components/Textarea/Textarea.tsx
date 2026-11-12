import type { ComponentProps } from "react";
import { Field as BaseField } from "@base-ui/react/field";
import { cx } from "../../../cx";
import { Field, type FieldBaseProps } from "../Field/Field";

/**
 * Props for {@link Textarea}. Native `<textarea>` attributes (and `ref`) go to the textarea.
 */
export interface TextareaProps extends ComponentProps<"textarea">, FieldBaseProps {
  /**
   * Uses the mono font, for JSON, rules or other code-like input.
   */
  mono?: boolean;
  /**
   * `vertical` (default) shows a resize handle; `auto` grows with content; `none` is fixed.
   */
  resize?: "none" | "vertical" | "auto";
}

/**
 * A multi-line text field with optional label, help and error.
 *
 * @example <Textarea label="Message" rows={4} />
 */
export function Textarea(props: TextareaProps) {
  const { mono, resize = "vertical", label, description, error, required, disabled, fieldClassName, className, ...rest } = props;
  const control = (
    <BaseField.Control
      render={<textarea />}
      className={cx("io-textarea io-focus", className)}
      data-mono={mono || undefined}
      data-resize={resize}
      data-invalid={error != null || undefined}
      required={required}
      disabled={disabled}
      aria-invalid={error != null || undefined}
      {...(rest as object)}
    />
  );
  if (label == null && description == null && error == null) return control;
  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} name={rest.name} className={fieldClassName}>
      {control}
    </Field>
  );
}

export default Textarea;
