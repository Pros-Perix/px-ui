import { Select } from "@px-ui/core";
import { useState } from "react";

export function SelectBasicDemo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.List>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="grape">Grape</Select.Item>
          <Select.Item value="mango">Mango</Select.Item>
        </Select.List>
      </Select.Content>
    </Select.Root>
  );
}
