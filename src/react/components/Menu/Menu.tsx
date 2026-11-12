import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { LucideIcon } from "lucide-react";
import { cx } from "../../../cx";
import { Check } from "lucide-react";
import { Button, type ButtonProps } from "../Button/Button";
import { Icon } from "../Icon/Icon";

/**
 * Props for {@link MenuTrigger}. Renders a {@link Button} unless `render` is given.
 */
export interface MenuTriggerProps extends Omit<BaseMenu.Trigger.Props, "className">, Pick<ButtonProps, "variant" | "size" | "icon" | "iconOnly"> {
  className?: string;
}

/**
 * Props for {@link MenuContent}.
 */
export interface MenuContentProps extends Omit<BaseMenu.Popup.Props, "className"> {
  /**
   * Default is `"bottom"`.
   */
  side?: BaseMenu.Positioner.Props["side"];
  /**
   * Default is `"start"`.
   */
  align?: BaseMenu.Positioner.Props["align"];
  /**
   * Gap to the trigger in pixels. Default is `6`.
   */
  sideOffset?: number;
  container?: BaseMenu.Portal.Props["container"];
  className?: string;
}

/**
 * Props for {@link MenuItem}.
 */
export interface MenuItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  /**
   * Leading icon.
   */
  icon?: LucideIcon;
  /**
   * Trailing keyboard hint, such as `"⌘K"`.
   */
  shortcut?: ReactNode;
  /**
   * `"bad"` marks a destructive item.
   */
  tone?: "bad";
  className?: string;
}

/**
 * Props for {@link MenuCheckboxItem}.
 */
export interface MenuCheckboxItemProps extends Omit<BaseMenu.CheckboxItem.Props, "className"> {
  shortcut?: ReactNode;
  className?: string;
}

/**
 * Props for {@link MenuRadioItem}.
 */
export interface MenuRadioItemProps extends Omit<BaseMenu.RadioItem.Props, "className"> {
  shortcut?: ReactNode;
  className?: string;
}

/**
 * Opens its menu when pressed.
 */
export function MenuTrigger(props: MenuTriggerProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BaseMenu.Trigger render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * The portalled, positioned menu surface (`io-popup io-menu`).
 */
export function MenuContent(props: MenuContentProps) {
  const { side = "bottom", align = "start", sideOffset = 6, container, className, ...rest } = props;
  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner className="io-popup-positioner io-menu-positioner" side={side} align={align} sideOffset={sideOffset}>
        <BaseMenu.Popup className={cx("io-popup io-menu", className)} {...rest} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

/**
 * An action in a menu.
 */
export function MenuItem(props: MenuItemProps) {
  const { icon, shortcut, tone, className, children, ...rest } = props;
  return (
    <BaseMenu.Item className={cx("io-popup-item", className)} data-tone={tone} {...rest}>
      {icon && <Icon icon={icon} className="io-popup-item-icon" />}
      {children}
      {shortcut != null && <span className="io-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.Item>
  );
}

/**
 * A toggleable menu item with a check mark.
 */
export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const { shortcut, className, children, ...rest } = props;
  return (
    <BaseMenu.CheckboxItem className={cx("io-popup-item", className)} {...rest}>
      <BaseMenu.CheckboxItemIndicator className="io-popup-item-indicator" keepMounted><Icon icon={Check} /></BaseMenu.CheckboxItemIndicator>
      {children}
      {shortcut != null && <span className="io-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.CheckboxItem>
  );
}

/**
 * One option of a `Menu.RadioGroup`.
 */
export function MenuRadioItem(props: MenuRadioItemProps) {
  const { shortcut, className, children, ...rest } = props;
  return (
    <BaseMenu.RadioItem className={cx("io-popup-item", className)} {...rest}>
      <BaseMenu.RadioItemIndicator className="io-popup-item-indicator" keepMounted><Icon icon={Check} /></BaseMenu.RadioItemIndicator>
      {children}
      {shortcut != null && <span className="io-popup-item-shortcut">{shortcut}</span>}
    </BaseMenu.RadioItem>
  );
}

/**
 * A heading inside a `Menu.Group`.
 */
export function MenuLabel(props: Omit<BaseMenu.GroupLabel.Props, "className"> & { className?: string }) {
  const { className, ...rest } = props;
  return <BaseMenu.GroupLabel className={cx("io-popup-label", className)} {...rest} />;
}

/**
 * A divider between menu groups.
 */
export function MenuSeparator(props: { className?: string }) {
  return <BaseMenu.Separator className={cx("io-popup-separator", props.className)} />;
}

/**
 * A dropdown list of actions (Base UI Menu).
 *
 * @example
 * <Menu.Root>
 *   <Menu.Trigger variant="ghost" iconOnly icon={MoreHorizontal} aria-label="More" />
 *   <Menu.Content>
 *     <Menu.Item icon={Check} shortcut="A">Acknowledge</Menu.Item>
 *     <Menu.Separator />
 *     <Menu.Item tone="bad" icon={Trash2}>Delete</Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 */
export const Menu = {
  Root: BaseMenu.Root,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: BaseMenu.RadioGroup,
  RadioItem: MenuRadioItem,
  Group: BaseMenu.Group,
  Label: MenuLabel,
  Separator: MenuSeparator,
};

export default Menu;
