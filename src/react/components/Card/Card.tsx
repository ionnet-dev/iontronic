import type { ComponentProps, ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import { cx } from "../../../cx";

/**
 * Props for {@link Card}. Pass `render` to make the card a link or button (`render={<a href="…" />}`).
 */
export interface CardProps extends useRender.ComponentProps<"div"> {
  /**
   * Inner padding: `none`, `sm` 14px (default, phone cards), `md` 18px, `lg` 24px (detail panes).
   */
  padding?: "none" | "sm" | "md" | "lg";
  /**
   * Adds hover and pointer affordance.
   */
  interactive?: boolean;
  /**
   * Selected state (accent-soft background, like a selected inbox row).
   */
  selected?: boolean;
  /**
   * Urgent state: tints the card with priority 5.
   */
  urgent?: boolean;
}

/**
 * Props for {@link CardHeader}.
 */
export interface CardHeaderProps extends Omit<ComponentProps<"div">, "title"> {
  /**
   * Leading visual, usually an `<IconTile size="sm">`.
   */
  leading?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /**
   * Trailing content (a menu, a badge, a time).
   */
  actions?: ReactNode;
}

/**
 * Props for {@link CardFooter}.
 */
export interface CardFooterProps extends ComponentProps<"div"> {
  /**
   * Stretches every child to equal width (phone card actions).
   */
  stretch?: boolean;
}

/**
 * A rounded surface with the card shadow. Compose with `CardHeader`, `CardBody` and `CardFooter`.
 *
 * @example
 * <Card urgent>
 *   <CardHeader leading={<IconTile icon={Server} size="sm" category={1} />} title="web-01 is offline" description="grid.alerts · 2 min ago" />
 *   <CardFooter stretch><Button variant="primary">Restart</Button><Button>Silence 1h</Button></CardFooter>
 * </Card>
 */
export function Card(props: CardProps) {
  const { render, padding = "sm", interactive, selected, urgent, className, ...rest } = props;
  return useRender({
    render,
    defaultTagName: "div",
    props: {
      ...rest,
      className: cx("io-card", interactive && "io-focus", className),
      "data-padding": padding,
      "data-interactive": interactive || undefined,
      "data-selected": selected || undefined,
      "data-urgent": urgent || undefined,
    },
  });
}

/**
 * Card heading row: leading visual, title and description, trailing actions.
 */
export function CardHeader(props: CardHeaderProps) {
  const { leading, title, description, actions, className, children, ...rest } = props;
  return (
    <div className={cx("io-card-header", className)} {...rest}>
      {leading}
      <div className="io-card-heading">
        {title != null && <div className="io-card-title">{title}</div>}
        {description != null && <div className="io-card-description">{description}</div>}
      </div>
      {actions != null && <div className="io-card-actions">{actions}</div>}
      {children}
    </div>
  );
}

/**
 * Main card content.
 */
export function CardBody(props: ComponentProps<"div">) {
  const { className, ...rest } = props;
  return <div className={cx("io-card-body", className)} {...rest} />;
}

/**
 * A row of card actions.
 */
export function CardFooter(props: CardFooterProps) {
  const { stretch, className, ...rest } = props;
  return <div className={cx("io-card-footer", className)} data-stretch={stretch || undefined} {...rest} />;
}

export default Card;
