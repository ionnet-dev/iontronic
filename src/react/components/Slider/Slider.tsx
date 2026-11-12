import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cx } from "../../../cx";
import { Field, type FieldBaseProps } from "../Field/Field";

/**
 * Props for {@link Slider}. Pass an array to `value` / `defaultValue` for a range with two thumbs.
 */
export interface SliderProps extends FieldBaseProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  /**
   * Called once when the user releases the thumb.
   */
  onValueCommitted?: (value: number | number[]) => void;
  /**
   * Default is `0`.
   */
  min?: number;
  /**
   * Default is `100`.
   */
  max?: number;
  /**
   * Default is `1`.
   */
  step?: number;
  /**
   * Shows the current value next to the label.
   */
  showValue?: boolean;
  /**
   * Formats the shown value (`(v) => \`${v}%\``).
   */
  format?: (value: number) => string;
  orientation?: "horizontal" | "vertical";
  name?: string;
  "aria-label"?: string;
  /**
   * Class name for the `io-slider` root.
   */
  className?: string;
}

/**
 * Picks a number or range by dragging (Base UI Slider).
 *
 * @example <Slider label="Volume" defaultValue={40} showValue format={(v) => `${v}%`} />
 */
export function Slider(props: SliderProps) {
  const { value, defaultValue, onValueChange, onValueCommitted, min = 0, max = 100, step = 1, showValue, format, orientation = "horizontal", name, label, description, error, required, disabled, fieldClassName, className, "aria-label": ariaLabel } = props;
  const initial = value ?? defaultValue ?? min;
  const thumbs = Array.isArray(initial) ? initial.length : 1;
  const slider = (
    <BaseSlider.Root
      className={cx("io-slider", className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(typeof next === "number" ? next : [...next]) : undefined}
      onValueCommitted={onValueCommitted ? (next) => onValueCommitted(typeof next === "number" ? next : [...next]) : undefined}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      name={name}
      disabled={disabled}
    >
      {(label != null || showValue) && (
        <div className="io-slider-header">
          {label != null && (
            <BaseSlider.Label className="io-field-label">
              {label}
              {required && <span className="io-field-required" aria-hidden="true">*</span>}
            </BaseSlider.Label>
          )}
          {showValue && (
            <BaseSlider.Value className="io-slider-value">
              {(formatted, values) => format ? values.map(format).join(" – ") : formatted.join(" – ")}
            </BaseSlider.Value>
          )}
        </div>
      )}
      <BaseSlider.Control className="io-slider-control">
        <BaseSlider.Track className="io-slider-track">
          <BaseSlider.Indicator className="io-slider-indicator" />
          {Array.from({ length: thumbs }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={thumbs > 1 ? index : undefined}
              className="io-slider-thumb io-focus"
              aria-label={thumbs > 1 ? (index === 0 ? "Minimum" : "Maximum") : label == null ? ariaLabel : undefined}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
  if (description == null && error == null) return slider;
  return (
    <Field description={description} error={error} disabled={disabled} name={name} className={fieldClassName}>
      {slider}
    </Field>
  );
}

export default Slider;
