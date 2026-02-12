import { Select } from "@px-ui/core";
import { useState } from "react";

export function SelectSizesDemo() {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Select.Root value={value1} onValueChange={setValue1}>
        <Select.Trigger size="sm">
          <Select.Value placeholder="Small" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
            <Select.Item value="3">Option 3</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>

      <Select.Root value={value2} onValueChange={setValue2}>
        <Select.Trigger size="default">
          <Select.Value placeholder="Default" />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
            <Select.Item value="3">Option 3</Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
