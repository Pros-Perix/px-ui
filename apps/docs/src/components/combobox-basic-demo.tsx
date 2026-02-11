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
  const [value, setValue] = useState<(typeof fruits)[number] | null>({
    label: "Orange",
    value: "orange",
  });

  return (
    <Combobox.Root
      items={fruits}
      value={value}
      onValueChange={setValue}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      itemToStringLabel={(item) => item.label}
    >
      <Combobox.SearchableTrigger
        placeholder="Select a fruit"
        widthVariant="enforced"
      />
      <Combobox.Content>
        <Combobox.List>
          {(fruit: (typeof fruits)[number]) => (
            <Combobox.Item key={fruit.value} value={fruit}>
              {fruit.label}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}
