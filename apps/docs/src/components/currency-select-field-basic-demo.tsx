import { CurrencySelectField, type Currency } from "@px-ui/forms";
import { useState } from "react";

const currencies: Currency[] = [
  { id: "1", abbr: "USD", name: "United States dollar", value: "USD" },
  { id: "2", abbr: "CAD", name: "Canadian dollar", value: "CAD" },
  { id: "3", abbr: "EUR", name: "Euro", value: "EUR" },
  { id: "4", abbr: "GBP", name: "British Pound", value: "GBP" },
  { id: "5", abbr: "INR", name: "Indian Rupee", value: "INR" },
  { id: "6", abbr: "AUD", name: "Australian Dollar", value: "AUD" },
  { id: "7", abbr: "NZD", name: "New Zealand Dollar", value: "NZD" },
  { id: "8", abbr: "BGN", name: "Bulgarian Lev", value: "BGN" },
  { id: "9", abbr: "CZK", name: "Czech Koruna", value: "CZK" },
  { id: "10", abbr: "JPY", name: "Japanese Yen", value: "JPY" },
  { id: "11", abbr: "CHF", name: "Swiss Franc", value: "CHF" },
  { id: "12", abbr: "CNY", name: "Chinese Yuan", value: "CNY" },
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
