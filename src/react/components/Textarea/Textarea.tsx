import type { ComponentProps } from "react";
import { cx } from "../../../cx";
import type { FieldBaseProps } from "../Field/Field";

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
  // TODO(builder B): wrap in <Field> when label/description/error is given
  return (
    <textarea className={cx("io-textarea io-focus", className)} data-mono={mono || undefined} data-resize={resize} data-invalid={error != null || undefined} required={required} disabled={disabled} {...rest} />
  );
}

export default Textarea;
