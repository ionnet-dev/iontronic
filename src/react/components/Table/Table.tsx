import type { ComponentProps, CSSProperties } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link Table}.
 */
export interface TableProps extends ComponentProps<"table"> {
  /**
   * `comfortable` (default) or `compact` cell padding.
   */
  density?: "compact" | "comfortable";
  /**
   * Highlights rows on hover.
   */
  interactive?: boolean;
  /**
   * Drops the card surface around the table (for tables already inside a card).
   */
  plain?: boolean;
  /**
   * Class name for the scrolling `io-table-wrap`.
   */
  wrapClassName?: string;
  /**
   * Scrolls the table body vertically past this height (any CSS length). The header row stays pinned.
   */
  maxHeight?: string;
}

/**
 * Props for {@link TableHead} and {@link TableCell}.
 */
export interface TableCellAlignProps {
  /**
   * Default is `"start"`, or `"end"` when `numeric`.
   */
  align?: "start" | "center" | "end";
  /**
   * Mono, tabular figures, right-aligned.
   */
  numeric?: boolean;
}

/**
 * A data table on a card surface that scrolls horizontally when needed. Compose with `TableHeader`, `TableBody`,
 * `TableRow`, `TableHead` and `TableCell`.
 */
export function Table(props: TableProps) {
  const { density = "comfortable", interactive, plain, wrapClassName, maxHeight, className, ...rest } = props;
  return (
    <div className={cx("io-table-wrap", wrapClassName)} data-plain={plain || undefined} style={maxHeight ? ({ "--_max-height": maxHeight } as CSSProperties) : undefined}>
      <table className={cx("io-table", className)} data-density={density} data-interactive={interactive || undefined} {...rest} />
    </div>
  );
}

/**
 * The `<thead>` of a {@link Table}.
 */
export function TableHeader(props: ComponentProps<"thead">) {
  const { className, ...rest } = props;
  return <thead className={cx("io-table-header", className)} {...rest} />;
}

/**
 * The `<tbody>` of a {@link Table}.
 */
export function TableBody(props: ComponentProps<"tbody">) {
  const { className, ...rest } = props;
  return <tbody className={cx("io-table-body", className)} {...rest} />;
}

/**
 * A table row. `selected` highlights it.
 */
export function TableRow(props: ComponentProps<"tr"> & { selected?: boolean }) {
  const { selected, className, ...rest } = props;
  return <tr className={cx("io-table-row", className)} data-selected={selected || undefined} {...rest} />;
}

/**
 * A header cell.
 */
export function TableHead(props: Omit<ComponentProps<"th">, "align"> & TableCellAlignProps) {
  const { align, numeric, className, ...rest } = props;
  return <th className={cx("io-table-head", className)} data-align={align ?? (numeric ? "end" : undefined)} data-numeric={numeric || undefined} {...rest} />;
}

/**
 * A body cell.
 */
export function TableCell(props: Omit<ComponentProps<"td">, "align"> & TableCellAlignProps) {
  const { align, numeric, className, ...rest } = props;
  return <td className={cx("io-table-cell", className)} data-align={align ?? (numeric ? "end" : undefined)} data-numeric={numeric || undefined} {...rest} />;
}

export default Table;
