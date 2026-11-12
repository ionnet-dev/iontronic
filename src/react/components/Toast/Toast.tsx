import { useMemo, type ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Icon } from "../Icon/Icon";
import { Spinner } from "../Spinner/Spinner";

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
 * Extra data carried on each Base UI toast.
 */
interface ToastData {
  tone?: ToastTone;
}

const TONE_ICONS: Record<Exclude<ToastTone, "neutral">, LucideIcon> = {
  ok: CircleCheck,
  warn: TriangleAlert,
  bad: CircleX,
  info: Info,
};

/**
 * The tone shown for a toast: the one it was given, or the one implied by a settled promise.
 */
function toneOf(toast: BaseToast.Root.ToastObject<ToastData>): ToastTone {
  if (toast.data?.tone) return toast.data.tone;
  if (toast.type === "success") return "ok";
  if (toast.type === "error") return "bad";
  return "neutral";
}

/**
 * Renders every open toast inside the portalled viewport.
 */
function ToastList() {
  const { toasts } = BaseToast.useToastManager<ToastData>();
  return (
    <>
      {toasts.map((toast) => {
        const tone = toneOf(toast);
        const loading = toast.type === "loading";
        return (
          <BaseToast.Root key={toast.id} toast={toast} className="io-toast" data-tone={tone}>
            <BaseToast.Content className="io-toast-body">
              {(loading || tone !== "neutral") && (
                <span className="io-toast-icon io-hue" data-tone={loading ? undefined : tone}>
                  {loading ? <Spinner size="lg" label="Working" /> : <Icon icon={TONE_ICONS[tone as Exclude<ToastTone, "neutral">]} size="lg" />}
                </span>
              )}
              <div className="io-toast-content">
                <BaseToast.Title className="io-toast-title" />
                <BaseToast.Description className="io-toast-description" />
              </div>
              {toast.actionProps && <BaseToast.Action className="io-toast-action" />}
              <BaseToast.Close className="io-toast-close" aria-label="Dismiss"><Icon icon={X} size="sm" /></BaseToast.Close>
            </BaseToast.Content>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

/**
 * Provides {@link useToast} and renders the toast viewport. `IontronicProvider` includes it.
 */
export function ToastProvider(props: ToastProviderProps) {
  const { children, limit = 3, timeout = 5000 } = props;
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="io-toast-viewport">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

/**
 * Converts a partial toast into Base UI's shape.
 */
function toManagerOptions(options: ToastUpdate, close: (id?: string) => void, getId: () => string) {
  const { tone, action, title, description, timeout, priority, onClose } = options;
  return {
    title,
    description,
    timeout,
    priority,
    onClose,
    data: tone ? { tone } : undefined,
    actionProps: action ? { children: action.label, onClick: () => { action.onClick(); close(getId()); } } : undefined,
  };
}

/**
 * Shows and controls toasts.
 *
 * @example
 * const toast = useToast();
 * toast.add({ title: "Silenced web-01 for 1 hour", tone: "ok", action: { label: "Undo", onClick: undo } });
 */
export function useToast(): ToastApi {
  const manager = BaseToast.useToastManager<ToastData>();
  const { add, close, update, promise } = manager;
  return useMemo<ToastApi>(() => {
    const normalize = (value: string | ToastUpdate, getId: () => string) => (typeof value === "string" ? { title: value } : toManagerOptions(value, close, getId));
    return {
      add(options) {
        let id = options.id ?? "";
        id = add({ id: options.id, ...toManagerOptions(options, close, () => id) });
        return id;
      },
      close(id) {
        close(id);
      },
      update(id, options) {
        update(id, toManagerOptions(options, close, () => id));
      },
      promise(task, options) {
        const noId = () => "";
        return promise(task, {
          loading: normalize(options.loading, noId),
          success: (value) => normalize(typeof options.success === "function" ? options.success(value) : options.success, noId),
          error: (error) => normalize(typeof options.error === "function" ? options.error(error) : options.error, noId),
        });
      },
    };
  }, [add, close, update, promise]);
}

export default ToastProvider;
