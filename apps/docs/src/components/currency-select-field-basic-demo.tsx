import { CurrencySelectField, type Currency } from "@px-ui/forms";
import { useState } from "react";

const currencies: Currency[] = [
  { abbr: "USD", name: "United States dollar", countryCode: "US" },
  { abbr: "CAD", name: "Canadian dollar", countryCode: "CA" },
  { abbr: "EUR", name: "Euro", countryCode: "EU" },
  { abbr: "GBP", name: "British Pound", countryCode: "GB" },
  { abbr: "INR", name: "Indian Rupee", countryCode: "IN" },
  { abbr: "AUD", name: "Australian Dollar", countryCode: "AU" },
  { abbr: "NZD", name: "New Zealand Dollar", countryCode: "NZ" },
  { abbr: "BGN", name: "Bulgarian Lev", countryCode: "BG" },
  { abbr: "CZK", name: "Czech Koruna", countryCode: "CZ" },
  { abbr: "JPY", name: "Japanese Yen", countryCode: "JP" },
  { abbr: "CHF", name: "Swiss Franc", countryCode: "CH" },
  { abbr: "CNY", name: "Chinese Yuan", countryCode: "CN" },
];

export default function CurrencySelectFieldBasicDemo() {
  const [value, setValue] = useState<Currency | null>(null);

  return (
    <div className="w-full max-w-xs">
      <CurrencySelectField
        currencies={currencies}
        value={value}
        onValueChange={setValue}
        placeholder="Select currency"
      />
    </div>
  );
}
