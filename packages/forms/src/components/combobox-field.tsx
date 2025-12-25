import * as React from "react";
import { Combobox } from "@px-ui/core";

type AllRootProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> = React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>;

type RootProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> = Pick<
  AllRootProps<TItem, TMultiple>,
  | "items"
  | "loadOptions"
  | "value"
  | "onValueChange"
  | "multiple"
  | "disabled"
  | "invalid"
  | "isItemEqualToValue"
  | "inputRef"
  | "readOnly"
>;

interface ComboboxFieldProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> extends RootProps<TItem, TMultiple> {
  /**
   * Function to render the label in the trigger for the selected item(s)
   * - For single select: receives a single item
   * - For multiple select: receives an array of items
   * If not provided and item has a 'label' property, it will be used automatically
   */
  renderLabel?: TMultiple extends true
    ? (items: TItem[]) => React.ReactNode
    : (item: TItem) => string | React.ReactNode;

  /**
   * Function to render each option in the dropdown
   * If not provided and item has a 'label' property, it will be used automatically
   */
  renderOption?: (item: TItem) => React.ReactNode;

  /**
   * Function to render each chip in ChipsTrigger (multiple selection only)
   * If not provided, renderLabel or auto-detected label will be used
   */
  renderChip?: (item: TItem) => React.ReactNode | string;

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;

  /**
   * Show search input inside the popup instead of in trigger
   * Only applicable when not using searchable trigger
   * @default false
   */
  searchInPopup?: boolean;

  /**
   * Size variant for trigger
   */
  size?: React.ComponentProps<typeof Combobox.SearchableTrigger>["size"];

  /**
   * Width variant for trigger
   */
  widthVariant?: "enforced" | "full";

  /**
   * Width variant for the dropdown content
   */
  contentWidthVariant?: "trigger" | "fit" | "enforced";

  /**
   * Additional className for the trigger
   */
  triggerClassName?: string;

  /**
   * Additional props for Combobox.Content
   */
  contentProps?: Omit<
    React.ComponentProps<typeof Combobox.Content>,
    "children" | "widthVariant" | "empty"
  >;
}

/**
 * A simplified Combobox component for common use cases.
 * For advanced customization, use the composable Combobox.* components from @px-ui/core.
 *
 * Features:
 * - Single and multiple selection
 * - Inline search (SearchableTrigger or ChipsTrigger)
 * - Async data loading with loadOptions
 * - Type-safe with full inference
 *
 * @example
 * // Single select with search
 * <ComboboxField
 *   items={items}
 *   value={selected}
 *   onValueChange={setSelected}
 *   placeholder="Select an option"
 * />
 *
 * @example
 * // Multiple select with chips
 * <ComboboxField
 *   items={items}
 *   value={selected}
 *   onValueChange={setSelected}
 *   multiple
 *   placeholder="Select options"
 * />
 *
 * @example
 * // Async loading
 * <ComboboxField
 *   loadOptions={loadUsers}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 */
export function ComboboxField<
  TItem = any,
  TMultiple extends boolean | undefined = false,
>(props: ComboboxFieldProps<TItem, TMultiple>) {
  const {
    items,
    loadOptions,
    value,
    onValueChange,
    renderLabel,
    renderOption,
    renderChip,
    placeholder,
    searchInPopup = false,
    multiple,
    disabled,
    invalid,
    isItemEqualToValue,
    size,
    widthVariant,
    contentWidthVariant = "trigger",
    triggerClassName,
    contentProps,
    inputRef,
    readOnly,
  } = props;

  // Helper to get the key for an item
  const getItemKey = (item: TItem, index: number): string => {
    if (item && typeof item === "object") {
      if ("value" in item) {
        const val = (item as any).value;
        return typeof val === "string" || typeof val === "number"
          ? String(val)
          : index.toString();
      }
      if ("id" in item) {
        const id = (item as any).id;
        return typeof id === "string" || typeof id === "number"
          ? String(id)
          : index.toString();
      }
    }
    return index.toString();
  };

  // Helper to render item content
  const renderItemContent = (item: TItem): React.ReactNode => {
    if (renderOption) {
      return renderOption(item);
    }
    // Auto-detect label property
    if (item && typeof item === "object" && "label" in item) {
      return (item as any).label;
    }
    // Fallback to string representation
    return String(item);
  };

  // Helper to render selected value label (single item)
  const renderSingleValueLabel = (item: TItem): React.ReactNode => {
    if (renderLabel && !multiple) {
      return (renderLabel as (item: TItem) => React.ReactNode)(item);
    }
    // Auto-detect label property
    if (item && typeof item === "object" && "label" in item) {
      return (item as any).label;
    }
    // Fallback to string representation
    return String(item);
  };

  // Helper to render selected value label (multiple items)
  const renderMultipleValueLabel = (items: TItem[]): React.ReactNode => {
    if (renderLabel && multiple) {
      return (renderLabel as (items: TItem[]) => React.ReactNode)(items);
    }
    // Default: show count
    return `${items.length} selected`;
  };

  // Helper to render chip content
  const renderChipContent = (item: TItem): React.ReactNode => {
    if (renderChip) {
      return renderChip(item);
    }
    return renderSingleValueLabel(item);
  };

  return (
    <Combobox.Root<TItem, TMultiple>
      items={items}
      loadOptions={loadOptions}
      value={value}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      invalid={invalid}
      isItemEqualToValue={isItemEqualToValue}
      // @ts-expect-error
      itemToStringLabel={multiple ? undefined : renderLabel}
      inputRef={inputRef}
      readOnly={readOnly}
    >
      {/* If searchInPopup, use regular Trigger (regardless of multiple) */}
      {searchInPopup ? (
        <Combobox.Trigger
          size={size}
          widthVariant={widthVariant}
          className={triggerClassName}
        >
          <Combobox.Value placeholder={placeholder}>
            {(selectedValue: any) => {
              if (selectedValue == null) {
                return null;
              }

              // Handle multiple selection
              if (multiple && Array.isArray(selectedValue)) {
                if (selectedValue.length === 0) {
                  return null;
                }
                return renderMultipleValueLabel(selectedValue);
              }

              // Single selection
              return renderSingleValueLabel(selectedValue);
            }}
          </Combobox.Value>
        </Combobox.Trigger>
      ) : multiple ? (
        /* Multiple selection uses ChipsTrigger */
        <Combobox.ChipsTrigger
          placeholder={placeholder}
          size={size}
          widthVariant={widthVariant}
          className={triggerClassName}
        >
          {(item: TItem) => (
            <Combobox.Chip key={getItemKey(item as any, 0)}>
              {renderChipContent(item)}
            </Combobox.Chip>
          )}
        </Combobox.ChipsTrigger>
      ) : (
        /* Single selection uses SearchableTrigger */
        <Combobox.SearchableTrigger
          placeholder={placeholder}
          size={size}
          widthVariant={widthVariant}
          className={triggerClassName}
        />
      )}

      <Combobox.Content widthVariant={contentWidthVariant} {...contentProps}>
        {/* Search in popup when using regular Trigger */}
        {searchInPopup && <Combobox.Search placeholder={placeholder} />}

        <Combobox.List>
          {(item: TItem) => {
            const key = getItemKey(item, 0);
            const ItemComponent = multiple ? Combobox.MultiItem : Combobox.Item;

            return (
              <ItemComponent key={key} value={item}>
                {renderItemContent(item)}
              </ItemComponent>
            );
          }}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
