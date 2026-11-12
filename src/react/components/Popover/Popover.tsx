import type { ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cx } from "../../../cx";
import { Button, type ButtonProps } from "../Button/Button";

/**
 * Props for {@link PopoverTrigger}. Renders a {@link Button} unless `render` is given.
 */
export interface PopoverTriggerProps extends Omit<BasePopover.Trigger.Props, "className">, Pick<ButtonProps, "variant" | "size" | "icon" | "iconOnly"> {
  className?: string;
}

/**
 * Props for {@link PopoverContent}.
 */
export interface PopoverContentProps extends Omit<BasePopover.Popup.Props, "className" | "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /**
   * Default is `"bottom"`.
   */
  side?: BasePopover.Positioner.Props["side"];
  /**
   * Default is `"center"`.
   */
  align?: BasePopover.Positioner.Props["align"];
  /**
   * Gap to the trigger in pixels. Default is `8`.
   */
  sideOffset?: number;
  /**
   * Shows an arrow pointing at the trigger. Default is `false`.
   */
  showArrow?: boolean;
  container?: BasePopover.Portal.Props["container"];
  className?: string;
}

/**
 * Opens its popover when pressed.
 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BasePopover.Trigger render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * The portalled, positioned popover surface.
 */
export function PopoverContent(props: PopoverContentProps) {
  const { title, description, side = "bottom", align = "center", sideOffset = 8, showArrow, container, className, children, ...rest } = props;
  return (
    <BasePopover.Portal container={container}>
      <BasePopover.Positioner className="io-popup-positioner io-popover-positioner" side={side} align={align} sideOffset={sideOffset}>
        <BasePopover.Popup className={cx("io-popover", className)} {...rest}>
          {showArrow && <BasePopover.Arrow className="io-popover-arrow" />}
          {title != null && <BasePopover.Title className="io-popover-title">{title}</BasePopover.Title>}
          {description != null && <BasePopover.Description className="io-popover-description">{description}</BasePopover.Description>}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

/**
 * Closes its popover when pressed. Renders a {@link Button} unless `render` is given.
 */
export function PopoverClose(props: Omit<BasePopover.Close.Props, "className"> & Pick<ButtonProps, "variant" | "size" | "icon" | "iconOnly"> & { className?: string }) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BasePopover.Close render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * A floating panel anchored to a trigger (Base UI Popover).
 *
 * @example
 * <Popover.Root>
 *   <Popover.Trigger>Delivery</Popover.Trigger>
 *   <Popover.Content title="Delivery">…</Popover.Content>
 * </Popover.Root>
 */
export const Popover = {
  Root: BasePopover.Root,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
};

export default Popover;
