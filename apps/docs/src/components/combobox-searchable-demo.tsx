import { Combobox } from "@px-ui/core";
import { useState } from "react";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

export function ComboboxSearchableDemo() {
  const [value, setValue] = useState<any>(null);

  return (
    <Combobox.Root value={value} onValueChange={setValue}>
      <Combobox.SearchableTrigger placeholder="Search countries..." />
      <Combobox.Content>
        <Combobox.List>
          {countries.map((country) => (
            <Combobox.Item key={country.value} value={country}>
              {country.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
