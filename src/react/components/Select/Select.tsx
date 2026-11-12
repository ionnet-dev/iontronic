import type { ReactNode } from "react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import type { FieldBaseProps } from "../Field/Field";

/**
 * One choice in a {@link Select}.
 */
export interface SelectOption<Value> {
  value: Value;
  label: ReactNode;
  disabled?: boolean;
}

/**
 * A labelled group of choices in a {@link Select}.
 */
export interface SelectOptionGroup<Value> {
  label: ReactNode;
  options: SelectOption<Value>[];
}

/**
 * Props for {@link Select}.
 */
export interface SelectProps<Value> extends FieldBaseProps {
  /**
   * Choices. Mix plain options and groups to add section headings.
   */
  options: Array<SelectOption<Value> | SelectOptionGroup<Value>>;
  /**
   * Text in the trigger when nothing is selected.
   */
  placeholder?: ReactNode;
  /**
   * Selected value, for a controlled select (with `onValueChange`).
   */
  value?: Value | null;
  /**
   * Initial value for an uncontrolled select.
   */
  defaultValue?: Value | null;
  /**
   * Called when the user picks an option.
   */
  onValueChange?: (value: Value | null) => void;
  /**
   * Height 32 / 40 / 48px. Default is `"md"`.
   */
  size?: ControlSize;
  /**
   * Form field name for native submission.
   */
  name?: string;
  /**
   * Accessible name when there is no visible `label`.
   */
  "aria-label"?: string;
  /**
   * Class name for the trigger box.
   */
  className?: string;
}

/**
 * Picks one value from a list (Base UI Select). The list uses the shared `io-popup` surface.
 *
 * @example <Select label="Priority" defaultValue={3} options={[{ value: 5, label: "Urgent" }, { value: 3, label: "Default" }]} />
 */
export function Select<Value>(props: SelectProps<Value>) {
  const { placeholder, size = "md", error, disabled, className } = props;
  // TODO(builder B): Base UI Select.Root/Trigger/Value/Icon/Portal/Positioner/Popup/List/Item/Group, wrapped in <Field>
  return (
    <button type="button" className={cx("io-select io-focus", className)} data-size={size} data-invalid={error != null || undefined} disabled={disabled}>
      <span className="io-select-value" data-placeholder="">{placeholder}</span>
      <span className="io-select-icon" />
    </button>
  );
}

export default Select;
