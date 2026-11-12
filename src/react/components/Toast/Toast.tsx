import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";

/**
 * Tone of a toast. Drives the icon and its colour; the surface is always the inverse surface.
 */
export type ToastTone = "neutral" | "ok" | "warn" | "bad" | "info";

/**
 * Options for a toast created with {@link useToast}.
 */
export interface ToastOptions {
  /**
   * Updates the toast in place when one with this ID is already shown.
   */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Default is `"neutral"`.
   */
  tone?: ToastTone;
  /**
   * Milliseconds before auto-dismissal. `0` keeps it until closed.
   */
  timeout?: number;
  /**
   * `"high"` announces it urgently to screen readers. Default is `"low"`.
   */
  priority?: "low" | "high";
  /**
   * An inline action, such as Undo.
   */
  action?: { label: ReactNode; onClick: () => void };
  /**
   * Called when the toast starts closing.
   */
  onClose?: () => void;
}

/**
 * A partial update applied to an open toast.
 */
export type ToastUpdate = Partial<Omit<ToastOptions, "id">>;

/**
 * Messages for {@link ToastApi.promise}. Success and error may be functions of the result.
 */
export interface ToastPromiseOptions<T> {
  loading: string | ToastUpdate;
  success: string | ToastUpdate | ((value: T) => string | ToastUpdate);
  error: string | ToastUpdate | ((error: unknown) => string | ToastUpdate);
}

/**
 * The API returned by {@link useToast}.
 */
export interface ToastApi {
  /**
   * Shows a toast and returns its ID.
   */
  add(options: ToastOptions): string;
  /**
   * Closes the toast with this ID, or all toasts when omitted.
   */
  close(id?: string): void;
  /**
   * Changes an open toast.
   */
  update(id: string, options: ToastUpdate): void;
  /**
   * Shows a loading toast that becomes a success or error toast when the promise settles.
   */
  promise<T>(promise: Promise<T>, options: ToastPromiseOptions<T>): Promise<T>;
}

/**
 * Props for {@link ToastProvider}.
 */
export interface ToastProviderProps {
  children: ReactNode;
  /**
   * Maximum visible toasts. Older ones stack behind. Default is `3`.
   */
  limit?: number;
  /**
   * Default auto-dismiss time in milliseconds. Default is `5000`.
   */
  timeout?: number;
}

/**
 * Provides {@link useToast} and renders the toast viewport. `IontronicProvider` includes it.
 */
export function ToastProvider(props: ToastProviderProps) {
  const { children, limit = 3, timeout = 5000 } = props;
  // TODO(builder C): render <BaseToast.Portal><BaseToast.Viewport className="io-toast-viewport"> with the toast list
  return <BaseToast.Provider limit={limit} timeout={timeout}>{children}</BaseToast.Provider>;
}

/**
 * Shows and controls toasts.
 *
 * @example
 * const toast = useToast();
 * toast.add({ title: "Silenced web-01 for 1 hour", tone: "ok", action: { label: "Undo", onClick: undo } });
 */
export function useToast(): ToastApi {
  // TODO(builder C): wrap BaseToast.useToastManager(); map tone/action to Base UI fields
  return {
    add: () => "",
    close: () => { },
    update: () => { },
    promise: (promise) => promise,
  };
}

export default ToastProvider;
