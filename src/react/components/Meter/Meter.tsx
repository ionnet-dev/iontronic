import type { ReactNode } from "react";
import { cx } from "../../../cx";
import type { HueProps } from "../../utils/hue";

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
  const { segments, size = "md", className } = props;
  // TODO(builder C): single mode on Base UI Meter; segmented mode with role="img" + aria-label summary and legend
  return (
    <div className={cx("io-meter io-hue", className)} data-size={size} data-segmented={segments ? "" : undefined}>
      <div className="io-meter-track" />
    </div>
  );
}

export default Meter;
