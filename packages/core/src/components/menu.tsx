import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "../utils";
import ChevronDownIcon from "../icons/chevron-down-icon";
import {
  DROPDOWN_ITEM_CN,
  DROPDOWN_POPUP_CN,
  DROPDOWN_POSITIONER_CN,
  triggerVariants,
} from "../tw-styles/dropdown";
import { type VariantProps } from "class-variance-authority";

export const Root = Menu.Root;

export function Trigger({
  className,
  children,
  size,
  widthVariant = "fit",
  ...props
}: React.ComponentProps<typeof Menu.Trigger> &
  VariantProps<typeof triggerVariants>) {
  return (
    <Menu.Trigger
      className={cn(triggerVariants({ size, widthVariant }), className)}
      {...props}
    >
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
  widthVariant = "fit",
}: React.PropsWithChildren<{
  portalProps?: React.ComponentProps<typeof Menu.Portal>;
  positionerProps?: React.ComponentProps<typeof Menu.Positioner>;
  popupProps?: React.ComponentProps<typeof Menu.Popup>;
  widthVariant?: "trigger" | "fit" | "enforced";
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
          {...popupProps}
          className={cn(
            DROPDOWN_POPUP_CN,
            "py-1",
            widthVariant === "trigger"
              ? "w-[var(--anchor-width)]"
              : widthVariant === "fit"
                ? "w-fit"
                : widthVariant === "enforced"
                  ? "w-[var(--min-width-input)]"
                  : "",
            popupProps?.className,
          )}
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
      className={cn("bg-ppx-neutral-5 mx-2 my-1.5 h-px", className)}
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
        "font-sans-sb text-ppx-sm text-ppx-muted-foreground cursor-default select-none px-4 py-2 uppercase leading-4",
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
    <Menu.RadioItem
      className={cn(DROPDOWN_ITEM_CN, className)}
      closeOnClick
      {...props}
    />
  );
}

export const BaseTrigger = Menu.Trigger;

export const BaseMenu = Menu;
