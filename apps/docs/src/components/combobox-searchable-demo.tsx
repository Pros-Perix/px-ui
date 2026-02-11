import { Combobox } from "@px-ui/core";
import { useState } from "react";

interface Country {
  value: string;
  label: string;
}

const countries: Country[] = [
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
  const [value, setValue] = useState<Country | null>(null);

  return (
    <Combobox.Root
      items={countries}
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      itemToStringLabel={(item) => item.label}
    >
      <Combobox.SearchableTrigger
        placeholder="Select a country"
        widthVariant="enforced"
      />
      <Combobox.Content>
        <Combobox.List>
          {(country: Country) => (
            <Combobox.Item key={country.value} value={country}>
              {country.label}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
