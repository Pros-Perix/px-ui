import * as React from "react";
import { Menu } from "@base-ui-components/react/menu";
import { cn } from "../utils";

const BASE_ITEM_CN =
  "gap-2 py-2 pr-8 pl-4 text-sm leading-4 flex cursor-default items-center outline-none select-none data-highlighted:bg-ppx-primary-b-1 data-checked:bg-ppx-primary-1! text-ppx-neutral-17 my-0.5";

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("size-4 shrink-0", props.className)}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Root(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

export function Trigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      className={cn(
        "h-10 gap-2 px-3.5 text-base bg-white inline-flex items-center justify-center rounded-ppx-s border border-ppx-neutral-5 text-ppx-neutral-18 outline-none hover:bg-ppx-neutral-2 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ppx-primary-2 active:bg-ppx-neutral-3 data-popup-open:bg-ppx-neutral-3",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="-mr-1" />
    </Menu.Trigger>
  );
}

export function Content({
  portalProps,
  positionerProps,
  popupProps,
  children,
}: React.PropsWithChildren<{
  portalProps?: React.ComponentProps<typeof Menu.Portal>;
  positionerProps?: React.ComponentProps<typeof Menu.Positioner>;
  popupProps?: React.ComponentProps<typeof Menu.Popup>;
}>) {
  return (
    <Menu.Portal {...portalProps}>
      <Menu.Positioner
        sideOffset={6}
        align="start"
        {...positionerProps}
        className={cn("z-10 outline-none", positionerProps?.className)}
      >
        <Menu.Popup
          className={cn(
            "rounded-md py-1 shadow-lg bg-white max-h-[var(--available-height)] min-w-[12rem] origin-[var(--transform-origin)] overflow-y-auto bg-clip-padding shadow-ppx-neutral-5 outline-1 outline-ppx-neutral-5 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            popupProps?.className,
          )}
          {...popupProps}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export function Item({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item className={cn(BASE_ITEM_CN, className)} {...props}>
      {children}
    </Menu.Item>
  );
}

export function Separator({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Separator>) {
  return (
    <Menu.Separator
      className={cn("my-1.5 mx-2 h-px bg-ppx-neutral-5", className)}
      {...props}
    />
  );
}

export const Group = Menu.Group;

export function GroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Menu.GroupLabel>) {
  return (
    <Menu.GroupLabel
      className={cn(
        "py-2 px-4 leading-4 cursor-default text-ppx-base text-ppx-muted-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}

export const RadioGroup = Menu.RadioGroup;

export function RadioItem({
  className,
  ...props
}: React.ComponentProps<typeof Menu.RadioItem>) {
  return <Menu.RadioItem className={cn(BASE_ITEM_CN, className)} {...props} />;
}
