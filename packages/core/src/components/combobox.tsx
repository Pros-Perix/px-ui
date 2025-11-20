import * as React from "react";
import { Combobox } from "@base-ui-components/react/combobox";
import { cn } from "../utils";
import useInfiniteScroll from "../hooks/use-infinite-scroll";
import { Spinner } from "./spinner";
import {
  DROPDOWN_ITEM_CN,
  DROPDOWN_POPUP_CN,
  DROPDOWN_POSITIONER_CN,
  triggerVariants,
} from "../tw-styles/dropdown";
import ClearIcon from "../icons/clear-icon";
import ChevronDownIcon from "../icons/chevron-down-icon";
import SearchIcon from "../icons/search-icon";
import CheckIcon from "../icons/check-icon";
import CloseIcon from "../icons/close-icon";
import * as InputGroup from "./input-group";
import { cva, VariantProps } from "class-variance-authority";
import { useAsyncOptions } from "../hooks/use-async-options";
import { LoadOptionsConfig } from "../hooks/use-async-options";

const SINGLE_TEXT_CONTENT_CN =
  "px-4 py-2 text-ppx-sm min-h-11 flex items-center justify-center text-ppx-muted-foreground";

export const List = Combobox.List;

type ComboboxContextValues = React.ComponentProps<
  typeof Combobox.Root<any, any, any>
