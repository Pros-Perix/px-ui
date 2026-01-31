import * as React from "react";
import { Select } from "@px-ui/core";

type AllRootProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> = React.ComponentProps<typeof Select.Root<TItem, TMultiple>>;

type RootProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> = Pick<
  AllRootProps<TItem, TMultiple>,
  | "value"
  | "onValueChange"
  | "multiple"
  | "disabled"
  | "invalid"
  | "isItemEqualToValue"
  | "inputRef"
  | "readOnly"
  | "name"
>;

export interface SelectFieldProps<
  TItem = any,
  TMultiple extends boolean | undefined = false,
> extends RootProps<TItem, TMultiple> {
  /**
   * Array of items to display in the select dropdown
   */
  items: ReadonlyArray<TItem>;
  /**
   * Function to render the label in the trigger for the selected item
   * If not provided and item has a 'label' property, it will be used automatically
   */
  renderLabel?: (item: TItem) => React.ReactNode;

  /**
   * Function to render each option in the dropdown
   * If not provided and item has a 'label' property, it will be used automatically
   */
  renderOption?: (item: TItem) => React.ReactNode;

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;

  size?: React.ComponentProps<typeof Select.Trigger>["size"];

  widthVariant?: React.ComponentProps<typeof Select.Trigger>["widthVariant"];

  /**
   * Width variant for the dropdown content
   */
  contentWidthVariant?: React.ComponentProps<
    typeof Select.Content
  >["widthVariant"];

  triggerClassName?: string;

  /**
   * Additional props for Select.Trigger (e.g. `id` for label htmlFor)
   */
  triggerProps?: Omit<
    React.ComponentProps<typeof Select.Trigger>,
    "children" | "size" | "widthVariant"
  >;

  /**
   * Additional props for Select.Content
   */
  contentProps?: Omit<
    React.ComponentProps<typeof Select.Content>,
    "children" | "widthVariant"
  >;
}

/**
 * A simplified Select component for common use cases.
 * For advanced customization, use the composable Select.* components from @px-ui/core.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: 1, label: 'Option 1' },
 *   { id: 2, label: 'Option 2' },
 * ];
 *
 * <SelectField
 *   items={items}
 *   value={selected}
 *   onValueChange={setSelected}
 *   renderLabel={(item) => item.label}
 *   renderOption={(item) => item.label}
 * />
 * ```
 */
export function SelectField<
  TItem = any,
  TMultiple extends boolean | undefined = false,
>(props: SelectFieldProps<TItem, TMultiple>) {
  const {
    items,
    value,
    onValueChange,
    renderLabel,
    renderOption,
    placeholder,
    multiple,
    disabled,
    invalid,
    name,
    isItemEqualToValue,
    size,
    widthVariant,
    contentWidthVariant,
    contentProps,
    triggerClassName,
    triggerProps,
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

  // Helper to render selected value label
  const renderValueLabel = (item: TItem): React.ReactNode => {
    if (renderLabel) {
      return renderLabel(item);
    }
    // Use same logic as renderOption
    return renderItemContent(item);
  };

  return (
    <Select.Root<TItem, TMultiple>
      value={value}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      invalid={invalid}
      name={name}
      isItemEqualToValue={isItemEqualToValue}
      inputRef={inputRef}
      readOnly={readOnly}
    >
      <Select.Trigger
        {...triggerProps}
        size={size}
        widthVariant={widthVariant}
        className={[triggerClassName, triggerProps?.className]
          .filter(Boolean)
          .join(" ")}
      >
        <Select.Value placeholder={placeholder}>
          {(selectedValue: any) => {
            // Handle multiple selection
            if (multiple && Array.isArray(selectedValue)) {
              // For multiple, show MultiSelectedValue by default
              const labels = selectedValue.map((item: TItem) => {
                const label = renderValueLabel(item);
                return typeof label === "string" ? label : String(label);
              });
              return (
                <Select.MultiSelectedValue
                  selectedValue={labels}
                  maxItems={2}
                />
              );
            }

            // Single selection - show placeholder if no value
            if (selectedValue == null) {
              return placeholder || null;
            }

            return renderValueLabel(selectedValue as TItem);
          }}
        </Select.Value>
      </Select.Trigger>

      <Select.Content widthVariant={contentWidthVariant} {...contentProps}>
        <Select.List>
          {(items as any[])?.map((item, index) => {
            const key = getItemKey(item, index);
            const ItemComponent = multiple ? Select.MultiItem : Select.Item;

            return (
              <ItemComponent key={key} value={item}>
                {renderItemContent(item)}
              </ItemComponent>
            );
          })}
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
