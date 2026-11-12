import type { ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cx } from "../../../cx";
import { Button } from "../Button/Button";
import { DialogBody, DialogFooter, type DialogButtonLookProps, type DialogSize } from "../Dialog/Dialog";

/**
 * Props for {@link AlertDialogTrigger}. Renders a {@link Button} unless `render` is given.
 */
export interface AlertDialogTriggerProps extends Omit<BaseAlertDialog.Trigger.Props, "className">, DialogButtonLookProps {
  className?: string;
}

/**
 * Props for {@link AlertDialogClose}. Renders a {@link Button} unless `render` is given.
 */
export interface AlertDialogCloseProps extends Omit<BaseAlertDialog.Close.Props, "className">, DialogButtonLookProps {
  className?: string;
}

/**
 * Props for {@link AlertDialogContent}.
 */
export interface AlertDialogContentProps extends Omit<BaseAlertDialog.Popup.Props, "className" | "title"> {
  /**
   * Heading, required for alert dialogs.
   */
  title: ReactNode;
  /**
   * Explains the consequence of the action being confirmed.
   */
  description?: ReactNode;
  /**
   * Default is `"sm"`.
   */
  size?: DialogSize;
  container?: BaseAlertDialog.Portal.Props["container"];
  className?: string;
}

/**
 * Opens its alert dialog when pressed.
 */
export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BaseAlertDialog.Trigger render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * Closes its alert dialog. Use it for both cancel and confirm; put the action in `onClick`.
 */
export function AlertDialogClose(props: AlertDialogCloseProps) {
  const { variant, size, icon, iconOnly, render, ...rest } = props;
  return <BaseAlertDialog.Close render={render ?? <Button variant={variant} size={size} icon={icon} iconOnly={iconOnly} />} {...rest} />;
}

/**
 * The portalled alert popup. It can't be dismissed by clicking outside. Shares `dialog.css` (`data-alert`).
 */
export function AlertDialogContent(props: AlertDialogContentProps) {
  const { title, description, size = "sm", container, className, children, ...rest } = props;
  // TODO(builder C): header markup as DialogContent (no close button)
  return (
    <BaseAlertDialog.Portal container={container}>
      <BaseAlertDialog.Backdrop className="io-dialog-backdrop" />
      <BaseAlertDialog.Viewport className="io-dialog-viewport">
        <BaseAlertDialog.Popup className={cx("io-dialog", className)} data-size={size} data-alert="" {...rest}>
          <BaseAlertDialog.Title className="io-dialog-title">{title}</BaseAlertDialog.Title>
          {description != null && <BaseAlertDialog.Description className="io-dialog-description">{description}</BaseAlertDialog.Description>}
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}

/**
 * A confirmation dialog for destructive actions.
 *
 * @example
 * <AlertDialog.Root>
 *   <AlertDialog.Trigger variant="danger">Revoke</AlertDialog.Trigger>
 *   <AlertDialog.Content title="Revoke this device?" description="It stops receiving messages immediately.">
 *     <AlertDialog.Footer>
 *       <AlertDialog.Close>Cancel</AlertDialog.Close>
 *       <AlertDialog.Close variant="danger" onClick={revoke}>Revoke</AlertDialog.Close>
 *     </AlertDialog.Footer>
 *   </AlertDialog.Content>
 * </AlertDialog.Root>
 */
export const AlertDialog = {
  Root: BaseAlertDialog.Root,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: AlertDialogClose,
};

export default AlertDialog;
