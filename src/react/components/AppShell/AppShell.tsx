import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../../cx";

/**
 * Props for {@link AppShell}.
 */
export interface AppShellProps extends ComponentProps<"div"> {
  /**
   * Desktop sidebar, usually a `<Sidebar>`. Hidden below the `md` breakpoint.
   */
  sidebar?: ReactNode;
  /**
   * Phone bottom navigation, usually a `<TabBar>`. Shown only below the `md` breakpoint.
   */
  tabBar?: ReactNode;
}

/**
 * The app frame: backdrop gradient, sidebar + main on desktop, main + bottom tab bar on phones (with safe-area insets).
 *
 * @example <AppShell sidebar={<Sidebar brand="Ping">…</Sidebar>} tabBar={<TabBar>…</TabBar>}>…</AppShell>
 */
export function AppShell(props: AppShellProps) {
  const { sidebar, tabBar, className, children, ...rest } = props;
  return (
    <div className={cx("io-app-shell io-backdrop", className)} data-has-sidebar={sidebar != null || undefined} data-has-tab-bar={tabBar != null || undefined} {...rest}>
      {sidebar != null && <div className="io-app-shell-sidebar">{sidebar}</div>}
      <main className="io-app-shell-main">{children}</main>
      {tabBar != null && <div className="io-app-shell-tab-bar">{tabBar}</div>}
    </div>
  );
}

export default AppShell;
