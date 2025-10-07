import * as React from "react";
import { Select } from "@base-ui-components/react/select";
import { cn } from "../../utils";

const BASE_ITEM_CN =
  "gap-2 py-2 pr-8 pl-4 text-base leading-4 flex cursor-default items-center outline-none select-none data-highlighted:bg-ppx-primary-b-1 data-selected:bg-ppx-primary-1! text-ppx-neutral-17 my-1";

const TRIGGER_ERROR_CN =
  "data-invalid:border-ppx-red-4 data-invalid:focus-within:outline-ppx-red-2";

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

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

export const List = Select.List;

type SelectContextValues = {
  invalid?: boolean;
};

const SelectContext = React.createContext<SelectContextValues>(
  {} as SelectContextValues,
);

export function Root<
  Value = any,
  Multiple extends boolean | undefined = false,
>({
  children,
  invalid,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.Root<Value, Multiple>> & {
  invalid?: boolean;
}) {
  const value = React.useMemo(() => ({ invalid }), [invalid]);

  return (
    <SelectContext.Provider value={value}>
      <Select.Root {...props}>{children}</Select.Root>
    </SelectContext.Provider>
  );
}

export function Content({
  portalProps,
  positionerProps,
  popupProps,
  children,
}: React.PropsWithChildren<{
  portalProps?: React.ComponentProps<typeof Select.Portal>;
  positionerProps?: React.ComponentProps<typeof Select.Positioner>;
  popupProps?: React.ComponentProps<typeof Select.Popup>;
}>) {
  return (
    <Select.Portal {...portalProps}>
      <Select.Positioner
        sideOffset={6}
        {...positionerProps}
        className={cn("z-10 outline-none", positionerProps?.className)}
        alignItemWithTrigger={false}
      >
        <Select.Popup
          className="group rounded-md py-1 text-gray-900 shadow-lg bg-white max-h-[var(--available-height)] w-[max(var(--anchor-width),250px)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto bg-clip-padding shadow-ppx-neutral-5 outline-1 outline-ppx-neutral-5 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none"
          {...popupProps}
        >
          {children}
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

export function Item({
  className,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item className={cn(BASE_ITEM_CN, className)} {...props}>
      <Select.ItemText>{props.children}</Select.ItemText>
    </Select.Item>
  );
}

export function MultiItem({
  className,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      {...props}
      render={(itemProps, state) => (
        <div {...itemProps} className={cn(BASE_ITEM_CN, className)}>
          <ItemIndicator selected={state.selected} />
          <Select.ItemText>{props.children}</Select.ItemText>
        </div>
      )}
    ></Select.Item>
  );
}

function ItemIndicator(props: { selected: boolean }) {
  return (
    <div
      className={cn(
        "peer rounded-sm bg-white size-4 flex shrink-0 items-center justify-center border border-ppx-neutral-10 transition-colors duration-150 outline-none",
        props.selected && "text-white border-ppx-primary-5 bg-ppx-primary-5",
      )}
    >
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
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
  const { invalid } = useSelectContext();
  return (
    <Select.Trigger
      aria-label="Open popup"
      className={cn(
        "h-10 gap-2 px-2 text-base bg-white flex items-center justify-between rounded-ppx-s border border-ppx-neutral-5 text-ppx-neutral-18 outline-none first:flex-1",
        size === "enforced" && "w-75",
        size === "auto" && "w-auto",
        props.className,
        TRIGGER_ERROR_CN,
      )}
      data-invalid={invalid ?? undefined}
    >
      <Select.Value>
        {(selectedValue) => {
          const isSelectedValueEmpty =
            selectedValue == null ||
            (Array.isArray(selectedValue) && selectedValue.length === 0);
          if (isSelectedValueEmpty && props.placeholder) {
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

          if (
            selectedValue &&
            typeof selectedValue === "object" &&
            "label" in selectedValue
          ) {
            return <span className="truncate">{selectedValue.label}</span>;
          }
          return null;
        }}
      </Select.Value>

      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
  );
}

function useSelectContext() {
  return React.useContext(SelectContext);
}

export function MultiSelectedValue({
  selectedValue,
  maxItems,
}: {
  selectedValue: any;
  maxItems: number;
}) {
  if (
    !selectedValue ||
    (Array.isArray(selectedValue) && selectedValue.length === 0)
  ) {
    return null;
  }
  return (
    <div className="gap-1 flex items-center">
      <span className="truncate">
        {selectedValue.slice(0, maxItems).join(", ")}
      </span>
      {selectedValue.length > maxItems && (
        <span className="truncate">
          {`(+${selectedValue.length - maxItems})`}
        </span>
      )}
    </div>
  );
}
