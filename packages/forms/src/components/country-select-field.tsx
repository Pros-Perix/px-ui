import * as React from "react";
import { Combobox, InputGroup, ChevronDownIcon } from "@px-ui/core";
const { BaseCombobox } = Combobox;

// ============================================================================
// Types
// ============================================================================

/**
 * Country type representing a country option
 */
export interface Country {
  /** Country code (e.g., "US", "GB", "IN") */
  code: string;
  /** Full country name (e.g., "United States", "United Kingdom") */
  name: string;
}

type AllRootProps = React.ComponentProps<
  typeof Combobox.Root<Country, Country, false>
>;

type RootProps = Pick<
  AllRootProps,
  | "value"
  | "onValueChange"
  | "disabled"
  | "invalid"
  | "inputRef"
  | "readOnly"
  | "name"
>;

export interface CountrySelectFieldProps extends RootProps {
  /**
   * Array of country options to display
   */
  countries: ReadonlyArray<Country>;

  /**
   * Placeholder text when no country is selected
   * @default "Select country"
   */
  placeholder?: string;

  /**
   * Size variant for the trigger
   */
  size?: React.ComponentProps<typeof InputGroup.Root>["size"];

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
   * Whether the select is loading
   */
  isLoading?: boolean;

  /**
   * Additional props for Combobox.Content
   */
  contentProps?: Omit<
    React.ComponentProps<typeof Combobox.Content>,
    "children" | "widthVariant" | "empty"
  >;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * A country select component with search functionality.
 *
 * @example
 * ```tsx
 * const countries = [
 *   { code: "US", name: "United States" },
 *   { code: "GB", name: "United Kingdom" },
 *   { code: "IN", name: "India" },
 * ];
 *
 * <CountrySelectField
 *   countries={countries}
 *   value={selectedCountry}
 *   onValueChange={setSelectedCountry}
 *   placeholder="Select country"
 * />
 * ```
 */
export function CountrySelectField({
  countries,
  value,
  onValueChange,
  placeholder = "Select country",
  disabled,
  invalid,
  name,
  size,
  widthVariant,
  contentWidthVariant = "trigger",
  triggerClassName,
  isLoading,
  contentProps,
  inputRef,
  readOnly,
}: CountrySelectFieldProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);

  // Convert country to string label for accessibility and input
  const itemToStringLabel = React.useCallback(
    (country: Country) => country.name,
    [],
  );

  return (
    <Combobox.Root<Country, Country, false>
      items={countries as Country[]}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      invalid={invalid}
      isLoading={isLoading}
      isItemEqualToValue={(item, val) => item.code === val.code}
      itemToStringLabel={itemToStringLabel}
      inputRef={inputRef}
      readOnly={readOnly}
    >
      <InputGroup.Root
        size={size}
        widthVariant={widthVariant}
        disabled={disabled}
        ref={triggerRef}
        className={triggerClassName}
      >
        <BaseCombobox.Input
          render={(inputProps: React.ComponentProps<"input">) => (
            <InputGroup.Input
              {...inputProps}
              invalid={invalid}
              placeholder={placeholder}
            />
          )}
        />
        <InputGroup.Addon align="inline-end" className="gap-0.5">
          <BaseCombobox.Trigger
            render={(triggerProps: React.ComponentProps<"button">) => (
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
      </InputGroup.Root>

      <input type="hidden" name={name} value={value?.code ?? ""} />

      <Combobox.Content
        widthVariant={contentWidthVariant}
        empty="No countries found"
        positionerProps={{ anchor: triggerRef.current }}
        {...contentProps}
      >
        <Combobox.List>
          {(country: Country) => (
            <Combobox.Item key={country.code} value={country}>
              {country.name}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
