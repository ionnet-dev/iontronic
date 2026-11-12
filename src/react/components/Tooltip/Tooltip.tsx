import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/**
 * Props for {@link TooltipProvider}.
 */
export interface TooltipProviderProps {
  children: ReactNode;
  /**
   * Milliseconds before a tooltip opens. Default is `500`.
   */
  delay?: number;
  /**
   * Milliseconds before a tooltip closes. Default is `0`.
   */
  closeDelay?: number;
}

/**
 * Props for {@link Tooltip}.
 */
export interface TooltipProps {
  /**
   * Tooltip text.
   */
  content: ReactNode;
  /**
   * The trigger: a single element that accepts a ref and event props (a `Button`, an icon button).
   */
  children: ReactElement;
  /**
   * Keyboard hint shown after the text, such as `"⌘C"`.
   */
  shortcut?: ReactNode;
  /**
   * Default is `"top"`.
   */
  side?: BaseTooltip.Positioner.Props["side"];
  /**
   * Default is `"center"`.
   */
  align?: BaseTooltip.Positioner.Props["align"];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Turns the tooltip off without unwrapping the trigger.
   */
  disabled?: boolean;
}

/**
 * Shares tooltip timing so moving between triggers opens tooltips instantly. `IontronicProvider` includes it.
 */
export function TooltipProvider(props: TooltipProviderProps) {
  const { children, delay = 500, closeDelay = 0 } = props;
  return <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>{children}</BaseTooltip.Provider>;
}

/**
 * A short label shown on hover and keyboard focus (Base UI Tooltip). Uses the inverse surface.
 *
 * @example <Tooltip content="Copy link" shortcut="⌘C"><Button iconOnly icon={Link} aria-label="Copy link" /></Tooltip>
 */
export function Tooltip(props: TooltipProps) {
  const { children } = props;
  // TODO(builder C): Base UI Tooltip.Root/Trigger(render=children)/Portal/Positioner/Popup/Arrow, shortcut part
  return children;
}

export default Tooltip;
