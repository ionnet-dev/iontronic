import type { ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { Category } from "../../../semantic";

/**
 * Props for {@link NavItem}. Renders an `<a>`; pass `render={<Link to="…" />}` for router links.
 */
export interface NavItemProps extends Omit<useRender.ComponentProps<"a">, "color"> {
  icon?: LucideIcon;
  label: ReactNode;
  /**
   * Muted count on the right (unread, total).
   */
  count?: number | string;
  /**
   * Count in a priority-5 pill, for urgent items. Shown before `count` when both are set.
   */
  hotCount?: number | string;
  /**
   * Current page. Sets `aria-current="page"` and the inset spark bar.
   */
  active?: boolean;
  /**
   * `topic` shows a coloured dot instead of an icon and a mono label. Default is `"topic"` when `category` or `color`
   * is set, else `"default"`.
   */
  variant?: "default" | "topic";
  /**
   * Dot colour slot for topic items.
   */
  category?: Category;
  /**
   * Custom dot colour for topic items.
   */
  color?: string;
  disabled?: boolean;
}

/**
 * A sidebar navigation row with icon, label, counts and active state.
 *
 * @example <NavItem icon={Inbox} label="Inbox" count={12} active href="/inbox" />
 * @example <NavItem label="grid.alerts" category={1} count={3} />
 */
export function NavItem(props: NavItemProps) {
  const { render, icon, label, count, hotCount, active, variant, category, color, disabled, className, ...rest } = props;
  const resolvedVariant = variant ?? (category || color ? "topic" : "default");
  // TODO(builder D): icon / dot / label / count parts per nav-item.css (io-hue for the topic dot)
  return useRender({
    render,
    defaultTagName: "a",
    props: {
      ...rest,
      className: cx("io-nav-item io-focus", resolvedVariant === "topic" && "io-hue", className),
      "data-variant": resolvedVariant,
      "data-active": active || undefined,
      "data-disabled": disabled || undefined,
      "data-category": category,
      "aria-current": active ? "page" : undefined,
      children: label,
    },
  });
}

export default NavItem;
