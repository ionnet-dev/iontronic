import type { ReactNode } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import { Field, type FieldBaseProps } from "../Field/Field";
import { Icon } from "../Icon/Icon";

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
  /**
   * Accessible name of the clear button. Default is `"Clear"`.
   */
  clearLabel?: string;
  /**
   * Accessible name of the open-list button. Default is `"Open"`.
   */
  openLabel?: string;
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
  const { options, value, defaultValue, onValueChange, inputValue, onInputValueChange, placeholder, emptyText = "No matches", size = "md", mono, name, label, description, error, required, disabled, fieldClassName, className, clearLabel = "Clear", openLabel = "Open", "aria-label": ariaLabel } = props;
  const find = (target: Value | null | undefined) => target === undefined ? undefined : options.find((option) => option.value === target) ?? null;
  const combobox = (
    <BaseCombobox.Root<ComboboxOption<Value>>
      items={options}
      value={find(value)}
      defaultValue={find(defaultValue)}
      onValueChange={onValueChange ? (next) => onValueChange(next?.value ?? null) : undefined}
      inputValue={inputValue}
      onInputValueChange={onInputValueChange}
      itemToStringLabel={(option) => option.label}
      isItemEqualToValue={(a, b) => a.value === b.value}
      name={name}
      required={required}
      disabled={disabled}
    >
      <BaseCombobox.InputGroup className={cx("io-input io-combobox io-focus-within", className)} data-size={size} data-appearance="outline" data-mono={mono || undefined} data-invalid={error != null || undefined} data-disabled={disabled || undefined}>
        <BaseCombobox.Input className="io-input-control io-combobox-input" placeholder={placeholder} aria-label={ariaLabel} />
        <BaseCombobox.Clear className="io-combobox-clear" aria-label={clearLabel}><Icon icon={X} size="sm" /></BaseCombobox.Clear>
        <BaseCombobox.Trigger className="io-combobox-trigger" aria-label={openLabel}><Icon icon={ChevronDown} size="md" /></BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="io-popup-positioner" sideOffset={6}>
          <BaseCombobox.Popup className="io-popup io-combobox-popup">
            <BaseCombobox.Empty className="io-popup-empty">{emptyText}</BaseCombobox.Empty>
            <BaseCombobox.List>
              {(option: ComboboxOption<Value>) => (
                <BaseCombobox.Item key={String(option.value)} value={option} disabled={option.disabled} className="io-popup-item">
                  <BaseCombobox.ItemIndicator className="io-popup-item-indicator" keepMounted>
                    <Icon icon={Check} size="md" />
                  </BaseCombobox.ItemIndicator>
                  <span>{option.label}</span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
  if (label == null && description == null && error == null) return combobox;
  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} name={name} className={fieldClassName}>
      {combobox}
    </Field>
  );
}

export default Combobox;
