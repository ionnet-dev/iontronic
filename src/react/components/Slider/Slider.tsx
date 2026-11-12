import { cx } from "../../../cx";
import type { FieldBaseProps } from "../Field/Field";

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
  const { orientation = "horizontal", disabled, className } = props;
  // TODO(builder B): Base UI Slider.Root/Control/Track/Indicator/Thumb, header with label + value, wrapped in <Field>
  return (
    <div className={cx("io-slider", className)} data-orientation={orientation} data-disabled={disabled || undefined}>
      <div className="io-slider-control">
        <div className="io-slider-track"><div className="io-slider-indicator" /></div>
        <div className="io-slider-thumb io-focus" />
      </div>
    </div>
  );
}

export default Slider;
