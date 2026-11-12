import { Children, isValidElement, useId, type ComponentProps, type ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { HueProps } from "../../utils/hue";
import { IconTile } from "../IconTile/IconTile";

/**
 * Props for {@link ListGroup}.
 */
export interface ListGroupProps extends ComponentProps<"div"> {
  /**
   * Uppercase mono group label, such as a day ("Today").
   */
  label: ReactNode;
}

/**
 * Props for {@link ListItem}. The row is an `<article>`; with `onClick` it is a `<button>`, and `render={<a href="…" />}`
 * makes it a link. It always sits inside a `role="listitem"` wrapper, so the link or button keeps its own role.
 */
export interface ListItemProps extends Omit<useRender.ComponentProps<"article">, "title" | "color">, HueProps {
  /**
   * Leading icon, shown in an `IconTile` coloured by the hue props. Ignored when `leading` is set.
   */
  icon?: LucideIcon;
  /**
   * Custom leading content (an `Avatar`, a custom `IconTile`).
   */
  leading?: ReactNode;
  title: ReactNode;
  /**
   * Badges or chips next to the title.
   */
  badges?: ReactNode;
  /**
   * Muted body line, clamped to two lines.
   */
  description?: ReactNode;
  /**
   * Small muted line under the description (topic, source).
   */
  meta?: ReactNode;
  /**
   * Right column content. Strings render as a mono timestamp.
   */
  trailing?: ReactNode;
  /**
   * Shows the spark unread dot.
   */
  unread?: boolean;
  /**
   * Selected state (accent-soft background).
   */
  selected?: boolean;
  /**
   * Tighter padding and an unclamped description.
   */
  dense?: boolean;
  /**
   * Hover and pointer affordance. Default is `true` when `onClick` or `render` is set.
   */
  interactive?: boolean;
  /**
   * Accessible name of the unread dot. Default is `"Unread"`.
   */
  unreadLabel?: string;
}

/**
 * A vertical list of rows. It is a `role="list"` unless it holds `ListGroup`s, which carry their own lists. Pass `role` to
 * override.
 */
export function List(props: ComponentProps<"div">) {
  const { className, children, ...rest } = props;
  const hasGroups = Children.toArray(children).some((child) => isValidElement(child) && child.type === ListGroup);
  return <div role={hasGroups ? undefined : "list"} className={cx("io-list", className)} {...rest}>{children}</div>;
}

/**
 * A labelled section of a {@link List}: a `role="group"` named by its label that contains its own list of rows.
 */
export function ListGroup(props: ListGroupProps) {
  const { label, className, children, ...rest } = props;
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className={cx("io-list-group", className)} {...rest}>
      <div id={id} className="io-list-group-label">{label}</div>
      <div role="list" className="io-list-group-items">{children}</div>
    </div>
  );
}

/**
 * An inbox-style row: icon tile, title with badges, description, meta, trailing time and an unread dot.
 *
 * @example
 * <ListItem icon={Server} category={1} title="web-01 is offline" badges={<Badge priority={5} />}
 *   description="No heartbeat for more than 5 min." meta={<span className="io-mono">grid.alerts</span>} trailing="17:00" unread selected />
 */
export function ListItem(props: ListItemProps) {
  const { render, icon, leading, title, badges, description, meta, trailing, unread, unreadLabel = "Unread", selected, dense, interactive, tone, priority, category, color, className, ...rest } = props;
  const leadingNode = leading ?? (icon && <IconTile icon={icon} size="md" tone={tone} priority={priority} category={category} color={color} />);
  const isButton = !render && Boolean(rest.onClick);
  const row = useRender({
    render,
    defaultTagName: isButton ? "button" : "article",
    props: {
      type: isButton ? "button" : undefined,
      ...rest,
      className: cx("io-list-item io-focus", className),
      "data-selected": selected || undefined,
      "data-unread": unread || undefined,
      "data-dense": dense || undefined,
      "data-interactive": (interactive ?? Boolean(rest.onClick || render)) || undefined,
      "aria-current": selected && (render || isButton) ? "true" : undefined,
      children: (
        <>
          {leadingNode != null && leadingNode !== false && <span className="io-list-item-leading">{leadingNode}</span>}
          <span className="io-list-item-main">
            <span className="io-list-item-top">
              <span className="io-list-item-title">{title}</span>
              {badges != null && <span className="io-list-item-badges">{badges}</span>}
            </span>
            {description != null && <span className="io-list-item-description">{description}</span>}
            {meta != null && <span className="io-list-item-meta">{meta}</span>}
          </span>
          {trailing != null && (
            <span className="io-list-item-trailing">
              {typeof trailing === "string" || typeof trailing === "number" ? <time className="io-list-item-time">{trailing}</time> : trailing}
            </span>
          )}
          {unread && <span className="io-list-item-unread" role="img" aria-label={unreadLabel} />}
        </>
      ),
    },
  });
  return <div role="listitem" className="io-list-entry">{row}</div>;
}

export default List;
