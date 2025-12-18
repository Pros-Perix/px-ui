import { CurrencySelectField, type Currency } from "@px-ui/forms";
import { useState } from "react";

// Currencies without countryCode property
const currencies: Currency[] = [
  { abbr: "USD", name: "United States dollar" },
  { abbr: "CAD", name: "Canadian dollar" },
  { abbr: "EUR", name: "Euro" },
  { abbr: "GBP", name: "British Pound" },
  { abbr: "INR", name: "Indian Rupee" },
];

// Custom mapping for currencies to country codes
const CURRENCY_TO_COUNTRY: Record<string, string> = {
  USD: "US",
  CAD: "CA",
  EUR: "EU",
  GBP: "GB",
  INR: "IN",
};

export default function CurrencySelectFieldCustomFlagDemo() {
  const [value, setValue] = useState<Currency | null>(null);

  return (
    <div className="w-full max-w-xs">
      <CurrencySelectField
        currencies={currencies}
        value={value}
        onValueChange={setValue}
        placeholder="Select currency"
        getCountryCode={(currency) => CURRENCY_TO_COUNTRY[currency.abbr]}
      />
    </div>
  );
}
