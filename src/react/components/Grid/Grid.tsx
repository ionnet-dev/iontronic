import type { ComponentProps, CSSProperties } from "react";
import { cx } from "../../../cx";
import type { SpaceKey } from "../../../tokens";

/**
 * Props for {@link Grid}.
 */
export interface GridProps extends ComponentProps<"div"> {
  /**
   * A number of equal columns, or a raw `grid-template-columns` value (`"240px minmax(0, 1fr)"`).
   */
  columns?: number | string;
  /**
   * Minimum child width for a responsive auto-fill grid (`"16rem"`). Ignored when `columns` is set.
   */
  minChildWidth?: string;
  /**
   * Space-token key in pixels. Default is `"12"`.
   */
  gap?: SpaceKey;
}

/**
 * A CSS grid with equal columns, a raw template, or responsive auto-fill columns.
 *
 * @example <Grid columns={4} gap="8">…tiles…</Grid>
 */
export function Grid(props: GridProps) {
  const { columns, minChildWidth, gap = "12", className, style, ...rest } = props;
  const vars: Record<string, string | number> = { "--_gap": `var(--io-space-${gap})` };
  if (typeof columns === "number") vars["--_columns"] = columns;
  else if (typeof columns === "string") vars["--_template"] = columns;
  else if (minChildWidth) vars["--_min"] = minChildWidth;
  return <div className={cx("io-grid", className)} style={{ ...vars, ...style } as CSSProperties} {...rest} />;
}

export default Grid;
