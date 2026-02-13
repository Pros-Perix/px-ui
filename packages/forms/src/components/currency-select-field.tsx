import * as React from "react";
import { Combobox, cn, InputGroup } from "@px-ui/core";
import ReactCountryFlag from "react-country-flag";
import { CURRENCY_FLAG_CODE } from "../constants/currency-flag-code";

// ============================================================================
// Types
// ============================================================================

/**
 * Currency type representing a currency option
 */
export interface Currency {
  /** Unique identifier for the currency */
  id: string;
  /** Full currency name (e.g., "United States dollar") */
  name: string;
  /** Currency abbreviation (e.g., "USD", "EUR") */
  abbr: string;
  /** Currency value/code used for form submission */
  value: string;
}

type AllRootProps = React.ComponentProps<typeof Combobox.Root<Currency, false>>;

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

export interface CurrencySelectFieldProps extends RootProps {
  /**
   * Array of currency options to display
   */
  currencies: ReadonlyArray<Currency>;

  /**
   * Placeholder text when no currency is selected
   * @default "Select currency"
   */
  placeholder?: string;

  /**
   * Size variant for the trigger
   */
  size?: React.ComponentProps<typeof InputGroup.Root>["size"];

  /**
   * Width variant for trigger
   */
  widthVariant?: React.ComponentProps<typeof InputGroup.Root>["widthVariant"];

  /**
   * Width variant for the dropdown content
   */
  contentWidthVariant?: React.ComponentProps<
    typeof Combobox.Content
  >["widthVariant"];

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
// Sub-components
// ============================================================================

interface CurrencyFlagProps {
  countryCode: string | null | undefined;
  className?: string;
}

function CurrencyFlag({ countryCode, className }: CurrencyFlagProps) {
  if (!countryCode) {
    return <span className={cn("inline-block w-4", className)} />;
  }

  return (
    <div
      className={cn("relative -top-px flex shrink-0 items-center", className)}
    >
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "14px",
          height: "14px",
        }}
        aria-label={`Flag of ${countryCode}`}
      />
    </div>
  );
}

interface CurrencyOptionContentProps {
  currency: Currency;
}

function CurrencyOptionContent({ currency }: CurrencyOptionContentProps) {
  const countryCode = CURRENCY_FLAG_CODE[currency.abbr];

  return (
    <div className="flex items-center gap-2.5">
      <CurrencyFlag countryCode={countryCode} />
      <span>
        <span className="text-ppx-foreground font-medium">{currency.abbr}</span>
        <span className="text-ppx-muted-foreground"> - {currency.name}</span>
      </span>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * A currency select component with search functionality and flag display.
 * Country flags are automatically displayed based on the currency abbreviation
 * using the built-in CURRENCY_FLAG_CODE mapping.
 *
 * @example
 * ```tsx
 * const currencies = [
 *   { id: "1", abbr: "USD", name: "United States dollar", value: "USD" },
 *   { id: "2", abbr: "EUR", name: "Euro", value: "EUR" },
 *   { id: "3", abbr: "GBP", name: "British Pound", value: "GBP" },
 * ];
 *
 * <CurrencySelectField
 *   currencies={currencies}
 *   value={selectedCurrency}
 *   onValueChange={setSelectedCurrency}
 *   placeholder="Select currency"
 * />
 * ```
 */
export function CurrencySelectField({
  currencies,
  value,
  onValueChange,
  placeholder = "Select currency",
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
}: CurrencySelectFieldProps) {
  return (
    <Combobox.Root<Currency, false>
      items={currencies as Currency[]}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      invalid={invalid}
      isLoading={isLoading}
      isItemEqualToValue={(item, val) => item.id === val.id}
      itemToStringLabel={(item) => `${item.abbr} - ${item.name}`}
      inputRef={inputRef}
      readOnly={readOnly}
      name={name}
    >
      <Combobox.SearchableTrigger
        className={triggerClassName}
        widthVariant={widthVariant}
        size={size}
        placeholder={placeholder}
        addons={
          value ? (
            <InputGroup.Addon align="inline-start">
              <CurrencyFlag
                countryCode={CURRENCY_FLAG_CODE[value.abbr]}
                className="w-fit"
              />
            </InputGroup.Addon>
          ) : undefined
        }
      />

      <Combobox.Content
        widthVariant={contentWidthVariant}
        empty="No currencies found"
        {...contentProps}
      >
        <Combobox.List>
          {(currency: Currency) => (
            <Combobox.Item key={currency.id} value={currency}>
              <CurrencyOptionContent currency={currency} />
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
