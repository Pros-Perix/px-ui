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
          className="scroll-pt-2 scroll-pb-2 rounded-md py-2 text-gray-900 shadow-lg shadow-gray-200 outline-gray-200 max-h-[min(var(--available-height),23rem)] w-[max(var(--anchor-width),250px)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto overscroll-contain bg-[canvas] outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none"
          {...popupProps}
        >
          {children}
          <Combobox.Empty className="px-4 py-2 leading-4 text-gray-600 empty:m-0 empty:p-0 text-center text-[0.925rem]">
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

export function Search({
  placeholder = "Search options",
  ...props
}: React.ComponentProps<typeof Combobox.Input>) {
  return (
    <div className="-mt-0.5 mb-2 relative h-fit">
      <Combobox.Input
        placeholder={placeholder}
        className="pb-2 pl-2 pr-10 text-sm w-full border-b-[0.75px] border-ppx-neutral-7 placeholder:text-ppx-neutral-7 focus:outline-none"
        {...props}
      />

      <div className="right-2 top-1 mr-0.5 absolute">
        <SearchIcon />
      </div>
    </div>
  );
}

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4 text-ppx-neutral-10", props.className)}
    >
      <path
        d="M15.9038 14.9625L11.2623 10.321C12.1404 9.24234 12.6723 7.85136 12.6723 6.33612C12.6723 2.83678 9.83548 0 6.33612 0C2.83677 0 0 2.83677 0 6.33612C0 9.83547 2.83677 12.6723 6.33612 12.6723C7.85133 12.6723 9.24233 12.1404 10.3326 11.2532L10.321 11.2623L14.9613 15.9026C15.0215 15.9628 15.1047 16 15.1966 16C15.2885 16 15.3717 15.9628 15.4319 15.9026L15.9026 15.4319C15.9628 15.3716 16 15.2884 16 15.1965C16 15.1053 15.9633 15.0226 15.9038 14.9624L15.9038 14.9625L15.9038 14.9625ZM6.34922 11.341C6.34886 11.341 6.34842 11.341 6.34798 11.341C3.59045 11.341 1.35503 9.10555 1.35503 6.34802C1.35503 3.59048 3.59045 1.35506 6.34798 1.35506C9.10552 1.35506 11.3409 3.59048 11.3409 6.34802C11.3409 6.34845 11.3409 6.34887 11.3409 6.34931V6.34925C11.3374 9.10469 9.10467 11.3375 6.34955 11.341H6.3492L6.34922 11.341Z"
        fill="currentColor"
      />
    </svg>
  );
}
