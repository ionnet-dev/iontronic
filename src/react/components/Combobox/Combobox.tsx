import type { ReactNode } from "react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import type { FieldBaseProps } from "../Field/Field";

/**
 * One choice in a {@link Combobox}.
 */
export interface ComboboxOption<Value> {
  value: Value;
  /**
   * Text shown in the list and matched against the query.
   */
  label: string;
  disabled?: boolean;
}

/**
 * Props for {@link Combobox}.
 */
export interface ComboboxProps<Value> extends FieldBaseProps {
  /**
   * All choices. Filtering by the typed query is built in.
   */
  options: ComboboxOption<Value>[];
  /**
   * Selected value, for a controlled combobox.
   */
  value?: Value | null;
  /**
   * Initial value for an uncontrolled combobox.
   */
  defaultValue?: Value | null;
  /**
   * Called when the user picks an option or clears the field.
   */
  onValueChange?: (value: Value | null) => void;
  /**
   * The typed query, for controlled filtering (with `onInputValueChange`).
   */
  inputValue?: string;
  /**
   * Called as the user types.
   */
  onInputValueChange?: (inputValue: string) => void;
  placeholder?: string;
  /**
   * Shown when no option matches. Default is `"No matches"`.
   */
  emptyText?: ReactNode;
  /**
   * Height 32 / 40 / 48px. Default is `"md"`.
   */
  size?: ControlSize;
  /**
   * Uses the mono font for the input (topic and host names).
   */
  mono?: boolean;
  name?: string;
  "aria-label"?: string;
  /**
   * Class name for the input box.
   */
  className?: string;
}

/**
 * A text input that filters a list of options (Base UI Combobox).
 *
 * @example <Combobox label="Topic" mono options={topics.map((t) => ({ value: t, label: t }))} />
 */
export function Combobox<Value>(props: ComboboxProps<Value>) {
  const { placeholder, size = "md", mono, error, disabled, className } = props;
  // TODO(builder B): Base UI Combobox.Root/Input/Clear/Trigger/Portal/Positioner/Popup/List/Item/Empty, wrapped in <Field>
  return (
    <div className={cx("io-input io-combobox io-focus-within", className)} data-size={size} data-appearance="outline" data-mono={mono || undefined} data-invalid={error != null || undefined} data-disabled={disabled || undefined}>
      <input className="io-input-control io-combobox-input" placeholder={placeholder} disabled={disabled} />
    </div>
  );
}

export default Combobox;
