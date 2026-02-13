import { Select } from "@px-ui/core";
import { useState } from "react";

export function SelectMultipleDemo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Select.Root multiple value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.Value placeholder="Select technologies">
          {(selectedValues: string[]) => {
            if (!selectedValues || selectedValues.length === 0) {
              return "Select technologies";
            }
            const maxItems = 2;
            const displayValues = selectedValues.slice(0, maxItems).join(", ");
            const remaining = selectedValues.length - maxItems;
            return remaining > 0
              ? `${displayValues} (+${remaining})`
              : displayValues;
          }}
        </Select.Value>
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.MultiItem value="react">React</Select.MultiItem>
          <Select.MultiItem value="vue">Vue</Select.MultiItem>
          <Select.MultiItem value="angular">Angular</Select.MultiItem>
          <Select.MultiItem value="svelte">Svelte</Select.MultiItem>
          <Select.MultiItem value="solid">Solid</Select.MultiItem>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
