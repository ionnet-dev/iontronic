import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cx } from "../../../cx";
import { Icon } from "../Icon/Icon";

/**
 * Props for {@link AccordionRoot}.
 */
export interface AccordionRootProps extends Omit<BaseAccordion.Root.Props, "className"> {
  /**
   * `separated` (default) draws each item as its own rounded surface; `divided` separates items with lines.
   */
  variant?: "separated" | "divided";
  className?: string;
}

/**
 * The accordion root.
 */
export function AccordionRoot(props: AccordionRootProps) {
  const { variant = "separated", className, ...rest } = props;
  return <BaseAccordion.Root className={cx("io-accordion", className)} data-variant={variant} {...rest} />;
}

/**
 * One collapsible section.
 */
export function AccordionItem(props: Omit<BaseAccordion.Item.Props, "className"> & { className?: string }) {
  const { className, ...rest } = props;
  return <BaseAccordion.Item className={cx("io-accordion-item", className)} {...rest} />;
}

/**
 * The header button of an item. Renders the header element and chevron itself.
 */
export function AccordionTrigger(props: Omit<BaseAccordion.Trigger.Props, "className"> & { className?: string }) {
  const { className, children, ...rest } = props;
  return (
    <BaseAccordion.Header className="io-accordion-header">
      <BaseAccordion.Trigger className={cx("io-accordion-trigger io-focus", className)} {...rest}>
        {children}
        <Icon icon={ChevronDown} size="md" className="io-accordion-icon" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

/**
 * The collapsible content of an item.
 */
export function AccordionPanel(props: Omit<BaseAccordion.Panel.Props, "className"> & { className?: string }) {
  const { className, children, ...rest } = props;
  return (
    <BaseAccordion.Panel className={cx("io-accordion-panel", className)} {...rest}>
      <div className="io-accordion-content">{children}</div>
    </BaseAccordion.Panel>
  );
}

/**
 * Stacked sections that expand and collapse (Base UI Accordion).
 *
 * @example
 * <Accordion.Root>
 *   <Accordion.Item value="quiet"><Accordion.Trigger>Quiet hours</Accordion.Trigger><Accordion.Panel>…</Accordion.Panel></Accordion.Item>
 * </Accordion.Root>
 */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
};

export default Accordion;
