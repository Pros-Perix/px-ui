import { Popover as BasePopover } from "@base-ui/react/popover";

import { cn } from "../utils";
import CloseIcon from "../icons/close-icon";
import { Button } from "./button";

export function Root(props: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function Portal(props: React.ComponentProps<typeof BasePopover.Portal>) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}

export function Trigger(
  props: React.ComponentProps<typeof BasePopover.Trigger>,
) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

export function Close(props: React.ComponentProps<typeof BasePopover.Close>) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}

function Arrow(props: React.ComponentProps<typeof BasePopover.Arrow>) {
  return <BasePopover.Arrow data-slot="popover-arrow" {...props} />;
}

function Positioner(
  props: React.ComponentProps<typeof BasePopover.Positioner>,
) {
  return <BasePopover.Positioner data-slot="popover-positioner" {...props} />;
}

export function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("gap-y-1 relative flex flex-col", className)}
      {...props}
    />
  );
}

export function Title({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn("font-sans-sb text-ppx-sm", className)}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("text-ppx-sm text-ppx-muted-foreground", className)}
      {...props}
    />
  );
}

export function Content({
  children,
  className,
  positionerProps = {},
  popupProps = {},
  arrow = true,
}: { popupProps?: React.ComponentProps<typeof BasePopover.Popup> } & {
  positionerProps?: React.ComponentProps<typeof Positioner>;
} & { children: React.ReactNode; arrow?: boolean; className?: string }) {
  return (
    <Portal>
      <Positioner
        sideOffset={8}
        align="center"
        positionMethod="fixed"
        side="bottom"
        {...positionerProps}
      >
        <BasePopover.Popup
          data-slot="popover-content"
          {...popupProps}
          className={cn(
            "p-4 shadow-md z-50 min-w-input origin-[var(--transform-origin)] rounded-ppx-m bg-ppx-background text-ppx-foreground outline -outline-offset-1 outline-ppx-neutral-5 transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            popupProps.className,
            className,
          )}
        >
          {arrow && (
            <Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path
                  d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V9H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                  className="fill-ppx-background"
                />
                <path
                  d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
                  className="fill-ppx-neutral-5"
                />
              </svg>
            </Arrow>
          )}
          {children}
        </BasePopover.Popup>
      </Positioner>
    </Portal>
  );
}

export function CloseIconButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <BasePopover.Close
      render={(closeProps) => (
        <Button
          aria-label="Close"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "self-start text-ppx-muted-foreground transition-colors hover:text-ppx-foreground",
            className,
          )}
          {...closeProps}
          {...props}
        >
          <CloseIcon className="size-5" />
        </Button>
      )}
    />
  );
}

export function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        "gap-2 flex flex-col-reverse ppx-sm:flex-row ppx-sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
