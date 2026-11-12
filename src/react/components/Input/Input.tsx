import type { ComponentProps, ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import { Field, type FieldBaseProps } from "../Field/Field";

/**
 * Props for {@link Input}. Native `<input>` attributes (and `ref`) go to the inner input element.
 */
export interface InputProps extends Omit<ComponentProps<"input">, "size">, FieldBaseProps {
  /**
   * Height 32 / 40 / 48px. Default is `"md"`.
   */
  size?: ControlSize;
  /**
   * `outline` (default) is a bordered field; `soft` is a borderless pill, like the reference search bar.
   */
  appearance?: "outline" | "soft";
  /**
   * Uses the mono font for the value, for identifiers such as topics and hostnames.
   */
  mono?: boolean;
  /**
   * Content inside the box before the input, usually an `<Icon>`.
   */
  leading?: ReactNode;
  /**
   * Content inside the box after the input (a unit, a clear button, a `Kbd`).
   */
  trailing?: ReactNode;
}

/**
 * A text input with optional label, help, error and inline slots.
 *
 * @example <Input label="Topic" mono placeholder="grid.alerts" />
 * @example <Input appearance="soft" leading={<Icon icon={Search} />} placeholder="Search messages, topics, tags" />
 */
export function Input(props: InputProps) {
  const { size = "md", appearance = "outline", mono, leading, trailing, label, description, error, required, disabled, fieldClassName, className, ...rest } = props;
  const box = (
    <div className={cx("io-input io-focus-within", className)} data-size={size} data-appearance={appearance} data-mono={mono || undefined} data-invalid={error != null || undefined} data-disabled={disabled || undefined}>
      {leading != null && <span className="io-input-slot" data-side="leading">{leading}</span>}
      <BaseInput className="io-input-control" required={required} disabled={disabled} aria-invalid={error != null || undefined} {...rest} />
      {trailing != null && <span className="io-input-slot" data-side="trailing">{trailing}</span>}
    </div>
  );
  if (label == null && description == null && error == null) return box;
  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} name={rest.name} className={fieldClassName}>
      {box}
    </Field>
  );
}

export default Input;