> & {
  chipsTriggerRef: React.RefObject<HTMLDivElement | null>;
  searchableTriggerRef: React.RefObject<HTMLDivElement | null>;
  invalid?: boolean;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  isError?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

const ComboboxContext = React.createContext<ComboboxContextValues>(
  {} as ComboboxContextValues,
);


export function Root<
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
>({
  children,
  ...props
}: React.ComponentProps<
  typeof Combobox.Root<ItemValue, SelectedValue, Multiple>
> &
  Pick<
    ComboboxContextValues,
    | "isLoading"
    | "isLoadingMore"
    | "isError"
    | "onLoadMore"
    | "hasMore"
    | "invalid"
  > & { loadOptions?: LoadOptionsConfig<ItemValue> }) {
  const chipsTriggerRef = React.useRef<HTMLDivElement>(null);
  const searchableTriggerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const fallbackProps = {
    open: isOpen,
    onOpenChange: setIsOpen,
    inputValue,
    onInputValueChange: setInputValue,
  };

  const mergedProps = {
    ...fallbackProps,
    ...props,
  };

  const asyncOptionsProps = props.loadOptions
    ? useAsyncOptions(props.loadOptions, {
        isOpen: mergedProps.open,
        inputValue: mergedProps.inputValue as string,
      })
    : {};

  const rootProps = {
    ...asyncOptionsProps,
    ...mergedProps,
  };

  const contextValues = {
    ...rootProps,
    chipsTriggerRef,
    searchableTriggerRef,
  };

  return (
    <ComboboxContext.Provider value={contextValues}>
      <Combobox.Root autoHighlight {...rootProps}>
        {children}
      </Combobox.Root>
    </ComboboxContext.Provider>
  );
}

export function Content({
  empty = "No options",
  portalProps,
  positionerProps,
  popupProps,
  children,
  widthVariant = "trigger",
}: React.PropsWithChildren<{
  empty?: string;
  portalProps?: React.ComponentProps<typeof Combobox.Portal>;
  positionerProps?: React.ComponentProps<typeof Combobox.Positioner>;
  popupProps?: React.ComponentProps<typeof Combobox.Popup>;
  widthVariant?: "trigger" | "fit" | "enforced";
}>) {
  const {
    chipsTriggerRef,
    searchableTriggerRef,
    isLoading,
    isError,
    isLoadingMore,
    hasMore,
    onLoadMore,
  } = useComboboxContext();
  const [infiniteScrollRef] = useInfiniteScroll({
    isLoadingMore: !!isLoadingMore,
    hasMore: !!hasMore,
    onLoadMore: () => onLoadMore?.(),
    disabled: isError,
  });

  return (
    <Combobox.Portal {...portalProps}>
      <Combobox.Positioner
        sideOffset={6}
        align="start"
        {...positionerProps}
        className={cn(DROPDOWN_POSITIONER_CN, positionerProps?.className)}
        anchor={
          positionerProps?.anchor ??
          chipsTriggerRef.current ??
          searchableTriggerRef.current
        }
      >
        <Combobox.Popup
          className={cn(
            DROPDOWN_POPUP_CN,
            "scroll-pt-2 scroll-pb-2 overscroll-contain",
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

          {!isLoading && !isError && (
            <Combobox.Empty
              className={cn(SINGLE_TEXT_CONTENT_CN, "empty:hidden")}
            >
              {empty}
            </Combobox.Empty>
          )}

          {isLoading && (
            <Combobox.Status className={SINGLE_TEXT_CONTENT_CN}>
              Loading...
            </Combobox.Status>
          )}

          {isError && (
            <Combobox.Status className={SINGLE_TEXT_CONTENT_CN}>
              Error loading options
            </Combobox.Status>
          )}

          {hasMore && (
            <Combobox.Status
              ref={infiniteScrollRef}
              className="h-10 flex items-center justify-center"
              aria-label="Loading more options"
            >
              <Spinner className="stroke-ppx-neutral-10" size="medium" />
            </Combobox.Status>
          )}
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
    <Combobox.Item className={cn(DROPDOWN_ITEM_CN, className)} {...props}>
      {props.children}
    </Combobox.Item>
  );
}

export function MultiItem({
  className,
  ...props
}: React.ComponentProps<typeof Combobox.Item>) {
  return (
    <Combobox.Item
      {...props}
      render={(itemProps, state) => (
        <div {...itemProps} className={cn(DROPDOWN_ITEM_CN, className)}>
          <ItemIndicator selected={state.selected} />
          {props.children}
        </div>
      )}
    ></Combobox.Item>
  );
}

function ItemIndicator(props: { selected: boolean }) {
  return (
    <div
      className={cn(
        "peer rounded-sm size-4 flex shrink-0 items-center justify-center border border-ppx-neutral-10 bg-ppx-background transition-colors duration-150 outline-none",
        props.selected && "text-white border-ppx-primary-5 bg-ppx-primary-5",
      )}
    >
      <Combobox.ItemIndicator>
        <CheckIcon />
      </Combobox.ItemIndicator>
    </div>
  );
}

export function LoadingIndicator(props: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", props.className)}>
      <div className="space-x-1 flex">
        <div className="w-1 h-1 animate-bounce rounded-full bg-ppx-foreground opacity-40 [animation-delay:-0.3s] [animation-name:bounce-color]"></div>
        <div className="w-1 h-1 animate-bounce rounded-full bg-ppx-foreground opacity-70 [animation-delay:-0.15s] [animation-name:bounce-color]"></div>
        <div className="w-1 h-1 animate-bounce rounded-full bg-ppx-foreground opacity-100 [animation-name:bounce-color]"></div>
      </div>
    </div>
  );
}

export function SearchableTrigger(props: {
  placeholder?: string;
  size?: React.ComponentProps<typeof InputGroup.Root>["size"];
  widthVariant?: React.ComponentProps<typeof InputGroup.Root>["widthVariant"];
  className?: string;
  addons?: React.ReactNode;
}) {
  const { invalid, disabled, searchableTriggerRef } = useComboboxContext();

  return (
    <InputGroup.Root {...props} disabled={disabled} ref={searchableTriggerRef}>
      <Combobox.Input
        render={(inputProps) => (
          <InputGroup.Input
            {...inputProps}
            invalid={invalid}
            placeholder={props.placeholder}
          />
        )}
      />

      {props.addons}
      <SearchableTriggerDropdownAddon />
    </InputGroup.Root>
  );
}

export function SearchableTriggerDropdownAddon() {
  const { isLoading } = useComboboxContext();
  return (
    <InputGroup.Addon align="inline-end" className="gap-0.5">
      {isLoading && <LoadingIndicator className="mr-2" />}
      {!isLoading && (
        <Combobox.Clear
          aria-label="Clear selection"
          render={(clearProps) => (
            <InputGroup.Button size="icon-xs" {...clearProps}>
              <ClearIcon className="size-4" />
            </InputGroup.Button>
          )}
        />
      )}
      <Combobox.Trigger
        render={(triggerProps) => (
          <InputGroup.Button
            size="icon-xs"
            aria-label="Open popup"
            {...triggerProps}
          >
            <ChevronDownIcon />
          </InputGroup.Button>
        )}
      />
    </InputGroup.Addon>
  );
}

export function Trigger({
  size,
  widthVariant,
  ...props
}: {
  children?: React.ReactNode | ((selectedValue: any) => React.ReactNode);
  className?: string;
  placeholder?: string;
} & VariantProps<typeof triggerVariants>) {
  const { isLoading, invalid } = useComboboxContext();
  return (
    <Combobox.Trigger
      aria-label="Open popup"
      className={cn(triggerVariants({ size, widthVariant }), props.className)}
      aria-invalid={invalid ?? undefined}
    >
      <Combobox.Value>
        {(selectedValue) => {
          if (selectedValue == null && props.placeholder) {
            return (
              <span className="truncate text-ppx-foreground">
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
      </Combobox.Value>

      <div className="gap-2 flex items-center">
        {isLoading && <LoadingIndicator />}
        <ChevronDownIcon />
      </div>
    </Combobox.Trigger>
  );
}

const chipsTriggerVariants = cva(
  "p-input text-ppx-sm bg-ppx-neutral-1 inline-flex items-center justify-between border border-ppx-neutral-5 focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-ppx-primary-2 aria-invalid:border-ppx-red-4 focus-within:aria-invalid:outline-transparent has-data-disabled:border-ppx-neutral-3 has-data-disabled:bg-ppx-neutral-3 has-data-disabled:text-ppx-neutral-11 has-data-disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "rounded-input min-h-input",
        sm: "rounded-input-s min-h-input-s",
      },
      widthVariant: {
        enforced: "min-w-input w-[var(--min-width-input)]",
        full: "min-w-0 w-full",
      },
    },
    defaultVariants: {
      size: "default",
      widthVariant: "enforced",
    },
  },
);

export function ChipsTrigger({
  size,
  widthVariant,
  ...props
}: {
  children: React.ReactNode | ((selectedValue: any) => React.ReactNode);
  placeholder?: string;
  className?: string;
} & VariantProps<typeof chipsTriggerVariants>) {
  const { chipsTriggerRef, isLoading, invalid } = useComboboxContext();
  return (
    <Combobox.Chips
      className={cn(
        chipsTriggerVariants({ size, widthVariant }),
        props.className,
      )}
      aria-invalid={invalid ?? undefined}
      ref={chipsTriggerRef}
    >
      <div className="gap-1 flex flex-1 flex-wrap items-center">
        <Combobox.Value>
          {(value: any[]) => (
            <>
              {value.map((item) => {
                return typeof props.children === "function"
                  ? props.children(item)
                  : props.children;
              })}
              <Combobox.Input
                placeholder={value.length > 0 ? "" : props.placeholder}
                className="min-w-12 flex-1 border-0 text-ppx-sm text-ppx-foreground outline-none"
              />
            </>
          )}
        </Combobox.Value>
      </div>

      <div className="gap-2 flex h-stretch-available items-center text-ppx-muted-foreground">
        {isLoading && <LoadingIndicator />}
        <Combobox.Trigger className="h-full">
          <ChevronDownIcon />
        </Combobox.Trigger>
      </div>
    </Combobox.Chips>
  );
}

export function Chip(
  props: React.ComponentProps<typeof Combobox.Chip> & { key: React.Key },
) {
  return (
    <Combobox.Chip
      {...props}
      className={cn(
        "gap-1 pl-2 pr-1 text-sm flex cursor-default items-center rounded-full bg-ppx-neutral-3 py-[0.2rem] text-ppx-foreground outline-none",
        props.className,
      )}
    >
      {props.children}
      <Combobox.ChipRemove
        className="size-5 flex shrink-0 items-center justify-center rounded-full border border-transparent text-inherit hover:border-ppx-neutral-4 hover:bg-ppx-neutral-5 hover:text-ppx-background active:bg-ppx-neutral-6"
        aria-label="Remove"
      >
        <CloseIcon className="size-3" />
      </Combobox.ChipRemove>
    </Combobox.Chip>
  );
}

export function Search({
  placeholder = "Search options",
  ...props
}: React.ComponentProps<typeof Combobox.Input>) {
  return (
    <div className="top-0 gap-2 sticky z-10 flex items-center justify-between border-b-[0.75px] border-ppx-neutral-7 bg-ppx-background p-input">
      <Combobox.Input
        placeholder={placeholder}
        className="text-sm flex-1 placeholder:text-ppx-neutral-7 focus:outline-none"
        data-popup-search
        {...props}
      />

      <SearchIcon className="size-3.5 text-ppx-neutral-10" />
    </div>
  );
}

export function useComboboxContext() {
  return React.useContext(ComboboxContext);
}
