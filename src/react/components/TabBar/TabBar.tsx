import { Children, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { Icon } from "../Icon/Icon";

/**
 * Props for {@link TabBar}.
 */
export interface TabBarProps extends ComponentProps<"nav"> {
  /**
   * `<TabBarItem>` elements (3–5).
   */
  children: ReactNode;
}

/**
 * Props for {@link TabBarItem}. Renders an `<a>`; pass `render={<Link to="…" />}` for router links.
 */
export interface TabBarItemProps extends useRender.ComponentProps<"a"> {
  icon: LucideIcon;
  label: ReactNode;
  /**
   * Current page. Sets `aria-current="page"` and the accent pill behind the icon.
   */
  active?: boolean;
  /**
   * Small spark-coloured count on the icon.
   */
  badge?: number | string;
}

/**
 * Phone bottom navigation. `AppShell` shows it below the `md` breakpoint.
 *
 * @example
 * <TabBar aria-label="Main">
 *   <TabBarItem icon={Inbox} label="Inbox" active badge={3} />
 *   <TabBarItem icon={SlidersHorizontal} label="Control" />
 * </TabBar>
 */
export function TabBar(props: TabBarProps) {
  const { className, style, children, ...rest } = props;
  return (
    <nav className={cx("io-tab-bar", className)} style={{ "--_count": Children.count(children), ...style } as CSSProperties} {...rest}>
      {children}
    </nav>
  );
}

/**
 * One destination in a {@link TabBar}.
 */
export function TabBarItem(props: TabBarItemProps) {
  const { render, icon, label, active, badge, className, ...rest } = props;
  return useRender({
    render,
    defaultTagName: "a",
    props: {
      ...rest,
      className: cx("io-tab-bar-item io-focus", className),
      "data-active": active || undefined,
      "aria-current": active ? "page" : undefined,
      children: (
        <>
          <span className="io-tab-bar-icon">
            <Icon icon={icon} size={22} />
            {badge != null && <span className="io-tab-bar-badge">{badge}</span>}
          </span>
          <span className="io-tab-bar-label">{label}</span>
        </>
      ),
    },
  });
}

export default TabBar;
