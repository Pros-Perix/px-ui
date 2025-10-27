import * as React from "react";
import { Menu } from "@base-ui-components/react/menu";
import { cn } from "../utils";
import ChevronDownIcon from "../icons/chevron-down-icon";
import {
  DROPDOWN_ITEM_CN,
  DROPDOWN_POPUP_CN,
  DROPDOWN_POSITIONER_CN,
} from "../tw-styles/dropdown";

export const TRIGGER_CN =
  "h-input gap-2 p-input text-ppx-sm bg-ppx-neutral-1 inline-flex items-center justify-center rounded-input border border-ppx-neutral-5 text-ppx-foreground not-disabled:not-data-popup-open:hover:bg-ppx-neutral-2 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ppx-primary-2 data-popup-open:bg-ppx-neutral-3 disabled:opacity-50 disabled:cursor-not-allowed";

export const Root = Menu.Root;

export function Trigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger className={cn(TRIGGER_CN, className)} {...props}>
      {children}
      <DropdownIndicator />
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
        className={cn(DROPDOWN_POSITIONER_CN, positionerProps?.className)}
      >
        <Menu.Popup
          className={cn(DROPDOWN_POPUP_CN, popupProps?.className)}
          {...popupProps}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export function DropdownIndicator() {
  return <ChevronDownIcon className="data-popup-open:rotate-180" />;
}

export function Item({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item className={cn(DROPDOWN_ITEM_CN, className)} {...props}>
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
  return (
    <Menu.RadioItem className={cn(DROPDOWN_ITEM_CN, className)} {...props} />
  );
}

export const BaseTrigger = Menu.Trigger;

export const BaseMenu = Menu;
