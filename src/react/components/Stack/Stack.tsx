import type { ComponentProps, CSSProperties } from "react";
import { cx } from "../../../cx";
import type { SpaceKey } from "../../../tokens";

/**
 * Props for {@link Stack}.
 */
export interface StackProps extends ComponentProps<"div"> {
  /**
   * Default is `"column"`.
   */
  direction?: "row" | "column";
  /**
   * Space-token key in pixels (`"12"` → `--io-space-12`). Default is `"12"`.
   */
  gap?: SpaceKey;
  /**
   * Cross-axis alignment (`align-items`).
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /**
   * Main-axis distribution (`justify-content`).
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Lets children wrap onto new lines.
   */
  wrap?: boolean;
  /**
   * Renders as `inline-flex`.
   */
  inline?: boolean;
}

/**
 * Lays children out in a row or column with a token gap. Use it instead of writing flexbox CSS.
 *
 * @example <Stack direction="row" gap="8" align="center">…</Stack>
 */
export function Stack(props: StackProps) {
  const { direction = "column", gap = "12", align, justify, wrap, inline, className, style, ...rest } = props;
  return (
    <div
      className={cx("io-stack", className)}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      data-inline={inline || undefined}
      style={{ "--_gap": `var(--io-space-${gap})`, ...style } as CSSProperties}
      {...rest}
    />
  );
}

export default Stack;
