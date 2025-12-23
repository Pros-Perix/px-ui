import { CurrencySelectField, Field, type Currency } from "@px-ui/forms";
import { useState } from "react";

const currencies: Currency[] = [
  { id: "1", abbr: "USD", name: "United States dollar", value: "USD" },
  { id: "2", abbr: "CAD", name: "Canadian dollar", value: "CAD" },
  { id: "3", abbr: "EUR", name: "Euro", value: "EUR" },
  { id: "4", abbr: "GBP", name: "British Pound", value: "GBP" },
  { id: "5", abbr: "INR", name: "Indian Rupee", value: "INR" },
  { id: "6", abbr: "AUD", name: "Australian Dollar", value: "AUD" },
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
