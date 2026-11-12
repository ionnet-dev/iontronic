import type { ReactNode } from "react";
import { ToastProvider, type ToastProviderProps } from "../components/Toast/Toast";
import { TooltipProvider, type TooltipProviderProps } from "../components/Tooltip/Tooltip";
import { ThemeProvider, type ThemeProviderProps } from "./ThemeProvider";

/**
 * Props for {@link IontronicProvider}.
 */
export interface IontronicProviderProps extends Omit<ThemeProviderProps, "children"> {
  children: ReactNode;
  /**
   * Options for the toast viewport, such as `limit` and `timeout`.
   */
  toast?: Omit<ToastProviderProps, "children">;
  /**
   * Shared tooltip timing, such as `delay`.
   */
  tooltip?: Omit<TooltipProviderProps, "children">;
}

/**
 * Sets up everything Iontronic components rely on: theme, tooltip timing and the toast viewport. Place it once at the
 * app root.
 *
 * @example
 * <IontronicProvider>
 *   <App />
 * </IontronicProvider>
 */
export function IontronicProvider(props: IontronicProviderProps) {
  const { children, toast, tooltip, ...theme } = props;
  return (
    <ThemeProvider {...theme}>
      <TooltipProvider {...tooltip}>
        <ToastProvider {...toast}>{children}</ToastProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default IontronicProvider;
