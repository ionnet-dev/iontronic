import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";

/**
 * Props for {@link Chip}. A `category`, `tone` or `color` adds a coloured dot.
 */
export interface ChipProps extends HueProps {
  children: ReactNode;
  icon?: LucideIcon;
  /**
   * Makes the chip a toggle button (filters). Set `selected` to show its state.
   */
  onClick?: () => void;
  /**
   * Selected state for interactive chips.
   */
  selected?: boolean;
  /**
   * Shows a remove button and calls this when it's pressed.
   */
  onRemove?: () => void;
  /**
   * Accessible name of the remove button. Default is `"Remove"` followed by the chip text when it's a string.
   */
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A pill for topics, tags and filters, in the mono face.
 *
 * @example <Chip category={categoryFor("grid.alerts")}>grid.alerts</Chip>
 * @example <Chip onRemove={() => removeTag(tag)}>machine:web-01</Chip>
 */
export function Chip(props: ChipProps) {
  const { children, tone, priority, category, color, onRemove, selected, disabled, className } = props;
  const hasDot = Boolean(tone || priority || category || color);
  // TODO(builder C): interactive (button) form, icon, remove button
  return (
    <span className={cx("io-chip io-hue", className)} data-selected={selected || undefined} data-removable={onRemove ? "" : undefined} data-disabled={disabled || undefined} {...hueAttributes({ tone, priority, category, color })}>
      {hasDot && <span className="io-chip-dot" />}
      <span className="io-chip-label">{children}</span>
    </span>
  );
}

export default Chip;
