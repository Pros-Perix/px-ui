import { CountrySelectField, Field, type Country } from "@px-ui/forms";
import { useState } from "react";

const countries: Country[] = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
];

export default function CountrySelectFieldWithFieldDemo() {
  const [value, setValue] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: Country | null) => {
    setValue(newValue);
    setError(null);
  };

  const handleBlur = () => {
    if (!value) {
      setError("Please select a country");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Field.Root data-invalid={!!error}>
        <Field.Label>
          Country <span className="text-ppx-red-5">*</span>
        </Field.Label>
        <Field.Content>
          <CountrySelectField
            countries={countries}
            value={value}
            onValueChange={handleChange}
            placeholder="Select country"
            invalid={!!error}
          />
          {error && <Field.Error>{error}</Field.Error>}
        </Field.Content>
      </Field.Root>
    </div>
  );
}
