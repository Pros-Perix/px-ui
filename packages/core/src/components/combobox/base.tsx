import * as React from "react";
import { Combobox } from "@base-ui-components/react/combobox";
import { cn } from "../../utils";

const BASE_ITEM_CN =
  "gap-2 py-2 pr-8 pl-4 text-base leading-4 flex cursor-default items-center outline-none select-none data-highlighted:bg-ppx-primary-b-1 data-selected:bg-ppx-primary-1! text-ppx-neutral-17";

function ClearIcon(props: React.ComponentProps<"svg">) {
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
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

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

export const Root = Combobox.Root;
export const List = Combobox.List;
export const Input = Combobox.Input;

export function Clear() {
  return (
    <Combobox.Clear
      className="h-10 w-5 rounded flex items-center justify-center bg-transparent"
      aria-label="Clear selection"
    >
      <ClearIcon className="size-4" />
    </Combobox.Clear>
  );
}

export function Content({
  empty = "No options",
  portalProps,
  positionerProps,
  popupProps,
  children,
}: React.PropsWithChildren<{
  empty?: string;
  portalProps?: React.ComponentProps<typeof Combobox.Portal>;
  positionerProps?: React.ComponentProps<typeof Combobox.Positioner>;
  popupProps?: React.ComponentProps<typeof Combobox.Popup>;
}>) {
  return (
    <Combobox.Portal {...portalProps}>
      <Combobox.Positioner
        className="outline-none"
        sideOffset={4}
        align="start"
        {...positionerProps}
      >
        <Combobox.Popup
          className="scroll-pt-2 scroll-pb-2 rounded-md py-2 text-gray-900 shadow-lg shadow-gray-200 outline-gray-200 dark:outline-gray-300 max-h-[min(var(--available-height),23rem)] w-[max(var(--anchor-width),250px)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto overscroll-contain bg-[canvas] outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1"
          {...popupProps}
        >
          {children}
          <Combobox.Empty className="px-4 py-2 leading-4 text-gray-600 empty:m-0 empty:p-0 text-[0.925rem]">
            {empty}
          </Combobox.Empty>
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  );
}

export function Item({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Item>) {
  return (
    <Combobox.Item className={cn(BASE_ITEM_CN, className)} {...props}>
      {props.children}
    </Combobox.Item>
  );
}

export function SearchableTrigger() {
  return (
    <div className="gap-1 text-sm leading-5 font-medium relative flex w-fit flex-col text-ppx-neutral-17">
      <Input
        placeholder="e.g. Apple"
        className="h-10 min-w-75 max-w-75 font-normal pl-3.5 pr-14 text-base truncate rounded-ppx-s border border-ppx-neutral-5 bg-[canvas] text-ppx-neutral-17 focus:outline-2 focus:-outline-offset-1 focus:outline-ppx-primary-2"
      />
      <div className="right-2 bottom-0 h-10 text-gray-600 absolute flex items-center justify-center">
        <Clear />
        <Combobox.Trigger
          className="h-10 w-5 rounded flex items-center justify-center bg-transparent"
          aria-label="Open popup"
        >
          <ChevronDownIcon />
        </Combobox.Trigger>
      </div>
    </div>
  );
}

export function Trigger({
  size = "enforced",
  ...props
}: {
  children?: React.ReactNode | ((selectedValue: any) => React.ReactNode);
  className?: string;
  placeholder?: string;
  size?: "auto" | "enforced";
}) {
  return (
    <Combobox.Trigger
      aria-label="Open popup"
      className={cn(
        "h-10 gap-2 px-2 text-base bg-white flex items-center justify-between rounded-ppx-s border border-ppx-neutral-5 text-ppx-neutral-18 outline-none first:flex-1",
        size === "enforced" && "w-75",
        size === "auto" && "w-auto",
        props.className,
      )}
    >
      <Combobox.Value>
        {(selectedValue) => {
          if (selectedValue == null && props.placeholder) {
            return (
              <span className="truncate text-ppx-neutral-10">
                {props.placeholder}
              </span>
            );
          }

          if (props.children) {
            const children =
              typeof props.children === "function"
                ? props.children(selectedValue)
                : props.children;

            if (typeof children === "string") {
              return <span className="truncate">{children}</span>;
            }

            return children;
          }

          if (typeof selectedValue === "string") {
            return <span className="truncate">{selectedValue}</span>;
          }

          if (typeof selectedValue === "object" && "label" in selectedValue) {
            return <span className="truncate">{selectedValue.label}</span>;
          }

          return null;
        }}
      </Combobox.Value>

      <ChevronDownIcon />
    </Combobox.Trigger>
  );
}
