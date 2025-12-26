import { Toast } from "@base-ui/react";
import CircleAlertIcon from "../icons/circle-alert-icon";
import CircleCheckIcon from "../icons/circle-check-icon";
import InfoIcon from "../icons/info-icon";
import TriangleAlertIcon from "../icons/triangle-alert-icon";
import SpinnerIcon from "../icons/spinner-icon";

import { cn } from "../utils";
import { buttonVariants } from "./button";
import CloseIcon from "../icons/close-icon";

const toast = Toast.createToastManager();
const anchoredToast = Toast.createToastManager();

type ToastVariants =
  | "success"
  | "info"
  | "loading"
  | "success"
  | "warning"
  | "error";

const TOAST_ICONS: Record<ToastVariants, any> = {
  error: CircleAlertIcon,
  info: InfoIcon,
  loading: SpinnerIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
} as const;

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition;
}

function ToastProvider({
  children,
  position = "top-center",
  ...props
}: ToastProviderProps) {
  return (
    <Toast.Provider toastManager={toast} {...props}>
      {children}
      <Toasts position={position} />
    </Toast.Provider>
  );
}

function Toasts(props: { position: ToastPosition }) {
  const { position = "top-center" } = props;
  const { toasts } = Toast.useToastManager();

  const isTop = position.startsWith("top");
  const hasLoadingToast = toasts.some((t) => t.type === "loading");

  return (
    <Toast.Portal data-slot="toast-portal">
      {hasLoadingToast && (
        <div
          className="bg-ppx-foreground/20 fixed inset-0 z-40 transition-opacity"
          data-slot="toast-backdrop"
        />
      )}
      <Toast.Viewport
        className={cn(
          "max-w-90 fixed z-50 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]",
          // Vertical positioning
          "data-[position*=top]:top-(--toast-inset)",
          "data-[position*=bottom]:bottom-(--toast-inset)",
          // Horizontal positioning
          "data-[position*=left]:left-(--toast-inset)",
          "data-[position*=right]:right-(--toast-inset)",
          "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2",
        )}
        data-position={position}
        data-slot="toast-viewport"
      >
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;

          return (
            <Toast.Root
              className={cn(
                "h-(--toast-calc-height) bg-ppx-background text-ppx-foreground rounded-ppx-m border-ppx-neutral-4 absolute z-[calc(9999-var(--toast-index))] w-full select-none border bg-clip-padding shadow-lg [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-ppx-m)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)]",
                // Base positioning using data-position
                "data-[position*=right]:left-auto data-[position*=right]:right-0",
                "data-[position*=left]:left-0 data-[position*=left]:right-auto",
                "data-[position*=center]:left-0 data-[position*=center]:right-0",
                "data-[position*=top]:bottom-auto data-[position*=top]:top-0 data-[position*=top]:origin-top",
                "data-[position*=bottom]:bottom-0 data-[position*=bottom]:top-auto data-[position*=bottom]:origin-bottom",
                // Gap fill for hover
                "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
                "data-[position*=top]:after:top-full",
                "data-[position*=bottom]:after:bottom-full",
                // Define some variables
                "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]",
                // Define offset-y variable
                "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
                "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
                // Default state transform
                "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                // Limited state
                "data-limited:opacity-0",
                // Expanded state
                "data-expanded:h-(--toast-height)",
                "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
                // Starting and ending animations
                "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
                "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
                "data-ending-style:opacity-0",
                // Ending animations (direction-aware)
                "data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))]",
                "data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
                "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
                "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
                // Ending animations (expanded)
                "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
                "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
                "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
                toast.type === "success" && "bg-ppx-green-1",
                toast.type === "info" && "bg-ppx-primary-b-1",
                toast.type === "warning" && "bg-ppx-yellow-1",
                toast.type === "error" && "bg-ppx-red-1",
              )}
              data-position={position}
              key={toast.id}
              swipeDirection={
                position.includes("center")
                  ? [isTop ? "up" : "down"]
                  : position.includes("left")
                    ? ["left", isTop ? "up" : "down"]
                    : ["right", isTop ? "up" : "down"]
              }
              toast={toast}
            >
              <Toast.Content className="duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100 text-ppx-sm pointer-events-auto flex flex-col gap-2.5 overflow-hidden px-3.5 py-4 transition-opacity">
                <div className="flex gap-2">
                  {Icon && (
                    <div
                      className="[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                      data-slot="toast-icon"
                    >
                      <Icon className="in-data-[type=loading]:animate-spin in-data-[type=error]:text-ppx-red-5 in-data-[type=info]:text-ppx-primary-b-5 in-data-[type=success]:text-ppx-green-5 in-data-[type=warning]:text-ppx-yellow-5 in-data-[type=loading]:opacity-80" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <Toast.Title
                      className="text-ppx-base font-medium leading-none"
                      data-slot="toast-title"
                    />
                    <Toast.Description
                      className="text-ppx-muted-foreground"
                      data-slot="toast-description"
                    />

                    {toast.type === "loading" ? null : (
                      <Toast.Close
                        className={buttonVariants({
                          size: "icon-sm",
                          variant: "ghost",
                          className: "absolute right-2 top-2 shrink-0",
                        })}
                        aria-label="Close"
                      >
                        <CloseIcon className="size-4" />
                      </Toast.Close>
                    )}
                  </div>
                </div>
                {toast.actionProps && (
                  <Toast.Action
                    className={buttonVariants({
                      size: "sm",
                    })}
                    data-slot="toast-action"
                  >
                    {toast.actionProps.children}
                  </Toast.Action>
                )}
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function AnchoredToastProvider({ children, ...props }: Toast.Provider.Props) {
  return (
    <Toast.Provider toastManager={anchoredToast} {...props}>
      {children}
      <AnchoredToasts />
    </Toast.Provider>
  );
}

function AnchoredToasts() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal data-slot="toast-portal-anchored">
      <Toast.Viewport
        className="outline-none"
        data-slot="toast-viewport-anchored"
      >
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;
          const tooltipStyle =
            (toast.data as { tooltipStyle?: boolean })?.tooltipStyle ?? false;
          const positionerProps = toast.positionerProps;

          if (!positionerProps?.anchor) {
            return null;
          }

          return (
            <Toast.Positioner
              className="z-50 max-w-[min(--spacing(64),var(--available-width))]"
              data-slot="toast-positioner"
              key={toast.id}
              sideOffset={positionerProps.sideOffset ?? 4}
              toast={toast}
            >
              <Toast.Root
                className={cn(
                  "bg-ppx-background text-ppx-foreground data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 text-ppx-sm relative text-balance border bg-clip-padding transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)]",
                  tooltipStyle
                    ? "rounded-ppx-m shadow-md shadow-black/5 before:rounded-[calc(var(--radius-ppx-s)-1px)]"
                    : "rounded-ppx-l shadow-lg before:rounded-[calc(var(--radius-ppx-m)-1px)]",
                  toast.type === "success" && "bg-ppx-green-1",
                  toast.type === "info" && "bg-ppx-primary-b-1",
                  toast.type === "warning" && "bg-ppx-yellow-1",
                  toast.type === "error" && "bg-ppx-red-1",
                )}
                data-slot="toast-popup"
                toast={toast}
              >
                {tooltipStyle ? (
                  <Toast.Content className="pointer-events-auto px-2 py-1">
                    <Toast.Title data-slot="toast-title" />
                  </Toast.Content>
                ) : (
                  <Toast.Content className="text-ppx-sm pointer-events-auto relative flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3">
                    <div className="flex gap-2">
                      {Icon && (
                        <div
                          className="[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                          data-slot="toast-icon"
                        >
                          <Icon className="in-data-[type=loading]:animate-spin in-data-[type=error]:text-ppx-red-5 in-data-[type=info]:text-ppx-primary-b-5 in-data-[type=success]:text-ppx-green-5 in-data-[type=warning]:text-ppx-yellow-5 in-data-[type=loading]:opacity-80" />
                        </div>
                      )}

                      <div className="flex flex-col gap-0.5">
                        <Toast.Title
                          className="text-ppx-base font-medium leading-none"
                          data-slot="toast-title"
                        />
                        <Toast.Description
                          className="text-ppx-muted-foreground"
                          data-slot="toast-description"
                        />
                      </div>
                    </div>
                    {toast.actionProps && (
                      <Toast.Action
                        className={buttonVariants({ size: "sm" })}
                        data-slot="toast-action"
                      >
                        {toast.actionProps.children}
                      </Toast.Action>
                    )}
                  </Toast.Content>
                )}
              </Toast.Root>
            </Toast.Positioner>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export {
  ToastProvider,
  type ToastPosition,
  toast,
  AnchoredToastProvider,
  anchoredToast,
};
