import type { ComponentProps, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cx } from "../../../cx";
import { X } from "lucide-react";
import { Button, type ButtonProps } from "../Button/Button";

/**
 * Maximum width of a dialog: `sm` 24rem, `md` 32rem, `lg` 44rem. Below the `md` breakpoint every dialog is a bottom sheet.
 */
export type DialogSize = "sm" | "md" | "lg";

/**
 * Button look props forwarded to the {@link Button} that triggers and close parts render.
 */
export type DialogButtonLookProps = Pick<ButtonProps, "variant" | "size" | "icon" | "iconOnly">;

/**
 * Props for {@link DialogTrigger}. Renders a {@link Button} unless `render` is given.
 */
export interface DialogTriggerProps extends Omit<BaseDialog.Trigger.Props, "className">, DialogButtonLookProps {
  className?: string;
}

/**
 * Props for {@link DialogClose}. Renders a {@link Button} unless `render` is given.
 */
export interface DialogCloseProps extends Omit<BaseDialog.Close.Props, "className">, DialogButtonLookProps {
  className?: string;
}

/**
 * Props for {@link DialogContent}.
 */
export interface DialogContentProps extends Omit<BaseDialog.Popup.Props, "className" | "title"> {
  /**
   * Heading, announced as the dialog's accessible name.
   */
  title?: ReactNode;
  /**
   * Supporting text under the title, announced as the description.
   */
  description?: ReactNode;
  /**
   * Default is `"md"`.
   */
  size?: DialogSize;
  /**
   * Shows a close button in the header. Default is `true`.
   */
  showClose?: boolean;
  /**
   * Element the dialog portals into. Default is `document.body`.
   */
  container?: BaseDialog.Portal.Props["container"];
  className?: string;
}

/**
 * Opens its dialog when pressed.
 */
export function DialogTrigger(props: DialogTriggerProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BaseDialog.Trigger render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * Closes its dialog when pressed.
 */
export function DialogClose(props: DialogCloseProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BaseDialog.Close render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * The portalled popup with backdrop, header and focus trap. Put `Dialog.Body` and `Dialog.Footer` inside it.
 */
export function DialogContent(props: DialogContentProps) {
  const { title, description, size = "md", showClose = true, container, className, children, ...rest } = props;
  const hasHeader = title != null || description != null;
  return (
    <BaseDialog.Portal container={container}>
      <BaseDialog.Backdrop className="io-dialog-backdrop" />
      <BaseDialog.Viewport className="io-dialog-viewport">
        <BaseDialog.Popup className={cx("io-dialog", className)} data-size={size} {...rest}>
          {(hasHeader || showClose) && (
            <div className="io-dialog-header">
              <div className="io-dialog-heading">
                {title != null && <BaseDialog.Title className="io-dialog-title io-display" data-size="sm">{title}</BaseDialog.Title>}
                {description != null && <BaseDialog.Description className="io-dialog-description">{description}</BaseDialog.Description>}
              </div>
              {showClose && <BaseDialog.Close render={<Button variant="ghost" size="sm" iconOnly icon={X} className="io-dialog-close" aria-label="Close" />} />}
            </div>
          )}
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

/**
 * Scrollable main content of a dialog.
 */
export function DialogBody(props: ComponentProps<"div">) {
  const { className, ...rest } = props;
  return <div className={cx("io-dialog-body", className)} {...rest} />;
}

/**
 * A right-aligned row of actions at the bottom of a dialog.
 */
export function DialogFooter(props: ComponentProps<"div">) {
  const { className, ...rest } = props;
  return <div className={cx("io-dialog-footer", className)} {...rest} />;
}

/**
 * A modal window that traps focus until dismissed. On phones it renders as a bottom sheet.
 *
 * @example
 * <Dialog.Root>
 *   <Dialog.Trigger>Silence</Dialog.Trigger>
 *   <Dialog.Content title="Silence web-01" description="Alerts still arrive, without sound.">
 *     <Dialog.Body>…</Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close>Cancel</Dialog.Close>
 *       <Button variant="primary">Silence 1h</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};

export default Dialog;
