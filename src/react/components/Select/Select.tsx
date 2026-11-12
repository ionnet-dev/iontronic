import type { ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import { Field, type FieldBaseProps } from "../Field/Field";
import { Icon } from "../Icon/Icon";

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

function isGroup<Value>(entry: SelectOption<Value> | SelectOptionGroup<Value>): entry is SelectOptionGroup<Value> {
  return "options" in entry;
}

function renderOption<Value>(option: SelectOption<Value>, index: number) {
  return (
    <BaseSelect.Item key={index} value={option.value} disabled={option.disabled} className="io-popup-item">
      <BaseSelect.ItemIndicator className="io-popup-item-indicator" keepMounted>
        <Icon icon={Check} size="md" />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

/**
 * Picks one value from a list (Base UI Select). The list uses the shared `io-popup` surface.
 *
 * @example <Select label="Priority" defaultValue={3} options={[{ value: 5, label: "Urgent" }, { value: 3, label: "Default" }]} />
 */
export function Select<Value>(props: SelectProps<Value>) {
  const { options, placeholder, value, defaultValue, onValueChange, size = "md", name, label, description, error, required, disabled, fieldClassName, className, "aria-label": ariaLabel } = props;
  const items = options.flatMap((entry) => isGroup(entry) ? entry.options : [entry]);
  const select = (
    <BaseSelect.Root<Value>
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next) : undefined}
      name={name}
      required={required}
      disabled={disabled}
    >
      <BaseSelect.Trigger className={cx("io-select io-focus", className)} data-size={size} data-invalid={error != null || undefined} aria-label={ariaLabel}>
        <BaseSelect.Value className="io-select-value" placeholder={placeholder} />
        <BaseSelect.Icon className="io-select-icon"><Icon icon={ChevronDown} size="md" /></BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="io-popup-positioner" sideOffset={6} alignItemWithTrigger={false}>
          <BaseSelect.Popup className="io-popup io-select-popup">
            <BaseSelect.List>
              {options.map((entry, index) => isGroup(entry) ? (
                <BaseSelect.Group key={index}>
                  <BaseSelect.GroupLabel className="io-popup-label">{entry.label}</BaseSelect.GroupLabel>
                  {entry.options.map(renderOption)}
                </BaseSelect.Group>
              ) : renderOption(entry, index))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
  if (label == null && description == null && error == null) return select;
  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} name={name} className={fieldClassName}>
      {select}
    </Field>
  );
}

export default Select;
