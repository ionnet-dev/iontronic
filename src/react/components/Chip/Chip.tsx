import type { ReactNode } from "react";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";
import { Icon } from "../Icon/Icon";

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
  const { children, icon, onClick, tone, priority, category, color, onRemove, removeLabel, selected, disabled, className } = props;
  const hasDot = Boolean(tone || priority || category || color);
  const interactive = onClick != null;
  const common = {
    "data-selected": selected || undefined,
    "data-disabled": disabled || undefined,
    "data-removable": onRemove ? "" : undefined,
    ...hueAttributes({ tone, priority, category, color }),
  };
  const body = (
    <>
      {hasDot && <span className="io-chip-dot" />}
      {icon && <Icon icon={icon} size="xs" className="io-chip-icon" />}
      <span className="io-chip-label">{children}</span>
    </>
  );
  const remove = onRemove && (
    <button type="button" className="io-chip-remove io-focus" aria-label={removeLabel ?? (typeof children === "string" ? `Remove ${children}` : "Remove")} disabled={disabled} onClick={onRemove}>
      <Icon icon={X} size="xs" />
    </button>
  );

  // A chip that is both a toggle and removable can't nest buttons, so the toggle covers the label and the remove button sits beside it.
  if (interactive && remove) {
    return (
      <span className={cx("io-chip io-hue", className)} data-interactive="" {...common}>
        <button type="button" className="io-chip-toggle io-focus" aria-pressed={selected ?? false} disabled={disabled} onClick={onClick}>{body}</button>
        {remove}
      </span>
    );
  }
  if (interactive) {
    return (
      <button type="button" className={cx("io-chip io-hue io-focus", className)} data-interactive="" aria-pressed={selected ?? false} disabled={disabled} onClick={onClick} {...common}>
        {body}
      </button>
    );
  }
  return (
    <span className={cx("io-chip io-hue", className)} {...common}>
      {body}
      {remove}
    </span>
  );
}

export default Chip;
