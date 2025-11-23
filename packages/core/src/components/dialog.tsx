import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react";

import { cn } from "../utils";
import { Button } from "./button";
import CloseIcon from "../icons/close-icon";

export function Root({
  ...props
}: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

export function Portal({
  ...props
}: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}

export function Trigger({
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

export function Close({
  ...props
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />;
}

export function Overlay({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "inset-0 bg-black/50 fixed transition-all duration-200 [&[data-ending-style]]:opacity-0 [&[data-starting-style]]:opacity-0",
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
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <Portal data-slot="dialog-portal">
      <Overlay />
      <BaseDialog.Popup
        data-slot="dialog-content"
        className={cn(
          "sm:max-w-[calc(100%-2rem)] fixed z-50 grid w-full bg-ppx-background text-ppx-foreground",
          "gap-4 p-6 shadow-lg sm:max-w-lg sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:rounded-b-ppx-m rounded-ppx-m rounded-b-none border border-ppx-neutral-5 duration-200 outline-none",
          "bottom-0 sm:top-[50%] sm:bottom-auto sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] fixed w-full",
          "duration-200",
          "data-[starting-style]:translate-y-full data-[starting-style]:opacity-0",
          "data-[ending-style]:translate-y-full data-[ending-style]:opacity-0",
          "data-[starting-style]:sm:translate-y-[-50%] data-[starting-style]:sm:scale-95",
          "data-[ending-style]:sm:translate-y-[-50%] data-[ending-style]:sm:scale-95",
          className,
        )}
        {...props}
      >
        {children}
        <BaseDialog.Close
          className="top-4 right-4 absolute text-ppx-muted-foreground"
          render={(closeProps) => (
            <Button {...closeProps} size="icon-sm" variant="ghost">
              <CloseIcon />
              <span className="sr-only">Close</span>
            </Button>
          )}
        />
      </BaseDialog.Popup>
    </Portal>
  );
}

export function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("gap-2 sm:text-left flex flex-col text-center", className)}
      {...props}
    />
  );
}

export function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "gap-2 sm:flex-row sm:justify-end flex flex-col-reverse",
        className,
      )}
      {...props}
    />
  );
}

export function Title({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn("font-sans-sb text-ppx-h4 leading-none", className)}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn("text-ppx-sm text-ppx-muted-foreground", className)}
      {...props}
    />
  );
}
