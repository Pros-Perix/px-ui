import { Popover as BasePopover } from "@base-ui-components/react/popover";

import { cn } from "../utils";

function Root({ ...props }: React.ComponentProps<typeof BasePopover.Root>) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}

function Portal({ ...props }: React.ComponentProps<typeof BasePopover.Portal>) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}

function Trigger({
  ...props
}: React.ComponentProps<typeof BasePopover.Trigger>) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

function Close({ ...props }: React.ComponentProps<typeof BasePopover.Close>) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}

function Arrow({ ...props }: React.ComponentProps<typeof BasePopover.Arrow>) {
  return <BasePopover.Arrow data-slot="popover-arrow" {...props} />;
}

function Positioner({
  ...props
}: React.ComponentProps<typeof BasePopover.Positioner>) {
  return <BasePopover.Positioner data-slot="popover-positioner" {...props} />;
}

function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("gap-y-1 relative flex flex-col", className)}
      {...props}
    />
  );
}

function Title({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
}

function Description({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("text-sm text-ppx-muted-foreground", className)}
      {...props}
    />
  );
}

function Content({
  children,
  className,
  align = "center",
  sideOffset = 8,
  arrow = true,
  side = "bottom",
  ...props
}: React.ComponentProps<typeof BasePopover.Popup> & {
  align?: BasePopover.Positioner.Props["align"];
  sideOffset?: BasePopover.Positioner.Props["sideOffset"];
  arrow?: boolean;
  side?: BasePopover.Positioner.Props["side"];
}) {
  return (
    <Portal>
      <Positioner
        sideOffset={sideOffset}
        align={align}
        positionMethod="fixed"
        side={side}
      >
        <BasePopover.Popup
          data-slot="popover-content"
          className={cn(
            "w-72 rounded-md p-4 shadow-md z-50 origin-[var(--transform-origin)] bg-ppx-background text-ppx-foreground outline -outline-offset-1 outline-ppx-border transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className,
          )}
          {...props}
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
                  className="fill-ppx-border"
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

function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        "gap-2 sm:flex-row sm:justify-end flex flex-col-reverse",
        className,
      )}
      {...props}
    />
  );
}

export {
  Root,
  Trigger,
  Header,
  Title,
  Description,
  Content,
  Footer,
  Close,
  Arrow,
  Positioner,
  Portal,
};
