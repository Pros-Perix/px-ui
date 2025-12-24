import * as React from "react";
import { Select } from "@base-ui/react/select";
import { cn } from "../utils";
import {
  DROPDOWN_ITEM_CN,
  DROPDOWN_POPUP_CN,
  DROPDOWN_POSITIONER_CN,
  triggerVariants,
} from "../tw-styles/dropdown";
import CheckIcon from "../icons/check-icon";
import ChevronDownIcon from "../icons/chevron-down-icon";
import { cva, type VariantProps } from "class-variance-authority";

type SelectContextValues = {
  invalid?: boolean;
};

const SelectContext = React.createContext<SelectContextValues>(
  {} as SelectContextValues,
);

function useSelectContext() {
  return React.useContext(SelectContext);
}

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
  widthVariant = "trigger",
}: React.PropsWithChildren<{
  portalProps?: React.ComponentProps<typeof Select.Portal>;
  positionerProps?: React.ComponentProps<typeof Select.Positioner>;
  popupProps?: React.ComponentProps<typeof Select.Popup>;
  widthVariant?: "trigger" | "fit" | "enforced";
}>) {
  return (
    <Select.Portal {...portalProps}>
      <Select.Positioner
        sideOffset={6}
        {...positionerProps}
        className={cn(DROPDOWN_POSITIONER_CN, positionerProps?.className)}
        alignItemWithTrigger={false}
      >
        <Select.Popup
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
          {...popupProps}
        >
          {children}
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

export const List = Select.List;

export function Item({
  className,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item className={cn(DROPDOWN_ITEM_CN, className)} {...props}>
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
        <div {...itemProps} className={cn(DROPDOWN_ITEM_CN, className)}>
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
        "border-ppx-neutral-10 peer flex size-4 shrink-0 items-center justify-center rounded-sm border bg-white outline-none transition-colors duration-150",
        props.selected && "border-ppx-primary-5 bg-ppx-primary-5 text-white",
      )}
    >
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </div>
  );
}

export interface TriggerProps
  extends Select.Trigger.Props,
    VariantProps<typeof triggerVariants> {}

export function Trigger({ size, widthVariant, ...props }: TriggerProps) {
  const { invalid } = useSelectContext();
  return (
    <Select.Trigger
      aria-label="Open popup"
      className={cn(triggerVariants({ size, widthVariant }), props.className)}
      aria-invalid={invalid ?? undefined}
    >
      {props.children}

      <Select.Icon className="shrink-0">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
  );
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
    <div className="flex items-center gap-1">
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

/**
 * Renders the value, if `value` is a string or an object with `label` property in it,
 * then renders that value else you should provide a render function to render your custom value
 * **/
export function Value({
  children,
  className,
  placeholder,
  ...props
}: Select.Value.Props & { placeholder?: string }) {
  return (
    <Select.Value className={cn("text-ppx-sm truncate", className)} {...props}>
      {(value) => {
        if (value == null && placeholder) {
          return placeholder;
        }

        if (children) {
          return typeof children === "function" ? children(value) : children;
        }

        if (value && typeof value === "object" && "label" in value) {
          return value.label;
        }

        return value;
      }}
    </Select.Value>
  );
}

export type SelectedValue<TValue> = TValue | null | undefined;

export const BaseSelect = Select;
