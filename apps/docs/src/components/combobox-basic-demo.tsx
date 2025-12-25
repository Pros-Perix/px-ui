import { Combobox } from "@px-ui/core";
import { useState } from "react";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

export function ComboboxBasicDemo() {
  const [value, setValue] = useState<(typeof fruits)[number] | null>(null);

  return (
    <>
      <Combobox.Root items={fruits} value={value} onValueChange={setValue}>
        <Combobox.Trigger>
          <Combobox.Value placeholder="Select a fruit" />
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.List>
            {fruits.map((fruit) => (
              <Combobox.Item key={fruit.value} value={fruit}>
                {fruit.label}
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </>
  );
}
