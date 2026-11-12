import type { ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";

/**
 * Props for {@link TabsList}.
 */
export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  /**
   * `line` (default) underlines the active tab; `pill` looks like a segmented control.
   */
  variant?: "line" | "pill";
  className?: string;
}

/**
 * Props for {@link TabsTab}.
 */
export interface TabsTabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  icon?: LucideIcon;
  /**
   * Small mono count after the label.
   */
  count?: ReactNode;
  className?: string;
}

/**
 * The tab strip. Renders the active-tab indicator itself.
 */
export function TabsList(props: TabsListProps) {
  const { variant = "line", className, children, ...rest } = props;
  return (
    <BaseTabs.List className={cx("io-tabs-list", className)} data-variant={variant} {...rest}>
      {children}
      <BaseTabs.Indicator className="io-tabs-indicator" />
    </BaseTabs.List>
  );
}

/**
 * One tab.
 */
export function TabsTab(props: TabsTabProps) {
  const { icon, count, className, children, ...rest } = props;
  // TODO(builder D): icon and io-tabs-count parts
  return <BaseTabs.Tab className={cx("io-tabs-tab io-focus", className)} {...rest}>{children}</BaseTabs.Tab>;
}

/**
 * Content for one tab.
 */
export function TabsPanel(props: Omit<BaseTabs.Panel.Props, "className"> & { className?: string }) {
  const { className, ...rest } = props;
  return <BaseTabs.Panel className={cx("io-tabs-panel", className)} {...rest} />;
}

/**
 * The tabs root.
 */
export function TabsRoot(props: Omit<BaseTabs.Root.Props, "className"> & { className?: string }) {
  const { className, ...rest } = props;
  return <BaseTabs.Root className={cx("io-tabs", className)} {...rest} />;
}

/**
 * Switches between panels in place (Base UI Tabs).
 *
 * @example
 * <Tabs.Root defaultValue="overview">
 *   <Tabs.List><Tabs.Tab value="overview">Overview</Tabs.Tab><Tabs.Tab value="rules" count={4}>Rules</Tabs.Tab></Tabs.List>
 *   <Tabs.Panel value="overview">…</Tabs.Panel>
 * </Tabs.Root>
 */
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};

export default Tabs;
