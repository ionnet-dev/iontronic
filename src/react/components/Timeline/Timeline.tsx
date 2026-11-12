import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../../cx";
import { hueAttributes, type HueProps } from "../../utils/hue";

/**
 * Props for {@link TimelineItem}. The dot colour comes from {@link HueProps} (default tone `ok`).
 */
export interface TimelineItemProps extends Omit<ComponentProps<"li">, "title" | "color">, HueProps {
  /**
   * Bold event name ("Fired", "Delivered").
   */
  title: ReactNode;
  /**
   * Muted detail after the title.
   */
  description?: ReactNode;
  /**
   * Mono timestamp. Strings render inside `<time>`.
   */
  time?: ReactNode;
}

/**
 * An ordered list of events, such as a message's delivery history.
 *
 * @example
 * <Timeline>
 *   <TimelineItem title="Fired" description="17:00 from Grid" />
 *   <TimelineItem title="Escalating" description="in 3 min unless acknowledged" priority={4} />
 * </Timeline>
 */
export function Timeline(props: ComponentProps<"ol">) {
  const { className, ...rest } = props;
  return <ol className={cx("io-timeline", className)} {...rest} />;
}

/**
 * One event in a {@link Timeline}.
 */
export function TimelineItem(props: TimelineItemProps) {
  const { title, description, time, tone = "ok", priority, category, color, className, style, ...rest } = props;
  // TODO(builder D): time part
  return (
    <li className={cx("io-timeline-item io-hue", className)} {...hueAttributes({ tone, priority, category, color }, style)} {...rest}>
      <span className="io-timeline-dot" />
      <div className="io-timeline-content">
        <span className="io-timeline-title">{title}</span>
        {description != null && <span className="io-timeline-description">{description}</span>}
      </div>
    </li>
  );
}

export default Timeline;
