import { useId, type ComponentProps, type ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { HueProps } from "../../utils/hue";

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
 * Props for {@link ListItem}. Renders an `<article>`; pass `render={<a href="…" />}` to make it a link.
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
   * Hover and pointer affordance. Default is `true` when `onClick` or `render` is set.
   */
  interactive?: boolean;
}

/**
 * A vertical list of rows (`role="list"`). Use `ListGroup` for labelled sections.
 */
export function List(props: ComponentProps<"div">) {
  const { className, ...rest } = props;
  return <div role="list" className={cx("io-list", className)} {...rest} />;
}

/**
 * A labelled section of a {@link List}.
 */
export function ListGroup(props: ListGroupProps) {
  const { label, className, children, ...rest } = props;
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className={cx("io-list-group", className)} {...rest}>
      <div id={id} className="io-list-group-label">{label}</div>
      {children}
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
  const { render, icon, leading, title, badges, description, meta, trailing, unread, selected, interactive, tone, priority, category, color, className, ...rest } = props;
  // TODO(builder D): leading IconTile, main/top/title/badges/description/meta, trailing, unread dot per list.css
  return useRender({
    render,
    defaultTagName: "article",
    props: {
      role: "listitem",
      ...rest,
      className: cx("io-list-item io-focus", className),
      "data-selected": selected || undefined,
      "data-unread": unread || undefined,
      "data-interactive": (interactive ?? Boolean(rest.onClick || render)) || undefined,
      children: title,
    },
  });
}

export default List;
