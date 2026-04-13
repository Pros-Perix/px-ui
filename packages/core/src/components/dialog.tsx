import * as React from "react";
import { Dialog as BaseDialogImpl } from "@base-ui/react";

import { cn } from "../utils";
import { Button } from "./button";
import CloseIcon from "../icons/close-icon";

export function Root({
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Root>) {
  return <BaseDialogImpl.Root data-slot="dialog" {...props} />;
}

export function Portal({
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Portal>) {
  return <BaseDialogImpl.Portal data-slot="dialog-portal" {...props} />;
}

export function Trigger({
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Trigger>) {
  return <BaseDialogImpl.Trigger data-slot="dialog-trigger" {...props} />;
}

export function Close({
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Close>) {
  return <BaseDialogImpl.Close data-slot="dialog-close" {...props} />;
}

export function Overlay({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Backdrop>) {
  return (
    <BaseDialogImpl.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/50 transition-all duration-200 [&[data-ending-style]]:opacity-0 [&[data-starting-style]]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Popup>) {
  return (
    <Portal data-slot="dialog-portal">
      <Overlay />
      <BaseDialogImpl.Popup
        data-slot="dialog-content"
        className={cn(
          "bg-ppx-background text-ppx-foreground ppx-sm:max-w-[calc(100%-2rem)] fixed z-50 grid w-full",
          "ppx-sm:max-w-lg rounded-ppx-m border-ppx-neutral-5 ppx-sm:scale-[calc(1-0.1*var(--nested-dialogs))] ppx-sm:rounded-b-ppx-m gap-8 rounded-b-none border p-6 shadow-lg outline-none duration-200",
          "ppx-sm:top-[50%] ppx-sm:bottom-auto ppx-sm:left-[50%] ppx-sm:translate-x-[-50%] ppx-sm:translate-y-[-50%] fixed bottom-0 w-full",
          "duration-200",
          "data-[starting-style]:translate-y-full data-[starting-style]:opacity-0",
          "data-[ending-style]:translate-y-full data-[ending-style]:opacity-0",
          "data-[starting-style]:ppx-sm:translate-y-[-50%] data-[starting-style]:ppx-sm:scale-95",
          "data-[ending-style]:ppx-sm:translate-y-[-50%] data-[ending-style]:ppx-sm:scale-95",
          className,
        )}
        {...props}
      >
        {children}
        <BaseDialogImpl.Close
          className="text-ppx-muted-foreground absolute right-4 top-4"
          render={(closeProps) => (
            <Button {...closeProps} size="icon-sm" variant="ghost">
              <CloseIcon />
              <span className="sr-only">Close</span>
            </Button>
          )}
        />
      </BaseDialogImpl.Popup>
    </Portal>
  );
}

export function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex gap-3", className)}
      {...props}
    />
  );
}

export function HeaderContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 self-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeaderIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-ppx-neutral-2 text-ppx-muted-foreground flex size-12 shrink-0 items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "ppx-sm:flex-row ppx-sm:justify-end flex flex-col-reverse gap-2",
        className,
      )}
      {...props}
    />
  );
}

export function Title({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Title>) {
  return (
    <BaseDialogImpl.Title
      data-slot="dialog-title"
      className={cn("font-sans-sb text-ppx-h4 leading-none", className)}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialogImpl.Description>) {
  return (
    <BaseDialogImpl.Description
      data-slot="dialog-description"
      className={cn("text-ppx-sm text-ppx-muted-foreground", className)}
      {...props}
    />
  );
}

export const createHandle = BaseDialogImpl.createHandle;
export const BaseDialog = BaseDialogImpl;
