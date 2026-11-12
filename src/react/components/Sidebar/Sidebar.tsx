import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link Sidebar}.
 */
export interface SidebarProps extends ComponentProps<"nav"> {
  /**
   * App name next to the logo.
   */
  brand?: ReactNode;
  /**
   * Logo mark content (an `<Icon>`), drawn on the violet→orange logo gradient.
   */
  logo?: ReactNode;
  /**
   * Content pinned to the bottom (account, settings).
   */
  footer?: ReactNode;
}

/**
 * Props for {@link NavSection}.
 */
export interface NavSectionProps extends ComponentProps<"div"> {
  /**
   * Uppercase mono section label.
   */
  label: ReactNode;
  /**
   * Small control next to the label (an add button).
   */
  action?: ReactNode;
}

/**
 * The deep-indigo navigation column (same in both themes). Holds `NavItem`s and `NavSection`s.
 *
 * @example
 * <Sidebar brand="Ping" logo={<Icon icon={Bell} />}>
 *   <NavItem icon={Inbox} label="Inbox" count={12} active />
 *   <NavSection label="Topics">…</NavSection>
 * </Sidebar>
 */
export function Sidebar(props: SidebarProps) {
  const { brand, logo, footer, className, children, ...rest } = props;
  return (
    <nav className={cx("io-sidebar", className)} {...rest}>
      {(brand != null || logo != null) && (
        <div className="io-sidebar-brand">
          {logo != null && <span className="io-sidebar-logo">{logo}</span>}
          {brand != null && <span className="io-sidebar-name">{brand}</span>}
        </div>
      )}
      <div className="io-sidebar-nav">{children}</div>
      {footer != null && <div className="io-sidebar-footer">{footer}</div>}
    </nav>
  );
}

/**
 * A labelled group of nav items inside a {@link Sidebar}.
 */
export function NavSection(props: NavSectionProps) {
  const { label, action, className, children, ...rest } = props;
  return (
    <div className={cx("io-nav-section", className)} {...rest}>
      <div className="io-nav-section-header">
        <span className="io-nav-section-label">{label}</span>
        {action != null && <span className="io-nav-section-action">{action}</span>}
      </div>
      {children}
    </div>
  );
}

export default Sidebar;
