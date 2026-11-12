import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import type { Tone } from "../../../semantic";
import { IconTile } from "../IconTile/IconTile";

/**
 * Props for {@link EmptyState}.
 */
export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: LucideIcon;
  /**
   * Icon tile tone. Default is `"accent"`.
   */
  tone?: Tone;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Buttons under the description.
   */
  actions?: ReactNode;
  /**
   * Default is `"md"`.
   */
  size?: "sm" | "md";
}

/**
 * A centred placeholder for empty lists and first-run screens.
 *
 * @example <EmptyState icon={Inbox} title="Inbox zero" description="Nothing needs you right now." />
 */
export function EmptyState(props: EmptyStateProps) {
  const { icon, tone = "accent", title, description, actions, size = "md", className, ...rest } = props;
  return (
    <div className={cx("io-empty-state", className)} data-size={size} {...rest}>
      {icon && <IconTile icon={icon} size="lg" tone={tone} />}
      <h3 className="io-empty-state-title io-display" data-size="sm">{title}</h3>
      {description != null && <p className="io-empty-state-description">{description}</p>}
      {actions != null && <div className="io-empty-state-actions">{actions}</div>}
    </div>
  );
}

export default EmptyState;
