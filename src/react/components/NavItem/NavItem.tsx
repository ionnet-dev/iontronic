import type { ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { Category } from "../../../semantic";
import { hueAttributes } from "../../utils/hue";
import { Icon } from "../Icon/Icon";

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
  const { render, icon, label, count, hotCount, active, variant, category, color, disabled, className, style, ...rest } = props;
  const resolvedVariant = variant ?? (category || color ? "topic" : "default");
  const isTopic = resolvedVariant === "topic";
  return useRender({
    render,
    defaultTagName: "a",
    props: {
      ...rest,
      ...(isTopic ? hueAttributes({ category, color }, style) : { style }),
      className: cx("io-nav-item io-focus", isTopic && "io-hue", className),
      "data-variant": resolvedVariant,
      "data-active": active || undefined,
      "data-disabled": disabled || undefined,
      "aria-current": active ? "page" : undefined,
      "aria-disabled": disabled || undefined,
      children: (
        <>
          {isTopic ? <span className="io-nav-item-dot" aria-hidden="true" /> : icon && <Icon icon={icon} size={18} className="io-nav-item-icon" />}
          <span className="io-nav-item-label">{label}</span>
          {hotCount != null && <span className="io-nav-item-count" data-hot>{hotCount}</span>}
          {count != null && <span className="io-nav-item-count">{count}</span>}
        </>
      ),
    },
  });
}

export default NavItem;
