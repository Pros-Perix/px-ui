import { CurrencySelectField, Field, type Currency } from "@px-ui/forms";
import { useState } from "react";

const currencies: Currency[] = [
  { abbr: "USD", name: "United States dollar", countryCode: "US" },
  { abbr: "CAD", name: "Canadian dollar", countryCode: "CA" },
  { abbr: "EUR", name: "Euro", countryCode: "EU" },
  { abbr: "GBP", name: "British Pound", countryCode: "GB" },
  { abbr: "INR", name: "Indian Rupee", countryCode: "IN" },
  { abbr: "AUD", name: "Australian Dollar", countryCode: "AU" },
];

export default function CurrencySelectFieldWithFieldDemo() {
  const [value, setValue] = useState<Currency | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (currency: Currency | null) => {
    setValue(currency);
    setError(null);
  };

  const handleBlur = () => {
    if (!value) {
      setError("Currency is required");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Field.Root data-invalid={!!error}>
        <Field.Label>
          Currency <span className="text-ppx-red-5">*</span>
        </Field.Label>
        <Field.Content>
          <CurrencySelectField
            currencies={currencies}
            value={value}
            onValueChange={handleChange}
            placeholder="Select currency"
            invalid={!!error}
          />
          {error && <Field.Error>{error}</Field.Error>}
        </Field.Content>
      </Field.Root>
    </div>
  );
}
