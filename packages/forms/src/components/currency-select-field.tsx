import * as React from "react";
import { Combobox, cn, InputGroup, ChevronDownIcon } from "@px-ui/core";
import ReactCountryFlag from "react-country-flag";
const { BaseCombobox } = Combobox;

// ============================================================================
// Types
// ============================================================================

/**
 * Currency type representing a currency option
 */
export interface Currency {
  /** Currency abbreviation (e.g., "USD", "EUR") */
  abbr: string;
  /** Full currency name (e.g., "United States dollar") */
  name: string;
  /** Optional country code for flag display (e.g., "US", "EU") */
  countryCode?: string;
}

type AllRootProps = React.ComponentProps<
  typeof Combobox.Root<Currency, Currency, false>
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
// Sub-components
// ============================================================================

interface CurrencyFlagProps {
  countryCode: string | null | undefined;
  className?: string;
}

function CurrencyFlag({ countryCode, className }: CurrencyFlagProps) {
  if (!countryCode) {
    return <span className={cn("inline-block w-[14px]", className)} />;
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
      />
    </div>
  );
}

interface CurrencyOptionContentProps {
  currency: Currency;
  countryCode: string | null | undefined;
}

function CurrencyOptionContent({
  currency,
  countryCode,
}: CurrencyOptionContentProps) {
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
 * A currency select component with flag display and search functionality.
 *
 * @example
 * ```tsx
 * const currencies = [
 *   { abbr: "USD", name: "United States dollar", countryCode: "US" },
 *   { abbr: "EUR", name: "Euro", countryCode: "EU" },
 *   { abbr: "GBP", name: "British Pound", countryCode: "GB" },
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
  const triggerRef = React.useRef<HTMLDivElement>(null);

  // Convert currency to string label for accessibility and input
  const itemToStringLabel = React.useCallback(
    (currency: Currency) => `${currency.abbr} - ${currency.name}`,
    [],
  );

  return (
    <Combobox.Root<Currency, Currency, false>
      items={currencies as Currency[]}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      invalid={invalid}
      isLoading={isLoading}
      isItemEqualToValue={(item, val) => item.abbr === val.abbr}
      itemToStringLabel={itemToStringLabel}
      inputRef={inputRef}
      readOnly={readOnly}
    >
      {/* Custom trigger without clear button */}
      <InputGroup.Root
        size={size}
        widthVariant={widthVariant}
        disabled={disabled}
        ref={triggerRef}
        className={triggerClassName}
      >
        {value && (
          <InputGroup.Addon align="inline-start" className="pl-3 pr-0">
            <CurrencyFlag countryCode={value.countryCode} />
          </InputGroup.Addon>
        )}

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

      <input type="hidden" name={name} value={value?.abbr ?? ""} />

      <Combobox.Content
        widthVariant={contentWidthVariant}
        empty="No currencies found"
        positionerProps={{ anchor: triggerRef.current }}
        {...contentProps}
      >
        <Combobox.List>
          {(currency: Currency) => (
            <Combobox.Item key={currency.abbr} value={currency}>
              <CurrencyOptionContent
                currency={currency}
                countryCode={currency.countryCode}
              />
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
