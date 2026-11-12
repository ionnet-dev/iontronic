import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { ControlSize } from "../../../semantic";
import { Icon } from "../Icon/Icon";

/**
 * Visual emphasis of a {@link Button}.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Props for {@link Button}. Accepts every native `<button>` attribute, including `ref`.
 */
export interface ButtonProps extends ComponentProps<"button"> {
  /**
   * `primary` uses the violet→blue gradient. Default is `"secondary"`.
   */
  variant?: ButtonVariant;
  /**
   * Height 32 / 40 / 48px. Default is `"md"`.
   */
  size?: ControlSize;
  /**
   * Icon rendered before the label (or alone with `iconOnly`).
   */
  icon?: LucideIcon;
  /**
   * Renders a round, square-sized button. Give it an `aria-label`, since there is no visible text.
   */
  iconOnly?: boolean;
  /**
   * Shows a spinner, sets `aria-busy` and `aria-disabled`, and ignores clicks while keeping its width and focus.
   */
  loading?: boolean;
  /**
   * Stretches to the container width.
   */
  fullWidth?: boolean;
}

/**
 * A pill-shaped action button. Renders a native `<button class="io-button">`.
 *
 * @example <Button variant="primary" icon={RotateCw}>Restart agent</Button>
 */
export function Button(props: ButtonProps) {
  const { variant = "secondary", size = "md", icon, iconOnly, loading, fullWidth, type = "button", disabled, className, children, onClick, ...rest } = props;
  return (
    <button
      type={type}
      className={cx("io-button io-focus", className)}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      data-loading={loading || undefined}
      data-full-width={fullWidth || undefined}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {loading && <span className="io-button-spinner" aria-hidden="true" />}
      {icon && <Icon icon={icon} size={size === "sm" ? "sm" : "md"} />}
      {!iconOnly && children != null && <span className="io-button-label">{children}</span>}
    </button>
  );
}

export default Button;
