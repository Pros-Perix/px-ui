import { SelectField, Field } from "@px-ui/forms";
import { useState } from "react";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

export function SelectFieldWithFieldDemo() {
  const [value, setValue] = useState<any>(null);

  return (
    <Field.Root>
      <Field.Label htmlFor="country">Country</Field.Label>
      <SelectField
        items={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Select your country"
      />
      <Field.Description>
        Select the country where you currently reside.
      </Field.Description>
    </Field.Root>
  );
}
