import type { ReactNode } from "react";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../../../cx";
import type { Category } from "../../../semantic";
import { hueAttributes, type HueProps } from "../../utils/hue";

/**
 * One part of a segmented {@link Meter}, like a project's share of logged hours.
 */
export interface MeterSegment extends HueProps {
  /**
   * Relative size. Segments are proportional to each other, not to `max`.
   */
  value: number;
  label: ReactNode;
  /**
   * Formatted value for the legend (`"5h00"`). Default is `String(value)`.
   */
  display?: ReactNode;
}

/**
 * Props for {@link Meter}. Pass `value` for a single gauge, or `segments` for a split bar.
 */
export interface MeterProps extends HueProps {
  value?: number;
  /**
   * Default is `0`.
   */
  min?: number;
  /**
   * Default is `100`.
   */
  max?: number;
  segments?: MeterSegment[];
  /**
   * Shows the legend under a segmented meter. Default is `true` when `segments` is set.
   */
  legend?: boolean;
  label?: ReactNode;
  showValue?: boolean;
  format?: (value: number) => string;
  /**
   * Track height 6px (`sm`) or 10px (`md`). Default is `"md"`.
   */
  size?: "sm" | "md";
  "aria-label"?: string;
  className?: string;
}

/**
 * A static measurement: one value in a range (Base UI Meter), or a split bar of category segments with a legend.
 *
 * @example <Meter segments={[{ value: 300, label: "Grid", display: "5h00", category: 1 }, { value: 160, label: "Ping", display: "2h40", category: 2 }]} />
 */
export function Meter(props: MeterProps) {
  const { value = 0, min = 0, max = 100, segments, legend = true, label, showValue, format, size = "md", tone, priority, category, color, className, "aria-label": ariaLabel } = props;

  if (segments) {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    const summary = segments.map((segment) => `${typeof segment.label === "string" ? segment.label : ""} ${segment.display ?? segment.value}`.trim()).join(", ");
    return (
      <div className={cx("io-meter", className)} data-size={size} data-segmented="" role="img" aria-label={ariaLabel ?? summary}>
        <div className="io-meter-track">
          {segments.map((segment, index) => (
            <span key={index} className="io-meter-segment io-hue" {...hueAttributes(segmentHue(segment, index), { flex: total > 0 ? segment.value : 1 })} />
          ))}
        </div>
        {legend && (
          <div className="io-meter-legend">
            {segments.map((segment, index) => (
              <span key={index} className="io-meter-legend-item io-hue" {...hueAttributes(segmentHue(segment, index))}>
                <i className="io-meter-swatch" />
                {segment.label} <b>{segment.display ?? segment.value}</b>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  const formatValue = format ?? ((current: number) => `${Math.round((current - min) / (max - min) * 100)}%`);
  const hasHue = Boolean(tone || priority || category || color);
  return (
    <BaseMeter.Root className={cx("io-meter io-hue", className)} value={value} min={min} max={max} data-size={size} aria-label={ariaLabel} aria-valuetext={formatValue(value)} {...hueAttributes({ tone: hasHue ? tone : "accent", priority, category, color })}>
      {(label != null || showValue) && (
        <div className="io-meter-header">
          {label != null && <BaseMeter.Label className="io-meter-label">{label}</BaseMeter.Label>}
          {showValue && <BaseMeter.Value className="io-meter-value">{() => formatValue(value)}</BaseMeter.Value>}
        </div>
      )}
      <BaseMeter.Track className="io-meter-track">
        <BaseMeter.Indicator className="io-meter-indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}

/**
 * The hue of a segment: its own props, or the palette slot matching its position.
 */
function segmentHue(segment: MeterSegment, index: number): HueProps {
  const { tone, priority, category, color } = segment;
  if (tone || priority || category || color) return { tone, priority, category, color };
  return { category: ((index % 8) + 1) as Category };
}

export default Meter;
